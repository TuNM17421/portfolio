import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { VCAREER_PROJECT } from "@/data/projects";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  CodeIcon,
  ExternalLinkIcon,
} from "@/components/icons";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const FACT_KEYS = ["pilot", "confidence", "review"] as const;
const SCOPE_KEYS = ["realtime", "matching", "builder"] as const;
const TIMELINE_KEYS = ["discovery", "build", "hackathon", "pilot"] as const;
const ARCHITECTURE_KEYS = [
  "realtime",
  "application",
  "storage",
  "deployment",
] as const;
const SHIPPED_KEYS = ["interview", "cv", "jd", "feedback"] as const;
const ROADMAP_KEYS = ["mentor", "progress", "jobs"] as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "vcareerCaseStudy.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function VCareerCaseStudyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "vcareerCaseStudy" });
  const projectT = await getTranslations({
    locale,
    namespace: "projects.items.vcareer",
  });
  const heroImage = VCAREER_PROJECT.images.find(
    (image) => image.shot === "interviewDemo",
  )!;
  const evidenceImages = VCAREER_PROJECT.images.filter(
    (image) => image.shot !== heroImage.shot,
  );

  return (
    <article className="pb-20 sm:pb-28">
      <header className="mx-auto max-w-6xl px-6 pb-16 pt-10 sm:pb-20 sm:pt-16">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg pr-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          {t("back")}
        </Link>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <div className="reveal">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent-2">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 text-[clamp(3.3rem,8vw,6.8rem)] font-extrabold leading-[0.9] tracking-[-0.055em]">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg font-semibold text-gradient sm:text-xl">
              {t("subtitle")}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("summary")}
            </p>

            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 font-mono text-xs text-muted-foreground">
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent-2" />
              {t("status")}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={VCAREER_PROJECT.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white glow-brand transition-transform hover:-translate-y-0.5"
              >
                {t("actions.live")}
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
              <a
                href={VCAREER_PROJECT.architectureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold transition-colors hover:border-primary"
              >
                {t("actions.architecture")}
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <figure className="reveal overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <Image
              src={heroImage.src}
              alt={projectT(`shots.${heroImage.shot}`)}
              width={1920}
              height={908}
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="h-auto w-full"
            />
            <figcaption className="border-t border-border px-4 py-3 font-mono text-xs text-muted-foreground">
              {projectT(`shots.${heroImage.shot}`)} · Three.js TalkingHead
            </figcaption>
          </figure>
        </div>

        <dl className="reveal mt-12 grid border-y border-border sm:grid-cols-3">
          {FACT_KEYS.map((key, index) => (
            <div
              key={key}
              className={`py-6 sm:px-6 ${
                index > 0
                  ? "border-t border-border sm:border-l sm:border-t-0"
                  : "sm:pl-0"
              }`}
            >
              <dt className="text-2xl font-extrabold tracking-tight text-gradient">
                {t(`facts.${key}.value`)}
              </dt>
              <dd className="mt-1 text-sm font-semibold">
                {t(`facts.${key}.label`)}
              </dd>
              <dd className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {t(`facts.${key}.detail`)}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 border-b border-border py-16 sm:py-20 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <section className="reveal" aria-labelledby="vcareer-problem">
            <SectionEyebrow>{t("problem.eyebrow")}</SectionEyebrow>
            <h2
              id="vcareer-problem"
              className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {t("problem.title")}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {t("problem.body")}
            </p>
          </section>

          <section className="reveal" aria-labelledby="vcareer-scope">
            <SectionEyebrow>{t("scope.eyebrow")}</SectionEyebrow>
            <h2
              id="vcareer-scope"
              className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {t("scope.title")}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {t("scope.intro")}
            </p>
            <ol className="mt-7 border-t border-border">
              {SCOPE_KEYS.map((key, index) => (
                <li
                  key={key}
                  className="grid gap-2 border-b border-border py-5 sm:grid-cols-[2.5rem_1fr]"
                >
                  <span className="font-mono text-xs text-accent-2">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{t(`scope.items.${key}.title`)}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t(`scope.items.${key}.body`)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section
          className="reveal border-b border-border py-16 sm:py-20"
          aria-labelledby="vcareer-timeline"
        >
          <SectionEyebrow>{t("timeline.eyebrow")}</SectionEyebrow>
          <h2
            id="vcareer-timeline"
            className="mt-3 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {t("timeline.title")}
          </h2>

          <ol className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-2">
            {TIMELINE_KEYS.map((key) => (
              <li key={key} className="relative border-l-2 border-primary pl-5">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent-2">
                  {t(`timeline.items.${key}.label`)}
                </span>
                <h3 className="mt-1.5 text-lg font-bold">
                  {t(`timeline.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`timeline.items.${key}.body`)}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="reveal border-b border-border py-16 sm:py-20"
          aria-labelledby="vcareer-architecture"
        >
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div>
              <SectionEyebrow>{t("architecture.eyebrow")}</SectionEyebrow>
              <h2
                id="vcareer-architecture"
                className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl"
              >
                {t("architecture.title")}
              </h2>
              <p className="mt-5 border-l-2 border-accent-2 pl-4 text-sm leading-relaxed text-muted-foreground">
                {t("architecture.disclaimer")}
              </p>
            </div>

            <div className="grid gap-x-8 sm:grid-cols-2">
              {ARCHITECTURE_KEYS.map((key) => (
                <div key={key} className="border-t border-border py-5">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent-2">
                    {t(`architecture.items.${key}.label`)}
                  </p>
                  <h3 className="mt-2 font-semibold">
                    {t(`architecture.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`architecture.items.${key}.body`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technology stack">
            {VCAREER_PROJECT.tech.map((technology) => (
              <li
                key={technology}
                className="rounded-md border border-border bg-surface px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground"
              >
                {technology}
              </li>
            ))}
          </ul>
        </section>

        <section
          className="reveal border-b border-border py-16 sm:py-20"
          aria-labelledby="vcareer-evidence"
        >
          <SectionEyebrow>{t("evidence.eyebrow")}</SectionEyebrow>
          <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_0.9fr] sm:items-end">
            <h2
              id="vcareer-evidence"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {t("evidence.title")}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-right">
              {t("evidence.description")}
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {evidenceImages.map((image, index) => (
              <figure
                key={image.src}
                className={`overflow-hidden rounded-xl border border-border bg-card ${
                  index === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <Image
                  src={image.src}
                  alt={projectT(`shots.${image.shot}`)}
                  width={1920}
                  height={914}
                  sizes={
                    index === 0
                      ? "(max-width: 1152px) 100vw, 1152px"
                      : "(max-width: 640px) 100vw, 50vw"
                  }
                  className="h-auto w-full"
                />
                <figcaption className="border-t border-border px-4 py-3 font-mono text-xs text-muted-foreground">
                  {projectT(`shots.${image.shot}`)}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section
          className="reveal py-16 sm:py-20"
          aria-labelledby="vcareer-delivery"
        >
          <SectionEyebrow>{t("delivery.eyebrow")}</SectionEyebrow>
          <h2
            id="vcareer-delivery"
            className="mt-3 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {t("delivery.title")}
          </h2>

          <div className="mt-9 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
              <h3 className="text-lg font-bold">{t("delivery.shipped.title")}</h3>
              <ul className="mt-5 space-y-4">
                {SHIPPED_KEYS.map((key) => (
                  <li key={key} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
                    <span>{t(`delivery.shipped.items.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-primary/50 bg-accent p-6 sm:p-7">
              <h3 className="text-lg font-bold text-accent-foreground">
                {t("delivery.roadmap.title")}
              </h3>
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                {t("delivery.roadmap.status")}
              </p>
              <ul className="mt-5 space-y-4">
                {ROADMAP_KEYS.map((key) => (
                  <li key={key} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{t(`delivery.roadmap.items.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex gap-4 rounded-xl border border-border bg-surface p-5 sm:items-center">
            <CodeIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary sm:mt-0" />
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent-2">
                {t("links.eyebrow")}
              </p>
              <h3 className="mt-1 font-semibold">{t("links.repoTitle")}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {t("links.repoBody")}
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-accent-2">
      {children}
    </p>
  );
}
