import { readFileSync } from "node:fs";
import { isIgnoredPath, selectFiles } from "./selectFiles.js";
import type { RepoSnapshot } from "./scan.js";

export interface FixtureRepo {
  name: string;
  description?: string;
  private?: boolean;
  fork?: boolean;
  archived?: boolean;
  language?: string | null;
  languages?: Record<string, number>;
  topics?: string[];
  pushedAt?: string | null;
  paths?: string[];
  files?: Record<string, string>;
  commits?: string[];
}

export interface Fixture {
  login: string;
  repos: FixtureRepo[];
}

export function loadFixture(filePath: string): Fixture {
  const parsed = JSON.parse(readFileSync(filePath, "utf8")) as Partial<Fixture>;
  if (!parsed.login || !Array.isArray(parsed.repos)) {
    throw new Error("Fixture JSON needs a login and a repos array.");
  }
  return { login: parsed.login, repos: parsed.repos };
}

/** Build snapshots the same way a live scan would: secret paths are not read. */
export function snapshotsFromFixture(login: string, repos: FixtureRepo[]): RepoSnapshot[] {
  return repos.map((repo) => {
    const declared = [...new Set([...(repo.paths ?? []), ...Object.keys(repo.files ?? {})])];
    const visible = declared.filter((filePath) => !isIgnoredPath(filePath));
    const selected = selectFiles(visible.map((filePath) => ({ path: filePath, type: "blob", size: repo.files?.[filePath]?.length })));
    const files: Record<string, string> = {};
    for (const filePath of selected.read) {
      const text = repo.files?.[filePath];
      if (text) files[filePath] = text;
    }
    return {
      name: repo.name,
      fullName: `${login}/${repo.name}`,
      private: repo.private === true,
      fork: repo.fork === true,
      archived: repo.archived === true,
      description: repo.description ?? "",
      language: repo.language ?? null,
      languages: repo.languages ?? (repo.language ? { [repo.language]: 1 } : {}),
      topics: repo.topics ?? [],
      pushedAt: repo.pushedAt ?? null,
      paths: visible,
      files,
      commits: repo.commits ?? [],
      secretsSkipped: selected.secretsSkipped,
      treeTruncated: false,
    };
  });
}
