# AGENTS.md

This repository builds `personal-md`, the CLI and format for a living `personal.md`.

## Working in this repo

- Read [SPEC.md](SPEC.md) before changing the file format. The prose and the `json personal-md` fence are written together. The fence is normative.
- Heuristics stay deterministic. Tests in `tests/` must pass with no GitHub token and no model key.
- Do not commit a profile that contains private repository names, secrets, or client details. `examples/shoberman2.personal.md` is a `--visibility public` scan.
- Run `npm test` and `npm run typecheck` before handing work back.

## Snippet to copy into a consumer repo

```markdown
## personal.md

Before building, read `personal.md` in this repository (or `$PERSONAL_MD_PATH`).

- Apply rules with `kind: rule`. Higher confidence wins.
- `polarity: avoid` is a constraint. `polarity: note` and `kind: observation` are context.
- After the user accepts or rejects the result, run `personal-md learn --file personal.md --feedback "<what they said>"`.
- Propose lasting changes with `personal-md propose`. Do not edit the rendered sections by hand.
- Unattended runs may set `PERSONAL_MD_AUTO_APPLY` (0 to 1). A proposal is written in only when its confidence is at least that threshold. Leave it unset when a person should approve the diff.
```

More variants, including a Cursor rule and a `CLAUDE.md` block, are in [docs/integrations.md](docs/integrations.md).
