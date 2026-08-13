import { describe, expect, it } from "vitest";
import {
  resolveActiveNavigation,
  resolveChapterTraceScale,
  resolveChapterName,
  resolveChapterPhase,
  resolveChapterTone,
} from "./chapter-tone";

describe("V2 chapter tone relay", () => {
  it("maps the full journey from Hero through Recognition", () => {
    expect(resolveChapterName(resolveChapterPhase(0, 0, 0, 0, 0))).toBe(
      "hero",
    );
    expect(resolveChapterName(resolveChapterPhase(1, 0, 0, 0, 0))).toBe(
      "about",
    );
    expect(resolveChapterName(resolveChapterPhase(1, 1, 0, 0, 0))).toBe(
      "vcareer",
    );
    expect(resolveChapterName(resolveChapterPhase(1, 1, 1, 0, 0))).toBe(
      "work",
    );
    expect(resolveChapterName(resolveChapterPhase(1, 1, 1, 1, 0))).toBe(
      "career",
    );
    expect(resolveChapterName(resolveChapterPhase(1, 1, 1, 1, 1))).toBe(
      "recognition",
    );
  });

  it("derives reverse scroll from position without stale direction state", () => {
    const forward = [
      resolveChapterPhase(0, 0, 0),
      resolveChapterPhase(1, 0, 0),
      resolveChapterPhase(1, 1, 0),
      resolveChapterPhase(1, 1, 1),
      resolveChapterPhase(1, 1, 1, 1),
      resolveChapterPhase(1, 1, 1, 1, 1),
    ];
    const reverse = [
      resolveChapterPhase(1, 1, 1, 1, 1),
      resolveChapterPhase(1, 1, 1, 1),
      resolveChapterPhase(1, 1, 1),
      resolveChapterPhase(1, 1, 0),
      resolveChapterPhase(1, 0, 0),
      resolveChapterPhase(0, 0, 0),
    ];

    expect(reverse).toEqual([...forward].reverse());
  });

  it("clamps observer overshoot before composing the chapter phase", () => {
    expect(resolveChapterPhase(-0.2, 1.4, -0.1, 0, 0)).toBe(1);
    expect(resolveChapterPhase(1.3, 1.2, 1.8, 1.4, 1.1)).toBe(5);
  });

  it("switches foreground and surface as one accessible chapter cut", () => {
    expect(resolveChapterTone(0.49)).toMatchObject({
      color: "rgb(237, 244, 245)",
      layerOpacity: 0,
    });
    expect(resolveChapterTone(0.5)).toMatchObject({
      color: "rgb(7, 18, 25)",
      layerOpacity: 1,
    });
    expect(resolveChapterTone(1.49)).toMatchObject({
      color: "rgb(7, 18, 25)",
      layerOpacity: 1,
    });
    expect(resolveChapterTone(1.5)).toMatchObject({
      color: "rgb(237, 244, 245)",
      layerOpacity: 0,
    });
    expect(resolveChapterTone(2.49)).toMatchObject({
      color: "rgb(237, 244, 245)",
      layerOpacity: 0,
    });
    expect(resolveChapterTone(2.5)).toMatchObject({
      color: "rgb(7, 18, 25)",
      accent: "rgb(0, 96, 240)",
      layerOpacity: 1,
    });
    expect(resolveChapterTone(3.5)).toMatchObject({
      color: "rgb(7, 18, 25)",
      accent: "rgb(0, 96, 240)",
      layerOpacity: 1,
    });
    expect(resolveChapterTone(4.5)).toMatchObject({
      color: "rgb(237, 244, 245)",
      accent: "rgb(107, 215, 208)",
      layerOpacity: 0,
    });
  });

  it("hands the active trace from Work to Career", () => {
    expect(resolveChapterTraceScale(1, "work")).toBe(0);
    expect(resolveChapterTraceScale(1.5, "work")).toBeCloseTo(0.5);
    expect(resolveChapterTraceScale(2, "work")).toBe(1);
    expect(resolveChapterTraceScale(3.5, "work")).toBeCloseTo(0.5);
    expect(resolveChapterTraceScale(4, "work")).toBe(0);

    expect(resolveChapterTraceScale(3, "career")).toBe(0);
    expect(resolveChapterTraceScale(3.5, "career")).toBeCloseTo(0.5);
    expect(resolveChapterTraceScale(4, "career")).toBe(1);
    expect(resolveChapterTraceScale(5, "career")).toBe(1);
  });

  it("maps chapters to the two visible content routes", () => {
    expect(resolveActiveNavigation("hero")).toBeNull();
    expect(resolveActiveNavigation("about")).toBeNull();
    expect(resolveActiveNavigation("vcareer")).toBe("work");
    expect(resolveActiveNavigation("work")).toBe("work");
    expect(resolveActiveNavigation("career")).toBe("career");
    expect(resolveActiveNavigation("recognition")).toBe("career");
  });
});
