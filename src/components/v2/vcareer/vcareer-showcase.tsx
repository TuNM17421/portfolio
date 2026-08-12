"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { VCAREER_PROJECT } from "@/data/projects";
import {
  VCAREER_SHOWCASE_STAGES,
  type VCareerEvidenceKind,
  type VCareerEvidenceQualifier,
  type VCareerStageKey,
} from "@/lib/v2/vcareer-showcase";
import type { VCareerChapterHandoffController } from "./vcareer-chapter-handoff";
import styles from "./vcareer-showcase.module.css";

type VCareerStageCopy = {
  name: string;
  caption: string;
  alt: string;
};

export type VCareerShowcaseCopy = {
  eyebrow: string;
  status: string;
  title: string;
  subtitle: string;
  proposition: string;
  pilotValue: string;
  pilotLabel: string;
  scopeLabel: string;
  scope: [string, string, string];
  workflowLabel: string;
  workflowTitle: string;
  screenshotDisclaimer: string;
  screenLabel: string;
  labels: {
    direct: string;
    context: string;
    analysis: string;
    baseline: string;
  };
  stages: Record<VCareerStageKey, VCareerStageCopy>;
  outcomesCode: string;
  outcomesLabel: string;
  outcomes: [string, string, string];
  repositoryState: string;
  primaryAction: string;
  liveAction: string;
  architectureAction: string;
  opensNewWindow: string;
  imageUnavailable: string;
};

type VCareerShowcaseProps = {
  copy: VCareerShowcaseCopy;
  handoff: VCareerChapterHandoffController;
  navigationOpen: boolean;
};

type EvidenceImageProps = {
  alt: string;
  fallbackLabel: string;
  height: number;
  name: string;
  sizes: string;
  src: string;
  stageNumber: string;
  width: number;
};

function EvidenceImage({
  alt,
  fallbackLabel,
  height,
  name,
  sizes,
  src,
  stageNumber,
  width,
}: EvidenceImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={styles.imageFrame}
      data-image-error={failed ? "true" : undefined}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className={styles.imageFallback}
        role={failed ? "img" : undefined}
        aria-label={failed ? `${fallbackLabel}: ${name}` : undefined}
        aria-hidden={failed ? undefined : true}
      >
        <span className={styles.fallbackIndex}>{stageNumber}</span>
        <strong>{name}</strong>
        <span>{fallbackLabel}</span>
      </div>

      {!failed ? (
        <Image
          className={styles.productImage}
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          onError={() => setFailed(true)}
        />
      ) : null}
    </div>
  );
}

function evidenceLabel(
  kind: VCareerEvidenceKind,
  qualifier: VCareerEvidenceQualifier | undefined,
  labels: VCareerShowcaseCopy["labels"],
) {
  const parts = [kind === "direct" ? labels.direct : labels.context];

  if (qualifier) parts.push(labels[qualifier]);

  return parts.join(" · ");
}

export function VCareerShowcase({
  copy,
  handoff,
  navigationOpen,
}: VCareerShowcaseProps) {
  const handoffStyle = <
    T extends keyof VCareerChapterHandoffController["styles"],
  >(
    key: T,
  ) => (handoff.enabled ? handoff.styles[key] : undefined);

  return (
    <section
      ref={handoff.sectionRef}
      id="vcareer"
      className={styles.showcase}
      aria-labelledby="v2-vcareer-title"
      aria-hidden={navigationOpen || undefined}
      inert={navigationOpen}
      data-vcareer-static
      data-vcareer-handoff={handoff.mode}
    >
      <motion.div
        className={styles.chapterVeil}
        style={handoffStyle("veil")}
        aria-hidden
      />
      <div className={styles.field} aria-hidden />
      <motion.div
        className={styles.evidenceRelay}
        style={handoffStyle("relay")}
        data-vcareer-evidence-relay
        aria-hidden
      >
        <motion.span
          className={styles.relayStem}
          style={handoffStyle("relayStem")}
        />
        <motion.span
          className={styles.relayTerminal}
          style={handoffStyle("relayTerminal")}
        />
        <motion.span
          className={styles.relayTrack}
          style={handoffStyle("relayTrack")}
        />
      </motion.div>

      <div className={styles.inner}>
        <div className={styles.sectionRail}>
          <p>{copy.eyebrow}</p>
          <p className={styles.status}>
            <span aria-hidden />
            {copy.status}
          </p>
        </div>

        <header className={styles.intro}>
          <div className={styles.titleBlock}>
            <p className={styles.subtitle}>{copy.subtitle}</p>
            <h2 id="v2-vcareer-title" className={styles.title}>
              {copy.title}
            </h2>
          </div>

          <div className={styles.introCopy}>
            <p className={styles.proposition}>{copy.proposition}</p>
            <p className={styles.pilotProof}>
              <strong>{copy.pilotValue}</strong>
              <span>{copy.pilotLabel}</span>
            </p>
          </div>
        </header>

        <section
          className={styles.scopeLedger}
          aria-labelledby="v2-vcareer-scope-title"
        >
          <div className={styles.scopeHeading}>
            <p className={styles.ledgerCode} aria-hidden>
              TU / 03
            </p>
            <h3 id="v2-vcareer-scope-title">{copy.scopeLabel}</h3>
          </div>
          <ol className={styles.scopeList}>
            {copy.scope.map((item, index) => (
              <li key={item}>
                <span aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section
          className={styles.workflow}
          aria-labelledby="v2-vcareer-workflow-title"
        >
          <header className={styles.workflowHeader}>
            <div>
              <p className={styles.workflowLabel}>{copy.workflowLabel}</p>
              <h3 id="v2-vcareer-workflow-title">{copy.workflowTitle}</h3>
            </div>
            <p className={styles.disclaimer}>{copy.screenshotDisclaimer}</p>
          </header>

          <ol className={styles.sequence}>
            {VCAREER_SHOWCASE_STAGES.map((stage, index) => {
              const stageCopy = copy.stages[stage.key];
              const stageNumber = String(index + 1).padStart(2, "0");
              const isBookend = stage.layout === "bookend";

              return (
                <li
                  key={stage.key}
                  className={styles.stage}
                  data-evidence={stage.evidence}
                  data-layout={stage.layout}
                  data-vcareer-stage={stage.key}
                >
                  <figure>
                    <figcaption className={styles.stageMeta}>
                      <p className={styles.stageIndex}>
                        {copy.screenLabel} {stageNumber} / 06
                      </p>
                      <p className={styles.evidenceKind}>
                        {evidenceLabel(
                          stage.evidence,
                          stage.qualifier,
                          copy.labels,
                        )}
                      </p>
                      <h4>{stageCopy.name}</h4>
                      <p className={styles.stageCaption}>{stageCopy.caption}</p>
                    </figcaption>

                    <div className={styles.stageMedia}>
                      <EvidenceImage
                        alt={stageCopy.alt}
                        fallbackLabel={copy.imageUnavailable}
                        height={stage.height}
                        name={stageCopy.name}
                        sizes={
                          isBookend
                            ? "(max-width: 767px) 78vw, (max-width: 1023px) 45vw, 58vw"
                            : "(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 45vw, 69vw"
                        }
                        src={stage.src}
                        stageNumber={stageNumber}
                        width={stage.width}
                      />
                    </div>
                  </figure>
                </li>
              );
            })}
          </ol>
        </section>

        <footer className={styles.outcomes}>
          <div className={styles.outcomeHeading}>
            <p className={styles.ledgerCode} aria-hidden>
              {copy.outcomesCode}
            </p>
            <h3>{copy.outcomesLabel}</h3>
          </div>

          <ol className={styles.outcomeList}>
            {copy.outcomes.map((outcome, index) => (
              <li key={outcome}>
                <span aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                <strong>{outcome}</strong>
              </li>
            ))}
          </ol>

          <p className={styles.repositoryState}>{copy.repositoryState}</p>

          <div className={styles.actions}>
            <Link
              href={VCAREER_PROJECT.caseStudyPath}
              className={styles.primaryAction}
            >
              <span>{copy.primaryAction}</span>
              <span aria-hidden>↗</span>
            </Link>

            <div className={styles.utilityActions}>
              <a
                href={VCAREER_PROJECT.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.liveAction}
                <span aria-hidden>↗</span>
                <span className={styles.visuallyHidden}>
                  {copy.opensNewWindow}
                </span>
              </a>
              <a
                href={VCAREER_PROJECT.architectureUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.architectureAction}
                <span aria-hidden>↗</span>
                <span className={styles.visuallyHidden}>
                  {copy.opensNewWindow}
                </span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
