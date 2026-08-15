import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PortfolioV2Shell } from "@/components/v2/portfolio-v2-shell";
import { isSupportedLocale } from "@/i18n/routing";
import { isContactDeliveryConfigured } from "@/lib/contact-delivery-config";
import { parseRecognitionDocumentary } from "@/lib/v2/career-recognition";
import { v2FontVariables } from "@/lib/v2/fonts";
import { shouldSkipIntro } from "@/lib/v2/intro-readiness";

const INTRO_BOOTSTRAP = `(function(){try{delete document.documentElement.dataset.introDirect;var bypass=new URLSearchParams(window.location.search).get('intro')==='0';if(bypass){document.documentElement.dataset.intro='skipped';document.documentElement.dataset.introDirect='true';return;}document.documentElement.dataset.intro='pending';window.__portfolioV2IntroFallback=window.setTimeout(function(){document.documentElement.dataset.intro='complete';},8000);}catch(error){document.documentElement.dataset.intro='complete';}})();`;
const NO_SCRIPT_HEADER_STYLE = `.portfolio-v2-route [data-v2-header]{color:#edf4f5!important}.portfolio-v2-route [data-v2-header-rail]{border-bottom:1px solid rgba(107,215,208,.2);background:rgba(7,18,25,.94);backdrop-filter:blur(16px)}`;

type V2PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    intro?: string | string[];
    recognition?: string | string[];
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
  const introValue = typeof query.intro === "string" ? query.intro : undefined;
  const recognitionValue =
    typeof query.recognition === "string" ? query.recognition : undefined;
  const skipIntro = shouldSkipIntro(introValue);
  const initialRecognitionDocumentary =
    parseRecognitionDocumentary(recognitionValue);
  const contactDeliveryEnabled = isContactDeliveryConfigured();
  const introT = await getTranslations({ locale, namespace: "v2.intro" });
  const heroT = await getTranslations({ locale, namespace: "v2.hero" });
  const aboutT = await getTranslations({ locale, namespace: "v2.about" });
  const vcareerT = await getTranslations({
    locale,
    namespace: "v2.vcareer",
  });
  const workT = await getTranslations({ locale, namespace: "v2.work" });
  const careerT = await getTranslations({ locale, namespace: "v2.career" });
  const capabilitiesT = await getTranslations({
    locale,
    namespace: "v2.capabilities",
  });
  const contactT = await getTranslations({ locale, namespace: "v2.contact" });

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: INTRO_BOOTSTRAP }} />
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: NO_SCRIPT_HEADER_STYLE }} />
      </noscript>
      <div className={`portfolio-v2-route ${v2FontVariables}`}>
        <PortfolioV2Shell
          locale={locale}
          skipIntro={skipIntro}
          initialRecognitionDocumentary={initialRecognitionDocumentary}
          contactDeliveryEnabled={contactDeliveryEnabled}
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
            work: heroT("workNav"),
            workProof: heroT("workProof"),
            career: heroT("careerNav"),
            careerProof: heroT("careerProof"),
            contact: heroT("contact"),
            localeLabel: heroT("localeLabel"),
            openMenu: heroT("openMenu"),
            closeMenu: heroT("closeMenu"),
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
            imageLoading: vcareerT("imageLoading"),
            imageUnavailable: vcareerT("imageUnavailable"),
          }}
          workCopy={{
            eyebrow: workT("eyebrow"),
            axis: workT("axis"),
            scholar: {
              kicker: workT("scholar.kicker"),
              status: workT("scholar.status"),
              title: workT("scholar.title"),
              subtitle: workT("scholar.subtitle"),
              thesis: workT("scholar.thesis"),
              scopeLabel: workT("scholar.scopeLabel"),
              scope: [
                workT("scholar.scope.search"),
                workT("scholar.scope.grounding"),
                workT("scholar.scope.evaluation"),
              ],
              evidenceLabel: workT("scholar.evidenceLabel"),
              screenLabel: workT("scholar.screenLabel"),
              evidence: {
                retrieve: {
                  label: workT("scholar.evidence.retrieve.label"),
                  title: workT("scholar.evidence.retrieve.title"),
                  caption: workT("scholar.evidence.retrieve.caption"),
                  alt: workT("scholar.evidence.retrieve.alt"),
                },
                ground: {
                  label: workT("scholar.evidence.ground.label"),
                  title: workT("scholar.evidence.ground.title"),
                  caption: workT("scholar.evidence.ground.caption"),
                  alt: workT("scholar.evidence.ground.alt"),
                },
                evaluate: {
                  label: workT("scholar.evidence.evaluate.label"),
                  title: workT("scholar.evidence.evaluate.title"),
                  caption: workT("scholar.evidence.evaluate.caption"),
                  qaLabel: workT("scholar.evidence.evaluate.qaLabel"),
                  qaCaption: workT("scholar.evidence.evaluate.qaCaption"),
                  qaAlt: workT("scholar.evidence.evaluate.qaAlt"),
                  refusalLabel: workT("scholar.evidence.evaluate.refusalLabel"),
                  refusalCaption: workT(
                    "scholar.evidence.evaluate.refusalCaption",
                  ),
                  refusalAlt: workT("scholar.evidence.evaluate.refusalAlt"),
                },
              },
              technology: workT("scholar.technology"),
              testingContext: workT("scholar.testingContext"),
              sourceState: workT("scholar.sourceState"),
              sourceAction: workT("scholar.sourceAction"),
            },
            financial: {
              eyebrow: workT("financial.eyebrow"),
              status: workT("financial.status"),
              title: workT("financial.title"),
              subtitle: workT("financial.subtitle"),
              description: workT("financial.description"),
              topologyLabel: workT("financial.topologyLabel"),
              domainLabel: workT("financial.domainLabel"),
              topology: {
                api: {
                  label: workT("financial.topology.api.label"),
                  title: workT("financial.topology.api.title"),
                  description: workT("financial.topology.api.description"),
                  action: workT("financial.topology.api.action"),
                },
                web: {
                  label: workT("financial.topology.web.label"),
                  title: workT("financial.topology.web.title"),
                  description: workT("financial.topology.web.description"),
                  action: workT("financial.topology.web.action"),
                },
                worker: {
                  label: workT("financial.topology.worker.label"),
                  title: workT("financial.topology.worker.title"),
                  description: workT("financial.topology.worker.description"),
                  action: workT("financial.topology.worker.action"),
                },
              },
              mediaLabel: workT("financial.mediaLabel"),
              media: {
                dashboard: {
                  label: workT("financial.media.dashboard.label"),
                  caption: workT("financial.media.dashboard.caption"),
                  alt: workT("financial.media.dashboard.alt"),
                },
                report: {
                  label: workT("financial.media.report.label"),
                  caption: workT("financial.media.report.caption"),
                  alt: workT("financial.media.report.alt"),
                },
              },
              sourceState: workT("financial.sourceState"),
            },
            opensNewWindow: workT("opensNewWindow"),
            imageLoading: workT("imageLoading"),
            imageUnavailable: workT("imageUnavailable"),
          }}
          careerCopy={{
            eyebrow: careerT("eyebrow"),
            axis: careerT("axis"),
            title: careerT("title"),
            summary: careerT("summary"),
            timelineLabel: careerT("timelineLabel"),
            responsibilitiesLabel: careerT("responsibilitiesLabel"),
            technologyLabel: careerT("technologyLabel"),
            records: {
              education: {
                index: careerT("records.education.index"),
                period: careerT("records.education.period"),
                title: careerT("records.education.title"),
                organization: careerT("records.education.organization"),
                meta: careerT("records.education.meta"),
                description: careerT("records.education.description"),
              },
              fpt: {
                index: careerT("records.fpt.index"),
                period: careerT("records.fpt.period"),
                title: careerT("records.fpt.title"),
                organization: careerT("records.fpt.organization"),
                meta: careerT("records.fpt.meta"),
                description: careerT("records.fpt.description"),
                responsibilities: careerT.raw(
                  "records.fpt.responsibilities",
                ) as string[],
                technology: careerT("records.fpt.technology"),
              },
              aiProgram: {
                index: careerT("records.aiProgram.index"),
                period: careerT("records.aiProgram.period"),
                title: careerT("records.aiProgram.title"),
                organization: careerT("records.aiProgram.organization"),
                meta: careerT("records.aiProgram.meta"),
                description: careerT("records.aiProgram.description"),
              },
            },
            recognition: {
              eyebrow: careerT("recognition.eyebrow"),
              title: careerT("recognition.title"),
              documentarySelectorLabel: careerT(
                "recognition.documentarySelectorLabel",
              ),
              documentaries: {
                ceremony: {
                  index: careerT("recognition.documentaries.ceremony.index"),
                  label: careerT("recognition.documentaries.ceremony.label"),
                  caption: careerT(
                    "recognition.documentaries.ceremony.caption",
                  ),
                  alt: careerT("recognition.documentaries.ceremony.alt"),
                },
                hackathon: {
                  index: careerT("recognition.documentaries.hackathon.index"),
                  label: careerT("recognition.documentaries.hackathon.label"),
                  caption: careerT(
                    "recognition.documentaries.hackathon.caption",
                  ),
                  alt: careerT("recognition.documentaries.hackathon.alt"),
                },
                careerServices: {
                  index: careerT(
                    "recognition.documentaries.careerServices.index",
                  ),
                  label: careerT(
                    "recognition.documentaries.careerServices.label",
                  ),
                  caption: careerT(
                    "recognition.documentaries.careerServices.caption",
                  ),
                  alt: careerT("recognition.documentaries.careerServices.alt"),
                },
              },
              imageLoading: careerT("recognition.imageLoading"),
              imageUnavailable: careerT("recognition.imageUnavailable"),
              supportingLabel: careerT("recognition.supportingLabel"),
              records: {
                vcareer: {
                  index: careerT("recognition.records.vcareer.index"),
                  project: careerT("recognition.records.vcareer.project"),
                  result: careerT("recognition.records.vcareer.result"),
                  context: careerT("recognition.records.vcareer.context"),
                  date: careerT("recognition.records.vcareer.date"),
                },
                wonderlens: {
                  index: careerT("recognition.records.wonderlens.index"),
                  project: careerT("recognition.records.wonderlens.project"),
                  result: careerT("recognition.records.wonderlens.result"),
                  context: careerT("recognition.records.wonderlens.context"),
                  date: careerT("recognition.records.wonderlens.date"),
                },
                vinuni: {
                  index: careerT("recognition.records.vinuni.index"),
                  project: careerT("recognition.records.vinuni.project"),
                  result: careerT("recognition.records.vinuni.result"),
                  context: careerT("recognition.records.vinuni.context"),
                  date: careerT("recognition.records.vinuni.date"),
                },
              },
            },
          }}
          capabilitiesCopy={{
            eyebrow: capabilitiesT("eyebrow"),
            axis: capabilitiesT("axis"),
            title: capabilitiesT("title"),
            summary: capabilitiesT("summary"),
            technologyLabel: capabilitiesT("technologyLabel"),
            evidenceLabel: capabilitiesT("evidenceLabel"),
            proofAction: capabilitiesT("proofAction"),
            items: {
              backend: {
                index: capabilitiesT("items.backend.index"),
                title: capabilitiesT("items.backend.title"),
                description: capabilitiesT("items.backend.description"),
              },
              realtime: {
                index: capabilitiesT("items.realtime.index"),
                title: capabilitiesT("items.realtime.title"),
                description: capabilitiesT("items.realtime.description"),
              },
              retrieval: {
                index: capabilitiesT("items.retrieval.index"),
                title: capabilitiesT("items.retrieval.title"),
                description: capabilitiesT("items.retrieval.description"),
              },
              delivery: {
                index: capabilitiesT("items.delivery.index"),
                title: capabilitiesT("items.delivery.title"),
                description: capabilitiesT("items.delivery.description"),
              },
            },
            proofs: {
              career: capabilitiesT("proofs.career"),
              financial: capabilitiesT("proofs.financial"),
              vcareer: capabilitiesT("proofs.vcareer"),
              scholar: capabilitiesT("proofs.scholar"),
              scholarDelivery: capabilitiesT("proofs.scholarDelivery"),
              vcareerDelivery: capabilitiesT("proofs.vcareerDelivery"),
            },
          }}
          contactCopy={{
            eyebrow: contactT("eyebrow"),
            axis: contactT("axis"),
            title: contactT("title"),
            body: contactT("body"),
            primaryLabel: contactT("primaryLabel"),
            emailAction: contactT("emailAction"),
            secondaryLabel: contactT("secondaryLabel"),
            downloadCv: contactT("downloadCv"),
            github: contactT("github"),
            linkedin: contactT("linkedin"),
            opensNewTab: contactT("opensNewTab"),
            form: {
              label: contactT("form.label"),
              title: contactT("form.title"),
              body: contactT("form.body"),
              required: contactT("form.required"),
              name: contactT("form.name"),
              namePlaceholder: contactT("form.namePlaceholder"),
              email: contactT("form.email"),
              emailPlaceholder: contactT("form.emailPlaceholder"),
              message: contactT("form.message"),
              messagePlaceholder: contactT("form.messagePlaceholder"),
              submit: contactT("form.submit"),
              retry: contactT("form.retry"),
              sending: contactT("form.sending"),
              directEmail: contactT("form.directEmail"),
              validationSummary: contactT("form.validationSummary"),
              success: contactT("form.success"),
              rateLimit: contactT("form.rateLimit"),
              error: contactT("form.error"),
              offline: contactT("form.offline"),
              unavailable: contactT("form.unavailable"),
              staticFallback: contactT("form.staticFallback"),
              errors: {
                name: contactT("form.errors.name"),
                email: contactT("form.errors.email"),
                message: contactT("form.errors.message"),
              },
              stateLabels: {
                ready: contactT("form.stateLabels.ready"),
                validation: contactT("form.stateLabels.validation"),
                sending: contactT("form.stateLabels.sending"),
                success: contactT("form.stateLabels.success"),
                "rate-limit": contactT("form.stateLabels.rateLimit"),
                error: contactT("form.stateLabels.error"),
                offline: contactT("form.stateLabels.offline"),
                unavailable: contactT("form.stateLabels.unavailable"),
              },
            },
            footer: {
              backToTop: contactT("footer.backToTop"),
              copyright: contactT("footer.copyright"),
            },
          }}
        />
      </div>
    </>
  );
}
