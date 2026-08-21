---
name: Phase 7 Motion System Fixes
description: Specific violations found and fixed in the Phase 7 motion audit — spring bounce, raw durations, hero stagger.
---

# Phase 7 Motion System — what was fixed

## Spring bounce violation (Navigation.tsx)
`layoutId="nav-active"` and `layoutId="nav-underline"` used `type:"spring", bounce:0.18`.
**Fix:** replaced with `{ duration: DUR.normal, ease: EASE_INOUT }`.
**Why:** Spring bounce violates the "no bounce" premium motion rule; layout transitions should feel deliberate.

## Hero stagger sequence (Home.tsx)
Hero text content was one unanimated `motion.div` block (all elements animated together).
**Fix:** converted to `staggerContainer(0.12, 0.1)` parent + `staggerItem` children for badge → headline → subtitle → CTA sequence.
**Why:** Phase 7 spec explicitly requires sequential staggered entrance for hero elements.

## CinematicIntro (Home.tsx)
Raw `duration: 0.7, 0.8` literals in intro → replaced with `DUR.slow` / `DUR.cinematic`.
KiutMark(88px) → KiutFullLogo(94px) showing full KIUT + MUSIC lockup.

## Remaining raw duration literals
There are still ~10 raw duration literals in Home.tsx and SiteFooter.tsx that use values matching DUR constants but not importing them. These are low-priority since the values are correct — they just bypass the import system.

**How to apply:** For any new hero section, use `staggerContainer` + `staggerItem` from motion.ts. Never use `type:"spring"` for layout/navigation transitions — use EASE_INOUT instead.
