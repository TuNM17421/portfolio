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

const INTRO_BOOTSTRAP = `(function(){try{delete document.documentElement.dataset.introDirect;var value=new URLSearchParams(window.location.search).get('intro');var bypass=value==='0'||value==='off'||value==='skip';if(bypass){document.documentElement.dataset.intro='skipped';document.documentElement.dataset.introDirect='true';return;}document.documentElement.dataset.intro='pending';window.__portfolioV2IntroFallback=window.setTimeout(function(){document.documentElement.dataset.intro='complete';},8000);}catch(error){document.documentElement.dataset.intro='complete';}})();`;
const NO_SCRIPT_HEADER_STYLE = `.portfolio-v2-route [data-v2-header]{color:#edf4f5!important}.portfolio-v2-route [data-v2-header-rail]{border-bottom:1px solid rgba(107,215,208,.2);background:rgba(7,18,25,.94);backdrop-filter:blur(16px)}`;

type V2PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    intro?: string | string[];
    hold?: string | string[];
    portrait?: string | string[];
    showcase?: string | string[];
    story?: string | string[];
  }>;
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
  const holdQuery = typeof query.hold === "string" ? query.hold : "";
  const portraitQuery =
    typeof query.portrait === "string" ? query.portrait : "";
  const storyQuery = typeof query.story === "string" ? query.story : "";
  const showcaseQuery =
    typeof query.showcase === "string" ? query.showcase : "";
  const introT = await getTranslations({ locale, namespace: "v2.intro" });
  const heroT = await getTranslations({ locale, namespace: "v2.hero" });
  const aboutT = await getTranslations({ locale, namespace: "v2.about" });
  const vcareerT = await getTranslations({
    locale,
    namespace: "v2.vcareer",
  });

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: INTRO_BOOTSTRAP }} />
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: NO_SCRIPT_HEADER_STYLE }} />
      </noscript>
      <div
        className={`portfolio-v2-route ${anybody.variable} ${beVietnamPro.variable} ${ibmPlexMono.variable}`}
      >
        <PortfolioV2Shell
          locale={locale}
          introQuery={introQuery}
          holdQuery={holdQuery}
          portraitQuery={portraitQuery}
          showcaseQuery={showcaseQuery}
          storyQuery={storyQuery}
          introCopy={{
            introLabel: introT("introLabel"),
            portfolio: introT("portfolio"),
            wordmark: introT("wordmark"),
            specialties: [
              introT("specialties.backend"),
              introT("specialties.realtime"),
              introT("specialties.ai"),
            ],
            skip: introT("skip"),
            preparing: introT("preparing"),
            ready: introT("ready"),
            fallbackReady: introT("fallbackReady"),
          }}
          headerCopy={{
            wordmark: introT("wordmark"),
            homeLabel: heroT("homeLabel"),
            navigationLabel: heroT("navigationLabel"),
            vcareer: heroT("vcareerNav"),
            contact: heroT("contact"),
            localeLabel: heroT("localeLabel"),
            openMenu: heroT("openMenu"),
            closeMenu: heroT("closeMenu"),
            proof: heroT("proof"),
          }}
          heroCopy={{
            role: heroT("role"),
            positioning: heroT("positioning"),
            location: heroT("location"),
            primaryAction: heroT("primaryAction"),
            proof: heroT("proof"),
            contact: heroT("contact"),
            portraitAlt: heroT("portraitAlt"),
            portraitFallback: introT("portraitFallback"),
          }}
          aboutCopy={{
            eyebrow: aboutT("eyebrow"),
            axis: aboutT("axis"),
            foundationLabel: aboutT("foundationLabel"),
            foundationPrefix: aboutT("foundationPrefix"),
            foundationAnchor: aboutT("foundationAnchor"),
            foundationSuffix: aboutT("foundationSuffix"),
            extension: aboutT("extension"),
            foundationBody: aboutT("foundationBody"),
            principleLabel: aboutT("principleLabel"),
            principle: aboutT("principle"),
            principleBody: aboutT("principleBody"),
            processLabel: aboutT("processLabel"),
            process: [
              aboutT("process.problem"),
              aboutT("process.proof"),
              aboutT("process.usage"),
              aboutT("process.scale"),
            ],
            closingLabel: aboutT("closingLabel"),
            closing: aboutT("closing"),
          }}
          vcareerCopy={{
            eyebrow: vcareerT("eyebrow"),
            status: vcareerT("status"),
            title: vcareerT("title"),
            subtitle: vcareerT("subtitle"),
            proposition: vcareerT("proposition"),
            pilotValue: vcareerT("pilotValue"),
            pilotLabel: vcareerT("pilotLabel"),
            scopeLabel: vcareerT("scopeLabel"),
            scope: [
              vcareerT("scope.livekit"),
              vcareerT("scope.matching"),
              vcareerT("scope.jdBuilder"),
            ],
            workflowLabel: vcareerT("workflowLabel"),
            workflowTitle: vcareerT("workflowTitle"),
            architectureLabel: vcareerT("architectureLabel"),
            architectureSource: vcareerT("architectureSource"),
            architectureTarget: vcareerT("architectureTarget"),
            screenshotDisclaimer: vcareerT("screenshotDisclaimer"),
            screenLabel: vcareerT("screenLabel"),
            labels: {
              direct: vcareerT("labels.direct"),
              context: vcareerT("labels.context"),
              analysis: vcareerT("labels.analysis"),
              baseline: vcareerT("labels.baseline"),
            },
            stages: {
              landing: {
                name: vcareerT("stages.landing.name"),
                caption: vcareerT("stages.landing.caption"),
                alt: vcareerT("stages.landing.alt"),
              },
              cvBuilder: {
                name: vcareerT("stages.cvBuilder.name"),
                caption: vcareerT("stages.cvBuilder.caption"),
                alt: vcareerT("stages.cvBuilder.alt"),
              },
              match: {
                name: vcareerT("stages.match.name"),
                caption: vcareerT("stages.match.caption"),
                alt: vcareerT("stages.match.alt"),
              },
              interviewDemo: {
                name: vcareerT("stages.interviewDemo.name"),
                caption: vcareerT("stages.interviewDemo.caption"),
                alt: vcareerT("stages.interviewDemo.alt"),
              },
              interviewReview: {
                name: vcareerT("stages.interviewReview.name"),
                caption: vcareerT("stages.interviewReview.caption"),
                alt: vcareerT("stages.interviewReview.alt"),
              },
              dashboard: {
                name: vcareerT("stages.dashboard.name"),
                caption: vcareerT("stages.dashboard.caption"),
                alt: vcareerT("stages.dashboard.alt"),
              },
            },
            outcomesCode: vcareerT("outcomesCode"),
            outcomesLabel: vcareerT("outcomesLabel"),
            outcomes: [
              vcareerT("outcomes.confidence"),
              vcareerT("outcomes.review"),
              vcareerT("outcomes.award"),
            ],
            repositoryState: vcareerT("repositoryState"),
            primaryAction: vcareerT("primaryAction"),
            liveAction: vcareerT("liveAction"),
            architectureAction: vcareerT("architectureAction"),
            opensNewWindow: vcareerT("opensNewWindow"),
            imageUnavailable: vcareerT("imageUnavailable"),
          }}
        />
      </div>
    </>
  );
}
