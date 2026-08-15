import { describe, expect, it } from "vitest";
import en from "../../../messages/en.json";
import vi from "../../../messages/vi.json";

describe("portfolio V2 localized not-found contract", () => {
  it("keeps the VI and EN message shapes aligned", () => {
    expect(Object.keys(vi.v2.notFound).sort()).toEqual(
      Object.keys(en.v2.notFound).sort(),
    );
  });

  it("offers a useful route back to the portfolio and its flagship proof", () => {
    expect(vi.v2.notFound.home).toBe("Về trang giới thiệu");
    expect(en.v2.notFound.home).toBe("Return to the portfolio");
    expect(vi.v2.notFound.caseStudy).toMatch(/VCareer/);
    expect(en.v2.notFound.caseStudy).toMatch(/VCareer/);
  });

  it("never describes a missing route as a server failure", () => {
    for (const locale of [vi, en]) {
      const copy = JSON.stringify(locale.v2.notFound);
      expect(copy).toMatch(/404/);
      expect(copy).not.toMatch(/500|server error|lỗi máy chủ/i);
    }
  });
});
