import { describe, expect, it } from "vitest";
import {
  DEFAULT_SITE_ORIGIN,
  localizedAlternates,
  localizedPath,
  resolveSiteOrigin,
} from "@/lib/site-metadata";

describe("site metadata contract", () => {
  it("uses the verified production origin by default", () => {
    expect(resolveSiteOrigin(undefined)).toBe(DEFAULT_SITE_ORIGIN);
    expect(resolveSiteOrigin("   ")).toBe(DEFAULT_SITE_ORIGIN);
  });

  it("normalizes an explicit deployment origin", () => {
    expect(resolveSiteOrigin("https://portfolio.example.com/path/")).toBe(
      "https://portfolio.example.com",
    );
  });

  it("rejects an origin with a non-web protocol", () => {
    expect(() => resolveSiteOrigin("ftp://portfolio.example.com")).toThrow(
      "SITE_URL must use http or https",
    );
  });

  it("builds localized canonical and alternate paths", () => {
    expect(localizedPath("vi")).toBe("/vi");
    expect(localizedPath("en", "/projects/vcareer/")).toBe(
      "/en/projects/vcareer",
    );
    expect(localizedAlternates("vi", "/projects/vcareer/")).toEqual({
      canonical: "/vi/projects/vcareer",
      languages: {
        vi: "/vi/projects/vcareer",
        en: "/en/projects/vcareer",
        "x-default": "/projects/vcareer",
      },
    });
  });
});
