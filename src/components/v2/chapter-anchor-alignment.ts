"use client";

import { useEffect } from "react";

const CHAPTER_ANCHORS = new Set([
  "about",
  "vcareer",
  "work",
  "career",
  "recognition",
]);

export function useChapterAnchorAlignment(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let userMoved = false;
    const frames = new Set<number>();

    const alignCurrentHash = (force = false) => {
      if (cancelled || (userMoved && !force)) return;

      const targetId = window.location.hash.slice(1);
      if (!CHAPTER_ANCHORS.has(targetId)) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      target.scrollIntoView({ block: "start" });
      root.style.scrollBehavior = previousScrollBehavior;
    };

    const scheduleAlignment = (force = false) => {
      if (cancelled) return;

      const firstFrame = window.requestAnimationFrame(() => {
        frames.delete(firstFrame);
        const secondFrame = window.requestAnimationFrame(() => {
          frames.delete(secondFrame);
          alignCurrentHash(force);
        });
        frames.add(secondFrame);
      });
      frames.add(firstFrame);
    };

    const markUserMovement = () => {
      userMoved = true;
    };
    const handleHashChange = () => {
      userMoved = false;
      scheduleAlignment(true);
    };
    const handleWindowLoad = () => scheduleAlignment();

    scheduleAlignment(true);
    void document.fonts.ready.then(() => scheduleAlignment());
    window.addEventListener("load", handleWindowLoad, { once: true });
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("wheel", markUserMovement, { passive: true });
    window.addEventListener("touchstart", markUserMovement, { passive: true });
    window.addEventListener("keydown", markUserMovement);
    const settleTimer = window.setTimeout(() => alignCurrentHash(), 720);

    return () => {
      cancelled = true;
      frames.forEach((frame) => window.cancelAnimationFrame(frame));
      window.clearTimeout(settleTimer);
      window.removeEventListener("load", handleWindowLoad);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("wheel", markUserMovement);
      window.removeEventListener("touchstart", markUserMovement);
      window.removeEventListener("keydown", markUserMovement);
    };
  }, [enabled]);
}
