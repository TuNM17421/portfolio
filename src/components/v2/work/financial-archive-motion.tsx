"use client";

import { useEffect, useRef, useState } from "react";
import {
  type MotionStyle,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  FINANCIAL_TOPOLOGY_TIMELINE,
  type FinancialArchiveRepositoryKey,
} from "@/lib/v2/supporting-work";

type FinancialArchiveMotionOptions = {
  focusArchive: boolean;
  forceStatic: boolean;
  reduceMotion: boolean;
};

export type FinancialArchiveMotionController = {
  sectionRef: React.RefObject<HTMLElement | null>;
  topologyRef: React.RefObject<HTMLElement | null>;
  enabled: boolean;
  focusArchive: boolean;
  styles: {
    hub: MotionStyle;
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
  end = Math.min(start + 0.12, 1),
): MotionStyle {
  const scale = useTransform(progress, [start, end], [0.4, 1]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return { scale, opacity };
}

export function useFinancialArchiveMotion({
  focusArchive,
  forceStatic,
  reduceMotion,
}: FinancialArchiveMotionOptions): FinancialArchiveMotionController {
  const sectionRef = useRef<HTMLElement>(null);
  const topologyRef = useRef<HTMLElement>(null);
  const [hydrated, setHydrated] = useState(false);
  const { scrollYProgress } = useScroll({
    target: topologyRef,
    offset: ["start 82%", "start 34%"],
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

  const { hub, ledger, drops, contacts } = FINANCIAL_TOPOLOGY_TIMELINE;
  const hubArrival = useNodeArrival(progress, hub.start, hub.end);
  const ledgerLeft = usePathDraw(progress, ledger.start, ledger.end);
  const ledgerRight = usePathDraw(progress, ledger.start, ledger.end);
  const apiBranch = usePathDraw(progress, drops.start, drops.end);
  const webBranch = usePathDraw(progress, drops.start, drops.end);
  const workerBranch = usePathDraw(progress, drops.start, drops.end);
  const apiNode = useNodeArrival(progress, contacts.start, contacts.end);
  const webNode = useNodeArrival(progress, contacts.start, contacts.end);
  const workerNode = useNodeArrival(progress, contacts.start, contacts.end);
  const mobileTraceScale = useTransform(
    progress,
    [ledger.start, drops.end],
    [0, 1],
  );

  return {
    sectionRef,
    topologyRef,
    enabled: hydrated && !reduceMotion && !forceStatic && !focusArchive,
    focusArchive,
    styles: {
      hub: hubArrival,
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
