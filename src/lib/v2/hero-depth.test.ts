import { describe, expect, it } from "vitest";
import { HERO_BOUNDARY_REVEAL } from "./hero-depth";

describe("V2 Hero depth controls", () => {
  it("keeps the opening scroll segment dark before revealing About", () => {
    expect(HERO_BOUNDARY_REVEAL).toEqual({
      holdUntil: 0.55,
      completeAt: 1,
    });
  });
});
