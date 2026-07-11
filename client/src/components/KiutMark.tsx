/**
 * KiutMark — Official KIUT Music brand mark components.
 *
 * Uses the locked brand asset: /brand/logo/kiut-master-logo.png
 * The PNG is square (black background + crown monogram + KIUT MUSIC wordmark).
 * mix-blend-mode: screen makes the pure-black background transparent on
 * dark surfaces while preserving the gold artwork — display-layer compositing
 * only; the source file is never modified.
 *
 * Do NOT replace, re-draw, trace, or substitute this asset. See brand brief.
 */

import React from "react";

// ── Single source of truth ────────────────────────────────────────────────────
const LOGO_SRC = "/brand/logo/kiut-master-logo.png";

// ── KiutMark — the brand mark at a given square pixel size ───────────────────
export interface KiutMarkProps {
  /** Rendered size in px (square). Default 40. */
  size?: number;
  /** aria-label for accessible contexts; omit for purely decorative use. */
  label?: string;
  className?: string;
  /** @deprecated Legacy prop — ignored; variant is derived from the PNG asset. */
  variant?: string;
  /** @deprecated Legacy prop — ignored. */
  color?: string;
}

export type KiutVariant = "gold" | "white" | "black" | "ivory";

export function KiutMark({
  size = 40,
  label,
  className,
}: KiutMarkProps) {
  return (
    <img
      src={LOGO_SRC}
      width={size}
      height={size}
      alt={label ?? ""}
      aria-hidden={label ? undefined : "true"}
      role={label ? "img" : undefined}
      draggable={false}
      className={["object-contain select-none", className ?? ""].join(" ").trim()}
      style={{ mixBlendMode: "screen", display: "block" }}
    />
  );
}

// ── KiutLogo — horizontal-context logo (same PNG; size controls height) ───────
export interface KiutLogoProps {
  /** Controls rendered height in px; width auto. Default 48. */
  markSize?: number;
  /** Alias for markSize via legacy size-name system. */
  size?: "sm" | "md" | "lg";
  className?: string;
  /** @deprecated */
  variant?: string;
  /** @deprecated */
  markColor?: string;
  /** @deprecated */
  textColor?: string;
  /** @deprecated */
  dotColor?: string;
}

const LOGO_SIZES = { sm: 40, md: 56, lg: 80 } as const;

export function KiutLogo({
  markSize,
  size = "md",
  className,
}: KiutLogoProps) {
  const h = markSize ?? LOGO_SIZES[size];
  return (
    <img
      src={LOGO_SRC}
      height={h}
      width={h}
      alt="KIUT Music"
      draggable={false}
      className={["object-contain select-none", className ?? ""].join(" ").trim()}
      style={{ mixBlendMode: "screen", display: "block" }}
    />
  );
}

// ── KiutFullLogo — full vertical lockup (mark + KIUT + MUSIC in the PNG) ─────
export interface KiutFullLogoProps {
  /**
   * Controls the rendered size of the PNG.
   * The PNG is square, so height == width. Default 160.
   */
  markSize?: number;
  className?: string;
  /** @deprecated */
  variant?: string;
}

export function KiutFullLogo({
  markSize = 160,
  className,
}: KiutFullLogoProps) {
  return (
    <img
      src={LOGO_SRC}
      width={markSize}
      height={markSize}
      alt="KIUT Music"
      draggable={false}
      className={["object-contain select-none", className ?? ""].join(" ").trim()}
      style={{ mixBlendMode: "screen", display: "block" }}
    />
  );
}
