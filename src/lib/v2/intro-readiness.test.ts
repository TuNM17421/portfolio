import { describe, expect, it } from "vitest";
import {
  isCriticalSceneReady,
  readinessProgress,
  resolveIntroMode,
  shouldSkipIntro,
} from "@/lib/v2/intro-readiness";

describe("V2 public intro contract", () => {
  it("accepts only the case-return skip value", () => {
    expect(shouldSkipIntro("0")).toBe(true);
    expect(shouldSkipIntro(undefined)).toBe(false);
    expect(shouldSkipIntro("off")).toBe(false);
    expect(shouldSkipIntro("skip")).toBe(false);
    expect(shouldSkipIntro("1")).toBe(false);
    expect(shouldSkipIntro("slow")).toBe(false);
    expect(shouldSkipIntro("image-error")).toBe(false);
    expect(shouldSkipIntro("reduced")).toBe(false);
  });

  it("bypasses the intro only for an explicit case return", () => {
    expect(resolveIntroMode({ skipIntro: true, seenInSession: false })).toBe(
      "skip",
    );
  });

  it("uses a quick wipe only after the full intro has run in this tab", () => {
    expect(resolveIntroMode({ skipIntro: false, seenInSession: false })).toBe(
      "full",
    );
    expect(resolveIntroMode({ skipIntro: false, seenInSession: true })).toBe(
      "quick",
    );
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
