import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { PlayerProvider, usePlayer } from "@/context/PlayerContext";
import MiniPlayer from "@/components/MiniPlayer";
import ScrollToTop from "@/components/ScrollToTop";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { pageVariants } from "@/lib/motion";
import { lazy, Suspense } from "react";

// ── Route-level code splitting ────────────────────────────────────────────────
// Each page is loaded only when navigated to. Vite will emit a separate chunk
// per page (combined with manualChunks in vite.config.ts for vendor splitting).
const Home       = lazy(() => import("@/pages/Home"));
const Music      = lazy(() => import("@/pages/Music"));
const Videos     = lazy(() => import("@/pages/Videos"));
const About      = lazy(() => import("@/pages/About"));
const Newsletter = lazy(() => import("@/pages/Newsletter"));
const Tour       = lazy(() => import("@/pages/Tour"));
const Contact    = lazy(() => import("@/pages/Contact"));
const Legal      = lazy(() => import("@/pages/Legal"));
const NotFound   = lazy(() => import("@/pages/not-found"));

// ── Page loading fallback ─────────────────────────────────────────────────────
// Shown during the first load of each lazy chunk. Intentionally minimal so
// it doesn't conflict with the page's own hero animation.
function PageFallback() {
  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center">
      <div
        className="w-10 h-10 rounded-full border-2 border-t-gold animate-spin"
        style={{ borderColor: "rgba(var(--gold-primary-rgb),0.15)", borderTopColor: "var(--gold-primary)" }}
        role="status"
        aria-label="Loading page"
      />
    </div>
  );
}

// ── Animated router ───────────────────────────────────────────────────────────
function AnimatedRouter() {
  const [location] = useLocation();
  const { showPlayer } = usePlayer();

  return (
    <div className={showPlayer ? "pb-[72px]" : ""}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Suspense boundary per-route — fallback is the minimal spinner above.
              The spinner is rarely seen after the first visit because the chunk
              is cached by the browser. */}
          <Suspense fallback={<PageFallback />}>
            <Switch>
              <Route path="/"           component={Home}       />
              <Route path="/music"      component={Music}      />
              <Route path="/videos"     component={Videos}     />
              <Route path="/about"      component={About}      />
              <Route path="/newsletter" component={Newsletter} />
              <Route path="/tour"       component={Tour}       />
              <Route path="/contact"    component={Contact}    />
              <Route path="/legal"      component={Legal}      />
              <Route                    component={NotFound}   />
            </Switch>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── App root ──────────────────────────────────────────────────────────────────
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/*
          MotionConfig reducedMotion="user" — makes every framer-motion animation
          on the site respect the OS-level prefers-reduced-motion preference.
          CSS transitions are covered by the @media rule in index.css.
        */}
        <MotionConfig reducedMotion="user">
          <PlayerProvider>
            <Toaster />
            <a href="#main-content" className="skip-link">Skip to content</a>
            <Navigation />
            <main id="main-content">
              <AnimatedRouter />
            </main>
            <MiniPlayer />
            <ScrollToTop />
          </PlayerProvider>
        </MotionConfig>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
