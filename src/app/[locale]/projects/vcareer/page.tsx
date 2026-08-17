import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { VCareerCaseStudy } from "@/components/v2/vcareer-case/vcareer-case-study";
import { isSupportedLocale } from "@/i18n/routing";
import {
  localizedAlternates,
  localizedPath,
  openGraphLocale,
  SITE_NAME,
} from "@/lib/site-metadata";
import { v2FontVariables } from "@/lib/v2/fonts";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};
  const t = await getTranslations({
    locale,
    namespace: "vcareerCaseStudy.meta",
  });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    alternates: localizedAlternates(locale, "/projects/vcareer"),
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url: localizedPath(locale, "/projects/vcareer"),
      siteName: `${SITE_NAME} Portfolio`,
      title,
      description,
      locale: openGraphLocale(locale),
      alternateLocale: [openGraphLocale(locale === "vi" ? "en" : "vi")],
      images: [
        {
          url: localizedPath(locale, "/projects/vcareer/opengraph-image"),
          width: 1200,
          height: 630,
          alt: "VCareer — AI Career Development Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [localizedPath(locale, "/projects/vcareer/opengraph-image")],
    },
  };
}

export default async function VCareerCaseStudyPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <div className={`portfolio-v2-case-route ${v2FontVariables}`}>
      <VCareerCaseStudy locale={locale} />
    </div>
  );
}
