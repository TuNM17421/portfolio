import {
  CAPABILITY_DEFINITIONS,
  type CapabilityKey,
  type CapabilityProofKey,
} from "@/lib/v2/capabilities";
import styles from "./capability-ledger.module.css";

type CapabilityItemCopy = {
  index: string;
  title: string;
  description: string;
};

export type CapabilityLedgerCopy = {
  eyebrow: string;
  axis: string;
  title: string;
  summary: string;
  technologyLabel: string;
  evidenceLabel: string;
  proofAction: string;
  items: Record<CapabilityKey, CapabilityItemCopy>;
  proofs: Record<CapabilityProofKey, string>;
};

type CapabilityLedgerProps = {
  copy: CapabilityLedgerCopy;
  navigationOpen: boolean;
};

export function CapabilityLedger({
  copy,
  navigationOpen,
}: CapabilityLedgerProps) {
  return (
    <section
      id="skills"
      className={styles.capabilities}
      aria-labelledby="v2-capabilities-title"
      aria-hidden={navigationOpen || undefined}
      inert={navigationOpen}
      data-capabilities-static
    >
      <div className={styles.handoff} aria-hidden>
        <span className={styles.handoffStem} />
        <span className={styles.handoffNode} />
      </div>

      <div className={styles.sheet}>
        <div className={styles.inner}>
          <header className={styles.sectionRail}>
            <p>{copy.eyebrow}</p>
            <p>{copy.axis}</p>
          </header>

          <div className={styles.introduction}>
            <h2 id="v2-capabilities-title">{copy.title}</h2>
            <p>{copy.summary}</p>
          </div>

          <ol className={styles.ledger}>
            {CAPABILITY_DEFINITIONS.map((capability) => {
              const itemCopy = copy.items[capability.key];

              return (
                <li
                  key={capability.key}
                  className={styles.capability}
                  data-capability={capability.key}
                >
                  <div className={styles.route} aria-hidden>
                    <span className={styles.routeNode} />
                    <span className={styles.routeIndex}>{itemCopy.index}</span>
                  </div>

                  <div className={styles.identity}>
                    <h3>{itemCopy.title}</h3>
                    <p>{itemCopy.description}</p>
                  </div>

                  <div className={styles.technology}>
                    <p className={styles.columnLabel}>{copy.technologyLabel}</p>
                    <ul>
                      {capability.technologies.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.evidence}>
                    <p className={styles.columnLabel}>{copy.evidenceLabel}</p>
                    <ul>
                      {capability.proofs.map((proof) => {
                        const label = copy.proofs[proof.key];

                        return (
                          <li key={proof.key}>
                            <a
                              href={proof.href}
                              data-proof-target={proof.key}
                              aria-label={`${copy.proofAction}: ${label}`}
                            >
                              <span>{label}</span>
                              <span aria-hidden>↑</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
