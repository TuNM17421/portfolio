import { describe, expect, it } from "vitest";
import {
  parseAboutStoryControls,
  resolveAboutStoryMode,
} from "./about-story";

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

  it.each(["static", "STATIC", "0", "off", "false", " off "])(
    "recognizes the static review control %s",
    (value) => {
      expect(parseAboutStoryControls(value).forceStatic).toBe(true);
    },
  );

  it("does not force static mode for unknown controls", () => {
    expect(parseAboutStoryControls("").forceStatic).toBe(false);
    expect(parseAboutStoryControls("active").forceStatic).toBe(false);
  });

  it("honors the explicit static review control on desktop", () => {
    expect(
      resolveAboutStoryMode({
        desktop: true,
        reduceMotion: false,
        forceStatic: true,
      }),
    ).toBe("static");
  });
});
