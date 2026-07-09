# KIUT. — Brand Identity Guidelines

> Timeless. Geometric. Unmistakable.

---

## 1. The Mark

The KIUT. brand mark is an abstract geometric **K** constructed from three flat-vector parallelogram shapes:

1. **Stem** — a vertical left bar anchoring the letterform
2. **Upper arm** — a wing-like shape angled to the upper-right, evoking movement and stage lights
3. **Lower arm** — a mirror wing angled to the lower-right

The mark is purely geometric. No curves, no gradients, no metallic effects. Every shape shares a single fill color, making it print-safe, embroidery-ready, and infinitely scalable.

**Source geometry (100×100 viewport):**
```
Stem:       rect x=10 y=8 width=14 height=84 rx=1
Upper arm:  polygon 24,47 → 24,30 → 84,8 → 84,25
Lower arm:  polygon 24,53 → 24,70 → 84,75 → 84,92
```

**React component:** `client/src/components/KiutMark.tsx`
- `<KiutMark />` — symbol only
- `<KiutLogo />` — mark + wordmark lockup

---

## 2. Color System

| Name         | Hex       | Usage                                               |
|--------------|-----------|-----------------------------------------------------|
| Matte Gold   | `#D4AF37` | Primary brand color. All logo marks. CTAs.          |
| Deep Black   | `#0A0A0C` | Primary background. All dark surfaces.              |
| Soft Ivory   | `#F5F0E8` | Secondary text. Light-mode wordmark alternative.    |
| Pure White   | `#FFFFFF` | White logo version. Light text on dark backgrounds. |

**No gradients. No metallic effects. No rainbow colors.**
All colors are flat. This is what keeps the mark timeless and production-ready.

---

## 3. Typography

**Primary (already loaded via Google Fonts):**
- **Space Grotesk** — wordmark and navigation labels
  - Weights used: 300 (Light) for the wordmark; 400–700 for UI text
  - Letter-spacing: `0.25em–0.32em` on the wordmark (wide tracking = luxury)
- **Inter** — body copy, UI fallback

**Wordmark rendering:**
```
KIUT.   font-weight: 300   letter-spacing: 0.28–0.32em   ALL CAPS
```
The period (`.`) always appears in Matte Gold `#D4AF37`, even in white or black versions.

---

## 4. Logo Variants

All SVG assets are in `client/public/brand/`.

| File | Usage |
|------|-------|
| `kiut-mark-gold.svg` | Symbol only — dark backgrounds |
| `kiut-mark-white.svg` | Symbol only — for embossing, white-on-dark |
| `kiut-mark-ivory.svg` | Symbol only — warm ivory tint |
| `kiut-mark-black.svg` | Symbol only — light backgrounds (includes white bg) |
| `kiut-logo-horizontal-gold.svg` | Full logo — standard usage on dark backgrounds |
| `kiut-logo-horizontal-white.svg` | Full logo — white version |
| `kiut-logo-horizontal-black.svg` | Full logo — black on white (print, light backgrounds) |
| `kiut-logo-vertical-gold.svg` | Stacked lockup — square/portrait layouts, album art |
| `kiut-logo-vertical-white.svg` | Stacked lockup — white |
| `kiut-logo-vertical-black.svg` | Stacked lockup — black on white |
| `kiut-social.svg` | Social profile avatar (400×400, black bg) |
| `kiut-watermark.svg` | Video/photo watermark (18% opacity white) |
| `kiut-merch.svg` | Garment print — oversized mark + tagline |
| `kiut-favicon.svg` | Browser favicon (SVG, auto-scales) |

---

## 5. Usage Rules

### ✓ Do
- Use the mark on black or very dark backgrounds whenever possible
- Keep minimum clear space equal to the stem width on all sides
- Scale uniformly — never stretch or distort
- Use Matte Gold `#D4AF37` as default; White for contrast on gold surfaces
- Export PNGs at 2× minimum (e.g. 400×400 for a 200×200 social avatar)

### ✗ Don't
- Add drop shadows, glows, or metallic gradients to the mark
- Place the mark on busy or mid-tone backgrounds without a backing shape
- Rotate or skew the mark
- Use the mark at sizes below 16px (use the favicon SVG at that size)
- Mix the mark with other typefaces for the wordmark

---

## 6. Favicon & App Icons

| Asset | File | Spec |
|-------|------|------|
| SVG favicon (modern browsers) | `client/public/favicon.svg` | Scalable, black bg |
| 32×32 PNG | `client/public/favicon-32x32.png` | Regenerate from SVG |
| 16×16 PNG | `client/public/favicon-16x16.png` | Regenerate from SVG |
| Apple Touch Icon | `client/public/apple-touch-icon.png` | 180×180, regenerate |
| Android Chrome 192 | `client/public/android-chrome-192x192.png` | Regenerate from social SVG |
| Android Chrome 512 | `client/public/android-chrome-512x512.png` | Regenerate from social SVG |

**To regenerate PNG favicons from the SVG source:**
```bash
# Using Inkscape (CLI):
inkscape client/public/favicon.svg --export-png=client/public/favicon-32x32.png -w 32 -h 32
inkscape client/public/favicon.svg --export-png=client/public/apple-touch-icon.png -w 180 -h 180

# Or use https://realfavicongenerator.net — upload kiut-social.svg
```

---

## 7. Social & Digital Specs

| Platform | Variant | Size |
|----------|---------|------|
| Instagram profile | `kiut-social.svg` | 400×400 |
| YouTube avatar | `kiut-social.svg` | 800×800 export |
| Twitter/X profile | `kiut-social.svg` | 400×400 |
| Spotify artist | `kiut-logo-vertical-gold.svg` | 3000×3000 on black |
| Email signature | `kiut-logo-horizontal-white.svg` | Max 200px wide |

---

## 8. Merchandise

Use `kiut-merch.svg` for garment applications. On black fabric, the mark renders in Matte Gold. For embroidery, single-color thread: **Pantone 871 C** (metallic) or **Pantone 7509 C** (matte approximation).

For white merchandise, use the black-on-white variants. The mark's clean geometry transfers cleanly at any print size.

---

## 9. Quick Reference

```
Primary mark color:   #D4AF37
Background:           #0A0A0C
Wordmark font:        Space Grotesk, weight 300
Wordmark tracking:    0.28–0.32em
React symbol:         <KiutMark color="#D4AF37" size={40} />
React lockup:         <KiutLogo size="md" />
SVG assets:           client/public/brand/
```
