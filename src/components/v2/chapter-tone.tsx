"use client";

import type { RefObject } from "react";
import {
  type MotionStyle,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  resolveChapterPhase,
  resolveChapterTone,
} from "@/lib/v2/chapter-tone";

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
    (phase) => resolveChapterTone(phase).color,
  );
  const headerAccent = useTransform(
    chapterPhase,
    (phase) => resolveChapterTone(phase).accent,
  );
  const headerBorder = useTransform(
    chapterPhase,
    (phase) => resolveChapterTone(phase).border,
  );
  const headerTextShadow = useTransform(
    chapterPhase,
    (phase) => resolveChapterTone(phase).textShadow,
  );
  const headerLayerOpacity = useTransform(
    chapterPhase,
    (phase) => resolveChapterTone(phase).layerOpacity,
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
