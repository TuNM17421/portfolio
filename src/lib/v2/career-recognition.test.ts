import { describe, expect, it } from "vitest";
import en from "../../../messages/en.json";
import vi from "../../../messages/vi.json";
import {
  CAREER_RECORDS,
  CAREER_TRACE_RANGE,
  RECOGNITION_RECORDS,
} from "./career-recognition";

describe("portfolio v2 career and recognition foundation", () => {
  it("keeps one ordered 2019–2026 career trace with FPT as the primary record", () => {
    expect(CAREER_TRACE_RANGE).toEqual({ start: 2019, end: 2026 });
    expect(CAREER_RECORDS.map((record) => record.key)).toEqual([
      "education",
      "fpt",
      "aiProgram",
    ]);
    expect(CAREER_RECORDS.filter((record) => record.emphasis === "primary")).toEqual([
      expect.objectContaining({ key: "fpt" }),
    ]);
  });

  it("keeps WonderLens as a compact recognition record only", () => {
    expect(RECOGNITION_RECORDS).toEqual([
      { key: "vcareer", emphasis: "primary" },
      { key: "wonderlens", emphasis: "compact" },
      { key: "vinuni", emphasis: "supporting" },
    ]);

    for (const locale of [vi, en]) {
      const wonderLens = locale.v2.career.recognition.records.wonderlens;

      expect(Object.keys(wonderLens).sort()).toEqual(
        ["context", "date", "index", "project", "result"].sort(),
      );
      expect(JSON.stringify(wonderLens)).not.toMatch(
        /github|repository|source|scope|ui\/ux|frontend|backend/i,
      );
    }
  });

  it("removes the unsupported FPT percentage claims from both portfolio versions", () => {
    const experienceCopy = JSON.stringify([
      vi.experience.fpt,
      en.experience.fpt,
      vi.v2.career.records.fpt,
      en.v2.career.records.fpt,
    ]);

    expect(experienceCopy).not.toMatch(/20\s*%|30\s*%/);
  });

  it("localizes the Part 06 structure and confirmed recognition results", () => {
    expect(vi.v2.career.eyebrow).toBe("06 / KINH NGHIỆM & GHI NHẬN");
    expect(vi.v2.career.records.fpt.organization).toBe("FPT Software");
    expect(vi.v2.career.recognition.records.vcareer.result).toContain(
      "Giải Nhì",
    );
    expect(vi.v2.career.recognition.records.wonderlens.result).toContain(
      "Giải Nhất",
    );

    expect(en.v2.career.eyebrow).toBe("06 / EXPERIENCE & RECOGNITION");
    expect(en.v2.career.records.fpt.organization).toBe("FPT Software");
    expect(en.v2.career.recognition.records.vcareer.result).toContain(
      "2nd Prize",
    );
    expect(en.v2.career.recognition.records.wonderlens.result).toContain(
      "1st Prize",
    );
  });
});

