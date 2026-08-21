import { motion } from "framer-motion";

interface NewsletterSpinnerProps {
  /** Pixel size of the spinner. Default: 20 */
  size?: number;
  className?: string;
}

/**
 * Lightweight inline gold spinner for use inside buttons or form states.
 */
export function NewsletterSpinner({ size = 20, className = "" }: NewsletterSpinnerProps) {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
      className={`inline-block rounded-full border-2 border-current border-t-transparent ${className}`}
      style={{ width: size, height: size, flexShrink: 0 }}
      aria-hidden="true"
    />
  );
}
