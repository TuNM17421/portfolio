import { describe, expect, it } from "vitest";
import en from "../../../messages/en.json";
import vi from "../../../messages/vi.json";
import {
  FINANCIAL_ARCHIVE_IMAGES,
  FINANCIAL_ARCHIVE_REPOSITORIES,
  FINANCIAL_TOPOLOGY_TIMELINE,
  parseSupportingWorkControls,
  resolveScholarAIEvidenceStage,
  resolveSupportingWorkStoryMode,
  SCHOLARAI_EVIDENCE,
  SCHOLARAI_EVIDENCE_KEYS,
  SCHOLARAI_EVIDENCE_WINDOWS,
  SCHOLARAI_SOURCE_URL,
} from "./supporting-work";

describe("portfolio v2 supporting work foundation", () => {
  it("keeps ScholarAI focused on retrieval, grounding, and evaluation", () => {
    const imageSources = SCHOLARAI_EVIDENCE.reduce<string[]>(
      (sources, item) => [...sources, ...item.images.map((image) => image.src)],
      [],
    );

    expect(SCHOLARAI_EVIDENCE.map((item) => item.key)).toEqual([
      ...SCHOLARAI_EVIDENCE_KEYS,
    ]);
    expect(imageSources).toEqual([
      "/projects/scholarai/semantic-search.png",
      "/projects/scholarai/chat.png",
      "/projects/scholarai/benchmark-1.png",
      "/projects/scholarai/benchmark-2.png",
    ]);
    expect(imageSources).not.toContain("/projects/scholarai/landing.png");
  });

  it("keeps Financial Planning as a compact three-repository archive", () => {
    expect(FINANCIAL_ARCHIVE_REPOSITORIES).toEqual([
      {
        key: "api",
        href: "https://github.com/TuNM17421/fin-planning-backend",
      },
      {
        key: "web",
        href: "https://github.com/TuNM17421/fin-planning-frontend",
      },
      {
        key: "worker",
        href: "https://github.com/TuNM17421/fin-planning-worker",
      },
    ]);
    expect(FINANCIAL_ARCHIVE_IMAGES.map((image) => image.key)).toEqual([
      "dashboard",
      "report",
    ]);
    expect(FINANCIAL_ARCHIVE_IMAGES.map((image) => image.src)).not.toContain(
      "/projects/finplanning/list_expenses.png",
    );
  });

  it("draws the Financial topology from one center hub with simultaneous drops", () => {
    expect(FINANCIAL_TOPOLOGY_TIMELINE).toEqual({
      hub: { start: 0.04, end: 0.16 },
      ledger: { start: 0.12, end: 0.48 },
      drops: { start: 0.44, end: 0.82 },
      contacts: { start: 0.78, end: 0.94 },
    });
    expect(FINANCIAL_TOPOLOGY_TIMELINE.drops.start).toBeLessThan(
      FINANCIAL_TOPOLOGY_TIMELINE.ledger.end,
    );
    expect(FINANCIAL_TOPOLOGY_TIMELINE.contacts.start).toBeLessThan(
      FINANCIAL_TOPOLOGY_TIMELINE.drops.end,
    );
  });

  it("exposes one verified public ScholarAI source action", () => {
    expect(SCHOLARAI_SOURCE_URL).toBe("https://github.com/TuNM17421/ScholarAI");
  });

  it.each(["static", "STATIC", "0", "off", "false", " off "])(
    "recognizes the static review state %s",
    (value) => {
      expect(parseSupportingWorkControls(value)).toEqual({
        focusFinancial: false,
        forceStatic: true,
        imageState: "auto",
        forcedStage: null,
        forcedBenchmark: null,
      });
    },
  );

  it.each([
    ["loading", "loading"],
    ["image-loading", "loading"],
    ["error", "error"],
    ["image-error", "error"],
    ["image_error", "error"],
  ] as const)("maps %s to the %s media state", (value, imageState) => {
    expect(parseSupportingWorkControls(value)).toEqual({
      focusFinancial: false,
      forceStatic: true,
      imageState,
      forcedStage: null,
      forcedBenchmark: null,
    });
  });

  it.each([
    ["retrieve", "retrieve", null],
    ["ground", "ground", null],
    ["evaluate-qa", "evaluate", "qa"],
    ["evaluate-refusal", "evaluate", "refusal"],
  ] as const)(
    "forces the %s ScholarAI review plateau",
    (value, forcedStage, forcedBenchmark) => {
      expect(parseSupportingWorkControls(value)).toEqual({
        focusFinancial: false,
        forceStatic: false,
        imageState: "auto",
        forcedStage,
        forcedBenchmark,
      });
    },
  );

  it("keeps the default work route scroll-driven", () => {
    expect(parseSupportingWorkControls("")).toEqual({
      focusFinancial: false,
      forceStatic: false,
      imageState: "auto",
      forcedStage: null,
      forcedBenchmark: null,
    });
  });

  it.each(["finplanning", "financial", " FINPLANNING "])(
    "opens the %s review state directly on the static Financial archive",
    (value) => {
      expect(parseSupportingWorkControls(value)).toEqual({
        focusFinancial: true,
        forceStatic: true,
        imageState: "auto",
        forcedStage: null,
        forcedBenchmark: null,
      });
    },
  );

  it("keeps broad evidence plateaus with short transition windows", () => {
    expect(SCHOLARAI_EVIDENCE_WINDOWS).toEqual({
      retrieve: { enter: 0, holdStart: 0.035, holdEnd: 0.27, exit: 0.35 },
      ground: { enter: 0.29, holdStart: 0.37, holdEnd: 0.61, exit: 0.69 },
      evaluate: { enter: 0.63, holdStart: 0.71, holdEnd: 0.985, exit: 1 },
    });
    expect(resolveScholarAIEvidenceStage(0.2)).toBe("retrieve");
    expect(resolveScholarAIEvidenceStage(0.5)).toBe("ground");
    expect(resolveScholarAIEvidenceStage(0.82)).toBe("evaluate");
  });

  it("pins only eligible desktop ScholarAI evidence", () => {
    expect(
      resolveSupportingWorkStoryMode({
        desktop: true,
        reduceMotion: false,
      }),
    ).toBe("active");
    expect(
      resolveSupportingWorkStoryMode({
        desktop: true,
        reduceMotion: false,
        forcedStage: "ground",
      }),
    ).toBe("forced");
    expect(
      resolveSupportingWorkStoryMode({
        desktop: false,
        reduceMotion: false,
      }),
    ).toBe("static");
    expect(
      resolveSupportingWorkStoryMode({
        desktop: true,
        reduceMotion: true,
      }),
    ).toBe("static");
  });

  it("does not invent a metric or live Financial action in localized copy", () => {
    const copy = JSON.stringify([vi.v2.work, en.v2.work]);

    expect(copy).toMatch(/DỰ ÁN SOLO/i);
    expect(copy).toMatch(/SOLO PROJECT/i);
    expect(copy).toContain("Không có bản chạy trực tiếp");
    expect(copy).toContain("No live demo");
    expect(copy).not.toMatch(/99%|99 %|live product|sản phẩm đang hoạt động/i);
  });

  it("localizes the structural evidence and archive labels", () => {
    expect(vi.v2.work.eyebrow).toBe("05 / HỆ THỐNG & BẰNG CHỨNG");
    expect(vi.v2.work.scholar.evidence.retrieve.label).toBe("TRUY XUẤT");
    expect(vi.v2.work.financial.topology.api.label).toBe("API");
    expect(vi.v2.work.imageUnavailable).toBe("Không tải được ảnh bằng chứng");
    expect(en.v2.work.eyebrow).toBe("05 / SYSTEMS & EVIDENCE");
    expect(en.v2.work.scholar.evidence.retrieve.label).toBe("RETRIEVE");
    expect(en.v2.work.imageUnavailable).toBe("Evidence image unavailable");
  });
});
