"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import {
  IntroSequence,
  type IntroCopy,
  type IntroPhase,
  type PortraitOutcome,
} from "@/components/v2/intro/intro-sequence";
import { parseIntroControls } from "@/lib/v2/intro-readiness";
import styles from "./portfolio-v2-shell.module.css";

type PortfolioV2ShellProps = {
  locale: "vi" | "en";
  introQuery: string;
  copy: IntroCopy;
};

export function PortfolioV2Shell({
  locale,
  introQuery,
  copy,
}: PortfolioV2ShellProps) {
  const controls = useMemo(
    () => parseIntroControls(`intro=${encodeURIComponent(introQuery)}`),
    [introQuery],
  );
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion =
    controls.debugState === "reduced" || Boolean(prefersReducedMotion);
  const [phase, setPhase] = useState<IntroPhase>("complete");
  const [portraitOutcome, setPortraitOutcome] =
    useState<PortraitOutcome>("pending");

  const effectivePortraitOutcome =
    controls.debugState === "image-error" ? "error" : portraitOutcome;

  const handlePortraitLoad = useCallback(() => {
    setPortraitOutcome("ready");
  }, []);

  const handlePortraitError = useCallback(() => {
    setPortraitOutcome("error");
  }, []);

  const handoffIsActive = phase === "complete";
  const sharedWordmarkIsActive = phase === "exiting" || phase === "complete";

  return (
    <LayoutGroup id="portfolio-v2-opening">
      <div
        className={styles.root}
        data-intro-phase={phase}
        data-portrait={effectivePortraitOutcome}
      >
        <section
          className={styles.handoff}
          aria-label={copy.handoffEyebrow}
          aria-hidden={!handoffIsActive}
        >
          <div className={styles.atmosphere} aria-hidden />
          <div className={styles.depthPlaneOne} aria-hidden />
          <div className={styles.depthPlaneTwo} aria-hidden />

          <header className={styles.handoffHeader}>
            {sharedWordmarkIsActive && !reduceMotion ? (
              <motion.span
                layoutId="v2-wordmark"
                className={styles.handoffWordmark}
                transition={{
                  layout: {
                    duration: 0.86,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
              >
                {copy.wordmark}
              </motion.span>
            ) : (
              <span className={styles.handoffWordmark}>{copy.wordmark}</span>
            )}

            <div className={styles.handoffMeta}>
              <span>{copy.partLabel}</span>
              <span className={styles.metaDivider} aria-hidden />
              <span>{locale.toUpperCase()}</span>
            </div>
          </header>

          <div className={styles.portraitStage} aria-hidden>
            <div className={styles.portraitHalo} />
            <div className={styles.portraitFrame}>
              <Image
                src="/avatar-graduation.jpg"
                alt=""
                fill
                priority
                sizes="(max-width: 767px) 84vw, 44vw"
                className={styles.portraitImage}
                onLoad={handlePortraitLoad}
                onError={handlePortraitError}
              />
              <div className={styles.portraitGrade} />
            </div>
            <div className={styles.fallbackPortrait} aria-hidden>
              <span>{copy.portraitFallback}</span>
            </div>
          </div>

          <div className={styles.horizon} aria-hidden />

          <div className={styles.handoffCopy}>
            <p className={styles.handoffEyebrow}>{copy.handoffEyebrow}</p>
            <p className={styles.handoffRole}>{copy.handoffRole}</p>
          </div>

          <aside className={styles.reviewCard}>
            <span className={styles.reviewSignal} aria-hidden />
            <div>
              <p>{copy.reviewLabel}</p>
              <span>{copy.handoffNote}</span>
            </div>
          </aside>

          <p className={styles.edgeIndex} aria-hidden>
            SYSTEMS
            <br />
            IN FOCUS
          </p>
        </section>

        <IntroSequence
          controls={controls}
          copy={copy}
          locale={locale}
          portraitOutcome={effectivePortraitOutcome}
          portraitSrc="/avatar-graduation.jpg"
          reduceMotion={reduceMotion}
          onPhaseChange={setPhase}
        />
      </div>
    </LayoutGroup>
  );
}
