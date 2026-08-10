"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ImageIcon } from "@/components/icons";
import { ImageLightbox } from "@/components/image-lightbox";

// Card cover for a project. With ≥1 image it's a button that opens the
// lightbox (badge shows the count); with none it renders the gradient
// placeholder used before galleries existed.
export type GalleryImage = { src: string; caption: string };

export function ProjectGallery({
  images,
  alt,
  title,
  wide,
}: {
  images: GalleryImage[];
  alt: string;
  title: string;
  wide: boolean;
}) {
  const t = useTranslations("projects");
  const [open, setOpen] = useState(false);

  const shape = wide
    ? "aspect-[2/1] sm:aspect-video md:aspect-auto md:w-[44%] md:min-h-full"
    : "aspect-[16/7] sm:aspect-video";

  if (images.length === 0) {
    return (
      <div
        className={`grid place-items-center bg-gradient-to-br from-accent to-surface-2 ${shape}`}
      >
        <span className="px-4 text-center text-2xl font-extrabold tracking-tight text-gradient">
          {title}
        </span>
      </div>
    );
  }

  const sizes = wide
    ? "(max-width: 768px) 100vw, 44vw"
    : "(max-width: 768px) 100vw, 50vw";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("gallery.open", { count: images.length })}
        className={`relative block overflow-hidden bg-surface-2 ${shape}`}
      >
        <Image
          src={images[0].src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-2.5 py-1 font-mono text-[11px] font-medium backdrop-blur">
            <ImageIcon className="h-3.5 w-3.5" />
            {images.length}
          </span>
        )}
      </button>

      {open && (
        <ImageLightbox images={images} alt={alt} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
