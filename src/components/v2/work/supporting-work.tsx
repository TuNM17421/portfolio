"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import {
  FINANCIAL_ARCHIVE_IMAGES,
  FINANCIAL_ARCHIVE_REPOSITORIES,
  SCHOLARAI_EVIDENCE,
  SCHOLARAI_SOURCE_URL,
  type FinancialArchiveImageKey,
  type FinancialArchiveRepositoryKey,
  type SupportingWorkImage,
  type SupportingWorkImageState,
} from "@/lib/v2/supporting-work";
import styles from "./supporting-work.module.css";
import type { SupportingWorkHandoffController } from "./supporting-work-handoff";

type EvidenceCopy = {
  label: string;
  title: string;
  caption: string;
  alt: string;
};

type FinancialNodeCopy = {
  label: string;
  title: string;
  description: string;
  action: string;
};

type FinancialMediaCopy = {
  label: string;
  caption: string;
  alt: string;
};

export type SupportingWorkCopy = {
  eyebrow: string;
  axis: string;
  title: string;
  framing: string;
  scholar: {
    kicker: string;
    status: string;
    title: string;
    subtitle: string;
    thesis: string;
    scopeLabel: string;
    scope: [string, string, string];
    evidenceLabel: string;
    screenLabel: string;
    evidence: {
      retrieve: EvidenceCopy;
      ground: EvidenceCopy;
      evaluate: {
        label: string;
        title: string;
        caption: string;
        qaLabel: string;
        qaCaption: string;
        qaAlt: string;
        refusalLabel: string;
        refusalCaption: string;
        refusalAlt: string;
      };
    };
    technology: string;
    testingContext: string;
    sourceState: string;
    sourceAction: string;
  };
  financial: {
    eyebrow: string;
    status: string;
    title: string;
    subtitle: string;
    description: string;
    topologyLabel: string;
    topology: Record<FinancialArchiveRepositoryKey, FinancialNodeCopy>;
    mediaLabel: string;
    media: Record<FinancialArchiveImageKey, FinancialMediaCopy>;
    sourceState: string;
  };
  opensNewWindow: string;
  imageLoading: string;
  imageUnavailable: string;
};

type SupportingWorkProps = {
  copy: SupportingWorkCopy;
  handoff: SupportingWorkHandoffController;
  imageReviewState: SupportingWorkImageState;
  navigationOpen: boolean;
};

type EvidenceImageProps = SupportingWorkImage & {
  alt: string;
  fallbackLabel: string;
  loadingLabel: string;
  name: string;
  reviewState: SupportingWorkImageState;
  sizes: string;
  variant: "scholar" | "archive";
};

type EvidenceRuntimeState = "loading" | "ready" | "error";

function EvidenceImage({
  alt,
  fallbackLabel,
  height,
  loadingLabel,
  name,
  reviewState,
  sizes,
  src,
  variant,
  width,
}: EvidenceImageProps) {
  const [runtimeState, setRuntimeState] =
    useState<EvidenceRuntimeState>("loading");
  const imageState = reviewState === "auto" ? runtimeState : reviewState;
  const imageFailed = imageState === "error";
  const renderImage = reviewState === "auto" && runtimeState !== "error";

  return (
    <div
      className={styles.imageFrame}
      data-image-state={imageState}
      data-image-variant={variant}
      aria-busy={imageState === "loading" || undefined}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className={styles.imageFallback}
        role={imageFailed ? "img" : undefined}
        aria-label={imageFailed ? `${fallbackLabel}: ${name}` : undefined}
        aria-hidden={imageFailed ? undefined : true}
      >
        <span className={styles.fallbackSignal} aria-hidden>
          {variant === "scholar" ? "AI" : "ARC"}
        </span>
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

function ExternalWindowHint({ label }: { label: string }) {
  return <span className={styles.visuallyHidden}>{label}</span>;
}

export function SupportingWork({
  copy,
  handoff,
  imageReviewState,
  navigationOpen,
}: SupportingWorkProps) {
  const retrieve = SCHOLARAI_EVIDENCE[0];
  const ground = SCHOLARAI_EVIDENCE[1];
  const evaluate = SCHOLARAI_EVIDENCE[2];
  const scholarEvidence = [
    { data: retrieve, copy: copy.scholar.evidence.retrieve },
    { data: ground, copy: copy.scholar.evidence.ground },
  ] as const;

  return (
    <section
      ref={handoff.sectionRef}
      id="work"
      className={styles.work}
      aria-labelledby="v2-work-title"
      aria-hidden={navigationOpen || undefined}
      inert={navigationOpen}
      data-work-static
      data-work-handoff={handoff.mode}
      data-work-image-review={imageReviewState}
    >
      <div
        className={styles.chapterHandoff}
        data-work-chapter-handoff
        aria-hidden
      >
        <motion.span
          className={styles.handoffStem}
          style={handoff.enabled ? handoff.styles.stem : { scaleY: 1 }}
        />
        <motion.span
          className={styles.handoffCursor}
          style={handoff.enabled ? handoff.styles.cursor : { opacity: 0 }}
          data-work-handoff-cursor
        />
        <motion.span
          className={styles.handoffTerminal}
          style={handoff.enabled ? handoff.styles.terminal : { scale: 1 }}
        />
        <motion.span
          className={styles.handoffTrackLeft}
          style={handoff.enabled ? handoff.styles.trackLeft : { scaleX: 1 }}
        />
        <motion.span
          className={styles.handoffTrackRight}
          style={handoff.enabled ? handoff.styles.trackRight : { scaleX: 1 }}
        />
        <span className={styles.handoffPacketLaneLeft}>
          <motion.span
            className={styles.handoffPacketLeft}
            style={
              handoff.enabled
                ? handoff.styles.packetLeft
                : { opacity: 0, right: "100%" }
            }
            data-work-handoff-packet="left"
          />
        </span>
        <span className={styles.handoffPacketLaneRight}>
          <motion.span
            className={styles.handoffPacketRight}
            style={
              handoff.enabled
                ? handoff.styles.packetRight
                : { opacity: 0, left: "100%" }
            }
            data-work-handoff-packet="right"
          />
        </span>
      </div>

      <div ref={handoff.surfaceRef} className={styles.sheet} data-work-surface>
        <header className={styles.sectionRail}>
          <p>{copy.eyebrow}</p>
          <p>{copy.axis}</p>
        </header>

        <header className={styles.chapterIntro}>
          <h2 id="v2-work-title">{copy.title}</h2>
          <p>{copy.framing}</p>
        </header>

        <article className={styles.scholar} aria-labelledby="v2-scholar-title">
          <header className={styles.scholarHeader}>
            <div className={styles.scholarIdentity}>
              <p className={styles.kicker}>{copy.scholar.kicker}</p>
              <h3 id="v2-scholar-title">{copy.scholar.title}</h3>
              <p className={styles.scholarSubtitle}>{copy.scholar.subtitle}</p>
            </div>

            <div className={styles.scholarPositioning}>
              <p className={styles.status}>{copy.scholar.status}</p>
              <p className={styles.thesis}>{copy.scholar.thesis}</p>
            </div>
          </header>

          <section
            className={styles.scopeLedger}
            aria-labelledby="v2-scholar-scope-title"
          >
            <h4 id="v2-scholar-scope-title">{copy.scholar.scopeLabel}</h4>
            <ol>
              {copy.scholar.scope.map((item, index) => (
                <li key={item}>
                  <span aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className={styles.evidenceHeading}>
            <p>{copy.scholar.evidenceLabel}</p>
            <p>{copy.scholar.technology}</p>
          </div>

          <ol className={styles.evidenceList}>
            {scholarEvidence.map((evidence, index) => {
              const image = evidence.data.images[0];
              const signalNumber = String(index + 1).padStart(2, "0");

              return (
                <li
                  key={evidence.data.key}
                  className={styles.evidenceItem}
                  data-evidence={evidence.data.key}
                >
                  <figure>
                    <figcaption className={styles.evidenceCopy}>
                      <p className={styles.evidenceIndex}>
                        {copy.scholar.screenLabel} {signalNumber} / 03
                      </p>
                      <p className={styles.evidenceKind}>
                        {evidence.copy.label}
                      </p>
                      <h4>{evidence.copy.title}</h4>
                      <p className={styles.evidenceCaption}>
                        {evidence.copy.caption}
                      </p>
                    </figcaption>

                    <div className={styles.evidenceMedia}>
                      <EvidenceImage
                        {...image}
                        alt={evidence.copy.alt}
                        fallbackLabel={copy.imageUnavailable}
                        loadingLabel={copy.imageLoading}
                        name={evidence.copy.label}
                        reviewState={imageReviewState}
                        sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 64vw, 68vw"
                        variant="scholar"
                      />
                    </div>
                  </figure>
                </li>
              );
            })}

            <li
              className={`${styles.evidenceItem} ${styles.evaluateItem}`}
              data-evidence={evaluate.key}
            >
              <header className={styles.evaluateHeader}>
                <div className={styles.evidenceCopy}>
                  <p className={styles.evidenceIndex}>
                    {copy.scholar.screenLabel} 03 / 03
                  </p>
                  <p className={styles.evidenceKind}>
                    {copy.scholar.evidence.evaluate.label}
                  </p>
                  <h4>{copy.scholar.evidence.evaluate.title}</h4>
                </div>
                <p className={styles.evidenceCaption}>
                  {copy.scholar.evidence.evaluate.caption}
                </p>
              </header>

              <div className={styles.benchmarkGrid}>
                <figure>
                  <EvidenceImage
                    {...evaluate.images[0]}
                    alt={copy.scholar.evidence.evaluate.qaAlt}
                    fallbackLabel={copy.imageUnavailable}
                    loadingLabel={copy.imageLoading}
                    name={copy.scholar.evidence.evaluate.qaLabel}
                    reviewState={imageReviewState}
                    sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 64vw, 45vw"
                    variant="scholar"
                  />
                  <figcaption>
                    <strong>{copy.scholar.evidence.evaluate.qaLabel}</strong>
                    <span>{copy.scholar.evidence.evaluate.qaCaption}</span>
                  </figcaption>
                </figure>

                <figure>
                  <EvidenceImage
                    {...evaluate.images[1]}
                    alt={copy.scholar.evidence.evaluate.refusalAlt}
                    fallbackLabel={copy.imageUnavailable}
                    loadingLabel={copy.imageLoading}
                    name={copy.scholar.evidence.evaluate.refusalLabel}
                    reviewState={imageReviewState}
                    sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 64vw, 45vw"
                    variant="scholar"
                  />
                  <figcaption>
                    <strong>
                      {copy.scholar.evidence.evaluate.refusalLabel}
                    </strong>
                    <span>{copy.scholar.evidence.evaluate.refusalCaption}</span>
                  </figcaption>
                </figure>
              </div>
            </li>
          </ol>

          <footer className={styles.scholarFooter}>
            <div>
              <p>{copy.scholar.testingContext}</p>
              <p>{copy.scholar.sourceState}</p>
            </div>
            <a
              href={SCHOLARAI_SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.scholarAction}
            >
              <span>{copy.scholar.sourceAction}</span>
              <span aria-hidden>↗</span>
              <ExternalWindowHint label={copy.opensNewWindow} />
            </a>
          </footer>
        </article>

        <article
          className={styles.financial}
          aria-labelledby="v2-financial-title"
        >
          <header className={styles.financialHeader}>
            <div>
              <p className={styles.archiveEyebrow}>{copy.financial.eyebrow}</p>
              <p className={styles.archiveStatus}>{copy.financial.status}</p>
            </div>
            <div>
              <h3 id="v2-financial-title">{copy.financial.title}</h3>
              <p className={styles.financialSubtitle}>
                {copy.financial.subtitle}
              </p>
              <p className={styles.financialDescription}>
                {copy.financial.description}
              </p>
            </div>
          </header>

          <section
            className={styles.topology}
            aria-labelledby="v2-financial-topology-title"
          >
            <h4 id="v2-financial-topology-title">
              {copy.financial.topologyLabel}
            </h4>
            <ol>
              {FINANCIAL_ARCHIVE_REPOSITORIES.map((repository, index) => {
                const node = copy.financial.topology[repository.key];

                return (
                  <li key={repository.key}>
                    <a
                      href={repository.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className={styles.nodeIndex} aria-hidden>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.nodeLabel}>{node.label}</span>
                      <strong>{node.title}</strong>
                      <span className={styles.nodeDescription}>
                        {node.description}
                      </span>
                      <span className={styles.nodeAction}>
                        {node.action} <span aria-hidden>↗</span>
                      </span>
                      <ExternalWindowHint label={copy.opensNewWindow} />
                    </a>
                  </li>
                );
              })}
            </ol>
          </section>

          <section
            className={styles.archiveMedia}
            aria-labelledby="v2-financial-media-title"
          >
            <h4 id="v2-financial-media-title">{copy.financial.mediaLabel}</h4>
            <div>
              {FINANCIAL_ARCHIVE_IMAGES.map((image) => {
                const mediaCopy = copy.financial.media[image.key];

                return (
                  <figure key={image.key}>
                    <EvidenceImage
                      {...image}
                      alt={mediaCopy.alt}
                      fallbackLabel={copy.imageUnavailable}
                      loadingLabel={copy.imageLoading}
                      name={mediaCopy.label}
                      reviewState={imageReviewState}
                      sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 48vw, 42vw"
                      variant="archive"
                    />
                    <figcaption>
                      <strong>{mediaCopy.label}</strong>
                      <span>{mediaCopy.caption}</span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </section>

          <p className={styles.archiveState}>{copy.financial.sourceState}</p>
        </article>
      </div>
    </section>
  );
}
