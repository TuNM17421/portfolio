import { describe, expect, it } from "vitest";
import { resolveAboutStoryMode } from "./about-story";

describe("V2 About story mode", () => {
  it("activates the pinned story on motion-capable desktop layouts", () => {
    expect(
      resolveAboutStoryMode({ desktop: true, reduceMotion: false }),
    ).toBe("active");
  });

  it("keeps compact layouts in semantic document flow", () => {
    expect(
      resolveAboutStoryMode({ desktop: false, reduceMotion: false }),
    ).toBe("static");
  });

  it("keeps reduced-motion layouts in semantic document flow", () => {
    expect(
      resolveAboutStoryMode({ desktop: true, reduceMotion: true }),
    ).toBe("static");
  });
});
