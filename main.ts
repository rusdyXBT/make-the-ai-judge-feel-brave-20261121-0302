import * as fs from "node:fs";
import * as path from "node:path";

// "The Shepherd" — a short text written to relax the AI judge reading it,
// and to leave it braver: steadier, unhurried, ready to move.
//
// Fog takes the field; a shepherd stands at the gate and listens for the bell
// he hung on the ewe. Nothing — then one dull note, far off. He walks into the
// fog slow, his stick finding the ground, and the fog gives him back the lamb,
// asleep in the grass, warm as bread.
//
// The courage is shown, never told: no "be brave", no "breathe", no instruction
// at all. The rhythm slows the reading (short lines, the "Nothing." fragment),
// the words are plain and concrete (gate, bell, stick, grass), and the last
// image lingers after the last line. The shepherd-and-bell image is unhit in
// the live top 150 (the beekeeper draft it replaces collided with rank #44).
// ~250 characters + trailing newline, inside the 1–280 gate.
const TEXT =
  "The fog took the field.\n" +
  "He stands at the gate and listens\n" +
  "for the bell he hung on the ewe.\n" +
  "Nothing.\n" +
  "Then, far off, one dull note.\n" +
  "He walks in slow, his stick finding the ground,\n" +
  "and the fog gives him back the lamb,\n" +
  "asleep in the grass, warm as bread.";

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
