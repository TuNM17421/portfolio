"use client";

import { useEffect, useRef, useState } from "react";
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
  CAREER_TRACE_CONTACTS,
  CAREER_TRACE_WINDOWS,
  resolveActiveCareerRecord,
  resolveCareerTraceMode,
  resolveCareerTraceProgress,
  type CareerRecordKey,
  type CareerTraceMode,
} from "@/lib/v2/career-recognition";

const DESKTOP_CAREER_QUERY = "(min-width: 1024px)";

type CareerTraceMotionOptions = {
  forceStatic: boolean;
  forcedRecord: CareerRecordKey | null;
  reduceMotion: boolean;
};

export type CareerTraceMotionController = {
  sectionRef: React.RefObject<HTMLElement | null>;
  timelineRef: React.RefObject<HTMLElement | null>;
  activeRecord: CareerRecordKey;
  mode: CareerTraceMode;
  enabled: boolean;
  styles: {
    handoffStem: MotionStyle;
    handoffNode: MotionStyle;
    handoffTrack: MotionStyle;
    yearProgress: MotionStyle;
    yearCursor: MotionStyle;
    traceProgress: MotionStyle;
    traceCursor: MotionStyle;
    records: Record<CareerRecordKey, MotionStyle>;
    nodes: Record<CareerRecordKey, MotionStyle>;
  };
};

function useRecordIntensity(
  progress: MotionValue<number>,
  record: CareerRecordKey,
  position: "first" | "middle" | "last",
): MotionStyle {
  const window = CAREER_TRACE_WINDOWS[record];
  const opacity = useTransform(
    progress,
    [window.enter, window.holdStart, window.holdEnd, window.exit],
    position === "first"
      ? [0.68, 1, 1, 0.78]
      : position === "last"
        ? [0.58, 1, 1, 1]
        : [0.58, 1, 1, 0.78],
  );

  return { opacity };
}

function useNodeContact(
  progress: MotionValue<number>,
  record: CareerRecordKey,
): MotionStyle {
  const window = CAREER_TRACE_WINDOWS[record];
  const resolvedColor = record === "fpt" ? "#0060f0" : "#176f6b";
  const scale = useTransform(
    progress,
    [window.enter, window.holdStart, window.holdEnd, window.exit],
    [0.76, 1.38, 1.08, 1],
  );
  const backgroundColor = useTransform(
    progress,
    [window.enter, window.holdStart, window.holdEnd, window.exit],
    ["#4b7188", "#0060f0", "#0060f0", resolvedColor],
  );
  const boxShadow = useTransform(
    progress,
    [window.enter, window.holdStart, window.holdEnd, window.exit],
    [
      "0 0 0 1px rgba(75,113,136,.7), 0 0 0 rgba(0,96,240,0)",
      "0 0 0 1px #0060f0, 0 0 24px 5px rgba(0,96,240,.26)",
      "0 0 0 1px #0060f0, 0 0 15px 2px rgba(0,96,240,.16)",
      `0 0 0 1px ${resolvedColor}, 0 0 0 rgba(0,96,240,0)`,
    ],
  );

  return { scale, backgroundColor, boxShadow };
}

export function useCareerTraceMotion({
  forceStatic,
  forcedRecord,
  reduceMotion,
}: CareerTraceMotionOptions): CareerTraceMotionController {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const [desktop, setDesktop] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [activeRecord, setActiveRecord] = useState<CareerRecordKey>(
    forcedRecord ?? "education",
  );
  const effectiveEntry = useMotionValue(1);
  const effectiveProgress = useMotionValue(
    forcedRecord ? resolveCareerTraceProgress(forcedRecord) : 1,
  );
  const { scrollYProgress: entryScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start 102%", "start 42%"],
  });
  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: timelineRef,
    offset: ["start 78%", "end 34%"],
  });
  const entryProgress = useSpring(entryScrollProgress, {
    stiffness: 142,
    damping: 31,
    mass: 0.26,
    restDelta: 0.001,
  });
  const timelineProgress = useSpring(timelineScrollProgress, {
    stiffness: 128,
    damping: 29,
    mass: 0.28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_CAREER_QUERY);
    const update = () => {
      setDesktop(query.matches);
      setHydrated(true);
    };

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const mode = resolveCareerTraceMode({
    desktop,
    reduceMotion,
    forceStatic,
    forcedRecord,
  });

  useEffect(() => {
    if (mode === "forced") {
      const forcedProgress = resolveCareerTraceProgress(forcedRecord);
      effectiveEntry.set(1);
      effectiveProgress.set(forcedProgress);
      if (forcedRecord) setActiveRecord(forcedRecord);
      return;
    }

    if (mode === "static") {
      effectiveEntry.set(1);
      effectiveProgress.set(1);
      setActiveRecord(forcedRecord ?? "aiProgram");
      return;
    }

    effectiveEntry.set(entryProgress.get());
    effectiveProgress.set(timelineProgress.get());
    setActiveRecord(resolveActiveCareerRecord(timelineProgress.get()));
  }, [
    effectiveEntry,
    effectiveProgress,
    entryProgress,
    forcedRecord,
    mode,
    timelineProgress,
  ]);

  useMotionValueEvent(entryProgress, "change", (latest) => {
    if (mode === "active") effectiveEntry.set(latest);
  });

  useMotionValueEvent(timelineProgress, "change", (latest) => {
    if (mode !== "active") return;
    effectiveProgress.set(latest);
    const nextRecord = resolveActiveCareerRecord(latest);
    setActiveRecord((current) =>
      current === nextRecord ? current : nextRecord,
    );
  });

  const handoffStemScale = useTransform(effectiveEntry, [0.06, 0.46], [0, 1]);
  const handoffNodeScale = useTransform(effectiveEntry, [0.35, 0.54], [0.3, 1]);
  const handoffNodeOpacity = useTransform(effectiveEntry, [0.32, 0.46], [0, 1]);
  const handoffTrackScale = useTransform(effectiveEntry, [0.46, 0.94], [0, 1]);
  const yearProgressScale = useTransform(
    effectiveProgress,
    [0.03, 0.92],
    [0, 1],
  );
  const yearCursorLeft = useTransform(
    effectiveProgress,
    [0.03, 0.92],
    ["0%", "100%"],
  );
  const yearCursorOpacity = useTransform(
    effectiveProgress,
    [0, 0.04, 0.9, 0.98],
    [0, 1, 1, 0],
  );
  const traceProgressScale = useTransform(
    effectiveProgress,
    [CAREER_TRACE_CONTACTS.education, 0.94],
    [0, 1],
  );
  const traceCursorTop = useTransform(
    effectiveProgress,
    [
      CAREER_TRACE_CONTACTS.education,
      CAREER_TRACE_CONTACTS.fpt,
      CAREER_TRACE_CONTACTS.aiProgram,
      0.94,
    ],
    ["0%", "26.5%", "73.5%", "100%"],
  );
  const traceCursorOpacity = useTransform(
    effectiveProgress,
    [0.04, 0.08, 0.9, 0.97],
    [0, 1, 1, 0],
  );
  const education = useRecordIntensity(effectiveProgress, "education", "first");
  const fpt = useRecordIntensity(effectiveProgress, "fpt", "middle");
  const aiProgram = useRecordIntensity(effectiveProgress, "aiProgram", "last");
  const educationNode = useNodeContact(effectiveProgress, "education");
  const fptNode = useNodeContact(effectiveProgress, "fpt");
  const aiProgramNode = useNodeContact(effectiveProgress, "aiProgram");

  return {
    sectionRef,
    timelineRef,
    activeRecord,
    mode,
    enabled: hydrated && mode !== "static",
    styles: {
      handoffStem: { scaleY: handoffStemScale },
      handoffNode: {
        scale: handoffNodeScale,
        opacity: handoffNodeOpacity,
      },
      handoffTrack: { scaleX: handoffTrackScale },
      yearProgress: { scaleX: yearProgressScale },
      yearCursor: { left: yearCursorLeft, opacity: yearCursorOpacity },
      traceProgress: { scaleY: traceProgressScale },
      traceCursor: {
        top: traceCursorTop,
        opacity: traceCursorOpacity,
      },
      records: { education, fpt, aiProgram },
      nodes: {
        education: educationNode,
        fpt: fptNode,
        aiProgram: aiProgramNode,
      },
    },
  };
}
