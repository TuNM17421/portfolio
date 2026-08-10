"use client";

import { useEffect, useRef, useState } from "react";

// Animates a numeric value from 0 to its target once it scrolls into view.
// `value` may carry a suffix (e.g. "2+"); the leading integer is animated and
// the suffix kept. State starts at the final value to match SSR (no hydration
// mismatch / no-JS fallback); honors prefers-reduced-motion.
//
// Deps are primitives only (value/target) so a setDisplay tick never re-runs
// the effect, and a ref guards against re-triggering the count.
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const match = /^(\d+)(.*)$/.exec(value.trim());
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : value;

  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    const node = ref.current;
    if (!node || target === 0) return;
    if (
      "matchMedia" in window &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    if (!("IntersectionObserver" in window)) return;

    let raf = 0;
    let start = 0;
    const duration = 1100;

    const run = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplay(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(run);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();
        setDisplay(0);
        raf = requestAnimationFrame(run);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, target]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
