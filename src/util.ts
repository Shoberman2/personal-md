/** Clamp a confidence score into the range personal.md will store. */
export function clampConfidence(n: number): number {
  if (!Number.isFinite(n)) return 0.2;
  return round2(Math.min(0.98, Math.max(0.05, n)));
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Map evidence into a confidence.
 * More hits and a higher ratio both raise it. A single hit stays modest.
 */
export function confidenceFrom(hits: number, total: number): number {
  if (hits <= 0 || total <= 0) return 0.2;
  const ratio = Math.min(1, hits / total);
  const strength = 1 - Math.exp(-hits / 3);
  const raw = 0.15 + 0.8 * ratio * (0.45 + 0.55 * strength);
  return clampConfidence(Math.min(0.92, raw));
}

export type Salience = "config" | "trend";

/**
 * Decide whether a signal is a default, a one-off observation, or noise.
 * Rules need repeated evidence. Config files (vercel.json, a tsconfig flag)
 * can be observations from a single repo. Trends need a real share.
 */
export function classify(
  hits: number,
  total: number,
  salience: Salience,
): "rule" | "observation" | "drop" {
  if (hits <= 0 || total <= 0) return "drop";
  const ratio = hits / total;
  const strong = hits >= 2 && (ratio >= 0.3 || (hits >= 5 && ratio >= 0.2));
  if (strong) return "rule";
  if (salience === "config" && hits >= 1) return "observation";
  if (hits >= 2) return "observation";
  if (ratio >= 0.15 && hits >= 1) return "observation";
  return "drop";
}

const SLUG_STOP = new Set(["the", "a", "an", "of", "to", "and", "for", "it", "this", "that"]);

export function slug(text: string, maxWords = 4): string {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((word) => word.length > 2 && !SLUG_STOP.has(word))
    .slice(0, maxWords);
  return words.join("-") || "note";
}

export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

export async function mapPool<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;
  const workers = Math.max(1, Math.min(limit, items.length));
  async function worker(): Promise<void> {
    for (;;) {
      const index = cursor;
      cursor += 1;
      if (index >= items.length) return;
      results[index] = await fn(items[index] as T, index);
    }
  }
  if (items.length === 0) return results;
  await Promise.all(Array.from({ length: workers }, () => worker()));
  return results;
}

export function hasPathSegment(paths: string[], segment: string): boolean {
  return paths.some((filePath) => filePath.split("/").includes(segment));
}

export function basename(filePath: string): string {
  const parts = filePath.split("/");
  return parts[parts.length - 1] ?? filePath;
}
