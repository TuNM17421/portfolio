"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { PortraitOutcome } from "@/components/v2/intro/intro-sequence";
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
  onPortraitLoad: () => void;
  onPortraitError: () => void;
};

export function HeroV2({
  copy,
  portraitOutcome,
  onPortraitLoad,
  onPortraitError,
}: HeroV2Props) {
  const rolePrefix = "Backend Software";
  const roleSuffix = copy.role.startsWith(`${rolePrefix} `)
    ? copy.role.slice(rolePrefix.length + 1)
    : copy.role;
  const [engineerRole, aiRole] = roleSuffix.split(" · ");

  return (
    <section
      className={styles.hero}
      data-portrait={portraitOutcome}
      aria-labelledby="v2-hero-role"
    >
      <div className={styles.atmosphere} aria-hidden />
      <div className={styles.gridField} aria-hidden />

      <div className={styles.portraitField}>
        <div className={styles.portraitFallback} aria-hidden>
          <span className={styles.fallbackMonogram}>NMT</span>
          <span className={styles.fallbackCopy}>{copy.portraitFallback}</span>
        </div>
        <Image
          src="/avatar-graduation.jpg"
          alt={copy.portraitAlt}
          fill
          priority
          sizes="(max-width: 899px) 100vw, 66vw"
          className={styles.portraitImage}
          onLoad={onPortraitLoad}
          onError={onPortraitError}
        />
        <div className={styles.portraitGrade} aria-hidden />
        <div className={styles.portraitEdge} aria-hidden />
      </div>

      <div className={styles.roleShade} aria-hidden />
      <div className={styles.focusLine} aria-hidden />

      <div className={styles.identityBlock}>
        <h1 id="v2-hero-role" className={styles.role}>
          <span className={styles.roleDisplay}>
            <span className={styles.roleLine}>{rolePrefix} </span>
            <span className={styles.roleLine}>
              {engineerRole} <i>·</i> {aiRole}
            </span>
          </span>
        </h1>
      </div>

      <div className={styles.positioningBlock}>
        <p className={styles.location}>{copy.location}</p>
        <p className={styles.positioning}>{copy.positioning}</p>
        <a
          href="mailto:tunm17421@gmail.com"
          className={styles.mobileContact}
        >
          {copy.contact}
        </a>
      </div>

      <div className={styles.projectProof}>
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
