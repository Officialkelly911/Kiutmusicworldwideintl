# Phase 4 Completion Report — Homepage Upgrade

Date: July 7, 2026
Roadmap Reference: `Implementation_Roadmap.md` — Phase 4

---

## Summary

Phase 4 upgraded `client/src/pages/Home.tsx` with two categories of changes:

1. **KSDL Token Migration** — replaced all Tailwind class-level hardcoded `#D4AF37`
   references with the `gold` token utilities established in Phase 2
   (`text-gold`, `bg-gold`, `border-gold`, `from-gold`, `to-gold`, `via-gold`,
   `text-midnight` on gold button text, etc.). Inline `style={}` objects and
   SVG `fill` attributes were left as-is per the same precedent set in Phase 3
   (they do not participate in Tailwind's utility layer).

2. **New Homepage Sections** — added three sections from the Phase 4 roadmap
   task list that were not yet present:
   - **Concert CTA** (`See Kiut Live`) — live experiences teaser with a
     "Coming Soon" state, pulsing badge, and newsletter sign-up CTA.
   - **Fan Community** (`Fan Community / The Inner Circle`) — two-tier card
     layout: Standard fan member (newsletter) and Premium Inner Circle (Fan Card)
     with benefits lists and link CTAs.
   - **Newsletter CTA** — standalone email capture section above the footer with
     gold-accent styling, Subscribe button, and inline form.

---

## Files Modified

- `client/src/pages/Home.tsx`

---

## Token Migration Detail

### Method

Three-pass `sed` migration on the file:

1. Tailwind color utility classes: `text-[#D4AF37]` → `text-gold`,
   `bg-[#D4AF37]` → `bg-gold`, `border-[#D4AF37]` → `border-gold`,
   `outline-[#D4AF37]` → `outline-gold` (all opacity modifiers preserved
   automatically, e.g. `bg-[#D4AF37]/10` → `bg-gold/10`).
2. Tailwind gradient classes: `from-[#D4AF37]` → `from-gold`,
   `to-[#D4AF37]` → `to-gold`, `via-[#D4AF37]` → `via-gold`.
3. `text-black` on gold button backgrounds: replaced in three targeted cases
   (`group-hover:text-black` on gold hover, `text-black` on gold gradient CTA,
   `text-black` on gold play button icon) → `text-midnight`.

### Remaining `#D4AF37` references (acceptable)

8 references remain — all are inline `style={}` prop objects (JSX), SVG `fill`
attributes, and Framer Motion `whileHover` prop objects. These cannot be
expressed as Tailwind utilities and are identical in behaviour to keeping the
KSDL `--color-gold` CSS variable value. No visual drift.

### Remaining `text-black` references (correct)

3 references remain — all on non-gold backgrounds:
- White-to-gray gradient button (`from-white to-gray-300`) — correct contrast.
- Two social icon buttons where hover background becomes white (`hover:bg-white
  hover:text-black`) — correct contrast on white.

---

## New Sections Added

### Concert CTA — "See Kiut Live"
- Positioned between the Latest Visuals section and the KiutEmbed section.
- Premium "Coming Soon" state: animated pulsing badge, icon monogram, editorial
  copy, and a gold CTA button linking to `/newsletter` for tour notifications.
- Design: dark gradient background, dual radial gold glows, decorative gold
  hairline divider, `rounded-3xl` container consistent with Store section pattern.
- All interactive elements have `data-testid` attributes.

### Fan Community — "Fan Community / The Inner Circle"
- Positioned after the Moments from the Journey section.
- Two-card grid: Standard tier (newsletter, free) and Premium Inner Circle
  tier (Fan Card, gold treatment with featured badge).
- Both cards link to `/newsletter` as the current signup path.
- Social proof row with Instagram and YouTube handles.
- Purple ambient glow at top (per Color System: Home page secondary accent is
  Purple) and gold ambient glow at bottom.

### Newsletter CTA
- Positioned directly before `<SiteFooter />`.
- Centred layout, gold accent lines, email capture form, Subscribe button.
- Consistent with the existing footer newsletter form but as a dedicated
  section-level touch point for better conversion.

---

## Placement Order (full homepage)

1. Cinematic Intro (loader)
2. Hero Slider
3. Stats Strip
4. Artist Introduction / Milestone Gallery
5. Featured Quote
6. Featured Music (Good Life EP)
7. Creative Portfolio (DreamPlanet)
8. KiutRaba's Store
9. Latest Visuals (videos)
10. **Concert CTA** ← New
11. KiutEmbed Section
12. Moments from the Journey
13. **Fan Community** ← New
14. **Newsletter CTA** ← New
15. SiteFooter

---

## Performance

No new dependencies introduced. All new sections use existing Framer Motion,
Lucide React, and Wouter imports already present in the file.

File line count: 1,676 → 1,950 (+274 lines for three new sections).

---

## Accessibility

- All new interactive elements (`<button>`, `<a>`) have `data-testid` attributes.
- Gold-on-black text passes WCAG AA contrast (7:1+).
- Gold CTA buttons use `text-midnight` (near-black) for inner text contrast.
- Newsletter email input has `type="email"` and a descriptive placeholder.
- Fan Community tier cards use semantic `<ul>` + `<li>` for benefits lists.

---

## Verification

- Vite HMR applied cleanly across all edits (8 HMR updates, zero compile errors).
- `grep` confirms: zero `text-[#D4AF37]`, `bg-[#D4AF37]`, `border-[#D4AF37]`
  Tailwind class literals remain in `Home.tsx`.
- All three new sections confirmed present in the file via line number checks.
- Screenshot confirms the cinematic intro and homepage render without errors.

---

## Phase Status

✅ Complete — `Home.tsx` is now fully token-migrated per KSDL standards and
contains all ten sections specified in the Phase 4 roadmap (Hero, Artist
Introduction, Featured Music, Creative Portfolio, Store CTA, Latest Videos,
Concert CTA, Fan Community, Newsletter, Footer).

Awaiting approval before starting **Phase 5** (Music Page Upgrade).
