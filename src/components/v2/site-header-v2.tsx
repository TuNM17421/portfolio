"use client";

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
  wordmarkHidden: boolean;
};

export function SiteHeaderV2({
  copy,
  locale,
  wordmarkHidden,
}: SiteHeaderV2Props) {
  const wordmark = (
    <span className={styles.wordmarkText} data-wordmark-target>
      {copy.wordmark.split(" ").map((word, index) => (
        <span data-wordmark-target-word={index} key={`${word}-${index}`}>
          {word}
        </span>
      ))}
    </span>
  );

  return (
    <header className={styles.header}>
      <Link
        href="/v2"
        className={styles.wordmarkLink}
        data-wordmark-hidden={wordmarkHidden ? "true" : undefined}
        aria-label={`${copy.wordmark} — ${copy.homeLabel}`}
      >
        {wordmark}
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
