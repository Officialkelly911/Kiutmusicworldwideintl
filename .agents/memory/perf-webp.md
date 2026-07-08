---
name: Performance — WebP image conversion
description: Strategy and outcomes for converting large PNG merch/content images to WebP. Rules for what must stay PNG.
---

## Rule
Convert large PNGs (>500KB) to WebP using `ffmpeg -c:v libwebp -quality 82`. Update `src` references in TSX to use `.webp`. Keep original PNG files alongside WebP — do not delete them.

**Why:** 10 merch + content PNGs totalled ~21.3MB. WebP at quality 82 reduced them to ~1.06MB (95% reduction) with no perceptible quality loss.

**How to apply:**
```bash
ffmpeg -i input.png -c:v libwebp -quality 82 -y output.webp
```
Then `sed -i 's/filename\.png/filename.webp/g'` in the relevant TSX files.

## What must stay PNG
- `client/public/og-image.png` — social crawlers (Twitter, Facebook, LinkedIn) may not handle WebP OG images.
- `client/public/kiut_master_1024.png` — PWA/app icon; OS icon systems require PNG.
- `client/public/android-chrome-*.png`, `apple-touch-icon.png`, `favicon-*.png` — same reason.

## Remaining candidates
- `client/public/assets/about-journey/` — 40 JPGs up to 502KB; already lazy-loaded so lower priority. Convert in Phase 17 polish if needed.
- Hero/poster JPEGs are already compressed; WebP conversion would give marginal benefit.

## Files referencing converted WebP images
- `client/src/pages/Home.tsx` — 22 occurrences
- `client/src/pages/About.tsx` — 2 occurrences
