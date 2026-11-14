import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { analyzeSnapshots } from "../src/analyze.js";
import { loadFixture, snapshotsFromFixture } from "../src/fixture.js";
import { learn } from "../src/profile.js";
import { propose } from "../src/profile.js";
import { parse } from "../src/parse.js";
import { render } from "../src/render.js";

const NOW = "2026-01-01T00:00:00.000Z";
const LATER = "2026-01-02T00:00:00.000Z";

function adaProfile() {
  const fixture = loadFixture(new URL("../fixtures/ada.json", import.meta.url).pathname);
  const kept = fixture.repos.filter((repo) => !repo.private && !repo.fork);
  const snapshots = snapshotsFromFixture(fixture.login, kept);
  return analyzeSnapshots({
    subject: fixture.login,
    snapshots,
    visibility: "public",
    forksSkipped: fixture.repos.filter((repo) => repo.fork).length,
    privateExcluded: fixture.repos.filter((repo) => repo.private).length,
    failed: [],
    now: NOW,
    command: "init",
  });
}

describe("ada fixture", () => {
  const profile = adaProfile();
  const rules = profile.rules.filter((rule) => rule.kind === "rule").map((rule) => rule.id).sort();
  const observations = profile.rules.filter((rule) => rule.kind === "observation").map((rule) => rule.id).sort();

  it("emits the expected defaults", () => {
    assert.deepEqual(rules, [
      "code.commits.conventional",
      "code.format.no-semicolons",
      "code.format.prettier",
      "code.format.single-quotes",
      "code.lint.eslint",
      "code.module.esm",
      "code.typescript.strict",
      "copy.readme.quickstart",
      "copy.tone.direct",
      "copy.tone.few-emoji",
      "design.color.recurring",
      "design.layout.app-router",
      "design.minimalism.small-dependency-surface",
      "design.typography.recurring",
      "dislikes.product.dashboards",
      "naming.repos.lowercase",
      "stack.ci.github-actions",
      "stack.framework.next",
      "stack.language.typescript",
      "stack.pkg.npm",
      "stack.ui.tailwind",
      "structure.contributing",
      "structure.license.mit",
      "structure.readme",
      "structure.src",
      "structure.tests",
    ]);
  });

  it("keeps one-off signals as observations", () => {
    assert.deepEqual(observations, [
      "code.python.ruff",
      "copy.privacy",
      "deploy.vercel",
      "stack.agents.instruction-files",
      "stack.agents.tools",
      "stack.language.python",
      "stack.test.vitest",
      "structure.install-script",
    ]);
  });

  it("does not leak private repos, forks, or secrets", () => {
    const text = render(profile);
    for (const forbidden of ["secret-client", "Acme", "forked-rust", "ghp_", "super-secret", "#ff00ff"]) {
      assert.equal(text.includes(forbidden), false, forbidden);
    }
    assert.equal(profile.stats.reposScanned, 4);
    assert.equal(profile.stats.privateExcluded, 1);
    assert.equal(profile.stats.forksSkipped, 1);
    assert.ok(profile.stats.secretsSkipped >= 1);
    assert.match(profile.summary, /Design defaults include/);
  });
});

describe("learn and propose", () => {
  it("raises confidence when a like matches a rule", async () => {
    const profile = adaProfile();
    const before = profile.rules.find((rule) => rule.id === "design.minimalism.small-dependency-surface");
    assert.ok(before);
    const result = await learn(profile, "liked the small dependency surface", { now: LATER });
    const after = result.profile.rules.find((rule) => rule.id === "design.minimalism.small-dependency-surface");
    assert.equal(result.ruleId, "design.minimalism.small-dependency-surface");
    assert.ok(after && before && after.confidence > before.confidence);
    assert.equal(result.profile.log.at(-1)?.kind, "like");
    assert.equal(result.profile.stats.reposScanned, profile.stats.reposScanned);
  });

  it("creates an avoid rule from a rejection", async () => {
    const result = await learn(adaProfile(), "rejected the purple gradient because it feels loud", { now: LATER });
    const rule = result.profile.rules.find((item) => item.id === "feedback.purple-gradient");
    assert.ok(rule);
    assert.equal(rule?.polarity, "avoid");
    assert.equal(rule?.section, "design");
    assert.match(rule?.statement ?? "", /Avoid the purple gradient because it feels loud/);
    assert.equal(result.profile.log.at(-1)?.because, "it feels loud");
  });

  it("keeps a learned delta when the same repos are analyzed again", async () => {
    const fixture = loadFixture(new URL("../fixtures/ada.json", import.meta.url).pathname);
    const snapshots = snapshotsFromFixture(fixture.login, fixture.repos.filter((repo) => !repo.private && !repo.fork));
    const learned = await learn(adaProfile(), "liked the small dependency surface", { now: LATER });
    const again = analyzeSnapshots({
      subject: "ada",
      snapshots,
      visibility: "public",
      forksSkipped: 1,
      privateExcluded: 1,
      failed: [],
      now: "2026-02-01T00:00:00.000Z",
      command: "analyze",
      previous: learned.profile,
    });
    const rule = again.rules.find((item) => item.id === "design.minimalism.small-dependency-surface");
    const fresh = adaProfile().rules.find((item) => item.id === "design.minimalism.small-dependency-surface");
    assert.ok(rule && fresh && rule.confidence > fresh.confidence);
    assert.equal(again.log.length, 1);
    assert.equal(again.generatedAt, NOW);
    assert.equal(again.changelog.length, 3);
  });

  it("stores a pending diff and auto-applies above the threshold", () => {
    const profile = adaProfile();
    const pending = propose(profile, {
      ruleId: "design.typography.serif",
      statement: "Prefer a serif for long reading.",
      confidence: 0.7,
      rationale: "The last review asked for it.",
    }, { now: LATER });
    assert.equal(pending.status, "pending");
    assert.match(pending.diff, /\+.*Prefer a serif for long reading/);
    assert.equal(pending.profile.rules.some((rule) => rule.id === "design.typography.serif"), false);
    assert.equal(pending.profile.proposals[0]?.status, "pending");

    const applied = propose(profile, {
      ruleId: "design.typography.serif",
      statement: "Prefer a serif for long reading.",
      confidence: 0.9,
    }, { now: LATER, autoApply: 0.85 });
    assert.equal(applied.status, "applied");
    assert.equal(applied.profile.rules.some((rule) => rule.id === "design.typography.serif" && rule.locked), true);
    assert.equal(applied.profile.proposals[0]?.status, "applied");
  });

  it("round-trips through markdown", () => {
    const profile = adaProfile();
    const text = render(profile);
    const parsed = parse(text);
    assert.equal(render(parsed), text);
    assert.equal(parsed.schema, "personal-md/v1");
    assert.match(text, /## Likes \/ dislikes log/);
    assert.match(text, /## Changelog/);
    assert.match(text, /```json personal-md/);
  });
});
