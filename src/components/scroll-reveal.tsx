"use client";

import { useEffect } from "react";
import { setupScrollReveal } from "@/lib/scroll-reveal";

// Mounts once in the layout: reveals any `.reveal` element as it scrolls in.
// CSS starts visible. The active class is added only after an observer has
// successfully attached, so no-JS and failed-hydration states keep all copy.
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion =
      "matchMedia" in window &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      root.classList.remove("reveal-active");
      return;
    }

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal")
    );
    if (elements.length === 0) return;

    return setupScrollReveal({
      root,
      elements,
      viewportHeight: window.innerHeight,
      createObserver: (callback) =>
        new IntersectionObserver(callback, { threshold: 0.12 }),
    });
  }, []);

  return null;
}
