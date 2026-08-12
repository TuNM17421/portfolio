import { describe, expect, it } from "vitest";
import en from "../../../messages/en.json";
import vi from "../../../messages/vi.json";
import { VCAREER_PROJECT } from "@/data/projects";
import {
  parseVCareerShowcaseControls,
  resolveVCareerShowcaseMode,
  VCAREER_SHOWCASE_STAGES,
  VCAREER_STAGE_KEYS,
  VCAREER_STAGE_WINDOWS,
} from "@/lib/v2/vcareer-showcase";

describe("portfolio v2 VCareer showcase", () => {
  it("keeps the approved six-screen product order", () => {
    expect(VCAREER_SHOWCASE_STAGES.map((stage) => stage.key)).toEqual([
      ...VCAREER_STAGE_KEYS,
    ]);
    expect(VCAREER_SHOWCASE_STAGES.map((stage) => stage.src)).toEqual(
      VCAREER_PROJECT.images.map((image) => image.src),
    );
  });

  it("separates direct ownership from wider product context", () => {
    expect(
      VCAREER_SHOWCASE_STAGES.filter(
        (stage) => stage.evidence === "direct",
      ).map((stage) => [stage.key, stage.qualifier]),
    ).toEqual([
      ["cvBuilder", "analysis"],
      ["match", undefined],
      ["interviewDemo", "baseline"],
    ]);

    expect(
      VCAREER_SHOWCASE_STAGES.filter(
        (stage) => stage.evidence === "context",
      ).map((stage) => stage.key),
    ).toEqual(["landing", "interviewReview", "dashboard"]);
  });

  it("uses only verified public outcomes in both locales", () => {
    const copy = JSON.stringify([vi.v2.vcareer, en.v2.vcareer]);

    expect(copy).toContain("150+");
    expect(copy).toContain("5.000 USD");
    expect(copy).toContain("$5,000");
    expect(copy).toContain("tự tin hơn");
    expect(copy).toContain("higher confidence");
    expect(copy).not.toMatch(/2,000\+|1,080\+|4\.9|10,000|\$10,000/);
  });

  it("localizes structural labels instead of leaking English UI into Vietnamese", () => {
    expect(vi.v2.vcareer.eyebrow).toBe("04 / BẰNG CHỨNG CHỦ LỰC");
    expect(vi.v2.vcareer.labels.direct).toBe("PHẠM VI TRỰC TIẾP");
    expect(vi.v2.vcareer.labels.context).toBe("BỐI CẢNH SẢN PHẨM");
    expect(vi.v2.vcareer.architectureSource).toBe("TRÌNH DUYỆT");
    expect(vi.v2.vcareer.outcomesCode).toBe("XÁC MINH / 03");
    expect(en.v2.vcareer.eyebrow).toBe("04 / FLAGSHIP PROOF");
    expect(en.v2.vcareer.architectureSource).toBe("BROWSER");
  });

  it("uses the approved reversible six-stage timeline", () => {
    expect(VCAREER_STAGE_WINDOWS).toEqual({
      landing: { enter: 0.145, holdStart: 0.19, holdEnd: 0.255, exit: 0.295 },
      cvBuilder: { enter: 0.265, holdStart: 0.31, holdEnd: 0.375, exit: 0.415 },
      match: { enter: 0.385, holdStart: 0.43, holdEnd: 0.495, exit: 0.535 },
      interviewDemo: {
        enter: 0.505,
        holdStart: 0.55,
        holdEnd: 0.615,
        exit: 0.655,
      },
      interviewReview: {
        enter: 0.625,
        holdStart: 0.67,
        holdEnd: 0.735,
        exit: 0.775,
      },
      dashboard: { enter: 0.745, holdStart: 0.79, holdEnd: 0.855, exit: 0.895 },
    });

    for (const stage of VCAREER_STAGE_KEYS) {
      const window = VCAREER_STAGE_WINDOWS[stage];

      expect(window.enter).toBeLessThan(window.holdStart);
      expect(window.holdStart).toBeLessThan(window.holdEnd);
      expect(window.holdEnd - window.holdStart).toBeGreaterThanOrEqual(0.06);
      expect(window.holdEnd).toBeLessThan(window.exit);
    }
  });

  it("pins only motion-capable desktop layouts", () => {
    expect(
      resolveVCareerShowcaseMode({ desktop: true, reduceMotion: false }),
    ).toBe("active");
    expect(
      resolveVCareerShowcaseMode({ desktop: false, reduceMotion: false }),
    ).toBe("static");
    expect(
      resolveVCareerShowcaseMode({ desktop: true, reduceMotion: true }),
    ).toBe("static");
  });

  it.each(["static", "STATIC", "0", "off", "false", " off "])(
    "recognizes the static showcase review control %s",
    (value) => {
      expect(parseVCareerShowcaseControls(value).forceStatic).toBe(true);
    },
  );

  it("does not force static showcase mode for unknown controls", () => {
    expect(parseVCareerShowcaseControls("").forceStatic).toBe(false);
    expect(parseVCareerShowcaseControls("active").forceStatic).toBe(false);
  });
});
