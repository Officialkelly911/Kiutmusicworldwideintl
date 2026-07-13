import { motion } from "framer-motion";
import { Check } from "lucide-react";

const BENEFITS = [
  "New music releases",
  "Tour announcements",
  "Exclusive behind-the-scenes content",
  "Early merchandise drops",
  "Member-only updates",
];

interface NewsletterSuccessProps {
  /** Subscriber's first name for a personalised greeting. */
  firstName?: string;
  /** When true, shows the "already subscribed" variant. */
  isDuplicate?: boolean;
  onReset: () => void;
}

/**
 * Premium success (or duplicate) panel shown after newsletter form submission.
 * Animated checkmark, gold accent line, and benefits list.
 */
export function NewsletterSuccess({
  firstName,
  isDuplicate = false,
  onReset,
}: NewsletterSuccessProps) {
  const name = firstName?.trim() || null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="text-center py-10 focus:outline-none"
      // Shift focus here so screen readers announce the result
      tabIndex={-1}
      aria-live="polite"
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.08 }}
        className="w-20 h-20 rounded-full bg-gold/20 border border-gold flex items-center justify-center mx-auto mb-6 shadow-glow-gold-hover"
      >
        <Check className="w-10 h-10 text-gold" strokeWidth={2.5} />
      </motion.div>

      {/* Gold accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"
        style={{ transformOrigin: "center" }}
      />

      {isDuplicate ? (
        <>
          <h2 className="font-display text-2xl font-bold mb-3 uppercase text-gold">
            Already Subscribed
          </h2>
          <p className="text-white/55 mb-8 font-light max-w-xs mx-auto leading-relaxed text-sm">
            You're already subscribed or your request is being processed.
            Check your inbox for updates from Kiut Music.
          </p>
        </>
      ) : (
        <>
          <h2 className="font-display text-2xl font-bold mb-2 uppercase text-gold">
            {name ? `Welcome, ${name}.` : "Welcome to Kiut Music."}
          </h2>
          <p className="text-white/60 text-sm font-light mb-7 max-w-xs mx-auto leading-relaxed">
            Your subscription has been received successfully.
          </p>

          {/* Benefits list */}
          <div className="text-left max-w-xs mx-auto mb-8">
            <p className="text-white/35 text-[10px] uppercase tracking-[0.3em] font-bold mb-3">
              You'll be among the first to receive:
            </p>
            <ul className="space-y-2" aria-label="Subscriber benefits">
              {BENEFITS.map((benefit, i) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.28, delay: 0.38 + i * 0.07 }}
                  className="flex items-center gap-2.5 text-white/60 text-sm font-light"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </div>
        </>
      )}

      <button
        onClick={onReset}
        className="text-gold font-medium hover:text-white uppercase tracking-widest text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:rounded"
      >
        Subscribe another email
      </button>
    </motion.div>
  );
}
