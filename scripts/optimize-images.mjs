// Converts the source photographs in /assets-src into compressed WebP files
// (served from /public/images) and writes a manifest with each image's
// dimensions plus a tiny blurred placeholder shown while it lazy-loads.
// Run with: npm run images
import { readdir, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = path.resolve("assets-src");
const OUT_DIR = path.resolve("public/images");
const MANIFEST = path.resolve("src/data/image-manifest.json");

await mkdir(OUT_DIR, { recursive: true });

const files = (await readdir(SRC_DIR)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
const manifest = {};

for (const file of files) {
  const name = path.parse(file).name;
  const input = sharp(path.join(SRC_DIR, file)).rotate();
  const { width, height } = await input.metadata();

  await input
    .clone()
    .resize({ width: Math.min(width, 1200), withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(path.join(OUT_DIR, `${name}.webp`));

  const lqip = await input.clone().resize(16).blur(1.2).webp({ quality: 40 }).toBuffer();

  manifest[name] = {
    width,
    height,
    placeholder: `data:image/webp;base64,${lqip.toString("base64")}`,
  };
  console.log(`✓ ${name}  ${width}×${height}`);
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
