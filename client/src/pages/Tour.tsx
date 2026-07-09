import React from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, MapPin, Calendar, Star, Ticket, Users, Shield,
  ChevronRight, Mail, Play, Globe, Clock, Mic2, Film, Tv2,
} from "lucide-react";
import { Link } from "wouter";
import SiteFooter from "../components/SiteFooter";
import { useRef, useState } from "react";

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

// ─── Past Shows archive ───────────────────────────────────────────────────────
const pastShows: { year: string; events: { city: string; country: string; venue: string; date: string }[] }[] = [
  {
    year: "2025",
    events: [
      { city: "London",    country: "UK", venue: "Jazz Café",           date: "Nov 14" },
      { city: "Lagos",     country: "NG", venue: "Terra Kulture",        date: "Sep 28" },
      { city: "New York",  country: "US", venue: "SOB's",                date: "Aug 03" },
      { city: "Toronto",   country: "CA", venue: "Monarch Tavern",       date: "Jun 19" },
      { city: "Amsterdam", country: "NL", venue: "Bitterzoet",           date: "Apr 11" },
      { city: "Accra",     country: "GH", venue: "Kempinski Hotel",      date: "Feb 07" },
    ],
  },
  {
    year: "2024",
    events: [
      { city: "London",    country: "UK", venue: "Servant Jazz Quarters", date: "Dec 05" },
      { city: "Lagos",     country: "NG", venue: "Quilox",                date: "Oct 19" },
      { city: "Paris",     country: "FR", venue: "New Morning",           date: "Aug 22" },
      { city: "New York",  country: "US", venue: "Baby's All Right",      date: "May 30" },
    ],
  },
];

// ─── VIP perks (future-ready copy) ───────────────────────────────────────────
const vipPerks = [
  { icon: Ticket, title: "Priority Concert Access",     desc: "When live events are announced, VIP members receive early access before general public sale." },
  { icon: Users,  title: "Meet & Greet Opportunities",  desc: "Exclusive pre-show sessions with Kiut — intimate, personal, and unforgettable." },
  { icon: Shield, title: "Early Ticket Notifications",  desc: "Be first in line. Get alerts the moment new tour dates and tickets go live." },
  { icon: Star,   title: "Private Fan Experiences",     desc: "Access to invitation-only events, studio sessions, and special appearances." },
];

// ─── "Next Live Chapter" timeline ────────────────────────────────────────────
const roadmapSteps = [
  { label: "Tour Planning",          sub: "Mapping cities and venues worldwide"        },
  { label: "Festival Bookings",      sub: "Curating the right stages and experiences"  },
  { label: "Special Appearances",    sub: "Intimate shows and collaborative events"     },
  { label: "Future Live Experiences",sub: "The full Kiut live era — coming soon"        },
];

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
      className="group flex flex-col rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0c0c0e] hover:border-gold/28 hover:shadow-[0_16px_48px_rgba(212,175,55,0.10)] transition-all duration-300 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden bg-[#090909] flex-shrink-0">
        {!imgFailed ? (
          <img
            src={`https://i.ytimg.com/vi/${perf.youtubeId}/hqdefault.jpg`}
            alt={perf.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: "linear-gradient(145deg,#0a0a0a 0%,#110d1a 100%)" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.18)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <polygon points="4,3 13,8 4,13" fill="#D4AF37" opacity="0.65" />
              </svg>
            </div>
            <span style={{ color: "rgba(212,175,55,0.45)", fontSize: 8, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>
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
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.7)]"
            style={{ background: "rgba(212,175,55,0.92)" }}>
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
        <p className="text-white/80 text-sm font-medium group-hover:text-gold transition-colors duration-200 truncate pr-3">
          {perf.title}
        </p>
        <ArrowRight size={13} className="text-white/20 group-hover:text-gold transition-colors duration-200 flex-shrink-0" />
      </div>
    </motion.a>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Tour() {
  const [showAllPast, setShowAllPast] = useState(false);
  const featuredRef = useRef<HTMLElement>(null);

  function scrollToFeatured() {
    featuredRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-midnight text-white">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/images/Hero1_1767873472478.webp"
            alt="Kiut Live Performance"
            className="w-full h-full object-cover object-top"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-midnight" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/25" />
          <div className="absolute bottom-0 left-0 w-[700px] h-[350px] bg-gold/7 blur-[130px] rounded-full pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 w-full">
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

            <p className="text-white/55 text-lg font-light max-w-md leading-relaxed mb-4">
              There are currently no announced live performances.
            </p>
            <p className="text-white/35 text-sm font-light max-w-lg leading-relaxed mb-10">
              Join the Kiut community to receive exclusive updates about future concerts, special appearances, and unforgettable live experiences.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <MotionLink
                href="/newsletter"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gold text-midnight font-bold uppercase tracking-widest text-[11px] shadow-[var(--glow-gold)] hover:shadow-[var(--glow-gold-hover)] transition-shadow duration-300"
              >
                Notify Me <Mail size={13} />
              </MotionLink>
              <motion.button
                onClick={scrollToFeatured}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white/[0.06] border border-white/15 text-white font-bold uppercase tracking-widest text-[11px] backdrop-blur-sm hover:border-gold/40 hover:text-gold transition-all duration-300"
              >
                Watch Live Performances <Play size={13} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 right-8 flex flex-col items-center gap-1 opacity-35"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* ── UPCOMING SHOWS — Premium Empty State ──────────────────────────── */}
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
          </motion.div>

          {/* Empty state */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl border border-white/[0.07] overflow-hidden"
            style={{ background: "#09090c" }}
          >
            {/* Animated background orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-gold/[0.04] blur-[80px]"
                animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-0 right-0 w-[300px] h-[200px] rounded-full bg-gold/[0.03] blur-[60px]"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              />
            </div>

            {/* Decorative top border */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

            <div className="relative z-10 py-20 md:py-28 px-8 flex flex-col items-center text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 border border-gold/20"
                style={{ background: "rgba(212,175,55,0.06)" }}
              >
                <Ticket className="w-9 h-9 text-gold/60" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4"
              >
                Stay Tuned
              </motion.p>

              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-4"
              >
                No Live Dates Announced
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-white/40 text-sm leading-relaxed max-w-md mb-10"
              >
                New performances are currently being planned. Join the mailing list to receive priority access as soon as new events are announced.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <MotionLink
                  href="/newsletter"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-gold text-midnight font-bold uppercase tracking-widest text-[11px] shadow-[var(--glow-gold)] hover:shadow-[var(--glow-gold-hover)] transition-shadow duration-300"
                >
                  Join the Mailing List <Mail size={13} />
                </MotionLink>
              </motion.div>

              {/* Subtle animated dots */}
              <div className="flex items-center gap-3 mt-12">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="rounded-full bg-gold/20"
                    style={{ width: i === 2 ? 24 : 6, height: 6 }}
                    animate={{ opacity: [0.25, 0.7, 0.25] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </div>

            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PERFORMANCES ─────────────────────────────────────────── */}
      <section ref={featuredRef} className="py-24 border-t border-white/[0.05]" style={{ background: "#07070a" }}>
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
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/12 text-white/50 hover:text-gold hover:border-gold/30 text-[11px] font-bold uppercase tracking-widest transition-all duration-200"
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

      {/* ── VIP EXPERIENCE ────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]">
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
              <MotionLink
                href="/newsletter"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gold text-midnight font-bold uppercase tracking-widest text-[11px] shadow-[var(--glow-gold)] hover:shadow-[var(--glow-gold-hover)] transition-shadow duration-300"
              >
                Register VIP Interest <ChevronRight size={14} />
              </MotionLink>
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
                    className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-gold/25 hover:bg-gold/[0.03] transition-all duration-300 group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border border-gold/20 group-hover:border-gold/40 transition-colors duration-300"
                      style={{ background: "rgba(212,175,55,0.06)" }}
                    >
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-display text-sm font-bold uppercase tracking-tight text-white mb-2 group-hover:text-gold transition-colors duration-200 leading-snug">{perk.title}</h3>
                    <p className="text-white/38 text-[13px] leading-relaxed">{perk.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAN CARD — Regular vs Premium ─────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]" style={{ background: "#06060a" }}>
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
                className={`relative rounded-3xl border overflow-hidden p-8 md:p-10 flex flex-col ${
                  tier.isPremium
                    ? "border-gold/35 shadow-[0_0_60px_rgba(212,175,55,0.10),0_20px_60px_rgba(0,0,0,0.5)]"
                    : "border-white/[0.09]"
                }`}
                style={{
                  background: tier.isPremium
                    ? "linear-gradient(145deg, rgba(212,175,55,0.07) 0%, #07070a 50%, rgba(212,175,55,0.04) 100%)"
                    : "#09090d",
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
                            <path d="M1 3L2.7 5L6 1" stroke={tier.isPremium ? "#D4AF37" : "rgba(255,255,255,0.4)"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {perk}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <MotionLink
                    href="/newsletter"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full text-center py-4 rounded-full font-bold uppercase tracking-widest text-[11px] transition-all duration-300 ${
                      tier.isPremium
                        ? "bg-gold text-midnight shadow-[var(--glow-gold)] hover:shadow-[var(--glow-gold-hover)]"
                        : "bg-white/[0.05] text-white border border-white/12 hover:bg-white/[0.09] hover:border-white/20"
                    }`}
                  >
                    {tier.cta} <ArrowRight size={12} className="inline ml-1 mb-0.5" />
                  </MotionLink>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAST SHOWS ────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <p className="text-white/28 text-[10px] font-bold tracking-[0.4em] uppercase mb-3">Archive</p>
            <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-white">
              Past <span className="text-gold">Shows</span>
            </h2>
            <p className="text-white/35 text-sm mt-3 max-w-md leading-relaxed">
              A record of where Kiut has taken the stage.
            </p>
          </motion.div>

          <div className="space-y-10">
            {pastShows.slice(0, showAllPast ? pastShows.length : 1).map((group, gi) => (
              <motion.div
                key={group.year}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: gi * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-display text-3xl font-bold text-white/12">{group.year}</span>
                  <div className="flex-1 h-px bg-white/[0.05]" />
                  <span className="text-white/20 text-[10px] font-medium tracking-widest uppercase">{group.events.length} shows</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {group.events.map((ev, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex items-center gap-4 px-5 py-4 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:border-white/[0.09] hover:bg-white/[0.03] transition-all duration-250 group"
                    >
                      {/* Date pill */}
                      <div className="flex-shrink-0 w-11 text-center">
                        <span className="text-white/22 text-[10px] font-medium tracking-wide leading-none">{ev.date}</span>
                      </div>
                      <div className="w-px h-8 bg-white/[0.06] flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white/70 text-sm font-medium group-hover:text-white transition-colors duration-200 truncate">
                          {ev.city}
                          <span className="text-white/28 text-xs font-normal ml-1.5">{ev.country}</span>
                        </p>
                        <p className="text-white/22 text-[11px] mt-0.5 flex items-center gap-1 truncate">
                          <MapPin size={9} className="flex-shrink-0" /> {ev.venue}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {!showAllPast && pastShows.length > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 text-center"
              >
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowAllPast(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.09] text-white/35 hover:text-white hover:border-white/22 text-[11px] font-bold uppercase tracking-widest transition-all duration-200"
                >
                  Show All Years <ChevronRight size={13} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── NEXT LIVE CHAPTER — Animated timeline ─────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]" style={{ background: "#07070b" }}>
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
              The stage is being set. Here's what's in motion.
            </p>
          </motion.div>

          {/* Timeline */}
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
              {roadmapSteps.map((step, i) => (
                <motion.div
                  key={step.label}
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
                      className="w-5 h-5 rounded-full border-2 border-gold bg-[#07070b] shadow-[0_0_16px_rgba(212,175,55,0.35)]"
                      animate={{ boxShadow: ["0 0 12px rgba(212,175,55,0.2)", "0 0 24px rgba(212,175,55,0.45)", "0 0 12px rgba(212,175,55,0.2)"] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
                    />
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"} pl-0 md:pl-0`}>
                    <div className="inline-block px-6 py-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-gold/20 hover:bg-gold/[0.025] transition-all duration-300 group">
                      <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white mb-1 group-hover:text-gold transition-colors duration-200">
                        {step.label}
                      </h3>
                      <p className="text-white/35 text-sm leading-relaxed">{step.sub}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
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
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-gold/30 text-gold bg-gold/[0.06] hover:bg-gold/10 font-bold uppercase tracking-widest text-[11px] transition-all duration-200"
            >
              Stay Informed <Mail size={13} />
            </MotionLink>
          </motion.div>
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
            className="relative rounded-3xl border border-gold/18 overflow-hidden text-center p-12 md:p-16"
            style={{ background: "linear-gradient(160deg, rgba(212,175,55,0.05) 0%, #08080d 50%, rgba(212,175,55,0.03) 100%)" }}
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
              <MotionLink
                href="/newsletter"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-gold text-midnight font-bold uppercase tracking-widest text-[11px] shadow-[var(--glow-gold)] hover:shadow-[var(--glow-gold-hover)] transition-shadow duration-300"
              >
                Subscribe to Newsletter <Mail size={13} />
              </MotionLink>
              <p className="text-white/18 text-[10px] font-light tracking-[0.22em] mt-5">
                Free · No spam · Unsubscribe anytime
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
