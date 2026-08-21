import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/**
 * PremiumCTAButton — KIUT Brand Integration.
 *
 * The single reusable component for every major conversion CTA on the site
 * (hero "Listen Now", "Latest Release", "Join Newsletter", "Book Kiut",
 * "Shop Merchandise", "Watch Official Video", "Become a Member", "Contact",
 * etc). Only the label and icon change between usages — radius, border,
 * glow, sweep, hover/active/focus behavior, and entrance choreography all
 * live here so they stay identical everywhere.
 *
 * Visual spec: full pill, 2px Royal Gold border, satin near-black (#080808)
 * interior, soft gold glow, and a slow gold light sweep across the border
 * every ~5s (CSS keyframes — GPU-cheap, runs independently of React).
 *
 * Motion spec: hover lifts 2-3px / scales ~1.02 / brightens border, active
 * compresses to ~0.98, icon fades in first then the label follows with a
 * slight 2-3px horizontal settle — no bounce. Only `transform` and `opacity`
 * are animated for smooth 60fps performance. All of this automatically
 * respects prefers-reduced-motion via the app-wide
 * `<MotionConfig reducedMotion="user">` (framer-motion animations) and the
 * global CSS reduced-motion rule in index.css (the border sweep keyframes).
 *
 * Secondary buttons should keep using the plain `.btn-base .btn-secondary`
 * gold-outline style from Phase 4 — do not use this component for them.
 */

// Single interactive element for internal routes — avoids nesting <a> inside
// <button> and matches the `motion.create(Link)` pattern already used
// elsewhere in the app (Tour.tsx, Contact.tsx). Defined once at module scope
// so it is never recreated on render.
const MotionRouterLink = motion.create(Link) as unknown as React.FC<
  React.ComponentProps<typeof Link> & {
    className?: string;
    whileHover?: unknown;
    whileTap?: unknown;
    initial?: unknown;
    animate?: unknown;
    variants?: unknown;
    transition?: unknown;
    "aria-label"?: string;
    "data-testid"?: string;
  }
>;

const buttonVariants = {
  hidden: {},
  visible: {},
  hover: { y: -2, scale: 1.02 },
  tap: { scale: 0.98, y: 0 },
};

const iconVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.32, ease: "easeOut" as const } },
};

function textVariants(iconPosition: "left" | "right") {
  const from = iconPosition === "left" ? -3 : 3;
  return {
    hidden: { opacity: 0, x: from },
    visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: "easeOut" as const, delay: 0.1 } },
  };
}

export interface PremiumCTAButtonProps {
  /** "button" (default), "a" for a plain external/anchor link, or "link" for an internal wouter route. */
  as?: "button" | "a" | "link";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  size?: "default" | "sm";
  className?: string;
  children: React.ReactNode;
  /**
   * Analytics event fired on click via the centralized `track()` module.
   * Defaults to "cta_click" — override for specific conversions
   * (e.g. "tour_booking", "store_click").
   */
  analyticsEvent?: AnalyticsEvent;
  /** Optional analytics label override (defaults to the button's visible text). */
  analyticsLabel?: string;
  onClick?: (e: React.SyntheticEvent) => void;
  [key: string]: unknown;
}

export function PremiumCTAButton({
  as = "button",
  icon,
  iconPosition = "left",
  size = "default",
  className,
  children,
  analyticsEvent = "cta_click",
  analyticsLabel,
  onClick,
  href,
  ...props
}: PremiumCTAButtonProps) {
  const Comp = (as === "link" ? MotionRouterLink : as === "a" ? motion.a : motion.button) as React.ElementType;
  const iconEl = icon ? (
    <motion.span className="premium-cta-icon" variants={iconVariants}>
      {icon}
    </motion.span>
  ) : null;

  const handleClick = (e: React.SyntheticEvent) => {
    track(analyticsEvent, {
      label: analyticsLabel ?? (typeof children === "string" ? children : undefined),
      destination: href,
    });
    onClick?.(e);
  };

  return (
    <Comp
      className={cn("premium-cta", size === "sm" && "premium-cta-sm", className)}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      href={href}
      onClick={handleClick}
      {...props}
    >
      <span className="premium-cta-sweep" aria-hidden="true" />
      {iconPosition === "left" && iconEl}
      <motion.span className="premium-cta-label" variants={textVariants(iconPosition)}>
        {children}
      </motion.span>
      {iconPosition === "right" && iconEl}
    </Comp>
  );
}

export default PremiumCTAButton;
