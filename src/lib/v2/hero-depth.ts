const HOLD_DISABLED_VALUES = new Set(["0", "off", "false", "none"]);

export const HERO_BOUNDARY_REVEAL = {
  holdUntil: 0.55,
  completeAt: 1,
} as const;

export type HeroDepthControls = {
  holdEnabled: boolean;
};

export function parseHeroDepthControls(value: string): HeroDepthControls {
  return {
    holdEnabled: !HOLD_DISABLED_VALUES.has(value.trim().toLowerCase()),
  };
}
