import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { PlayerProvider, usePlayer } from "@/context/PlayerContext";
import MiniPlayer from "@/components/MiniPlayer";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { pageVariants } from "@/lib/motion";
import Home from "@/pages/Home";
import Music from "@/pages/Music";
import Videos from "@/pages/Videos";
import About from "@/pages/About";
import Newsletter from "@/pages/Newsletter";
import Tour from "@/pages/Tour";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

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
          <Switch>
            <Route path="/"           component={Home}       />
            <Route path="/music"      component={Music}      />
            <Route path="/videos"     component={Videos}     />
            <Route path="/about"      component={About}      />
            <Route path="/newsletter" component={Newsletter} />
            <Route path="/tour"       component={Tour}       />
            <Route path="/contact"    component={Contact}    />
            <Route                    component={NotFound}   />
          </Switch>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/*
          MotionConfig reducedMotion="user" — single global setting that makes
          every framer-motion animation on the site respect the OS-level
          prefers-reduced-motion preference automatically.
          CSS transitions are covered by the @media rule in index.css.
        */}
        <MotionConfig reducedMotion="user">
          <PlayerProvider>
            <Toaster />
            <Navigation />
            <AnimatedRouter />
            <MiniPlayer />
          </PlayerProvider>
        </MotionConfig>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
