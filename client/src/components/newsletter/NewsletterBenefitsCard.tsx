import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface NewsletterBenefitsCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Card index — used to stagger entrance animations. */
  index?: number;
  /**
   * "hero"  — horizontal card used in the left hero column.
   * "grid"  — compact vertical card used in the full-perks grid.
   */
  variant?: "hero" | "grid";
}

/**
 * Reusable benefit card for the newsletter page.
 * Adapts its layout and animation to the hero column or the perks grid.
 */
export function NewsletterBenefitsCard({
  icon: Icon,
  title,
  description,
  index = 0,
  variant = "hero",
}: NewsletterBenefitsCardProps) {
  if (variant === "grid") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{
          duration: 0.5,
          delay: (index % 5) * 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ y: -3 }}
        className="p-5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-gold/25 hover:bg-gold/[0.03] transition-all duration-normal"
      >
        <div className="w-9 h-9 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center mb-3">
          <Icon className="w-4 h-4 text-gold" aria-hidden="true" />
        </div>
        <h3 className="font-display text-xs font-bold uppercase tracking-tight text-white mb-1.5">
          {title}
        </h3>
        <p className="text-white/32 text-xs leading-relaxed">{description}</p>
      </motion.div>
    );
  }

  // variant === "hero"
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 + index * 0.12 }}
      whileHover={{ scale: 1.03, x: 4 }}
      className="group flex items-start gap-5 p-5 rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-gold/35 hover:bg-white/[0.06] hover:shadow-glow-gold transition-all duration-normal backdrop-blur-sm cursor-default"
    >
      <motion.div
        whileHover={{ rotate: 8, scale: 1.15 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="w-12 h-12 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-gold/50 group-hover:shadow-glow-gold transition-all duration-normal"
      >
        <Icon className="w-5 h-5 text-gold" aria-hidden="true" />
      </motion.div>
      <div>
        <h3 className="font-display text-base font-bold mb-1 tracking-wide uppercase group-hover:text-gold transition-colors duration-normal">
          {title}
        </h3>
        <p className="text-white/55 font-light text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
