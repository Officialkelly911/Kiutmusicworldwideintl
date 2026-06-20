import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Music, Globe, Heart, Zap, ArrowRight, ExternalLink, Film, Headphones, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "wouter";
import SiteFooter from "../components/SiteFooter";
import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "../lib/utils";

const artistPhoto    = "/assets/images/IMG_2452_1772753968062.jpg";
const aboutHeroVideo = "/assets/videos/about-hero.mp4";
const aboutHeroPoster = "/assets/images/about-hero-poster.jpg";
const img_editorial1  = "/assets/images/IMG_4994_1774430840570.jpeg";
const img_editorial2  = "/assets/images/IMG_0682_1774430840570.jpeg";
const img_editorial3  = "/assets/images/IMG_0850_1774430840570.jpeg";
const img_studio1     = "/assets/images/anonyig.io_Instagram_kiut_rababag_3639024701227223296_1095425_1774430915892.jpeg";
const img_studio2     = "/assets/images/anonyig.io_Instagram_kiut_rababag_3709344985993282385_1095425_1774430915892.jpeg";
const img_studio3     = "/assets/images/anonyig.io_Instagram_kiut_rababag_3709344985976478358_1095425_1774430915892.jpeg";
const img_milestoneLA = "/assets/images/anonyig.io_Instagram_kiut_rababag_3786107874124605259_1095425_1774430915892.jpeg";
const img_nigeria1    = "/assets/images/anonyig.io_Instagram_kiut_rababag_2991399092237138795_1095425_1774431303109.jpeg";
const img_nigeria2    = "/assets/images/anonyig.io_Instagram_kiut_rababag_2991399093235490892_1095425_1774431303109.jpeg";
const img_tunnel      = "/assets/images/IMG_0146_1774430840570.jpeg";
const img_palms       = "/assets/images/IMG_2027_1774430840570.jpeg";
const img_desert      = "/assets/images/IMG_0161_1774430840570.jpeg";
const img_gallery     = "/assets/images/IMG_0162_1774430840570.jpeg";
const img_museum      = "/assets/images/IMG_2003_1774430840570.jpeg";
const img_courtyard   = "/assets/images/IMG_0156_1774430840570.jpeg";
const img_sneakers    = "/assets/images/IMG_0144_1774430840570.jpeg";
const img_mixing      = "/assets/images/anonyig.io_Instagram_kiut_rababag_3709344986471452864_1095425_1774434961599.jpeg";
const img_synth       = "/assets/images/anonyig.io_Instagram_kiut_rababag_3709344988233024643_1095425_1774434961599.jpeg";
const img_icon        = "/assets/images/about-icon-statement.png";
const img_momentLawnWide = "/assets/images/about-moments-lawn-wide.jpg";
const img_momentGardenSeat = "/assets/images/about-moments-garden-seat.jpg";
const img_momentLounge = "/assets/images/about-moments-lounge.jpg";
const img_momentCoast = "/assets/images/about-moments-coast.jpg";
const img_momentLeather = "/assets/images/about-moments-leather-pose.jpg";
const img_momentStoneSeat = "/assets/images/about-moments-stone-seat.jpg";

const milestones = [
  {
    year: "2019",
    title: "The Beginning",
    description: "First music release and local performances, establishing a unique voice in the Lagos music scene.",
  },
  {
    year: "2021",
    title: "Rising Global",
    description: "International collaborations in Afrobeat, blending sounds from Nigeria, the Caribbean, and beyond.",
  },
  {
    year: "2023",
    title: "Recognition",
    description: "Global streaming recognition and chart success — Kiut's sound reaches listeners across six continents.",
  },
  {
    year: "2025",
    title: "New Era",
    description: "GOOD LIFE EP drops worldwide with a global tour announcement and major platform partnerships.",
  },
];

const sounds = [
  {
    icon: Heart,
    title: "Authentic Roots",
    description:
      "Grounded in Nigerian tradition, every track carries the soul of Kiut's heritage — unfiltered, honest, and deeply human.",
  },
  {
    icon: Globe,
    title: "Global Fusion",
    description:
      "Connecting cultures through Afro-Caribbean rhythms that transcend borders and unite listeners worldwide.",
  },
  {
    icon: Film,
    title: "Cultural Storytelling",
    description:
      "Music as narrative — Kiut uses sound to tell stories of identity, migration, love, and triumph that resonate universally.",
  },
  {
    icon: Zap,
    title: "Afrobeat Evolution",
    description:
      "Pioneering a new frontier in Afrobeat — infused with Caribbean energy, cinematic production, and a global vision.",
  },
];

type CollageItem = {
  src: string; alt: string; label: string;
  col: string; row: string;
  mobileOrder?: number; mobileSpan?: string;
  objectPos?: string;
};

const collageImages: CollageItem[] = [
  { src: img_editorial1,  alt: "Kiut — editorial shoot", label: "The Vision",      col: "md:col-span-2", row: "md:row-span-2", mobileOrder: 1, mobileSpan: "col-span-2", objectPos: "object-top" },
  { src: img_editorial2,  alt: "Kiut — white suit",      label: "The Artist",      col: "md:col-span-1", row: "md:row-span-2", mobileOrder: 2, objectPos: "object-center" },
  { src: img_studio1,     alt: "Studio session",          label: "Studio",          col: "md:col-span-1", row: "md:row-span-1", mobileOrder: 5, objectPos: "object-center" },
  { src: img_milestoneLA, alt: "LA milestone",            label: "Milestone",       col: "md:col-span-1", row: "md:row-span-1", mobileOrder: 6, objectPos: "object-top" },
  { src: img_tunnel,      alt: "Tunnel shot",             label: "Cinematic",       col: "md:col-span-1", row: "md:row-span-1", mobileOrder: 3, objectPos: "object-center" },
  { src: img_nigeria2,    alt: "Nigeria celebration",     label: "Celebration",     col: "md:col-span-2", row: "md:row-span-1", mobileOrder: 9, mobileSpan: "col-span-2", objectPos: "object-top" },
  { src: img_palms,       alt: "California palms",        label: "West Coast",      col: "md:col-span-1", row: "md:row-span-1", mobileOrder: 4, objectPos: "object-top" },
  { src: img_editorial3,  alt: "Kiut close up",           label: "Behind the Lens", col: "md:col-span-1", row: "md:row-span-2", mobileOrder: 7, objectPos: "object-top" },
  { src: img_studio2,     alt: "Studio standing red",     label: "In the Studio",   col: "md:col-span-1", row: "md:row-span-1", mobileOrder: 10, objectPos: "object-top" },
  { src: img_nigeria1,    alt: "Nigeria — back to roots", label: "Back to Roots",   col: "md:col-span-1", row: "md:row-span-1", mobileOrder: 11, objectPos: "object-center" },
  { src: img_desert,      alt: "Desert rocks",            label: "Desert Days",     col: "md:col-span-1", row: "md:row-span-1", mobileOrder: 8, objectPos: "object-center" },
  { src: img_sneakers,    alt: "Sneaker gallery",         label: "Style Session",   col: "md:col-span-1", row: "md:row-span-1", mobileOrder: 12, objectPos: "object-top" },
  { src: img_mixing,      alt: "Mixing session",          label: "In the Mix",      col: "md:col-span-2", row: "md:row-span-1", mobileOrder: 13, mobileSpan: "col-span-2", objectPos: "object-top" },
  { src: img_synth,       alt: "Studio synthesizers",     label: "The Gear",        col: "md:col-span-1", row: "md:row-span-1", mobileOrder: 14, objectPos: "object-center" },
  { src: img_momentLawnWide,   alt: "Kiut relaxing on a sunlit lawn",      label: "Sunlit Escape",  col: "md:col-span-2", row: "md:row-span-1", mobileOrder: 15, mobileSpan: "col-span-2", objectPos: "object-center" },
  { src: img_momentGardenSeat, alt: "Kiut seated in a garden portrait",    label: "Golden Hour",    col: "md:col-span-1", row: "md:row-span-1", mobileOrder: 16, objectPos: "object-center" },
  { src: img_momentLounge,     alt: "Kiut in a lounge editorial portrait", label: "Quiet Luxury",   col: "md:col-span-1", row: "md:row-span-2", mobileOrder: 17, objectPos: "object-center" },
  { src: img_momentCoast,      alt: "Kiut standing by the coast",          label: "Coastal Frame",  col: "md:col-span-1", row: "md:row-span-1", mobileOrder: 18, objectPos: "object-center" },
  { src: img_momentLeather,    alt: "Kiut in a leather jacket portrait",   label: "Street Armor",   col: "md:col-span-1", row: "md:row-span-1", mobileOrder: 19, objectPos: "object-center" },
  { src: img_momentStoneSeat,  alt: "Kiut seated on stone steps",          label: "Still Moment",   col: "md:col-span-1", row: "md:row-span-1", mobileOrder: 20, objectPos: "object-center" },
];

const uploadedJourneyImages = [
  "/assets/about-journey/upload-001.jpg",
  "/assets/about-journey/upload-002.jpg",
  "/assets/about-journey/upload-003.jpg",
  "/assets/about-journey/upload-004.jpg",
  "/assets/about-journey/upload-005.jpg",
  "/assets/about-journey/upload-006.jpg",
  "/assets/about-journey/upload-007.jpg",
  "/assets/about-journey/upload-008.jpg",
  "/assets/about-journey/upload-009.jpg",
  "/assets/about-journey/upload-010.jpg",
  "/assets/about-journey/upload-011.jpg",
  "/assets/about-journey/upload-012.jpg",
  "/assets/about-journey/upload-013.jpg",
  "/assets/about-journey/upload-014.jpg",
  "/assets/about-journey/upload-015.jpg",
  "/assets/about-journey/upload-016.jpg",
  "/assets/about-journey/upload-017.jpg",
  "/assets/about-journey/upload-018.jpg",
  "/assets/about-journey/upload-019.jpg",
  "/assets/about-journey/upload-020.jpg",
  "/assets/about-journey/upload-021.jpg",
  "/assets/about-journey/upload-022.jpg",
  "/assets/about-journey/upload-023.jpg",
  "/assets/about-journey/upload-024.jpg",
  "/assets/about-journey/upload-025.jpg",
  "/assets/about-journey/upload-026.jpg",
  "/assets/about-journey/upload-027.jpg",
  "/assets/about-journey/upload-028.jpg",
  "/assets/about-journey/upload-029.jpg",
  "/assets/about-journey/upload-030.jpg",
  "/assets/about-journey/upload-031.jpg",
  "/assets/about-journey/upload-032.jpg",
  "/assets/about-journey/upload-033.jpg",
  "/assets/about-journey/upload-034.jpg",
  "/assets/about-journey/upload-035.jpg",
  "/assets/about-journey/upload-036.jpg",
  "/assets/about-journey/upload-037.jpg",
  "/assets/about-journey/upload-038.jpg",
  "/assets/about-journey/upload-039.jpg",
  "/assets/about-journey/upload-040.jpg",
  "/assets/about-journey/upload-041.jpg",
  "/assets/about-journey/upload-042.jpg",
  "/assets/about-journey/upload-043.jpg",
  "/assets/about-journey/upload-044.jpg",
  "/assets/about-journey/upload-045.jpg",
  "/assets/about-journey/upload-046.jpg",
  "/assets/about-journey/upload-047.jpg",
  "/assets/about-journey/upload-048.jpg",
  "/assets/about-journey/upload-049.jpg",
  "/assets/about-journey/upload-050.jpg",
  "/assets/about-journey/upload-051.jpg",
  "/assets/about-journey/upload-052.jpg",
  "/assets/about-journey/upload-053.jpg",
  "/assets/about-journey/upload-054.jpg",
  "/assets/about-journey/upload-055.jpg",
  "/assets/about-journey/upload-056.jpg",
  "/assets/about-journey/upload-057.jpg",
  "/assets/about-journey/upload-058.jpeg",
  "/assets/about-journey/upload-059.jpeg",
];

// ─── Journey gallery: editorial layout (3-col desktop grid) ──────────────────
// Index 0 = full-width FEATURED hero. Rest follow an 11-card repeating pattern.
const JOURNEY_LAYOUT: Array<{ col: string; row: string }> = [
  { col: "md:col-span-3", row: "md:row-span-2" }, // 0  HERO — full width, tall
  { col: "md:col-span-1", row: "md:row-span-2" }, // 1  portrait tall
  { col: "md:col-span-2", row: "md:row-span-1" }, // 2  landscape wide
  { col: "md:col-span-1", row: "md:row-span-1" }, // 3  square
  { col: "md:col-span-1", row: "md:row-span-1" }, // 4  square
  { col: "md:col-span-2", row: "md:row-span-1" }, // 5  landscape wide
  { col: "md:col-span-1", row: "md:row-span-2" }, // 6  portrait tall
  { col: "md:col-span-1", row: "md:row-span-1" }, // 7  square
  { col: "md:col-span-1", row: "md:row-span-1" }, // 8  square
  { col: "md:col-span-2", row: "md:row-span-2" }, // 9  feature
  { col: "md:col-span-1", row: "md:row-span-1" }, // 10 square
  { col: "md:col-span-1", row: "md:row-span-1" }, // 11 square
];

function getJourneyLayout(i: number) {
  if (i === 0) return JOURNEY_LAYOUT[0];
  return JOURNEY_LAYOUT[((i - 1) % 11) + 1];
}

// Depth offsets — subtle vertical shift on select cards, desktop only
// Creates the layered "exhibition wall" feel without breaking grid flow
const JOURNEY_DEPTH: Record<number, string> = {
  3:  "md:translate-y-4",
  6:  "md:-translate-y-3",
  10: "md:translate-y-5",
  15: "md:-translate-y-4",
  20: "md:translate-y-3",
  25: "md:-translate-y-5",
  31: "md:translate-y-4",
  37: "md:-translate-y-3",
  43: "md:translate-y-5",
  49: "md:-translate-y-4",
};

// Sparse editorial labels — pill badges on selected images only
const JOURNEY_LABELS: Record<number, string> = {
  0:  "The Journey",
  5:  "Studio Session",
  11: "On Stage",
  17: "Behind The Scenes",
  23: "Release Era",
  29: "Performance Night",
  35: "Family & Roots",
  41: "Journey Moment",
  47: "On Stage",
  53: "The Archive",
};

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function AppleMusicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 0 0-1.877-.726 10.496 10.496 0 0 0-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208A5.494 5.494 0 0 0 .08 4.98C.028 5.244 0 5.51 0 5.78v12.44c.013.344.05.686.105 1.025.24 1.34.97 2.37 2.066 3.107a5.01 5.01 0 0 0 1.904.737 10.508 10.508 0 0 0 1.56.145c.04.003.082.01.124.012h12.024a10.282 10.282 0 0 0 1.55-.14 5.097 5.097 0 0 0 1.917-.738c1.095-.74 1.82-1.766 2.062-3.1.056-.34.092-.683.105-1.027V6.123zm-6.35 3.82v5.592a3.14 3.14 0 0 1-.433 1.616 3.055 3.055 0 0 1-2.636 1.514 3.04 3.04 0 0 1-3.04-3.04 3.04 3.04 0 0 1 3.04-3.04c.42 0 .82.086 1.185.24V6.04l-5.577 1.335v6.532a3.14 3.14 0 0 1-.433 1.616 3.055 3.055 0 0 1-2.636 1.514 3.04 3.04 0 0 1-3.04-3.04 3.04 3.04 0 0 1 3.04-3.04c.42 0 .82.086 1.185.24V7.373l7.345-1.75v4.32z" />
    </svg>
  );
}

function AudiomackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.5a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15zm0-12a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
    </svg>
  );
}

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [selectedJourneyIndex, setSelectedJourneyIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Page-level scroll for the documentary darkness effect:
  // 0 (hero) → barely visible overlay; 1 (footer) → deep cinematic black.
  // Users feel like they are descending into chapters of the story.
  const { scrollYProgress: pageProgress } = useScroll();
  const bgDarkness = useTransform(
    pageProgress,
    [0, 0.07, 0.45, 1],
    [0, 0.62, 0.76, 0.91]
  );
  const selectedJourneyImage =
    selectedJourneyIndex === null ? null : uploadedJourneyImages[selectedJourneyIndex];

  const closeJourneyLightbox = useCallback(() => setSelectedJourneyIndex(null), []);
  const showPreviousJourneyImage = useCallback(() => {
    setSelectedJourneyIndex((prev) =>
      prev === null ? null : (prev - 1 + uploadedJourneyImages.length) % uploadedJourneyImages.length
    );
  }, []);
  const showNextJourneyImage = useCallback(() => {
    setSelectedJourneyIndex((prev) =>
      prev === null ? null : (prev + 1) % uploadedJourneyImages.length
    );
  }, []);

  const handleLightboxTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleLightboxTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      delta < 0 ? showNextJourneyImage() : showPreviousJourneyImage();
    }
    touchStartX.current = null;
  }, [showNextJourneyImage, showPreviousJourneyImage]);

  useEffect(() => {
    if (selectedJourneyIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") showNextJourneyImage();
      else if (e.key === "ArrowLeft") showPreviousJourneyImage();
      else if (e.key === "Escape") closeJourneyLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedJourneyIndex, showNextJourneyImage, showPreviousJourneyImage, closeJourneyLightbox]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* ─── FIXED CINEMATIC VIDEO BACKGROUND ──────────────────────────── */}
      {/* Same source as hero — browser caches it, no double download.     */}
      <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={aboutHeroPoster}
          className="w-full h-full object-cover object-center"
        >
          <source src={aboutHeroVideo} type="video/mp4" />
        </video>
      </div>

      {/* ─── SCROLL-DEEPENING DARKNESS OVERLAY ──────────────────────────── */}
      {/*   opacity 0 at hero → 0.91 near footer                           */}
      {/*   Creates the documentary "chapter descent" feeling               */}
      <motion.div
        style={{ opacity: bgDarkness }}
        className="fixed inset-0 -z-[9] pointer-events-none bg-[#0a0a0c]"
        aria-hidden="true"
      />

      {/* ─── 1. CINEMATIC HERO ──────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-end pb-20 overflow-hidden">
        {/* Parallax background video */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={aboutHeroPoster}
            className="w-full h-full object-cover object-center"
          >
            <source src={aboutHeroVideo} type="video/mp4" />
          </video>
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 w-full"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#D4AF37] text-xs font-bold tracking-[0.4em] uppercase mb-6"
          >
            Nigerian-American Artist
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-display text-[clamp(5rem,15vw,14rem)] font-bold leading-none tracking-tight uppercase text-white mb-4"
          >
            Kiut<span className="text-[#D4AF37]">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/70 text-lg md:text-2xl font-light tracking-wide mb-10 max-w-xl"
          >
            Afro-Caribbean Visionary<br />
            <span className="text-white/50 text-base md:text-lg">Bridging Nigeria and the World Through Sound</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/music">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-shadow duration-300"
              >
                Listen Now
              </motion.button>
            </Link>
            <Link href="/videos">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full border border-white/30 text-white font-bold uppercase tracking-widest text-sm hover:border-white/70 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Watch Videos
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom fade — blends hero into the fixed video layer */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/80 to-transparent" />
      </section>

      {/* ─── 2. THE STORY ───────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left: Artist image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.7)]">
                <img
                  src={artistPhoto}
                  alt="Kiut"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              {/* Gold accent bar */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                <Headphones className="w-8 h-8 text-[#D4AF37]" />
              </div>
              {/* Floating label */}
              <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3">
                <p className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Kingsley Moses</p>
                <p className="text-white/60 text-xs tracking-wider">aka Kiut</p>
              </div>
            </motion.div>

            {/* Right: Story text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
            >
              <p className="text-[#D4AF37] text-xs font-bold tracking-[0.35em] uppercase mb-6">The Story</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-tight uppercase">
                Where Nigeria<br />
                <span className="text-[#D4AF37]">Meets the World</span>
              </h2>

              <div className="space-y-6 text-white/70 font-light leading-[1.9] text-lg">
                <p>
                  Kingsley Moses, popularly known as <span className="text-white font-medium">Kiut</span>, brings a dynamic Afro-Caribbean vibe that bridges continents. Drawing from his rich cultural heritage, Kiut seamlessly blends the soulful rhythms of Nigerian music with the vibrant, infectious energy of global sounds.
                </p>
                <p>
                  From pulsating Afrobeat grooves to breezy Caribbean melodies, his artistry invites listeners into a world where cultures intersect and harmonize — a sonic passport to a place where no border exists between genres or peoples.
                </p>
                <p>
                  As a Nigerian-American artist, Kiut occupies a rare space at the intersection of tradition and modernity, using music to tell the story of an entire generation navigating identity, diaspora, and the global stage.
                </p>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <Link href="/music">
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="group flex items-center gap-3 text-white font-semibold tracking-widest uppercase text-sm hover:text-[#D4AF37] transition-colors"
                  >
                    Explore the Music
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2.5 ICON STATEMENT ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden z-10 border-t border-white/[0.04]">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full"
        >
          <img
            src={img_icon}
            alt="Kiut — Icon"
            className="w-full object-cover object-center"
          />

          {/* Left gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent pointer-events-none" />
          {/* Bottom fade into next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

          {/* Text overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-4">
                  Kiut Music Worldwide
                </p>
                <h2 className="font-display text-5xl md:text-7xl font-bold text-white uppercase tracking-tight leading-none mb-5">
                  Born to<br />
                  <span className="text-[#D4AF37]">Stand Out</span>
                </h2>
                <p className="text-white/55 text-sm md:text-base font-light max-w-xs leading-relaxed">
                  A vision, a sound, a presence — unmistakably Kiut.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── 3. CAREER JOURNEY TIMELINE ─────────────────────────────────── */}
      <section className="py-28 md:py-36 relative z-10 border-t border-white/[0.04] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.35em] uppercase mb-4">A Career Built on Sound</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">
              The <span className="text-[#D4AF37]">Journey</span>
            </h2>
          </motion.div>

          {/* Desktop timeline */}
          <div className="hidden md:block relative">
            {/* Connecting line */}
            <div className="absolute top-[26px] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

            <div className="grid grid-cols-4 gap-6 relative z-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center group"
                >
                  {/* Glowing node */}
                  <motion.div
                    whileHover={{ scale: 1.4 }}
                    className="w-[14px] h-[14px] rounded-full bg-[#D4AF37] shadow-[0_0_16px_4px_rgba(212,175,55,0.5)] mb-10 cursor-pointer transition-shadow duration-300 group-hover:shadow-[0_0_28px_8px_rgba(212,175,55,0.7)]"
                  />

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#D4AF37]/40 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.08)] transition-all duration-300"
                  >
                    <span className="text-white font-semibold text-sm uppercase tracking-widest block mb-3">{m.title}</span>
                    <p className="text-white/55 text-sm font-light leading-relaxed">{m.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile timeline */}
          <div className="md:hidden relative pl-8">
            <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative group"
                >
                  {/* Node */}
                  <div className="absolute -left-[29px] top-5 w-[14px] h-[14px] rounded-full bg-[#D4AF37] shadow-[0_0_12px_4px_rgba(212,175,55,0.5)]" />

                  <motion.div
                    whileHover={{ x: 4 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#D4AF37]/40 transition-all duration-300"
                  >
                    <span className="text-white font-semibold text-sm uppercase tracking-widest block mb-3">{m.title}</span>
                    <p className="text-white/55 text-sm font-light leading-relaxed">{m.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. THE KIUT SOUND ──────────────────────────────────────────── */}
      <section className="py-28 md:py-36 relative z-10 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.35em] uppercase mb-4">Defining an Artist</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">
              The Kiut <span className="text-[#D4AF37]">Sound</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {sounds.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/35 hover:bg-white/[0.06] hover:shadow-[0_16px_48px_rgba(212,175,55,0.08)] transition-all duration-400 overflow-hidden"
                >
                  {/* Subtle glow behind icon */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-[#D4AF37]/5 blur-[60px] rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:bg-[#D4AF37]/10 transition-colors duration-500" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-black border border-white/10 group-hover:border-[#D4AF37]/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-[0_0_0_rgba(212,175,55,0)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                      <Icon className="w-7 h-7 text-[#D4AF37]" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-3 uppercase tracking-wide">
                      {s.title}
                    </h3>
                    <p className="text-white/55 font-light leading-relaxed text-[15px]">
                      {s.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. MOMENTS FROM THE JOURNEY — Cinematic Editorial Gallery ──── */}
      <section id="moments" className="relative py-28 md:py-36 z-10 border-t border-white/[0.04] overflow-hidden">
        {/* Ambient glow — subtle, not overpowering */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.07),transparent_65%)]" />

        <div className="max-w-[1400px] mx-auto px-6">

          {/* ── Section Heading ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 md:mb-24 text-center mx-auto max-w-3xl"
          >
            <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-5">Visual Archive</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight leading-none mb-6">
              Moments From{" "}
              <span className="text-[#D4AF37]">the Journey</span>
            </h2>
            <p className="text-white/45 text-[15px] font-light leading-relaxed max-w-xl mx-auto">
              A visual archive of milestones, studio sessions, performances, and memories behind the music.
            </p>
            {/* Decorative centered rule */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-px w-10 bg-white/10" />
              <div className="h-px w-10 bg-[#D4AF37]/60" />
              <div className="h-px w-10 bg-white/10" />
            </div>
          </motion.div>

          {/* ── Cinematic Editorial Grid ─────────────────────────────────── */}
          {/*
            Desktop: 3-col CSS grid with auto-rows at 280px + dense packing.
            Featured hero spans full width (col-span-3). Rest follow an
            editorial pattern of portrait / landscape / square / feature cards.
            Select cards receive a subtle translateY depth offset.
            Mobile: single-column stack, featured image first.
          */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 md:[grid-auto-rows:280px] md:grid-flow-row-dense">
            {uploadedJourneyImages.map((src, i) => {
              const layout = getJourneyLayout(i);
              const label = JOURNEY_LABELS[i];
              const isFeatured = i === 0;
              const depthClass = JOURNEY_DEPTH[i] ?? "";

              const mobileH = isFeatured
                ? "h-[420px] md:h-auto"
                : (i - 1) % 4 === 0
                ? "h-[300px] md:h-auto"
                : "h-[260px] md:h-auto";

              return (
                <motion.figure
                  key={src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.65,
                    delay: (i % 3) * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl bg-[#0a0a0a] cursor-zoom-in",
                    "border border-white/[0.06]",
                    "shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
                    "hover:border-[#D4AF37]/25 hover:shadow-[0_16px_56px_rgba(0,0,0,0.7),0_0_0_1px_rgba(212,175,55,0.08)]",
                    "transition-[border-color,box-shadow,transform] duration-500 ease-out",
                    mobileH,
                    layout.col,
                    layout.row,
                    depthClass,
                  )}
                  onClick={() => setSelectedJourneyIndex(i)}
                >
                  {/* Photography — full-bleed, no tint */}
                  <img
                    src={src}
                    alt={label ? `${label} — Kiut` : `Journey moment ${i + 1}`}
                    loading={i < 9 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-cover [transition:transform_600ms_cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />

                  {/* Bottom gradient — very subtle, readability only */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                  {/* Soft gold edge glow on hover — inset ring technique */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 shadow-[inset_0_0_0_1px_rgba(212,175,55,0.18),inset_0_-60px_40px_-20px_rgba(212,175,55,0.04)] [transition:opacity_450ms_ease] pointer-events-none" />

                  {/* Editorial label pill badge — hover reveal */}
                  {label && (
                    <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 opacity-0 translate-y-[4px] group-hover:opacity-100 group-hover:translate-y-0 [transition:opacity_300ms_ease,transform_350ms_cubic-bezier(0.22,1,0.36,1)]">
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37] bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#D4AF37]/20">
                        <span className="w-1 h-1 rounded-full bg-[#D4AF37]/70 inline-block" />
                        {label}
                      </span>
                    </div>
                  )}

                  {/* Frame counter — film archive feel, top right, hover only */}
                  <div className="absolute top-3 right-3.5 opacity-0 group-hover:opacity-100 [transition:opacity_350ms_ease] pointer-events-none">
                    <span className="text-[8px] font-mono text-white/25 tabular-nums tracking-widest">
                      {String(i + 1).padStart(3, "0")}
                    </span>
                  </div>

                  {/* Featured hero marker */}
                  {isFeatured && (
                    <div className="absolute top-5 left-5 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.35em] text-[#D4AF37]/70 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#D4AF37]/15">
                        <span className="w-1 h-1 rounded-full bg-[#D4AF37]/60 inline-block" />
                        No. 001
                      </span>
                    </div>
                  )}
                </motion.figure>
              );
            })}
          </div>

          {/* ── Gallery CTA ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 md:mt-24 text-center"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />
            <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-4">The Sound Continues</p>
            <h3 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-8">
              Experience the Sound
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/music">
                <motion.button
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-9 py-4 rounded-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-sm shadow-[0_0_24px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.55)] transition-shadow duration-300 w-full sm:w-auto"
                >
                  Listen Now
                </motion.button>
              </Link>
              <Link href="/videos">
                <motion.button
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-9 py-4 rounded-full border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:border-white/45 hover:bg-white/5 transition-all duration-300 w-full sm:w-auto"
                >
                  Watch Videos
                </motion.button>
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── LIGHTBOX / FULLSCREEN VIEWER ───────────────────────────────── */}
      <AnimatePresence>
        {selectedJourneyImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-lg"
            onClick={closeJourneyLightbox}
            onTouchStart={handleLightboxTouchStart}
            onTouchEnd={handleLightboxTouchEnd}
          >
            {/* Cinematic vignette */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />

            {/* Header bar */}
            <div
              className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4">
                <div className="h-5 w-px bg-[#D4AF37]/40" />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.38em] text-[#D4AF37]">
                    Visual Archive
                  </p>
                  {JOURNEY_LABELS[selectedJourneyIndex ?? 0] && (
                    <p className="text-[11px] text-white/50 mt-0.5 font-light tracking-wide">
                      {JOURNEY_LABELS[selectedJourneyIndex ?? 0]}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-white/30 tabular-nums tracking-widest hidden sm:block">
                  {String((selectedJourneyIndex ?? 0) + 1).padStart(3, "0")} / {String(uploadedJourneyImages.length).padStart(3, "0")}
                </span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); closeJourneyLightbox(); }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/60 hover:border-[#D4AF37]/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Main image area */}
            <div
              className="absolute inset-0 flex items-center justify-center px-14 sm:px-20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showPreviousJourneyImage(); }}
                className="absolute left-3 sm:left-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/60 hover:border-[#D4AF37]/40 hover:text-white hover:bg-black/80 transition-all duration-200"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Image */}
              <div className="w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedJourneyImage}
                    initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.97, y: 16 }}
                    animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 1.01, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.8)] max-w-[90vw] max-h-[80vh]"
                  >
                    <img
                      src={selectedJourneyImage}
                      alt={JOURNEY_LABELS[selectedJourneyIndex ?? 0] ?? `Journey moment ${(selectedJourneyIndex ?? 0) + 1}`}
                      className="block max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain"
                      style={{ display: "block" }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showNextJourneyImage(); }}
                className="absolute right-3 sm:right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/60 hover:border-[#D4AF37]/40 hover:text-white hover:bg-black/80 transition-all duration-200"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Footer strip — progress dots */}
            <div
              className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-5 pt-3 z-10 gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              {uploadedJourneyImages.slice(
                Math.max(0, (selectedJourneyIndex ?? 0) - 4),
                Math.min(uploadedJourneyImages.length, (selectedJourneyIndex ?? 0) + 5)
              ).map((_, relIdx) => {
                const absIdx = Math.max(0, (selectedJourneyIndex ?? 0) - 4) + relIdx;
                const isActive = absIdx === selectedJourneyIndex;
                return (
                  <button
                    key={absIdx}
                    type="button"
                    onClick={() => setSelectedJourneyIndex(absIdx)}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      isActive
                        ? "w-5 h-1.5 bg-[#D4AF37]"
                        : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                    )}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 6. STREAMING CTA ───────────────────────────────────────────── */}
      <section className="py-28 md:py-36 relative z-10 border-t border-white/[0.04] overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_65%)]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.35em] uppercase mb-6">Available Everywhere</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-6">
              Experience<br />
              <span className="text-[#D4AF37]">the Sound</span>
            </h2>
            <p className="text-white/50 text-lg font-light mb-10 max-w-md mx-auto leading-relaxed">
              Stream Kiut's music on your favourite platform and join the global community of listeners.
            </p>

            {/* Stats strip */}
            <div className="flex items-center justify-center gap-8 md:gap-14 mb-14 py-6 border-y border-white/8">
              {[
                { value: "4", label: "EP Releases" },
                { value: "50K+", label: "Subscribers" },
                { value: "3+", label: "Platforms" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="font-display text-3xl md:text-4xl font-bold text-[#D4AF37]">{s.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/35 mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Spotify */}
              <motion.a
                href="https://open.spotify.com/artist/7yc6EAIFaY5TO7G1JBWgng"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/15 hover:border-[#1DB954]/50 hover:bg-[#1DB954]/10 hover:shadow-[0_0_30px_rgba(29,185,84,0.2)] transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <span className="text-[#1DB954] group-hover:scale-110 transition-transform duration-300">
                  <SpotifyIcon />
                </span>
                <span className="text-white font-semibold tracking-wide text-sm">Spotify</span>
                <ExternalLink size={12} className="text-white/30 group-hover:text-white/60 transition-colors" />
              </motion.a>

              {/* Apple Music */}
              <motion.a
                href="https://music.apple.com/us/artist/kiut/1484593132"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/15 hover:border-[#fc3c44]/50 hover:bg-[#fc3c44]/10 hover:shadow-[0_0_30px_rgba(252,60,68,0.2)] transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <span className="text-[#fc3c44] group-hover:scale-110 transition-transform duration-300">
                  <AppleMusicIcon />
                </span>
                <span className="text-white font-semibold tracking-wide text-sm">Apple Music</span>
                <ExternalLink size={12} className="text-white/30 group-hover:text-white/60 transition-colors" />
              </motion.a>

              {/* Audiomack */}
              <motion.a
                href="https://audiomack.com/kiutraba"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/15 hover:border-[#ffa200]/50 hover:bg-[#ffa200]/10 hover:shadow-[0_0_30px_rgba(255,162,0,0.2)] transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <span className="text-[#ffa200] group-hover:scale-110 transition-transform duration-300">
                  <AudiomackIcon />
                </span>
                <span className="text-white font-semibold tracking-wide text-sm">Audiomack</span>
                <ExternalLink size={12} className="text-white/30 group-hover:text-white/60 transition-colors" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
