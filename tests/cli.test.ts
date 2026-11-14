import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import { main } from "../src/cli.js";
import { parse } from "../src/parse.js";
import { GitHubClient, nextLink, resolveVisibility } from "../src/github.js";
import { scanRepo, type GitHubSource, type RepoMeta } from "../src/scan.js";

describe("visibility", () => {
  it("includes private repos only when a token is present and visibility is all", () => {
    assert.equal(resolveVisibility(undefined, false), "public");
    assert.equal(resolveVisibility(undefined, true), "all");
    assert.equal(resolveVisibility("public", true), "public");
    assert.throws(() => resolveVisibility("all", false), /token/);
  });
});

describe("github client", () => {
  it("follows link headers and sends the bearer token", async () => {
    const seen: { url: string; auth: string | null }[] = [];
    const fetchImpl: typeof fetch = async (input, init) => {
      const url = String(input);
      const headers = new Headers(init?.headers);
      seen.push({ url, auth: headers.get("authorization") });
      if (url.endsWith("/user/repos?visibility=all&affiliation=owner&per_page=100&sort=pushed")) {
        return new Response(JSON.stringify([{ name: "one", full_name: "ada/one", private: true, owner: { login: "ada" }, default_branch: "main" }]), {
          status: 200,
          headers: { link: '<https://api.github.com/page-2>; rel="next"' },
        });
      }
      return new Response(JSON.stringify([{ name: "two", full_name: "ada/two", private: false, owner: { login: "ada" }, default_branch: "main" }]), {
        status: 200,
      });
    };
    const client = new GitHubClient({ token: "ghp_exampletokenvalue123456", fetch: fetchImpl, baseUrl: "https://api.github.com" });
    const repos = await client.listRepos("ada", "all");
    assert.deepEqual(repos.map((repo) => repo.name), ["one", "two"]);
    assert.equal(repos[0]?.private, true);
    assert.ok(seen.every((call) => call.auth === "Bearer ghp_exampletokenvalue123456"));
    assert.equal(nextLink('<https://api.github.com/page-2>; rel="next"'), "https://api.github.com/page-2");
  });
});

describe("scan", () => {
  it("does not request secret files", async () => {
    const requested: string[] = [];
    const source: GitHubSource = {
      async languages() {
        return { TypeScript: 10 };
      },
      async tree() {
        return {
          truncated: false,
          entries: [
            { path: "README.md", type: "blob", size: 20 },
            { path: "package.json", type: "blob", size: 20 },
            { path: ".env", type: "blob", size: 20 },
            { path: "src/index.ts", type: "blob", size: 20 },
          ],
        };
      },
      async commits() {
        return ["feat: start"];
      },
      async file(_full, path) {
        requested.push(path);
        if (path.includes(".env")) throw new Error("secret requested");
        return path === "package.json" ? '{"name":"demo","type":"module"}' : "# Demo\n";
      },
    };
    const meta: RepoMeta = {
      name: "demo",
      fullName: "ada/demo",
      private: false,
      fork: false,
      archived: false,
      description: "",
      language: "TypeScript",
      defaultBranch: "main",
      pushedAt: null,
      topics: [],
    };
    const snapshot = await scanRepo(source, meta);
    assert.deepEqual(requested.sort(), ["README.md", "package.json"]);
    assert.equal(snapshot.secretsSkipped, 1);
    assert.equal(snapshot.files[".env"], undefined);
  });
});

describe("cli", () => {
  it("writes a profile from a fixture and refuses to init over it", async () => {
    const dir = mkdtempSync(join(tmpdir(), "personal-md-"));
    const out = join(dir, "personal.md");
    const logs: string[] = [];
    const code = await main([
      "init",
      "--fixture",
      new URL("../fixtures/ada.json", import.meta.url).pathname,
      "--out",
      out,
      "--now",
      "2026-01-01T00:00:00.000Z",
      "--visibility",
      "public",
    ], {
      stdout: (text) => logs.push(text),
      stderr: (text) => logs.push(text),
      env: {},
    });
    assert.equal(code, 0);
    const text = readFileSync(out, "utf8");
    assert.match(text, /schema: personal-md\/v1/);
    assert.equal(text.includes("secret-client"), false);
    const again = await main(["init", "--fixture", new URL("../fixtures/ada.json", import.meta.url).pathname, "--out", out], {
      stdout: () => undefined,
      stderr: (text) => logs.push(text),
      env: {},
    });
    assert.equal(again, 1);
    assert.match(logs.join("\n"), /Refusing to overwrite/);
    rmSync(dir, { recursive: true, force: true });
  });

  it("learns from feedback and leaves a low-confidence proposal pending", async () => {
    const dir = mkdtempSync(join(tmpdir(), "personal-md-"));
    const out = join(dir, "personal.md");
    const io = { stdout: () => undefined, stderr: () => undefined, env: {} as NodeJS.ProcessEnv };
    assert.equal(await main(["analyze", "--fixture", new URL("../fixtures/ada.json", import.meta.url).pathname, "--out", out, "--now", "2026-01-01T00:00:00.000Z"], io), 0);
    assert.equal(await main(["learn", "--file", out, "--feedback", "rejected the purple gradient because it feels loud", "--now", "2026-01-03T00:00:00.000Z"], io), 0);
    const learned = readFileSync(out, "utf8");
    assert.match(learned, /feedback\.purple-gradient/);
    assert.match(learned, /it feels loud/);
    const stderr: string[] = [];
    const code = await main([
      "propose",
      "--file",
      out,
      "--rule",
      "design.typography.serif",
      "--statement",
      "Prefer a serif for long reading.",
      "--confidence",
      "0.7",
      "--now",
      "2026-01-04T00:00:00.000Z",
      "--auto-apply",
      "0.85",
    ], { stdout: () => undefined, stderr: (text) => stderr.push(text), env: {} });
    assert.equal(code, 0);
    assert.match(stderr.join("\n"), /Pending prop_/);
    const proposed = readFileSync(out, "utf8");
    assert.match(proposed, /Prefer a serif for long reading/);
    assert.match(proposed, /"status": "pending"/);
    const parsed = parse(proposed);
    assert.equal(parsed.proposals.some((proposal) => proposal.status === "pending"), true);
    assert.equal(parsed.rules.some((rule) => rule.id === "design.typography.serif"), false);
    rmSync(dir, { recursive: true, force: true });
  });
});
