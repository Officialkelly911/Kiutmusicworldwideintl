import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { KiutMark } from "./KiutMark";

/**
 * Global scroll-to-top control. Branded with the official KIUT monogram
 * (per brand guidelines — "Scroll To Top Button" uses the Brand Mark, not
 * a generic arrow icon) inside a glass pill with a soft gold glow.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 560);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center shadow-glow-gold hover:shadow-glow-gold-hover transition-shadow duration-normal"
        >
          <KiutMark size={18} variant="gold" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
