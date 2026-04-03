import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Music, Globe, Heart, Zap, ArrowRight, ExternalLink, Film, Headphones, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "wouter";
import SiteFooter from "../components/SiteFooter";
import { useRef, useState } from "react";

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
const img_icon        = "/assets/images/Social_Media_1772754216251_1774435423982.png";
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

const journeyCardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
    filter: "blur(10px)",
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: Math.min(index * 0.025, 0.45),
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
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
  const prefersReducedMotion = useReducedMotion();
  const [selectedJourneyIndex, setSelectedJourneyIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const selectedJourneyImage =
    selectedJourneyIndex === null ? null : uploadedJourneyImages[selectedJourneyIndex];

  const closeJourneyLightbox = () => setSelectedJourneyIndex(null);
  const showPreviousJourneyImage = () => {
    if (selectedJourneyIndex === null) return;
    setSelectedJourneyIndex((selectedJourneyIndex - 1 + uploadedJourneyImages.length) % uploadedJourneyImages.length);
  };
  const showNextJourneyImage = () => {
    if (selectedJourneyIndex === null) return;
    setSelectedJourneyIndex((selectedJourneyIndex + 1) % uploadedJourneyImages.length);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

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

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent" />
      </section>

      {/* ─── 2. THE STORY ───────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-[#050505]">
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
      <section className="relative overflow-hidden bg-black border-t border-white/5">
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
      <section className="py-28 md:py-36 bg-black border-t border-white/5 overflow-hidden">
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
      <section className="py-28 md:py-36 bg-[#050505] border-t border-white/5">
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

      {/* ─── 5. MOMENTS FROM THE JOURNEY — Motion Collage ───────────────── */}
      <section id="moments" className="relative py-28 md:py-36 bg-black border-t border-white/5 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-12 h-64 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_60%)]" />
        <div className="max-w-[1400px] mx-auto px-6">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-20 max-w-2xl"
          >
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.35em] uppercase mb-5">Behind the Music</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight leading-none mb-5">
              Moments From{" "}
              <span className="text-[#D4AF37]">the Journey</span>
            </h2>
            <p className="text-white/45 text-base font-light leading-relaxed">
              A full visual story of the milestones, releases, and moments shaping Kiut's evolution. This gallery now includes all 59 unique uploads from your folder and displays them at their natural proportions.
            </p>
          </motion.div>

          <div className="relative columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]">
            {uploadedJourneyImages.map((src, i) => (
              <motion.figure
                key={src}
                custom={i}
                variants={journeyCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.015,
                        rotate: i % 2 === 0 ? -0.45 : 0.45,
                      }
                }
                className="group relative mb-4 break-inside-avoid overflow-hidden rounded-[1.4rem] border border-white/8 bg-[#070707] shadow-[0_10px_30px_rgba(0,0,0,0.45)] hover:border-[#D4AF37]/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.62)] transition-all duration-500 cursor-zoom-in"
                onClick={() => setSelectedJourneyIndex(i)}
              >
                <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_42%),linear-gradient(to_top,rgba(0,0,0,0.55),transparent_45%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/3 z-[2] w-1/2 bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-0 blur-xl"
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          x: ["0%", "220%"],
                          opacity: [0, 0.65, 0],
                          transition: { duration: 0.9, ease: "easeInOut" },
                        }
                  }
                />
                <img
                  src={src}
                  alt={`Journey photo ${i + 1}`}
                  loading="lazy"
                  className="relative z-0 w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <figcaption className="relative z-[3] flex items-center justify-between gap-3 border-t border-white/6 bg-black/70 px-4 py-3">
                  <motion.span
                    initial={false}
                    animate={prefersReducedMotion ? undefined : { x: [0, 1.5, 0] }}
                    transition={{ duration: 2.8, delay: i * 0.02, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2.2 }}
                    className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]"
                  >
                    {`Moment ${String(i + 1).padStart(2, "0")}`}
                  </motion.span>
                  <span className="text-[11px] text-white/40 transition-colors duration-300 group-hover:text-white/70">
                    {i < 57 ? "Upload" : "Special"}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>

        </div>
      </section>

      <AnimatePresence>
        {selectedJourneyImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/92 backdrop-blur-md px-4 py-6"
            onClick={closeJourneyLightbox}
          >
            <div className="mx-auto flex h-full max-w-7xl flex-col">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                    Moments From the Journey
                  </p>
                  <p className="mt-2 text-sm text-white/45">
                    {`Image ${String((selectedJourneyIndex ?? 0) + 1).padStart(2, "0")} of ${uploadedJourneyImages.length}`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    closeJourneyLightbox();
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-[#D4AF37]/40 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative flex flex-1 items-center justify-center" onClick={(event) => event.stopPropagation()}>
                <button
                  type="button"
                  onClick={showPreviousJourneyImage}
                  className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/80 transition-colors hover:border-[#D4AF37]/40 hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="mx-16 max-h-full overflow-hidden rounded-3xl border border-white/10 bg-[#050505] shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedJourneyImage}
                      src={selectedJourneyImage}
                      alt={`Journey photo ${(selectedJourneyIndex ?? 0) + 1}`}
                      initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96, y: 20 }}
                      animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 1.02, y: -12 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="max-h-[78vh] w-auto max-w-full object-contain"
                    />
                  </AnimatePresence>
                </div>

                <button
                  type="button"
                  onClick={showNextJourneyImage}
                  className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/80 transition-colors hover:border-[#D4AF37]/40 hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 6. STREAMING CTA ───────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-[#050505] border-t border-white/5 relative overflow-hidden">
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
