import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { PlayerProvider, usePlayer } from "@/context/PlayerContext";
import MiniPlayer from "@/components/MiniPlayer";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Home from "@/pages/Home";
import Music from "@/pages/Music";
import Videos from "@/pages/Videos";
import About from "@/pages/About";
import Newsletter from "@/pages/Newsletter";
import NotFound from "@/pages/not-found";

const pageVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const } },
  exit:    { opacity: 0,         transition: { duration: 0.15, ease: "easeIn" } },
};

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
        <PlayerProvider>
          <Toaster />
          <Navigation />
          <AnimatedRouter />
          <MiniPlayer />
        </PlayerProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
