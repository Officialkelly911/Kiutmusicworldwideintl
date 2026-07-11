import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Video, Home, Info, Mail, Menu, X, Ticket, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { KiutMark } from "./KiutMark";

const navItems = [
  { href: "/",        label: "Home",    icon: Home          },
  { href: "/music",   label: "Music",   icon: Music         },
  { href: "/videos",  label: "Videos",  icon: Video         },
  { href: "/about",   label: "About",   icon: Info          },
  { href: "/tour",    label: "Tour",    icon: Ticket        },
  { href: "/contact", label: "Contact", icon: MessageSquare },
];

export function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-slow ${scrolled ? "glass-scrolled" : "glass"}`}
      aria-label="Main navigation"
    >
      <div className={`max-w-7xl mx-auto px-6 transition-[padding] duration-slow ${scrolled ? "py-2.5" : "py-4"}`}>
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" data-testid="link-home-logo" aria-label="Kiut Music — home">
            <motion.div
              className="flex items-center gap-3 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <KiutMark
                size={32}
                color="var(--color-gold)"
                className="transition-all duration-normal group-hover:drop-glow-gold"
              />
              <span className="font-display text-base font-light tracking-[0.28em] uppercase text-white/90 group-hover:text-white transition-colors duration-normal">
                KIUT<span style={{ color: "var(--color-gold)" }}>.</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1" role="list">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <div key={item.href} role="listitem">
                  <Link href={item.href}>
                    <motion.div
                      data-testid={`nav-${item.label.toLowerCase()}`}
                      aria-current={isActive ? "page" : undefined}
                      aria-label={item.label}
                      className={`relative px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-fast ${
                        isActive ? "text-white" : "text-white/50 hover:text-white"
                      }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-active"
                          className="absolute inset-0 bg-gold/10 rounded-md border border-gold/22 shadow-glow-gold"
                          transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                        />
                      )}
                      <span className={`relative z-10 font-medium text-sm tracking-wide transition-colors duration-fast ${isActive ? "text-gold" : ""}`}>
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gold rounded-full"
                          transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                </div>
              );
            })}

            {/* Newsletter CTA */}
            <Link href="/newsletter">
              <motion.div
                data-testid="nav-newsletter"
                aria-label="Newsletter"
                aria-current={location === "/newsletter" ? "page" : undefined}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`btn-base btn-sm ml-2 ${
                  location === "/newsletter" ? "btn-primary shadow-glow-gold-hover" : "btn-secondary"
                }`}
              >
                Newsletter
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            whileTap={{ scale: 0.92 }}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-6 h-6" aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-6 h-6" aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-nav-menu"
              key="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden mt-4 pb-4 border-t border-white/10 pt-4"
            >
              {[...navItems, { href: "/newsletter", label: "Newsletter", icon: Mail }].map((item, i) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                const isNewsletter = item.href === "/newsletter";
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer mb-1 transition-all duration-fast ${
                        isActive
                          ? "bg-gold/15 text-gold border border-gold/20"
                          : isNewsletter
                          ? "bg-gold/5 text-gold/80 border border-gold/10 hover:bg-gold/15"
                          : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                      data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                      <span className="font-medium tracking-wide">{item.label}</span>
                      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />}
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
