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

export type CriticalReadiness = {
  mounted: boolean;
  fonts: boolean;
  portrait: boolean;
};

export function shouldSkipIntro(value: string | undefined) {
  return value === "0";
}

export function resolveIntroMode({
  skipIntro,
  seenInSession,
}: {
  skipIntro: boolean;
  seenInSession: boolean;
}): IntroMode {
  if (skipIntro) return "skip";
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
