import { mkdirSync, writeFileSync } from "node:fs";
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
writeFileSync(join(outputDir, "entry.txt"), EXCUSE, "utf8");
