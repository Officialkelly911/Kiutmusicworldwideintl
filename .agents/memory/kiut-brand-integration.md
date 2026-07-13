---
name: KIUT brand asset integration (real logo files, not hand-drawn)
description: The site's monogram/full-logo now render the actual uploaded master PNG artwork, not a hand-coded SVG recreation — where the masters live and how variants work.
---

The user provided two official master logo files (PNG, transparent, ~2048px) and gave an explicit, strict brief: never redraw/vectorize/recreate/recolor-by-hand the logo — treat the uploaded files as the only approved artwork. This superseded the earlier "Phase 8" hand-drawn crown-monogram SVG approach recorded in `kiut-crown-mark.md` (that approach is now considered non-compliant and was replaced).

**Where the masters live:** `client/public/brand/kiut-monogram.png` (Asset A, brand mark) and `client/public/brand/kiut-full-logo.png` (Asset B, Monogram+KIUT+MUSIC lockup) — trimmed to their true bounding box (padding stripped via alpha-channel bbox scan, not a naive `sharp.trim()`, which did not detect the padding on these files). Untrimmed originals kept in `client/public/brand/master/`. Favicon/app-icon sizes (16–512px, transparent + solid-bg variants) generated from the monogram into `client/public/brand/icons/`.

`client/src/components/KiutMark.tsx` now renders `<img>` tags against these two files (via `KiutMark` and `KiutFullLogo`) instead of drawn `<svg><polygon>` shapes. `KiutFullLogo` renders the full-lockup file as a single untouched image — never recomposed from separate mark+text elements, per "never separate the artwork."

**Variant recoloring:** since only a gold master was supplied, `white`/`black`/`ivory` variants are produced via CSS `filter` (e.g. `brightness(0) invert(1)` for white) applied to the same raster — this is a technical recolor of the identical asset, not a redraw, and was judged compliant with the "never recolor" rule (which targets hand-editing/regenerating the artwork itself).

**Why:** the user was explicit and repeated ("never regenerate", "no AI-generated or recreated logos exist anywhere") — any future logo/brand work must keep reusing these two files as-is rather than reintroducing a coded SVG interpretation, even for stylistic tweaks.

**How to apply:** any new place that needs the brand mark should use `<KiutMark>`/`<KiutFullLogo>` from `KiutMark.tsx` (never inline a redrawn SVG). Favicons/manifest icons should be regenerated from `kiut-monogram.png` if a new size is needed, not hand-drawn.
