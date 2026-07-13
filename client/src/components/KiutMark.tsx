/**
 * KiutMark — The official KIUT Music crown monogram.
 *
 * This renders the OFFICIAL uploaded master artwork (client/public/brand/kiut-monogram.png)
 * directly. The monogram is never redrawn, vectorized, or recreated — this component only
 * resizes and (for non-gold variants) recolors the master raster via CSS filters, which does
 * not alter the underlying artwork.
 *
 * `KiutFullLogo` renders the second official master asset (kiut-full-logo.png) — the
 * Monogram + "KIUT" + "MUSIC" lockup — as a single, un-split image, per brand guidelines
 * ("never separate the artwork").
 */
import React from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
export type KiutVariant = "gold" | "white" | "black" | "ivory";

const MONOGRAM_SRC  = "/brand/kiut-monogram.png";
const FULL_LOGO_SRC = "/brand/kiut-full-logo.png";

// Master monogram artwork aspect ratio (trimmed to its true bounding box).
const MONOGRAM_ASPECT = 1604 / 1910; // width / height
const FULL_LOGO_ASPECT = 1435 / 1600;

/**
 * CSS filters approximate alternate finishes from the single official gold master file.
 * These are technical recolors of the same artwork (like print separations), never a redraw.
 */
const VARIANT_FILTER: Record<KiutVariant, string | undefined> = {
  gold:  undefined,
  white: "brightness(0) invert(1)",
  black: "brightness(0)",
  ivory: "brightness(0) invert(1) sepia(25%) saturate(140%) brightness(0.97)",
};

// ── KiutMark ─────────────────────────────────────────────────────────────────
interface KiutMarkProps {
  /** Rendered height in px. Width follows the master artwork's aspect ratio. Default 40. */
  size?: number;
  /** Color variant. "gold" renders the untouched official master. Default "gold". */
  variant?: KiutVariant;
  /** aria-label; omit for decorative use. */
  label?: string;
  className?: string;
  /** @deprecated Legacy compat — no longer supported for the raster mark; use `variant`. */
  color?: string;
}

export function KiutMark({
  size = 40,
  variant = "gold",
  label,
  className,
}: KiutMarkProps) {
  const width = Math.round(size * MONOGRAM_ASPECT);

  return (
    <img
      src={MONOGRAM_SRC}
      alt={label ?? ""}
      aria-hidden={label ? undefined : "true"}
      role={label ? "img" : undefined}
      width={width}
      height={size}
      className={className}
      style={{
        width,
        height: size,
        objectFit: "contain",
        filter: VARIANT_FILTER[variant],
        display: "inline-block",
      }}
      draggable={false}
    />
  );
}

// ── KiutLogo — horizontal lockup: mark + "KIUT." wordmark ────────────────────
interface KiutLogoProps {
  variant?: KiutVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** @deprecated Unused for the raster mark. */
  markColor?: string;
  /** @deprecated Unused — text color follows variant. */
  textColor?: string;
  /** @deprecated Unused — dot color follows variant. */
  dotColor?: string;
}

const LOGO_SIZE = {
  sm: { mark: 30,  text: "text-sm",  tracking: "tracking-[0.28em]" },
  md: { mark: 38,  text: "text-xl",  tracking: "tracking-[0.3em]"  },
  lg: { mark: 55,  text: "text-3xl", tracking: "tracking-[0.32em]" },
} as const;

export function KiutLogo({
  variant = "gold",
  size = "md",
  className,
}: KiutLogoProps) {
  const s = LOGO_SIZE[size];
  const textCol = variant === "black" ? "text-black" : "text-white/90";
  const dotCol  = variant === "black" ? "#0A0A0C"    : "var(--color-gold)";

  return (
    <span className={`flex items-center gap-[14px] ${className ?? ""}`}>
      <KiutMark size={s.mark} variant={variant} />
      <span
        className={`font-display font-light uppercase ${s.text} ${s.tracking} leading-none ${textCol}`}
      >
        KIUT<span style={{ color: dotCol }}>.</span>
      </span>
    </span>
  );
}

// ── KiutFullLogo — official Monogram + "KIUT" + "MUSIC" lockup ───────────────
// Renders the single master lockup file as-is. Never recomposed from separate
// mark + typography — the artwork is never split apart.
interface KiutFullLogoProps {
  variant?: KiutVariant;
  /** Rendered height in px. Width follows the master artwork's aspect ratio. Default 220. */
  markSize?: number;
  className?: string;
}

export function KiutFullLogo({
  variant = "gold",
  markSize = 220,
  className,
}: KiutFullLogoProps) {
  const width = Math.round(markSize * FULL_LOGO_ASPECT);

  return (
    <img
      src={FULL_LOGO_SRC}
      alt="KIUT Music"
      width={width}
      height={markSize}
      className={className}
      style={{
        width,
        height: markSize,
        objectFit: "contain",
        filter: VARIANT_FILTER[variant],
        display: "inline-block",
      }}
      draggable={false}
    />
  );
}
