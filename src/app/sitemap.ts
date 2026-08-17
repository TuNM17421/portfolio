import type { MetadataRoute } from "next";
import { absoluteSiteUrl } from "@/lib/site-metadata";

const localizedPages = [
  {
    path: "",
    changeFrequency: "monthly" as const,
    priority: 1,
  },
  {
    path: "/projects/vcareer",
    changeFrequency: "monthly" as const,
    priority: 0.9,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return localizedPages.flatMap(({ path, changeFrequency, priority }) => {
    const languages = {
      vi: absoluteSiteUrl(`/vi${path}`),
      en: absoluteSiteUrl(`/en${path}`),
      "x-default": absoluteSiteUrl(path || "/"),
    };

    return (["vi", "en"] as const).map((locale) => ({
      url: languages[locale],
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
