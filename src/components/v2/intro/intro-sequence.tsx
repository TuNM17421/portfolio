"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  animate as animateValue,
  motion,
  stagger,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
import {
  INTRO_SESSION_KEY,
  INTRO_TIMINGS,
  isCriticalSceneReady,
  readinessProgress,
  resolveIntroMode,
  type CriticalReadiness,
  type IntroControls,
  type IntroMode,
} from "@/lib/v2/intro-readiness";
import styles from "./intro-sequence.module.css";

export type IntroPhase =
  | "boot"
  | "identify"
  | "prepare"
  | "ready"
  | "exiting"
  | "complete";

export type PortraitOutcome = "pending" | "ready" | "error";

export type IntroCopy = {
  introLabel: string;
  portfolio: string;
  wordmark: string;
  specialties: [string, string, string];
  skip: string;
  preparing: string;
  ready: string;
  fallbackReady: string;
  portraitFallback: string;
  handoffEyebrow: string;
  handoffRole: string;
  handoffNote: string;
  partLabel: string;
  reviewLabel: string;
};

type IntroSequenceProps = {
  controls: IntroControls;
  copy: IntroCopy;
  locale: "vi" | "en";
  portraitOutcome: PortraitOutcome;
  portraitSrc: string;
  reduceMotion: boolean;
  onPhaseChange: (phase: IntroPhase) => void;
};

type IntroWindow = Window & {
  __portfolioV2IntroFallback?: number;
};

const FAIL_SAFE_COMMIT_MS = INTRO_TIMINGS.failSafeMs - 1_300;

function wait(duration: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, duration));
}

function safeSessionHasRun() {
  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberSessionRun() {
  try {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
  } catch {
    // A blocked storage API should never block entry to the portfolio.
  }
}

function clearBootstrapFailSafe() {
  const introWindow = window as IntroWindow;
  if (introWindow.__portfolioV2IntroFallback) {
    window.clearTimeout(introWindow.__portfolioV2IntroFallback);
    delete introWindow.__portfolioV2IntroFallback;
  }
}

export function IntroSequence({
  controls,
  copy,
  locale,
  portraitOutcome,
  portraitSrc,
  reduceMotion,
  onPhaseChange,
}: IntroSequenceProps) {
  const [scope, animateScope] = useAnimate();
  const [mode, setMode] = useState<IntroMode | null>(null);
  const [phase, setLocalPhase] = useState<IntroPhase>("boot");
  const [mountedAndMeasured, setMountedAndMeasured] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [slowPortraitGateOpen, setSlowPortraitGateOpen] = useState(
    controls.debugState !== "slow",
  );
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const [forceProgressComplete, setForceProgressComplete] = useState(false);
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const progressValue = useMotionValue(0);
  const runToken = useRef(0);
  const readinessRef = useRef<CriticalReadiness>({
    mounted: false,
    fonts: false,
    portrait: false,
  });

  const portraitResolved =
    portraitOutcome !== "pending" && slowPortraitGateOpen;
  const readiness = useMemo<CriticalReadiness>(
    () => ({
      mounted: mountedAndMeasured,
      fonts: fontsReady,
      portrait: portraitResolved,
    }),
    [fontsReady, mountedAndMeasured, portraitResolved],
  );
  readinessRef.current = readiness;

  const publishPhase = useCallback(
    (nextPhase: IntroPhase) => {
      setLocalPhase(nextPhase);
      onPhaseChange(nextPhase);
    },
    [onPhaseChange],
  );

  const finishIntro = useCallback(
    ({ remember, state }: { remember: boolean; state: "complete" | "skipped" }) => {
      runToken.current += 1;
      if (remember) rememberSessionRun();
      clearBootstrapFailSafe();
      document.documentElement.dataset.intro = state;
      publishPhase("complete");
    },
    [publishPhase],
  );

  useMotionValueEvent(progressValue, "change", (latest) => {
    setDisplayedProgress(Math.max(0, Math.min(100, Math.round(latest))));
  });

  useEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setMountedAndMeasured(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let slowTimer = 0;

    const resolveFonts = () => {
      if (cancelled) return;
      if (controls.debugState === "slow") {
        slowTimer = window.setTimeout(() => {
          if (!cancelled) setFontsReady(true);
        }, 4_850);
        return;
      }
      setFontsReady(true);
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(resolveFonts, resolveFonts);
    } else {
      resolveFonts();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(slowTimer);
    };
  }, [controls.debugState]);

  useEffect(() => {
    if (controls.debugState !== "slow") {
      setSlowPortraitGateOpen(true);
      return;
    }

    setSlowPortraitGateOpen(false);
    const timer = window.setTimeout(() => setSlowPortraitGateOpen(true), 5_550);
    return () => window.clearTimeout(timer);
  }, [controls.debugState]);

  useEffect(() => {
    const seenInSession = safeSessionHasRun();
    setMode(resolveIntroMode({ controls, seenInSession }));
  }, [controls]);

  const rawProgress = readinessProgress(readiness);
  const progressTarget = (() => {
    if (phase === "boot" || phase === "complete") return 0;
    if (phase === "identify") return Math.min(rawProgress, 45);
    if (forceProgressComplete || phase === "ready" || phase === "exiting") {
      return 100;
    }
    return rawProgress === 100 ? 92 : rawProgress;
  })();

  useEffect(() => {
    const progressAnimation = animateValue(progressValue, progressTarget, {
      duration: progressTarget === 100 ? 0.28 : 0.72,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => progressAnimation.stop();
  }, [progressTarget, progressValue]);

  useEffect(() => {
    if (!mode) return;
    if (mode === "skip") {
      finishIntro({ remember: false, state: "skipped" });
      return;
    }

    const token = ++runToken.current;
    const animations: Array<{ stop: () => void }> = [];
    const isCurrent = () => runToken.current === token;
    const play = (...args: Parameters<typeof animateScope>) => {
      const animation = animateScope(...args);
      animations.push(animation);
      return animation;
    };

    document.documentElement.dataset.intro = "running";
    setFallbackUsed(false);
    setForceProgressComplete(false);
    progressValue.set(0);
    publishPhase("identify");

    const runReducedSequence = async () => {
      await play(
        "[data-intro-static]",
        { opacity: [0, 1] },
        { duration: 0.12, ease: "linear" },
      );
      if (!isCurrent()) return;
      await wait(80);
      if (!isCurrent()) return;
      document.documentElement.dataset.intro = "exiting";
      publishPhase("exiting");
      await play(scope.current, { opacity: [1, 0] }, { duration: 0.12 });
      if (isCurrent()) finishIntro({ remember: true, state: "complete" });
    };

    const runQuickSequence = async () => {
      await Promise.all([
        play(
          "[data-intro-word]",
          { opacity: [0, 1], y: ["82%", "0%"] },
          {
            duration: 0.29,
            delay: stagger(0.035),
            ease: [0.16, 1, 0.3, 1],
          },
        ),
        play(
          "[data-intro-rail]",
          { scaleX: [0, 1] },
          { duration: 0.31, ease: [0.16, 1, 0.3, 1] },
        ),
      ]);
      if (!isCurrent()) return;
      document.documentElement.dataset.intro = "exiting";
      publishPhase("exiting");
      await play(
        scope.current,
        { clipPath: ["inset(0% 0% 0% 0%)", "inset(49.88% 0% 49.88% 0%)"] },
        { duration: 0.25, ease: [0.76, 0, 0.24, 1] },
      );
      if (!isCurrent()) return;
      await play(scope.current, { opacity: [1, 0] }, { duration: 0.05 });
      if (isCurrent()) finishIntro({ remember: true, state: "complete" });
    };

    const runFullSequence = async () => {
      const startedAt = performance.now();

      await Promise.all([
        play(
          "[data-intro-meta]",
          { opacity: [0, 1], y: [10, 0] },
          {
            duration: 0.42,
            delay: stagger(0.07),
            ease: [0.16, 1, 0.3, 1],
          },
        ),
        play(
          "[data-intro-field]",
          { opacity: [0, 1] },
          { duration: 0.7, ease: "easeOut" },
        ),
      ]);
      if (!isCurrent()) return;

      await Promise.all([
        play(
          "[data-intro-word]",
          { opacity: [0, 1], y: ["118%", "0%"] },
          {
            duration: 0.82,
            delay: stagger(0.095),
            ease: [0.16, 1, 0.3, 1],
          },
        ),
        play(
          "[data-intro-wordmark]",
          { fontVariationSettings: ['"wdth" 78', '"wdth" 124'] },
          { duration: 1.08, ease: [0.16, 1, 0.3, 1] },
        ),
      ]);
      if (!isCurrent()) return;

      await Promise.all([
        play(
          "[data-intro-specialty]",
          { opacity: [0, 1], y: [14, 0] },
          {
            duration: 0.42,
            delay: stagger(0.13),
            ease: [0.16, 1, 0.3, 1],
          },
        ),
        play(
          "[data-intro-rail]",
          { scaleX: [0, 1] },
          { duration: 0.76, ease: [0.16, 1, 0.3, 1] },
        ),
        play(
          "[data-intro-skip]",
          { opacity: [0, 1] },
          { duration: 0.3, delay: 0.32 },
        ),
      ]);
      if (!isCurrent()) return;
      publishPhase("prepare");

      while (isCurrent()) {
        const elapsed = performance.now() - startedAt;
        const meetsMinimum = elapsed >= INTRO_TIMINGS.fullMinimumMs;
        const criticalReady = isCriticalSceneReady(readinessRef.current);
        const reachedFailSafeCommit = elapsed >= FAIL_SAFE_COMMIT_MS;

        if (meetsMinimum && (criticalReady || reachedFailSafeCommit)) break;
        await wait(50);
      }
      if (!isCurrent()) return;

      const didFallback = !isCriticalSceneReady(readinessRef.current);
      setFallbackUsed(didFallback);
      setForceProgressComplete(true);
      publishPhase("ready");
      await wait(290);
      if (!isCurrent()) return;

      await Promise.all([
        play(
          "[data-intro-portrait]",
          {
            opacity: [0, 1],
            clipPath: ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
            filter: ["blur(20px)", "blur(0px)"],
          },
          { duration: 0.86, ease: [0.16, 1, 0.3, 1] },
        ),
        play(
          "[data-intro-focus-sweep]",
          { x: ["-18vw", "118vw"], opacity: [0, 1, 1, 0] },
          { duration: 0.92, times: [0, 0.08, 0.82, 1], ease: "easeInOut" },
        ),
        play(
          "[data-intro-ready-flash]",
          { opacity: [0, 1, 0.25] },
          { duration: 0.54, times: [0, 0.3, 1] },
        ),
        play(
          "[data-intro-skip]",
          { opacity: [1, 0] },
          { duration: 0.2, ease: "easeOut" },
        ),
      ]);
      if (!isCurrent()) return;

      document.documentElement.dataset.intro = "exiting";
      publishPhase("exiting");
      await play(
        scope.current,
        { clipPath: ["inset(0% 0% 0% 0%)", "inset(49.82% 0% 49.82% 0%)"] },
        { duration: 0.82, ease: [0.76, 0, 0.24, 1] },
      );
      if (!isCurrent()) return;
      await play(scope.current, { opacity: [1, 0] }, { duration: 0.14 });
      if (isCurrent()) finishIntro({ remember: true, state: "complete" });
    };

    const run = async () => {
      try {
        if (reduceMotion) await runReducedSequence();
        else if (mode === "quick") await runQuickSequence();
        else await runFullSequence();
      } catch {
        if (isCurrent()) finishIntro({ remember: true, state: "complete" });
      }
    };

    void run();

    return () => {
      if (runToken.current === token) runToken.current += 1;
      animations.forEach((animation) => animation.stop());
    };
  }, [
    animateScope,
    finishIntro,
    mode,
    progressValue,
    publishPhase,
    reduceMotion,
    scope,
  ]);

  const handleSkip = useCallback(async () => {
    if (phase === "boot" || phase === "complete" || phase === "exiting") return;
    runToken.current += 1;
    document.documentElement.dataset.intro = "exiting";
    publishPhase("exiting");

    try {
      await animateScope(
        scope.current,
        { opacity: [1, 0] },
        { duration: reduceMotion ? 0.12 : 0.28, ease: "easeOut" },
      );
    } finally {
      finishIntro({ remember: true, state: "skipped" });
    }
  }, [animateScope, finishIntro, phase, publishPhase, reduceMotion, scope]);

  useEffect(() => {
    if (phase === "boot" || phase === "complete" || phase === "exiting") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") void handleSkip();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleSkip, phase]);

  const statusMessage =
    phase === "ready" || phase === "exiting"
      ? fallbackUsed
        ? copy.fallbackReady
        : copy.ready
      : copy.preparing;

  const wordmark = (
    <span className={styles.wordmarkText}>
      {copy.wordmark.split(" ").map((word) => (
        <span className={styles.wordClip} key={word}>
          <span data-intro-word className={styles.word}>
            {word}
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <AnimatePresence>
      {phase !== "complete" && (
        <motion.section
          ref={scope}
          className={styles.intro}
          data-mode={mode ?? "full"}
          data-phase={phase}
          data-reduced={reduceMotion ? "true" : "false"}
          aria-label={copy.introLabel}
          initial={false}
        >
          <div data-intro-field className={styles.field} aria-hidden>
            <div className={styles.fieldGlow} />
            <div className={styles.fieldGrain} />
            <div className={styles.fieldPlaneOne} />
            <div className={styles.fieldPlaneTwo} />
          </div>

          <div className={styles.topRail} data-intro-static>
            <p data-intro-meta>{copy.portfolio} / 2026</p>
            <p data-intro-meta>
              <span className={locale === "vi" ? styles.activeLocale : undefined}>
                VI
              </span>
              <span aria-hidden> · </span>
              <span className={locale === "en" ? styles.activeLocale : undefined}>
                EN
              </span>
            </p>
          </div>

          <div className={styles.identity} data-intro-static>
            {phase !== "exiting" && !reduceMotion ? (
              <motion.div
                layoutId="v2-wordmark"
                data-intro-wordmark
                className={styles.wordmark}
                transition={{
                  layout: { duration: 0.86, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                {wordmark}
              </motion.div>
            ) : (
              phase !== "exiting" && (
                <div data-intro-wordmark className={styles.wordmark}>
                  {wordmark}
                </div>
              )
            )}

            <div className={styles.specialties}>
              {copy.specialties.map((specialty, index) => (
                <span key={specialty} className={styles.specialtyWrap}>
                  <span data-intro-specialty>{specialty}</span>
                  {index < copy.specialties.length - 1 && (
                    <i aria-hidden className={styles.specialtyConnector} />
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.progressArea} data-intro-static>
            <div className={styles.progressHeader}>
              <span aria-live="polite">{statusMessage}</span>
              <span aria-hidden>{displayedProgress.toString().padStart(2, "0")}</span>
            </div>
            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-label={statusMessage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={displayedProgress}
            >
              <span data-intro-rail className={styles.railBase} />
              <span
                className={styles.progressFill}
                style={{ transform: `scaleX(${displayedProgress / 100})` }}
              />
              <span data-intro-ready-flash className={styles.readyFlash} />
            </div>
            <div className={styles.checkpoints} aria-hidden>
              <span>HYDRATE / 15</span>
              <span>TYPE / 30</span>
              <span>PORTRAIT / 55</span>
            </div>
          </div>

          <div data-intro-portrait className={styles.portraitEcho} aria-hidden>
            {portraitOutcome === "error" ? (
              <div className={styles.portraitEchoFallback} />
            ) : (
              <Image
                src={portraitSrc}
                alt=""
                fill
                priority
                sizes="(max-width: 767px) 84vw, 44vw"
                className={styles.portraitEchoImage}
              />
            )}
            <div className={styles.portraitEchoGrade} />
          </div>

          <div data-intro-focus-sweep className={styles.focusSweep} aria-hidden />

          <div className={styles.bottomRail} data-intro-static>
            <p data-intro-meta>{copy.specialties.join(" · ")}</p>
            <button
              type="button"
              data-intro-skip
              className={styles.skipButton}
              onClick={() => void handleSkip()}
              disabled={phase === "boot" || phase === "exiting"}
            >
              <span>{copy.skip}</span>
              <span aria-hidden>↗</span>
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
