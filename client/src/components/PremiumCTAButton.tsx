/**
 * PremiumCTAButton — KIUT Music luxury call-to-action button.
 *
 * - Full pill shape, 2px Royal Gold border, near-black background (#080808)
 * - Soft ambient gold glow on border
 * - CSS gold light sweep across border every 5 s (skips on prefers-reduced-motion)
 * - Framer Motion hover/active/mount animations (60 FPS transform + opacity only)
 * - Optional left icon with animated entrance
 * - Accessible focus ring, fully responsive
 * - Renders as <button>, wouter <Link>, or <a> depending on props
 */
import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Link } from "wouter";

// ── Types ─────────────────────────────────────────────────────────────────────
export type PremiumCTASize = "sm" | "md" | "lg";

export interface PremiumCTAButtonProps {
  children: React.ReactNode;
  /** Optional icon rendered to the left of the label */
  icon?: React.ReactNode;
  /** Internal route — renders a wouter Link wrapper */
  href?: string;
  /** External URL — renders a plain <a> */
  externalHref?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  size?: PremiumCTASize;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
  /** Delay (seconds) before mount animation plays. Default 0. */
  enterDelay?: number;
}

// ── Size map ──────────────────────────────────────────────────────────────────
const SIZE: Record<PremiumCTASize, string> = {
  sm: "px-5 py-2 text-xs gap-1.5",
  md: "px-7 py-3.5 text-sm gap-2",
  lg: "px-10 py-4.5 text-base gap-2.5",
};

// ── Framer Motion variants ────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const contentVariants = {
  hidden: { opacity: 0, x: -4 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.08 },
  },
};

// ── Inner button (motion element) ─────────────────────────────────────────────
function InnerButton({
  icon,
  children,
  size = "md",
  disabled,
  type = "button",
  onClick,
  enterDelay = 0,
  className,
  fullWidth,
  motionProps,
}: PremiumCTAButtonProps & {
  motionProps?: Omit<HTMLMotionProps<"button">, "children">;
}) {
  const sizeClass = SIZE[size];
  const widthClass = fullWidth ? "w-full justify-center" : "";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={enterDelay}
      style={{ display: fullWidth ? "block" : "inline-block", pointerEvents: "none" }}
    >
      <motion.button
        type={type}
        disabled={disabled}
        onClick={onClick}
        whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
        whileTap={disabled ? {} : { scale: 0.98, y: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={[
          // Layout
          "relative inline-flex items-center overflow-hidden select-none",
          "rounded-full",
          sizeClass,
          widthClass,
          // Border + background
          "border-2 border-gold/80",
          "bg-[#080808]",
          // Typography
          "font-medium tracking-[0.12em] uppercase text-white",
          // Ambient glow
          "shadow-[0_0_14px_rgba(212,175,55,0.22)]",
          // Hover glow (CSS, no JS)
          "hover:border-gold hover:shadow-[0_0_22px_rgba(212,175,55,0.40)]",
          // Focus ring
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          // Disabled
          disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
          // Transition for border/shadow only (transform handled by Framer Motion)
          "transition-[border-color,box-shadow] duration-250 ease-in-out",
          // Pointer events — enabled on the button itself
          "pointer-events-auto",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        {...motionProps}
        aria-disabled={disabled}
      >
        {/* ── Gold border sweep shimmer ─────────────────────────────────── */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full pointer-events-none kiut-border-sweep"
        />

        {/* ── Content ──────────────────────────────────────────────────── */}
        <motion.span
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex items-center"
          style={{ gap: "inherit" }}
        >
          {icon && (
            <span className="flex-shrink-0 leading-none">{icon}</span>
          )}
          {children}
        </motion.span>
      </motion.button>
    </motion.div>
  );
}

// ── Public component ──────────────────────────────────────────────────────────
export function PremiumCTAButton(props: PremiumCTAButtonProps) {
  const { href, externalHref } = props;

  // Internal wouter link
  if (href) {
    return (
      <Link href={href}>
        <InnerButton {...props} href={undefined} />
      </Link>
    );
  }

  // External anchor
  if (externalHref) {
    return (
      <a
        href={externalHref}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        style={{ display: props.fullWidth ? "block" : "inline-block", pointerEvents: "none" }}
      >
        <InnerButton {...props} externalHref={undefined} />
      </a>
    );
  }

  // Plain button
  return <InnerButton {...props} />;
}
