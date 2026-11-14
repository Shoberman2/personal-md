import { redact } from "./redact.js";
import type { GitHubSource, RepoMeta, TreeEntry } from "./scan.js";

export interface GitHubClientOptions {
  token?: string;
  fetch?: typeof fetch;
  baseUrl?: string;
}

export class GitHubClient implements GitHubSource {
  readonly token?: string;
  lastRemaining: string | null = null;
  private readonly fetchImpl: typeof fetch;
  private readonly baseUrl: string;

  constructor(options: GitHubClientOptions = {}) {
    this.token = options.token;
    this.fetchImpl = options.fetch ?? fetch;
    this.baseUrl = (options.baseUrl ?? "https://api.github.com").replace(/\/$/, "");
  }

  get hasToken(): boolean {
    return Boolean(this.token);
  }

  async viewer(): Promise<string> {
    const body = await this.getJson("/user");
    const login = stringField(body, "login");
    if (!login) throw new Error("GitHub did not return the authenticated login.");
    return login;
  }

  async listRepos(user: string, visibility: "public" | "all"): Promise<RepoMeta[]> {
    if (visibility === "all") {
      if (!this.token) throw new Error("visibility=all requires a GitHub token (GITHUB_TOKEN, GH_TOKEN, or PERSONAL_MD_GITHUB_TOKEN).");
      const repos = await this.paginate(`/user/repos?visibility=all&affiliation=owner&per_page=100&sort=pushed`);
      return repos.map(parseRepo).filter((repo) => repo.ownerLogin.toLowerCase() === user.toLowerCase()).map(stripOwner);
    }
    const repos = await this.paginate(`/users/${encodeURIComponent(user)}/repos?type=owner&per_page=100&sort=pushed`);
    return repos.map(parseRepo).map(stripOwner);
  }

  async languages(fullName: string): Promise<Record<string, number>> {
    const body = await this.getJson(`/repos/${fullName}/languages`);
    const record = asRecord(body);
    const out: Record<string, number> = {};
    if (!record) return out;
    for (const [key, value] of Object.entries(record)) {
      if (typeof value === "number") out[key] = value;
    }
    return out;
  }

  async tree(fullName: string, branch: string): Promise<{ entries: TreeEntry[]; truncated: boolean }> {
    const response = await this.request(`/repos/${fullName}/git/trees/${encodeURIComponent(branch)}?recursive=1`);
    if (response.status === 404 || response.status === 409) return { entries: [], truncated: false };
    if (!response.ok) {
      await drain(response);
      return { entries: [], truncated: false };
    }
    const body = asRecord(await response.json());
    const tree = Array.isArray(body?.tree) ? body.tree : [];
    const entries: TreeEntry[] = [];
    for (const item of tree) {
      const record = asRecord(item);
      const path = stringField(record, "path");
      const type = stringField(record, "type");
      if (!path || !type) continue;
      const size = typeof record?.size === "number" ? record.size : undefined;
      entries.push({ path, type, size });
    }
    return { entries, truncated: body?.truncated === true };
  }

  async commits(fullName: string): Promise<string[]> {
    const response = await this.request(`/repos/${fullName}/commits?per_page=30`);
    if (!response.ok) {
      await drain(response);
      return [];
    }
    const body = await response.json();
    if (!Array.isArray(body)) return [];
    const messages: string[] = [];
    for (const item of body) {
      const commit = asRecord(asRecord(item)?.commit);
      const message = stringField(commit, "message");
      if (message) messages.push(message);
    }
    return messages;
  }

  async file(fullName: string, path: string): Promise<string | null> {
    const encoded = path.split("/").map((segment) => encodeURIComponent(segment)).join("/");
    const response = await this.request(`/repos/${fullName}/contents/${encoded}`, "application/vnd.github.raw+json");
    if (response.status === 404 || response.status === 403) {
      await drain(response);
      return null;
    }
    if (!response.ok) {
      await drain(response);
      return null;
    }
    return response.text();
  }

  private async paginate(path: string): Promise<unknown[]> {
    const items: unknown[] = [];
    let url: string | null = path;
    while (url) {
      const response = await this.request(url);
      if (response.status === 404) {
        await drain(response);
        throw new Error("GitHub user not found, or the token cannot see that account.");
      }
      if (!response.ok) {
        const detail = (await response.text()).slice(0, 180);
        throw new Error(`GitHub ${response.status} while listing repositories. ${redact(detail)}`);
      }
      const page = await response.json();
      if (!Array.isArray(page)) throw new Error("GitHub repository list was not an array.");
      items.push(...page);
      url = nextLink(response.headers.get("link"));
    }
    return items;
  }

  private async getJson(path: string): Promise<unknown> {
    const response = await this.request(path);
    if (response.status === 404) {
      await drain(response);
      throw new Error("GitHub user not found, or the token cannot see that account.");
    }
    if (!response.ok) {
      const detail = (await response.text()).slice(0, 180);
      throw new Error(`GitHub ${response.status}. ${redact(detail)}`);
    }
    return response.json();
  }

  private async request(path: string, accept = "application/vnd.github+json"): Promise<Response> {
    const url = path.startsWith("http") ? path : `${this.baseUrl}${path}`;
    let lastError = "GitHub request failed.";
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const headers: Record<string, string> = {
        Accept: accept,
        "User-Agent": "personal-md",
        "X-GitHub-Api-Version": "2022-11-28",
      };
      if (this.token) headers.Authorization = `Bearer ${this.token}`;
      const response = await this.fetchImpl(url, { headers });
      const remaining = response.headers.get("x-ratelimit-remaining");
      if (remaining !== null) this.lastRemaining = remaining;
      if (response.status !== 403 && response.status !== 429) return response;
      const retryAfter = Number(response.headers.get("retry-after") ?? "0");
      const text = await response.text();
      const limited = remaining === "0" || response.status === 429 || /rate limit/i.test(text);
      if (!limited || attempt === 3) {
        lastError = `GitHub ${response.status}. ${redact(text.slice(0, 180))}`;
        break;
      }
      await delay((retryAfter > 0 ? retryAfter : 2 ** attempt) * 1000);
    }
    throw new Error(lastError);
  }
}

export function nextLink(header: string | null): string | null {
  if (!header) return null;
  for (const part of header.split(",")) {
    const match = part.match(/<([^>]+)>;\s*rel="next"/);
    if (match?.[1]) return match[1];
  }
  return null;
}

export function githubToken(env: NodeJS.ProcessEnv): string | undefined {
  const token = env.PERSONAL_MD_GITHUB_TOKEN || env.GITHUB_TOKEN || env.GH_TOKEN;
  return token?.trim() ? token.trim() : undefined;
}

export function resolveVisibility(flag: string | undefined, hasToken: boolean): "public" | "all" {
  if (!flag) return hasToken ? "all" : "public";
  if (flag !== "public" && flag !== "all") throw new Error("--visibility must be public or all.");
  if (flag === "all" && !hasToken) throw new Error("--visibility all requires a GitHub token.");
  return flag;
}

interface ParsedRepo extends RepoMeta {
  ownerLogin: string;
}

function parseRepo(value: unknown): ParsedRepo {
  const record = asRecord(value);
  const owner = asRecord(record?.owner);
  const name = stringField(record, "name") ?? "unknown";
  const ownerLogin = stringField(owner, "login") ?? "";
  return {
    name,
    fullName: stringField(record, "full_name") ?? (ownerLogin ? `${ownerLogin}/${name}` : name),
    private: record?.private === true,
    fork: record?.fork === true,
    archived: record?.archived === true,
    description: stringField(record, "description"),
    language: stringField(record, "language"),
    defaultBranch: stringField(record, "default_branch") ?? "HEAD",
    pushedAt: stringField(record, "pushed_at"),
    topics: Array.isArray(record?.topics) ? record.topics.filter((topic): topic is string => typeof topic === "string") : [],
    ownerLogin,
  };
}

function stripOwner(repo: ParsedRepo): RepoMeta {
  return {
    name: repo.name,
    fullName: repo.fullName,
    private: repo.private,
    fork: repo.fork,
    archived: repo.archived,
    description: repo.description,
    language: repo.language,
    defaultBranch: repo.defaultBranch,
    pushedAt: repo.pushedAt,
    topics: repo.topics,
  };
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function stringField(record: unknown, key: string): string | null {
  const value = asRecord(record)?.[key];
  return typeof value === "string" && value.trim() ? value : null;
}

async function drain(response: Response): Promise<void> {
  await response.text().catch(() => undefined);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
