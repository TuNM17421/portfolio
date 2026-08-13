"use client";

import { useEffect } from "react";
import {
  CAREER_RECORDS,
  RECOGNITION_RECORDS,
  type CareerRecordKey,
  type RecognitionRecordKey,
} from "@/lib/v2/career-recognition";
import styles from "./career-recognition.module.css";

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

type RecognitionRecordCopy = {
  index: string;
  project: string;
  result: string;
  context: string;
  date: string;
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
  recognition: {
    eyebrow: string;
    title: string;
    records: Record<RecognitionRecordKey, RecognitionRecordCopy>;
  };
};

type CareerRecognitionProps = {
  copy: CareerRecognitionCopy;
  navigationOpen: boolean;
};

export function CareerRecognition({
  copy,
  navigationOpen,
}: CareerRecognitionProps) {
  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (targetId !== "career" && targetId !== "recognition") return;

    let cancelled = false;
    let userMoved = false;
    const frames = new Set<number>();
    const target = document.getElementById(targetId);
    if (!target) return;

    const markUserMovement = () => {
      userMoved = true;
    };

    const jumpToTarget = (force = false) => {
      if (cancelled || (userMoved && !force)) return;

      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      target.scrollIntoView({ block: "start" });
      root.style.scrollBehavior = previousScrollBehavior;
    };

    const scheduleJump = (force = false) => {
      const firstFrame = window.requestAnimationFrame(() => {
        frames.delete(firstFrame);
        const secondFrame = window.requestAnimationFrame(() => {
          frames.delete(secondFrame);
          jumpToTarget(force);
        });
        frames.add(secondFrame);
      });
      frames.add(firstFrame);
    };
    const handleWindowLoad = () => scheduleJump();

    scheduleJump(true);
    document.fonts.ready.then(() => scheduleJump());
    window.addEventListener("load", handleWindowLoad, { once: true });
    window.addEventListener("wheel", markUserMovement, { passive: true });
    window.addEventListener("touchstart", markUserMovement, { passive: true });
    window.addEventListener("keydown", markUserMovement);
    const settleTimer = window.setTimeout(() => jumpToTarget(), 720);

    return () => {
      cancelled = true;
      frames.forEach((frame) => window.cancelAnimationFrame(frame));
      window.clearTimeout(settleTimer);
      window.removeEventListener("load", handleWindowLoad);
      window.removeEventListener("wheel", markUserMovement);
      window.removeEventListener("touchstart", markUserMovement);
      window.removeEventListener("keydown", markUserMovement);
    };
  }, []);

  return (
    <section
      id="career"
      className={styles.career}
      aria-labelledby="v2-career-title"
      aria-hidden={navigationOpen || undefined}
      inert={navigationOpen}
      data-career-static
    >
      <div className={styles.handoff} aria-hidden>
        <span className={styles.handoffStem} />
        <span className={styles.handoffNode} />
        <span className={styles.handoffTrack} />
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
          className={styles.timeline}
          aria-labelledby="v2-career-timeline-title"
        >
          <header className={styles.timelineHeader}>
            <h3 id="v2-career-timeline-title">{copy.timelineLabel}</h3>
            <div className={styles.yearAxis} aria-hidden>
              <span>2019</span>
              <span>2024</span>
              <span>2026</span>
            </div>
          </header>

          <ol className={styles.careerRecords}>
            {CAREER_RECORDS.map((record) => {
              const recordCopy = copy.records[record.key];

              return (
                <li
                  key={record.key}
                  className={styles.careerRecord}
                  data-career-record={record.key}
                  data-emphasis={record.emphasis}
                  data-period-start={record.start}
                  data-period-end={record.end}
                >
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
                          {recordCopy.responsibilities.map((responsibility, index) => (
                            <li key={responsibility}>
                              <span aria-hidden>
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <p>{responsibility}</p>
                            </li>
                          ))}
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
                </li>
              );
            })}
          </ol>
        </section>

        <section
          id="recognition"
          className={styles.recognition}
          aria-labelledby="v2-recognition-title"
          data-recognition-static
        >
          <header className={styles.recognitionHeader}>
            <p>{copy.recognition.eyebrow}</p>
            <h2 id="v2-recognition-title">{copy.recognition.title}</h2>
          </header>

          <ol className={styles.recognitionRecords}>
            {RECOGNITION_RECORDS.map((record) => {
              const recordCopy = copy.recognition.records[record.key];

              return (
                <li
                  key={record.key}
                  data-recognition-record={record.key}
                  data-emphasis={record.emphasis}
                >
                  <span className={styles.recognitionIndex}>
                    {recordCopy.index}
                  </span>
                  <strong className={styles.recognitionProject}>
                    {recordCopy.project}
                  </strong>
                  <p className={styles.recognitionResult}>{recordCopy.result}</p>
                  <p className={styles.recognitionContext}>
                    {recordCopy.context}
                  </p>
                  <time className={styles.recognitionDate}>
                    {recordCopy.date}
                  </time>
                </li>
              );
            })}
          </ol>
        </section>
      </div>
    </section>
  );
}
