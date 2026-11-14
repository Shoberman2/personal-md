import { redact } from "./redact.js";
import type { Polarity, Rule, RuleKind, Section } from "./types.js";
import { clampConfidence, classify, confidenceFrom, type Salience } from "./util.js";

export interface Draft {
  id: string;
  section: Section;
  polarity: Polarity;
  salience: Salience;
  statement: string;
  hits: number;
  total: number;
  sources: string[];
  signals: string[];
  evidenceLabel: string;
  forceKind?: RuleKind;
  forcePolarity?: Polarity;
}

export function finalize(drafts: Draft[], now: string): Rule[] {
  const seen = new Set<string>();
  const rules: Rule[] = [];
  for (const draft of drafts) {
    if (draft.hits <= 0 || draft.total <= 0) continue;
    if (seen.has(draft.id)) throw new Error(`duplicate rule id ${draft.id}`);
    seen.add(draft.id);
    const classified = classify(draft.hits, draft.total, draft.salience);
    const kind = draft.forceKind ?? classified;
    if (classified === "drop" && !draft.forceKind) continue;
    if (kind !== "rule" && kind !== "observation") continue;
    let confidence = confidenceFrom(draft.hits, draft.total);
    if (kind === "observation") confidence = clampConfidence(Math.min(confidence, 0.4));
    let polarity = draft.forcePolarity ?? draft.polarity;
    if (kind === "observation" && !draft.forcePolarity) polarity = "note";
    rules.push({
      id: draft.id,
      section: draft.section,
      kind,
      polarity,
      statement: cleanStatement(draft.statement),
      confidence,
      baseConfidence: confidence,
      delta: 0,
      evidence: draft.hits,
      evidenceTotal: draft.total,
      evidenceLabel: redact(draft.evidenceLabel).slice(0, 180),
      sources: draft.sources.slice(0, 8).map((source) => redact(source).slice(0, 80)),
      signals: draft.signals.slice(0, 8).map((signal) => redact(signal).slice(0, 180)),
      origin: "heuristic",
      locked: false,
      updated: now,
    });
  }
  return rules;
}

function cleanStatement(statement: string): string {
  return redact(statement).replace(/```/g, "'''").replace(/\s+/g, " ").trim().slice(0, 500);
}

export class Bag {
  readonly repos: string[] = [];
  readonly signals: string[] = [];

  add(repo: string, signal?: string): void {
    if (!this.repos.includes(repo)) this.repos.push(repo);
    if (signal) this.note(signal);
  }

  note(signal: string): void {
    if (!this.signals.includes(signal) && this.signals.length < 8) this.signals.push(signal);
  }

  get hits(): number {
    return this.repos.length;
  }
}

export function label(hits: number, total: number, noun: string): string {
  return `${hits} of ${total} ${noun}`;
}
