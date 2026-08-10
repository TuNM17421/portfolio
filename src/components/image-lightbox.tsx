"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from "@/components/icons";
import type { GalleryImage } from "@/components/project-gallery";

// Fullscreen image viewer. Own index state so callers only toggle open/closed.
// A11y: role=dialog + aria-modal, Esc closes, arrows navigate, focus is trapped
// and restored, body scroll is locked while open.
export function ImageLightbox({
  images,
  startIndex = 0,
  alt,
  onClose,
}: {
  images: GalleryImage[];
  startIndex?: number;
  alt: string;
  onClose: () => void;
}) {
  const t = useTranslations("projects");
  const [index, setIndex] = useState(startIndex);
  const count = images.length;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  // Lock body scroll + restore focus to the trigger on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight") return go(1);
      if (e.key === "ArrowLeft") return go(-1);
      if (e.key === "Tab") {
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!nodes || nodes.length === 0) return;
        const list = Array.from(nodes);
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  // Portal to <body> so the fixed overlay escapes the card's transform +
  // overflow-hidden (which otherwise clips it and breaks positioning).
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="bg-scrim fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        ref={closeRef}
        type="button"
        aria-label={t("gallery.close")}
        onClick={onClose}
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-lg border border-white/20 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        <CloseIcon className="h-5 w-5" />
      </button>

      <figure
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current == null || count < 2) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
        className="flex max-h-full w-full max-w-5xl flex-col items-center"
      >
        <Image
          key={images[index].src}
          src={images[index].src}
          alt={images[index].caption || `${alt} — ${index + 1}`}
          width={1600}
          height={1000}
          sizes="(max-width: 1024px) 100vw, 960px"
          className="max-h-[78vh] w-auto rounded-lg object-contain"
          priority
        />
        <figcaption className="mt-3 flex flex-col items-center gap-1 text-center">
          <span className="text-sm font-medium text-white/90">
            {images[index].caption}
          </span>
          {count > 1 && (
            <span className="font-mono text-xs text-white/60">
              {index + 1} / {count}
            </span>
          )}
        </figcaption>
      </figure>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label={t("gallery.prev")}
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:left-8"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label={t("gallery.next")}
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-8"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </>
      )}
    </div>,
    document.body,
  );
}
