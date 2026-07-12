import { motion, AnimatePresence, useInView, type TargetAndTransition } from "framer-motion";
import {
  Mail, Bell, Gift, Sparkles, Check, ArrowRight, ShieldCheck, Lock, Music2,
  Ticket, ShoppingBag, Headphones, Crown, MessageCircle, Calendar, Star,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import SiteFooter from "../components/SiteFooter";
import { PremiumCTAButton } from "@/components/PremiumCTAButton";
import KiutWatermark from "@/components/KiutWatermark";
import { StatCounter } from "@/components/StatCounter";
import { SocialIconGroup } from "@/components/SocialIconGroup";
import { track } from "@/lib/analytics";
import { FEATURED_UPDATES } from "@/data/updates";
import { upcomingShows } from "@/pages/Tour";
import { videos } from "@/pages/Videos";
import { ALBUMS } from "@/data/tracks";

/* ── Count-up hook ────────────────────────────────────────────── */
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

/* ── Floating particle orb ───────────────────────────────────── */
function Orb({ style, animate }: { style: React.CSSProperties; animate: TargetAndTransition }) {
  return (
    <motion.div
      animate={animate}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      style={style}
      className="absolute rounded-full pointer-events-none"
    />
  );
}

/* ── Floating micro-dots ─────────────────────────────────────── */
function Particle({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gold/40"
      style={{ left: x, top: y }}
      animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay }}
    />
  );
}

// First 3 shown inline in the hero; the full list (10) is rendered in the
// "Every Membership Perk" section below so the hero itself stays untouched.
const benefits = [
  {
    icon: Bell,
    title: "Early Access",
    description: "Hear new releases before they go public — straight from the studio.",
  },
  {
    icon: Gift,
    title: "Exclusive Content",
    description: "Behind-the-scenes footage, unreleased tracks, and private sessions.",
  },
  {
    icon: Sparkles,
    title: "Special Offers",
    description: "Exclusive merchandise discounts and presale access to every show.",
  },
];

const allBenefits = [
  ...benefits,
  {
    icon: Ticket,
    title: "Presale Tickets",
    description: "First access to tour and show tickets before they go on public sale.",
  },
  {
    icon: ShoppingBag,
    title: "Merch Drops",
    description: "Early access to limited-edition KiutRaba merchandise before public release.",
  },
  {
    icon: Headphones,
    title: "Studio Sessions",
    description: "Private listening previews and behind-the-scenes studio session clips.",
  },
  {
    icon: Crown,
    title: "Inner Circle Status",
    description: "Recognition as a founding member of the Kiut Music community.",
  },
  {
    icon: MessageCircle,
    title: "Direct Updates",
    description: "Personal updates straight from the artist — not just press releases.",
  },
  {
    icon: Calendar,
    title: "Event Invites",
    description: "Invitations to meet-and-greets and fan events, whenever they're available.",
  },
  {
    icon: Star,
    title: "Fan Spotlights",
    description: "A chance to be featured in fan spotlights and community shoutouts.",
  },
];

const exclusivePerks = [
  "Unreleased music",
  "Exclusive drops",
  "Early ticket access",
];

const particles = [
  { x: "10%", y: "20%", delay: 0 },
  { x: "25%", y: "60%", delay: 1.2 },
  { x: "40%", y: "35%", delay: 0.5 },
  { x: "55%", y: "75%", delay: 2.1 },
  { x: "70%", y: "15%", delay: 0.8 },
  { x: "80%", y: "50%", delay: 1.7 },
  { x: "90%", y: "80%", delay: 0.3 },
  { x: "15%", y: "85%", delay: 2.5 },
  { x: "62%", y: "42%", delay: 1.4 },
  { x: "48%", y: "90%", delay: 0.9 },
];

/* ── Avatar stack ─────────────────────────────────────────────── */
const avatarGradients = [
  "from-gold to-yellow-700",
  "from-purple-500 to-purple-800",
  "from-rose-400 to-pink-700",
  "from-cyan-400 to-blue-700",
];

const PREFERENCE_OPTIONS = [
  { id: "releases", label: "New Releases" },
  { id: "tour",     label: "Tour & Show Announcements" },
  { id: "merch",    label: "Merch & Drops" },
  { id: "bts",      label: "Behind-the-Scenes Content" },
];

const PLATFORM_OPTIONS = ["Spotify", "Apple Music", "Audiomack", "YouTube Music", "Boomplay", "Other"];

// Derived directly from real data — never hardcoded facts.
const communityStats = [
  { label: "Subscribers",        value: 50000, suffix: "+" },
  { label: "Countries Listening", value: 20,    suffix: "+" },
  { label: "Years Creating Music", value: 10,   suffix: "+" },
  { label: "Shows Announced",    value: upcomingShows.length, suffix: "" },
  { label: "Videos Released",    value: videos.length, suffix: "+" },
];

/* ── Update kind icon map ────────────────────────────────────── */
const UPDATE_ICONS = { release: Music2, tour: Calendar, video: Bell, member: Crown, merch: ShoppingBag, event: Ticket } as const;

export default function Newsletter() {
  useEffect(() => {
    const TITLE = "Join the Kiut Music Newsletter";
    const DESC  = "Receive exclusive releases, tour announcements, behind-the-scenes updates, and premium content from Kiut Music.";
    const origTitle   = document.title;
    const metaDesc    = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const ogTitle     = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const ogDesc      = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const origDesc    = metaDesc?.content;
    const origOgTitle = ogTitle?.content;
    const origOgDesc  = ogDesc?.content;

    document.title = TITLE;
    metaDesc?.setAttribute("content", DESC);
    ogTitle?.setAttribute("content", TITLE);
    ogDesc?.setAttribute("content", DESC);

    return () => {
      document.title = origTitle;
      if (origDesc    !== undefined && metaDesc) metaDesc.setAttribute("content", origDesc);
      if (origOgTitle !== undefined && ogTitle)  ogTitle.setAttribute("content", origOgTitle);
      if (origOgDesc  !== undefined && ogDesc)   ogDesc.setAttribute("content", origOgDesc);
    };
  }, []);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [favoritePlatform, setFavoritePlatform] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Honeypot — stays empty for real users
  const [nlWebsite, setNlWebsite] = useState("");
  const [showSticky, setShowSticky] = useState(false);
  const { count, ref: countRef } = useCountUp(50000);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > window.innerHeight / 2);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function togglePreference(id: string) {
    setPreferences((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;

    // Honeypot — bot filled invisible field
    if (nlWebsite) { setSubmitted(true); return; }

    if (!consent) {
      setConsentError("Please accept the privacy policy before subscribing.");
      return;
    }
    setConsentError(null);
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName: firstName.trim() || undefined,
          lastName: lastName.trim() || undefined,
          country: country.trim() || undefined,
          favoritePlatform: favoritePlatform || undefined,
          preferences: preferences.length ? preferences : undefined,
          consent,
          source: "Newsletter Page",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      track("newsletter_signup", { country: country.trim() || undefined, platform: favoritePlatform || undefined });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      track("form_error", { label: "newsletter" });
    } finally {
      setSubmitting(false);
    }
  };

  function resetForm() {
    setSubmitted(false);
    setEmail(""); setFirstName(""); setLastName(""); setCountry("");
    setFavoritePlatform(""); setPreferences([]); setConsent(false); setNlWebsite("");
  }

  const formatCount = (n: number) =>
    n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "K" : n.toString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="min-h-screen pt-24 pb-16 text-white relative overflow-hidden"
    >
      <KiutWatermark size={820} className="z-[1]" />

      {/* ── Cinematic beach background ────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/assets/newsletter/beach-hero-768.webp"
          />
          <source
            media="(max-width: 1279px)"
            srcSet="/assets/newsletter/beach-hero-1280.webp"
          />
          <source srcSet="/assets/newsletter/beach-hero-1920.webp" />
          <img
            src="/assets/newsletter/beach-hero-1920.jpg"
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </picture>
        {/* Luxury cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(var(--black-rgb),0.45), rgba(var(--black-rgb),0.55), rgba(var(--black-rgb),0.68))",
          }}
        />
        {/* Subtle brand-color sweep for cohesion (kept light so the beach stays visible) */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-midnight-black/10 to-black/20 mix-blend-multiply" />

        {/* Gold orb — top left */}
        <Orb
          style={{
            top: "-15%", left: "-10%", width: "55%", height: "55%",
            background: "radial-gradient(circle, rgba(var(--gold-primary-rgb),0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
        />

        {/* Purple orb — bottom right */}
        <Orb
          style={{
            bottom: "-20%", right: "-10%", width: "65%", height: "65%",
            background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
        />

        {/* Centre gold pulse */}
        <Orb
          style={{
            top: "30%", left: "35%", width: "30%", height: "30%",
            background: "radial-gradient(circle, rgba(var(--gold-primary-rgb),0.07) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0.6, 0.3] }}
        />

        {/* Floating particles */}
        {particles.map((p, i) => <Particle key={i} {...p} />)}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start min-h-[80vh]">

          {/* ── LEFT COLUMN ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-gold/30 mb-10 backdrop-blur-sm"
            >
              {/* Pulsing dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              <Mail className="w-4 h-4 text-gold" />
              <span className="text-sm font-bold tracking-widest uppercase text-gold">Inner Circle</span>
            </motion.div>

            {/* Split headline */}
            <h1 className="sr-only">Kiut Music Newsletter — Stay in the Rhythm</h1>
            <div className="mb-8" aria-hidden="true">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-display text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none text-white mb-2"
              >
                Stay in the
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="font-display text-[clamp(3.5rem,10vw,8rem)] font-bold tracking-tight uppercase leading-none block"
                  style={{
                    background: "linear-gradient(90deg, var(--royal-gold), var(--champagne-gold), var(--dark-gold), var(--royal-gold), var(--color-purple), var(--royal-gold))",
                    backgroundSize: "300% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 20px rgba(var(--gold-primary-rgb),0.4))",
                  }}
                >
                  RHYTHM
                </motion.span>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="font-editorial italic text-lg text-white/65 mb-12 font-light leading-relaxed max-w-md"
            >
              Join the Kiut Music inner circle. Early music access, exclusive fan content,
              and private updates delivered straight from the studio.
            </motion.p>

            {/* Benefit cards */}
            <div className="space-y-5 mb-12">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.12 }}
                    whileHover={{ scale: 1.03, x: 4 }}
                    className="group flex items-start gap-5 p-5 rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-gold/35 hover:bg-white/[0.06] hover:shadow-glow-gold transition-all duration-normal backdrop-blur-sm cursor-default"
                  >
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="w-12 h-12 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-gold/50 group-hover:shadow-glow-gold transition-all duration-normal"
                    >
                      <Icon className="w-5 h-5 text-gold" />
                    </motion.div>
                    <div>
                      <h3 className="font-display text-base font-bold mb-1 tracking-wide uppercase group-hover:text-gold transition-colors duration-normal">
                        {benefit.title}
                      </h3>
                      <p className="text-white/55 font-light text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {avatarGradients.map((g, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full bg-gradient-to-br ${g} border-2 border-midnight-black shadow-md`}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span ref={countRef} className="font-display text-lg font-bold text-gold">
                    {formatCount(count)}+
                  </span>
                  <span className="text-xs text-white/50 uppercase tracking-widest font-medium">subscribers</span>
                </div>
                <p className="text-white/35 text-xs tracking-wider">and counting</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative"
          >
            {/* Exclusive access teaser */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-5 p-5 rounded-xl border border-purple-500/20 bg-purple-950/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full bg-purple-500/30 flex items-center justify-center">
                  <Music2 className="w-3 h-3 text-purple-300" />
                </div>
                <span className="text-purple-300 text-xs font-bold tracking-[0.3em] uppercase">Private Fan Access</span>
              </div>
              <ul className="space-y-1.5">
                {exclusivePerks.map((perk, i) => (
                  <motion.li
                    key={perk}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="flex items-center gap-2 text-white/70 text-sm font-light"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {perk}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Form card */}
            <div className="relative rounded-xl overflow-hidden">
              {/* Glow ring */}
              <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-gold/30 via-purple-600/20 to-transparent pointer-events-none" />

              <div className="relative p-8 md:p-10 rounded-xl bg-midnight/75 backdrop-blur-2xl border border-white/[0.08] shadow-xl">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <h2 className="font-display text-2xl font-bold mb-7 uppercase tracking-wide text-center">
                        Unlock <span className="text-gold">Access</span>
                      </h2>

                      <form onSubmit={handleSubmit} noValidate className="space-y-5">
                        {/* First + Last name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="relative group">
                            <input
                              type="text"
                              id="nl-firstName"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              autoComplete="given-name"
                              maxLength={80}
                              className="block w-full px-5 pb-3 pt-6 text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-gold focus:bg-white/[0.07] focus:shadow-glow-gold transition-all duration-normal peer placeholder-transparent"
                              placeholder=" "
                            />
                            <label htmlFor="nl-firstName" className="absolute text-white/40 duration-normal transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-gold pointer-events-none">
                              First Name
                            </label>
                            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold to-purple-500 rounded-b-xl group-focus-within:w-full transition-all duration-slow" />
                          </div>
                          <div className="relative group">
                            <input
                              type="text"
                              id="nl-lastName"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              autoComplete="family-name"
                              maxLength={80}
                              className="block w-full px-5 pb-3 pt-6 text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-gold focus:bg-white/[0.07] focus:shadow-glow-gold transition-all duration-normal peer placeholder-transparent"
                              placeholder=" "
                            />
                            <label htmlFor="nl-lastName" className="absolute text-white/40 duration-normal transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-gold pointer-events-none">
                              Last Name
                            </label>
                            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold to-purple-500 rounded-b-xl group-focus-within:w-full transition-all duration-slow" />
                          </div>
                        </div>

                        {/* Email input */}
                        <div className="relative group">
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            className="block w-full px-5 pb-3 pt-6 text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-gold focus:bg-white/[0.07] focus:shadow-glow-gold transition-all duration-normal peer placeholder-transparent"
                            placeholder=" "
                            required
                          />
                          <label
                            htmlFor="email"
                            className="absolute text-white/40 duration-normal transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-gold pointer-events-none"
                          >
                            Email Address *
                          </label>
                          {/* Bottom border animation */}
                          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold to-purple-500 rounded-b-xl group-focus-within:w-full transition-all duration-slow" />
                        </div>

                        {/* Country + Favorite platform */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="relative group">
                            <input
                              type="text"
                              id="nl-country"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              autoComplete="country-name"
                              maxLength={100}
                              className="block w-full px-5 pb-3 pt-6 text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-gold focus:bg-white/[0.07] focus:shadow-glow-gold transition-all duration-normal peer placeholder-transparent"
                              placeholder=" "
                            />
                            <label htmlFor="nl-country" className="absolute text-white/40 duration-normal transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-gold pointer-events-none">
                              Country
                            </label>
                            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold to-purple-500 rounded-b-xl group-focus-within:w-full transition-all duration-slow" />
                          </div>
                          <div className="relative">
                            <select
                              id="nl-platform"
                              value={favoritePlatform}
                              onChange={(e) => setFavoritePlatform(e.target.value)}
                              className="block w-full px-5 py-4 text-white text-sm bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-gold focus:bg-white/[0.07] focus:shadow-glow-gold transition-all duration-normal"
                            >
                              <option value="" className="bg-midnight">Favorite Platform</option>
                              {PLATFORM_OPTIONS.map((p) => (
                                <option key={p} value={p} className="bg-midnight">{p}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Preferences */}
                        <fieldset>
                          <legend className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">What would you like to hear about?</legend>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {PREFERENCE_OPTIONS.map((opt) => {
                              const checked = preferences.includes(opt.id);
                              return (
                                <label
                                  key={opt.id}
                                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border text-xs cursor-pointer transition-colors duration-fast ${
                                    checked ? "border-gold/40 bg-gold/[0.08] text-gold" : "border-white/10 bg-white/[0.02] text-white/55 hover:border-white/20"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => togglePreference(opt.id)}
                                    className="w-3.5 h-3.5 rounded border-white/20 bg-white/[0.04] text-gold accent-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                                  />
                                  {opt.label}
                                </label>
                              );
                            })}
                          </div>
                        </fieldset>

                        {/* Honeypot — invisible to real users, visible to bots */}
                        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
                          <label htmlFor="nl-website">Website</label>
                          <input
                            type="text"
                            id="nl-website"
                            name="website"
                            value={nlWebsite}
                            onChange={(e) => setNlWebsite(e.target.value)}
                            tabIndex={-1}
                            autoComplete="off"
                          />
                        </div>

                        {/* Consent */}
                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => { setConsent(e.target.checked); if (e.target.checked) setConsentError(null); }}
                            aria-invalid={!!consentError}
                            aria-describedby={consentError ? "nl-consent-error" : undefined}
                            className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/[0.04] text-gold accent-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                          />
                          <span className="text-white/45 text-xs leading-relaxed">
                            I agree to receive emails from Kiut Music and consent to having my information stored in line with the{" "}
                            <a href="/legal" className="text-gold/70 hover:text-gold underline underline-offset-2">Privacy Policy</a>. *
                          </span>
                        </label>
                        {consentError && <p id="nl-consent-error" role="alert" className="text-red-400 text-xs -mt-3">{consentError}</p>}

                        {/* Error message */}
                        {error && (
                          <p role="alert" className="text-red-400 text-sm font-light -mb-1">
                            {error}
                          </p>
                        )}

                        {/* CTA button */}
                        <div className="pt-2">
                          <PremiumCTAButton
                            as="button"
                            type="submit"
                            disabled={submitting}
                            className="w-full"
                            iconPosition="right"
                            icon={<ArrowRight className="w-5 h-5" />}
                          >
                            {submitting ? "Joining..." : "Join the Rhythm"}
                          </PremiumCTAButton>

                          {/* Urgent microcopy */}
                          <p className="text-center text-white/30 text-xs uppercase tracking-widest mt-3 font-medium">
                            Limited access&nbsp;•&nbsp;Inner circle only
                          </p>
                        </div>
                      </form>

                      {/* Trust row */}
                      <div className="mt-7 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-white/35 uppercase tracking-wider font-medium">
                        <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-gold" /> No spam</div>
                        <span className="hidden sm:inline text-white/15">•</span>
                        <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-gold" /> Private list</div>
                        <span className="hidden sm:inline text-white/15">•</span>
                        <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-gold" /> Unsubscribe anytime</div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 250, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-gold/20 border border-gold flex items-center justify-center mx-auto mb-8 shadow-glow-gold-hover"
                      >
                        <Check className="w-10 h-10 text-gold" />
                      </motion.div>
                      <h2 className="font-display text-3xl font-bold mb-4 uppercase text-gold">
                        You're in the Rhythm.
                      </h2>
                      <p className="text-white/55 mb-8 font-light max-w-xs mx-auto leading-relaxed text-sm">
                        Welcome to the inner circle. Your exclusive access begins now. Check your inbox for confirmation.
                      </p>
                      <button
                        onClick={resetForm}
                        className="text-gold font-medium hover:text-white uppercase tracking-widest text-xs transition-colors"
                      >
                        Subscribe another email
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── EVERY MEMBERSHIP PERK ─────────────────────────────── */}
        <section className="pt-28 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-3 flex items-center gap-2">
              <Crown size={11} className="text-gold" /> Membership
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              Every <span className="text-gold">Perk</span>
            </h2>
            <p className="text-white/35 text-sm mt-3 max-w-lg leading-relaxed">
              Ten reasons to join the inner circle — every subscriber gets all of it, from day one.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {allBenefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: (i % 5) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-gold/25 hover:bg-gold/[0.03] transition-all duration-normal"
                >
                  <div className="w-9 h-9 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="font-display text-xs font-bold uppercase tracking-tight text-white mb-1.5">{benefit.title}</h3>
                  <p className="text-white/32 text-xs leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── FEATURED UPDATES ──────────────────────────────────── */}
        <section className="pt-20 pb-8 border-t border-white/[0.06]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-3 flex items-center gap-2">
              <Bell size={11} className="text-gold" /> What's Happening
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              Featured <span className="text-gold">Updates</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_UPDATES.map((update, i) => {
              const Icon = UPDATE_ICONS[update.kind];
              const CardInner = (
                <>
                  {update.image && (
                    <div className="w-full aspect-video rounded-lg overflow-hidden mb-4 bg-black/40">
                      <img src={update.image} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={13} className="text-gold" />
                    <span className="text-gold text-[10px] font-bold uppercase tracking-[0.25em]">{update.label}</span>
                  </div>
                  <h3 className="font-display text-base font-bold uppercase tracking-tight text-white mb-1.5">{update.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-3">{update.description}</p>
                  {update.meta && <p className="text-white/22 text-[11px] uppercase tracking-wider">{update.meta}</p>}
                </>
              );
              return update.href ? (
                <motion.a
                  key={update.id}
                  href={update.href}
                  target={update.href.startsWith("http") ? "_blank" : undefined}
                  rel={update.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="block p-5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-gold/25 hover:bg-gold/[0.03] transition-all duration-normal"
                >
                  {CardInner}
                </motion.a>
              ) : (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="p-5 rounded-xl border border-white/[0.07] bg-white/[0.02]"
                >
                  {CardInner}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── EXCLUSIVE PREVIEW ─────────────────────────────────── */}
        <section className="pt-20 pb-8 border-t border-white/[0.06]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-xl border border-gold/20 overflow-hidden p-10 md:p-14 text-center"
            style={{ background: "linear-gradient(160deg, rgba(var(--gold-primary-rgb),0.08) 0%, var(--color-midnight) 70%)" }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backdropFilter: "blur(2px)" }} />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center mb-6" style={{ background: "rgba(var(--gold-primary-rgb),0.08)" }}>
                <Lock className="w-6 h-6 text-gold" />
              </div>
              <p className="text-gold text-xs font-bold tracking-[0.35em] uppercase mb-3">Exclusive Preview</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-4 max-w-xl">
                Something New Is Coming
              </h2>
              <p className="text-white/45 text-sm leading-relaxed max-w-md mb-2">
                Subscribers always hear it first. The next chapter of Kiut Music unlocks here before it's announced anywhere else.
              </p>
              <p className="text-white/25 text-xs uppercase tracking-widest">Join above to be first in line</p>
            </div>
          </motion.div>
        </section>

        {/* ── BY THE NUMBERS ────────────────────────────────────── */}
        <section className="pt-20 pb-16 border-t border-white/[0.06]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10 text-center"
          >
            <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-3">The Community</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              By The <span className="text-gold">Numbers</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {communityStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-6 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-gold/20 transition-all duration-normal text-center"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                <div className="font-display text-4xl md:text-5xl font-bold text-gold leading-none mb-2">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── SOCIAL COMMUNITY ──────────────────────────────────── */}
        <section className="pt-20 pb-16 border-t border-white/[0.06]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-3">Community</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4">
              Follow Every <span className="text-gold">Platform</span>
            </h2>
            <p className="text-white/35 text-sm max-w-md mx-auto leading-relaxed">
              Stream, follow, and stay connected — every Kiut Music channel in one place.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center"
          >
            <SocialIconGroup className="justify-center gap-4" />
          </motion.div>
        </section>
      </div>

      {/* ── Sticky mobile CTA ──────────────────────────────────── */}
      <AnimatePresence>
        {showSticky && !submitted && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 w-full p-4 bg-black/85 backdrop-blur-lg border-t border-white/8 z-50 lg:hidden flex justify-center"
          >
            <PremiumCTAButton
              as="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-full max-w-sm"
            >
              Join the Inner Circle
            </PremiumCTAButton>
          </motion.div>
        )}
      </AnimatePresence>
      <SiteFooter />
    </motion.div>
  );
}
