"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  DEFAULT_RECOGNITION_DOCUMENTARY_KEY,
  RECOGNITION_DOCUMENTARY_IMAGES,
  RECOGNITION_RECORDS,
  resolveRecognitionDocumentaryDirection,
  resolveRecognitionDocumentaryNavigation,
  type RecognitionDocumentaryKey,
  type RecognitionRecordKey,
} from "@/lib/v2/career-recognition";
import type { RecognitionStageMotionController } from "./recognition-stage-motion";
import styles from "./recognition-stage.module.css";

type RecognitionRecordCopy = {
  index: string;
  project: string;
  result: string;
  context: string;
  date: string;
};

type RecognitionDocumentaryCopy = {
  index: string;
  label: string;
  caption: string;
  alt: string;
};

export type RecognitionStageCopy = {
  eyebrow: string;
  title: string;
  documentarySelectorLabel: string;
  documentaries: Record<
    RecognitionDocumentaryKey,
    RecognitionDocumentaryCopy
  >;
  imageLoading: string;
  imageUnavailable: string;
  supportingLabel: string;
  records: Record<RecognitionRecordKey, RecognitionRecordCopy>;
};

type RecognitionStageProps = {
  copy: RecognitionStageCopy;
  initialDocumentary: RecognitionDocumentaryKey | null;
  motionController: RecognitionStageMotionController;
};

type DocumentaryMaskCustom = {
  direction: -1 | 0 | 1;
  reduceMotion: boolean;
};

const documentaryMaskVariants = {
  enter: ({ direction, reduceMotion }: DocumentaryMaskCustom) =>
    reduceMotion
      ? { opacity: 0 }
      : {
          clipPath:
            direction < 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
          opacity: 0.72,
        },
  center: { clipPath: "inset(0 0 0 0)", opacity: 1 },
  exit: ({ direction, reduceMotion }: DocumentaryMaskCustom) =>
    reduceMotion
      ? { opacity: 0 }
      : {
          clipPath:
            direction < 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
          opacity: 0.42,
        },
};

function DocumentaryRegister({
  copy,
  initialDocumentary,
  motionController,
}: {
  copy: RecognitionStageCopy;
  initialDocumentary: RecognitionDocumentaryKey | null;
  motionController: RecognitionStageMotionController;
}) {
  const reduceMotion = Boolean(useReducedMotion());
  const resolvedInitialDocumentary =
    initialDocumentary ?? DEFAULT_RECOGNITION_DOCUMENTARY_KEY;
  const [selectedKey, setSelectedKey] =
    useState<RecognitionDocumentaryKey>(resolvedInitialDocumentary);
  const selectedKeyRef = useRef(selectedKey);
  const [direction, setDirection] = useState<-1 | 0 | 1>(1);
  const [loadedKeys, setLoadedKeys] = useState<RecognitionDocumentaryKey[]>([]);
  const [failedKeys, setFailedKeys] = useState<RecognitionDocumentaryKey[]>([]);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const selectedDocumentary = RECOGNITION_DOCUMENTARY_IMAGES.find(
    (documentary) => documentary.key === selectedKey,
  )!;
  const selectedCopy = copy.documentaries[selectedKey];
  const runtimeState = failedKeys.includes(selectedKey)
    ? "error"
    : loadedKeys.includes(selectedKey)
      ? "ready"
      : "loading";
  const imageState = runtimeState;
  const imageFailed = imageState === "error";
  const renderImage = !failedKeys.includes(selectedKey);

  const selectDocumentary = (nextKey: RecognitionDocumentaryKey) => {
    const nextDirection = resolveRecognitionDocumentaryDirection(
      selectedKeyRef.current,
      nextKey,
    );
    if (nextDirection === 0) return;

    setDirection(nextDirection);
    selectedKeyRef.current = nextKey;
    setSelectedKey(nextKey);
  };

  useEffect(() => {
    if (!initialDocumentary) return;
    const nextDirection = resolveRecognitionDocumentaryDirection(
      selectedKeyRef.current,
      initialDocumentary,
    );
    if (nextDirection === 0) return;

    setDirection(nextDirection);
    selectedKeyRef.current = initialDocumentary;
    setSelectedKey(initialDocumentary);
  }, [initialDocumentary]);

  const handleDocumentaryClick = (
    event: MouseEvent<HTMLAnchorElement>,
    nextKey: RecognitionDocumentaryKey,
  ) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    selectDocumentary(nextKey);
  };

  const handleDocumentaryKeyDown = (
    event: KeyboardEvent<HTMLAnchorElement>,
    focusedKey: RecognitionDocumentaryKey,
  ) => {
    const nextKey = resolveRecognitionDocumentaryNavigation(
      focusedKey,
      event.key,
    );
    if (!nextKey) return;

    event.preventDefault();
    selectDocumentary(nextKey);
    const nextIndex = RECOGNITION_DOCUMENTARY_IMAGES.findIndex(
      (documentary) => documentary.key === nextKey,
    );
    window.requestAnimationFrame(() => linkRefs.current[nextIndex]?.focus());
  };

  return (
    <motion.div
      className={styles.documentary}
      style={
        motionController.enabled ? motionController.styles.document : undefined
      }
    >
      <figure className={styles.documentaryFigure}>
        <div
          className={styles.imageFrame}
          data-documentary-key={selectedKey}
          data-image-state={imageState}
          aria-busy={imageState === "loading" || undefined}
        >
          <div
            className={styles.imageFallback}
            role={imageFailed ? "img" : undefined}
            aria-label={
              imageFailed
                ? `${copy.imageUnavailable}: ${selectedCopy.label}`
                : undefined
            }
            aria-hidden={imageFailed ? undefined : true}
          >
            <span aria-hidden>06:D / {selectedCopy.index}</span>
            <strong>{selectedCopy.label}</strong>
            <p>{imageFailed ? copy.imageUnavailable : copy.imageLoading}</p>
          </div>

          <motion.div
            className={styles.imageMotionSurface}
            style={
              motionController.enabled
                ? motionController.styles.image
                : undefined
            }
          >
            <AnimatePresence
              initial={false}
              custom={{ direction, reduceMotion }}
              mode="sync"
            >
              {renderImage ? (
                <motion.div
                  key={selectedDocumentary.key}
                  className={styles.imageSurface}
                  custom={{ direction, reduceMotion }}
                  variants={documentaryMaskVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={
                    reduceMotion
                      ? { duration: 0.16, ease: "linear" }
                      : { duration: 0.52, ease: [0.76, 0, 0.24, 1] }
                  }
                >
                  <Image
                    className={styles.documentaryImage}
                    data-fit={selectedDocumentary.fit}
                    src={selectedDocumentary.src}
                    alt={selectedCopy.alt}
                    width={selectedDocumentary.width}
                    height={selectedDocumentary.height}
                    sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), min(62vw, 980px)"
                    loading="lazy"
                    quality={88}
                    onLoad={() =>
                      setLoadedKeys((current) =>
                        current.includes(selectedKey)
                          ? current
                          : [...current, selectedKey],
                      )
                    }
                    onError={() =>
                      setFailedKeys((current) =>
                        current.includes(selectedKey)
                          ? current
                          : [...current, selectedKey],
                      )
                    }
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </div>

        <figcaption
          className={styles.documentaryCaption}
          aria-live="polite"
          aria-atomic="true"
        >
          <span>{selectedCopy.label}</span>
          <p>{selectedCopy.caption}</p>
        </figcaption>
      </figure>

      <div className={styles.selectorMeta}>
        <p>{copy.documentarySelectorLabel}</p>
        <span>
          {selectedCopy.index} /{" "}
          {String(RECOGNITION_DOCUMENTARY_IMAGES.length).padStart(2, "0")}
        </span>
      </div>

      <nav
        className={styles.documentarySelector}
        aria-label={copy.documentarySelectorLabel}
      >
        <ol>
          {RECOGNITION_DOCUMENTARY_IMAGES.map((documentary, index) => {
            const documentaryCopy = copy.documentaries[documentary.key];
            const selected = documentary.key === selectedKey;

            return (
              <li key={documentary.key}>
                <a
                  ref={(node) => {
                    linkRefs.current[index] = node;
                  }}
                  href={`?intro=0&recognition=${documentary.slug}#recognition`}
                  data-documentary-key={documentary.key}
                  data-selected={selected || undefined}
                  aria-current={selected ? "true" : undefined}
                  onClick={(event) =>
                    handleDocumentaryClick(event, documentary.key)
                  }
                  onKeyDown={(event) =>
                    handleDocumentaryKeyDown(event, documentary.key)
                  }
                >
                  <span>{documentaryCopy.index}</span>
                  <strong>{documentaryCopy.label}</strong>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </motion.div>
  );
}

export function RecognitionStage({
  copy,
  initialDocumentary,
  motionController,
}: RecognitionStageProps) {
  const primary = copy.records.vcareer;
  const primaryRecord = RECOGNITION_RECORDS[0];
  const supportingRecords = RECOGNITION_RECORDS.filter(
    (record) => record.key !== "vcareer",
  );

  return (
    <motion.section
      ref={motionController.stageRef}
      id="recognition"
      className={styles.stage}
      aria-labelledby="v2-recognition-title"
      data-recognition-static
      data-recognition-motion={motionController.mode}
      style={
        motionController.enabled ? motionController.styles.stage : undefined
      }
    >
      <motion.div
        className={styles.ambient}
        aria-hidden
        style={
          motionController.enabled ? motionController.styles.ambient : undefined
        }
      />
      <motion.div
        className={styles.threshold}
        aria-hidden
        style={
          motionController.enabled
            ? motionController.styles.threshold
            : undefined
        }
      />

      <div className={styles.inner}>
        <motion.header
          className={styles.header}
          style={
            motionController.enabled
              ? motionController.styles.header
              : undefined
          }
        >
          <p>{copy.eyebrow}</p>
          <h2 id="v2-recognition-title">{copy.title}</h2>
        </motion.header>

        <div className={styles.proofGrid}>
          <DocumentaryRegister
            copy={copy}
            initialDocumentary={initialDocumentary}
            motionController={motionController}
          />

          <motion.article
            className={styles.primaryProof}
            data-recognition-record="vcareer"
            data-emphasis="primary"
            style={
              motionController.enabled
                ? motionController.styles.primaryProof
                : undefined
            }
          >
            <div className={styles.primaryMeta}>
              <span>{primary.index}</span>
              <time dateTime={primaryRecord.dateTime}>{primary.date}</time>
            </div>
            <h3>{primary.project}</h3>
            <p className={styles.primaryResult}>{primary.result}</p>
            <p className={styles.primaryContext}>{primary.context}</p>
          </motion.article>
        </div>

        <motion.div
          className={styles.supporting}
          style={
            motionController.enabled
              ? motionController.styles.supportingRecords
              : undefined
          }
        >
          <p className={styles.supportingLabel}>{copy.supportingLabel}</p>
          <ol className={styles.records}>
            {supportingRecords.map((record) => {
              const recordCopy = copy.records[record.key];

              return (
                <li
                  key={record.key}
                  data-recognition-record={record.key}
                  data-emphasis={record.emphasis}
                >
                  <span className={styles.recordIndex}>{recordCopy.index}</span>
                  <strong className={styles.recordProject}>
                    {recordCopy.project}
                  </strong>
                  <p className={styles.recordResult}>{recordCopy.result}</p>
                  <p className={styles.recordContext}>{recordCopy.context}</p>
                  <time
                    className={styles.recordDate}
                    dateTime={record.dateTime}
                  >
                    {recordCopy.date}
                  </time>
                </li>
              );
            })}
          </ol>
        </motion.div>
      </div>
    </motion.section>
  );
}
