# Loading personal.md from an agent

Put the file somewhere the agent can read. The usual place is the repository root, named `personal.md`. A person who uses one profile across projects can keep a single copy and point every agent at that path.

The agent should read the file before planning. It should follow `kind: rule`, treat `polarity: avoid` as a constraint, and treat observations and `polarity: note` as context. When the person accepts or rejects the work, the agent should run `learn` rather than silently editing the prose. The JSON fence is normative if the prose and the fence ever disagree.

The snippets below are the whole integration. None of them require a plugin.

## Cursor

Save this as `.cursor/rules/personal-md.mdc` in the project, or as a user rule if the profile applies everywhere.

```markdown
---
description: Read personal.md before building for this person
alwaysApply: true
---

Before planning or editing, read `personal.md` (or the file named by `PERSONAL_MD_PATH`).

- Follow entries with `kind: rule`. Prefer higher confidence when two rules compete.
- Treat `polarity: avoid` as a constraint.
- Treat `kind: observation` and `polarity: note` as context, not defaults. Design rules under 0.50 are hints.
- Do not invent a visual system when the Identity section says design evidence is thin.
- When the user accepts or rejects the work, record it:
  `npx personal-md learn --file personal.md --feedback "liked ..." `
  or `--feedback "rejected ... because ..."`.
- When you notice a stable new preference, propose it instead of editing the file by hand:
  `npx personal-md propose --file personal.md --rule <id> --statement "..." --confidence <0-1>`.
- The `json personal-md` fence is normative.
```

## Claude Code

Add this to `CLAUDE.md` at the repo root, or to `~/.claude/CLAUDE.md` for every project.

```markdown
# Personal style

Read `personal.md` before planning or writing code. It is the source of truth for this person's design taste, stack, code style, naming, copy, and deploy habits.

Follow `kind: rule`. Treat `polarity: avoid` as a constraint. Observations are not defaults.

If the user keeps or rejects your work, update the file:

    personal-md learn --file personal.md --feedback "liked the small dependency surface"

If you believe a new default is stable, open a proposal and stop there:

    personal-md propose --file personal.md --rule design.typography.serif \
      --statement "Prefer a serif for long reading." --confidence 0.6

Do not hand-edit the prose. The CLI regenerates it from the JSON fence.
```

## AGENTS.md

Drop this into the consumer repo's `AGENTS.md`, or merge it with the one already there.

```markdown
## personal.md

Before building, read `personal.md` in this repository (or `$PERSONAL_MD_PATH`).

- Apply rules with `kind: rule`. Higher confidence wins.
- `polarity: avoid` is a constraint. `polarity: note` and `kind: observation` are context.
- After the user accepts or rejects the result, run `personal-md learn --file personal.md --feedback "<what they said>"`.
- Propose lasting changes with `personal-md propose`. Do not edit the rendered sections by hand.
- Unattended runs may set `PERSONAL_MD_AUTO_APPLY` (0 to 1). A proposal is written in only when its confidence is at least that threshold. Leave it unset when a person should approve the diff.
```

## Any other agent

This system paragraph is enough for a tool that only accepts a prompt:

```text
Read the attached personal.md before you plan. Follow kind=rule. Treat polarity=avoid as a constraint. Do not treat observations as defaults. When I accept or reject your work, reply with one line I can pass to `personal-md learn --feedback`. If you want to change personal.md, output a proposal (rule id, statement, confidence, rationale) instead of rewriting the file.
```

## A loop with little human input

1. The agent reads `personal.md` and builds the change.
2. The person accepts it, or rejects it with a reason. That can be a chat reply or a review comment.
3. The agent runs `learn` with that text. Confidence moves. A repeated rejection can flip a weak `prefer` into an `avoid` and lock it.
4. When the agent is confident a new default is real, it runs `propose`. A person applies or rejects the diff. An unattended system sets `PERSONAL_MD_AUTO_APPLY` high, for example `0.85`, so only strong proposals land by themselves.
5. The next `analyze` refreshes repository evidence and reapplies the deltas. Locked statements stay.

Start with the threshold unset. Turn on auto-apply after the log has a few real accepts and rejects.
