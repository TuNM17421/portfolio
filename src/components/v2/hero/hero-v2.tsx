"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type {
  IntroPhase,
  PortraitOutcome,
} from "@/components/v2/intro/intro-sequence";
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
  onPortraitLoad,
  onPortraitError,
}: HeroV2Props) {
  const motionScope = useHeroMotion({
    phase: introPhase,
    introWillRun,
    reduceMotion,
  });
  const [engineerRole, aiRole] = copy.role.split(" · ");

  return (
    <section
      ref={motionScope}
      className={styles.hero}
      data-portrait={portraitOutcome}
      data-entry-phase={introPhase}
      aria-hidden={navigationOpen || undefined}
      inert={navigationOpen}
      aria-labelledby="v2-hero-role"
    >
      <div className={styles.atmosphere} aria-hidden />
      <div className={styles.gridField} aria-hidden />

      <div className={styles.portraitField} data-hero-portrait>
        <div className={styles.portraitFallback} aria-hidden>
          <span className={styles.fallbackMonogram}>TuNM</span>
          <span className={styles.fallbackCopy}>{copy.portraitFallback}</span>
        </div>
        <Image
          src="/avatar.jpg"
          alt={copy.portraitAlt}
          fill
          priority={!introWillRun}
          sizes="(max-width: 899px) 100vw, 40vw"
          className={styles.portraitImage}
          onLoad={onPortraitLoad}
          onError={onPortraitError}
        />
        <div className={styles.portraitGrade} aria-hidden />
        <div className={styles.portraitEdge} aria-hidden />
      </div>

      <div className={styles.roleShade} aria-hidden />
      <div className={styles.focusLine} data-hero-focus aria-hidden />

      <div className={styles.identityBlock}>
        <h1
          id="v2-hero-role"
          className={styles.role}
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

      <div className={styles.projectProof} data-hero-proof>
        <Link href="/projects/vcareer" className={styles.projectLink}>
          <span>{copy.primaryAction}</span>
          <span className={styles.projectArrow} aria-hidden>
            ↗
          </span>
        </Link>
        <p className={styles.proof}>{copy.proof}</p>
      </div>
    </section>
  );
}
