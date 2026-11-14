import { redact } from "./redact.js";
import { isIgnoredPath, selectFiles } from "./selectFiles.js";
import { mapPool } from "./util.js";

export interface RepoSnapshot {
  name: string;
  fullName: string;
  private: boolean;
  fork: boolean;
  archived: boolean;
  description: string;
  language: string | null;
  languages: Record<string, number>;
  topics: string[];
  pushedAt: string | null;
  paths: string[];
  files: Record<string, string>;
  commits: string[];
  secretsSkipped: number;
  treeTruncated: boolean;
}

export interface RepoMeta {
  name: string;
  fullName: string;
  private: boolean;
  fork: boolean;
  archived: boolean;
  description: string | null;
  language: string | null;
  defaultBranch: string;
  pushedAt: string | null;
  topics: string[];
}

export interface TreeEntry {
  path: string;
  type: string;
  size?: number;
}

export interface GitHubSource {
  tree(fullName: string, branch: string): Promise<{ entries: TreeEntry[]; truncated: boolean }>;
  commits(fullName: string): Promise<string[]>;
  file(fullName: string, path: string): Promise<string | null>;
  languages(fullName: string): Promise<Record<string, number>>;
}

const MAX_PATHS = 2000;

/** Read one repository into a snapshot. File bodies are limited to the selected set. */
export async function scanRepo(source: GitHubSource, meta: RepoMeta): Promise<RepoSnapshot> {
  const [languages, tree, commits] = await Promise.all([
    source.languages(meta.fullName).catch(() => ({})),
    source.tree(meta.fullName, meta.defaultBranch).catch(() => ({ entries: [], truncated: false })),
    source.commits(meta.fullName).catch(() => []),
  ]);
  const entries = tree.entries;
  const truncated = tree.truncated;
  const visible = entries.filter((entry) => entry.path && !isIgnoredPath(entry.path)).slice(0, MAX_PATHS);
  const selected = selectFiles(visible);
  const files: Record<string, string> = {};
  await Promise.all(
    selected.read.map(async (filePath) => {
      const text = await source.file(meta.fullName, filePath).catch(() => null);
      if (text) files[filePath] = text.slice(0, 60_000);
    }),
  );
  return {
    name: meta.name,
    fullName: meta.fullName,
    private: meta.private,
    fork: meta.fork,
    archived: meta.archived,
    description: meta.description ?? "",
    language: meta.language,
    languages: Object.keys(languages).length > 0 ? languages : meta.language ? { [meta.language]: 1 } : {},
    topics: meta.topics,
    pushedAt: meta.pushedAt,
    paths: visible.map((entry) => entry.path),
    files,
    commits: commits.slice(0, 30),
    secretsSkipped: selected.secretsSkipped,
    treeTruncated: truncated,
  };
}

export async function scanAll(
  source: GitHubSource,
  metas: RepoMeta[],
  concurrency: number,
  onRepo?: (name: string) => void,
): Promise<{ snapshots: RepoSnapshot[]; failed: string[] }> {
  const results = await mapPool(metas, concurrency, async (meta) => {
    onRepo?.(meta.name);
    try {
      return { snapshot: await scanRepo(source, meta), error: null as string | null };
    } catch (error) {
      const message = error instanceof Error ? error.message : "scan failed";
      return { snapshot: null, error: `${meta.name}: ${redact(message).slice(0, 160)}` };
    }
  });
  return {
    snapshots: results.flatMap((result) => (result.snapshot ? [result.snapshot] : [])),
    failed: results.flatMap((result) => (result.error ? [result.error] : [])),
  };
}
