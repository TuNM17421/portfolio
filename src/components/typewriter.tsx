"use client";

import { useEffect, useState } from "react";

// Cycles through `phrases` with a type -> pause -> delete -> next loop and a
// blinking caret. State starts on the full first phrase so SSR / no-JS renders
// real text (SEO, no layout shift, no hydration mismatch); the effect then
// drives the animation. Honors prefers-reduced-motion (stays static).
export function Typewriter({
  phrases,
  className,
}: {
  phrases: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(phrases[0]?.length ?? 0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const current = phrases[index] ?? "";
    let delay = deleting ? 45 : 95;
    if (!deleting && count === current.length) delay = 1500; // hold when full
    else if (deleting && count === 0) delay = 350; // brief blank before next

    const id = setTimeout(() => {
      if (!deleting && count === current.length) {
        setDeleting(true);
      } else if (deleting && count === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else {
        setCount((c) => c + (deleting ? -1 : 1));
      }
    }, delay);

    return () => clearTimeout(id);
  }, [count, deleting, index, phrases]);

  const text = (phrases[index] ?? "").slice(0, count);

  return (
    <span className={className} aria-label={phrases.join(", ")}>
      <span aria-hidden>{text}</span>
      <span className="type-caret" aria-hidden>
        |
      </span>
    </span>
  );
}
