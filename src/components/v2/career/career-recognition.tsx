"use client";

import { motion } from "motion/react";
import {
  CAREER_RECORDS,
  type CareerRecordKey,
  type RecognitionDocumentaryKey,
} from "@/lib/v2/career-recognition";
import styles from "./career-recognition.module.css";
import type { CareerTraceMotionController } from "./career-trace-motion";
import {
  RecognitionStage,
  type RecognitionStageCopy,
} from "./recognition-stage";
import type { RecognitionStageMotionController } from "./recognition-stage-motion";

type CareerRecordCopy = {
  index: string;
  period: string;
  title: string;
  organization: string;
  meta: string;
  description: string;
  responsibilities?: readonly string[];
  technology?: string;
};

export type CareerRecognitionCopy = {
  eyebrow: string;
  axis: string;
  title: string;
  summary: string;
  timelineLabel: string;
  responsibilitiesLabel: string;
  technologyLabel: string;
  records: Record<CareerRecordKey, CareerRecordCopy>;
  recognition: RecognitionStageCopy;
};

type CareerRecognitionProps = {
  copy: CareerRecognitionCopy;
  initialDocumentary: RecognitionDocumentaryKey | null;
  navigationOpen: boolean;
  onDocumentaryChange: (documentary: RecognitionDocumentaryKey) => void;
  recognitionStage: RecognitionStageMotionController;
  trace: CareerTraceMotionController;
};

export function CareerRecognition({
  copy,
  initialDocumentary,
  navigationOpen,
  onDocumentaryChange,
  recognitionStage,
  trace,
}: CareerRecognitionProps) {
  return (
    <section
      ref={trace.sectionRef}
      id="career"
      className={styles.career}
      aria-labelledby="v2-career-title"
      aria-hidden={navigationOpen || undefined}
      inert={navigationOpen}
      data-career-static
      data-career-motion={trace.mode}
      data-career-active={trace.enabled ? trace.activeRecord : undefined}
    >
      <div className={styles.handoff} aria-hidden>
        <motion.span
          className={styles.handoffStem}
          style={trace.enabled ? trace.styles.handoffStem : undefined}
        />
        <motion.span
          className={styles.handoffNode}
          style={trace.enabled ? trace.styles.handoffNode : undefined}
        />
        <motion.span
          className={styles.handoffTrack}
          style={trace.enabled ? trace.styles.handoffTrack : undefined}
        />
      </div>

      <div className={styles.sheet}>
        <header className={styles.sectionRail}>
          <p>{copy.eyebrow}</p>
          <p>{copy.axis}</p>
        </header>

        <div className={styles.introduction}>
          <h2 id="v2-career-title">{copy.title}</h2>
          <p>{copy.summary}</p>
        </div>

        <section
          ref={trace.timelineRef}
          className={styles.timeline}
          aria-labelledby="v2-career-timeline-title"
        >
          <header className={styles.timelineHeader}>
            <h3 id="v2-career-timeline-title">{copy.timelineLabel}</h3>
            <div className={styles.yearAxis} aria-hidden>
              <motion.span
                className={styles.yearAxisProgress}
                style={trace.enabled ? trace.styles.yearProgress : undefined}
              />
              <motion.span
                className={styles.yearAxisCursor}
                style={trace.enabled ? trace.styles.yearCursor : undefined}
              />
              <span className={styles.yearLabel} data-year-position="start">
                2019
              </span>
              <span className={styles.yearLabel} data-year-position="middle">
                2024
              </span>
              <span className={styles.yearLabel} data-year-position="end">
                2026
              </span>
            </div>
          </header>

          <div className={styles.careerRecordsShell}>
            <div className={styles.careerTraceRail} aria-hidden>
              <motion.span
                className={styles.careerTraceProgress}
                style={trace.enabled ? trace.styles.traceProgress : undefined}
              />
              <motion.span
                className={styles.careerTraceCursor}
                style={trace.enabled ? trace.styles.traceCursor : undefined}
              />
            </div>

            <ol className={styles.careerRecords}>
              {CAREER_RECORDS.map((record) => {
                const recordCopy = copy.records[record.key];

                return (
                  <motion.li
                    key={record.key}
                    className={styles.careerRecord}
                    data-career-record={record.key}
                    data-emphasis={record.emphasis}
                    data-period-start={record.start}
                    data-period-end={record.end}
                    data-active={
                      trace.enabled && trace.activeRecord === record.key
                        ? "true"
                        : undefined
                    }
                    style={
                      trace.enabled
                        ? trace.styles.records[record.key]
                        : undefined
                    }
                  >
                    <motion.span
                      className={styles.recordNode}
                      style={
                        trace.enabled
                          ? trace.styles.nodes[record.key]
                          : undefined
                      }
                      aria-hidden
                    />
                    <div className={styles.recordTime}>
                      <span>{recordCopy.index}</span>
                      <strong>{recordCopy.period}</strong>
                    </div>

                    <div className={styles.recordIdentity}>
                      <h4>{recordCopy.title}</h4>
                      <p>{recordCopy.organization}</p>
                      <span>{recordCopy.meta}</span>
                    </div>

                    <div className={styles.recordEvidence}>
                      <p className={styles.recordDescription}>
                        {recordCopy.description}
                      </p>

                      {recordCopy.responsibilities ? (
                        <div className={styles.responsibilities}>
                          <p>{copy.responsibilitiesLabel}</p>
                          <ol>
                            {recordCopy.responsibilities.map(
                              (responsibility, index) => (
                                <li key={responsibility}>
                                  <span aria-hidden>
                                    {String(index + 1).padStart(2, "0")}
                                  </span>
                                  <p>{responsibility}</p>
                                </li>
                              ),
                            )}
                          </ol>
                        </div>
                      ) : null}

                      {recordCopy.technology ? (
                        <p className={styles.technology}>
                          <span>{copy.technologyLabel}</span>
                          <strong>{recordCopy.technology}</strong>
                        </p>
                      ) : null}
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </section>
      </div>

      <RecognitionStage
        copy={copy.recognition}
        initialDocumentary={initialDocumentary}
        motionController={recognitionStage}
        onDocumentaryChange={onDocumentaryChange}
      />
    </section>
  );
}
