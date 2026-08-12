"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { stagger, useAnimate } from "motion/react";
import type { IntroPhase } from "@/components/v2/intro/intro-sequence";

type HeroMotionOptions = {
  phase: IntroPhase;
  introWillRun: boolean;
  reduceMotion: boolean;
};

const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const targets = {
  portrait: "[data-hero-portrait]",
  focus: "[data-hero-focus]",
  role: "[data-hero-role-line]",
  positioning: "[data-hero-positioning]",
  proof: "[data-hero-proof]",
} as const;

export function useHeroMotion({
  phase,
  introWillRun,
  reduceMotion,
}: HeroMotionOptions) {
  const [scope, animateScope] = useAnimate();
  const runToken = useRef(0);
  const observedIntro = useRef(false);
  const coreStarted = useRef(false);
  const detailsStarted = useRef(false);

  useBrowserLayoutEffect(() => {
    if (!scope.current) return;

    const token = ++runToken.current;
    const animations: Array<{ stop: () => void }> = [];
    const isCurrent = () => runToken.current === token;
    const play = (...args: Parameters<typeof animateScope>) => {
      const animation = animateScope(...args);
      animations.push(animation);
      return animation;
    };

    if (phase !== "complete") observedIntro.current = true;

    const stageCore = () => {
      if (reduceMotion) {
        play(targets.portrait, { opacity: 0.82, scale: 1 }, { duration: 0 });
        play(targets.focus, { opacity: 0, scaleX: 1 }, { duration: 0 });
        play(
          targets.role,
          {
            opacity: 0,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
          },
          { duration: 0 },
        );
        return;
      }

      play(
        targets.portrait,
        { opacity: 0.7, scale: 1 },
        { duration: 0 },
      );
      play(
        targets.focus,
        { opacity: 0, scaleX: 0 },
        { duration: 0 },
      );
      play(
        targets.role,
        {
          opacity: 0,
          y: "72%",
          clipPath: "inset(0% 0% 100% 0%)",
        },
        { duration: 0 },
      );
    };

    const stageDetails = () => {
      play(
        `${targets.positioning}, ${targets.proof}`,
        { opacity: 0, y: reduceMotion ? 0 : 18 },
        { duration: 0 },
      );
    };

    const stageWaitingScene = () => {
      stageCore();
      stageDetails();
    };

    const settleCore = () => {
      play(targets.portrait, { opacity: 1, scale: 1 }, { duration: 0 });
      play(targets.focus, { opacity: 0.72, scaleX: 1 }, { duration: 0 });
      play(
        targets.role,
        {
          opacity: 1,
          y: "0%",
          clipPath: "inset(0% 0% 0% 0%)",
        },
        { duration: 0 },
      );
    };

    const settleDetails = () => {
      play(
        `${targets.positioning}, ${targets.proof}`,
        { opacity: 1, y: 0 },
        { duration: 0 },
      );
    };

    const runCoreEntrance = async (direct: boolean) => {
      coreStarted.current = true;

      if (reduceMotion) {
        await Promise.all([
          play(
            targets.portrait,
            { opacity: [0.82, 1] },
            { duration: 0.18, ease: "linear" },
          ),
          play(
            targets.focus,
            { opacity: [0, 0.72] },
            { duration: 0.18, ease: "linear" },
          ),
          play(
            targets.role,
            { opacity: [0, 1] },
            { duration: 0.18, ease: "linear" },
          ),
        ]);
      } else {
        await Promise.all([
          play(
            targets.portrait,
            direct
              ? { opacity: [0.7, 1], scale: [1.025, 1] }
              : { opacity: [0.7, 1], scale: 1 },
            {
              duration: direct ? 0.58 : 0.88,
              ease: [0.16, 1, 0.3, 1],
            },
          ),
          play(
            targets.focus,
            { opacity: [0, 0.72], scaleX: [0, 1] },
            {
              duration: direct ? 0.42 : 0.7,
              delay: direct ? 0.02 : 0.08,
              ease: [0.16, 1, 0.3, 1],
            },
          ),
          play(
            targets.role,
            {
              opacity: [0, 1],
              y: [direct ? "48%" : "72%", "0%"],
              clipPath: [
                "inset(0% 0% 100% 0%)",
                "inset(0% 0% 0% 0%)",
              ],
            },
            {
              duration: direct ? 0.5 : 0.68,
              delay: stagger(direct ? 0.07 : 0.1, {
                startDelay: direct ? 0.07 : 0.16,
              }),
              ease: [0.16, 1, 0.3, 1],
            },
          ),
        ]);
      }

      if (isCurrent()) settleCore();
    };

    const runDetailsEntrance = async (direct: boolean) => {
      detailsStarted.current = true;

      if (reduceMotion) {
        await Promise.all([
          play(
            targets.positioning,
            { opacity: [0, 1] },
            { duration: 0.18, ease: "linear" },
          ),
          play(
            targets.proof,
            { opacity: [0, 1] },
            { duration: 0.18, delay: 0.08, ease: "linear" },
          ),
        ]);
      } else {
        await Promise.all([
          play(
            targets.positioning,
            { opacity: [0, 1], y: [18, 0] },
            {
              duration: direct ? 0.38 : 0.42,
              delay: direct ? 0.06 : 0.08,
              ease: [0.16, 1, 0.3, 1],
            },
          ),
          play(
            targets.proof,
            { opacity: [0, 1], y: [18, 0] },
            {
              duration: direct ? 0.4 : 0.44,
              delay: direct ? 0.2 : 0.24,
              ease: [0.16, 1, 0.3, 1],
            },
          ),
        ]);
      }

      if (isCurrent()) settleDetails();
    };

    const runDirectSequence = async () => {
      await runCoreEntrance(true);
      if (isCurrent()) await runDetailsEntrance(true);
    };

    if (
      phase === "boot" ||
      phase === "identify" ||
      phase === "prepare" ||
      phase === "ready"
    ) {
      coreStarted.current = false;
      detailsStarted.current = false;
      stageWaitingScene();
    } else if (phase === "exiting") {
      detailsStarted.current = false;
      stageWaitingScene();
      void runCoreEntrance(false);
    } else if (!introWillRun && !observedIntro.current) {
      // The bootstrap marker starts a CSS entrance before React hydrates. Do
      // not replay the same entrance imperatively after a visible delay.
      coreStarted.current = false;
      detailsStarted.current = false;
    } else if (introWillRun && !observedIntro.current) {
      // The server renders the final scene for no-JS. Once hydrated, stage it
      // behind the pending intro before the browser paints the first frame.
      stageWaitingScene();
    } else if (coreStarted.current) {
      settleCore();
      stageDetails();
      if (!detailsStarted.current) void runDetailsEntrance(false);
    } else {
      stageWaitingScene();
      void runDirectSequence();
    }

    return () => {
      if (runToken.current === token) runToken.current += 1;
      animations.forEach((animation) => animation.stop());
    };
  }, [animateScope, introWillRun, phase, reduceMotion, scope]);

  return scope;
}
