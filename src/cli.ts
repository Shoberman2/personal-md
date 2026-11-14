#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { analyzeSnapshots } from "./analyze.js";
import { inferRules } from "./heuristics.js";
import { loadFixture, snapshotsFromFixture, type FixtureRepo } from "./fixture.js";
import { GitHubClient, githubToken, resolveVisibility } from "./github.js";
import { llmFromEnv, tuneStatements } from "./llm.js";
import { parse } from "./parse.js";
import { applyStoredProposal, learn, propose, rejectStoredProposal } from "./profile.js";
import { redact } from "./redact.js";
import { render } from "./render.js";
import { scanAll, type RepoMeta } from "./scan.js";
import type { Polarity, Profile, RuleKind } from "./types.js";
import { isSection } from "./types.js";

const BOOL_FLAGS = new Set(["force", "include-forks", "quiet", "verbose", "json", "no-llm", "llm", "help", "version"]);

interface Io {
  stdout: (text: string) => void;
  stderr: (text: string) => void;
  env: NodeJS.ProcessEnv;
}

export async function main(argv: string[], io: Io): Promise<number> {
  try {
    const parsed = parseArgv(argv);
    if (parsed.flags.get("help") === true || parsed.positionals.length === 0) {
      io.stdout(`${helpText()}\n`);
      return 0;
    }
    if (parsed.flags.get("version") === true) {
      io.stdout(`${packageVersion()}\n`);
      return 0;
    }
    const command = parsed.positionals[0];
    if (command === "init" || command === "analyze") return await runAnalyze(command, parsed, io);
    if (command === "learn") return await runLearn(parsed, io);
    if (command === "propose") return await runPropose(parsed, io);
    if (command === "validate") return runValidate(parsed, io);
    if (command === "show") return runShow(parsed, io);
    io.stderr(`Unknown command ${command}.\n${helpText()}\n`);
    return 1;
  } catch (error) {
    io.stderr(`${redact(error instanceof Error ? error.message : String(error))}\n`);
    return 1;
  }
}

async function runAnalyze(command: "init" | "analyze", parsed: ParsedArgv, io: Io): Promise<number> {
  const out = stringFlag(parsed, "out") ?? stringFlag(parsed, "file") ?? "personal.md";
  const force = parsed.flags.get("force") === true;
  const exists = existsSync(out);
  if (command === "init" && exists && !force) {
    throw new Error(`Refusing to overwrite ${out}. Use analyze to update it, or pass --force.`);
  }
  let previous: Profile | null = null;
  if (exists) {
    try {
      previous = parse(readFileSync(out, "utf8"));
    } catch (error) {
      if (!force) {
        throw new Error(`Refusing to overwrite ${out}; it is not a personal.md profile. Pass --force. (${error instanceof Error ? error.message : "parse failed"})`);
      }
    }
  }
  const now = stringFlag(parsed, "now") ?? new Date().toISOString();
  const token = githubToken(io.env);
  const visibility = resolveVisibility(stringFlag(parsed, "visibility"), Boolean(token));
  const includeForks = parsed.flags.get("include-forks") === true;
  const maxRepos = numberFlag(parsed, "max-repos", 200);
  const quiet = parsed.flags.get("quiet") === true;
  const llm = await resolveLlm(parsed, io);
  const prepared = stringFlag(parsed, "fixture")
    ? loadPreparedFixture(stringFlag(parsed, "fixture") as string, visibility, includeForks, maxRepos)
    : await loadFromGitHub(parsed, io, visibility, includeForks, maxRepos, token, quiet);

  let rules: Profile["rules"] | undefined;
  let analyzer: Profile["analyzer"] = "heuristic";
  if (llm) {
    try {
      rules = await tuneStatements(inferRules(prepared.snapshots, now), llm);
      analyzer = "heuristic+llm";
      if (!quiet) io.stderr(`Tuned ${rules.length} statements with ${llm.name}.\n`);
    } catch (error) {
      rules = undefined;
      io.stderr(`LLM step failed; keeping the heuristic profile. ${redact(error instanceof Error ? error.message : String(error))}\n`);
    }
  }

  const profile = analyzeSnapshots({
    subject: prepared.subject,
    snapshots: prepared.snapshots,
    visibility,
    forksSkipped: prepared.forksSkipped,
    privateExcluded: prepared.privateExcluded,
    failed: prepared.failed,
    now,
    command,
    previous,
    analyzer,
    rules,
  });
  writeFileSync(out, render(profile));
  if (profile.stats.includesPrivate) {
    io.stderr("This personal.md includes private repository names. Do not publish it.\n");
  }
  const rulesCount = profile.rules.filter((rule) => rule.kind === "rule").length;
  const observations = profile.rules.length - rulesCount;
  io.stdout(`Wrote ${out} (${rulesCount} rules, ${observations} observations, ${profile.stats.reposScanned} repos).\n`);
  return 0;
}

async function runLearn(parsed: ParsedArgv, io: Io): Promise<number> {
  const file = targetFile(parsed);
  const text = stringFlag(parsed, "feedback") ?? stringFlag(parsed, "text");
  if (!text) throw new Error("Pass --feedback \"liked the small dependency surface\".");
  const profile = readProfile(file);
  const llm = parsed.flags.get("no-llm") === true ? null : llmFromEnv(io.env);
  const polarity = feedbackPolarity(stringFlag(parsed, "polarity"));
  const result = await learn(profile, text, {
    now: stringFlag(parsed, "now") ?? new Date().toISOString(),
    ruleId: stringFlag(parsed, "rule"),
    polarity,
    because: stringFlag(parsed, "because"),
    llm,
  });
  writeFileSync(file, render(result.profile));
  if (result.ruleId === null) io.stdout("Noted feedback. No rule changed.\n");
  else if (result.confidenceBefore === null) io.stdout(`Added ${result.ruleId} at confidence ${result.confidenceAfter?.toFixed(2)}.\n`);
  else io.stdout(`${result.polarity} ${result.ruleId}: ${result.confidenceBefore.toFixed(2)} → ${result.confidenceAfter?.toFixed(2)}.\n`);
  return 0;
}

async function runPropose(parsed: ParsedArgv, io: Io): Promise<number> {
  const sub = parsed.positionals[1];
  const file = targetFile(parsed);
  const profile = readProfile(file);
  const now = stringFlag(parsed, "now") ?? new Date().toISOString();
  if (sub === "list") {
    const pending = profile.proposals.filter((proposal) => proposal.status === "pending");
    if (parsed.flags.get("json") === true) {
      io.stdout(`${JSON.stringify(pending, null, 2)}\n`);
      return 0;
    }
    if (pending.length === 0) io.stdout("No open proposals.\n");
    for (const proposal of pending) io.stdout(`${proposal.id}\t${proposal.ruleId}\t${proposal.confidence.toFixed(2)}\t${proposal.statement}\n`);
    return 0;
  }
  if (sub === "apply" || sub === "reject") {
    const id = parsed.positionals[2];
    if (!id) throw new Error(`Pass a proposal id: personal-md propose ${sub} prop_xxxxxxxx`);
    const next = sub === "apply"
      ? applyStoredProposal(profile, id, now)
      : rejectStoredProposal(profile, id, now, stringFlag(parsed, "because"));
    writeFileSync(file, render(next));
    io.stdout(`${sub === "apply" ? "Applied" : "Rejected"} ${id}.\n`);
    return 0;
  }
  const ruleId = stringFlag(parsed, "rule");
  const statement = stringFlag(parsed, "statement");
  if (!ruleId || !statement) {
    throw new Error("Pass --rule and --statement, or use propose list, propose apply, or propose reject.");
  }
  const sectionFlag = stringFlag(parsed, "section");
  if (sectionFlag && !isSection(sectionFlag)) throw new Error(`Unknown section ${sectionFlag}.`);
  const result = propose(profile, {
    ruleId,
    statement,
    section: sectionFlag && isSection(sectionFlag) ? sectionFlag : undefined,
    polarity: rulePolarity(stringFlag(parsed, "polarity")),
    kind: ruleKind(stringFlag(parsed, "kind")),
    confidence: parsed.flags.has("confidence") ? numberFlag(parsed, "confidence", 0.6) : undefined,
    rationale: stringFlag(parsed, "rationale"),
  }, {
    now,
    autoApply: resolveAutoApply(parsed, io.env),
  });
  writeFileSync(file, render(result.profile));
  io.stdout(result.diff);
  if (result.status === "applied") {
    io.stderr(`Auto-applied ${result.proposal.id} because confidence ${result.proposal.confidence.toFixed(2)} met the threshold.\n`);
  } else {
    io.stderr(`Pending ${result.proposal.id}. Apply with: personal-md propose apply ${result.proposal.id} --file ${file}\n`);
  }
  return 0;
}

function runValidate(parsed: ParsedArgv, io: Io): number {
  const file = targetFile(parsed);
  const profile = readProfile(file);
  const rules = profile.rules.filter((rule) => rule.kind === "rule").length;
  const observations = profile.rules.length - rules;
  io.stdout(`${file} is a valid ${profile.schema} profile for ${profile.subject} (${rules} rules, ${observations} observations).\n`);
  return 0;
}

function runShow(parsed: ParsedArgv, io: Io): number {
  const profile = readProfile(targetFile(parsed));
  if (parsed.flags.get("json") === true) {
    io.stdout(`${JSON.stringify(profile, null, 2)}\n`);
    return 0;
  }
  const top = profile.rules.filter((rule) => rule.kind === "rule").slice(0, 8);
  io.stdout(`${profile.subject} — ${profile.stats.reposScanned} repos — ${profile.analyzer}\n\n${profile.summary}\n\n`);
  for (const rule of top) io.stdout(`${rule.confidence.toFixed(2)}  ${rule.polarity.padEnd(7)}  ${rule.id}\n    ${rule.statement}\n`);
  return 0;
}

interface Prepared {
  subject: string;
  snapshots: ReturnType<typeof snapshotsFromFixture>;
  forksSkipped: number;
  privateExcluded: number;
  failed: string[];
}

function loadPreparedFixture(filePath: string, visibility: "public" | "all", includeForks: boolean, maxRepos: number): Prepared {
  const fixture = loadFixture(filePath);
  return prepare(fixture.login, fixture.repos.map((repo) => ({
    name: repo.name,
    private: repo.private === true,
    fork: repo.fork === true,
    repo,
  })), visibility, includeForks, maxRepos, (repos) => snapshotsFromFixture(fixture.login, repos));
}

async function loadFromGitHub(
  parsed: ParsedArgv,
  io: Io,
  visibility: "public" | "all",
  includeForks: boolean,
  maxRepos: number,
  token: string | undefined,
  quiet: boolean,
): Promise<Prepared> {
  const client = new GitHubClient({ token });
  const user = stringFlag(parsed, "user") ?? (token ? await client.viewer() : undefined);
  if (!user) throw new Error("Pass --user, or set a GitHub token so the authenticated login can be used.");
  if (!quiet) io.stderr(`Listing ${visibility} repositories for ${user}.\n`);
  const repos = await client.listRepos(user, visibility);
  const chosen = chooseMetas(repos, visibility, includeForks, maxRepos);
  if (!quiet) io.stderr(`Scanning ${chosen.length} repositories.\n`);
  const concurrency = numberFlag(parsed, "concurrency", 3);
  const scanned = await scanAll(client, chosen, concurrency, quiet ? undefined : (name) => io.stderr(`scan ${name}\n`));
  if (client.lastRemaining !== null && !quiet) io.stderr(`GitHub rate limit remaining: ${client.lastRemaining}.\n`);
  const forksSkipped = includeForks ? 0 : repos.filter((repo) => repo.fork && (visibility === "all" || !repo.private)).length;
  return {
    subject: user,
    snapshots: scanned.snapshots,
    forksSkipped,
    privateExcluded: visibility === "public" ? repos.filter((repo) => repo.private).length : 0,
    failed: scanned.failed,
  };
}

function chooseMetas(repos: RepoMeta[], visibility: "public" | "all", includeForks: boolean, maxRepos: number): RepoMeta[] {
  const filtered = repos.filter((repo) => {
    if (visibility === "public" && repo.private) return false;
    if (!includeForks && repo.fork) return false;
    return true;
  });
  filtered.sort((a, b) => (b.pushedAt ?? "").localeCompare(a.pushedAt ?? ""));
  return filtered.slice(0, maxRepos);
}

function prepare<T extends { name: string; private: boolean; fork: boolean; repo: FixtureRepo }>(
  subject: string,
  items: T[],
  visibility: "public" | "all",
  includeForks: boolean,
  maxRepos: number,
  toSnapshots: (repos: FixtureRepo[]) => Prepared["snapshots"],
): Prepared {
  const privateExcluded = visibility === "public" ? items.filter((item) => item.private).length : 0;
  const visible = items.filter((item) => visibility === "all" || !item.private);
  const forksSkipped = includeForks ? 0 : visible.filter((item) => item.fork).length;
  const kept = visible.filter((item) => includeForks || !item.fork).slice(0, maxRepos);
  return {
    subject,
    snapshots: toSnapshots(kept.map((item) => item.repo)),
    forksSkipped,
    privateExcluded,
    failed: [],
  };
}

function resolveAutoApply(parsed: ParsedArgv, env: NodeJS.ProcessEnv): number | undefined {
  const raw = parsed.flags.has("auto-apply") ? parsed.flags.get("auto-apply") : env.PERSONAL_MD_AUTO_APPLY;
  if (raw === undefined || raw === true || raw === "" || raw === "off") return undefined;
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0 || value > 1) throw new Error("--auto-apply must be a number from 0 to 1, or off.");
  return value;
}

async function resolveLlm(parsed: ParsedArgv, io: Io) {
  if (parsed.flags.get("no-llm") === true) return null;
  const llm = llmFromEnv(io.env);
  if (parsed.flags.get("llm") === true && !llm) {
    throw new Error("Pass --llm only when PERSONAL_MD_LLM_PROVIDER and an API key are set. The heuristic profile does not need them.");
  }
  if (!llm && io.env.PERSONAL_MD_LLM_PROVIDER && !["none", "off", ""].includes(io.env.PERSONAL_MD_LLM_PROVIDER)) {
    io.stderr(`Ignoring PERSONAL_MD_LLM_PROVIDER=${io.env.PERSONAL_MD_LLM_PROVIDER}; expected openai, openai-compatible, or anthropic, plus an API key.\n`);
  }
  return llm;
}

function readProfile(file: string): Profile {
  if (!existsSync(file)) throw new Error(`No file at ${file}. Run personal-md init first.`);
  return parse(readFileSync(file, "utf8"));
}

function targetFile(parsed: ParsedArgv): string {
  return stringFlag(parsed, "file") ?? stringFlag(parsed, "out") ?? "personal.md";
}

function feedbackPolarity(value: string | undefined): "like" | "dislike" | "note" | undefined {
  if (value === undefined) return undefined;
  if (value === "like" || value === "dislike" || value === "note") return value;
  throw new Error("--polarity must be like, dislike, or note.");
}

function rulePolarity(value: string | undefined): Polarity | undefined {
  if (value === undefined) return undefined;
  if (value === "prefer" || value === "avoid" || value === "note") return value;
  throw new Error("--polarity must be prefer, avoid, or note.");
}

function ruleKind(value: string | undefined): RuleKind | undefined {
  if (value === undefined) return undefined;
  if (value === "rule" || value === "observation") return value;
  throw new Error("--kind must be rule or observation.");
}

function stringFlag(parsed: ParsedArgv, name: string): string | undefined {
  const value = parsed.flags.get(name);
  return typeof value === "string" ? value : undefined;
}

function numberFlag(parsed: ParsedArgv, name: string, fallback: number): number {
  const value = parsed.flags.get(name);
  if (value === undefined || value === true) return fallback;
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) throw new Error(`--${name} must be a positive number.`);
  return number;
}

interface ParsedArgv {
  positionals: string[];
  flags: Map<string, string | true>;
}

export function parseArgv(argv: string[]): ParsedArgv {
  const positionals: string[] = [];
  const flags = new Map<string, string | true>();
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index] as string;
    if (token === "--") {
      positionals.push(...argv.slice(index + 1));
      break;
    }
    if (!token.startsWith("--")) {
      positionals.push(token);
      continue;
    }
    const body = token.slice(2);
    const eq = body.indexOf("=");
    if (eq >= 0) {
      flags.set(body.slice(0, eq), body.slice(eq + 1));
      continue;
    }
    if (BOOL_FLAGS.has(body)) {
      flags.set(body, true);
      continue;
    }
    const next = argv[index + 1];
    if (next === undefined || next.startsWith("--")) flags.set(body, true);
    else {
      flags.set(body, next);
      index += 1;
    }
  }
  return { positionals, flags };
}

function packageVersion(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  for (const candidate of [join(here, "../package.json"), join(here, "../../package.json")]) {
    if (!existsSync(candidate)) continue;
    const pkg = JSON.parse(readFileSync(candidate, "utf8")) as { version?: string };
    if (pkg.version) return pkg.version;
  }
  return "0.1.0";
}

function helpText(): string {
  return `personal-md ${packageVersion()}

A living personal.md of someone's taste and defaults, mined from GitHub
and updated when they accept or reject an agent's work.

Usage
  personal-md init --user <login> [--out personal.md]
  personal-md analyze --user <login> [--out personal.md]
  personal-md learn --file personal.md --feedback "liked X"
  personal-md propose --file personal.md --rule <id> --statement "..."
  personal-md propose list --file personal.md
  personal-md propose apply <id> --file personal.md
  personal-md propose reject <id> --file personal.md
  personal-md show --file personal.md
  personal-md validate --file personal.md

Scan
  --user <login>           GitHub login. Defaults to the token's user.
  --visibility public|all  public is the default without a token.
                           With a token, the default is all (includes private).
  --include-forks          Count forked repos as evidence.
  --max-repos <n>          Cap the scan (default 200, most recently pushed).
  --concurrency <n>        Parallel repository reads (default 3).
  --fixture <file.json>    Analyze a local fixture instead of GitHub.
  --force                  Overwrite a non-profile, or replace on init.
  --now <iso>              Timestamp to write. Useful for reproducible output.

Learn and propose
  --feedback <text>        "liked X", "rejected Y because Z", or a review note.
  --rule <id>              Rule to update. Created when it does not exist.
  --because <text>         Reason stored in the likes / dislikes log.
  --polarity like|dislike|note
  --statement <text>       Proposed rule text.
  --section <name>         design, stack, code, naming, structure, copy, deploy, dislikes.
  --confidence <0-1>       Proposal confidence (default 0.60).
  --rationale <text>       Why an agent is proposing the edit.
  --auto-apply <0-1>       Apply immediately when confidence >= threshold.
                           PERSONAL_MD_AUTO_APPLY does the same. Use "off" to disable.

LLM (optional)
  The heuristic profile needs no key. Set these to rewrite statements
  and to interpret messy feedback. A failed call keeps the heuristic result.
  PERSONAL_MD_LLM_PROVIDER   openai, openai-compatible, anthropic, or none
  PERSONAL_MD_LLM_API_KEY    falls back to OPENAI_API_KEY or ANTHROPIC_API_KEY
  PERSONAL_MD_LLM_MODEL
  PERSONAL_MD_LLM_BASE_URL   for openai-compatible endpoints
  --llm                      Fail if a provider is not configured.
  --no-llm                   Force the heuristic path.

GitHub token
  PERSONAL_MD_GITHUB_TOKEN, GITHUB_TOKEN, or GH_TOKEN.
  Private repository names are written into personal.md when visibility is all.
  Do not commit that file.`;
}

const entry = process.argv[1] ? pathToFileURL(process.argv[1]).href : "";
if (import.meta.url === entry) {
  main(process.argv.slice(2), {
    stdout: (text) => process.stdout.write(text),
    stderr: (text) => process.stderr.write(text),
    env: process.env,
  }).then((code) => {
    process.exit(code);
  });
}
