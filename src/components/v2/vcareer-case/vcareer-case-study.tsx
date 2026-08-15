import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { VCAREER_PROJECT } from "@/data/projects";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { VCAREER_SHOWCASE_STAGES } from "@/lib/v2/vcareer-showcase";
import { ArchitectureTrace } from "./architecture-trace";
import { EvidenceArchive } from "./evidence-archive";
import { NarrativeMotionSection } from "./narrative-motion-section";
import styles from "./vcareer-case-study.module.css";

const FACT_KEYS = ["pilot", "confidence", "review"] as const;
const PROBLEM_FLOW_KEYS = ["cv", "criteria", "interview"] as const;
const SCOPE_KEYS = ["realtime", "matching", "builder"] as const;
const DELIVERY_KEYS = ["discovery", "build", "pilot"] as const;
const SHIPPED_KEYS = ["interview", "cv", "jd", "feedback"] as const;
const ROADMAP_KEYS = ["mentor", "progress", "jobs"] as const;
const CHAPTERS = [
  { key: "signal", href: "#case-signal" },
  { key: "problem", href: "#case-problem" },
  { key: "delivery", href: "#case-delivery" },
  { key: "system", href: "#case-system" },
  { key: "screens", href: "#case-screens" },
  { key: "state", href: "#case-state" },
] as const;

type VCareerCaseStudyProps = {
  locale: Locale;
};

export async function VCareerCaseStudy({ locale }: VCareerCaseStudyProps) {
  const t = await getTranslations({ locale, namespace: "vcareerCaseStudy" });
  const projectT = await getTranslations({
    locale,
    namespace: "projects.items.vcareer",
  });
  const alternateLocale = locale === "vi" ? "en" : "vi";
  const heroImage = VCAREER_PROJECT.images.find(
    (image) => image.shot === "interviewDemo",
  );

  if (!heroImage) {
    throw new Error("VCareer interview evidence is missing");
  }

  const evidenceImages = VCAREER_SHOWCASE_STAGES.map((image, index) => ({
    alt: projectT(`shots.${image.key}`),
    caption: projectT(`shots.${image.key}`),
    evidence: image.evidence,
    height: image.height,
    indexLabel: t("v2.evidenceArchive.screenCount", {
      index: String(index + 1).padStart(2, "0"),
      count: String(VCAREER_SHOWCASE_STAGES.length).padStart(2, "0"),
    }),
    scopeLabel:
      image.evidence === "direct"
        ? t("v2.evidenceArchive.labels.direct")
        : t("v2.evidenceArchive.labels.context"),
    shot: image.key,
    src: image.src,
    width: image.width,
  }));

  return (
    <div className={styles.root} data-vcareer-case-root>
      <a className={styles.skipLink} href="#case-signal">
        {t("v2.skipToContent")}
      </a>

      <header className={styles.siteHeader}>
        <div className={styles.headerRail}>
          <Link
            href="/v2?intro=0"
            className={styles.wordmark}
            aria-label={`Nguyen Manh Tu — ${t("v2.portfolioHome")}`}
          >
            Nguyen Manh Tu
          </Link>

          <p className={styles.caseIndex}>{t("v2.caseIndex")}</p>

          <div className={styles.headerActions}>
            <nav
              className={styles.localeSwitch}
              aria-label={t("v2.localeLabel")}
            >
              <span className={styles.activeLocale} aria-current="page">
                {locale.toUpperCase()}
              </span>
              <span className={styles.localeDivider} aria-hidden>
                /
              </span>
              <Link
                href="/projects/vcareer"
                locale={alternateLocale}
                className={styles.localeLink}
                aria-label={
                  alternateLocale === "en"
                    ? t("v2.switchToEnglish")
                    : t("v2.switchToVietnamese")
                }
              >
                {alternateLocale.toUpperCase()}
              </Link>
            </nav>

            <Link href="/v2?intro=0#vcareer" className={styles.returnLink}>
              <span aria-hidden>←</span>
              <span className={styles.returnText}>{t("v2.returnLabel")}</span>
            </Link>
          </div>
        </div>
      </header>

      <article>
        <header className={styles.cover}>
          <div className={styles.coverTopline}>
            <p>{t("v2.cover.caseLabel")}</p>
            <p>{t("v2.cover.timeline")}</p>
          </div>

          <div className={styles.coverTitleBlock}>
            <h1>{t("title")}</h1>
            <div className={styles.coverMarker} aria-hidden>
              <span />
              <span />
            </div>
          </div>

          <div className={styles.coverNarrative}>
            <div className={styles.coverIdentity}>
              <p className={styles.coverSubtitle}>{t("subtitle")}</p>
              <p className={styles.coverStatus}>
                <span aria-hidden />
                {t("v2.cover.statusLabel")}
              </p>
            </div>

            <div className={styles.coverCopy}>
              <p>{t("summary")}</p>
              <div className={styles.coverActions}>
                <ExternalAction
                  href={VCAREER_PROJECT.liveUrl}
                  label={t("actions.live")}
                  newWindowLabel={t("v2.opensNewWindow")}
                  primary
                />
                <ExternalAction
                  href={VCAREER_PROJECT.architectureUrl}
                  label={t("actions.architecture")}
                  newWindowLabel={t("v2.opensNewWindow")}
                />
              </div>
            </div>
          </div>

          <figure className={styles.coverFigure}>
            <div className={styles.coverImageFrame}>
              <Image
                src={heroImage.src}
                alt={projectT(`shots.${heroImage.shot}`)}
                width={heroImage.width ?? 1920}
                height={heroImage.height ?? 908}
                priority
                sizes="(max-width: 768px) 94vw, (max-width: 1440px) 86vw, 1280px"
                className={styles.coverImage}
              />
            </div>
            <figcaption className={styles.coverCaption}>
              <span>{t("v2.cover.screenLabel")}</span>
              <span>{t("v2.cover.screenContext")}</span>
              <span>{projectT(`shots.${heroImage.shot}`)}</span>
            </figcaption>
          </figure>
        </header>

        <section
          id="case-signal"
          className={styles.signalSheet}
          aria-labelledby="case-signal-title"
          tabIndex={-1}
        >
          <div className={styles.signalHeading}>
            <p className={styles.sectionCode}>{t("v2.signal.eyebrow")}</p>
            <h2 id="case-signal-title">{t("v2.signal.title")}</h2>
            <p>{t("v2.signal.description")}</p>
          </div>

          <dl className={styles.factLedger}>
            {FACT_KEYS.map((key, index) => (
              <div className={styles.fact} key={key}>
                <span className={styles.factIndex} aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <dt>{t(`facts.${key}.value`)}</dt>
                <dd className={styles.factLabel}>{t(`facts.${key}.label`)}</dd>
                <dd className={styles.factDetail}>
                  {t(`facts.${key}.detail`)}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className={styles.caseDocument}>
          <nav
            className={styles.chapterNavigation}
            aria-label={t("v2.caseNavigation")}
          >
            <ol>
              {CHAPTERS.map((chapter, index) => (
                <li key={chapter.key}>
                  <a href={chapter.href}>
                    <span aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {t(`v2.chapters.${chapter.key}`)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.caseContent}>
            <NarrativeMotionSection
              id="case-problem"
              className={`${styles.caseSection} ${styles.problemSection}`}
              labelledBy="case-problem-title"
              kind="problem"
            >
              <div
                className={styles.narrativeHeading}
                data-narrative-reveal="heading"
              >
                <SectionHeading
                  code={t("v2.sectionCodes.problem")}
                  id="case-problem-title"
                  title={t("problem.title")}
                />
              </div>

              <div className={styles.problemGrid}>
                <ol
                  className={styles.problemFlow}
                  aria-label={t("v2.problemFlow.label")}
                  data-narrative-reveal="flow"
                >
                  {PROBLEM_FLOW_KEYS.map((key, index) => (
                    <li key={key}>
                      <span className={styles.problemFlowIndex} aria-hidden>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <strong>{t(`v2.problemFlow.${key}`)}</strong>
                      <span className={styles.problemFlowNode} aria-hidden />
                    </li>
                  ))}
                </ol>
                <p className={styles.leadCopy} data-narrative-reveal="copy">
                  {t("problem.body")}
                </p>
              </div>

              <div className={styles.scopeFrame}>
                <header
                  className={styles.scopeHeader}
                  data-narrative-reveal="heading"
                >
                  <p className={styles.subsectionLabel}>{t("scope.eyebrow")}</p>
                  <h3>{t("scope.title")}</h3>
                </header>

                <div
                  className={styles.scopeTrace}
                  data-narrative-reveal="trace"
                >
                  <span className={styles.scopeTraceLine} aria-hidden />
                  <ol className={styles.scopeList}>
                    {SCOPE_KEYS.map((key, index) => (
                      <li key={key} data-narrative-reveal="item">
                        <span className={styles.scopeIndex} aria-hidden>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className={styles.scopeNode} aria-hidden />
                        <div className={styles.scopeTitle}>
                          <p>{t("v2.scopeLabels.direct")}</p>
                          <h4>{t(`scope.items.${key}.title`)}</h4>
                        </div>
                        <p className={styles.scopeBody}>
                          {t(`scope.items.${key}.body`)}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>

                <aside
                  className={styles.scopeContext}
                  data-narrative-reveal="context"
                >
                  <p>{t("v2.scopeLabels.context")}</p>
                  <p>{t("scope.intro")}</p>
                </aside>
              </div>
            </NarrativeMotionSection>

            <NarrativeMotionSection
              id="case-delivery"
              className={`${styles.caseSection} ${styles.deliverySection}`}
              labelledBy="case-delivery-title"
              kind="delivery"
            >
              <div
                className={styles.narrativeHeading}
                data-narrative-reveal="heading"
              >
                <SectionHeading
                  code={t("v2.sectionCodes.delivery")}
                  id="case-delivery-title"
                  title={t("timeline.title")}
                />
              </div>

              <div
                className={styles.deliveryTrace}
                data-narrative-reveal="trace"
              >
                <p
                  className={styles.deliveryWindow}
                  data-narrative-reveal="label"
                >
                  {t("v2.deliveryTrace.buildWindow")}
                </p>
                <span className={styles.deliveryLine} aria-hidden />
                <ol className={styles.timelineList}>
                  {DELIVERY_KEYS.map((key, index) => (
                    <li
                      className={styles.timelineMilestone}
                      key={key}
                      data-narrative-reveal="item"
                    >
                      <span className={styles.timelineNode} aria-hidden />
                      <span className={styles.timelineIndex} aria-hidden>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className={styles.timelineLabel}>
                        {t(`timeline.items.${key}.label`)}
                      </p>
                      <h3>{t(`timeline.items.${key}.title`)}</h3>
                      <p>{t(`timeline.items.${key}.body`)}</p>
                    </li>
                  ))}

                  <li
                    className={styles.recognitionMilestone}
                    data-narrative-reveal="recognition"
                  >
                    <span className={styles.recognitionBranch} aria-hidden />
                    <span className={styles.timelineNode} aria-hidden />
                    <span className={styles.timelineIndex} aria-hidden>
                      04
                    </span>
                    <p className={styles.recognitionBoundary}>
                      {t("v2.deliveryTrace.recognitionBoundary")}
                    </p>
                    <p className={styles.timelineLabel}>
                      {t("timeline.items.hackathon.label")}
                    </p>
                    <h3>{t("timeline.items.hackathon.title")}</h3>
                    <p>{t("timeline.items.hackathon.body")}</p>
                  </li>
                </ol>
              </div>
            </NarrativeMotionSection>

            <section
              id="case-system"
              className={`${styles.caseSection} ${styles.systemSection}`}
              aria-labelledby="case-system-title"
            >
              <SectionHeading
                code={t("v2.sectionCodes.system")}
                id="case-system-title"
                title={t("architecture.title")}
                description={t("architecture.disclaimer")}
              />
              <ArchitectureTrace
                labels={{
                  path: t("v2.architectureTrace.pathLabel"),
                  context: t("v2.architectureTrace.labels.context"),
                  direct: t("v2.architectureTrace.labels.direct"),
                  current: t("v2.architectureTrace.labels.current"),
                  pending: t("v2.architectureTrace.labels.pending"),
                }}
                browser={{
                  title: t("v2.architectureTrace.browser.title"),
                  body: t("v2.architectureTrace.browser.body"),
                }}
                realtime={{
                  title: t("scope.items.realtime.title"),
                  body: t("scope.items.realtime.body"),
                }}
                application={{
                  title: t("architecture.items.application.title"),
                  body: t("architecture.items.application.body"),
                }}
                workflows={{
                  title: t("v2.architectureTrace.workflows.title"),
                  matching: {
                    title: t("scope.items.matching.title"),
                    body: t("scope.items.matching.body"),
                  },
                  builder: {
                    title: t("scope.items.builder.title"),
                    body: t("scope.items.builder.body"),
                  },
                }}
                storage={{
                  title: t("architecture.items.storage.title"),
                  body: t("architecture.items.storage.body"),
                }}
                deployment={{
                  title: t("v2.architectureTrace.deployment.title"),
                  current: {
                    title: t("v2.architectureTrace.deployment.current.title"),
                    body: t("v2.architectureTrace.deployment.current.body"),
                  },
                  pending: {
                    title: t("v2.architectureTrace.deployment.pending.title"),
                    body: t("v2.architectureTrace.deployment.pending.body"),
                  },
                }}
                report={{
                  label: t("v2.architectureTrace.report.label"),
                  body: t("v2.architectureTrace.report.body"),
                  href: VCAREER_PROJECT.architectureUrl,
                  linkLabel: t("v2.architectureTrace.report.linkLabel"),
                  newWindowLabel: t("v2.opensNewWindow"),
                }}
              />
            </section>

            <section
              id="case-screens"
              className={styles.caseSection}
              aria-labelledby="case-screens-title"
            >
              <SectionHeading
                code={t("v2.sectionCodes.screens")}
                id="case-screens-title"
                title={t("evidence.title")}
                description={t("evidence.description")}
              />
              <EvidenceArchive
                images={evidenceImages}
                copy={{
                  close: t("v2.evidenceArchive.viewer.close"),
                  inspect: t("v2.evidenceArchive.inspect"),
                  keyboardHint: t("v2.evidenceArchive.viewer.keyboardHint"),
                  loading: t("v2.evidenceArchive.loading"),
                  next: t("v2.evidenceArchive.viewer.next"),
                  openOriginal: t("v2.evidenceArchive.viewer.openOriginal"),
                  previous: t("v2.evidenceArchive.viewer.previous"),
                  unavailable: t("v2.evidenceArchive.unavailable"),
                  viewerLabel: t("v2.evidenceArchive.viewer.label"),
                }}
              />
            </section>

            <NarrativeMotionSection
              id="case-state"
              className={`${styles.caseSection} ${styles.stateSection}`}
              labelledBy="case-state-title"
              kind="state"
            >
              <div data-narrative-reveal="heading">
                <SectionHeading
                  code={t("v2.sectionCodes.state")}
                  id="case-state-title"
                  title={t("delivery.title")}
                />
              </div>

              <div className={styles.stateBoundary}>
                <header
                  className={styles.stateBoundaryRoot}
                  data-narrative-reveal="root"
                >
                  <p>{t("v2.stateBoundary.rootLabel")}</p>
                  <span aria-hidden />
                </header>

                <div className={styles.stateBranches}>
                  <section
                    className={`${styles.stateBranch} ${styles.shippedState}`}
                    data-narrative-reveal="branch"
                  >
                    <span className={styles.stateBranchRule} aria-hidden />
                    <p className={styles.stateLabel}>
                      {t("v2.stateLabels.shipped")}
                    </p>
                    <h3>{t("delivery.shipped.title")}</h3>
                    <ul>
                      {SHIPPED_KEYS.map((key) => (
                        <li key={key}>{t(`delivery.shipped.items.${key}`)}</li>
                      ))}
                    </ul>
                  </section>
                  <section
                    className={`${styles.stateBranch} ${styles.roadmapState}`}
                    data-narrative-reveal="branch"
                  >
                    <span className={styles.stateBranchRule} aria-hidden />
                    <p className={styles.stateLabel}>
                      {t("v2.stateLabels.roadmap")}
                    </p>
                    <h3>{t("delivery.roadmap.title")}</h3>
                    <p className={styles.roadmapNotice}>
                      {t("delivery.roadmap.status")}
                    </p>
                    <ul>
                      {ROADMAP_KEYS.map((key) => (
                        <li key={key}>{t(`delivery.roadmap.items.${key}`)}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>

              <aside
                className={styles.repositoryTerminal}
                data-narrative-reveal="source"
              >
                <span className={styles.repositoryTerminalNode} aria-hidden />
                <p>{t("links.eyebrow")}</p>
                <div>
                  <h3>{t("links.repoTitle")}</h3>
                  <p>{t("links.repoBody")}</p>
                </div>
              </aside>
            </NarrativeMotionSection>
          </div>
        </div>
      </article>

      <footer className={styles.caseFooter}>
        <p>{t("v2.footer.caseLabel")}</p>
        <p>© 2026 Nguyen Manh Tu</p>
        <Link href="/v2?intro=0#vcareer">
          {t("v2.footer.return")}
          <span aria-hidden> ↑</span>
        </Link>
      </footer>
    </div>
  );
}

function SectionHeading({
  code,
  description,
  id,
  title,
}: {
  code: string;
  description?: string;
  id: string;
  title: string;
}) {
  return (
    <header className={styles.sectionHeading}>
      <p className={styles.sectionCode}>{code}</p>
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}

function ExternalAction({
  href,
  label,
  newWindowLabel,
  primary = false,
}: {
  href?: string;
  label: string;
  newWindowLabel: string;
  primary?: boolean;
}) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={primary ? styles.primaryAction : styles.secondaryAction}
    >
      <span>{label}</span>
      <span aria-hidden>↗</span>
      <span className={styles.visuallyHidden}>{newWindowLabel}</span>
    </a>
  );
}
