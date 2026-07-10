import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, Music2, PlayCircle, Radio, Instagram, Youtube, Globe, ChevronLeft, ChevronRight, ExternalLink, Smartphone, Music, Play } from "lucide-react";
import { KiutMark } from "../components/KiutMark";
import { Link } from "wouter";
import SiteFooter from "../components/SiteFooter";
import { useState, useEffect, useRef } from "react";
const heroImage = "/assets/images/Hero1_1767873472478.webp";
const heroPoster = "/assets/images/hero-poster.webp";
const heroReelVideo  = "/assets/videos/hero-reel.mp4";
const heroReelPoster = "/assets/images/hero-reel-poster.jpg";
const videoGalleryCover = "/assets/images/IMG_1257_1774433050958.webp";
const videoGalleryCardBg = "/assets/images/IMG_1254_1774433277988.webp";
const musicImage = "/assets/images/WhatsApp_Image_2026-01-08_at_1.09.08_PM_1767874948786.webp";
const goodLifeVideo = "/assets/videos/portfolio-optimized.mp4";
const goodLifePoster = "/assets/images/good-life-hero-bg.webp";
const gradImage1 = "/assets/images/SaveClip.App_499297572_18160731292367177_3212163099031699798_n_1772349317335.webp";
const gradImage2 = "/assets/images/SaveClip.App_519041773_18160731283367177_9053675119922879626_n_1772349317336.webp";
const gradImage3 = "/assets/images/SaveClip.App_517764761_18160731259367177_4327995200687536280_n_1772349317336.webp";
const momentImg4 = "/assets/images/IMG_0682_1774440591738.webp";
const momentImg5 = "/assets/images/studio_session_1774440627098.webp";
const momentImg6 = "/assets/images/studio_kiut_1774440627098.webp";
const momentImg7 = "/assets/images/times_square_1774440627098.webp";
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
  if (t.includes("lyric"))  return { text: "text-gold", border: "border-gold/30", bg: "bg-gold/10" };
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
        className="group cursor-pointer flex flex-col w-64 md:w-auto flex-shrink-0 md:flex-shrink rounded-md overflow-hidden bg-charcoal border border-white/[0.06] hover:border-gold/25 hover:shadow-glow-gold transition-all duration-normal snap-start"
      >
        {/* Thumbnail */}
        <div className="relative w-full aspect-video overflow-hidden bg-midnight flex-shrink-0">
          {!failed ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-cinematic group-hover:scale-[1.07]"
              onError={() => setFailed(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
              style={{ background: "linear-gradient(145deg, var(--color-midnight) 0%, color-mix(in srgb, var(--midnight-black) 90%, var(--dark-gold) 10%) 100%)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(var(--gold-primary-rgb),0.10)", border: "1px solid rgba(var(--gold-primary-rgb),0.18)" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><polygon points="4,3 13,8 4,13" fill="var(--color-gold)" opacity="0.65" /></svg>
              </div>
              <span style={{ color: "rgba(var(--gold-primary-rgb),0.45)", fontSize: 8, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>Kiut Music</span>
            </div>
          )}
          {/* Scrim */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
          {/* Badge */}
          <div className={`absolute top-2 left-2 px-2 py-[3px] rounded-full backdrop-blur-md text-xs font-bold uppercase tracking-widest leading-none border ${badge.text} ${badge.border} ${badge.bg}`}>
            {video.type}
          </div>
          {/* Duration */}
          {video.duration !== "—" && (
            <div className="absolute bottom-2 right-2 px-1.5 py-[3px] rounded-md bg-black/90 backdrop-blur-md text-white/75 text-xs font-semibold leading-none">
              {video.duration}
            </div>
          )}
          {/* Play icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-9 h-9 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center pl-0.5 opacity-30 group-hover:opacity-100 group-hover:bg-gold group-hover:border-gold group-hover:shadow-glow-gold-hover transition-all duration-normal scale-90 group-hover:scale-100">
              <Play className="w-3.5 h-3.5 text-white group-hover:text-midnight transition-colors duration-fast" />
            </div>
          </div>
        </div>
        {/* Text */}
        <div className="p-3.5 flex flex-col gap-1">
          <h4 className="font-bold text-xs leading-snug line-clamp-2 text-white group-hover:text-gold transition-colors duration-fast">
            {video.title}
          </h4>
          <div className="flex items-center gap-1.5 text-xs text-white/25 mt-0.5">
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
  const waveHeights = [0.55, 0.9, 1.4, 1.0, 1.6, 0.75, 1.2, 0.5, 1.35, 0.8, 1.5, 0.65];
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Blurred background image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 2, delay: 0.2 }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroPoster}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover blur-lg scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80" />
      </motion.div>

      {/* Ambient gold glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.4 }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[600px] h-[600px] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(ellipse, rgba(var(--gold-primary-rgb),0.12), transparent 70%)" }} />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full gap-0">
        {/* K Brand Mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 relative"
        >
          <KiutMark
            size={88}
            color="var(--color-gold)"
            className="drop-glow-gold"
            label="KIUT."
          />
        </motion.div>

        {/* Logo wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-7xl font-bold text-white tracking-[0.22em] uppercase mb-2"
        >
          Kiut<span style={{ color: "var(--color-gold)" }}>.</span>
        </motion.h1>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeInOut" }}
          className="w-24 md:w-48 h-[2px] mb-7 origin-center"
          style={{ background: "var(--color-gold)", boxShadow: "var(--glow-gold)" }}
        />

        {/* Animated gold waveform */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="flex items-center gap-[4px] mb-7"
          style={{ height: 32 }}
        >
          {waveHeights.map((h, i) => (
            <motion.div
              key={i}
              className="rounded-full"
              style={{ width: 3, background: "var(--color-gold)", opacity: 0.7 }}
              animate={{ height: [`${h * 8}px`, `${h * 22}px`, `${h * 8}px`] }}
              transition={{ repeat: Infinity, duration: 0.55 + i * 0.09, ease: "easeInOut", delay: i * 0.06 }}
            />
          ))}
        </motion.div>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="text-white/45 tracking-[0.4em] uppercase text-xs font-light"
        >
          Loading Experience
        </motion.p>

        {/* Brand tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="mt-5 text-white/60 tracking-[0.22em] uppercase text-xs font-light text-center px-6"
        >
          Afro-Caribbean Sound. <span className="text-white/80 font-medium">Global Energy.</span>
        </motion.p>
      </div>

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        onClick={onComplete}
        className="absolute bottom-10 right-10 text-white/35 hover:text-white/70 uppercase tracking-[0.22em] text-xs transition-colors z-20"
      >
        Skip ↓
      </motion.button>
    </motion.div>
  );
}

function HomeStatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const stats = [
    { value: 20, suffix: "+", label: "Music Videos" },
    { value: 15, suffix: "+", label: "Singles & EPs" },
    { value: 5,  suffix: "",  label: "Platforms Worldwide" },
    { value: 4,  suffix: "+", label: "Years Creating" },
  ];

  useEffect(() => {
    if (!inView) return;
    stats.forEach((stat, i) => {
      let start = 0;
      const step = Math.ceil(stat.value / 28);
      const timer = setInterval(() => {
        start += step;
        if (start >= stat.value) {
          start = stat.value;
          clearInterval(timer);
        }
        setCounts(prev => { const n = [...prev]; n[i] = start; return n; });
      }, 38);
    });
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(90deg, var(--color-midnight) 0%, color-mix(in srgb, var(--midnight-black) 93%, var(--dark-gold) 7%) 50%, var(--color-midnight) 100%)", borderTop: "1px solid rgba(var(--white-rgb),0.04)", borderBottom: "1px solid rgba(var(--white-rgb),0.04)" }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(var(--gold-primary-rgb),0.04), transparent 70%)" }} />
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <div className="font-display text-4xl md:text-5xl font-bold mb-1" style={{ color: "var(--color-gold)" }}>
              {counts[i]}{stat.suffix}
            </div>
            <div className="text-white/35 text-xs font-bold uppercase tracking-[0.32em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function FeaturedQuote() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="py-28 relative overflow-hidden"
      style={{ background: "var(--color-midnight)" }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(var(--gold-primary-rgb),0.035), transparent 65%)" }} />
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.2 }}
          className="w-8 h-[2px] mx-auto mb-10 origin-center"
          style={{ background: "rgba(var(--gold-primary-rgb),0.5)" }}
        />
        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-editorial text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-white leading-snug italic mb-8"
          style={{ textShadow: "0 0 80px rgba(var(--gold-primary-rgb),0.12)" }}
        >
          "Music is more than sound.
          <br />
          <span style={{ color: "var(--color-gold)" }}>It's memory.</span>"
        </motion.blockquote>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-white/25 text-xs font-bold uppercase tracking-[0.45em]"
        >
          — Kiut
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.6 }}
          className="w-8 h-[2px] mx-auto mt-10 origin-center"
          style={{ background: "rgba(var(--gold-primary-rgb),0.5)" }}
        />
      </div>
    </motion.section>
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
            className="absolute w-[65%] md:w-[55%] aspect-[4/5] rounded-xl overflow-hidden shadow-xl border border-white/10 bg-midnight transform-gpu"
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
                  className="absolute inset-0 border border-gold/60 rounded-xl pointer-events-none shadow-glow-gold"
                />
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

function HeroSlideMedia({
  video,
  poster,
  isFirst,
}: {
  video?: string;
  poster: string;
  isFirst: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (!video) return;
    setVideoReady(false);
    setVideoError(false);
    const v = videoRef.current;
    if (!v) return;
    v.load();
    // Attempt play immediately after load — muted videos are autoplay-safe in all browsers
    const playPromise = v.play();
    if (playPromise !== undefined) playPromise.catch(() => {});
  }, [video]);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Poster — instant paint, fades out once video is buffered */}
      <img
        src={poster}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-cinematic"
        style={{ opacity: video && videoReady && !videoError ? 0 : 1 }}
        fetchPriority={isFirst ? "high" : "low"}
      />
      {/* Video layer — only rendered for slides that supply one */}
      {video && !videoError && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload={isFirst ? "auto" : "metadata"}
          poster={poster}
          onCanPlay={() => {
            videoRef.current?.play().catch(() => {});
            setVideoReady(true);
          }}
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-cinematic"
          style={{ opacity: videoReady ? 1 : 0 }}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
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
    <section className="py-24 bg-midnight border-t border-white/5">
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
              <Globe className="w-5 h-5 text-gold" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
                More from Kiut Music
              </h2>
            </div>
            <a
              href={EMBED_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-white/50 hover:text-gold transition-colors text-sm font-medium uppercase tracking-widest"
            >
              Open <ExternalLink size={14} />
            </a>
          </div>

          {/* Embed container */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-xl bg-charcoal">
            {/* Glow accents */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-gold/8 blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-500/8 blur-[120px] pointer-events-none z-0" />

            {/* Loading shimmer */}
            {status === "loading" && (
              <div className="relative z-10 flex flex-col items-center justify-center h-[520px] md:h-[640px] gap-6">
                <div className="w-10 h-10 rounded-full border-2 border-gold border-t-transparent animate-spin" />
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
              className={`relative z-10 w-full transition-opacity duration-slow ${
                status === "loaded" ? "opacity-100" : "opacity-0 absolute inset-0"
              }`}
              style={{ height: status === "loaded" ? "640px" : "0px", border: "none" }}
            />

            {/* Fallback card */}
            {status === "fallback" && (
              <div className="relative z-10 flex flex-col items-center justify-center px-8 py-16 md:py-24 text-center">
                <div className="w-16 h-16 rounded-md bg-gold/10 border border-gold/20 flex items-center justify-center mb-8">
                  <Music className="w-8 h-8 text-gold" />
                </div>

                <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">Featured Experience</p>
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
                  className="btn-base btn-primary"
                >
                  Explore All Links <ExternalLink size={16} />
                </a>

                {/* Mobile open link */}
                <a
                  href={EMBED_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex md:hidden items-center gap-2 text-white/40 hover:text-gold transition-colors text-sm"
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
              <span className="text-gold text-xs font-bold uppercase tracking-[0.25em]">
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
  const [activeStoreIdx, setActiveStoreIdx] = useState(0);
  const [gridSpotlight, setGridSpotlight] = useState(0);
  const STORE_URL = "https://dreamplanet.org/store-profile/61";
  useEffect(() => {
    const t1 = setInterval(() => setActiveStoreIdx(p => (p + 1) % 6), 5000);
    const t2 = setInterval(() => setGridSpotlight(p => (p + 1) % 6), 3800);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  const slides = [
    {
      id: 0,
      title: "Good Life EP",
      description: "The new sound from Kiut Music is here. Experience the unique fusion of Afrobeat and Caribbean vibes. Stream now on all platforms.",
      ctaText: "Listen Now",
      ctaLink: "https://linktr.ee/kiut_goodlife",
      video: heroReelVideo,
      poster: heroReelPoster,
      badge: "New EP Out Now",
      isExternal: true,
      duration: 4500,
    },
    {
      id: 1,
      title: "Good Life Visuals",
      description: "Watch the cinematic visual experience for the lead single. Directed with precision and artistic vision.",
      ctaText: "Watch Video",
      ctaLink: "/videos",
      poster: goodLifePoster,
      badge: "Featured Music Video",
      isExternal: false,
      duration: 6000,
    },
    {
      id: 2,
      title: "Creative Portfolio",
      description: "A visual journey through performances, behind-the-scenes, and cinematic projects that define Kiut Music.",
      ctaText: "Explore Portfolio",
      ctaLink: "https://dreamplanet.org/user/61",
      poster: gradImage1,
      badge: "Creative Highlight",
      isExternal: true,
      duration: 6000,
    }
  ];

  // Per-slide timing: first slide lingers 7 s, others cycle at 6 s
  useEffect(() => {
    const delay = slides[currentSlide].duration;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, delay);
    return () => clearTimeout(timer);
  }, [currentSlide]);

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
              video={(slides[currentSlide] as any).video}
              poster={slides[currentSlide].poster}
              isFirst={currentSlide === 0}
            />
            {/* Cinematic dark overlay ~35% for text readability */}
            <div className="absolute inset-0 bg-black/35" />
            {/* Directional gradient — text side darker */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />
            {/* Cinematic vignette */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: "inset 0 0 120px 40px rgba(var(--black-rgb),0.65)" }} />
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
                <div className="inline-block px-3 py-1 mb-6 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-sm">
                  <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
                    {slides[currentSlide].badge}
                  </span>
                </div>
                
                <h1 className="font-display text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight text-white mb-4 leading-none uppercase">
                  {slides[currentSlide].title.split(' ')[0]}<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold">
                    {slides[currentSlide].title.split(' ').slice(1).join(' ')}
                  </span>
                </h1>
                
                <p className="font-editorial italic text-lg md:text-xl text-white/70 mt-4 mb-10 max-w-lg font-light leading-relaxed">
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
                      className="btn-base btn-primary relative overflow-hidden"
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
                      className="btn-base btn-primary relative overflow-hidden"
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
                  <div className="flex items-center gap-2 hover:text-gold transition-colors cursor-pointer"><Music2 size={18} /><span className="text-sm font-medium">Spotify</span></div>
                  <div className="flex items-center gap-2 hover:text-gold transition-colors cursor-pointer"><PlayCircle size={18} /><span className="text-sm font-medium">Apple Music</span></div>
                  <div className="hidden md:flex items-center gap-2 hover:text-gold transition-colors cursor-pointer"><Radio size={18} /><span className="text-sm font-medium">Audiomack</span></div>
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
                  <div className="relative w-64 md:w-80 lg:w-96 aspect-square rounded-md overflow-hidden shadow-lg border border-gold/30 transform-gpu rotate-y-[-5deg] rotate-x-[5deg] group hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-cinematic">
                    <img 
                      src={musicImage} 
                      alt="Good Life EP Cover" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-cinematic z-20" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold/20 blur-[100px] -z-10 rounded-full mix-blend-screen" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="flex items-center gap-6 mt-8">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="btn-icon"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-12 h-1 rounded-full transition-all duration-normal ${
                      idx === currentSlide ? "bg-gold" : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="btn-icon"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <HomeStatsStrip />

      {/* MILESTONE SECTION */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-midnight">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--gold-primary-rgb),0.03),transparent_70%)]" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full border border-gold/20 bg-gold/5"
            >
              <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">From Nigeria to Hollywood</span>
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

              <blockquote className="border-l-2 border-gold pl-6 my-8">
                <p className="text-2xl font-editorial italic text-white/80 leading-snug">
                  "His journey is a powerful reminder that with faith, belief, and relentless hard work, dreams truly become reality."
                </p>
              </blockquote>

              <p className="text-lg text-white/60 leading-relaxed font-light">
                From humble beginnings in Nigeria to pursuing his passion in Hollywood, California, his story reflects courage, perseverance, and unwavering determination. What once seemed like a distant dream is now his lived reality.
              </p>
              
              <p className="text-lg text-white/60 leading-relaxed font-light mb-8">
                This achievement stands as an inspiration to dream boldly, trust God’s timing, and never give up.
              </p>

              <p className="text-xl font-editorial italic text-gold">
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
                      className="btn-base btn-secondary group w-full"
                    >
                      <Instagram size={18} className="text-white group-hover:text-gold transition-colors duration-normal" />
                      SEE MORE
                    </motion.button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Featured Quote ── */}
      <FeaturedQuote />

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
              <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-3">Latest Drop</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
                Featured <span className="text-gold">Release</span>
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

          <div className="bg-midnight border border-white/10 rounded-xl p-6 md:p-12 flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 max-w-sm rounded-md overflow-hidden shadow-2xl shadow-pink-900/20"
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
              <span className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs font-bold tracking-[0.2em] uppercase mb-4">Latest EP</span>
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
                  whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(var(--gold-primary-rgb),0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-base btn-primary"
                >
                  Listen Now
                </motion.button>
              </a>

              <div className="flex items-center gap-6 mt-8 text-white/40">
                <div className="flex flex-col items-center gap-2 hover:text-white transition-colors"><Music2 size={24} /><span className="text-xs font-medium uppercase tracking-wider">Spotify</span></div>
                <div className="flex flex-col items-center gap-2 hover:text-white transition-colors"><PlayCircle size={24} /><span className="text-xs font-medium uppercase tracking-wider">Apple</span></div>
                <div className="flex flex-col items-center gap-2 hover:text-white transition-colors"><Youtube size={24} /><span className="text-xs font-medium uppercase tracking-wider">YouTube</span></div>
                <div className="flex flex-col items-center gap-2 hover:text-white transition-colors"><Radio size={24} /><span className="text-xs font-medium uppercase tracking-wider">AudioMack</span></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section className="py-24 md:py-32 bg-midnight relative border-t border-white/5">
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
              className="relative aspect-video rounded-xl overflow-hidden shadow-xl border border-white/10 group cursor-pointer"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-cinematic group-hover:scale-105"
              >
                <source src={portfolioVideo} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-slow gap-3">
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
                whileHover={{ scale: 1.04, borderColor: "var(--color-gold)", color: "var(--color-gold)" }}
                whileTap={{ scale: 0.97 }}
                className="btn-base btn-secondary mx-auto"
              >
                Explore Portfolio <ExternalLink size={14} />
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── KIUTRABA'S STORE FEATURE ─────────────────────────────────── */}
      <section className="py-24 md:py-36 relative border-t border-white/5 overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(var(--midnight-black-rgb),1) 0%, rgba(var(--midnight-black-rgb),0.97) 50%, rgba(var(--midnight-black-rgb),0.94) 100%)" }}>
        <style>{`
          @keyframes store-tape {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .store-tape-track { animation: store-tape 32s linear infinite; }
          .store-tape-track:hover { animation-play-state: paused; }
        `}</style>

        {/* Atmospheric lighting — left gold bloom, right deep shadow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_40%,rgba(var(--gold-primary-rgb),0.08),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(var(--gold-primary-rgb),0.04),transparent_50%)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* ── Section heading ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <p className="text-gold text-xs font-bold tracking-[0.48em] uppercase mb-4">Kiut × Raba Bag</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-none uppercase mb-4">
              KiutRaba<span className="text-gold">'s</span> Store
            </h2>
            <p className="text-white/38 text-sm font-light max-w-lg mx-auto leading-relaxed">
              Exclusive apparel and collectibles inspired by the music, culture, and journey.
            </p>
          </motion.div>

          {/* ── 1. Featured Collection Banner (6-item cycling hero) ── */}
          {(() => {
            const bannerItems = [
              { img: "/assets/images/merch-hoodie.webp",      imgCls: "object-cover object-top", badge: "Limited Edition", category: "Featured Drop",    name: "KiutRaba Signature Hoodie", desc: "The statement piece of the collection. Premium heavyweight fleece, embroidered KR crown logo — wear the sound." },
              { img: "/assets/images/merch-outfit-red.webp",  imgCls: "object-contain p-6",     badge: "Exclusive",       category: "Signature Series", name: "Hoodking",                  desc: "Bold color, editorial cut. The full Good Life look — head to toe KiutRaba energy." },
              { img: "/assets/images/merch-shirt.webp",       imgCls: "object-contain p-4",     badge: "Best Seller",     category: "Apparel",          name: "Classic Man",               desc: "Clean drop-shoulder silhouette. The essential studio wardrobe staple." },
              { img: "/assets/images/merch-collection.webp",  imgCls: "object-contain p-4",      badge: "Collection",      category: "Full Drop",        name: "Good Life Full Drop",       desc: "Every piece. One drop. The complete Good Life wardrobe — curated for the culture." },
              { img: "/assets/images/merch-cap-vintage.webp", imgCls: "object-contain p-8",      badge: "Apparel",         category: "New Arrival",      name: "EP Trucker Cap",            desc: "Structured trucker silhouette with EP embroidery. The everyday KiutRaba flex." },
              { img: "/assets/images/merch-cd.webp",          imgCls: "object-contain p-8",      badge: "Digital",         category: "Music",            name: "Good Life EP",              desc: "The debut EP. Stream or own it — Afrobeat fused with Caribbean energy, for the culture." },
              { img: "/assets/images/merch-baggy-jeans.webp", imgCls: "object-contain p-4",     badge: "Apparel",         category: "Bottoms",          name: "KR Baggy Jeans",            desc: "Wide-leg, culture-first. The KiutRaba street silhouette — from studio to the block." },
              { img: "/assets/images/merch-goodlife-ep.webp", imgCls: "object-cover",            badge: "Digital",         category: "Music",            name: "Goodlife Digital EP",       desc: "Own the Goodlife Digital EP — Afrobeat-forward sounds from the vault of KiutRaba." },
            ];
            const active = bannerItems[activeStoreIdx];
            const total = bannerItems.length;
            return (
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl overflow-hidden border border-white/[0.08] shadow-xl"
                style={{ background: "var(--midnight-black)" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr]">

                  {/* Left — full-bleed cycling image */}
                  <div className="relative overflow-hidden bg-charcoal min-h-[400px] lg:min-h-[520px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStoreIdx}
                        initial={{ opacity: 0, scale: 1.07 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                      >
                        <img src={active.img} alt={active.name} className={`w-full h-full ${active.imgCls}`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-midnight-black/50 hidden lg:block" />
                      </motion.div>
                    </AnimatePresence>

                    {/* Badge */}
                    <div className="absolute top-5 left-5 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.28em] text-midnight bg-gold shadow-glow-gold-hover">
                        <span>✦</span> {active.badge}
                      </span>
                    </div>

                    {/* Film counter */}
                    <div className="absolute top-5 right-5 z-10">
                      <span className="text-xs font-mono text-white/28 tabular-nums tracking-widest">
                        {String(activeStoreIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Prev / Next */}
                    <button aria-label="Previous product" onClick={() => setActiveStoreIdx(p => (p - 1 + total) % total)} className="btn-icon btn-icon-sm absolute left-4 top-1/2 -translate-y-1/2 z-10 !bg-black/45">
                      <ChevronLeft className="w-4 h-4 text-white/55" />
                    </button>
                    <button aria-label="Next product" onClick={() => setActiveStoreIdx(p => (p + 1) % total)} className="btn-icon btn-icon-sm absolute right-4 top-1/2 -translate-y-1/2 z-10 !bg-black/45">
                      <ChevronRight className="w-4 h-4 text-white/55" />
                    </button>

                    {/* Animated bottom label */}
                    <AnimatePresence mode="wait">
                      <motion.div key={activeStoreIdx + "-bl"} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }} className="absolute bottom-0 left-0 right-0 p-6 z-10">
                        <p className="text-xs font-bold uppercase tracking-[0.38em] text-gold/80 mb-1">{active.category}</p>
                        <p className="font-display text-xl font-bold text-white uppercase tracking-tight">{active.name}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Right — animated editorial copy */}
                  <div className="flex flex-col justify-between p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-white/[0.06]">
                    <AnimatePresence mode="wait">
                      <motion.div key={activeStoreIdx + "-copy"} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="mb-8">
                        <p className="text-gold text-xs font-bold uppercase tracking-[0.45em] mb-5">Dream Planet Store</p>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight leading-tight mb-5">
                          Discover KiutRaba's<br />Exclusive Collection
                        </h3>
                        <p className="text-white/42 text-xs font-light leading-relaxed">{active.desc}</p>
                      </motion.div>
                    </AnimatePresence>

                    <div>
                      {/* Progress dots — 6 items */}
                      <div className="flex items-center gap-2 mb-7 flex-wrap">
                        {bannerItems.map((_, i) => (
                          <button key={i} aria-label={`Go to product ${i + 1}`} onClick={() => setActiveStoreIdx(i)} className={`rounded-full transition-all duration-slow focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${i === activeStoreIdx ? "w-8 h-[6px] bg-gold shadow-glow-gold" : "w-[6px] h-[6px] bg-white/18 hover:bg-white/38"}`} />
                        ))}
                      </div>

                      {/* CTA */}
                      <a href={STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Explore KiutRaba's collection on Dream Planet Store">
                        <motion.button whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="btn-base btn-primary w-full mb-2">
                          <span className="text-xs">✦</span> Explore Collection <ExternalLink className="w-3.5 h-3.5" />
                        </motion.button>
                      </a>
                      <p className="text-center text-white/18 text-xs font-light tracking-[0.25em]">Secure checkout via Dream Planet</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}

          {/* ── 2. Editorial Product Grid — 6 cards, 3-col desktop ── */}
          {(() => {
            const gridItems = [
              { name: "KiutRaba Signature Hoodie", img: "/assets/images/merch-hoodie.webp",      isCover: true,  badge: "FEATURED",      badgeKind: "gold-fill",    desc: "Premium heavyweight fleece, embroidered KR crown logo.",             spotlight: 0 },
              { name: "Hoodking",                  img: "/assets/images/merch-outfit-red.webp",  isCover: false, badge: "EXCLUSIVE",     badgeKind: "gold-outline", desc: "Bold color, editorial cut. Head-to-toe KiutRaba energy.",            spotlight: 1 },
              { name: "Classic Man",               img: "/assets/images/merch-shirt.webp",       isCover: false, badge: "BEST SELLER",   badgeKind: "ghost",        desc: "Clean drop-shoulder silhouette. The essential studio staple.",       spotlight: 2 },
              { name: "Good Life Full Drop",       img: "/assets/images/merch-collection.webp",   isCover: false, badge: "COLLECTION",    badgeKind: "ghost",        desc: "Every piece. One drop. The complete Good Life wardrobe.",            spotlight: 3 },
              { name: "EP Trucker Cap",            img: "/assets/images/merch-cap-vintage.webp",  isCover: false, badge: "NEW",           badgeKind: "gold-fill",    desc: "Structured trucker with EP embroidery. Everyday KiutRaba flex.",     spotlight: 4 },
              { name: "Good Life EP",              img: "/assets/images/merch-cd.webp",           isCover: false, badge: "DIGITAL",       badgeKind: "gold-outline", desc: "The debut EP — Afrobeat meets Caribbean. Stream or own it.",         spotlight: 5 },
              { name: "KR Baggy Jeans",            img: "/assets/images/merch-baggy-jeans.webp", isCover: false, badge: "APPAREL",       badgeKind: "ghost",        desc: "Wide-leg, culture-first. The KiutRaba street silhouette.",            spotlight: 7 },
              { name: "Goodlife Digital EP",       img: "/assets/images/merch-goodlife-ep.webp",  isCover: true,  badge: "DIGITAL",       badgeKind: "gold-outline", desc: "Own the Goodlife Digital EP — Afrobeat-forward sounds from the vault.", spotlight: 8 },
            ];

            return (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {gridItems.map((product, idx) => {
                  const isSpotlit = gridSpotlight === product.spotlight;
                  const isFeatured = idx === 0;
                  return (
                    <motion.a
                      key={product.name}
                      href={STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Shop ${product.name} on Dream Planet Store`}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -7, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                      className={`group relative flex flex-col rounded-md overflow-hidden cursor-pointer transition-[border-color,box-shadow] duration-slow ${
                        isSpotlit || isFeatured
                          ? "border border-gold/42 shadow-glow-gold-hover"
                          : "border border-white/[0.07] shadow-sm hover:border-gold/32 hover:shadow-glow-gold-hover"
                      }`}
                      style={{ background: "var(--midnight-black)" }}
                    >
                      {/* "Featured This Week" badge — cycling spotlight */}
                      <AnimatePresence>
                        {isSpotlit && !isFeatured && (
                          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }} className="absolute top-2.5 right-2.5 z-20">
                            <span className="inline-flex items-center gap-1 px-2 py-[4px] rounded-full text-xs font-bold uppercase tracking-[0.22em] text-midnight bg-gold shadow-glow-gold">
                              ✦ This Week
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Product badge */}
                      <div className="absolute top-2.5 left-2.5 z-20">
                        <span className={`inline-flex items-center px-2.5 py-[5px] rounded-full text-xs font-bold uppercase tracking-[0.2em] ${
                          product.badgeKind === "gold-fill"
                            ? "text-midnight bg-gold/90 shadow-glow-gold"
                            : product.badgeKind === "gold-outline"
                            ? "text-gold border border-gold/40 bg-black/55 backdrop-blur-sm"
                            : "text-white/50 border border-white/15 bg-black/45 backdrop-blur-sm"
                        }`}>
                          {product.badge}
                        </span>
                      </div>

                      {/* Image — 80% of card, featured item slightly taller */}
                      <div className={`relative overflow-hidden bg-charcoal flex-shrink-0 ${isFeatured ? "h-[200px] sm:h-[255px] md:h-[280px]" : "h-[175px] sm:h-[215px] md:h-[240px]"}`}>
                        <img
                          src={product.img}
                          alt={`${product.name} — KiutRaba`}
                          loading="lazy"
                          decoding="async"
                          className={`w-full h-full ${product.isCover ? "object-cover object-top" : "object-contain p-3"} [transition:transform_600ms_cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]`}
                        />
                        {(isSpotlit || isFeatured) && (
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--gold-primary-rgb),0.07),transparent_68%)] pointer-events-none" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight-black/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[inset_0_0_0_1px_rgba(var(--gold-primary-rgb),0.12)] transition-opacity duration-medium pointer-events-none" />
                      </div>

                      {/* Card footer */}
                      <div className="flex flex-col flex-1 justify-between p-3.5 bg-midnight border-t border-white/[0.05]">
                        <div className="mb-2.5">
                          <h3 className="font-display text-xs md:text-xs font-bold text-white uppercase tracking-tight leading-tight mb-1">{product.name}</h3>
                          <p className="text-white/35 text-xs font-light leading-relaxed line-clamp-2 hidden sm:block">{product.desc}</p>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1 text-white/18 text-xs font-light tracking-wide">
                            <img src="/assets/images/dreamplanet-icon.png" alt="" aria-hidden="true" className="w-3 h-3 opacity-40" />
                            Dream Planet
                          </span>
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-gold/32 text-gold text-xs font-bold uppercase tracking-[0.18em] group-hover:bg-gold/10 group-hover:border-gold/58 group-hover:shadow-glow-gold transition-all duration-normal whitespace-nowrap">
                            Shop Now <ExternalLink className="w-2 h-2" />
                          </span>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            );
          })()}

          {/* ── 3. "Fans Also Love" Carousel ── */}
          <div className="mt-10">
            <div className="flex items-baseline justify-between mb-5">
              <div>
                <p className="text-gold text-xs font-bold uppercase tracking-[0.42em] mb-0.5">Fans Also Love</p>
                <p className="text-white/25 text-xs font-light tracking-wide">More From KiutRaba</p>
              </div>
              <a href={STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="View all KiutRaba merchandise on Dream Planet Store">
                <span className="text-white/28 text-xs font-light uppercase tracking-[0.28em] hover:text-gold transition-colors duration-fast cursor-pointer">
                  View All ↗
                </span>
              </a>
            </div>

            <div className="overflow-hidden rounded-md" style={{ WebkitMaskImage: "linear-gradient(to right,transparent,black 7%,black 93%,transparent)", maskImage: "linear-gradient(to right,transparent,black 7%,black 93%,transparent)" }}>
              <div className="store-tape-track flex gap-3 w-max py-1">
                {[
                  { name: "Signature Hoodie",   img: "/assets/images/merch-hoodie.webp",      cover: true  },
                  { name: "Hoodking",            img: "/assets/images/merch-outfit-red.webp",  cover: false },
                  { name: "Classic Man",         img: "/assets/images/merch-shirt.webp",       cover: false },
                  { name: "KR Crown Cap",        img: "/assets/images/merch-cap-black.webp",    cover: false },
                  { name: "Waffle Beanie",       img: "/assets/images/merch-beanie.webp",       cover: false },
                  { name: "EP Trucker Cap",      img: "/assets/images/merch-cap-vintage.webp",  cover: false },
                  { name: "Rababag Classic Cap",   img: "/assets/images/merch-cap-rababag.webp",  cover: false },
                  { name: "Good Life Full Drop",   img: "/assets/images/merch-collection.webp",   cover: false },
                  { name: "Goodlife Digital EP",   img: "/assets/images/merch-goodlife-ep.webp",  cover: true  },
                  { name: "Good Life EP",          img: "/assets/images/merch-cd.webp",           cover: false },
                  { name: "KR Baggy Jeans",        img: "/assets/images/merch-baggy-jeans.webp", cover: false },
                  { name: "Signature Hoodie",      img: "/assets/images/merch-hoodie.webp",      cover: true  },
                  { name: "Hoodking",              img: "/assets/images/merch-outfit-red.webp",  cover: false },
                  { name: "Classic Man",           img: "/assets/images/merch-shirt.webp",       cover: false },
                  { name: "KR Crown Cap",          img: "/assets/images/merch-cap-black.webp",    cover: false },
                  { name: "Waffle Beanie",         img: "/assets/images/merch-beanie.webp",       cover: false },
                  { name: "EP Trucker Cap",        img: "/assets/images/merch-cap-vintage.webp",  cover: false },
                  { name: "Rababag Classic Cap",   img: "/assets/images/merch-cap-rababag.webp",  cover: false },
                  { name: "Good Life Full Drop",   img: "/assets/images/merch-collection.webp",   cover: false },
                  { name: "Goodlife Digital EP",   img: "/assets/images/merch-goodlife-ep.webp",  cover: true  },
                  { name: "Good Life EP",          img: "/assets/images/merch-cd.webp",           cover: false },
                  { name: "KR Baggy Jeans",        img: "/assets/images/merch-baggy-jeans.webp", cover: false },
                ].map((p, i) => (
                  <a key={i} href={STORE_URL} target="_blank" rel="noopener noreferrer" aria-label={`Shop ${p.name} on Dream Planet Store`}>
                    <div className="group relative flex-shrink-0 w-[168px] rounded-md overflow-hidden border border-white/[0.07] bg-charcoal hover:border-gold/35 hover:shadow-glow-gold transition-all duration-normal cursor-pointer">
                      <div className="h-[142px] w-full bg-charcoal">
                        <img
                          src={p.img}
                          alt={p.name}
                          loading="lazy"
                          decoding="async"
                          className={`w-full h-full ${p.cover ? "object-cover object-top" : "object-contain p-2.5"} [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.09]`}
                        />
                      </div>
                      <div className="px-3 py-2.5 bg-midnight border-t border-white/[0.05]">
                        <p className="text-xs font-bold text-white uppercase tracking-tight truncate leading-tight mb-0.5">{p.name}</p>
                        <p className="text-white/22 text-xs font-light tracking-widest">$ –</p>
                      </div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[inset_0_0_0_1px_rgba(var(--gold-primary-rgb),0.18)] rounded-md transition-opacity duration-medium pointer-events-none" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── 4. Bottom CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 text-center"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-gold/12 to-transparent mb-10" />
            <a href={STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="View KiutRaba's full collection on Dream Planet Store">
              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="btn-base btn-secondary"
              >
                <span>✦</span> View Full Collection <ExternalLink className="w-4 h-4" />
              </motion.button>
            </a>
            <p className="text-white/14 text-xs font-light uppercase tracking-[0.38em] mt-3">Browse All Pieces on Dream Planet</p>
            <p className="text-white/10 text-xs font-light tracking-[0.22em] mt-1.5">Secure checkout powered by Dream Planet</p>
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
              <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-2">Official Visuals</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase">
                Latest <span className="text-gold">Visuals</span>
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="shrink-0">
              <Link href="/videos">
                <span className="group flex items-center gap-1.5 text-white/45 hover:text-gold transition-colors cursor-pointer text-xs font-bold uppercase tracking-widest whitespace-nowrap">
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
              <div className="group relative w-full rounded-md overflow-hidden cursor-pointer border border-white/8 hover:border-gold/30 transition-all duration-slow hover:shadow-glow-gold-hover aspect-video md:aspect-[21/9]">
                <video
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-cinematic group-hover:scale-[1.04]"
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
                      <span className="inline-block px-3 py-1.5 rounded-full bg-gold/15 border border-gold/35 text-gold text-xs font-black uppercase tracking-[0.22em] mb-4 backdrop-blur-md leading-none">
                        Official Video
                      </span>
                      <h3 className="font-display text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">Good Life</h3>
                      <p className="text-white/50 text-sm font-light">Kiut · 2025</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gold flex items-center justify-center pl-1 shadow-glow-gold group-hover:scale-110 group-hover:shadow-glow-gold-hover transition-all duration-normal">
                        <Play size={20} className="text-midnight" />
                      </div>
                      <span className="text-white/45 text-xs font-bold uppercase tracking-widest hidden md:block">Watch Now</span>
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

      {/* ─── CONCERT CTA SECTION ──────────────────────────────────────── */}
      <section className="py-24 md:py-32 relative border-t border-white/5 overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(var(--midnight-black-rgb),1) 0%, color-mix(in srgb, var(--midnight-black) 94%, var(--dark-gold) 6%) 60%, rgba(var(--midnight-black-rgb),1) 100%)" }}>
        {/* Atmospheric glows */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(var(--gold-primary-rgb),0.07),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(var(--gold-primary-rgb),0.04),transparent_50%)]" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-14"
          >
            <p className="text-gold text-xs font-bold tracking-[0.48em] uppercase mb-4">Live Experiences</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-none uppercase mb-5">
              See Kiut <span className="text-gold">Live</span>
            </h2>
            <p className="text-white/40 text-base font-light max-w-lg mx-auto leading-relaxed">
              Raw energy. Cinematic performance. Experience the music the way it was meant to be felt — live.
            </p>
          </motion.div>

          {/* Coming Soon State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl overflow-hidden border border-white/[0.07] relative"
            style={{ background: "var(--midnight-black)" }}
          >
            {/* Decorative top bar */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

            <div className="px-8 md:px-16 py-14 md:py-20 flex flex-col md:flex-row items-center gap-12">
              {/* Left — icon + copy */}
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-16 h-16 rounded-md flex items-center justify-center mb-6 border border-gold/20"
                  style={{ background: "rgba(var(--gold-primary-rgb),0.06)" }}>
                  <Music className="w-7 h-7 text-gold" />
                </div>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/25 text-gold text-xs font-bold uppercase tracking-[0.35em] mb-5"
                  style={{ background: "rgba(var(--gold-primary-rgb),0.05)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  Dates Coming Soon
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight leading-tight mb-4">
                  Tour Dates<br />Dropping Soon
                </h3>
                <p className="text-white/38 text-sm font-light leading-relaxed max-w-sm">
                  Be the first to know when Kiut announces shows in your city. Sign up to the newsletter and never miss a date.
                </p>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-48 bg-gradient-to-b from-transparent via-white/8 to-transparent" />

              {/* Right — CTA */}
              <div className="flex flex-col items-center md:items-end gap-6">
                <div className="flex flex-col gap-3 w-full md:w-auto">
                  <Link href="/tour">
                    <motion.button
                      data-testid="button-concert-notify"
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="btn-base btn-primary w-full md:w-auto"
                    >
                      View Tour Dates <ArrowRight size={14} />
                    </motion.button>
                  </Link>
                  <p className="text-center text-white/18 text-xs font-light tracking-[0.22em]">Free · Unsubscribe anytime</p>
                </div>
              </div>
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
              <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-3">Behind the Scenes</p>
              <h2 className="font-display text-4xl font-bold tracking-tight text-white uppercase">
                Moments From <span className="text-gold">the Journey</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link href="/about#moments">
                <span className="group flex items-center gap-2 text-white/60 hover:text-gold transition-colors cursor-pointer text-sm font-medium uppercase tracking-widest">
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
                className="group relative flex-shrink-0 w-52 h-52 md:w-64 md:h-64 rounded-md overflow-hidden border border-white/8 hover:border-gold/40 transition-all duration-normal cursor-pointer"
              >
                <img
                  src={img}
                  alt="Moments from the Journey"
                  className="w-full h-full object-cover transition-transform duration-cinematic group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-normal" />
                <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-normal" />
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
                className="group relative flex-shrink-0 w-52 h-52 md:w-64 md:h-64 rounded-md overflow-hidden border border-white/8 hover:border-gold/40 transition-all duration-normal cursor-pointer"
              >
                <img
                  src={img}
                  alt="Moments from the Journey"
                  className="w-full h-full object-cover transition-transform duration-cinematic group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-normal" />
                <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-normal" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAN COMMUNITY SECTION ───────────────────────────────────── */}
      <section className="py-24 md:py-32 relative border-t border-white/5 overflow-hidden bg-midnight">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(var(--purple-rgb),0.07),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(var(--gold-primary-rgb),0.04),transparent_55%)]" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-14"
          >
            <p className="text-gold text-xs font-bold tracking-[0.48em] uppercase mb-4">The Inner Circle</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-none uppercase mb-5">
              Fan <span className="text-gold">Community</span>
            </h2>
            <p className="text-white/40 text-base font-light max-w-lg mx-auto leading-relaxed">
              Join a growing community of fans connected by the music, the culture, and the journey.
            </p>
          </motion.div>

          {/* Two-tier cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
            {/* Regular — Standard Tier */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-xl p-8 md:p-10 border border-white/[0.07] overflow-hidden"
              style={{ background: "var(--midnight-black)" }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(var(--white-rgb),0.03),transparent_60%)]" />
              <div className="relative z-10">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/15 text-white/50 text-xs font-bold uppercase tracking-[0.35em] mb-6">
                  Fan Member
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-3">Standard</h3>
                <p className="text-white/35 text-sm font-light leading-relaxed mb-8">
                  Stay connected with updates, music drops, and exclusive behind-the-scenes content delivered to your inbox.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Newsletter updates", "Early music releases", "Behind-the-scenes access", "Event announcements"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-white/55 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/newsletter">
                  <motion.button
                    data-testid="button-fan-standard"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-base btn-secondary w-full !border-white/15 !text-white/70 hover:!border-gold hover:!text-midnight"
                  >
                    Join Free
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Premium — Fan Card Tier */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-xl p-8 md:p-10 border border-gold/25 overflow-hidden shadow-glow-gold"
              style={{ background: "linear-gradient(145deg, color-mix(in srgb, var(--midnight-black) 94%, var(--dark-gold) 6%) 0%, color-mix(in srgb, var(--midnight-black) 96%, var(--dark-gold) 4%) 100%)" }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(var(--gold-primary-rgb),0.08),transparent_60%)]" />
              {/* Featured badge */}
              <div className="absolute top-5 right-5 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.3em] text-midnight bg-gold shadow-glow-gold">
                  <span>✦</span> Premium
                </span>
              </div>
              <div className="relative z-10">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-gold/30 text-gold text-xs font-bold uppercase tracking-[0.35em] mb-6"
                  style={{ background: "rgba(var(--gold-primary-rgb),0.06)" }}>
                  Fan Card Member
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-3">
                  Inner Circle
                </h3>
                <p className="text-white/45 text-sm font-light leading-relaxed mb-8">
                  The premium fan experience. Exclusive perks, priority access, and a direct connection to the Kiut world.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Everything in Standard", "Fan Card (digital)", "VIP event access", "Exclusive merch drops", "Meet & greet opportunities"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-white/65 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/60 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/newsletter">
                  <motion.button
                    data-testid="button-fan-premium"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-base btn-primary w-full"
                  >
                    Apply for Fan Card
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Social proof row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-center"
          >
            <div className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-gold/60" />
              <a href="https://www.instagram.com/kiut_rababag?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-white/35 hover:text-gold transition-colors text-xs font-medium tracking-wider uppercase">@kiut_rababag</a>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <Youtube className="w-4 h-4 text-gold/60" />
              <a href="https://youtube.com/@kiutrabatv?si=A7jsabTzz7Bq85Bo" target="_blank" rel="noopener noreferrer" className="text-white/35 hover:text-gold transition-colors text-xs font-medium tracking-wider uppercase">@kiutrabatv</a>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <span className="text-white/18 text-xs uppercase tracking-[0.3em]">Global Community</span>
          </motion.div>
        </div>
      </section>

      {/* ─── NEWSLETTER CTA SECTION ──────────────────────────────────── */}
      <section className="py-20 md:py-28 relative border-t border-white/5 overflow-hidden" style={{ background: "var(--color-midnight)" }}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(var(--gold-primary-rgb),0.05),transparent_65%)]" />

        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
              className="w-8 h-[2px] mx-auto mb-8 origin-center bg-gold/50"
            />
            <p className="text-gold text-xs font-bold tracking-[0.48em] uppercase mb-4">Stay Connected</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-snug uppercase mb-5 text-white">
              Join the<br /><span className="text-gold">Inner Circle</span>
            </h2>
            <p className="text-white/38 text-base font-light leading-relaxed mb-10 max-w-md mx-auto">
              Exclusive music drops, behind-the-scenes content, tour announcements, and merch access — straight to your inbox.
            </p>

            <form
              data-testid="form-newsletter-home"
              className="relative max-w-md mx-auto mb-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                data-testid="input-newsletter-email"
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white/[0.04] border border-white/[0.09] rounded-full px-6 py-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all pr-36"
              />
              <motion.button
                data-testid="button-newsletter-submit"
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-base btn-primary btn-sm absolute right-1.5 top-1.5 bottom-1.5"
              >
                Subscribe
              </motion.button>
            </form>
            <p className="text-white/18 text-xs uppercase tracking-[0.28em]">No spam. Unsubscribe anytime.</p>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeInOut", delay: 0.3 }}
              className="w-8 h-[2px] mx-auto mt-10 origin-center bg-gold/30"
            />
          </motion.div>
        </div>
      </section>

      {/* FINAL ENGAGEMENT FOOTER */}
      <SiteFooter />
    </div>
  );
}
