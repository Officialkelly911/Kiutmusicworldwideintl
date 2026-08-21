#!/usr/bin/env node
/**
 * Universal Hero Image Pipeline — Kiut Music
 * ---------------------------------------------------------------------------
 * Generates the full responsive variant set for a single hero image:
 *
 *   {slug}-desktop.{avif,webp,jpg}          2560x1440  (primary / 16:9)
 *   {slug}-laptop.{avif,webp,jpg}           1920x1080  (16:9)
 *   {slug}-tablet.{avif,webp,jpg}           1600x1200  (4:3 landscape)
 *   {slug}-mobile-landscape.{avif,webp,jpg} 1600x900   (16:9)
 *   {slug}-mobile-portrait.{avif,webp,jpg}  1080x1920  (9:16)
 *   {slug}-blur.jpg                         24px wide LQIP source
 *
 * Every breakpoint is "recomposed", not stretched: sharp's cover-fit with
 * saliency ("attention") cropping automatically keeps the highest-interest
 * region of the source (faces, skin tone, high-frequency detail) framed
 * inside each target aspect ratio, instead of a naive center-crop or CSS
 * resize. This is what makes the pipeline reusable for future hero images —
 * only the source photo changes; the framing decision is automatic.
 *
 * Usage:
 *   node scripts/generate-hero-images.mjs --src <path> --slug <name> [--out <dir>]
 *
 * Writes metadata (dimensions + base64 blur placeholder) to
 * <out>/<slug>.meta.json so the HeroSection component / heroImages registry
 * can reserve layout space and paint an instant blur-up placeholder.
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
function argValue(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i !== -1 ? args[i + 1] : fallback;
}

const src = argValue("src");
const slug = argValue("slug");
const outDir = argValue("out", "client/public/images/hero");

if (!src || !slug) {
  console.error("Usage: node scripts/generate-hero-images.mjs --src <path> --slug <name> [--out <dir>]");
  process.exit(1);
}

const VARIANTS = [
  { name: "desktop",         width: 2560, height: 1440 },
  { name: "laptop",          width: 1920, height: 1080 },
  { name: "tablet",          width: 1600, height: 1200 },
  { name: "mobile-landscape",width: 1600, height: 900  },
  { name: "mobile-portrait", width: 1080, height: 1920 },
];

const QUALITY = { avif: 62, webp: 78, jpeg: 84 };

async function main() {
  const destDir = path.join(outDir, slug);
  await mkdir(destDir, { recursive: true });

  const source = sharp(src, { failOn: "none" }).rotate(); // rotate() normalizes EXIF orientation

  for (const variant of VARIANTS) {
    const base = source.clone().resize(variant.width, variant.height, {
      fit: "cover",
      position: sharp.strategy.attention,
      kernel: sharp.kernel.lanczos3,
    });

    const outBase = path.join(destDir, `${slug}-${variant.name}`);

    await Promise.all([
      base.clone().avif({ quality: QUALITY.avif, effort: 4 }).toFile(`${outBase}.avif`),
      base.clone().webp({ quality: QUALITY.webp, effort: 4 }).toFile(`${outBase}.webp`),
      base.clone().jpeg({ quality: QUALITY.jpeg, mozjpeg: true, chromaSubsampling: "4:2:0" }).toFile(`${outBase}.jpg`),
    ]);

    console.log(`✓ ${variant.name} (${variant.width}x${variant.height})`);
  }

  // Low-quality blur placeholder — tiny, heavily blurred, base64-inlined.
  const blurBuffer = await source
    .clone()
    .resize(24, Math.round((24 * VARIANTS[0].height) / VARIANTS[0].width))
    .blur(3)
    .jpeg({ quality: 40 })
    .toBuffer();
  await writeFile(path.join(destDir, `${slug}-blur.jpg`), blurBuffer);
  const blurDataURL = `data:image/jpeg;base64,${blurBuffer.toString("base64")}`;

  const meta = {
    slug,
    generatedAt: new Date().toISOString(),
    aspect: { desktop: "16:9", tablet: "4:3", mobilePortrait: "9:16" },
    blurDataURL,
  };
  await writeFile(path.join(destDir, `${slug}.meta.json`), JSON.stringify(meta, null, 2));

  console.log(`\nDone. Variants written to ${destDir}/`);
  console.log(`Blur placeholder length: ${blurDataURL.length} chars`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
