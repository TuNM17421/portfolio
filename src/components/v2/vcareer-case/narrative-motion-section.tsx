"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/v2/use-prefers-reduced-motion";

type NarrativeMotionSectionProps = {
  children: ReactNode;
  className: string;
  id: string;
  kind: "problem" | "delivery" | "state";
  labelledBy: string;
};

/**
 * Enhances an already-complete reading section with reversible entry motion.
 * The server render stays fully visible, so no-JS and reduced-motion readers
 * receive the same content and reading order without an animation gate.
 */
export function NarrativeMotionSection({
  children,
  className,
  id,
  kind,
  labelledBy,
}: NarrativeMotionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [hydrated, setHydrated] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !hydrated || reduceMotion) return;

    const targets = Array.from(
      section.querySelectorAll<HTMLElement>("[data-narrative-reveal]"),
    );
    const markVisibility = (target: HTMLElement, visible: boolean) => {
      target.dataset.narrativeVisible = visible ? "true" : "false";
    };

    for (const target of targets) {
      const rect = target.getBoundingClientRect();
      markVisibility(
        target,
        rect.bottom > window.innerHeight * 0.06 &&
          rect.top < window.innerHeight * 0.88,
      );
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          markVisibility(entry.target as HTMLElement, entry.isIntersecting);
        }
      },
      {
        rootMargin: "-6% 0px -12% 0px",
        threshold: 0.12,
      },
    );

    for (const target of targets) observer.observe(target);

    return () => {
      observer.disconnect();
      for (const target of targets) delete target.dataset.narrativeVisible;
    };
  }, [hydrated, reduceMotion]);

  const motionState = !hydrated || reduceMotion ? "static" : "active";

  return (
    <section
      ref={sectionRef}
      id={id}
      className={className}
      aria-labelledby={labelledBy}
      data-narrative-kind={kind}
      data-narrative-motion={motionState}
    >
      {children}
    </section>
  );
}
