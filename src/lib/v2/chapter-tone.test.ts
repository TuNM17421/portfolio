import { describe, expect, it } from "vitest";
import {
  resolveChapterName,
  resolveChapterPhase,
  resolveChapterTone,
} from "./chapter-tone";

describe("V2 chapter tone relay", () => {
  it("maps the forward journey from Hero to About to VCareer", () => {
    expect(resolveChapterName(resolveChapterPhase(0, 0))).toBe("hero");
    expect(resolveChapterName(resolveChapterPhase(1, 0))).toBe("about");
    expect(resolveChapterName(resolveChapterPhase(1, 1))).toBe("vcareer");
  });

  it("derives reverse scroll from position without stale direction state", () => {
    const forward = [
      resolveChapterPhase(0, 0),
      resolveChapterPhase(1, 0),
      resolveChapterPhase(1, 1),
    ];
    const reverse = [
      resolveChapterPhase(1, 1),
      resolveChapterPhase(1, 0),
      resolveChapterPhase(0, 0),
    ];

    expect(reverse).toEqual([...forward].reverse());
  });

  it("clamps observer overshoot before composing the chapter phase", () => {
    expect(resolveChapterPhase(-0.2, 1.4)).toBe(1);
    expect(resolveChapterPhase(1.3, 1.2)).toBe(2);
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
  });
});
