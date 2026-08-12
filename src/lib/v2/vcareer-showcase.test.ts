import { describe, expect, it } from "vitest";
import en from "../../../messages/en.json";
import vi from "../../../messages/vi.json";
import { VCAREER_PROJECT } from "@/data/projects";
import {
  VCAREER_SHOWCASE_STAGES,
  VCAREER_STAGE_KEYS,
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
      VCAREER_SHOWCASE_STAGES.filter((stage) => stage.evidence === "direct").map(
        (stage) => [stage.key, stage.qualifier],
      ),
    ).toEqual([
      ["cvBuilder", "analysis"],
      ["match", undefined],
      ["interviewDemo", "baseline"],
    ]);

    expect(
      VCAREER_SHOWCASE_STAGES.filter((stage) => stage.evidence === "context").map(
        (stage) => stage.key,
      ),
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
    expect(vi.v2.vcareer.outcomesCode).toBe("XÁC MINH / 03");
    expect(en.v2.vcareer.eyebrow).toBe("04 / FLAGSHIP PROOF");
  });
});
