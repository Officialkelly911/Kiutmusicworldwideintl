import { Link, useLocation } from "wouter";

// ── Designer credit ────────────────────────────────────────────────────────────
// Change name or url here to update the credit across the entire site.
const DESIGNER = {
  name: "Kelly",
  url:  "#", // Replace with portfolio, LinkedIn, GitHub, or personal site URL
} as const;
import { motion } from "framer-motion";
import { KiutMark } from "./KiutMark";
import {
  SiSpotify,
  SiApplemusic,
  SiAudiomack,
  SiYoutubemusic,
  SiInstagram,
  SiYoutube,
  SiLinktree,
} from "react-icons/si";

const streamingLinks = [
  { label: "Spotify",       Icon: SiSpotify,      href: "https://open.spotify.com/artist/6mfADEalHPkjvjNPHOdFXJ" },
  { label: "Apple Music",   Icon: SiApplemusic,   href: "https://music.apple.com/artist/kiut" },
  { label: "Audiomack",     Icon: SiAudiomack,    href: "https://audiomack.com/kiutrabatv" },
  { label: "YouTube Music", Icon: SiYoutubemusic, href: "https://music.youtube.com/channel/UCKiutRababag" },
];

const connectLinks = [
  {
    label:     "Instagram",
    Icon:      SiInstagram,
    href:      "https://www.instagram.com/kiut_rababag?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    label:     "YouTube",
    Icon:      SiYoutube,
    href:      "https://youtube.com/@kiutrabatv?si=A7jsabTzz7Bq85Bo",
  },
  {
    label:     "Linktree",
    Icon:      SiLinktree,
    href:      "https://linktr.ee/kiutmusic?utm_source=linktree_profile_share&ltsid=9eac7cdb-2dc3-4852-bf26-0d2e60b983eb",
  },
];

const navLinks = [
  { label: "Home",       href: "/"           },
  { label: "About Kiut", href: "/about"      },
  { label: "Music",      href: "/music"      },
  { label: "Videos",     href: "/videos"     },
  { label: "Tour",       href: "/tour"       },
  { label: "Contact",    href: "/contact"    },
  { label: "Newsletter", href: "/newsletter" },
];

export default function SiteFooter() {
  const [, navigate] = useLocation();
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="bg-midnight border-t border-white/[0.07] relative overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[520px] h-[400px] bg-gold/4 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-amber-500/4 blur-[120px] rounded-full pointer-events-none" />

      {/* ── Streaming strip ───────────────────────────────────── */}
      <div className="border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">Available on all platforms</p>
          <div className="flex items-center gap-6">
            {streamingLinks.map(({ label, Icon, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                aria-label={label}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-1.5 text-white/30 hover:text-gold transition-colors duration-normal group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded"
              >
                <Icon
                  size={14}
                  aria-hidden="true"
                  className="group-hover:scale-110 transition-transform duration-normal"
                />
                <span className="text-[10px] font-medium hidden sm:block">{label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main footer grid ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 mb-14">

          {/* Brand + Newsletter */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start gap-3 mb-3">
              <KiutMark size={48} color="var(--color-gold)" className="drop-glow-gold" />
              <h3 className="font-display text-5xl md:text-7xl font-bold tracking-widest text-white uppercase">
                KIUT<span className="text-gold">.</span>
              </h3>
            </div>
            <p className="text-white/45 text-base mb-8 font-light max-w-sm leading-relaxed">
              Join the inner circle for exclusive updates, early releases, and behind-the-scenes access.
            </p>

            <form
              className="w-full max-w-md relative"
              onSubmit={(e) => { e.preventDefault(); navigate("/newsletter"); }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address for newsletter"
                className="w-full bg-white/[0.04] border border-white/[0.09] rounded-full px-6 py-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all pr-32"
              />
              <button
                type="submit"
                className="btn-base btn-primary btn-sm absolute right-1.5 top-1.5 bottom-1.5"
              >
                Join
              </button>
            </form>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <h4 className="text-white/70 font-bold uppercase tracking-[0.2em] mb-6 text-xs">Navigate</h4>
            <ul className="space-y-3.5">
              {navLinks.map(({ label, href }) => (
                <motion.li
                  key={href}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={href}
                    className="text-white/40 hover:text-gold transition-colors duration-fast uppercase text-xs tracking-widest font-medium"
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-white/70 font-bold uppercase tracking-[0.2em] mb-6 text-xs">Connect</h4>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">

              {/* Official brand icon buttons */}
              {connectLinks.map(({ label, Icon, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="btn-icon"
                >
                  <Icon size={18} aria-hidden="true" />
                </motion.a>
              ))}

              {/* DreamPlanet — custom platform, PNG icon */}
              <motion.a
                href="https://dreamplanet.org/user/61"
                target="_blank"
                rel="noopener noreferrer"
                title="DreamPlanet"
                aria-label="DreamPlanet"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="btn-icon overflow-hidden"
              >
                <img src="/assets/images/dreamplanet-icon.png" alt="" aria-hidden="true" className="w-7 h-7 object-contain rounded-md" />
              </motion.a>

            </div>
            <p className="mt-4 text-white/20 text-[9px] uppercase tracking-[0.25em]">@kiut_rababag</p>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────── */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} Kiut Music Worldwide. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs tracking-widest uppercase font-medium">
            <a
              href="/legal"
              className="btn-base btn-secondary btn-sm !border-gold/40 text-gold/80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-3 h-3 shrink-0"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1a.75.75 0 0 1 .75.75v6.19l1.22-1.22a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 0 1 1.06-1.06l1.22 1.22V1.75A.75.75 0 0 1 8 1ZM3 9.75A2.25 2.25 0 0 1 5.25 7.5h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 0-.75.75v2.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2.5a.75.75 0 0 0-.75-.75h-.75a.75.75 0 0 1 0-1.5h.75A2.25 2.25 0 0 1 13 9.75v2.5A2.25 2.25 0 0 1 10.75 14.5h-5.5A2.25 2.25 0 0 1 3 12.25v-2.5Z"
                  clipRule="evenodd"
                />
              </svg>
              Legal
            </a>
          </div>
        </div>

        {/* ── Designer credit ──────────────────────────────────── */}
        <p className="mt-4 text-center text-[9px] font-light tracking-[0.2em] text-white/20">
          Designed &amp; Developed by{" "}
          <span className="text-white/30">{DESIGNER.name}</span>
        </p>
      </div>
    </motion.footer>
  );
}
