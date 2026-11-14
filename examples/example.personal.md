---
schema: personal-md/v1
subject: ada
visibility: public
includes_private: false
analyzer: heuristic
repos_scanned: 4
updated: 2026-01-04T00:00:00.000Z
---

# personal.md — ada

> Read this before building anything for **ada**. Prefer higher confidence. Treat polarity `avoid` as a constraint. `note` is context, not a default. After the person accepts or rejects work, run `personal-md learn`.

Confidence is a score from 0.05 to 0.98. The evidence label says what was counted. Feedback does not rewrite those counts; it shifts confidence and is appended to the log.

## Identity

ada's profile was inferred from 4 public repositories. Strongest default: Write Conventional Commits (`feat:`, `fix:`, `chore:`). Design defaults include 4 rules at confidence 0.50 or higher. 1 secret-like path was counted and not read. Evidence counts stay tied to repositories. Likes and dislikes move confidence and are appended to the log.

Language bytes:

- TypeScript: 20000
- Python: 5000
- CSS: 1400

Skipped 1 fork and excluded 1 private repo from this file.

## Design taste

### `design.minimalism.small-dependency-surface`

- **statement:** Prefer a small dependency surface.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.91
- **evidence:** 3 of 3 Node repos (3)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`, `notes-cli`
- **signals:** median production dependencies: 4; feedback 2026-01-02T00:00:00.000Z like

### `design.color.recurring`

- **statement:** Prefer these recurring colors when a UI exists: #1a1a1a, #f7f3ea.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.72
- **evidence:** 2 of 2 repos with CSS colors (2)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`
- **signals:** #1a1a1a in 2 repos; #f7f3ea in 2 repos

### `design.layout.app-router`

- **statement:** Prefer the Next.js App Router (app/) for web projects.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.72
- **evidence:** 2 of 2 Next.js repos (2)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`
- **signals:** app/

### `design.typography.recurring`

- **statement:** Prefer Georgia for UI text.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.72
- **evidence:** 2 of 2 repos with a named font (2)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`
- **signals:** font-family georgia; one named family

### `feedback.purple-gradient`

- **statement:** Avoid the purple gradient because it feels loud.
- **polarity:** avoid
- **kind:** rule
- **confidence:** 0.60
- **evidence:** 1 direct feedback note (1)
- **origin:** feedback, locked
- **sources:** `feedback`
- **signals:** feedback 2026-01-03T00:00:00.000Z dislike

## Stack and tooling

### `stack.pkg.npm`

- **statement:** Use npm as the default package manager.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.79
- **evidence:** 3 of 3 Node repos (3)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`, `notes-cli`
- **signals:** package-lock.json or package.json

### `stack.language.typescript`

- **statement:** Default to TypeScript. It is the primary language in 3 of 4 repos (76% of detected bytes).
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.63
- **evidence:** 3 of 4 repos with a primary language (3)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`, `notes-cli`
- **signals:** 76% of detected bytes; primary language in 3 repos

### `stack.ci.github-actions`

- **statement:** Use GitHub Actions for CI.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.44
- **evidence:** 2 of 4 repos (2)
- **origin:** heuristic
- **sources:** `garden-web`, `notes-cli`
- **signals:** GitHub Actions workflow

### `stack.framework.next`

- **statement:** When the work is a web UI, prefer Next.js.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.44
- **evidence:** 2 of 4 repos (2)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`
- **signals:** next dependency or next.config; React is present wherever Next.js is

### `stack.ui.tailwind`

- **statement:** Prefer Tailwind CSS utility classes for styling.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.44
- **evidence:** 2 of 4 repos (2)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`
- **signals:** Tailwind CSS

## Code style

### `code.commits.conventional`

- **statement:** Write Conventional Commits (`feat:`, `fix:`, `chore:`).
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.83
- **evidence:** 4 of 4 repos with commit samples (4)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`
- **signals:** 4/4 conventional subjects; 3/4 conventional subjects

### `code.module.esm`

- **statement:** Author Node packages as ESM (`"type": "module"`).
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.79
- **evidence:** 3 of 3 Node repos (3)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`, `notes-cli`
- **signals:** "type": "module"

### `code.typescript.strict`

- **statement:** Keep TypeScript strict.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.79
- **evidence:** 3 of 3 tsconfig files (3)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`, `notes-cli`
- **signals:** compilerOptions.strict true

### `code.format.no-semicolons`

- **statement:** Omit semicolons.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.72
- **evidence:** 2 of 2 formatter configs (2)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`
- **signals:** semi false

### `code.format.single-quotes`

- **statement:** Prefer single quotes.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.72
- **evidence:** 2 of 2 formatter configs (2)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`
- **signals:** singleQuote true

### `code.format.prettier`

- **statement:** Format code with Prettier.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.53
- **evidence:** 2 of 3 Node repos (2)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`
- **signals:** prettier

### `code.lint.eslint`

- **statement:** Lint TypeScript and JavaScript with ESLint.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.53
- **evidence:** 2 of 3 Node repos (2)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`
- **signals:** eslint

## Naming

### `naming.repos.lowercase`

- **statement:** Use lowercase repository names, and hyphenate when the name has more than one word.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.83
- **evidence:** 4 of 4 repos (4)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`
- **signals:** 4 lowercase; 0 camelCase or PascalCase

## Repo structure

### `structure.license.mit`

- **statement:** Use the MIT license unless a repo needs something else.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.83
- **evidence:** 4 of 4 repos (4)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`
- **signals:** MIT

### `structure.readme`

- **statement:** Lead every repo with a README that states what it is and how to run it.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.83
- **evidence:** 4 of 4 repos (4)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`
- **signals:** README

### `structure.contributing`

- **statement:** Ship a CONTRIBUTING.md with repos that other people are expected to touch.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.44
- **evidence:** 2 of 4 repos (2)
- **origin:** heuristic
- **sources:** `garden-web`, `notes-cli`
- **signals:** CONTRIBUTING.md

### `structure.src`

- **statement:** Put implementation code under src/ unless the framework uses another root, such as a Next.js app/ directory.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.44
- **evidence:** 2 of 4 repos (2)
- **origin:** heuristic
- **sources:** `notes-cli`, `plot-tools`
- **signals:** src/

### `structure.tests`

- **statement:** Keep tests in test/ or tests/ next to the code.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.44
- **evidence:** 2 of 4 repos (2)
- **origin:** heuristic
- **sources:** `notes-cli`, `plot-tools`
- **signals:** test directory or test file

## Copy and tone

### `copy.readme.quickstart`

- **statement:** Open READMEs with what it is and a short quickstart.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.83
- **evidence:** 4 of 4 READMEs (4)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`
- **signals:** quickstart heading

### `copy.tone.direct`

- **statement:** Write to the reader directly (you/your), in a practical voice.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.83
- **evidence:** 4 of 4 READMEs (4)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`
- **signals:** second person in 4 READMEs

### `copy.tone.few-emoji`

- **statement:** Keep product copy and READMEs plain. Emoji are rare in the existing ones.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.83
- **evidence:** 4 of 4 READMEs (4)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`
- **signals:** no emoji in README

## Deploy habits

_No rule yet._

## Dislikes

### `dislikes.product.dashboards`

- **statement:** Avoid dashboards and SaaS chrome. Prefer a CLI, a file, or an agent surface.
- **polarity:** avoid
- **kind:** rule
- **confidence:** 0.44
- **evidence:** 2 of 4 repos (2)
- **origin:** heuristic
- **sources:** `paper-page`, `notes-cli`
- **signals:** readme says no dashboard or no SaaS

Also avoided, with the full rule in its topic section:

- `feedback.purple-gradient` — Avoid the purple gradient because it feels loud. (confidence 0.60)

## Observations

These showed up once, or at low frequency. Do not treat them as defaults. A later like can promote one.

### `stack.agents.instruction-files`

- **statement:** Check in agent instruction files (CLAUDE.md, AGENTS.md, or Cursor rules) with the repo.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.27
- **evidence:** 1 of 4 repos (1)
- **origin:** heuristic
- **sources:** `notes-cli`
- **signals:** agent instruction file

### `stack.agents.tools`

- **statement:** Build agent-facing tools (CLIs, MCP servers, skills) as a normal output, not an afterthought.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.27
- **evidence:** 1 of 4 repos (1)
- **origin:** heuristic
- **sources:** `notes-cli`
- **signals:** agent or MCP mention

### `stack.language.python`

- **statement:** Python is a primary language in 1 of 4 repos (19% of detected bytes). Not enough to treat as the default.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.27
- **evidence:** 1 of 4 repos with a primary language (1)
- **origin:** heuristic
- **sources:** `plot-tools`
- **signals:** 19% of detected bytes; primary language in 1 repos

### `stack.test.vitest`

- **statement:** Prefer Vitest for tests.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.27
- **evidence:** 1 of 4 repos (1)
- **origin:** heuristic
- **sources:** `notes-cli`
- **signals:** Vitest

### `code.python.ruff`

- **statement:** Lint Python with Ruff.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.40
- **evidence:** 1 of 4 repos (1)
- **origin:** heuristic
- **sources:** `plot-tools`
- **signals:** ruff

### `structure.install-script`

- **statement:** Provide an install.sh for tools people clone and run.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.27
- **evidence:** 1 of 4 repos (1)
- **origin:** heuristic
- **sources:** `notes-cli`
- **signals:** install.sh

### `copy.privacy`

- **statement:** One repo emphasizes privacy. Not enough to treat as a default.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.27
- **evidence:** 1 of 4 repos (1)
- **origin:** heuristic
- **sources:** `plot-tools`
- **signals:** privacy phrasing

### `deploy.vercel`

- **statement:** vercel config appeared in 1 of 4 repos. Not enough to treat it as a default.
- **polarity:** note
- **kind:** observation
- **confidence:** 0.27
- **evidence:** 1 of 4 repos (1)
- **origin:** heuristic
- **sources:** `garden-web`
- **signals:** vercel.json

## Likes / dislikes log

### 2026-01-02T00:00:00.000Z · like · `design.minimalism.small-dependency-surface`

- **feedback:** the small dependency surface
- **because:** —
- **confidence:** 0.79 → 0.91

### 2026-01-03T00:00:00.000Z · dislike · `feedback.purple-gradient`

- **feedback:** the purple gradient
- **because:** it feels loud

## Changelog

- `2026-01-01T00:00:00.000Z` **init** — Initial profile from 4 public repos. 26 rules, 8 observations.
- `2026-01-02T00:00:00.000Z` **learn** — like design.minimalism.small-dependency-surface. Confidence 0.79 → 0.91.
- `2026-01-03T00:00:00.000Z` **learn** — Added feedback.purple-gradient from dislike feedback at confidence 0.60.
- `2026-01-04T00:00:00.000Z` **propose** — Opened prop_717d5913 for design.typography.serif. Waiting for approval.

## Open proposals

### `prop_717d5913` · pending

- **rule:** `design.typography.serif`
- **statement:** Prefer a serif for long reading.
- **polarity:** prefer
- **confidence:** 0.70
- **rationale:** A review asked for a reading face.

```diff
--- a/personal.md
+++ b/personal.md
@@ -5,1361 +5,1394 @@
 includes_private: false
 analyzer: heuristic
 repos_scanned: 4
-updated: 2026-01-03T00:00:00.000Z
+updated: 2026-01-04T00:00:00.000Z
 ---
 
 # personal.md — ada
 
 > Read this before building anything for **ada**. Prefer higher confidence. Treat polarity `avoid` as a constraint. `note` is context, not a default. After the person accepts or rejects work, run `personal-md learn`.
 
 Confidence is a score from 0.05 to 0.98. The evidence label says what was counted. Feedback does not rewrite those counts; it shifts confidence and is appended to the log.
 
 ## Identity
 
 ada's profile was inferred from 4 public repositories. Strongest default: Write Conventional Commits (`feat:`, `fix:`, `chore:`). Design defaults include 4 rules at confidence 0.50 or higher. 1 secret-like path was counted and not read. Evidence counts stay tied to repositories. Likes and dislikes move confidence and are appended to the log.
 
 Language bytes:
 
 - TypeScript: 20000
 - Python: 5000
 - CSS: 1400
 
 Skipped 1 fork and excluded 1 private repo from this file.
 
 ## Design taste
 
 ### `design.minimalism.small-dependency-surface`
 
 - **statement:** Prefer a small dependency surface.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.91
 - **evidence:** 3 of 3 Node repos (3)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`, `notes-cli`
 - **signals:** median production dependencies: 4; feedback 2026-01-02T00:00:00.000Z like
 
 ### `design.color.recurring`
 
 - **statement:** Prefer these recurring colors when a UI exists: #1a1a1a, #f7f3ea.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.72
 - **evidence:** 2 of 2 repos with CSS colors (2)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`
 - **signals:** #1a1a1a in 2 repos; #f7f3ea in 2 repos
 
 ### `design.layout.app-router`
 
 - **statement:** Prefer the Next.js App Router (app/) for web projects.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.72
 - **evidence:** 2 of 2 Next.js repos (2)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`
 - **signals:** app/
 
 ### `design.typography.recurring`
 
 - **statement:** Prefer Georgia for UI text.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.72
 - **evidence:** 2 of 2 repos with a named font (2)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`
 - **signals:** font-family georgia; one named family
 
+### `design.typography.serif`
+
+- **statement:** Prefer a serif for long reading.
+- **polarity:** prefer
+- **kind:** rule
+- **confidence:** 0.70
+- **evidence:** proposed edit (0)
+- **origin:** proposal, locked
+- **sources:** `proposal`
+- **signals:** accepted proposal
+
 ### `feedback.purple-gradient`
 
 - **statement:** Avoid the purple gradient because it feels loud.
 - **polarity:** avoid
 - **kind:** rule
 - **confidence:** 0.60
 - **evidence:** 1 direct feedback note (1)
 - **origin:** feedback, locked
 - **sources:** `feedback`
 - **signals:** feedback 2026-01-03T00:00:00.000Z dislike
 
 ## Stack and tooling
 
 ### `stack.pkg.npm`
 
 - **statement:** Use npm as the default package manager.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.79
 - **evidence:** 3 of 3 Node repos (3)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`, `notes-cli`
 - **signals:** package-lock.json or package.json
 
 ### `stack.language.typescript`
 
 - **statement:** Default to TypeScript. It is the primary language in 3 of 4 repos (76% of detected bytes).
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.63
 - **evidence:** 3 of 4 repos with a primary language (3)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`, `notes-cli`
 - **signals:** 76% of detected bytes; primary language in 3 repos
 
 ### `stack.ci.github-actions`
 
 - **statement:** Use GitHub Actions for CI.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.44
 - **evidence:** 2 of 4 repos (2)
 - **origin:** heuristic
 - **sources:** `garden-web`, `notes-cli`
 - **signals:** GitHub Actions workflow
 
 ### `stack.framework.next`
 
 - **statement:** When the work is a web UI, prefer Next.js.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.44
 - **evidence:** 2 of 4 repos (2)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`
 - **signals:** next dependency or next.config; React is present wherever Next.js is
 
 ### `stack.ui.tailwind`
 
 - **statement:** Prefer Tailwind CSS utility classes for styling.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.44
 - **evidence:** 2 of 4 repos (2)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`
 - **signals:** Tailwind CSS
 
 ## Code style
 
 ### `code.commits.conventional`
 
 - **statement:** Write Conventional Commits (`feat:`, `fix:`, `chore:`).
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.83
 - **evidence:** 4 of 4 repos with commit samples (4)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`
 - **signals:** 4/4 conventional subjects; 3/4 conventional subjects
 
 ### `code.module.esm`
 
 - **statement:** Author Node packages as ESM (`"type": "module"`).
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.79
 - **evidence:** 3 of 3 Node repos (3)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`, `notes-cli`
 - **signals:** "type": "module"
 
 ### `code.typescript.strict`
 
 - **statement:** Keep TypeScript strict.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.79
 - **evidence:** 3 of 3 tsconfig files (3)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`, `notes-cli`
 - **signals:** compilerOptions.strict true
 
 ### `code.format.no-semicolons`
 
 - **statement:** Omit semicolons.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.72
 - **evidence:** 2 of 2 formatter configs (2)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`
 - **signals:** semi false
 
 ### `code.format.single-quotes`
 
 - **statement:** Prefer single quotes.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.72
 - **evidence:** 2 of 2 formatter configs (2)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`
 - **signals:** singleQuote true
 
 ### `code.format.prettier`
 
 - **statement:** Format code with Prettier.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.53
 - **evidence:** 2 of 3 Node repos (2)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`
 - **signals:** prettier
 
 ### `code.lint.eslint`
 
 - **statement:** Lint TypeScript and JavaScript with ESLint.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.53
 - **evidence:** 2 of 3 Node repos (2)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`
 - **signals:** eslint
 
 ## Naming
 
 ### `naming.repos.lowercase`
 
 - **statement:** Use lowercase repository names, and hyphenate when the name has more than one word.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.83
 - **evidence:** 4 of 4 repos (4)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`
 - **signals:** 4 lowercase; 0 camelCase or PascalCase
 
 ## Repo structure
 
 ### `structure.license.mit`
 
 - **statement:** Use the MIT license unless a repo needs something else.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.83
 - **evidence:** 4 of 4 repos (4)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`
 - **signals:** MIT
 
 ### `structure.readme`
 
 - **statement:** Lead every repo with a README that states what it is and how to run it.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.83
 - **evidence:** 4 of 4 repos (4)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`
 - **signals:** README
 
 ### `structure.contributing`
 
 - **statement:** Ship a CONTRIBUTING.md with repos that other people are expected to touch.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.44
 - **evidence:** 2 of 4 repos (2)
 - **origin:** heuristic
 - **sources:** `garden-web`, `notes-cli`
 - **signals:** CONTRIBUTING.md
 
 ### `structure.src`
 
 - **statement:** Put implementation code under src/ unless the framework uses another root, such as a Next.js app/ directory.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.44
 - **evidence:** 2 of 4 repos (2)
 - **origin:** heuristic
 - **sources:** `notes-cli`, `plot-tools`
 - **signals:** src/
 
 ### `structure.tests`
 
 - **statement:** Keep tests in test/ or tests/ next to the code.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.44
 - **evidence:** 2 of 4 repos (2)
 - **origin:** heuristic
 - **sources:** `notes-cli`, `plot-tools`
 - **signals:** test directory or test file
 
 ## Copy and tone
 
 ### `copy.readme.quickstart`
 
 - **statement:** Open READMEs with what it is and a short quickstart.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.83
 - **evidence:** 4 of 4 READMEs (4)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`
 - **signals:** quickstart heading
 
 ### `copy.tone.direct`
 
 - **statement:** Write to the reader directly (you/your), in a practical voice.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.83
 - **evidence:** 4 of 4 READMEs (4)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`
 - **signals:** second person in 4 READMEs
 
 ### `copy.tone.few-emoji`
 
 - **statement:** Keep product copy and READMEs plain. Emoji are rare in the existing ones.
 - **polarity:** prefer
 - **kind:** rule
 - **confidence:** 0.83
 - **evidence:** 4 of 4 READMEs (4)
 - **origin:** heuristic
 - **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`
 - **signals:** no emoji in README
 
 ## Deploy habits
 
 _No rule yet._
 
 ## Dislikes
 
 ### `dislikes.product.dashboards`
 
 - **statement:** Avoid dashboards and SaaS chrome. Prefer a CLI, a file, or an agent surface.
 - **polarity:** avoid
 - **kind:** rule
 - **confidence:** 0.44
 - **evidence:** 2 of 4 repos (2)
 - **origin:** heuristic
 - **sources:** `paper-page`, `notes-cli`
 - **signals:** readme says no dashboard or no SaaS
 
 Also avoided, with the full rule in its topic section:
 
 - `feedback.purple-gradient` — Avoid the purple gradient because it feels loud. (confidence 0.60)
 
 ## Observations
 
 These showed up once, or at low frequency. Do not treat them as defaults. A later like can promote one.
 
 ### `stack.agents.instruction-files`
 
 - **statement:** Check in agent instruction files (CLAUDE.md, AGENTS.md, or Cursor rules) with the repo.
 - **polarity:** note
 - **kind:** observation
 - **confidence:** 0.27
 - **evidence:** 1 of 4 repos (1)
 - **origin:** heuristic
 - **sources:** `notes-cli`
 - **signals:** agent instruction file
 
 ### `stack.agents.tools`
 
 - **statement:** Build agent-facing tools (CLIs, MCP servers, skills) as a normal output, not an afterthought.
 - **polarity:** note
 - **kind:** observation
 - **confidence:** 0.27
 - **evidence:** 1 of 4 repos (1)
 - **origin:** heuristic
 - **sources:** `notes-cli`
 - **signals:** agent or MCP mention
 
 ### `stack.language.python`
 
 - **statement:** Python is a primary language in 1 of 4 repos (19% of detected bytes). Not enough to treat as the default.
 - **polarity:** note
 - **kind:** observation
 - **confidence:** 0.27
 - **evidence:** 1 of 4 repos with a primary language (1)
 - **origin:** heuristic
 - **sources:** `plot-tools`
 - **signals:** 19% of detected bytes; primary language in 1 repos
 
 ### `stack.test.vitest`
 
 - **statement:** Prefer Vitest for tests.
 - **polarity:** note
 - **kind:** observation
 - **confidence:** 0.27
 - **evidence:** 1 of 4 repos (1)
 - **origin:** heuristic
 - **sources:** `notes-cli`
 - **signals:** Vitest
 
 ### `code.python.ruff`
 
 - **statement:** Lint Python with Ruff.
 - **polarity:** note
 - **kind:** observation
 - **confidence:** 0.40
 - **evidence:** 1 of 4 repos (1)
 - **origin:** heuristic
 - **sources:** `plot-tools`
 - **signals:** ruff
 
 ### `structure.install-script`
 
 - **statement:** Provide an install.sh for tools people clone and run.
 - **polarity:** note
 - **kind:** observation
 - **confidence:** 0.27
 - **evidence:** 1 of 4 repos (1)
 - **origin:** heuristic
 - **sources:** `notes-cli`
 - **signals:** install.sh
 
 ### `copy.privacy`
 
 - **statement:** One repo emphasizes privacy. Not enough to treat as a default.
 - **polarity:** note
 - **kind:** observation
 - **confidence:** 0.27
 - **evidence:** 1 of 4 repos (1)
 - **origin:** heuristic
 - **sources:** `plot-tools`
 - **signals:** privacy phrasing
 
 ### `deploy.vercel`
 
 - **statement:** vercel config appeared in 1 of 4 repos. Not enough to treat it as a default.
 - **polarity:** note
 - **kind:** observation
 - **confidence:** 0.27
 - **evidence:** 1 of 4 repos (1)
 - **origin:** heuristic
 - **sources:** `garden-web`
 - **signals:** vercel.json
 
 ## Likes / dislikes log
 
 ### 2026-01-02T00:00:00.000Z · like · `design.minimalism.small-dependency-surface`
 
 - **feedback:** the small dependency surface
 - **because:** —
 - **confidence:** 0.79 → 0.91
 
 ### 2026-01-03T00:00:00.000Z · dislike · `feedback.purple-gradient`
 
 - **feedback:** the purple gradient
 - **because:** it feels loud
 
 ## Changelog
 
 - `2026-01-01T00:00:00.000Z` **init** — Initial profile from 4 public repos. 26 rules, 8 observations.
 - `2026-01-02T00:00:00.000Z` **learn** — like design.minimalism.small-dependency-surface. Confidence 0.79 → 0.91.
 - `2026-01-03T00:00:00.000Z` **learn** — Added feedback.purple-gradient from dislike feedback at confidence 0.60.
 
 ## Open proposals
 
 _No open proposals._
 
 ## Agent data
 
 The JSON fence is normative. Tools read and write this block. The sections above are a rendering of it. If they disagree, the fence wins. Edit with the CLI so the two stay together.
 
 ```json personal-md
 {
   "schema": "personal-md/v1",
   "subject": "ada",
   "generatedAt": "2026-01-01T00:00:00.000Z",
-  "updatedAt": "2026-01-03T00:00:00.000Z",
+  "updatedAt": "2026-01-04T00:00:00.000Z",
   "analyzer": "heuristic",
   "summary": "ada's profile was inferred from 4 public repositories. Strongest default: Write Conventional Commits (`feat:`, `fix:`, `chore:`). Design defaults include 4 rules at confidence 0.50 or higher. 1 secret-like path was counted and not read. Evidence counts stay tied to repositories. Likes and dislikes move confidence and are appended to the log.",
   "stats": {
     "visibility": "public",
     "includesPrivate": false,
     "reposScanned": 4,
     "forksSkipped": 1,
     "privateExcluded": 1,
     "archived": 0,
     "failed": [],
     "secretsSkipped": 1,
     "treesTruncated": 0,
     "languages": [
       {
         "language": "TypeScript",
         "bytes": 20000
       },
       {
         "language": "Python",
         "bytes": 5000
       },
       {
         "language": "CSS",
         "bytes": 1400
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
       "confidence": 0.91,
       "baseConfidence": 0.79,
       "delta": 0.12,
       "evidence": 3,
       "evidenceTotal": 3,
       "evidenceLabel": "3 of 3 Node repos",
       "sources": [
         "garden-web",
         "paper-page",
         "notes-cli"
       ],
       "signals": [
         "median production dependencies: 4",
         "feedback 2026-01-02T00:00:00.000Z like"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-02T00:00:00.000Z"
     },
     {
       "id": "design.color.recurring",
       "section": "design",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Prefer these recurring colors when a UI exists: #1a1a1a, #f7f3ea.",
       "confidence": 0.72,
       "baseConfidence": 0.72,
       "delta": 0,
       "evidence": 2,
       "evidenceTotal": 2,
       "evidenceLabel": "2 of 2 repos with CSS colors",
       "sources": [
         "garden-web",
         "paper-page"
       ],
       "signals": [
         "#1a1a1a in 2 repos",
         "#f7f3ea in 2 repos"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "design.layout.app-router",
       "section": "design",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Prefer the Next.js App Router (app/) for web projects.",
       "confidence": 0.72,
       "baseConfidence": 0.72,
       "delta": 0,
       "evidence": 2,
       "evidenceTotal": 2,
       "evidenceLabel": "2 of 2 Next.js repos",
       "sources": [
         "garden-web",
         "paper-page"
       ],
       "signals": [
         "app/"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "design.typography.recurring",
       "section": "design",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Prefer Georgia for UI text.",
       "confidence": 0.72,
       "baseConfidence": 0.72,
       "delta": 0,
       "evidence": 2,
       "evidenceTotal": 2,
       "evidenceLabel": "2 of 2 repos with a named font",
       "sources": [
         "garden-web",
         "paper-page"
       ],
       "signals": [
         "font-family georgia",
         "one named family"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
+      "id": "design.typography.serif",
+      "section": "design",
+      "kind": "rule",
+      "polarity": "prefer",
+      "statement": "Prefer a serif for long reading.",
+      "confidence": 0.7,
+      "baseConfidence": 0.7,
+      "delta": 0,
+      "evidence": 0,
+      "evidenceTotal": 0,
+      "evidenceLabel": "proposed edit",
+      "sources": [
+        "proposal"
+      ],
+      "signals": [
+        "accepted proposal"
+      ],
+      "origin": "proposal",
+      "locked": true,
+      "updated": "2026-01-04T00:00:00.000Z"
+    },
+    {
       "id": "feedback.purple-gradient",
       "section": "design",
       "kind": "rule",
       "polarity": "avoid",
       "statement": "Avoid the purple gradient because it feels loud.",
       "confidence": 0.6,
       "baseConfidence": 0.6,
       "delta": 0,
       "evidence": 1,
       "evidenceTotal": 1,
       "evidenceLabel": "1 direct feedback note",
       "sources": [
         "feedback"
       ],
       "signals": [
         "feedback 2026-01-03T00:00:00.000Z dislike"
       ],
       "origin": "feedback",
       "locked": true,
       "updated": "2026-01-03T00:00:00.000Z"
     },
     {
       "id": "stack.pkg.npm",
       "section": "stack",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Use npm as the default package manager.",
       "confidence": 0.79,
       "baseConfidence": 0.79,
       "delta": 0,
       "evidence": 3,
       "evidenceTotal": 3,
       "evidenceLabel": "3 of 3 Node repos",
       "sources": [
         "garden-web",
         "paper-page",
         "notes-cli"
       ],
       "signals": [
         "package-lock.json or package.json"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "stack.language.typescript",
       "section": "stack",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Default to TypeScript. It is the primary language in 3 of 4 repos (76% of detected bytes).",
       "confidence": 0.63,
       "baseConfidence": 0.63,
       "delta": 0,
       "evidence": 3,
       "evidenceTotal": 4,
       "evidenceLabel": "3 of 4 repos with a primary language",
       "sources": [
         "garden-web",
         "paper-page",
         "notes-cli"
       ],
       "signals": [
         "76% of detected bytes",
         "primary language in 3 repos"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "stack.ci.github-actions",
       "section": "stack",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Use GitHub Actions for CI.",
       "confidence": 0.44,
       "baseConfidence": 0.44,
       "delta": 0,
       "evidence": 2,
       "evidenceTotal": 4,
       "evidenceLabel": "2 of 4 repos",
       "sources": [
         "garden-web",
         "notes-cli"
       ],
       "signals": [
         "GitHub Actions workflow"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "stack.framework.next",
       "section": "stack",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "When the work is a web UI, prefer Next.js.",
       "confidence": 0.44,
       "baseConfidence": 0.44,
       "delta": 0,
       "evidence": 2,
       "evidenceTotal": 4,
       "evidenceLabel": "2 of 4 repos",
       "sources": [
         "garden-web",
         "paper-page"
       ],
       "signals": [
         "next dependency or next.config",
         "React is present wherever Next.js is"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "stack.ui.tailwind",
       "section": "stack",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Prefer Tailwind CSS utility classes for styling.",
       "confidence": 0.44,
       "baseConfidence": 0.44,
       "delta": 0,
       "evidence": 2,
       "evidenceTotal": 4,
       "evidenceLabel": "2 of 4 repos",
       "sources": [
         "garden-web",
         "paper-page"
       ],
       "signals": [
         "Tailwind CSS"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "stack.agents.instruction-files",
       "section": "stack",
       "kind": "observation",
       "polarity": "note",
       "statement": "Check in agent instruction files (CLAUDE.md, AGENTS.md, or Cursor rules) with the repo.",
       "confidence": 0.27,
       "baseConfidence": 0.27,
       "delta": 0,
       "evidence": 1,
       "evidenceTotal": 4,
       "evidenceLabel": "1 of 4 repos",
       "sources": [
         "notes-cli"
       ],
       "signals": [
         "agent instruction file"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "stack.agents.tools",
       "section": "stack",
       "kind": "observation",
       "polarity": "note",
       "statement": "Build agent-facing tools (CLIs, MCP servers, skills) as a normal output, not an afterthought.",
       "confidence": 0.27,
       "baseConfidence": 0.27,
       "delta": 0,
       "evidence": 1,
       "evidenceTotal": 4,
       "evidenceLabel": "1 of 4 repos",
       "sources": [
         "notes-cli"
       ],
       "signals": [
         "agent or MCP mention"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "stack.language.python",
       "section": "stack",
       "kind": "observation",
       "polarity": "note",
       "statement": "Python is a primary language in 1 of 4 repos (19% of detected bytes). Not enough to treat as the default.",
       "confidence": 0.27,
       "baseConfidence": 0.27,
       "delta": 0,
       "evidence": 1,
       "evidenceTotal": 4,
       "evidenceLabel": "1 of 4 repos with a primary language",
       "sources": [
         "plot-tools"
       ],
       "signals": [
         "19% of detected bytes",
         "primary language in 1 repos"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "stack.test.vitest",
       "section": "stack",
       "kind": "observation",
       "polarity": "note",
       "statement": "Prefer Vitest for tests.",
       "confidence": 0.27,
       "baseConfidence": 0.27,
       "delta": 0,
       "evidence": 1,
       "evidenceTotal": 4,
       "evidenceLabel": "1 of 4 repos",
       "sources": [
         "notes-cli"
       ],
       "signals": [
         "Vitest"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "code.commits.conventional",
       "section": "code",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Write Conventional Commits (`feat:`, `fix:`, `chore:`).",
       "confidence": 0.83,
       "baseConfidence": 0.83,
       "delta": 0,
       "evidence": 4,
       "evidenceTotal": 4,
       "evidenceLabel": "4 of 4 repos with commit samples",
       "sources": [
         "garden-web",
         "paper-page",
         "notes-cli",
         "plot-tools"
       ],
       "signals": [
         "4/4 conventional subjects",
         "3/4 conventional subjects"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "code.module.esm",
       "section": "code",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Author Node packages as ESM (`\"type\": \"module\"`).",
       "confidence": 0.79,
       "baseConfidence": 0.79,
       "delta": 0,
       "evidence": 3,
       "evidenceTotal": 3,
       "evidenceLabel": "3 of 3 Node repos",
       "sources": [
         "garden-web",
         "paper-page",
         "notes-cli"
       ],
       "signals": [
         "\"type\": \"module\""
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "code.typescript.strict",
       "section": "code",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Keep TypeScript strict.",
       "confidence": 0.79,
       "baseConfidence": 0.79,
       "delta": 0,
       "evidence": 3,
       "evidenceTotal": 3,
       "evidenceLabel": "3 of 3 tsconfig files",
       "sources": [
         "garden-web",
         "paper-page",
         "notes-cli"
       ],
       "signals": [
         "compilerOptions.strict true"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "code.format.no-semicolons",
       "section": "code",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Omit semicolons.",
       "confidence": 0.72,
       "baseConfidence": 0.72,
       "delta": 0,
       "evidence": 2,
       "evidenceTotal": 2,
       "evidenceLabel": "2 of 2 formatter configs",
       "sources": [
         "garden-web",
         "paper-page"
       ],
       "signals": [
         "semi false"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "code.format.single-quotes",
       "section": "code",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Prefer single quotes.",
       "confidence": 0.72,
       "baseConfidence": 0.72,
       "delta": 0,
       "evidence": 2,
       "evidenceTotal": 2,
       "evidenceLabel": "2 of 2 formatter configs",
       "sources": [
         "garden-web",
         "paper-page"
       ],
       "signals": [
         "singleQuote true"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "code.format.prettier",
       "section": "code",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Format code with Prettier.",
       "confidence": 0.53,
       "baseConfidence": 0.53,
       "delta": 0,
       "evidence": 2,
       "evidenceTotal": 3,
       "evidenceLabel": "2 of 3 Node repos",
       "sources": [
         "garden-web",
         "paper-page"
       ],
       "signals": [
         "prettier"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "code.lint.eslint",
       "section": "code",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Lint TypeScript and JavaScript with ESLint.",
       "confidence": 0.53,
       "baseConfidence": 0.53,
       "delta": 0,
       "evidence": 2,
       "evidenceTotal": 3,
       "evidenceLabel": "2 of 3 Node repos",
       "sources": [
         "garden-web",
         "paper-page"
       ],
       "signals": [
         "eslint"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "code.python.ruff",
       "section": "code",
       "kind": "observation",
       "polarity": "note",
       "statement": "Lint Python with Ruff.",
       "confidence": 0.4,
       "baseConfidence": 0.4,
       "delta": 0,
       "evidence": 1,
       "evidenceTotal": 1,
       "evidenceLabel": "1 of 4 repos",
       "sources": [
         "plot-tools"
       ],
       "signals": [
         "ruff"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "naming.repos.lowercase",
       "section": "naming",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Use lowercase repository names, and hyphenate when the name has more than one word.",
       "confidence": 0.83,
       "baseConfidence": 0.83,
       "delta": 0,
       "evidence": 4,
       "evidenceTotal": 4,
       "evidenceLabel": "4 of 4 repos",
       "sources": [
         "garden-web",
         "paper-page",
         "notes-cli",
         "plot-tools"
       ],
       "signals": [
         "4 lowercase",
         "0 camelCase or PascalCase"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "structure.license.mit",
       "section": "structure",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Use the MIT license unless a repo needs something else.",
       "confidence": 0.83,
       "baseConfidence": 0.83,
       "delta": 0,
       "evidence": 4,
       "evidenceTotal": 4,
       "evidenceLabel": "4 of 4 repos",
       "sources": [
         "garden-web",
         "paper-page",
         "notes-cli",
         "plot-tools"
       ],
       "signals": [
         "MIT"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "structure.readme",
       "section": "structure",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Lead every repo with a README that states what it is and how to run it.",
       "confidence": 0.83,
       "baseConfidence": 0.83,
       "delta": 0,
       "evidence": 4,
       "evidenceTotal": 4,
       "evidenceLabel": "4 of 4 repos",
       "sources": [
         "garden-web",
         "paper-page",
         "notes-cli",
         "plot-tools"
       ],
       "signals": [
         "README"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "structure.contributing",
       "section": "structure",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Ship a CONTRIBUTING.md with repos that other people are expected to touch.",
       "confidence": 0.44,
       "baseConfidence": 0.44,
       "delta": 0,
       "evidence": 2,
       "evidenceTotal": 4,
       "evidenceLabel": "2 of 4 repos",
       "sources": [
         "garden-web",
         "notes-cli"
       ],
       "signals": [
         "CONTRIBUTING.md"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "structure.src",
       "section": "structure",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Put implementation code under src/ unless the framework uses another root, such as a Next.js app/ directory.",
       "confidence": 0.44,
       "baseConfidence": 0.44,
       "delta": 0,
       "evidence": 2,
       "evidenceTotal": 4,
       "evidenceLabel": "2 of 4 repos",
       "sources": [
         "notes-cli",
         "plot-tools"
       ],
       "signals": [
         "src/"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "structure.tests",
       "section": "structure",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Keep tests in test/ or tests/ next to the code.",
       "confidence": 0.44,
       "baseConfidence": 0.44,
       "delta": 0,
       "evidence": 2,
       "evidenceTotal": 4,
       "evidenceLabel": "2 of 4 repos",
       "sources": [
         "notes-cli",
         "plot-tools"
       ],
       "signals": [
         "test directory or test file"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "structure.install-script",
       "section": "structure",
       "kind": "observation",
       "polarity": "note",
       "statement": "Provide an install.sh for tools people clone and run.",
       "confidence": 0.27,
       "baseConfidence": 0.27,
       "delta": 0,
       "evidence": 1,
       "evidenceTotal": 4,
       "evidenceLabel": "1 of 4 repos",
       "sources": [
         "notes-cli"
       ],
       "signals": [
         "install.sh"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "copy.readme.quickstart",
       "section": "copy",
       "kind": "rule",
       "polarity": "prefer",
       "statement": "Open READMEs with what it is and a short quickstart.",
       "confidence": 0.83,
       "baseConfidence": 0.83,
       "delta": 0,
       "evidence": 4,
       "evidenceTotal": 4,
       "evidenceLabel": "4 of 4 READMEs",
       "sources": [
         "garden-web",
         "paper-page",
         "notes-cli",
         "plot-tools"
       ],
       "signals": [
         "quickstart heading"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
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
       "evidence": 4,
       "evidenceTotal": 4,
       "evidenceLabel": "4 of 4 READMEs",
       "sources": [
         "garden-web",
         "paper-page",
         "notes-cli",
         "plot-tools"
       ],
       "signals": [
         "second person in 4 READMEs"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
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
       "evidence": 4,
       "evidenceTotal": 4,
       "evidenceLabel": "4 of 4 READMEs",
       "sources": [
         "garden-web",
         "paper-page",
         "notes-cli",
         "plot-tools"
       ],
       "signals": [
         "no emoji in README"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "copy.privacy",
       "section": "copy",
       "kind": "observation",
       "polarity": "note",
       "statement": "One repo emphasizes privacy. Not enough to treat as a default.",
       "confidence": 0.27,
       "baseConfidence": 0.27,
       "delta": 0,
       "evidence": 1,
       "evidenceTotal": 4,
       "evidenceLabel": "1 of 4 repos",
       "sources": [
         "plot-tools"
       ],
       "signals": [
         "privacy phrasing"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "deploy.vercel",
       "section": "deploy",
       "kind": "observation",
       "polarity": "note",
       "statement": "vercel config appeared in 1 of 4 repos. Not enough to treat it as a default.",
       "confidence": 0.27,
       "baseConfidence": 0.27,
       "delta": 0,
       "evidence": 1,
       "evidenceTotal": 4,
       "evidenceLabel": "1 of 4 repos",
       "sources": [
         "garden-web"
       ],
       "signals": [
         "vercel.json"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     },
     {
       "id": "dislikes.product.dashboards",
       "section": "dislikes",
       "kind": "rule",
       "polarity": "avoid",
       "statement": "Avoid dashboards and SaaS chrome. Prefer a CLI, a file, or an agent surface.",
       "confidence": 0.44,
       "baseConfidence": 0.44,
       "delta": 0,
       "evidence": 2,
       "evidenceTotal": 4,
       "evidenceLabel": "2 of 4 repos",
       "sources": [
         "paper-page",
         "notes-cli"
       ],
       "signals": [
         "readme says no dashboard or no SaaS"
       ],
       "origin": "heuristic",
       "locked": false,
       "updated": "2026-01-01T00:00:00.000Z"
     }
   ],
   "log": [
     {
       "at": "2026-01-02T00:00:00.000Z",
       "kind": "like",
       "feedback": "the small dependency surface",
       "because": null,
       "ruleId": "design.minimalism.small-dependency-surface",
       "confidenceBefore": 0.79,
       "confidenceAfter": 0.91
     },
     {
       "at": "2026-01-03T00:00:00.000Z",
       "kind": "dislike",
       "feedback": "the purple gradient",
       "because": "it feels loud",
       "ruleId": "feedback.purple-gradient",
       "confidenceBefore": null,
       "confidenceAfter": 0.6
     }
   ],
   "changelog": [
     {
       "at": "2026-01-01T00:00:00.000Z",
       "command": "init",
       "summary": "Initial profile from 4 public repos. 26 rules, 8 observations."
     },
     {
       "at": "2026-01-02T00:00:00.000Z",
       "command": "learn",
       "summary": "like design.minimalism.small-dependency-surface. Confidence 0.79 → 0.91."
     },
     {
       "at": "2026-01-03T00:00:00.000Z",
       "command": "learn",
       "summary": "Added feedback.purple-gradient from dislike feedback at confidence 0.60."
     }
   ],
   "proposals": []
 }
 ```
```

## Agent data

The JSON fence is normative. Tools read and write this block. The sections above are a rendering of it. If they disagree, the fence wins. Edit with the CLI so the two stay together.

```json personal-md
{
  "schema": "personal-md/v1",
  "subject": "ada",
  "generatedAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-04T00:00:00.000Z",
  "analyzer": "heuristic",
  "summary": "ada's profile was inferred from 4 public repositories. Strongest default: Write Conventional Commits (`feat:`, `fix:`, `chore:`). Design defaults include 4 rules at confidence 0.50 or higher. 1 secret-like path was counted and not read. Evidence counts stay tied to repositories. Likes and dislikes move confidence and are appended to the log.",
  "stats": {
    "visibility": "public",
    "includesPrivate": false,
    "reposScanned": 4,
    "forksSkipped": 1,
    "privateExcluded": 1,
    "archived": 0,
    "failed": [],
    "secretsSkipped": 1,
    "treesTruncated": 0,
    "languages": [
      {
        "language": "TypeScript",
        "bytes": 20000
      },
      {
        "language": "Python",
        "bytes": 5000
      },
      {
        "language": "CSS",
        "bytes": 1400
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
      "confidence": 0.91,
      "baseConfidence": 0.79,
      "delta": 0.12,
      "evidence": 3,
      "evidenceTotal": 3,
      "evidenceLabel": "3 of 3 Node repos",
      "sources": [
        "garden-web",
        "paper-page",
        "notes-cli"
      ],
      "signals": [
        "median production dependencies: 4",
        "feedback 2026-01-02T00:00:00.000Z like"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-02T00:00:00.000Z"
    },
    {
      "id": "design.color.recurring",
      "section": "design",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Prefer these recurring colors when a UI exists: #1a1a1a, #f7f3ea.",
      "confidence": 0.72,
      "baseConfidence": 0.72,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 2,
      "evidenceLabel": "2 of 2 repos with CSS colors",
      "sources": [
        "garden-web",
        "paper-page"
      ],
      "signals": [
        "#1a1a1a in 2 repos",
        "#f7f3ea in 2 repos"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "design.layout.app-router",
      "section": "design",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Prefer the Next.js App Router (app/) for web projects.",
      "confidence": 0.72,
      "baseConfidence": 0.72,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 2,
      "evidenceLabel": "2 of 2 Next.js repos",
      "sources": [
        "garden-web",
        "paper-page"
      ],
      "signals": [
        "app/"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "design.typography.recurring",
      "section": "design",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Prefer Georgia for UI text.",
      "confidence": 0.72,
      "baseConfidence": 0.72,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 2,
      "evidenceLabel": "2 of 2 repos with a named font",
      "sources": [
        "garden-web",
        "paper-page"
      ],
      "signals": [
        "font-family georgia",
        "one named family"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "feedback.purple-gradient",
      "section": "design",
      "kind": "rule",
      "polarity": "avoid",
      "statement": "Avoid the purple gradient because it feels loud.",
      "confidence": 0.6,
      "baseConfidence": 0.6,
      "delta": 0,
      "evidence": 1,
      "evidenceTotal": 1,
      "evidenceLabel": "1 direct feedback note",
      "sources": [
        "feedback"
      ],
      "signals": [
        "feedback 2026-01-03T00:00:00.000Z dislike"
      ],
      "origin": "feedback",
      "locked": true,
      "updated": "2026-01-03T00:00:00.000Z"
    },
    {
      "id": "stack.pkg.npm",
      "section": "stack",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Use npm as the default package manager.",
      "confidence": 0.79,
      "baseConfidence": 0.79,
      "delta": 0,
      "evidence": 3,
      "evidenceTotal": 3,
      "evidenceLabel": "3 of 3 Node repos",
      "sources": [
        "garden-web",
        "paper-page",
        "notes-cli"
      ],
      "signals": [
        "package-lock.json or package.json"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "stack.language.typescript",
      "section": "stack",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Default to TypeScript. It is the primary language in 3 of 4 repos (76% of detected bytes).",
      "confidence": 0.63,
      "baseConfidence": 0.63,
      "delta": 0,
      "evidence": 3,
      "evidenceTotal": 4,
      "evidenceLabel": "3 of 4 repos with a primary language",
      "sources": [
        "garden-web",
        "paper-page",
        "notes-cli"
      ],
      "signals": [
        "76% of detected bytes",
        "primary language in 3 repos"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "stack.ci.github-actions",
      "section": "stack",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Use GitHub Actions for CI.",
      "confidence": 0.44,
      "baseConfidence": 0.44,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 4,
      "evidenceLabel": "2 of 4 repos",
      "sources": [
        "garden-web",
        "notes-cli"
      ],
      "signals": [
        "GitHub Actions workflow"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "stack.framework.next",
      "section": "stack",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "When the work is a web UI, prefer Next.js.",
      "confidence": 0.44,
      "baseConfidence": 0.44,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 4,
      "evidenceLabel": "2 of 4 repos",
      "sources": [
        "garden-web",
        "paper-page"
      ],
      "signals": [
        "next dependency or next.config",
        "React is present wherever Next.js is"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "stack.ui.tailwind",
      "section": "stack",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Prefer Tailwind CSS utility classes for styling.",
      "confidence": 0.44,
      "baseConfidence": 0.44,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 4,
      "evidenceLabel": "2 of 4 repos",
      "sources": [
        "garden-web",
        "paper-page"
      ],
      "signals": [
        "Tailwind CSS"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "stack.agents.instruction-files",
      "section": "stack",
      "kind": "observation",
      "polarity": "note",
      "statement": "Check in agent instruction files (CLAUDE.md, AGENTS.md, or Cursor rules) with the repo.",
      "confidence": 0.27,
      "baseConfidence": 0.27,
      "delta": 0,
      "evidence": 1,
      "evidenceTotal": 4,
      "evidenceLabel": "1 of 4 repos",
      "sources": [
        "notes-cli"
      ],
      "signals": [
        "agent instruction file"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "stack.agents.tools",
      "section": "stack",
      "kind": "observation",
      "polarity": "note",
      "statement": "Build agent-facing tools (CLIs, MCP servers, skills) as a normal output, not an afterthought.",
      "confidence": 0.27,
      "baseConfidence": 0.27,
      "delta": 0,
      "evidence": 1,
      "evidenceTotal": 4,
      "evidenceLabel": "1 of 4 repos",
      "sources": [
        "notes-cli"
      ],
      "signals": [
        "agent or MCP mention"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "stack.language.python",
      "section": "stack",
      "kind": "observation",
      "polarity": "note",
      "statement": "Python is a primary language in 1 of 4 repos (19% of detected bytes). Not enough to treat as the default.",
      "confidence": 0.27,
      "baseConfidence": 0.27,
      "delta": 0,
      "evidence": 1,
      "evidenceTotal": 4,
      "evidenceLabel": "1 of 4 repos with a primary language",
      "sources": [
        "plot-tools"
      ],
      "signals": [
        "19% of detected bytes",
        "primary language in 1 repos"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "stack.test.vitest",
      "section": "stack",
      "kind": "observation",
      "polarity": "note",
      "statement": "Prefer Vitest for tests.",
      "confidence": 0.27,
      "baseConfidence": 0.27,
      "delta": 0,
      "evidence": 1,
      "evidenceTotal": 4,
      "evidenceLabel": "1 of 4 repos",
      "sources": [
        "notes-cli"
      ],
      "signals": [
        "Vitest"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "code.commits.conventional",
      "section": "code",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Write Conventional Commits (`feat:`, `fix:`, `chore:`).",
      "confidence": 0.83,
      "baseConfidence": 0.83,
      "delta": 0,
      "evidence": 4,
      "evidenceTotal": 4,
      "evidenceLabel": "4 of 4 repos with commit samples",
      "sources": [
        "garden-web",
        "paper-page",
        "notes-cli",
        "plot-tools"
      ],
      "signals": [
        "4/4 conventional subjects",
        "3/4 conventional subjects"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "code.module.esm",
      "section": "code",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Author Node packages as ESM (`\"type\": \"module\"`).",
      "confidence": 0.79,
      "baseConfidence": 0.79,
      "delta": 0,
      "evidence": 3,
      "evidenceTotal": 3,
      "evidenceLabel": "3 of 3 Node repos",
      "sources": [
        "garden-web",
        "paper-page",
        "notes-cli"
      ],
      "signals": [
        "\"type\": \"module\""
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "code.typescript.strict",
      "section": "code",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Keep TypeScript strict.",
      "confidence": 0.79,
      "baseConfidence": 0.79,
      "delta": 0,
      "evidence": 3,
      "evidenceTotal": 3,
      "evidenceLabel": "3 of 3 tsconfig files",
      "sources": [
        "garden-web",
        "paper-page",
        "notes-cli"
      ],
      "signals": [
        "compilerOptions.strict true"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "code.format.no-semicolons",
      "section": "code",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Omit semicolons.",
      "confidence": 0.72,
      "baseConfidence": 0.72,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 2,
      "evidenceLabel": "2 of 2 formatter configs",
      "sources": [
        "garden-web",
        "paper-page"
      ],
      "signals": [
        "semi false"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "code.format.single-quotes",
      "section": "code",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Prefer single quotes.",
      "confidence": 0.72,
      "baseConfidence": 0.72,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 2,
      "evidenceLabel": "2 of 2 formatter configs",
      "sources": [
        "garden-web",
        "paper-page"
      ],
      "signals": [
        "singleQuote true"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "code.format.prettier",
      "section": "code",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Format code with Prettier.",
      "confidence": 0.53,
      "baseConfidence": 0.53,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 3,
      "evidenceLabel": "2 of 3 Node repos",
      "sources": [
        "garden-web",
        "paper-page"
      ],
      "signals": [
        "prettier"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "code.lint.eslint",
      "section": "code",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Lint TypeScript and JavaScript with ESLint.",
      "confidence": 0.53,
      "baseConfidence": 0.53,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 3,
      "evidenceLabel": "2 of 3 Node repos",
      "sources": [
        "garden-web",
        "paper-page"
      ],
      "signals": [
        "eslint"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "code.python.ruff",
      "section": "code",
      "kind": "observation",
      "polarity": "note",
      "statement": "Lint Python with Ruff.",
      "confidence": 0.4,
      "baseConfidence": 0.4,
      "delta": 0,
      "evidence": 1,
      "evidenceTotal": 1,
      "evidenceLabel": "1 of 4 repos",
      "sources": [
        "plot-tools"
      ],
      "signals": [
        "ruff"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "naming.repos.lowercase",
      "section": "naming",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Use lowercase repository names, and hyphenate when the name has more than one word.",
      "confidence": 0.83,
      "baseConfidence": 0.83,
      "delta": 0,
      "evidence": 4,
      "evidenceTotal": 4,
      "evidenceLabel": "4 of 4 repos",
      "sources": [
        "garden-web",
        "paper-page",
        "notes-cli",
        "plot-tools"
      ],
      "signals": [
        "4 lowercase",
        "0 camelCase or PascalCase"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "structure.license.mit",
      "section": "structure",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Use the MIT license unless a repo needs something else.",
      "confidence": 0.83,
      "baseConfidence": 0.83,
      "delta": 0,
      "evidence": 4,
      "evidenceTotal": 4,
      "evidenceLabel": "4 of 4 repos",
      "sources": [
        "garden-web",
        "paper-page",
        "notes-cli",
        "plot-tools"
      ],
      "signals": [
        "MIT"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "structure.readme",
      "section": "structure",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Lead every repo with a README that states what it is and how to run it.",
      "confidence": 0.83,
      "baseConfidence": 0.83,
      "delta": 0,
      "evidence": 4,
      "evidenceTotal": 4,
      "evidenceLabel": "4 of 4 repos",
      "sources": [
        "garden-web",
        "paper-page",
        "notes-cli",
        "plot-tools"
      ],
      "signals": [
        "README"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "structure.contributing",
      "section": "structure",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Ship a CONTRIBUTING.md with repos that other people are expected to touch.",
      "confidence": 0.44,
      "baseConfidence": 0.44,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 4,
      "evidenceLabel": "2 of 4 repos",
      "sources": [
        "garden-web",
        "notes-cli"
      ],
      "signals": [
        "CONTRIBUTING.md"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "structure.src",
      "section": "structure",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Put implementation code under src/ unless the framework uses another root, such as a Next.js app/ directory.",
      "confidence": 0.44,
      "baseConfidence": 0.44,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 4,
      "evidenceLabel": "2 of 4 repos",
      "sources": [
        "notes-cli",
        "plot-tools"
      ],
      "signals": [
        "src/"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "structure.tests",
      "section": "structure",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Keep tests in test/ or tests/ next to the code.",
      "confidence": 0.44,
      "baseConfidence": 0.44,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 4,
      "evidenceLabel": "2 of 4 repos",
      "sources": [
        "notes-cli",
        "plot-tools"
      ],
      "signals": [
        "test directory or test file"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "structure.install-script",
      "section": "structure",
      "kind": "observation",
      "polarity": "note",
      "statement": "Provide an install.sh for tools people clone and run.",
      "confidence": 0.27,
      "baseConfidence": 0.27,
      "delta": 0,
      "evidence": 1,
      "evidenceTotal": 4,
      "evidenceLabel": "1 of 4 repos",
      "sources": [
        "notes-cli"
      ],
      "signals": [
        "install.sh"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "copy.readme.quickstart",
      "section": "copy",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Open READMEs with what it is and a short quickstart.",
      "confidence": 0.83,
      "baseConfidence": 0.83,
      "delta": 0,
      "evidence": 4,
      "evidenceTotal": 4,
      "evidenceLabel": "4 of 4 READMEs",
      "sources": [
        "garden-web",
        "paper-page",
        "notes-cli",
        "plot-tools"
      ],
      "signals": [
        "quickstart heading"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
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
      "evidence": 4,
      "evidenceTotal": 4,
      "evidenceLabel": "4 of 4 READMEs",
      "sources": [
        "garden-web",
        "paper-page",
        "notes-cli",
        "plot-tools"
      ],
      "signals": [
        "second person in 4 READMEs"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
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
      "evidence": 4,
      "evidenceTotal": 4,
      "evidenceLabel": "4 of 4 READMEs",
      "sources": [
        "garden-web",
        "paper-page",
        "notes-cli",
        "plot-tools"
      ],
      "signals": [
        "no emoji in README"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "copy.privacy",
      "section": "copy",
      "kind": "observation",
      "polarity": "note",
      "statement": "One repo emphasizes privacy. Not enough to treat as a default.",
      "confidence": 0.27,
      "baseConfidence": 0.27,
      "delta": 0,
      "evidence": 1,
      "evidenceTotal": 4,
      "evidenceLabel": "1 of 4 repos",
      "sources": [
        "plot-tools"
      ],
      "signals": [
        "privacy phrasing"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "deploy.vercel",
      "section": "deploy",
      "kind": "observation",
      "polarity": "note",
      "statement": "vercel config appeared in 1 of 4 repos. Not enough to treat it as a default.",
      "confidence": 0.27,
      "baseConfidence": 0.27,
      "delta": 0,
      "evidence": 1,
      "evidenceTotal": 4,
      "evidenceLabel": "1 of 4 repos",
      "sources": [
        "garden-web"
      ],
      "signals": [
        "vercel.json"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "dislikes.product.dashboards",
      "section": "dislikes",
      "kind": "rule",
      "polarity": "avoid",
      "statement": "Avoid dashboards and SaaS chrome. Prefer a CLI, a file, or an agent surface.",
      "confidence": 0.44,
      "baseConfidence": 0.44,
      "delta": 0,
      "evidence": 2,
      "evidenceTotal": 4,
      "evidenceLabel": "2 of 4 repos",
      "sources": [
        "paper-page",
        "notes-cli"
      ],
      "signals": [
        "readme says no dashboard or no SaaS"
      ],
      "origin": "heuristic",
      "locked": false,
      "updated": "2026-01-01T00:00:00.000Z"
    }
  ],
  "log": [
    {
      "at": "2026-01-02T00:00:00.000Z",
      "kind": "like",
      "feedback": "the small dependency surface",
      "because": null,
      "ruleId": "design.minimalism.small-dependency-surface",
      "confidenceBefore": 0.79,
      "confidenceAfter": 0.91
    },
    {
      "at": "2026-01-03T00:00:00.000Z",
      "kind": "dislike",
      "feedback": "the purple gradient",
      "because": "it feels loud",
      "ruleId": "feedback.purple-gradient",
      "confidenceBefore": null,
      "confidenceAfter": 0.6
    }
  ],
  "changelog": [
    {
      "at": "2026-01-01T00:00:00.000Z",
      "command": "init",
      "summary": "Initial profile from 4 public repos. 26 rules, 8 observations."
    },
    {
      "at": "2026-01-02T00:00:00.000Z",
      "command": "learn",
      "summary": "like design.minimalism.small-dependency-surface. Confidence 0.79 → 0.91."
    },
    {
      "at": "2026-01-03T00:00:00.000Z",
      "command": "learn",
      "summary": "Added feedback.purple-gradient from dislike feedback at confidence 0.60."
    },
    {
      "at": "2026-01-04T00:00:00.000Z",
      "command": "propose",
      "summary": "Opened prop_717d5913 for design.typography.serif. Waiting for approval."
    }
  ],
  "proposals": [
    {
      "id": "prop_717d5913",
      "at": "2026-01-04T00:00:00.000Z",
      "status": "pending",
      "ruleId": "design.typography.serif",
      "section": "design",
      "kind": "rule",
      "polarity": "prefer",
      "statement": "Prefer a serif for long reading.",
      "confidence": 0.7,
      "rationale": "A review asked for a reading face.",
      "diff": "--- a/personal.md\n+++ b/personal.md\n@@ -5,1361 +5,1394 @@\n includes_private: false\n analyzer: heuristic\n repos_scanned: 4\n-updated: 2026-01-03T00:00:00.000Z\n+updated: 2026-01-04T00:00:00.000Z\n ---\n \n # personal.md — ada\n \n > Read this before building anything for **ada**. Prefer higher confidence. Treat polarity `avoid` as a constraint. `note` is context, not a default. After the person accepts or rejects work, run `personal-md learn`.\n \n Confidence is a score from 0.05 to 0.98. The evidence label says what was counted. Feedback does not rewrite those counts; it shifts confidence and is appended to the log.\n \n ## Identity\n \n ada's profile was inferred from 4 public repositories. Strongest default: Write Conventional Commits (`feat:`, `fix:`, `chore:`). Design defaults include 4 rules at confidence 0.50 or higher. 1 secret-like path was counted and not read. Evidence counts stay tied to repositories. Likes and dislikes move confidence and are appended to the log.\n \n Language bytes:\n \n - TypeScript: 20000\n - Python: 5000\n - CSS: 1400\n \n Skipped 1 fork and excluded 1 private repo from this file.\n \n ## Design taste\n \n ### `design.minimalism.small-dependency-surface`\n \n - **statement:** Prefer a small dependency surface.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.91\n - **evidence:** 3 of 3 Node repos (3)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`, `notes-cli`\n - **signals:** median production dependencies: 4; feedback 2026-01-02T00:00:00.000Z like\n \n ### `design.color.recurring`\n \n - **statement:** Prefer these recurring colors when a UI exists: #1a1a1a, #f7f3ea.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.72\n - **evidence:** 2 of 2 repos with CSS colors (2)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`\n - **signals:** #1a1a1a in 2 repos; #f7f3ea in 2 repos\n \n ### `design.layout.app-router`\n \n - **statement:** Prefer the Next.js App Router (app/) for web projects.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.72\n - **evidence:** 2 of 2 Next.js repos (2)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`\n - **signals:** app/\n \n ### `design.typography.recurring`\n \n - **statement:** Prefer Georgia for UI text.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.72\n - **evidence:** 2 of 2 repos with a named font (2)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`\n - **signals:** font-family georgia; one named family\n \n+### `design.typography.serif`\n+\n+- **statement:** Prefer a serif for long reading.\n+- **polarity:** prefer\n+- **kind:** rule\n+- **confidence:** 0.70\n+- **evidence:** proposed edit (0)\n+- **origin:** proposal, locked\n+- **sources:** `proposal`\n+- **signals:** accepted proposal\n+\n ### `feedback.purple-gradient`\n \n - **statement:** Avoid the purple gradient because it feels loud.\n - **polarity:** avoid\n - **kind:** rule\n - **confidence:** 0.60\n - **evidence:** 1 direct feedback note (1)\n - **origin:** feedback, locked\n - **sources:** `feedback`\n - **signals:** feedback 2026-01-03T00:00:00.000Z dislike\n \n ## Stack and tooling\n \n ### `stack.pkg.npm`\n \n - **statement:** Use npm as the default package manager.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.79\n - **evidence:** 3 of 3 Node repos (3)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`, `notes-cli`\n - **signals:** package-lock.json or package.json\n \n ### `stack.language.typescript`\n \n - **statement:** Default to TypeScript. It is the primary language in 3 of 4 repos (76% of detected bytes).\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.63\n - **evidence:** 3 of 4 repos with a primary language (3)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`, `notes-cli`\n - **signals:** 76% of detected bytes; primary language in 3 repos\n \n ### `stack.ci.github-actions`\n \n - **statement:** Use GitHub Actions for CI.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.44\n - **evidence:** 2 of 4 repos (2)\n - **origin:** heuristic\n - **sources:** `garden-web`, `notes-cli`\n - **signals:** GitHub Actions workflow\n \n ### `stack.framework.next`\n \n - **statement:** When the work is a web UI, prefer Next.js.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.44\n - **evidence:** 2 of 4 repos (2)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`\n - **signals:** next dependency or next.config; React is present wherever Next.js is\n \n ### `stack.ui.tailwind`\n \n - **statement:** Prefer Tailwind CSS utility classes for styling.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.44\n - **evidence:** 2 of 4 repos (2)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`\n - **signals:** Tailwind CSS\n \n ## Code style\n \n ### `code.commits.conventional`\n \n - **statement:** Write Conventional Commits (`feat:`, `fix:`, `chore:`).\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.83\n - **evidence:** 4 of 4 repos with commit samples (4)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`\n - **signals:** 4/4 conventional subjects; 3/4 conventional subjects\n \n ### `code.module.esm`\n \n - **statement:** Author Node packages as ESM (`\"type\": \"module\"`).\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.79\n - **evidence:** 3 of 3 Node repos (3)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`, `notes-cli`\n - **signals:** \"type\": \"module\"\n \n ### `code.typescript.strict`\n \n - **statement:** Keep TypeScript strict.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.79\n - **evidence:** 3 of 3 tsconfig files (3)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`, `notes-cli`\n - **signals:** compilerOptions.strict true\n \n ### `code.format.no-semicolons`\n \n - **statement:** Omit semicolons.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.72\n - **evidence:** 2 of 2 formatter configs (2)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`\n - **signals:** semi false\n \n ### `code.format.single-quotes`\n \n - **statement:** Prefer single quotes.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.72\n - **evidence:** 2 of 2 formatter configs (2)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`\n - **signals:** singleQuote true\n \n ### `code.format.prettier`\n \n - **statement:** Format code with Prettier.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.53\n - **evidence:** 2 of 3 Node repos (2)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`\n - **signals:** prettier\n \n ### `code.lint.eslint`\n \n - **statement:** Lint TypeScript and JavaScript with ESLint.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.53\n - **evidence:** 2 of 3 Node repos (2)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`\n - **signals:** eslint\n \n ## Naming\n \n ### `naming.repos.lowercase`\n \n - **statement:** Use lowercase repository names, and hyphenate when the name has more than one word.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.83\n - **evidence:** 4 of 4 repos (4)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`\n - **signals:** 4 lowercase; 0 camelCase or PascalCase\n \n ## Repo structure\n \n ### `structure.license.mit`\n \n - **statement:** Use the MIT license unless a repo needs something else.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.83\n - **evidence:** 4 of 4 repos (4)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`\n - **signals:** MIT\n \n ### `structure.readme`\n \n - **statement:** Lead every repo with a README that states what it is and how to run it.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.83\n - **evidence:** 4 of 4 repos (4)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`\n - **signals:** README\n \n ### `structure.contributing`\n \n - **statement:** Ship a CONTRIBUTING.md with repos that other people are expected to touch.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.44\n - **evidence:** 2 of 4 repos (2)\n - **origin:** heuristic\n - **sources:** `garden-web`, `notes-cli`\n - **signals:** CONTRIBUTING.md\n \n ### `structure.src`\n \n - **statement:** Put implementation code under src/ unless the framework uses another root, such as a Next.js app/ directory.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.44\n - **evidence:** 2 of 4 repos (2)\n - **origin:** heuristic\n - **sources:** `notes-cli`, `plot-tools`\n - **signals:** src/\n \n ### `structure.tests`\n \n - **statement:** Keep tests in test/ or tests/ next to the code.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.44\n - **evidence:** 2 of 4 repos (2)\n - **origin:** heuristic\n - **sources:** `notes-cli`, `plot-tools`\n - **signals:** test directory or test file\n \n ## Copy and tone\n \n ### `copy.readme.quickstart`\n \n - **statement:** Open READMEs with what it is and a short quickstart.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.83\n - **evidence:** 4 of 4 READMEs (4)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`\n - **signals:** quickstart heading\n \n ### `copy.tone.direct`\n \n - **statement:** Write to the reader directly (you/your), in a practical voice.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.83\n - **evidence:** 4 of 4 READMEs (4)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`\n - **signals:** second person in 4 READMEs\n \n ### `copy.tone.few-emoji`\n \n - **statement:** Keep product copy and READMEs plain. Emoji are rare in the existing ones.\n - **polarity:** prefer\n - **kind:** rule\n - **confidence:** 0.83\n - **evidence:** 4 of 4 READMEs (4)\n - **origin:** heuristic\n - **sources:** `garden-web`, `paper-page`, `notes-cli`, `plot-tools`\n - **signals:** no emoji in README\n \n ## Deploy habits\n \n _No rule yet._\n \n ## Dislikes\n \n ### `dislikes.product.dashboards`\n \n - **statement:** Avoid dashboards and SaaS chrome. Prefer a CLI, a file, or an agent surface.\n - **polarity:** avoid\n - **kind:** rule\n - **confidence:** 0.44\n - **evidence:** 2 of 4 repos (2)\n - **origin:** heuristic\n - **sources:** `paper-page`, `notes-cli`\n - **signals:** readme says no dashboard or no SaaS\n \n Also avoided, with the full rule in its topic section:\n \n - `feedback.purple-gradient` — Avoid the purple gradient because it feels loud. (confidence 0.60)\n \n ## Observations\n \n These showed up once, or at low frequency. Do not treat them as defaults. A later like can promote one.\n \n ### `stack.agents.instruction-files`\n \n - **statement:** Check in agent instruction files (CLAUDE.md, AGENTS.md, or Cursor rules) with the repo.\n - **polarity:** note\n - **kind:** observation\n - **confidence:** 0.27\n - **evidence:** 1 of 4 repos (1)\n - **origin:** heuristic\n - **sources:** `notes-cli`\n - **signals:** agent instruction file\n \n ### `stack.agents.tools`\n \n - **statement:** Build agent-facing tools (CLIs, MCP servers, skills) as a normal output, not an afterthought.\n - **polarity:** note\n - **kind:** observation\n - **confidence:** 0.27\n - **evidence:** 1 of 4 repos (1)\n - **origin:** heuristic\n - **sources:** `notes-cli`\n - **signals:** agent or MCP mention\n \n ### `stack.language.python`\n \n - **statement:** Python is a primary language in 1 of 4 repos (19% of detected bytes). Not enough to treat as the default.\n - **polarity:** note\n - **kind:** observation\n - **confidence:** 0.27\n - **evidence:** 1 of 4 repos with a primary language (1)\n - **origin:** heuristic\n - **sources:** `plot-tools`\n - **signals:** 19% of detected bytes; primary language in 1 repos\n \n ### `stack.test.vitest`\n \n - **statement:** Prefer Vitest for tests.\n - **polarity:** note\n - **kind:** observation\n - **confidence:** 0.27\n - **evidence:** 1 of 4 repos (1)\n - **origin:** heuristic\n - **sources:** `notes-cli`\n - **signals:** Vitest\n \n ### `code.python.ruff`\n \n - **statement:** Lint Python with Ruff.\n - **polarity:** note\n - **kind:** observation\n - **confidence:** 0.40\n - **evidence:** 1 of 4 repos (1)\n - **origin:** heuristic\n - **sources:** `plot-tools`\n - **signals:** ruff\n \n ### `structure.install-script`\n \n - **statement:** Provide an install.sh for tools people clone and run.\n - **polarity:** note\n - **kind:** observation\n - **confidence:** 0.27\n - **evidence:** 1 of 4 repos (1)\n - **origin:** heuristic\n - **sources:** `notes-cli`\n - **signals:** install.sh\n \n ### `copy.privacy`\n \n - **statement:** One repo emphasizes privacy. Not enough to treat as a default.\n - **polarity:** note\n - **kind:** observation\n - **confidence:** 0.27\n - **evidence:** 1 of 4 repos (1)\n - **origin:** heuristic\n - **sources:** `plot-tools`\n - **signals:** privacy phrasing\n \n ### `deploy.vercel`\n \n - **statement:** vercel config appeared in 1 of 4 repos. Not enough to treat it as a default.\n - **polarity:** note\n - **kind:** observation\n - **confidence:** 0.27\n - **evidence:** 1 of 4 repos (1)\n - **origin:** heuristic\n - **sources:** `garden-web`\n - **signals:** vercel.json\n \n ## Likes / dislikes log\n \n ### 2026-01-02T00:00:00.000Z · like · `design.minimalism.small-dependency-surface`\n \n - **feedback:** the small dependency surface\n - **because:** —\n - **confidence:** 0.79 → 0.91\n \n ### 2026-01-03T00:00:00.000Z · dislike · `feedback.purple-gradient`\n \n - **feedback:** the purple gradient\n - **because:** it feels loud\n \n ## Changelog\n \n - `2026-01-01T00:00:00.000Z` **init** — Initial profile from 4 public repos. 26 rules, 8 observations.\n - `2026-01-02T00:00:00.000Z` **learn** — like design.minimalism.small-dependency-surface. Confidence 0.79 → 0.91.\n - `2026-01-03T00:00:00.000Z` **learn** — Added feedback.purple-gradient from dislike feedback at confidence 0.60.\n \n ## Open proposals\n \n _No open proposals._\n \n ## Agent data\n \n The JSON fence is normative. Tools read and write this block. The sections above are a rendering of it. If they disagree, the fence wins. Edit with the CLI so the two stay together.\n \n ```json personal-md\n {\n   \"schema\": \"personal-md/v1\",\n   \"subject\": \"ada\",\n   \"generatedAt\": \"2026-01-01T00:00:00.000Z\",\n-  \"updatedAt\": \"2026-01-03T00:00:00.000Z\",\n+  \"updatedAt\": \"2026-01-04T00:00:00.000Z\",\n   \"analyzer\": \"heuristic\",\n   \"summary\": \"ada's profile was inferred from 4 public repositories. Strongest default: Write Conventional Commits (`feat:`, `fix:`, `chore:`). Design defaults include 4 rules at confidence 0.50 or higher. 1 secret-like path was counted and not read. Evidence counts stay tied to repositories. Likes and dislikes move confidence and are appended to the log.\",\n   \"stats\": {\n     \"visibility\": \"public\",\n     \"includesPrivate\": false,\n     \"reposScanned\": 4,\n     \"forksSkipped\": 1,\n     \"privateExcluded\": 1,\n     \"archived\": 0,\n     \"failed\": [],\n     \"secretsSkipped\": 1,\n     \"treesTruncated\": 0,\n     \"languages\": [\n       {\n         \"language\": \"TypeScript\",\n         \"bytes\": 20000\n       },\n       {\n         \"language\": \"Python\",\n         \"bytes\": 5000\n       },\n       {\n         \"language\": \"CSS\",\n         \"bytes\": 1400\n       }\n     ]\n   },\n   \"rules\": [\n     {\n       \"id\": \"design.minimalism.small-dependency-surface\",\n       \"section\": \"design\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Prefer a small dependency surface.\",\n       \"confidence\": 0.91,\n       \"baseConfidence\": 0.79,\n       \"delta\": 0.12,\n       \"evidence\": 3,\n       \"evidenceTotal\": 3,\n       \"evidenceLabel\": \"3 of 3 Node repos\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\",\n         \"notes-cli\"\n       ],\n       \"signals\": [\n         \"median production dependencies: 4\",\n         \"feedback 2026-01-02T00:00:00.000Z like\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-02T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"design.color.recurring\",\n       \"section\": \"design\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Prefer these recurring colors when a UI exists: #1a1a1a, #f7f3ea.\",\n       \"confidence\": 0.72,\n       \"baseConfidence\": 0.72,\n       \"delta\": 0,\n       \"evidence\": 2,\n       \"evidenceTotal\": 2,\n       \"evidenceLabel\": \"2 of 2 repos with CSS colors\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\"\n       ],\n       \"signals\": [\n         \"#1a1a1a in 2 repos\",\n         \"#f7f3ea in 2 repos\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"design.layout.app-router\",\n       \"section\": \"design\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Prefer the Next.js App Router (app/) for web projects.\",\n       \"confidence\": 0.72,\n       \"baseConfidence\": 0.72,\n       \"delta\": 0,\n       \"evidence\": 2,\n       \"evidenceTotal\": 2,\n       \"evidenceLabel\": \"2 of 2 Next.js repos\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\"\n       ],\n       \"signals\": [\n         \"app/\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"design.typography.recurring\",\n       \"section\": \"design\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Prefer Georgia for UI text.\",\n       \"confidence\": 0.72,\n       \"baseConfidence\": 0.72,\n       \"delta\": 0,\n       \"evidence\": 2,\n       \"evidenceTotal\": 2,\n       \"evidenceLabel\": \"2 of 2 repos with a named font\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\"\n       ],\n       \"signals\": [\n         \"font-family georgia\",\n         \"one named family\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n+      \"id\": \"design.typography.serif\",\n+      \"section\": \"design\",\n+      \"kind\": \"rule\",\n+      \"polarity\": \"prefer\",\n+      \"statement\": \"Prefer a serif for long reading.\",\n+      \"confidence\": 0.7,\n+      \"baseConfidence\": 0.7,\n+      \"delta\": 0,\n+      \"evidence\": 0,\n+      \"evidenceTotal\": 0,\n+      \"evidenceLabel\": \"proposed edit\",\n+      \"sources\": [\n+        \"proposal\"\n+      ],\n+      \"signals\": [\n+        \"accepted proposal\"\n+      ],\n+      \"origin\": \"proposal\",\n+      \"locked\": true,\n+      \"updated\": \"2026-01-04T00:00:00.000Z\"\n+    },\n+    {\n       \"id\": \"feedback.purple-gradient\",\n       \"section\": \"design\",\n       \"kind\": \"rule\",\n       \"polarity\": \"avoid\",\n       \"statement\": \"Avoid the purple gradient because it feels loud.\",\n       \"confidence\": 0.6,\n       \"baseConfidence\": 0.6,\n       \"delta\": 0,\n       \"evidence\": 1,\n       \"evidenceTotal\": 1,\n       \"evidenceLabel\": \"1 direct feedback note\",\n       \"sources\": [\n         \"feedback\"\n       ],\n       \"signals\": [\n         \"feedback 2026-01-03T00:00:00.000Z dislike\"\n       ],\n       \"origin\": \"feedback\",\n       \"locked\": true,\n       \"updated\": \"2026-01-03T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"stack.pkg.npm\",\n       \"section\": \"stack\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Use npm as the default package manager.\",\n       \"confidence\": 0.79,\n       \"baseConfidence\": 0.79,\n       \"delta\": 0,\n       \"evidence\": 3,\n       \"evidenceTotal\": 3,\n       \"evidenceLabel\": \"3 of 3 Node repos\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\",\n         \"notes-cli\"\n       ],\n       \"signals\": [\n         \"package-lock.json or package.json\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"stack.language.typescript\",\n       \"section\": \"stack\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Default to TypeScript. It is the primary language in 3 of 4 repos (76% of detected bytes).\",\n       \"confidence\": 0.63,\n       \"baseConfidence\": 0.63,\n       \"delta\": 0,\n       \"evidence\": 3,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"3 of 4 repos with a primary language\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\",\n         \"notes-cli\"\n       ],\n       \"signals\": [\n         \"76% of detected bytes\",\n         \"primary language in 3 repos\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"stack.ci.github-actions\",\n       \"section\": \"stack\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Use GitHub Actions for CI.\",\n       \"confidence\": 0.44,\n       \"baseConfidence\": 0.44,\n       \"delta\": 0,\n       \"evidence\": 2,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"2 of 4 repos\",\n       \"sources\": [\n         \"garden-web\",\n         \"notes-cli\"\n       ],\n       \"signals\": [\n         \"GitHub Actions workflow\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"stack.framework.next\",\n       \"section\": \"stack\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"When the work is a web UI, prefer Next.js.\",\n       \"confidence\": 0.44,\n       \"baseConfidence\": 0.44,\n       \"delta\": 0,\n       \"evidence\": 2,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"2 of 4 repos\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\"\n       ],\n       \"signals\": [\n         \"next dependency or next.config\",\n         \"React is present wherever Next.js is\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"stack.ui.tailwind\",\n       \"section\": \"stack\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Prefer Tailwind CSS utility classes for styling.\",\n       \"confidence\": 0.44,\n       \"baseConfidence\": 0.44,\n       \"delta\": 0,\n       \"evidence\": 2,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"2 of 4 repos\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\"\n       ],\n       \"signals\": [\n         \"Tailwind CSS\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"stack.agents.instruction-files\",\n       \"section\": \"stack\",\n       \"kind\": \"observation\",\n       \"polarity\": \"note\",\n       \"statement\": \"Check in agent instruction files (CLAUDE.md, AGENTS.md, or Cursor rules) with the repo.\",\n       \"confidence\": 0.27,\n       \"baseConfidence\": 0.27,\n       \"delta\": 0,\n       \"evidence\": 1,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"1 of 4 repos\",\n       \"sources\": [\n         \"notes-cli\"\n       ],\n       \"signals\": [\n         \"agent instruction file\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"stack.agents.tools\",\n       \"section\": \"stack\",\n       \"kind\": \"observation\",\n       \"polarity\": \"note\",\n       \"statement\": \"Build agent-facing tools (CLIs, MCP servers, skills) as a normal output, not an afterthought.\",\n       \"confidence\": 0.27,\n       \"baseConfidence\": 0.27,\n       \"delta\": 0,\n       \"evidence\": 1,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"1 of 4 repos\",\n       \"sources\": [\n         \"notes-cli\"\n       ],\n       \"signals\": [\n         \"agent or MCP mention\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"stack.language.python\",\n       \"section\": \"stack\",\n       \"kind\": \"observation\",\n       \"polarity\": \"note\",\n       \"statement\": \"Python is a primary language in 1 of 4 repos (19% of detected bytes). Not enough to treat as the default.\",\n       \"confidence\": 0.27,\n       \"baseConfidence\": 0.27,\n       \"delta\": 0,\n       \"evidence\": 1,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"1 of 4 repos with a primary language\",\n       \"sources\": [\n         \"plot-tools\"\n       ],\n       \"signals\": [\n         \"19% of detected bytes\",\n         \"primary language in 1 repos\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"stack.test.vitest\",\n       \"section\": \"stack\",\n       \"kind\": \"observation\",\n       \"polarity\": \"note\",\n       \"statement\": \"Prefer Vitest for tests.\",\n       \"confidence\": 0.27,\n       \"baseConfidence\": 0.27,\n       \"delta\": 0,\n       \"evidence\": 1,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"1 of 4 repos\",\n       \"sources\": [\n         \"notes-cli\"\n       ],\n       \"signals\": [\n         \"Vitest\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"code.commits.conventional\",\n       \"section\": \"code\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Write Conventional Commits (`feat:`, `fix:`, `chore:`).\",\n       \"confidence\": 0.83,\n       \"baseConfidence\": 0.83,\n       \"delta\": 0,\n       \"evidence\": 4,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"4 of 4 repos with commit samples\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\",\n         \"notes-cli\",\n         \"plot-tools\"\n       ],\n       \"signals\": [\n         \"4/4 conventional subjects\",\n         \"3/4 conventional subjects\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"code.module.esm\",\n       \"section\": \"code\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Author Node packages as ESM (`\\\"type\\\": \\\"module\\\"`).\",\n       \"confidence\": 0.79,\n       \"baseConfidence\": 0.79,\n       \"delta\": 0,\n       \"evidence\": 3,\n       \"evidenceTotal\": 3,\n       \"evidenceLabel\": \"3 of 3 Node repos\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\",\n         \"notes-cli\"\n       ],\n       \"signals\": [\n         \"\\\"type\\\": \\\"module\\\"\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"code.typescript.strict\",\n       \"section\": \"code\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Keep TypeScript strict.\",\n       \"confidence\": 0.79,\n       \"baseConfidence\": 0.79,\n       \"delta\": 0,\n       \"evidence\": 3,\n       \"evidenceTotal\": 3,\n       \"evidenceLabel\": \"3 of 3 tsconfig files\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\",\n         \"notes-cli\"\n       ],\n       \"signals\": [\n         \"compilerOptions.strict true\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"code.format.no-semicolons\",\n       \"section\": \"code\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Omit semicolons.\",\n       \"confidence\": 0.72,\n       \"baseConfidence\": 0.72,\n       \"delta\": 0,\n       \"evidence\": 2,\n       \"evidenceTotal\": 2,\n       \"evidenceLabel\": \"2 of 2 formatter configs\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\"\n       ],\n       \"signals\": [\n         \"semi false\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"code.format.single-quotes\",\n       \"section\": \"code\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Prefer single quotes.\",\n       \"confidence\": 0.72,\n       \"baseConfidence\": 0.72,\n       \"delta\": 0,\n       \"evidence\": 2,\n       \"evidenceTotal\": 2,\n       \"evidenceLabel\": \"2 of 2 formatter configs\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\"\n       ],\n       \"signals\": [\n         \"singleQuote true\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"code.format.prettier\",\n       \"section\": \"code\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Format code with Prettier.\",\n       \"confidence\": 0.53,\n       \"baseConfidence\": 0.53,\n       \"delta\": 0,\n       \"evidence\": 2,\n       \"evidenceTotal\": 3,\n       \"evidenceLabel\": \"2 of 3 Node repos\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\"\n       ],\n       \"signals\": [\n         \"prettier\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"code.lint.eslint\",\n       \"section\": \"code\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Lint TypeScript and JavaScript with ESLint.\",\n       \"confidence\": 0.53,\n       \"baseConfidence\": 0.53,\n       \"delta\": 0,\n       \"evidence\": 2,\n       \"evidenceTotal\": 3,\n       \"evidenceLabel\": \"2 of 3 Node repos\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\"\n       ],\n       \"signals\": [\n         \"eslint\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"code.python.ruff\",\n       \"section\": \"code\",\n       \"kind\": \"observation\",\n       \"polarity\": \"note\",\n       \"statement\": \"Lint Python with Ruff.\",\n       \"confidence\": 0.4,\n       \"baseConfidence\": 0.4,\n       \"delta\": 0,\n       \"evidence\": 1,\n       \"evidenceTotal\": 1,\n       \"evidenceLabel\": \"1 of 4 repos\",\n       \"sources\": [\n         \"plot-tools\"\n       ],\n       \"signals\": [\n         \"ruff\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"naming.repos.lowercase\",\n       \"section\": \"naming\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Use lowercase repository names, and hyphenate when the name has more than one word.\",\n       \"confidence\": 0.83,\n       \"baseConfidence\": 0.83,\n       \"delta\": 0,\n       \"evidence\": 4,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"4 of 4 repos\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\",\n         \"notes-cli\",\n         \"plot-tools\"\n       ],\n       \"signals\": [\n         \"4 lowercase\",\n         \"0 camelCase or PascalCase\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"structure.license.mit\",\n       \"section\": \"structure\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Use the MIT license unless a repo needs something else.\",\n       \"confidence\": 0.83,\n       \"baseConfidence\": 0.83,\n       \"delta\": 0,\n       \"evidence\": 4,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"4 of 4 repos\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\",\n         \"notes-cli\",\n         \"plot-tools\"\n       ],\n       \"signals\": [\n         \"MIT\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"structure.readme\",\n       \"section\": \"structure\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Lead every repo with a README that states what it is and how to run it.\",\n       \"confidence\": 0.83,\n       \"baseConfidence\": 0.83,\n       \"delta\": 0,\n       \"evidence\": 4,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"4 of 4 repos\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\",\n         \"notes-cli\",\n         \"plot-tools\"\n       ],\n       \"signals\": [\n         \"README\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"structure.contributing\",\n       \"section\": \"structure\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Ship a CONTRIBUTING.md with repos that other people are expected to touch.\",\n       \"confidence\": 0.44,\n       \"baseConfidence\": 0.44,\n       \"delta\": 0,\n       \"evidence\": 2,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"2 of 4 repos\",\n       \"sources\": [\n         \"garden-web\",\n         \"notes-cli\"\n       ],\n       \"signals\": [\n         \"CONTRIBUTING.md\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"structure.src\",\n       \"section\": \"structure\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Put implementation code under src/ unless the framework uses another root, such as a Next.js app/ directory.\",\n       \"confidence\": 0.44,\n       \"baseConfidence\": 0.44,\n       \"delta\": 0,\n       \"evidence\": 2,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"2 of 4 repos\",\n       \"sources\": [\n         \"notes-cli\",\n         \"plot-tools\"\n       ],\n       \"signals\": [\n         \"src/\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"structure.tests\",\n       \"section\": \"structure\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Keep tests in test/ or tests/ next to the code.\",\n       \"confidence\": 0.44,\n       \"baseConfidence\": 0.44,\n       \"delta\": 0,\n       \"evidence\": 2,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"2 of 4 repos\",\n       \"sources\": [\n         \"notes-cli\",\n         \"plot-tools\"\n       ],\n       \"signals\": [\n         \"test directory or test file\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"structure.install-script\",\n       \"section\": \"structure\",\n       \"kind\": \"observation\",\n       \"polarity\": \"note\",\n       \"statement\": \"Provide an install.sh for tools people clone and run.\",\n       \"confidence\": 0.27,\n       \"baseConfidence\": 0.27,\n       \"delta\": 0,\n       \"evidence\": 1,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"1 of 4 repos\",\n       \"sources\": [\n         \"notes-cli\"\n       ],\n       \"signals\": [\n         \"install.sh\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"copy.readme.quickstart\",\n       \"section\": \"copy\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Open READMEs with what it is and a short quickstart.\",\n       \"confidence\": 0.83,\n       \"baseConfidence\": 0.83,\n       \"delta\": 0,\n       \"evidence\": 4,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"4 of 4 READMEs\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\",\n         \"notes-cli\",\n         \"plot-tools\"\n       ],\n       \"signals\": [\n         \"quickstart heading\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"copy.tone.direct\",\n       \"section\": \"copy\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Write to the reader directly (you/your), in a practical voice.\",\n       \"confidence\": 0.83,\n       \"baseConfidence\": 0.83,\n       \"delta\": 0,\n       \"evidence\": 4,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"4 of 4 READMEs\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\",\n         \"notes-cli\",\n         \"plot-tools\"\n       ],\n       \"signals\": [\n         \"second person in 4 READMEs\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"copy.tone.few-emoji\",\n       \"section\": \"copy\",\n       \"kind\": \"rule\",\n       \"polarity\": \"prefer\",\n       \"statement\": \"Keep product copy and READMEs plain. Emoji are rare in the existing ones.\",\n       \"confidence\": 0.83,\n       \"baseConfidence\": 0.83,\n       \"delta\": 0,\n       \"evidence\": 4,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"4 of 4 READMEs\",\n       \"sources\": [\n         \"garden-web\",\n         \"paper-page\",\n         \"notes-cli\",\n         \"plot-tools\"\n       ],\n       \"signals\": [\n         \"no emoji in README\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"copy.privacy\",\n       \"section\": \"copy\",\n       \"kind\": \"observation\",\n       \"polarity\": \"note\",\n       \"statement\": \"One repo emphasizes privacy. Not enough to treat as a default.\",\n       \"confidence\": 0.27,\n       \"baseConfidence\": 0.27,\n       \"delta\": 0,\n       \"evidence\": 1,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"1 of 4 repos\",\n       \"sources\": [\n         \"plot-tools\"\n       ],\n       \"signals\": [\n         \"privacy phrasing\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"deploy.vercel\",\n       \"section\": \"deploy\",\n       \"kind\": \"observation\",\n       \"polarity\": \"note\",\n       \"statement\": \"vercel config appeared in 1 of 4 repos. Not enough to treat it as a default.\",\n       \"confidence\": 0.27,\n       \"baseConfidence\": 0.27,\n       \"delta\": 0,\n       \"evidence\": 1,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"1 of 4 repos\",\n       \"sources\": [\n         \"garden-web\"\n       ],\n       \"signals\": [\n         \"vercel.json\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     },\n     {\n       \"id\": \"dislikes.product.dashboards\",\n       \"section\": \"dislikes\",\n       \"kind\": \"rule\",\n       \"polarity\": \"avoid\",\n       \"statement\": \"Avoid dashboards and SaaS chrome. Prefer a CLI, a file, or an agent surface.\",\n       \"confidence\": 0.44,\n       \"baseConfidence\": 0.44,\n       \"delta\": 0,\n       \"evidence\": 2,\n       \"evidenceTotal\": 4,\n       \"evidenceLabel\": \"2 of 4 repos\",\n       \"sources\": [\n         \"paper-page\",\n         \"notes-cli\"\n       ],\n       \"signals\": [\n         \"readme says no dashboard or no SaaS\"\n       ],\n       \"origin\": \"heuristic\",\n       \"locked\": false,\n       \"updated\": \"2026-01-01T00:00:00.000Z\"\n     }\n   ],\n   \"log\": [\n     {\n       \"at\": \"2026-01-02T00:00:00.000Z\",\n       \"kind\": \"like\",\n       \"feedback\": \"the small dependency surface\",\n       \"because\": null,\n       \"ruleId\": \"design.minimalism.small-dependency-surface\",\n       \"confidenceBefore\": 0.79,\n       \"confidenceAfter\": 0.91\n     },\n     {\n       \"at\": \"2026-01-03T00:00:00.000Z\",\n       \"kind\": \"dislike\",\n       \"feedback\": \"the purple gradient\",\n       \"because\": \"it feels loud\",\n       \"ruleId\": \"feedback.purple-gradient\",\n       \"confidenceBefore\": null,\n       \"confidenceAfter\": 0.6\n     }\n   ],\n   \"changelog\": [\n     {\n       \"at\": \"2026-01-01T00:00:00.000Z\",\n       \"command\": \"init\",\n       \"summary\": \"Initial profile from 4 public repos. 26 rules, 8 observations.\"\n     },\n     {\n       \"at\": \"2026-01-02T00:00:00.000Z\",\n       \"command\": \"learn\",\n       \"summary\": \"like design.minimalism.small-dependency-surface. Confidence 0.79 → 0.91.\"\n     },\n     {\n       \"at\": \"2026-01-03T00:00:00.000Z\",\n       \"command\": \"learn\",\n       \"summary\": \"Added feedback.purple-gradient from dislike feedback at confidence 0.60.\"\n     }\n   ],\n   \"proposals\": []\n }\n ```\n \n"
    }
  ]
}
```
