import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { DEFAULT_SITE_ORIGIN } from "@/lib/site-metadata";

describe("public discovery metadata", () => {
  it("indexes only the canonical localized portfolio and VCareer routes", () => {
    const entries = sitemap();

    expect(entries).toHaveLength(4);
    expect(entries.map((entry) => entry.url)).toEqual([
      `${DEFAULT_SITE_ORIGIN}/vi`,
      `${DEFAULT_SITE_ORIGIN}/en`,
      `${DEFAULT_SITE_ORIGIN}/vi/projects/vcareer`,
      `${DEFAULT_SITE_ORIGIN}/en/projects/vcareer`,
    ]);
    expect(entries.some((entry) => entry.url.includes("/v2"))).toBe(false);
  });

  it("publishes VI, EN, and x-default alternates for each page", () => {
    const [home, , caseStudy] = sitemap();

    expect(home.alternates?.languages).toEqual({
      vi: `${DEFAULT_SITE_ORIGIN}/vi`,
      en: `${DEFAULT_SITE_ORIGIN}/en`,
      "x-default": `${DEFAULT_SITE_ORIGIN}/`,
    });
    expect(caseStudy.alternates?.languages).toEqual({
      vi: `${DEFAULT_SITE_ORIGIN}/vi/projects/vcareer`,
      en: `${DEFAULT_SITE_ORIGIN}/en/projects/vcareer`,
      "x-default": `${DEFAULT_SITE_ORIGIN}/projects/vcareer`,
    });
  });

  it("keeps crawlers on public pages and out of API routes", () => {
    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
      sitemap: `${DEFAULT_SITE_ORIGIN}/sitemap.xml`,
      host: `${DEFAULT_SITE_ORIGIN}/`,
    });
  });
});
