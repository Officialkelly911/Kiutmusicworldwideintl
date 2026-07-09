/**
 * KiutMark — the geometric K brand mark.
 *
 * The mark is formed from three flat-vector parallelogram shapes:
 *   1. A vertical stem (left bar)
 *   2. Upper arm — wing angled upper-right (movement / stage light)
 *   3. Lower arm — wing angled lower-right (mirror symmetry)
 *
 * Pass `color` to switch between gold, white, ivory, or black.
 * All shapes share the same fill so single-color rendering is always correct.
 */

interface KiutMarkProps {
  /** Fill color for all three shapes. Defaults to matte gold #D4AF37. */
  color?: string;
  /** Rendered size in px (square). Defaults to 40. */
  size?: number;
  /** Optional className for the <svg> element. */
  className?: string;
  /** aria-label override. Hidden by default (decorative). */
  label?: string;
}

export function KiutMark({
  color = "#D4AF37",
  size = 40,
  className,
  label,
}: KiutMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={label ? undefined : "true"}
      aria-label={label}
      role={label ? "img" : undefined}
    >
      {/* Stem — vertical left bar */}
      <rect x="10" y="8" width="14" height="84" rx="1" />
      {/* Upper arm — parallelogram angled upper-right */}
      <polygon points="24,47 24,30 84,8 84,25" />
      {/* Lower arm — parallelogram angled lower-right */}
      <polygon points="24,53 24,70 84,75 84,92" />
    </svg>
  );
}

/** Horizontal lockup: mark + "KIUT." wordmark side-by-side. */
interface KiutLogoProps {
  markColor?: string;
  textColor?: string;
  dotColor?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { mark: 28, text: "text-sm",  tracking: "tracking-[0.28em]" },
  md: { mark: 36, text: "text-xl",  tracking: "tracking-[0.3em]"  },
  lg: { mark: 52, text: "text-3xl", tracking: "tracking-[0.32em]" },
};

export function KiutLogo({
  markColor = "#D4AF37",
  textColor = "#FFFFFF",
  dotColor = "#D4AF37",
  size = "md",
  className,
}: KiutLogoProps) {
  const s = sizeMap[size];
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <KiutMark size={s.mark} color={markColor} />
      <span
        className={`font-display font-light uppercase ${s.text} ${s.tracking} leading-none`}
        style={{ color: textColor }}
      >
        KIUT<span style={{ color: dotColor }}>.</span>
      </span>
    </span>
  );
}
