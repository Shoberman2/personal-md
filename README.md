# personal-md

personal.md is a single markdown file that coding and product agents read before they build anything for a person. It captures how that person actually ships: design taste, stack, code style, naming, repo structure, copy, deploy habits, and dislikes.

The file is mined from their GitHub, then updated when they accept or reject an agent's work. Over time a recursive agent can maintain it with very little hand editing.

The heuristic scanner needs no model key. An LLM step is optional.

## Quickstart

Requires Node.js 22 or newer.

```bash
git clone https://github.com/Shoberman2/personal-md.git
cd personal-md
npm install
npm run build

# Public repositories only. Safe to commit if you have read the result.
node dist/cli.js init --user YOUR_LOGIN --visibility public --out personal.md

# Later, after you keep or reject a change:
node dist/cli.js learn --file personal.md --feedback "liked the small dependency surface"
node dist/cli.js learn --file personal.md --feedback "rejected the purple gradient because it feels loud"
```

A token is optional for public repositories and required for private ones. The CLI reads `PERSONAL_MD_GITHUB_TOKEN`, then `GITHUB_TOKEN`, then `GH_TOKEN`.

```bash
export GITHUB_TOKEN=github_pat_...
# With a token, the default visibility is "all" and includes private repos the token can see.
node dist/cli.js analyze --user YOUR_LOGIN --visibility public --out personal.md
```

If you scan with `--visibility all`, the file will list private repository names. Do not commit that copy.

During development you can skip the build:

```bash
npm run personal-md -- analyze --fixture fixtures/ada.json --out /tmp/ada.md
```

## How a profile is built

`init` and `analyze` list the user's repositories, then for each one read language bytes, the file tree, recent commit subjects, and a small set of text files (`package.json`, `tsconfig`, formatter config, README, workflow names, deploy config, one stylesheet). From that they emit rules with evidence counts.

A rule is written only when the signal repeats. A single `vercel.json` becomes an observation, not a default. See [SPEC.md](SPEC.md).

`analyze` can be run again. Learned confidence adjustments, the feedback log, and open proposals are kept. Locked statements are not overwritten by the new scan.

## Commands

```bash
personal-md init --user <login> [--out personal.md] [--visibility public|all]
personal-md analyze --user <login> [--out personal.md]
personal-md learn --file personal.md --feedback "liked X"
personal-md propose --file personal.md --rule <id> --statement "..." [--confidence 0.7]
personal-md propose list --file personal.md
personal-md propose apply <id> --file personal.md
personal-md propose reject <id> --file personal.md --because "too decorative"
personal-md show --file personal.md
personal-md validate --file personal.md
```

Useful flags:

| Flag | Effect |
| --- | --- |
| `--visibility public` | Public owner repos only. This is the default when no token is set. |
| `--visibility all` | Include private owner repos the token can see. Default when a token is set. |
| `--include-forks` | Count forked repositories as evidence. Off by default. |
| `--max-repos 200` | Scan the most recently pushed repositories, up to this cap. |
| `--fixture file.json` | Analyze a local fixture. No network. |
| `--force` | Allow `init` to overwrite, or replace a file that is not a profile. |
| `--no-llm` | Stay on the heuristic path even if a provider is configured. |
| `--auto-apply 0.85` | Apply a proposal immediately when its confidence is at least this value. |

`learn` accepts a sentence or a short review note. `liked …` and `rejected … because …` are read deterministically. Ambiguous notes are logged without moving a rule unless you pass `--polarity` or an LLM is configured.

## Proposals and unattended updates

Agents should propose edits instead of hand-editing the prose. The prose is regenerated from the JSON fence.

```bash
personal-md propose \
  --file personal.md \
  --rule design.typography.serif \
  --statement "Prefer a serif for long reading." \
  --confidence 0.7 \
  --rationale "The last review asked for a reading face."
```

That prints a unified diff and leaves the proposal pending.

For a recursive agent, set a threshold. The proposal is applied only when its own confidence clears it:

```bash
export PERSONAL_MD_AUTO_APPLY=0.85
personal-md propose --file personal.md --rule design.typography.serif \
  --statement "Prefer a serif for long reading." --confidence 0.9
```

Use a high threshold. A bad automatic edit gets locked, and the next scan will keep the statement until a person rejects it.

## Optional LLM

The heuristic profile is the baseline and the test suite never calls a model. When these variables are set, `analyze` may rewrite rule wording, and `learn` may interpret a messy review comment. Evidence counts are not taken from the model. If the call fails, the heuristic result is kept.

| Variable | Purpose |
| --- | --- |
| `PERSONAL_MD_LLM_PROVIDER` | `openai`, `openai-compatible`, `anthropic`, or `none` |
| `PERSONAL_MD_LLM_API_KEY` | Falls back to `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` |
| `PERSONAL_MD_LLM_MODEL` | Overrides the default model |
| `PERSONAL_MD_LLM_BASE_URL` | Base URL for an OpenAI-compatible endpoint |

The model is given rule ids, statements, and evidence labels. It is not given file contents.

## Use it from another agent

Put `personal.md` at the root of the repo you are building, or point the agent at a shared copy. Then add a short instruction so the agent loads it first. Copy-paste snippets for Cursor, Claude Code, and a generic `AGENTS.md` are in [docs/integrations.md](docs/integrations.md).

## Examples

- [examples/example.personal.md](examples/example.personal.md) is a fictional profile for "ada", generated from [fixtures/ada.json](fixtures/ada.json), then updated with one like, one rejection, and one pending proposal. It is the format specimen.
- [examples/shoberman2.personal.md](examples/shoberman2.personal.md) is a real scan of [Shoberman2](https://github.com/Shoberman2)'s public repositories. Forks were skipped. Private repositories were not requested. Secret-like paths were counted and not read.

Regenerate the specimen:

```bash
npm run personal-md -- init --fixture fixtures/ada.json --out examples/example.personal.md \
  --now 2026-01-01T00:00:00.000Z --visibility public --force
npm run personal-md -- learn --file examples/example.personal.md \
  --feedback "liked the small dependency surface" --now 2026-01-02T00:00:00.000Z
npm run personal-md -- learn --file examples/example.personal.md \
  --feedback "rejected the purple gradient because it feels loud" --now 2026-01-03T00:00:00.000Z
npm run personal-md -- propose --file examples/example.personal.md \
  --rule design.typography.serif --statement "Prefer a serif for long reading." \
  --confidence 0.7 --rationale "A review asked for a reading face." \
  --now 2026-01-04T00:00:00.000Z --auto-apply off
```

## Development

```bash
npm install
npm test
npm run typecheck
npm run build
```

The tests use Node's built-in test runner and the fixture. They do not call GitHub or an LLM.

## Safety

- Public scans use `GET /users/:login/repos`, which cannot return private repositories.
- `.env` files, private keys, credential files, and `.npmrc` are not downloaded.
- Commit messages and READMEs are classified, not quoted.
- Token-shaped strings are stripped if they reach a label.
- A file produced with `--visibility all` can contain private repository names. Treat it as personal.

## License

[MIT](LICENSE).
