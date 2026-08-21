/**
 * RevealSection — client/src/components/RevealSection.tsx
 *
 * Reusable scroll-triggered reveal wrapper using the KSDL shared motion system.
 * Drop any page section inside this to get a consistent, reduced-motion-aware
 * entrance animation.
 *
 * Usage:
 *   <RevealSection>           — fadeUp (default)
 *   <RevealSection variant={fadeLeft} delay={0.1}>
 *   <RevealSection as="section" className="py-24">
 */

import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import { type ElementType, type ReactNode } from "react";
import { fadeUp, viewport } from "@/lib/motion";

type ValidTags = "div" | "section" | "article" | "header" | "footer" | "aside" | "main";

interface RevealSectionProps {
  children: ReactNode;
  /** Framer Motion Variants with hidden/visible keys. Defaults to fadeUp. */
  variant?: Variants;
  /** Additional delay in seconds before the reveal starts. */
  delay?: number;
  /** HTML element to render. Defaults to "div". */
  as?: ValidTags;
  /** Extra class names on the wrapper element. */
  className?: string;
  /** Override viewport config (e.g. tighter margin for dense layouts). */
  viewportOverride?: typeof viewport;
}

export default function RevealSection({
  children,
  variant = fadeUp,
  delay = 0,
  as = "div",
  className,
  viewportOverride,
}: RevealSectionProps) {
  const Tag = motion[as as keyof typeof motion] as React.ComponentType<HTMLMotionProps<"div">>;

  const resolvedVariant: Variants = delay
    ? {
        hidden: variant.hidden,
        visible: {
          ...(variant.visible as object),
          transition: {
            ...((variant.visible as { transition?: object })?.transition ?? {}),
            delay,
          },
        },
      }
    : variant;

  return (
    <Tag
      variants={resolvedVariant}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOverride ?? viewport}
      className={className}
    >
      {children}
    </Tag>
  );
}
