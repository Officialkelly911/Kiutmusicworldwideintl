import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, Pause, ExternalLink } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SiteFooter from "../components/SiteFooter";
import { usePlayer } from "@/context/PlayerContext";
import { ALL_TRACKS, TRACK_GROUPS, type Track } from "@/data/tracks";
import { staggerContainer, staggerItem, viewport } from "@/lib/motion";

// ─── Image + audio constants ──────────────────────────────────────────────────
const goodLifeEP  = "/assets/images/Good_Life_EP_1767961904057.jpeg";
const sofaEP      = "/assets/images/SOFA_EP_1767961904056.png";
const announceImg = "/assets/images/announce-cover.jpg";
const eligibleEP  = "/assets/images/KIUT_ELIGIBLE_EP_1767961904056.png";

// ─── Platform definitions ─────────────────────────────────────────────────────
type PlatformId = "spotify" | "apple" | "audiomack" | "youtube" | "boomplay";

const PLATFORMS: Record<PlatformId, { label: string; color: string; icon: React.ReactNode }> = {
  spotify: {
    label: "Spotify",
    color: "#1DB954",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  apple: {
    label: "Apple Music",
    color: "#fc3c44",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.048-2.31-2.08-3.043a8.307 8.307 0 00-2.56-1.072C18.003-.01 16.783.011 15.573.008c-.192-.003-.398.002-.603.002h-7.74c-.25 0-.508.013-.762.037C5.15.193 3.924.606 2.906 1.534 1.976 2.39 1.36 3.48 1.07 4.713A12.9 12.9 0 00.996 6.04C.985 6.3.986 6.557.986 6.81v10.38c0 .254-.001.508.01.76.064 1.388.45 2.654 1.37 3.71.94 1.085 2.13 1.67 3.51 1.906a12.02 12.02 0 001.9.13c.26.01.517.01.774.01h7.74c.25 0 .504-.003.758-.01.613-.018 1.22-.09 1.815-.236 1.367-.333 2.49-1.058 3.313-2.183.697-.96 1.043-2.07 1.098-3.255.018-.388.017-.776.017-1.164V7.094c0-.32 0-.638-.003-.97zM8.832 17.68c0 .434-.343.776-.776.776H7.14a.775.775 0 01-.776-.776V12.2c0-.433.343-.776.776-.776h.916c.433 0 .776.343.776.776v5.48zm8.038 0c0 .434-.343.776-.776.776h-.916a.775.775 0 01-.775-.776v-8.97c0-.433.342-.775.775-.775h.916c.433 0 .776.342.776.775v8.97z"/>
      </svg>
    ),
  },
  audiomack: {
    label: "Audiomack",
    color: "#FF5500",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.5c-4.142 0-7.5-3.358-7.5-7.5S7.858 4.5 12 4.5s7.5 3.358 7.5 7.5-3.358 7.5-7.5 7.5zm0-12a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 6.75a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5z"/>
      </svg>
    ),
  },
  youtube: {
    label: "YouTube Music",
    color: "#FF0000",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm4.596 12.96l-6.72 4.08A1.08 1.08 0 018.4 16V8a1.08 1.08 0 011.476-1.008l6.72 3.96a1.08 1.08 0 010 2.008z"/>
      </svg>
    ),
  },
  boomplay: {
    label: "Boomplay",
    color: "#1E90FF",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0-7a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"/>
      </svg>
    ),
  },
};

// ─── Album discography cards data ─────────────────────────────────────────────
const albums = [
  {
    id: 1,
    title: "Good Life EP",
    year: "Oct 30, 2025",
    yearShort: "2025",
    type: "EP",
    image: goodLifeEP,
    link: "https://linktr.ee/kiut_goodlife?utm_source=linktree_profile_share&ltsid=bc67a3d6-887d-4ad8-ad3d-5fe5b92dd484",
    previewAudio: "/audio/makosa.m4a",
    tracks: 6,
    genre: "Afrobeats / Caribbean",
    platforms: ["spotify", "apple", "audiomack", "youtube", "boomplay"] as PlatformId[],
  },
  {
    id: 2,
    title: "S.O.F.A (Songs From Archive)",
    year: "Nov 24, 2023",
    yearShort: "2023",
    type: "EP",
    image: sofaEP,
    link: "https://bit.ly/m/KiutmusicSofaEP",
    previewAudio: "/audio/aje.mp3",
    tracks: 7,
    genre: "Afrobeats / R&B",
    platforms: ["spotify", "apple", "audiomack", "youtube"] as PlatformId[],
  },
  {
    id: 3,
    title: "Announce",
    year: "May 15, 2021",
    yearShort: "2021",
    type: "Project",
    image: announceImg,
    link: "https://bit.ly/m/Kiutmusicannounce",
    previewAudio: "/audio/samsa.mp3",
    tracks: 5,
    genre: "Afrobeats",
    platforms: ["spotify", "apple", "audiomack"] as PlatformId[],
  },
  {
    id: 4,
    title: "Eligible EP",
    year: "May 20, 2022",
    yearShort: "2022",
    type: "EP",
    image: eligibleEP,
    link: "https://bit.ly/m/KiutmusicELIGIBLE",
    previewAudio: "/audio/amin.mp3",
    tracks: 6,
    genre: "Afrobeats / Pop",
    platforms: ["spotify", "apple", "audiomack", "youtube"] as PlatformId[],
  },
];

const timelineEvents = [
  { year: "2019", title: "Debut Era",   type: "Singles",  image: eligibleEP  },
  { year: "2021", title: "Announce",    type: "Project",  image: announceImg },
  { year: "2022", title: "Eligible EP", type: "EP",       image: eligibleEP  },
  { year: "2023", title: "S.O.F.A EP",  type: "EP",       image: sofaEP      },
  { year: "2025", title: "Good Life EP",type: "EP",       image: goodLifeEP  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PlayingBars() {
  return (
    <div className="flex gap-[3px] items-end h-4" aria-hidden="true">
      {[0.8, 1.2, 0.9, 1.4, 0.7].map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-gold rounded-full"
          animate={{ height: [`${h * 5}px`, `${h * 13}px`, `${h * 5}px`] }}
          transition={{ repeat: Infinity, duration: 0.7 + i * 0.12, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function PlatformBadge({ id }: { id: PlatformId }) {
  const p = PLATFORMS[id];
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -2 }}
      title={p.label}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border transition-all duration-200 cursor-default"
      style={{
        borderColor: `${p.color}28`,
        background: `${p.color}0d`,
        color: p.color,
      }}
    >
      {p.icon}
      <span className="text-[9px] font-bold uppercase tracking-wider hidden sm:block" style={{ color: p.color }}>
        {p.label}
      </span>
    </motion.div>
  );
}

const AlbumCard = ({ album }: { album: typeof albums[0] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isHovered && album.previewAudio) {
      audioRef.current?.play().catch(() => {});
    } else {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
    }
  }, [isHovered, album.previewAudio]);

  return (
    <div
      className="relative w-full max-w-md mx-auto cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(v => !v)}
    >
      {/* Gradient border wrapper */}
      <motion.div
        animate={{
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl p-[1px]"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(212,175,55,0.7) 0%, rgba(212,175,55,0.15) 50%, rgba(212,175,55,0.5) 100%)"
            : "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(212,175,55,0.08) 100%)",
        }}
      >
        {/* Glass inner */}
        <div
          className="relative rounded-[calc(1rem-1px)] overflow-hidden"
          style={{
            background: "rgba(10,10,10,0.92)",
            boxShadow: isHovered
              ? "0 30px 70px -12px rgba(212,175,55,0.30)"
              : "0 20px 50px -12px rgba(0,0,0,0.80)",
          }}
        >
          {/* Album art */}
          <div className="overflow-hidden">
            <motion.img
              src={album.image}
              alt={album.title}
              className="w-full aspect-square object-cover"
              loading="lazy"
              animate={{ scale: isHovered ? 1.06 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Hover overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ background: "rgba(0,0,0,0.60)", backdropFilter: "blur(6px)" }}
              >
                <motion.div
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.7 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="w-20 h-20 rounded-full flex items-center justify-center text-midnight shadow-[0_0_50px_rgba(212,175,55,0.8)] mb-4"
                  style={{ background: "#D4AF37" }}
                >
                  <Play size={32} className="ml-1.5" fill="currentColor" />
                </motion.div>
                {album.previewAudio && (
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gold text-xs font-bold uppercase tracking-[0.2em]"
                    style={{ animation: "pulse 2s ease-in-out infinite" }}
                  >
                    Playing Preview
                  </motion.span>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Glass info bar at bottom */}
          <div className="px-4 py-3 border-t border-white/[0.05]" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="flex items-center justify-between">
              <span className="text-gold text-[9px] font-black uppercase tracking-[0.22em]">Official Release</span>
              <span className="text-white/30 text-[9px] font-mono">{album.tracks} tracks · {album.yearShort}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-[80px] -z-10 rounded-full transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(212,175,55,0.15), transparent 70%)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {album.previewAudio && <audio ref={audioRef} src={album.previewAudio} preload="none" loop />}
    </div>
  );
};

function TrackRow({ track, index }: { track: Track; index: number }) {
  const { currentTrack, isPlaying, playTrack } = usePlayer();
  const isActive = currentTrack?.id === track.id;

  return (
    <motion.div
      onClick={() => playTrack(track)}
      variants={staggerItem}
      className={`group relative flex items-center gap-3 md:gap-4 px-3 md:px-5 py-3.5 rounded-xl cursor-pointer transition-all duration-200 ${
        isActive
          ? "bg-gold/[0.07] border border-gold/20"
          : "border border-transparent hover:bg-white/[0.04] hover:border-white/[0.06]"
      }`}
      data-testid={`track-row-${track.id}`}
    >
      {/* Gold left-indicator for active track */}
      {isActive && (
        <motion.div
          layoutId="track-active-bar"
          className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
      <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-lg overflow-hidden flex-shrink-0 bg-black/40">
        <img src={track.albumArt} alt={track.album} className="w-full h-full object-cover" loading="lazy" />
        {isActive && (
          <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
            {isPlaying ? <PlayingBars /> : <Play size={12} className="text-gold ml-0.5" fill="currentColor" />}
          </div>
        )}
      </div>

      <div className="hidden md:flex w-7 flex-shrink-0 items-center justify-center">
        {isActive && isPlaying ? (
          <PlayingBars />
        ) : (
          <span className={`text-xs font-mono ${isActive ? "text-gold" : "text-white/20 group-hover:text-white/45"} transition-colors`}>
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <div className="flex flex-col min-w-0 flex-1">
        <span className={`font-semibold text-[13px] leading-snug truncate transition-colors duration-200 ${
          isActive ? "text-gold" : "text-white group-hover:text-gold"
        }`}>
          {track.title}
        </span>
        <span className="mt-0.5">
          {track.album !== "Single" ? (
            <span className={`inline-block px-1.5 py-[1px] rounded text-[9px] font-bold uppercase tracking-wider ${
              track.albumType === "ep" ? "bg-gold/12 text-gold/80" : "bg-white/6 text-white/35"
            }`}>{track.album}</span>
          ) : (
            <span className="text-white/25 text-[11px]">{track.released}</span>
          )}
        </span>
      </div>

      <span className="text-white/25 text-[11px] font-mono flex-shrink-0 hidden sm:block tabular-nums">{track.duration}</span>

      <button
        onClick={(e) => { e.stopPropagation(); playTrack(track); }}
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
          isActive && isPlaying
            ? "bg-gold text-midnight shadow-[0_0_14px_rgba(212,175,55,0.5)]"
            : "text-white/30 group-hover:text-white group-hover:bg-white/10"
        }`}
        data-testid={`button-play-${track.id}`}
        aria-label={isActive && isPlaying ? "Pause" : "Play"}
      >
        {isActive && isPlaying
          ? <Pause size={13} fill="currentColor" />
          : <Play  size={13} fill="currentColor" className="ml-0.5" />
        }
      </button>
    </motion.div>
  );
}

function MusicDiscovery() {
  const pairs = [
    { from: albums[0], to: albums[1] },
    { from: albums[1], to: albums[3] },
    { from: albums[2], to: albums[0] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="mt-24 mb-12"
    >
      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-20" />

      <div className="text-center mb-14">
        <p className="text-gold text-[10px] font-bold tracking-[0.45em] uppercase mb-3">Explore More</p>
        <h2 className="font-display text-3xl md:text-4xl font-light tracking-[0.2em] text-white uppercase">
          Music <span className="text-gold">Discovery</span>
        </h2>
        <p className="text-white/30 text-sm font-light mt-3">You may also like</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {pairs.map(({ from, to }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href={to.link} target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(212,175,55,0.10)" }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl overflow-hidden border border-white/[0.06] hover:border-gold/25 transition-colors duration-300"
                style={{ background: "#0a0a0a" }}
              >
                {/* "Enjoyed X" label */}
                <div className="px-4 pt-4 pb-2">
                  <p className="text-white/25 text-[9px] font-light tracking-widest uppercase">
                    If you enjoyed <span className="text-white/45">{from.title}</span>
                  </p>
                </div>

                {/* Album artwork */}
                <div className="relative mx-4 mb-3 rounded-xl overflow-hidden aspect-square">
                  <img
                    src={to.image}
                    alt={to.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                      <Play size={18} className="ml-0.5 text-midnight" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="px-4 pb-4">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-gold/10 border border-gold/22 text-gold text-[8px] font-bold uppercase tracking-widest mb-2">
                    {to.type}
                  </span>
                  <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider leading-tight mb-0.5">
                    {to.title}
                  </h4>
                  <p className="text-white/28 text-[10px] font-light">{to.genre} · {to.yearShort}</p>

                  <div className="mt-3 flex items-center gap-1.5 text-gold/60 hover:text-gold transition-colors text-[10px] font-bold uppercase tracking-widest">
                    <Play size={9} fill="currentColor" />
                    <span>Stream Everywhere</span>
                    <ExternalLink size={9} />
                  </div>
                </div>
              </motion.div>
            </a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Music() {
  const { currentTrack, isPlaying, playTrack, currentTime, duration, seek } = usePlayer();
  const featuredTrack = ALL_TRACKS[0];
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 relative overflow-x-hidden">
      {/* ── Ambient background ──────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: "rgba(212,175,55,0.025)" }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: "rgba(212,175,55,0.02)" }}
        />
        <motion.div
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 20, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 8 }}
          className="absolute top-[50%] left-[45%] w-[300px] h-[300px] rounded-full blur-[100px]"
          style={{ background: "rgba(100,50,255,0.018)" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* ── Page Hero ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24 pt-6"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.48em" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-gold text-[10px] font-bold tracking-[0.48em] uppercase mb-5"
          >
            Kiut Music Worldwide
          </motion.p>

          <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tight text-white uppercase leading-none mb-6">
            The<br /><span className="text-gold">Music</span>
          </h1>

          <p className="text-white/35 text-base font-light max-w-md mx-auto leading-relaxed mb-10">
            Four EPs. Dozens of tracks. One cinematic sound shaped by two continents.
          </p>

          {/* Animated waveform accent — decorative, hidden from screen readers */}
          <div className="flex items-end justify-center gap-[4px] h-6 mb-10" aria-hidden="true">
            {[0.5, 0.8, 1.2, 1.6, 1.0, 1.4, 0.9, 1.5, 1.1, 0.7, 1.3, 0.6].map((h, i) => (
              <motion.div
                key={i}
                className="w-[3px] rounded-full bg-gold/40"
                animate={{ height: [`${h * 6}px`, `${h * 18}px`, `${h * 6}px`] }}
                transition={{ repeat: Infinity, duration: 1.4 + i * 0.08, ease: "easeInOut", delay: i * 0.06 }}
              />
            ))}
          </div>

          {/* Stats strip */}
          <div className="inline-flex items-center gap-8 px-8 py-4 rounded-full border border-white/[0.07]"
            style={{ background: "rgba(255,255,255,0.02)" }}>
            {[
              { value: "4", label: "EPs" },
              { value: "24+", label: "Tracks" },
              { value: "5", label: "Platforms" },
              { value: "6+", label: "Years" },
            ].map(({ value, label }, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-display text-xl font-bold text-gold leading-none">{value}</span>
                <span className="text-white/30 text-[9px] uppercase tracking-[0.3em] mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Featured Track Hero ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-28"
        >
          <div className="relative rounded-3xl overflow-hidden border border-gold/12 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
            style={{ background: "linear-gradient(135deg, #100e00 0%, #0d0d0d 50%, #080408 100%)" }}>
            <div className="absolute top-0 right-0 w-80 h-80 blur-[110px] rounded-full pointer-events-none" style={{ background: "rgba(212,175,55,0.08)" }} />
            <div className="absolute bottom-0 left-0 w-56 h-56 blur-[90px] rounded-full pointer-events-none" style={{ background: "rgba(100,50,255,0.04)" }} />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
              <motion.div
                className="w-44 h-44 md:w-56 md:h-56 flex-shrink-0 rounded-2xl overflow-hidden shadow-[0_20px_55px_rgba(0,0,0,0.75)] border border-white/[0.07]"
                animate={currentTrack ? { scale: isPlaying ? 1.03 : 1 } : {}}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={currentTrack ? currentTrack.albumArt : featuredTrack.albumArt}
                  alt={currentTrack ? currentTrack.album : featuredTrack.album}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-0">
                <span className="inline-block px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.22em] mb-4 leading-none"
                  style={{ background: "rgba(212,175,55,0.12)", borderColor: "rgba(212,175,55,0.28)", color: "#D4AF37" }}>
                  {currentTrack ? "Now Playing" : "Featured Release"}
                </span>

                <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-2 uppercase tracking-wider">
                  {currentTrack ? currentTrack.title : "Good Life EP"}
                </h2>
                <p className="text-white/40 text-sm mb-8">
                  {currentTrack
                    ? `${currentTrack.artist} · ${currentTrack.album}`
                    : "Kiut · Oct 30, 2025 · Available everywhere"}
                </p>

                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(212,175,55,0.55)" }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => playTrack(currentTrack ?? featuredTrack)}
                    className="flex items-center gap-2.5 px-7 py-3.5 font-bold uppercase tracking-widest text-sm rounded-full transition-shadow"
                    style={{ background: "#D4AF37", color: "#000", boxShadow: "0 0 24px rgba(212,175,55,0.38)" }}
                  >
                    {currentTrack && isPlaying
                      ? <><Pause size={15} fill="currentColor" /> Pause</>
                      : <><Play  size={15} fill="currentColor" className="ml-0.5" /> Listen Now</>
                    }
                  </motion.button>

                  {!currentTrack && (
                    <a href="https://linktr.ee/kiut_goodlife" target="_blank" rel="noopener noreferrer">
                      <motion.button
                        whileHover={{ scale: 1.03, borderColor: "rgba(212,175,55,0.5)", color: "#D4AF37" }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white/60 transition-all text-sm font-medium"
                      >
                        <ExternalLink size={13} /> Stream Everywhere
                      </motion.button>
                    </a>
                  )}
                </div>

                {currentTrack && (
                  <div className="mt-6 w-full max-w-xs">
                    <div
                      className="h-[3px] rounded-full overflow-hidden cursor-pointer"
                      style={{ background: "rgba(255,255,255,0.09)" }}
                      onClick={(e) => {
                        const r = e.currentTarget.getBoundingClientRect();
                        seek((e.clientX - r.left) / r.width);
                      }}
                    >
                      <div
                        className="h-full transition-all duration-150"
                        style={{
                          width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
                          background: "linear-gradient(to right, #D4AF37, #f0c842)",
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5 text-[10px] text-white/20 font-mono tabular-nums">
                      <span>{Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, "0")}</span>
                      <span>{currentTrack.duration}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Discography Timeline ──────────────────────────────────── */}
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 overflow-hidden"
        >
          <h2 className="font-display text-3xl md:text-4xl font-light tracking-[0.2em] text-white text-center mb-16 uppercase">
            Discography <span className="text-gold">Timeline</span>
          </h2>
          <div className="relative py-32 px-6 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {/* Animated connecting line */}
            <div className="absolute top-1/2 left-10 right-10 h-[1px] -translate-y-1/2 overflow-hidden">
              <motion.div
                className="h-full"
                style={{ background: "linear-gradient(to right, rgba(255,255,255,0.05), rgba(212,175,55,0.40), rgba(255,255,255,0.05))" }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={timelineInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              />
            </div>

            <div className="flex justify-between items-center min-w-[800px] max-w-4xl mx-auto relative z-10 px-10">
              {timelineEvents.map((event, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={timelineInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="relative group flex flex-col items-center"
                >
                  {/* Hover tooltip */}
                  <div className="absolute bottom-full mb-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 pointer-events-none w-56 z-20">
                    <div className="bg-[#111] border border-gold/22 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#111] border-b border-r border-gold/22 transform rotate-45" />
                      <img src={event.image} alt={event.title} className="w-full aspect-square object-cover rounded-xl mb-3" loading="lazy" />
                      <div className="text-center">
                        <h4 className="text-white font-bold text-sm mb-1">{event.title}</h4>
                        <span className="inline-block px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-bold"
                          style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.28)", color: "#D4AF37" }}>
                          {event.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Node */}
                  <div className="w-5 h-5 rounded-full bg-black border-[3px] border-gold relative group-hover:scale-150 transition-transform duration-300 group-hover:bg-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] cursor-pointer z-10">
                    <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-20 group-hover:opacity-0" />
                  </div>

                  {/* Year label */}
                  <div className="absolute top-full mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <p className="text-gold text-[10px] font-bold tracking-widest uppercase">{event.year}</p>
                  </div>

                  {/* Always-visible year below on mobile */}
                  <p className="absolute top-full mt-8 text-white/20 text-[9px] font-mono tracking-widest">{event.year}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Albums ─────────────────────────────────────────────────── */}
        <div className="space-y-28 mb-32">
          {albums.map((album, i) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-20`}
              data-testid={`album-row-${album.id}`}
            >
              <div className="w-full md:w-1/2"><AlbumCard album={album} /></div>

              <div className={`w-full md:w-1/2 text-center ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                {/* Type badge */}
                <span className="inline-block px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest mb-4"
                  style={{ background: "rgba(212,175,55,0.10)", borderColor: "rgba(212,175,55,0.22)", color: "#D4AF37" }}>
                  {album.type}
                </span>

                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 uppercase tracking-wider leading-tight">
                  {album.title}
                </h2>

                {/* Metadata row */}
                <div className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 mb-6 text-white/30 text-[11px] font-light ${i % 2 === 0 ? "justify-center md:justify-start" : "justify-center md:justify-end"}`}>
                  <span>Released {album.year}</span>
                  <span className="text-white/12">·</span>
                  <span>{album.tracks} tracks</span>
                  <span className="text-white/12">·</span>
                  <span>{album.genre}</span>
                </div>

                {/* Platform badges */}
                <div className={`flex flex-wrap gap-2 mb-8 ${i % 2 === 0 ? "justify-center md:justify-start" : "justify-center md:justify-end"}`}>
                  {album.platforms.map((pid) => (
                    <PlatformBadge key={pid} id={pid} />
                  ))}
                </div>

                {/* CTA buttons */}
                <div className={`flex flex-wrap gap-3 ${i % 2 === 0 ? "justify-center md:justify-start" : "justify-center md:justify-end"}`}>
                  <a href={album.link} target="_blank" rel="noopener noreferrer">
                    <motion.button
                      whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(212,175,55,0.38)" }}
                      whileTap={{ scale: 0.96 }}
                      className="px-8 py-3.5 font-bold uppercase tracking-widest transition-all duration-300 rounded-full inline-flex items-center gap-2 text-sm"
                      style={{
                        background: "linear-gradient(135deg, #D4AF37 0%, #c49a2e 100%)",
                        color: "#000",
                        boxShadow: "0 0 24px rgba(212,175,55,0.22)",
                      }}
                      data-testid={`button-listen-${album.id}`}
                    >
                      <Play size={13} fill="currentColor" className="ml-0.5" /> Listen Now
                    </motion.button>
                  </a>
                  <a href={album.link} target="_blank" rel="noopener noreferrer">
                    <motion.button
                      whileHover={{ scale: 1.03, borderColor: "rgba(212,175,55,0.5)", color: "#D4AF37" }}
                      whileTap={{ scale: 0.97 }}
                      className="px-8 py-3.5 rounded-full border border-white/15 text-white/50 font-bold uppercase tracking-widest transition-all duration-300 inline-flex items-center gap-2 text-sm"
                    >
                      <ExternalLink size={13} /> Stream Everywhere
                    </motion.button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Grouped Track List ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 mb-8"
        >
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-2">Complete</p>
              <h2 className="font-display text-3xl md:text-4xl font-light tracking-[0.2em] text-white uppercase">
                Track List
              </h2>
            </div>
            <span className="text-white/20 text-sm font-light tracking-widest">{ALL_TRACKS.length} tracks</span>
          </div>

          <div className="space-y-10">
            {TRACK_GROUPS.map((group) => (
              <div key={group.label}>
                <div className="flex items-center gap-3 mb-3 px-1">
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 border border-white/8 shadow-sm">
                    <img src={group.image} alt={group.label} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex items-center gap-2.5 min-w-0 flex-wrap">
                    <span className="text-white font-bold text-[13px] uppercase tracking-wider">{group.label}</span>
                    <span className="text-white/20 text-xs">·</span>
                    <span className="text-white/30 text-xs">{group.year}</span>
                    <span className="text-white/20 text-xs">·</span>
                    <span className="text-white/20 text-xs">{group.tracks.length} {group.tracks.length === 1 ? "track" : "tracks"}</span>
                  </div>
                  <div className="flex-1 h-px bg-white/[0.04] ml-2" />
                </div>

                <motion.div
                  className="rounded-2xl overflow-hidden bg-[#070707] border border-white/[0.05] divide-y divide-white/[0.03]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  variants={staggerContainer(0.05)}
                >
                  {group.tracks.map((track, idx) => (
                    <TrackRow key={track.id} track={track} index={idx} />
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Streaming Platforms ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="my-24"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-20" />

          <div className="text-center mb-12">
            <p className="text-gold text-[10px] font-bold tracking-[0.48em] uppercase mb-3">Available On</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">
              Stream <span className="text-gold">Everywhere</span>
            </h2>
          </div>

          <div className="relative rounded-3xl border border-white/[0.06] overflow-hidden p-8 md:p-12"
            style={{ background: "linear-gradient(135deg,#0c0c0c 0%,#0a0a06 100%)" }}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.05),transparent_60%)]" />

            <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10">
              {(Object.entries(PLATFORMS) as [PlatformId, typeof PLATFORMS[PlatformId]][]).map(([id, p], i) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-full border transition-all duration-300 cursor-default"
                  style={{
                    borderColor: `${p.color}30`,
                    background: `${p.color}0a`,
                    color: p.color,
                    boxShadow: `0 0 0 0 ${p.color}00`,
                  }}
                  data-testid={`badge-platform-${id}`}
                >
                  <span className="w-5 h-5 flex-shrink-0">{p.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: p.color }}>
                    {p.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://linktr.ee/kiut_goodlife" target="_blank" rel="noopener noreferrer">
                <motion.button
                  data-testid="button-stream-all"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(212,175,55,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gold text-midnight font-bold uppercase tracking-widest text-[11px] shadow-[var(--glow-gold)] transition-shadow duration-300"
                >
                  <ExternalLink size={13} /> Stream the Latest EP
                </motion.button>
              </a>
              <a href="https://linktr.ee/kiutmusic" target="_blank" rel="noopener noreferrer">
                <motion.button
                  data-testid="button-all-links"
                  whileHover={{ scale: 1.03, borderColor: "rgba(212,175,55,0.4)", color: "#D4AF37" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white/55 font-bold uppercase tracking-widest text-[11px] transition-all duration-300"
                >
                  All Music Links
                </motion.button>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Music Discovery ──────────────────────────────────────── */}
        <MusicDiscovery />

      </div>
      <SiteFooter />
    </div>
  );
}
