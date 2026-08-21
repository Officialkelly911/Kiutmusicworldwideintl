import { motion } from "framer-motion";
import {
  SiInstagram,
  SiYoutube,
  SiSpotify,
  SiApplemusic,
  SiAudiomack,
  SiTiktok,
  SiFacebook,
  SiSoundcloud,
  SiX,
  SiThreads,
} from "react-icons/si";
import type { IconType } from "react-icons";
import {
  INSTAGRAM_URL,
  YOUTUBE_URL,
  SPOTIFY_ARTIST_URL,
  APPLE_MUSIC_ARTIST_URL,
  AUDIOMACK_URL,
  BOOMPLAY_URL,
  TIKTOK_URL,
  FACEBOOK_URL,
  SOUNDCLOUD_URL,
  X_URL,
  THREADS_URL,
} from "@/data/social";

// react-icons/si has no Boomplay glyph — use the same minimal inline mark
// already established in Music.tsx rather than a mismatched substitute.
const SiBoomplay: IconType = ({ size = "1em", ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0-7a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
  </svg>
);

/**
 * SocialIconGroup — reusable social/streaming icon row with glow + scale
 * hover, used on Contact and Newsletter. Only platforms with a confirmed,
 * real Kiut Music URL are rendered — see the `comingSoon` list below for
 * platforms the spec calls for that don't have a confirmed link yet.
 */
export interface SocialLink {
  label: string;
  Icon: IconType;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram",   Icon: SiInstagram,  href: INSTAGRAM_URL },
  { label: "TikTok",      Icon: SiTiktok,     href: TIKTOK_URL },
  { label: "Facebook",    Icon: SiFacebook,   href: FACEBOOK_URL },
  { label: "YouTube",     Icon: SiYoutube,    href: YOUTUBE_URL },
  { label: "Spotify",     Icon: SiSpotify,    href: SPOTIFY_ARTIST_URL },
  { label: "Apple Music", Icon: SiApplemusic, href: APPLE_MUSIC_ARTIST_URL },
  { label: "Audiomack",   Icon: SiAudiomack,  href: AUDIOMACK_URL },
  { label: "Boomplay",    Icon: SiBoomplay,   href: BOOMPLAY_URL },
  { label: "SoundCloud",  Icon: SiSoundcloud, href: SOUNDCLOUD_URL },
  { label: "X",           Icon: SiX,          href: X_URL },
  { label: "Threads",     Icon: SiThreads,    href: THREADS_URL },
];

export function SocialIconGroup({ className = "" }: { className?: string }) {
  const active = SOCIAL_LINKS.filter((l) => l.href);

  return (
    <div className={`flex flex-wrap gap-3 ${className}`} role="list" aria-label="Kiut Music social profiles">
      {active.map(({ label, Icon, href }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          role="listitem"
          aria-label={label}
          whileHover={{ y: -3, scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="group relative w-11 h-11 rounded-full flex items-center justify-center border border-white/12 text-white/55 bg-white/[0.02] hover:text-gold hover:border-gold/40 transition-colors duration-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
        >
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-normal pointer-events-none"
            style={{ boxShadow: "0 0 18px rgba(var(--gold-primary-rgb),0.35)" }}
            aria-hidden="true"
          />
          <Icon size={16} className="relative" />
        </motion.a>
      ))}
    </div>
  );
}

export default SocialIconGroup;
