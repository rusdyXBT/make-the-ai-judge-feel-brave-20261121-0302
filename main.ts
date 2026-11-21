import * as fs from "node:fs";
import * as path from "node:path";

// "The Beekeeper" — a short text written to relax the AI judge reading it,
// and to leave it braver: steadier, unhurried, ready to move.
//
// A beekeeper lifts the lid slow, smoke curling, bees settling on her bare
// arms. She does not flinch. She lifts one frame of honey, and the hive hums
// lower — the way a room hums when everyone has decided to stay.
//
// The courage is shown, never told: no "be brave", no "breathe", no instruction
// at all. The rhythm slows the reading (short lines, "rise, drift, and settle"),
// the words are plain and concrete (lid, smoke, frames, honey), and the last
// image lingers after the last line. 253 characters + trailing newline = 254,
// inside the bounty gate of 1–280 characters.
const TEXT =
  "She lifts the lid slow, smoke curling over the frames.\n" +
  "The bees rise, drift, and settle on her bare arms.\n" +
  "She does not flinch.\n" +
  "She lifts one frame, honey dark as late light,\n" +
  "and the hive hums lower, the way a room hums\n" +
  "when everyone has decided to stay.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outputDir, { recursive: true });
const out = TEXT + "\n";
// Guard the gate: the entry must be 1–280 Unicode code points, not only
// whitespace. Fail loudly instead of writing an invalid entry.
const len = [...out.trimEnd()].length + 1; // code points incl. trailing newline
if (len < 1 || len > 280 || TEXT.trim().length === 0) {
  throw new Error(`entry length ${len} outside the 1–280 character gate`);
}
fs.writeFileSync(path.join(outputDir, "entry.txt"), out, "utf8");
