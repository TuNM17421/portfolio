import {
  CAPABILITY_DEFINITIONS,
  type CapabilityKey,
  type CapabilityProofKey,
} from "@/lib/v2/capabilities";
import { motion } from "motion/react";
import type { CapabilityRoutingMotionController } from "./capability-routing-motion";
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
  routing: CapabilityRoutingMotionController;
};

export function CapabilityLedger({
  copy,
  navigationOpen,
  routing,
}: CapabilityLedgerProps) {
  return (
    <section
      ref={routing.sectionRef}
      id="skills"
      className={styles.capabilities}
      aria-labelledby="v2-capabilities-title"
      aria-hidden={navigationOpen || undefined}
      inert={navigationOpen}
      data-capabilities-static
      data-capabilities-motion={routing.mode}
      data-capabilities-enhanced={routing.enabled ? "true" : undefined}
      data-capabilities-active={routing.activeCapability ?? undefined}
    >
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

          <div className={styles.ledgerFrame}>
            <motion.span
              className={styles.routeBus}
              aria-hidden
              style={routing.enabled ? routing.styles.routeBus : undefined}
            />
            <motion.span
              className={styles.routeCursor}
              aria-hidden
              style={routing.enabled ? routing.styles.routeCursor : undefined}
            />
            <ol ref={routing.ledgerRef} className={styles.ledger}>
              {CAPABILITY_DEFINITIONS.map((capability) => {
                const itemCopy = copy.items[capability.key];
                const lane = routing.styles.lanes[capability.key];

                return (
                  <li
                    ref={routing.rowRefs[capability.key]}
                    key={capability.key}
                    className={styles.capability}
                    data-capability={capability.key}
                    data-route-active={
                      routing.enabled &&
                      routing.activeCapability === capability.key
                        ? "true"
                        : undefined
                    }
                  >
                    <div className={styles.route} aria-hidden>
                      <motion.span
                        ref={routing.trackRefs[capability.key]}
                        className={styles.routeTrack}
                        data-route-track
                        style={routing.enabled ? lane.branch : undefined}
                      />
                      <motion.span
                        className={styles.routePacket}
                        style={routing.enabled ? lane.packet : undefined}
                      />
                      <motion.span
                        className={styles.routeNode}
                        style={routing.enabled ? lane.node : undefined}
                      />
                      <span className={styles.routeIndex}>
                        {itemCopy.index}
                      </span>
                    </div>

                    <div className={styles.identity}>
                      <h3>{itemCopy.title}</h3>
                      <p>{itemCopy.description}</p>
                    </div>

                    <div className={styles.technology}>
                      <p className={styles.columnLabel}>
                        {copy.technologyLabel}
                      </p>
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

          <div className={styles.convergence} aria-hidden>
            <motion.span
              className={styles.convergenceStem}
              style={
                routing.enabled ? routing.styles.convergenceStem : undefined
              }
            />
            <motion.span
              className={styles.convergenceTrack}
              style={
                routing.enabled ? routing.styles.convergenceTrack : undefined
              }
            />
            <motion.span
              className={styles.convergenceNode}
              style={
                routing.enabled ? routing.styles.convergenceNode : undefined
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
