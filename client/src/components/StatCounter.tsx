import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * StatCounter — animates a number up from 0 once it enters the viewport.
 * Extracted from Tour's original AnimatedCounter so Newsletter (and any
 * future page) can reuse the same behavior instead of re-implementing it.
 */
export function StatCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * value));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default StatCounter;
