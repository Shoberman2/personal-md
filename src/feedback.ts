const STOP = new Set([
  "the",
  "a",
  "an",
  "of",
  "to",
  "and",
  "for",
  "because",
  "it",
  "feels",
  "like",
  "liked",
  "this",
  "that",
  "with",
  "too",
  "very",
  "please",
  "use",
  "more",
  "from",
  "into",
  "than",
  "its",
  "on",
  "in",
  "is",
  "are",
  "was",
  "be",
  "or",
  "if",
  "at",
  "by",
  "we",
  "i",
  "you",
  "your",
  "just",
  "really",
  "when",
  "what",
  "dont",
  "not",
]);

const LIKE = /^(liked|loved|accepted|kept|approved|great|shipped|\+)\b[:\s,-]*/i;
const DISLIKE = /^(rejected|disliked|hated|reverted|removed|declined|-)\b[:\s,-]*/i;

export interface ParsedFeedback {
  polarity: "like" | "dislike" | "note";
  text: string;
  because?: string;
  confident: boolean;
}

/** Deterministic reading of a short acceptance, rejection, or review note. */
export function parseFeedback(raw: string): ParsedFeedback {
  const trimmed = raw.trim();
  const parts = trimmed.split(/\s+because\s+/i);
  const main = (parts[0] ?? trimmed).trim();
  const because = parts.slice(1).join(" because ").trim() || undefined;
  if (LIKE.test(main)) {
    return { polarity: "like", text: main.replace(LIKE, "").trim() || main, because, confident: true };
  }
  if (DISLIKE.test(main)) {
    return { polarity: "dislike", text: main.replace(DISLIKE, "").trim() || main, because, confident: true };
  }
  if (/\b(don't|do not|avoid|too loud|too tight|too much|please don't|no more)\b/i.test(main)) {
    return { polarity: "dislike", text: main, because, confident: true };
  }
  if (/\b(lgtm|looks good|love this|ship it|this is good)\b/i.test(main)) {
    return { polarity: "like", text: main, because, confident: true };
  }
  return { polarity: "note", text: main, because, confident: false };
}

export function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s.-]/g, " ")
    .split(/[\s.]+/)
    .flatMap((part) => part.split("-"))
    .filter((word) => word.length > 2 && !STOP.has(word));
}

export function preferSentence(text: string, because?: string): string {
  let core = text.trim().replace(/\.+$/, "");
  if (!/^prefer\b/i.test(core)) {
    core = `Prefer ${core.charAt(0).toLowerCase()}${core.slice(1)}`;
  }
  if (because) return `${core} because ${because.replace(/\.+$/, "")}.`;
  return `${core}.`;
}

export function avoidSentence(text: string, because?: string): string {
  const original = text.trim().replace(/\.+$/, "");
  if (/^avoid\b/i.test(original)) {
    return because ? `${original} because ${because.replace(/\.+$/, "")}.` : `${original}.`;
  }
  const core = `${original.charAt(0).toLowerCase()}${original.slice(1)}`;
  const base = `Avoid ${core}`;
  return because ? `${base} because ${because.replace(/\.+$/, "")}.` : `${base}.`;
}
