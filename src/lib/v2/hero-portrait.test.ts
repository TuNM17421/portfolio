import { describe, expect, it } from "vitest";
import { parseHeroPortraitVariant } from "./hero-portrait";

describe("V2 Hero portrait controls", () => {
  it("uses the approved tidy portrait by default", () => {
    expect(parseHeroPortraitVariant("")).toBe("ai-tidy");
    expect(parseHeroPortraitVariant("unknown")).toBe("ai-tidy");
  });

  it.each([
    ["original", "original"],
    [" GRADE ", "grade"],
    ["ai", "ai"],
    ["AI-TIDY", "ai-tidy"],
  ] as const)("selects %s as %s", (value, expected) => {
    expect(parseHeroPortraitVariant(value)).toBe(expected);
  });
});
