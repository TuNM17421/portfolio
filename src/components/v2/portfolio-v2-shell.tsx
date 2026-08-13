"use client";

import { useCallback, useMemo, useState } from "react";
import {
  IntroSequence,
  type IntroCopy,
  type IntroPhase,
  type PortraitOutcome,
} from "@/components/v2/intro/intro-sequence";
import { HeroV2, type HeroV2Copy } from "@/components/v2/hero/hero-v2";
import { AboutV2, type AboutV2Copy } from "@/components/v2/about/about-v2";
import {
  VCareerShowcase,
  type VCareerShowcaseCopy,
} from "@/components/v2/vcareer/vcareer-showcase";
import {
  SupportingWork,
  type SupportingWorkCopy,
} from "@/components/v2/work/supporting-work";
import { useSupportingWorkHandoff } from "@/components/v2/work/supporting-work-handoff";
import { useAboutStory } from "@/components/v2/about/about-story";
import { useChapterTone } from "@/components/v2/chapter-tone";
import { useVCareerChapterHandoff } from "@/components/v2/vcareer/vcareer-chapter-handoff";
import { useVCareerEvidenceRelay } from "@/components/v2/vcareer/vcareer-evidence-relay";
import {
  SiteHeaderV2,
  type SiteHeaderV2Copy,
} from "@/components/v2/site-header-v2";
import { WordmarkHandoff } from "@/components/v2/wordmark-handoff";
import { parseIntroControls } from "@/lib/v2/intro-readiness";
import { parseHeroDepthControls } from "@/lib/v2/hero-depth";
import { parseHeroPortraitVariant } from "@/lib/v2/hero-portrait";
import { parseAboutStoryControls } from "@/lib/v2/about-story";
import { parseVCareerShowcaseControls } from "@/lib/v2/vcareer-showcase";
import { parseSupportingWorkControls } from "@/lib/v2/supporting-work";
import { usePrefersReducedMotion } from "@/lib/v2/use-prefers-reduced-motion";
import styles from "./portfolio-v2-shell.module.css";

type PortfolioV2ShellProps = {
  locale: "vi" | "en";
  introQuery: string;
  holdQuery: string;
  portraitQuery: string;
  showcaseQuery: string;
  storyQuery: string;
  workQuery: string;
  introCopy: IntroCopy;
  headerCopy: SiteHeaderV2Copy;
  heroCopy: HeroV2Copy;
  aboutCopy: AboutV2Copy;
  vcareerCopy: VCareerShowcaseCopy;
  workCopy: SupportingWorkCopy;
};

export function PortfolioV2Shell({
  locale,
  introQuery,
  holdQuery,
  portraitQuery,
  showcaseQuery,
  storyQuery,
  workQuery,
  introCopy,
  headerCopy,
  heroCopy,
  aboutCopy,
  vcareerCopy,
  workCopy,
}: PortfolioV2ShellProps) {
  const controls = useMemo(
    () => parseIntroControls(`intro=${encodeURIComponent(introQuery)}`),
    [introQuery],
  );
  const depthControls = useMemo(
    () => parseHeroDepthControls(holdQuery),
    [holdQuery],
  );
  const portraitVariant = useMemo(
    () => parseHeroPortraitVariant(portraitQuery),
    [portraitQuery],
  );
  const storyControls = useMemo(
    () => parseAboutStoryControls(storyQuery),
    [storyQuery],
  );
  const showcaseControls = useMemo(
    () => parseVCareerShowcaseControls(showcaseQuery),
    [showcaseQuery],
  );
  const workControls = useMemo(
    () => parseSupportingWorkControls(workQuery),
    [workQuery],
  );
  const prefersReducedMotion = usePrefersReducedMotion();
  const reduceMotion =
    controls.debugState === "reduced" || Boolean(prefersReducedMotion);
  const aboutStory = useAboutStory({
    reduceMotion,
    forceStatic: storyControls.forceStatic,
  });
  const vcareerHandoff = useVCareerChapterHandoff({ reduceMotion });
  const vcareerRelay = useVCareerEvidenceRelay({
    sectionRef: vcareerHandoff.sectionRef,
    reduceMotion,
    forceStatic: showcaseControls.forceStatic,
  });
  const supportingWorkHandoff = useSupportingWorkHandoff({ reduceMotion });
  const chapterTone = useChapterTone({
    aboutSectionRef: aboutStory.sectionRef,
    vcareerSectionRef: vcareerHandoff.sectionRef,
    workSectionRef: supportingWorkHandoff.surfaceRef,
    reduceMotion,
  });
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
  const headerWordmarkHidden = phase === "exiting" || wordmarkTransitionActive;

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
          portraitQuery={portraitQuery}
          showcaseQuery={showcaseQuery}
          storyQuery={storyQuery}
          workQuery={workQuery}
          reduceMotion={reduceMotion}
          wordmarkHidden={headerWordmarkHidden}
          chapterTone={chapterTone}
          onMenuOpenChange={setMobileNavigationOpen}
        />
        <HeroV2
          copy={heroCopy}
          portraitOutcome={effectivePortraitOutcome}
          introPhase={phase}
          introWillRun={controls.forcedMode !== "skip"}
          reduceMotion={reduceMotion}
          holdEnabled={depthControls.holdEnabled}
          portraitVariant={portraitVariant}
          navigationOpen={mobileNavigationOpen}
          nextChapterTone={reduceMotion ? "dark" : "light"}
          onPortraitLoad={handlePortraitLoad}
          onPortraitError={handlePortraitError}
        />
        <AboutV2
          copy={aboutCopy}
          navigationOpen={mobileNavigationOpen}
          story={aboutStory}
        />
        <VCareerShowcase
          copy={vcareerCopy}
          handoff={vcareerHandoff}
          imageReviewState={showcaseControls.imageState}
          navigationOpen={mobileNavigationOpen}
          relay={vcareerRelay}
        />
        <SupportingWork
          copy={workCopy}
          handoff={supportingWorkHandoff}
          imageReviewState={workControls.imageState}
          navigationOpen={mobileNavigationOpen}
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
