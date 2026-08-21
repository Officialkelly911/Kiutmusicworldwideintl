# Kiut Studio Handbook — Codebase Compliance Audit

Date: July 4, 2026

Auditor: Replit Agent

Scope: Full comparison of the live Kiut Music codebase (`client/`) against the Kiut Studio Handbook (`docs/Studio_Handbook/`)

Status: Audit only — no code was modified as part of this task.

---

## 1. Executive Summary

The Kiut Music codebase is a well-built, cinematic, high-fidelity site with strong component architecture (React + Tailwind CSS v4 + Framer Motion + Shadcn/ui). However, the **Studio Handbook was written as an aspirational specification** and the codebase was largely built independently of it. As a result, compliance is low at the "letter of the law" level (exact token names, exact hex values, exact font families) even though the *spirit* of many rules (premium aesthetic, motion quality, responsive layout, lazy loading) is already being honored in practice.

The single biggest risk is **token drift**: the handbook defines an entire design token vocabulary (`--color-gold`, `--motion-cinematic`, `--bp-mobile`, etc.) that does not exist anywhere in the codebase. Every developer or agent that "follows the handbook literally" today would write code referencing tokens that don't exist.

---

## 2. What Already Complies

| Area | Handbook Reference | Status |
|---|---|---|
| Dark, cinematic visual identity | Brand Identity, Design Philosophy | ✅ Matches. Background is near-black (`240 10% 4%` / `#0a0a0c`), premium feel achieved. |
| Gold accent as a brand signature | Color System, Brand Identity | ✅ Gold (`#D4AF37`) is used consistently for premium/"Inner Circle" moments, though as a hardcoded value rather than a token. |
| Motion-driven, purposeful interactions | Animation & Motion System | ✅ Framer Motion used extensively with intentional easing curves (e.g. `[0.22, 1, 0.36, 1]`), hover scaling, and page transitions. |
| Glassmorphism / translucent surfaces | Shadow & Glow System | ✅ `.glass` utility class (`backdrop-filter: blur(24px)`) is implemented and used in Navigation and other overlays. |
| Card hover elevation & glow | Card System, Shadow & Glow System | ✅ Custom gold box-shadows on hover (e.g. `shadow-[0_0_22px_rgba(212,175,55,0.55)]`) are present, matching the "glow" concept even if not token-driven. |
| Responsive grid behavior | Responsive System | ✅ Tailwind breakpoint prefixes (`sm:`, `md:`, `lg:`) are used throughout for grid column changes (e.g. `grid-cols-2 md:grid-cols-4`). |
| Image lazy loading | Performance Standards, Asset Guidelines | ✅ Native `loading="lazy"` used consistently on images. |
| Video preload discipline | Performance Standards | ✅ Videos use `preload="metadata"` / `preload="none"`; hero video is explicitly preloaded via `<link rel="preload">`, matching the "only preload hero video" rule. |
| Alt text on images | Accessibility Standards | ✅ Present consistently (e.g. `alt={video.title}`, `alt={track.album}`). |
| aria-labels on some interactive elements | Accessibility Standards | ✅ Present on social icons and play buttons. |
| Footer content completeness | Page Templates | ✅ `SiteFooter.tsx` includes navigation, social links, streaming links, newsletter, and copyright — matches the "Footer must contain" list almost exactly. |
| Newsletter section | Page Templates, UI Patterns | ✅ Exists both as a dedicated page and as an embedded footer form, exceeding the minimum requirement. |
| Touch gesture support | Responsive System | ✅ `About.tsx` Lightbox implements touch swipe (`touchStartX`/`touchEnd`). |
| Mobile drawer navigation | UI Patterns, Component Library | ✅ `Navigation.tsx` has an `AnimatePresence`-driven mobile menu, matching the "Drawer Menu" pattern. |

---

## 3. What Partially Complies

| Area | Handbook Expectation | Current State | Gap |
|---|---|---|---|
| Color System | Specific palette: `--color-background-primary:#080808`, `--color-gold:#D4AF37`, `--color-purple:#6D3EFF`, semantic success/warning/error/info colors | Codebase uses a *different* HSL-based palette (`--primary: 280 100% 65%` purple, `--accent: 320 100% 60%` pink/magenta) built on Shadcn conventions, with gold hardcoded separately and not tokenized | Palette values don't match 1:1; some hues (pink/magenta accent) are not mentioned anywhere in the handbook at all |
| Typography System | `--font-display: "Bebas Neue"`, `--font-body: "Inter"` | `--font-sans: 'Inter'` ✅ matches, but `--font-display: 'Space Grotesk'` — Bebas Neue is **not loaded anywhere** | Display font mismatch; extra unlisted fonts (Cinzel, Montserrat) also loaded |
| Design Tokens | Full token set across 12 categories (color, spacing, radius, shadow, glow, motion, easing, icon, layout, breakpoint, z-index, opacity), all as literal CSS custom properties | Only a subset exists: colors (Shadcn-style), radius scale, two glow utility classes, no explicit spacing/motion/easing/icon/z-index/opacity token files | Motion durations, easing curves, and z-index values are hardcoded per-component instead of centralized tokens |
| Button System | Defined variants matching KSDL naming and gold-based default styling | `button.tsx` has `default/destructive/outline/secondary/ghost/link` variants (Shadcn defaults), default variant colored gold-ish via `--primary`-style tokens, but naming and exact states (loading, disabled per spec) not verified against doc language | Partial - functional but not explicitly aligned to KSDL naming/checklist |
| Card System | Consistent card patterns via shared component | Multiple bespoke card implementations (`AlbumCard`, `HomeVideoCard`, `GalleryImage`) each with their own custom styling rather than extending a shared `Card` primitive consistently | Duplication risk; inconsistent shadow/glow values between card types |
| Iconography System | Consistent stroke width, SVG-first, sizing tokens (`--icon-xs` … `--icon-xl`) | Lucide React used for standard icons (consistent stroke width by default) but custom hardcoded SVGs also embedded per-component for platform logos (Spotify, Apple Music, etc.) with no shared icon-size tokens | Sizing is ad hoc (inline width/height) rather than token-driven |
| Responsive System | Named breakpoint tokens (`--bp-mobile:480px`, `--bp-tablet:768px`, etc.), 4/8/12 column grid system, defined container widths | Uses default Tailwind v4 breakpoints (which differ numerically from the handbook's custom scale) with no named breakpoint tokens or explicit container width tokens | Breakpoint *values* likely diverge from the handbook's specific pixel values (e.g. handbook's `320/375/480/768/1024/1280/1440/1920/2560` scale vs. Tailwind defaults `640/768/1024/1280/1536`) |
| Page Templates | Dedicated pages for Store, Tour, Fan Card, Contact | These do not exist as standalone pages; Store and Tour content is folded into Home/Videos as sections, and Dream Planet Store CTA / Fan Card / Contact pages are absent entirely | Significant structural gap — see Missing Components below |
| SEO Requirements | Unique title, meta description, Open Graph image, canonical URL, structured data **per page** | Only global/static meta tags exist in `client/index.html`; no per-page dynamic SEO (no `react-helmet`, no route-based title/meta updates) | Every route currently serves the same title/description/OG image |
| Accessibility — Focus States | Visible outline, min 2px, Brand Gold focus ring, never remove outlines without replacement | No explicit `focus-visible` overrides found in the codebase — relying on browser default focus rings (if not suppressed by Tailwind resets) | Needs verification that default outlines aren't being stripped, and no branded focus ring exists |
| Motion — Reduced Motion Support | Respect `prefers-reduced-motion`, disable unnecessary animation | No matches found for `prefers-reduced-motion` in `client/src` | Framer Motion animations run unconditionally regardless of user OS preference |

---

## 4. What Does Not Comply

| Area | Handbook Rule | Violation |
|---|---|---|
| Design Tokens — Naming Rules | "Never include page names or component names in tokens; describe purpose" | Some hardcoded values are effectively page-specific (e.g. gallery-only shadow values embedded directly in `About.tsx` rather than reusable tokens) |
| Implementation Standards — Styling Rules | "Never hardcode colors. Never hardcode spacing." | Pervasive hardcoded hex/rgba colors (`bg-[#0c0c0c]`, `text-[#D4AF37]`, `border-white/[0.06]`) and one-off pixel/opacity values across custom page sections |
| Typography System | Two-font limit ("Limit to two font families" — Performance Standards) | Four font families are loaded (Inter, Space Grotesk, Cinzel, Montserrat), double the mandated limit |
| Design Tokens (Bebas Neue) | Display typeface should be Bebas Neue | Bebas Neue is referenced only in documentation; it is never loaded or applied anywhere in the app |
| Page Templates — Store Page | Dedicated Store page with Hero, Featured Products, Collections, Digital Products, Limited Editions, Dream Planet CTA, FAQ | No standalone Store page exists |
| Page Templates — Tour Page | Dedicated Tour page with Upcoming/Past Events, VIP Tickets, Fan Card CTA, Meet & Greet CTA | No standalone Tour page exists |
| Page Templates — Fan Card Page | Dedicated membership comparison page | Does not exist |
| Page Templates — Contact Page | Dedicated Contact page with contact methods, business enquiries, social media | Does not exist |
| SEO Requirements | Unique title/description/canonical/structured data per page | Single static set of meta tags in `index.html`, applied uniformly regardless of route |
| Accessibility — Skip Navigation | "Skip to content link" required (Accessibility Standards, Navigation section) | Not found anywhere in the codebase |
| Motion — Reduced Motion | "Respect prefers-reduced-motion" (mandatory, not optional) | Entirely unimplemented |
| Performance — Font Budget | "Fonts < 200KB total" | Loading 4 font families across multiple weights very likely exceeds this budget (needs a network-tab measurement to confirm precisely, but architecturally this is the direction of travel) |
| Performance — Code Splitting | "Code split by route" (Implementation Standards) | No `React.lazy`/route-based code splitting detected; the full app bundle is likely shipped on first load |

---

## 5. Missing Components (vs. Component Library / UI Patterns / Page Templates)

- **Store page** (with Dream Planet redirect flow) — currently only a homepage carousel section
- **Tour / Concerts page** (Upcoming Events, Past Events, VIP Tickets)
- **Fan Card / Membership page** (Regular vs Premium comparison, pricing, FAQ, Apply CTA)
- **Contact page** (contact methods, business enquiries, social media)
- **Shared/reusable Testimonial pattern** — not found in any page
- **Shared/reusable Statistics pattern as a standalone component** — `HomeStatsStrip` exists but is Home-specific rather than a reusable pattern per the UI Patterns doc
- **Empty State pattern** — no dedicated empty-state UI found (e.g., for search results, empty galleries)
- **Search pattern** — no site search functionality exists at all
- **404/Error pattern alignment** — a `not-found.tsx` page exists, but it should be checked against the documented Error Pattern structure (Error Icon → Headline → Explanation → Retry Button → Support Link)
- **Skip-to-content link** (accessibility-critical, effectively a missing "component" in the navigation pattern)
- **Per-page SEO/meta component** (e.g. a `<Seo>` / `react-helmet`-based component used per route)

---

## 6. Missing Design Tokens

Comparing `docs/Studio_Handbook/03_Design_System/11_Design_Tokens.md` line-by-line against `client/src/index.css`:

- **Color tokens**: `--color-background-secondary`, `--color-surface`, `--color-heading`, `--color-body`, `--color-muted` (handbook naming), `--color-gold`, `--color-gold-hover`, `--color-champagne`, `--color-purple` (handbook's specific purple), `--color-success`, `--color-warning`, `--color-error`, `--color-info` — none of these exact names exist (a differently-named, differently-valued set exists instead)
- **Typography tokens**: `--font-size-display` through `--font-size-caption` — no such scale of custom properties exists; sizing is done via Tailwind's default text-size utilities
- **Spacing tokens**: `--space-1` through `--space-10` — entirely absent; spacing relies on raw Tailwind spacing scale
- **Shadow tokens**: `--shadow-xs` through `--shadow-xl` — absent (only two `.glow-*` utility classes exist, and they don't match this naming/value set)
- **Glow tokens**: `--glow-gold`, `--glow-gold-hover`, `--glow-purple`, `--glow-champagne` — absent (existing `.glow-primary`/`.glow-accent` are similar in spirit but different values/names)
- **Motion tokens**: `--motion-fast` through `--motion-cinematic` — absent; all durations are hardcoded per Framer Motion call
- **Easing tokens**: `--ease-default`, `--ease-enter`, `--ease-exit`, `--ease-page` — absent; cubic-bezier arrays are duplicated inline across components
- **Icon tokens**: `--icon-xs` through `--icon-xl` — absent; icon sizes set via ad hoc width/height props
- **Layout tokens**: `--container-sm` through `--container-ultra` — absent
- **Breakpoint tokens**: `--bp-mobile` through `--bp-ultrawide` — absent (Tailwind v4 defaults are used instead, with different pixel values)
- **Layer (z-index) tokens**: `--z-background` through `--z-loader` — absent; z-index values are hardcoded per component (`z-[100]`, `z-[80]`, `z-[60]`, etc.) with no documented hierarchy
- **Opacity tokens**: `--opacity-disabled`, `--opacity-overlay`, `--opacity-glass`, `--opacity-hover` — absent; opacity values are hardcoded inline (e.g. `border-white/[0.06]`, `bg-[#0d0d0d]/97`)

---

## 7. Missing Responsive Behaviors

- No named/token-based breakpoint system matching the handbook's 9-tier scale (320/375/480/768/1024/1280/1440/1920/2560) — currently limited to Tailwind's 5 default breakpoints
- No documented/enforced container width tokens (`--container-mobile: 100%` through `--container-ultra: 1600px`) — max-width values are set ad hoc per section
- No verified maximum-readable-content-width enforcement (handbook requires content width to stay below 1440px) — needs spot-checking on wide-viewport layouts
- No explicit mobile-first "full width button" rule verified — buttons don't appear to switch to `w-full` on mobile in all documented contexts (Forms/Buttons sections)
- No confirmed responsive typography scaling system matching the handbook's Hero/H1/Body px-to-px breakpoint table (42→56→72px etc.) — headings currently rely on fixed Tailwind text-size classes without a documented fluid/breakpoint scale

---

## 8. Accessibility Issues

1. **No skip-to-content link** — required by the Accessibility Standards and Navigation rules; currently absent site-wide.
2. **No `prefers-reduced-motion` support** — a mandatory rule ("Respect motion preferences") that is entirely unimplemented; users with vestibular disorders have no way to reduce animation.
3. **No explicit branded focus-visible styling** — the handbook requires a "Brand Gold focus ring, minimum 2px, high contrast" on every interactive element; no such override was found, meaning focus states rely entirely on (likely suppressed or inconsistent) browser defaults.
4. **Aria-labels are inconsistent, not systematic** — present on some interactive elements (social icons, play buttons) but not verified across all icon-only buttons, especially custom `motion.button`/`motion.div` elements that don't carry semantic button roles by default.
5. **Heading hierarchy not audited** — with hero sections, quote sections, and multiple nested content blocks per page, there's a real risk of skipped heading levels or multiple H1s; this needs a manual per-page pass.
6. **Custom Lightbox / SharePopup / Mobile Menu** — need explicit verification of focus trapping (handbook: "Always trap focus while open" for modals) — not confirmed present.
7. **Color contrast not verified** — the handbook mandates 4.5:1 body text contrast; the actual palette (`--muted-foreground: 240 5% 55%` on a near-black background, and gold-on-dark combinations) has not been measured against WCAG contrast ratios in this audit and should be checked with a contrast tool.

---

## 9. Performance Issues

1. **Font over-budget**: 4 font families (Inter, Space Grotesk, Cinzel, Montserrat) loaded via Google Fonts vs. the handbook's 2-family limit and <200KB total budget — likely a Largest Contentful Paint and Cumulative Layout Shift risk (multiple `@font-face` swaps).
2. **No code splitting by route** — the entire app appears to load as a single bundle rather than being split per page (`React.lazy` + `Suspense` not found), working against the "Homepage JavaScript < 250KB" budget as the app grows.
3. **No per-page SEO/meta system** — while not a raw performance metric, static duplicate meta tags across routes hurt SEO performance scoring (a Lighthouse SEO category component) and are explicitly required to be unique per page.
4. **Bundle size / Lighthouse targets not measured in this audit** — no Lighthouse run was performed as part of this task; recommend running Lighthouse (mobile + desktop) to get a baseline against the documented targets (100 desktop / 95+ mobile).
5. **Heavy inline gradients & multiple simultaneous Framer Motion animations** — the Design Philosophy explore found "complex inline styles for radial and linear gradients" and multiple concurrent hover/scroll animations per page, which the Performance Standards doc explicitly flags as a mobile-optimization risk ("reduce animation complexity on mobile," "limit simultaneous animations").

---

## 10. UI Inconsistencies

1. **Card styling duplicated, not shared** — `AlbumCard`, `HomeVideoCard`, and `GalleryImage` each implement their own hover/shadow/scale treatment instead of extending one shared Card primitive, risking visual drift over time.
2. **Two parallel toast/notification systems** — both Sonner and Radix Toast (`use-toast.ts`) are present simultaneously; the handbook's Notification Pattern implies a single consistent system (top-right desktop / bottom-center mobile, 5s auto-dismiss) — worth confirming only one is actually used, or consolidating.
3. **Gold token inconsistency** — `#D4AF37` is hardcoded dozens of times across components rather than referencing a single `--color-gold` token, meaning any future rebrand or shade adjustment requires a manual find-and-replace across many files.
4. **Two accent hues that aren't in the handbook at all** — the codebase's `--primary` (purple, 280°) and `--accent` (pink/magenta, 320°) values don't correspond to anything documented in the Color System, creating a visible mismatch between "documented brand" (black/gold/purple per the Design Tokens doc's `--color-purple:#6D3EFF`) and "implemented brand" (a different purple/pink pairing).
5. **Icon sizing not standardized** — Lucide icons and custom SVG platform logos are sized ad hoc per instance rather than via shared size tokens, so icon scale can drift between sections (e.g. Music page vs. About page platform badges).
6. **z-index values hardcoded and unordered** — arbitrary values (`z-[100]`, `z-[80]`, `z-[60]`, `z-[9]`, `z-[1]`) are scattered with no central stacking-order reference, risking future stacking bugs as more overlays (modals, toasts, drawers) are added.

---

## 11. Suggested Implementation Order (Highest → Lowest Priority)

1. **Reconcile the Design Token layer** — Decide whether the codebase adopts the handbook's exact token names/values, or the handbook is updated to reflect the actual shipped palette/fonts. This is the root cause of nearly every other inconsistency and should be resolved before any other remediation work, since it determines what "correct" looks like going forward.
2. **Accessibility fundamentals** — Add a skip-to-content link, implement `prefers-reduced-motion` support, and add a branded `focus-visible` style. These are foundational, low-effort, high-impact fixes that affect every page at once.
3. **Font consolidation** — Reduce from 4 font families to the intended 2 (resolve whether the display font should be Bebas Neue per the docs or Space Grotesk per the code, then update the other artifact to match), directly improving load performance and closing a direct handbook violation.
4. **Centralize hardcoded values into tokens** — Systematically replace hardcoded hex colors, shadow values, motion durations/easings, and z-index numbers with CSS custom properties, starting with the highest-traffic components (Navigation, SiteFooter, Button, Card primitives).
5. **Per-page SEO** — Introduce a lightweight per-route meta/title/OG solution so each page has unique, accurate metadata; this is a contained, well-scoped fix with immediate SEO benefit.
6. **Consolidate duplicate patterns** — Merge the two toast systems into one, and refactor `AlbumCard`/`HomeVideoCard`/`GalleryImage` to extend a shared Card primitive with documented variants.
7. **Missing pages** — Build the Store, Tour, Fan Card, and Contact pages as dedicated routes following the approved Page Templates, rather than leaving that content folded into Home/Videos. This is larger scope and should follow once the underlying token/component foundation is solid.
8. **Code splitting & bundle performance** — Introduce route-based code splitting once the page set is finalized (do this after item 7 so splitting boundaries match the final route structure).
9. **Missing UI patterns** — Add Search and Empty State patterns, and formalize the Statistics/Testimonial patterns as reusable components rather than one-off page sections.
10. **Formal Lighthouse + contrast audit** — Once the above structural work is done, run a full Lighthouse pass (mobile + desktop) and a contrast-ratio check across the palette to verify the Performance and Accessibility budgets are actually being met, and to catch anything this static-code audit could not measure directly.

---

## 12. Notes & Caveats

- This audit is based on static code review (file structure, CSS, and component inspection). It does **not** include a live Lighthouse run, a computed color-contrast check, or a rendered-page visual inspection — those are recommended as immediate follow-ups (see Section 11, item 10).
- No code was modified during this task, per instructions. All findings above are observational only.
