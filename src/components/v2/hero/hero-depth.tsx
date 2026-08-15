"use client";

import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { HERO_BOUNDARY_REVEAL } from "@/lib/v2/hero-depth";

type HeroDepthOptions = {
  reduceMotion: boolean;
};

const clampUnit = (value: number) => Math.min(1, Math.max(-1, value));

export function useHeroDepth({ reduceMotion }: HeroDepthOptions) {
  const holdRef = useRef<HTMLElement>(null);
  const [finePointer, setFinePointer] = useState(false);
  const [compactLayout, setCompactLayout] = useState(false);
  const pointerTargetX = useMotionValue(0);
  const pointerTargetY = useMotionValue(0);
  const pointerX = useSpring(pointerTargetX, {
    stiffness: 86,
    damping: 22,
    mass: 0.62,
  });
  const pointerY = useSpring(pointerTargetY, {
    stiffness: 86,
    damping: 22,
    mass: 0.62,
  });
  const { scrollYProgress } = useScroll({
    target: holdRef,
    offset: ["start start", "end end"],
  });
  const scrollActive = !reduceMotion;
  const pointerActive = finePointer && !reduceMotion;

  useEffect(() => {
    const pointerQuery = window.matchMedia(
      "(min-width: 900px) and (pointer: fine) and (hover: hover)",
    );
    const compactQuery = window.matchMedia("(max-width: 899px)");
    const updatePointer = () => setFinePointer(pointerQuery.matches);
    const updateLayout = () => setCompactLayout(compactQuery.matches);

    updatePointer();
    updateLayout();
    pointerQuery.addEventListener("change", updatePointer);
    compactQuery.addEventListener("change", updateLayout);

    return () => {
      pointerQuery.removeEventListener("change", updatePointer);
      compactQuery.removeEventListener("change", updateLayout);
    };
  }, []);

  useEffect(() => {
    if (pointerActive) return;
    pointerTargetX.jump(0);
    pointerTargetY.jump(0);
    pointerX.jump(0);
    pointerY.jump(0);
  }, [pointerActive, pointerTargetX, pointerTargetY, pointerX, pointerY]);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!pointerActive) return;

      const bounds = event.currentTarget.getBoundingClientRect();
      const normalizedX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const normalizedY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
      pointerTargetX.set(clampUnit(normalizedX));
      pointerTargetY.set(clampUnit(normalizedY));
    },
    [pointerActive, pointerTargetX, pointerTargetY],
  );

  const resetPointer = useCallback(() => {
    pointerTargetX.set(0);
    pointerTargetY.set(0);
  }, [pointerTargetX, pointerTargetY]);

  const progress = useTransform(() =>
    scrollActive ? scrollYProgress.get() : 0,
  );
  const portraitX = useTransform(() =>
    pointerActive ? pointerX.get() * 8 : 0,
  );
  const portraitY = useTransform(() => {
    const pointerOffset = pointerActive ? pointerY.get() * 5 : 0;
    const scrollOffset = progress.get() * (compactLayout ? 12 : 18);
    return pointerOffset + scrollOffset;
  });
  const portraitScale = useTransform(() => 1 + progress.get() * 0.028);
  const atmosphereX = useTransform(() =>
    pointerActive ? pointerX.get() * -3 : 0,
  );
  const atmosphereY = useTransform(() =>
    pointerActive ? pointerY.get() * -2 : 0,
  );
  const gridX = useTransform(() =>
    pointerActive ? pointerX.get() * -5 : 0,
  );
  const gridY = useTransform(() =>
    pointerActive ? pointerY.get() * -3 : 0,
  );
  const roleY = useTransform(() => progress.get() * -24);
  const detailY = useTransform(() => progress.get() * -14);
  const detailOpacity = useTransform(() => 1 - progress.get() * 0.28);
  const focusY = useTransform(
    progress,
    [0, 1],
    compactLayout ? [0, 72] : [0, 144],
  );
  const boundaryY = useTransform(
    progress,
    [0, HERO_BOUNDARY_REVEAL.holdUntil, HERO_BOUNDARY_REVEAL.completeAt],
    ["100%", "100%", "0%"],
  );

  return {
    holdRef,
    pointerEnabled: pointerActive,
    handlePointerMove,
    resetPointer,
    styles: {
      atmosphere: { x: atmosphereX, y: atmosphereY },
      grid: { x: gridX, y: gridY },
      portrait: { x: portraitX, y: portraitY, scale: portraitScale },
      role: { y: roleY },
      detail: { y: detailY, opacity: detailOpacity },
      focus: { y: focusY },
      boundary: { y: boundaryY },
    },
  };
}
