import type { Profile } from "./types.js";
import { SCHEMA, normalize, validate } from "./types.js";

/**
 * Parse a personal.md file. The JSON fence is the source of truth.
 * Proposal diffs can quote that fence, so the last fence that parses wins.
 */
export function parse(markdown: string): Profile {
  let data: Profile | null = null;
  for (const match of markdown.matchAll(/```json personal-md\r?\n([\s\S]*?)\r?\n```/g)) {
    try {
      const parsed = JSON.parse(match[1] ?? "") as unknown;
      if (isProfile(parsed)) data = parsed;
    } catch {
      // A proposal diff may quote the fence. Keep scanning.
    }
  }
  if (!data) {
    throw new Error("This file has no ```json personal-md fence. It is not a personal.md profile this CLI can update.");
  }
  if (data.schema !== SCHEMA) {
    throw new Error(`Unsupported schema ${String(data.schema)}. This CLI reads ${SCHEMA}.`);
  }
  const profile = normalize(data);
  const errors = validate(profile);
  if (errors.length > 0) throw new Error(errors.join("\n"));
  return profile;
}

function isProfile(value: unknown): value is Profile {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<Profile>;
  return typeof record.schema === "string"
    && typeof record.subject === "string"
    && typeof record.summary === "string"
    && Array.isArray(record.rules)
    && Array.isArray(record.log)
    && Array.isArray(record.changelog)
    && Array.isArray(record.proposals)
    && record.stats !== undefined
    && record.stats !== null;
}
