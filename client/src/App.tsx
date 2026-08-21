import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { PlayerProvider, usePlayer } from "@/context/PlayerContext";
import MiniPlayer from "@/components/MiniPlayer";
import ScrollToTop from "@/components/ScrollToTop";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { pageVariants } from "@/lib/motion";
import { lazy, Suspense, useEffect, Component, type ErrorInfo, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import { getPublicRoute } from "@shared/seo";

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

class MusicRouteErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Keep route failures diagnosable without exposing chunk or stack details.
    console.error("[music-route] failed to load", error, info.componentStack);
  }

  handleRetry = () => {
    // A user-initiated reload avoids automatic retry loops and can recover from
    // a transient chunk/network failure or stale browser cache.
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="min-h-[70vh] bg-midnight flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-gold/20 bg-black/60 p-8 text-center shadow-2xl">
          <p className="text-gold text-[10px] font-bold uppercase tracking-[0.35em] mb-4">
            Music unavailable
          </p>
          <h1 className="font-display text-3xl uppercase tracking-wide text-white mb-3">
            The sound is taking a moment
          </h1>
          <p className="text-white/45 text-sm leading-relaxed mb-7">
            We couldn’t load this page right now. Try again to continue to the latest releases.
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="rounded-full border border-gold/60 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-black"
          >
            Retry Music
          </button>
        </div>
      </div>
    );
  }
}

function MusicRoute() {
  return (
    <MusicRouteErrorBoundary>
      <Music />
    </MusicRouteErrorBoundary>
  );
}

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
  // The server accepts public routes with trailing slashes and query strings.
  // Use the same normalized route here so those valid direct loads do not fall
  // through to the existing NotFound component after hydration.
  const routeLocation = getPublicRoute(location) ?? location;

  // ── Page view analytics ───────────────────────────────────────────────────
  // Fires on every client-side route change. Provider adapters in analytics.ts
  // forward this to GA4 / GTM / Meta Pixel / TikTok Pixel as appropriate.
  useEffect(() => {
    track("page_view", { path: location });
  }, [location]);

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
            <Switch location={routeLocation}>
              <Route path="/"           component={Home}       />
              <Route path="/music"      component={MusicRoute} />
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
