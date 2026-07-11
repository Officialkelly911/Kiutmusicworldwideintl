---
name: KIUT Crown Mark SVG
description: Phase 8 replaced the geometric K mark with the official crown monogram — 6 polygons, vector gold gradient, 200×215 viewBox.
---

# KIUT Crown Mark — geometry decisions

## The mark
`client/src/components/KiutMark.tsx` exports:
- `KiutMark` — the crown SVG (accepts `size`, `variant`, legacy `color`)
- `KiutLogo` — horizontal lockup (mark + "KIUT.")
- `KiutFullLogo` — vertical lockup (mark + divider + "KIUT" + "MUSIC")

## Geometry (viewBox 0 0 200 215)
Six filled polygons, all sharing the same fill (gradient or flat):
1. Left outer wing: `54,4 64,22 32,210 14,210 44,22`
2. Right outer wing (mirror): `146,4 136,22 168,210 186,210 156,22`
3. "\" crossing arm (top-left → bottom-right): `78,6 85,19 159,208 147,208 70,19`
4. "/" crossing arm (top-right → bottom-left): `122,6 130,19 53,208 41,208 115,19`
5. Center top diamond: `100,0 111,28 100,40 89,28`
6. Center body diamond: `100,78 116,106 100,132 84,106`

## Gold gradient
linearGradient id="kiutCrownGold" x1="0%" y1="0%" x2="100%" y2="100%":
`#F7E070 0% → #D4AF37 30% → #C49A26 65% → #8A6B10 100%`

## Phase 8 refinements applied
- Mark size: +6–7% at all use sites (nav 32→35, footer 48→51, intro 88→94)
- Gap between mark and "KIUT." text: `gap-3` (12px) → `gap-[14px]` (~17%)
- "MUSIC" letter-spacing: 0.40em → 0.42em (+5%)
- Gradient: full vector (no raster metallic PNG)

**Why:** The old geometric K was an abstract placeholder. Phase 8 replaced it with the official KIUT Music crown monogram from the uploaded brand reference image, with clean vector fills for infinite scalability.

**How to apply:** All future logo usage must use `KiutMark`/`KiutLogo`/`KiutFullLogo` from KiutMark.tsx. Brand SVGs in `client/public/brand/` are derived from the same polygon geometry. Favicon.svg uses the crown on a dark-bg rect with rounded corners.
