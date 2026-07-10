import { motion, AnimatePresence, useInView, type TargetAndTransition } from "framer-motion";
import { Mail, Bell, Gift, Sparkles, Check, ArrowRight, ShieldCheck, Lock, Music2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import SiteFooter from "../components/SiteFooter";

/* ── Count-up hook ────────────────────────────────────────────── */
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

/* ── Floating particle orb ───────────────────────────────────── */
function Orb({ style, animate }: { style: React.CSSProperties; animate: TargetAndTransition }) {
  return (
    <motion.div
      animate={animate}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      style={style}
      className="absolute rounded-full pointer-events-none"
    />
  );
}

/* ── Floating micro-dots ─────────────────────────────────────── */
function Particle({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gold/40"
      style={{ left: x, top: y }}
      animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay }}
    />
  );
}

const benefits = [
  {
    icon: Bell,
    title: "Early Access",
    description: "Hear new releases before they go public — straight from the studio.",
  },
  {
    icon: Gift,
    title: "Exclusive Content",
    description: "Behind-the-scenes footage, unreleased tracks, and private sessions.",
  },
  {
    icon: Sparkles,
    title: "Special Offers",
    description: "Exclusive merchandise discounts and presale access to every show.",
  },
];

const exclusivePerks = [
  "Unreleased music",
  "Exclusive drops",
  "Early ticket access",
];

const particles = [
  { x: "10%", y: "20%", delay: 0 },
  { x: "25%", y: "60%", delay: 1.2 },
  { x: "40%", y: "35%", delay: 0.5 },
  { x: "55%", y: "75%", delay: 2.1 },
  { x: "70%", y: "15%", delay: 0.8 },
  { x: "80%", y: "50%", delay: 1.7 },
  { x: "90%", y: "80%", delay: 0.3 },
  { x: "15%", y: "85%", delay: 2.5 },
  { x: "62%", y: "42%", delay: 1.4 },
  { x: "48%", y: "90%", delay: 0.9 },
];

/* ── Avatar stack ─────────────────────────────────────────────── */
const avatarGradients = [
  "from-gold to-yellow-700",
  "from-purple-500 to-purple-800",
  "from-rose-400 to-pink-700",
  "from-cyan-400 to-blue-700",
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  const { count, ref: countRef } = useCountUp(50000);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > window.innerHeight / 2);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatCount = (n: number) =>
    n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "K" : n.toString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="min-h-screen pt-24 pb-16 text-white relative overflow-hidden"
    >

      {/* ── Cinematic beach background ────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/assets/newsletter/beach-hero-768.webp"
          />
          <source
            media="(max-width: 1279px)"
            srcSet="/assets/newsletter/beach-hero-1280.webp"
          />
          <source srcSet="/assets/newsletter/beach-hero-1920.webp" />
          <img
            src="/assets/newsletter/beach-hero-1920.jpg"
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </picture>
        {/* Luxury cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(var(--black-rgb),0.45), rgba(var(--black-rgb),0.55), rgba(var(--black-rgb),0.68))",
          }}
        />
        {/* Subtle brand-color sweep for cohesion (kept light so the beach stays visible) */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-[#0d0618]/10 to-black/20 mix-blend-multiply" />

        {/* Gold orb — top left */}
        <Orb
          style={{
            top: "-15%", left: "-10%", width: "55%", height: "55%",
            background: "radial-gradient(circle, rgba(var(--gold-primary-rgb),0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
        />

        {/* Purple orb — bottom right */}
        <Orb
          style={{
            bottom: "-20%", right: "-10%", width: "65%", height: "65%",
            background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
        />

        {/* Centre gold pulse */}
        <Orb
          style={{
            top: "30%", left: "35%", width: "30%", height: "30%",
            background: "radial-gradient(circle, rgba(var(--gold-primary-rgb),0.07) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0.6, 0.3] }}
        />

        {/* Floating particles */}
        {particles.map((p, i) => <Particle key={i} {...p} />)}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start min-h-[80vh]">

          {/* ── LEFT COLUMN ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-gold/30 mb-10 backdrop-blur-sm"
            >
              {/* Pulsing dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              <Mail className="w-4 h-4 text-gold" />
              <span className="text-sm font-bold tracking-widest uppercase text-gold">Inner Circle</span>
            </motion.div>

            {/* Split headline */}
            <h1 className="sr-only">Kiut Music Newsletter — Stay in the Rhythm</h1>
            <div className="mb-8" aria-hidden="true">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-display text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none text-white mb-2"
              >
                Stay in the
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="font-display text-[clamp(3.5rem,10vw,8rem)] font-bold tracking-tight uppercase leading-none block"
                  style={{
                    background: "linear-gradient(90deg, var(--color-gold), var(--color-champagne), #a87c22, var(--color-gold), var(--color-purple), var(--color-gold))",
                    backgroundSize: "300% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 20px rgba(var(--gold-primary-rgb),0.4))",
                  }}
                >
                  RHYTHM
                </motion.span>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-lg text-white/65 mb-12 font-light leading-relaxed max-w-md"
            >
              Join the Kiut Music inner circle. Early music access, exclusive fan content,
              and private updates delivered straight from the studio.
            </motion.p>

            {/* Benefit cards */}
            <div className="space-y-5 mb-12">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.12 }}
                    whileHover={{ scale: 1.03, x: 4 }}
                    className="group flex items-start gap-5 p-5 rounded-md bg-white/[0.04] border border-white/10 hover:border-gold/35 hover:bg-white/[0.07] hover:shadow-glow-gold transition-all duration-normal backdrop-blur-sm cursor-default"
                  >
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="w-12 h-12 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-gold/50 group-hover:shadow-glow-gold transition-all duration-normal"
                    >
                      <Icon className="w-5 h-5 text-gold" />
                    </motion.div>
                    <div>
                      <h3 className="font-display text-base font-bold mb-1 tracking-wide uppercase group-hover:text-gold transition-colors duration-normal">
                        {benefit.title}
                      </h3>
                      <p className="text-white/55 font-light text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {avatarGradients.map((g, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full bg-gradient-to-br ${g} border-2 border-[#050505] shadow-md`}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span ref={countRef} className="font-display text-lg font-bold text-gold">
                    {formatCount(count)}+
                  </span>
                  <span className="text-xs text-white/50 uppercase tracking-widest font-medium">subscribers</span>
                </div>
                <p className="text-white/35 text-xs tracking-wider">and counting</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative"
          >
            {/* Exclusive access teaser */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-5 p-5 rounded-md border border-purple-500/20 bg-purple-950/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full bg-purple-500/30 flex items-center justify-center">
                  <Music2 className="w-3 h-3 text-purple-300" />
                </div>
                <span className="text-purple-300 text-xs font-bold tracking-[0.3em] uppercase">Private Fan Access</span>
              </div>
              <ul className="space-y-1.5">
                {exclusivePerks.map((perk, i) => (
                  <motion.li
                    key={perk}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="flex items-center gap-2 text-white/70 text-sm font-light"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {perk}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Form card */}
            <div className="relative rounded-xl overflow-hidden">
              {/* Glow ring */}
              <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-gold/30 via-purple-600/20 to-transparent pointer-events-none" />

              <div className="relative p-8 md:p-10 rounded-xl bg-midnight/75 backdrop-blur-2xl border border-white/[0.08] shadow-xl">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <h2 className="font-display text-2xl font-bold mb-7 uppercase tracking-wide text-center">
                        Unlock <span className="text-gold">Access</span>
                      </h2>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email input */}
                        <div className="relative group">
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-5 pb-3 pt-6 text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-gold focus:bg-white/[0.07] focus:shadow-glow-gold transition-all duration-normal peer placeholder-transparent"
                            placeholder=" "
                            required
                          />
                          <label
                            htmlFor="email"
                            className="absolute text-white/40 duration-normal transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-gold pointer-events-none"
                          >
                            Email Address
                          </label>
                          {/* Bottom border animation */}
                          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold to-purple-500 rounded-b-xl group-focus-within:w-full transition-all duration-slow" />
                        </div>

                        {/* Name input */}
                        <div className="relative group">
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full px-5 pb-3 pt-6 text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-gold focus:bg-white/[0.07] focus:shadow-glow-gold transition-all duration-normal peer placeholder-transparent"
                            placeholder=" "
                          />
                          <label
                            htmlFor="name"
                            className="absolute text-white/40 duration-normal transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-gold pointer-events-none"
                          >
                            Name (Optional)
                          </label>
                          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold to-purple-500 rounded-b-xl group-focus-within:w-full transition-all duration-slow" />
                        </div>

                        {/* Error message */}
                        {error && (
                          <p role="alert" className="text-red-400 text-sm font-light -mb-1">
                            {error}
                          </p>
                        )}

                        {/* CTA button */}
                        <div className="pt-2">
                          <motion.button
                            type="submit"
                            disabled={submitting}
                            whileHover={submitting ? {} : { scale: 1.03, y: -2 }}
                            whileTap={submitting ? {} : { scale: 0.97 }}
                            className="relative w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-black overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{
                              background: "linear-gradient(90deg, var(--color-gold), var(--color-champagne), #c9a227, var(--color-gold))",
                              backgroundSize: "250% auto",
                            }}
                          >
                            {/* Shimmer overlay */}
                            <motion.span
                              animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                background: "linear-gradient(90deg, transparent 0%, rgba(var(--white-rgb),0.25) 50%, transparent 100%)",
                                backgroundSize: "200% 100%",
                              }}
                            />
                            <span className="relative z-10 drop-shadow-sm">
                              {submitting ? "Joining..." : "Join the Rhythm"}
                            </span>
                            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />

                            {/* Hover glow */}
                            <span className="absolute -inset-1 rounded-xl bg-gold/0 group-hover:bg-gold/20 blur-xl transition-all duration-normal pointer-events-none" />
                          </motion.button>

                          {/* Urgent microcopy */}
                          <p className="text-center text-white/30 text-xs uppercase tracking-widest mt-3 font-medium">
                            Limited access&nbsp;•&nbsp;Inner circle only
                          </p>
                        </div>
                      </form>

                      {/* Trust row */}
                      <div className="mt-7 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-white/35 uppercase tracking-wider font-medium">
                        <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-gold" /> No spam</div>
                        <span className="hidden sm:inline text-white/15">•</span>
                        <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-gold" /> Private list</div>
                        <span className="hidden sm:inline text-white/15">•</span>
                        <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-gold" /> Unsubscribe anytime</div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 250, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-gold/20 border border-gold flex items-center justify-center mx-auto mb-8 shadow-glow-gold-hover"
                      >
                        <Check className="w-10 h-10 text-gold" />
                      </motion.div>
                      <h2 className="font-display text-3xl font-bold mb-4 uppercase text-gold">
                        You're in the Rhythm.
                      </h2>
                      <p className="text-white/55 mb-8 font-light max-w-xs mx-auto leading-relaxed text-sm">
                        Welcome to the inner circle. Your exclusive access begins now. Check your inbox for confirmation.
                      </p>
                      <button
                        onClick={() => { setSubmitted(false); setEmail(""); setName(""); }}
                        className="text-gold font-medium hover:text-white uppercase tracking-widest text-xs transition-colors"
                      >
                        Subscribe another email
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Sticky mobile CTA ──────────────────────────────────── */}
      <AnimatePresence>
        {showSticky && !submitted && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 w-full p-4 bg-black/85 backdrop-blur-lg border-t border-white/8 z-50 lg:hidden flex justify-center"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-full max-w-sm py-4 rounded-full font-bold uppercase tracking-widest text-black shadow-glow-gold"
              style={{ background: "linear-gradient(90deg, var(--color-gold), var(--color-champagne), #c9a227)" }}
            >
              Join the Inner Circle
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <SiteFooter />
    </motion.div>
  );
}
