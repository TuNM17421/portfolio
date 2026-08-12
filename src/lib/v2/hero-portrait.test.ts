import { describe, expect, it } from "vitest";
import { parseHeroPortraitVariant } from "./hero-portrait";

describe("V2 Hero portrait controls", () => {
  it("keeps the approved original portrait by default", () => {
    expect(parseHeroPortraitVariant("")).toBe("original");
    expect(parseHeroPortraitVariant("unknown")).toBe("original");
  });

  it.each([
    ["original", "original"],
    [" GRADE ", "grade"],
    ["ai", "ai"],
  ] as const)("selects %s as %s", (value, expected) => {
    expect(parseHeroPortraitVariant(value)).toBe(expected);
  });
});
