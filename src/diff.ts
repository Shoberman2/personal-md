/**
 * A small line-oriented unified diff. personal.md files are short enough
 * that a full LCS is fine and keeps the CLI free of dependencies.
 */
export function unifiedDiff(before: string, after: string, fileName = "personal.md"): string {
  if (before === after) return "";
  const a = before.split("\n");
  const b = after.split("\n");
  const ops = diffOps(a, b);
  const hunks = hunkify(ops, 3);
  const lines = [`--- a/${fileName}`, `+++ b/${fileName}`];
  for (const hunk of hunks) {
    lines.push(`@@ -${hunk.oldStart},${hunk.oldLines} +${hunk.newStart},${hunk.newLines} @@`);
    lines.push(...hunk.lines);
  }
  return `${lines.join("\n")}\n`;
}

type Op = { type: "equal" | "del" | "ins"; line: string };

function diffOps(a: string[], b: string[]): Op[] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array<number>(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i -= 1) {
    const row = dp[i] as number[];
    const next = dp[i + 1] as number[];
    for (let j = n - 1; j >= 0; j -= 1) {
      row[j] = a[i] === b[j] ? (next[j + 1] as number) + 1 : Math.max(next[j] as number, row[j + 1] as number);
    }
  }
  const ops: Op[] = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) {
      ops.push({ type: "equal", line: a[i] as string });
      i += 1;
      j += 1;
    } else if ((dp[i + 1]?.[j] ?? 0) >= (dp[i]?.[j + 1] ?? 0)) {
      ops.push({ type: "del", line: a[i] as string });
      i += 1;
    } else {
      ops.push({ type: "ins", line: b[j] as string });
      j += 1;
    }
  }
  while (i < m) {
    ops.push({ type: "del", line: a[i] as string });
    i += 1;
  }
  while (j < n) {
    ops.push({ type: "ins", line: b[j] as string });
    j += 1;
  }
  return ops;
}

function hunkify(ops: Op[], context: number): { oldStart: number; oldLines: number; newStart: number; newLines: number; lines: string[] }[] {
  const marked = ops.map((op) => ({ ...op, keep: op.type !== "equal" }));
  for (let i = 0; i < marked.length; i += 1) {
    if (!marked[i]?.keep) continue;
    for (let j = Math.max(0, i - context); j <= Math.min(marked.length - 1, i + context); j += 1) {
      const item = marked[j];
      if (item) item.keep = true;
    }
  }
  const hunks: { oldStart: number; oldLines: number; newStart: number; newLines: number; lines: string[] }[] = [];
  let oldLine = 1;
  let newLine = 1;
  let index = 0;
  while (index < marked.length) {
    if (!marked[index]?.keep) {
      const current = marked[index];
      if (current?.type !== "ins") oldLine += 1;
      if (current?.type !== "del") newLine += 1;
      index += 1;
      continue;
    }
    const startOld = oldLine;
    const startNew = newLine;
    const lines: string[] = [];
    let oldLines = 0;
    let newLines = 0;
    while (index < marked.length && marked[index]?.keep) {
      const op = marked[index] as Op & { keep: boolean };
      if (op.type === "equal") {
        lines.push(` ${op.line}`);
        oldLine += 1;
        newLine += 1;
        oldLines += 1;
        newLines += 1;
      } else if (op.type === "del") {
        lines.push(`-${op.line}`);
        oldLine += 1;
        oldLines += 1;
      } else {
        lines.push(`+${op.line}`);
        newLine += 1;
        newLines += 1;
      }
      index += 1;
    }
    hunks.push({ oldStart: startOld, oldLines, newStart: startNew, newLines, lines });
  }
  return hunks;
}
