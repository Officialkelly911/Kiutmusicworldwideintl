---
name: KSDL Motion System
description: Shared animation primitives, reduced-motion strategy, and loading skeleton system established in Phase 12.
---

## Rule
All animation variants, easings, durations, and whileHover/whileTap prop-sets must come from `client/src/lib/motion.ts`. Do not hardcode animation values in page or component files.

**Why:** Before Phase 12, every page hardcoded its own variant objects causing easing drift (`[0.22,1,0.36,1]` vs `easeOut`), inconsistent y-offsets (12–32px), and no shared vocabulary for hover/tap feedback.

**How to apply:**
- Import `fadeUp`, `hoverLift`, `viewport`, etc. from `@/lib/motion` — never define local variants.
- Use `<RevealSection>` from `client/src/components/RevealSection.tsx` for any new scroll-triggered section.
- Use `<ShimmerCard>` / `<ShimmerGrid>` from `client/src/components/Shimmer.tsx` for loading states.

## Reduced Motion (global — no per-page work needed)
`MotionConfig reducedMotion="user"` in `App.tsx` (wraps the entire tree) makes every `motion.*` element automatically respect `prefers-reduced-motion` at the OS level.
CSS transitions are covered by `@media (prefers-reduced-motion: reduce)` in `index.css`.
**Do not add per-page `useReducedMotion` hooks** — the global config already handles it.

## Key exports from motion.ts
- Easings: `EASE_ENTER`, `EASE_EXIT`, `EASE_INOUT`, `EASE_SPRING`
- Durations: `DUR.fast` (0.18s) → `DUR.cinematic` (0.80s)
- Transitions: `T.fast`, `T.normal`, `T.medium`, `T.slow`, `T.cinematic`, `T.exit`
- Reveal variants: `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `fadeIn`, `scaleIn`, `scaleInFast`
- Stagger: `staggerContainer(stagger, delayChildren)` + `staggerItem` + `staggerItemLeft`
- Page transition: `pageVariants` (used in App.tsx AnimatedRouter)
- Viewport config: `viewport` (once:true, margin:"-48px"), `viewportEager` (margin:"-16px")
- Hover/tap sets: `hoverLift`, `hoverScale`, `hoverSubtle`, `hoverCard`, `tapPress`

## CSS additions (index.css)
- `@keyframes ksdl-shimmer` + `.ksdl-shimmer` class — gold-tinted shimmer for loading skeletons
- `@keyframes ksdl-pulse-glow` + `.ksdl-pulse-glow` class — pulsing gold glow for CTAs
- `@media (prefers-reduced-motion: reduce)` block — disables all CSS animations/transitions
