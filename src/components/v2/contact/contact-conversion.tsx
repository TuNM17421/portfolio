"use client";

import { motion } from "motion/react";
import type { ContactReviewState } from "@/lib/v2/contact-form";
import { V2_CONTACT_DESTINATIONS } from "@/lib/v2/contact-conversion";
import type { ContactConversionMotionController } from "./contact-conversion-motion";
import { ContactFooter, type ContactFooterCopy } from "./contact-footer";
import { ContactForm, type ContactFormCopy } from "./contact-form";
import styles from "./contact-conversion.module.css";

export type ContactConversionCopy = {
  eyebrow: string;
  axis: string;
  title: string;
  body: string;
  primaryLabel: string;
  emailAction: string;
  secondaryLabel: string;
  downloadCv: string;
  github: string;
  linkedin: string;
  opensNewTab: string;
  form: ContactFormCopy;
  footer: ContactFooterCopy;
};

type ContactConversionProps = {
  copy: ContactConversionCopy;
  navigationOpen: boolean;
  reduceMotion: boolean;
  deliveryEnabled: boolean;
  reviewState: ContactReviewState | null;
  motionController: ContactConversionMotionController;
};

export function ContactConversion({
  copy,
  navigationOpen,
  reduceMotion,
  deliveryEnabled,
  reviewState,
  motionController,
}: ContactConversionProps) {
  const destinations = V2_CONTACT_DESTINATIONS;

  return (
    <section
      ref={motionController.sectionRef}
      id="contact"
      className={styles.contact}
      aria-labelledby="v2-contact-title"
      aria-hidden={navigationOpen || undefined}
      inert={navigationOpen}
      data-contact-conversion
      data-contact-motion={motionController.mode}
      data-contact-enhanced={motionController.enabled ? "true" : undefined}
    >
      <div className={styles.field}>
        <div className={styles.inner}>
          <header className={styles.sectionRail}>
            <p>{copy.eyebrow}</p>
            <p>{copy.axis}</p>
          </header>

          <div className={styles.introduction}>
            <h2 id="v2-contact-title">{copy.title}</h2>
            <p>{copy.body}</p>
          </div>

          <div className={styles.emailStage}>
            <p className={styles.primaryLabel}>{copy.primaryLabel}</p>
            <a
              className={styles.emailLink}
              href={destinations.emailHref}
              aria-label={`${copy.emailAction}: ${destinations.email}`}
              data-contact-primary
            >
              <span className={styles.emailText} aria-hidden>
                <span className={styles.emailLocal}>tunm17421</span>
                <span className={styles.emailAt}>@</span>
                <span className={styles.emailDomain}>gmail.com</span>
              </span>
            </a>
            <motion.span
              className={styles.emailBaseline}
              aria-hidden
              style={
                motionController.enabled
                  ? motionController.styles.emailBaseline
                  : undefined
              }
            />
            <motion.span
              className={styles.emailNode}
              aria-hidden
              style={
                motionController.enabled
                  ? motionController.styles.emailNode
                  : undefined
              }
            />
          </div>

          <div className={styles.secondaryRoutes}>
            <p className={styles.secondaryLabel}>{copy.secondaryLabel}</p>
            <nav aria-label={copy.secondaryLabel}>
              <a
                href={destinations.cvHref}
                download={destinations.cvDownloadName}
                data-contact-cv
              >
                <span>{copy.downloadCv}</span>
                <span aria-hidden>↓</span>
              </a>
              <a
                href={destinations.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${copy.github}. ${copy.opensNewTab}`}
              >
                <span>{copy.github}</span>
                <span aria-hidden>↗</span>
              </a>
              <a
                href={destinations.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${copy.linkedin}. ${copy.opensNewTab}`}
              >
                <span>{copy.linkedin}</span>
                <span aria-hidden>↗</span>
              </a>
            </nav>
          </div>

          <ContactForm
            copy={copy.form}
            deliveryEnabled={deliveryEnabled}
            reviewState={reviewState}
          />

          <ContactFooter copy={copy.footer} reduceMotion={reduceMotion} />
        </div>
      </div>
    </section>
  );
}
