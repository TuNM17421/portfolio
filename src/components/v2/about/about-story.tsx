"use client";

import { useEffect, useRef, useState } from "react";
import {
  type MotionStyle,
  type MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  resolveAboutStoryMode,
  type AboutStoryMode,
} from "@/lib/v2/about-story";

const DESKTOP_STORY_QUERY = "(min-width: 900px)";
type AboutStoryOptions = {
  reduceMotion: boolean;
  forceStatic: boolean;
};

export type AboutStoryController = {
  sectionRef: React.RefObject<HTMLElement | null>;
  mode: AboutStoryMode;
  enabled: boolean;
  progress: MotionValue<number>;
  styles: {
    foundationFrame: MotionStyle;
    foundationClaim: MotionStyle;
    extensionClaim: MotionStyle;
    foundationBody: MotionStyle;
    principleFrame: MotionStyle;
    principleHeading: MotionStyle;
    principleBody: MotionStyle;
    process: MotionStyle;
    closing: MotionStyle;
    signalLine: MotionStyle;
    signalCursor: MotionStyle;
    signalNodeOne: MotionStyle;
    signalNodeTwo: MotionStyle;
    signalTerminal: MotionStyle;
  };
};

export function useAboutStory({
  reduceMotion,
  forceStatic,
}: AboutStoryOptions): AboutStoryController {
  const sectionRef = useRef<HTMLElement>(null);
  const [desktop, setDesktop] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 128,
    damping: 30,
    mass: 0.24,
    restDelta: 0.001,
  });

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_STORY_QUERY);
    const update = () => setDesktop(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  const mode = resolveAboutStoryMode({
    desktop,
    reduceMotion,
    forceStatic,
  });

  const foundationFrameOpacity = useTransform(
    progress,
    [0, 0.52, 0.63, 0.7],
    [1, 1, 0.28, 0],
  );
  const foundationFrameY = useTransform(
    progress,
    [0, 0.56, 0.7],
    [0, 0, -96],
  );
  const foundationClaimOpacity = useTransform(
    progress,
    [0.07, 0.17, 0.54, 0.65],
    [0, 1, 1, 0],
  );
  const foundationClaimClip = useTransform(
    progress,
    [0.07, 0.22],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"],
  );
  const foundationClaimY = useTransform(
    progress,
    [0.07, 0.22],
    [56, 0],
  );
  const extensionOpacity = useTransform(
    progress,
    [0.24, 0.38, 0.55, 0.65],
    [0, 1, 1, 0],
  );
  const extensionX = useTransform(
    progress,
    [0.24, 0.4, 0.56, 0.66],
    ["7vw", "0vw", "0vw", "-3vw"],
  );
  const foundationBodyOpacity = useTransform(
    progress,
    [0.34, 0.46, 0.56, 0.65],
    [0, 1, 1, 0],
  );
  const foundationBodyY = useTransform(
    progress,
    [0.34, 0.46, 0.58, 0.66],
    [28, 0, 0, -22],
  );

  const principleFrameOpacity = useTransform(
    progress,
    [0.53, 0.64, 0.82, 0.9],
    [0, 1, 1, 0],
  );
  const principleFrameY = useTransform(
    progress,
    [0.53, 0.66, 0.82, 0.91],
    [86, 0, 0, -68],
  );
  const principleHeadingClip = useTransform(
    progress,
    [0.56, 0.7],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"],
  );
  const principleHeadingY = useTransform(
    progress,
    [0.56, 0.7],
    [48, 0],
  );
  const principleBodyOpacity = useTransform(
    progress,
    [0.65, 0.75, 0.82, 0.89],
    [0, 1, 1, 0],
  );
  const principleBodyY = useTransform(
    progress,
    [0.65, 0.75, 0.84, 0.9],
    [24, 0, 0, -18],
  );

  const processOpacity = useTransform(
    progress,
    [0.77, 0.88, 1],
    [0, 1, 1],
  );
  const processY = useTransform(
    progress,
    [0.77, 0.9, 1],
    [52, 0, 0],
  );
  const closingOpacity = useTransform(
    progress,
    [0.84, 0.95, 1],
    [0, 1, 1],
  );
  const closingY = useTransform(
    progress,
    [0.84, 0.96, 1],
    [46, 0, 0],
  );

  const signalLineScale = useTransform(
    progress,
    [0, 0.94],
    [0.025, 1],
  );
  const signalCursorTop = useTransform(
    progress,
    [0, 1],
    ["0%", "96%"],
  );
  const nodeOneOpacity = useTransform(
    progress,
    [0.34, 0.43],
    [0, 1],
  );
  const nodeTwoOpacity = useTransform(
    progress,
    [0.58, 0.68],
    [0, 1],
  );
  const terminalOpacity = useTransform(
    progress,
    [0.86, 0.96],
    [0, 1],
  );

  return {
    sectionRef,
    mode,
    enabled: mode === "active",
    progress,
    styles: {
      foundationFrame: {
        opacity: foundationFrameOpacity,
        y: foundationFrameY,
      },
      foundationClaim: {
        opacity: foundationClaimOpacity,
        clipPath: foundationClaimClip,
        y: foundationClaimY,
      },
      extensionClaim: {
        opacity: extensionOpacity,
        x: extensionX,
      },
      foundationBody: {
        opacity: foundationBodyOpacity,
        y: foundationBodyY,
      },
      principleFrame: {
        opacity: principleFrameOpacity,
        y: principleFrameY,
      },
      principleHeading: {
        clipPath: principleHeadingClip,
        y: principleHeadingY,
      },
      principleBody: {
        opacity: principleBodyOpacity,
        y: principleBodyY,
      },
      process: {
        opacity: processOpacity,
        y: processY,
      },
      closing: {
        opacity: closingOpacity,
        y: closingY,
      },
      signalLine: {
        scaleY: signalLineScale,
      },
      signalCursor: {
        top: signalCursorTop,
      },
      signalNodeOne: {
        opacity: nodeOneOpacity,
      },
      signalNodeTwo: {
        opacity: nodeTwoOpacity,
      },
      signalTerminal: {
        opacity: terminalOpacity,
      },
    },
  };
}
