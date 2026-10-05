// Turns the gatefold-opening frame sequence (assets-src/intro/ezgif-frame-NNN.jpg,
// 1920×1080) into a small H.264 video plus a poster of the sealed card.
// Only the portrait card in the middle of each frame is kept.
// Run with: npm run intro
import { execFileSync } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import ffmpeg from "ffmpeg-static";
import sharp from "sharp";

const SRC = path.resolve("assets-src/intro");
const OUT = path.resolve("public/intro");
const CROP = { left: 656, top: 0, width: 608, height: 1080 };
const FPS = 30;

await mkdir(OUT, { recursive: true });

execFileSync(
  ffmpeg,
  [
    "-y",
    "-framerate", String(FPS),
    "-i", path.join(SRC, "ezgif-frame-%03d.jpg"),
    "-vf", `crop=${CROP.width}:${CROP.height}:${CROP.left}:${CROP.top}`,
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "23",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    "-an",
    path.join(OUT, "invitation-open.mp4"),
  ],
  { stdio: "inherit" },
);

await sharp(path.join(SRC, "ezgif-frame-001.jpg"))
  .extract(CROP)
  .webp({ quality: 78 })
  .toFile(path.join(OUT, "poster.webp"));

for (const file of ["invitation-open.mp4", "poster.webp"]) {
  const { size } = await stat(path.join(OUT, file));
  console.log(`✓ public/intro/${file}  ${(size / 1024).toFixed(0)} KB`);
}
