import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { classify, confidenceFrom } from "../src/util.js";
import { redact } from "../src/redact.js";
import { unifiedDiff } from "../src/diff.js";
import { isSecretPath, selectFiles } from "../src/selectFiles.js";
import { parseFeedback } from "../src/feedback.js";

describe("confidence", () => {
  it("rises with more evidence", () => {
    const few = confidenceFrom(2, 4);
    const many = confidenceFrom(8, 10);
    assert.ok(many > few);
    assert.ok(few > 0.3 && few < 0.6);
    assert.ok(many > 0.7 && many < 0.95);
  });

  it("classifies rules, observations, and noise", () => {
    assert.equal(classify(2, 4, "trend"), "rule");
    assert.equal(classify(1, 4, "config"), "observation");
    assert.equal(classify(1, 4, "trend"), "observation");
    assert.equal(classify(1, 40, "trend"), "drop");
    assert.equal(classify(1, 40, "config"), "observation");
    assert.equal(classify(2, 40, "trend"), "observation");
    assert.equal(classify(0, 4, "trend"), "drop");
  });
});

describe("redact", () => {
  it("strips token-shaped strings", () => {
    const text = redact("token ghp_abcdefghijklmnopqrstuvwxyz0123456789 and sk-abcdefghijklmnopqrstuvwxyz");
    assert.equal(text.includes("ghp_"), false);
    assert.equal(text.includes("sk-"), false);
    assert.match(text, /\[redacted\]/);
  });
});

describe("diff", () => {
  it("emits a unified diff for a changed line", () => {
    const diff = unifiedDiff("alpha\nbeta\n", "alpha\ngamma\n", "personal.md");
    assert.match(diff, /--- a\/personal\.md/);
    assert.match(diff, /-beta/);
    assert.match(diff, /\+gamma/);
  });

  it("returns an empty string when nothing changed", () => {
    assert.equal(unifiedDiff("same\n", "same\n"), "");
  });
});

describe("selectFiles", () => {
  it("does not return secret paths", () => {
    assert.equal(isSecretPath("config/super-secret.env"), true);
    assert.equal(isSecretPath(".env.example"), false);
    const selected = selectFiles([
      { path: "README.md", type: "blob", size: 100 },
      { path: "package.json", type: "blob", size: 100 },
      { path: "config/super-secret.env", type: "blob", size: 40 },
      { path: ".env", type: "blob", size: 10 },
      { path: "node_modules/left-pad/package.json", type: "blob", size: 10 },
    ]);
    assert.deepEqual(selected.read.sort(), ["README.md", "package.json"]);
    assert.equal(selected.secretsSkipped, 2);
  });
});

describe("parseFeedback", () => {
  it("reads likes, rejections, and review phrasing", () => {
    const liked = parseFeedback("liked the small dependency surface");
    assert.equal(liked.polarity, "like");
    assert.equal(liked.text, "the small dependency surface");
    const rejected = parseFeedback("rejected the purple gradient because it feels loud");
    assert.equal(rejected.polarity, "dislike");
    assert.equal(rejected.text, "the purple gradient");
    assert.equal(rejected.because, "it feels loud");
    assert.equal(parseFeedback("please don't use a dashboard").polarity, "dislike");
    assert.equal(parseFeedback("LGTM, ship it").polarity, "like");
    assert.equal(parseFeedback("maybe later").polarity, "note");
    assert.equal(parseFeedback("maybe later").confident, false);
  });
});
