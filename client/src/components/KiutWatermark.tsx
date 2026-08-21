import { KiutMark } from "./KiutMark";

/**
 * Decorative background watermark — an oversized, low-opacity, blurred
 * monogram used as a subtle luxury motif behind page content. Never
 * competes with foreground copy; purely decorative (aria-hidden).
 */
export default function KiutWatermark({
  size = 900,
  className = "",
  opacity = 0.05,
}: {
  size?: number;
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none ${className}`}
      style={{ opacity }}
    >
      <KiutMark size={size} variant="gold" className="blur-[2px]" />
    </div>
  );
}
