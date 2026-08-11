"use client";

import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import styles from "./site-header-v2.module.css";

export type SiteHeaderV2Copy = {
  wordmark: string;
  homeLabel: string;
  navigationLabel: string;
  vcareer: string;
  contact: string;
  localeLabel: string;
};

type SiteHeaderV2Props = {
  copy: SiteHeaderV2Copy;
  locale: "vi" | "en";
  reduceMotion: boolean;
  sharedWordmarkIsActive: boolean;
};

export function SiteHeaderV2({
  copy,
  locale,
  reduceMotion,
  sharedWordmarkIsActive,
}: SiteHeaderV2Props) {
  const wordmark = (
    <span className={styles.wordmarkText}>{copy.wordmark}</span>
  );

  return (
    <header className={styles.header}>
      <Link
        href="/v2"
        className={styles.wordmarkLink}
        aria-label={`${copy.wordmark} — ${copy.homeLabel}`}
      >
        {sharedWordmarkIsActive && !reduceMotion ? (
          <motion.span
            layoutId="v2-wordmark"
            className={styles.wordmarkMotion}
            transition={{
              layout: {
                duration: 0.86,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
          >
            {wordmark}
          </motion.span>
        ) : (
          wordmark
        )}
      </Link>

      <div className={styles.headerActions}>
        <nav className={styles.primaryNav} aria-label={copy.navigationLabel}>
          <Link href="/projects/vcareer" className={styles.navLink}>
            {copy.vcareer}
          </Link>
          <a href="mailto:tunm17421@gmail.com" className={styles.navLink}>
            {copy.contact}
          </a>
        </nav>

        <div className={styles.localeSwitch} aria-label={copy.localeLabel}>
          {locale === "vi" ? (
            <span className={styles.activeLocale} aria-current="page">
              VI
            </span>
          ) : (
            <Link href="/v2" locale="vi" className={styles.localeLink}>
              VI
            </Link>
          )}
          <span className={styles.localeDivider} aria-hidden>
            /
          </span>
          {locale === "en" ? (
            <span className={styles.activeLocale} aria-current="page">
              EN
            </span>
          ) : (
            <Link href="/v2" locale="en" className={styles.localeLink}>
              EN
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
