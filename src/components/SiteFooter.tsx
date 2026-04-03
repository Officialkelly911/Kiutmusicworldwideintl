import { Instagram, Youtube, Music2, PlayCircle, Radio } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import LinktreeIcon from "./LinktreeIcon";

const streamingLinks = [
  { label: "Spotify",      icon: Music2,       href: "https://open.spotify.com/artist/6mfADEalHPkjvjNPHOdFXJ" },
  { label: "Apple Music",  icon: PlayCircle,   href: "https://music.apple.com/artist/kiut" },
  { label: "Audiomack",    icon: Radio,         href: "https://audiomack.com/kiutrabatv" },
  { label: "YouTube Music",icon: Youtube,       href: "https://music.youtube.com/channel/UCKiutRababag" },
];

const navLinks = [
  { label: "Home",        href: "/" },
  { label: "About Kiut", href: "/about" },
  { label: "Music",       href: "/music" },
  { label: "Videos",      href: "/videos" },
  { label: "Newsletter",  href: "/newsletter" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#040404] border-t border-white/[0.07] relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[520px] h-[400px] bg-[#D4AF37]/4 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-amber-500/4 blur-[120px] rounded-full pointer-events-none" />

      {/* ── Streaming strip ───────────────────────────────────── */}
      <div className="border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">Available on all platforms</p>
          <div className="flex items-center gap-6">
            {streamingLinks.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                className="flex items-center gap-1.5 text-white/30 hover:text-[#D4AF37] transition-colors duration-200 group"
              >
                <Icon size={14} className="group-hover:scale-110 transition-transform duration-200" />
                <span className="text-[10px] font-medium hidden sm:block">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main footer grid ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 mb-14">

          {/* Brand + Newsletter */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h3 className="font-display text-5xl md:text-7xl font-bold tracking-widest text-white uppercase mb-3">
              Kiut<span className="text-[#D4AF37]">.</span>
            </h3>
            <p className="text-white/45 text-base mb-8 font-light max-w-sm leading-relaxed">
              Join the inner circle for exclusive updates, early releases, and behind-the-scenes access.
            </p>

            <form className="w-full max-w-md relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/[0.04] border border-white/[0.09] rounded-full px-6 py-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all pr-32"
              />
              <button
                type="button"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#D4AF37] hover:bg-yellow-400 text-black px-6 rounded-full font-bold uppercase tracking-widest text-[11px] transition-colors"
              >
                Join
              </button>
            </form>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <h4 className="text-white/70 font-bold uppercase tracking-[0.2em] mb-6 text-[11px]">Navigate</h4>
            <ul className="space-y-3.5">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}>
                    <a className="text-white/40 hover:text-[#D4AF37] transition-colors duration-200 uppercase text-[11px] tracking-widest font-medium">
                      {label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-white/70 font-bold uppercase tracking-[0.2em] mb-6 text-[11px]">Connect</h4>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="https://www.instagram.com/kiut_rababag?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.09] flex items-center justify-center text-white/50 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com/@kiutrabatv?si=A7jsabTzz7Bq85Bo"
                target="_blank" rel="noopener noreferrer" title="YouTube" aria-label="YouTube"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.09] flex items-center justify-center text-white/50 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] transition-all duration-300"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://linktr.ee/kiutmusic?utm_source=linktree_profile_share&ltsid=9eac7cdb-2dc3-4852-bf26-0d2e60b983eb"
                target="_blank" rel="noopener noreferrer" title="Linktree" aria-label="Linktree"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.09] flex items-center justify-center text-white/50 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] transition-all duration-300"
              >
                <LinktreeIcon size={18} />
              </a>
              <a
                href="https://dreamplanet.org/user/61"
                target="_blank" rel="noopener noreferrer" title="DreamPlanet" aria-label="DreamPlanet"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.09] flex items-center justify-center overflow-hidden hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] transition-all duration-300"
              >
                <img src="/assets/images/dreamplanet-icon.png" alt="DreamPlanet" className="w-7 h-7 object-contain rounded-md" />
              </a>
            </div>
            <p className="mt-4 text-white/20 text-[9px] uppercase tracking-[0.25em]">@kiut_rababag</p>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────── */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-[11px] tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} Kiut Music Worldwide. All rights reserved.
          </p>
          <div className="flex gap-8 text-[11px] tracking-widest uppercase font-medium text-white/30">
            <a href="#" className="hover:text-white/70 transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-white/70 transition-colors duration-200">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
