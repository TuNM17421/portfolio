"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/v2/use-prefers-reduced-motion";
import { moveVCareerEvidenceIndex } from "@/lib/v2/vcareer-case-evidence";
import styles from "./vcareer-case-study.module.css";

export type VCareerCaseEvidenceItem = {
  alt: string;
  caption: string;
  evidence: "context" | "direct";
  height: number;
  indexLabel: string;
  scopeLabel: string;
  shot: string;
  src: string;
  width: number;
};

export type VCareerCaseEvidenceCopy = {
  close: string;
  inspect: string;
  keyboardHint: string;
  loading: string;
  next: string;
  openOriginal: string;
  previous: string;
  unavailable: string;
  viewerLabel: string;
};

type EvidenceArchiveProps = {
  copy: VCareerCaseEvidenceCopy;
  images: VCareerCaseEvidenceItem[];
};

type RuntimeImageState = "error" | "loading" | "ready";

export function EvidenceArchive({ copy, images }: EvidenceArchiveProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<-1 | 1>(1);
  const returnFocusRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => setMounted(true), []);

  const openViewer = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>, index: number) => {
      if (
        event.button !== 0 ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      event.preventDefault();
      returnFocusRef.current = event.currentTarget;
      setDirection(1);
      setSelectedIndex(index);
    },
    [],
  );

  const closeViewer = useCallback(() => setSelectedIndex(null), []);
  const moveViewer = useCallback(
    (nextDirection: -1 | 1) => {
      setDirection(nextDirection);
      setSelectedIndex((current) =>
        current === null
          ? current
          : moveVCareerEvidenceIndex(current, nextDirection, images.length),
      );
    },
    [images.length],
  );

  return (
    <>
      <ol className={styles.evidenceArchive}>
        {images.map((image, index) => (
          <li
            className={styles.evidenceArchiveItem}
            data-evidence-kind={image.evidence}
            data-evidence-shot={image.shot}
            key={image.src}
          >
            <figure className={styles.evidenceRecord}>
              <header className={styles.evidenceRecordMeta}>
                <span>{image.indexLabel}</span>
                <span>{image.scopeLabel}</span>
              </header>

              <a
                href={image.src}
                className={styles.evidenceMediaLink}
                onClick={(event) => openViewer(event, index)}
              >
                <span className={styles.visuallyHidden}>{copy.inspect}</span>
                <EvidenceImage copy={copy} enhanced={mounted} image={image} />
              </a>

              <figcaption className={styles.evidenceRecordCaption}>
                <span>{image.caption}</span>
                <span>
                  {copy.inspect}
                  <span aria-hidden> ↗</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {selectedIndex !== null ? (
                <EvidenceViewer
                  copy={copy}
                  direction={direction}
                  images={images}
                  index={selectedIndex}
                  onClose={closeViewer}
                  onMove={moveViewer}
                  returnFocus={returnFocusRef.current}
                />
              ) : null}
            </AnimatePresence>,
            document.querySelector(".portfolio-v2-case-route") ?? document.body,
          )
        : null}
    </>
  );
}

function EvidenceImage({
  copy,
  enhanced,
  image,
}: {
  copy: VCareerCaseEvidenceCopy;
  enhanced: boolean;
  image: VCareerCaseEvidenceItem;
}) {
  const [runtimeState, setRuntimeState] =
    useState<RuntimeImageState>("loading");
  const imageState = runtimeState;
  const renderImage = runtimeState !== "error";
  const unavailableLabel = `${image.indexLabel}: ${image.caption}. ${copy.unavailable}`;

  return (
    <span
      className={styles.evidenceImageFrame}
      data-image-runtime={enhanced ? "active" : "static"}
      data-image-state={imageState}
      aria-busy={enhanced && imageState === "loading" ? true : undefined}
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
    >
      <span
        className={styles.evidenceImageFallback}
        role={imageState === "error" ? "img" : undefined}
        aria-label={imageState === "error" ? unavailableLabel : undefined}
        aria-hidden={imageState === "ready" ? true : undefined}
      >
        <span>{image.indexLabel}</span>
        <strong>{image.caption}</strong>
        <span>{imageState === "error" ? copy.unavailable : copy.loading}</span>
      </span>

      {renderImage ? (
        <Image
          className={styles.evidenceImage}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 767px) 92vw, (max-width: 1199px) 78vw, 66vw"
          loading="lazy"
          onLoad={() => setRuntimeState("ready")}
          onError={() => setRuntimeState("error")}
        />
      ) : null}
    </span>
  );
}

function EvidenceViewer({
  copy,
  direction,
  images,
  index,
  onClose,
  onMove,
  returnFocus,
}: {
  copy: VCareerCaseEvidenceCopy;
  direction: -1 | 1;
  images: VCareerCaseEvidenceItem[];
  index: number;
  onClose: () => void;
  onMove: (direction: -1 | 1) => void;
  returnFocus: HTMLElement | null;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [runtimeState, setRuntimeState] =
    useState<RuntimeImageState>("loading");
  const reduceMotion = usePrefersReducedMotion();
  const image = images[index];
  const count = images.length;
  const atFirst = index === 0;
  const atLast = index === count - 1;
  const imageState = runtimeState;
  const renderImage = runtimeState !== "error";

  useEffect(() => setRuntimeState("loading"), [index]);

  useEffect(() => {
    for (const neighbor of [images[index - 1], images[index + 1]]) {
      if (neighbor) new window.Image().src = neighbor.src;
    }
  }, [images, index]);

  useEffect(() => {
    const caseRoot = document.querySelector<HTMLElement>(
      "[data-vcareer-case-root]",
    );
    const body = document.body;
    const previousInert = caseRoot?.inert ?? false;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarGap =
      window.innerWidth - document.documentElement.clientWidth;

    closeRef.current?.focus();
    if (caseRoot) caseRoot.inert = true;
    body.style.overflow = "hidden";
    if (scrollbarGap > 0) body.style.paddingRight = `${scrollbarGap}px`;

    return () => {
      if (caseRoot) caseRoot.inert = previousInert;
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      window.requestAnimationFrame(() => returnFocus?.focus());
    };
  }, [returnFocus]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (!atFirst) onMove(-1);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (!atLast) onMove(1);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [atFirst, atLast, onClose, onMove]);

  const overlayMotion = reduceMotion
    ? { duration: 0.12 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };
  const planeMotion = reduceMotion
    ? { duration: 0.12 }
    : { duration: 0.46, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.div
      className={styles.evidenceViewerBackdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={overlayMotion}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        className={styles.evidenceViewer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="vcareer-evidence-viewer-title"
        aria-describedby="vcareer-evidence-viewer-caption"
        initial={
          reduceMotion
            ? { opacity: 0 }
            : {
                clipPath: "inset(7% 0% 9% 0%)",
                opacity: 0,
                scale: 0.99,
              }
        }
        animate={{ clipPath: "inset(0% 0 0% 0)", opacity: 1, scale: 1 }}
        exit={
          reduceMotion
            ? { opacity: 0 }
            : {
                clipPath: "inset(9% 0% 7% 0%)",
                opacity: 0,
                scale: 0.99,
              }
        }
        transition={planeMotion}
        onClick={(event) => event.stopPropagation()}
      >
        <h2
          id="vcareer-evidence-viewer-title"
          className={styles.visuallyHidden}
        >
          {copy.viewerLabel}
        </h2>

        <header className={styles.evidenceViewerHeader}>
          <div>
            <p>{image.indexLabel}</p>
            <p>{image.scopeLabel}</p>
          </div>
          <p aria-hidden>{copy.keyboardHint}</p>
          <button
            ref={closeRef}
            type="button"
            className={styles.evidenceViewerClose}
            aria-label={copy.close}
            onClick={onClose}
          >
            <span aria-hidden>×</span>
          </button>
        </header>

        <div className={styles.evidenceViewerStage}>
          <button
            type="button"
            className={`${styles.evidenceViewerNavigation} ${styles.evidenceViewerPrevious}`}
            aria-label={copy.previous}
            disabled={atFirst}
            onClick={() => onMove(-1)}
          >
            <span aria-hidden>←</span>
          </button>

          <div
            className={styles.evidenceViewerMedia}
            data-viewer-image-state={imageState}
            aria-busy={imageState === "loading" ? true : undefined}
          >
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                className={styles.evidenceViewerImagePlane}
                key={image.src}
                custom={direction}
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : {
                        clipPath: "inset(0% 6% 0% 6%)",
                        opacity: 0,
                        x: direction * 44,
                      }
                }
                animate={{
                  clipPath: "inset(0% 0% 0% 0%)",
                  opacity: 1,
                  x: 0,
                }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : {
                        clipPath: "inset(0% 6% 0% 6%)",
                        opacity: 0,
                        x: direction * -34,
                      }
                }
                transition={planeMotion}
              >
                <div
                  className={styles.evidenceViewerFallback}
                  role={
                    imageState === "error"
                      ? "img"
                      : imageState === "loading"
                        ? "status"
                        : undefined
                  }
                  aria-label={
                    imageState === "error"
                      ? `${copy.unavailable}: ${image.caption}`
                      : undefined
                  }
                  aria-hidden={imageState === "ready" ? true : undefined}
                >
                  <span>{image.indexLabel}</span>
                  <strong>{image.caption}</strong>
                  <span>
                    {imageState === "error" ? copy.unavailable : copy.loading}
                  </span>
                </div>

                {renderImage ? (
                  <Image
                    className={styles.evidenceViewerImage}
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="100vw"
                    unoptimized
                    priority
                    onLoad={() => setRuntimeState("ready")}
                    onError={() => setRuntimeState("error")}
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            className={`${styles.evidenceViewerNavigation} ${styles.evidenceViewerNext}`}
            aria-label={copy.next}
            disabled={atLast}
            onClick={() => onMove(1)}
          >
            <span aria-hidden>→</span>
          </button>
        </div>

        <footer className={styles.evidenceViewerFooter}>
          <div aria-live="polite" aria-atomic="true">
            <p>{`${String(index + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`}</p>
            <p id="vcareer-evidence-viewer-caption">{image.caption}</p>
          </div>
          <a href={image.src} target="_blank" rel="noopener noreferrer">
            {copy.openOriginal}
            <span aria-hidden> ↗</span>
          </a>
        </footer>
      </motion.div>
    </motion.div>
  );
}
