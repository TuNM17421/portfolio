import styles from "./about-v2.module.css";

export type AboutV2Copy = {
  eyebrow: string;
  axis: string;
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
};

export function AboutV2({ copy, navigationOpen }: AboutV2Props) {
  return (
    <section
      id="about"
      className={styles.about}
      aria-labelledby="v2-about-title"
      aria-hidden={navigationOpen || undefined}
      inert={navigationOpen}
      data-about-static
    >
      <div className={styles.sheet}>
        <header className={styles.sectionRail}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <p className={styles.axis}>{copy.axis}</p>
        </header>

        <div className={styles.storyGrid}>
          <div className={styles.signalSpine} aria-hidden>
            <span className={styles.signalOrigin} />
            <span className={styles.signalLine} />
            <span className={styles.signalNodeOne} />
            <span className={styles.signalNodeTwo} />
            <span className={styles.signalTerminal} />
          </div>

          <div className={styles.story}>
            <article className={styles.foundationBlock}>
              <p className={styles.metaLabel}>{copy.foundationLabel}</p>
              <h2 id="v2-about-title" className={styles.foundationHeading}>
                <span className={styles.foundationClaim}>
                  <span>{copy.foundationPrefix} </span>
                  <span className={styles.backendAnchor} data-about-backend>
                    {copy.foundationAnchor}
                  </span>
                  <span>{copy.foundationSuffix}</span>
                </span>
                {" "}
                <span className={styles.extensionClaim}>{copy.extension}</span>
              </h2>
              <p className={styles.foundationBody}>{copy.foundationBody}</p>
            </article>

            <article className={styles.principleBlock}>
              <div className={styles.principleHeadingGroup}>
                <p className={styles.metaLabel}>{copy.principleLabel}</p>
                <h3 className={styles.principleHeading}>{copy.principle}</h3>
              </div>
              <p className={styles.principleBody}>{copy.principleBody}</p>
            </article>

            <div className={styles.processBlock}>
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
            </div>

            <div className={styles.closingBlock}>
              <p className={styles.metaLabel}>{copy.closingLabel}</p>
              <p className={styles.closingStatement}>{copy.closing}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
