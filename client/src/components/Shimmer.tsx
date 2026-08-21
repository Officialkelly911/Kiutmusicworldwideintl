/**
 * Shimmer — client/src/components/Shimmer.tsx
 *
 * Loading skeleton atoms for the Kiut Music website.
 * Uses the CSS shimmer keyframe defined in index.css.
 *
 * Exports:
 *   ShimmerBlock  — generic shimmer rectangle (image/box placeholder)
 *   ShimmerText   — inline text-line shimmer
 *   ShimmerCard   — full card skeleton (image + title + subtitle)
 *   ShimmerGrid   — NxM grid of ShimmerCards
 *
 * Usage:
 *   <ShimmerCard />
 *   <ShimmerGrid cols={3} rows={2} />
 *   <ShimmerBlock className="w-full h-48 rounded-2xl" />
 */

import { cn } from "@/lib/utils";

// ── Base shimmer element ──────────────────────────────────────────────────────
interface ShimmerBlockProps {
  className?: string;
}

export function ShimmerBlock({ className }: ShimmerBlockProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("ksdl-shimmer rounded-xl", className)}
    />
  );
}

// ── Text-line shimmer ─────────────────────────────────────────────────────────
interface ShimmerTextProps {
  /** Width as a Tailwind class, e.g. "w-3/4", "w-full". Defaults to "w-full". */
  width?: string;
  className?: string;
}

export function ShimmerText({ width = "w-full", className }: ShimmerTextProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("ksdl-shimmer h-4 rounded-md", width, className)}
    />
  );
}

// ── Full card skeleton ────────────────────────────────────────────────────────
interface ShimmerCardProps {
  /** Aspect ratio class for the image placeholder. Defaults to "aspect-video". */
  aspect?: string;
  className?: string;
}

export function ShimmerCard({ aspect = "aspect-video", className }: ShimmerCardProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-2xl overflow-hidden border border-white/[0.05]",
        "bg-white/[0.02] p-0",
        className,
      )}
    >
      {/* Image area */}
      <div className={cn("ksdl-shimmer w-full", aspect)} />

      {/* Text lines */}
      <div className="p-4 space-y-3">
        <ShimmerText width="w-4/5" />
        <ShimmerText width="w-2/3" className="h-3 opacity-60" />
      </div>
    </div>
  );
}

// ── Grid of cards ─────────────────────────────────────────────────────────────
interface ShimmerGridProps {
  /** Number of columns (maps to a CSS grid class). Defaults to 3. */
  cols?: 1 | 2 | 3 | 4;
  /** Number of skeleton cards to render. Defaults to 6. */
  count?: number;
  aspect?: string;
  className?: string;
}

const colsMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function ShimmerGrid({ cols = 3, count = 6, aspect, className }: ShimmerGridProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading content"
      className={cn("grid gap-5", colsMap[cols], className)}
    >
      {Array.from({ length: count }).map((_, i) => (
        <ShimmerCard key={i} aspect={aspect} />
      ))}
    </div>
  );
}

// ── Hero shimmer (full-width) ─────────────────────────────────────────────────
export function ShimmerHero({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative w-full min-h-[60vh] flex flex-col justify-end p-12", className)}
    >
      <div className="ksdl-shimmer absolute inset-0" />
      <div className="relative z-10 space-y-4 max-w-lg">
        <ShimmerText width="w-20" className="h-3 opacity-40" />
        <ShimmerText width="w-3/4" className="h-10 rounded-lg" />
        <ShimmerText width="w-1/2" className="h-10 rounded-lg opacity-70" />
        <ShimmerText width="w-full" className="h-4 opacity-50" />
        <div className="flex gap-3 pt-2">
          <ShimmerBlock className="w-32 h-12" />
          <ShimmerBlock className="w-32 h-12" />
        </div>
      </div>
    </div>
  );
}
