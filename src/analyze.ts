import { inferRules } from "./heuristics.js";
import type { RepoSnapshot } from "./scan.js";
import type { Profile, ProfileStats, Visibility } from "./types.js";
import { SCHEMA, normalize } from "./types.js";

export interface AnalyzeOptions {
  subject: string;
  snapshots: RepoSnapshot[];
  visibility: Visibility;
  forksSkipped: number;
  privateExcluded: number;
  failed: string[];
  now: string;
  command: "init" | "analyze";
  previous?: Profile | null;
  analyzer?: Profile["analyzer"];
  rules?: Profile["rules"];
}

export function analyzeSnapshots(options: AnalyzeOptions): Profile {
  const languages = new Map<string, number>();
  let secretsSkipped = 0;
  let treesTruncated = 0;
  let archived = 0;
  for (const snapshot of options.snapshots) {
    secretsSkipped += snapshot.secretsSkipped;
    if (snapshot.treeTruncated) treesTruncated += 1;
    if (snapshot.archived) archived += 1;
    for (const [language, bytes] of Object.entries(snapshot.languages)) {
      languages.set(language, (languages.get(language) ?? 0) + bytes);
    }
  }
  const stats: ProfileStats = {
    visibility: options.visibility,
    includesPrivate: options.snapshots.some((snapshot) => snapshot.private),
    reposScanned: options.snapshots.length,
    forksSkipped: options.forksSkipped,
    privateExcluded: options.privateExcluded,
    archived,
    failed: options.failed,
    secretsSkipped,
    treesTruncated,
    languages: [...languages.entries()].map(([language, bytes]) => ({ language, bytes })),
  };
  const fresh: Profile = {
    schema: SCHEMA,
    subject: options.subject,
    generatedAt: options.previous?.generatedAt ?? options.now,
    updatedAt: options.now,
    analyzer: options.analyzer ?? "heuristic",
    summary: "",
    stats,
    rules: options.rules ?? inferRules(options.snapshots, options.now),
    log: [],
    changelog: [],
    proposals: [],
  };
  const merged = mergeAnalysis(fresh, options.previous ?? null);
  merged.summary = buildSummary(merged.subject, merged.rules, merged.stats);
  const rules = merged.rules.filter((rule) => rule.kind === "rule").length;
  const observations = merged.rules.filter((rule) => rule.kind === "observation").length;
  const freshScan = options.command === "init" || !options.previous;
  merged.changelog = [
    ...(options.previous?.changelog ?? []),
    {
      at: options.now,
      command: options.command,
      summary: `${freshScan ? "Initial profile" : "Re-analyzed"} from ${stats.reposScanned} ${stats.visibility} repos. ${rules} rules, ${observations} observations.`,
    },
  ];
  return normalize(merged);
}

export function mergeAnalysis(fresh: Profile, previous: Profile | null): Profile {
  if (!previous) return fresh;
  const previousById = new Map(previous.rules.map((rule) => [rule.id, rule]));
  const freshIds = new Set(fresh.rules.map((rule) => rule.id));
  const rules = fresh.rules.map((rule) => {
    const prior = previousById.get(rule.id);
    if (!prior) return rule;
    if (prior.locked) {
      return {
        ...rule,
        statement: prior.statement,
        polarity: prior.polarity,
        section: prior.section,
        kind: prior.kind === "rule" ? "rule" as const : rule.kind,
        delta: prior.delta,
        locked: true,
        origin: prior.origin,
      };
    }
    return { ...rule, delta: prior.delta };
  });
  for (const prior of previous.rules) {
    if (freshIds.has(prior.id)) continue;
    if (prior.origin === "heuristic" && !prior.locked) continue;
    const marker = "not re-observed in the latest scan";
    rules.push({
      ...prior,
      evidenceLabel: prior.evidenceLabel.includes(marker) ? prior.evidenceLabel : `${prior.evidenceLabel}; ${marker}`,
    });
  }
  return {
    ...fresh,
    generatedAt: previous.generatedAt,
    rules,
    log: previous.log,
    proposals: previous.proposals,
  };
}

export function buildSummary(subject: string, rules: Profile["rules"], stats: ProfileStats): string {
  const defaults = rules.filter((rule) => rule.kind === "rule");
  const top = [...defaults].sort((a, b) => b.confidence - a.confidence)[0];
  const design = defaults.filter((rule) => rule.section === "design" && rule.confidence >= 0.5);
  const visibility = stats.visibility === "public" ? "public" : "visible";
  const parts = [`${subject}'s profile was inferred from ${stats.reposScanned} ${visibility} repositories.`];
  if (top) parts.push(`Strongest default: ${top.statement}`);
  if (design.length === 0) {
    parts.push("Design evidence is thin, so layout, type, and color should be treated as hints until feedback confirms them.");
  } else {
    parts.push(`Design defaults include ${design.length} rule${design.length === 1 ? "" : "s"} at confidence 0.50 or higher.`);
  }
  if (stats.secretsSkipped > 0) {
    const count = stats.secretsSkipped;
    parts.push(`${count} secret-like ${count === 1 ? "path was" : "paths were"} counted and not read.`);
  }
  if (stats.treesTruncated > 0) {
    const count = stats.treesTruncated;
    parts.push(`${count} repository ${count === 1 ? "tree was" : "trees were"} truncated, so structure signals may be incomplete.`);
  }
  if (stats.failed.length > 0) {
    const count = stats.failed.length;
    parts.push(`${count} ${count === 1 ? "repository" : "repositories"} could not be scanned.`);
  }
  parts.push("Evidence counts stay tied to repositories. Likes and dislikes move confidence and are appended to the log.");
  return parts.join(" ");
}
