import { describe, expect, it } from "vitest";
import en from "../../../messages/en.json";
import vi from "../../../messages/vi.json";
import {
  FINANCIAL_ARCHIVE_IMAGES,
  FINANCIAL_ARCHIVE_REPOSITORIES,
  parseSupportingWorkControls,
  SCHOLARAI_EVIDENCE,
  SCHOLARAI_EVIDENCE_KEYS,
  SCHOLARAI_SOURCE_URL,
} from "./supporting-work";

describe("portfolio v2 supporting work foundation", () => {
  it("keeps ScholarAI focused on retrieval, grounding, and evaluation", () => {
    const imageSources = SCHOLARAI_EVIDENCE.reduce<string[]>(
      (sources, item) => [
        ...sources,
        ...item.images.map((image) => image.src),
      ],
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

  it("exposes one verified public ScholarAI source action", () => {
    expect(SCHOLARAI_SOURCE_URL).toBe(
      "https://github.com/TuNM17421/ScholarAI",
    );
  });

  it.each(["static", "STATIC", "0", "off", "false", " off "])(
    "recognizes the static review state %s",
    (value) => {
      expect(parseSupportingWorkControls(value)).toEqual({
        forceStatic: true,
        imageState: "auto",
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
      forceStatic: true,
      imageState,
    });
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
