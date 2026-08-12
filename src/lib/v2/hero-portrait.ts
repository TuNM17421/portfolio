export type HeroPortraitVariant = "original" | "grade" | "ai";

const PORTRAIT_VARIANTS = new Set<HeroPortraitVariant>([
  "original",
  "grade",
  "ai",
]);

export function parseHeroPortraitVariant(value: string): HeroPortraitVariant {
  const normalized = value.trim().toLowerCase() as HeroPortraitVariant;
  return PORTRAIT_VARIANTS.has(normalized) ? normalized : "original";
}
