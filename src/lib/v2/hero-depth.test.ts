import { describe, expect, it } from "vitest";
import { parseHeroDepthControls } from "./hero-depth";

describe("V2 Hero depth controls", () => {
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
