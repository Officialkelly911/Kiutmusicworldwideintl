import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, ExternalLink, Music2, PlayCircle, Radio } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SiteFooter from "../components/SiteFooter";
import { usePlayer } from "@/context/PlayerContext";
import { ALL_TRACKS, TRACK_GROUPS, type Track } from "@/data/tracks";

// ─── Image + audio constants ──────────────────────────────────────────────────
const goodLifeEP  = "/assets/images/Good_Life_EP_1767961904057.jpeg";
const sofaEP      = "/assets/images/SOFA_EP_1767961904056.png";
const announceImg = "/assets/images/KIUT_ANNOUNCE_1767961904055.png";
const eligibleEP  = "/assets/images/KIUT_ELIGIBLE_EP_1767961904056.png";

// ─── Album discography cards data ────────────────────────────────────────────
const albums = [
  { id: 1, title: "Good Life EP",                year: "Oct 30, 2025", type: "EP",      image: goodLifeEP,  link: "https://linktr.ee/kiut_goodlife?utm_source=linktree_profile_share&ltsid=bc67a3d6-887d-4ad8-ad3d-5fe5b92dd484", previewAudio: "/audio/makosa.m4a"  },
  { id: 2, title: "S.O.F.A (Songs From Archive)", year: "Nov 24, 2023", type: "EP",      image: sofaEP,      link: "https://bit.ly/m/KiutmusicSofaEP",   previewAudio: "/audio/aje.mp3"   },
  { id: 3, title: "Announce",                    year: "May 15, 2021", type: "Project", image: announceImg, link: "https://bit.ly/m/Kiutmusicannounce",  previewAudio: "/audio/samsa.mp3" },
  { id: 4, title: "Eligible EP",                 year: "May 20, 2022", type: "EP",      image: eligibleEP,  link: "https://bit.ly/m/KiutmusicELIGIBLE",  previewAudio: "/audio/amin.mp3"  },
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
    <div className="flex gap-[3px] items-end h-4">
      {[0.8, 1.2, 0.9, 1.4, 0.7].map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-[#D4AF37] rounded-full"
          animate={{ height: [`${h * 5}px`, `${h * 13}px`, `${h * 5}px`] }}
          transition={{ repeat: Infinity, duration: 0.7 + i * 0.12, ease: "easeInOut" }}
        />
      ))}
    </div>
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
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-black"
        animate={{
          scale: isHovered ? 1.04 : 1,
          rotateY: isHovered ? 4 : 0,
          boxShadow: isHovered
            ? "0 30px 60px -12px rgba(212,175,55,0.35)"
            : "0 25px 50px -12px rgba(0,0,0,0.8)",
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={album.image} alt={album.title} className="w-full aspect-square object-cover" loading="lazy" />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm"
            >
              <div className="w-20 h-20 rounded-full bg-[#D4AF37] flex items-center justify-center text-black shadow-[0_0_40px_rgba(212,175,55,0.7)] hover:scale-110 transition-transform mb-4">
                <Play size={32} className="ml-1.5" fill="currentColor" />
              </div>
              {album.previewAudio && (
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] animate-pulse">Playing Preview</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#D4AF37]/15 blur-[80px] -z-10 rounded-full transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`} />
      {album.previewAudio && <audio ref={audioRef} src={album.previewAudio} preload="metadata" loop />}
    </div>
  );
};

// Track row using global player context
function TrackRow({ track, index }: { track: Track; index: number }) {
  const { currentTrack, isPlaying, playTrack } = usePlayer();
  const isActive = currentTrack?.id === track.id;

  return (
    <motion.div
      onClick={() => playTrack(track)}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.035, ease: "easeOut" }}
      className={`group flex items-center gap-3 md:gap-4 px-3 md:px-5 py-3.5 rounded-xl cursor-pointer transition-all duration-200 ${
        isActive
          ? "bg-[#D4AF37]/10 border border-[#D4AF37]/22"
          : "border border-transparent hover:bg-white/[0.04] hover:border-white/6"
      }`}
      data-testid={`track-row-${track.id}`}
    >
      {/* Album art */}
      <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-lg overflow-hidden flex-shrink-0 bg-black/40">
        <img src={track.albumArt} alt={track.album} className="w-full h-full object-cover" loading="lazy" />
        {isActive && (
          <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
            {isPlaying ? <PlayingBars /> : <Play size={12} className="text-[#D4AF37] ml-0.5" fill="currentColor" />}
          </div>
        )}
      </div>

      {/* Track number — desktop only */}
      <div className="hidden md:flex w-7 flex-shrink-0 items-center justify-center">
        {isActive && isPlaying ? (
          <PlayingBars />
        ) : (
          <span className={`text-xs font-mono ${isActive ? "text-[#D4AF37]" : "text-white/20 group-hover:text-white/45"} transition-colors`}>
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      {/* Title + album */}
      <div className="flex flex-col min-w-0 flex-1">
        <span className={`font-semibold text-[13px] leading-snug truncate transition-colors duration-200 ${
          isActive ? "text-[#D4AF37]" : "text-white group-hover:text-[#D4AF37]"
        }`}>
          {track.title}
        </span>
        <span className="mt-0.5">
          {track.album !== "Single" ? (
            <span className={`inline-block px-1.5 py-[1px] rounded text-[9px] font-bold uppercase tracking-wider ${
              track.albumType === "ep" ? "bg-[#D4AF37]/12 text-[#D4AF37]/80" : "bg-white/6 text-white/35"
            }`}>{track.album}</span>
          ) : (
            <span className="text-white/25 text-[11px]">{track.released}</span>
          )}
        </span>
      </div>

      {/* Duration */}
      <span className="text-white/25 text-[11px] font-mono flex-shrink-0 hidden sm:block tabular-nums">{track.duration}</span>

      {/* Play/Pause button */}
      <button
        onClick={(e) => { e.stopPropagation(); playTrack(track); }}
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
          isActive && isPlaying
            ? "bg-[#D4AF37] text-black shadow-[0_0_14px_rgba(212,175,55,0.5)]"
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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Music() {
  const { currentTrack, isPlaying, playTrack, currentTime, duration, seek } = usePlayer();
  const featuredTrack = ALL_TRACKS[0]; // Good Life EP — Makosa as lead

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">

        {/* ── Page Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.45em] uppercase mb-4">Kiut Music Worldwide</p>
          <h1 className="font-display text-5xl md:text-6xl font-light tracking-[0.25em] text-white uppercase mb-4">
            Music
          </h1>
          <div className="w-12 h-px bg-[#D4AF37]/50 mx-auto" />
        </motion.div>

        {/* ── Featured Track Hero ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-28"
        >
          <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/12 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
            style={{ background: "linear-gradient(135deg, #100e00 0%, #0d0d0d 50%, #080408 100%)" }}>
            {/* Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/8 blur-[110px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-600/4 blur-[90px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
              {/* Album art — spins subtly when playing */}
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

              {/* Info */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-0">
                <span className="inline-block px-3 py-1.5 rounded-full bg-[#D4AF37]/12 border border-[#D4AF37]/28 text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.22em] mb-4 leading-none">
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

                {/* CTA buttons */}
                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(212,175,55,0.55)" }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => playTrack(currentTrack ?? featuredTrack)}
                    className="flex items-center gap-2.5 px-7 py-3.5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-sm rounded-full shadow-[0_0_24px_rgba(212,175,55,0.38)] transition-shadow"
                  >
                    {currentTrack && isPlaying
                      ? <><Pause size={15} fill="currentColor" /> Pause</>
                      : <><Play  size={15} fill="currentColor" className="ml-0.5" /> Play Now</>
                    }
                  </motion.button>

                  {!currentTrack && (
                    <a href="https://linktr.ee/kiut_goodlife" target="_blank" rel="noopener noreferrer">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all text-sm font-medium"
                      >
                        <ExternalLink size={13} /> Full Release
                      </motion.button>
                    </a>
                  )}
                </div>

                {/* Inline progress bar when a track is active */}
                {currentTrack && (
                  <div className="mt-6 w-full max-w-xs">
                    <div
                      className="h-[3px] bg-white/[0.09] rounded-full overflow-hidden cursor-pointer"
                      onClick={(e) => {
                        const r = e.currentTarget.getBoundingClientRect();
                        seek((e.clientX - r.left) / r.width);
                      }}
                    >
                      <div
                        className="h-full bg-gradient-to-r from-[#D4AF37] to-[#f0c842] transition-all duration-150"
                        style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%" }}
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

        {/* ── Discography Timeline ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 overflow-hidden"
        >
          <h2 className="font-display text-3xl md:text-4xl font-light tracking-[0.2em] text-white text-center mb-16 uppercase">
            Discography <span className="text-[#D4AF37]">Timeline</span>
          </h2>
          <div className="relative py-32 px-6 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <div className="absolute top-1/2 left-10 right-10 h-[1px] bg-gradient-to-r from-white/5 via-[#D4AF37]/40 to-white/5 -translate-y-1/2" />
            <div className="flex justify-between items-center min-w-[800px] max-w-4xl mx-auto relative z-10 px-10">
              {timelineEvents.map((event, idx) => (
                <div key={idx} className="relative group flex flex-col items-center">
                  <div className="absolute bottom-full mb-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 pointer-events-none w-56 z-20">
                    <div className="bg-[#111] border border-[#D4AF37]/22 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#111] border-b border-r border-[#D4AF37]/22 transform rotate-45" />
                      <img src={event.image} alt={event.title} className="w-full aspect-square object-cover rounded-xl mb-3" loading="lazy" />
                      <div className="text-center">
                        <h4 className="text-white font-bold text-sm mb-1">{event.title}</h4>
                        <span className="inline-block px-2 py-0.5 rounded-full bg-[#D4AF37]/12 border border-[#D4AF37]/28 text-[#D4AF37] text-[9px] uppercase tracking-widest font-bold">{event.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-black border-[3px] border-[#D4AF37] relative group-hover:scale-150 transition-transform duration-300 group-hover:bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)] cursor-pointer z-10">
                    <div className="absolute inset-0 bg-[#D4AF37] rounded-full animate-ping opacity-20 group-hover:opacity-0" />
                  </div>
                  <div className="absolute top-full mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <p className="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase">{event.year}</p>
                  </div>
                </div>
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
                <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/22 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-4">
                  {album.type}
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 uppercase tracking-wider leading-tight">
                  {album.title}
                </h2>
                <p className="text-white/30 text-sm font-light tracking-wider mb-8">Released {album.year}</p>
                <a href={album.link} target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: "0 0 36px rgba(212,175,55,0.32)" }}
                    whileTap={{ scale: 0.96 }}
                    className="px-10 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold uppercase tracking-widest transition-all duration-300 rounded-full inline-flex items-center gap-2"
                    style={i % 2 !== 0 ? { marginLeft: "auto" } : {}}
                    data-testid={`button-listen-${album.id}`}
                  >
                    <ExternalLink size={14} /> Listen Full Release
                  </motion.button>
                </a>
                <div className={`flex items-center gap-5 mt-6 text-white/30 text-xs ${i % 2 === 0 ? "justify-center md:justify-start" : "justify-center md:justify-end"}`}>
                  <div className="flex items-center gap-1.5"><Music2 size={12} /><span>Spotify</span></div>
                  <div className="flex items-center gap-1.5"><PlayCircle size={12} /><span>Apple Music</span></div>
                  <div className="flex items-center gap-1.5"><Radio size={12} /><span>Audiomack</span></div>
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
              <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-2">Complete</p>
              <h2 className="font-display text-3xl md:text-4xl font-light tracking-[0.2em] text-white uppercase">
                Track List
              </h2>
            </div>
            <span className="text-white/20 text-sm font-light tracking-widest">{ALL_TRACKS.length} tracks</span>
          </div>

          <div className="space-y-10">
            {TRACK_GROUPS.map((group) => (
              <div key={group.label}>
                {/* Group header */}
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

                <div className="rounded-2xl overflow-hidden bg-[#070707] border border-white/[0.05] divide-y divide-white/[0.03]">
                  {group.tracks.map((track, idx) => (
                    <TrackRow key={track.id} track={track} index={idx} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
      <SiteFooter />
    </div>
  );
}
