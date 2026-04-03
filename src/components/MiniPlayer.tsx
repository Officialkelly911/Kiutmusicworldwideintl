import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, X } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";

function fmt(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export default function MiniPlayer() {
  const {
    currentTrack, isPlaying, currentTime, duration,
    togglePlayPause, playNext, playPrev, seek, dismiss,
    showPlayer, hasPrev, hasNext,
  } = usePlayer();

  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    seek((e.clientX - rect.left) / rect.width);
  };

  return (
    <AnimatePresence>
      {showPlayer && currentTrack && (
        <motion.div
          key="mini-player"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 z-[60] bg-[#0d0d0d]/97 backdrop-blur-2xl border-t border-white/[0.08] shadow-[0_-20px_70px_rgba(0,0,0,0.75)]"
        >
          {/* Seek bar at top edge */}
          <div
            className="h-[3px] bg-white/[0.07] cursor-pointer group/bar relative"
            onClick={handleBarClick}
          >
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#f0c842] transition-all duration-150 relative"
              style={{ width: `${pct}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#D4AF37] scale-0 group-hover/bar:scale-100 transition-transform shadow-[0_0_8px_rgba(212,175,55,0.9)]" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center gap-4">
            {/* Album art */}
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              <img src={currentTrack.albumArt} alt={currentTrack.title} className="w-full h-full object-cover" />
            </div>

            {/* Track info */}
            <div className="flex flex-col min-w-0 flex-1">
              <motion.span
                key={currentTrack.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white font-semibold text-[13px] truncate leading-tight"
              >
                {currentTrack.title}
              </motion.span>
              <span className="text-white/35 text-[11px] truncate">
                {currentTrack.artist}
                {currentTrack.album !== "Single" && (
                  <span className="text-white/20"> · {currentTrack.album}</span>
                )}
              </span>
            </div>

            {/* Time */}
            <span className="hidden sm:block text-white/25 text-[10px] font-mono flex-shrink-0 tabular-nums">
              {fmt(currentTime)} / {fmt(duration || 0)}
            </span>

            {/* Controls */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={playPrev}
                disabled={!hasPrev}
                aria-label="Previous track"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-150 hover:bg-white/8"
              >
                <SkipBack size={15} />
              </button>

              <button
                onClick={togglePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="w-10 h-10 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.45)] hover:shadow-[0_0_28px_rgba(212,175,55,0.65)] hover:scale-105 active:scale-95 transition-all duration-200"
              >
                {isPlaying
                  ? <Pause size={15} fill="currentColor" />
                  : <Play  size={15} fill="currentColor" className="ml-0.5" />
                }
              </button>

              <button
                onClick={playNext}
                disabled={!hasNext}
                aria-label="Next track"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-150 hover:bg-white/8"
              >
                <SkipForward size={15} />
              </button>
            </div>

            {/* Dismiss */}
            <button
              onClick={dismiss}
              aria-label="Close player"
              className="w-7 h-7 rounded-full flex items-center justify-center text-white/25 hover:text-white/70 hover:bg-white/8 transition-all duration-150 flex-shrink-0"
            >
              <X size={13} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
