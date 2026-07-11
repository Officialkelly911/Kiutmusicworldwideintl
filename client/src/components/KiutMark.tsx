/**
 * KiutMark — The official KIUT Music crown monogram.
 *
 * Crown geometry: five upward spires (outer-left, inner-left, center-diamond,
 * inner-right, outer-right) formed by two outer wing strokes + two crossing
 * diagonal arms (X pattern through the body) + an explicit center body
 * diamond at the crossing point + a center top diamond jewel.
 *
 * Use `variant` to switch between gold gradient, white, black, and ivory.
 * All brand assets in client/public/brand/ are derived from this master shape.
 *
 * Phase 8 refinements applied:
 *   • True vector gold gradient (4-stop linear, light→deep)
 *   • Monogram is ~6% larger relative to its frame vs. the old geometric K
 *   • KiutLogo gap increased from gap-3 → gap-[14px] (~17%)
 *   • "MUSIC" secondary text uses tracking-[0.42em] (+5% vs. prior 0.40em)
 */
import React from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
export type KiutVariant = "gold" | "white" | "black" | "ivory";

const FLAT_FILL: Record<KiutVariant, string> = {
  gold:  "#D4AF37",
  white: "#FFFFFF",
  black: "#0A0A0C",
  ivory: "#F5F0DC",
};

// ── KiutMark ─────────────────────────────────────────────────────────────────
interface KiutMarkProps {
  /** Rendered size in px (square). Default 40. */
  size?: number;
  /** Color variant. "gold" renders the vector gold gradient. Default "gold". */
  variant?: KiutVariant;
  /** aria-label; omit for decorative use. */
  label?: string;
  className?: string;
  /**
   * @deprecated Legacy compat — pass `variant` instead.
   * If provided, overrides `variant` with a flat CSS color.
   */
  color?: string;
}

export function KiutMark({
  size = 40,
  variant = "gold",
  label,
  className,
  color,
}: KiutMarkProps) {
  const useGradient = !color && variant === "gold";
  const flatFill    = color ?? FLAT_FILL[variant];

  // Stable gradient ID — same for all instances; gradients are identical.
  const gradId = "kiutCrownGold";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 215"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={label ? undefined : "true"}
      aria-label={label}
      role={label ? "img" : undefined}
    >
      {useGradient && (
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#F7E070" />
            <stop offset="30%"  stopColor="#D4AF37" />
            <stop offset="65%"  stopColor="#C49A26" />
            <stop offset="100%" stopColor="#8A6B10" />
          </linearGradient>
        </defs>
      )}

      {/* Left outer wing — left spike to bottom-left foot */}
      <polygon
        points="54,4  64,22  32,210  14,210  44,22"
        fill={useGradient ? `url(#${gradId})` : flatFill}
      />
      {/* Right outer wing — right spike to bottom-right foot (mirror) */}
      <polygon
        points="146,4  136,22  168,210  186,210  156,22"
        fill={useGradient ? `url(#${gradId})` : flatFill}
      />
      {/* "\" crossing arm — inner-left tip, diagonally to bottom-right */}
      <polygon
        points="78,6  85,19  159,208  147,208  70,19"
        fill={useGradient ? `url(#${gradId})` : flatFill}
      />
      {/* "/" crossing arm — inner-right tip, diagonally to bottom-left (mirror) */}
      <polygon
        points="122,6  130,19  53,208  41,208  115,19"
        fill={useGradient ? `url(#${gradId})` : flatFill}
      />
      {/* Center top diamond — crown jewel at the apex */}
      <polygon
        points="100,0  111,28  100,40  89,28"
        fill={useGradient ? `url(#${gradId})` : flatFill}
      />
      {/* Center body diamond — fills the X-crossing intersection point */}
      <polygon
        points="100,78  116,106  100,132  84,106"
        fill={useGradient ? `url(#${gradId})` : flatFill}
      />
    </svg>
  );
}

// ── KiutLogo — horizontal lockup: mark + "KIUT." wordmark ────────────────────
interface KiutLogoProps {
  variant?: KiutVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** @deprecated Use variant instead. */
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
  markColor,
}: KiutLogoProps) {
  const s = LOGO_SIZE[size];
  const textCol = variant === "black" ? "text-black" : "text-white/90";
  const dotCol  = variant === "black" ? "#0A0A0C"    : "var(--color-gold)";

  return (
    <span className={`flex items-center gap-[14px] ${className ?? ""}`}>
      <KiutMark
        size={s.mark}
        variant={markColor ? undefined : variant}
        color={markColor}
      />
      <span
        className={`font-display font-light uppercase ${s.text} ${s.tracking} leading-none ${textCol}`}
      >
        KIUT<span style={{ color: dotCol }}>.</span>
      </span>
    </span>
  );
}

// ── KiutFullLogo — vertical lockup: mark + "KIUT" + "MUSIC" ──────────────────
interface KiutFullLogoProps {
  variant?: KiutVariant;
  markSize?: number;
  className?: string;
}

export function KiutFullLogo({
  variant = "gold",
  markSize = 80,
  className,
}: KiutFullLogoProps) {
  const isGold  = variant === "gold";
  const isDark  = variant === "black";
  const fill    = isGold ? "var(--color-gold)" : isDark ? "#0A0A0C" : "#FFFFFF";

  return (
    <div className={`flex flex-col items-center gap-4 ${className ?? ""}`}>
      <KiutMark size={markSize} variant={variant} />

      {/* Divider */}
      <div
        className="w-12 h-px opacity-50"
        style={{ background: fill }}
        aria-hidden="true"
      />

      {/* Wordmark */}
      <div className="flex flex-col items-center gap-0.5">
        <span
          className="font-display font-light uppercase tracking-[0.32em] leading-none"
          style={{ color: fill, fontSize: `${Math.round(markSize * 0.36)}px` }}
        >
          KIUT
        </span>
        {/* Phase 8 refinement: MUSIC tracking +5% (0.40em → 0.42em) */}
        <span
          className="font-display font-light uppercase leading-none"
          style={{
            color: fill,
            fontSize:       `${Math.round(markSize * 0.165)}px`,
            letterSpacing:  "0.42em",
            opacity:        0.8,
          }}
        >
          MUSIC
        </span>
      </div>
    </div>
  );
}
