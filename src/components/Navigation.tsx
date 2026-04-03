import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Video, Home, Info, Mail, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/music", label: "Music", icon: Music },
  { href: "/videos", label: "Videos", icon: Video },
  { href: "/about", label: "About", icon: Info },
];

export function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" data-testid="link-home-logo">
            <motion.div
              className="flex items-center gap-2.5 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.24)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-shadow duration-300">
                <Music className="w-5 h-5 text-black" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                Kiut <span className="text-[#D4AF37]">Music</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    data-testid={`nav-${item.label.toLowerCase()}`}
                    className={`relative px-5 py-2.5 rounded-lg cursor-pointer transition-colors duration-200 ${
                      isActive ? "text-white" : "text-white/50 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/22 shadow-[0_0_22px_rgba(212,175,55,0.14),inset_0_1px_0_rgba(212,175,55,0.12)]"
                        transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                      />
                    )}
                    <span className={`relative z-10 font-medium text-sm tracking-wide transition-colors duration-200 ${isActive ? "text-[#D4AF37]" : ""}`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#D4AF37] rounded-full"
                        transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}

            {/* Newsletter CTA */}
            <Link href="/newsletter">
              <motion.div
                data-testid="nav-newsletter"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`ml-2 px-5 py-2 rounded-full cursor-pointer font-bold text-sm tracking-widest uppercase transition-all duration-300 ${
                  location === "/newsletter"
                    ? "bg-[#D4AF37] text-black shadow-[0_0_25px_rgba(212,175,55,0.5)]"
                    : "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
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
            whileTap={{ scale: 0.92 }}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-6 h-6" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-6 h-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
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
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer mb-1 transition-all duration-200 ${
                        isActive
                          ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/20"
                          : isNewsletter
                          ? "bg-[#D4AF37]/5 text-[#D4AF37]/80 border border-[#D4AF37]/10 hover:bg-[#D4AF37]/15"
                          : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                      data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium tracking-wide">{item.label}</span>
                      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
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
