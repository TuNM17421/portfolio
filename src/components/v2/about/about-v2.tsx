"use client";

import { motion } from "motion/react";
import type { AboutStoryController } from "./about-story";
import styles from "./about-v2.module.css";

export type AboutV2Copy = {
  eyebrow: string;
  foundationLabel: string;
  foundationPrefix: string;
  foundationAnchor: string;
  foundationSuffix: string;
  extension: string;
  foundationBody: string;
  principleLabel: string;
  principle: string;
  principleBody: string;
  processLabel: string;
  process: [string, string, string, string];
  closingLabel: string;
  closing: string;
};

type AboutV2Props = {
  copy: AboutV2Copy;
  navigationOpen: boolean;
  story: AboutStoryController;
};

export function AboutV2({ copy, navigationOpen, story }: AboutV2Props) {
  const motionStyle = <T extends keyof AboutStoryController["styles"]>(
    key: T,
  ) => (story.enabled ? story.styles[key] : undefined);

  return (
    <section
      ref={story.sectionRef}
      id="about"
      className={styles.about}
      aria-labelledby="v2-about-title"
      aria-hidden={navigationOpen || undefined}
      inert={navigationOpen}
      data-about-static
      data-about-story={story.mode}
    >
      <div className={styles.sheet}>
        <header className={styles.sectionRail}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
        </header>

        <div className={styles.storyGrid}>
          <div className={styles.signalSpine} aria-hidden>
            <span className={styles.signalOrigin} />
            <motion.span
              className={styles.signalLine}
              style={motionStyle("signalLine")}
              data-about-signal-line
            />
            <motion.span
              className={styles.signalCursor}
              style={motionStyle("signalCursor")}
              data-about-signal-cursor
            />
            <motion.span
              className={styles.signalNodeOne}
              style={motionStyle("signalNodeOne")}
            />
            <motion.span
              className={styles.signalNodeTwo}
              style={motionStyle("signalNodeTwo")}
            />
            <motion.span
              className={styles.signalTerminal}
              style={motionStyle("signalTerminal")}
            />
          </div>

          <div className={styles.story}>
            <motion.article
              className={styles.foundationBlock}
              style={motionStyle("foundationFrame")}
              data-about-foundation-frame
            >
              <p className={styles.metaLabel}>{copy.foundationLabel}</p>
              <h2 id="v2-about-title" className={styles.foundationHeading}>
                <motion.span
                  className={styles.foundationClaim}
                  style={motionStyle("foundationClaim")}
                  data-about-foundation-claim
                >
                  <span className={styles.foundationPrefix}>
                    {copy.foundationPrefix}
                  </span>
                  {" "}
                  <span className={styles.backendAnchor} data-about-backend>
                    {copy.foundationAnchor}
                  </span>
                  <span>{copy.foundationSuffix}</span>
                </motion.span>
                {" "}
                <motion.span
                  className={styles.extensionClaim}
                  style={motionStyle("extensionClaim")}
                  data-about-extension-claim
                >
                  {copy.extension}
                </motion.span>
              </h2>
              <motion.p
                className={styles.foundationBody}
                style={motionStyle("foundationBody")}
                data-about-foundation-body
              >
                {copy.foundationBody}
              </motion.p>
            </motion.article>

            <motion.article
              className={styles.principleBlock}
              style={motionStyle("principleFrame")}
              data-about-principle-frame
            >
              <div className={styles.principleHeadingGroup}>
                <p className={styles.metaLabel}>{copy.principleLabel}</p>
                <motion.h3
                  className={styles.principleHeading}
                  style={motionStyle("principleHeading")}
                  data-about-principle-heading
                >
                  {copy.principle}
                </motion.h3>
              </div>
              <motion.p
                className={styles.principleBody}
                style={motionStyle("principleBody")}
              >
                {copy.principleBody}
              </motion.p>
            </motion.article>

            <motion.div
              className={styles.processBlock}
              style={motionStyle("process")}
              data-about-process
            >
              <p className={styles.metaLabel}>{copy.processLabel}</p>
              <ol className={styles.processList}>
                {copy.process.map((step, index) => (
                  <li key={step}>
                    <span className={styles.processIndex} aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>

            <motion.div
              className={styles.closingBlock}
              style={motionStyle("closing")}
              data-about-closing
            >
              <p className={styles.metaLabel}>{copy.closingLabel}</p>
              <p className={styles.closingStatement}>{copy.closing}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
