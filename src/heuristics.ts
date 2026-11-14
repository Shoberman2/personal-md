import { Bag, finalize, label, type Draft } from "./drafts.js";
import type { RepoSnapshot } from "./scan.js";
import type { Rule } from "./types.js";
import { basename, hasPathSegment, type Salience } from "./util.js";

const FRAMEWORKS: { dep: string; id: string; name: string }[] = [
  { dep: "next", id: "stack.framework.next", name: "Next.js" },
  { dep: "vue", id: "stack.framework.vue", name: "Vue" },
  { dep: "svelte", id: "stack.framework.svelte", name: "Svelte" },
  { dep: "astro", id: "stack.framework.astro", name: "Astro" },
  { dep: "vite", id: "stack.tool.vite", name: "Vite" },
  { dep: "express", id: "stack.framework.express", name: "Express" },
  { dep: "fastify", id: "stack.framework.fastify", name: "Fastify" },
  { dep: "hono", id: "stack.framework.hono", name: "Hono" },
];

const UI_LIBS: { test: (deps: string[]) => boolean; id: string; name: string }[] = [
  { test: (deps) => deps.includes("tailwindcss"), id: "stack.ui.tailwind", name: "Tailwind CSS" },
  { test: (deps) => deps.some((dep) => dep.startsWith("@radix-ui/")), id: "stack.ui.radix", name: "Radix UI" },
  { test: (deps) => deps.includes("@mui/material"), id: "stack.ui.mui", name: "MUI" },
  { test: (deps) => deps.includes("@chakra-ui/react"), id: "stack.ui.chakra", name: "Chakra UI" },
  { test: (deps) => deps.includes("styled-components") || deps.includes("@emotion/react"), id: "stack.ui.css-in-js", name: "CSS-in-JS" },
];

const TEST_LIBS: { dep: string; id: string; name: string }[] = [
  { dep: "vitest", id: "stack.test.vitest", name: "Vitest" },
  { dep: "jest", id: "stack.test.jest", name: "Jest" },
  { dep: "playwright", id: "stack.test.playwright", name: "Playwright" },
  { dep: "@playwright/test", id: "stack.test.playwright", name: "Playwright" },
  { dep: "pytest", id: "stack.test.pytest", name: "pytest" },
];

const DEDICATED_DEPS = new Set([
  "next",
  "react",
  "react-dom",
  "vue",
  "svelte",
  "astro",
  "vite",
  "express",
  "fastify",
  "hono",
  "tailwindcss",
  "typescript",
  "eslint",
  "prettier",
  "vitest",
  "jest",
  "playwright",
  "@playwright/test",
]);

const GENERIC_FONTS = new Set(["serif", "sans-serif", "monospace", "system-ui", "inherit", "initial", "unset", "emoji", "cursive", "fantasy", "ui-sans-serif", "ui-serif", "ui-monospace"]);

const CONVENTIONAL = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([^)]+\))?(!)?:\s+\S/;

interface RepoFacts {
  snapshot: RepoSnapshot;
  deps: string[];
  devDeps: string[];
  pkg: Record<string, unknown> | null;
  readme: string;
  haystack: string;
  node: boolean;
}

/** Infer rules from repository snapshots. No network and no model. */
export function inferRules(snapshots: RepoSnapshot[], now: string): Rule[] {
  const facts = snapshots.map(factsFor);
  const drafts: Draft[] = [];
  const total = snapshots.length;
  if (total === 0) return [];

  pushLanguages(drafts, facts);
  pushPackageManagers(drafts, facts);
  pushFrameworks(drafts, facts);
  pushDependencies(drafts, facts);
  pushCodeStyle(drafts, facts);
  pushCommits(drafts, facts);
  pushNaming(drafts, facts);
  pushStructure(drafts, facts);
  pushCopy(drafts, facts);
  pushDesign(drafts, facts);
  pushDeploy(drafts, facts);
  pushAgents(drafts, facts);
  pushPhrases(drafts, facts);
  return finalize(drafts, now);
}

function factsFor(snapshot: RepoSnapshot): RepoFacts {
  const pkgText = rootText(snapshot, "package.json");
  const pkg = parseJson(pkgText);
  const deps = names(pkg?.dependencies);
  const devDeps = names(pkg?.devDependencies);
  const peer = names(pkg?.peerDependencies);
  const all = [...new Set([...deps, ...devDeps, ...peer])];
  const readme = rootText(snapshot, "readme.md") || rootText(snapshot, "readme.rst") || "";
  const haystack = [snapshot.description, readme.slice(0, 8000), snapshot.topics.join(" "), snapshot.paths.slice(0, 400).join(" ")]
    .join("\n")
    .toLowerCase();
  return { snapshot, deps: all, devDeps, pkg, readme, haystack, node: pkg !== null };
}

function pushLanguages(drafts: Draft[], facts: RepoFacts[]): void {
  const bytes = new Map<string, number>();
  const primary = new Map<string, string[]>();
  let codeRepos = 0;
  for (const fact of facts) {
    const langs = fact.snapshot.languages;
    const entries = Object.entries(langs).filter(([, count]) => count > 0);
    for (const [language, count] of entries) bytes.set(language, (bytes.get(language) ?? 0) + count);
    const top = entries.sort((a, b) => b[1] - a[1])[0]?.[0] ?? fact.snapshot.language;
    if (!top) continue;
    codeRepos += 1;
    const list = primary.get(top) ?? [];
    list.push(fact.snapshot.name);
    primary.set(top, list);
  }
  const totalBytes = [...bytes.values()].reduce((sum, count) => sum + count, 0) || 1;
  const ranked = [...primary.entries()].sort((a, b) => b[1].length - a[1].length || (bytes.get(b[0]) ?? 0) - (bytes.get(a[0]) ?? 0));
  for (const [language, repos] of ranked.slice(0, 4)) {
    const share = Math.round(((bytes.get(language) ?? 0) / totalBytes) * 100);
    const ratio = repos.length / codeRepos;
    const id = `stack.language.${slugLang(language)}`;
    const prefer = ratio >= 0.45;
    drafts.push({
      id,
      section: "stack",
      polarity: prefer ? "prefer" : "note",
      salience: "trend",
      hits: repos.length,
      total: codeRepos,
      sources: repos,
      signals: [`${share}% of detected bytes`, `primary language in ${repos.length} repos`],
      evidenceLabel: label(repos.length, codeRepos, "repos with a primary language"),
      statement: prefer
        ? `Default to ${language}. It is the primary language in ${repos.length} of ${codeRepos} repos (${share}% of detected bytes).`
        : `${language} is a primary language in ${repos.length} of ${codeRepos} repos (${share}% of detected bytes). Not enough to treat as the default.`,
      forcePolarity: prefer ? "prefer" : "note",
      forceKind: prefer ? "rule" : "observation",
    });
  }
}

function pushPackageManagers(drafts: Draft[], facts: RepoFacts[]): void {
  const bags = {
    npm: new Bag(),
    pnpm: new Bag(),
    yarn: new Bag(),
    bun: new Bag(),
  };
  let node = 0;
  for (const fact of facts) {
    if (!fact.node && !fact.snapshot.paths.some((filePath) => /lock/i.test(basename(filePath)) || basename(filePath) === "package.json")) continue;
    if (fact.node || fact.snapshot.paths.some((filePath) => basename(filePath) === "package.json")) node += 1;
    const paths = fact.snapshot.paths.map((filePath) => basename(filePath).toLowerCase());
    const manager = String(fact.pkg?.packageManager ?? "");
    if (paths.includes("pnpm-lock.yaml") || manager.startsWith("pnpm")) bags.pnpm.add(fact.snapshot.name, "pnpm-lock.yaml");
    else if (paths.includes("yarn.lock") || manager.startsWith("yarn")) bags.yarn.add(fact.snapshot.name, "yarn.lock");
    else if (paths.includes("bun.lock") || paths.includes("bun.lockb") || manager.startsWith("bun")) bags.bun.add(fact.snapshot.name, "bun lockfile");
    else if (paths.includes("package-lock.json") || fact.node) bags.npm.add(fact.snapshot.name, "package-lock.json or package.json");
  }
  const entries = Object.entries(bags).sort((a, b) => b[1].hits - a[1].hits);
  const [leader, bag] = entries[0] ?? [];
  if (!leader || !bag || node === 0) return;
  const second = entries[1]?.[1].hits ?? 0;
  const ratio = bag.hits / node;
  if (ratio >= 0.6 && bag.hits >= second) {
    drafts.push({
      id: `stack.pkg.${leader}`,
      section: "stack",
      polarity: "prefer",
      salience: "config",
      hits: bag.hits,
      total: node,
      sources: bag.repos,
      signals: bag.signals,
      evidenceLabel: label(bag.hits, node, "Node repos"),
      statement: `Use ${leader} as the default package manager.`,
    });
  }
}

function pushFrameworks(drafts: Draft[], facts: RepoFacts[]): void {
  const next = new Bag();
  const react = new Bag();
  const reactWithoutNext = new Bag();
  for (const fact of facts) {
    if (fact.deps.includes("next") || fact.snapshot.paths.some((filePath) => basename(filePath).startsWith("next.config"))) {
      next.add(fact.snapshot.name, "next dependency or next.config");
    }
    if (fact.deps.includes("react")) react.add(fact.snapshot.name, "react dependency");
    if (fact.deps.includes("react") && !fact.deps.includes("next")) reactWithoutNext.add(fact.snapshot.name, "react without next");
  }
  if (next.hits > 0) {
    drafts.push({
      id: "stack.framework.next",
      section: "stack",
      polarity: "prefer",
      salience: "config",
      hits: next.hits,
      total: facts.length,
      sources: next.repos,
      signals: [...next.signals, ...(react.hits === next.hits && next.hits > 0 ? ["React is present wherever Next.js is"] : [])],
      evidenceLabel: label(next.hits, facts.length, "repos"),
      statement: "When the work is a web UI, prefer Next.js.",
    });
  }
  if (react.hits > 0 && reactWithoutNext.hits > 0) {
    drafts.push({
      id: "stack.framework.react",
      section: "stack",
      polarity: "prefer",
      salience: "config",
      hits: react.hits,
      total: facts.length,
      sources: react.repos,
      signals: [`React in ${react.hits} repos`, `${reactWithoutNext.hits} of those are not Next.js`],
      evidenceLabel: label(react.hits, facts.length, "repos"),
      statement: "When the work is a web UI, prefer React.",
    });
  }
  for (const framework of FRAMEWORKS) {
    if (framework.dep === "next") continue;
    const bag = new Bag();
    for (const fact of facts) {
      if (fact.deps.includes(framework.dep)) bag.add(fact.snapshot.name, framework.dep);
    }
    if (bag.hits === 0) continue;
    drafts.push({
      id: framework.id,
      section: "stack",
      polarity: "prefer",
      salience: "config",
      hits: bag.hits,
      total: facts.length,
      sources: bag.repos,
      signals: bag.signals,
      evidenceLabel: label(bag.hits, facts.length, "repos"),
      statement: `When it fits the project, prefer ${framework.name}.`,
    });
  }
  for (const lib of UI_LIBS) {
    const bag = new Bag();
    for (const fact of facts) {
      if (lib.test(fact.deps) || (lib.id === "stack.ui.tailwind" && fact.snapshot.paths.some((filePath) => basename(filePath).startsWith("tailwind.config")))) {
        bag.add(fact.snapshot.name, lib.name);
      }
    }
    if (lib.id === "stack.ui.tailwind") {
      for (const fact of facts) {
        if (fact.snapshot.paths.some((filePath) => basename(filePath) === "components.json")) bag.add(fact.snapshot.name, "components.json");
      }
    }
    if (bag.hits === 0) continue;
    const statement = lib.id === "stack.ui.tailwind"
      ? "Prefer Tailwind CSS utility classes for styling."
      : `Prefer ${lib.name} when a component library is needed.`;
    drafts.push({
      id: lib.id,
      section: "stack",
      polarity: "prefer",
      salience: "config",
      hits: bag.hits,
      total: facts.length,
      sources: bag.repos,
      signals: bag.signals,
      evidenceLabel: label(bag.hits, facts.length, "repos"),
      statement,
    });
  }
  const tests = new Map<string, Bag>();
  for (const lib of TEST_LIBS) {
    for (const fact of facts) {
      if (!fact.deps.includes(lib.dep) && !(lib.dep === "pytest" && /pytest/.test(joined(fact, "pyproject.toml", "requirements.txt")))) continue;
      const bag = tests.get(lib.id) ?? new Bag();
      bag.add(fact.snapshot.name, lib.name);
      tests.set(lib.id, bag);
    }
  }
  for (const [id, bag] of tests) {
    const name = TEST_LIBS.find((lib) => lib.id === id)?.name ?? id;
    drafts.push({
      id,
      section: "stack",
      polarity: "prefer",
      salience: "config",
      hits: bag.hits,
      total: facts.length,
      sources: bag.repos,
      signals: bag.signals,
      evidenceLabel: label(bag.hits, facts.length, "repos"),
      statement: `Prefer ${name} for tests.`,
    });
  }
}

function pushDependencies(drafts: Draft[], facts: RepoFacts[]): void {
  const counts = new Map<string, string[]>();
  for (const fact of facts) {
    for (const dep of fact.deps) {
      if (dep.startsWith("@types/")) continue;
      if (DEDICATED_DEPS.has(dep)) continue;
      const repos = counts.get(dep) ?? [];
      if (!repos.includes(fact.snapshot.name)) repos.push(fact.snapshot.name);
      counts.set(dep, repos);
    }
  }
  const recurring = [...counts.entries()]
    .filter(([, repos]) => repos.length >= 2)
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .slice(0, 6);
  if (recurring.length === 0) return;
  const hits = new Set(recurring.flatMap(([, repos]) => repos)).size;
  drafts.push({
    id: "stack.deps.recurring",
    section: "stack",
    polarity: "note",
    salience: "trend",
    hits,
    total: facts.length,
    sources: [...new Set(recurring.flatMap(([, repos]) => repos))],
    signals: recurring.map(([dep, repos]) => `${dep} in ${repos.length} repos`),
    evidenceLabel: label(hits, facts.length, "repos"),
    statement: `Packages that keep showing up: ${recurring.map(([dep]) => dep).join(", ")}.`,
    forcePolarity: "note",
  });
}

function pushCodeStyle(drafts: Draft[], facts: RepoFacts[]): void {
  const nodeRepos = facts.filter((fact) => fact.node);
  const strict = new Bag();
  const tsconfigs = new Bag();
  const esm = new Bag();
  const eslint = new Bag();
  const prettier = new Bag();
  const biome = new Bag();
  const single = new Bag();
  const double = new Bag();
  const semi = new Bag();
  const noSemi = new Bag();
  const ruff = new Bag();
  for (const fact of facts) {
    const tsconfig = parseJsonc(rootText(fact.snapshot, "tsconfig.json") || rootText(fact.snapshot, "tsconfig.base.json"));
    if (tsconfig) {
      tsconfigs.add(fact.snapshot.name, "tsconfig.json");
      const options = asRecord(tsconfig.compilerOptions);
      if (options?.strict === true) strict.add(fact.snapshot.name, "compilerOptions.strict true");
    }
    if (fact.pkg?.type === "module") esm.add(fact.snapshot.name, '"type": "module"');
    if (fact.deps.includes("eslint") || hasConfig(fact, ["eslint.config.js", "eslint.config.mjs", "eslint.config.ts", ".eslintrc", ".eslintrc.json", ".eslintrc.cjs"])) {
      eslint.add(fact.snapshot.name, "eslint");
    }
    const prettierText = prettierTextOf(fact.snapshot);
    if (prettierText !== null || fact.deps.includes("prettier")) prettier.add(fact.snapshot.name, "prettier");
    if (prettierText) {
      const config: Record<string, unknown> = parseJsonc(prettierText) ?? {};
      if (config.singleQuote === true) single.add(fact.snapshot.name, "singleQuote true");
      if (config.singleQuote === false) double.add(fact.snapshot.name, "singleQuote false");
      if (config.semi === true) semi.add(fact.snapshot.name, "semi true");
      if (config.semi === false) noSemi.add(fact.snapshot.name, "semi false");
    }
    const biomeText = rootText(fact.snapshot, "biome.json");
    if (biomeText) {
      biome.add(fact.snapshot.name, "biome.json");
      const biomeJson = parseJson(biomeText);
      const quote = asRecord(asRecord(biomeJson?.javascript)?.formatter)?.quoteStyle;
      if (quote === "single") single.add(fact.snapshot.name, "biome quoteStyle single");
      if (quote === "double") double.add(fact.snapshot.name, "biome quoteStyle double");
    }
    const pyproject = joined(fact, "pyproject.toml");
    if (/\[tool\.ruff/.test(pyproject) || fact.deps.includes("ruff")) ruff.add(fact.snapshot.name, "ruff");
  }
  const nodeTotal = Math.max(nodeRepos.length, 1);
  if (strict.hits > 0) {
    drafts.push({
      id: "code.typescript.strict",
      section: "code",
      polarity: "prefer",
      salience: "config",
      hits: strict.hits,
      total: Math.max(tsconfigs.hits, strict.hits),
      sources: strict.repos,
      signals: strict.signals,
      evidenceLabel: label(strict.hits, Math.max(tsconfigs.hits, strict.hits), "tsconfig files"),
      statement: "Keep TypeScript strict.",
    });
  }
  if (esm.hits > 0 && nodeRepos.length > 0) {
    drafts.push({
      id: "code.module.esm",
      section: "code",
      polarity: "prefer",
      salience: "config",
      hits: esm.hits,
      total: nodeRepos.length,
      sources: esm.repos,
      signals: esm.signals,
      evidenceLabel: label(esm.hits, nodeRepos.length, "Node repos"),
      statement: "Author Node packages as ESM (`\"type\": \"module\"`).",
    });
  }
  if (eslint.hits > 0 && nodeRepos.length > 0) {
    drafts.push({
      id: "code.lint.eslint",
      section: "code",
      polarity: "prefer",
      salience: "config",
      hits: eslint.hits,
      total: nodeTotal,
      sources: eslint.repos,
      signals: eslint.signals,
      evidenceLabel: label(eslint.hits, nodeRepos.length, "Node repos"),
      statement: "Lint TypeScript and JavaScript with ESLint.",
    });
  }
  if (prettier.hits > 0) {
    drafts.push({
      id: "code.format.prettier",
      section: "code",
      polarity: "prefer",
      salience: "config",
      hits: prettier.hits,
      total: Math.max(nodeRepos.length, prettier.hits),
      sources: prettier.repos,
      signals: prettier.signals,
      evidenceLabel: label(prettier.hits, Math.max(nodeRepos.length, prettier.hits), "Node repos"),
      statement: "Format code with Prettier.",
    });
  }
  if (biome.hits > 0 && biome.hits > prettier.hits) {
    drafts.push({
      id: "code.format.biome",
      section: "code",
      polarity: "prefer",
      salience: "config",
      hits: biome.hits,
      total: Math.max(nodeRepos.length, biome.hits),
      sources: biome.repos,
      signals: biome.signals,
      evidenceLabel: label(biome.hits, Math.max(nodeRepos.length, biome.hits), "Node repos"),
      statement: "Format and lint with Biome.",
    });
  }
  pushQuote(drafts, single, double, noSemi, semi);
  if (ruff.hits > 0) {
    drafts.push({
      id: "code.python.ruff",
      section: "code",
      polarity: "prefer",
      salience: "config",
      hits: ruff.hits,
      total: Math.max(1, facts.filter((fact) => primaryIs(fact, "Python") || /pyproject|requirements/.test(fact.snapshot.paths.join(" "))).length),
      sources: ruff.repos,
      signals: ruff.signals,
      evidenceLabel: label(ruff.hits, facts.length, "repos"),
      statement: "Lint Python with Ruff.",
    });
  }
}

function pushQuote(drafts: Draft[], single: Bag, double: Bag, noSemi: Bag, semi: Bag): void {
  if (single.hits + double.hits > 0) {
    const preferSingle = single.hits >= double.hits;
    const bag = preferSingle ? single : double;
    const other = preferSingle ? double.hits : single.hits;
    if (bag.hits > other) {
      drafts.push({
        id: preferSingle ? "code.format.single-quotes" : "code.format.double-quotes",
        section: "code",
        polarity: "prefer",
        salience: "config",
        hits: bag.hits,
        total: single.hits + double.hits,
        sources: bag.repos,
        signals: bag.signals,
        evidenceLabel: label(bag.hits, single.hits + double.hits, "formatter configs"),
        statement: preferSingle ? "Prefer single quotes." : "Prefer double quotes.",
      });
    }
  }
  if (semi.hits + noSemi.hits > 0) {
    const omit = noSemi.hits >= semi.hits;
    const bag = omit ? noSemi : semi;
    const other = omit ? semi.hits : noSemi.hits;
    if (bag.hits > other) {
      drafts.push({
        id: omit ? "code.format.no-semicolons" : "code.format.semicolons",
        section: "code",
        polarity: "prefer",
        salience: "config",
        hits: bag.hits,
        total: semi.hits + noSemi.hits,
        sources: bag.repos,
        signals: bag.signals,
        evidenceLabel: label(bag.hits, semi.hits + noSemi.hits, "formatter configs"),
        statement: omit ? "Omit semicolons." : "Keep semicolons.",
      });
    }
  }
}

function pushCommits(drafts: Draft[], facts: RepoFacts[]): void {
  const bag = new Bag();
  let considered = 0;
  for (const fact of facts) {
    const subjects = fact.snapshot.commits.map(subjectLine).filter(Boolean);
    if (subjects.length < 3) continue;
    considered += 1;
    const matched = subjects.filter((line) => CONVENTIONAL.test(line)).length;
    if (matched / subjects.length >= 0.5) bag.add(fact.snapshot.name, `${matched}/${subjects.length} conventional subjects`);
  }
  if (bag.hits === 0 || considered === 0) return;
  drafts.push({
    id: "code.commits.conventional",
    section: "code",
    polarity: "prefer",
    salience: "trend",
    hits: bag.hits,
    total: considered,
    sources: bag.repos,
    signals: bag.signals,
    evidenceLabel: label(bag.hits, considered, "repos with commit samples"),
    statement: "Write Conventional Commits (`feat:`, `fix:`, `chore:`).",
  });
}

function pushNaming(drafts: Draft[], facts: RepoFacts[]): void {
  let family = 0;
  let camel = 0;
  const sources: string[] = [];
  for (const fact of facts) {
    const style = repoNameStyle(fact.snapshot.name);
    if (style === "kebab" || style === "lower") {
      family += 1;
      sources.push(fact.snapshot.name);
    } else if (style === "camel" || style === "pascal") camel += 1;
  }
  const ratio = family / facts.length;
  if (ratio >= 0.75 && family >= 2) {
    drafts.push({
      id: "naming.repos.lowercase",
      section: "naming",
      polarity: "prefer",
      salience: "trend",
      hits: family,
      total: facts.length,
      sources,
      signals: [`${family} lowercase`, `${camel} camelCase or PascalCase`],
      evidenceLabel: label(family, facts.length, "repos"),
      statement: "Use lowercase repository names, and hyphenate when the name has more than one word.",
    });
  } else if (ratio >= 0.5 && facts.length >= 4) {
    drafts.push({
      id: "naming.repos.mostly-lowercase",
      section: "naming",
      polarity: "note",
      salience: "trend",
      hits: family,
      total: facts.length,
      sources,
      signals: [`${family} lowercase`, `${camel} camelCase or PascalCase`],
      evidenceLabel: label(family, facts.length, "repos"),
      statement: "Repository names are mostly lowercase, but camelCase shows up too. Do not rename existing repos to impose one scheme.",
      forcePolarity: "note",
    });
  }
}

function pushStructure(drafts: Draft[], facts: RepoFacts[]): void {
  const src = new Bag();
  const tests = new Bag();
  const readme = new Bag();
  const contributing = new Bag();
  const license = new Bag();
  const mit = new Bag();
  const docs = new Bag();
  const split = new Bag();
  const install = new Bag();
  const workflow = new Bag();
  const monorepo = new Bag();
  for (const fact of facts) {
    const paths = fact.snapshot.paths;
    if (hasPathSegment(paths, "src")) src.add(fact.snapshot.name, "src/");
    if (hasPathSegment(paths, "test") || hasPathSegment(paths, "tests") || hasPathSegment(paths, "__tests__") || paths.some((filePath) => /\.(test|spec)\.[cm]?[jt]sx?$/.test(filePath))) {
      tests.add(fact.snapshot.name, "test directory or test file");
    }
    if (paths.some((filePath) => /^readme(\.|$)/i.test(basename(filePath)))) readme.add(fact.snapshot.name, "README");
    if (paths.some((filePath) => basename(filePath).toLowerCase() === "contributing.md")) contributing.add(fact.snapshot.name, "CONTRIBUTING.md");
    if (paths.some((filePath) => /^license(\.|$)/i.test(basename(filePath)))) license.add(fact.snapshot.name, "LICENSE");
    const licenseText = rootText(fact.snapshot, "license") || rootText(fact.snapshot, "license.md");
    if (/mit license|permission is hereby granted/i.test(licenseText) || fact.pkg?.license === "MIT") mit.add(fact.snapshot.name, "MIT");
    if (hasPathSegment(paths, "docs")) docs.add(fact.snapshot.name, "docs/");
    if (hasPathSegment(paths, "client") && hasPathSegment(paths, "server")) split.add(fact.snapshot.name, "client/ and server/");
    if (paths.some((filePath) => basename(filePath) === "install.sh")) install.add(fact.snapshot.name, "install.sh");
    if (paths.some((filePath) => filePath.startsWith(".github/workflows/") && /\.ya?ml$/.test(filePath))) workflow.add(fact.snapshot.name, "GitHub Actions workflow");
    if (paths.some((filePath) => basename(filePath) === "pnpm-workspace.yaml" || basename(filePath) === "turbo.json") || Array.isArray(fact.pkg?.workspaces)) {
      monorepo.add(fact.snapshot.name, "workspace file");
    }
  }
  pushBag(drafts, "structure.src", "structure", "prefer", "trend", src, facts.length, "Put implementation code under src/ unless the framework uses another root, such as a Next.js app/ directory.", "repos");
  pushBag(drafts, "structure.tests", "structure", "prefer", "trend", tests, facts.length, "Keep tests in test/ or tests/ next to the code.", "repos");
  pushBag(drafts, "structure.readme", "structure", "prefer", "config", readme, facts.length, "Lead every repo with a README that states what it is and how to run it.", "repos");
  pushBag(drafts, "structure.contributing", "structure", "prefer", "config", contributing, facts.length, "Ship a CONTRIBUTING.md with repos that other people are expected to touch.", "repos");
  pushBag(drafts, "structure.docs", "structure", "prefer", "trend", docs, facts.length, "Keep longer documentation in docs/ rather than only in the README.", "repos");
  pushBag(drafts, "structure.client-server", "structure", "note", "config", split, facts.length, "Split larger apps into client/ and server/ when both exist.", "repos", "note");
  pushBag(drafts, "structure.install-script", "structure", "prefer", "config", install, facts.length, "Provide an install.sh for tools people clone and run.", "repos");
  pushBag(drafts, "structure.monorepo", "structure", "note", "config", monorepo, facts.length, "This builder uses a monorepo layout in some repos.", "repos", "note");
  if (mit.hits > 0) {
    const mitRatio = mit.hits / facts.length;
    const mitDefault = mitRatio >= 0.4 && mit.hits >= 2;
    drafts.push({
      id: "structure.license.mit",
      section: "structure",
      polarity: mitDefault ? "prefer" : "note",
      salience: "config",
      hits: mit.hits,
      total: facts.length,
      sources: mit.repos,
      signals: mit.signals,
      evidenceLabel: label(mit.hits, facts.length, "repos"),
      statement: mitDefault
        ? "Use the MIT license unless a repo needs something else."
        : `MIT appears in ${mit.hits} of ${facts.length} repos. Not enough to treat it as the only license.`,
      forcePolarity: mitDefault ? "prefer" : "note",
      forceKind: mitDefault ? "rule" : "observation",
    });
  } else if (license.hits > 0) {
    pushBag(drafts, "structure.license", "structure", "prefer", "config", license, facts.length, "Ship a LICENSE file with the repo.", "repos");
  }
  if (workflow.hits > 0) {
    drafts.push({
      id: "stack.ci.github-actions",
      section: "stack",
      polarity: "prefer",
      salience: "config",
      hits: workflow.hits,
      total: facts.length,
      sources: workflow.repos,
      signals: workflow.signals,
      evidenceLabel: label(workflow.hits, facts.length, "repos"),
      statement: "Use GitHub Actions for CI.",
    });
  }
}

function pushCopy(drafts: Draft[], facts: RepoFacts[]): void {
  const quick = new Bag();
  const direct = new Bag();
  const plain = new Bag();
  const withReadme = new Bag();
  const privacy = new Bag();
  for (const fact of facts) {
    if (!fact.readme.trim()) continue;
    withReadme.add(fact.snapshot.name);
    if (/quick\s*start|getting started/i.test(fact.readme)) quick.add(fact.snapshot.name, "quickstart heading");
    const you = fact.readme.match(/\b(you|your|you're|you'll)\b/gi)?.length ?? 0;
    if (you >= 2) direct.add(fact.snapshot.name);
    const emoji = fact.readme.match(/\p{Extended_Pictographic}/gu)?.length ?? 0;
    if (emoji === 0) plain.add(fact.snapshot.name, "no emoji in README");
    if (/privacy-conscious|privacy conscious|no tracking/i.test(fact.readme)) privacy.add(fact.snapshot.name, "privacy phrasing");
  }
  if (direct.hits > 0) direct.note(`second person in ${direct.hits} READMEs`);
  pushBag(drafts, "copy.readme.quickstart", "copy", "prefer", "trend", quick, Math.max(withReadme.hits, 1), "Open READMEs with what it is and a short quickstart.", "READMEs");
  pushBag(drafts, "copy.tone.direct", "copy", "prefer", "trend", direct, Math.max(withReadme.hits, 1), "Write to the reader directly (you/your), in a practical voice.", "READMEs");
  if (withReadme.hits >= 3 && plain.hits / withReadme.hits >= 0.75) {
    drafts.push({
      id: "copy.tone.few-emoji",
      section: "copy",
      polarity: "prefer",
      salience: "trend",
      hits: plain.hits,
      total: withReadme.hits,
      sources: plain.repos,
      signals: plain.signals,
      evidenceLabel: label(plain.hits, withReadme.hits, "READMEs"),
      statement: "Keep product copy and READMEs plain. Emoji are rare in the existing ones.",
    });
  }
  if (privacy.hits > 0) {
    drafts.push({
      id: "copy.privacy",
      section: "copy",
      polarity: "note",
      salience: "trend",
      hits: privacy.hits,
      total: facts.length,
      sources: privacy.repos,
      signals: privacy.signals,
      evidenceLabel: label(privacy.hits, facts.length, "repos"),
      statement: privacy.hits >= 2
        ? "Mention privacy constraints in the product copy when the tool handles personal data."
        : "One repo emphasizes privacy. Not enough to treat as a default.",
      forcePolarity: "note",
    });
  }
}

function pushDesign(drafts: Draft[], facts: RepoFacts[]): void {
  const deps = facts.map((fact) => medianDeps(fact));
  const depCounts = deps.filter((count): count is number => count !== null);
  if (depCounts.length >= 3) {
    const sorted = [...depCounts].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)] ?? 0;
    if (median <= 15) {
      drafts.push({
        id: "design.minimalism.small-dependency-surface",
        section: "design",
        polarity: "prefer",
        salience: "trend",
        hits: depCounts.length,
        total: depCounts.length,
        sources: facts.filter((fact) => fact.node).map((fact) => fact.snapshot.name),
        signals: [`median production dependencies: ${median}`],
        evidenceLabel: label(depCounts.length, depCounts.length, "Node repos"),
        statement: "Prefer a small dependency surface.",
      });
    }
  }

  const colorRepos = new Map<string, string[]>();
  const fontRepos = new Map<string, string[]>();
  const appRouter = new Bag();
  const pagesRouter = new Bag();
  const nextRepos = facts.filter((fact) => fact.deps.includes("next") || fact.snapshot.paths.some((filePath) => basename(filePath).startsWith("next.config")));
  let toolish = 0;
  for (const fact of facts) {
    const css = cssText(fact.snapshot);
    const colors = new Set<string>();
    for (const match of css.matchAll(/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g)) {
      const hex = normalizeHex(match[0]);
      if (!hex || isNeutral(hex)) continue;
      colors.add(hex);
    }
    for (const color of colors) {
      const repos = colorRepos.get(color) ?? [];
      repos.push(fact.snapshot.name);
      colorRepos.set(color, repos);
    }
    for (const match of css.matchAll(/font-family:\s*([^;}{]+)/gi)) {
      const family = (match[1] ?? "").split(",")[0]?.replace(/['"]/g, "").trim() ?? "";
      const key = family.toLowerCase();
      if (!key || GENERIC_FONTS.has(key)) continue;
      const repos = fontRepos.get(key) ?? [];
      if (!repos.includes(fact.snapshot.name)) repos.push(fact.snapshot.name);
      fontRepos.set(key, repos);
    }
    if (nextRepos.includes(fact)) {
      if (hasPathSegment(fact.snapshot.paths, "app")) appRouter.add(fact.snapshot.name, "app/");
      if (hasPathSegment(fact.snapshot.paths, "pages")) pagesRouter.add(fact.snapshot.name, "pages/");
    }
    if (!isWebRepo(fact)) toolish += 1;
  }
  const sharedColors = [...colorRepos.entries()]
    .filter(([, repos]) => repos.length >= 2)
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .slice(0, 6);
  if (sharedColors.length > 0) {
    const repos = [...new Set(sharedColors.flatMap(([, names]) => names))];
    const cssRepos = new Set([...colorRepos.values()].flat()).size;
    drafts.push({
      id: "design.color.recurring",
      section: "design",
      polarity: "prefer",
      salience: "trend",
      hits: repos.length,
      total: Math.max(cssRepos, repos.length),
      sources: repos,
      signals: sharedColors.map(([hex, names]) => `${hex} in ${names.length} repos`),
      evidenceLabel: label(repos.length, Math.max(cssRepos, repos.length), "repos with CSS colors"),
      statement: `Prefer these recurring colors when a UI exists: ${sharedColors.map(([hex]) => hex).join(", ")}.`,
    });
  }
  const fonts = [...fontRepos.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
  const topFont = fonts[0];
  if (topFont && topFont[1].length >= 1) {
    const named = fonts.reduce((sum, [, repos]) => sum + (repos.length > 0 ? 1 : 0), 0);
    drafts.push({
      id: "design.typography.recurring",
      section: "design",
      polarity: "prefer",
      salience: "trend",
      hits: topFont[1].length,
      total: Math.max(topFont[1].length, new Set([...fontRepos.values()].flat()).size),
      sources: topFont[1],
      signals: [`font-family ${topFont[0]}`, named > 1 ? `${named} named families seen` : "one named family"],
      evidenceLabel: label(topFont[1].length, Math.max(new Set([...fontRepos.values()].flat()).size, 1), "repos with a named font"),
      statement: `Prefer ${displayFont(topFont[0])} for UI text.`,
    });
  }
  if (nextRepos.length > 0 && appRouter.hits > pagesRouter.hits) {
    drafts.push({
      id: "design.layout.app-router",
      section: "design",
      polarity: "prefer",
      salience: "config",
      hits: appRouter.hits,
      total: nextRepos.length,
      sources: appRouter.repos,
      signals: appRouter.signals,
      evidenceLabel: label(appRouter.hits, nextRepos.length, "Next.js repos"),
      statement: "Prefer the Next.js App Router (app/) for web projects.",
    });
  }
  if (toolish / facts.length >= 0.6 && toolish >= 2) {
    drafts.push({
      id: "design.surface.tool-first",
      section: "design",
      polarity: "prefer",
      salience: "trend",
      hits: toolish,
      total: facts.length,
      sources: facts.filter((fact) => !isWebRepo(fact)).map((fact) => fact.snapshot.name),
      signals: [`${toolish} repos without a web UI`],
      evidenceLabel: label(toolish, facts.length, "repos"),
      statement: "Default to a CLI, a file, or an agent surface before a web app UI. Most scanned repos are tools.",
    });
  }
}

function pushDeploy(drafts: Draft[], facts: RepoFacts[]): void {
  const targets: { id: string; statement: string; test: (fact: RepoFacts) => string | null }[] = [
    { id: "deploy.vercel", statement: "Deploy web apps with Vercel.", test: (fact) => (fact.snapshot.paths.some((filePath) => basename(filePath) === "vercel.json" || filePath.split("/").includes(".vercel")) ? "vercel.json" : null) },
    { id: "deploy.supabase", statement: "Use Supabase when the app needs a hosted database or auth.", test: (fact) => (fact.snapshot.paths.some((filePath) => filePath === "supabase/config.toml" || filePath.startsWith("supabase/")) ? "supabase/" : null) },
    { id: "deploy.netlify", statement: "Deploy static sites with Netlify.", test: (fact) => (fact.snapshot.paths.some((filePath) => basename(filePath) === "netlify.toml") ? "netlify.toml" : null) },
    { id: "deploy.docker", statement: "Ship a Dockerfile when the service is not a managed frontend host.", test: (fact) => (fact.snapshot.paths.some((filePath) => basename(filePath) === "Dockerfile") ? "Dockerfile" : null) },
    { id: "deploy.fly", statement: "Deploy services with Fly.io.", test: (fact) => (fact.snapshot.paths.some((filePath) => basename(filePath) === "fly.toml") ? "fly.toml" : null) },
    { id: "deploy.cloudflare", statement: "Deploy workers with Wrangler.", test: (fact) => (fact.snapshot.paths.some((filePath) => basename(filePath) === "wrangler.toml") ? "wrangler.toml" : null) },
  ];
  for (const target of targets) {
    const bag = new Bag();
    for (const fact of facts) {
      const signal = target.test(fact);
      if (signal) bag.add(fact.snapshot.name, signal);
    }
    if (bag.hits === 0) continue;
    const strong = bag.hits >= 2 && bag.hits / facts.length >= 0.3;
    const name = target.id.split(".").pop() ?? "deploy";
    drafts.push({
      id: target.id,
      section: "deploy",
      polarity: strong ? "prefer" : "note",
      salience: "config",
      hits: bag.hits,
      total: facts.length,
      sources: bag.repos,
      signals: bag.signals,
      evidenceLabel: label(bag.hits, facts.length, "repos"),
      statement: strong
        ? target.statement
        : `${name} config appeared in ${bag.hits} of ${facts.length} repos. Not enough to treat it as a default.`,
      forcePolarity: strong ? "prefer" : "note",
      forceKind: strong ? "rule" : "observation",
    });
  }
}

function pushAgents(drafts: Draft[], facts: RepoFacts[]): void {
  const tools = new Bag();
  const instructions = new Bag();
  for (const fact of facts) {
    const paths = fact.snapshot.paths;
    const marker = paths.some((filePath) => {
      const base = basename(filePath).toLowerCase();
      return base === "claude.md" || base === "agents.md" || base === ".mcp.json" || filePath.split("/").includes(".claude") || filePath.split("/").includes(".cursor");
    });
    if (marker) instructions.add(fact.snapshot.name, "agent instruction file");
    const sdk = fact.deps.some((dep) => dep.includes("modelcontextprotocol") || dep === "@anthropic-ai/sdk" || dep === "openai");
    if (marker || sdk || /\b(mcp|claude|agent)\b/.test(fact.haystack)) tools.add(fact.snapshot.name, sdk ? "agent SDK" : "agent or MCP mention");
  }
  if (tools.hits > 0) {
    drafts.push({
      id: "stack.agents.tools",
      section: "stack",
      polarity: "prefer",
      salience: "config",
      hits: tools.hits,
      total: facts.length,
      sources: tools.repos,
      signals: tools.signals,
      evidenceLabel: label(tools.hits, facts.length, "repos"),
      statement: "Build agent-facing tools (CLIs, MCP servers, skills) as a normal output, not an afterthought.",
    });
  }
  if (instructions.hits > 0) {
    drafts.push({
      id: "stack.agents.instruction-files",
      section: "stack",
      polarity: "prefer",
      salience: "config",
      hits: instructions.hits,
      total: facts.length,
      sources: instructions.repos,
      signals: instructions.signals,
      evidenceLabel: label(instructions.hits, facts.length, "repos"),
      statement: "Check in agent instruction files (CLAUDE.md, AGENTS.md, or Cursor rules) with the repo.",
    });
  }
}

function pushPhrases(drafts: Draft[], facts: RepoFacts[]): void {
  const dashboards = new Bag();
  for (const fact of facts) {
    if (fact.haystack.includes("no dashboard") || fact.haystack.includes("no saas")) {
      dashboards.add(fact.snapshot.name, "readme says no dashboard or no SaaS");
    }
  }
  if (dashboards.hits === 0) return;
  drafts.push({
    id: "dislikes.product.dashboards",
    section: "dislikes",
    polarity: "avoid",
    salience: "config",
    hits: dashboards.hits,
    total: facts.length,
    sources: dashboards.repos,
    signals: dashboards.signals,
    evidenceLabel: label(dashboards.hits, facts.length, "repos"),
    statement: "Avoid dashboards and SaaS chrome. Prefer a CLI, a file, or an agent surface.",
  });
}

function pushBag(
  drafts: Draft[],
  id: string,
  section: Draft["section"],
  polarity: Draft["polarity"],
  salience: Salience,
  bag: Bag,
  total: number,
  statement: string,
  noun: string,
  forcePolarity?: Draft["polarity"],
): void {
  if (bag.hits === 0 || total <= 0) return;
  drafts.push({
    id,
    section,
    polarity,
    salience,
    hits: bag.hits,
    total,
    sources: bag.repos,
    signals: bag.signals,
    evidenceLabel: label(bag.hits, total, noun),
    statement,
    forcePolarity,
  });
}

function names(value: unknown): string[] {
  const record = asRecord(value);
  return record ? Object.keys(record) : [];
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

function parseJson(text: string | null | undefined): Record<string, unknown> | null {
  if (!text) return null;
  try {
    return asRecord(JSON.parse(text));
  } catch {
    return null;
  }
}

function parseJsonc(text: string | null | undefined): Record<string, unknown> | null {
  if (!text) return null;
  const stripped = text
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/,\s*([}\]])/g, "$1");
  return parseJson(stripped);
}

function rootText(snapshot: RepoSnapshot, base: string): string {
  const target = base.toLowerCase();
  if (snapshot.files[base]) return snapshot.files[base] ?? "";
  const hits = Object.keys(snapshot.files).filter((filePath) => basename(filePath).toLowerCase() === target);
  hits.sort((a, b) => a.length - b.length);
  const first = hits[0];
  return first ? snapshot.files[first] ?? "" : "";
}

function joined(fact: RepoFacts, ...bases: string[]): string {
  return bases.map((base) => rootText(fact.snapshot, base)).join("\n");
}

function hasConfig(fact: RepoFacts, namesToFind: string[]): boolean {
  const wanted = new Set(namesToFind.map((name) => name.toLowerCase()));
  return fact.snapshot.paths.some((filePath) => wanted.has(basename(filePath).toLowerCase()));
}

function prettierTextOf(snapshot: RepoSnapshot): string | null {
  const bases = [".prettierrc", ".prettierrc.json", ".prettierrc.yml", "prettier.config.js"];
  for (const base of bases) {
    const text = rootText(snapshot, base);
    if (text) return text;
  }
  return null;
}

function cssText(snapshot: RepoSnapshot): string {
  return Object.entries(snapshot.files)
    .filter(([filePath]) => /\.(css|scss)$/i.test(filePath))
    .map(([, text]) => text)
    .join("\n");
}

function subjectLine(message: string): string {
  return message.split("\n")[0]?.trim() ?? "";
}

function repoNameStyle(name: string): "kebab" | "lower" | "camel" | "pascal" | "other" {
  if (/^[a-z0-9]+(-[a-z0-9]+)+$/.test(name)) return "kebab";
  if (/^[a-z][a-z0-9]*$/.test(name)) return "lower";
  if (/^[A-Z][A-Za-z0-9]*$/.test(name) && /[a-z]/.test(name)) return "pascal";
  if (/^[a-z][A-Za-z0-9]*$/.test(name) && /[A-Z]/.test(name)) return "camel";
  return "other";
}

function slugLang(language: string): string {
  return language
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/#/g, "sharp")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function primaryIs(fact: RepoFacts, language: string): boolean {
  const entries = Object.entries(fact.snapshot.languages);
  const top = entries.sort((a, b) => b[1] - a[1])[0]?.[0];
  return top === language || fact.snapshot.language === language;
}

function medianDeps(fact: RepoFacts): number | null {
  if (!fact.pkg) return null;
  return names(fact.pkg.dependencies).length;
}

function normalizeHex(raw: string): string | null {
  let hex = raw.slice(1).toLowerCase();
  if (hex.length === 3) hex = hex.split("").map((char) => char + char).join("");
  if (!/^[0-9a-f]{6}$/.test(hex)) return null;
  return `#${hex}`;
}

function isNeutral(hex: string): boolean {
  return hex === "#ffffff" || hex === "#000000";
}

function displayFont(name: string): string {
  return name.replace(/\b[a-z]/g, (char) => char.toUpperCase());
}

function isWebRepo(fact: RepoFacts): boolean {
  if (["next", "react", "vue", "svelte", "astro"].some((dep) => fact.deps.includes(dep))) return true;
  if (fact.deps.includes("tailwindcss")) return true;
  return fact.snapshot.paths.some((filePath) => basename(filePath).toLowerCase() === "index.html" || /\.(css|scss)$/i.test(filePath));
}
