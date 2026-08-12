import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Disc3, Pause, Play } from "lucide-react";
import { ALL_TRACKS } from "@/data/tracks";

interface CarouselSlide {
  id: number;
  title: string;
  artist: string;
  album: string;
  released: string;
  albumArt: string;
}

const AUTOPLAY_MS = 5000;
const RESUME_AFTER_INTERACTION_MS = 8000;

/**
 * ReleasedMusicCarousel
 *
 * The carousel deliberately consumes ALL_TRACKS rather than maintaining a
 * second list of releases. That keeps new released songs visible here as soon
 * as they are added to the catalogue.
 */
interface ReleasedMusicCarouselProps {
  slides?: CarouselSlide[];
}

export function ReleasedMusicCarousel({ slides: customSlides }: ReleasedMusicCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(Boolean(prefersReducedMotion));
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerStartX = useRef<number | null>(null);

  const slides = customSlides ?? ALL_TRACKS;
  const activeTrack = slides[activeIndex] ?? slides[0];
  const slideCount = slides.length;
  const transitionDuration = prefersReducedMotion ? 0 : 0.55;

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + slideCount) % slideCount);
  }, [slideCount]);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const previous = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  const pauseForInteraction = useCallback(() => {
    setAutoplayPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      if (!prefersReducedMotion) setAutoplayPaused(false);
    }, RESUME_AFTER_INTERACTION_MS);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || autoplayPaused || slideCount < 2) return;
    const timer = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, autoplayPaused, next, prefersReducedMotion, slideCount]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  useEffect(() => {
    setAutoplayPaused(Boolean(prefersReducedMotion));
  }, [prefersReducedMotion]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      pauseForInteraction();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      pauseForInteraction();
      previous();
    } else if (event.key === " ") {
      event.preventDefault();
      setAutoplayPaused((paused) => !paused);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pauseForInteraction();
    pointerStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const distance = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(distance) < 48) return;
    if (distance < 0) next();
    else previous();
  };

  if (!activeTrack) return null;

  return (
    <div
      className="relative mx-auto max-w-5xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="Released Kiut music"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onMouseEnter={() => setAutoplayPaused(true)}
      onMouseLeave={() => {
        if (!prefersReducedMotion) setAutoplayPaused(false);
      }}
    >
      <div className="relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-2xl border border-white/[0.08] bg-black shadow-2xl shadow-black/40">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTrack.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.985 }}
            transition={{ duration: transitionDuration, ease: [0.22, 1, 0.36, 1] }}
            aria-live="polite"
          >
            <img
              src={activeTrack.albumArt}
              alt={`${activeTrack.album} cover artwork — ${activeTrack.title}`}
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" aria-hidden="true" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-left sm:p-8">
              <div className="min-w-0">
                <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.32em] text-gold">
                  <Disc3 size={12} aria-hidden="true" />
                  Released Music
                </p>
                <h3 className="truncate font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-4xl">
                  {activeTrack.title}
                </h3>
                <p className="mt-1 text-xs text-white/55 sm:text-sm">
                  {activeTrack.artist} · {activeTrack.album} · {activeTrack.released}
                </p>
              </div>
              <span className="hidden shrink-0 text-[10px] font-bold uppercase tracking-[0.25em] text-white/45 sm:block">
                {String(activeIndex + 1).padStart(2, "0")} / {String(slideCount).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          aria-label={`Previous song, currently ${activeTrack.title}`}
          onClick={() => { pauseForInteraction(); previous(); }}
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-colors hover:border-gold/60 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold sm:left-5"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={`Next song, currently ${activeTrack.title}`}
          onClick={() => { pauseForInteraction(); next(); }}
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-colors hover:border-gold/60 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold sm:right-5"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label={autoplayPaused ? "Resume slideshow" : "Pause slideshow"}
          onClick={() => setAutoplayPaused((paused) => !paused)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold/50 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
        >
          {autoplayPaused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
        </button>
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose released song">
          {slides.map((track, index) => (
            <button
              key={track.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Show ${track.title}`}
              onClick={() => { pauseForInteraction(); goTo(index); }}
              className={`h-1.5 rounded-full transition-all duration-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                index === activeIndex ? "w-8 bg-gold" : "w-1.5 bg-white/25 hover:bg-white/55"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReleasedMusicCarousel;