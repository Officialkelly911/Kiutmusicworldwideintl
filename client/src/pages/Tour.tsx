import { motion, useInView } from "framer-motion";
import { ArrowRight, MapPin, Calendar, Clock, Star, Ticket, Users, Shield, ChevronRight, Mail } from "lucide-react";
import { Link } from "wouter";
import SiteFooter from "../components/SiteFooter";
import { useRef, useState } from "react";

// Single interactive element — avoids nesting <a> inside <button> or vice-versa
const MotionLink = motion.create(Link);

// ─── Event Data ───────────────────────────────────────────────────────────────

type AvailKind = "notify" | "vip-only" | "sold-out" | "free";

interface ShowEvent {
  id: number;
  month: string;
  day: string;
  year: string;
  city: string;
  country: string;
  venue: string;
  time: string;
  availability: AvailKind;
  isFeatured?: boolean;
}

const upcomingShows: ShowEvent[] = [
  {
    id: 1,
    month: "SEP",
    day: "12",
    year: "2026",
    city: "London",
    country: "UK",
    venue: "O2 Brixton Academy",
    time: "8:00 PM",
    availability: "notify",
    isFeatured: true,
  },
  {
    id: 2,
    month: "SEP",
    day: "27",
    year: "2026",
    city: "Amsterdam",
    country: "NL",
    venue: "Melkweg",
    time: "9:00 PM",
    availability: "notify",
  },
  {
    id: 3,
    month: "OCT",
    day: "04",
    year: "2026",
    city: "Toronto",
    country: "CA",
    venue: "Rebel Entertainment Complex",
    time: "8:30 PM",
    availability: "vip-only",
  },
  {
    id: 4,
    month: "OCT",
    day: "18",
    year: "2026",
    city: "New York",
    country: "US",
    venue: "Brooklyn Mirage",
    time: "9:00 PM",
    availability: "notify",
  },
  {
    id: 5,
    month: "NOV",
    day: "01",
    year: "2026",
    city: "Lagos",
    country: "NG",
    venue: "Eko Convention Centre",
    time: "7:00 PM",
    availability: "notify",
    isFeatured: false,
  },
  {
    id: 6,
    month: "NOV",
    day: "22",
    year: "2026",
    city: "Paris",
    country: "FR",
    venue: "La Cigale",
    time: "8:00 PM",
    availability: "notify",
  },
  {
    id: 7,
    month: "DEC",
    day: "06",
    year: "2026",
    city: "Miami",
    country: "US",
    venue: "Club Space",
    time: "10:00 PM",
    availability: "sold-out",
  },
  {
    id: 8,
    month: "DEC",
    day: "20",
    year: "2026",
    city: "Accra",
    country: "GH",
    venue: "Accra International Conference Centre",
    time: "6:00 PM",
    availability: "free",
  },
];

const pastShows: { year: string; events: { city: string; venue: string; date: string }[] }[] = [
  {
    year: "2025",
    events: [
      { city: "London", venue: "Jazz Café", date: "Nov 14" },
      { city: "Lagos", venue: "Terra Kulture", date: "Sep 28" },
      { city: "New York", venue: "SOB's", date: "Aug 03" },
      { city: "Toronto", venue: "Monarch Tavern", date: "Jun 19" },
      { city: "Amsterdam", venue: "Bitterzoet", date: "Apr 11" },
      { city: "Accra", venue: "Kempinski Hotel", date: "Feb 07" },
    ],
  },
  {
    year: "2024",
    events: [
      { city: "London", venue: "Servant Jazz Quarters", date: "Dec 05" },
      { city: "Lagos", venue: "Quilox", date: "Oct 19" },
      { city: "Paris", venue: "New Morning", date: "Aug 22" },
      { city: "New York", venue: "Baby's All Right", date: "May 30" },
    ],
  },
];

const vipPerks = [
  { icon: Star,    title: "Front Row Access",       desc: "Reserved premium floor position closest to the stage." },
  { icon: Users,   title: "Meet & Greet",            desc: "Private pre-show session with Kiut and the team." },
  { icon: Shield,  title: "VIP Lounge",              desc: "Exclusive backstage lounge access before the show." },
  { icon: Ticket,  title: "Signed Memorabilia",      desc: "Limited signed poster or vinyl from the night." },
];

// ─── Availability badge config ────────────────────────────────────────────────
function getAvailBadge(kind: AvailKind) {
  switch (kind) {
    case "notify":   return { label: "Get Notified",  cls: "bg-gold/10 text-gold border-gold/30",                 dot: "bg-gold animate-pulse" };
    case "vip-only": return { label: "VIP Only",      cls: "bg-purple-500/10 text-purple-300 border-purple-500/30", dot: "bg-purple-400" };
    case "sold-out": return { label: "Sold Out",      cls: "bg-white/5 text-white/35 border-white/15",            dot: "bg-white/25" };
    case "free":     return { label: "Free Entry",    cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30", dot: "bg-emerald-400 animate-pulse" };
  }
}

// ─── Individual Show Row ──────────────────────────────────────────────────────
function ShowRow({ show, index }: { show: ShowEvent; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const badge = getAvailBadge(show.availability);
  const isSoldOut = show.availability === "sold-out";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col sm:flex-row items-start sm:items-center gap-5 md:gap-8 px-6 md:px-8 py-6 rounded-2xl border transition-all duration-300 ${
        show.isFeatured
          ? "border-gold/30 bg-gradient-to-r from-gold/[0.06] to-transparent hover:border-gold/50 hover:shadow-[0_8px_40px_rgba(212,175,55,0.10)]"
          : "border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
      } ${isSoldOut ? "opacity-55" : ""}`}
    >
      {/* Featured glow bar */}
      {show.isFeatured && (
        <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-gold/80 via-gold to-gold/20" />
      )}

      {/* Date block */}
      <div className="flex-shrink-0 flex flex-row sm:flex-col items-center sm:items-center gap-3 sm:gap-0 sm:w-16 text-center">
        <span className="font-display text-[10px] font-bold tracking-[0.3em] text-gold/70 uppercase">{show.month}</span>
        <span className="font-display text-4xl sm:text-3xl font-bold text-white leading-none">{show.day}</span>
        <span className="text-white/28 text-[10px] font-medium tracking-widest sm:mt-0.5">{show.year}</span>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px h-12 bg-white/[0.08] flex-shrink-0" />

      {/* City + venue */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={`font-display text-lg font-bold uppercase tracking-tight leading-none transition-colors duration-200 ${
            show.isFeatured ? "text-white group-hover:text-gold" : "text-white/90 group-hover:text-white"
          }`}>
            {show.city}
          </h3>
          <span className="text-white/30 text-xs font-medium">{show.country}</span>
          {show.isFeatured && (
            <span className="px-2 py-[2px] rounded-full bg-gold/15 border border-gold/25 text-gold text-[8px] font-bold tracking-widest uppercase">
              Featured
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-white/35 text-[12px]">
          <span className="flex items-center gap-1"><MapPin size={10} /> {show.venue}</span>
          <span className="hidden sm:flex items-center gap-1"><Clock size={10} /> {show.time}</span>
        </div>
      </div>

      {/* Availability badge */}
      <div className="flex-shrink-0">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest ${badge.cls}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
          {badge.label}
        </span>
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 w-full sm:w-auto">
        {isSoldOut ? (
          <span className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/30 font-bold uppercase tracking-widest text-[10px] cursor-not-allowed">
            Sold Out
          </span>
        ) : (
          <MotionLink
            href="/newsletter"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all duration-300 ${
              show.isFeatured
                ? "bg-gold text-midnight shadow-[var(--glow-gold)] hover:shadow-[var(--glow-gold-hover)]"
                : "bg-white/[0.06] text-white border border-white/12 hover:bg-gold/10 hover:text-gold hover:border-gold/30"
            }`}
          >
            {show.availability === "free" ? "Claim Spot" : "Notify Me"} <ArrowRight size={12} />
          </MotionLink>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Tour() {
  const [showAllPast, setShowAllPast] = useState(false);

  return (
    <div className="min-h-screen bg-midnight text-white">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-[72vh] flex items-end pb-20 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/assets/images/Hero1_1767873472478.jpeg"
            alt="Kiut Live"
            className="w-full h-full object-cover object-top"
            loading="eager"
          />
          {/* Layered overlays for cinematic depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-midnight" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
          {/* Gold ambient */}
          <div className="absolute bottom-0 left-0 w-[600px] h-[300px] bg-gold/8 blur-[120px] rounded-full" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/[0.08] backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-[10px] font-bold tracking-[0.35em] uppercase">2026 World Tour</span>
            </div>

            <h1 className="font-display text-[clamp(3rem,10vw,7rem)] font-bold uppercase tracking-tight leading-[0.92] text-white mb-6">
              Live &<br />
              <span className="text-gold">Loud</span>
            </h1>

            <p className="text-white/55 text-lg font-light max-w-lg leading-relaxed mb-10">
              Kiut brings the energy of the Goodlife to stages worldwide. From Lagos to London — the world is the stage.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <motion.a
                href="#shows"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gold text-midnight font-bold uppercase tracking-widest text-[11px] shadow-[var(--glow-gold)] hover:shadow-[var(--glow-gold-hover)] transition-shadow duration-300 cursor-pointer"
              >
                View All Shows <ArrowRight size={14} />
              </motion.a>
              <MotionLink
                href="/newsletter"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white/[0.06] border border-white/15 text-white font-bold uppercase tracking-widest text-[11px] backdrop-blur-sm hover:border-gold/40 hover:text-gold transition-all duration-300"
              >
                Get Tour Alerts <Mail size={14} />
              </MotionLink>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-40"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
          <span className="text-[9px] font-bold tracking-[0.3em] text-white/60 uppercase rotate-90 origin-center translate-y-8">Scroll</span>
        </motion.div>
      </section>

      {/* ── STAT BAR ──────────────────────────────────────────── */}
      <div className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-0">
            {[
              { value: "8",   label: "Shows Announced" },
              { value: "7",   label: "Countries"        },
              { value: "2026",label: "World Tour"        },
              { value: "∞",   label: "Energy"            },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1 px-8 border-r border-white/[0.06] last:border-r-0">
                <span className="font-display text-2xl font-bold text-gold">{stat.value}</span>
                <span className="text-white/35 text-[10px] font-medium tracking-[0.2em] uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── UPCOMING SHOWS ────────────────────────────────────── */}
      <section id="shows" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" /> Upcoming
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
                  On <span className="text-gold">Stage</span>
                </h2>
                <p className="text-white/40 text-sm mt-3 max-w-md leading-relaxed">
                  Tour dates are rolling out. Sign up to the newsletter so you're the first to know when tickets go live in your city.
                </p>
              </div>
              <MotionLink
                href="/newsletter"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/30 text-gold bg-gold/[0.06] hover:bg-gold/10 text-[11px] font-bold uppercase tracking-widest transition-all duration-200"
              >
                <Mail size={12} /> Get Tour Alerts
              </MotionLink>
            </div>
          </motion.div>

          {/* Show rows */}
          <div className="flex flex-col gap-3">
            {upcomingShows.map((show, i) => (
              <ShowRow key={show.id} show={show} index={i} />
            ))}
          </div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-5 text-[11px] text-white/28 font-medium"
          >
            {[
              { dot: "bg-gold", label: "Get Notified — tickets releasing soon" },
              { dot: "bg-purple-400", label: "VIP Only — exclusive access" },
              { dot: "bg-emerald-400", label: "Free Entry" },
              { dot: "bg-white/20", label: "Sold Out" },
            ].map((item) => (
              <span key={item.label} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                {item.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── VIP EXPERIENCE ────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]" style={{ background: "#080808" }}>
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
              <p className="text-white/45 text-base leading-relaxed mb-10 max-w-md">
                Go beyond the show. VIP holders get exclusive access to Kiut before the curtain rises — intimate, personal, and unforgettable.
              </p>
              <MotionLink
                href="/newsletter"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gold text-midnight font-bold uppercase tracking-widest text-[11px] shadow-[var(--glow-gold)] hover:shadow-[var(--glow-gold-hover)] transition-shadow duration-300"
              >
                Request VIP Access <ChevronRight size={14} />
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
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border border-gold/20 group-hover:border-gold/40 transition-colors duration-300"
                      style={{ background: "rgba(212,175,55,0.06)" }}>
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-display text-base font-bold uppercase tracking-tight text-white mb-2 group-hover:text-gold transition-colors duration-200">{perk.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{perk.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PAST SHOWS ────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <p className="text-white/30 text-[10px] font-bold tracking-[0.4em] uppercase mb-3">Archive</p>
            <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-white">
              Past <span className="text-gold">Shows</span>
            </h2>
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
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-display text-3xl font-bold text-white/15">{group.year}</span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {group.events.map((ev, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex items-center justify-between px-5 py-4 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-white/10 transition-all duration-200 group"
                    >
                      <div>
                        <p className="text-white/70 text-sm font-medium group-hover:text-white transition-colors duration-200">{ev.city}</p>
                        <p className="text-white/25 text-[11px] mt-0.5 flex items-center gap-1">
                          <MapPin size={9} /> {ev.venue}
                        </p>
                      </div>
                      <span className="text-white/25 text-[11px] font-medium tracking-wide flex-shrink-0 ml-4">
                        <Calendar size={9} className="inline mr-1 mb-0.5" />{ev.date}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {!showAllPast && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowAllPast(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/25 text-[11px] font-bold uppercase tracking-widest transition-all duration-200"
              >
                Show More <ChevronRight size={13} />
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── FAN CARD CTA ──────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]" style={{ background: "#06060a" }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden border border-gold/20 p-12 md:p-16 text-center"
            style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(0,0,0,0) 60%, rgba(212,175,55,0.04) 100%)" }}
          >
            {/* Ambient glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-gold/8 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-gold/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gold/25 shadow-[var(--glow-gold)]"
                style={{ background: "rgba(212,175,55,0.08)" }}>
                <Star className="w-7 h-7 text-gold" fill="currentColor" />
              </div>

              <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Inner Circle</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-5 leading-[1.05]">
                Join the<br /><span className="text-gold">Fan Card</span>
              </h2>
              <p className="text-white/45 text-base leading-relaxed mb-10 max-w-lg mx-auto">
                Fan Card members get priority access to VIP tickets, pre-sale codes, exclusive meet &amp; greet opportunities, and more. Be first in the room.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <MotionLink
                  href="/newsletter"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-gold text-midnight font-bold uppercase tracking-widest text-[11px] shadow-[var(--glow-gold)] hover:shadow-[var(--glow-gold-hover)] transition-shadow duration-300"
                >
                  Apply for Fan Card <ArrowRight size={14} />
                </MotionLink>
                <MotionLink
                  href="/newsletter"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/15 text-white/70 hover:text-gold hover:border-gold/40 font-bold uppercase tracking-widest text-[11px] transition-all duration-300"
                >
                  Learn More
                </MotionLink>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Stay Close</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">
              Never Miss a <span className="text-gold">Show</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-10">
              Tour announcements, presale codes, and VIP drops — first to your inbox, before anywhere else.
            </p>
            <MotionLink
              href="/newsletter"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-gold text-midnight font-bold uppercase tracking-widest text-[11px] shadow-[var(--glow-gold)] hover:shadow-[var(--glow-gold-hover)] transition-shadow duration-300"
            >
              Subscribe to Newsletter <Mail size={14} />
            </MotionLink>
            <p className="text-white/18 text-[10px] font-light tracking-[0.22em] mt-4">Free · No spam · Unsubscribe anytime</p>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
