import { motion, AnimatePresence } from "framer-motion";
import { Play, Music2, PlayCircle, Radio, Share2, Youtube, SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import SiteFooter from "../components/SiteFooter";

const videosHeroBg = "/assets/images/IMG_1254_1774433277988.jpeg";

const videos = [
  {
    id: 1,
    title: "Kiut - Makosa",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/L7tLWSFrx98/hqdefault.jpg",
    type: "Music Video",
    youtubeId: "L7tLWSFrx98",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 2,
    title: "Kiut ft. De Sol - TGIF (Official Video)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/5StPjZaBIGc/hqdefault.jpg",
    type: "Music Video",
    youtubeId: "5StPjZaBIGc",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 3,
    title: "Kiut x De Sol - TGIF (Lyrics Video)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/3fZZW2g6a-k/hqdefault.jpg",
    type: "Lyric Video",
    youtubeId: "3fZZW2g6a-k",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 4,
    title: "Kiut x De Sol - TGIF",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/k7fQfRUJNb0/hqdefault.jpg",
    type: "Visualizer",
    youtubeId: "k7fQfRUJNb0",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 5,
    title: "2 Things You Shouldn't Do as an Up-and-Coming Artist",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/dRdzL0GbQjE/hqdefault.jpg",
    type: "Documentary",
    youtubeId: "dRdzL0GbQjE",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 6,
    title: "Kiut - Aje (Lyrics Video)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/8fFn5Q4hGXQ/hqdefault.jpg",
    type: "Lyric Video",
    youtubeId: "8fFn5Q4hGXQ",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 7,
    title: "Kiut Ketchup (Visualizer)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/QdxFbz1N4J8/hqdefault.jpg",
    type: "Visualizer",
    youtubeId: "QdxFbz1N4J8",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 8,
    title: "Confam boy freestyle",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/UmxLwBNbQWA/hqdefault.jpg",
    type: "Freestyle",
    youtubeId: "UmxLwBNbQWA",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 9,
    title: "SOFA (Picture BTS)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/oqJVcQoWDzw/hqdefault.jpg",
    type: "Behind The Scenes",
    youtubeId: "oqJVcQoWDzw",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 10,
    title: "A Day in Los Angeles Film/Music School (Recap)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/PvL6qpeEtTQ/hqdefault.jpg",
    type: "Recap",
    youtubeId: "PvL6qpeEtTQ",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 11,
    title: "Confam Boy (Visualizer)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/cd52pQaKmAs/hqdefault.jpg",
    type: "Visualizer",
    youtubeId: "cd52pQaKmAs",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 12,
    title: "Kiut - Confam Boy (Lyrics Video)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/FiCQ0E_S20o/hqdefault.jpg",
    type: "Lyric Video",
    youtubeId: "FiCQ0E_S20o",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 13,
    title: "Kiut - Confam Boy (Visualizer)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/Z4QJQ0jJE9Y/hqdefault.jpg",
    type: "Visualizer",
    youtubeId: "Z4QJQ0jJE9Y",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 14,
    title: "Praya Request (Visualizer)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/qjEOqcOutdc/hqdefault.jpg",
    type: "Visualizer",
    youtubeId: "qjEOqcOutdc",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 15,
    title: "Kiut - Praya Request (Lyrics Video)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/i92AdFS3Gfc/hqdefault.jpg",
    type: "Lyric Video",
    youtubeId: "i92AdFS3Gfc",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 16,
    title: "Kiut - Chikito (Official Video)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/XhDvtdMiT_E/hqdefault.jpg",
    type: "Music Video",
    youtubeId: "XhDvtdMiT_E",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 17,
    title: "Samsa (BTS)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/ziALzWIs7UQ/hqdefault.jpg",
    type: "Behind The Scenes",
    youtubeId: "ziALzWIs7UQ",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 18,
    title: "Kiut - Rashida (Official Video)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/VCmvN4bz6xw/hqdefault.jpg",
    type: "Music Video",
    youtubeId: "VCmvN4bz6xw",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 19,
    title: "Kiut - Samsa",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/iJSXNGDW-C8/hqdefault.jpg",
    type: "Official Video",
    youtubeId: "iJSXNGDW-C8",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 20,
    title: "Kiut - Samanta (Official Music Video)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/GQaBzBLsx_k/hqdefault.jpg",
    type: "Music Video",
    youtubeId: "GQaBzBLsx_k",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 21,
    title: "Kiut - Rashida (Lyrics Video)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/_g6mzwmeYnk/hqdefault.jpg",
    type: "Lyric Video",
    youtubeId: "_g6mzwmeYnk",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 22,
    title: "Kiut - Money Matter",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/QGxftqUJyd4/hqdefault.jpg",
    type: "Video",
    youtubeId: "QGxftqUJyd4",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 23,
    title: "Kiut - Strength in Bed (Live)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/S3TxotoehrI/hqdefault.jpg",
    type: "Live Performance",
    youtubeId: "S3TxotoehrI",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 24,
    title: "Strength in Bed (Viral Clip)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/YiIkb7dtfwc/hqdefault.jpg",
    type: "Viral Clip",
    youtubeId: "YiIkb7dtfwc",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 25,
    title: "Kiut - Chikito (Official Lyrics Video)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/9abrlaSfbXQ/hqdefault.jpg",
    type: "Lyric Video",
    youtubeId: "9abrlaSfbXQ",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 26,
    title: "Kiut - Chikito (Glitch Live Session)",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/_2EMhX0wbWk/hqdefault.jpg",
    type: "Live Session",
    youtubeId: "_2EMhX0wbWk",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  },
  {
    id: 27,
    title: "Dreams come true when we chase them.",
    artist: "Kiut",
    views: "— views",
    duration: "—",
    date: "YouTube",
    thumbnail: "https://i.ytimg.com/vi/VxwZxQz3I8o/hqdefault.jpg",
    type: "Short",
    youtubeId: "VxwZxQz3I8o",
    description: "Watch this original Kiut video from Kiut Raba TV through the embedded YouTube player."
  }
];

// Reusable component for streaming links
function StreamingLinks() {
  return (
    <div className="mt-8 pt-8 border-t border-white/10">
      <h3 className="text-white/80 text-sm font-bold uppercase tracking-widest mb-4">
        Listen On
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Spotify */}
        <a 
          href="https://open.spotify.com/artist/7yc6EAIFaY5TO7G1JBWgng" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#1DB954]/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(29,185,84,0.3)]"
        >
          <div className="w-10 h-10 rounded-full bg-[#1DB954]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
             <Music2 size={20} className="text-[#1DB954]" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">Stream on</div>
            <div className="text-sm font-semibold text-white">Spotify</div>
          </div>
        </a>
        
        {/* Apple Music */}
        <a 
          href="https://music.apple.com/us/artist/kiut/1484593132" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FA243C]/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(250,36,60,0.3)]"
        >
          <div className="w-10 h-10 rounded-full bg-[#FA243C]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
             <PlayCircle size={20} className="text-[#FA243C]" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">Stream on</div>
            <div className="text-sm font-semibold text-white">Apple Music</div>
          </div>
        </a>
        
        {/* Audiomack */}
        <a 
          href="https://audiomack.com/kiutraba" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FFA200]/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(255,162,0,0.3)]"
        >
          <div className="w-10 h-10 rounded-full bg-[#FFA200]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
             <Radio size={20} className="text-[#FFA200]" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">Stream on</div>
            <div className="text-sm font-semibold text-white">Audiomack</div>
          </div>
        </a>
      </div>
    </div>
  );
}

// Badge color system by video type
function getBadgeStyle(type: string) {
  const t = type.toLowerCase();
  if (t.includes("lyric"))  return { text: "text-[#D4AF37]",  border: "border-[#D4AF37]/30",  bg: "bg-[#D4AF37]/10",  glow: "shadow-[0_0_8px_rgba(212,175,55,0.25)]"  };
  if (t.includes("music"))  return { text: "text-[#c084fc]",  border: "border-[#c084fc]/30",  bg: "bg-[#c084fc]/10",  glow: "shadow-[0_0_8px_rgba(192,132,252,0.20)]" };
  if (t.includes("visual")) return { text: "text-[#60a5fa]",  border: "border-[#60a5fa]/30",  bg: "bg-[#60a5fa]/10",  glow: "shadow-[0_0_8px_rgba(96,165,250,0.20)]"  };
  return                            { text: "text-white/70",   border: "border-white/15",      bg: "bg-white/5",       glow: ""                                        };
}

// Branded fallback shown when a thumbnail fails to load
function ThumbnailFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
      style={{ background: "linear-gradient(145deg,#0a0a0a 0%,#110d1a 100%)" }}>
      <div className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.18)" }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <polygon points="6,4 16,10 6,16" fill="#D4AF37" opacity="0.65" />
        </svg>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span style={{ color: "rgba(212,175,55,0.55)", fontSize: 9, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase" }}>
          Kiut Music
        </span>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Preview unavailable
        </span>
      </div>
    </div>
  );
}

// Clean recommendation card — thumbnail on top, all text below, no overlaps
function RecCard({
  video,
  onClick,
  isFirst = false,
}: {
  video: typeof videos[0];
  onClick: () => void;
  isFirst?: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const badge = getBadgeStyle(video.type);

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -7 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`group cursor-pointer flex flex-col w-full rounded-2xl overflow-hidden transition-all duration-300 ${
        isFirst
          ? "bg-[#0f0f0f] border border-[#D4AF37]/25 hover:border-[#D4AF37]/55 hover:shadow-[0_22px_55px_rgba(212,175,55,0.16)]"
          : "bg-[#0c0c0c] border border-white/[0.06] hover:border-[#D4AF37]/25 hover:shadow-[0_14px_38px_rgba(212,175,55,0.09)]"
      }`}
    >
      {/* Thumbnail */}
      <div className={`relative w-full overflow-hidden bg-[#090909] flex-shrink-0 ${isFirst ? "aspect-[4/3] sm:aspect-video" : "aspect-video"}`}>
        {!imgFailed ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <ThumbnailFallback />
        )}

        {/* Dark gradient scrim at the bottom so badges read clearly */}
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Category badge — refined, color-coded */}
        <div className={`absolute top-2.5 left-2.5 px-2.5 py-[3.5px] rounded-full backdrop-blur-md text-[9px] font-bold uppercase tracking-widest leading-none border ${badge.text} ${badge.border} ${badge.bg} ${badge.glow}`}>
          {video.type}
        </div>

        {/* Featured pill on first card */}
        {isFirst && (
          <div className="absolute top-2.5 right-2.5 px-2.5 py-[3.5px] rounded-full bg-[#D4AF37]/15 backdrop-blur-md text-[#D4AF37] text-[8px] font-black uppercase tracking-[0.22em] leading-none border border-[#D4AF37]/30">
            Featured
          </div>
        )}

        {/* Duration chip */}
        {video.duration !== "—" && (
          <div className="absolute bottom-2.5 right-2.5 px-2 py-[3.5px] rounded-md bg-black/90 backdrop-blur-md text-white/80 text-[10px] font-semibold leading-none">
            {video.duration}
          </div>
        )}

        {/* Play button — ghosted at rest, solid gold on hover */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`flex items-center justify-center rounded-full backdrop-blur-sm border transition-all duration-300 pl-0.5
            ${isFirst ? "w-12 h-12" : "w-10 h-10"}
            opacity-35 group-hover:opacity-100
            border-white/25 bg-black/35
            group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:shadow-[0_0_26px_rgba(212,175,55,0.6)]
            scale-90 group-hover:scale-100`}>
            <Play className={`text-white group-hover:text-black transition-colors duration-200 ${isFirst ? "w-5 h-5" : "w-4 h-4"}`} />
          </div>
        </div>

        {/* Bottom shimmer line on first card */}
        {isFirst && (
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent" />
        )}
      </div>

      {/* Text body — strictly below thumbnail */}
      <div className={`flex flex-col flex-1 ${isFirst ? "p-5" : "p-4"}`}>
        <h4 className={`font-bold leading-snug line-clamp-2 text-white group-hover:text-[#D4AF37] transition-colors duration-200 ${isFirst ? "text-[15px] mb-2" : "text-[13px] mb-1.5"}`}>
          {video.title}
        </h4>
        <p className="text-white/40 text-[11px] font-medium truncate mb-3">{video.artist}</p>
        <div className="flex items-center gap-1.5 text-[10px] text-white/22 flex-wrap mt-auto pt-1 border-t border-white/[0.04]">
          <span>{video.views}</span>
          <span className="text-white/15">·</span>
          <span>{video.date}</span>
        </div>
      </div>
    </motion.div>
  );
}

// Sidebar / Up Next list card
function VideoCard({ 
  video, 
  isActive, 
  onClick,
}: { 
  video: typeof videos[0]; 
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02, x: 4 }}
      className={`group flex gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
        isActive ? "bg-[#D4AF37]/10 border border-[#D4AF37]/30" : "hover:bg-white/5 border border-transparent"
      }`}
    >
      <div className="relative w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-black/50 shadow-md group-hover:shadow-[0_5px_15px_rgba(212,175,55,0.15)] transition-all">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
          loading="lazy"
        />
        <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-white text-[10px] font-medium backdrop-blur-sm">
          {video.duration}
        </div>
        {isActive && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center border-l-4 border-[#D4AF37]">
            <div className="flex gap-1 items-end h-4">
              <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-[#D4AF37] rounded-full" />
              <motion.div animate={{ height: [4, 16, 4] }} transition={{ repeat: Infinity, duration: 1.0 }} className="w-1 bg-[#D4AF37] rounded-full" />
              <motion.div animate={{ height: [4, 8, 4] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-1 bg-[#D4AF37] rounded-full" />
            </div>
          </div>
        )}
        {!isActive && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center pl-0.5 shadow-[0_0_10px_rgba(212,175,55,0.5)]">
              <Play className="w-4 h-4 text-black" />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex flex-col justify-center py-1 flex-1 min-w-0">
        <h4 className={`font-semibold text-sm line-clamp-2 leading-snug mb-1 transition-colors ${
          isActive ? "text-[#D4AF37]" : "text-white group-hover:text-[#D4AF37]"
        }`}>
          {video.title}
        </h4>
        <p className="text-white/60 text-xs truncate">{video.artist}</p>
        <p className="text-white/40 text-[10px] mt-1">{video.views} • {video.date}</p>
      </div>
    </motion.div>
  );
}

export default function Videos() {
  const [featuredVideo, setFeaturedVideo] = useState(videos[0]);
  const [activeType, setActiveType] = useState("All");

  const videoTypes = ["All", ...Array.from(new Set(videos.map((video) => video.type)))];
  const visibleVideos =
    activeType === "All" ? videos : videos.filter((video) => video.type === activeType);
  const featuredVideoUrl = `https://www.youtube.com/watch?v=${featuredVideo.youtubeId}`;
  const filteredCountLabel =
    activeType === "All" ? `${videos.length} videos` : `${visibleVideos.length} ${activeType.toLowerCase()}s`;

  // Scroll to top when a new video is selected on mobile
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [featuredVideo]);

  useEffect(() => {
    if (!visibleVideos.some((video) => video.id === featuredVideo.id)) {
      setFeaturedVideo(visibleVideos[0] ?? videos[0]);
    }
  }, [activeType, featuredVideo.id]);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: featuredVideo.title,
        text: `Watch ${featuredVideo.title} on Kiut Music Worldwide.`,
        url: featuredVideoUrl,
      });
      return;
    }

    await navigator.clipboard.writeText(featuredVideoUrl);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">

      {/* ─── HERO SECTION ───────────────────────────────────────────────── */}
      <section className="relative h-[88vh] min-h-[560px] flex items-end pb-20 overflow-hidden">
        <img
          src={videosHeroBg}
          alt="Kiut Videos Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.35em] mb-5">
              Official Visuals
            </p>
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white uppercase leading-none mb-6">
              Watch<br />
              <span className="text-[#D4AF37]">Kiut</span>
            </h1>
            <p className="text-white/55 text-base md:text-lg font-light max-w-lg mb-10">
              Every frame, every story. Cinematic visuals from the world of Kiut Music Worldwide.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-px bg-[#D4AF37]" />
              <span className="text-white/35 text-[11px] uppercase tracking-[0.25em]">Scroll to explore</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PLAYER SECTION ─────────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-black via-[#0a0510] to-black pb-24 relative">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-[#D4AF37]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 relative z-10 pt-16">
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">Library</p>
            <p className="mt-2 text-2xl font-bold text-white">{videos.length}</p>
            <p className="mt-1 text-sm text-white/40">Total visuals currently indexed on the page.</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">Browsing</p>
            <p className="mt-2 text-2xl font-bold text-white">{filteredCountLabel}</p>
            <p className="mt-1 text-sm text-white/40">Active category filter applied to the archive.</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">Source</p>
            <p className="mt-2 text-2xl font-bold text-white">YouTube</p>
            <p className="mt-1 text-sm text-white/40">Every video continues to use the official embedded player.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
          
          {/* LEFT COLUMN: Main Player & Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Video Player */}
            <motion.div 
              key={featuredVideo.youtubeId}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 relative group"
            >
              <iframe
                src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}?autoplay=1`}
                title={featuredVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full relative z-10"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/20 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 z-0" />
            </motion.div>

            {/* Video Info Container */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0a0a0a]/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/5 shadow-xl"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/20">
                    {featuredVideo.type}
                  </div>
                  
                  <h1 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-white mb-3">
                    {featuredVideo.title}
                  </h1>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-semibold text-white">{featuredVideo.artist}</span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/70">{featuredVideo.views}</span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/70">{featuredVideo.date}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={featuredVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black transition-transform duration-200 hover:scale-[1.02]"
                  >
                    <Youtube size={16} />
                    Watch on YouTube
                  </a>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/80 transition-colors duration-200 hover:border-[#D4AF37]/30 hover:text-white"
                  >
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
              </div>

              {/* Description Panel */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 transition-colors hover:bg-white/10">
                <p className="text-white/80 leading-relaxed font-light text-sm md:text-base">
                  {featuredVideo.description}
                </p>
              </div>

              {/* Streaming Links Component */}
              <StreamingLinks />
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Recommendations Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl rounded-3xl p-6 border border-white/5 shadow-xl sticky top-24">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37]">
                  <SlidersHorizontal size={18} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">Browse Archive</h3>
                  <p className="text-sm text-white/40">Filter the page without changing the player layout.</p>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {videoTypes.map((type) => {
                  const isActive = activeType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setActiveType(type)}
                      className={`rounded-full px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
                        isActive
                          ? "border border-[#D4AF37]/30 bg-[#D4AF37] text-black"
                          : "border border-white/10 bg-white/[0.03] text-white/55 hover:border-[#D4AF37]/20 hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
              
              <div className="flex flex-col gap-3 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                {visibleVideos.map((video) => (
                  <VideoCard 
                    key={video.id}
                    video={video}
                    isActive={featuredVideo.id === video.id}
                    onClick={() => setFeaturedVideo(video)}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ─── RECOMMENDED VISUALS ─────────────────────────────────────────── */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 pt-8 pb-16">
        <div className="flex items-start justify-between gap-4 mb-12">
          <div>
            <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-3">Curated Picks</p>
            <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-wider mb-2">
              Recommended <span className="text-[#D4AF37]">Visuals</span>
            </h3>
            <p className="text-white/35 text-sm font-light max-w-md">
              Every frame, every story — the official visual catalogue of Kiut Music Worldwide.
            </p>
          </div>
          <a
            href="https://www.youtube.com/@kiutrabatv"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-white/35 hover:text-[#D4AF37] transition-colors text-xs font-bold uppercase tracking-widest shrink-0 mt-1"
          >
            See All <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </a>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {visibleVideos.filter(v => v.id !== featuredVideo.id).map((video, index) => (
            <motion.div
              key={video.id}
              variants={{
                hidden:   { opacity: 0, y: 28 },
                visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <RecCard
                video={video}
                isFirst={index === 0}
                onClick={() => {
                  setFeaturedVideo(video);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.5);
        }
      `}</style>
      <SiteFooter />
    </div>
  );
}
