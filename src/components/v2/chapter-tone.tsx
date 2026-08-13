"use client";

import { useEffect, useState, type RefObject } from "react";
import {
  type MotionStyle,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  resolveActiveNavigation,
  resolveChapterName,
  resolveChapterPhase,
  resolveChapterTraceScale,
  resolveChapterTone,
  type V2Chapter,
  type V2NavigationChapter,
} from "@/lib/v2/chapter-tone";

type ChapterToneOptions = {
  aboutSectionRef: RefObject<HTMLElement | null>;
  vcareerSectionRef: RefObject<HTMLElement | null>;
  workSectionRef: RefObject<HTMLElement | null>;
  careerSectionRef: RefObject<HTMLElement | null>;
  recognitionSectionRef: RefObject<HTMLElement | null>;
  reduceMotion: boolean;
};

export type V2ChapterTone = {
  activeChapter: V2Chapter;
  activeNavigation: V2NavigationChapter;
  header: MotionStyle;
  layer: MotionStyle;
  workTrace: MotionStyle;
  careerTrace: MotionStyle;
};

export function useChapterTone({
  aboutSectionRef,
  vcareerSectionRef,
  workSectionRef,
  careerSectionRef,
  recognitionSectionRef,
  reduceMotion,
}: ChapterToneOptions): V2ChapterTone {
  const [activeChapter, setActiveChapter] = useState<V2Chapter>("hero");
  const { scrollYProgress: aboutEntryProgress } = useScroll({
    target: aboutSectionRef,
    offset: ["start 112px", "start 40px"],
  });
  const { scrollYProgress: vcareerEntryProgress } = useScroll({
    target: vcareerSectionRef,
    offset: ["start 112px", "start 40px"],
  });
  const { scrollYProgress: workEntryProgress } = useScroll({
    target: workSectionRef,
    offset: ["start 112px", "start 40px"],
  });
  const { scrollYProgress: careerEntryProgress } = useScroll({
    target: careerSectionRef,
    offset: ["start 112px", "start 40px"],
  });
  const { scrollYProgress: recognitionEntryProgress } = useScroll({
    target: recognitionSectionRef,
    offset: ["start 112px", "start 40px"],
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
  const careerEntrySpring = useSpring(careerEntryProgress, {
    stiffness: 190,
    damping: 32,
    mass: 0.22,
    restDelta: 0.001,
  });
  const recognitionEntrySpring = useSpring(recognitionEntryProgress, {
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
  const careerSource = reduceMotion
    ? careerEntryProgress
    : careerEntrySpring;
  const recognitionSource = reduceMotion
    ? recognitionEntryProgress
    : recognitionEntrySpring;
  const chapterPhase = useTransform(
    [
      aboutSource,
      vcareerSource,
      workSource,
      careerSource,
      recognitionSource,
    ],
    ([aboutValue, vcareerValue, workValue, careerValue, recognitionValue]) =>
      resolveChapterPhase(
        Number(aboutValue),
        Number(vcareerValue),
        Number(workValue),
        Number(careerValue),
        Number(recognitionValue),
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
  const workTraceScale = useTransform(chapterPhase, (phase) =>
    resolveChapterTraceScale(Number(phase), "work"),
  );
  const careerTraceScale = useTransform(chapterPhase, (phase) =>
    resolveChapterTraceScale(Number(phase), "career"),
  );

  useMotionValueEvent(chapterPhase, "change", (phase) => {
    const nextChapter = resolveChapterName(Number(phase));
    setActiveChapter((current) =>
      current === nextChapter ? current : nextChapter,
    );
  });

  useEffect(() => {
    const nextChapter = resolveChapterName(chapterPhase.get());
    setActiveChapter((current) =>
      current === nextChapter ? current : nextChapter,
    );
  }, [chapterPhase, reduceMotion]);

  return {
    activeChapter,
    activeNavigation: resolveActiveNavigation(activeChapter),
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
    careerTrace: {
      scaleX: careerTraceScale,
    },
  };
}
