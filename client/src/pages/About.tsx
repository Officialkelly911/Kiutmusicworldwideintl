import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Music, Globe, Heart, Zap, ArrowRight, ExternalLink, Film, Headphones, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "wouter";
import SiteFooter from "../components/SiteFooter";
import { PremiumCTAButton } from "@/components/PremiumCTAButton";
import KiutWatermark from "@/components/KiutWatermark";
import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "../lib/utils";

const artistPhoto    = "/assets/images/IMG_2452_1772753968062.webp";
const aboutHeroVideo = "/assets/videos/portfolio-optimized.mp4";
const aboutHeroPoster = "/assets/images/about-hero-poster.webp";
const img_editorial1  = "/assets/images/IMG_4994_1774430840570.webp";
const img_editorial2  = "/assets/images/IMG_0682_1774430840570.webp";
const img_editorial3  = "/assets/images/IMG_0850_1774430840570.webp";
const img_studio1     = "/assets/images/anonyig.io_Instagram_kiut_rababag_3639024701227223296_1095425_1774430915892.webp";
const img_studio2     = "/assets/images/anonyig.io_Instagram_kiut_rababag_3709344985993282385_1095425_1774430915892.webp";
const img_studio3     = "/assets/images/anonyig.io_Instagram_kiut_rababag_3709344985976478358_1095425_1774430915892.webp";
const img_milestoneLA = "/assets/images/anonyig.io_Instagram_kiut_rababag_3786107874124605259_1095425_1774430915892.webp";
const img_nigeria1    = "/assets/images/anonyig.io_Instagram_kiut_rababag_2991399092237138795_1095425_1774431303109.webp";
const img_nigeria2    = "/assets/images/anonyig.io_Instagram_kiut_rababag_2991399093235490892_1095425_1774431303109.webp";
const img_tunnel      = "/assets/images/Hero1.webp";
const img_palms       = "/assets/images/IMG_2027_1774430840570.webp";
const img_desert      = "/assets/images/about-moments-stone-seat.webp";
const img_gallery     = "/assets/images/IMG_0162_1774430840570.webp";
const img_museum      = "/assets/images/about-moments-garden-seat.webp";
const img_courtyard   = "/assets/images/about-moments-coast.webp";
const img_sneakers    = "/assets/images/IMG_1254_1774433277988.webp";
const img_mixing      = "/assets/images/anonyig.io_Instagram_kiut_rababag_3709344986471452864_1095425_1774434961599.webp";
const img_synth       = "/assets/images/anonyig.io_Instagram_kiut_rababag_3709344988233024643_1095425_1774434961599.webp";
const img_icon        = "/assets/images/about-icon-statement.webp";
const img_momentLawnWide = "/assets/images/times_square_1774440627098.webp";
const img_momentGardenSeat = "/assets/images/about-moments-garden-seat.webp";
const img_momentLounge = "/assets/images/about-moments-lounge.webp";
const img_momentCoast = "/assets/images/about-moments-coast.webp";
const img_momentLeather = "/assets/images/about-moments-leather-pose.webp";
const img_momentStoneSeat = "/assets/images/about-moments-stone-seat.webp";

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

// upload-030.jpg does not exist on disk — removed to prevent broken image links.
const uploadedJourneyImages = [
  "/assets/about-journey/upload-001.webp",
  "/assets/about-journey/upload-002.webp",
  "/assets/about-journey/upload-003.webp",
  "/assets/about-journey/upload-004.webp",
  "/assets/about-journey/upload-005.webp",
  "/assets/about-journey/upload-006.webp",
  "/assets/about-journey/upload-007.webp",
  "/assets/about-journey/upload-008.webp",
  "/assets/about-journey/upload-009.webp",
  "/assets/about-journey/upload-010.webp",
  "/assets/about-journey/upload-011.webp",
  "/assets/about-journey/upload-012.webp",
  "/assets/about-journey/upload-013.webp",
  "/assets/about-journey/upload-014.webp",
  "/assets/about-journey/upload-015.webp",
  "/assets/about-journey/upload-016.webp",
  "/assets/about-journey/upload-017.webp",
  "/assets/about-journey/upload-018.webp",
  "/assets/about-journey/upload-019.webp",
  "/assets/about-journey/upload-020.webp",
  "/assets/about-journey/upload-021.webp",
  "/assets/about-journey/upload-022.webp",
  "/assets/about-journey/upload-023.webp",
  "/assets/about-journey/upload-024.webp",
  "/assets/about-journey/upload-025.webp",
  "/assets/about-journey/upload-026.webp",
  "/assets/about-journey/upload-027.webp",
  "/assets/about-journey/upload-028.webp",
  "/assets/about-journey/upload-029.webp",
  "/assets/about-journey/upload-031.webp",
  "/assets/about-journey/upload-032.webp",
  "/assets/about-journey/upload-033.webp",
  "/assets/about-journey/upload-034.webp",
  "/assets/about-journey/upload-035.webp",
  "/assets/about-journey/upload-036.webp",
  "/assets/about-journey/upload-037.webp",
  "/assets/about-journey/upload-038.webp",
  "/assets/about-journey/upload-039.webp",
  "/assets/about-journey/upload-040.webp",
  "/assets/about-journey/upload-041.webp",
  "/assets/about-journey/upload-042.webp",
  "/assets/about-journey/upload-043.webp",
  "/assets/about-journey/upload-044.webp",
  "/assets/about-journey/upload-045.webp",
  "/assets/about-journey/upload-046.webp",
  "/assets/about-journey/upload-047.webp",
  "/assets/about-journey/upload-048.webp",
  "/assets/about-journey/upload-049.webp",
  "/assets/about-journey/upload-050.webp",
  "/assets/about-journey/upload-051.webp",
  "/assets/about-journey/upload-052.webp",
  "/assets/about-journey/upload-053.webp",
  "/assets/about-journey/upload-054.webp",
  "/assets/about-journey/upload-055.webp",
  "/assets/about-journey/upload-056.webp",
  "/assets/about-journey/upload-057.webp",
  "/assets/about-journey/upload-058.webp",
  "/assets/about-journey/upload-059.webp",
];

// ─── Journey gallery: cinematic editorial chapter-based gallery ───────────────

const FEATURED_HERO_SRC = "/assets/images/IMG_4994_1774430840570.webp";

type GalleryImage = { src: string; alt: string; badge?: string; objectPos?: string };
type GalleryChapter = { id: string; chapter: string; title: string; badge: string; images: GalleryImage[] };

const GALLERY_CHAPTERS: GalleryChapter[] = [
  {
    id: "lifestyle",
    chapter: "01",
    title: "Lifestyle",
    badge: "Culture",
    images: [
      { src: "/assets/images/IMG_0682_1774430840570.webp",     alt: "Kiut — white suit editorial",        badge: "Editorial",   objectPos: "center 15%" },
      { src: "/assets/images/IMG_0850_1774430840570.webp",     alt: "Kiut — close up portrait",           badge: "Portrait",    objectPos: "center 20%" },
      { src: "/assets/images/IMG_0162_1774430840570.webp",     alt: "Kiut — gallery moment",              badge: "Gallery",     objectPos: "center center" },
      { src: "/assets/images/about-moments-coast.webp",        alt: "Kiut — coastal frame",               badge: "Coastal",     objectPos: "center center" },
      { src: "/assets/images/about-moments-lounge.webp",       alt: "Kiut — quiet luxury lounge",         badge: "Lifestyle",   objectPos: "center 30%" },
      { src: "/assets/images/about-moments-leather-pose.webp", alt: "Kiut — street armor leather jacket", badge: "Street",      objectPos: "center 15%" },
    ],
  },
  {
    id: "studio",
    chapter: "02",
    title: "Behind The Scenes",
    badge: "Studio Life",
    images: [
      { src: "/assets/images/studio_kiut_1774440627098.webp",  alt: "Kiut — studio session",              badge: "Studio",      objectPos: "center center" },
      { src: "/assets/images/IMG_2452_1772753968062.webp",      alt: "Kiut — artist portrait",             badge: "Portrait",    objectPos: "center 20%" },
      { src: "/assets/images/anonyig.io_Instagram_kiut_rababag_3709344986471452864_1095425_1774434961599.webp", alt: "Mixing session", badge: "In The Mix", objectPos: "center center" },
      { src: "/assets/images/anonyig.io_Instagram_kiut_rababag_3709344988233024643_1095425_1774434961599.webp", alt: "Studio synthesizers", badge: "The Gear", objectPos: "center center" },
      { src: "/assets/images/anonyig.io_Instagram_kiut_rababag_3639024701227223296_1095425_1774430915892.webp", alt: "Studio standing", badge: "Studio",   objectPos: "center 20%" },
      { src: "/assets/images/anonyig.io_Instagram_kiut_rababag_3709344985993282385_1095425_1774430915892.webp", alt: "Studio red",   badge: "In The Studio", objectPos: "center 15%" },
    ],
  },
  {
    id: "road",
    chapter: "03",
    title: "On The Road",
    badge: "Tour",
    images: [
      { src: "/assets/images/times_square_1774440627098.webp",  alt: "Kiut — Times Square NYC",           badge: "New York",    objectPos: "center center" },
      { src: "/assets/images/IMG_2027_1774430840570.webp",      alt: "Kiut — California palms",           badge: "West Coast",  objectPos: "center center" },
      { src: "/assets/images/announce-cover.webp",              alt: "Kiut — worldwide announcement",     badge: "Worldwide",   objectPos: "center center" },
      { src: "/assets/images/anonyig.io_Instagram_kiut_rababag_2991399092237138795_1095425_1774431303109.webp", alt: "Nigeria — back to roots", badge: "Back To Roots", objectPos: "center 20%" },
      { src: "/assets/images/anonyig.io_Instagram_kiut_rababag_2991399093235490892_1095425_1774431303109.webp", alt: "Nigeria celebration", badge: "Celebration", objectPos: "center 20%" },
      { src: "/assets/images/about-moments-stone-seat.webp",    alt: "Kiut — still moment on stone steps", badge: "Still Moment", objectPos: "center 30%" },
    ],
  },
  {
    id: "archive",
    chapter: "04",
    title: "The Archive",
    badge: "Visual Archive",
    images: [
      { src: "/assets/images/Hero1.webp",                       alt: "Kiut — hero portrait",              badge: "Portrait",    objectPos: "center 15%" },
      { src: "/assets/images/beach-editorial.webp",             alt: "Kiut — beach editorial, sunset shoreline", badge: "Beach Editorial", objectPos: "center 40%" },
      { src: "/assets/images/about-moments-garden-seat.webp",   alt: "Kiut — golden hour garden",         badge: "Golden Hour", objectPos: "center 25%" },
      { src: "/assets/images/coastal-vibes.webp",               alt: "Kiut — coastal vibes, oceanfront portrait", badge: "Coastal Vibes", objectPos: "center 35%" },
      { src: "/assets/images/anonyig.io_Instagram_kiut_rababag_3639024700849651951_1095425_1774430915892.webp", alt: "Kiut — Instagram moment", badge: "Moment", objectPos: "center 20%" },
      { src: "/assets/images/IMG_1254_1774433277988.webp",      alt: "Kiut — portrait session",           badge: "Portrait",    objectPos: "center 15%" },
    ],
  },
];

// Extended gallery — revealed by "View Complete Journey"
// Removed duplicates: Hero1_1767874042707 (= Hero1.jpeg), IMG_0682_1774440591738 (= ch01),
// WhatsApp_1767874948786 (= WhatsApp_1767874201323).
const EXTENDED_GALLERY: GalleryImage[] = [
  { src: "/assets/images/IMG_1257_1774433050958.webp",  alt: "Kiut — portrait II",       badge: "Portrait",         objectPos: "center 15%" },
  { src: "/assets/images/SaveClip.App_499297572_18160731292367177_3212163099031699798_n_1772349317335.webp", alt: "Kiut — live clip", badge: "Live", objectPos: "center 20%" },
  { src: "/assets/images/SaveClip.App_517764761_18160731259367177_4327995200687536280_n_1772349317336.webp", alt: "Kiut — performance clip", badge: "Performance", objectPos: "center 20%" },
  { src: "/assets/images/SaveClip.App_519041773_18160731283367177_9053675119922879626_n_1772349317336.webp", alt: "Kiut — social moment", badge: "Moment", objectPos: "center 20%" },
  { src: "/assets/images/WhatsApp_Image_2026-01-08_at_1.09.08_PM_1767874201323.webp", alt: "Kiut — candid", badge: "Candid", objectPos: "center center" },
  { src: "/assets/images/anonyig.io_Instagram_kiut_rababag_3639024701990647365_1095425_1774430915892.webp", alt: "Instagram session", badge: "Session", objectPos: "center 20%" },
  { src: "/assets/images/anonyig.io_Instagram_kiut_rababag_3709344986907667189_1095425_1774430915892.webp", alt: "Kiut — behind the lens", badge: "Behind The Lens", objectPos: "center center" },
];

// Flat image array for lightbox navigation (hero + all chapters + extended + uploaded journey images)
const allGalleryImages: GalleryImage[] = [
  { src: FEATURED_HERO_SRC, alt: "The Good Life Era — Kiut", badge: "The Journey" },
  ...GALLERY_CHAPTERS.flatMap(ch => ch.images),
  ...EXTENDED_GALLERY,
  ...uploadedJourneyImages.map((src, i) => ({
    src,
    alt: `Journey moment ${i + 1}`,
    badge: undefined,
  })),
];

const CHAPTER_START_IDX = (chIdx: number) =>
  1 + GALLERY_CHAPTERS.slice(0, chIdx).reduce((acc, c) => acc + c.images.length, 0);
const EXTENDED_START_IDX = 1 + GALLERY_CHAPTERS.reduce((acc, c) => acc + c.images.length, 0);
const JOURNEY_UPLOADS_START_IDX = EXTENDED_START_IDX + EXTENDED_GALLERY.length;

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
  useEffect(() => {
    document.title = "About | Kiut Music Worldwide";
    return () => { document.title = "Kiut Music Worldwide"; };
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const closeLightboxBtnRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [selectedJourneyIndex, setSelectedJourneyIndex] = useState<number | null>(null);
  const [showExtended, setShowExtended] = useState(false);
  const [activeChapter, setActiveChapter] = useState<string>("all");
  const [aboutVideoReady, setAboutVideoReady] = useState(false);
  const [aboutVideoError, setAboutVideoError] = useState(false);
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
    selectedJourneyIndex === null ? null : allGalleryImages[selectedJourneyIndex]?.src ?? null;

  const closeJourneyLightbox = useCallback(() => setSelectedJourneyIndex(null), []);

  useEffect(() => {
    if (selectedJourneyIndex !== null) {
      closeLightboxBtnRef.current?.focus();
    }
  }, [selectedJourneyIndex]);
  const showPreviousJourneyImage = useCallback(() => {
    setSelectedJourneyIndex((prev) =>
      prev === null ? null : (prev - 1 + allGalleryImages.length) % allGalleryImages.length
    );
  }, []);
  const showNextJourneyImage = useCallback(() => {
    setSelectedJourneyIndex((prev) =>
      prev === null ? null : (prev + 1) % allGalleryImages.length
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
        {/* Poster always underneath as fallback */}
        <img
          src={aboutHeroPoster}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {!aboutVideoError && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={aboutHeroPoster}
            onCanPlay={() => setAboutVideoReady(true)}
            onError={() => setAboutVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-cinematic"
            style={{ opacity: aboutVideoReady ? 1 : 0 }}
          >
            <source src={aboutHeroVideo} type="video/mp4" />
          </video>
        )}
      </div>

      {/* ─── SCROLL-DEEPENING DARKNESS OVERLAY ──────────────────────────── */}
      {/*   opacity 0 at hero → 0.91 near footer                           */}
      {/*   Creates the documentary "chapter descent" feeling               */}
      <motion.div
        style={{ opacity: bgDarkness }}
        className="fixed inset-0 -z-[9] pointer-events-none bg-midnight"
        aria-hidden="true"
      />

      {/* ─── 1. CINEMATIC HERO ──────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[67vh] md:h-[80vh] lg:h-screen md:min-h-[560px] flex items-end pb-20 overflow-hidden">
        {/* Parallax background — cinematic beach portrait */}
        <motion.div
          style={{ y: heroY }}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <picture className="absolute inset-0 block w-full h-full">
            <source media="(max-width: 767px)"  srcSet="/assets/images/about-hero-beach-768.webp"  type="image/webp" />
            <source media="(max-width: 1279px)" srcSet="/assets/images/about-hero-beach-1280.webp" type="image/webp" />
            <img
              src="/assets/images/about-hero-beach.webp"
              alt="Kiut on a quiet beach at golden hour, reflecting the emotional storytelling behind his music."
              className="absolute inset-0 w-full h-full object-cover object-[50%_15%] md:object-center lg:object-[55%_center]"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </motion.div>

        {/* Cinematic overlay — top · mid · bottom per brief */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(var(--black-rgb),0.25) 0%, rgba(var(--black-rgb),0.35) 50%, rgba(var(--black-rgb),0.60) 100%)" }}
          aria-hidden="true"
        />
        {/* Left-weighted readability gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" aria-hidden="true" />

        {/* Top-right archive badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/50 border border-gold/25 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-white/55 text-xs font-bold uppercase tracking-[0.32em]">About · Kiut Raba</span>
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 w-full"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-6"
          >
            Nigerian-American Artist
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-display text-[clamp(5rem,15vw,14rem)] font-bold leading-none tracking-tight uppercase text-white mb-4"
          >
            Kiut<span className="text-gold">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-editorial italic text-white/70 text-lg md:text-2xl font-light tracking-wide mb-10 max-w-xl"
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
            <PremiumCTAButton as="link" href="/music">
              Listen Now
            </PremiumCTAButton>
            <Link href="/videos">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-base btn-secondary"
              >
                Watch Videos
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom fade — blends hero into the fixed video layer */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/80 to-transparent" />
        {/* Gold hairline at section boundary */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
      </section>

      {/* ─── 2. THE STORY ───────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 relative z-10">
        <KiutWatermark size={780} />
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
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 shadow-xl">
                <img
                  src={artistPhoto}
                  alt="Kiut"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              {/* Gold accent bar */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-md bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Headphones className="w-8 h-8 text-gold" />
              </div>
              {/* Floating label */}
              <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3">
                <p className="text-gold text-xs font-bold tracking-widest uppercase">Kingsley Moses</p>
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
              <p className="text-gold text-xs font-bold tracking-[0.35em] uppercase mb-6">The Story</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-tight uppercase">
                Where Nigeria<br />
                <span className="text-gold">Meets the World</span>
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
                    className="group flex items-center gap-3 text-white font-semibold tracking-widest uppercase text-sm hover:text-gold transition-colors"
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
                <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-4">
                  Kiut Music Worldwide
                </p>
                <h2 className="font-display text-5xl md:text-7xl font-bold text-white uppercase tracking-tight leading-none mb-5">
                  Born to<br />
                  <span className="text-gold">Stand Out</span>
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
            <p className="text-gold text-xs font-bold tracking-[0.35em] uppercase mb-4">A Career Built on Sound</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">
              The <span className="text-gold">Journey</span>
            </h2>
          </motion.div>

          {/* Desktop timeline */}
          <div className="hidden md:block relative">
            {/* Connecting line — sits at the node row (year label ≈ 44px, mb-2 ≈ 8px = 52px offset) */}
            <div className="absolute top-[58px] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

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
                  {/* Year label above node */}
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.1 }}
                    className="font-display text-2xl font-bold text-gold/70 group-hover:text-gold tracking-tight mb-2 transition-colors duration-normal"
                  >
                    {m.year}
                  </motion.span>

                  {/* Glowing node */}
                  <motion.div
                    whileHover={{ scale: 1.4 }}
                    className="w-[14px] h-[14px] rounded-full bg-gold shadow-[0_0_16px_4px_rgba(var(--gold-primary-rgb),0.5)] mb-10 cursor-pointer transition-shadow duration-normal group-hover:shadow-[0_0_28px_8px_rgba(var(--gold-primary-rgb),0.7)]"
                  />

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full p-6 rounded-xl bg-white/[0.03] border border-white/[0.07] group-hover:border-gold/40 group-hover:shadow-glow-gold transition-all duration-normal"
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
            <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
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
                  <div className="absolute -left-[29px] top-5 w-[14px] h-[14px] rounded-full bg-gold shadow-[0_0_12px_4px_rgba(var(--gold-primary-rgb),0.5)]" />

                  <motion.div
                    whileHover={{ x: 4 }}
                    className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.07] group-hover:border-gold/40 transition-all duration-normal"
                  >
                    <span className="font-display text-xl font-bold text-gold/70 group-hover:text-gold transition-colors duration-normal block mb-1">{m.year}</span>
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
            <p className="text-gold text-xs font-bold tracking-[0.35em] uppercase mb-4">Defining an Artist</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">
              The Kiut <span className="text-gold">Sound</span>
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
                  className="group relative p-8 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-gold/35 hover:bg-white/[0.06] hover:shadow-[0_16px_48px_rgba(var(--gold-primary-rgb),0.08)] transition-all duration-medium overflow-hidden"
                >
                  {/* Subtle glow behind icon */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gold/5 blur-[60px] rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:bg-gold/10 transition-colors duration-slow" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-black border border-white/10 group-hover:border-gold/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-normal shadow-[0_0_0_rgba(var(--gold-primary-rgb),0)] group-hover:shadow-glow-gold">
                      <Icon className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-3 uppercase tracking-wide">
                      {s.title}
                    </h3>
                    <p className="text-white/55 font-light leading-relaxed text-base">
                      {s.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. MOMENTS FROM THE JOURNEY — Premium Editorial Gallery ───── */}
      <section id="moments" className="relative py-28 md:py-36 z-10 border-t border-white/[0.04] overflow-hidden">

        {/* Ambient gold glow at top */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(var(--gold-primary-rgb),0.07),transparent_65%)]" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

          {/* ── Section Heading ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 md:mb-20 text-center mx-auto max-w-3xl"
          >
            <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-5">Visual Archive</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight leading-none mb-6">
              Moments From{" "}
              <span className="text-gold">The Journey</span>
            </h2>
            <p className="text-white/45 text-base font-light leading-relaxed max-w-xl mx-auto">
              A visual documentary of milestones, studio sessions, performances, and memories behind the music.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-px w-10 bg-white/10" />
              <div className="h-px w-10 bg-gold/60" />
              <div className="h-px w-10 bg-white/10" />
            </div>
          </motion.div>

          {/* ── Journey Statistics ──────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-16 md:mb-24">
            {([
              { value: "4+",   label: "Countries",       sub: "Worldwide"        },
              { value: "50+",  label: "Live Shows",      sub: "And Growing"      },
              { value: "500K+",label: "Fans Reached",    sub: "Across Platforms" },
              { value: "7",    label: "Years Performing",sub: "Since 2019"       },
            ] as const).map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative px-5 py-7 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-gold/25 hover:bg-white/[0.03] transition-all duration-slow text-center overflow-hidden"
              >
                <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_center,rgba(var(--gold-primary-rgb),0.05),transparent_70%)] transition-opacity duration-slow" />
                <p className="font-display text-3xl md:text-4xl font-bold text-gold tracking-tight mb-1 relative">{stat.value}</p>
                <p className="text-white text-xs font-bold uppercase tracking-[0.25em] mb-0.5 relative">{stat.label}</p>
                <p className="text-white/30 text-xs font-light tracking-wide uppercase relative">{stat.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* ── Chapter Filter Tabs ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-2.5 mb-12"
          >
            {[
              { id: "all", label: "All Chapters" },
              ...GALLERY_CHAPTERS.map((c) => ({ id: c.id, label: c.title })),
            ].map((tab) => (
              <motion.button
                key={tab.id}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveChapter(tab.id)}
                data-testid={`filter-chapter-${tab.id}`}
                className={cn(
                  "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.28em] transition-all duration-normal",
                  activeChapter === tab.id
                    ? "bg-gold text-midnight shadow-glow-gold"
                    : "border border-white/12 text-white/45 hover:border-gold/35 hover:text-gold/80"
                )}
              >
                {tab.label}
              </motion.button>
            ))}
          </motion.div>

          {/* ── Featured Hero Image ─────────────────────────────────────── */}
          <motion.figure
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-[460px] md:h-[600px] lg:h-[700px] rounded-xl overflow-hidden cursor-zoom-in mb-5 border border-white/[0.08] shadow-xl hover:shadow-xl transition-shadow duration-cinematic"
            onClick={() => setSelectedJourneyIndex(0)}
            role="button"
            aria-label="Open featured image — The Good Life Era"
          >
            <img
              src={FEATURED_HERO_SRC}
              alt="The Good Life Era — Kiut"
              loading="eager" fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover object-top [transition:transform_1200ms_cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />

            {/* Hero overlay content */}
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.3em] text-midnight bg-gold shadow-glow-gold-hover">
                  ✦ Featured
                </span>
                <span className="text-gold/55 text-xs font-mono uppercase tracking-[0.25em]">2024 – 2025</span>
              </div>
              <h3 className="font-display text-3xl md:text-5xl font-bold text-white uppercase tracking-tight leading-tight mb-2">
                The Good Life Era
              </h3>
              <p className="text-white/50 text-xs font-light mb-2 tracking-wide">Worldwide — Lagos · New York · Caribbean</p>
              <p className="text-white/35 text-xs font-light max-w-md leading-relaxed mb-6 hidden md:block">
                From Lagos to LA — documenting the journey through music, culture, and life. A chapter that changed everything.
              </p>
              <button
                type="button"
                className="btn-base btn-sm btn-secondary !border-white/22 !text-white hover:!border-gold/50 hover:!text-gold"
                onClick={(e) => { e.stopPropagation(); setSelectedJourneyIndex(0); }}
              >
                Explore Story <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Hover gold ring */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 shadow-[inset_0_0_0_1px_rgba(var(--gold-primary-rgb),0.2)] transition-opacity duration-slow pointer-events-none" />
          </motion.figure>

          {/* ── Story Chapters — Memory Mode ────────────────────────────── */}
          {/*
            Each chapter fades in as the user scrolls — like turning pages of
            a coffee-table book. The staggered whileInView + chapter separator
            creates the "memory mode" sequential reveal experience.
          */}
          {GALLERY_CHAPTERS.filter((c) => activeChapter === "all" || c.id === activeChapter).map((chapter, chIdx) => {
            const chapterBaseIdx = CHAPTER_START_IDX(GALLERY_CHAPTERS.findIndex(c => c.id === chapter.id));
            return (
              <div key={chapter.id} className="mt-18 md:mt-24 lg:mt-28">

                {/* Chapter header — memory mode page-turn feel */}
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-5 mb-8 md:mb-10"
                >
                  <div className="flex-shrink-0">
                    <p className="text-gold/45 text-xs font-mono uppercase tracking-[0.42em] mb-0.5">
                      Chapter {chapter.chapter}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-tight">
                      {chapter.title}
                    </h3>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-gold/20 via-white/6 to-transparent" />
                  <span className="flex-shrink-0 text-xs font-bold text-white/18 uppercase tracking-[0.3em] hidden sm:block">
                    {chapter.badge}
                  </span>
                </motion.div>

                {/* Editorial image grid for this chapter */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {chapter.images.map((img, imgIdx) => {
                    const globalIdx = chapterBaseIdx + imgIdx;
                    const isHero = imgIdx === 0;
                    return (
                      <motion.figure
                        key={img.src}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          duration: 0.68,
                          delay: (imgIdx % 3) * 0.09,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={cn(
                          "group relative overflow-hidden rounded-xl cursor-zoom-in",
                          "border border-white/[0.07] bg-midnight",
                          "shadow-md",
                          "hover:border-gold/28 hover:shadow-xl",
                          "transition-[border-color,box-shadow] duration-slow",
                          isHero
                            ? "sm:col-span-2 lg:col-span-2 h-[290px] sm:h-[340px]"
                            : "h-[240px] sm:h-[280px]"
                        )}
                        onClick={() => setSelectedJourneyIndex(globalIdx)}
                        role="button"
                        aria-label={`Open ${img.alt} in fullscreen viewer`}
                      >
                        <img
                          src={img.src}
                          alt={`${img.alt} — Kiut`}
                          loading="lazy" decoding="async"
                          className="absolute inset-0 w-full h-full object-cover [transition:transform_650ms_cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                          style={{ objectPosition: img.objectPos ?? "center" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

                        {/* Badge pill */}
                        {img.badge && (
                          <div className="absolute bottom-0 left-0 right-0 px-3.5 pb-3.5">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-full border border-gold/20">
                              <span className="w-1 h-1 rounded-full bg-gold/70 inline-block" />
                              {img.badge}
                            </span>
                          </div>
                        )}

                        {/* Frame counter (hover) */}
                        <div className="absolute top-3 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-medium pointer-events-none">
                          <span className="text-xs font-mono text-white/22 tabular-nums tracking-widest">
                            {String(globalIdx + 1).padStart(3, "0")}
                          </span>
                        </div>

                        {/* Gold hover ring */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 shadow-[inset_0_0_0_1px_rgba(var(--gold-primary-rgb),0.16),inset_0_-60px_40px_-20px_rgba(var(--gold-primary-rgb),0.04)] transition-opacity duration-medium pointer-events-none" />
                      </motion.figure>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* ── "View Complete Journey" / Extended Gallery ─────────────── */}
          <AnimatePresence mode="wait">
            {!showExtended ? (
              <motion.div
                key="view-btn"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="mt-16 md:mt-20 text-center"
              >
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />
                <p className="text-white/25 text-xs font-light uppercase tracking-[0.32em] mb-6">
                  {EXTENDED_GALLERY.length + uploadedJourneyImages.length} more moments waiting
                </p>
                <motion.button
                  type="button"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowExtended(true)}
                  className="btn-base btn-secondary"
                >
                  ✦ View Complete Journey
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="extended"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.55 }}
                className="mt-16 md:mt-22"
              >
                {/* Chapter 05 header */}
                <div className="flex items-center gap-5 mb-8 md:mb-10">
                  <div className="flex-shrink-0">
                    <p className="text-gold/45 text-xs font-mono uppercase tracking-[0.42em] mb-0.5">Chapter 05</p>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-tight">The Full Archive</h3>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-gold/20 via-white/6 to-transparent" />
                  <span className="flex-shrink-0 text-xs font-bold text-white/18 uppercase tracking-[0.3em] hidden sm:block">Complete Journey</span>
                </div>

                {/* Extended curated images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
                  {EXTENDED_GALLERY.map((img, imgIdx) => {
                    const globalIdx = EXTENDED_START_IDX + imgIdx;
                    const isHero = imgIdx === 0;
                    return (
                      <motion.figure
                        key={img.src}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ duration: 0.6, delay: (imgIdx % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(
                          "group relative overflow-hidden rounded-xl cursor-zoom-in",
                          "border border-white/[0.07] bg-midnight",
                          "shadow-md",
                          "hover:border-gold/22 hover:shadow-lg transition-all duration-slow",
                          isHero ? "sm:col-span-2 lg:col-span-2 h-[280px]" : "h-[230px]"
                        )}
                        onClick={() => setSelectedJourneyIndex(globalIdx)}
                        role="button"
                        aria-label="Open archive image in fullscreen"
                      >
                        <img
                          src={img.src}
                          alt={`${img.alt} — Kiut`}
                          loading="lazy" decoding="async"
                          className="absolute inset-0 w-full h-full object-cover [transition:transform_650ms_ease] group-hover:scale-[1.04]"
                          style={{ objectPosition: img.objectPos ?? "center" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        {img.badge && (
                          <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full border border-gold/18">
                              <span className="w-0.5 h-0.5 rounded-full bg-gold/60 inline-block" />
                              {img.badge}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 shadow-[inset_0_0_0_1px_rgba(var(--gold-primary-rgb),0.14)] transition-opacity duration-medium pointer-events-none" />
                      </motion.figure>
                    );
                  })}
                </div>

                {/* Uploaded journey images — compact 4-col archive grid */}
                <div className="mt-2">
                  <p className="text-white/20 text-xs font-mono uppercase tracking-[0.3em] mb-5 text-center">Full Journey Archive — {uploadedJourneyImages.length} Moments</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-3">
                    {uploadedJourneyImages.map((src, imgIdx) => {
                      const globalIdx = JOURNEY_UPLOADS_START_IDX + imgIdx;
                      return (
                        <motion.figure
                          key={src}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-20px" }}
                          transition={{ duration: 0.5, delay: (imgIdx % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                          className="group relative h-[170px] sm:h-[200px] overflow-hidden rounded-xl cursor-zoom-in border border-white/[0.06] bg-midnight hover:border-gold/18 hover:shadow-md transition-all duration-medium"
                          onClick={() => setSelectedJourneyIndex(globalIdx)}
                          role="button"
                          aria-label={`Open journey moment ${imgIdx + 1} in fullscreen`}
                        >
                          <img
                            src={src}
                            alt={`Journey moment ${imgIdx + 1} — Kiut`}
                            loading="lazy" decoding="async"
                            className="absolute inset-0 w-full h-full object-cover object-center [transition:transform_600ms_ease] group-hover:scale-[1.05]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-normal pointer-events-none">
                            <span className="text-xs font-mono text-white/20 tabular-nums">
                              {String(imgIdx + 1).padStart(3, "0")}
                            </span>
                          </div>
                          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 shadow-[inset_0_0_0_1px_rgba(var(--gold-primary-rgb),0.12)] transition-opacity duration-medium pointer-events-none" />
                        </motion.figure>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── "The Journey Continues" — Cinematic CTA ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 md:mt-28 text-center"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-gold/18 to-transparent mb-14" />
            <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-4">What Comes Next</p>
            <h3 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4 leading-tight">
              The Journey<br className="hidden md:block" /> Continues
            </h3>
            <p className="text-white/35 text-sm font-light mb-10 max-w-sm mx-auto leading-relaxed">
              New chapters are being written. Follow the story through the music and the visuals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/videos">
                <motion.button
                  type="button"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-base btn-secondary w-full sm:w-auto"
                >
                  <Film className="w-3.5 h-3.5" /> Watch Latest Visual
                </motion.button>
              </Link>
              <PremiumCTAButton as="link" href="/music" className="w-full sm:w-auto" icon={<Headphones className="w-3.5 h-3.5" />}>
                Listen Now
              </PremiumCTAButton>
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
            role="dialog"
            aria-modal="true"
            aria-label="Visual Archive photo gallery"
            onClick={closeJourneyLightbox}
            onTouchStart={handleLightboxTouchStart}
            onTouchEnd={handleLightboxTouchEnd}
          >
            {/* Cinematic vignette */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(var(--black-rgb),0.6)_100%)]" />

            {/* Header bar */}
            <div
              className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4">
                <div className="h-5 w-px bg-gold/40" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.38em] text-gold">
                    Visual Archive
                  </p>
                  {allGalleryImages[selectedJourneyIndex ?? 0]?.badge && (
                    <p className="text-xs text-white/50 mt-0.5 font-light tracking-wide">
                      {allGalleryImages[selectedJourneyIndex ?? 0]?.badge}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/30 tabular-nums tracking-widest hidden sm:block">
                  {String((selectedJourneyIndex ?? 0) + 1).padStart(3, "0")} / {String(allGalleryImages.length).padStart(3, "0")}
                </span>
                <button
                  ref={closeLightboxBtnRef}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); closeJourneyLightbox(); }}
                  aria-label="Close photo gallery"
                  className="btn-icon btn-icon-sm"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
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
                aria-label="Previous image"
                className="btn-icon absolute left-3 sm:left-5 z-10 !bg-black/50"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
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
                    className="overflow-hidden rounded-xl border border-white/[0.07] shadow-xl max-w-[90vw] max-h-[80vh]"
                  >
                    <img
                      src={selectedJourneyImage ?? ""}
                      alt={allGalleryImages[selectedJourneyIndex ?? 0]?.alt ?? `Journey moment ${(selectedJourneyIndex ?? 0) + 1}`}
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
                aria-label="Next image"
                className="btn-icon absolute right-3 sm:right-5 z-10 !bg-black/50"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Footer strip — progress dots */}
            <div
              className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-5 pt-3 z-10 gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              {allGalleryImages.slice(
                Math.max(0, (selectedJourneyIndex ?? 0) - 4),
                Math.min(allGalleryImages.length, (selectedJourneyIndex ?? 0) + 5)
              ).map((_, relIdx) => {
                const absIdx = Math.max(0, (selectedJourneyIndex ?? 0) - 4) + relIdx;
                const isActive = absIdx === selectedJourneyIndex;
                return (
                  <button
                    key={absIdx}
                    type="button"
                    onClick={() => setSelectedJourneyIndex(absIdx)}
                    className={cn(
                      "rounded-full transition-all duration-normal",
                      isActive
                        ? "w-5 h-1.5 bg-gold"
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--gold-primary-rgb),0.06),transparent_65%)]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold text-xs font-bold tracking-[0.35em] uppercase mb-6">Available Everywhere</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-6">
              Experience<br />
              <span className="text-gold">the Sound</span>
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
                  <div className="font-display text-3xl md:text-4xl font-bold text-gold">{s.value}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/35 mt-1">{s.label}</div>
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
                className="btn-base group bg-white/5 border border-white/15 text-white hover:border-[#1DB954]/50 hover:bg-[#1DB954]/10 hover:shadow-[0_0_30px_rgba(29,185,84,0.2)] w-full sm:w-auto"
              >
                <span className="text-[#1DB954] group-hover:scale-110 transition-transform duration-normal">
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
                className="btn-base group bg-white/5 border border-white/15 text-white hover:border-[#fc3c44]/50 hover:bg-[#fc3c44]/10 hover:shadow-[0_0_30px_rgba(252,60,68,0.2)] w-full sm:w-auto"
              >
                <span className="text-[#fc3c44] group-hover:scale-110 transition-transform duration-normal">
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
                className="btn-base group bg-white/5 border border-white/15 text-white hover:border-[#ffa200]/50 hover:bg-[#ffa200]/10 hover:shadow-[0_0_30px_rgba(255,162,0,0.2)] w-full sm:w-auto"
              >
                <span className="text-[#ffa200] group-hover:scale-110 transition-transform duration-normal">
                  <AudiomackIcon />
                </span>
                <span className="text-white font-semibold tracking-wide text-sm">Audiomack</span>
                <ExternalLink size={12} className="text-white/30 group-hover:text-white/60 transition-colors" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ─── 7. STORE CTA ───────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 relative z-10 border-t border-white/[0.04] overflow-hidden">
        {/* Radial gold glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--gold-primary-rgb),0.07),transparent_60%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-6">Kiut Official Merch</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-6 leading-tight">
              Wear the<br />
              <span className="text-gold">Culture</span>
            </h2>
            <p className="text-white/45 text-lg font-light mb-10 max-w-md mx-auto leading-relaxed">
              Official merchandise from the world of Kiut Music Worldwide — limited drops, curated for the culture.
            </p>

            {/* Feature bullets */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              {[
                { label: "Limited Edition Drops" },
                { label: "Ships Worldwide" },
                { label: "Artist-Curated" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
                  <span className="text-white/50 text-xs font-bold uppercase tracking-[0.25em]">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Merch preview — 3 featured products */}
            <div className="grid grid-cols-3 gap-3 mb-10 max-w-sm mx-auto">
              {[
                { img: "/assets/images/merch-hoodie.webp",       name: "Signature Hoodie",    cover: true  },
                { img: "/assets/images/merch-baggy-jeans.webp", name: "KR Baggy Jeans",      cover: false },
                { img: "/assets/images/merch-goodlife-ep.webp",  name: "Goodlife Digital EP", cover: true  },
              ].map((item) => (
                <motion.a
                  key={item.name}
                  href="https://dreamplanet.org/store-profile/61"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-white/[0.08] hover:border-gold/38 hover:shadow-[0_8px_28px_rgba(var(--gold-primary-rgb),0.16)] transition-[border-color,box-shadow] duration-normal"
                  style={{ background: "var(--midnight-black)" }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full ${item.cover ? "object-cover object-top" : "object-contain p-2.5"} group-hover:scale-[1.06] [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1)]`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  <p className="absolute bottom-1.5 left-0 right-0 text-center text-xs font-bold text-white/80 uppercase tracking-wide px-1 line-clamp-1">{item.name}</p>
                </motion.a>
              ))}
            </div>

            {/* Dream Planet attribution */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <img src="/assets/images/dreamplanet-icon.png" alt="" aria-hidden="true" loading="lazy" className="w-3.5 h-3.5 opacity-35" />
              <span className="text-white/22 text-xs uppercase tracking-[0.32em] font-medium">Exclusive on Dream Planet</span>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <PremiumCTAButton
                as="a"
                href="https://dreamplanet.org/store-profile/61"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-store-shop"
                className="w-full sm:w-auto"
                icon={<Music className="w-3.5 h-3.5" />}
              >
                Shop Now
              </PremiumCTAButton>
              <Link href="/music">
                <motion.button
                  type="button"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  data-testid="button-store-listen"
                  className="btn-base btn-secondary w-full sm:w-auto"
                >
                  <Headphones className="w-3.5 h-3.5" /> Stream the Music
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
