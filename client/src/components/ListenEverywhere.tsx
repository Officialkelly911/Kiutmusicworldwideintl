import { motion } from "framer-motion";
import { ArrowUpRight, Headphones } from "lucide-react";
import { SOCIAL_LINKS } from "@/components/SocialIconGroup";
import { cn } from "@/lib/utils";

const STREAMING_LABELS = new Set([
  "Spotify",
  "Apple Music",
  "Audiomack",
  "Boomplay",
  "SoundCloud",
]);

/**
 * A compact, reusable doorway into the confirmed streaming destinations.
 * Keep this driven by SOCIAL_LINKS so platform URLs remain single-sourced.
 */
export function ListenEverywhere({ compact = false, className }: { compact?: boolean; className?: string }) {
  const links = SOCIAL_LINKS.filter(({ label }) => STREAMING_LABELS.has(label));

  return (
    <section
      aria-labelledby="listen-everywhere-title"
      className={cn(
        "rounded-xl border border-white/[0.07] bg-white/[0.025] overflow-hidden",
        compact ? "p-4" : "p-6 md:p-8",
        className,
      )}
    >
      <div className={cn("flex gap-4", compact ? "items-center justify-between" : "flex-col md:flex-row md:items-end md:justify-between")}>
        <div>
          <p className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-[0.36em]">
            <Headphones size={13} aria-hidden="true" />
            Listen Everywhere
          </p>
          <h2 id="listen-everywhere-title" className={cn("font-display font-bold uppercase tracking-tight text-white", compact ? "mt-1 text-sm" : "mt-2 text-2xl md:text-3xl")}>
            Wherever you press play
          </h2>
          {!compact && <p className="mt-2 max-w-lg text-sm font-light leading-relaxed text-white/40">Follow the sound on the platform that feels like home.</p>}
        </div>
        {!compact && <span className="text-xs uppercase tracking-[0.22em] text-white/25">Official links</span>}
      </div>

      <div className={cn("flex flex-wrap gap-2.5", compact ? "mt-3" : "mt-6")} role="list" aria-label="Kiut Music streaming platforms">
        {links.map(({ label, Icon, href }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "group inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3.5 text-xs font-bold text-white/65 transition-colors hover:border-gold/40 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold",
              compact && "min-h-10 px-3",
            )}
          >
            <Icon size={compact ? 14 : 15} aria-hidden="true" />
            <span>{label}</span>
            <ArrowUpRight size={12} className="text-white/25 transition-colors group-hover:text-gold" aria-hidden="true" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}

export default ListenEverywhere;