"use client";

import { useRef } from "react";
import {
  type MotionStyle,
  type MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

type SupportingWorkHandoffOptions = {
  reduceMotion: boolean;
};

export type SupportingWorkHandoffController = {
  sectionRef: React.RefObject<HTMLElement | null>;
  surfaceRef: React.RefObject<HTMLDivElement | null>;
  mode: "active" | "static";
  enabled: boolean;
  progress: MotionValue<number>;
  styles: {
    stem: MotionStyle;
    cursor: MotionStyle;
    terminal: MotionStyle;
    trackLeft: MotionStyle;
    trackRight: MotionStyle;
    packetLeft: MotionStyle;
    packetRight: MotionStyle;
  };
};

export function useSupportingWorkHandoff({
  reduceMotion,
}: SupportingWorkHandoffOptions): SupportingWorkHandoffController {
  const sectionRef = useRef<HTMLElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 112%", "start 72px"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 138,
    damping: 31,
    mass: 0.26,
    restDelta: 0.001,
  });
  const stemScale = useTransform(progress, [0.1, 0.62], [0, 1]);
  const cursorTop = useTransform(progress, [0.1, 0.62], ["0%", "100%"]);
  const cursorOpacity = useTransform(
    progress,
    [0.06, 0.12, 0.58, 0.67],
    [0, 1, 1, 0],
  );
  const cursorColor = useTransform(
    progress,
    [0.1, 0.62],
    ["#83bd2d", "#0060f0"],
  );
  const terminalScale = useTransform(progress, [0.54, 0.68], [0, 1]);
  const splitScale = useTransform(progress, [0.62, 0.94], [0, 1]);
  const packetTravel = useTransform(progress, [0.62, 0.94], ["0%", "100%"]);
  const packetOpacity = useTransform(
    progress,
    [0.6, 0.65, 0.9, 0.98],
    [0, 1, 1, 0],
  );
  const mode = reduceMotion ? "static" : "active";

  return {
    sectionRef,
    surfaceRef,
    mode,
    enabled: mode === "active",
    progress,
    styles: {
      stem: { scaleY: stemScale },
      cursor: {
        top: cursorTop,
        opacity: cursorOpacity,
        borderColor: cursorColor,
        backgroundColor: cursorColor,
      },
      terminal: { scale: terminalScale },
      trackLeft: { scaleX: splitScale },
      trackRight: { scaleX: splitScale },
      packetLeft: { right: packetTravel, opacity: packetOpacity },
      packetRight: { left: packetTravel, opacity: packetOpacity },
    },
  };
}
