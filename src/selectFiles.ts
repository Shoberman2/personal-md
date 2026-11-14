import { basename } from "./util.js";

const IGNORED_SEGMENTS = new Set([
  "node_modules",
  "dist",
  "build",
  "coverage",
  ".next",
  ".git",
  "vendor",
  "__pycache__",
  "venv",
  ".venv",
]);

/** True when a path should not be downloaded or quoted. */
export function isSecretPath(filePath: string): boolean {
  const base = basename(filePath).toLowerCase();
  if (base.startsWith(".env") && base !== ".env.example") return true;
  if (/\.(pem|key|p12|pfx)$/.test(base)) return true;
  if (base === ".npmrc" || base === ".netrc" || base === "id_rsa" || base === "id_dsa") return true;
  if (/(secret|credential|service-account|serviceaccount)/i.test(base)) return true;
  return false;
}

export function isIgnoredPath(filePath: string): boolean {
  return filePath.split("/").some((segment) => IGNORED_SEGMENTS.has(segment));
}

interface Ranked {
  path: string;
  rank: number;
}

const RANK: Record<string, number> = {
  "readme.md": 0,
  "readme.rst": 1,
  "package.json": 10,
  "tsconfig.json": 20,
  "tsconfig.base.json": 21,
  "biome.json": 30,
  ".prettierrc": 31,
  ".prettierrc.json": 31,
  ".prettierrc.yml": 31,
  ".prettierrc.yaml": 31,
  ".prettierrc.js": 31,
  "prettier.config.js": 31,
  "prettier.config.mjs": 31,
  "eslint.config.js": 32,
  "eslint.config.mjs": 32,
  "eslint.config.ts": 32,
  ".eslintrc": 33,
  ".eslintrc.json": 33,
  ".eslintrc.cjs": 33,
  ".eslintrc.yml": 33,
  ".editorconfig": 34,
  "vercel.json": 40,
  "netlify.toml": 41,
  "fly.toml": 42,
  "wrangler.toml": 43,
  "render.yaml": 44,
  dockerfile: 45,
  "components.json": 50,
  "tailwind.config.js": 51,
  "tailwind.config.ts": 51,
  "tailwind.config.mjs": 51,
  "postcss.config.js": 52,
  "postcss.config.mjs": 52,
  "pyproject.toml": 60,
  "requirements.txt": 61,
  "cargo.toml": 62,
  "go.mod": 63,
  "next.config.js": 70,
  "next.config.ts": 70,
  "next.config.mjs": 70,
  "vite.config.ts": 71,
  "astro.config.mjs": 72,
  "claude.md": 80,
  "agents.md": 81,
  ".mcp.json": 82,
  license: 90,
  "license.md": 90,
};

const CSS_PREFER = [
  "app/globals.css",
  "src/app/globals.css",
  "src/index.css",
  "src/styles.css",
  "styles/globals.css",
  "style.css",
  "styles.css",
];

export interface SelectedFiles {
  read: string[];
  secretsSkipped: number;
}

/**
 * Pick a small set of text files to read. Secret-like paths are counted
 * and never returned. Lockfiles and vendored trees are ignored.
 */
export function selectFiles(
  entries: { path: string; type?: string; size?: number }[],
  limit = 12,
): SelectedFiles {
  let secretsSkipped = 0;
  const files: { path: string; size?: number }[] = [];
  for (const entry of entries) {
    if (entry.type && entry.type !== "blob" && entry.type !== "file") continue;
    if (isSecretPath(entry.path)) {
      secretsSkipped += 1;
      continue;
    }
    if (isIgnoredPath(entry.path)) continue;
    if (entry.size !== undefined && entry.size > 120_000) continue;
    files.push({ path: entry.path, size: entry.size });
  }

  const ranked: Ranked[] = [];
  const packageJsons: Ranked[] = [];
  for (const file of files) {
    const base = basename(file.path).toLowerCase();
    const depth = file.path.split("/").length;
    if (base === "package.json") {
      packageJsons.push({ path: file.path, rank: depth });
      continue;
    }
    if (base in RANK && depth <= 4) {
      ranked.push({ path: file.path, rank: (RANK[base] ?? 50) + depth });
    }
    if (file.path === "supabase/config.toml") {
      ranked.push({ path: file.path, rank: 46 });
    }
  }
  packageJsons.sort((a, b) => a.rank - b.rank || a.path.localeCompare(b.path));
  for (const file of packageJsons.slice(0, 3)) ranked.push({ path: file.path, rank: 10 + file.rank });

  const known = new Set(ranked.map((item) => item.path));
  const css = CSS_PREFER.find((candidate) => files.some((file) => file.path === candidate));
  if (css && !known.has(css)) ranked.push({ path: css, rank: 55 });
  else if (![...known].some((filePath) => /\.(css|scss)$/i.test(filePath))) {
    const anyCss = files.find((file) => /\.(css|scss)$/i.test(file.path) && file.path.split("/").length <= 3);
    if (anyCss) ranked.push({ path: anyCss.path, rank: 56 });
  }

  ranked.sort((a, b) => a.rank - b.rank || a.path.localeCompare(b.path));
  const read: string[] = [];
  const seen = new Set<string>();
  for (const item of ranked) {
    if (seen.has(item.path)) continue;
    seen.add(item.path);
    read.push(item.path);
    if (read.length >= limit) break;
  }
  return { read, secretsSkipped };
}
