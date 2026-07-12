import React from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Calendar, Star, Ticket, Users, Shield,
  ChevronRight, ChevronDown, Mail, Play, Globe, Clock, Mic2, Film, Tv2,
  X, MapPin,
} from "lucide-react";
import { Link } from "wouter";
import SiteFooter from "../components/SiteFooter";
import { PremiumCTAButton } from "@/components/PremiumCTAButton";
import { HeroSection } from "@/components/HeroSection";
import { useRef, useState, useEffect } from "react";

// Single interactive element — avoids nesting <a> inside <button>
const MotionLink = motion.create(Link) as unknown as React.FC<
  React.ComponentProps<typeof Link> & {
    className?: string;
    whileHover?: object;
    whileTap?: object;
    initial?: object;
    animate?: object;
    exit?: object;
    transition?: object;
    variants?: object;
  }
>;

// ─── Featured Performances (real YouTube content) ────────────────────────────
const featuredPerformances = [
  {
    youtubeId: "S3TxotoehrI",
    title: "Strength in Bed",
    type: "Live Performance",
    year: "2021",
    typeIcon: Mic2,
  },
  {
    youtubeId: "L7tLWSFrx98",
    title: "Makosa",
    type: "Music Video",
    year: "2025",
    typeIcon: Film,
  },
  {
    youtubeId: "5StPjZaBIGc",
    title: "TGIF ft. De Sol",
    type: "Music Video",
    year: "2024",
    typeIcon: Film,
  },
  {
    youtubeId: "_2EMhX0wbWk",
    title: "Chikito — Glitch Session",
    type: "Live Session",
    year: "2022",
    typeIcon: Mic2,
  },
  {
    youtubeId: "oqJVcQoWDzw",
    title: "SOFA — Behind The Scenes",
    type: "Behind The Scenes",
    year: "2023",
    typeIcon: Tv2,
  },
  {
    youtubeId: "QdxFbz1N4J8",
    title: "Ketchup",
    type: "Visualizer",
    year: "2023",
    typeIcon: Film,
  },
];

// ─── VIP perks (future-ready copy) ───────────────────────────────────────────
const vipPerks = [
  { icon: Ticket, title: "Priority Concert Access",     desc: "When live events are announced, VIP members receive early access before general public sale." },
  { icon: Users,  title: "Meet & Greet Opportunities",  desc: "Exclusive pre-show sessions with Kiut — intimate, personal, and unforgettable." },
  { icon: Shield, title: "Early Ticket Notifications",  desc: "Be first in line. Get alerts the moment new tour dates and tickets go live." },
  { icon: Star,   title: "Private Fan Experiences",     desc: "Access to invitation-only events, studio sessions, and special appearances." },
];

// ─── "Next Live Chapter" interactive timeline — built from real tour-stop data ─

// ─── Fan Card tiers ───────────────────────────────────────────────────────────
const fanCardTiers = [
  {
    tier: "Fan Card",
    label: "Regular",
    price: "Free",
    desc: "Join the Kiut community and stay connected.",
    perks: [
      "Early access to new music releases",
      "Exclusive newsletter content",
      "Member-only updates and announcements",
      "Priority pre-sale notifications",
      "Digital wallpapers and assets",
    ],
    cta: "Get Fan Card",
    isPremium: false,
  },
  {
    tier: "VIP Fan Card",
    label: "Premium",
    price: "Coming Soon",
    desc: "The inner circle. Maximum access, maximum experience.",
    perks: [
      "Everything in Fan Card",
      "Priority access to live event tickets",
      "Exclusive VIP Meet & Greet invitations",
      "Signed merchandise and memorabilia",
      "Backstage and lounge access",
      "Private fan experiences",
    ],
    cta: "Join Waitlist",
    isPremium: true,
  },
];

// ─── Gallery items (reuses real YouTube content) ──────────────────────────────
const galleryItems = [
  { youtubeId: "S3TxotoehrI", title: "Strength in Bed",          type: "Live Performance" },
  { youtubeId: "L7tLWSFrx98", title: "Makosa",                   type: "Music Video"      },
  { youtubeId: "5StPjZaBIGc", title: "TGIF ft. De Sol",          type: "Music Video"      },
  { youtubeId: "_2EMhX0wbWk", title: "Chikito — Glitch Session", type: "Live Session"     },
  { youtubeId: "oqJVcQoWDzw", title: "SOFA — Behind The Scenes", type: "BTS"              },
  { youtubeId: "QdxFbz1N4J8", title: "Ketchup",                  type: "Visualizer"       },
  { youtubeId: "iJSXNGDW-C8", title: "Samsa",                    type: "Official Video"   },
  { youtubeId: "cd52pQaKmAs", title: "Confam Boy",               type: "Music Video"      },
];

// ─── Fan testimonials (data-driven — add new entries without rebuilding) ───────
const fanTestimonials = [
  {
    quote: "The energy when Kiut performs is indescribable. Every lyric hits completely different live — it's an experience you carry with you.",
    name: "Sarah O.",
    location: "Lagos, Nigeria",
    rating: 5,
    initials: "SO",
  },
  {
    quote: "I flew from Toronto specifically for the festival set. Absolutely worth every mile. The stage presence alone is world-class.",
    name: "Marcus T.",
    location: "Toronto, Canada",
    rating: 5,
    initials: "MT",
  },
  {
    quote: "Kiut's live set is something else entirely. The production, the presence, the connection with the crowd — a full cinematic experience.",
    name: "Amara D.",
    location: "London, UK",
    rating: 5,
    initials: "AD",
  },
];

// ─── Tour cities — equirectangular map coords (x/y as %) ─────────────────────
// Add new entries here; the world map section renders them automatically.
const tourCities = [
  { city: "Lagos",    country: "Nigeria", region: "West Africa",   x: 51.0, y: 53.0 },
  { city: "London",   country: "UK",      region: "Europe",        x: 49.9, y: 27.5 },
  { city: "Accra",    country: "Ghana",   region: "West Africa",   x: 49.5, y: 54.5 },
  { city: "New York", country: "USA",     region: "North America", x: 29.4, y: 34.0 },
  { city: "Paris",    country: "France",  region: "Europe",        x: 50.6, y: 29.5 },
  { city: "Toronto",  country: "Canada",  region: "North America", x: 28.0, y: 31.0 },
  { city: "Dubai",    country: "UAE",     region: "Middle East",   x: 65.4, y: 43.5 },
  { city: "Nairobi",  country: "Kenya",   region: "East Africa",   x: 60.2, y: 55.0 },
];

// ─── Upcoming shows (Coming Soon — no confirmed dates yet) ───────────────────
// Exported so other pages (e.g. Newsletter's "Featured Updates") can reference
// the same tour catalogue instead of duplicating show data.
export type ShowStatus = "available" | "limited" | "sold_out" | "coming_soon" | "announced";
export const upcomingShows: {
  id: string; city: string; country: string; venue: string;
  date: string; time: string; region: string; status: ShowStatus; description: string;
}[] = [
  { id: "sh-1", city: "Lagos",    country: "Nigeria",        venue: "Eko Convention Centre",   date: "Dec 31, 2026", time: "10:00 PM", region: "West Africa",   status: "announced",   description: "Kiut closes out 2026 with a landmark Lagos performance." },
  { id: "sh-2", city: "London",   country: "United Kingdom", venue: "To Be Announced",          date: "2026",         time: "TBA",      region: "Europe",        status: "coming_soon", description: "UK debut — afrobeats meets London vibes." },
  { id: "sh-3", city: "Accra",    country: "Ghana",          venue: "To Be Announced",          date: "2026",         time: "TBA",      region: "West Africa",   status: "coming_soon", description: "Pan-African energy in the heart of Accra." },
  { id: "sh-4", city: "New York", country: "USA",            venue: "To Be Announced",          date: "2027",         time: "TBA",      region: "North America", status: "coming_soon", description: "North American debut is on the horizon." },
  { id: "sh-5", city: "Dubai",    country: "UAE",            venue: "To Be Announced",          date: "2027",         time: "TBA",      region: "Middle East",   status: "coming_soon", description: "Middle East debut for the Kiut Music experience." },
  { id: "sh-6", city: "Toronto",  country: "Canada",         venue: "To Be Announced",          date: "2027",         time: "TBA",      region: "North America", status: "coming_soon", description: "Canada stage — Kiut brings the sound north." },
];

// ─── Tour FAQ ─────────────────────────────────────────────────────────────────
const tourFAQ = [
  { q: "How can I book Kiut for an event?", a: "Submit a booking enquiry via the contact form or click 'Book Kiut' above. Our management team reviews all enquiries and responds within 48 hours with availability and pricing details." },
  { q: "What is included in the VIP Fan Card package?", a: "The VIP Fan Card includes early ticket access, meet-and-greet opportunities, exclusive merchandise drops, access to pre-show soundcheck, and priority seating at all Kiut Music events worldwide." },
  { q: "How long is a typical Kiut live performance?", a: "Standard headline shows run 60–90 minutes covering material from all EPs plus fan favourites. Festival sets run 30–45 minutes. Full headline tours may extend to 2 hours with encore." },
  { q: "Does Kiut travel internationally for performances?", a: "Yes. Kiut Music performs internationally across Africa, Europe, North America, and the Middle East. Travel, accommodation, and all logistics are coordinated through our management team." },
  { q: "What are the technical requirements for a Kiut live show?", a: "Our full technical rider covers sound specifications, lighting design, stage dimensions, backline, and hospitality. Riders are provided to confirmed venues upon booking completion." },
  { q: "Is media or press access available at Kiut shows?", a: "Yes. Press and media accreditation is available for confirmed Kiut Music events. Contact the team in advance to request press passes, photo pit access, and interview opportunities." },
];

// ─── Tour Statistics ──────────────────────────────────────────────────────────
const tourStatData = [
  { value: 8,  suffix: "+", label: "Countries",         sub: "Global reach"       },
  { value: 15, suffix: "+", label: "Live Performances", sub: "And counting"       },
  { value: 10, suffix: "K+", label: "Fans Reached",     sub: "Across the world"  },
  { value: 6,  suffix: "+", label: "Years Performing",  sub: "Since 2018"        },
  { value: 3,  suffix: "",  label: "Continents",        sub: "Africa · EU · N.AM" },
];

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * value));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [inView, value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Tour Card ────────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<ShowStatus, { label: string; color: string; bg: string }> = {
  available:   { label: "Available",   color: "#4ade80", bg: "rgba(74,222,128,0.10)"  },
  limited:     { label: "Limited",     color: "#f59e0b", bg: "rgba(245,158,11,0.10)"  },
  sold_out:    { label: "Sold Out",    color: "#f87171", bg: "rgba(248,113,113,0.10)" },
  coming_soon: { label: "Coming Soon", color: "var(--color-gold)", bg: "rgba(var(--gold-primary-rgb),0.10)" },
  announced:   { label: "Announced",  color: "#a78bfa", bg: "rgba(167,139,250,0.10)" },
};
function TourCard({ show, index }: { show: typeof upcomingShows[0]; index: number }) {
  const cfg = STATUS_CONFIG[show.status];
  const [detailsOpen, setDetailsOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-gold/22 hover:bg-gold/[0.015] transition-all duration-normal overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      <div className="p-6">
        {/* Status badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
            style={{ color: cfg.color, background: cfg.bg }}
          >
            {cfg.label}
          </span>
          <span className="text-white/20 text-xs font-mono">{show.region}</span>
        </div>

        {/* City */}
        <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white group-hover:text-gold transition-colors duration-fast mb-0.5">
          {show.city}
        </h3>
        <p className="text-white/40 text-sm mb-4">{show.country}</p>

        {/* Details */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-white/35 text-xs">
            <MapPin size={10} className="text-gold/40 flex-shrink-0" />
            <span>{show.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-white/35 text-xs">
            <Calendar size={10} className="text-gold/40 flex-shrink-0" />
            <span>{show.date}{show.time !== "TBA" ? ` · ${show.time}` : ""}</span>
          </div>
        </div>

        <p className="text-white/25 text-xs leading-relaxed mb-6 line-clamp-2">{show.description}</p>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          {show.status === "available" || show.status === "limited" || show.status === "announced" ? (
            <a
              href="https://linktr.ee/kiutmusic"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-sm flex-1 text-center justify-center"
              style={{ background: "rgba(var(--gold-primary-rgb),0.12)", color: "var(--color-gold)", border: "1px solid rgba(var(--gold-primary-rgb),0.3)" }}
            >
              <Ticket size={10} /> Buy Tickets
            </a>
          ) : (
            <a
              href="/newsletter"
              className="btn-base btn-sm flex-1 text-center justify-center"
              style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
            >
              <Mail size={10} /> Notify Me
            </a>
          )}
          <button
            onClick={() => setDetailsOpen((v) => !v)}
            className="btn-base btn-sm border border-white/[0.07] text-white/40 hover:text-gold hover:border-gold/25 gap-1"
            aria-expanded={detailsOpen}
            aria-controls={`event-details-${show.id}`}
            aria-label={detailsOpen ? "Hide event details" : "View event details"}
          >
            <motion.span
              className="flex items-center"
              animate={{ rotate: detailsOpen ? 90 : 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <ChevronRight size={12} />
            </motion.span>
          </button>
        </div>

        {/* Expanded event details */}
        <AnimatePresence initial={false}>
          {detailsOpen && (
            <motion.div
              id={`event-details-${show.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-5 border-t border-white/[0.06] space-y-3">
                <p className="text-white/45 text-xs leading-relaxed">{show.description}</p>
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <p className="text-white/20 uppercase tracking-widest text-[9px] font-bold mb-1">Venue</p>
                    <p className="text-white/55">{show.venue}</p>
                  </div>
                  <div>
                    <p className="text-white/20 uppercase tracking-widest text-[9px] font-bold mb-1">Doors</p>
                    <p className="text-white/55">{show.time}</p>
                  </div>
                  <div>
                    <p className="text-white/20 uppercase tracking-widest text-[9px] font-bold mb-1">Region</p>
                    <p className="text-white/55">{show.region}</p>
                  </div>
                  <div>
                    <p className="text-white/20 uppercase tracking-widest text-[9px] font-bold mb-1">Status</p>
                    <p style={{ color: cfg.color }}>{cfg.label}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Gallery Lightbox ─────────────────────────────────────────────────────────
function GalleryLightbox({ item, onClose }: { item: typeof galleryItems[0]; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(14px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — video player`}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl rounded-xl overflow-hidden border border-white/[0.10] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
            title={item.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="px-5 py-4 flex items-center justify-between" style={{ background: "var(--midnight-black)" }}>
          <div>
            <p className="text-white font-display font-bold text-sm uppercase tracking-wide">{item.title}</p>
            <p className="text-gold/55 text-[10px] font-bold uppercase tracking-widest mt-0.5">{item.type}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            aria-label="Close video"
          >
            <X size={15} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Performance Card ─────────────────────────────────────────────────────────
function PerformanceCard({ perf, index }: { perf: typeof featuredPerformances[0]; index: number }) {
  const [imgFailed, setImgFailed] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const TypeIcon = perf.typeIcon;

  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={`https://www.youtube.com/watch?v=${perf.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${perf.title} on YouTube`}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group flex flex-col rounded-xl overflow-hidden border border-white/[0.07] bg-midnight-black hover:border-gold/28 hover:shadow-[0_16px_48px_rgba(var(--gold-primary-rgb),0.10)] transition-all duration-normal cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden bg-midnight flex-shrink-0">
        {!imgFailed ? (
          <img
            src={`https://i.ytimg.com/vi/${perf.youtubeId}/hqdefault.jpg`}
            alt={perf.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-cinematic group-hover:scale-[1.07]"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: "linear-gradient(145deg, var(--midnight-black) 0%, color-mix(in srgb, var(--midnight-black) 92%, var(--dark-gold) 8%) 100%)" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(var(--gold-primary-rgb),0.10)", border: "1px solid rgba(var(--gold-primary-rgb),0.18)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <polygon points="4,3 13,8 4,13" fill="var(--color-gold)" opacity="0.65" />
              </svg>
            </div>
            <span style={{ color: "rgba(var(--gold-primary-rgb),0.45)", fontSize: 8, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Kiut Music
            </span>
          </div>
        )}
        {/* Scrim */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
        {/* Type badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-[3px] rounded-full backdrop-blur-md border border-gold/25 bg-gold/[0.08] text-gold text-[8px] font-bold uppercase tracking-widest">
          <TypeIcon size={8} />
          {perf.type}
        </div>
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-normal">
          <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(var(--black-rgb),0.7)]"
            style={{ background: "rgba(var(--gold-primary-rgb),0.92)" }}>
            <Play className="w-5 h-5 text-midnight ml-0.5" fill="currentColor" />
          </div>
        </div>
        {/* Year */}
        <div className="absolute bottom-2 right-2 px-1.5 py-[3px] rounded-md bg-black/90 backdrop-blur-md text-white/60 text-[9px] font-semibold leading-none">
          {perf.year}
        </div>
      </div>

      {/* Info row */}
      <div className="px-4 py-3.5 flex items-center justify-between">
        <p className="text-white/80 text-sm font-medium group-hover:text-gold transition-colors duration-fast truncate pr-3">
          {perf.title}
        </p>
        <ArrowRight size={13} className="text-white/20 group-hover:text-gold transition-colors duration-fast flex-shrink-0" />
      </div>
    </motion.a>
  );
}

// ─── Featured Event Countdown ─────────────────────────────────────────────────
function FeaturedEventCountdown({ targetDate }: { targetDate: Date }) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    const clamped = Math.max(diff, 0);
    return {
      days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
      hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((clamped / (1000 * 60)) % 60),
      seconds: Math.floor((clamped / 1000) % 60),
      expired: diff <= 0,
    };
  };
  const [time, setTime] = useState(calc);

  useEffect(() => {
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate.getTime()]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hrs", value: time.hours },
    { label: "Min", value: time.minutes },
    { label: "Sec", value: time.seconds },
  ];

  return (
    <div className="flex-shrink-0 flex flex-col items-center md:items-end gap-3" role="timer" aria-live="polite">
      <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">
        {time.expired ? "Doors Are Open" : "Countdown"}
      </span>
      <div className="flex items-center gap-2">
        {units.map((u) => (
          <div
            key={u.label}
            className="flex flex-col items-center justify-center w-16 h-16 md:w-[68px] md:h-[68px] rounded-xl border border-gold/25 bg-black/40 backdrop-blur-sm"
          >
            <span className="font-display text-xl md:text-2xl font-bold text-gold tabular-nums leading-none">
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="text-white/30 text-[8px] font-bold uppercase tracking-widest mt-1">{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tour FAQ Accordion ────────────────────────────────────────────────────────
function TourFAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {tourFAQ.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={item.q}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden hover:border-gold/20 transition-colors duration-normal"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              aria-expanded={isOpen}
              aria-controls={`tour-faq-panel-${i}`}
            >
              <span className={`font-display text-sm md:text-base font-bold uppercase tracking-tight transition-colors duration-fast ${isOpen ? "text-gold" : "text-white"}`}>
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border ${isOpen ? "border-gold/40 text-gold" : "border-white/15 text-white/40"}`}
              >
                <ChevronDown size={13} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`tour-faq-panel-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-white/40 text-sm leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Tour() {
  useEffect(() => {
    document.title = "Tour | Kiut Music Worldwide";
    return () => { document.title = "Kiut Music Worldwide"; };
  }, []);

  const featuredRef = useRef<HTMLElement>(null);
  const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null);

  function scrollToFeatured() {
    featuredRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-midnight text-white">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <HeroSection
        slug="tour"
        alt="Kiut on a rooftop overlooking the city skyline at golden hour"
        className="min-h-[80vh] flex items-end pb-24"
        priority
        overlay={
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-midnight" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/25" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-[700px] h-[350px] bg-gold/7 blur-[130px] rounded-full pointer-events-none" aria-hidden="true" />
          </>
        }
        contentClassName="relative z-10 max-w-7xl mx-auto px-6 pt-36 w-full"
        sectionChildren={
          <motion.div
            className="absolute bottom-8 right-8 flex flex-col items-center gap-1 opacity-35"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
          </motion.div>
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/[0.07] backdrop-blur-sm mb-7">
            <Globe size={11} className="text-gold" />
            <span className="text-gold text-[10px] font-bold tracking-[0.35em] uppercase">Live Experiences</span>
          </div>

          <h1 className="font-display text-[clamp(3rem,10vw,7rem)] font-bold uppercase tracking-tight leading-[0.92] text-white mb-6">
            Experience<br />
            <span className="text-gold">Kiut Live</span>
          </h1>

          <p className="font-editorial italic text-white/55 text-lg font-light max-w-md leading-relaxed mb-4">
            The stage is set. Tour dates coming soon.
          </p>
          <p className="text-white/35 text-sm font-light max-w-lg leading-relaxed mb-10">
            Be the first to experience Kiut live — from intimate club performances to international festival stages.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <PremiumCTAButton as="a" href="#shows" icon={<Calendar size={13} />} iconPosition="right">
              View Upcoming Shows
            </PremiumCTAButton>
            <motion.a
              href="/contact"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn-base btn-secondary !border-white/15 !text-white"
            >
              Book Kiut <Globe size={13} />
            </motion.a>
            <motion.a
              href="#vip"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn-base btn-secondary !border-gold/25 !text-gold"
            >
              VIP Experience <Shield size={13} />
            </motion.a>
          </div>
        </motion.div>
      </HeroSection>

      {/* ── UPCOMING SHOWS ───────────────────────────────────────────────────── */}
      <section id="shows" className="py-24 md:py-32 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold/50" /> Upcoming
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              Live <span className="text-gold">Dates</span>
            </h2>
            <p className="text-white/35 text-sm mt-2">
              New dates being announced — subscribe to be first in line for tickets.
            </p>
          </motion.div>

          {/* Featured event — highlighted card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-xl overflow-hidden border border-gold/20 mb-10"
            style={{ background: "linear-gradient(135deg, rgba(var(--gold-primary-rgb),0.07) 0%, var(--midnight-black) 60%, rgba(var(--gold-primary-rgb),0.04) 100%)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <div className="absolute top-0 right-0 w-72 h-72 blur-[110px] rounded-full pointer-events-none" style={{ background: "rgba(var(--gold-primary-rgb),0.09)" }} />

            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest" style={{ color: "#a78bfa", background: "rgba(167,139,250,0.12)" }}>
                      Announced
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border border-gold/25 text-gold bg-gold/[0.08]">
                      VIP Available
                    </span>
                  </div>

                  <h3 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-white leading-tight mb-1">
                    Lagos
                  </h3>
                  <p className="text-gold text-sm font-medium mb-1">Nigeria · West Africa</p>
                  <div className="flex flex-wrap items-center gap-4 text-white/35 text-xs mt-3">
                    <span className="flex items-center gap-1.5"><MapPin size={10} className="text-gold/40" /> Eko Convention Centre</span>
                    <span className="flex items-center gap-1.5"><Calendar size={10} className="text-gold/40" /> Dec 31, 2026</span>
                    <span className="flex items-center gap-1.5"><Clock size={10} className="text-gold/40" /> 10:00 PM</span>
                  </div>
                  <p className="text-white/35 text-sm leading-relaxed mt-4 max-w-md">
                    Kiut closes out 2026 with a landmark Lagos homecoming performance. An unforgettable night of live music, dancing, and luxury vibes.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-8">
                    <PremiumCTAButton as="a" href="https://linktr.ee/kiutmusic" target="_blank" rel="noopener noreferrer" icon={<Ticket size={13} />} iconPosition="right">
                      Get Tickets
                    </PremiumCTAButton>
                    <a href="#vip">
                      <motion.button
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="btn-base btn-secondary !border-gold/25 !text-gold"
                      >
                        VIP Packages <Shield size={13} />
                      </motion.button>
                    </a>
                  </div>
                </div>

                {/* Countdown */}
                <FeaturedEventCountdown targetDate={new Date("2026-12-31T22:00:00")} />
              </div>
            </div>
          </motion.div>

          {/* Tour date grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingShows.map((show, i) => (
              <TourCard key={show.id} show={show} index={i} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/20 text-xs text-center mt-8"
          >
            More dates to be announced. <Link href="/newsletter" className="text-gold/50 hover:text-gold underline underline-offset-2 transition-colors">Subscribe for priority access.</Link>
          </motion.p>
        </div>
      </section>

      {/* ── FEATURED PERFORMANCES ─────────────────────────────────────────── */}
      <section ref={featuredRef} className="py-24 border-t border-white/[0.05]" style={{ background: "var(--midnight-black)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          >
            <div>
              <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" /> On Screen
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
                Featured <span className="text-gold">Performances</span>
              </h2>
              <p className="text-white/40 text-sm mt-3 max-w-md leading-relaxed">
                Live videos, studio sessions, and official music videos. Watch Kiut's artistry in motion.
              </p>
            </div>
            <motion.a
              href="https://www.youtube.com/@kiutrabatv"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn-base btn-sm flex-shrink-0 border border-white/12 text-white/50 hover:text-gold hover:border-gold/30"
            >
              View All on YouTube <ArrowRight size={12} />
            </motion.a>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {featuredPerformances.map((perf, i) => (
              <PerformanceCard key={perf.youtubeId} perf={perf} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TOUR GALLERY ───────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05] overflow-hidden" style={{ background: "var(--midnight-black)" }}>
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-5"
          >
            <div>
              <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/50" /> Gallery
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
                Live <span className="text-gold">Moments</span>
              </h2>
              <p className="text-white/35 text-sm mt-2 max-w-md leading-relaxed">
                Performances, sessions, and music videos. Click any card to watch.
              </p>
            </div>
            <motion.a
              href="https://www.youtube.com/@kiutrabatv"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn-base btn-sm flex-shrink-0 border border-white/12 text-white/50 hover:text-gold hover:border-gold/30"
            >
              All Videos <ArrowRight size={12} />
            </motion.a>
          </motion.div>
        </div>

        {/* Horizontal snap-scroll gallery */}
        <div
          className="flex gap-4 overflow-x-auto pb-4 px-6 md:px-12"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" } as React.CSSProperties}
        >
          {galleryItems.map((item, i) => (
            <motion.button
              key={item.youtubeId}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setLightboxItem(item)}
              className="flex-shrink-0 w-[270px] md:w-[310px] rounded-xl overflow-hidden border border-white/[0.07] hover:border-gold/30 hover:shadow-[0_12px_40px_rgba(var(--gold-primary-rgb),0.09)] group cursor-pointer transition-all duration-normal text-left"
              style={{ scrollSnapAlign: "start" }}
              aria-label={`Watch ${item.title}`}
            >
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-cinematic group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-normal">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg" style={{ background: "rgba(var(--gold-primary-rgb),0.92)" }}>
                    <Play className="w-5 h-5 text-midnight ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute top-2 left-2 px-2 py-[3px] rounded-full backdrop-blur-md border border-gold/22 bg-gold/[0.08] text-gold text-[9px] font-bold uppercase tracking-widest">
                  {item.type}
                </div>
              </div>
              <div className="px-4 py-3" style={{ background: "var(--midnight-black)" }}>
                <p className="text-white/70 text-sm font-medium group-hover:text-gold transition-colors duration-fast truncate">
                  {item.title}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── VIP EXPERIENCE ────────────────────────────────────────────────── */}
      <section id="vip" className="py-24 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Exclusive Access</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-6 leading-[1.05]">
                The VIP<br /><span className="text-gold">Experience</span>
              </h2>
              <p className="text-white/45 text-base leading-relaxed mb-4 max-w-md">
                When Kiut announces live events, VIP members are first through the door.
              </p>
              <p className="text-white/30 text-sm leading-relaxed mb-10 max-w-md">
                Register your interest now and you'll receive exclusive notifications, priority access, and opportunities that general admission never sees.
              </p>
              <PremiumCTAButton as="link" href="/newsletter" icon={<ChevronRight size={14} />} iconPosition="right">
                Register VIP Interest
              </PremiumCTAButton>
            </motion.div>

            {/* Right — perks grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vipPerks.map((perk, i) => {
                const Icon = perk.icon;
                return (
                  <motion.div
                    key={perk.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="p-6 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-gold/25 hover:bg-gold/[0.03] transition-all duration-normal group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border border-gold/20 group-hover:border-gold/40 transition-colors duration-normal"
                      style={{ background: "rgba(var(--gold-primary-rgb),0.06)" }}
                    >
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-display text-sm font-bold uppercase tracking-tight text-white mb-2 group-hover:text-gold transition-colors duration-fast leading-snug">{perk.title}</h3>
                    <p className="text-white/38 text-xs leading-relaxed">{perk.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAN CARD — Regular vs Premium ─────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]" style={{ background: "var(--midnight-black)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Inner Circle</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4 leading-[1.05]">
              Choose Your <span className="text-gold">Fan Card</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-lg mx-auto">
              Two tiers. One community. Find your level of access.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fanCardTiers.map((tier, i) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-xl border overflow-hidden p-8 md:p-10 flex flex-col ${
                  tier.isPremium
                    ? "border-gold/35 shadow-[0_0_60px_rgba(var(--gold-primary-rgb),0.10),0_20px_60px_rgba(var(--black-rgb),0.5)]"
                    : "border-white/[0.09]"
                }`}
                style={{
                  background: tier.isPremium
                    ? "linear-gradient(145deg, rgba(var(--gold-primary-rgb),0.07) 0%, var(--midnight-black) 50%, rgba(var(--gold-primary-rgb),0.04) 100%)"
                    : "var(--midnight-black)",
                }}
              >
                {/* Premium top glow */}
                {tier.isPremium && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-gold/10 blur-[60px] rounded-full pointer-events-none" />
                )}
                {/* Top accent bar */}
                {tier.isPremium && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
                )}

                <div className="relative z-10 flex flex-col flex-1">
                  {/* Header */}
                  <div className="mb-7">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className={`text-[9px] font-bold tracking-[0.35em] uppercase ${tier.isPremium ? "text-gold" : "text-white/35"}`}>
                          {tier.label}
                        </span>
                        <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white mt-1">
                          {tier.tier}
                        </h3>
                      </div>
                      <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                        tier.isPremium
                          ? "bg-gold/10 text-gold border border-gold/25"
                          : "bg-white/5 text-white/40 border border-white/10"
                      }`}>
                        {tier.price}
                      </div>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed">{tier.desc}</p>
                  </div>

                  {/* Perks list */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-3 text-sm text-white/60">
                        <span className={`mt-[3px] w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center ${
                          tier.isPremium ? "bg-gold/15 border border-gold/30" : "bg-white/5 border border-white/10"
                        }`}>
                          <svg width="7" height="6" viewBox="0 0 7 6" fill="none">
                            <path d="M1 3L2.7 5L6 1" stroke={tier.isPremium ? "var(--color-gold)" : "rgba(var(--white-rgb),0.4)"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {perk}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {tier.isPremium ? (
                    <PremiumCTAButton
                      as="link"
                      href="/newsletter"
                      className="w-full"
                      icon={<ArrowRight size={12} />}
                      iconPosition="right"
                    >
                      {tier.cta}
                    </PremiumCTAButton>
                  ) : (
                    <MotionLink
                      href="/newsletter"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="btn-base w-full bg-white/[0.05] text-white border border-white/12 hover:bg-white/[0.09] hover:border-white/20"
                    >
                      {tier.cta} <ArrowRight size={12} className="inline ml-1 mb-0.5" />
                    </MotionLink>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAN EXPERIENCES ─────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-3 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold/50" /> Fan Experiences
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              From The <span className="text-gold">Crowd</span>
            </h2>
            <p className="text-white/35 text-sm mt-3 max-w-md mx-auto">
              What it feels like to experience Kiut live.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {fanTestimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-7 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-gold/22 hover:bg-gold/[0.02] transition-all duration-normal group"
              >
                <div className="h-px w-12 bg-gradient-to-r from-gold to-transparent mb-6" />
                <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} size={11} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="font-editorial italic text-white/55 text-sm leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-gold font-bold text-xs border border-gold/20"
                    style={{ background: "rgba(var(--gold-primary-rgb),0.08)" }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-semibold">{t.name}</p>
                    <p className="text-white/30 text-xs flex items-center gap-1">
                      <MapPin size={9} className="text-gold/40 flex-shrink-0" />{t.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOUR STATISTICS ─────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]" style={{ background: "var(--midnight-black)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-3 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold/50" /> By The Numbers
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              Tour <span className="text-gold">Impact</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {tourStatData.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-6 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-gold/20 transition-all duration-normal text-center group"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                <div className="font-display text-4xl md:text-5xl font-bold text-gold leading-none mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-white/25 text-xs">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEXT LIVE CHAPTER — Animated timeline ─────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]" style={{ background: "var(--midnight-black)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Coming</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4 leading-[1.05]">
              The Next<br /><span className="text-gold">Live Chapter</span>
            </h2>
            <p className="text-white/35 text-sm leading-relaxed max-w-md mx-auto">
              Every confirmed and in-motion stop on the Kiut live calendar, in order.
            </p>
          </motion.div>

          {/* Interactive Tour Timeline — one node per real tour stop */}
          <div className="relative">
            {/* Vertical line */}
            <motion.div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/15 to-transparent"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="space-y-10 md:space-y-12">
              {upcomingShows.map((show, i) => {
                const cfg = STATUS_CONFIG[show.status];
                return (
                <motion.div
                  key={show.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Node */}
                  <div className="flex-shrink-0 relative z-10 flex items-center justify-center w-16 h-16 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-0">
                    <motion.div
                      className="w-5 h-5 rounded-full border-2 border-gold bg-midnight-black shadow-[0_0_16px_rgba(var(--gold-primary-rgb),0.35)]"
                      animate={{ boxShadow: ["0 0 12px rgba(var(--gold-primary-rgb),0.2)", "0 0 24px rgba(var(--gold-primary-rgb),0.45)", "0 0 12px rgba(var(--gold-primary-rgb),0.2)"] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
                    />
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"} pl-0 md:pl-0`}>
                    <div className={`inline-block px-6 py-5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-gold/20 hover:bg-gold/[0.025] transition-all duration-normal group text-left ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <div className={`flex items-center gap-2 mb-2 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                        <span
                          className="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest"
                          style={{ color: cfg.color, background: cfg.bg }}
                        >
                          {cfg.label}
                        </span>
                        <span className="text-white/20 text-[10px] font-mono">{show.region}</span>
                      </div>
                      <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white mb-1 group-hover:text-gold transition-colors duration-fast">
                        {show.city}, <span className="text-white/50">{show.country}</span>
                      </h3>
                      <p className="text-white/35 text-sm leading-relaxed">{show.venue} · {show.date}</p>
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA below timeline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <MotionLink
              href="/newsletter"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn-base btn-secondary"
            >
              Stay Informed <Mail size={13} />
            </MotionLink>
          </motion.div>
        </div>
      </section>

      {/* ── WORLD STAGE — Tour Reach ────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]" style={{ background: "var(--midnight-black)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-3 flex items-center justify-center gap-2">
              <Globe size={10} className="text-gold" /> Global Tour
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              World <span className="text-gold">Stage</span>
            </h2>
            <p className="text-white/35 text-sm mt-3 max-w-md mx-auto">
              Kiut's sound knows no borders. Cities worldwide are next on the map.
            </p>
          </motion.div>

          {/* Responsive map canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-xl overflow-hidden border border-white/[0.07]"
            style={{ background: "var(--midnight-black)", minHeight: 300 }}
          >
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-gold/[0.04] blur-[100px]" />
            </div>
            <svg className="absolute inset-0 w-full h-full opacity-[0.055]" viewBox="0 0 800 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              {[60, 110, 160, 210, 260, 310].map((y) => (
                <line key={`h${y}`} x1="0" y1={y} x2="800" y2={y} stroke="white" strokeWidth="0.6" />
              ))}
              {[80, 160, 240, 320, 400, 480, 560, 640, 720].map((x) => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="360" stroke="white" strokeWidth="0.6" />
              ))}
              <line x1="0" y1="180" x2="800" y2="180" stroke="white" strokeWidth="1.2" opacity="0.5" />
            </svg>
            <div className="relative z-10 w-full" style={{ height: 300 }}>
              {tourCities.map((loc, i) => (
                <motion.div
                  key={loc.city}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute group cursor-default"
                  style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: "translate(-50%,-50%)" }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-1.5 w-6 h-6 rounded-full bg-gold/25"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                    />
                    <div className="w-3 h-3 rounded-full bg-gold border-2 border-gold/80 shadow-[0_0_12px_rgba(var(--gold-primary-rgb),0.65)] relative z-10" />
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-normal pointer-events-none whitespace-nowrap z-20">
                    <div className="px-3 py-2 rounded-lg border border-gold/22 text-center" style={{ background: "rgba(0,0,0,0.96)", backdropFilter: "blur(10px)" }}>
                      <p className="text-white text-xs font-bold">{loc.city}</p>
                      <p className="text-gold/55 text-[9px] uppercase tracking-widest">{loc.country}</p>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                      style={{ borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "4px solid rgba(var(--gold-primary-rgb),0.22)" }} />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="relative z-10 px-8 py-4 flex items-center justify-between border-t border-white/[0.06]"
              style={{ background: "rgba(0,0,0,0.50)", backdropFilter: "blur(8px)" }}>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_8px_rgba(var(--gold-primary-rgb),0.65)]" />
                <span className="text-white/45 text-xs">Future Tour Locations</span>
              </div>
              <span className="text-white/22 text-xs font-mono">{tourCities.length} cities · Worldwide</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BOOKING ─────────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4 flex items-center gap-2">
                <Globe size={10} className="text-gold" /> Bookings &amp; Events
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-5 leading-[1.05]">
                Bring Kiut<br /><span className="text-gold">To Your City</span>
              </h2>
              <p className="text-white/45 text-base leading-relaxed mb-3 max-w-md">
                Invite promoters, festivals, and venues to book Kiut for live performances.
              </p>
              <p className="text-white/28 text-sm leading-relaxed mb-10 max-w-md">
                From intimate club nights to international festival stages — if you have the stage, Kiut brings the energy. Submit your enquiry and the team will be in touch directly.
              </p>
              <PremiumCTAButton as="link" href="/contact" icon={<Mail size={13} />} iconPosition="right">
                Book Kiut
              </PremiumCTAButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-3"
            >
              {tourCities.map((loc, i) => (
                <motion.div
                  key={loc.city}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="px-5 py-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-gold/22 hover:bg-gold/[0.025] transition-all duration-normal group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={9} className="text-gold/55 group-hover:text-gold transition-colors flex-shrink-0" />
                    <p className="text-white/70 text-sm font-bold group-hover:text-white transition-colors duration-fast">{loc.city}</p>
                  </div>
                  <p className="text-white/30 text-xs pl-4">{loc.country}</p>
                  <p className="text-gold/35 text-[9px] font-bold uppercase tracking-widest mt-1 pl-4">{loc.region}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TOUR FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-3 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold/50" /> FAQs
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              Tour <span className="text-gold">Questions</span>
            </h2>
          </motion.div>

          <TourFAQAccordion />
        </div>
      </section>

      {/* ── NEVER MISS A SHOW ─────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-xl border border-gold/18 overflow-hidden text-center p-12 md:p-16"
            style={{ background: "linear-gradient(160deg, rgba(var(--gold-primary-rgb),0.05) 0%, var(--midnight-black) 50%, rgba(var(--gold-primary-rgb),0.03) 100%)" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[160px] bg-gold/7 blur-[90px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-5">Stay Close</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4 leading-[1.1]">
                Never Miss<br />a <span className="text-gold">Show</span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                Tour announcements, presale codes, and VIP drops — first to your inbox, before anywhere else.
              </p>
              <PremiumCTAButton as="link" href="/newsletter" icon={<Mail size={13} />} iconPosition="right">
                Subscribe to Newsletter
              </PremiumCTAButton>
              <p className="text-white/18 text-[10px] font-light tracking-[0.22em] mt-5">
                Free · No spam · Unsubscribe anytime
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {lightboxItem && <GalleryLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />}
      <SiteFooter />
    </div>
  );
}
