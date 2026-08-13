"use client";

import { useEffect, useRef, useState } from "react";
import {
  type MotionStyle,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { FinancialArchiveRepositoryKey } from "@/lib/v2/supporting-work";

type FinancialArchiveMotionOptions = {
  focusArchive: boolean;
  forceStatic: boolean;
  reduceMotion: boolean;
};

export type FinancialArchiveMotionController = {
  sectionRef: React.RefObject<HTMLElement | null>;
  enabled: boolean;
  focusArchive: boolean;
  styles: {
    relay: MotionStyle;
    ledgerLeft: MotionStyle;
    ledgerRight: MotionStyle;
    branches: Record<FinancialArchiveRepositoryKey, MotionStyle>;
    nodes: Record<FinancialArchiveRepositoryKey, MotionStyle>;
    mobileTrace: MotionStyle;
  };
};

function usePathDraw(
  progress: ReturnType<typeof useSpring>,
  start: number,
  end: number,
): MotionStyle {
  const pathLength = useTransform(progress, [start, end], [0, 1]);
  const opacity = useTransform(progress, [start, end], [0.24, 1]);

  return { pathLength, opacity };
}

function useNodeArrival(
  progress: ReturnType<typeof useSpring>,
  start: number,
): MotionStyle {
  const scale = useTransform(
    progress,
    [start, Math.min(start + 0.12, 1)],
    [0.4, 1],
  );
  const opacity = useTransform(
    progress,
    [start, Math.min(start + 0.08, 1)],
    [0, 1],
  );

  return { scale, opacity };
}

export function useFinancialArchiveMotion({
  focusArchive,
  forceStatic,
  reduceMotion,
}: FinancialArchiveMotionOptions): FinancialArchiveMotionController {
  const sectionRef = useRef<HTMLElement>(null);
  const [hydrated, setHydrated] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 88%", "start 28%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 126,
    damping: 28,
    mass: 0.28,
    restDelta: 0.001,
  });

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (!focusArchive || !hydrated) return;

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    let cancelled = false;
    root.style.scrollBehavior = "auto";

    const alignArchive = () => {
      const target = sectionRef.current;
      if (!target || cancelled) return;

      const rootStyle = window.getComputedStyle(root);
      const targetStyle = window.getComputedStyle(target);
      const scrollPadding = Number.parseFloat(rootStyle.scrollPaddingTop) || 0;
      const scrollMargin = Number.parseFloat(targetStyle.scrollMarginTop) || 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: Math.max(targetTop - scrollPadding - scrollMargin, 0),
        behavior: "auto",
      });
    };

    const frame = window.requestAnimationFrame(alignArchive);
    const layoutRetry = window.setTimeout(alignArchive, 160);
    const fontRetry = window.setTimeout(alignArchive, 480);
    const restore = window.setTimeout(() => {
      if (!cancelled) root.style.scrollBehavior = previousScrollBehavior;
    }, 520);

    void document.fonts.ready.then(alignArchive);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      window.clearTimeout(layoutRetry);
      window.clearTimeout(fontRetry);
      window.clearTimeout(restore);
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, [focusArchive, hydrated]);

  const relay = usePathDraw(progress, 0, 0.22);
  const ledgerLeft = usePathDraw(progress, 0.16, 0.46);
  const ledgerRight = usePathDraw(progress, 0.16, 0.46);
  const apiBranch = usePathDraw(progress, 0.36, 0.58);
  const webBranch = usePathDraw(progress, 0.48, 0.7);
  const workerBranch = usePathDraw(progress, 0.6, 0.82);
  const apiNode = useNodeArrival(progress, 0.5);
  const webNode = useNodeArrival(progress, 0.64);
  const workerNode = useNodeArrival(progress, 0.78);
  const mobileTraceScale = useTransform(progress, [0.12, 0.88], [0, 1]);

  return {
    sectionRef,
    enabled: hydrated && !reduceMotion && !forceStatic && !focusArchive,
    focusArchive,
    styles: {
      relay,
      ledgerLeft,
      ledgerRight,
      branches: {
        api: apiBranch,
        web: webBranch,
        worker: workerBranch,
      },
      nodes: {
        api: apiNode,
        web: webNode,
        worker: workerNode,
      },
      mobileTrace: { scaleY: mobileTraceScale },
    },
  };
}
