"use client";

import { useEffect, useRef } from "react";
import { getImageProps } from "next/image";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import type {
  IntroPhase,
  PortraitOutcome,
} from "@/components/v2/intro/intro-sequence";
import { useHeroDepth } from "./hero-depth";
import { useHeroMotion } from "./hero-motion";
import styles from "./hero-v2.module.css";

export type HeroV2Copy = {
  role: string;
  positioning: string;
  location: string;
  primaryAction: string;
  proof: string;
  contact: string;
  portraitAlt: string;
  portraitFallback: string;
};

type HeroV2Props = {
  copy: HeroV2Copy;
  portraitOutcome: PortraitOutcome;
  introPhase: IntroPhase;
  introWillRun: boolean;
  reduceMotion: boolean;
  navigationOpen: boolean;
  nextChapterTone: "dark" | "light";
  onPortraitLoad: () => void;
  onPortraitError: () => void;
};

export function HeroV2({
  copy,
  portraitOutcome,
  introPhase,
  introWillRun,
  reduceMotion,
  navigationOpen,
  nextChapterTone,
  onPortraitLoad,
  onPortraitError,
}: HeroV2Props) {
  const motionScope = useHeroMotion({
    phase: introPhase,
    introWillRun,
    reduceMotion,
  });
  const depth = useHeroDepth({ reduceMotion });
  const holdState = reduceMotion ? "reduced" : "active";
  const [engineerRole, aiRole] = copy.role.split(" · ");

  return (
    <section
      ref={depth.holdRef}
      id="top"
      tabIndex={-1}
      className={styles.heroHold}
      data-hold={holdState}
      data-entry-phase={introPhase}
      aria-hidden={navigationOpen || undefined}
      inert={navigationOpen}
      aria-labelledby="v2-hero-role"
    >
      <div
        ref={motionScope}
        className={styles.hero}
        data-portrait={portraitOutcome}
        data-entry-phase={introPhase}
        data-pointer-depth={depth.pointerEnabled ? "enabled" : "disabled"}
        data-next-chapter={nextChapterTone}
        onPointerMove={depth.handlePointerMove}
        onPointerLeave={depth.resetPointer}
        onPointerCancel={depth.resetPointer}
      >
        <motion.div
          className={styles.atmosphere}
          style={depth.styles.atmosphere}
          aria-hidden
        />
        <motion.div
          className={styles.gridField}
          style={depth.styles.grid}
          aria-hidden
        />

        <motion.div
          className={styles.portraitDepth}
          style={depth.styles.portrait}
        >
          <div className={styles.portraitField} data-hero-portrait>
            <div className={styles.portraitFallback} aria-hidden>
              <span className={styles.fallbackMonogram}>TuNM</span>
              <span className={styles.fallbackCopy}>
                {copy.portraitFallback}
              </span>
            </div>
            <ArtDirectedPortrait
              alt={copy.portraitAlt}
              onLoad={onPortraitLoad}
              onError={onPortraitError}
            />
            <div className={styles.portraitGrade} aria-hidden />
            <div className={styles.portraitEdge} aria-hidden />
          </div>
        </motion.div>

        <div className={styles.roleShade} aria-hidden />
        <motion.div
          className={styles.focusDepth}
          style={depth.styles.focus}
          aria-hidden
        >
          <div className={styles.focusLine} data-hero-focus />
        </motion.div>

        <motion.div
          className={styles.nextBoundary}
          style={depth.styles.boundary}
          data-hero-boundary
          aria-hidden
        />

        <motion.div className={styles.identityDepth} style={depth.styles.role}>
          <div className={styles.identityBlock}>
            <h1
              id="v2-hero-role"
              className={styles.role}
              data-hero-role-heading
              aria-label={copy.role}
            >
              <span className={styles.roleDisplay}>
                <span className={styles.roleLine} data-hero-role-line>
                  {engineerRole}
                </span>
                <span className={styles.roleLine} data-hero-role-line>
                  <i>·</i> {aiRole}
                </span>
              </span>
            </h1>
          </div>
        </motion.div>

        <motion.div
          className={styles.positioningDepth}
          style={depth.styles.detail}
        >
          <div className={styles.positioningBlock} data-hero-positioning>
            <p className={styles.location}>{copy.location}</p>
            <p className={styles.positioning}>{copy.positioning}</p>
            <a
              href="mailto:tunm17421@gmail.com"
              className={styles.mobileContact}
            >
              {copy.contact}
            </a>
          </div>
        </motion.div>

        <motion.div className={styles.projectDepth} style={depth.styles.detail}>
          <div className={styles.projectProof} data-hero-proof>
            <Link href="/projects/vcareer" className={styles.projectLink}>
              <span>{copy.primaryAction}</span>
              <span className={styles.projectArrow} aria-hidden>
                ↗
              </span>
            </Link>
            <p className={styles.proof}>{copy.proof}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

type ArtDirectedPortraitProps = {
  alt: string;
  onLoad: () => void;
  onError: () => void;
};

const ART_DIRECTED_PORTRAIT = {
  desktop: "/v2/hero/avatar-hero-desktop-ai-tidy-v2.webp",
  mobile: "/v2/hero/avatar-hero-mobile-ai-tidy-v2.webp",
  desktopSize: { width: 1024, height: 1536 },
  mobileSize: { width: 1000, height: 1250 },
} as const;

function ArtDirectedPortrait({
  alt,
  onLoad,
  onError,
}: ArtDirectedPortraitProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const source = ART_DIRECTED_PORTRAIT;
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    src: source.desktop,
    alt: "",
    sizes: "40vw",
    width: source.desktopSize.width,
    height: source.desktopSize.height,
    quality: 88,
  });
  const {
    props: { srcSet: mobileSrcSet, ...mobileImageProps },
  } = getImageProps({
    src: source.mobile,
    alt,
    sizes: "100vw",
    width: source.mobileSize.width,
    height: source.mobileSize.height,
    quality: 86,
  });

  useEffect(() => {
    const image = imageRef.current;
    if (!image?.complete) return;
    if (image.naturalWidth > 0) onLoad();
    else onError();
  }, [onError, onLoad]);

  return (
    <>
      <link
        rel="preload"
        as="image"
        media="(min-width: 900px)"
        imageSrcSet={desktopSrcSet}
        imageSizes="40vw"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        media="(max-width: 899px)"
        imageSrcSet={mobileSrcSet}
        imageSizes="100vw"
        fetchPriority="high"
      />
      <picture>
        <source media="(min-width: 900px)" srcSet={desktopSrcSet} sizes="40vw" />
        <source media="(max-width: 899px)" srcSet={mobileSrcSet} sizes="100vw" />
        <img
          {...mobileImageProps}
          ref={imageRef}
          alt={alt}
          className={styles.portraitImage}
          fetchPriority="high"
          loading="eager"
          onLoad={onLoad}
          onError={onError}
        />
      </picture>
    </>
  );
}
