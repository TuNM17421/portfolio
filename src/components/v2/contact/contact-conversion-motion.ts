"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  type MotionStyle,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

type ContactConversionMotionOptions = {
  reduceMotion: boolean;
};

export type ContactConversionMotionController = {
  sectionRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  mode: "active" | "static";
  styles: {
    emailBaseline: MotionStyle;
    emailNode: MotionStyle;
  };
};

export function useContactConversionMotion({
  reduceMotion,
}: ContactConversionMotionOptions): ContactConversionMotionController {
  const sectionRef = useRef<HTMLElement>(null);
  const [hydrated, setHydrated] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 94%", "start 34%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 132,
    damping: 30,
    mass: 0.28,
    restDelta: 0.001,
  });
  const baselineScale = useTransform(progress, [0.08, 0.74], [0, 1]);
  const emailNodeScale = useTransform(
    progress,
    [0.22, 0.52, 0.82],
    [0.45, 1.65, 1],
  );
  const emailNodeOpacity = useTransform(progress, [0.18, 0.34, 0.9], [0, 1, 1]);

  useEffect(() => setHydrated(true), []);

  const mode = reduceMotion ? "static" : "active";

  return {
    sectionRef,
    enabled: hydrated && mode === "active",
    mode,
    styles: {
      emailBaseline: { scaleX: baselineScale },
      emailNode: {
        scale: emailNodeScale,
        opacity: emailNodeOpacity,
      },
    },
  };
}
