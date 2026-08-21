---
name: Brand identity system
description: KIUT. geometric K mark — component, SVG assets, site integration, and guidelines.
---

# KIUT. Brand Identity System

## The mark
Three flat-vector parallelogram shapes at viewBox 0 0 100 100:
- Stem: `rect x=10 y=8 width=14 height=84 rx=1`
- Upper arm: `polygon 24,47 → 24,30 → 84,8 → 84,25`
- Lower arm: `polygon 24,53 → 24,70 → 84,75 → 84,92`

Single fill color — no gradients, no strokes, no metallic effects.

## React component
`client/src/components/KiutMark.tsx`
- `<KiutMark color size className label />` — symbol only
- `<KiutLogo markColor textColor dotColor size />` — mark + wordmark lockup

## Site integration touchpoints
- Navigation: KiutMark size=32 replaces old Music icon box
- Loading screen (Home.tsx CinematicIntro): KiutMark size=88 replaces "K" text span
- Footer (SiteFooter.tsx): KiutMark size=48 above wordmark

## SVG assets
All 14 variants in `client/public/brand/`:
gold/white/ivory/black marks, horizontal/vertical logos (gold/white/black), social (400×400 with bg), watermark (18% opacity), merch (oversized + tagline).
Favicon: `client/public/favicon.svg` (black bg square).
index.html: SVG favicon linked first; PNG/ICO fallbacks preserved.

## Brand colors
- Matte Gold: `#D4AF37` (primary, matches existing CSS token --gold)
- Deep Black: `#0A0A0C`
- Soft Ivory: `#F5F0E8`

## Why
**Why geometric mark (not text icon):** Scales from 16px favicon to large print/embroidery without loss. Single fill = zero-complexity reprinting on merch. The parallelogram arms read as K letterform AND as wings/stage-lights/movement — concept-first, not music-clip-art.

## How to apply
- Always import from `client/src/components/KiutMark.tsx`; never inline the SVG manually in JSX
- Use `color="#D4AF37"` on dark surfaces; `color="#FFFFFF"` on gold or mixed surfaces
- Decorative uses: omit `label` prop (renders `aria-hidden="true"` automatically)
- Semantic uses (standalone logo): pass `label="KIUT."` for screen-reader text
