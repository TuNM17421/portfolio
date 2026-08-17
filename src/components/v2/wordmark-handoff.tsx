"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";
import type { IntroPhase } from "@/components/v2/intro/intro-sequence";
import styles from "./wordmark-handoff.module.css";

type WordmarkHandoffProps = {
  phase: IntroPhase;
  reduceMotion: boolean;
  onActiveChange: (active: boolean) => void;
};

type WordMetric = {
  word: string;
  from: {
    x: number;
    y: number;
    fontSize: number;
    fontVariationSettings: string;
    fontWeight: number;
    letterSpacing: string;
    lineHeight: string;
  };
  to: {
    x: number;
    y: number;
    fontSize: number;
    fontVariationSettings: string;
    fontWeight: number;
    letterSpacing: string;
    lineHeight: string;
  };
};

const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function captureWord(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);

  return {
    x: rect.left,
    y: rect.top,
    fontSize: Number.parseFloat(style.fontSize),
    fontVariationSettings: style.fontVariationSettings,
    fontWeight: Number.parseFloat(style.fontWeight),
    letterSpacing: style.letterSpacing,
    lineHeight: style.lineHeight,
  };
}

export function WordmarkHandoff({
  phase,
  reduceMotion,
  onActiveChange,
}: WordmarkHandoffProps) {
  const [metrics, setMetrics] = useState<WordMetric[] | null>(null);
  const [animationDone, setAnimationDone] = useState(false);
  const started = useRef(false);

  const finish = useCallback(() => {
    setMetrics(null);
    setAnimationDone(false);
    onActiveChange(false);
  }, [onActiveChange]);

  useBrowserLayoutEffect(() => {
    if (reduceMotion) {
      started.current = false;
      setMetrics(null);
      setAnimationDone(false);
      onActiveChange(false);
      return;
    }

    if (phase === "exiting") {
      if (!started.current) {
        const sourceWords = Array.from(
          document.querySelectorAll<HTMLElement>("[data-wordmark-source-word]"),
        );
        const targetWords = Array.from(
          document.querySelectorAll<HTMLElement>("[data-wordmark-target-word]"),
        );

        if (
          sourceWords.length > 0 &&
          sourceWords.length === targetWords.length
        ) {
          started.current = true;
          setAnimationDone(false);
          setMetrics(
            sourceWords.map((source, index) => ({
              word: source.textContent ?? "",
              from: captureWord(source),
              to: captureWord(targetWords[index]),
            })),
          );
          onActiveChange(true);
        }
      }
      return;
    }

    if (phase === "complete") {
      if (animationDone && metrics) finish();
      return;
    }

    if (started.current || metrics) {
      started.current = false;
      setMetrics(null);
      setAnimationDone(false);
      onActiveChange(false);
    }
  }, [animationDone, finish, metrics, onActiveChange, phase, reduceMotion]);

  if (!metrics) return null;

  return (
    <div className={styles.layer} data-wordmark-handoff aria-hidden>
      {metrics.map(({ word, from, to }, index) => (
        <motion.span
          key={`${word}-${index}`}
          className={styles.word}
          data-wordmark-handoff-word={index}
          initial={from}
          animate={to}
          transition={{
            duration: 0.9,
            ease: [0.65, 0, 0.35, 1],
          }}
          onAnimationComplete={
            index === metrics.length - 1
              ? () => setAnimationDone(true)
              : undefined
          }
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
