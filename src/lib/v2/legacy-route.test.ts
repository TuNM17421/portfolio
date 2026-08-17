import { describe, expect, it } from "vitest";
import { buildLegacyV2Destination } from "@/lib/v2/legacy-route";

describe("legacy V2 compatibility route", () => {
  it("redirects each locale to its canonical homepage", () => {
    expect(buildLegacyV2Destination("vi", {})).toBe("/vi");
    expect(buildLegacyV2Destination("en", {})).toBe("/en");
  });

  it("preserves only the exact Intro continuity value", () => {
    expect(buildLegacyV2Destination("vi", { intro: "0" })).toBe(
      "/vi?intro=0",
    );
    expect(buildLegacyV2Destination("vi", { intro: "skip" })).toBe("/vi");
    expect(buildLegacyV2Destination("vi", { intro: "1" })).toBe("/vi");
  });

  it("preserves only public documentary slugs and targets the chapter", () => {
    expect(
      buildLegacyV2Destination("en", {
        intro: "0",
        recognition: "career-services",
      }),
    ).toBe("/en?intro=0&recognition=career-services#recognition");
    expect(
      buildLegacyV2Destination("en", { recognition: "stakeholder" }),
    ).toBe("/en");
  });

  it("ignores repeated query values", () => {
    expect(
      buildLegacyV2Destination("vi", {
        intro: ["0", "1"],
        recognition: ["hackathon", "ceremony"],
      }),
    ).toBe("/vi");
  });
});
