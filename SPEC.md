# personal.md format

`personal.md` is the file an agent reads before building anything for a person. It records that person's stylistic and technical defaults: design taste, stack, code style, naming, repo structure, copy, deploy habits, and dislikes. Humans can read it top to bottom. Tools read the JSON fence at the bottom.

Schema: `personal-md/v1`.

## File shape

A profile has three layers, written together by the CLI:

1. YAML front matter for a quick glance (`schema`, `subject`, `visibility`, `includes_private`, `analyzer`, `repos_scanned`, `updated`).
2. Prose sections. These are a rendering.
3. A fenced block labeled `json personal-md`. This block is normative. If the prose and the fence disagree, the fence wins. Edit with the CLI so they stay together.

```json personal-md
{ "schema": "personal-md/v1", "subject": "ada" }
```

The real fence is at the end of the file. Proposal diffs sometimes quote it, so parsers should take the last fence that parses as this schema.

## Sections

| Section | What belongs there |
| --- | --- |
| Identity | Who the file is for, how many repos were scanned, and where the evidence is thin. |
| Design taste | Layout, typography, color, minimalism, and whether the default surface is a UI or a tool. |
| Stack and tooling | Languages, package manager, frameworks, UI libraries, test runner, agent tooling, CI. |
| Code style | Strictness, modules, formatter, linter, commit messages. |
| Naming | Repository and file names. |
| Repo structure | `src/`, tests, README, license, docs, contributing. |
| Copy and tone | How READMEs and product text sound. |
| Deploy habits | Vercel, Supabase, Docker, and other hosts. |
| Dislikes | Every `avoid` rule lives here, or is indexed here if its full entry sits in a topic section. |
| Observations | Signals that showed up once or at low frequency. Not defaults. |
| Likes / dislikes log | Append-only feedback. |
| Changelog | Append-only command history. |
| Open proposals | Suggested edits waiting for approval, each with a diff. |

Empty sections stay in the file so an agent can see that the absence is real.

## Rules

A rule is one decision. Identifiers are dotted and stable: `design.color.recurring`, `stack.pkg.npm`, `dislikes.product.dashboards`.

```markdown
### `design.minimalism.small-dependency-surface`

- **statement:** Prefer a small dependency surface.
- **polarity:** prefer
- **kind:** rule
- **confidence:** 0.91
- **evidence:** 3 of 3 Node repos (3)
- **origin:** heuristic
- **sources:** `garden-web`, `paper-page`, `notes-cli`
- **signals:** median production dependencies: 4
```

| Field | Meaning |
| --- | --- |
| `statement` | The instruction an agent should follow, in one or two sentences. |
| `polarity` | `prefer`, `avoid`, or `note`. |
| `kind` | `rule` or `observation`. |
| `confidence` | A score from 0.05 to 0.98. Higher means follow it over a lower one. |
| `evidence` | The human label, plus the supporting count in parentheses. |
| `origin` | `heuristic`, `feedback`, `proposal`, or `llm`. |
| `sources` | Example repository names. Capped. The count is authoritative, not the list. |
| `signals` | Short reasons. Never file bodies, secrets, or README excerpts. |
| `locked` | When true, a later scan keeps the statement and the feedback adjustment. |

`kind: rule` cleared the evidence bar: at least two repositories, and either 30% of the applicable set or five hits at 20% or more. A single deliberate config file (a `vercel.json`, a `tsconfig` flag) can be an observation. A one-off trend is dropped.

`polarity: note` is context. It is not a default, even when `kind` is `rule`. `polarity: avoid` is a constraint. Observations are capped at confidence 0.40 and are not defaults. A later like can promote one into a locked rule.

Conditional statements are intentional. "When the work is a web UI, prefer Next.js" does not mean every CLI should become a Next app.

## Confidence and evidence

Repository evidence and feedback are stored separately.

- `evidence` and `evidenceTotal` count repositories, config files, or READMEs. The label says which.
- Feedback does not inflate those counts. It changes `delta`.
- Displayed confidence is `clamp(baseConfidence + delta, 0.05, 0.98)`.
- A like moves `delta` by `+0.12`. A dislike moves it by `-0.18`. Delta stays inside `-0.60` to `+0.45`, so a later scan can still move a strong default.
- A like that pushes an observation to 0.50 or higher promotes it to a locked rule.
- A dislike that drops a `prefer` rule below 0.34 flips it to `avoid`, locks it, and rewrites the statement from the feedback.

The heuristic score grows with both the ratio and the number of hits, and it is capped at 0.92 until a person confirms it. The optional LLM may rewrite wording. It may not invent evidence.

## Likes / dislikes log

Append-only. Each entry is one piece of feedback.

```markdown
### 2026-01-02T00:00:00.000Z · like · `design.minimalism.small-dependency-surface`

- **feedback:** the small dependency surface
- **because:** —
- **confidence:** 0.79 → 0.91
```

A new rule has no before/after line. The changelog records the confidence it was created at.

`personal-md learn` understands:

- `liked …`, `loved …`, `accepted …`, `LGTM`, `ship it`
- `rejected … because …`, `disliked …`, `avoid …`, `please don't …`
- Anything else is a note: it is logged and does not move a rule, unless an LLM is configured and can read it, or you pass `--polarity`.

Passing `--rule` targets that id. If nothing matches, the CLI adds a locked rule whose evidence label is `1 direct feedback note`.

## Changelog

Append-only, one line per command:

```markdown
- `2026-01-01T00:00:00.000Z` **init** — Initial profile from 4 public repos. 26 rules, 8 observations.
```

Commands are `init`, `analyze`, `learn`, `propose`, `apply`, and `reject`. The log and changelog keep the latest 300 entries.

## Proposals

An agent that wants to change the file does not write it directly. It submits a proposal. The proposal stores a unified diff of the rendered profile.

```bash
personal-md propose \
  --file personal.md \
  --rule design.typography.serif \
  --statement "Prefer a serif for long reading." \
  --confidence 0.7 \
  --rationale "The last review asked for a reading face."
```

The edit stays under Open proposals until someone runs `propose apply` or `propose reject`.

Recursive or unattended agents can set a threshold. The proposal is applied only when its confidence is greater than or equal to the threshold.

```bash
export PERSONAL_MD_AUTO_APPLY=0.85
personal-md propose --file personal.md --rule design.typography.serif \
  --statement "Prefer a serif for long reading." --confidence 0.9
```

`--auto-apply off` disables the environment variable for one run. Applied and rejected proposals are kept, up to 50, with pending ones preferred.

Rejecting a proposal logs a dislike. If the rule already exists, its confidence drops by 0.10.

## Re-analyze

`init` creates the file and refuses to overwrite it without `--force`.

`analyze` scans again and merges:

- Heuristic rules are replaced with the new evidence.
- Feedback deltas on those ids are reapplied.
- Locked statements stay, including ones a person promoted or an agent applied.
- Feedback and proposal rules that disappeared from the scan are kept and marked `not re-observed in the latest scan`.
- The log, changelog, and proposals are kept. The summary is rebuilt.

## What the file is not allowed to contain

The scanner does not copy file bodies into the profile. It records counts, dependency names, formatter flags, and short signal labels.

It does not read `.env` files (except that it ignores `.env.example` without storing it), private keys, credential files, or `.npmrc`. Those paths are counted under `secretsSkipped` and omitted. Token-shaped strings are redacted if they ever reach a label.

`--visibility public` never requests private repositories. With a token, the default visibility is `all`, and private repository names are then written into `sources`. The CLI warns when that happens. Do not commit a file that includes private names.

Forks are skipped unless you pass `--include-forks`.

## JSON object

The fence is a `Profile`:

| Field | Type |
| --- | --- |
| `schema` | `"personal-md/v1"` |
| `subject` | GitHub login or other name |
| `generatedAt`, `updatedAt` | ISO-8601 |
| `analyzer` | `"heuristic"` or `"heuristic+llm"` |
| `summary` | Identity paragraph |
| `stats` | `visibility`, `includesPrivate`, `reposScanned`, `forksSkipped`, `privateExcluded`, `archived`, `failed`, `secretsSkipped`, `treesTruncated`, `languages` |
| `rules` | Rule objects, including observations |
| `log` | Likes / dislikes |
| `changelog` | Command history |
| `proposals` | Pending, applied, and rejected edits |

A rule object adds `baseConfidence`, `delta`, `evidence`, `evidenceTotal`, `evidenceLabel`, `locked`, and `updated` to the fields shown in the prose.

Bump the schema only with a migration note in the changelog of this repository. Unknown schemas are refused.
