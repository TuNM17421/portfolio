import type { Metadata } from "next";
import { Anybody, Be_Vietnam_Pro, IBM_Plex_Mono } from "next/font/google";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PortfolioV2Shell } from "@/components/v2/portfolio-v2-shell";
import { isSupportedLocale } from "@/i18n/routing";

const anybody = Anybody({
  weight: "variable",
  subsets: ["latin", "vietnamese"],
  axes: ["wdth"],
  variable: "--font-v2-display",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-v2-body",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-v2-mono",
  display: "swap",
});

const INTRO_BOOTSTRAP = `(function(){try{var value=new URLSearchParams(window.location.search).get('intro');var bypass=value==='0'||value==='off'||value==='skip';if(bypass){document.documentElement.dataset.intro='skipped';return;}document.documentElement.dataset.intro='pending';window.__portfolioV2IntroFallback=window.setTimeout(function(){document.documentElement.dataset.intro='complete';},8000);}catch(error){document.documentElement.dataset.intro='complete';}})();`;

type V2PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ intro?: string | string[] }>;
};

export async function generateMetadata({
  params,
}: Pick<V2PageProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "v2.intro" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function V2Page({ params, searchParams }: V2PageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  setRequestLocale(locale);

  const query = await searchParams;
  const introQuery = typeof query.intro === "string" ? query.intro : "";
  const t = await getTranslations({ locale, namespace: "v2.intro" });

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: INTRO_BOOTSTRAP }} />
      <div
        className={`portfolio-v2-route ${anybody.variable} ${beVietnamPro.variable} ${ibmPlexMono.variable}`}
      >
        <PortfolioV2Shell
          locale={locale}
          introQuery={introQuery}
          copy={{
            introLabel: t("introLabel"),
            portfolio: t("portfolio"),
            wordmark: t("wordmark"),
            specialties: [
              t("specialties.backend"),
              t("specialties.realtime"),
              t("specialties.ai"),
            ],
            skip: t("skip"),
            preparing: t("preparing"),
            ready: t("ready"),
            fallbackReady: t("fallbackReady"),
            portraitFallback: t("portraitFallback"),
            handoffEyebrow: t("handoff.eyebrow"),
            handoffRole: t("handoff.role"),
            handoffNote: t("handoff.note"),
            partLabel: t("handoff.partLabel"),
            reviewLabel: t("handoff.reviewLabel"),
          }}
        />
      </div>
    </>
  );
}
