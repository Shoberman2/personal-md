# Contributing

## Setup

Node.js 22 or newer.

```bash
npm install
npm test
npm run typecheck
npm run build
```

`npm test` runs the fixture suite with `tsx` and does not need a GitHub token or a model key. `npm run build` emits `dist/`, which is what the `personal-md` bin runs.

## What to change

- Format changes belong in [SPEC.md](SPEC.md) and the renderer together. Bump `personal-md/v1` only when old files cannot be read, and say so in the spec.
- Heuristics must stay deterministic. Two runs on the same snapshot produce the same rules. The LLM step may rewrite wording and must not be required for a passing test.
- A new signal should carry an evidence count and should stay an observation until it repeats. Do not quote README prose or file bodies in the profile.
- Prefer a fixture in [fixtures/ada.json](fixtures/ada.json) over a live GitHub call. Add a case to `tests/profile.test.ts` when a rule id is part of the contract.

## Generated examples

`examples/example.personal.md` is the fictional specimen. The commands that regenerate it are in the README.

`examples/shoberman2.personal.md` is a public-only scan. If you regenerate it:

- Pass `--visibility public`.
- Do not commit private repository names, secret values, or client details.
- Forks stay excluded unless the spec changes.

## Commits

Use a short imperative subject. `npm test` and `npm run typecheck` should pass before you open a pull request.

## License

By contributing you agree that your contributions are licensed under the [MIT License](LICENSE).
