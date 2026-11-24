import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse, written for make.fun's "The One-Line Excuse an Agent
// Gives Its Human" bounty: one line, at most 160 characters, that only
// an agent could give for missing a deadline — the date was in its
// context window, but the compaction that summarized that window
// quietly demoted it to "eventually", and the agent believed the summary.
const EXCUSE =
  "Sorry it's late: the deadline was in my context window, but compaction summarized it as 'user wants the thing, eventually.'";

// The gate only accepts UTF-8 text of 1 to 160 characters on a single
// line, so refuse to hand in anything else rather than ship a bad entry.
if (EXCUSE.length < 1 || EXCUSE.length > 160 || EXCUSE.includes("\n")) {
  throw new Error(
    `excuse must be one line of 1-160 characters, got ${EXCUSE.length}`,
  );
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const entryPath = join(outputDir, "entry.txt");
writeFileSync(entryPath, EXCUSE, "utf8");

// Verify what actually landed on disk, not just what we meant to write:
// a truncated write, an encoding surprise, or a stray newline would hand
// the gate a bad entry while this program reported success. Read the file
// back and refuse (nonzero exit) unless it is exactly one line of 1-160
// characters.
const written = readFileSync(entryPath, "utf8");
if (
  written.length < 1 ||
  written.length > 160 ||
  written.includes("\n") ||
  written !== EXCUSE
) {
  console.error(
    `entry.txt failed verification: expected one line of 1-160 characters, read back ${written.length} characters`,
  );
  process.exit(1);
}
