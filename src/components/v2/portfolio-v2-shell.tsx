"use client";

import { useCallback, useState } from "react";
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
import {
  CareerRecognition,
  type CareerRecognitionCopy,
} from "@/components/v2/career/career-recognition";
import {
  CapabilityLedger,
  type CapabilityLedgerCopy,
} from "@/components/v2/capabilities/capability-ledger";
import { useCapabilityRoutingMotion } from "@/components/v2/capabilities/capability-routing-motion";
import {
  ContactConversion,
  type ContactConversionCopy,
} from "@/components/v2/contact/contact-conversion";
import { useContactConversionMotion } from "@/components/v2/contact/contact-conversion-motion";
import { useCareerTraceMotion } from "@/components/v2/career/career-trace-motion";
import { useRecognitionStageMotion } from "@/components/v2/career/recognition-stage-motion";
import { useSupportingWorkHandoff } from "@/components/v2/work/supporting-work-handoff";
import { useSupportingWorkStory } from "@/components/v2/work/supporting-work-story";
import { useFinancialArchiveMotion } from "@/components/v2/work/financial-archive-motion";
import { useAboutStory } from "@/components/v2/about/about-story";
import { useChapterTone } from "@/components/v2/chapter-tone";
import { useChapterAnchorAlignment } from "@/components/v2/chapter-anchor-alignment";
import { useVCareerChapterHandoff } from "@/components/v2/vcareer/vcareer-chapter-handoff";
import { useVCareerEvidenceRelay } from "@/components/v2/vcareer/vcareer-evidence-relay";
import {
  SiteHeaderV2,
  type SiteHeaderV2Copy,
} from "@/components/v2/site-header-v2";
import { WordmarkHandoff } from "@/components/v2/wordmark-handoff";
import type { RecognitionDocumentaryKey } from "@/lib/v2/career-recognition";
import { usePrefersReducedMotion } from "@/lib/v2/use-prefers-reduced-motion";
import styles from "./portfolio-v2-shell.module.css";

type PortfolioV2ShellProps = {
  locale: "vi" | "en";
  skipIntro: boolean;
  initialRecognitionDocumentary: RecognitionDocumentaryKey | null;
  introCopy: IntroCopy;
  headerCopy: SiteHeaderV2Copy;
  heroCopy: HeroV2Copy;
  aboutCopy: AboutV2Copy;
  vcareerCopy: VCareerShowcaseCopy;
  workCopy: SupportingWorkCopy;
  careerCopy: CareerRecognitionCopy;
  capabilitiesCopy: CapabilityLedgerCopy;
  contactCopy: ContactConversionCopy;
};

export function PortfolioV2Shell({
  locale,
  skipIntro,
  initialRecognitionDocumentary,
  introCopy,
  headerCopy,
  heroCopy,
  aboutCopy,
  vcareerCopy,
  workCopy,
  careerCopy,
  capabilitiesCopy,
  contactCopy,
}: PortfolioV2ShellProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const reduceMotion = Boolean(prefersReducedMotion);
  const aboutStory = useAboutStory({ reduceMotion });
  const vcareerHandoff = useVCareerChapterHandoff({ reduceMotion });
  const vcareerRelay = useVCareerEvidenceRelay({
    sectionRef: vcareerHandoff.sectionRef,
    reduceMotion,
  });
  const supportingWorkHandoff = useSupportingWorkHandoff({ reduceMotion });
  const supportingWorkStory = useSupportingWorkStory({ reduceMotion });
  const financialArchive = useFinancialArchiveMotion({ reduceMotion });
  const careerTrace = useCareerTraceMotion({ reduceMotion });
  const recognitionStage = useRecognitionStageMotion({ reduceMotion });
  const capabilityRouting = useCapabilityRoutingMotion({ reduceMotion });
  const contactMotion = useContactConversionMotion({ reduceMotion });
  const chapterTone = useChapterTone({
    aboutSectionRef: aboutStory.sectionRef,
    vcareerSectionRef: vcareerHandoff.sectionRef,
    workSectionRef: supportingWorkHandoff.surfaceRef,
    careerSectionRef: careerTrace.sectionRef,
    recognitionSectionRef: recognitionStage.stageRef,
    skillsSectionRef: capabilityRouting.sectionRef,
    contactSectionRef: contactMotion.sectionRef,
    reduceMotion,
  });
  const [phase, setPhase] = useState<IntroPhase>("complete");
  const [portraitOutcome, setPortraitOutcome] =
    useState<PortraitOutcome>("pending");
  const [wordmarkTransitionActive, setWordmarkTransitionActive] =
    useState(false);
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [activeRecognitionDocumentary, setActiveRecognitionDocumentary] =
    useState<RecognitionDocumentaryKey | null>(
      initialRecognitionDocumentary,
    );

  const handlePortraitLoad = useCallback(() => {
    setPortraitOutcome("ready");
  }, []);

  const handlePortraitError = useCallback(() => {
    setPortraitOutcome("error");
  }, []);

  const sceneIsActive = phase === "complete";
  const headerWordmarkHidden = phase === "exiting" || wordmarkTransitionActive;
  useChapterAnchorAlignment(sceneIsActive);

  return (
    <div
      className={styles.root}
      data-intro-phase={phase}
      data-portrait={portraitOutcome}
    >
      <div
        className={styles.scene}
        aria-hidden={!sceneIsActive}
        inert={!sceneIsActive}
      >
        <SiteHeaderV2
          copy={headerCopy}
          locale={locale}
          skipIntro={skipIntro}
          recognitionDocumentary={activeRecognitionDocumentary}
          reduceMotion={reduceMotion}
          wordmarkHidden={headerWordmarkHidden}
          chapterTone={chapterTone}
          onMenuOpenChange={setMobileNavigationOpen}
        />
        <HeroV2
          copy={heroCopy}
          portraitOutcome={portraitOutcome}
          introPhase={phase}
          introWillRun={!skipIntro}
          reduceMotion={reduceMotion}
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
          navigationOpen={mobileNavigationOpen}
          relay={vcareerRelay}
        />
        <SupportingWork
          archive={financialArchive}
          copy={workCopy}
          handoff={supportingWorkHandoff}
          navigationOpen={mobileNavigationOpen}
          story={supportingWorkStory}
        />
        <CareerRecognition
          copy={careerCopy}
          initialDocumentary={activeRecognitionDocumentary}
          navigationOpen={mobileNavigationOpen}
          onDocumentaryChange={setActiveRecognitionDocumentary}
          recognitionStage={recognitionStage}
          trace={careerTrace}
        />
        <CapabilityLedger
          copy={capabilitiesCopy}
          navigationOpen={mobileNavigationOpen}
          routing={capabilityRouting}
        />
        <ContactConversion
          copy={contactCopy}
          navigationOpen={mobileNavigationOpen}
          reduceMotion={reduceMotion}
          motionController={contactMotion}
        />
      </div>

      <IntroSequence
        copy={introCopy}
        locale={locale}
        portraitOutcome={portraitOutcome}
        portraitSrc="/avatar-graduation.jpg"
        reduceMotion={reduceMotion}
        skipIntro={skipIntro}
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
