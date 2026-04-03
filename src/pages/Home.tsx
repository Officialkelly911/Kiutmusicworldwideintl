import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Music2, PlayCircle, Radio, Instagram, Youtube, Globe, ChevronLeft, ChevronRight, ExternalLink, Smartphone, Music, Play } from "lucide-react";
import { Link } from "wouter";
import SiteFooter from "../components/SiteFooter";
import { useState, useEffect, useRef } from "react";
const heroImage = "/assets/images/Hero1_1767873472478.jpeg";
const heroPoster = "/assets/images/hero-poster.jpg";
const videoGalleryCover = "/assets/images/IMG_1257_1774433050958.jpeg";
const videoGalleryCardBg = "/assets/images/IMG_1254_1774433277988.jpeg";
const heroVideo = "/assets/videos/hero-optimized.mp4";
const musicImage = "/assets/images/WhatsApp_Image_2026-01-08_at_1.09.08_PM_1767874948786.jpeg";
const goodLifeVideo = "/assets/videos/goodlife-optimized.mp4";
const goodLifePoster = "/assets/images/IMG_1254_1774433277988.jpeg";
const gradImage1 = "/assets/images/SaveClip.App_499297572_18160731292367177_3212163099031699798_n_1772349317335.jpg";
const gradImage2 = "/assets/images/SaveClip.App_519041773_18160731283367177_9053675119922879626_n_1772349317336.jpg";
const gradImage3 = "/assets/images/SaveClip.App_517764761_18160731259367177_4327995200687536280_n_1772349317336.jpg";
const momentImg4 = "/assets/images/IMG_0682_1774440591738.jpeg";
const momentImg5 = "/assets/images/studio_session_1774440627098.jpeg";
const momentImg6 = "/assets/images/studio_kiut_1774440627098.jpeg";
const momentImg7 = "/assets/images/times_square_1774440627098.jpeg";
const portfolioVideo = "/assets/videos/portfolio-optimized.mp4";

// Videos shown in the Latest Visuals horizontal scroll row
const homeVideos = [
  { id: 1, title: "Amin (Official Lyric Video)",           type: "Lyric Video", duration: "3:42", date: "Jan 2025", thumbnail: "https://img.youtube.com/vi/8fFn5Q4hGXQ/maxresdefault.jpg"  },
  { id: 2, title: "Samsa (Official Lyric Video)",          type: "Lyric Video", duration: "3:28", date: "Feb 2025", thumbnail: "https://img.youtube.com/vi/9abrlaSfbXQ/maxresdefault.jpg"  },
  { id: 3, title: "Not Broke (Official Lyric Video)",      type: "Lyric Video", duration: "3:12", date: "Mar 2025", thumbnail: "https://img.youtube.com/vi/_g6mzwmeYnk/maxresdefault.jpg"  },
  { id: 4, title: "AJE (Official Lyric Video)",            type: "Lyric Video", duration: "3:50", date: "Dec 2024", thumbnail: "https://img.youtube.com/vi/8jZZUUzz7PA/maxresdefault.jpg"  },
  { id: 5, title: "Daughter of Elijah (Official Lyric Video)", type: "Lyric Video", duration: "4:15", date: "Nov 2024", thumbnail: "https://img.youtube.com/vi/i92AdFS3Gfc/maxresdefault.jpg" },
];

function getHomeBadge(type: string) {
  const t = type.toLowerCase();
  if (t.includes("lyric"))  return { text: "text-[#D4AF37]", border: "border-[#D4AF37]/30", bg: "bg-[#D4AF37]/10" };
  if (t.includes("music"))  return { text: "text-[#c084fc]", border: "border-[#c084fc]/30", bg: "bg-[#c084fc]/10" };
  if (t.includes("visual")) return { text: "text-[#60a5fa]", border: "border-[#60a5fa]/30", bg: "bg-[#60a5fa]/10" };
  return                           { text: "text-white/60",  border: "border-white/15",     bg: "bg-white/5"      };
}

function HomeVideoCard({ video }: { video: typeof homeVideos[0] }) {
  const [failed, setFailed] = useState(false);
  const badge = getHomeBadge(video.type);
  return (
    <Link href="/videos">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        className="group cursor-pointer flex flex-col w-64 md:w-auto flex-shrink-0 md:flex-shrink rounded-2xl overflow-hidden bg-[#0c0c0c] border border-white/[0.06] hover:border-[#D4AF37]/25 hover:shadow-[0_14px_38px_rgba(212,175,55,0.09)] transition-all duration-300 snap-start"
      >
        {/* Thumbnail */}
        <div className="relative w-full aspect-video overflow-hidden bg-[#090909] flex-shrink-0">
          {!failed ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
              onError={() => setFailed(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
              style={{ background: "linear-gradient(145deg,#0a0a0a 0%,#110d1a 100%)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.18)" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><polygon points="4,3 13,8 4,13" fill="#D4AF37" opacity="0.65" /></svg>
              </div>
              <span style={{ color: "rgba(212,175,55,0.45)", fontSize: 8, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>Kiut Music</span>
            </div>
          )}
          {/* Scrim */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
          {/* Badge */}
          <div className={`absolute top-2 left-2 px-2 py-[3px] rounded-full backdrop-blur-md text-[8px] font-bold uppercase tracking-widest leading-none border ${badge.text} ${badge.border} ${badge.bg}`}>
            {video.type}
          </div>
          {/* Duration */}
          {video.duration !== "—" && (
            <div className="absolute bottom-2 right-2 px-1.5 py-[3px] rounded-md bg-black/90 backdrop-blur-md text-white/75 text-[9px] font-semibold leading-none">
              {video.duration}
            </div>
          )}
          {/* Play icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-9 h-9 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center pl-0.5 opacity-30 group-hover:opacity-100 group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:shadow-[0_0_22px_rgba(212,175,55,0.55)] transition-all duration-300 scale-90 group-hover:scale-100">
              <Play className="w-3.5 h-3.5 text-white group-hover:text-black transition-colors duration-200" />
            </div>
          </div>
        </div>
        {/* Text */}
        <div className="p-3.5 flex flex-col gap-1">
          <h4 className="font-bold text-[12px] leading-snug line-clamp-2 text-white group-hover:text-[#D4AF37] transition-colors duration-200">
            {video.title}
          </h4>
          <div className="flex items-center gap-1.5 text-[10px] text-white/25 mt-0.5">
            <span>Kiut</span>
            <span className="text-white/15">·</span>
            <span>{video.date}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Blurred Background Video */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={heroPoster}
          className="w-full h-full object-cover blur-lg scale-105"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-6xl md:text-8xl font-bold text-white tracking-[0.2em] uppercase mb-8"
        >
          Kiut<span className="text-[#D4AF37]">.</span>
        </motion.h1>

        {/* Accent Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
          className="w-32 md:w-64 h-[2px] bg-[#D4AF37] mb-8 origin-center shadow-[0_0_15px_rgba(212,175,55,0.5)]"
        />

        {/* Brand Statement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-white/90 tracking-[0.3em] uppercase text-sm md:text-lg font-light text-center px-6 drop-shadow-lg"
        >
          Afro-Caribbean Sound. <span className="text-white font-medium">Global Energy.</span>
        </motion.p>
      </div>

      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={onComplete}
        className="absolute bottom-12 right-12 text-white/40 hover:text-white uppercase tracking-[0.2em] text-xs transition-colors z-20"
      >
        Skip Intro
      </motion.button>
    </motion.div>
  );
}

function MilestoneGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [gradImage1, gradImage2, gradImage3];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[500px] md:h-[700px] w-full flex items-center justify-center perspective-[1500px]">
      {images.map((img, index) => {
        const isActive = index === activeIndex;
        // Calculate offset to determine relative position (-1, 0, 1)
        let offset = index - activeIndex;
        if (offset < -1) offset += images.length;
        if (offset > 1) offset -= images.length;
        
        let x = "0%";
        let y = "0%";
        let rotate = 0;
        let rotateY = 0;
        let scale = 1;
        let zIndex = 20;
        let opacity = 1;
        let blur = "blur(0px)";

        if (offset === 0) { 
          // ACTIVE: Center, large, sharp
          x = "0%";
          y = "0%";
          rotate = 0;
          rotateY = 0;
          scale = 1.05;
          zIndex = 30;
          opacity = 1;
          blur = "blur(0px)";
        } else if (offset === 1) { 
          // NEXT: Offset right, slightly down, tilted
          x = "40%";
          y = "10%";
          rotate = 4;
          rotateY = -15;
          scale = 0.85;
          zIndex = 20;
          opacity = 0.6;
          blur = "blur(3px)";
        } else if (offset === -1) { 
          // PREV: Offset left, slightly up, tilted opposite
          x = "-40%";
          y = "-10%";
          rotate = -4;
          rotateY = 15;
          scale = 0.85;
          zIndex = 10;
          opacity = 0.4;
          blur = "blur(5px)";
        }

        return (
          <motion.div
            key={index}
            animate={{
              x,
              y,
              rotate,
              rotateY,
              scale,
              zIndex,
              opacity,
              filter: blur,
            }}
            transition={{
              duration: 1.8,
              ease: [0.22, 1, 0.36, 1], // Premium cinematic easing
            }}
            className="absolute w-[65%] md:w-[55%] aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/10 bg-[#0a0a0a] transform-gpu"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <img src={img} alt="Milestone Gallery" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
            
            <AnimatePresence>
              {isActive && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0 border border-[#D4AF37]/60 rounded-3xl pointer-events-none shadow-[inset_0_0_50px_rgba(212,175,55,0.25)]"
                />
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

function HeroSlideMedia({ src, poster, isFirst }: { src: string; poster: string; isFirst: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    setVideoReady(false);
    const v = videoRef.current;
    if (!v) return;
    v.load();
  }, [src]);

  const handleCanPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    setVideoReady(true);
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Poster — shown immediately, fades out once video is ready */}
      <img
        src={poster}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
        style={{ opacity: videoReady ? 0 : 1 }}
        fetchPriority={isFirst ? "high" : "low"}
      />
      {/* Video — fades in once buffered */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload={isFirst ? "auto" : "metadata"}
        poster={poster}
        onCanPlay={handleCanPlay}
        className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
        style={{ opacity: videoReady ? 1 : 0 }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

const EMBED_URL = "https://bit.ly/48uAYlZ";
const EMBED_TITLE = "Kiut Music — All Links";

function KiutEmbedSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [status, setStatus] = useState<"loading" | "loaded" | "fallback">("loading");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setStatus((prev) => {
        if (prev === "loading") {
          if (process.env.NODE_ENV !== "production") {
            console.warn("[KiutEmbed] Embed timed out — switching to fallback UI");
          }
          return "fallback";
        }
        return prev;
      });
    }, 8000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleLoad = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    try {
      const doc = iframeRef.current?.contentDocument;
      if (doc && doc.body && doc.body.innerHTML === "") {
        if (process.env.NODE_ENV !== "production") {
          console.warn("[KiutEmbed] iframe body is empty — likely blocked by X-Frame-Options");
        }
        setStatus("fallback");
      } else {
        setStatus("loaded");
      }
    } catch {
      setStatus("loaded");
    }
  };

  const handleError = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (process.env.NODE_ENV !== "production") {
      console.warn("[KiutEmbed] iframe error — switching to fallback UI");
    }
    setStatus("fallback");
  };

  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Section header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
                More from Kiut Music
              </h2>
            </div>
            <a
              href={EMBED_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-white/50 hover:text-[#D4AF37] transition-colors text-sm font-medium uppercase tracking-widest"
            >
              Open <ExternalLink size={14} />
            </a>
          </div>

          {/* Embed container */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] bg-[#111]">
            {/* Glow accents */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4AF37]/8 blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-500/8 blur-[120px] pointer-events-none z-0" />

            {/* Loading shimmer */}
            {status === "loading" && (
              <div className="relative z-10 flex flex-col items-center justify-center h-[520px] md:h-[640px] gap-6">
                <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
                <p className="text-white/40 text-sm tracking-widest uppercase">Loading experience…</p>
              </div>
            )}

            {/* Iframe embed */}
            <iframe
              ref={iframeRef}
              src={EMBED_URL}
              title={EMBED_TITLE}
              onLoad={handleLoad}
              onError={handleError}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className={`relative z-10 w-full transition-opacity duration-500 ${
                status === "loaded" ? "opacity-100" : "opacity-0 absolute inset-0"
              }`}
              style={{ height: status === "loaded" ? "640px" : "0px", border: "none" }}
            />

            {/* Fallback card */}
            {status === "fallback" && (
              <div className="relative z-10 flex flex-col items-center justify-center px-8 py-16 md:py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-8">
                  <Music className="w-8 h-8 text-[#D4AF37]" />
                </div>

                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4">Featured Experience</p>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                  {EMBED_TITLE}
                </h3>
                <p className="text-white/50 max-w-md mx-auto font-light mb-10 leading-relaxed">
                  Discover exclusive content, latest releases, and everything happening in the world of Kiut Music — all in one place.
                </p>

                {/* Platform buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium">
                    <Smartphone size={15} />
                    App Store
                  </div>
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium">
                    <Smartphone size={15} />
                    Play Store
                  </div>
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium">
                    <Globe size={15} />
                    DreamPlanet
                  </div>
                </div>

                {/* Primary CTA */}
                <a
                  href={EMBED_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(212,175,55,0.35)]"
                >
                  Explore All Links <ExternalLink size={16} />
                </a>

                {/* Mobile open link */}
                <a
                  href={EMBED_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex md:hidden items-center gap-2 text-white/40 hover:text-[#D4AF37] transition-colors text-sm"
                >
                  Open in browser <ExternalLink size={13} />
                </a>
              </div>
            )}
          </div>

          {/* Bottom label shown only when embedded successfully */}
          {status === "loaded" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex items-center justify-between px-1"
            >
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em]">
                ✦ Featured Experience
              </span>
              <a
                href={EMBED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/40 hover:text-white transition-colors text-xs"
              >
                Open full page <ExternalLink size={12} />
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem("kiut_intro_seen");
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem("kiut_intro_seen", "true");
  };

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(handleIntroComplete, 3800);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      title: "Good Life EP",
      description: "The new sound from Kiut Music is here. Experience the unique fusion of Afrobeat and Caribbean vibes. Stream now on all platforms.",
      ctaText: "Listen Now",
      ctaLink: "https://linktr.ee/kiut_goodlife",
      media: heroVideo,
      poster: heroPoster,
      badge: "New EP Out Now",
      isExternal: true
    },
    {
      id: 1,
      title: "Good Life Visuals",
      description: "Watch the cinematic visual experience for the lead single. Directed with precision and artistic vision.",
      ctaText: "Watch Video",
      ctaLink: "/videos",
      media: goodLifeVideo,
      poster: goodLifePoster,
      badge: "Featured Music Video",
      isExternal: false
    },
    {
      id: 2,
      title: "Creative Portfolio",
      description: "A visual journey through performances, behind-the-scenes, and cinematic projects that define Kiut Music.",
      ctaText: "Explore Portfolio",
      ctaLink: "https://dreamplanet.org/user/61",
      media: portfolioVideo,
      poster: gradImage1,
      badge: "Creative Highlight",
      isExternal: true
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <AnimatePresence>
        {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Dynamic Hero Slider Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full z-0"
          >
            <HeroSlideMedia
              src={slides[currentSlide].media}
              poster={slides[currentSlide].poster}
              isFirst={currentSlide === 0}
            />
            {/* Lightened cinematic gradient — keeps text readable without burying the visual */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content (Left) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-12 lg:pt-0 order-2 lg:order-1 min-h-[400px] justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center lg:items-start"
              >
                <div className="inline-block px-3 py-1 mb-6 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 backdrop-blur-sm">
                  <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase">
                    {slides[currentSlide].badge}
                  </span>
                </div>
                
                <h1 className="font-display text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight text-white mb-4 leading-none uppercase">
                  {slides[currentSlide].title.split(' ')[0]}<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-yellow-200 to-[#D4AF37]">
                    {slides[currentSlide].title.split(' ').slice(1).join(' ')}
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-white/70 mt-4 mb-10 max-w-lg font-light leading-relaxed">
                  {slides[currentSlide].description}
                </p>
                
                {slides[currentSlide].isExternal ? (
                  <a 
                    href={slides[currentSlide].ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-block"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative overflow-hidden rounded-full px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-yellow-600 text-black font-bold uppercase tracking-widest shadow-[0_0_40px_-10px_rgba(212,175,55,0.5)] group-hover:shadow-[0_0_60px_-10px_rgba(212,175,55,0.7)] transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {slides[currentSlide].ctaText} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>
                  </a>
                ) : (
                  <Link href={slides[currentSlide].ctaLink}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative overflow-hidden rounded-full px-10 py-4 bg-gradient-to-r from-white to-gray-300 text-black font-bold uppercase tracking-widest shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {slides[currentSlide].ctaText} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Platform Icons (Only show for EP) */}
            <AnimatePresence>
              {currentSlide === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-6 mt-10 text-white/50"
                >
                  <div className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors cursor-pointer"><Music2 size={18} /><span className="text-sm font-medium">Spotify</span></div>
                  <div className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors cursor-pointer"><PlayCircle size={18} /><span className="text-sm font-medium">Apple Music</span></div>
                  <div className="hidden md:flex items-center gap-2 hover:text-[#D4AF37] transition-colors cursor-pointer"><Radio size={18} /><span className="text-sm font-medium">Audiomack</span></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Floating EP Card / Controls (Right) */}
          <div className="flex flex-col justify-center lg:justify-end items-center order-1 lg:order-2 h-full">
            <AnimatePresence mode="wait">
              {currentSlide === 0 && (
                <motion.div
                  key="ep-card"
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotate: 0,
                    y: [0, -15, 0] 
                  }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                  transition={{ 
                    opacity: { duration: 0.8 },
                    scale: { duration: 0.8 },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="perspective-[1000px] mb-8"
                >
                  <div className="relative w-64 md:w-80 lg:w-96 aspect-square rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#D4AF37]/30 transform-gpu rotate-y-[-5deg] rotate-x-[5deg] group hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700">
                    <img 
                      src={musicImage} 
                      alt="Good Life EP Cover" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#D4AF37]/20 blur-[100px] -z-10 rounded-full mix-blend-screen" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="flex items-center gap-6 mt-8">
              <button 
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-12 h-1 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? "bg-[#D4AF37]" : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MILESTONE SECTION */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.03),transparent_70%)]" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5"
            >
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase">
                Milestone Achievement
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight"
            >
              Dreams Realized:<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">From Nigeria to Hollywood</span>
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Gallery (Left) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-full"
            >
              <MilestoneGallery />
            </motion.div>

            {/* Text (Right) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p className="text-xl text-white/90 font-light leading-relaxed">
                We are proud to celebrate an incredible milestone as my brother officially graduates from the <span className="text-white font-medium">Los Angeles Film School</span>.
              </p>

              <blockquote className="border-l-2 border-[#D4AF37] pl-6 my-8">
                <p className="text-2xl font-serif italic text-white/80 leading-snug">
                  "His journey is a powerful reminder that with faith, belief, and relentless hard work, dreams truly become reality."
                </p>
              </blockquote>

              <p className="text-lg text-white/60 leading-relaxed font-light">
                From humble beginnings in Nigeria to pursuing his passion in Hollywood, California, his story reflects courage, perseverance, and unwavering determination. What once seemed like a distant dream is now his lived reality.
              </p>
              
              <p className="text-lg text-white/60 leading-relaxed font-light mb-8">
                This achievement stands as an inspiration to dream boldly, trust God’s timing, and never give up.
              </p>

              <p className="text-xl font-serif italic text-[#D4AF37]">
                Congratulations on this well-deserved accomplishment and the bright future ahead!
              </p>

              <div className="pt-8 border-t border-white/10 flex flex-col items-center md:items-start">
                <p className="text-sm text-white/40 uppercase tracking-widest mb-6">Recent Highlights</p>
                <div className="flex items-center justify-center md:justify-start w-full">
                  <a 
                    href="https://www.instagram.com/p/DMCYyK2OKyR/?img_index=6&igsh=MWtncGM0aTl2anR4aQ==" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full md:w-auto"
                  >
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex items-center justify-center gap-3 px-10 py-4 w-full bg-[#111] hover:bg-[#1a1a1a] text-white hover:text-[#D4AF37] border border-white/10 hover:border-[#D4AF37] rounded-full transition-all duration-300 font-bold tracking-wider text-sm shadow-none hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                    >
                      <Instagram size={18} className="text-white group-hover:text-[#D4AF37] transition-colors duration-300" />
                      SEE MORE
                    </motion.button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MUSIC SECTION */}
      <section className="py-24 md:py-32 bg-black border-t border-white/5 relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-3">Latest Drop</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
                Featured <span className="text-[#D4AF37]">Release</span>
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link href="/music">
                <span className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer text-sm font-medium uppercase tracking-widest">
                  See All Releases <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-12 flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 max-w-sm rounded-2xl overflow-hidden shadow-2xl shadow-pink-900/20"
            >
              <img src={musicImage} alt="Good Life EP" className="w-full h-auto object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4">Latest EP</span>
              <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 uppercase">
                Good Life
              </h3>
              <p className="text-lg text-white/60 font-light mb-10 max-w-md">
                A defining moment in Kiut's discography. Good Life EP brings together infectious rhythms, soulful melodies, and a vibrant celebration of culture.
              </p>

              <a 
                href="https://linktr.ee/kiut_goodlife"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(212,175,55,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-4 rounded-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                >
                  Listen Now
                </motion.button>
              </a>

              <div className="flex items-center gap-6 mt-8 text-white/40">
                <div className="flex flex-col items-center gap-2 hover:text-white transition-colors"><Music2 size={24} /><span className="text-[10px] font-medium uppercase tracking-wider">Spotify</span></div>
                <div className="flex flex-col items-center gap-2 hover:text-white transition-colors"><PlayCircle size={24} /><span className="text-[10px] font-medium uppercase tracking-wider">Apple</span></div>
                <div className="flex flex-col items-center gap-2 hover:text-white transition-colors"><Youtube size={24} /><span className="text-[10px] font-medium uppercase tracking-wider">YouTube</span></div>
                <div className="flex flex-col items-center gap-2 hover:text-white transition-colors"><Radio size={24} /><span className="text-[10px] font-medium uppercase tracking-wider">AudioMack</span></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section className="py-24 md:py-32 bg-[#050505] relative border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white uppercase mb-4">
              Creative Portfolio
            </h2>
            <p className="text-white/60 font-light max-w-2xl mx-auto">
              A visual journey through performances, behind-the-scenes, and cinematic projects.
            </p>
          </motion.div>

          <a
            href="https://dreamplanet.org/user/61"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 group cursor-pointer"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              >
                <source src={portfolioVideo} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 gap-3">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                  <ExternalLink size={32} />
                </div>
                <span className="text-white/80 text-xs font-bold uppercase tracking-widest">View on DreamPlanet</span>
              </div>
            </motion.div>
          </a>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <a
              href="https://dreamplanet.org/user/61"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.04, borderColor: "#D4AF37", color: "#D4AF37" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 rounded-full border border-white/30 text-white font-medium uppercase tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                Explore Portfolio <ExternalLink size={14} />
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* VIDEOS SECTION */}
      <section className="py-20 md:py-32 bg-black border-t border-white/5 overflow-x-hidden">
        <style>{`.scroll-hide::-webkit-scrollbar{display:none}`}</style>
        <div className="max-w-6xl mx-auto px-6">

          {/* Heading row */}
          <div className="flex flex-row items-end justify-between mb-10 md:mb-14 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-2">Official Visuals</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase">
                Latest <span className="text-[#D4AF37]">Visuals</span>
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="shrink-0">
              <Link href="/videos">
                <span className="group flex items-center gap-1.5 text-white/45 hover:text-[#D4AF37] transition-colors cursor-pointer text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                  Watch All <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* ── FEATURED VIDEO CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 md:mb-8"
          >
            <Link href="/videos">
              <div className="group relative w-full rounded-2xl overflow-hidden cursor-pointer border border-white/8 hover:border-[#D4AF37]/30 transition-all duration-500 hover:shadow-[0_24px_60px_rgba(212,175,55,0.16)] aspect-video md:aspect-[21/9]">
                <video
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  poster={videoGalleryCover}
                  muted loop playsInline
                  onMouseOver={e => (e.target as HTMLVideoElement).play()}
                  onMouseOut={e => { const v = e.target as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
                >
                  <source src={goodLifeVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/45 to-transparent pointer-events-none" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex items-end p-6 md:p-10">
                  <div className="flex items-end justify-between w-full gap-6">
                    <div>
                      <span className="inline-block px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.22em] mb-4 backdrop-blur-md leading-none">
                        Official Video
                      </span>
                      <h3 className="font-display text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">Good Life</h3>
                      <p className="text-white/50 text-sm font-light">Kiut · 2025</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#D4AF37] flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(212,175,55,0.45)] group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] transition-all duration-300">
                        <Play size={20} className="text-black" />
                      </div>
                      <span className="text-white/45 text-[9px] font-bold uppercase tracking-widest hidden md:block">Watch Now</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ── SECONDARY SCROLL ROW ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex gap-4 overflow-x-auto scroll-hide pb-2 snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-5 md:overflow-x-visible md:gap-5 md:pb-0"
              style={{ scrollbarWidth: "none" }}>
              {homeVideos.map(video => (
                <HomeVideoCard key={video.id} video={video} />
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* EMBED CTA SECTION */}
      <KiutEmbedSection />

      {/* MOMENTS FROM THE JOURNEY SECTION */}
      <section className="py-24 bg-black border-t border-white/5 overflow-hidden">
        <style>{`
          @keyframes marquee-left {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0%   { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .marquee-left  { animation: marquee-left  30s linear infinite; }
          .marquee-right { animation: marquee-right 30s linear infinite; }
          .marquee-track:hover .marquee-left,
          .marquee-track:hover .marquee-right { animation-play-state: paused; }
        `}</style>

        {/* Heading */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-3">Behind the Scenes</p>
              <h2 className="font-display text-4xl font-bold tracking-tight text-white uppercase">
                Moments From <span className="text-[#D4AF37]">the Journey</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link href="/about#moments">
                <span className="group flex items-center gap-2 text-white/60 hover:text-[#D4AF37] transition-colors cursor-pointer text-sm font-medium uppercase tracking-widest">
                  View All Moments <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="marquee-track overflow-hidden mb-3">
          <div className="marquee-left inline-flex gap-3 will-change-transform">
            {[gradImage1, heroImage, gradImage2, gradImage3, momentImg4, momentImg5, momentImg6, momentImg7,
              gradImage1, heroImage, gradImage2, gradImage3, momentImg4, momentImg5, momentImg6, momentImg7].map((img, i) => (
              <div
                key={i}
                className="group relative flex-shrink-0 w-52 h-52 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-white/8 hover:border-[#D4AF37]/40 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={img}
                  alt="Moments from the Journey"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/5 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="marquee-track overflow-hidden">
          <div className="marquee-right inline-flex gap-3 will-change-transform">
            {[momentImg7, momentImg6, gradImage3, momentImg5, gradImage1, momentImg4, heroImage, gradImage2,
              momentImg7, momentImg6, gradImage3, momentImg5, gradImage1, momentImg4, heroImage, gradImage2].map((img, i) => (
              <div
                key={i}
                className="group relative flex-shrink-0 w-52 h-52 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-white/8 hover:border-[#D4AF37]/40 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={img}
                  alt="Moments from the Journey"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/5 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL ENGAGEMENT FOOTER */}
      <SiteFooter />
    </div>
  );
}
