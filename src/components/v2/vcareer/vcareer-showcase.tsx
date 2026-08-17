"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { VCareerRouteHandoffLink } from "@/components/v2/vcareer-route-handoff";
import { VCAREER_PROJECT } from "@/data/projects";
import {
  VCAREER_SHOWCASE_STAGES,
  type VCareerEvidenceKind,
  type VCareerEvidenceQualifier,
  type VCareerStageKey,
} from "@/lib/v2/vcareer-showcase";
import type { VCareerChapterHandoffController } from "./vcareer-chapter-handoff";
import type { VCareerEvidenceRelayController } from "./vcareer-evidence-relay";
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
  architectureLabel: string;
  architectureSource: string;
  architectureTarget: string;
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
  imageLoading: string;
  imageUnavailable: string;
};

type VCareerShowcaseProps = {
  copy: VCareerShowcaseCopy;
  handoff: VCareerChapterHandoffController;
  navigationOpen: boolean;
  relay: VCareerEvidenceRelayController;
};

type EvidenceImageProps = {
  alt: string;
  fallbackLabel: string;
  height: number;
  loadingLabel: string;
  name: string;
  sizes: string;
  src: string;
  stageNumber: string;
  width: number;
};

type EvidenceRuntimeState = "loading" | "ready" | "error";

function EvidenceImage({
  alt,
  fallbackLabel,
  height,
  loadingLabel,
  name,
  sizes,
  src,
  stageNumber,
  width,
}: EvidenceImageProps) {
  const [runtimeState, setRuntimeState] =
    useState<EvidenceRuntimeState>("loading");
  const imageState = runtimeState;
  const imageFailed = imageState === "error";
  const renderImage = runtimeState !== "error";

  return (
    <div
      className={styles.imageFrame}
      data-image-state={imageState}
      aria-busy={imageState === "loading" || undefined}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className={styles.imageFallback}
        role={imageFailed ? "img" : undefined}
        aria-label={imageFailed ? `${fallbackLabel}: ${name}` : undefined}
        aria-hidden={imageFailed ? undefined : true}
      >
        <span className={styles.fallbackIndex}>{stageNumber}</span>
        <strong>{name}</strong>
        <span>{imageFailed ? fallbackLabel : loadingLabel}</span>
      </div>

      {renderImage ? (
        <Image
          className={styles.productImage}
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading="lazy"
          onLoad={() => setRuntimeState("ready")}
          onError={() => setRuntimeState("error")}
        />
      ) : null}
    </div>
  );
}

const STATIC_HANDOFF_STYLES: VCareerChapterHandoffController["styles"] = {
  veil: { y: 0 },
  relay: { opacity: 1 },
  relayStem: { scaleY: 1 },
  relayTerminal: { scale: 1 },
  relayTrack: { scaleX: 1 },
};

const STATIC_RELAY_STYLES: VCareerEvidenceRelayController["styles"] = {
  intro: { opacity: 1, y: 0 },
  introTitle: { clipPath: "none" },
  scope: { opacity: 1, y: 0 },
  workflowHeader: { opacity: 1, y: 0 },
  architecture: { opacity: 1, y: 0 },
  architectureTrace: { scaleX: 1 },
  outcomes: { opacity: 1, y: 0 },
};

const STATIC_STAGE_STYLES: VCareerEvidenceRelayController["stages"][VCareerStageKey] =
  {
    stage: {
      opacity: 1,
      x: 0,
      y: 0,
      z: 0,
      scale: 1,
      clipPath: "none",
    },
    meta: { opacity: 1, y: 0 },
    rail: { opacity: 1, scale: 1, color: "var(--vcareer-sky)" },
  };

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
  relay,
}: VCareerShowcaseProps) {
  const handoffStyle = <
    T extends keyof VCareerChapterHandoffController["styles"],
  >(
    key: T,
  ) => (handoff.enabled ? handoff.styles[key] : STATIC_HANDOFF_STYLES[key]);
  const relayStyle = <T extends keyof VCareerEvidenceRelayController["styles"]>(
    key: T,
  ) => (relay.enabled ? relay.styles[key] : STATIC_RELAY_STYLES[key]);
  const outcomesInteractive = !relay.enabled || relay.outcomesInteractive;

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
      data-vcareer-story={relay.mode}
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

        <motion.header className={styles.intro} style={relayStyle("intro")}>
          <div className={styles.titleBlock}>
            <p className={styles.subtitle}>{copy.subtitle}</p>
            <motion.h2
              id="v2-vcareer-title"
              className={styles.title}
              style={relayStyle("introTitle")}
              data-vcareer-route-title-source
              data-vcareer-route-target="home-title"
            >
              {copy.title}
            </motion.h2>
          </div>

          <div className={styles.introCopy}>
            <p className={styles.proposition}>{copy.proposition}</p>
            <p className={styles.pilotProof}>
              <strong>{copy.pilotValue}</strong>
              <span>{copy.pilotLabel}</span>
            </p>
          </div>
        </motion.header>

        <motion.section
          className={styles.scopeLedger}
          aria-labelledby="v2-vcareer-scope-title"
          style={relayStyle("scope")}
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
        </motion.section>

        <section
          className={styles.workflow}
          aria-labelledby="v2-vcareer-workflow-title"
        >
          <motion.header
            className={styles.workflowHeader}
            style={relayStyle("workflowHeader")}
          >
            <div>
              <p className={styles.workflowLabel}>{copy.workflowLabel}</p>
              <h3 id="v2-vcareer-workflow-title">{copy.workflowTitle}</h3>
            </div>
            <p className={styles.disclaimer}>{copy.screenshotDisclaimer}</p>
          </motion.header>

          <motion.ol
            className={styles.storyRail}
            style={relayStyle("workflowHeader")}
            aria-hidden
          >
            {VCAREER_SHOWCASE_STAGES.map((stage, index) => {
              const stageCopy = copy.stages[stage.key];
              const stageNumber = String(index + 1).padStart(2, "0");

              return (
                <motion.li
                  key={stage.key}
                  data-evidence={stage.evidence}
                  style={
                    relay.enabled
                      ? relay.stages[stage.key].rail
                      : STATIC_STAGE_STYLES.rail
                  }
                >
                  <span>{stageNumber}</span>
                  <strong>{stageCopy.name}</strong>
                </motion.li>
              );
            })}
          </motion.ol>

          <ol className={styles.sequence}>
            {VCAREER_SHOWCASE_STAGES.map((stage, index) => {
              const stageCopy = copy.stages[stage.key];
              const stageNumber = String(index + 1).padStart(2, "0");
              const isBookend = stage.layout === "bookend";

              return (
                <motion.li
                  key={stage.key}
                  className={styles.stage}
                  data-evidence={stage.evidence}
                  data-layout={stage.layout}
                  data-vcareer-stage={stage.key}
                  data-vcareer-route-stage={stage.key}
                  data-vcareer-route-stage-index={`${stageNumber} / 06`}
                  style={
                    relay.enabled
                      ? relay.stages[stage.key].stage
                      : STATIC_STAGE_STYLES.stage
                  }
                >
                  <figure>
                    <motion.figcaption
                      className={styles.stageMeta}
                      style={
                        relay.enabled
                          ? relay.stages[stage.key].meta
                          : STATIC_STAGE_STYLES.meta
                      }
                    >
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
                    </motion.figcaption>

                    <div
                      className={styles.stageMedia}
                      data-vcareer-route-stage-visual
                    >
                      <EvidenceImage
                        alt={stageCopy.alt}
                        fallbackLabel={copy.imageUnavailable}
                        height={stage.height}
                        loadingLabel={copy.imageLoading}
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
                </motion.li>
              );
            })}
          </ol>

          <motion.div
            className={styles.architectureSlice}
            style={relayStyle("architecture")}
            role="group"
            aria-label={copy.architectureLabel}
          >
            <p>{copy.architectureLabel}</p>
            <div>
              <strong>{copy.architectureSource}</strong>
              <motion.span
                className={styles.architectureTrace}
                style={relayStyle("architectureTrace")}
                aria-hidden
              />
              <strong>{copy.architectureTarget}</strong>
            </div>
          </motion.div>
        </section>

        <motion.footer
          className={styles.outcomes}
          style={relayStyle("outcomes")}
          data-vcareer-outcomes-interactive={
            outcomesInteractive ? "true" : "false"
          }
          aria-hidden={outcomesInteractive ? undefined : true}
          inert={!outcomesInteractive}
        >
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
            <VCareerRouteHandoffLink
              href={VCAREER_PROJECT.caseStudyPath}
              direction="forward"
              source="chapter"
              className={styles.primaryAction}
            >
              <span>{copy.primaryAction}</span>
              <span aria-hidden>↗</span>
            </VCareerRouteHandoffLink>

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
        </motion.footer>
      </div>
    </section>
  );
}
