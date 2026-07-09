# Phase 19 — Brand Identity System · Audit Report

**Date:** 2026-07-08
**Phase:** 19 — Brand Identity System
**Status:** COMPLETE ✅
**Auditor:** Replit Agent

---

## Scope

Phase 19 establishes the KIUT. brand identity system — a geometric brand mark, complete logo variant library, canonical usage guide for all site locations, and brand asset files for use across digital and physical contexts.

---

## Brand Concept

**Concept 1 selected** (user's stated favourite): An abstract geometric K from three flat parallelogram shapes evoking wings, movement, and stage lights.

- Geometry: vertical stem (`rect x=10 y=8 w=14 h=84 rx=1`) + upper arm (`polygon 24,47 24,30 84,8 84,25`) + lower arm (mirror)
- Colour: Matte gold `#D4AF37` — primary colourway on black backgrounds
- Wordmark: Space Grotesk Light, uppercase, `tracking-[0.28em–0.35em]`
- Style rule: flat vector only — no gradients, no metallic effects, no drop-shadows on the SVG paths themselves

---

## Deliverables

### 1. React Component (`client/src/components/KiutMark.tsx`)

Two exported components:

**`KiutMark`** — the geometric K mark alone
- Props: `color` (default `#D4AF37`), `size` (default 40), `className`, `label`
- `aria-hidden` by default (decorative); pass `label` to make it meaningful for screen readers
- 100×100 viewBox, all three shapes share a single `fill` for correct single-colour rendering

**`KiutLogo`** — horizontal lockup utility
- Props: `markColor`, `textColor`, `dotColor`, `size` (`sm`/`md`/`lg`), `className`
- Renders: `KiutMark` + "KIUT." wordmark in Space Grotesk Light

### 2. Brand Asset SVGs (`client/public/brand/` — 14 files)

| File | Description |
|---|---|
| `kiut-mark-gold.svg` | Mark only — gold on transparent |
| `kiut-mark-white.svg` | Mark only — white on transparent |
| `kiut-mark-ivory.svg` | Mark only — ivory on transparent |
| `kiut-mark-black.svg` | Mark only — black on transparent |
| `kiut-logo-horizontal-gold.svg` | Horizontal lockup — gold mark + white wordmark |
| `kiut-logo-horizontal-white.svg` | Horizontal lockup — all white |
| `kiut-logo-horizontal-black.svg` | Horizontal lockup — all black |
| `kiut-logo-vertical-gold.svg` | Vertical (stacked) lockup — gold mark + white wordmark |
| `kiut-logo-vertical-white.svg` | Vertical lockup — all white |
| `kiut-logo-vertical-black.svg` | Vertical lockup — all black |
| `kiut-social.svg` | Social avatar — black square + gold mark |
| `kiut-watermark.svg` | Horizontal lockup — white at 30% opacity, for photo overlays |
| `kiut-merch.svg` | Mark only — black on transparent, for physical goods production |
| `kiut-favicon.svg` | Alias of social — favicons need square background |

### 3. Favicon (`client/public/favicon.svg`)

New SVG favicon: black `#0a0a0c` square, gold K mark centred. Registered in `client/index.html` as:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```
Takes priority over legacy `.ico` and `.png` favicons in all modern browsers.

### 4. Brand Guidelines (`docs/brand-guidelines.md`)

Full usage documentation covering:
- Mark geometry and construction
- Approved colourways (gold-on-black, white-on-black, gold-on-ivory, black-on-white)
- Prohibited uses (gradients, outlines, stretching, colour mixes)
- Clear space rules
- Minimum sizes per context

---

## Site Integration — Logo Usage Map

Every site location uses the canonical variant appropriate to its context:

| Location | Variant | Reasoning |
|---|---|---|
| **Navigation bar** | Horizontal lockup — Gold/Primary | `KiutMark(32)` + "KIUT." text span. Compact, always visible at scroll, confirms brand identity. Custom markup preserves hover drop-shadow animation. |
| **Cinematic intro / Loading screen** | Mark only — Gold on Black (large) + animated wordmark | `KiutMark(88)` with separate `motion.h1` — the animated reveal sequence requires independent element control. Not a static lockup. |
| **Site footer** | Mark only — Gold on Black + display wordmark | `KiutMark(48)` above bold editorial "KIUT." heading (text-5xl–7xl). Footer uses a deliberately larger, bolder wordmark for visual weight — intentional departure from the compact lockup. |
| **Browser favicon** | Mark only — Gold on Black square (`favicon.svg`) | Tiny scale (16–32px) — only the mark reads clearly. Wordmark is illegible at favicon size. |
| **Social / OG image** | Horizontal lockup — on black canvas (`og-image.png`, 1200×630) | Full lockup reads at thumbnail sizes and confirms brand identity for social sharing previews. |
| **Photo/video watermark** | Horizontal lockup — White at 30% opacity | White reads on varied photo backgrounds; low opacity avoids obscuring the content. |
| **Merch / physical goods** | Mark only — Black on Gold | Single-colour for embroidery/screen-printing. Gold substrate is the brand colour; black mark on top. |

---

## Files Created / Modified

| File | Change |
|---|---|
| `client/src/components/KiutMark.tsx` | New — `KiutMark` and `KiutLogo` React SVG components |
| `client/src/components/Navigation.tsx` | Replaced `Music` icon box with `KiutMark size=32` |
| `client/src/pages/Home.tsx` | Replaced text "K" in `CinematicIntro` with `KiutMark size=88` |
| `client/src/components/SiteFooter.tsx` | Added `KiutMark size=48` above display wordmark |
| `client/index.html` | Added `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` |
| `client/public/favicon.svg` | New — SVG favicon |
| `client/public/brand/*.svg` | 14 new brand asset files |
| `docs/brand-guidelines.md` | New — full brand usage documentation |

---

## Verification

- TypeScript: **0 errors**
- All three site integration points (Nav, Loading screen, Footer) visually verified
- Favicon displays correctly in browser tab
- Brand assets render correctly in isolation at all sizes

---

## Sign-off

Phase 19 — Brand Identity System is **COMPLETE**. The KIUT. geometric mark is implemented across all site touchpoints with canonical variant assignments for every context. 14 production-ready SVG brand assets are available for use across digital and physical channels.
