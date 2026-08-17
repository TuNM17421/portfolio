"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
} from "motion/react";
import { usePrefersReducedMotion } from "@/lib/v2/use-prefers-reduced-motion";
import styles from "./vcareer-case-study.module.css";

type ArchitectureNode = {
  body: string;
  title: string;
};

type ArchitectureTraceProps = {
  application: ArchitectureNode;
  browser: ArchitectureNode;
  deployment: {
    current: ArchitectureNode;
    pending: ArchitectureNode;
    title: string;
  };
  labels: {
    context: string;
    current: string;
    direct: string;
    path: string;
    pending: string;
  };
  report: {
    body: string;
    href?: string;
    label: string;
    linkLabel: string;
    newWindowLabel: string;
  };
  realtime: ArchitectureNode;
  storage: ArchitectureNode;
  workflows: {
    builder: ArchitectureNode;
    matching: ArchitectureNode;
    title: string;
  };
};

type TraceNodeProps = {
  body: string;
  index: string;
  label: string;
  side: "left" | "right";
  title: string;
  tone: "context" | "current" | "direct" | "pending";
};

const ACTIVE_SPRING = {
  stiffness: 126,
  damping: 30,
  mass: 0.28,
  restDelta: 0.001,
};

export function ArchitectureTrace({
  application,
  browser,
  deployment,
  labels,
  report,
  realtime,
  storage,
  workflows,
}: ArchitectureTraceProps) {
  const traceRef = useRef<HTMLDivElement>(null);
  const [hydrated, setHydrated] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: traceRef,
    offset: ["start 82%", "end 30%"],
  });
  const progress = useSpring(scrollYProgress, ACTIVE_SPRING);
  const spineScale = useTransform(progress, [0.02, 0.94], [0, 1]);
  const browserBranch = useTransform(progress, [0.04, 0.17], [0, 1]);
  const realtimeBranch = useTransform(progress, [0.18, 0.32], [0, 1]);
  const workflowBranch = useTransform(progress, [0.34, 0.54], [0, 1]);
  const storageBranch = useTransform(progress, [0.56, 0.7], [0, 1]);
  const deploymentBranch = useTransform(progress, [0.72, 0.92], [0, 1]);
  const markerOne = useTransform(progress, [0.04, 0.1], [0.72, 1]);
  const markerTwo = useTransform(progress, [0.2, 0.27], [0.72, 1]);
  const markerThree = useTransform(progress, [0.38, 0.46], [0.72, 1]);
  const markerFour = useTransform(progress, [0.58, 0.65], [0.72, 1]);
  const markerFive = useTransform(progress, [0.76, 0.84], [0.72, 1]);

  useEffect(() => setHydrated(true), []);

  const active = hydrated && !reduceMotion;
  const branchStyle = (
    scaleX: typeof browserBranch,
  ): MotionStyle | undefined => (active ? { scaleX } : undefined);
  const markerStyle = (scale: typeof markerOne): MotionStyle | undefined =>
    active ? { scale } : undefined;

  return (
    <div
      ref={traceRef}
      className={styles.architectureTrace}
      data-architecture-motion={active ? "active" : "static"}
    >
      <header className={styles.architectureLegend}>
        <p>{labels.path}</p>
        <ul aria-label={labels.path}>
          <li>
            <span className={styles.contextLegendMark} aria-hidden />
            {labels.context}
          </li>
          <li>
            <span className={styles.directLegendMark} aria-hidden />
            {labels.direct}
          </li>
          <li>
            <span className={styles.currentLegendMark} aria-hidden />
            {labels.current}
          </li>
          <li>
            <span className={styles.pendingLegendMark} aria-hidden />
            {labels.pending}
          </li>
        </ul>
      </header>

      <div className={styles.architectureRoute}>
        <span className={styles.architectureSpineBase} aria-hidden />
        <motion.span
          className={styles.architectureSpineProgress}
          aria-hidden
          style={active ? { scaleY: spineScale } : undefined}
        />

        <ol className={styles.architectureStages}>
          <li className={styles.architectureStage}>
            <TraceNode
              body={browser.body}
              index="01"
              label={labels.context}
              side="left"
              title={browser.title}
              tone="context"
            />
            <motion.span
              className={`${styles.architectureBranch} ${styles.branchLeft}`}
              aria-hidden
              style={branchStyle(browserBranch)}
            />
            <Marker tone="context" style={markerStyle(markerOne)} />
          </li>

          <li className={styles.architectureStage}>
            <TraceNode
              body={realtime.body}
              index="02"
              label={labels.direct}
              side="right"
              title={realtime.title}
              tone="direct"
            />
            <motion.span
              className={`${styles.architectureBranch} ${styles.branchRight}`}
              aria-hidden
              style={branchStyle(realtimeBranch)}
            />
            <Marker tone="direct" style={markerStyle(markerTwo)} />
          </li>

          <li className={`${styles.architectureStage} ${styles.workflowStage}`}>
            <TraceNode
              body={application.body}
              index="03A"
              label={labels.context}
              side="left"
              title={application.title}
              tone="context"
            />
            <section
              className={`${styles.traceNode} ${styles.traceNodeRight} ${styles.directNode} ${styles.workflowNode}`}
              aria-labelledby="case-system-workflows"
            >
              <p className={styles.traceNodeMeta}>
                <span>03B</span>
                <span>{labels.direct}</span>
              </p>
              <h3 id="case-system-workflows">{workflows.title}</h3>
              <div className={styles.workflowList}>
                <article>
                  <h4>{workflows.matching.title}</h4>
                  <p>{workflows.matching.body}</p>
                </article>
                <article>
                  <h4>{workflows.builder.title}</h4>
                  <p>{workflows.builder.body}</p>
                </article>
              </div>
            </section>
            <motion.span
              className={`${styles.architectureBranch} ${styles.branchBoth}`}
              aria-hidden
              style={branchStyle(workflowBranch)}
            />
            <Marker tone="direct" style={markerStyle(markerThree)} />
          </li>

          <li className={styles.architectureStage}>
            <TraceNode
              body={storage.body}
              index="04"
              label={labels.context}
              side="left"
              title={storage.title}
              tone="context"
            />
            <motion.span
              className={`${styles.architectureBranch} ${styles.branchLeft}`}
              aria-hidden
              style={branchStyle(storageBranch)}
            />
            <Marker tone="context" style={markerStyle(markerFour)} />
          </li>

          <li
            className={`${styles.architectureStage} ${styles.deploymentStage}`}
          >
            <p className={styles.deploymentLabel}>{deployment.title}</p>
            <TraceNode
              body={deployment.current.body}
              index="05A"
              label={labels.current}
              side="left"
              title={deployment.current.title}
              tone="current"
            />
            <TraceNode
              body={deployment.pending.body}
              index="05B"
              label={labels.pending}
              side="right"
              title={deployment.pending.title}
              tone="pending"
            />
            <motion.span
              className={`${styles.architectureBranch} ${styles.branchBoth} ${styles.deploymentBranch}`}
              aria-hidden
              style={branchStyle(deploymentBranch)}
            />
            <Marker tone="current" style={markerStyle(markerFive)} />
          </li>
        </ol>
      </div>

      <aside className={styles.architectureReport}>
        <div>
          <p>{report.label}</p>
          <p>{report.body}</p>
        </div>
        {report.href ? (
          <a href={report.href} target="_blank" rel="noopener noreferrer">
            <span>{report.linkLabel}</span>
            <span aria-hidden>↗</span>
            <span className={styles.visuallyHidden}>
              {report.newWindowLabel}
            </span>
          </a>
        ) : null}
      </aside>
    </div>
  );
}

function TraceNode({ body, index, label, side, title, tone }: TraceNodeProps) {
  return (
    <article
      className={`${styles.traceNode} ${
        side === "left" ? styles.traceNodeLeft : styles.traceNodeRight
      } ${styles[`${tone}Node`]}`}
    >
      <p className={styles.traceNodeMeta}>
        <span>{index}</span>
        <span>{label}</span>
      </p>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function Marker({
  style,
  tone,
}: {
  style?: MotionStyle;
  tone: TraceNodeProps["tone"];
}) {
  return (
    <span className={styles.architectureMarker} aria-hidden>
      <motion.span
        className={`${styles.architectureMarkerCore} ${styles[`${tone}Marker`]}`}
        style={style}
      />
    </span>
  );
}
