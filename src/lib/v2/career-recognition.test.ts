import { describe, expect, it } from "vitest";
import en from "../../../messages/en.json";
import vi from "../../../messages/vi.json";
import {
  CAREER_RECORDS,
  CAREER_TRACE_CONTACTS,
  CAREER_TRACE_RANGE,
  CAREER_TRACE_WINDOWS,
  DEFAULT_RECOGNITION_DOCUMENTARY_KEY,
  parseRecognitionDocumentary,
  RECOGNITION_DOCUMENTARY_IMAGES,
  RECOGNITION_RECORDS,
  resolveActiveCareerRecord,
  resolveCareerTraceMode,
  resolveRecognitionDocumentaryDirection,
  resolveRecognitionDocumentaryNavigation,
  resolveRecognitionStageMode,
} from "./career-recognition";

describe("portfolio v2 career and recognition foundation", () => {
  it("keeps one ordered 2019–2026 career trace with FPT as the primary record", () => {
    expect(CAREER_TRACE_RANGE).toEqual({ start: 2019, end: 2026 });
    expect(CAREER_RECORDS.map((record) => record.key)).toEqual([
      "education",
      "fpt",
      "aiProgram",
    ]);
    expect(
      CAREER_RECORDS.filter((record) => record.emphasis === "primary"),
    ).toEqual([expect.objectContaining({ key: "fpt" })]);
  });

  it("keeps WonderLens as a compact recognition record only", () => {
    expect(RECOGNITION_RECORDS).toEqual([
      {
        key: "vcareer",
        emphasis: "primary",
        dateTime: "2026-06-27",
      },
      {
        key: "wonderlens",
        emphasis: "compact",
        dateTime: "2026-06-27",
      },
      { key: "vinuni", emphasis: "supporting", dateTime: "2026" },
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

  it("gives FPT the longest active career window", () => {
    const holdLengths = Object.fromEntries(
      Object.entries(CAREER_TRACE_WINDOWS).map(([key, window]) => [
        key,
        window.holdEnd - window.holdStart,
      ]),
    );

    expect(holdLengths.fpt).toBeGreaterThan(holdLengths.education);
    expect(holdLengths.fpt).toBeGreaterThan(holdLengths.aiProgram);
    expect(CAREER_TRACE_CONTACTS.education).toBeLessThan(
      CAREER_TRACE_CONTACTS.fpt,
    );
    expect(CAREER_TRACE_CONTACTS.fpt).toBeLessThan(
      CAREER_TRACE_CONTACTS.aiProgram,
    );
  });

  it("activates career records in chronological order", () => {
    expect(resolveActiveCareerRecord(0.12)).toBe("education");
    expect(resolveActiveCareerRecord(0.5)).toBe("fpt");
    expect(resolveActiveCareerRecord(0.88)).toBe("aiProgram");
  });

  it("keeps compact and reduced-motion layouts static", () => {
    expect(
      resolveCareerTraceMode({ desktop: false, reduceMotion: false }),
    ).toBe("static");
    expect(resolveCareerTraceMode({ desktop: true, reduceMotion: true })).toBe(
      "static",
    );
    expect(resolveCareerTraceMode({ desktop: true, reduceMotion: false })).toBe(
      "active",
    );
  });

  it("keeps the ceremony, organiser, and stakeholder images as a curated document register", () => {
    expect(DEFAULT_RECOGNITION_DOCUMENTARY_KEY).toBe("ceremony");
    expect(RECOGNITION_DOCUMENTARY_IMAGES).toEqual([
      {
        key: "ceremony",
        slug: "ceremony",
        src: "/awards/vinuni-ceremony.jpg",
        width: 2568,
        height: 1926,
        fit: "cover",
      },
      {
        key: "hackathon",
        slug: "hackathon",
        src: "/awards/hackathon.jpg",
        width: 2560,
        height: 1920,
        fit: "cover",
      },
      {
        key: "careerServices",
        slug: "career-services",
        src: "/awards/stakeholder-congrats-2.jpg",
        width: 1920,
        height: 2560,
        fit: "contain",
      },
    ]);

    for (const locale of [vi, en]) {
      const recognition = locale.v2.career.recognition;

      expect(recognition.documentarySelectorLabel).toBeTruthy();
      expect(Object.keys(recognition.documentaries)).toEqual([
        "ceremony",
        "hackathon",
        "careerServices",
      ]);

      for (const documentary of Object.values(recognition.documentaries)) {
        expect(documentary.index).toMatch(/^0[1-3]$/);
        expect(documentary.label).toBeTruthy();
        expect(documentary.alt).toBeTruthy();
        expect(documentary.caption).toBeTruthy();
      }

      expect(recognition.imageLoading).toBeTruthy();
      expect(recognition.imageUnavailable).toBeTruthy();
    }
  });

  it.each([
    ["ceremony", "ceremony"],
    ["hackathon", "hackathon"],
    ["career-services", "careerServices"],
  ] as const)("accepts the public %s documentary slug", (value, documentary) => {
    expect(parseRecognitionDocumentary(value)).toBe(documentary);
  });

  it.each([
    undefined,
    "",
    "vinuni",
    "organisers",
    "stakeholder",
    "transition",
    "loading",
    "image-error",
  ])("rejects the review-only documentary value %s", (value) => {
    expect(parseRecognitionDocumentary(value)).toBeNull();
  });

  it("resolves directional masks and keyboard navigation from register order", () => {
    expect(
      resolveRecognitionDocumentaryDirection("ceremony", "hackathon"),
    ).toBe(1);
    expect(
      resolveRecognitionDocumentaryDirection("careerServices", "hackathon"),
    ).toBe(-1);
    expect(
      resolveRecognitionDocumentaryDirection("hackathon", "hackathon"),
    ).toBe(0);

    expect(
      resolveRecognitionDocumentaryNavigation("ceremony", "ArrowRight"),
    ).toBe("hackathon");
    expect(
      resolveRecognitionDocumentaryNavigation("ceremony", "ArrowLeft"),
    ).toBe("careerServices");
    expect(
      resolveRecognitionDocumentaryNavigation("hackathon", "End"),
    ).toBe("careerServices");
    expect(
      resolveRecognitionDocumentaryNavigation("careerServices", "Home"),
    ).toBe("ceremony");
    expect(
      resolveRecognitionDocumentaryNavigation("ceremony", "Enter"),
    ).toBeNull();
  });

  it("keeps compact and reduced-motion Recognition Stages static", () => {
    expect(
      resolveRecognitionStageMode({ desktop: false, reduceMotion: false }),
    ).toBe("static");
    expect(
      resolveRecognitionStageMode({ desktop: true, reduceMotion: true }),
    ).toBe("static");
    expect(
      resolveRecognitionStageMode({ desktop: true, reduceMotion: false }),
    ).toBe("active");
  });
});
