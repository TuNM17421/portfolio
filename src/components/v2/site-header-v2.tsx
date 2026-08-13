"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import type { V2ChapterTone } from "@/components/v2/chapter-tone";
import styles from "./site-header-v2.module.css";

export type SiteHeaderV2Copy = {
  wordmark: string;
  homeLabel: string;
  navigationLabel: string;
  work: string;
  workProof: string;
  career: string;
  careerProof: string;
  contact: string;
  localeLabel: string;
  openMenu: string;
  closeMenu: string;
};

type SiteHeaderV2Props = {
  copy: SiteHeaderV2Copy;
  locale: "vi" | "en";
  introQuery: string;
  holdQuery: string;
  portraitQuery: string;
  showcaseQuery: string;
  storyQuery: string;
  workQuery: string;
  careerQuery: string;
  recognitionQuery: string;
  reduceMotion: boolean;
  wordmarkHidden: boolean;
  chapterTone: V2ChapterTone;
  onMenuOpenChange: (open: boolean) => void;
};

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function SiteHeaderV2({
  copy,
  locale,
  introQuery,
  holdQuery,
  portraitQuery,
  showcaseQuery,
  storyQuery,
  workQuery,
  careerQuery,
  recognitionQuery,
  reduceMotion,
  wordmarkHidden,
  chapterTone,
  onMenuOpenChange,
}: SiteHeaderV2Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const workMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const careerMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const localeParams = new URLSearchParams();
  if (introQuery) localeParams.set("intro", introQuery);
  if (holdQuery) localeParams.set("hold", holdQuery);
  if (portraitQuery) localeParams.set("portrait", portraitQuery);
  if (showcaseQuery) localeParams.set("showcase", showcaseQuery);
  if (storyQuery) localeParams.set("story", storyQuery);
  if (workQuery) localeParams.set("work", workQuery);
  if (careerQuery) localeParams.set("career", careerQuery);
  if (recognitionQuery) localeParams.set("recognition", recognitionQuery);
  const localeQuery = localeParams.toString();
  const activeChapterHash =
    chapterTone.activeChapter === "hero"
      ? ""
      : `#${chapterTone.activeChapter}`;
  const localeHash = recognitionQuery
    ? "#recognition"
    : careerQuery
      ? "#career"
      : workQuery
        ? "#work"
        : showcaseQuery
          ? "#vcareer"
          : storyQuery
            ? "#about"
            : activeChapterHash;
  const localeHref = localeQuery
    ? `/v2?${localeQuery}${localeHash}`
    : `/v2${localeHash}`;

  const closeMenu = useCallback((restoreFocus = true) => {
    setMenuOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  }, []);

  const goToSection = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      event.preventDefault();
      window.history.replaceState(null, "", `#${targetId}`);
      const target = document.getElementById(targetId);
      closeMenu(false);
      window.requestAnimationFrame(() => {
        target?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    },
    [closeMenu, reduceMotion],
  );

  useEffect(() => {
    onMenuOpenChange(menuOpen);
  }, [menuOpen, onMenuOpenChange]);

  useEffect(
    () => () => {
      onMenuOpenChange(false);
    },
    [onMenuOpenChange],
  );

  useEffect(() => {
    let frame = 0;

    const updateCondensedState = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setCondensed(window.scrollY > 32);
      });
    };

    updateCondensedState();
    window.addEventListener("scroll", updateCondensedState, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateCondensedState);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarGap =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarGap > 0) body.style.paddingRight = `${scrollbarGap}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const header = headerRef.current;
    const focusFrame = window.requestAnimationFrame(() => {
      const initialLink =
        chapterTone.activeNavigation === "career"
          ? careerMenuLinkRef.current
          : workMenuLinkRef.current;
      initialLink?.focus();
    });

    const getFocusableElements = () =>
      Array.from(
        header?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [],
      ).filter(
        (element) =>
          element.getClientRects().length > 0 &&
          element.getAttribute("aria-hidden") !== "true",
      );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [chapterTone.activeNavigation, closeMenu, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const desktopQuery = window.matchMedia("(min-width: 900px)");
    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu(false);
    };

    desktopQuery.addEventListener("change", handleViewportChange);
    return () =>
      desktopQuery.removeEventListener("change", handleViewportChange);
  }, [closeMenu, menuOpen]);

  const wordmark = (
    <span className={styles.wordmarkText} data-wordmark-target>
      {copy.wordmark.split(" ").map((word, index, words) => (
        <Fragment key={`${word}-${index}`}>
          <span data-wordmark-target-word={index}>{word}</span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );

  const overlayTransition = reduceMotion
    ? { duration: 0.14, ease: "linear" as const }
    : { duration: 0.52, ease: [0.65, 0, 0.35, 1] as const };
  const overlayInitial = reduceMotion
    ? { opacity: 0 }
    : { clipPath: "inset(0 0 100% 0)" };
  const overlayAnimate = reduceMotion
    ? { opacity: 1 }
    : { clipPath: "inset(0 0 0% 0)" };
  const overlayExit = reduceMotion
    ? { opacity: 0 }
    : { clipPath: "inset(100% 0 0 0)" };

  return (
    <motion.div
      ref={headerRef}
      className={styles.header}
      style={chapterTone.header}
      data-v2-header
      data-active-chapter={chapterTone.activeChapter}
      data-condensed={condensed && !menuOpen ? "true" : undefined}
      data-menu-open={menuOpen ? "true" : undefined}
      data-reduced-motion={reduceMotion ? "true" : undefined}
      role={menuOpen ? "dialog" : undefined}
      aria-modal={menuOpen ? true : undefined}
      aria-labelledby={menuOpen ? "v2-mobile-nav-title" : undefined}
    >
      <div className={styles.headerRail} data-v2-header-rail>
        <motion.div
          className={styles.chapterTone}
          style={chapterTone.layer}
          data-v2-chapter-tone
          aria-hidden
        />
        <Link
          href="/v2"
          className={styles.wordmarkLink}
          data-wordmark-hidden={wordmarkHidden ? "true" : undefined}
          aria-label={`${copy.wordmark} — ${copy.homeLabel}`}
          onClick={() => menuOpen && closeMenu(false)}
        >
          {wordmark}
        </Link>

        <div className={styles.headerActions}>
          <nav className={styles.primaryNav} aria-label={copy.navigationLabel}>
            <a
              href="#vcareer"
              className={styles.navLink}
              data-header-work
              data-nav-active={
                chapterTone.activeNavigation === "work" ? "true" : undefined
              }
              aria-current={
                chapterTone.activeNavigation === "work"
                  ? "location"
                  : undefined
              }
              onClick={(event) => goToSection(event, "vcareer")}
            >
              <span className={styles.rollViewport}>
                <span className={styles.rollTrack}>
                  <span>{copy.work}</span>
                  <span aria-hidden>{copy.work}</span>
                </span>
              </span>
              <motion.span
                className={styles.chapterTrace}
                style={chapterTone.workTrace}
                aria-hidden
              />
            </a>
            <a
              href="#career"
              className={styles.navLink}
              data-header-career
              data-nav-active={
                chapterTone.activeNavigation === "career"
                  ? "true"
                  : undefined
              }
              aria-current={
                chapterTone.activeNavigation === "career"
                  ? "location"
                  : undefined
              }
              onClick={(event) => goToSection(event, "career")}
            >
              <span className={styles.rollViewport}>
                <span className={styles.rollTrack}>
                  <span>{copy.career}</span>
                  <span aria-hidden>{copy.career}</span>
                </span>
              </span>
              <motion.span
                className={styles.chapterTrace}
                style={chapterTone.careerTrace}
                aria-hidden
              />
            </a>
            <a href="mailto:tunm17421@gmail.com" className={styles.navLink}>
              {copy.contact}
            </a>
          </nav>

          <div
            className={styles.localeSwitch}
            role="group"
            aria-label={copy.localeLabel}
          >
            {locale === "vi" ? (
              <span className={styles.activeLocale} aria-current="page">
                VI
              </span>
            ) : (
              <Link
                href={localeHref}
                locale="vi"
                className={styles.localeLink}
                onClick={() => menuOpen && closeMenu(false)}
              >
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
              <Link
                href={localeHref}
                locale="en"
                className={styles.localeLink}
                onClick={() => menuOpen && closeMenu(false)}
              >
                EN
              </Link>
            )}
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className={styles.mobileMenuButton}
            aria-expanded={menuOpen}
            aria-controls="v2-mobile-navigation"
            aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
            onClick={() => {
              if (menuOpen) closeMenu();
              else setMenuOpen(true);
            }}
          >
            <span className={styles.menuIcon} aria-hidden>
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            key="mobile-navigation"
            id="v2-mobile-navigation"
            className={styles.mobileMenu}
            initial={overlayInitial}
            animate={overlayAnimate}
            exit={overlayExit}
            transition={overlayTransition}
            onPointerDown={(event) => {
              const target = event.target;
              if (
                !(target instanceof Element) ||
                !target.closest("a, button")
              ) {
                closeMenu();
              }
            }}
          >
            <div className={styles.menuGrid} aria-hidden />
            <div className={styles.menuPlane} aria-hidden />
            <div className={styles.menuMonogram} aria-hidden>
              TuNM
            </div>

            <motion.div
              className={styles.menuContent}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
              transition={{
                duration: reduceMotion ? 0.12 : 0.42,
                delay: reduceMotion ? 0 : 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p id="v2-mobile-nav-title" className={styles.menuEyebrow}>
                {copy.navigationLabel}
              </p>

              <nav aria-label={copy.navigationLabel}>
                <ul className={styles.menuList}>
                  <li className={styles.menuItem}>
                    <a
                      ref={workMenuLinkRef}
                      href="#vcareer"
                      className={styles.menuLink}
                      data-nav-active={
                        chapterTone.activeNavigation === "work"
                          ? "true"
                          : undefined
                      }
                      aria-current={
                        chapterTone.activeNavigation === "work"
                          ? "location"
                          : undefined
                      }
                      onClick={(event) => goToSection(event, "vcareer")}
                    >
                      <span className={styles.menuIndex} aria-hidden>
                        04—05
                      </span>
                      <span className={styles.menuLinkCopy}>
                        <strong>{copy.work}</strong>
                        <small>{copy.workProof}</small>
                      </span>
                      <span className={styles.menuArrow} aria-hidden>
                        ↓
                      </span>
                    </a>
                  </li>
                  <li className={styles.menuItem}>
                    <a
                      ref={careerMenuLinkRef}
                      href="#career"
                      className={styles.menuLink}
                      data-nav-active={
                        chapterTone.activeNavigation === "career"
                          ? "true"
                          : undefined
                      }
                      aria-current={
                        chapterTone.activeNavigation === "career"
                          ? "location"
                          : undefined
                      }
                      onClick={(event) => goToSection(event, "career")}
                    >
                      <span className={styles.menuIndex} aria-hidden>
                        06
                      </span>
                      <span className={styles.menuLinkCopy}>
                        <strong>{copy.career}</strong>
                        <small>{copy.careerProof}</small>
                      </span>
                      <span className={styles.menuArrow} aria-hidden>
                        ↓
                      </span>
                    </a>
                  </li>
                  <li className={styles.menuItem}>
                    <a
                      href="mailto:tunm17421@gmail.com"
                      className={styles.menuLink}
                      onClick={() => closeMenu()}
                    >
                      <span className={styles.menuIndex} aria-hidden>
                        MAIL
                      </span>
                      <span className={styles.menuLinkCopy}>
                        <strong>{copy.contact}</strong>
                        <small>tunm17421@gmail.com</small>
                      </span>
                      <span className={styles.menuArrow} aria-hidden>
                        ↗
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </motion.div>

            <motion.div
              className={styles.menuSignal}
              aria-hidden
              initial={reduceMotion ? { opacity: 0 } : { scaleX: 0 }}
              animate={reduceMotion ? { opacity: 0.72 } : { scaleX: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { scaleX: 0 }}
              transition={{
                duration: reduceMotion ? 0.12 : 0.72,
                delay: reduceMotion ? 0 : 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
