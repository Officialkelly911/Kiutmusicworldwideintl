import React from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Mail, Send, MessageSquare, Mic2, Newspaper, Briefcase,
  ArrowRight, CheckCircle2, Globe, Users, Heart, ChevronRight,
} from "lucide-react";
import {
  SiSpotify, SiApplemusic, SiAudiomack,
  SiInstagram, SiYoutube, SiLinktree,
} from "react-icons/si";
import { useState, useRef } from "react";
import { Link } from "wouter";
import SiteFooter from "../components/SiteFooter";

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

// ─── Enquiry types ────────────────────────────────────────────────────────────
const enquiryTypes = [
  {
    id: "booking",
    icon: Mic2,
    label: "Booking",
    desc: "Live performances, concerts, festivals",
    placeholder: "Tell us about the event — date, venue, audience size, and any specific requirements.",
  },
  {
    id: "press",
    icon: Newspaper,
    label: "Press & Media",
    desc: "Interviews, editorial features, press kits",
    placeholder: "Describe your publication or media outlet and what you'd like to cover.",
  },
  {
    id: "business",
    icon: Briefcase,
    label: "Business",
    desc: "Partnerships, sync licensing, label enquiries",
    placeholder: "Outline the nature of the business opportunity and how you see collaboration working.",
  },
  {
    id: "general",
    icon: MessageSquare,
    label: "General",
    desc: "Anything else — fan messages welcome",
    placeholder: "Send your message — every word is read.",
  },
];

// ─── Social platform links ────────────────────────────────────────────────────
const socialLinks = [
  {
    label: "Instagram",
    sub: "@kiut_rababag",
    icon: SiInstagram,
    href: "https://www.instagram.com/kiut_rababag?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    color: "from-pink-500/10 to-rose-600/10",
    border: "hover:border-pink-500/30",
    iconColor: "group-hover:text-pink-400",
  },
  {
    label: "YouTube",
    sub: "@kiutrabatv",
    icon: SiYoutube,
    href: "https://youtube.com/@kiutrabatv?si=A7jsabTzz7Bq85Bo",
    color: "from-red-500/10 to-red-700/10",
    border: "hover:border-red-500/30",
    iconColor: "group-hover:text-red-400",
  },
  {
    label: "Spotify",
    sub: "Kiut Music",
    icon: SiSpotify,
    href: "https://open.spotify.com/artist/6mfADEalHPkjvjNPHOdFXJ",
    color: "from-green-500/10 to-emerald-700/10",
    border: "hover:border-green-500/30",
    iconColor: "group-hover:text-green-400",
  },
  {
    label: "Apple Music",
    sub: "Kiut",
    icon: SiApplemusic,
    href: "https://music.apple.com/artist/kiut",
    color: "from-rose-400/10 to-pink-600/10",
    border: "hover:border-rose-400/30",
    iconColor: "group-hover:text-rose-300",
  },
  {
    label: "Audiomack",
    sub: "@kiutrabatv",
    icon: SiAudiomack,
    href: "https://audiomack.com/kiutrabatv",
    color: "from-orange-500/10 to-amber-600/10",
    border: "hover:border-orange-500/30",
    iconColor: "group-hover:text-orange-400",
  },
  {
    label: "Linktree",
    sub: "@kiutmusic",
    icon: SiLinktree,
    href: "https://linktr.ee/kiutmusic?utm_source=linktree_profile_share&ltsid=9eac7cdb-2dc3-4852-bf26-0d2e60b983eb",
    color: "from-green-400/10 to-lime-600/10",
    border: "hover:border-green-400/30",
    iconColor: "group-hover:text-green-300",
  },
  {
    label: "DreamPlanet",
    sub: "Store",
    icon: Globe,
    href: "https://dreamplanet.org/user/61",
    color: "from-gold/10 to-amber-500/10",
    border: "hover:border-gold/30",
    iconColor: "group-hover:text-gold",
  },
];

// ─── Community stats ──────────────────────────────────────────────────────────
const communityStats = [
  { label: "Countries Listening", value: "20+" },
  { label: "Newsletter Subscribers", value: "50K+" },
  { label: "Years Creating Music", value: "10+" },
];

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [activeType, setActiveType] = useState("general");
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const active = enquiryTypes.find(t => t.id === activeType)!;
  const Icon   = active.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && message) setSubmitted(true);
  };

  return (
    <div className="rounded-3xl border border-white/[0.07] overflow-hidden" style={{ background: "#09090d" }}>
      {/* Top accent */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

      <div className="p-8 md:p-10">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Enquiry type tabs */}
              <div className="mb-8">
                <p className="text-white/35 text-[10px] font-bold tracking-[0.35em] uppercase mb-4">Enquiry Type</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {enquiryTypes.map((type) => {
                    const TIcon = type.icon;
                    const isActive = activeType === type.id;
                    return (
                      <motion.button
                        key={type.id}
                        type="button"
                        onClick={() => setActiveType(type.id)}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border text-center transition-all duration-200 ${
                          isActive
                            ? "border-gold/40 bg-gold/[0.08] text-gold shadow-[0_0_20px_rgba(212,175,55,0.08)]"
                            : "border-white/[0.06] bg-transparent text-white/35 hover:text-white/60 hover:border-white/12"
                        }`}
                      >
                        <TIcon size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-wide leading-none">{type.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/28 text-xs mt-3 flex items-center gap-1.5"
                  >
                    <Icon size={10} className="text-gold/50" /> {active.desc}
                  </motion.p>
                </AnimatePresence>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { id: "name",  label: "Your Name",          type: "text",  value: name,  set: setName,  required: false },
                    { id: "email", label: "Email Address",       type: "email", value: email, set: setEmail, required: true  },
                  ].map((field) => (
                    <div key={field.id} className="relative group">
                      <input
                        id={field.id}
                        type={field.type}
                        value={field.value}
                        onChange={(e) => field.set(e.target.value)}
                        required={field.required}
                        placeholder=" "
                        className="block w-full px-5 pb-3 pt-6 text-white text-sm bg-white/[0.04] border border-white/[0.08] rounded-xl appearance-none focus:outline-none focus:border-gold/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(212,175,55,0.08)] transition-all duration-300 peer placeholder-transparent"
                      />
                      <label
                        htmlFor={field.id}
                        className="absolute text-white/35 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-gold/70 pointer-events-none text-sm"
                      >
                        {field.label}{field.required && " *"}
                      </label>
                      <div className="absolute bottom-0 left-3 right-3 h-[1px] w-0 bg-gradient-to-r from-gold/60 to-gold/30 rounded-b-xl group-focus-within:w-[calc(100%-24px)] transition-all duration-500" />
                    </div>
                  ))}
                </div>

                {/* Message */}
                <div className="relative group">
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    placeholder=" "
                    className="block w-full px-5 pb-3 pt-6 text-white text-sm bg-white/[0.04] border border-white/[0.08] rounded-xl appearance-none focus:outline-none focus:border-gold/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(212,175,55,0.08)] transition-all duration-300 peer placeholder-transparent resize-none leading-relaxed"
                  />
                  <label
                    htmlFor="message"
                    className="absolute text-white/35 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-gold/70 pointer-events-none text-sm"
                  >
                    Message *
                  </label>
                  <AnimatePresence>
                    {!message && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-4 left-5 right-5 text-white/18 text-[11px] leading-relaxed pointer-events-none peer-focus:opacity-0 transition-opacity"
                      >
                        {active.placeholder}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <div className="absolute bottom-0 left-3 right-3 h-[1px] w-0 bg-gradient-to-r from-gold/60 to-gold/30 rounded-b-xl group-focus-within:w-[calc(100%-24px)] transition-all duration-500" />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gold text-midnight font-bold uppercase tracking-widest text-[11px] shadow-[var(--glow-gold)] hover:shadow-[var(--glow-gold-hover)] transition-shadow duration-300"
                >
                  Send Message <Send size={13} />
                </motion.button>

                <p className="text-center text-white/20 text-[10px] tracking-[0.2em] uppercase">
                  Every message is read personally
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="py-14 flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, delay: 0.1 }}
                className="w-20 h-20 rounded-full border border-gold flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(212,175,55,0.3)]"
                style={{ background: "rgba(212,175,55,0.10)" }}
              >
                <CheckCircle2 className="w-9 h-9 text-gold" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-gold mb-3">Message Sent</h3>
              <p className="text-white/45 text-sm leading-relaxed max-w-xs mb-8">
                Your message has been received. You'll hear back within 48–72 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setName(""); setEmail(""); setMessage(""); setActiveType("general"); }}
                className="text-white/30 hover:text-white/60 text-[11px] uppercase tracking-widest transition-colors"
              >
                Send Another Message
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Social Card ──────────────────────────────────────────────────────────────
function SocialCard({ link, index }: { link: typeof socialLinks[0]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-20px" });
  const Icon = link.icon;

  return (
    <motion.a
      ref={ref}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${link.label} — ${link.sub}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`group relative flex items-center gap-4 p-5 rounded-2xl border border-white/[0.07] bg-gradient-to-br ${link.color} ${link.border} hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300`}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/[0.07] text-white/45 ${link.iconColor} transition-colors duration-200 flex-shrink-0`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-white/75 text-sm font-semibold group-hover:text-white transition-colors duration-200 truncate">{link.label}</p>
        <p className="text-white/28 text-[11px] truncate">{link.sub}</p>
      </div>
      <ArrowRight size={13} className="ml-auto text-white/15 group-hover:text-white/40 transition-colors duration-200 flex-shrink-0" />
    </motion.a>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Contact() {
  return (
    <div className="min-h-screen bg-midnight text-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-gold/[0.05] blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-gold/[0.03] blur-[100px] rounded-full" />
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/25 bg-gold/[0.06] backdrop-blur-sm mb-7">
              <Mail size={11} className="text-gold" />
              <span className="text-gold text-[10px] font-bold tracking-[0.35em] uppercase">Contact & Community</span>
            </div>
            <h1 className="font-display text-[clamp(3rem,10vw,7rem)] font-bold uppercase tracking-tight leading-[0.92] text-white mb-6">
              Let's <span className="text-gold">Connect</span>
            </h1>
            <p className="text-white/45 text-lg font-light max-w-lg leading-relaxed">
              Whether you're booking a show, pitching a story, or just reaching out as a fan — the door is open.
            </p>
          </motion.div>

          {/* Community stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-white/[0.06]"
          >
            {communityStats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-4">
                {i > 0 && <div className="w-px h-8 bg-white/[0.08] hidden sm:block" />}
                <div>
                  <p className="font-display text-2xl font-bold text-gold">{stat.value}</p>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT — Form + Sidebar ────────────────────────────────── */}
      <section className="py-12 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-start">

            {/* LEFT — Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-8">
                <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/50" /> Send a Message
                </p>
                <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white">
                  Get In <span className="text-gold">Touch</span>
                </h2>
              </div>
              <ContactForm />
            </motion.div>

            {/* RIGHT — Business Enquiries + Response info */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 lg:sticky lg:top-28"
            >
              {/* Business Enquiries */}
              <div>
                <p className="text-white/35 text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Business Enquiries</p>
                <div className="space-y-3">
                  {[
                    {
                      icon: Mic2,
                      title: "Booking",
                      desc: "Concert bookings, festival appearances, and live event requests.",
                      cta: "Book Kiut",
                    },
                    {
                      icon: Newspaper,
                      title: "Press & Media",
                      desc: "Interview requests, editorial coverage, and press kit access.",
                      cta: "Press Enquiry",
                    },
                    {
                      icon: Briefcase,
                      title: "Business",
                      desc: "Brand partnerships, sync licensing, and industry enquiries.",
                      cta: "Discuss Partnership",
                    },
                  ].map((card) => {
                    const Icon = card.icon;
                    return (
                      <div
                        key={card.title}
                        className="group flex items-start gap-4 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-gold/22 hover:bg-gold/[0.03] transition-all duration-300"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center border border-gold/18 flex-shrink-0 group-hover:border-gold/35 transition-colors duration-200"
                          style={{ background: "rgba(212,175,55,0.06)" }}
                        >
                          <Icon size={16} className="text-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-sm font-bold uppercase tracking-tight text-white mb-1 group-hover:text-gold transition-colors duration-200">
                            {card.title}
                          </h3>
                          <p className="text-white/35 text-[12px] leading-relaxed">{card.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Response time card */}
              <div className="p-6 rounded-2xl border border-gold/15 bg-gold/[0.04]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                  </span>
                  <span className="text-gold text-[10px] font-bold tracking-[0.35em] uppercase">Response Time</span>
                </div>
                <p className="text-white/55 text-sm leading-relaxed">
                  All messages are read personally. Expect a reply within{" "}
                  <span className="text-white/75 font-medium">48–72 hours</span> on business days.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL LINKS ─────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]" style={{ background: "#07070a" }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          >
            <div>
              <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-3 flex items-center gap-2">
                <Globe size={11} className="text-gold" /> Find Kiut
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
                Social <span className="text-gold">Platforms</span>
              </h2>
              <p className="text-white/35 text-sm mt-3 max-w-md leading-relaxed">
                Stream, follow, and stay up to date — all of Kiut's platforms in one place.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {socialLinks.map((link, i) => (
              <SocialCard key={link.label} link={link} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY CTA ────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Newsletter card */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-gold/22 overflow-hidden p-10 flex flex-col"
              style={{ background: "linear-gradient(145deg, rgba(212,175,55,0.07) 0%, #08080d 60%)" }}
            >
              <div className="absolute top-0 left-0 w-[300px] h-[200px] bg-gold/[0.06] blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10 flex flex-col flex-1">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border border-gold/25 mb-6"
                  style={{ background: "rgba(212,175,55,0.08)" }}
                >
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <p className="text-gold text-[10px] font-bold tracking-[0.35em] uppercase mb-3">Inner Circle</p>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-3 leading-snug">
                  Join the Newsletter
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-8 flex-1">
                  New music, exclusive drops, tour announcements, and behind-the-scenes content — before anyone else.
                </p>
                <MotionLink
                  href="/newsletter"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gold text-midnight font-bold uppercase tracking-widest text-[11px] shadow-[var(--glow-gold)] hover:shadow-[var(--glow-gold-hover)] transition-shadow duration-300 self-start"
                >
                  Subscribe Free <ArrowRight size={13} />
                </MotionLink>
              </div>
            </motion.div>

            {/* Fan community card */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-white/[0.07] overflow-hidden p-10 flex flex-col"
              style={{ background: "#09090d" }}
            >
              <div className="relative z-10 flex flex-col flex-1">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 mb-6"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <Users className="w-5 h-5 text-white/50" />
                </div>
                <p className="text-white/30 text-[10px] font-bold tracking-[0.35em] uppercase mb-3">Community</p>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-3 leading-snug">
                  Follow the Journey
                </h3>
                <p className="text-white/38 text-sm leading-relaxed mb-8 flex-1">
                  From the studio to the stage — follow along on social media for the real-time story of Kiut's creative journey.
                </p>

                {/* Mini social row */}
                <div className="flex items-center gap-3 flex-wrap">
                  {[
                    { href: "https://www.instagram.com/kiut_rababag?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", Icon: SiInstagram, label: "Instagram" },
                    { href: "https://youtube.com/@kiutrabatv?si=A7jsabTzz7Bq85Bo", Icon: SiYoutube, label: "YouTube" },
                    { href: "https://linktr.ee/kiutmusic?utm_source=linktree_profile_share&ltsid=9eac7cdb-2dc3-4852-bf26-0d2e60b983eb", Icon: SiLinktree, label: "Linktree" },
                  ].map(({ href, Icon, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      whileHover={{ y: -2, scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-midnight hover:bg-gold hover:border-gold hover:shadow-[var(--glow-gold)] transition-all duration-250"
                    >
                      <Icon size={18} aria-hidden="true" />
                    </motion.a>
                  ))}
                  <motion.a
                    href="https://linktr.ee/kiutmusic"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 2 }}
                    className="flex items-center gap-1.5 text-white/25 hover:text-white/50 text-[11px] font-medium uppercase tracking-widest transition-colors duration-200 ml-1"
                  >
                    All Platforms <ChevronRight size={11} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Heart sign-off ───────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/[0.04] text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-5 h-5 text-gold/40" fill="rgba(212,175,55,0.4)" />
          </motion.div>
          <p className="text-white/18 text-[11px] uppercase tracking-[0.35em] font-medium">
            Made with love · Kiut Music Worldwide
          </p>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
