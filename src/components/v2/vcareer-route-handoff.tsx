"use client";

import Image from "next/image";
import { AnimatePresence, motion, type Transition } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import {
  VCAREER_HANDOFF_STORAGE_KEY,
  isVCareerHandoffDestination,
  parseVCareerHandoffIntent,
  serializeVCareerHandoffIntent,
  shouldEnhanceVCareerHandoff,
  type VCareerHandoffDirection,
  type VCareerHandoffSource,
} from "@/lib/v2/vcareer-route-handoff";
import { usePrefersReducedMotion } from "@/lib/v2/use-prefers-reduced-motion";
import styles from "./vcareer-route-handoff.module.css";

type RectSnapshot = {
  height: number;
  left: number;
  top: number;
  width: number;
};

type TitleTarget = RectSnapshot & {
  fontSize: number;
};

type HandoffPhase = "arriving" | "departing" | "waiting";

type ActiveHandoff = {
  anchorRect: RectSnapshot;
  bodyFont: string;
  createdAt: number;
  direction: VCareerHandoffDirection;
  displayFont: string;
  href: string;
  originRect: RectSnapshot;
  phase: HandoffPhase;
  resolvedHref: string;
  source: VCareerHandoffSource;
  sourcePath: string;
  stageLabel: string;
  target: TitleTarget | null;
  viewportHeight: number;
  viewportWidth: number;
};

type StartHandoffOptions = {
  anchor: HTMLAnchorElement;
  direction: VCareerHandoffDirection;
  href: string;
  resolvedHref: string;
  source: VCareerHandoffSource;
};

type HandoffContextValue = {
  active: boolean;
  startHandoff: (options: StartHandoffOptions) => boolean;
};

const HandoffContext = createContext<HandoffContextValue>({
  active: false,
  startHandoff: () => false,
});

const DEPARTURE_MS: Record<VCareerHandoffSource, number> = {
  chapter: 760,
  return: 390,
};

const ARRIVAL_HOLD_MS: Record<VCareerHandoffDirection, number> = {
  forward: 360,
  return: 260,
};

const HARD_NAVIGATION_TIMEOUT_MS = 6_000;

type LockedBodyState = {
  overflow: string;
  paddingRight: string;
};

function snapshotRect(rect: DOMRect): RectSnapshot {
  return {
    height: Math.max(rect.height, 1),
    left: rect.left,
    top: rect.top,
    width: Math.max(rect.width, 1),
  };
}

function isUsefulVisualRect(rect: DOMRect) {
  const horizontalVisible = rect.right > 0 && rect.left < window.innerWidth;
  const verticalVisible = rect.bottom > 0 && rect.top < window.innerHeight;

  return (
    horizontalVisible &&
    verticalVisible &&
    rect.width >= 80 &&
    rect.height >= 44
  );
}

function currentEvidenceStage() {
  const stages = Array.from(
    document.querySelectorAll<HTMLElement>("[data-vcareer-route-stage]"),
  );
  const viewportCenter = window.innerHeight / 2;
  const candidates = stages
    .map((stage) => {
      const rect = stage.getBoundingClientRect();
      const opacity = Number.parseFloat(getComputedStyle(stage).opacity) || 0;
      const visible = Math.max(
        0,
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0),
      );
      const center = rect.top + rect.height / 2;

      return {
        distance: Math.abs(center - viewportCenter),
        opacity,
        stage,
        visible,
      };
    })
    .filter((candidate) => candidate.visible > 0);

  if (candidates.every((candidate) => candidate.opacity <= 0.01)) {
    return candidates.at(-1)?.stage;
  }

  return candidates.sort((left, right) => {
    if (right.opacity !== left.opacity) return right.opacity - left.opacity;
    if (right.visible !== left.visible) return right.visible - left.visible;
    return left.distance - right.distance;
  })[0]?.stage;
}

function captureHandoffGeometry(
  anchor: HTMLAnchorElement,
  source: VCareerHandoffSource,
) {
  const anchorRect = anchor.getBoundingClientRect();
  const stage = source === "chapter" ? currentEvidenceStage() : null;
  const stageVisual = stage?.querySelector<HTMLElement>(
    "[data-vcareer-route-stage-visual]",
  );
  const candidate = stageVisual ?? anchor;
  const candidateRect = candidate.getBoundingClientRect();
  const visualRect = isUsefulVisualRect(candidateRect)
    ? candidateRect
    : anchorRect;
  const titleSource = document.querySelector<HTMLElement>(
    "[data-vcareer-route-title-source]",
  );
  const routeRoot = document.querySelector<HTMLElement>(".portfolio-v2-route");

  return {
    anchorRect: snapshotRect(anchorRect),
    bodyFont: routeRoot
      ? getComputedStyle(routeRoot).fontFamily
      : getComputedStyle(anchor).fontFamily,
    displayFont: titleSource
      ? getComputedStyle(titleSource).fontFamily
      : getComputedStyle(anchor).fontFamily,
    originRect:
      source === "return"
        ? {
            height: window.innerHeight,
            left: 0,
            top: 0,
            width: window.innerWidth,
          }
        : snapshotRect(visualRect),
    stageLabel:
      stage?.dataset.vcareerRouteStageIndex ??
      (source === "chapter" ? "06 / 06" : "01 / 01"),
  };
}

function captureArrivalTarget(direction: VCareerHandoffDirection) {
  const selector =
    direction === "forward"
      ? '[data-vcareer-route-target="case-title"]'
      : '[data-vcareer-route-target="home-title"]';
  const target = document.querySelector<HTMLElement>(selector);

  if (!target) return null;
  if (direction === "return") {
    document.querySelector<HTMLElement>("#vcareer")?.scrollIntoView({
      behavior: "auto",
      block: "start",
    });
  }

  const rect = target.getBoundingClientRect();
  const computed = getComputedStyle(target);

  return {
    ...snapshotRect(rect),
    fontSize: Number.parseFloat(computed.fontSize) || 96,
  };
}

function isForcedReducedHandoff() {
  const search = new URLSearchParams(window.location.search);
  return (
    search.get("intro")?.toLowerCase() === "reduced" ||
    search.get("handoff")?.toLowerCase() === "reduced"
  );
}

export function VCareerRouteHandoffProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = usePrefersReducedMotion();
  const [handoff, setHandoff] = useState<ActiveHandoff | null>(null);
  const handoffRef = useRef<ActiveHandoff | null>(null);
  const bodyStateRef = useRef<LockedBodyState | null>(null);
  const departureTimerRef = useRef<number | null>(null);
  const arrivalTimerRef = useRef<number | null>(null);
  const hardTimerRef = useRef<number | null>(null);

  const commitHandoff = useCallback((next: ActiveHandoff | null) => {
    handoffRef.current = next;
    setHandoff(next);
  }, []);

  const clearTimers = useCallback(() => {
    for (const timer of [departureTimerRef, arrivalTimerRef, hardTimerRef]) {
      if (timer.current !== null) window.clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const lockPage = useCallback(() => {
    if (bodyStateRef.current) return;

    const body = document.body;
    const scrollbarGap =
      window.innerWidth - document.documentElement.clientWidth;
    bodyStateRef.current = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    body.dataset.vcareerRouteHandoff = "active";
    body.style.overflow = "hidden";

    if (scrollbarGap > 0) {
      const currentPadding = Number.parseFloat(
        getComputedStyle(body).paddingRight,
      );
      body.style.paddingRight = `${currentPadding + scrollbarGap}px`;
    }
  }, []);

  const releasePage = useCallback(() => {
    const previous = bodyStateRef.current;
    if (!previous) return;

    document.body.style.overflow = previous.overflow;
    document.body.style.paddingRight = previous.paddingRight;
    delete document.body.dataset.vcareerRouteHandoff;
    bodyStateRef.current = null;
  }, []);

  const cancelHandoff = useCallback(() => {
    clearTimers();
    window.sessionStorage.removeItem(VCAREER_HANDOFF_STORAGE_KEY);
    commitHandoff(null);
    releasePage();
  }, [clearTimers, commitHandoff, releasePage]);

  const finishArrival = useCallback(
    (current: ActiveHandoff) => {
      window.sessionStorage.removeItem(VCAREER_HANDOFF_STORAGE_KEY);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const latest = handoffRef.current;
          if (!latest || latest.createdAt !== current.createdAt) return;

          const arriving = {
            ...latest,
            phase: "arriving" as const,
            target: captureArrivalTarget(latest.direction),
          };
          commitHandoff(arriving);
          arrivalTimerRef.current = window.setTimeout(() => {
            const active = handoffRef.current;
            if (active?.createdAt === arriving.createdAt) {
              commitHandoff(null);
            }
          }, ARRIVAL_HOLD_MS[arriving.direction]);
        });
      });
    },
    [commitHandoff],
  );

  const startHandoff = useCallback(
    ({
      anchor,
      direction,
      href,
      resolvedHref,
      source,
    }: StartHandoffOptions) => {
      if (handoffRef.current || reduceMotion || isForcedReducedHandoff()) {
        return false;
      }

      const geometry = captureHandoffGeometry(anchor, source);
      const createdAt = Date.now();
      const next: ActiveHandoff = {
        ...geometry,
        createdAt,
        direction,
        href,
        phase: "departing",
        resolvedHref,
        source,
        sourcePath: window.location.pathname,
        target: null,
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
      };

      lockPage();
      commitHandoff(next);
      window.sessionStorage.setItem(
        VCAREER_HANDOFF_STORAGE_KEY,
        serializeVCareerHandoffIntent({ createdAt, direction }),
      );

      departureTimerRef.current = window.setTimeout(() => {
        const active = handoffRef.current;
        if (!active || active.createdAt !== createdAt) return;

        commitHandoff({ ...active, phase: "waiting" });
        router.push(href);
        hardTimerRef.current = window.setTimeout(() => {
          const stalled = handoffRef.current;
          if (!stalled || stalled.createdAt !== createdAt) return;

          if (
            isVCareerHandoffDestination(
              window.location.pathname,
              stalled.direction,
            )
          ) {
            finishArrival(stalled);
            return;
          }

          clearTimers();
          releasePage();
          window.location.assign(stalled.resolvedHref);
        }, HARD_NAVIGATION_TIMEOUT_MS);
      }, DEPARTURE_MS[source]);

      return true;
    },
    [
      clearTimers,
      commitHandoff,
      finishArrival,
      lockPage,
      reduceMotion,
      releasePage,
      router,
    ],
  );

  useEffect(() => {
    const current = handoffRef.current;
    if (!current || current.phase !== "waiting") return;

    if (
      isVCareerHandoffDestination(window.location.pathname, current.direction)
    ) {
      if (hardTimerRef.current !== null) {
        window.clearTimeout(hardTimerRef.current);
        hardTimerRef.current = null;
      }
      finishArrival(current);
      return;
    }

    if (window.location.pathname !== current.sourcePath) {
      clearTimers();
      window.sessionStorage.removeItem(VCAREER_HANDOFF_STORAGE_KEY);
      commitHandoff(null);
    }
  }, [clearTimers, commitHandoff, finishArrival, pathname]);

  useEffect(() => {
    if (handoffRef.current || reduceMotion) return;

    const intent = parseVCareerHandoffIntent(
      window.sessionStorage.getItem(VCAREER_HANDOFF_STORAGE_KEY),
    );
    if (!intent) {
      window.sessionStorage.removeItem(VCAREER_HANDOFF_STORAGE_KEY);
      return;
    }
    if (
      !isVCareerHandoffDestination(window.location.pathname, intent.direction)
    ) {
      window.sessionStorage.removeItem(VCAREER_HANDOFF_STORAGE_KEY);
      return;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const recovered: ActiveHandoff = {
      anchorRect: {
        height: viewportHeight,
        left: 0,
        top: 0,
        width: viewportWidth,
      },
      bodyFont: getComputedStyle(document.body).fontFamily,
      createdAt: intent.createdAt,
      direction: intent.direction,
      displayFont: getComputedStyle(document.body).fontFamily,
      href: window.location.href,
      originRect: {
        height: viewportHeight,
        left: 0,
        top: 0,
        width: viewportWidth,
      },
      phase: "arriving",
      resolvedHref: window.location.href,
      source: intent.direction === "forward" ? "chapter" : "return",
      sourcePath: window.location.pathname,
      stageLabel: intent.direction === "forward" ? "06 / 06" : "01 / 01",
      target: null,
      viewportHeight,
      viewportWidth,
    };

    lockPage();
    commitHandoff(recovered);
    finishArrival(recovered);
  }, [commitHandoff, finishArrival, lockPage, reduceMotion]);

  useEffect(() => {
    const cancelOnHistoryChange = () => {
      const current = handoffRef.current;
      if (
        !current ||
        isVCareerHandoffDestination(window.location.pathname, current.direction)
      ) {
        return;
      }

      cancelHandoff();
    };
    const releaseOnDocumentExit = () => {
      clearTimers();
      releasePage();
    };

    window.addEventListener("beforeunload", releaseOnDocumentExit);
    window.addEventListener("hashchange", cancelOnHistoryChange);
    window.addEventListener("pagehide", releaseOnDocumentExit);
    window.addEventListener("popstate", cancelOnHistoryChange);

    return () => {
      window.removeEventListener("beforeunload", releaseOnDocumentExit);
      window.removeEventListener("hashchange", cancelOnHistoryChange);
      window.removeEventListener("pagehide", releaseOnDocumentExit);
      window.removeEventListener("popstate", cancelOnHistoryChange);
      clearTimers();
      releasePage();
    };
  }, [cancelHandoff, clearTimers, releasePage]);

  const value = useMemo<HandoffContextValue>(
    () => ({ active: Boolean(handoff), startHandoff }),
    [handoff, startHandoff],
  );

  return (
    <HandoffContext.Provider value={value}>
      {children}
      <AnimatePresence onExitComplete={releasePage}>
        {handoff ? (
          <VCareerHandoffLayer
            handoff={handoff}
            key={`${handoff.direction}-${handoff.createdAt}`}
          />
        ) : null}
      </AnimatePresence>
    </HandoffContext.Provider>
  );
}

type HandoffLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  direction: VCareerHandoffDirection;
  href: string;
  source: VCareerHandoffSource;
};

export function VCareerRouteHandoffLink({
  direction,
  href,
  onClick,
  source,
  ...props
}: HandoffLinkProps) {
  const { active, startHandoff } = useContext(HandoffContext);

  const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      !shouldEnhanceVCareerHandoff({
        altKey: event.altKey,
        button: event.button,
        ctrlKey: event.ctrlKey,
        defaultPrevented: event.defaultPrevented,
        download: event.currentTarget.hasAttribute("download"),
        metaKey: event.metaKey,
        shiftKey: event.shiftKey,
        target: event.currentTarget.getAttribute("target"),
      })
    ) {
      return;
    }

    if (active) {
      event.preventDefault();
      return;
    }

    const enhanced = startHandoff({
      anchor: event.currentTarget,
      direction,
      href,
      resolvedHref: event.currentTarget.href,
      source,
    });
    if (enhanced) event.preventDefault();
  };

  return <Link {...props} href={href} onClick={handleClick} />;
}

function VCareerHandoffLayer({ handoff }: { handoff: ActiveHandoff }) {
  const isArriving = handoff.phase === "arriving";
  const isReturn = handoff.direction === "return";
  const target = handoff.target;
  const defaultTitle = {
    fontSize: Math.min(
      Math.max(handoff.viewportWidth * 0.162, 72),
      handoff.viewportWidth > 767 ? 248 : 112,
    ),
    left: Math.max(20, handoff.viewportWidth * 0.048),
    top: Math.max(118, handoff.viewportHeight * 0.24),
    width: handoff.viewportWidth * 0.9,
  };
  const titleTarget =
    isArriving && target
      ? {
          fontSize: target.fontSize,
          left: target.left,
          top: target.top,
          width: target.width,
        }
      : defaultTitle;
  const originScaleX = handoff.originRect.width / handoff.viewportWidth;
  const originScaleY = handoff.originRect.height / handoff.viewportHeight;
  const planeTransition: Transition = isArriving
    ? {
        duration: isReturn ? 0.28 : 0.42,
        ease: [0.22, 1, 0.36, 1],
      }
    : {
        delay: isReturn ? 0.04 : 0.14,
        duration:
          DEPARTURE_MS[handoff.source] / 1_000 - (isReturn ? 0.04 : 0.14),
        ease: [0.16, 1, 0.3, 1],
      };
  const titleTransition: Transition = {
    delay: isArriving ? 0 : isReturn ? 0.08 : 0.28,
    duration: isArriving ? (isReturn ? 0.24 : 0.34) : isReturn ? 0.22 : 0.38,
    ease: [0.22, 1, 0.36, 1],
  };
  const layerStyle = {
    "--handoff-body-font": handoff.bodyFont,
    "--handoff-display-font": handoff.displayFont,
  } as CSSProperties;

  return (
    <motion.div
      className={styles.layer}
      data-vcareer-route-layer
      data-direction={handoff.direction}
      data-phase={handoff.phase}
      data-source={handoff.source}
      style={layerStyle}
      aria-hidden
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: isReturn ? 0.24 : 0.32 }}
    >
      <motion.span
        className={styles.sourceTrace}
        style={{
          left: handoff.anchorRect.left,
          top: handoff.anchorRect.top + handoff.anchorRect.height / 2,
          width: Math.max(1, handoff.viewportWidth - handoff.anchorRect.left),
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: isArriving ? 0 : 1, scaleX: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: isReturn ? 0.12 : 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      <motion.div
        className={styles.plane}
        initial={{
          x: handoff.originRect.left,
          y: handoff.originRect.top,
          scaleX: originScaleX,
          scaleY: originScaleY,
        }}
        animate={{ x: 0, y: 0, scaleX: 1, scaleY: 1 }}
        exit={
          isReturn
            ? { clipPath: "inset(100% 0% 0% 0%)" }
            : { clipPath: "inset(0% 0% 100% 0%)" }
        }
        transition={planeTransition}
      >
        <div className={styles.gridField} />
        <motion.div
          className={styles.productPlane}
          initial={{ clipPath: "inset(0% 100% 0% 0%)", opacity: 0 }}
          animate={{
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: isArriving ? 0 : 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            delay: isReturn ? 0.08 : 0.32,
            duration: isReturn ? 0.2 : 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src="/projects/vcareer/interview_demo.PNG"
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, 48vw"
            className={styles.productImage}
          />
        </motion.div>

        <motion.p
          className={styles.caseCode}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isArriving ? 0 : 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={titleTransition}
        >
          04 / 01
        </motion.p>

        <motion.p
          className={styles.stageCode}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isArriving ? 0 : 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={titleTransition}
        >
          {handoff.stageLabel}
        </motion.p>
      </motion.div>

      <motion.h2
        className={styles.title}
        initial={{
          ...defaultTitle,
          opacity: 0,
          y: isReturn ? 10 : 28,
        }}
        animate={{ ...titleTarget, opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={titleTransition}
      >
        VCareer
      </motion.h2>

      <motion.span
        className={styles.terminalTrace}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: isArriving ? 0 : 1, scaleX: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          delay: isReturn ? 0.12 : 0.38,
          duration: isReturn ? 0.18 : 0.34,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </motion.div>
  );
}
