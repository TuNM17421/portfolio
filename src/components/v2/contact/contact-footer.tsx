"use client";

import type { MouseEvent } from "react";
import styles from "./contact-footer.module.css";

export type ContactFooterCopy = {
  backToTop: string;
  copyright: string;
};

type ContactFooterProps = {
  copy: ContactFooterCopy;
  reduceMotion: boolean;
};

export function ContactFooter({ copy, reduceMotion }: ContactFooterProps) {
  function handleBackToTop(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const target = document.getElementById("top");
    if (!target) return;

    window.history.replaceState(window.history.state, "", "#top");
    target.focus({ preventScroll: true });
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <footer className={styles.footer} data-v2-footer>
      <div className={styles.utilityRail}>
        <p className={styles.copyright}>{copy.copyright}</p>
        <a
          className={styles.backToTop}
          href="#top"
          onClick={handleBackToTop}
          data-back-to-top
        >
          <span>{copy.backToTop}</span>
          <span className={styles.returnArrow} aria-hidden>
            ↑
          </span>
        </a>
      </div>
    </footer>
  );
}
