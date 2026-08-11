"use client";

import { useCallback, useMemo, useState } from "react";
import { LayoutGroup, useReducedMotion } from "motion/react";
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
import { parseIntroControls } from "@/lib/v2/intro-readiness";
import styles from "./portfolio-v2-shell.module.css";

type PortfolioV2ShellProps = {
  locale: "vi" | "en";
  introQuery: string;
  introCopy: IntroCopy;
  headerCopy: SiteHeaderV2Copy;
  heroCopy: HeroV2Copy;
};

export function PortfolioV2Shell({
  locale,
  introQuery,
  introCopy,
  headerCopy,
  heroCopy,
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

  const sceneIsActive = phase === "complete";
  const sharedWordmarkIsActive = phase === "exiting" || phase === "complete";

  return (
    <LayoutGroup id="portfolio-v2-opening">
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
            reduceMotion={reduceMotion}
            sharedWordmarkIsActive={sharedWordmarkIsActive}
          />
          <HeroV2
            copy={heroCopy}
            portraitOutcome={effectivePortraitOutcome}
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
          onPhaseChange={setPhase}
        />
      </div>
    </LayoutGroup>
  );
}
