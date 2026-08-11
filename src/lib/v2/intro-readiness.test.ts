import { describe, expect, it } from "vitest";
import {
  isCriticalSceneReady,
  parseIntroControls,
  readinessProgress,
  resolveIntroMode,
} from "@/lib/v2/intro-readiness";

describe("V2 intro controls", () => {
  it("forces a full replay for the documented review query", () => {
    const controls = parseIntroControls("?intro=1");

    expect(controls).toEqual({ forcedMode: "full", debugState: "normal" });
    expect(resolveIntroMode({ controls, seenInSession: true })).toBe("full");
  });

  it("bypasses the intro for content and performance review", () => {
    const controls = parseIntroControls("?intro=0");

    expect(resolveIntroMode({ controls, seenInSession: false })).toBe("skip");
  });

  it.each(["slow", "image-error", "reduced"] as const)(
    "exposes the %s state as a full replay",
    (debugState) => {
      const controls = parseIntroControls(`?intro=${debugState}`);

      expect(controls).toEqual({ forcedMode: "full", debugState });
    },
  );

  it("uses a quick wipe only after the full intro has run in this tab", () => {
    const controls = parseIntroControls("");

    expect(resolveIntroMode({ controls, seenInSession: false })).toBe("full");
    expect(resolveIntroMode({ controls, seenInSession: true })).toBe("quick");
  });
});

describe("V2 critical-scene readiness", () => {
  it("maps only resolved critical resources to the documented weights", () => {
    expect(
      readinessProgress({ mounted: false, fonts: false, portrait: false }),
    ).toBe(0);
    expect(
      readinessProgress({ mounted: true, fonts: false, portrait: false }),
    ).toBe(15);
    expect(
      readinessProgress({ mounted: true, fonts: true, portrait: false }),
    ).toBe(45);
    expect(
      readinessProgress({ mounted: false, fonts: true, portrait: true }),
    ).toBe(85);
  });

  it("does not report completion until every critical checkpoint resolves", () => {
    expect(
      isCriticalSceneReady({ mounted: true, fonts: true, portrait: false }),
    ).toBe(false);
    expect(
      isCriticalSceneReady({ mounted: true, fonts: true, portrait: true }),
    ).toBe(true);
  });
});
