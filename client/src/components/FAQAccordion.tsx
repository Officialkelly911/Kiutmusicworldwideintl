import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * FAQAccordion — reusable collapsible FAQ list.
 * Extracted from Tour's original FAQ pattern so any page (Tour, Contact, …)
 * can render the same look/motion/accessibility behavior from one place.
 */
export interface FAQAccordionItem {
  q: string;
  a: string;
}

export interface FAQAccordionProps {
  items: FAQAccordionItem[];
  idPrefix: string;
  /** Index open by default, or null for all-collapsed. Default 0. */
  defaultOpenIndex?: number | null;
}

export function FAQAccordion({ items, idPrefix, defaultOpenIndex = 0 }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={item.q}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden hover:border-gold/20 transition-colors duration-normal"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              aria-expanded={isOpen}
              aria-controls={`${idPrefix}-panel-${i}`}
              id={`${idPrefix}-trigger-${i}`}
            >
              <span className={`font-display text-sm md:text-base font-bold uppercase tracking-tight transition-colors duration-fast ${isOpen ? "text-gold" : "text-white"}`}>
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border ${isOpen ? "border-gold/40 text-gold" : "border-white/15 text-white/40"}`}
                aria-hidden="true"
              >
                <ChevronDown size={13} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${idPrefix}-panel-${i}`}
                  role="region"
                  aria-labelledby={`${idPrefix}-trigger-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-white/40 text-sm leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default FAQAccordion;
