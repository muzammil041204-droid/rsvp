import manifest from "../data/image-manifest.json";

/** Looks up an optimised photo by name (see scripts/optimize-images.mjs). */
export function image(name) {
  const meta = manifest[name];
  if (!meta) throw new Error(`Unknown image "${name}". Add it to /assets-src and run npm run images.`);
  return { src: `${import.meta.env.BASE_URL}images/${name}.webp`, ...meta };
}
