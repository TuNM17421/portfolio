"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import {
  RECOGNITION_DOCUMENTARY_IMAGE,
  RECOGNITION_RECORDS,
  type RecognitionImageReviewState,
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

export type RecognitionStageCopy = {
  eyebrow: string;
  title: string;
  documentaryLabel: string;
  documentaryCaption: string;
  documentaryAlt: string;
  imageLoading: string;
  imageUnavailable: string;
  supportingLabel: string;
  records: Record<RecognitionRecordKey, RecognitionRecordCopy>;
};

type RecognitionStageProps = {
  copy: RecognitionStageCopy;
  imageReviewState: RecognitionImageReviewState;
  motionController: RecognitionStageMotionController;
};

type DocumentaryRuntimeState = "loading" | "ready" | "error";

function DocumentaryImage({
  copy,
  reviewState,
  motionController,
}: {
  copy: RecognitionStageCopy;
  reviewState: RecognitionImageReviewState;
  motionController: RecognitionStageMotionController;
}) {
  const [runtimeState, setRuntimeState] =
    useState<DocumentaryRuntimeState>("loading");
  const imageState = reviewState === "auto" ? runtimeState : reviewState;
  const imageFailed = imageState === "error";
  const renderImage = reviewState === "auto" && runtimeState !== "error";

  return (
    <motion.figure
      className={styles.documentary}
      style={
        motionController.enabled ? motionController.styles.document : undefined
      }
    >
      <div
        className={styles.imageFrame}
        data-image-state={imageState}
        aria-busy={imageState === "loading" || undefined}
      >
        <div
          className={styles.imageFallback}
          role={imageFailed ? "img" : undefined}
          aria-label={
            imageFailed
              ? `${copy.imageUnavailable}: ${copy.documentaryLabel}`
              : undefined
          }
          aria-hidden={imageFailed ? undefined : true}
        >
          <span aria-hidden>06:C</span>
          <strong>{copy.documentaryLabel}</strong>
          <p>{imageFailed ? copy.imageUnavailable : copy.imageLoading}</p>
        </div>

        {renderImage ? (
          <motion.div
            className={styles.imageSurface}
            style={
              motionController.enabled
                ? motionController.styles.image
                : undefined
            }
          >
            <Image
              className={styles.documentaryImage}
              src={RECOGNITION_DOCUMENTARY_IMAGE.src}
              alt={copy.documentaryAlt}
              width={RECOGNITION_DOCUMENTARY_IMAGE.width}
              height={RECOGNITION_DOCUMENTARY_IMAGE.height}
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), min(62vw, 980px)"
              loading="lazy"
              quality={88}
              onLoad={() => setRuntimeState("ready")}
              onError={() => setRuntimeState("error")}
            />
          </motion.div>
        ) : null}
      </div>

      <figcaption className={styles.documentaryCaption}>
        <span>{copy.documentaryLabel}</span>
        <p>{copy.documentaryCaption}</p>
      </figcaption>
    </motion.figure>
  );
}

export function RecognitionStage({
  copy,
  imageReviewState,
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
      data-recognition-image-review={imageReviewState}
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
          <DocumentaryImage
            copy={copy}
            reviewState={imageReviewState}
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
