import { describe, expect, it } from "vitest";
import { HERO_BOUNDARY_REVEAL, parseHeroDepthControls } from "./hero-depth";

describe("V2 Hero depth controls", () => {
  it("keeps the opening scroll segment dark before revealing About", () => {
    expect(HERO_BOUNDARY_REVEAL).toEqual({
      holdUntil: 0.55,
      completeAt: 1,
    });
  });

  it("enables the short scroll hold by default", () => {
    expect(parseHeroDepthControls("").holdEnabled).toBe(true);
    expect(parseHeroDepthControls("1").holdEnabled).toBe(true);
  });

  it.each(["0", "off", "false", "none", " OFF "])(
    "disables the scroll hold for review value %s",
    (value) => {
      expect(parseHeroDepthControls(value).holdEnabled).toBe(false);
    },
  );
});
