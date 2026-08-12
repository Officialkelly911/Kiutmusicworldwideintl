import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, Pause, ExternalLink, Music2, Star } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { useState, useRef, useEffect } from "react";
import SiteFooter from "../components/SiteFooter";
import { PremiumCTAButton } from "@/components/PremiumCTAButton";
import { usePlayer } from "@/context/PlayerContext";
import { useSEO } from "@/lib/useSEO";
import { track } from "@/lib/analytics";
import {
  ALL_TRACKS, TRACK_GROUPS, ALBUMS, type Track, type AlbumMeta,
  getAlbumPreviewAudio, getTrackStreamingUrl,
  GOOD_LIFE_EP_ART, SOFA_EP_ART, ANNOUNCE_ART, ELIGIBLE_EP_ART,
} from "@/data/tracks";
import { staggerContainer, staggerItem, viewport } from "@/lib/motion";

// Image paths are imported from tracks.ts (GOOD_LIFE_EP_ART, etc.)
const musicHeroImage = "/images/hero/music/music-source.png";

// ─── Platform definitions ─────────────────────────────────────────────────────
type PlatformId = "spotify" | "apple" | "audiomack" | "youtube" | "boomplay" | "amazon" | "soundcloud" | "deezer";

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
  amazon: {
    label: "Amazon Music",
    color: "#00A8E1",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.85 13.5c-2.7 2.02-6.6 2.19-9.7.42a.45.45 0 01.44-.78c2.77 1.56 6.2 1.4 8.55-.38a.45.45 0 11.71.55v.19zM17.5 13.9c-.16.18-.4.2-.6.07-1.66-1.02-3.75-1.25-6.25-.68a.5.5 0 01-.22-.98c2.75-.62 5.11-.35 7.02.83.24.15.28.5.05.76zM17.6 11.6c-2-1.19-5.28-1.3-7.18-.72a.6.6 0 01-.35-1.15c2.18-.66 5.83-.53 8.13.83a.6.6 0 01-.6 1.04z"/>
      </svg>
    ),
  },
  soundcloud: {
    label: "SoundCloud",
    color: "#FF7700",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 9.5a4 4 0 013.9 3.15 2.6 2.6 0 11-.28 5.17H9.6a.6.6 0 01-.6-.6V8.2a.4.4 0 01.25-.37c.75-.3 1.55-.46 2.4-.46 2.4 0 4.42 1.62 5.03 3.83A4 4 0 0117 9.5zM7.8 8.6v8.6a.6.6 0 01-1.2 0V8.6a.6.6 0 011.2 0zM5.6 10v7.2a.6.6 0 01-1.2 0V10a.6.6 0 011.2 0zM3.4 11.4v5.8a.6.6 0 01-1.2 0v-5.8a.6.6 0 011.2 0z"/>
      </svg>
    ),
  },
  deezer: {
    label: "Deezer",
    color: "#A238FF",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 17.2h3.6V19H2v-1.8zm4.9-2.6h3.6v4.4H6.9v-4.4zm4.9-2.6h3.6v7h-3.6v-7zM16.7 9h3.6v10h-3.6V9zm4.9-4.4H22v14.4h-.4V4.6z"/>
      </svg>
    ),
  },
};

// Albums are now sourced from tracks.ts — see ALBUMS export.

const timelineEvents = [
  { year: "2019", title: "Debut Era",   type: "Singles",  image: ELIGIBLE_EP_ART  },
  { year: "2021", title: "Announce",    type: "Project",  image: ANNOUNCE_ART    },
  { year: "2022", title: "Eligible EP", type: "EP",       image: ELIGIBLE_EP_ART  },
  { year: "2023", title: "S.O.F.A EP",  type: "EP",       image: SOFA_EP_ART     },
  { year: "2025", title: "Good Life EP",type: "EP",       image: GOOD_LIFE_EP_ART },
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
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border transition-all duration-fast cursor-default"
      style={{
        borderColor: `${p.color}28`,
        background: `${p.color}0d`,
        color: p.color,
      }}
    >
      {p.icon}
      <span className="text-xs font-bold uppercase tracking-wider hidden sm:block" style={{ color: p.color }}>
        {p.label}
      </span>
    </motion.div>
  );
}

const AlbumCard = ({ album, previewAudio }: { album: AlbumMeta; previewAudio: string | null }) => {
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isHovered && previewAudio) {
      audioRef.current?.play().catch(() => {});
    } else {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
    }
  }, [isHovered, previewAudio]);

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
        className="relative rounded-xl p-[1px]"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(var(--gold-primary-rgb),0.7) 0%, rgba(var(--gold-primary-rgb),0.15) 50%, rgba(var(--gold-primary-rgb),0.5) 100%)"
            : "linear-gradient(135deg, rgba(var(--gold-primary-rgb),0.15) 0%, rgba(var(--white-rgb),0.05) 50%, rgba(var(--gold-primary-rgb),0.08) 100%)",
        }}
      >
        {/* Glass inner */}
        <div
          className="relative rounded-[calc(1rem-1px)] overflow-hidden"
          style={{
            background: "rgba(var(--midnight-black-rgb),0.92)",
            boxShadow: isHovered
              ? "0 30px 70px -12px rgba(var(--gold-primary-rgb),0.30)"
              : "0 20px 50px -12px rgba(var(--black-rgb),0.80)",
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
                style={{ background: "rgba(var(--black-rgb),0.60)", backdropFilter: "blur(6px)" }}
              >
                <motion.div
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.7 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="w-20 h-20 rounded-full flex items-center justify-center text-midnight shadow-glow-gold-hover mb-4"
                  style={{ background: "var(--color-gold)" }}
                >
                  <Play size={32} className="ml-1.5" fill="currentColor" />
                </motion.div>
                {previewAudio && (
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
          <div className="px-4 py-3 border-t border-white/[0.05]" style={{ background: "rgba(var(--white-rgb),0.02)" }}>
            <div className="flex items-center justify-between">
              <span className="text-gold text-xs font-black uppercase tracking-[0.22em]">Official Release</span>
              <span className="text-white/30 text-xs font-mono">{album.trackCount} tracks · {album.yearShort}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-[80px] -z-10 rounded-full transition-opacity duration-slow pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(var(--gold-primary-rgb),0.15), transparent 70%)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {previewAudio && <audio ref={audioRef} src={previewAudio} preload="none" loop />}
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
      className={`group relative flex items-center gap-3 md:gap-4 px-3 md:px-5 py-3.5 rounded-xl cursor-pointer transition-all duration-fast ${
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
          className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gold shadow-glow-gold"
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
        <span className={`font-semibold text-xs leading-snug truncate transition-colors duration-fast ${
          isActive ? "text-gold" : "text-white group-hover:text-gold"
        }`}>
          {track.title}
        </span>
        <span className="mt-0.5">
          {track.album !== "Single" ? (
            <span className={`inline-block px-1.5 py-[1px] rounded text-xs font-bold uppercase tracking-wider ${
              track.albumType === "ep" ? "bg-gold/12 text-gold/80" : "bg-white/6 text-white/35"
            }`}>{track.album}</span>
          ) : (
            <span className="text-white/25 text-xs">{track.status === "recently-released" ? "Recently Released" : track.released ?? "—"}</span>
          )}
        </span>
      </div>

      <span className="text-white/25 text-xs font-mono flex-shrink-0 hidden sm:block tabular-nums">{track.duration ?? "—"}</span>

      <button
        onClick={(e) => { e.stopPropagation(); playTrack(track); }}
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-50 disabled:pointer-events-none ${
          isActive && isPlaying
            ? "bg-gold text-midnight shadow-glow-gold"
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
    { from: ALBUMS[0], to: ALBUMS[1] },
    { from: ALBUMS[1], to: ALBUMS[3] },
    { from: ALBUMS[2], to: ALBUMS[0] },
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
        <p className="text-gold text-xs font-bold tracking-[0.45em] uppercase mb-3">Explore More</p>
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
                whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(var(--gold-primary-rgb),0.10)" }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-md overflow-hidden border border-white/[0.06] hover:border-gold/25 transition-colors duration-normal"
                style={{ background: "var(--color-midnight)" }}
              >
                {/* "Enjoyed X" label */}
                <div className="px-4 pt-4 pb-2">
                  <p className="text-white/25 text-xs font-light tracking-widest uppercase">
                    If you enjoyed <span className="text-white/45">{from.title}</span>
                  </p>
                </div>

                {/* Album artwork */}
                <div className="relative mx-4 mb-3 rounded-xl overflow-hidden aspect-square">
                  <img
                    src={to.image}
                    alt={to.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-cinematic group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-normal">
                    <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-glow-gold-hover">
                      <Play size={18} className="ml-0.5 text-midnight" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="px-4 pb-4">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-gold/10 border border-gold/22 text-gold text-xs font-bold uppercase tracking-widest mb-2">
                    {to.type}
                  </span>
                  <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider leading-tight mb-0.5">
                    {to.title}
                  </h3>
                  <p className="text-white/28 text-xs font-light">{to.genre} · {to.yearShort}</p>

                  <div className="mt-3 flex items-center gap-1.5 text-gold/60 hover:text-gold transition-colors text-xs font-bold uppercase tracking-widest">
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
  useSEO({
    title: "Music | Kiut Music Worldwide",
    description: "Stream all albums and singles from Nigerian-American artist Kiut — Afro-Caribbean sound available on Spotify, Apple Music, Audiomack, and everywhere.",
    canonical: "https://kiutmusic.com/music",
  });

  const { currentTrack, isPlaying, playTrack, currentTime, duration, seek } = usePlayer();
  const featuredTrack = ALL_TRACKS.find((track) => track.title === "Romantic Love") ?? ALL_TRACKS[0];
  const playlistSeconds = ALL_TRACKS.reduce((sum, t) => {
    if (!t.duration) return sum;
    const [m, s] = t.duration.split(":").map(Number);
    return sum + m * 60 + s;
  }, 0);
  const playlistDuration = `${Math.floor(playlistSeconds / 60)} Min`;
  const [playlistSaved, setPlaylistSaved] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen bg-black pb-16 relative overflow-x-hidden">
      {/* ── Ambient background ──────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: "rgba(var(--gold-primary-rgb),0.025)" }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: "rgba(var(--gold-primary-rgb),0.02)" }}
        />
        <motion.div
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 20, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 8 }}
          className="absolute top-[50%] left-[45%] w-[300px] h-[300px] rounded-full blur-[100px]"
          style={{ background: "rgba(100,50,255,0.018)" }}
        />
      </div>

      {/* ── Universal Hero ──────────────────────────────────────────── */}
      <HeroSection
        slug="music"
        imageSrc={musicHeroImage}
        alt="Kiut reclining on a beach with roses and a teddy bear"
        className="min-h-[80vh] flex items-end pb-24"
        parallax={false}
        imageClassName="w-full h-full object-cover object-[center_60%] md:object-[center_58%]"
        priority
        overlay={
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/20" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[320px] bg-gold/[0.06] blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
          </>
        }
        contentClassName="relative z-10 max-w-7xl mx-auto px-6 pt-36 w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/[0.07] backdrop-blur-sm mb-7">
            <Music2 size={11} className="text-gold" />
            <span className="text-gold text-[10px] font-bold tracking-[0.35em] uppercase">Latest Releases</span>
          </div>

          <h1 className="font-display text-[clamp(3rem,10vw,7rem)] font-bold uppercase tracking-tight leading-[0.92] text-white mb-6">
            Discover<br />
            <span className="text-gold">The Sound</span>
          </h1>

          <p className="text-white/55 text-lg font-light max-w-md leading-relaxed mb-10">
            Explore Kiut Music across singles, albums, collaborations, and exclusive releases.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <PremiumCTAButton
              as="a"
              href="https://linktr.ee/kiut_goodlife"
              target="_blank"
              rel="noopener noreferrer"
              icon={<Play size={13} fill="currentColor" className="ml-0.5" />}
            >
              Listen Now
            </PremiumCTAButton>
            <a href="https://linktr.ee/kiut_goodlife" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="btn-base btn-secondary !border-white/15 !text-white"
              >
                Latest Release <ExternalLink size={13} />
              </motion.button>
            </a>
          </div>
        </motion.div>
      </HeroSection>

      <div className="max-w-5xl mx-auto px-6 relative z-10 pt-12">

        {/* ── Featured Track Hero ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-28"
        >
          <div className="relative rounded-xl overflow-hidden border border-gold/12 shadow-xl"
            style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--midnight-black) 92%, var(--dark-gold) 8%) 0%, var(--color-charcoal) 50%, var(--midnight-black) 100%)" }}>
            <div className="absolute top-0 right-0 w-80 h-80 blur-[110px] rounded-full pointer-events-none" style={{ background: "rgba(var(--gold-primary-rgb),0.08)" }} />
            <div className="absolute bottom-0 left-0 w-56 h-56 blur-[90px] rounded-full pointer-events-none" style={{ background: "rgba(100,50,255,0.04)" }} />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
              <motion.div
                className="w-44 h-44 md:w-56 md:h-56 flex-shrink-0 rounded-md overflow-hidden shadow-xl border border-white/[0.07]"
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
                <span className="inline-block px-3 py-1.5 rounded-full border text-xs font-black uppercase tracking-[0.22em] mb-4 leading-none"
                  style={{ background: "rgba(var(--gold-primary-rgb),0.12)", borderColor: "rgba(var(--gold-primary-rgb),0.28)", color: "var(--color-gold)" }}>
                  {currentTrack ? "Now Playing" : "Featured Release"}
                </span>

                <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-2 uppercase tracking-wider">
                  {currentTrack ? currentTrack.title : featuredTrack.title}
                </h2>
                <p className="text-white/40 text-sm mb-2">
                  {currentTrack
                    ? `${currentTrack.artist} · ${currentTrack.album}`
                     : `Kiut · ${featuredTrack.status === "recently-released" ? "Recently Released" : featuredTrack.released ?? "Available everywhere"}`}
                </p>
                {!currentTrack && (
                  <p className="text-white/25 text-xs mb-8">
                    {featuredTrack.status === "recently-released"
                      ? "Romantic Love · Original Single"
                      : "Available everywhere"}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                  <PremiumCTAButton
                    as="button"
                    onClick={() => playTrack(currentTrack ?? featuredTrack)}
                    icon={
                      currentTrack && isPlaying
                        ? <Pause size={15} fill="currentColor" />
                        : <Play size={15} fill="currentColor" className="ml-0.5" />
                    }
                  >
                    {currentTrack && isPlaying ? "Pause" : "Listen Now"}
                  </PremiumCTAButton>

                  {!currentTrack && featuredTrack.status !== "recently-released" && (
                    <a href="https://linktr.ee/kiut_goodlife" target="_blank" rel="noopener noreferrer">
                      <motion.button
                        whileHover={{ scale: 1.03, borderColor: "rgba(var(--gold-primary-rgb),0.5)", color: "var(--color-gold)" }}
                        whileTap={{ scale: 0.97 }}
                        className="btn-base btn-secondary"
                      >
                        <ExternalLink size={13} /> Stream Everywhere
                      </motion.button>
                    </a>
                  )}
                </div>

                {!currentTrack && featuredTrack.status !== "recently-released" && (
                  <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start mt-6">
                    {(["spotify", "apple", "youtube", "audiomack", "boomplay", "amazon", "deezer", "soundcloud"] as PlatformId[]).map((id) => (
                      <PlatformBadge key={id} id={id} />
                    ))}
                  </div>
                )}

                {currentTrack && (
                  <div className="mt-6 w-full max-w-xs">
                    <div
                      className="h-[3px] rounded-full overflow-hidden cursor-pointer"
                      style={{ background: "rgba(var(--white-rgb),0.09)" }}
                      onClick={(e) => {
                        const r = e.currentTarget.getBoundingClientRect();
                        seek((e.clientX - r.left) / r.width);
                      }}
                    >
                      <div
                        className="h-full transition-all duration-fast"
                        style={{
                          width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
                          background: "linear-gradient(to right, var(--color-gold), var(--color-gold-hover))",
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5 text-xs text-white/20 font-mono tabular-nums">
                      <span>{Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, "0")}</span>
                      <span>{currentTrack.duration ?? "—"}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Music Statistics ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-28"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {([
              { value: "4",   label: "EPs Released",   sub: "2021 – 2025"       },
              { value: "24+", label: "Total Tracks",    sub: "Full catalogue"    },
              { value: "5+",  label: "Platforms",       sub: "Streaming globally" },
              { value: "6+",  label: "Years",           sub: "Creating music"    },
            ] as const).map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-6 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-gold/20 transition-all duration-normal text-center group"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                <span className="font-display text-4xl md:text-5xl font-bold text-gold leading-none block mb-2">{stat.value}</span>
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-white/25 text-xs">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Lyrics Highlight ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-28 py-20 px-8 md:px-16 rounded-xl overflow-hidden text-center"
          style={{ background: "linear-gradient(135deg, rgba(var(--gold-primary-rgb),0.04) 0%, var(--midnight-black) 50%, rgba(var(--gold-primary-rgb),0.03) 100%)", border: "1px solid rgba(var(--gold-primary-rgb),0.10)" }}
        >
          {/* Decorative quote marks */}
          <div className="absolute top-6 left-8 font-display text-[7rem] leading-none font-bold text-gold opacity-[0.06] select-none pointer-events-none" aria-hidden="true">
            &ldquo;
          </div>
          <div className="absolute bottom-0 right-8 font-display text-[7rem] leading-none font-bold text-gold opacity-[0.06] select-none pointer-events-none rotate-180" aria-hidden="true">
            &ldquo;
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[160px] blur-[90px] rounded-full pointer-events-none" style={{ background: "rgba(var(--gold-primary-rgb),0.05)" }} />

          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-8 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold/50" /> Featured Lyrics
            </p>
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="font-editorial italic text-white/70 text-xl md:text-3xl leading-relaxed font-light"
            >
              "Living the good life, every night feels right — the world is mine when the beat drops right."
            </motion.blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
              <span className="text-white/30 text-xs uppercase tracking-widest">Good Life EP · Kiut Music</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
            </div>
            <div className="mt-6">
              <a
                href="https://linktr.ee/kiut_goodlife"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold/60 text-xs hover:text-gold transition-colors duration-fast uppercase tracking-widest"
              >
                <Play size={9} fill="currentColor" /> Stream Good Life EP
              </a>
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
                style={{ background: "linear-gradient(to right, rgba(var(--white-rgb),0.05), rgba(var(--gold-primary-rgb),0.40), rgba(var(--white-rgb),0.05))" }}
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
                  <div className="absolute bottom-full mb-8 opacity-0 group-hover:opacity-100 transition-all duration-normal translate-y-4 group-hover:translate-y-0 pointer-events-none w-56 z-20">
                    <div className="bg-charcoal border border-gold/22 rounded-md p-4 shadow-xl">
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-charcoal border-b border-r border-gold/22 transform rotate-45" />
                      <img src={event.image} alt={event.title} className="w-full aspect-square object-cover rounded-xl mb-3" loading="lazy" />
                      <div className="text-center">
                        <h3 className="text-white font-bold text-sm mb-1">{event.title}</h3>
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs uppercase tracking-widest font-bold"
                          style={{ background: "rgba(var(--gold-primary-rgb),0.12)", border: "1px solid rgba(var(--gold-primary-rgb),0.28)", color: "var(--color-gold)" }}>
                          {event.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Node */}
                  <div className="w-5 h-5 rounded-full bg-black border-[3px] border-gold relative group-hover:scale-150 transition-transform duration-normal group-hover:bg-gold shadow-glow-gold cursor-pointer z-10">
                    <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-20 group-hover:opacity-0" />
                  </div>

                  {/* Year label */}
                  <div className="absolute top-full mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-normal pointer-events-none">
                    <p className="text-gold text-xs font-bold tracking-widest uppercase">{event.year}</p>
                  </div>

                  {/* Always-visible year below on mobile */}
                  <p className="absolute top-full mt-8 text-white/20 text-xs font-mono tracking-widest">{event.year}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Discography Grid ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-32"
        >
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-3">Full Catalogue</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">
              Discography <span className="text-gold">Grid</span>
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer(0.06)}
          >
            {ALBUMS.map((album) => (
              <motion.a
                key={album.id}
                href={album.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-lg overflow-hidden border border-white/[0.07] bg-white/[0.02] hover:border-gold/30 transition-colors duration-normal"
                data-testid={`grid-album-${album.id}`}
                aria-label={`${album.title} — listen now`}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={album.image}
                    alt={album.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-normal group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-colors duration-normal" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-normal" style={{ boxShadow: "inset 0 0 40px rgba(var(--gold-primary-rgb),0.25)" }} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-normal scale-75 group-hover:scale-100">
                    <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-glow-gold">
                      <Play size={14} fill="var(--midnight-black)" className="text-midnight ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-white text-xs font-bold uppercase tracking-wide truncate group-hover:text-gold transition-colors duration-fast">
                    {album.title}
                  </h3>
                  <p className="text-white/30 text-[11px] truncate">{album.yearShort} · {album.genre}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Albums ─────────────────────────────────────────────────── */}
        <div className="space-y-28 mb-32">
          {ALBUMS.map((album, i) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-20`}
              data-testid={`album-row-${album.id}`}
            >
              <div className="w-full md:w-1/2"><AlbumCard album={album} previewAudio={getAlbumPreviewAudio(album.id)} /></div>

              <div className={`w-full md:w-1/2 text-center ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                {/* Type badge */}
                <span className="inline-block px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ background: "rgba(var(--gold-primary-rgb),0.10)", borderColor: "rgba(var(--gold-primary-rgb),0.22)", color: "var(--color-gold)" }}>
                  {album.type}
                </span>

                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 uppercase tracking-wider leading-tight">
                  {album.title}
                </h2>

                {/* Metadata row */}
                <div className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 mb-6 text-white/30 text-xs font-light ${i % 2 === 0 ? "justify-center md:justify-start" : "justify-center md:justify-end"}`}>
                  <span>Released {album.year}</span>
                  <span className="text-white/12">·</span>
                  <span>{album.trackCount} tracks</span>
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
                  <PremiumCTAButton
                    as="a"
                    href={album.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`button-listen-${album.id}`}
                    icon={<Play size={13} fill="currentColor" className="ml-0.5" />}
                  >
                    Listen Now
                  </PremiumCTAButton>
                  <a href={album.link} target="_blank" rel="noopener noreferrer">
                    <motion.button
                      whileHover={{ scale: 1.03, borderColor: "rgba(var(--gold-primary-rgb),0.5)", color: "var(--color-gold)" }}
                      whileTap={{ scale: 0.97 }}
                      className="btn-base btn-secondary"
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
              <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-2">Complete</p>
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
                    <span className="text-white font-bold text-xs uppercase tracking-wider">{group.label}</span>
                    <span className="text-white/20 text-xs">·</span>
                    <span className="text-white/30 text-xs">{group.year}</span>
                    <span className="text-white/20 text-xs">·</span>
                    <span className="text-white/20 text-xs">{group.tracks.length} {group.tracks.length === 1 ? "track" : "tracks"}</span>
                  </div>
                  <div className="flex-1 h-px bg-white/[0.04] ml-2" />
                </div>

                <motion.div
                  className="rounded-md overflow-hidden bg-midnight border border-white/[0.05] divide-y divide-white/[0.03]"
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
            <p className="text-gold text-xs font-bold tracking-[0.48em] uppercase mb-3">Available On</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">
              Stream <span className="text-gold">Everywhere</span>
            </h2>
          </div>

          <div className="relative rounded-xl border border-white/[0.06] overflow-hidden p-8 md:p-12"
            style={{ background: "linear-gradient(135deg, var(--midnight-black) 0%, color-mix(in srgb, var(--midnight-black) 95%, var(--dark-gold) 5%) 100%)" }}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(var(--gold-primary-rgb),0.05),transparent_60%)]" />

            <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10">
              {(Object.entries(PLATFORMS) as [PlatformId, typeof PLATFORMS[PlatformId]][]).map(([id, p], i) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-full border transition-all duration-normal cursor-default"
                  style={{
                    borderColor: `${p.color}30`,
                    background: `${p.color}0a`,
                    color: p.color,
                    boxShadow: `0 0 0 0 ${p.color}00`,
                  }}
                  data-testid={`badge-platform-${id}`}
                >
                  <span className="w-5 h-5 flex-shrink-0">{p.icon}</span>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: p.color }}>
                    {p.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <PremiumCTAButton
                as="a"
                href="https://linktr.ee/kiut_goodlife"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-stream-all"
                icon={<ExternalLink size={13} />}
              >
                Stream the Latest EP
              </PremiumCTAButton>
              <a href="https://linktr.ee/kiutmusic" target="_blank" rel="noopener noreferrer">
                <motion.button
                  data-testid="button-all-links"
                  whileHover={{ scale: 1.03, borderColor: "rgba(var(--gold-primary-rgb),0.4)", color: "var(--color-gold)" }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-base btn-secondary"
                >
                  All Music Links
                </motion.button>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Featured Playlist ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 mb-12"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-20" />

          <div
            className="relative rounded-xl border border-gold/15 overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(var(--gold-primary-rgb),0.04) 0%, var(--midnight-black) 60%, rgba(var(--gold-primary-rgb),0.02) 100%)" }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full pointer-events-none" style={{ background: "rgba(var(--gold-primary-rgb),0.08)" }} />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
              {/* Artwork */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-44 h-44 md:w-52 md:h-52 flex-shrink-0 rounded-xl overflow-hidden border border-white/[0.09] shadow-xl"
              >
                <img
                  src={GOOD_LIFE_EP_ART}
                  alt="Kiut Essentials Playlist"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                  <PlayingBars />
                </div>
              </motion.div>

              {/* Content */}
              <div className="text-center md:text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-4">
                  Featured Playlist
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-wider leading-tight mb-3">
                  Kiut <span className="text-gold">Essentials</span>
                </h2>
                <p className="text-white/40 text-sm leading-relaxed max-w-md mb-4">
                  The definitive Kiut Music listening experience. From debut singles to the latest EP — a curated journey through the sound, start to finish.
                </p>
                <p className="text-white/25 text-xs mb-8">{ALL_TRACKS.length} Tracks · {playlistDuration}</p>
                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                  <PremiumCTAButton
                    as="a"
                    href="https://linktr.ee/kiutmusic"
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={<Play size={13} fill="currentColor" className="ml-0.5" />}
                  >
                    Listen Now
                  </PremiumCTAButton>
                  <motion.button
                    onClick={() => setPlaylistSaved((v) => !v)}
                    whileHover={{ scale: 1.03, borderColor: "rgba(var(--gold-primary-rgb),0.5)", color: "var(--color-gold)" }}
                    whileTap={{ scale: 0.97 }}
                    aria-pressed={playlistSaved}
                    className="btn-base btn-secondary"
                  >
                    <Star size={13} fill={playlistSaved ? "currentColor" : "none"} />
                    {playlistSaved ? "Saved" : "Save Playlist"}
                  </motion.button>
                  <a href="https://linktr.ee/kiutmusic" target="_blank" rel="noopener noreferrer">
                    <motion.button
                      whileHover={{ scale: 1.03, borderColor: "rgba(var(--gold-primary-rgb),0.5)", color: "var(--color-gold)" }}
                      whileTap={{ scale: 0.97 }}
                      className="btn-base btn-secondary"
                    >
                      <ExternalLink size={13} /> All Music Links
                    </motion.button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Music Discovery ──────────────────────────────────────── */}
        {/* ── Behind The Music ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-16" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: editorial copy */}
            <div>
              <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/50" /> Behind The Music
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-5 leading-[1.1]">
                The Story<br /><span className="text-gold">Behind The Sound</span>
              </h2>
              <p className="text-white/45 text-sm leading-relaxed mb-4">
                Kiut's music is rooted in lived experience — the energy of Lagos streets, the late-night studio sessions, the journey of an artist building something global from the ground up.
              </p>
              <p className="text-white/28 text-sm leading-relaxed mb-4">
                Every EP is a chapter: from the raw ambition of early singles to the refined, cinematic production of the Good Life EP. The sound evolves, but the authenticity never changes.
              </p>
              <p className="text-white/28 text-sm leading-relaxed mb-8">
                Inspired by afrobeats, R&B, and the intersection of African and global music culture — Kiut crafts music that feels both local and universal, intimate and expansive.
              </p>

              <div className="flex flex-wrap gap-2">
                {["Afrobeats", "R&B", "Afro-Pop", "World Music", "Soul"].map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/[0.09] text-white/40 bg-white/[0.02]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: process cards */}
            <div className="space-y-4">
              {([
                { icon: "✦", title: "Lagos Roots",        desc: "Born from the vibrant Afrobeats scene — every track carries the DNA of Lagos culture and street energy." },
                { icon: "◈", title: "Studio Process",     desc: "Weeks of late-night sessions, layered production, and meticulous vocal arrangements bring each track to life." },
                { icon: "◉", title: "Global Vision",      desc: "From West Africa to Europe and North America — the music is made to travel, connect, and move." },
              ] as const).map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-gold/15 transition-all duration-normal group"
                >
                  <span className="text-gold/50 text-lg leading-none pt-0.5 group-hover:text-gold transition-colors duration-fast flex-shrink-0" aria-hidden="true">{item.icon}</span>
                  <div>
                    <p className="text-white/70 text-sm font-bold mb-1 group-hover:text-white transition-colors duration-fast">{item.title}</p>
                    <p className="text-white/30 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Music Videos Preview ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/50" /> Videos
              </p>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white">
                Music <span className="text-gold">Videos</span>
              </h2>
            </div>
            <a
              href="https://www.youtube.com/@kiutrabatv"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-sm border border-white/12 text-white/40 hover:text-gold hover:border-gold/30 flex-shrink-0"
            >
              Watch All
            </a>
          </div>

          {/* Horizontal snap-scroll */}
          <div
            className="flex gap-4 overflow-x-auto pb-3"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" } as React.CSSProperties}
          >
            {([
              { youtubeId: "WRIWMkPvfEo", title: "Good Life — Official Video", year: "2025", duration: "3:42" },
              { youtubeId: "6mU3m1p-Dkk", title: "Twerk Instructor",           year: "2024", duration: "3:18" },
              { youtubeId: "T2mXpK8BLNk", title: "Eligible EP — Highlight",    year: "2024", duration: "4:05" },
              { youtubeId: "_2EMhX0wbWk", title: "Chikito — Glitch Session",   year: "2022", duration: "2:58" },
              { youtubeId: "oqJVcQoWDzw", title: "SOFA — Behind The Scenes",   year: "2023", duration: "5:12" },
            ] as const).map((vid, i) => (
              <motion.a
                key={vid.youtubeId}
                href={`https://www.youtube.com/watch?v=${vid.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex-shrink-0 w-[220px] md:w-[260px] rounded-xl overflow-hidden border border-white/[0.07] hover:border-gold/28 hover:shadow-[0_10px_35px_rgba(var(--gold-primary-rgb),0.09)] group transition-all duration-normal"
                style={{ scrollSnapAlign: "start" }}
                aria-label={`Watch ${vid.title}`}
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={`https://i.ytimg.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                    alt={vid.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-cinematic group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-normal">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ background: "rgba(var(--gold-primary-rgb),0.90)" }}>
                      <Play className="w-4 h-4 text-black ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white/70 text-[9px] font-mono px-1.5 py-0.5 rounded backdrop-blur-sm">
                    {vid.duration}
                  </span>
                </div>
                <div className="px-3 py-2.5" style={{ background: "var(--midnight-black)" }}>
                  <p className="text-white/65 text-xs font-medium group-hover:text-gold transition-colors duration-fast truncate">{vid.title}</p>
                  <p className="text-white/25 text-[9px] mt-0.5">{vid.year}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ── Newsletter CTA ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div
            className="relative rounded-xl border border-gold/15 overflow-hidden text-center p-12 md:p-16"
            style={{ background: "linear-gradient(160deg, rgba(var(--gold-primary-rgb),0.05) 0%, var(--midnight-black) 50%, rgba(var(--gold-primary-rgb),0.03) 100%)" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[160px] blur-[90px] rounded-full pointer-events-none" style={{ background: "rgba(var(--gold-primary-rgb),0.06)" }} />
            <div className="relative z-10">
              <p className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-5">Stay Connected</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4 leading-[1.1]">
                New Music<br /><span className="text-gold">First to You</span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-4 max-w-sm mx-auto">
                New releases, exclusive previews, behind-the-scenes access, and early drops — delivered before anywhere else.
              </p>
              <ul className="flex flex-wrap items-center justify-center gap-4 text-white/25 text-xs mb-8">
                {["New releases", "Exclusive previews", "Behind the scenes", "Early access"].map(item => (
                  <li key={item} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-gold/40" /> {item}
                  </li>
                ))}
              </ul>
              <PremiumCTAButton as="link" href="/newsletter" icon={<Music2 size={13} />} iconPosition="right">
                Join the Music List
              </PremiumCTAButton>
              <p className="text-white/18 text-[10px] font-light tracking-[0.22em] mt-5">Free · No spam · Unsubscribe anytime</p>
            </div>
          </div>
        </motion.div>

        <MusicDiscovery />

      </div>
      <SiteFooter />
    </div>
  );
}
