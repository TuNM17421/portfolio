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
  resolveWorkTraceScale,
} from "@/lib/v2/chapter-tone";

type ChapterToneOptions = {
  aboutSectionRef: RefObject<HTMLElement | null>;
  vcareerSectionRef: RefObject<HTMLElement | null>;
  workSectionRef: RefObject<HTMLElement | null>;
  reduceMotion: boolean;
};

export type V2ChapterTone = {
  header: MotionStyle;
  layer: MotionStyle;
  workTrace: MotionStyle;
};

export function useChapterTone({
  aboutSectionRef,
  vcareerSectionRef,
  workSectionRef,
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
  const { scrollYProgress: workEntryProgress } = useScroll({
    target: workSectionRef,
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
  const workEntrySpring = useSpring(workEntryProgress, {
    stiffness: 190,
    damping: 32,
    mass: 0.22,
    restDelta: 0.001,
  });
  const aboutSource = reduceMotion ? aboutEntryProgress : aboutEntrySpring;
  const vcareerSource = reduceMotion
    ? vcareerEntryProgress
    : vcareerEntrySpring;
  const workSource = reduceMotion ? workEntryProgress : workEntrySpring;
  const chapterPhase = useTransform(
    [aboutSource, vcareerSource, workSource],
    ([aboutValue, vcareerValue, workValue]) =>
      resolveChapterPhase(
        Number(aboutValue),
        Number(vcareerValue),
        Number(workValue),
      ),
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
  const workTraceScale = useTransform(vcareerSource, (vcareerValue) =>
    resolveWorkTraceScale(Number(vcareerValue)),
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
    workTrace: {
      scaleX: workTraceScale,
    },
  };
}
