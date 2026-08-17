"use client";

import Image from "next/image";
import { useId, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  FINANCIAL_ARCHIVE_IMAGES,
  FINANCIAL_ARCHIVE_REPOSITORIES,
  SCHOLARAI_EVIDENCE,
  SCHOLARAI_SOURCE_URL,
  type FinancialArchiveImageKey,
  type FinancialArchiveRepositoryKey,
  type ScholarAIBenchmarkKey,
  type ScholarAIEvidenceKey,
  type SupportingWorkImage,
} from "@/lib/v2/supporting-work";
import styles from "./supporting-work.module.css";
import type { FinancialArchiveMotionController } from "./financial-archive-motion";
import type { SupportingWorkHandoffController } from "./supporting-work-handoff";
import type { SupportingWorkStoryController } from "./supporting-work-story";

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
    domainLabel: string;
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
  archive: FinancialArchiveMotionController;
  copy: SupportingWorkCopy;
  handoff: SupportingWorkHandoffController;
  navigationOpen: boolean;
  story: SupportingWorkStoryController;
};

type EvidenceImageProps = SupportingWorkImage & {
  alt: string;
  fallbackLabel: string;
  loadingLabel: string;
  name: string;
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
  sizes,
  src,
  variant,
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
  archive,
  copy,
  handoff,
  navigationOpen,
  story,
}: SupportingWorkProps) {
  const retrieve = SCHOLARAI_EVIDENCE[0];
  const ground = SCHOLARAI_EVIDENCE[1];
  const evaluate = SCHOLARAI_EVIDENCE[2];
  const scholarEvidence = [
    { data: retrieve, copy: copy.scholar.evidence.retrieve },
    { data: ground, copy: copy.scholar.evidence.ground },
  ] as const;
  const benchmarkPanelId = useId();
  const [lockedBenchmark, setLockedBenchmark] =
    useState<ScholarAIBenchmarkKey>("qa");
  const [previewBenchmark, setPreviewBenchmark] =
    useState<ScholarAIBenchmarkKey | null>(null);
  const visibleBenchmark = previewBenchmark ?? lockedBenchmark;
  const interactiveEvidence = story.mode !== "static";
  const interactiveBenchmark = interactiveEvidence || story.compactEnhanced;
  const evidenceCopy = {
    retrieve: copy.scholar.evidence.retrieve,
    ground: copy.scholar.evidence.ground,
    evaluate: copy.scholar.evidence.evaluate,
  } satisfies Record<ScholarAIEvidenceKey, { label: string; title: string }>;
  const benchmarkEvidence = {
    qa: {
      image: evaluate.images[0],
      label: copy.scholar.evidence.evaluate.qaLabel,
      caption: copy.scholar.evidence.evaluate.qaCaption,
      alt: copy.scholar.evidence.evaluate.qaAlt,
    },
    refusal: {
      image: evaluate.images[1],
      label: copy.scholar.evidence.evaluate.refusalLabel,
      caption: copy.scholar.evidence.evaluate.refusalCaption,
      alt: copy.scholar.evidence.evaluate.refusalAlt,
    },
  } satisfies Record<
    ScholarAIBenchmarkKey,
    {
      image: SupportingWorkImage;
      label: string;
      caption: string;
      alt: string;
    }
  >;
  const visibleBenchmarkEvidence = benchmarkEvidence[visibleBenchmark];
  const staticProgress = {
    retrieve: 0.18,
    ground: 0.52,
    evaluate: 1,
  }[story.activeStage];

  const chooseBenchmark = (benchmark: ScholarAIBenchmarkKey) => {
    setLockedBenchmark(benchmark);
    setPreviewBenchmark(null);
  };

  const handleBenchmarkKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    benchmark: ScholarAIBenchmarkKey,
  ) => {
    let next: ScholarAIBenchmarkKey | null = null;

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = benchmark === "qa" ? "refusal" : "qa";
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = benchmark === "qa" ? "refusal" : "qa";
    } else if (event.key === "Home") {
      next = "qa";
    } else if (event.key === "End") {
      next = "refusal";
    }

    if (!next) return;
    event.preventDefault();
    chooseBenchmark(next);
    event.currentTarget.parentElement
      ?.querySelector<HTMLButtonElement>(`[data-benchmark="${next}"]`)
      ?.focus();
  };

  const evidencePanelStyle = (stage: ScholarAIEvidenceKey) => {
    if (story.enabled) return story.stages[stage];
    if (story.mode === "static") {
      return {
        opacity: 1,
        clipPath: "none",
        y: 0,
        visibility: "visible" as const,
      };
    }

    return story.activeStage === stage
      ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", y: 0 }
      : {
          opacity: 0,
          clipPath: "inset(0% 12% 0% 0%)",
          y: 16,
          visibility: "hidden" as const,
        };
  };

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
      data-work-story={story.mode}
      data-work-compact-enhanced={story.compactEnhanced || undefined}
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
        </header>

        <h2 id="v2-work-title" className={styles.visuallyHidden}>
          {copy.eyebrow}
        </h2>

        <article
          id="scholarai"
          className={styles.scholar}
          aria-labelledby="v2-scholar-title"
        >
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

          <div
            ref={story.stageRef}
            className={styles.evidenceStage}
            data-scholar-evidence-stage
            data-scholar-stage-mode={story.mode}
            data-scholar-active-stage={story.activeStage}
          >
            <div className={styles.evidenceSticky}>
              <div className={styles.evidenceHeading}>
                <p>{copy.scholar.evidenceLabel}</p>
                <p>{copy.scholar.technology}</p>
              </div>

              <div className={styles.evidenceCanvas}>
                <nav
                  className={styles.evidenceNavigation}
                  aria-label={copy.scholar.evidenceLabel}
                >
                  <span className={styles.evidenceProgressTrack} aria-hidden>
                    <motion.span
                      style={
                        story.enabled
                          ? story.progressStyle
                          : { scaleY: staticProgress }
                      }
                      data-scholar-evidence-progress
                    />
                  </span>
                  <ol className={styles.evidenceRail}>
                    {SCHOLARAI_EVIDENCE.map((evidence, index) => {
                      const stageCopy = evidenceCopy[evidence.key];
                      const active = story.activeStage === evidence.key;

                      return (
                        <li
                          key={evidence.key}
                          data-active={active || undefined}
                        >
                          <button
                            type="button"
                            onClick={() => story.goToStage(evidence.key)}
                            aria-current={active ? "step" : undefined}
                          >
                            <span aria-hidden>
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span>{stageCopy.label}</span>
                            <strong>{stageCopy.title}</strong>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </nav>

                <ol className={styles.evidenceList}>
                  {scholarEvidence.map((evidence, index) => {
                    const image = evidence.data.images[0];
                    const signalNumber = String(index + 1).padStart(2, "0");
                    const active = story.activeStage === evidence.data.key;

                    return (
                      <motion.li
                        key={evidence.data.key}
                        className={styles.evidenceItem}
                        data-evidence={evidence.data.key}
                        data-active={active || undefined}
                        style={evidencePanelStyle(evidence.data.key)}
                        aria-hidden={
                          interactiveEvidence && !active ? true : undefined
                        }
                        inert={interactiveEvidence && !active}
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
                              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 64vw, 68vw"
                              variant="scholar"
                            />
                          </div>
                        </figure>
                      </motion.li>
                    );
                  })}

                  <motion.li
                    className={`${styles.evidenceItem} ${styles.evaluateItem}`}
                    data-evidence={evaluate.key}
                    data-active={
                      story.activeStage === evaluate.key || undefined
                    }
                    style={evidencePanelStyle(evaluate.key)}
                    aria-hidden={
                      interactiveEvidence && story.activeStage !== evaluate.key
                        ? true
                        : undefined
                    }
                    inert={
                      interactiveEvidence && story.activeStage !== evaluate.key
                    }
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

                    {interactiveBenchmark ? (
                      <div className={styles.benchmarkInteractive}>
                        <div
                          className={styles.benchmarkTabs}
                          role="tablist"
                          aria-label={copy.scholar.evidence.evaluate.label}
                        >
                          {(["qa", "refusal"] as const).map((benchmark) => {
                            const selected = visibleBenchmark === benchmark;
                            const benchmarkCopy = benchmarkEvidence[benchmark];

                            return (
                              <button
                                key={benchmark}
                                id={`${benchmarkPanelId}-tab-${benchmark}`}
                                type="button"
                                role="tab"
                                aria-selected={selected}
                                aria-controls={benchmarkPanelId}
                                tabIndex={selected ? 0 : -1}
                                data-benchmark={benchmark}
                                onPointerEnter={() =>
                                  setPreviewBenchmark(benchmark)
                                }
                                onPointerLeave={() => setPreviewBenchmark(null)}
                                onFocus={() => setPreviewBenchmark(benchmark)}
                                onBlur={() => setPreviewBenchmark(null)}
                                onClick={() => chooseBenchmark(benchmark)}
                                onKeyDown={(event) =>
                                  handleBenchmarkKeyDown(event, benchmark)
                                }
                              >
                                <span>{benchmarkCopy.label}</span>
                                <span aria-hidden>
                                  {benchmark === "qa" ? "01" : "02"}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        <div
                          id={benchmarkPanelId}
                          className={styles.benchmarkViewport}
                          role="tabpanel"
                          aria-labelledby={`${benchmarkPanelId}-tab-${visibleBenchmark}`}
                          data-benchmark-current={visibleBenchmark}
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            <motion.figure
                              key={visibleBenchmark}
                              initial={{
                                opacity: 0,
                                clipPath: "inset(0% 10% 0% 0%)",
                              }}
                              animate={{
                                opacity: 1,
                                clipPath: "inset(0% 0% 0% 0%)",
                              }}
                              exit={{
                                opacity: 0,
                                clipPath: "inset(0% 0% 0% 10%)",
                              }}
                              transition={{
                                duration: 0.32,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            >
                              <EvidenceImage
                                {...visibleBenchmarkEvidence.image}
                                alt={visibleBenchmarkEvidence.alt}
                                fallbackLabel={copy.imageUnavailable}
                                loadingLabel={copy.imageLoading}
                                name={visibleBenchmarkEvidence.label}
                                sizes="(min-width: 1024px) 68vw, (min-width: 768px) 77vw, calc(100vw - 40px)"
                                variant="scholar"
                              />
                              <figcaption>
                                <strong>
                                  {visibleBenchmarkEvidence.label}
                                </strong>
                                <span>{visibleBenchmarkEvidence.caption}</span>
                              </figcaption>
                            </motion.figure>
                          </AnimatePresence>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.benchmarkGrid}>
                        {(["qa", "refusal"] as const).map((benchmark) => {
                          const benchmarkCopy = benchmarkEvidence[benchmark];

                          return (
                            <figure key={benchmark}>
                              <EvidenceImage
                                {...benchmarkCopy.image}
                                alt={benchmarkCopy.alt}
                                fallbackLabel={copy.imageUnavailable}
                                loadingLabel={copy.imageLoading}
                                name={benchmarkCopy.label}
                                sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 64vw, 45vw"
                                variant="scholar"
                              />
                              <figcaption>
                                <strong>{benchmarkCopy.label}</strong>
                                <span>{benchmarkCopy.caption}</span>
                              </figcaption>
                            </figure>
                          );
                        })}
                      </div>
                    )}
                  </motion.li>
                </ol>
              </div>
            </div>
          </div>

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
          ref={archive.sectionRef}
          id="financial-archive"
          className={styles.financial}
          aria-labelledby="v2-financial-title"
          data-financial-archive
          data-financial-motion={archive.enabled ? "active" : "static"}
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
            ref={archive.topologyRef}
            className={styles.topology}
            aria-labelledby="v2-financial-topology-title"
          >
            <h4 id="v2-financial-topology-title">
              {copy.financial.topologyLabel}
            </h4>
            <div className={styles.topologyDiagram} aria-hidden>
              <span className={styles.topologyDomainLabel}>
                {copy.financial.domainLabel}
              </span>

              <svg
                className={styles.topologyDesktopDiagram}
                viewBox="0 0 1000 100"
                preserveAspectRatio="none"
              >
                <motion.circle
                  className={styles.topologyHub}
                  cx="500"
                  cy="28"
                  r="5"
                  style={
                    archive.enabled
                      ? archive.styles.hub
                      : { scale: 1, opacity: 1 }
                  }
                />
                <motion.path
                  d="M500 28 H166"
                  style={
                    archive.enabled
                      ? archive.styles.ledgerLeft
                      : { pathLength: 1, opacity: 1 }
                  }
                />
                <motion.path
                  d="M500 28 H834"
                  style={
                    archive.enabled
                      ? archive.styles.ledgerRight
                      : { pathLength: 1, opacity: 1 }
                  }
                />
                <motion.path
                  d="M166 28 V98"
                  style={
                    archive.enabled
                      ? archive.styles.branches.api
                      : { pathLength: 1, opacity: 1 }
                  }
                />
                <motion.path
                  d="M500 28 V98"
                  style={
                    archive.enabled
                      ? archive.styles.branches.web
                      : { pathLength: 1, opacity: 1 }
                  }
                />
                <motion.path
                  d="M834 28 V98"
                  style={
                    archive.enabled
                      ? archive.styles.branches.worker
                      : { pathLength: 1, opacity: 1 }
                  }
                />
              </svg>

              <svg
                className={styles.topologyTabletDiagram}
                viewBox="0 0 1000 132"
                preserveAspectRatio="none"
              >
                <motion.circle
                  className={styles.topologyHub}
                  cx="500"
                  cy="30"
                  r="5"
                  style={
                    archive.enabled
                      ? archive.styles.hub
                      : { scale: 1, opacity: 1 }
                  }
                />
                <motion.path
                  d="M500 30 H250"
                  style={
                    archive.enabled
                      ? archive.styles.ledgerLeft
                      : { pathLength: 1, opacity: 1 }
                  }
                />
                <motion.path
                  d="M500 30 H750"
                  style={
                    archive.enabled
                      ? archive.styles.ledgerRight
                      : { pathLength: 1, opacity: 1 }
                  }
                />
                <motion.path
                  d="M250 30 V78"
                  style={
                    archive.enabled
                      ? archive.styles.branches.api
                      : { pathLength: 1, opacity: 1 }
                  }
                />
                <motion.path
                  d="M750 30 V78"
                  style={
                    archive.enabled
                      ? archive.styles.branches.web
                      : { pathLength: 1, opacity: 1 }
                  }
                />
                <motion.path
                  d="M500 30 V130"
                  style={
                    archive.enabled
                      ? archive.styles.branches.worker
                      : { pathLength: 1, opacity: 1 }
                  }
                />
              </svg>
            </div>

            <div className={styles.topologyListShell}>
              <motion.span
                className={styles.topologyMobileTrace}
                style={
                  archive.enabled
                    ? archive.styles.mobileTrace
                    : { scaleY: 1, opacity: 1 }
                }
                aria-hidden
              />
              <ol>
                {FINANCIAL_ARCHIVE_REPOSITORIES.map((repository, index) => {
                  const node = copy.financial.topology[repository.key];

                  return (
                    <li key={repository.key}>
                      <motion.span
                        className={styles.topologyNode}
                        data-topology-node={repository.key}
                        style={
                          archive.enabled
                            ? archive.styles.nodes[repository.key]
                            : { scale: 1, opacity: 1 }
                        }
                        aria-hidden
                      />
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
            </div>
          </section>

          <section
            className={styles.archiveMedia}
            aria-labelledby="v2-financial-media-title"
          >
            <h4 id="v2-financial-media-title">{copy.financial.mediaLabel}</h4>
            <div>
              {FINANCIAL_ARCHIVE_IMAGES.map(({ key, ...image }) => {
                const mediaCopy = copy.financial.media[key];

                return (
                  <figure key={key}>
                    <EvidenceImage
                      {...image}
                      alt={mediaCopy.alt}
                      fallbackLabel={copy.imageUnavailable}
                      loadingLabel={copy.imageLoading}
                      name={mediaCopy.label}
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
