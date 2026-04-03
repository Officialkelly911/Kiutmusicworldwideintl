import { createContext, useContext, useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { ALL_TRACKS, type Track } from "@/data/tracks";

interface PlayerContextValue {
  currentTrack: Track | null;
  currentIndex: number;
  isPlaying: boolean;
  showPlayer: boolean;
  currentTime: number;
  duration: number;
  playTrack: (track: Track) => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrev: () => void;
  seek: (pct: number) => void;
  dismiss: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [playingId, setPlayingId]     = useState<number | null>(null);
  const [isPlaying, setIsPlaying]     = useState(false);
  const [showPlayer, setShowPlayer]   = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentIndex = ALL_TRACKS.findIndex(t => t.id === playingId);
  const currentTrack = currentIndex >= 0 ? ALL_TRACKS[currentIndex] : null;
  const hasPrev      = currentIndex > 0;
  const hasNext      = currentIndex < ALL_TRACKS.length - 1;

  // Create the audio element once on mount
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onTimeUpdate  = () => setCurrentTime(audio.currentTime);
    const onMetadata    = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate",     onTimeUpdate);
    audio.addEventListener("loadedmetadata", onMetadata);

    return () => {
      audio.removeEventListener("timeupdate",     onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onMetadata);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Auto-advance when a track ends
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => {
      const idx = ALL_TRACKS.findIndex(t => t.id === playingId);
      if (idx >= 0 && idx < ALL_TRACKS.length - 1) {
        const next = ALL_TRACKS[idx + 1];
        audio.src = next.url;
        audio.play().catch(() => {});
        setPlayingId(next.id);
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
        setPlayingId(null);
      }
    };
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, [playingId]);

  const playTrack = useCallback((track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playingId === track.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      audio.src = track.url;
      audio.play().catch(() => {});
      setPlayingId(track.id);
      setIsPlaying(true);
      setShowPlayer(true);
      setCurrentTime(0);
      setDuration(0);
    }
  }, [playingId, isPlaying]);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const playNext = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < ALL_TRACKS.length - 1) {
      playTrack(ALL_TRACKS[currentIndex + 1]);
    }
  }, [currentIndex, playTrack]);

  const playPrev = useCallback(() => {
    if (currentIndex > 0) {
      playTrack(ALL_TRACKS[currentIndex - 1]);
    }
  }, [currentIndex, playTrack]);

  const seek = useCallback((pct: number) => {
    const audio = audioRef.current;
    if (audio && duration) audio.currentTime = pct * duration;
  }, [duration]);

  const dismiss = useCallback(() => {
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.src = ""; }
    setIsPlaying(false);
    setPlayingId(null);
    setShowPlayer(false);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  return (
    <PlayerContext.Provider value={{
      currentTrack, currentIndex, isPlaying, showPlayer,
      currentTime, duration,
      playTrack, togglePlayPause, playNext, playPrev, seek, dismiss,
      hasPrev, hasNext,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside <PlayerProvider>");
  return ctx;
}
