---
schema: personal-md/v1
subject: Shoberman2
visibility: public
includes_private: false
analyzer: heuristic
repos_scanned: 22
updated: 2026-11-14T20:19:09.941Z
---

# personal.md — Shoberman2

> Read this before building anything for **Shoberman2**. Prefer higher confidence. Treat polarity `avoid` as a constraint. `note` is context, not a default. After the person accepts or rejects work, run `personal-md learn`.

Confidence is a score from 0.05 to 0.98. The evidence label says what was counted. Feedback does not rewrite those counts; it shifts confidence and is appended to the log.

## Identity

Shoberman2's profile was inferred from 22 public repositories. Strongest default: Prefer a small dependency surface. Design defaults include 3 rules at confidence 0.50 or higher. 3 secret-like paths were counted and not read. Evidence counts stay tied to repositories. Likes and dislikes move confidence and are appended to the log.

Language bytes:

- TypeScript: 4663108
- JavaScript: 2603730
- CSS: 740889
- Swift: 728875
- PLpgSQL: 273497
- Python: 187333

Skipped 1 fork and excluded 0 private repos from this file.

## Design taste

### `design.minimalism.small-dependency-surface`

- **statement:** Prefer a small dependency surface.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.92
- **evidence:** 12 of 12 Node repos (12)
- **origin:** heuristic
- **sources:** `openWorld`, `warm-window`, `sparktechstudio`, `politalapp`, `computerMuseum`, `hackWithBay3.0`, `startupAdvice`, `token-comp`
- **signals:** median production dependencies: 6

### `design.layout.app-router`

- **statement:** Prefer the Next.js App Router (app/) for web projects.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.79
- **evidence:** 3 of 3 Next.js repos (3)
- **origin:** heuristic
- **sources:** `hackWithBay3.0`, `startupAdvice`, `token-comp`
- **signals:** app/

### `design.color.recurring`

- **statement:** Prefer these recurring colors when a UI exists: #6b7280, #111111, #fafafa.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.60
- **evidence:** 5 of 8 repos with CSS colors (5)
- **origin:** heuristic
- **sources:** `openWorld`, `hackWithBay3.0`, `manipulator`, `sparktechstudio`, `token-comp`
- **signals:** #6b7280 in 3 repos; #111111 in 2 repos; #fafafa in 2 repos

## Stack and tooling

### `stack.pkg.npm`

- **statement:** Use npm as the default package manager.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.87
- **evidence:** 11 of 12 Node repos (11)
- **origin:** heuristic
- **sources:** `openWorld`, `warm-window`, `sparktechstudio`, `politalapp`, `computerMuseum`, `hackWithBay3.0`, `token-comp`, `clipsfarm`
- **signals:** package-lock.json or package.json

### `stack.agents.tools`

- **statement:** Build agent-facing tools (CLIs, MCP servers, skills) as a normal output, not an afterthought.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.77
- **evidence:** 17 of 22 repos (17)
- **origin:** heuristic
- **sources:** `openWorld`, `warm-window`, `openStudy`, `sparktechstudio`, `politalapp`, `hackWithBay3.0`, `manipulator`, `startupAdvice`
- **signals:** agent or MCP mention; agent SDK

### `stack.agents.instruction-files`

- **statement:** Check in agent instruction files (CLAUDE.md, AGENTS.md, or Cursor rules) with the repo.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.51
- **evidence:** 10 of 22 repos (10)
- **origin:** heuristic
- **sources:** `sparktechstudio`, `politalapp`, `manipulator`, `startupAdvice`, `token-comp`, `clipsfarm`, `calendar-hub`, `pitchDeckTemplate`
- **signals:** agent instruction file

### `stack.deps.recurring`

- **statement:** Packages that keep showing up: tsx, zod, @modelcontextprotocol/sdk, @supabase/supabase-js, @tailwindcss/postcss, @vitejs/plugin-react.
- **polarity:** note
- **kind:** rule
- **confidence:** 0.39
- **evidence:** 7 of 22 repos (7)
- **origin:** heuristic
- **sources:** `openWorld`, `politalapp`, `hackWithBay3.0`, `clipsfarm`, `schoolbridge`, `token-comp`, `sparktechstudio`
- **signals:** tsx in 5 repos; zod in 4 repos; @modelcontextprotocol/sdk in 3 repos; @supabase/supabase-js in 2 repos; @tailwindcss/postcss in 2 repos; @vitejs/plugin-react in 2 repos

### `stack.ci.github-actions`

- **statement:** Use GitHub Actions for CI.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.35
- **evidence:** 6 of 22 repos (6)
- **origin:** heuristic
- **sources:** `warm-window`, `politalapp`, `clipsfarm`, `calendar-hub`, `schoolbridge`, `recap`
- **signals:** GitHub Actions workflow

### `stack.framework.react`

- **statement:** When the work is a web UI, prefer React.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.31
- **evidence:** 5 of 22 repos (5)
- **origin:** heuristic
- **sources:** `sparktechstudio`, `politalapp`, `hackWithBay3.0`, `startupAdvice`, `token-comp`
- **signals:** React in 5 repos; 2 of those are not Next.js

## Code style

### `code.typescript.strict`

- **statement:** Keep TypeScript strict.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.83
- **evidence:** 4 of 4 tsconfig files (4)
- **origin:** heuristic
- **sources:** `openWorld`, `politalapp`, `clipsfarm`, `schoolbridge`
- **signals:** compilerOptions.strict true

### `code.module.esm`

- **statement:** Author Node packages as ESM (`"type": "module"`).
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.59
- **evidence:** 7 of 12 Node repos (7)
- **origin:** heuristic
- **sources:** `openWorld`, `warm-window`, `sparktechstudio`, `politalapp`, `computerMuseum`, `clipsfarm`, `schoolbridge`
- **signals:** "type": "module"

## Naming

### `naming.repos.mostly-lowercase`

- **statement:** Repository names are mostly lowercase, but camelCase shows up too. Do not rename existing repos to impose one scheme.
- **polarity:** note
- **kind:** rule
- **confidence:** 0.66
- **evidence:** 14 of 22 repos (14)
- **origin:** heuristic
- **sources:** `personal-md`, `warm-window`, `sparktechstudio`, `politalapp`, `manipulator`, `token-comp`, `clipsfarm`, `odin-recipes`
- **signals:** 14 lowercase; 6 camelCase or PascalCase

## Repo structure

### `structure.readme`

- **statement:** Lead every repo with a README that states what it is and how to run it.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.91
- **evidence:** 21 of 22 repos (21)
- **origin:** heuristic
- **sources:** `personal-md`, `openWorld`, `warm-window`, `openStudy`, `sparktechstudio`, `politalapp`, `computerMuseum`, `hackWithBay3.0`
- **signals:** README

### `structure.license.mit`

- **statement:** Use the MIT license unless a repo needs something else.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.51
- **evidence:** 10 of 22 repos (10)
- **origin:** heuristic
- **sources:** `openWorld`, `warm-window`, `politalapp`, `clipsfarm`, `calendar-hub`, `schoolbridge`, `pitchDeckTemplate`, `Claude-Commands-Email-Outreach`
- **signals:** MIT

### `structure.tests`

- **statement:** Keep tests in test/ or tests/ next to the code.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.43
- **evidence:** 8 of 22 repos (8)
- **origin:** heuristic
- **sources:** `warm-window`, `politalapp`, `computerMuseum`, `startupAdvice`, `clipsfarm`, `calendar-hub`, `schoolbridge`, `chatChecker`
- **signals:** test directory or test file

### `structure.src`

- **statement:** Put implementation code under src/ unless the framework uses another root, such as a Next.js app/ directory.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.39
- **evidence:** 7 of 22 repos (7)
- **origin:** heuristic
- **sources:** `openWorld`, `warm-window`, `sparktechstudio`, `politalapp`, `computerMuseum`, `clipsfarm`, `schoolbridge`
- **signals:** src/

### `structure.contributing`

- **statement:** Ship a CONTRIBUTING.md with repos that other people are expected to touch.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.35
- **evidence:** 6 of 22 repos (6)
- **origin:** heuristic
- **sources:** `openWorld`, `politalapp`, `clipsfarm`, `schoolbridge`, `recap`, `themarketer`
- **signals:** CONTRIBUTING.md

### `structure.docs`

- **statement:** Keep longer documentation in docs/ rather than only in the README.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.31
- **evidence:** 5 of 22 repos (5)
- **origin:** heuristic
- **sources:** `openWorld`, `politalapp`, `clipsfarm`, `calendar-hub`, `schoolbridge`
- **signals:** docs/

## Copy and tone

### `copy.tone.direct`

- **statement:** Write to the reader directly (you/your), in a practical voice.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.83
- **evidence:** 17 of 20 READMEs (17)
- **origin:** heuristic
- **sources:** `openWorld`, `warm-window`, `openStudy`, `sparktechstudio`, `politalapp`, `computerMuseum`, `hackWithBay3.0`, `manipulator`
- **signals:** second person in 17 READMEs

### `copy.tone.few-emoji`

- **statement:** Keep product copy and READMEs plain. Emoji are rare in the existing ones.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.83
- **evidence:** 17 of 20 READMEs (17)
- **origin:** heuristic
- **sources:** `personal-md`, `sparktechstudio`, `politalapp`, `computerMuseum`, `hackWithBay3.0`, `manipulator`, `startupAdvice`, `token-comp`
- **signals:** no emoji in README

### `copy.readme.quickstart`

- **statement:** Open READMEs with what it is and a short quickstart.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.33
- **evidence:** 5 of 20 READMEs (5)
- **origin:** heuristic
- **sources:** `openWorld`, `manipulator`, `schoolbridge`, `pitchDeckTemplate`, `themarketer`
- **signals:** quickstart heading

## Deploy habits

_No rule yet._

## Dislikes

_No dislikes recorded yet. Rejections land here when you run `personal-md learn`._

## Observations

These showed up once, or at low frequency. Do not treat them as defaults. A later like can promote one.

### `design.typography.recurring`

- **statement:** Prefer Inter for UI text.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.28
- **evidence:** 2 of 9 repos with a named font (2)
- **origin:** heuristic
- **sources:** `openWorld`, `chatChecker`
- **signals:** font-family inter; 14 named families seen

### `stack.language.typescript`

- **statement:** TypeScript is a primary language in 6 of 17 repos (50% of detected bytes). Not enough to treat as the default.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.40
- **evidence:** 6 of 17 repos with a primary language (6)
- **origin:** heuristic
- **sources:** `openWorld`, `hackWithBay3.0`, `startupAdvice`, `token-comp`, `clipsfarm`, `schoolbridge`
- **signals:** 50% of detected bytes; primary language in 6 repos

### `stack.language.javascript`

- **statement:** JavaScript is a primary language in 5 of 17 repos (28% of detected bytes). Not enough to treat as the default.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.36
- **evidence:** 5 of 17 repos with a primary language (5)
- **origin:** heuristic
- **sources:** `warm-window`, `sparktechstudio`, `politalapp`, `computerMuseum`, `chatChecker`
- **signals:** 28% of detected bytes; primary language in 5 repos

### `stack.tool.vite`

- **statement:** When it fits the project, prefer Vite.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.27
- **evidence:** 4 of 22 repos (4)
- **origin:** heuristic
- **sources:** `openWorld`, `sparktechstudio`, `politalapp`, `computerMuseum`
- **signals:** vite

### `stack.framework.next`

- **statement:** When the work is a web UI, prefer Next.js.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.24
- **evidence:** 3 of 22 repos (3)
- **origin:** heuristic
- **sources:** `hackWithBay3.0`, `startupAdvice`, `token-comp`
- **signals:** next dependency or next.config

### `stack.test.vitest`

- **statement:** Prefer Vitest for tests.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.24
- **evidence:** 3 of 22 repos (3)
- **origin:** heuristic
- **sources:** `politalapp`, `startupAdvice`, `schoolbridge`
- **signals:** Vitest

### `stack.language.python`

- **statement:** Python is a primary language in 2 of 17 repos (2% of detected bytes). Not enough to treat as the default.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.22
- **evidence:** 2 of 17 repos with a primary language (2)
- **origin:** heuristic
- **sources:** `openStudy`, `calendar-hub`
- **signals:** 2% of detected bytes; primary language in 2 repos

### `stack.test.playwright`

- **statement:** Prefer Playwright for tests.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.20
- **evidence:** 2 of 22 repos (2)
- **origin:** heuristic
- **sources:** `politalapp`, `computerMuseum`
- **signals:** Playwright

### `stack.ui.tailwind`

- **statement:** Prefer Tailwind CSS utility classes for styling.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.20
- **evidence:** 2 of 22 repos (2)
- **origin:** heuristic
- **sources:** `hackWithBay3.0`, `token-comp`
- **signals:** Tailwind CSS

### `stack.language.swift`

- **statement:** Swift is a primary language in 1 of 17 repos (8% of detected bytes). Not enough to treat as the default.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.18
- **evidence:** 1 of 17 repos with a primary language (1)
- **origin:** heuristic
- **sources:** `manipulator`
- **signals:** 8% of detected bytes; primary language in 1 repos

### `stack.framework.express`

- **statement:** When it fits the project, prefer Express.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.17
- **evidence:** 1 of 22 repos (1)
- **origin:** heuristic
- **sources:** `openWorld`
- **signals:** express

### `code.lint.eslint`

- **statement:** Lint TypeScript and JavaScript with ESLint.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.25
- **evidence:** 2 of 12 Node repos (2)
- **origin:** heuristic
- **sources:** `sparktechstudio`, `token-comp`
- **signals:** eslint

### `code.format.prettier`

- **statement:** Format code with Prettier.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.19
- **evidence:** 1 of 12 Node repos (1)
- **origin:** heuristic
- **sources:** `computerMuseum`
- **signals:** prettier

### `structure.install-script`

- **statement:** Provide an install.sh for tools people clone and run.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.24
- **evidence:** 3 of 22 repos (3)
- **origin:** heuristic
- **sources:** `schoolbridge`, `Claude-Commands-Email-Outreach`, `themarketer`
- **signals:** install.sh

### `structure.client-server`

- **statement:** Split larger apps into client/ and server/ when both exist.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.17
- **evidence:** 1 of 22 repos (1)
- **origin:** heuristic
- **sources:** `openWorld`
- **signals:** client/ and server/

### `deploy.vercel`

- **statement:** vercel config appeared in 5 of 22 repos. Not enough to treat it as a default.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.31
- **evidence:** 5 of 22 repos (5)
- **origin:** heuristic
- **sources:** `openWorld`, `sparktechstudio`, `politalapp`, `computerMuseum`, `startupAdvice`
- **signals:** vercel.json

### `deploy.docker`

- **statement:** docker config appeared in 2 of 22 repos. Not enough to treat it as a default.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.20
- **evidence:** 2 of 22 repos (2)
- **origin:** heuristic
- **sources:** `computerMuseum`, `chatChecker`
- **signals:** Dockerfile

### `deploy.supabase`

- **statement:** supabase config appeared in 1 of 22 repos. Not enough to treat it as a default.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.17
- **evidence:** 1 of 22 repos (1)
- **origin:** heuristic
- **sources:** `politalapp`
- **signals:** supabase/

### `dislikes.product.dashboards`

- **statement:** Avoid dashboards and SaaS chrome. Prefer a CLI, a file, or an agent surface.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.17
- **evidence:** 1 of 22 repos (1)
- **origin:** heuristic
- **sources:** `themarketer`
- **signals:** readme says no dashboard or no SaaS

## Likes / dislikes log

_No feedback yet._

## Changelog

- `2026-11-14T20:17:46.610Z` **analyze** — Re-analyzed from 22 public repos. 24 rules, 15 observations.
- `2026-11-14T20:19:09.941Z` **analyze** — Re-analyzed from 22 public repos. 21 rules, 19 observations.

## Open proposals

_No open proposals._

## Agent data

The JSON fence is normative. Tools read and write this block. The sections above are a rendering of it. If they disagree, the fence wins. Edit with the CLI so the two stay together.

```json personal-md
{
  "schema": "personal-md/v1",
  "subject": "Shoberman2",
  "generatedAt": "2026-11-14T20:17:46.610Z",
  "updatedAt": "2026-11-14T20:19:09.941Z",
  "analyzer": "heuristic",
  "summary": "Shoberman2's profile was inferred from 22 public repositories. Strongest default: Prefer a small dependency surface. Design defaults include 3 rules at confidence 0.50 or higher. 3 secret-like paths were counted and not read. Evidence counts stay tied to repositories. Likes and dislikes move confidence and are appended to the log.",
  "stats": {
    "visibility": "public",
    "includesPrivate": false,
    "reposScanned": 22,
    "forksSkipped": 1,
    "privateExcluded": 0,
    "archived": 0,
    "failed": [],
    "secretsSkipped": 3,
    "treesTruncated": 0,
    "languages": [
      {
        "language": "TypeScript",
        "bytes": 4663108
      },
      {
        "language": "JavaScript",
        "bytes": 2603730
      },
      {
        "language": "CSS",
        "bytes": 740889
      },
      {
        "language": "Swift",
        "bytes": 728875
      },
      {
        "language": "PLpgSQL",
        "bytes": 273497
      },
      {
        "language": "Python",
        "bytes": 187333
      },
      {
        "language": "HTML",
        "bytes": 145600
      },
      {
        "language": "Shell",
        "bytes": 12934
      },
      {
        "language": "PowerShell",
        "bytes": 7853
      },
      {
        "language": "Cypher",
        "bytes": 1604
      },
      {
        "language": "Dockerfile",
        "bytes": 830
      }
    ]
  },
  "rules": [
    {
      "id": "design.minimalism.small-dependency-surface",
      "section": "design",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Prefer a small dependency surface.",
      "confidence": 0.92,
      "baseConfidence": 0.92,
      "delta": 0,
      "evidence": 12,
      "evidenceTotal": 12,
      "evidenceLabel": "12 of 12 Node repos",
      "sources": [
        "openWorld",
        "warm-window",
        "sparktechstudio",
        "politalapp",
        "computerMuseum",
        "hackWithBay3.0",
        "startupAdvice",
        "token-comp"
      ],
      "signals": [
        "median production dependencies: 6"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "design.layout.app-router",
      "section": "design",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Prefer the Next.js App Router (app/) for web projects.",
      "confidence": 0.79,
      "baseConfidence": 0.79,
      "delta": 0,
      "evidence": 3,
      "evidenceTotal": 3,
      "evidenceLabel": "3 of 3 Next.js repos",
      "sources": [
        "hackWithBay3.0",
        "startupAdvice",
        "token-comp"
      ],
      "signals": [
        "app/"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "design.color.recurring",
      "section": "design",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Prefer these recurring colors when a UI exists: #6b7280, #111111, #fafafa.",
      "confidence": 0.6,
      "baseConfidence": 0.6,
      "delta": 0,
      "evidence": 5,
      "evidenceTotal": 8,
      "evidenceLabel": "5 of 8 repos with CSS colors",
      "sources": [
        "openWorld",
        "hackWithBay3.0",
        "manipulator",
        "sparktechstudio",
        "token-comp"
      ],
      "signals": [
        "#6b7280 in 3 repos",
        "#111111 in 2 repos",
        "#fafafa in 2 repos"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "design.typography.recurring",
      "section": "design",
      "kind": "observation",
      "polarity": "note",
      "statement": "Prefer Inter for UI text.",
      "confidence": 0.28,
      "baseConfidence": 0.28,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 9,
      "evidenceLabel": "2 of 9 repos with a named font",
      "sources": [
        "openWorld",
        "chatChecker"
      ],
      "signals": [
        "font-family inter",
        "14 named families seen"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "stack.pkg.npm",
      "section": "stack",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Use npm as the default package manager.",
      "confidence": 0.87,
      "baseConfidence": 0.87,
      "delta": 0,
      "evidence": 11,
      "evidenceTotal": 12,
      "evidenceLabel": "11 of 12 Node repos",
      "sources": [
        "openWorld",
        "warm-window",
        "sparktechstudio",
        "politalapp",
        "computerMuseum",
        "hackWithBay3.0",
        "token-comp",
        "clipsfarm"
      ],
      "signals": [
        "package-lock.json or package.json"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "stack.agents.tools",
      "section": "stack",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Build agent-facing tools (CLIs, MCP servers, skills) as a normal output, not an afterthought.",
      "confidence": 0.77,
      "baseConfidence": 0.77,
      "delta": 0,
      "evidence": 17,
      "evidenceTotal": 22,
      "evidenceLabel": "17 of 22 repos",
      "sources": [
        "openWorld",
        "warm-window",
        "openStudy",
        "sparktechstudio",
        "politalapp",
        "hackWithBay3.0",
        "manipulator",
        "startupAdvice"
      ],
      "signals": [
        "agent or MCP mention",
        "agent SDK"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "stack.agents.instruction-files",
      "section": "stack",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Check in agent instruction files (CLAUDE.md, AGENTS.md, or Cursor rules) with the repo.",
      "confidence": 0.51,
      "baseConfidence": 0.51,
      "delta": 0,
      "evidence": 10,
      "evidenceTotal": 22,
      "evidenceLabel": "10 of 22 repos",
      "sources": [
        "sparktechstudio",
        "politalapp",
        "manipulator",
        "startupAdvice",
        "token-comp",
        "clipsfarm",
        "calendar-hub",
        "pitchDeckTemplate"
      ],
      "signals": [
        "agent instruction file"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "stack.deps.recurring",
      "section": "stack",
      "kind": "rule",
      "polarity": "note",
      "statement": "Packages that keep showing up: tsx, zod, @modelcontextprotocol/sdk, @supabase/supabase-js, @tailwindcss/postcss, @vitejs/plugin-react.",
      "confidence": 0.39,
      "baseConfidence": 0.39,
      "delta": 0,
      "evidence": 7,
      "evidenceTotal": 22,
      "evidenceLabel": "7 of 22 repos",
      "sources": [
        "openWorld",
        "politalapp",
        "hackWithBay3.0",
        "clipsfarm",
        "schoolbridge",
        "token-comp",
        "sparktechstudio"
      ],
      "signals": [
        "tsx in 5 repos",
        "zod in 4 repos",
        "@modelcontextprotocol/sdk in 3 repos",
        "@supabase/supabase-js in 2 repos",
        "@tailwindcss/postcss in 2 repos",
        "@vitejs/plugin-react in 2 repos"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "stack.ci.github-actions",
      "section": "stack",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Use GitHub Actions for CI.",
      "confidence": 0.35,
      "baseConfidence": 0.35,
      "delta": 0,
      "evidence": 6,
      "evidenceTotal": 22,
      "evidenceLabel": "6 of 22 repos",
      "sources": [
        "warm-window",
        "politalapp",
        "clipsfarm",
        "calendar-hub",
        "schoolbridge",
        "recap"
      ],
      "signals": [
        "GitHub Actions workflow"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "stack.framework.react",
      "section": "stack",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "When the work is a web UI, prefer React.",
      "confidence": 0.31,
      "baseConfidence": 0.31,
      "delta": 0,
      "evidence": 5,
      "evidenceTotal": 22,
      "evidenceLabel": "5 of 22 repos",
      "sources": [
        "sparktechstudio",
        "politalapp",
        "hackWithBay3.0",
        "startupAdvice",
        "token-comp"
      ],
      "signals": [
        "React in 5 repos",
        "2 of those are not Next.js"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "stack.language.typescript",
      "section": "stack",
      "kind": "observation",
      "polarity": "note",
      "statement": "TypeScript is a primary language in 6 of 17 repos (50% of detected bytes). Not enough to treat as the default.",
      "confidence": 0.4,
      "baseConfidence": 0.4,
      "delta": 0,
      "evidence": 6,
      "evidenceTotal": 17,
      "evidenceLabel": "6 of 17 repos with a primary language",
      "sources": [
        "openWorld",
        "hackWithBay3.0",
        "startupAdvice",
        "token-comp",
        "clipsfarm",
        "schoolbridge"
      ],
      "signals": [
        "50% of detected bytes",
        "primary language in 6 repos"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "stack.language.javascript",
      "section": "stack",
      "kind": "observation",
      "polarity": "note",
      "statement": "JavaScript is a primary language in 5 of 17 repos (28% of detected bytes). Not enough to treat as the default.",
      "confidence": 0.36,
      "baseConfidence": 0.36,
      "delta": 0,
      "evidence": 5,
      "evidenceTotal": 17,
      "evidenceLabel": "5 of 17 repos with a primary language",
      "sources": [
        "warm-window",
        "sparktechstudio",
        "politalapp",
        "computerMuseum",
        "chatChecker"
      ],
      "signals": [
        "28% of detected bytes",
        "primary language in 5 repos"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "stack.tool.vite",
      "section": "stack",
      "kind": "observation",
      "polarity": "note",
      "statement": "When it fits the project, prefer Vite.",
      "confidence": 0.27,
      "baseConfidence": 0.27,
      "delta": 0,
      "evidence": 4,
      "evidenceTotal": 22,
      "evidenceLabel": "4 of 22 repos",
      "sources": [
        "openWorld",
        "sparktechstudio",
        "politalapp",
        "computerMuseum"
      ],
      "signals": [
        "vite"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "stack.framework.next",
      "section": "stack",
      "kind": "observation",
      "polarity": "note",
      "statement": "When the work is a web UI, prefer Next.js.",
      "confidence": 0.24,
      "baseConfidence": 0.24,
      "delta": 0,
      "evidence": 3,
      "evidenceTotal": 22,
      "evidenceLabel": "3 of 22 repos",
      "sources": [
        "hackWithBay3.0",
        "startupAdvice",
        "token-comp"
      ],
      "signals": [
        "next dependency or next.config"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "stack.test.vitest",
      "section": "stack",
      "kind": "observation",
      "polarity": "note",
      "statement": "Prefer Vitest for tests.",
      "confidence": 0.24,
      "baseConfidence": 0.24,
      "delta": 0,
      "evidence": 3,
      "evidenceTotal": 22,
      "evidenceLabel": "3 of 22 repos",
      "sources": [
        "politalapp",
        "startupAdvice",
        "schoolbridge"
      ],
      "signals": [
        "Vitest"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "stack.language.python",
      "section": "stack",
      "kind": "observation",
      "polarity": "note",
      "statement": "Python is a primary language in 2 of 17 repos (2% of detected bytes). Not enough to treat as the default.",
      "confidence": 0.22,
      "baseConfidence": 0.22,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 17,
      "evidenceLabel": "2 of 17 repos with a primary language",
      "sources": [
        "openStudy",
        "calendar-hub"
      ],
      "signals": [
        "2% of detected bytes",
        "primary language in 2 repos"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "stack.test.playwright",
      "section": "stack",
      "kind": "observation",
      "polarity": "note",
      "statement": "Prefer Playwright for tests.",
      "confidence": 0.2,
      "baseConfidence": 0.2,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 22,
      "evidenceLabel": "2 of 22 repos",
      "sources": [
        "politalapp",
        "computerMuseum"
      ],
      "signals": [
        "Playwright"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "stack.ui.tailwind",
      "section": "stack",
      "kind": "observation",
      "polarity": "note",
      "statement": "Prefer Tailwind CSS utility classes for styling.",
      "confidence": 0.2,
      "baseConfidence": 0.2,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 22,
      "evidenceLabel": "2 of 22 repos",
      "sources": [
        "hackWithBay3.0",
        "token-comp"
      ],
      "signals": [
        "Tailwind CSS"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "stack.language.swift",
      "section": "stack",
      "kind": "observation",
      "polarity": "note",
      "statement": "Swift is a primary language in 1 of 17 repos (8% of detected bytes). Not enough to treat as the default.",
      "confidence": 0.18,
      "baseConfidence": 0.18,
      "delta": 0,
      "evidence": 1,
      "evidenceTotal": 17,
      "evidenceLabel": "1 of 17 repos with a primary language",
      "sources": [
        "manipulator"
      ],
      "signals": [
        "8% of detected bytes",
        "primary language in 1 repos"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "stack.framework.express",
      "section": "stack",
      "kind": "observation",
      "polarity": "note",
      "statement": "When it fits the project, prefer Express.",
      "confidence": 0.17,
      "baseConfidence": 0.17,
      "delta": 0,
      "evidence": 1,
      "evidenceTotal": 22,
      "evidenceLabel": "1 of 22 repos",
      "sources": [
        "openWorld"
      ],
      "signals": [
        "express"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "code.typescript.strict",
      "section": "code",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Keep TypeScript strict.",
      "confidence": 0.83,
      "baseConfidence": 0.83,
      "delta": 0,
      "evidence": 4,
      "evidenceTotal": 4,
      "evidenceLabel": "4 of 4 tsconfig files",
      "sources": [
        "openWorld",
        "politalapp",
        "clipsfarm",
        "schoolbridge"
      ],
      "signals": [
        "compilerOptions.strict true"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "code.module.esm",
      "section": "code",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Author Node packages as ESM (`\"type\": \"module\"`).",
      "confidence": 0.59,
      "baseConfidence": 0.59,
      "delta": 0,
      "evidence": 7,
      "evidenceTotal": 12,
      "evidenceLabel": "7 of 12 Node repos",
      "sources": [
        "openWorld",
        "warm-window",
        "sparktechstudio",
        "politalapp",
        "computerMuseum",
        "clipsfarm",
        "schoolbridge"
      ],
      "signals": [
        "\"type\": \"module\""
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "code.lint.eslint",
      "section": "code",
      "kind": "observation",
      "polarity": "note",
      "statement": "Lint TypeScript and JavaScript with ESLint.",
      "confidence": 0.25,
      "baseConfidence": 0.25,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 12,
      "evidenceLabel": "2 of 12 Node repos",
      "sources": [
        "sparktechstudio",
        "token-comp"
      ],
      "signals": [
        "eslint"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "code.format.prettier",
      "section": "code",
      "kind": "observation",
      "polarity": "note",
      "statement": "Format code with Prettier.",
      "confidence": 0.19,
      "baseConfidence": 0.19,
      "delta": 0,
      "evidence": 1,
      "evidenceTotal": 12,
      "evidenceLabel": "1 of 12 Node repos",
      "sources": [
        "computerMuseum"
      ],
      "signals": [
        "prettier"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "naming.repos.mostly-lowercase",
      "section": "naming",
      "kind": "rule",
      "polarity": "note",
      "statement": "Repository names are mostly lowercase, but camelCase shows up too. Do not rename existing repos to impose one scheme.",
      "confidence": 0.66,
      "baseConfidence": 0.66,
      "delta": 0,
      "evidence": 14,
      "evidenceTotal": 22,
      "evidenceLabel": "14 of 22 repos",
      "sources": [
        "personal-md",
        "warm-window",
        "sparktechstudio",
        "politalapp",
        "manipulator",
        "token-comp",
        "clipsfarm",
        "odin-recipes"
      ],
      "signals": [
        "14 lowercase",
        "6 camelCase or PascalCase"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "structure.readme",
      "section": "structure",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Lead every repo with a README that states what it is and how to run it.",
      "confidence": 0.91,
      "baseConfidence": 0.91,
      "delta": 0,
      "evidence": 21,
      "evidenceTotal": 22,
      "evidenceLabel": "21 of 22 repos",
      "sources": [
        "personal-md",
        "openWorld",
        "warm-window",
        "openStudy",
        "sparktechstudio",
        "politalapp",
        "computerMuseum",
        "hackWithBay3.0"
      ],
      "signals": [
        "README"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "structure.license.mit",
      "section": "structure",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Use the MIT license unless a repo needs something else.",
      "confidence": 0.51,
      "baseConfidence": 0.51,
      "delta": 0,
      "evidence": 10,
      "evidenceTotal": 22,
      "evidenceLabel": "10 of 22 repos",
      "sources": [
        "openWorld",
        "warm-window",
        "politalapp",
        "clipsfarm",
        "calendar-hub",
        "schoolbridge",
        "pitchDeckTemplate",
        "Claude-Commands-Email-Outreach"
      ],
      "signals": [
        "MIT"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "structure.tests",
      "section": "structure",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Keep tests in test/ or tests/ next to the code.",
      "confidence": 0.43,
      "baseConfidence": 0.43,
      "delta": 0,
      "evidence": 8,
      "evidenceTotal": 22,
      "evidenceLabel": "8 of 22 repos",
      "sources": [
        "warm-window",
        "politalapp",
        "computerMuseum",
        "startupAdvice",
        "clipsfarm",
        "calendar-hub",
        "schoolbridge",
        "chatChecker"
      ],
      "signals": [
        "test directory or test file"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "structure.src",
      "section": "structure",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Put implementation code under src/ unless the framework uses another root, such as a Next.js app/ directory.",
      "confidence": 0.39,
      "baseConfidence": 0.39,
      "delta": 0,
      "evidence": 7,
      "evidenceTotal": 22,
      "evidenceLabel": "7 of 22 repos",
      "sources": [
        "openWorld",
        "warm-window",
        "sparktechstudio",
        "politalapp",
        "computerMuseum",
        "clipsfarm",
        "schoolbridge"
      ],
      "signals": [
        "src/"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "structure.contributing",
      "section": "structure",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Ship a CONTRIBUTING.md with repos that other people are expected to touch.",
      "confidence": 0.35,
      "baseConfidence": 0.35,
      "delta": 0,
      "evidence": 6,
      "evidenceTotal": 22,
      "evidenceLabel": "6 of 22 repos",
      "sources": [
        "openWorld",
        "politalapp",
        "clipsfarm",
        "schoolbridge",
        "recap",
        "themarketer"
      ],
      "signals": [
        "CONTRIBUTING.md"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "structure.docs",
      "section": "structure",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Keep longer documentation in docs/ rather than only in the README.",
      "confidence": 0.31,
      "baseConfidence": 0.31,
      "delta": 0,
      "evidence": 5,
      "evidenceTotal": 22,
      "evidenceLabel": "5 of 22 repos",
      "sources": [
        "openWorld",
        "politalapp",
        "clipsfarm",
        "calendar-hub",
        "schoolbridge"
      ],
      "signals": [
        "docs/"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "structure.install-script",
      "section": "structure",
      "kind": "observation",
      "polarity": "note",
      "statement": "Provide an install.sh for tools people clone and run.",
      "confidence": 0.24,
      "baseConfidence": 0.24,
      "delta": 0,
      "evidence": 3,
      "evidenceTotal": 22,
      "evidenceLabel": "3 of 22 repos",
      "sources": [
        "schoolbridge",
        "Claude-Commands-Email-Outreach",
        "themarketer"
      ],
      "signals": [
        "install.sh"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "structure.client-server",
      "section": "structure",
      "kind": "observation",
      "polarity": "note",
      "statement": "Split larger apps into client/ and server/ when both exist.",
      "confidence": 0.17,
      "baseConfidence": 0.17,
      "delta": 0,
      "evidence": 1,
      "evidenceTotal": 22,
      "evidenceLabel": "1 of 22 repos",
      "sources": [
        "openWorld"
      ],
      "signals": [
        "client/ and server/"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "copy.tone.direct",
      "section": "copy",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Write to the reader directly (you/your), in a practical voice.",
      "confidence": 0.83,
      "baseConfidence": 0.83,
      "delta": 0,
      "evidence": 17,
      "evidenceTotal": 20,
      "evidenceLabel": "17 of 20 READMEs",
      "sources": [
        "openWorld",
        "warm-window",
        "openStudy",
        "sparktechstudio",
        "politalapp",
        "computerMuseum",
        "hackWithBay3.0",
        "manipulator"
      ],
      "signals": [
        "second person in 17 READMEs"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "copy.tone.few-emoji",
      "section": "copy",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Keep product copy and READMEs plain. Emoji are rare in the existing ones.",
      "confidence": 0.83,
      "baseConfidence": 0.83,
      "delta": 0,
      "evidence": 17,
      "evidenceTotal": 20,
      "evidenceLabel": "17 of 20 READMEs",
      "sources": [
        "personal-md",
        "sparktechstudio",
        "politalapp",
        "computerMuseum",
        "hackWithBay3.0",
        "manipulator",
        "startupAdvice",
        "token-comp"
      ],
      "signals": [
        "no emoji in README"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "copy.readme.quickstart",
      "section": "copy",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Open READMEs with what it is and a short quickstart.",
      "confidence": 0.33,
      "baseConfidence": 0.33,
      "delta": 0,
      "evidence": 5,
      "evidenceTotal": 20,
      "evidenceLabel": "5 of 20 READMEs",
      "sources": [
        "openWorld",
        "manipulator",
        "schoolbridge",
        "pitchDeckTemplate",
        "themarketer"
      ],
      "signals": [
        "quickstart heading"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "deploy.vercel",
      "section": "deploy",
      "kind": "observation",
      "polarity": "note",
      "statement": "vercel config appeared in 5 of 22 repos. Not enough to treat it as a default.",
      "confidence": 0.31,
      "baseConfidence": 0.31,
      "delta": 0,
      "evidence": 5,
      "evidenceTotal": 22,
      "evidenceLabel": "5 of 22 repos",
      "sources": [
        "openWorld",
        "sparktechstudio",
        "politalapp",
        "computerMuseum",
        "startupAdvice"
      ],
      "signals": [
        "vercel.json"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "deploy.docker",
      "section": "deploy",
      "kind": "observation",
      "polarity": "note",
      "statement": "docker config appeared in 2 of 22 repos. Not enough to treat it as a default.",
      "confidence": 0.2,
      "baseConfidence": 0.2,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 22,
      "evidenceLabel": "2 of 22 repos",
      "sources": [
        "computerMuseum",
        "chatChecker"
      ],
      "signals": [
        "Dockerfile"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "deploy.supabase",
      "section": "deploy",
      "kind": "observation",
      "polarity": "note",
      "statement": "supabase config appeared in 1 of 22 repos. Not enough to treat it as a default.",
      "confidence": 0.17,
      "baseConfidence": 0.17,
      "delta": 0,
      "evidence": 1,
      "evidenceTotal": 22,
      "evidenceLabel": "1 of 22 repos",
      "sources": [
        "politalapp"
      ],
      "signals": [
        "supabase/"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    },
    {
      "id": "dislikes.product.dashboards",
      "section": "dislikes",
      "kind": "observation",
      "polarity": "note",
      "statement": "Avoid dashboards and SaaS chrome. Prefer a CLI, a file, or an agent surface.",
      "confidence": 0.17,
      "baseConfidence": 0.17,
      "delta": 0,
      "evidence": 1,
      "evidenceTotal": 22,
      "evidenceLabel": "1 of 22 repos",
      "sources": [
        "themarketer"
      ],
      "signals": [
        "readme says no dashboard or no SaaS"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-11-14T20:19:09.941Z"
    }
  ],
  "log": [],
  "changelog": [
    {
      "at": "2026-11-14T20:17:46.610Z",
      "command": "analyze",
      "summary": "Re-analyzed from 22 public repos. 24 rules, 15 observations."
    },
    {
      "at": "2026-11-14T20:19:09.941Z",
      "command": "analyze",
      "summary": "Re-analyzed from 22 public repos. 21 rules, 19 observations."
    }
  ],
  "proposals": []
}
```
