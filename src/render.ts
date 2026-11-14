import type { Profile, Proposal, Rule, Section } from "./types.js";
import { SECTIONS, normalize } from "./types.js";

const TITLES: Record<Section, string> = {
  design: "Design taste",
  stack: "Stack and tooling",
  code: "Code style",
  naming: "Naming",
  structure: "Repo structure",
  copy: "Copy and tone",
  deploy: "Deploy habits",
  dislikes: "Dislikes",
};

/** Render a profile to the human markdown view plus the normative JSON fence. */
export function render(profile: Profile): string {
  const normalized = normalize(profile);
  const lines: string[] = [];
  lines.push("---");
  lines.push(`schema: ${normalized.schema}`);
  lines.push(`subject: ${yaml(normalized.subject)}`);
  lines.push(`visibility: ${normalized.stats.visibility}`);
  lines.push(`includes_private: ${normalized.stats.includesPrivate ? "true" : "false"}`);
  lines.push(`analyzer: ${normalized.analyzer}`);
  lines.push(`repos_scanned: ${normalized.stats.reposScanned}`);
  lines.push(`updated: ${normalized.updatedAt}`);
  lines.push("---");
  lines.push("");
  lines.push(`# personal.md — ${normalized.subject}`);
  lines.push("");
  lines.push(`> Read this before building anything for **${normalized.subject}**. Prefer higher confidence. Treat polarity \`avoid\` as a constraint. \`note\` is context, not a default. After the person accepts or rejects work, run \`personal-md learn\`.`);
  lines.push("");
  lines.push("Confidence is a score from 0.05 to 0.98. The evidence label says what was counted. Feedback does not rewrite those counts; it shifts confidence and is appended to the log.");
  lines.push("");
  lines.push("## Identity");
  lines.push("");
  lines.push(normalized.summary);
  lines.push("");
  if (normalized.stats.languages.length > 0) {
    lines.push("Language bytes:");
    lines.push("");
    for (const language of normalized.stats.languages.slice(0, 6)) {
      lines.push(`- ${language.language}: ${language.bytes}`);
    }
    lines.push("");
  }
  if (normalized.stats.forksSkipped > 0 || normalized.stats.privateExcluded > 0) {
    const forks = normalized.stats.forksSkipped;
    const hidden = normalized.stats.privateExcluded;
    lines.push(`Skipped ${forks} ${forks === 1 ? "fork" : "forks"} and excluded ${hidden} private ${hidden === 1 ? "repo" : "repos"} from this file.`);
    lines.push("");
  }

  const topical = normalized.rules.filter((rule) => rule.kind === "rule");
  for (const section of SECTIONS) {
    lines.push(`## ${TITLES[section]}`);
    lines.push("");
    const own = topical.filter((rule) => rule.section === section);
    if (section === "dislikes") {
      if (own.length === 0 && topical.every((rule) => rule.polarity !== "avoid")) {
        lines.push("_No dislikes recorded yet. Rejections land here when you run `personal-md learn`._");
        lines.push("");
      }
      for (const rule of own) lines.push(...renderRule(rule), "");
      const indexed = topical.filter((rule) => rule.polarity === "avoid" && rule.section !== "dislikes");
      if (indexed.length > 0) {
        lines.push("Also avoided, with the full rule in its topic section:");
        lines.push("");
        for (const rule of indexed) {
          lines.push(`- \`${rule.id}\` — ${rule.statement} (confidence ${rule.confidence.toFixed(2)})`);
        }
        lines.push("");
      }
      continue;
    }
    if (own.length === 0) {
      lines.push("_No rule yet._");
      lines.push("");
      continue;
    }
    for (const rule of own) lines.push(...renderRule(rule), "");
  }

  lines.push("## Observations");
  lines.push("");
  lines.push("These showed up once, or at low frequency. Do not treat them as defaults. A later like can promote one.");
  lines.push("");
  const observations = normalized.rules.filter((rule) => rule.kind === "observation");
  if (observations.length === 0) lines.push("_None._");
  for (const rule of observations) lines.push(...renderRule(rule), "");
  if (observations.length === 0) lines.push("");

  lines.push("## Likes / dislikes log");
  lines.push("");
  if (normalized.log.length === 0) {
    lines.push("_No feedback yet._");
    lines.push("");
  } else {
    for (const entry of normalized.log) {
      lines.push(`### ${entry.at} · ${entry.kind}${entry.ruleId ? ` · \`${entry.ruleId}\`` : ""}`);
      lines.push("");
      lines.push(`- **feedback:** ${inline(entry.feedback)}`);
      lines.push(`- **because:** ${entry.because ? inline(entry.because) : "—"}`);
      if (entry.confidenceBefore !== null && entry.confidenceAfter !== null) {
        lines.push(`- **confidence:** ${entry.confidenceBefore.toFixed(2)} → ${entry.confidenceAfter.toFixed(2)}`);
      }
      lines.push("");
    }
  }

  lines.push("## Changelog");
  lines.push("");
  if (normalized.changelog.length === 0) lines.push("_No changes yet._");
  for (const entry of normalized.changelog) {
    lines.push(`- \`${entry.at}\` **${entry.command}** — ${inline(entry.summary)}`);
  }
  lines.push("");

  lines.push("## Open proposals");
  lines.push("");
  const pending = normalized.proposals.filter((proposal) => proposal.status === "pending");
  if (pending.length === 0) {
    lines.push("_No open proposals._");
    lines.push("");
  }
  for (const proposal of pending) lines.push(...renderProposal(proposal), "");

  const json = JSON.stringify(normalized, null, 2);
  lines.push("## Agent data");
  lines.push("");
  lines.push("The JSON fence is normative. Tools read and write this block. The sections above are a rendering of it. If they disagree, the fence wins. Edit with the CLI so the two stay together.");
  lines.push("");
  lines.push("```json personal-md");
  lines.push(json);
  lines.push("```");
  lines.push("");
  return lines.join("\n");
}

function renderRule(rule: Rule): string[] {
  return [
    `### \`${rule.id}\``,
    "",
    `- **statement:** ${inline(rule.statement)}`,
    `- **polarity:** ${rule.polarity}`,
    `- **kind:** ${rule.kind}`,
    `- **confidence:** ${rule.confidence.toFixed(2)}`,
    `- **evidence:** ${inline(rule.evidenceLabel)} (${rule.evidence})`,
    `- **origin:** ${rule.origin}${rule.locked ? ", locked" : ""}`,
    `- **sources:** ${rule.sources.length > 0 ? rule.sources.map((source) => `\`${source}\``).join(", ") : "—"}`,
    `- **signals:** ${rule.signals.length > 0 ? rule.signals.map(inline).join("; ") : "—"}`,
  ];
}

function renderProposal(proposal: Proposal): string[] {
  return [
    `### \`${proposal.id}\` · ${proposal.status}`,
    "",
    `- **rule:** \`${proposal.ruleId}\``,
    `- **statement:** ${inline(proposal.statement)}`,
    `- **polarity:** ${proposal.polarity}`,
    `- **confidence:** ${proposal.confidence.toFixed(2)}`,
    `- **rationale:** ${inline(proposal.rationale)}`,
    "",
    "```diff",
    proposal.diff.trimEnd(),
    "```",
  ];
}

function inline(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function yaml(text: string): string {
  if (/^[A-Za-z0-9._-]+$/.test(text)) return text;
  return JSON.stringify(text);
}
