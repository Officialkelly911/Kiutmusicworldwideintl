import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  Play,
  Music2,
  PlayCircle,
  Radio,
  Share2,
  Youtube,
  SlidersHorizontal,
  ExternalLink,
  Copy,
  Check,
  ChevronRight,
  Headphones,
  ShoppingBag,
  Camera,
  Calendar,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import SiteFooter from "../components/SiteFooter";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

// ─── Constants ─────────────────────────────────────────────────────────────────
const videosHeroBg = "/assets/images/IMG_1254_1774433277988.webp";
const STORE_URL     = "https://dreamplanet.org/store-profile/61";
const WATCHED_KEY   = "kiut_watched_videos";

// ─── Video Data ────────────────────────────────────────────────────────────────
const videos = [
  { id:  1, title: "Kiut - Makosa",                                      artist: "Kiut", views: "—",   duration: "—", date: "2025", thumbnail: "https://i.ytimg.com/vi/L7tLWSFrx98/hqdefault.jpg",  type: "Music Video",       youtubeId: "L7tLWSFrx98",  description: "Makosa — the infectious Afro-Caribbean anthem from Kiut's 'Good Life EP'. Directed by Kiut Raba TV, featuring vibrant visuals that capture the spirit of the record." },
  { id:  2, title: "Kiut ft. De Sol - TGIF (Official Video)",             artist: "Kiut", views: "—",   duration: "—", date: "2024", thumbnail: "https://i.ytimg.com/vi/5StPjZaBIGc/hqdefault.jpg",  type: "Music Video",       youtubeId: "5StPjZaBIGc",  description: "TGIF — a collaborative record between Kiut and De Sol. The official music video captures the vibrant energy of the record. Directed by Kiut Raba TV." },
  { id:  3, title: "Kiut x De Sol - TGIF (Lyrics Video)",                 artist: "Kiut", views: "—",   duration: "—", date: "2024", thumbnail: "https://i.ytimg.com/vi/3fZZW2g6a-k/hqdefault.jpg",  type: "Lyric Video",       youtubeId: "3fZZW2g6a-k",  description: "TGIF lyrics visual — follow every word of this Kiut x De Sol collaboration in a sleek animated lyric video from Kiut Raba TV." },
  { id:  4, title: "Kiut x De Sol - TGIF",                                artist: "Kiut", views: "—",   duration: "—", date: "2024", thumbnail: "https://i.ytimg.com/vi/k7fQfRUJNb0/hqdefault.jpg",  type: "Visualizer",        youtubeId: "k7fQfRUJNb0",  description: "TGIF visualizer — the official animated audio-visual experience for this Kiut x De Sol collaboration." },
  { id:  5, title: "2 Things You Shouldn't Do as an Up-and-Coming Artist", artist: "Kiut", views: "—",  duration: "—", date: "2023", thumbnail: "https://i.ytimg.com/vi/dRdzL0GbQjE/hqdefault.jpg",  type: "Documentary",       youtubeId: "dRdzL0GbQjE",  description: "Raw and honest — Kiut shares two hard lessons learned on his journey as an independent artist navigating the music industry." },
  { id:  6, title: "Kiut - Aje (Lyrics Video)",                           artist: "Kiut", views: "—",   duration: "—", date: "2023", thumbnail: "https://i.ytimg.com/vi/8fFn5Q4hGXQ/hqdefault.jpg",  type: "Lyric Video",       youtubeId: "8fFn5Q4hGXQ",  description: "Aje lyric visual — from the S.O.F.A EP. Follow every lyric of this fan-favorite record in a premium animated video." },
  { id:  7, title: "Kiut Ketchup (Visualizer)",                           artist: "Kiut", views: "—",   duration: "—", date: "2023", thumbnail: "https://i.ytimg.com/vi/QdxFbz1N4J8/hqdefault.jpg",  type: "Visualizer",        youtubeId: "QdxFbz1N4J8",  description: "Ketchup visualizer — an official animated visual for this groovy Kiut single." },
  { id:  8, title: "Confam boy freestyle",                                 artist: "Kiut", views: "—",   duration: "—", date: "2022", thumbnail: "https://i.ytimg.com/vi/UmxLwBNbQWA/hqdefault.jpg",  type: "Freestyle",         youtubeId: "UmxLwBNbQWA",  description: "Unfiltered bars — Kiut delivers an off-the-cuff freestyle over the Confam Boy beat, showcasing his lyrical dexterity." },
  { id:  9, title: "SOFA (Picture BTS)",                                   artist: "Kiut", views: "—",   duration: "—", date: "2023", thumbnail: "https://i.ytimg.com/vi/oqJVcQoWDzw/hqdefault.jpg",  type: "Behind The Scenes", youtubeId: "oqJVcQoWDzw",  description: "Behind the lens — follow Kiut through the SOFA EP photoshoot. A candid look at the creative process behind the visual identity." },
  { id: 10, title: "A Day in Los Angeles Film/Music School (Recap)",       artist: "Kiut", views: "—",   duration: "—", date: "2023", thumbnail: "https://i.ytimg.com/vi/PvL6qpeEtTQ/hqdefault.jpg",  type: "Recap",             youtubeId: "PvL6qpeEtTQ",  description: "LA Chronicles — a full recap of Kiut's day immersed in the Los Angeles film and music school scene. Education meets inspiration." },
  { id: 11, title: "Confam Boy (Visualizer)",                              artist: "Kiut", views: "—",   duration: "—", date: "2022", thumbnail: "https://i.ytimg.com/vi/cd52pQaKmAs/hqdefault.jpg",  type: "Visualizer",        youtubeId: "cd52pQaKmAs",  description: "Confam Boy animated visualizer — the official motion visual for this standout track from the Announce project." },
  { id: 12, title: "Kiut - Confam Boy (Lyrics Video)",                    artist: "Kiut", views: "—",   duration: "—", date: "2022", thumbnail: "https://i.ytimg.com/vi/FiCQ0E_S20o/hqdefault.jpg",  type: "Lyric Video",       youtubeId: "FiCQ0E_S20o",  description: "Confam Boy lyrics video — every word of this Announce standout track presented in a clean lyric visual." },
  { id: 13, title: "Kiut - Confam Boy (Visualizer)",                      artist: "Kiut", views: "—",   duration: "—", date: "2022", thumbnail: "https://i.ytimg.com/vi/Z4QJQ0jJE9Y/hqdefault.jpg",  type: "Visualizer",        youtubeId: "Z4QJQ0jJE9Y",  description: "Official Confam Boy animated visual — another dimension of the Announce project visual universe." },
  { id: 14, title: "Praya Request (Visualizer)",                           artist: "Kiut", views: "—",   duration: "—", date: "2022", thumbnail: "https://i.ytimg.com/vi/qjEOqcOutdc/hqdefault.jpg",  type: "Visualizer",        youtubeId: "qjEOqcOutdc",  description: "Praya Request visualizer — the official motion visual for this spiritually charged single." },
  { id: 15, title: "Kiut - Praya Request (Lyrics Video)",                 artist: "Kiut", views: "—",   duration: "—", date: "2022", thumbnail: "https://i.ytimg.com/vi/i92AdFS3Gfc/hqdefault.jpg",  type: "Lyric Video",       youtubeId: "i92AdFS3Gfc",  description: "Praya Request lyric visual — follow the prayer-infused lyrics of this soulful Kiut record." },
  { id: 16, title: "Kiut - Chikito (Official Video)",                     artist: "Kiut", views: "—",   duration: "—", date: "2022", thumbnail: "https://i.ytimg.com/vi/XhDvtdMiT_E/hqdefault.jpg",  type: "Music Video",       youtubeId: "XhDvtdMiT_E",  description: "Chikito official music video — vibrant, colorful, and full of life. One of Kiut's most visually celebrated releases." },
  { id: 17, title: "Samsa (BTS)",                                          artist: "Kiut", views: "—",   duration: "—", date: "2021", thumbnail: "https://i.ytimg.com/vi/ziALzWIs7UQ/hqdefault.jpg",  type: "Behind The Scenes", youtubeId: "ziALzWIs7UQ",  description: "Behind the Samsa video shoot — a candid look at the production of one of the Announce project's key singles." },
  { id: 18, title: "Kiut - Rashida (Official Video)",                     artist: "Kiut", views: "—",   duration: "—", date: "2021", thumbnail: "https://i.ytimg.com/vi/VCmvN4bz6xw/hqdefault.jpg",  type: "Music Video",       youtubeId: "VCmvN4bz6xw",  description: "Rashida official music video — a heartfelt visual tribute. One of Kiut's most emotionally resonant records." },
  { id: 19, title: "Kiut - Samsa",                                         artist: "Kiut", views: "—",   duration: "—", date: "2021", thumbnail: "https://i.ytimg.com/vi/iJSXNGDW-C8/hqdefault.jpg",  type: "Official Video",    youtubeId: "iJSXNGDW-C8",  description: "Samsa — the standout single from the Announce project. A defining moment in Kiut's artistic catalog." },
  { id: 20, title: "Kiut - Samanta (Official Music Video)",               artist: "Kiut", views: "—",   duration: "—", date: "2021", thumbnail: "https://i.ytimg.com/vi/GQaBzBLsx_k/hqdefault.jpg",  type: "Music Video",       youtubeId: "GQaBzBLsx_k",  description: "Samanta official music video — a cinematic visual for this fan-beloved record from the Announce era." },
  { id: 21, title: "Kiut - Rashida (Lyrics Video)",                       artist: "Kiut", views: "—",   duration: "—", date: "2021", thumbnail: "https://i.ytimg.com/vi/_g6mzwmeYnk/hqdefault.jpg",  type: "Lyric Video",       youtubeId: "_g6mzwmeYnk",  description: "Rashida lyric visual — immerse yourself in every word of this deeply personal Kiut record." },
  { id: 22, title: "Kiut - Money Matter",                                  artist: "Kiut", views: "—",   duration: "—", date: "2021", thumbnail: "https://i.ytimg.com/vi/QGxftqUJyd4/hqdefault.jpg",  type: "Video",             youtubeId: "QGxftqUJyd4",  description: "Money Matter — a raw, straight-talking record from Kiut. The video captures the hustle and grind that defines the journey." },
  { id: 23, title: "Kiut - Strength in Bed (Live)",                       artist: "Kiut", views: "—",   duration: "—", date: "2021", thumbnail: "https://i.ytimg.com/vi/S3TxotoehrI/hqdefault.jpg",  type: "Live Performance",  youtubeId: "S3TxotoehrI",  description: "Strength in Bed — live performance footage capturing the energy and stage presence of Kiut in his element." },
  { id: 24, title: "Strength in Bed (Viral Clip)",                         artist: "Kiut", views: "—",   duration: "—", date: "2021", thumbnail: "https://i.ytimg.com/vi/YiIkb7dtfwc/hqdefault.jpg",  type: "Viral Clip",        youtubeId: "YiIkb7dtfwc",  description: "The clip that resonated — Strength in Bed went viral for its raw, relatable energy. Watch the moment that connected with thousands." },
  { id: 25, title: "Kiut - Chikito (Official Lyrics Video)",              artist: "Kiut", views: "—",   duration: "—", date: "2022", thumbnail: "https://i.ytimg.com/vi/9abrlaSfbXQ/hqdefault.jpg",  type: "Lyric Video",       youtubeId: "9abrlaSfbXQ",  description: "Chikito lyrics visual — follow every word of this beloved Kiut single in an official lyric video." },
  { id: 26, title: "Kiut - Chikito (Glitch Live Session)",                artist: "Kiut", views: "—",   duration: "—", date: "2022", thumbnail: "https://i.ytimg.com/vi/_2EMhX0wbWk/hqdefault.jpg",  type: "Live Session",      youtubeId: "_2EMhX0wbWk",  description: "Chikito Glitch Session — a raw live performance with a distinctive aesthetic. Watch Kiut deliver the record in an intimate setting." },
  { id: 27, title: "Dreams come true when we chase them.",                 artist: "Kiut", views: "—",   duration: "—", date: "2023", thumbnail: "https://i.ytimg.com/vi/VxwZxQz3I8o/hqdefault.jpg",  type: "Short",             youtubeId: "VxwZxQz3I8o",  description: "A motivational short from Kiut — a reminder that the pursuit itself is the victory. Dreams come true when we chase them." },
];

// ─── Streaming Platforms ───────────────────────────────────────────────────────
const PLATFORMS = [
  {
    name: "Spotify",
    label: "Listen Now",
    url: "https://open.spotify.com/artist/7yc6EAIFaY5TO7G1JBWgng",
    color: "#1DB954",
    bg: "rgba(29,185,84,0.08)",
    border: "rgba(29,185,84,0.22)",
    glow: "rgba(29,185,84,0.30)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  {
    name: "Apple Music",
    label: "Listen Now",
    url: "https://music.apple.com/us/artist/kiut/1484593132",
    color: "#FA243C",
    bg: "rgba(250,36,60,0.08)",
    border: "rgba(250,36,60,0.22)",
    glow: "rgba(250,36,60,0.28)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.048-2.31-2.17-3.043a6.303 6.303 0 00-1.862-.81c-.63-.175-1.29-.27-1.953-.321-.199-.015-.398-.015-.597-.03-.199 0-.5-.015-.798-.015H7.626c-.3 0-.6.015-.798.015-.2.015-.399.015-.598.03-.663.05-1.323.146-1.952.32a6.303 6.303 0 00-1.862.811C1.294 2.62.563 3.62.246 4.934a9.23 9.23 0 00-.241 2.19c-.005.197-.005.396-.005.593v10.57c0 .195 0 .395.005.59.014.746.078 1.487.24 2.19.317 1.31 1.048 2.31 2.17 3.043.54.352 1.17.6 1.863.81.63.175 1.29.27 1.952.32.2.015.399.015.598.03.198 0 .498.015.798.015h8.75c.3 0 .6-.015.798-.015.199-.015.398-.015.597-.03.663-.05 1.323-.145 1.953-.32a6.303 6.303 0 001.863-.81c1.12-.733 1.852-1.733 2.168-3.043.163-.703.226-1.443.241-2.19.005-.195.005-.395.005-.59V6.717c0-.197 0-.396-.005-.593zm-6.727 7.959l-4.286 2.47a.737.737 0 01-.37.099c-.127 0-.256-.033-.37-.099a.738.738 0 01-.37-.638v-4.94a.738.738 0 01.74-.738c.128 0 .256.033.37.099l4.286 2.47a.742.742 0 010 1.277z"/>
      </svg>
    ),
  },
  {
    name: "Audiomack",
    label: "Listen Now",
    url: "https://audiomack.com/kiutraba",
    color: "#FFA200",
    bg: "rgba(255,162,0,0.08)",
    border: "rgba(255,162,0,0.22)",
    glow: "rgba(255,162,0,0.28)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.3 0-9.6-4.3-9.6-9.6S6.7 2.4 12 2.4s9.6 4.3 9.6 9.6-4.3 9.6-9.6 9.6zm4.8-9.6a4.8 4.8 0 11-9.6 0 4.8 4.8 0 019.6 0z"/>
      </svg>
    ),
  },
  {
    name: "Boomplay",
    label: "Listen Now",
    url: "https://www.boomplay.com/search/default/Kiut",
    color: "#00C850",
    bg: "rgba(0,200,80,0.08)",
    border: "rgba(0,200,80,0.22)",
    glow: "rgba(0,200,80,0.28)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 10.5l-5 3a.5.5 0 01-.75-.43v-6a.5.5 0 01.75-.43l5 3a.5.5 0 010 .86z"/>
      </svg>
    ),
  },
  {
    name: "YouTube Music",
    label: "Listen Now",
    url: "https://music.youtube.com/search?q=Kiut",
    color: "#FF0000",
    bg: "rgba(255,0,0,0.08)",
    border: "rgba(255,0,0,0.22)",
    glow: "rgba(255,0,0,0.28)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L16.2 12l-6.516 3.54z"/>
      </svg>
    ),
  },
];

// ─── Badge style ───────────────────────────────────────────────────────────────
function getBadgeStyle(type: string) {
  const t = type.toLowerCase();
  if (t.includes("lyric"))    return { text: "text-gold",  border: "border-gold/30",  bg: "bg-gold/10",  glow: "shadow-[0_0_8px_rgba(var(--gold-primary-rgb),0.25)]"  };
  if (t.includes("music"))    return { text: "text-[#c084fc]",  border: "border-[#c084fc]/30",  bg: "bg-[#c084fc]/10",  glow: "shadow-[0_0_8px_rgba(192,132,252,0.20)]" };
  if (t.includes("visual"))   return { text: "text-[#60a5fa]",  border: "border-[#60a5fa]/30",  bg: "bg-[#60a5fa]/10",  glow: "shadow-[0_0_8px_rgba(96,165,250,0.20)]"  };
  if (t.includes("live"))     return { text: "text-[#f97316]",  border: "border-[#f97316]/30",  bg: "bg-[#f97316]/10",  glow: "shadow-[0_0_8px_rgba(249,115,22,0.20)]"  };
  if (t.includes("scene") || t.includes("bts")) return { text: "text-[#34d399]", border: "border-[#34d399]/30", bg: "bg-[#34d399]/10", glow: "shadow-[0_0_8px_rgba(52,211,153,0.20)]" };
  return { text: "text-white/70", border: "border-white/15", bg: "bg-white/5", glow: "" };
}

// ─── Thumbnail fallback ────────────────────────────────────────────────────────
function ThumbnailFallback({ onRetry }: { onRetry?: () => void }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer"
      style={{ background: "linear-gradient(145deg,#0a0a0a 0%,#110d1a 100%)" }}
      onClick={onRetry}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: "rgba(var(--gold-primary-rgb),0.10)", border: "1px solid rgba(var(--gold-primary-rgb),0.18)" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <polygon points="6,4 16,10 6,16" fill="var(--color-gold)" opacity="0.65" />
        </svg>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span style={{ color: "rgba(var(--gold-primary-rgb),0.55)", fontSize: 9, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase" }}>
          Kiut Music
        </span>
        <span style={{ color: "rgba(var(--white-rgb),0.2)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {onRetry ? "Tap to retry" : "Preview unavailable"}
        </span>
      </div>
    </div>
  );
}

// ─── Share popup ───────────────────────────────────────────────────────────────
function SharePopup({
  url,
  title,
  onClose,
}: {
  url: string;
  title: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [url]);

  const encoded = encodeURIComponent(url);
  const text    = encodeURIComponent(`Watch "${title}" on Kiut Music Worldwide`);

  const socials = [
    { label: "X / Twitter",  href: `https://twitter.com/intent/tweet?url=${encoded}&text=${text}`,             color: "var(--white)" },
    { label: "WhatsApp",     href: `https://wa.me/?text=${text}%20${encoded}`,                                  color: "#25D366" },
    { label: "Facebook",     href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,                   color: "#1877F2" },
    { label: "Telegram",     href: `https://t.me/share/url?url=${encoded}&text=${text}`,                        color: "#26A5E4" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-0 top-14 z-50 w-72 rounded-md border border-white/10 bg-charcoal backdrop-blur-xl shadow-xl p-5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">Share Video</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close share panel"
          className="w-6 h-6 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
        >
          <X className="w-3 h-3" aria-hidden="true" />
        </button>
      </div>

      {/* Copy link */}
      <button
        type="button"
        onClick={copy}
        className={cn(
          "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all duration-normal mb-3 text-left",
          copied
            ? "border-[#1DB954]/40 bg-[#1DB954]/10 text-[#1DB954]"
            : "border-white/10 bg-white/[0.03] text-white/70 hover:border-gold/30 hover:text-white"
        )}
      >
        <span className="text-xs font-semibold truncate">{url}</span>
        {copied ? <Check className="w-3.5 h-3.5 flex-shrink-0" /> : <Copy className="w-3.5 h-3.5 flex-shrink-0 text-white/30" />}
      </button>

      {/* Socials */}
      <div className="grid grid-cols-2 gap-2">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/18 transition-all duration-fast text-white/55 hover:text-white"
          >
            <span className="text-xs font-semibold tracking-wide">{s.label}</span>
            <ArrowUpRight className="w-2.5 h-2.5 ml-auto flex-shrink-0 opacity-50" />
          </a>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Premium Streaming links ───────────────────────────────────────────────────
function PremiumStreamingLinks() {
  return (
    <div className="mt-8 pt-8 border-t border-white/[0.06]">
      <p className="text-xs font-bold uppercase tracking-[0.4em] text-gold mb-6">Listen Everywhere</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PLATFORMS.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Listen to Kiut on ${p.name}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="group relative flex items-center gap-3.5 p-4 rounded-md overflow-hidden transition-all duration-medium"
            style={{
              background: p.bg,
              border: `1px solid ${p.border}`,
            }}
          >
            {/* Glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-medium pointer-events-none rounded-md"
              style={{ boxShadow: `inset 0 0 0 1px ${p.border}, 0 0 24px ${p.glow}` }}
            />

            {/* Icon */}
            <div
              className="relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-normal group-hover:scale-110"
              style={{ background: `${p.color}18`, color: p.color }}
            >
              {p.icon}
            </div>

            {/* Text */}
            <div className="relative flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.28em] mb-0.5" style={{ color: `${p.color}99` }}>
                Stream on
              </p>
              <p className="text-xs font-bold text-white truncate">{p.name}</p>
            </div>

            {/* Arrow */}
            <ChevronRight
              className="relative w-4 h-4 flex-shrink-0 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-normal"
              style={{ color: p.color }}
            />
          </motion.a>
        ))}
      </div>
    </div>
  );
}

// ─── Kiut Universe hub ─────────────────────────────────────────────────────────
function KiutUniverse() {
  const cards = [
    {
      icon: <Headphones className="w-5 h-5" />,
      emoji: "🎵",
      title: "Listen Everywhere",
      sub: "Spotify · Apple Music · Audiomack · Boomplay",
      href: "/music",
      external: false,
      color: "#1DB954",
      cta: "Browse Music",
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      emoji: "👕",
      title: "KiutRaba's Store",
      sub: "Official apparel, caps & collectibles",
      href: STORE_URL,
      external: true,
      color: "var(--color-gold)",
      cta: "Shop Now",
    },
    {
      icon: <Camera className="w-5 h-5" />,
      emoji: "📸",
      title: "Moments From Journey",
      sub: "The visual archive of Kiut's story",
      href: "/about#moments",
      external: false,
      color: "#c084fc",
      cta: "View Gallery",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      emoji: "🎤",
      title: "Upcoming Events",
      sub: "Shows, appearances & announcements",
      href: "https://www.instagram.com/kiutmusicww",
      external: true,
      color: "#f97316",
      cta: "Follow Updates",
    },
  ];

  return (
    <div className="mt-12 pt-8 border-t border-white/[0.06]">
      <div className="flex items-center gap-3 mb-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-gold mb-0.5">Explore More</p>
          <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight">Kiut Universe</h3>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-gold/18 to-transparent" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cards.map((card, i) => {
          const inner = (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -3, transition: { duration: 0.22 } }}
              className="group relative flex items-center gap-4 p-4 rounded-md border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.14] transition-all duration-medium cursor-pointer overflow-hidden"
            >
              {/* Ambient glow */}
              <div
                className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-medium pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 30% 50%, ${card.color}0a, transparent 70%)` }}
              />

              {/* Icon */}
              <div
                className="relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-normal group-hover:scale-110"
                style={{ background: `${card.color}15`, color: card.color }}
              >
                {card.icon}
              </div>

              {/* Text */}
              <div className="relative flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate group-hover:text-white transition-colors">{card.title}</p>
                <p className="text-xs text-white/35 mt-0.5 truncate">{card.sub}</p>
              </div>

              {/* CTA */}
              <div className="relative flex-shrink-0 flex items-center gap-1 text-xs font-bold uppercase tracking-[0.22em] opacity-0 group-hover:opacity-100 transition-opacity duration-normal" style={{ color: card.color }}>
                {card.cta}
                <ChevronRight className="w-3 h-3" />
              </div>
            </motion.div>
          );

          return card.external ? (
            <a key={card.title} href={card.href} target="_blank" rel="noopener noreferrer">{inner}</a>
          ) : (
            <Link key={card.title} href={card.href}>{inner}</Link>
          );
        })}
      </div>
    </div>
  );
}

// ─── Recommendation card ───────────────────────────────────────────────────────
function RecCard({
  video,
  onClick,
  isFirst = false,
  watched = false,
}: {
  video: typeof videos[0];
  onClick: () => void;
  isFirst?: boolean;
  watched?: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const badge = getBadgeStyle(video.type);

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group cursor-pointer flex flex-col w-full rounded-md overflow-hidden transition-all duration-normal",
        isFirst
          ? "bg-charcoal border border-gold/22 hover:border-gold/50 hover:shadow-glow-gold-hover"
          : "bg-charcoal border border-white/[0.06] hover:border-gold/22 hover:shadow-glow-gold"
      )}
    >
      {/* Thumbnail */}
      <div className={cn("relative w-full overflow-hidden bg-midnight flex-shrink-0", isFirst ? "aspect-[4/3] sm:aspect-video" : "aspect-video")}>
        {!imgFailed ? (
          <>
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-cinematic group-hover:scale-[1.07]"
              onError={() => setImgFailed(true)}
            />
            {/* Skeleton shimmer while image is loading */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-white/[0.05] to-white/[0.02] opacity-0 group-[&:not([src])]:opacity-100 pointer-events-none" />
          </>
        ) : (
          <ThumbnailFallback />
        )}

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />

        {/* Category badge */}
        <div className={cn("absolute top-2.5 left-2.5 px-2.5 py-[3.5px] rounded-full backdrop-blur-md text-xs font-bold uppercase tracking-widest leading-none border", badge.text, badge.border, badge.bg, badge.glow)}>
          {video.type}
        </div>

        {isFirst && (
          <div className="absolute top-2.5 right-2.5 px-2.5 py-[3.5px] rounded-full bg-gold/15 backdrop-blur-md text-gold text-xs font-black uppercase tracking-[0.22em] leading-none border border-gold/30">
            Featured
          </div>
        )}

        {/* Watched indicator */}
        {watched && (
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2 py-[3px] rounded-full bg-black/80 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-xs font-bold uppercase tracking-wider text-gold">Watched</span>
          </div>
        )}

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn(
            "flex items-center justify-center rounded-full backdrop-blur-sm border transition-all duration-normal pl-0.5",
            isFirst ? "w-12 h-12" : "w-10 h-10",
            "opacity-30 group-hover:opacity-100",
            "border-white/25 bg-black/35",
            "group-hover:bg-gold group-hover:border-gold group-hover:shadow-glow-gold-hover",
            "scale-90 group-hover:scale-100"
          )}>
            <Play className={cn("text-white group-hover:text-midnight transition-colors duration-fast", isFirst ? "w-5 h-5" : "w-4 h-4")} />
          </div>
        </div>

        {isFirst && <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent" />}
      </div>

      {/* Text */}
      <div className={cn("flex flex-col flex-1", isFirst ? "p-5" : "p-4")}>
        <h4 className={cn("font-bold leading-snug line-clamp-2 text-white group-hover:text-gold transition-colors duration-fast", isFirst ? "text-sm mb-2" : "text-xs mb-1.5")}>
          {video.title}
        </h4>
        <p className="text-white/40 text-xs font-medium truncate mb-3">{video.artist}</p>
        <div className="flex items-center gap-1.5 text-xs text-white/22 flex-wrap mt-auto pt-1 border-t border-white/[0.04]">
          <span>{video.date}</span>
          <span className="text-white/15">·</span>
          <span>YouTube</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Sidebar list card ─────────────────────────────────────────────────────────
function VideoCard({
  video,
  isActive,
  onClick,
  watched = false,
}: {
  video: typeof videos[0];
  isActive: boolean;
  onClick: () => void;
  watched?: boolean;
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.015, x: 3 }}
      className={cn(
        "group relative flex gap-3.5 p-3 rounded-xl cursor-pointer transition-all duration-normal",
        isActive ? "bg-gold/[0.07] border border-gold/25" : "hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06]"
      )}
      data-testid={`video-card-${video.id}`}
    >
      {/* Gold left-bar active indicator */}
      {isActive && (
        <motion.div
          layoutId="video-active-bar"
          className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gold shadow-glow-gold"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
      <div className="relative w-36 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-black/50 shadow-md">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-slow"
          loading="lazy"
        />
        {isActive ? (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center border-l-2 border-gold">
            <div className="flex gap-0.5 items-end h-4">
              <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-gold rounded-full" />
              <motion.div animate={{ height: [4, 16, 4] }} transition={{ repeat: Infinity, duration: 1.0 }} className="w-1 bg-gold rounded-full" />
              <motion.div animate={{ height: [4, 8, 4] }}  transition={{ repeat: Infinity, duration: 0.9 }} className="w-1 bg-gold rounded-full" />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center pl-0.5 shadow-glow-gold">
              <Play className="w-3.5 h-3.5 text-midnight" />
            </div>
          </div>
        )}
        {watched && !isActive && (
          <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-gold flex items-center justify-center">
            <Check className="w-2 h-2 text-midnight" />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center py-0.5 flex-1 min-w-0">
        <h4 className={cn("font-semibold text-xs line-clamp-2 leading-snug mb-1 transition-colors", isActive ? "text-gold" : "text-white group-hover:text-gold")}>
          {video.title}
        </h4>
        <p className="text-white/45 text-xs truncate">{video.artist}</p>
        <p className="text-white/28 text-xs mt-1">{video.date} · YouTube</p>
      </div>
    </motion.div>
  );
}

// ─── Animated stat ─────────────────────────────────────────────────────────────
function AnimStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative px-5 py-5 rounded-md border border-white/[0.07] bg-white/[0.025] hover:border-gold/22 hover:bg-white/[0.04] transition-all duration-slow text-center overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_center,rgba(var(--gold-primary-rgb),0.05),transparent_70%)] transition-opacity duration-slow" />
      <p className="font-display text-2xl md:text-3xl font-bold text-gold tracking-tight mb-0.5 relative">{value}</p>
      <p className="text-white text-xs font-bold uppercase tracking-[0.22em] mb-0.5 relative">{label}</p>
      <p className="text-white/28 text-xs uppercase tracking-wide relative">{sub}</p>
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function Videos() {
  const [featuredVideo, setFeaturedVideo]   = useState(videos[0]);
  const [activeType, setActiveType]         = useState("All");
  const [showShare, setShowShare]           = useState(false);
  const [showFloating, setShowFloating]     = useState(false);
  const [watchedIds, setWatchedIds]         = useState<Set<number>>(() => {
    try {
      const s = localStorage.getItem(WATCHED_KEY);
      return s ? new Set(JSON.parse(s)) : new Set();
    } catch { return new Set(); }
  });

  const playerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setShowFloating(y > 500);
  });

  const videoTypes = ["All", ...Array.from(new Set(videos.map((v) => v.type)))];
  const visibleVideos = activeType === "All" ? videos : videos.filter((v) => v.type === activeType);
  const featuredVideoUrl = `https://www.youtube.com/watch?v=${featuredVideo.youtubeId}`;

  const markWatched = useCallback((id: number) => {
    setWatchedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      try { localStorage.setItem(WATCHED_KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  }, []);

  const selectVideo = useCallback((video: typeof videos[0]) => {
    setFeaturedVideo(video);
    markWatched(video.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [markWatched]);

  // Keep filter in sync
  useEffect(() => {
    if (!visibleVideos.some((v) => v.id === featuredVideo.id)) {
      const next = visibleVideos[0] ?? videos[0];
      setFeaturedVideo(next);
    }
  }, [activeType]);

  // Mark first video watched on mount
  useEffect(() => {
    markWatched(featuredVideo.id);
  }, [featuredVideo.id]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: featuredVideo.title, text: `Watch "${featuredVideo.title}" on Kiut Music Worldwide.`, url: featuredVideoUrl });
        return;
      } catch {}
    }
    setShowShare((s) => !s);
  }, [featuredVideo.title, featuredVideoUrl]);

  const watchedCount  = watchedIds.size;
  const totalCount    = videos.length;
  const watchPct      = Math.round((watchedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-black text-white relative">

      {/* ── Ambient floating blobs (< 4% opacity) ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gold opacity-[0.025] blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-[#c084fc] opacity-[0.02] blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut", delay: 12 }}
          className="absolute -bottom-40 left-1/3 w-[450px] h-[450px] rounded-full bg-[#60a5fa] opacity-[0.018] blur-[120px]"
        />
      </div>

      {/* ── HERO ── */}
      <section className="relative h-[92vh] min-h-[600px] flex items-end pb-20 overflow-hidden">
        <img src={videosHeroBg} alt="Kiut Videos" className="absolute inset-0 w-full h-full object-cover object-center scale-[1.04]" loading="eager" />
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(var(--gold-primary-rgb),0.06),transparent_55%)]" />

        {/* Top-right archive badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-8 right-6 md:right-10 z-10 flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 backdrop-blur-md"
          style={{ background: "rgba(var(--black-rgb),0.4)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-white/60 text-xs font-bold uppercase tracking-[0.3em]">{videos.length} Official Visuals</span>
        </motion.div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.55em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-gold text-xs font-bold uppercase tracking-[0.35em] mb-5"
            >
              Official Visuals · Kiut Raba TV
            </motion.p>
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white uppercase leading-none mb-6">
              Watch<br /><span className="text-gold">Kiut</span>
            </h1>
            <p className="text-white/55 text-base md:text-lg font-light max-w-lg mb-10 leading-relaxed">
              Every frame, every story. Cinematic visuals from the world of Kiut Music Worldwide.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-px bg-gold/70" />
                <span className="text-white/35 text-xs uppercase tracking-[0.25em]">Scroll to explore</span>
              </div>
              <a
                href="https://www.youtube.com/@kiutrabatv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-gold/35 transition-all duration-normal text-xs font-bold uppercase tracking-widest backdrop-blur-sm"
                style={{ background: "rgba(var(--black-rgb),0.35)" }}
                data-testid="link-hero-youtube-channel"
              >
                <Youtube size={12} /> Subscribe on YouTube
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom gold hairline */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </section>

      {/* ── STATS STRIP ── */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 pt-14 pb-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <AnimStat value={`${totalCount}`}  label="Visuals"         sub="In the archive"  />
          <AnimStat value="5M+"              label="Views"           sub="Across YouTube"  />
          <AnimStat value={`${PLATFORMS.length}`} label="Platforms"  sub="To stream on"    />
          <AnimStat value="2021"             label="Active Since"    sub="Kiut Raba TV"    />
        </div>

        {/* Watch progress */}
        {watchedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 px-5 py-4 rounded-md border border-white/[0.06] bg-white/[0.02] flex items-center gap-5"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Your Progress</p>
                <p className="text-xs font-bold text-white/35">{watchedCount} / {totalCount} watched</p>
              </div>
              <div className="h-1 rounded-full bg-white/[0.07] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-gold to-[#f5d062]"
                  initial={{ width: 0 }}
                  animate={{ width: `${watchPct}%` }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
            <p className="text-2xl font-bold text-gold flex-shrink-0">{watchPct}%</p>
          </motion.div>
        )}
      </div>

      {/* ── PLAYER SECTION ── */}
      <div ref={playerRef} className="relative z-10 pb-16">
        <div className="pointer-events-none absolute top-0 left-0 w-full h-[500px] bg-gold/[0.04] blur-[160px]" />
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 relative pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">

            {/* LEFT: Player + Info */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* Embedded player */}
              <div className="relative">
                {/* Now Playing chip */}
                <motion.div
                  key={`chip-${featuredVideo.id}`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold/25 text-gold text-xs font-bold uppercase tracking-[0.3em]"
                    style={{ background: "rgba(var(--gold-primary-rgb),0.07)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    Now Playing
                  </span>
                  <span className="text-white/30 text-xs font-light truncate max-w-xs">{featuredVideo.title}</span>
                </motion.div>

                <motion.div
                  key={featuredVideo.youtubeId}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="group w-full aspect-video bg-black rounded-md overflow-hidden shadow-xl border border-gold/15 hover:border-gold/30 transition-colors duration-slow relative"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}?autoplay=1`}
                    title={featuredVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full relative z-10"
                    loading="lazy"
                  />
                  {/* Ambient gold glow on hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold/0 via-gold/18 to-gold/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-cinematic z-0 pointer-events-none" />
                  {/* Persistent bottom glow */}
                  <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent z-20 pointer-events-none" />
                </motion.div>
              </div>

              {/* Video info card */}
              <motion.div
                key={featuredVideo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="bg-midnight/85 backdrop-blur-xl rounded-xl p-6 md:p-8 border border-white/[0.05] shadow-lg"
              >
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div className="flex-1 min-w-0">
                    {/* Type badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 border border-gold/20">
                      <span className="w-1 h-1 rounded-full bg-gold inline-block" />
                      {featuredVideo.type}
                    </div>

                    <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white mb-4 leading-tight">
                      {featuredVideo.title}
                    </h2>

                    {/* Metadata pills */}
                    <div className="flex flex-wrap items-center gap-2">
                      {[
                        { label: "Artist",    val: featuredVideo.artist },
                        { label: "Year",      val: featuredVideo.date },
                        { label: "Platform",  val: "YouTube" },
                        { label: "Category",  val: featuredVideo.type },
                      ].map((m) => (
                        <div key={m.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03]">
                          <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/30">{m.label}</span>
                          <span className="text-xs font-semibold text-white/75">{m.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <a
                      href={featuredVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Watch on YouTube"
                    >
                      <motion.div
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-midnight shadow-glow-gold hover:shadow-glow-gold-hover transition-shadow duration-normal cursor-pointer"
                      >
                        <Youtube size={15} />
                        Watch on YouTube
                      </motion.div>
                    </a>

                    <div className="relative">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleShare}
                        aria-label={`Share ${featuredVideo.title}`}
                        aria-expanded={showShare}
                        aria-haspopup="dialog"
                        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-5 py-3 text-xs font-semibold text-white/75 hover:border-gold/35 hover:text-white transition-all duration-fast"
                      >
                        <Share2 size={14} aria-hidden="true" />
                        Share
                      </motion.button>
                      <AnimatePresence>
                        {showShare && (
                          <SharePopup
                            url={featuredVideoUrl}
                            title={featuredVideo.title}
                            onClose={() => setShowShare(false)}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white/[0.04] rounded-md p-5 border border-white/[0.05] hover:bg-white/[0.07] transition-colors duration-normal mb-0">
                  <p className="text-white/65 leading-relaxed font-light text-sm md:text-sm">
                    {featuredVideo.description}
                  </p>
                </div>

                {/* Premium Streaming Links */}
                <PremiumStreamingLinks />

                {/* Kiut Universe Hub */}
                <KiutUniverse />
              </motion.div>
            </div>

            {/* RIGHT: Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-midnight/80 backdrop-blur-xl rounded-xl p-5 border border-white/[0.05] shadow-lg sticky top-24">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/18 bg-gold/8 text-gold">
                    <SlidersHorizontal size={16} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold">Browse Archive</h3>
                    <p className="text-xs text-white/35">Filter by category</p>
                  </div>
                </div>

                {/* Filter chips */}
                <div className="mb-5 flex flex-wrap gap-1.5" role="group" aria-label="Filter videos by category">
                  {videoTypes.map((type) => {
                    const active = activeType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setActiveType(type)}
                        aria-pressed={active}
                        aria-label={`Filter by ${type}`}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] transition-all duration-normal",
                          active
                            ? "bg-gold text-midnight border border-gold shadow-glow-gold"
                            : "border border-white/10 bg-white/[0.03] text-white/45 hover:border-gold/22 hover:text-white/80"
                        )}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/25 mb-3">
                  {visibleVideos.length} {activeType === "All" ? "total" : "filtered"} videos
                </p>

                <div className="flex flex-col gap-2 max-h-[760px] overflow-y-auto pr-1 custom-scrollbar">
                  {visibleVideos.map((video) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      isActive={featuredVideo.id === video.id}
                      watched={watchedIds.has(video.id)}
                      onClick={() => selectVideo(video)}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── RECOMMENDED VISUALS ── */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 pt-4 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="flex items-start justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-3">Curated Picks</p>
            <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-wider mb-2">
              Recommended <span className="text-gold">Visuals</span>
            </h3>
            <p className="text-white/30 text-xs font-light max-w-md">
              Every frame, every story — the official visual catalogue of Kiut Music Worldwide.
            </p>
          </div>
          <a
            href="https://www.youtube.com/@kiutrabatv"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-white/30 hover:text-gold transition-colors text-xs font-bold uppercase tracking-widest shrink-0 mt-1"
          >
            See All <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </a>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {visibleVideos
            .filter((v) => v.id !== featuredVideo.id)
            .map((video, index) => (
              <motion.div
                key={video.id}
                variants={{
                  hidden:  { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <RecCard
                  video={video}
                  isFirst={index === 0}
                  watched={watchedIds.has(video.id)}
                  onClick={() => selectVideo(video)}
                />
              </motion.div>
            ))}
        </motion.div>
      </div>

      {/* ── FLOATING ACTION BUTTONS ── */}
      <AnimatePresence>
        {showFloating && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-2 py-2 rounded-full border border-white/12 bg-black/80 backdrop-blur-xl shadow-lg"
          >
            <a
              href={featuredVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gold text-midnight text-xs font-bold uppercase tracking-widest hover:shadow-glow-gold transition-shadow"
            >
              <Youtube className="w-3.5 h-3.5" /> Watch on YouTube
            </a>
            <a
              href="https://open.spotify.com/artist/7yc6EAIFaY5TO7G1JBWgng"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/12 text-white/70 text-xs font-bold uppercase tracking-widest hover:border-[#1DB954]/40 hover:text-white transition-all"
            >
              <Music2 className="w-3.5 h-3.5" /> Listen
            </a>
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share this video"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-white/12 text-white/55 hover:border-gold/35 hover:text-white transition-all"
            >
              <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(var(--white-rgb),0.02); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(var(--white-rgb),0.08); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(var(--gold-primary-rgb),0.4); }
      `}</style>

      <SiteFooter />
    </div>
  );
}
