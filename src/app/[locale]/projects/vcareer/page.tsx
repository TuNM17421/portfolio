import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { VCareerCaseStudy } from "@/components/v2/vcareer-case/vcareer-case-study";
import { isSupportedLocale } from "@/i18n/routing";
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

  return {
    title: t("title"),
    description: t("description"),
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
