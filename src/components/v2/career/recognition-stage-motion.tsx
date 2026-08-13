"use client";

import { useEffect, useRef, useState } from "react";
import {
  type MotionStyle,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  resolveRecognitionStageMode,
  type RecognitionStageMode,
} from "@/lib/v2/career-recognition";

const DESKTOP_RECOGNITION_QUERY = "(min-width: 1024px)";

type RecognitionStageMotionOptions = {
  forceStatic: boolean;
  forcedProgress: number | null;
  reduceMotion: boolean;
};

export type RecognitionStageMotionController = {
  stageRef: React.RefObject<HTMLElement | null>;
  enabled: boolean;
  mode: RecognitionStageMode;
  styles: {
    stage: MotionStyle;
    ambient: MotionStyle;
    threshold: MotionStyle;
    header: MotionStyle;
    document: MotionStyle;
    image: MotionStyle;
    primaryProof: MotionStyle;
    supportingRecords: MotionStyle;
  };
};

export function useRecognitionStageMotion({
  forceStatic,
  forcedProgress,
  reduceMotion,
}: RecognitionStageMotionOptions): RecognitionStageMotionController {
  const stageRef = useRef<HTMLElement>(null);
  const [desktop, setDesktop] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const effectiveProgress = useMotionValue(forcedProgress ?? 1);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start 98%", "start 18%"],
  });
  const stageProgress = useSpring(scrollYProgress, {
    stiffness: 126,
    damping: 29,
    mass: 0.3,
    restDelta: 0.001,
  });

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_RECOGNITION_QUERY);
    const update = () => {
      setDesktop(query.matches);
      setHydrated(true);
    };

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const mode = resolveRecognitionStageMode({
    desktop,
    reduceMotion,
    forceStatic,
    forcedProgress,
  });

  useEffect(() => {
    if (mode === "forced") {
      effectiveProgress.set(forcedProgress ?? 1);
      return;
    }

    if (mode === "static") {
      effectiveProgress.set(1);
      return;
    }

    effectiveProgress.set(stageProgress.get());
  }, [effectiveProgress, forcedProgress, mode, stageProgress]);

  useMotionValueEvent(stageProgress, "change", (latest) => {
    if (mode === "active") effectiveProgress.set(latest);
  });

  const stageClipPath = useTransform(
    effectiveProgress,
    [0, 0.2, 0.76],
    [
      "polygon(0 14%, 100% 4%, 100% 100%, 0 100%)",
      "polygon(0 9%, 100% 2%, 100% 100%, 0 100%)",
      "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
    ],
  );
  const ambientOpacity = useTransform(
    effectiveProgress,
    [0.12, 0.74],
    [0.12, 1],
  );
  const thresholdTop = useTransform(
    effectiveProgress,
    [0.02, 0.76],
    ["8%", "0%"],
  );
  const thresholdOpacity = useTransform(
    effectiveProgress,
    [0, 0.08, 0.7, 0.9],
    [0, 1, 1, 0],
  );
  const headerOpacity = useTransform(effectiveProgress, [0.3, 0.62], [0.24, 1]);
  const headerY = useTransform(effectiveProgress, [0.3, 0.68], [28, 0]);
  const documentClipPath = useTransform(
    effectiveProgress,
    [0.4, 0.86],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const documentOpacity = useTransform(effectiveProgress, [0.34, 0.52], [0, 1]);
  const imageScale = useTransform(effectiveProgress, [0.38, 1], [1.035, 1]);
  const primaryOpacity = useTransform(
    effectiveProgress,
    [0.5, 0.82],
    [0.28, 1],
  );
  const primaryY = useTransform(effectiveProgress, [0.5, 0.86], [22, 0]);
  const recordsOpacity = useTransform(
    effectiveProgress,
    [0.66, 0.94],
    [0.28, 1],
  );
  const recordsY = useTransform(effectiveProgress, [0.66, 0.96], [18, 0]);

  return {
    stageRef,
    enabled: hydrated && mode !== "static",
    mode,
    styles: {
      stage: { clipPath: stageClipPath },
      ambient: { opacity: ambientOpacity },
      threshold: { top: thresholdTop, opacity: thresholdOpacity },
      header: { opacity: headerOpacity, y: headerY },
      document: {
        clipPath: documentClipPath,
        opacity: documentOpacity,
      },
      image: { scale: imageScale },
      primaryProof: { opacity: primaryOpacity, y: primaryY },
      supportingRecords: { opacity: recordsOpacity, y: recordsY },
    },
  };
}
