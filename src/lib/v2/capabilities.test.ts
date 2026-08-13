import { describe, expect, it } from "vitest";
import en from "../../../messages/en.json";
import vi from "../../../messages/vi.json";
import {
  CAPABILITY_DEFINITIONS,
  resolveCapabilityAtFocusLine,
} from "./capabilities";

describe("portfolio v2 evidence-backed capability foundation", () => {
  it("keeps four ordered capabilities with real proof anchors", () => {
    expect(CAPABILITY_DEFINITIONS.map((item) => item.key)).toEqual([
      "backend",
      "realtime",
      "retrieval",
      "delivery",
    ]);

    const anchors = CAPABILITY_DEFINITIONS.flatMap((item) =>
      item.proofs.map((proof) => proof.href),
    );

    expect(new Set(anchors)).toEqual(
      new Set(["#career", "#financial-archive", "#vcareer", "#scholarai"]),
    );
  });

  it("keeps the direct realtime scope limited to verified technologies", () => {
    const realtime = CAPABILITY_DEFINITIONS.find(
      (item) => item.key === "realtime",
    );

    expect(realtime?.technologies).toEqual(["LiveKit", "WebRTC"]);
    expect(JSON.stringify(realtime)).not.toMatch(/TalkingHead|OpenAI/i);
  });

  it("localizes every capability and proof label without proficiency theatre", () => {
    for (const locale of [vi, en]) {
      const capabilities = locale.v2.capabilities;

      expect(Object.keys(capabilities.items)).toEqual([
        "backend",
        "realtime",
        "retrieval",
        "delivery",
      ]);
      expect(Object.keys(capabilities.proofs)).toEqual([
        "career",
        "financial",
        "vcareer",
        "scholar",
        "scholarDelivery",
        "vcareerDelivery",
      ]);

      const copy = JSON.stringify(capabilities);
      expect(copy).not.toMatch(/\bexpert\b|proficiency|\d+\s*%/i);
    }
  });

  it("uses the approved evidence-led chapter title in both locales", () => {
    expect(vi.v2.capabilities.title).toBe(
      "Năng lực được neo vào bằng chứng.",
    );
    expect(en.v2.capabilities.title).toBe(
      "Capabilities anchored in evidence.",
    );
  });

  it("resolves the route intersecting the reading focus in either direction", () => {
    const routes = [
      { key: "backend" as const, top: 120, bottom: 360 },
      { key: "realtime" as const, top: 360, bottom: 600 },
      { key: "retrieval" as const, top: 600, bottom: 840 },
      { key: "delivery" as const, top: 840, bottom: 1080 },
    ];

    expect(resolveCapabilityAtFocusLine(routes, 480)).toBe("realtime");
    expect(resolveCapabilityAtFocusLine([...routes].reverse(), 720)).toBe(
      "retrieval",
    );
    expect(resolveCapabilityAtFocusLine(routes, 80)).toBeNull();
  });
});
