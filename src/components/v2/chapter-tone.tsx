"use client";

import type { RefObject } from "react";
import {
  type MotionStyle,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { resolveChapterPhase } from "@/lib/v2/chapter-tone";

type ChapterToneOptions = {
  aboutSectionRef: RefObject<HTMLElement | null>;
  vcareerSectionRef: RefObject<HTMLElement | null>;
  reduceMotion: boolean;
};

export type V2ChapterTone = {
  header: MotionStyle;
  layer: MotionStyle;
  vcareerTrace: MotionStyle;
};

export function useChapterTone({
  aboutSectionRef,
  vcareerSectionRef,
  reduceMotion,
}: ChapterToneOptions): V2ChapterTone {
  const { scrollYProgress: aboutEntryProgress } = useScroll({
    target: aboutSectionRef,
    offset: ["start 96px", "start 0px"],
  });
  const { scrollYProgress: vcareerEntryProgress } = useScroll({
    target: vcareerSectionRef,
    offset: ["start 96px", "start 0px"],
  });
  const aboutEntrySpring = useSpring(aboutEntryProgress, {
    stiffness: 190,
    damping: 32,
    mass: 0.22,
    restDelta: 0.001,
  });
  const vcareerEntrySpring = useSpring(vcareerEntryProgress, {
    stiffness: 190,
    damping: 32,
    mass: 0.22,
    restDelta: 0.001,
  });
  const aboutSource = reduceMotion ? aboutEntryProgress : aboutEntrySpring;
  const vcareerSource = reduceMotion
    ? vcareerEntryProgress
    : vcareerEntrySpring;
  const chapterPhase = useTransform(
    [aboutSource, vcareerSource],
    ([aboutValue, vcareerValue]) =>
      resolveChapterPhase(Number(aboutValue), Number(vcareerValue)),
  );
  const headerColor = useTransform(
    chapterPhase,
    [0, 1, 2],
    ["rgb(237, 244, 245)", "rgb(7, 18, 25)", "rgb(237, 244, 245)"],
  );
  const headerAccent = useTransform(
    chapterPhase,
    [0, 1, 2],
    ["rgb(107, 215, 208)", "rgb(23, 111, 107)", "rgb(168, 240, 60)"],
  );
  const headerBorder = useTransform(
    chapterPhase,
    [0, 1, 2],
    [
      "rgba(107, 215, 208, 0.2)",
      "rgba(23, 111, 107, 0.2)",
      "rgba(168, 240, 60, 0.22)",
    ],
  );
  const headerTextShadow = useTransform(
    chapterPhase,
    [0, 1, 2],
    [
      "0 2px 18px rgba(7, 18, 25, 0.7)",
      "0 2px 16px rgba(7, 18, 25, 0.08)",
      "0 2px 18px rgba(7, 18, 25, 0.7)",
    ],
  );
  const headerLayerOpacity = useTransform(
    chapterPhase,
    [0, 1, 2],
    [0, 1, 0],
  );
  const vcareerTraceScale = useTransform(
    vcareerSource,
    [0, 0.42, 1],
    [0, 0, 1],
  );

  return {
    header: {
      color: headerColor,
      "--v2-header-accent": headerAccent,
      "--v2-header-border-color": headerBorder,
      "--v2-header-text-shadow": headerTextShadow,
    } as MotionStyle,
    layer: {
      opacity: headerLayerOpacity,
    },
    vcareerTrace: {
      scaleX: vcareerTraceScale,
    },
  };
}
