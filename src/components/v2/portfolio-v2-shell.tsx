"use client";

import { useCallback, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  IntroSequence,
  type IntroCopy,
  type IntroPhase,
  type PortraitOutcome,
} from "@/components/v2/intro/intro-sequence";
import {
  HeroV2,
  type HeroV2Copy,
} from "@/components/v2/hero/hero-v2";
import {
  SiteHeaderV2,
  type SiteHeaderV2Copy,
} from "@/components/v2/site-header-v2";
import { WordmarkHandoff } from "@/components/v2/wordmark-handoff";
import { parseIntroControls } from "@/lib/v2/intro-readiness";
import { parseHeroDepthControls } from "@/lib/v2/hero-depth";
import styles from "./portfolio-v2-shell.module.css";

type PortfolioV2ShellProps = {
  locale: "vi" | "en";
  introQuery: string;
  holdQuery: string;
  introCopy: IntroCopy;
  headerCopy: SiteHeaderV2Copy;
  heroCopy: HeroV2Copy;
};

export function PortfolioV2Shell({
  locale,
  introQuery,
  holdQuery,
  introCopy,
  headerCopy,
  heroCopy,
}: PortfolioV2ShellProps) {
  const controls = useMemo(
    () => parseIntroControls(`intro=${encodeURIComponent(introQuery)}`),
    [introQuery],
  );
  const depthControls = useMemo(
    () => parseHeroDepthControls(holdQuery),
    [holdQuery],
  );
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion =
    controls.debugState === "reduced" || Boolean(prefersReducedMotion);
  const [phase, setPhase] = useState<IntroPhase>("complete");
  const [portraitOutcome, setPortraitOutcome] =
    useState<PortraitOutcome>("pending");
  const [wordmarkTransitionActive, setWordmarkTransitionActive] =
    useState(false);
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);

  const effectivePortraitOutcome =
    controls.debugState === "image-error" ? "error" : portraitOutcome;

  const handlePortraitLoad = useCallback(() => {
    setPortraitOutcome("ready");
  }, []);

  const handlePortraitError = useCallback(() => {
    setPortraitOutcome("error");
  }, []);

  const sceneIsActive = phase === "complete";
  const headerWordmarkHidden =
    phase === "exiting" || wordmarkTransitionActive;

  return (
    <div
      className={styles.root}
      data-intro-phase={phase}
      data-portrait={effectivePortraitOutcome}
    >
      <div
        className={styles.scene}
        aria-hidden={!sceneIsActive}
        inert={!sceneIsActive}
      >
        <SiteHeaderV2
          copy={headerCopy}
          locale={locale}
          introQuery={introQuery}
          holdQuery={holdQuery}
          reduceMotion={reduceMotion}
          wordmarkHidden={headerWordmarkHidden}
          onMenuOpenChange={setMobileNavigationOpen}
        />
        <HeroV2
          copy={heroCopy}
          portraitOutcome={effectivePortraitOutcome}
          introPhase={phase}
          introWillRun={controls.forcedMode !== "skip"}
          reduceMotion={reduceMotion}
          holdEnabled={depthControls.holdEnabled}
          navigationOpen={mobileNavigationOpen}
          onPortraitLoad={handlePortraitLoad}
          onPortraitError={handlePortraitError}
        />
      </div>

      <IntroSequence
        controls={controls}
        copy={introCopy}
        locale={locale}
        portraitOutcome={effectivePortraitOutcome}
        portraitSrc="/avatar-graduation.jpg"
        reduceMotion={reduceMotion}
        wordmarkHidden={wordmarkTransitionActive}
        onPhaseChange={setPhase}
      />

      <WordmarkHandoff
        phase={phase}
        reduceMotion={reduceMotion}
        onActiveChange={setWordmarkTransitionActive}
      />
    </div>
  );
}
