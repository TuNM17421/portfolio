import type { Locale } from "@/i18n/routing";

export const DEFAULT_SITE_ORIGIN = "https://tunm-dev.vercel.app";
export const SITE_NAME = "Nguyen Manh Tu";

export function resolveSiteOrigin(value = process.env.SITE_URL) {
  if (!value?.trim()) return DEFAULT_SITE_ORIGIN;

  const url = new URL(value.trim());
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("SITE_URL must use http or https");
  }

  return url.origin;
}

export const SITE_ORIGIN = resolveSiteOrigin();

export function localizedPath(locale: Locale, path = "") {
  const normalized = path
    ? `/${path.replace(/^\/+|\/+$/g, "")}`
    : "";
  return `/${locale}${normalized}`;
}

export function localizedAlternates(locale: Locale, path = "") {
  const normalized = path
    ? `/${path.replace(/^\/+|\/+$/g, "")}`
    : "/";

  return {
    canonical: localizedPath(locale, path),
    languages: {
      vi: localizedPath("vi", path),
      en: localizedPath("en", path),
      "x-default": normalized,
    },
  };
}

export function absoluteSiteUrl(path: string) {
  return new URL(path, SITE_ORIGIN).toString();
}

export function openGraphLocale(locale: Locale) {
  return locale === "vi" ? "vi_VN" : "en_US";
}
