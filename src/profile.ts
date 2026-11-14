import { createHash } from "node:crypto";
import { avoidSentence, parseFeedback, preferSentence, tokens, type ParsedFeedback } from "./feedback.js";
import type { Llm } from "./llm.js";
import { extractJson } from "./llm.js";
import { render } from "./render.js";
import { unifiedDiff } from "./diff.js";
import { guessSection } from "./sections.js";
import type { LogEntry, Polarity, Profile, Proposal, Rule, RuleKind, Section } from "./types.js";
import { capHistory, isRuleId, isSection, normalize, sectionFromId, syncConfidence } from "./types.js";
import { clampConfidence, round2, slug } from "./util.js";

const UP = 0.12;
const DOWN = 0.18;

export interface LearnOptions {
  now: string;
  ruleId?: string;
  polarity?: "like" | "dislike" | "note";
  because?: string;
  llm?: Llm | null;
}

export interface LearnResult {
  profile: Profile;
  ruleId: string | null;
  polarity: "like" | "dislike" | "note";
  confidenceBefore: number | null;
  confidenceAfter: number | null;
}

export async function learn(profile: Profile, feedback: string, options: LearnOptions): Promise<LearnResult> {
  let parsed = parseFeedback(feedback);
  if (options.polarity) parsed = { ...parsed, polarity: options.polarity, confident: true };
  if (options.because) parsed.because = options.because;
  if (!parsed.confident && options.llm) {
    const interpreted = await interpretWithLlm(feedback, options.llm);
    if (interpreted) parsed = interpreted;
  }
  const next = structuredClone(profile);
  next.updatedAt = options.now;
  const target = options.ruleId
    ? next.rules.find((rule) => rule.id === options.ruleId) ?? null
    : bestRule(next.rules, parsed.text);
  if (options.ruleId && !isRuleId(options.ruleId)) {
    throw new Error(`Invalid rule id ${options.ruleId}.`);
  }

  if (parsed.polarity === "note") return finishNote(next, parsed, options.now);

  if (!target) {
    const created = uniqueFeedbackRule(next, createFromFeedback(parsed, options));
    next.rules.push(created);
    const entry = logEntry(options.now, parsed, created.id, null, created.confidence);
    next.log.push(entry);
    next.changelog.push({
      at: options.now,
      command: "learn",
      summary: `Added ${created.id} from ${parsed.polarity} feedback at confidence ${created.confidence.toFixed(2)}.`,
    });
    return {
      profile: normalize(next),
      ruleId: created.id,
      polarity: parsed.polarity,
      confidenceBefore: null,
      confidenceAfter: created.confidence,
    };
  }

  const before = target.confidence;
  applyToExisting(target, parsed, options.now);
  const after = target.confidence;
  next.log.push(logEntry(options.now, parsed, target.id, before, after));
  next.changelog.push({
    at: options.now,
    command: "learn",
    summary: `${parsed.polarity} ${target.id}. Confidence ${before.toFixed(2)} → ${after.toFixed(2)}.`,
  });
  return {
    profile: normalize(next),
    ruleId: target.id,
    polarity: parsed.polarity,
    confidenceBefore: before,
    confidenceAfter: after,
  };
}

function finishNote(profile: Profile, parsed: ParsedFeedback, now: string): LearnResult {
  profile.log.push(logEntry(now, parsed, null, null, null));
  profile.changelog.push({
    at: now,
    command: "learn",
    summary: "Noted feedback without changing a rule.",
  });
  return { profile: normalize(profile), ruleId: null, polarity: "note", confidenceBefore: null, confidenceAfter: null };
}

function applyToExisting(rule: Rule, parsed: ParsedFeedback, now: string): void {
  const like = parsed.polarity === "like";
  const agrees = (like && rule.polarity !== "avoid") || (!like && rule.polarity === "avoid");
  const step = agrees ? UP : -DOWN;
  rule.delta = round2(Math.min(0.45, Math.max(-0.6, rule.delta + step)));
  const synced = syncConfidence(rule);
  rule.confidence = synced.confidence;
  rule.delta = synced.delta;
  rule.updated = now;
  rule.signals = [...rule.signals.filter((signal) => !signal.startsWith("feedback ")), `feedback ${now} ${parsed.polarity}`].slice(0, 8);
  if (like && rule.kind === "observation" && rule.confidence >= 0.5) {
    rule.kind = "rule";
    rule.locked = true;
    rule.origin = rule.origin === "heuristic" ? "feedback" : rule.origin;
  }
  if (!like && rule.polarity === "prefer" && rule.confidence < 0.34) {
    rule.polarity = "avoid";
    rule.kind = "rule";
    rule.locked = true;
    rule.origin = "feedback";
    rule.statement = avoidSentence(parsed.text, parsed.because);
    if (rule.section !== "dislikes" && guessSection(parsed.text, "dislike") === "dislikes") rule.section = "dislikes";
  }
}

function createFromFeedback(parsed: ParsedFeedback, options: LearnOptions): Rule {
  const polarity: Polarity = parsed.polarity === "dislike" ? "avoid" : "prefer";
  const section = options.ruleId && sectionFromId(options.ruleId)
    ? (sectionFromId(options.ruleId) as Section)
    : guessSection(`${parsed.text} ${parsed.because ?? ""}`, parsed.polarity);
  const baseId = options.ruleId && isRuleId(options.ruleId)
    ? options.ruleId
    : `${section === "dislikes" || polarity === "avoid" ? "feedback" : section}.${slug(parsed.text)}`;
  const id = isRuleId(baseId) ? baseId : `feedback.${slug(parsed.text)}`;
  const confidence = parsed.polarity === "dislike" ? 0.6 : 0.55;
  return {
    id,
    section,
    kind: "rule",
    polarity,
    statement: polarity === "avoid" ? avoidSentence(parsed.text, parsed.because) : preferSentence(parsed.text, parsed.because),
    confidence,
    baseConfidence: confidence,
    delta: 0,
    evidence: 1,
    evidenceTotal: 1,
    evidenceLabel: "1 direct feedback note",
    sources: ["feedback"],
    signals: [`feedback ${options.now} ${parsed.polarity}`],
    origin: "feedback",
    locked: true,
    updated: options.now,
  };
}

function uniqueFeedbackRule(profile: Profile, rule: Rule): Rule {
  let id = rule.id;
  while (profile.rules.some((existing) => existing.id === id)) {
    id = `${id}-2`;
  }
  return { ...rule, id };
}

function bestRule(rules: Rule[], text: string): Rule | null {
  const wanted = new Set(tokens(text));
  const ranked = rules.map((rule) => ({ rule, score: scoreRule(rule, text, wanted) }))
    .sort((a, b) => b.score - a.score || b.rule.confidence - a.rule.confidence || a.rule.id.localeCompare(b.rule.id));
  const best = ranked[0];
  const second = ranked[1];
  if (!best || best.score <= 0) return null;
  if (second && second.score === best.score && best.score < 2) return null;
  const distinctive = [...wanted].some((token) => token.length >= 5 && ruleIdText(best.rule).includes(token));
  if (best.score >= 2 || (best.score === 1 && distinctive)) return best.rule;
  return null;
}

function scoreRule(rule: Rule, text: string, wanted: Set<string>): number {
  const hay = new Set(tokens(`${rule.id} ${rule.statement}`));
  let score = 0;
  for (const token of wanted) if (hay.has(token)) score += 1;
  if (text.toLowerCase().includes(rule.id.toLowerCase())) score += 5;
  return score;
}

function ruleIdText(rule: Rule): string {
  return rule.id.toLowerCase();
}

function logEntry(now: string, parsed: ParsedFeedback, ruleId: string | null, before: number | null, after: number | null): LogEntry {
  return {
    at: now,
    kind: parsed.polarity,
    feedback: parsed.text,
    because: parsed.because ?? null,
    ruleId,
    confidenceBefore: before,
    confidenceAfter: after,
  };
}

async function interpretWithLlm(feedback: string, llm: Llm): Promise<ParsedFeedback | null> {
  try {
    const raw = await llm.complete(
      [
        "Extract one piece of product-feedback JSON.",
        'Schema: {"polarity":"like"|"dislike"|"note","text":"short target","because":"optional reason"}',
        "If the note is ambiguous, use polarity note. Do not invent a reason.",
        feedback,
      ].join("\n"),
    );
    const parsed = extractJson(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const record = parsed as Record<string, unknown>;
    const polarity = record.polarity;
    if (polarity !== "like" && polarity !== "dislike" && polarity !== "note") return null;
    const text = typeof record.text === "string" ? record.text.trim() : "";
    if (!text) return null;
    const because = typeof record.because === "string" && record.because.trim() ? record.because.trim() : undefined;
    return { polarity, text, because, confident: polarity !== "note" };
  } catch {
    return null;
  }
}

export interface ProposeInput {
  ruleId: string;
  statement: string;
  section?: Section;
  polarity?: Polarity;
  kind?: RuleKind;
  confidence?: number;
  rationale?: string;
}

export interface ProposeOptions {
  now: string;
  autoApply?: number;
}

export interface ProposeResult {
  profile: Profile;
  proposal: Proposal;
  status: "pending" | "applied";
  diff: string;
}

export function propose(profile: Profile, input: ProposeInput, options: ProposeOptions): ProposeResult {
  if (!isRuleId(input.ruleId)) throw new Error(`Invalid rule id ${input.ruleId}. Use a dotted id such as design.typography.serif.`);
  const statement = input.statement.trim();
  if (!statement) throw new Error("A proposal needs a statement.");
  if (statement.length > 500) throw new Error("Statements must be 500 characters or fewer.");
  const section = input.section ?? sectionFromId(input.ruleId);
  if (!section || !isSection(section)) throw new Error("Pass --section. The rule id prefix is not a known section.");
  const confidence = input.confidence === undefined ? 0.6 : input.confidence;
  if (!Number.isFinite(confidence) || confidence < 0.05 || confidence > 0.98) {
    throw new Error("Proposal confidence must be between 0.05 and 0.98.");
  }
  const polarity = input.polarity ?? (section === "dislikes" ? "avoid" : "prefer");
  const kind = input.kind ?? "rule";
  const rationale = (input.rationale ?? "Proposed by an agent.").trim();
  const draft = applyProposal(structuredClone(profile), {
    ruleId: input.ruleId,
    section,
    kind,
    polarity,
    statement,
    confidence,
    now: options.now,
  });
  draft.updatedAt = options.now;
  const diff = unifiedDiff(render(profile), render(normalize(draft)), "personal.md");
  if (!diff.trim()) throw new Error("That proposal does not change personal.md.");
  const id = uniqueProposalId(profile, [options.now, input.ruleId, statement]);
  const proposal: Proposal = {
    id,
    at: options.now,
    status: "pending",
    ruleId: input.ruleId,
    section,
    kind,
    polarity,
    statement,
    confidence: clampConfidence(confidence),
    rationale,
    diff,
  };
  const auto = options.autoApply !== undefined && proposal.confidence >= options.autoApply;
  if (auto) {
    const appliedProfile = applyProposal(structuredClone(profile), {
      ruleId: input.ruleId,
      section,
      kind,
      polarity,
      statement,
      confidence,
      now: options.now,
    });
    proposal.status = "applied";
    appliedProfile.proposals = [...appliedProfile.proposals, proposal];
    appliedProfile.updatedAt = options.now;
    appliedProfile.changelog = [
      ...appliedProfile.changelog,
      {
        at: options.now,
        command: "apply",
        summary: `Auto-applied ${proposal.id} for ${proposal.ruleId} (confidence ${proposal.confidence.toFixed(2)} >= ${options.autoApply?.toFixed(2)}).`,
      },
    ];
    return { profile: normalize(capHistory(appliedProfile)), proposal, status: "applied", diff };
  }
  const pending = structuredClone(profile);
  pending.proposals = [...pending.proposals, proposal];
  pending.updatedAt = options.now;
  pending.changelog = [
    ...pending.changelog,
    { at: options.now, command: "propose", summary: `Opened ${proposal.id} for ${proposal.ruleId}. Waiting for approval.` },
  ];
  return { profile: normalize(capHistory(pending)), proposal, status: "pending", diff };
}

export function applyStoredProposal(profile: Profile, proposalId: string, now: string): Profile {
  const next = structuredClone(profile);
  const proposal = next.proposals.find((item) => item.id === proposalId);
  if (!proposal) throw new Error(`No proposal ${proposalId}.`);
  if (proposal.status !== "pending") throw new Error(`Proposal ${proposalId} is already ${proposal.status}.`);
  const applied = applyProposal(next, {
    ruleId: proposal.ruleId,
    section: proposal.section,
    kind: proposal.kind,
    polarity: proposal.polarity,
    statement: proposal.statement,
    confidence: proposal.confidence,
    now,
  });
  proposal.status = "applied";
  applied.updatedAt = now;
  applied.changelog = [
    ...applied.changelog,
    { at: now, command: "apply", summary: `Applied ${proposal.id} to ${proposal.ruleId}.` },
  ];
  return normalize(applied);
}

export function rejectStoredProposal(profile: Profile, proposalId: string, now: string, because?: string): Profile {
  const next = structuredClone(profile);
  const proposal = next.proposals.find((item) => item.id === proposalId);
  if (!proposal) throw new Error(`No proposal ${proposalId}.`);
  if (proposal.status !== "pending") throw new Error(`Proposal ${proposalId} is already ${proposal.status}.`);
  proposal.status = "rejected";
  const rule = next.rules.find((item) => item.id === proposal.ruleId);
  let confidenceBefore: number | null = null;
  let confidenceAfter: number | null = null;
  if (rule) {
    confidenceBefore = rule.confidence;
    rule.delta = round2(Math.max(-0.6, rule.delta - 0.1));
    const synced = syncConfidence(rule);
    rule.confidence = synced.confidence;
    rule.delta = synced.delta;
    rule.updated = now;
    confidenceAfter = rule.confidence;
  }
  next.log.push({
    at: now,
    kind: "dislike",
    feedback: because ? `rejected proposal ${proposalId}: ${because}` : `rejected proposal ${proposalId}`,
    because: because ?? null,
    ruleId: rule?.id ?? proposal.ruleId,
    confidenceBefore,
    confidenceAfter,
  });
  next.updatedAt = now;
  next.changelog.push({
    at: now,
    command: "reject",
    summary: `Rejected ${proposal.id}${because ? `: ${because}` : "."}`,
  });
  return normalize(next);
}

function applyProposal(
  profile: Profile,
  change: { ruleId: string; section: Section; kind: RuleKind; polarity: Polarity; statement: string; confidence: number; now: string },
): Profile {
  const existing = profile.rules.find((rule) => rule.id === change.ruleId);
  const confidence = clampConfidence(change.confidence);
  if (!existing) {
    profile.rules.push({
      id: change.ruleId,
      section: change.section,
      kind: change.kind,
      polarity: change.polarity,
      statement: change.statement,
      confidence,
      baseConfidence: confidence,
      delta: 0,
      evidence: 0,
      evidenceTotal: 0,
      evidenceLabel: "proposed edit",
      sources: ["proposal"],
      signals: ["accepted proposal"],
      origin: "proposal",
      locked: true,
      updated: change.now,
    });
    return profile;
  }
  existing.section = change.section;
  existing.kind = change.kind;
  existing.polarity = change.polarity;
  existing.statement = change.statement;
  existing.baseConfidence = existing.baseConfidence || confidence;
  existing.delta = round2(confidence - existing.baseConfidence);
  existing.confidence = confidence;
  existing.locked = true;
  existing.origin = existing.origin === "heuristic" ? "proposal" : existing.origin;
  existing.updated = change.now;
  return profile;
}

function uniqueProposalId(profile: Profile, parts: string[]): string {
  let id = shortId("prop", parts);
  if (profile.proposals.some((proposal) => proposal.id === id)) {
    id = shortId("prop", [...parts, String(profile.proposals.length)]);
  }
  return id;
}

function shortId(prefix: string, parts: string[]): string {
  const hash = createHash("sha256").update(parts.join("\0")).digest("hex").slice(0, 8);
  return `${prefix}_${hash}`;
}
