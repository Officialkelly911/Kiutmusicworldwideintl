import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { heroImageMeta } from "@/data/heroImages";

/**
 * HeroSection — Universal Hero Image System
 * ---------------------------------------------------------------------------
 * Single reusable component for every full-bleed photographic hero on the
 * site. Handles the "boring but critical" responsive-image plumbing so page
 * files only need to supply their (already-approved) headline/CTA content as
 * children — no visual/behavioral change to typography, CTAs, or animations.
 *
 * What it centralizes:
 *  - Art-directed <picture> markup: a dedicated, individually-cropped image
 *    variant per breakpoint (mobile portrait / mobile landscape / tablet /
 *    laptop / desktop), each served as AVIF -> WebP -> JPEG.
 *  - Blur-up placeholder (LQIP) sourced from the generation pipeline's
 *    metadata, so the hero never pops in on a blank background.
 *  - Subtle scroll parallax (same easing/range as the previous per-page
 *    hand-rolled implementation) with a per-hero opt-out.
 *  - Priority loading controls (eager + fetchPriority for the current page's
 *    hero; lazy + async decode otherwise).
 *
 * What it deliberately does NOT centralize: overlay treatment. Every existing
 * hero has a slightly different gradient/glow recipe tuned to its own photo.
 * Forcing one shared overlay would change pixels on pages that already
 * shipped. Pass `overlay` with the page's existing gradient markup verbatim;
 * omit it to get a sensible default (dark-left / minimal-right + bottom
 * fade — the same treatment used on Tour).
 *
 * To add a new hero image elsewhere on the site:
 *   1. node scripts/generate-hero-images.mjs --src <photo> --slug <name>
 *   2. Add the returned blurDataURL to client/src/data/heroImages.ts
 *   3. <HeroSection slug="name" alt="..."> ...page content... </HeroSection>
 */

export interface HeroSectionProps {
  /** Resolves image variants at /images/hero/<slug>/<slug>-<variant>.<ext> */
  slug: string;
  /** Optional exact source asset when a supplied hero has no generated variants yet. */
  imageSrc?: string;
  /** Optional responsive alternatives for an exact source asset, in picture-source order. */
  imageSources?: Array<{ srcSet: string; type: string; media?: string }>;
  alt: string;
  /** Merged onto the <section> — controls height/layout, e.g. "min-h-[80vh] flex items-end pb-24" */
  className?: string;
  /** Extra classes appended to the <img> (default: "w-full h-full object-cover object-center") */
  imageClassName?: string;
  /** Optional muted background video layered above the responsive image fallback. */
  videoSrc?: string;
  /** Poster used by the optional background video while it is loading. */
  videoPoster?: string;
  /** Extra classes appended to the optional <video>. */
  videoClassName?: string;
  /** Full custom overlay markup (gradients, glow blobs). Omit for the default cinematic treatment. */
  overlay?: React.ReactNode;
  /** Rendered inside the z-10 content wrapper — the page's existing headline/subtitle/CTA JSX. */
  children?: React.ReactNode;
  /** Classes for the content wrapper (default: "relative z-10 max-w-7xl mx-auto px-6 w-full") */
  contentClassName?: string;
  /**
   * Elements positioned relative to the full <section> rather than the
   * (width-constrained) content wrapper — e.g. an absolutely-positioned
   * scroll indicator pinned to the section's own corner.
   */
  sectionChildren?: React.ReactNode;
  /** True for the current page's own hero — eager decode + high fetch priority. Default false (lazy). */
  priority?: boolean;
  /** Subtle scroll parallax on the image layer. Default true. */
  parallax?: boolean;
  /** [start, end] translateY for the parallax layer across the hero's scroll range. Default ["0%","30%"]. */
  parallaxRange?: [string, string];
  id?: string;
}

const DEFAULT_OVERLAY = (
  <>
    <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-midnight" aria-hidden="true" />
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/25" aria-hidden="true" />
  </>
);

export const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(function HeroSection(
  {
    slug,
    imageSrc,
    imageSources,
    alt,
    className = "",
    imageClassName = "",
    videoSrc,
    videoPoster,
    videoClassName = "",
    overlay,
    children,
    contentClassName = "relative z-10 max-w-7xl mx-auto px-6 w-full",
    sectionChildren,
    priority = false,
    parallax = true,
    parallaxRange = ["0%", "30%"],
    id,
  }: HeroSectionProps,
  forwardedRef
) {
  const internalRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const { scrollYProgress } = useScroll({
    target: internalRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], parallaxRange);

  React.useEffect(() => {
    if (!videoSrc || !videoRef.current) return;

    const video = videoRef.current;
    setVideoPlaying(false);
    setVideoError(false);
    // Set both properties before loading. Some mobile browsers inspect the
    // property (not just the React attribute) when deciding whether autoplay
    // is allowed.
    video.defaultMuted = true;
    video.muted = true;
    const attemptAutoplay = () => {
      void video.play().catch(() => {
        // The muted autoplay attributes remain the primary path; some
        // browsers still require a later user gesture before playback begins.
      });
    };
    // Keep the browser's native autoplay lifecycle intact. Calling load()
    // here can reset an already-started autoplay on Safari/WebKit, so only
    // request playback once the source is ready.
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      attemptAutoplay();
    }
    video.addEventListener("canplay", attemptAutoplay);
    return () => video.removeEventListener("canplay", attemptAutoplay);
  }, [videoSrc]);

  React.useEffect(() => {
    if (!priority) return;
    // A stalled hero must not keep its loading treatment forever. This only
    // releases the visual fallback; it never blocks the page content.
    const timeout = window.setTimeout(() => setImageError(true), 8000);
    return () => window.clearTimeout(timeout);
  }, [priority]);

  const base = `/images/hero/${slug}/${slug}`;
  const blurDataURL = heroImageMeta[slug]?.blurDataURL;

  return (
    <section
      ref={(node: HTMLElement | null) => {
        (internalRef as React.MutableRefObject<HTMLElement | null>).current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      id={id}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        style={parallax ? { y: parallaxY } : undefined}
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={parallax ? "absolute inset-0 w-full h-[120%] -top-[10%]" : "absolute inset-0 w-full h-full"}
      >
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-slow"
          style={{
            backgroundImage: imageError
              ? "radial-gradient(circle at 28% 45%, rgba(var(--gold-primary-rgb),0.16), transparent 42%), linear-gradient(135deg, var(--midnight-black), var(--color-charcoal))"
              : blurDataURL ? `url(${blurDataURL})` : undefined,
            backgroundColor: "var(--midnight-black)",
            opacity: imageError || !loaded ? 1 : 0,
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 block w-full h-full transition-opacity duration-cinematic"
          style={{ opacity: videoSrc && videoPlaying && !videoError ? 0 : 1 }}
        >
          {imageSrc ? (
            <picture>
              {imageSources?.map((source) => (
                <source
                  key={`${source.media ?? "default"}-${source.type}`}
                  media={source.media}
                  srcSet={source.srcSet}
                  type={source.type}
                />
              ))}
              <img
                src={imageSrc}
                alt={alt}
                className={imageClassName || "w-full h-full object-cover object-center"}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={priority ? "high" : "auto"}
                onLoad={() => {
                  setImageError(false);
                  setLoaded(true);
                }}
                onError={() => {
                  setImageError(true);
                  setLoaded(true);
                }}
              />
            </picture>
          ) : (
            <picture>
              <source media="(max-width: 767px) and (orientation: portrait)" srcSet={`${base}-mobile-portrait.avif`} type="image/avif" />
              <source media="(max-width: 767px) and (orientation: portrait)" srcSet={`${base}-mobile-portrait.webp`} type="image/webp" />
              <source media="(max-width: 767px) and (orientation: portrait)" srcSet={`${base}-mobile-portrait.jpg`} type="image/jpeg" />

              <source media="(max-width: 767px)" srcSet={`${base}-mobile-landscape.avif`} type="image/avif" />
              <source media="(max-width: 767px)" srcSet={`${base}-mobile-landscape.webp`} type="image/webp" />
              <source media="(max-width: 767px)" srcSet={`${base}-mobile-landscape.jpg`} type="image/jpeg" />

              <source media="(max-width: 1279px)" srcSet={`${base}-tablet.avif`} type="image/avif" />
              <source media="(max-width: 1279px)" srcSet={`${base}-tablet.webp`} type="image/webp" />
              <source media="(max-width: 1279px)" srcSet={`${base}-tablet.jpg`} type="image/jpeg" />

              <source media="(max-width: 1919px)" srcSet={`${base}-laptop.avif`} type="image/avif" />
              <source media="(max-width: 1919px)" srcSet={`${base}-laptop.webp`} type="image/webp" />
              <source media="(max-width: 1919px)" srcSet={`${base}-laptop.jpg`} type="image/jpeg" />

              <source srcSet={`${base}-desktop.avif`} type="image/avif" />
              <source srcSet={`${base}-desktop.webp`} type="image/webp" />
              <img
                src={`${base}-desktop.jpg`}
                alt={alt}
                className={imageClassName || "w-full h-full object-cover object-center"}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={priority ? "high" : "auto"}
                onLoad={() => {
                  setImageError(false);
                  setLoaded(true);
                }}
                onError={() => {
                  setImageError(true);
                  setLoaded(true);
                }}
              />
            </picture>
          )}
        </div>
        {videoSrc && !videoError && (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={videoPoster}
            autoPlay
            muted
            loop
            playsInline
            preload={priority ? "auto" : "metadata"}
            aria-hidden="true"
            tabIndex={-1}
            onLoadedData={() => {
              const video = videoRef.current;
              if (video && video.paused) {
                void video.play().catch(() => {});
              }
            }}
            onPlaying={() => setVideoPlaying(true)}
            onError={() => {
              setVideoError(true);
              setVideoPlaying(false);
            }}
            className={`absolute inset-0 w-full h-full transition-opacity duration-cinematic ${
              videoClassName || "object-cover object-center"
            }`}
            style={{ opacity: videoPlaying ? 1 : 0 }}
          />
        )}
      </motion.div>

      {overlay ?? DEFAULT_OVERLAY}

      {children && <div className={contentClassName}>{children}</div>}
      {sectionChildren}
    </section>
  );
});

export default HeroSection;
