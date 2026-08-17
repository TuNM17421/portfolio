"use client";

import { useEffect, useState, type RefObject } from "react";
import {
  type MotionStyle,
  type MotionValue,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import {
  resolveVCareerShowcaseMode,
  VCAREER_STAGE_WINDOWS,
  type VCareerShowcaseMode,
  type VCareerStageKey,
  type VCareerStageWindow,
} from "@/lib/v2/vcareer-showcase";

const DESKTOP_RELAY_QUERY = "(min-width: 1024px)";
const OUTCOMES_INTERACTION_START = 0.9;

type VCareerEvidenceRelayOptions = {
  sectionRef: RefObject<HTMLElement | null>;
  reduceMotion: boolean;
};

type StageMotion = {
  stage: MotionStyle;
  meta: MotionStyle;
  rail: MotionStyle;
};

export type VCareerEvidenceRelayController = {
  mode: VCareerShowcaseMode;
  enabled: boolean;
  outcomesInteractive: boolean;
  progress: MotionValue<number>;
  styles: {
    intro: MotionStyle;
    introTitle: MotionStyle;
    scope: MotionStyle;
    workflowHeader: MotionStyle;
    architecture: MotionStyle;
    architectureTrace: MotionStyle;
    outcomes: MotionStyle;
  };
  stages: Record<VCareerStageKey, StageMotion>;
};

function useStageMotion(
  progress: MotionValue<number>,
  { enter, holdStart, holdEnd, exit }: VCareerStageWindow,
): StageMotion {
  const opacity = useTransform(
    progress,
    [enter, holdStart, holdEnd, exit],
    [0, 1, 1, 0],
  );
  const x = useTransform(
    progress,
    [enter, holdStart, holdEnd, exit],
    ["10%", "0%", "0%", "-7%"],
  );
  const y = useTransform(
    progress,
    [enter, holdStart, holdEnd, exit],
    [24, 0, 0, -18],
  );
  const z = useTransform(
    progress,
    [enter, holdStart, holdEnd, exit],
    [-180, 0, 0, -120],
  );
  const scale = useTransform(
    progress,
    [enter, holdStart, holdEnd, exit],
    [0.93, 1, 1, 0.96],
  );
  const clipPath = useTransform(
    progress,
    [enter, holdStart, holdEnd, exit],
    [
      "inset(5% 0% 5% 13%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(5% 11% 5% 0%)",
    ],
  );
  const metaOpacity = useTransform(
    progress,
    [enter, holdStart, holdEnd, exit],
    [0, 1, 1, 0],
  );
  const metaY = useTransform(
    progress,
    [enter, holdStart, holdEnd, exit],
    [18, 0, 0, -12],
  );
  const railOpacity = useTransform(
    progress,
    [enter, holdStart, holdEnd, exit],
    [0.28, 1, 1, 0.28],
  );
  const railScale = useTransform(
    progress,
    [enter, holdStart, holdEnd, exit],
    [1, 1.035, 1.035, 1],
  );
  const railColor = useTransform(
    progress,
    [enter, holdStart, holdEnd, exit],
    [
      "rgba(192, 216, 240, 0.66)",
      "rgb(168, 240, 60)",
      "rgb(168, 240, 60)",
      "rgba(192, 216, 240, 0.66)",
    ],
  );

  return {
    stage: { opacity, x, y, z, scale, clipPath },
    meta: { opacity: metaOpacity, y: metaY },
    rail: { opacity: railOpacity, scale: railScale, color: railColor },
  };
}

export function useVCareerEvidenceRelay({
  sectionRef,
  reduceMotion,
}: VCareerEvidenceRelayOptions): VCareerEvidenceRelayController {
  const [desktop, setDesktop] = useState(false);
  const [outcomesReached, setOutcomesReached] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 118,
    damping: 28,
    mass: 0.26,
    restDelta: 0.001,
  });

  useMotionValueEvent(progress, "change", (latest) => {
    const next = latest >= OUTCOMES_INTERACTION_START;
    setOutcomesReached((current) => (current === next ? current : next));
  });

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_RELAY_QUERY);
    const update = () => setDesktop(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  const mode = resolveVCareerShowcaseMode({
    desktop,
    reduceMotion,
  });
  const introOpacity = useTransform(
    progress,
    [0, 0.025, 0.1, 0.145],
    [0, 1, 1, 0],
  );
  const introY = useTransform(
    progress,
    [0, 0.025, 0.1, 0.145],
    [34, 0, 0, -30],
  );
  const introTitleClip = useTransform(
    progress,
    [0.015, 0.06],
    ["inset(0% 0% 100% 0%)", "inset(-12% -2% -12% -2%)"],
  );
  const scopeOpacity = useTransform(
    progress,
    [0.04, 0.07, 0.105, 0.145],
    [0, 1, 1, 0],
  );
  const scopeY = useTransform(
    progress,
    [0.04, 0.07, 0.105, 0.145],
    [34, 0, 0, -22],
  );
  const workflowHeaderOpacity = useTransform(
    progress,
    [0.14, 0.18, 0.855, 0.91],
    [0, 1, 1, 0],
  );
  const workflowHeaderY = useTransform(
    progress,
    [0.14, 0.18, 0.855, 0.91],
    [20, 0, 0, -16],
  );
  const architectureOpacity = useTransform(
    progress,
    [
      VCAREER_STAGE_WINDOWS.interviewDemo.enter,
      VCAREER_STAGE_WINDOWS.interviewDemo.holdStart,
      VCAREER_STAGE_WINDOWS.interviewDemo.holdEnd,
      VCAREER_STAGE_WINDOWS.interviewDemo.exit,
    ],
    [0, 1, 1, 0],
  );
  const architectureY = useTransform(
    progress,
    [
      VCAREER_STAGE_WINDOWS.interviewDemo.enter,
      VCAREER_STAGE_WINDOWS.interviewDemo.holdStart,
      VCAREER_STAGE_WINDOWS.interviewDemo.holdEnd,
      VCAREER_STAGE_WINDOWS.interviewDemo.exit,
    ],
    [14, 0, 0, -10],
  );
  const architectureTraceScale = useTransform(
    progress,
    [
      VCAREER_STAGE_WINDOWS.interviewDemo.enter,
      VCAREER_STAGE_WINDOWS.interviewDemo.holdStart,
    ],
    [0, 1],
  );
  const outcomesOpacity = useTransform(progress, [0.865, 0.92, 1], [0, 1, 1]);
  const outcomesY = useTransform(progress, [0.865, 0.92, 1], [54, 0, 0]);

  const stages = {
    landing: useStageMotion(progress, VCAREER_STAGE_WINDOWS.landing),
    cvBuilder: useStageMotion(progress, VCAREER_STAGE_WINDOWS.cvBuilder),
    match: useStageMotion(progress, VCAREER_STAGE_WINDOWS.match),
    interviewDemo: useStageMotion(
      progress,
      VCAREER_STAGE_WINDOWS.interviewDemo,
    ),
    interviewReview: useStageMotion(
      progress,
      VCAREER_STAGE_WINDOWS.interviewReview,
    ),
    dashboard: useStageMotion(progress, VCAREER_STAGE_WINDOWS.dashboard),
  };

  return {
    mode,
    enabled: mode === "active",
    outcomesInteractive: mode === "static" || outcomesReached,
    progress,
    styles: {
      intro: { opacity: introOpacity, y: introY },
      introTitle: { clipPath: introTitleClip },
      scope: { opacity: scopeOpacity, y: scopeY },
      workflowHeader: {
        opacity: workflowHeaderOpacity,
        y: workflowHeaderY,
      },
      architecture: { opacity: architectureOpacity, y: architectureY },
      architectureTrace: { scaleX: architectureTraceScale },
      outcomes: { opacity: outcomesOpacity, y: outcomesY },
    },
    stages,
  };
}
