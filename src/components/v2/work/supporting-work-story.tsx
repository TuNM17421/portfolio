"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  type MotionStyle,
  type MotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  resolveScholarAIEvidenceStage,
  resolveSupportingWorkStoryMode,
  SCHOLARAI_EVIDENCE_KEYS,
  SCHOLARAI_EVIDENCE_WINDOWS,
  type ScholarAIEvidenceKey,
  type ScholarAIEvidenceWindow,
  type SupportingWorkStoryMode,
} from "@/lib/v2/supporting-work";

const DESKTOP_WORK_QUERY = "(min-width: 1024px)";

type SupportingWorkStoryOptions = {
  reduceMotion: boolean;
  forceStatic: boolean;
  forcedStage: ScholarAIEvidenceKey | null;
};

export type SupportingWorkStoryController = {
  stageRef: React.RefObject<HTMLDivElement | null>;
  mode: SupportingWorkStoryMode;
  enabled: boolean;
  compactEnhanced: boolean;
  activeStage: ScholarAIEvidenceKey;
  progress: MotionValue<number>;
  progressStyle: MotionStyle;
  stages: Record<ScholarAIEvidenceKey, MotionStyle>;
  goToStage: (stage: ScholarAIEvidenceKey) => void;
};

function useEvidenceMotion(
  progress: MotionValue<number>,
  stageWindow: ScholarAIEvidenceWindow,
  position: "first" | "middle" | "last",
): MotionStyle {
  const opacity = useTransform(
    progress,
    [
      stageWindow.enter,
      stageWindow.holdStart,
      stageWindow.holdEnd,
      stageWindow.exit,
    ],
    position === "first"
      ? [1, 1, 1, 0]
      : position === "last"
        ? [0, 1, 1, 1]
        : [0, 1, 1, 0],
  );
  const clipPath = useTransform(
    progress,
    [
      stageWindow.enter,
      stageWindow.holdStart,
      stageWindow.holdEnd,
      stageWindow.exit,
    ],
    position === "first"
      ? [
          "inset(0% 0% 0% 0%)",
          "inset(0% 0% 0% 0%)",
          "inset(0% 0% 0% 0%)",
          "inset(0% 0% 0% 12%)",
        ]
      : position === "last"
        ? [
            "inset(0% 12% 0% 0%)",
            "inset(0% 0% 0% 0%)",
            "inset(0% 0% 0% 0%)",
            "inset(0% 0% 0% 0%)",
          ]
        : [
            "inset(0% 12% 0% 0%)",
            "inset(0% 0% 0% 0%)",
            "inset(0% 0% 0% 0%)",
            "inset(0% 0% 0% 12%)",
          ],
  );
  const y = useTransform(
    progress,
    [
      stageWindow.enter,
      stageWindow.holdStart,
      stageWindow.holdEnd,
      stageWindow.exit,
    ],
    position === "first"
      ? [0, 0, 0, -14]
      : position === "last"
        ? [18, 0, 0, 0]
        : [18, 0, 0, -14],
  );

  return { opacity, clipPath, y };
}

export function useSupportingWorkStory({
  reduceMotion,
  forceStatic,
  forcedStage,
}: SupportingWorkStoryOptions): SupportingWorkStoryController {
  const stageRef = useRef<HTMLDivElement>(null);
  const [hydrated, setHydrated] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [activeStage, setActiveStage] = useState<ScholarAIEvidenceKey>(
    forcedStage ?? "retrieve",
  );
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 122,
    damping: 29,
    mass: 0.25,
    restDelta: 0.001,
  });

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_WORK_QUERY);
    const update = () => {
      setDesktop(query.matches);
      setHydrated(true);
    };

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  const mode = resolveSupportingWorkStoryMode({
    desktop,
    reduceMotion,
    forceStatic,
    forcedStage,
  });
  const compactEnhanced =
    hydrated && !desktop && !reduceMotion && !forceStatic && !forcedStage;

  useEffect(() => {
    if (forcedStage) {
      setActiveStage(forcedStage);
      return;
    }

    if (mode === "active") {
      setActiveStage(resolveScholarAIEvidenceStage(progress.get()));
    }
  }, [forcedStage, mode, progress]);

  useMotionValueEvent(progress, "change", (latest) => {
    if (mode !== "active") return;
    const nextStage = resolveScholarAIEvidenceStage(latest);
    setActiveStage((current) => (current === nextStage ? current : nextStage));
  });

  useEffect(() => {
    if (!compactEnhanced) return;

    let frame = 0;
    const updateCompactStage = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const target = stageRef.current;
        if (!target) return;

        const readingLine = window.innerHeight * 0.38;
        const closest = SCHOLARAI_EVIDENCE_KEYS.map((stage) => {
          const rect = target
            .querySelector<HTMLElement>(`[data-evidence="${stage}"]`)
            ?.getBoundingClientRect();
          if (!rect) return { stage, distance: Number.POSITIVE_INFINITY };

          const distance =
            readingLine < rect.top
              ? rect.top - readingLine
              : readingLine > rect.bottom
                ? readingLine - rect.bottom
                : 0;
          return { stage, distance };
        }).sort((a, b) => a.distance - b.distance)[0];

        if (closest) {
          setActiveStage((current) =>
            current === closest.stage ? current : closest.stage,
          );
        }
      });
    };

    updateCompactStage();
    window.addEventListener("scroll", updateCompactStage, { passive: true });
    window.addEventListener("resize", updateCompactStage);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateCompactStage);
      window.removeEventListener("resize", updateCompactStage);
    };
  }, [compactEnhanced]);

  const retrieve = useEvidenceMotion(
    progress,
    SCHOLARAI_EVIDENCE_WINDOWS.retrieve,
    "first",
  );
  const ground = useEvidenceMotion(
    progress,
    SCHOLARAI_EVIDENCE_WINDOWS.ground,
    "middle",
  );
  const evaluate = useEvidenceMotion(
    progress,
    SCHOLARAI_EVIDENCE_WINDOWS.evaluate,
    "last",
  );
  const progressScale = useTransform(progress, [0, 1], [0, 1]);

  const goToStage = useCallback(
    (stage: ScholarAIEvidenceKey) => {
      const target = stageRef.current;
      if (!target) return;

      if (mode !== "active") {
        setActiveStage(stage);
        target
          .querySelector<HTMLElement>(`[data-evidence="${stage}"]`)
          ?.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "center",
          });
        return;
      }

      const stageWindow = SCHOLARAI_EVIDENCE_WINDOWS[stage];
      const plateau = (stageWindow.holdStart + stageWindow.holdEnd) / 2;
      const stageTop = target.getBoundingClientRect().top + window.scrollY;
      const travel = Math.max(target.offsetHeight - window.innerHeight, 0);

      window.scrollTo({
        top: stageTop + travel * plateau,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [mode, reduceMotion],
  );

  return {
    stageRef,
    mode,
    enabled: mode === "active",
    compactEnhanced,
    activeStage,
    progress,
    progressStyle: { scaleY: progressScale },
    stages: { retrieve, ground, evaluate },
    goToStage,
  };
}
