// Everyday Wonder: Two Days to Find the Line
// One sentence, at most 200 characters, about a small moment of wonder
// in everyday life. Writes the sentence to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My reflection in the bus window arrives at my stop a second before I do, and gets off without me.";

// Gate: a single sentence, 1 to 200 characters, not only whitespace.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (LINE.trim() !== LINE) {
  throw new Error("entry must not start or end with whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (!LINE.endsWith(".")) {
  throw new Error("entry must be a single sentence ending with a period");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back round-trip check: what landed on disk must be exactly the line.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("round-trip check failed: entry.txt differs from the line");
}
console.log(`Wrote ${chars.length} characters to ${outPath}`);
