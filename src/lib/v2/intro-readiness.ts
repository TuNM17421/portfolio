export const INTRO_SESSION_KEY = "portfolio-v2-intro-seen";

export const INTRO_TIMINGS = {
  fullMinimumMs: 4_200,
  failSafeMs: 8_000,
  quickMs: 720,
  reducedMs: 480,
} as const;

export const READINESS_WEIGHTS = {
  mounted: 15,
  fonts: 30,
  portrait: 55,
} as const;

export type IntroMode = "full" | "quick" | "skip";
export type IntroDebugState = "normal" | "slow" | "image-error" | "reduced";

export type IntroControls = {
  forcedMode: "full" | "skip" | null;
  debugState: IntroDebugState;
};

export type CriticalReadiness = {
  mounted: boolean;
  fonts: boolean;
  portrait: boolean;
};

export function parseIntroControls(search: string): IntroControls {
  const value = new URLSearchParams(search).get("intro")?.toLowerCase();

  if (value === "1" || value === "full") {
    return { forcedMode: "full", debugState: "normal" };
  }

  if (value === "0" || value === "off" || value === "skip") {
    return { forcedMode: "skip", debugState: "normal" };
  }

  if (value === "slow" || value === "image-error" || value === "reduced") {
    return { forcedMode: "full", debugState: value };
  }

  return { forcedMode: null, debugState: "normal" };
}

export function resolveIntroMode({
  controls,
  seenInSession,
}: {
  controls: IntroControls;
  seenInSession: boolean;
}): IntroMode {
  if (controls.forcedMode) return controls.forcedMode;
  return seenInSession ? "quick" : "full";
}

export function readinessProgress(readiness: CriticalReadiness) {
  return (Object.keys(READINESS_WEIGHTS) as Array<keyof CriticalReadiness>)
    .filter((key) => readiness[key])
    .reduce((total, key) => total + READINESS_WEIGHTS[key], 0);
}

export function isCriticalSceneReady(readiness: CriticalReadiness) {
  return readinessProgress(readiness) === 100;
}
