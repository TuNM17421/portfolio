export type HeroPortraitVariant = "original" | "grade" | "ai" | "ai-tidy";

const PORTRAIT_VARIANTS = new Set<HeroPortraitVariant>([
  "original",
  "grade",
  "ai",
  "ai-tidy",
]);

export function parseHeroPortraitVariant(value: string): HeroPortraitVariant {
  const normalized = value.trim().toLowerCase() as HeroPortraitVariant;
  return PORTRAIT_VARIANTS.has(normalized) ? normalized : "ai-tidy";
}
