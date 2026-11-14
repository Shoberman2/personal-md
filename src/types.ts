import { clampConfidence, round2 } from "./util.js";

export const SCHEMA = "personal-md/v1" as const;

export const SECTIONS = [
  "design",
  "stack",
  "code",
  "naming",
  "structure",
  "copy",
  "deploy",
  "dislikes",
] as const;

export type Section = (typeof SECTIONS)[number];

export type Polarity = "prefer" | "avoid" | "note";
export type RuleKind = "rule" | "observation";
export type Origin = "heuristic" | "feedback" | "proposal" | "llm";
export type AnalyzerName = "heuristic" | "heuristic+llm";
export type Visibility = "public" | "all";

export interface Rule {
  id: string;
  section: Section;
  kind: RuleKind;
  polarity: Polarity;
  statement: string;
  confidence: number;
  baseConfidence: number;
  delta: number;
  evidence: number;
  evidenceTotal: number;
  evidenceLabel: string;
  sources: string[];
  signals: string[];
  origin: Origin;
  locked: boolean;
  updated: string;
}

export interface LogEntry {
  at: string;
  kind: "like" | "dislike" | "note";
  feedback: string;
  because: string | null;
  ruleId: string | null;
  confidenceBefore: number | null;
  confidenceAfter: number | null;
}

export interface ChangeEntry {
  at: string;
  command: "init" | "analyze" | "learn" | "propose" | "apply" | "reject";
  summary: string;
}

export interface Proposal {
  id: string;
  at: string;
  status: "pending" | "applied" | "rejected";
  ruleId: string;
  section: Section;
  kind: RuleKind;
  polarity: Polarity;
  statement: string;
  confidence: number;
  rationale: string;
  diff: string;
}

export interface ProfileStats {
  visibility: Visibility;
  includesPrivate: boolean;
  reposScanned: number;
  forksSkipped: number;
  privateExcluded: number;
  archived: number;
  failed: string[];
  secretsSkipped: number;
  treesTruncated: number;
  languages: { language: string; bytes: number }[];
}

export interface Profile {
  schema: typeof SCHEMA;
  subject: string;
  generatedAt: string;
  updatedAt: string;
  analyzer: AnalyzerName;
  summary: string;
  stats: ProfileStats;
  rules: Rule[];
  log: LogEntry[];
  changelog: ChangeEntry[];
  proposals: Proposal[];
}

export const SECTION_ORDER = new Map<Section, number>(
  SECTIONS.map((section, index) => [section, index]),
);

const ID_RE = /^[a-z][a-z0-9]*(\.[a-z0-9][a-z0-9-]*)+$/;

export function isSection(value: string): value is Section {
  return (SECTIONS as readonly string[]).includes(value);
}

export function isRuleId(value: string): boolean {
  return value.length <= 80 && ID_RE.test(value);
}

export function sectionFromId(id: string): Section | null {
  const head = id.split(".")[0] ?? "";
  return isSection(head) ? head : null;
}

export function syncConfidence(rule: Rule): Rule {
  const delta = round2(rule.delta);
  const base = clampConfidence(rule.baseConfidence);
  return {
    ...rule,
    baseConfidence: base,
    delta,
    confidence: clampConfidence(base + delta),
  };
}

export function normalize(profile: Profile): Profile {
  const rules = [...profile.rules]
    .map((rule) => syncConfidence(rule))
    .sort((a, b) => {
      const section = (SECTION_ORDER.get(a.section) ?? 0) - (SECTION_ORDER.get(b.section) ?? 0);
      if (section !== 0) return section;
      if (a.kind !== b.kind) return a.kind === "rule" ? -1 : 1;
      if (b.confidence !== a.confidence) return b.confidence - a.confidence;
      return a.id.localeCompare(b.id);
    });

  const capped = capHistory({
    ...profile,
    schema: SCHEMA,
    rules,
    stats: {
      ...profile.stats,
      languages: [...profile.stats.languages].sort((a, b) => b.bytes - a.bytes || a.language.localeCompare(b.language)),
      failed: profile.stats.failed.slice(0, 50),
    },
  });
  return capped;
}

export function capHistory(profile: Profile): Profile {
  const changelog = profile.changelog.slice(-300);
  const log = profile.log.slice(-300);
  const pending = profile.proposals.filter((item) => item.status === "pending");
  const done = profile.proposals.filter((item) => item.status !== "pending");
  const keepPending = pending.slice(-50);
  const keepDone = done.slice(-Math.max(0, 50 - keepPending.length));
  const keep = new Set([...keepDone, ...keepPending].map((item) => item.id));
  const proposals = profile.proposals.filter((item) => keep.has(item.id));
  return { ...profile, changelog, log, proposals };
}

export function validate(profile: Profile): string[] {
  const errors: string[] = [];
  if (profile.schema !== SCHEMA) errors.push(`schema must be ${SCHEMA}`);
  if (!profile.subject.trim()) errors.push("subject is required");
  if (profile.stats.visibility !== "public" && profile.stats.visibility !== "all") {
    errors.push("stats.visibility must be public or all");
  }
  const ids = new Set<string>();
  for (const rule of profile.rules) {
    if (!isRuleId(rule.id)) errors.push(`invalid rule id ${rule.id}`);
    if (ids.has(rule.id)) errors.push(`duplicate rule id ${rule.id}`);
    ids.add(rule.id);
    if (!isSection(rule.section)) errors.push(`invalid section on ${rule.id}`);
    if (rule.confidence < 0.05 || rule.confidence > 0.98) errors.push(`confidence out of range on ${rule.id}`);
    if (!rule.statement.trim()) errors.push(`empty statement on ${rule.id}`);
  }
  const proposalIds = new Set<string>();
  for (const proposal of profile.proposals) {
    if (proposalIds.has(proposal.id)) errors.push(`duplicate proposal ${proposal.id}`);
    proposalIds.add(proposal.id);
    if (!isRuleId(proposal.ruleId)) errors.push(`invalid proposal rule id ${proposal.ruleId}`);
  }
  return errors;
}

export function emptyStats(visibility: Visibility): ProfileStats {
  return {
    visibility,
    includesPrivate: false,
    reposScanned: 0,
    forksSkipped: 0,
    privateExcluded: 0,
    archived: 0,
    failed: [],
    secretsSkipped: 0,
    treesTruncated: 0,
    languages: [],
  };
}
