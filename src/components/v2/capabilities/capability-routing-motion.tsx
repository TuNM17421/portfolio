"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  type MotionStyle,
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  CAPABILITY_DEFINITIONS,
  resolveCapabilityAtFocusLine,
  type CapabilityKey,
} from "@/lib/v2/capabilities";

type CapabilityRoutingMotionOptions = {
  reduceMotion: boolean;
};

type CapabilityLaneMotion = {
  branch: MotionStyle;
  packet: MotionStyle;
  node: MotionStyle;
};

export type CapabilityRoutingMotionController = {
  sectionRef: RefObject<HTMLElement | null>;
  ledgerRef: RefObject<HTMLOListElement | null>;
  rowRefs: Record<CapabilityKey, RefObject<HTMLLIElement | null>>;
  trackRefs: Record<CapabilityKey, RefObject<HTMLSpanElement | null>>;
  activeCapability: CapabilityKey | null;
  enabled: boolean;
  mode: "active" | "static";
  progress: MotionValue<number>;
  styles: {
    routeBus: MotionStyle;
    routeCursor: MotionStyle;
    lanes: Record<CapabilityKey, CapabilityLaneMotion>;
    convergenceStem: MotionStyle;
    convergenceTrack: MotionStyle;
    convergenceNode: MotionStyle;
  };
};

function useMeasuredTravel(
  progress: MotionValue<number>,
  targetRef: RefObject<HTMLElement | null>,
  axis: "x" | "y",
): MotionValue<number> {
  const travel = useMotionValue(0);
  const updateTravel = useCallback(
    (latest: number) => {
      const target = targetRef.current;
      const distance =
        axis === "x" ? (target?.offsetWidth ?? 0) : (target?.offsetHeight ?? 0);
      travel.set(distance * latest);
    },
    [axis, targetRef, travel],
  );

  useMotionValueEvent(progress, "change", updateTravel);

  useEffect(() => {
    updateTravel(progress.get());
    const target = targetRef.current;
    if (!target || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => updateTravel(progress.get()));
    observer.observe(target);
    return () => observer.disconnect();
  }, [progress, targetRef, updateTravel]);

  return travel;
}

function useCapabilityLaneMotion(
  rowRef: RefObject<HTMLLIElement | null>,
  trackRef: RefObject<HTMLSpanElement | null>,
): CapabilityLaneMotion {
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 88%", "start 48%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 144,
    damping: 30,
    mass: 0.24,
    restDelta: 0.001,
  });
  const branchScale = useTransform(progress, [0.08, 0.72], [0, 1]);
  const packetTravel = useTransform(progress, [0.08, 0.72], [0, 1]);
  const packetX = useMeasuredTravel(packetTravel, trackRef, "x");
  const packetOpacity = useTransform(
    progress,
    [0.04, 0.14, 0.68, 0.82],
    [0, 1, 1, 0],
  );
  const nodeScale = useTransform(
    progress,
    [0.02, 0.3, 0.68, 1],
    [0.74, 1.38, 1.06, 1],
  );
  const nodeColor = useTransform(
    progress,
    [0, 0.34, 1],
    ["#176f6b", "#0060f0", "#0060f0"],
  );
  const nodeShadow = useTransform(
    progress,
    [0.02, 0.3, 0.7, 1],
    [
      "0 0 0 1px #176f6b, 0 0 0 rgba(0,96,240,0)",
      "0 0 0 1px #0060f0, 0 0 22px 5px rgba(0,96,240,.22)",
      "0 0 0 1px #0060f0, 0 0 12px 2px rgba(0,96,240,.12)",
      "0 0 0 1px #0060f0, 0 0 0 rgba(0,96,240,0)",
    ],
  );

  return {
    branch: { scaleX: branchScale },
    packet: { x: packetX, opacity: packetOpacity },
    node: {
      scale: nodeScale,
      backgroundColor: nodeColor,
      boxShadow: nodeShadow,
    },
  };
}

export function useCapabilityRoutingMotion({
  reduceMotion,
}: CapabilityRoutingMotionOptions): CapabilityRoutingMotionController {
  const sectionRef = useRef<HTMLElement>(null);
  const ledgerRef = useRef<HTMLOListElement>(null);
  const backendRef = useRef<HTMLLIElement>(null);
  const realtimeRef = useRef<HTMLLIElement>(null);
  const retrievalRef = useRef<HTMLLIElement>(null);
  const deliveryRef = useRef<HTMLLIElement>(null);
  const backendTrackRef = useRef<HTMLSpanElement>(null);
  const realtimeTrackRef = useRef<HTMLSpanElement>(null);
  const retrievalTrackRef = useRef<HTMLSpanElement>(null);
  const deliveryTrackRef = useRef<HTMLSpanElement>(null);
  const rowRefs = useMemo(
    () => ({
      backend: backendRef,
      realtime: realtimeRef,
      retrieval: retrievalRef,
      delivery: deliveryRef,
    }),
    [],
  );
  const trackRefs = useMemo(
    () => ({
      backend: backendTrackRef,
      realtime: realtimeTrackRef,
      retrieval: retrievalTrackRef,
      delivery: deliveryTrackRef,
    }),
    [],
  );
  const [hydrated, setHydrated] = useState(false);
  const [activeCapability, setActiveCapability] =
    useState<CapabilityKey | null>(null);
  const { scrollYProgress: ledgerScrollProgress } = useScroll({
    target: ledgerRef,
    offset: ["start 82%", "end 76%"],
  });
  const ledgerProgress = useSpring(ledgerScrollProgress, {
    stiffness: 124,
    damping: 29,
    mass: 0.28,
    restDelta: 0.001,
  });
  const backend = useCapabilityLaneMotion(backendRef, backendTrackRef);
  const realtime = useCapabilityLaneMotion(realtimeRef, realtimeTrackRef);
  const retrieval = useCapabilityLaneMotion(retrievalRef, retrievalTrackRef);
  const delivery = useCapabilityLaneMotion(deliveryRef, deliveryTrackRef);
  const busScale = useTransform(ledgerProgress, [0.02, 0.92], [0, 1]);
  const busCursorTravel = useTransform(ledgerProgress, [0.02, 0.92], [0, 1]);
  const busCursorY = useMeasuredTravel(busCursorTravel, ledgerRef, "y");
  const busCursorOpacity = useTransform(
    ledgerProgress,
    [0, 0.04, 0.88, 0.96],
    [0, 1, 1, 0],
  );
  const convergenceStemScale = useTransform(
    ledgerProgress,
    [0.82, 0.91],
    [0, 1],
  );
  const convergenceTrackScale = useTransform(
    ledgerProgress,
    [0.88, 0.98],
    [0, 1],
  );
  const convergenceNodeScale = useTransform(
    ledgerProgress,
    [0.94, 1],
    [0.3, 1],
  );
  const convergenceNodeOpacity = useTransform(
    ledgerProgress,
    [0.92, 0.97],
    [0, 1],
  );
  const mode = reduceMotion ? "static" : "active";
  const enabled = hydrated && mode === "active";

  const updateActiveCapability = useCallback(() => {
    if (!enabled) return;

    const focusLine = window.innerHeight * 0.48;
    const routes = CAPABILITY_DEFINITIONS.map(({ key }) => {
      const bounds = rowRefs[key].current?.getBoundingClientRect();
      return bounds ? { key, top: bounds.top, bottom: bounds.bottom } : null;
    }).filter((route) => route !== null);
    const nextCapability = resolveCapabilityAtFocusLine(routes, focusLine);

    setActiveCapability((current) =>
      current === nextCapability ? current : nextCapability,
    );
  }, [enabled, rowRefs]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setActiveCapability(null);
      return;
    }

    const frame = window.requestAnimationFrame(updateActiveCapability);
    window.addEventListener("resize", updateActiveCapability);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateActiveCapability);
    };
  }, [enabled, updateActiveCapability]);

  useMotionValueEvent(ledgerProgress, "change", updateActiveCapability);

  return {
    sectionRef,
    ledgerRef,
    rowRefs,
    trackRefs,
    activeCapability,
    enabled,
    mode,
    progress: ledgerProgress,
    styles: {
      routeBus: { scaleY: busScale },
      routeCursor: {
        y: busCursorY,
        opacity: busCursorOpacity,
      },
      lanes: { backend, realtime, retrieval, delivery },
      convergenceStem: { scaleY: convergenceStemScale },
      convergenceTrack: { scaleX: convergenceTrackScale },
      convergenceNode: {
        scale: convergenceNodeScale,
        opacity: convergenceNodeOpacity,
      },
    },
  };
}
