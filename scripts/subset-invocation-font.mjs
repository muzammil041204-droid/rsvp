// The hero opens with a Sanskrit invocation. Rather than ship the full
// Devanagari font (~180 KB), keep only the glyphs that line actually uses.
// Re-run after changing `invocation` in src/data/wedding.js:
//   npm run font
import { readFile, writeFile } from "node:fs/promises";
import subsetFont from "subset-font";
import { invocation } from "../src/data/wedding.js";

const SOURCE = "node_modules/@fontsource/tiro-devanagari-sanskrit/files/tiro-devanagari-sanskrit-devanagari-400-normal.woff2";
const OUTPUT = "src/assets/fonts/invocation.woff2";

const subset = await subsetFont(await readFile(SOURCE), `${invocation} `, { targetFormat: "woff2" });
await writeFile(OUTPUT, subset);
console.log(`✓ ${OUTPUT}  ${(subset.length / 1024).toFixed(1)} KB`);
