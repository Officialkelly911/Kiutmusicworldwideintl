# Kiut Music — Brand Asset Package

`assets/brand/master/kiut-master-logo.svg` is the **single source of truth**. Every file in this
package is generated directly from it — never hand-edit an exported file; regenerate it from the
master instead.

## What the master contains

The master SVG is built entirely from editable vector paths, grouped into five named layers:

- `#crown` — flame-pointed crown with two ball finials and a base band with a center seam line
- `#monogram` — interlocking IK monogram (bezier paths + connecting flourish)
- `#wordmark` — "KIUT" (set in Cinzel, an OpenType typeface — fully editable text, not outlines)
- `#divider` — the two hairline rules flanking the subtitle
- `#subtitle` — "MUSIC"

No raster images, embedded PNGs, or photo traces are used anywhere in the master file.

## Folder structure

```
assets/brand/
├── master/        kiut-master-logo.svg (source of truth), kiut-master-logo.ai (see AI note below)
├── svg/            all logo lockups and color variants
├── png/            transparent PNG exports of the master lockup — 512 / 1024 / 2048 / 4096 px
├── pdf/            kiut-master-logo.pdf — vector, print-ready
├── eps/            kiut-master-logo.eps — correct dimensions/bbox; rasterized fallback (see EPS note)
├── favicon/        favicon.ico, favicon.svg, PNG sizes, site.webmanifest
├── app-icons/       ios / android / macos / windows / pwa icon sets
├── social/         crowned-monogram profile icons for 7 platforms, 3 colors each
├── watermark/       full lockup watermarks, 3 colors × 15/30/60% opacity, SVG + PNG
├── merchandise/     print-ready vector artwork for 8 merch applications + PNG previews
└── README.md
```

## SVG lockups (`svg/`)

| File | Description |
|---|---|
| `kiut-master-logo.svg` | copy of the master |
| `logo-vertical.svg` | crown + monogram stacked above the wordmark (same as master) |
| `logo-horizontal.svg` | monogram left, wordmark + subtitle right — for wide headers/footers |
| `symbol.svg` / `symbol-gold.svg` / `symbol-white.svg` / `symbol-black.svg` | crowned monogram only, no wordmark |
| `logo-gold.svg` | full lockup, brand gold gradient (default) |
| `logo-white.svg` | full lockup, solid white — for dark backgrounds |
| `logo-black.svg` | full lockup, solid black — for light backgrounds |
| `app-icon-square.svg` | monogram centered on a square black field, used as the base for every app/social icon export |

## PNG (`png/`)

Transparent background, generated straight from `master/kiut-master-logo.svg` at 512, 1024, 2048
and 4096 px wide (proportional height).

## PDF / EPS / AI

- `pdf/kiut-master-logo.pdf` — true vector PDF, generated directly from the master SVG. Verified to
  use real PDF pattern/shading objects (`/PatternType 2`, `/ShadingType 2`) for the metallic
  gradients, not embedded raster. Print-ready.
- `eps/kiut-master-logo.eps` — **limitation:** the EPS toolchain available in this environment
  (librsvg/cairo's PostScript backend, and Poppler's `pdftops`) cannot express this artwork's
  gradient fills as native PostScript shading and falls back to rasterizing the whole page into one
  embedded high-resolution image (300ppi) inside the EPS wrapper. This happens even when gradients
  are swapped for flat colors, so it is a toolchain limitation, not a simplification of the artwork
  itself. The page bounding box and dimensions are still correct and it will place/print fine, but
  it is **not** infinitely scalable vector artwork — treat `pdf/kiut-master-logo.pdf` (true vector)
  or `master/kiut-master-logo.svg` as the authoritative vector source if you need to scale, edit, or
  recolor the artwork; re-export EPS from those in Illustrator/Acrobat if a true vector EPS is
  required.
- `master/kiut-master-logo.ai` — **limitation:** this environment has no Illustrator/native `.ai`
  writer available. This file is the same vector PDF content saved with an `.ai` extension, which
  Adobe Illustrator can open (Illustrator opens PDF-compatible `.ai` files natively) but it is not a
  true Illustrator-native document and won't carry Illustrator-specific layer/artboard metadata. For
  guaranteed full-fidelity editing, open `master/kiut-master-logo.svg` or `pdf/kiut-master-logo.pdf`
  directly in Illustrator and re-save as `.ai` from there.
- CMYK: PDF/EPS exports are generated as RGB vector (this environment has no ICC/CMYK conversion
  tool such as Ghostscript). Run a CMYK color conversion in Illustrator/Acrobat before commercial
  print production.

## Favicon package (`favicon/`)

`favicon.ico` (16/32/48 multi-res), `favicon.svg`, `favicon-16x16.png`, `favicon-32x32.png`,
`favicon-48x48.png`, `apple-touch-icon.png` (180px), `android-chrome-192.png`,
`android-chrome-512.png`, `site.webmanifest`. All use the crowned monogram in brand gold.

## App icons (`app-icons/`)

Square black-field icon (`svg/app-icon-square.svg`) exported at each platform's standard sizes:

- `ios/` — 20, 29, 40, 58, 60, 76, 80, 87, 120, 152, 167, 180, 1024 px
- `android/` — 36, 48, 72, 96, 144, 192, 512 px
- `macos/` — 16, 32, 64, 128, 256, 512, 1024 px
- `windows/` — 16, 24, 32, 48, 64, 128, 256 px
- `pwa/` — 192, 256, 384, 512 px, plus `maskable-icon-512.png` (safe-zone padded for maskable
  adaptive icons)

## Social icons (`social/`)

Crowned IK monogram, centered on a 900×900 canvas, for Instagram, Facebook, X, YouTube, Spotify,
Apple Music and TikTok. Each platform has gold (on black field), white (on black field), and black
(on white field) variants.

## Watermarks (`watermark/`)

Full logo lockup in gold / white / black, each at 15%, 30% and 60% opacity, as both SVG (opacity
set on the root `<svg>`) and rendered PNG.

## Merchandise (`merchandise/`)

Vector artwork (`.svg`) plus a flattened PNG preview for each application: t-shirt front, hoodie
chest, cap embroidery, sticker, poster, vinyl sleeve, guitar pick, stage backdrop. These reuse the
horizontal/vertical/symbol lockups at the color variant appropriate to each surface (white on
apparel for contrast, gold on print/embroidery). Scale as needed per production spec — all source
files are vector and lossless at any size.

## Validation checklist

- [x] Master SVG consists only of vector paths and text (no `<image>`, no embedded raster data)
- [x] No clipping masks used
- [x] Layers are grouped and named (`crown`, `monogram`, `wordmark`, `divider`, `subtitle`)
- [x] All exports derive from `master/kiut-master-logo.svg`
- [x] PNG/social/app-icon exports use transparent or documented solid backgrounds
- [x] Naming is consistent (`logo-*`, `symbol-*`, per-platform icon sizes)
- [x] Vector files scale losslessly from favicon (16px) to 4096px+ print
- [ ] True native `.ai`, true vector EPS, and CMYK-converted PDF/EPS — not producible in this
      environment (no Illustrator writer, no PostScript shading support for gradients, no ICC/CMYK
      tool); see the AI and EPS notes above for the recommended finishing steps in Illustrator/Acrobat
