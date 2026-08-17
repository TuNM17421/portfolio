"use client";

import { useEffect, useRef, useState } from "react";
import {
  type MotionStyle,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

type VCareerChapterHandoffOptions = {
  reduceMotion: boolean;
};

export type VCareerChapterHandoffController = {
  sectionRef: React.RefObject<HTMLElement | null>;
  mode: "active" | "static";
  enabled: boolean;
  styles: {
    veil: MotionStyle;
    relay: MotionStyle;
    relayStem: MotionStyle;
    relayTerminal: MotionStyle;
    relayTrack: MotionStyle;
  };
};

export function useVCareerChapterHandoff({
  reduceMotion,
}: VCareerChapterHandoffOptions): VCareerChapterHandoffController {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 132,
    damping: 28,
    mass: 0.3,
    restDelta: 0.001,
  });

  useEffect(() => setMounted(true), []);

  const mode = mounted && !reduceMotion ? "active" : "static";
  const veilY = useTransform(
    progress,
    [0, 0.14, 0.8, 1],
    ["0%", "0%", "-112%", "-112%"],
  );
  const relayOpacity = useTransform(progress, [0.12, 0.3], [0, 1]);
  const relayStemScale = useTransform(progress, [0.1, 0.42], [0, 1]);
  const relayTerminalScale = useTransform(
    progress,
    [0.28, 0.46],
    [0, 1],
  );
  const relayTrackScale = useTransform(progress, [0.4, 0.84], [0, 1]);

  return {
    sectionRef,
    mode,
    enabled: mode === "active",
    styles: {
      veil: { y: veilY },
      relay: { opacity: relayOpacity },
      relayStem: { scaleY: relayStemScale },
      relayTerminal: { scale: relayTerminalScale },
      relayTrack: { scaleX: relayTrackScale },
    },
  };
}
