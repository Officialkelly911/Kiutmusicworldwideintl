/**
 * KSDL Motion System — client/src/lib/motion.ts
 *
 * Single source of truth for every animation primitive on the Kiut Music website.
 * All Framer Motion variants, easing constants, duration scales, and standard
 * whileHover / whileTap prop-sets live here.
 *
 * Usage:
 *   import { fadeUp, viewport, hoverLift, EASE_ENTER } from "@/lib/motion";
 *
 * Reduced-motion:
 *   App.tsx wraps the tree in <MotionConfig reducedMotion="user"> so every
 *   motion.* element automatically respects prefers-reduced-motion without
 *   any per-component logic. CSS transitions are covered by the global rule
 *   in index.css.
 */

import type { Variants, Transition } from "framer-motion";

// ── Easing ────────────────────────────────────────────────────────────────────
// Matches KSDL CSS tokens --ease-enter / --ease-exit / --ease-page
export const EASE_ENTER  = [0.22, 1, 0.36, 1] as const;   // expo-out  — most entrances
export const EASE_EXIT   = [0.36, 0, 0.66, 0] as const;   // expo-in   — exits
export const EASE_INOUT  = [0.65, 0, 0.35, 1] as const;   // smooth    — transitions
export const EASE_SPRING = { type: "spring", stiffness: 220, damping: 22 } as const;

// ── Duration scale (seconds) — matches KSDL --motion-* CSS tokens ─────────────
export const DUR = {
  fast:      0.18,  // micro-interaction
  normal:    0.28,  // button, nav link
  medium:    0.45,  // small card, icon
  slow:      0.60,  // section element
  cinematic: 0.80,  // hero, full-section
} as const;

// ── Standard transition presets ───────────────────────────────────────────────
export const T = {
  fast:      { duration: DUR.fast,      ease: EASE_ENTER } satisfies Transition,
  normal:    { duration: DUR.normal,    ease: EASE_ENTER } satisfies Transition,
  medium:    { duration: DUR.medium,    ease: EASE_ENTER } satisfies Transition,
  slow:      { duration: DUR.slow,      ease: EASE_ENTER } satisfies Transition,
  cinematic: { duration: DUR.cinematic, ease: EASE_ENTER } satisfies Transition,
  exit:      { duration: DUR.fast,      ease: EASE_EXIT  } satisfies Transition,
} as const;

// ── Reveal variants ───────────────────────────────────────────────────────────
// All use hidden/visible so they work with <RevealSection> and direct whileInView.

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,  transition: T.slow },
};

export const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0,  transition: T.slow },
};

export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0,  transition: T.slow },
};

export const fadeRight: Variants = {
  hidden:  { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0,  transition: T.slow },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: T.medium },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1,    transition: T.slow },
};

export const scaleInFast: Variants = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1,    transition: { ...EASE_SPRING } },
};

// ── Stagger containers ────────────────────────────────────────────────────────
/**
 * Parent container for staggered children. Children should use staggerItem or
 * any hidden/visible variant.
 *
 * @param stagger        seconds between each child reveal  (default 0.08)
 * @param delayChildren  initial delay before first child   (default 0)
 */
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

// Standard stagger child — drop-in with fadeUp motion
export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0,  transition: T.slow },
};

// Lighter stagger child — horizontal slide
export const staggerItemLeft: Variants = {
  hidden:  { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0,   transition: T.slow },
};

// ── Page transition ───────────────────────────────────────────────────────────
// Used in App.tsx AnimatedRouter via AnimatePresence mode="wait"
// Subtle vertical drift — premium crossfade feel without distracting movement.
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.medium, ease: EASE_ENTER },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: DUR.fast, ease: EASE_EXIT },
  },
};

// ── Hero-specific variants ────────────────────────────────────────────────────
// For staggered hero entrances: background → overlay → headline → sub → CTA

/** Hero headline — slow cinematic rise */
export const heroFadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0,  transition: { duration: DUR.cinematic, ease: EASE_ENTER } },
};

/** Hero subtitle — slightly faster, delayed */
export const heroFadeSub: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: EASE_ENTER, delay: 0.18 },
  },
};

/** Hero CTA group — appears last */
export const heroFadeCTA: Variants = {
  hidden:  { opacity: 0, y: 12 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: EASE_ENTER, delay: 0.36 },
  },
};

// ── Viewport config ───────────────────────────────────────────────────────────
// Single config to pass to viewport prop — prevents reveal-on-first-paint issues.
export const viewport = { once: true, margin: "-48px" } as const;

// Tighter margin for dense sections (cards near the fold)
export const viewportEager = { once: true, margin: "-16px" } as const;

// ── whileHover / whileTap prop-sets ──────────────────────────────────────────
// Spread directly onto motion.* elements:
//   <motion.button {...hoverLift}>

/** Primary CTA lift — gold buttons, card CTAs */
export const hoverLift = {
  whileHover: { y: -3, scale: 1.02 },
  whileTap:   { scale: 0.97 },
} as const;

/** Scale-only — nav items, small chips */
export const hoverScale = {
  whileHover: { scale: 1.04 },
  whileTap:   { scale: 0.96 },
} as const;

/** Subtle — secondary links, tags */
export const hoverSubtle = {
  whileHover: { y: -1, scale: 1.01 },
  whileTap:   { scale: 0.98 },
} as const;

/** Tap-only — for elements that shouldn't move on hover */
export const tapPress = {
  whileTap: { scale: 0.97 },
} as const;

/** Card lift — product cards, media cards */
export const hoverCard = {
  whileHover: { y: -6, scale: 1.02 },
  whileTap:   { scale: 0.98 },
} as const;

// ── Shimmer keyframe name (referenced in Shimmer.tsx) ─────────────────────────
// The actual @keyframes rule lives in index.css.
export const SHIMMER_CLASS = "ksdl-shimmer" as const;
