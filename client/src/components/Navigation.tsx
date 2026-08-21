import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music,
  Video,
  Home,
  Info,
  Mail,
  Menu,
  X,
  Ticket,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { KiutMark } from "./KiutMark";
import { DUR, EASE_ENTER, EASE_INOUT } from "@/lib/motion";

type NavLeaf = { href: string; label: string; icon: typeof Home };

// Top-level, single-destination items.
const topLevelItems: NavLeaf[] = [
  { href: "/",       label: "Home",   icon: Home  },
  { href: "/music",  label: "Music",  icon: Music },
  { href: "/videos", label: "Videos", icon: Video },
];

// Grouped items — each renders as a "Discover" / "Connect" dropdown on
// desktop and an expandable section inside the mobile menu.
type NavGroup = { label: string; items: NavLeaf[] };
const navGroups: NavGroup[] = [
  {
    label: "Discover",
    items: [
      { href: "/about", label: "About Kiut", icon: Info   },
      { href: "/tour",  label: "Tour",       icon: Ticket },
    ],
  },
  {
    label: "Connect",
    items: [
      { href: "/contact",    label: "Contact",    icon: MessageSquare },
      { href: "/newsletter", label: "Newsletter", icon: Mail          },
    ],
  },
];

const dropdownMenuVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

/** Desktop dropdown — opens on hover (with a short close delay) or on
 * keyboard focus, closes on Escape / focus-out / mouse-leave. */
function DesktopNavDropdown({ group }: { group: NavGroup }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = group.items.some((item) => location === item.href);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => () => clearCloseTimer(), []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      containerRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node | null)) {
      setOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        clearCloseTimer();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <motion.button
        type="button"
        data-testid={`nav-${group.label.toLowerCase()}`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`relative flex items-center gap-1.5 px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-fast ${
          isActive ? "text-white" : "text-white/50 hover:text-white"
        }`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {isActive && (
          <motion.div
            layoutId="nav-active"
            className="absolute inset-0 bg-gold/10 rounded-md border border-gold/22 shadow-glow-gold"
            transition={{ duration: DUR.normal, ease: EASE_INOUT }}
          />
        )}
        <span className={`relative z-10 font-medium text-sm tracking-wide transition-colors duration-fast ${isActive ? "text-gold" : ""}`}>
          {group.label}
        </span>
        <motion.span
          className="relative z-10 flex"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: DUR.fast, ease: EASE_INOUT }}
        >
          <ChevronDown className={`w-3.5 h-3.5 ${isActive ? "text-gold" : "text-white/40"}`} aria-hidden="true" />
        </motion.span>
        {isActive && (
          <motion.div
            layoutId="nav-underline"
            className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gold rounded-full"
            transition={{ duration: DUR.normal, ease: EASE_INOUT }}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label={group.label}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownMenuVariants}
            transition={{ duration: DUR.fast, ease: EASE_ENTER }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 min-w-[190px] p-2 rounded-2xl border border-white/10 shadow-glow-gold"
            style={{
              background: "rgba(var(--midnight-black-rgb), 0.94)",
              backdropFilter: "blur(28px) saturate(1.4)",
              WebkitBackdropFilter: "blur(28px) saturate(1.4)",
            }}
          >
            {group.items.map((item) => {
              const itemActive = location === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  aria-current={itemActive ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                    itemActive ? "text-gold bg-gold/10" : "text-white/60 hover:text-gold hover:bg-gold/5"
                  }`}
                >
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-colors duration-fast hover:shadow-glow-gold"
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <span className="font-medium text-sm tracking-wide whitespace-nowrap">{item.label}</span>
                  </motion.span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Mobile menu section for a group — expands smoothly in place. */
function MobileNavGroup({ group, delay, onNavigate }: { group: NavGroup; delay: number; onNavigate: () => void }) {
  const [location] = useLocation();
  const [expanded, setExpanded] = useState(false);
  const isActive = group.items.some((item) => location === item.href);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="mb-1"
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        data-testid={`mobile-nav-${group.label.toLowerCase()}`}
        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-fast border ${
          isActive
            ? "bg-gold/15 text-gold border-gold/20"
            : "text-white/60 hover:text-white hover:bg-white/5 border-transparent"
        }`}
      >
        <span className="font-medium tracking-wide">{group.label}</span>
        <motion.span
          className="ml-auto flex"
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: DUR.fast, ease: EASE_INOUT }}
        >
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        </motion.span>
        {isActive && !expanded && <div className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />}
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-3 pt-1 pb-1 flex flex-col gap-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const itemActive = location === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={itemActive ? "page" : undefined}
                    data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-fast border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                      itemActive
                        ? "bg-gold/15 text-gold border-gold/20"
                        : "text-white/60 hover:text-white hover:bg-white/5 border-transparent"
                    }`}
                  >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                      <span className="font-medium tracking-wide">{item.label}</span>
                      {itemActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMobileMenu = useCallback((restoreFocus = false) => {
    setMobileOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeMobileMenu, mobileOpen]);

  useEffect(() => {
    if (mobileOpen) closeMobileMenu();
  }, [closeMobileMenu, location]);

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
                size={35}
                variant="gold"
                className="transition-all duration-normal group-hover:drop-glow-gold"
                label="KIUT Music"
              />
              <span className="font-display text-base font-light tracking-[0.28em] uppercase text-white/90 group-hover:text-white transition-colors duration-normal">
                KIUT<span style={{ color: "var(--color-gold)" }}>.</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4" role="list">
            {topLevelItems.map((item) => {
              const isActive = location === item.href;
              return (
                <div key={item.href} role="listitem">
                  <Link
                    href={item.href}
                    data-testid={`nav-${item.label.toLowerCase()}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                      isActive ? "text-white" : "text-white/50 hover:text-white"
                    }`}
                  >
                    <motion.span
                      className="relative block px-5 py-2.5 transition-colors duration-fast"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-active"
                          className="absolute inset-0 bg-gold/10 rounded-md border border-gold/22 shadow-glow-gold"
                          transition={{ duration: DUR.normal, ease: EASE_INOUT }}
                        />
                      )}
                      <span className={`relative z-10 font-medium text-sm tracking-wide transition-colors duration-fast ${isActive ? "text-gold" : ""}`}>
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gold rounded-full"
                          transition={{ duration: DUR.normal, ease: EASE_INOUT }}
                        />
                      )}
                    </motion.span>
                  </Link>
                </div>
              );
            })}

            {navGroups.map((group) => (
              <div key={group.label} role="listitem">
                <DesktopNavDropdown group={group} />
              </div>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            ref={mobileMenuButtonRef}
            type="button"
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => mobileOpen ? closeMobileMenu(true) : setMobileOpen(true)}
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
              {topLevelItems.map((item, i) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => closeMobileMenu()}
                    aria-current={isActive ? "page" : undefined}
                    className={`mb-1 flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-all duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                      isActive
                        ? "bg-gold/15 text-gold border-gold/20"
                        : "text-white/60 hover:text-white hover:bg-white/5 border-transparent"
                    }`}
                    data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-3"
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                      <span className="font-medium tracking-wide">{item.label}</span>
                      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />}
                    </motion.span>
                  </Link>
                );
              })}

              {navGroups.map((group, i) => (
                <MobileNavGroup
                  key={group.label}
                  group={group}
                  delay={(topLevelItems.length + i) * 0.06}
                  onNavigate={() => closeMobileMenu()}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
