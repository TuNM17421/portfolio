import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PROJECTS, type Project } from "@/data/projects";
import { SectionHead } from "@/components/section-head";
import {
  ArrowRightIcon,
  CodeIcon,
  ExternalLinkIcon,
  StarIcon,
} from "@/components/icons";
import { ProjectGallery } from "@/components/project-gallery";

export function ProjectsSection() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <SectionHead
        index="02"
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="reveal mt-11 grid gap-5 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.key} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("projects");
  const base = `items.${project.key}`;
  const period = t(`${base}.period`);
  const wide = Boolean(project.featured);

  return (
    <article
      className={`group relative flex overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:glow-brand ${
        wide ? "flex-col sm:col-span-2 md:flex-row" : "flex-col"
      }`}
    >
      <ProjectGallery
        images={project.images.map((img) => ({
          src: img.src,
          caption: t(`${base}.shots.${img.shot}`),
        }))}
        alt={t(`${base}.title`)}
        title={t(`${base}.title`)}
        wide={wide}
      />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold tracking-tight">
              {t(`${base}.title`)}
            </h3>
            <p className="font-mono text-[13px] font-semibold text-accent-2">
              {t(`${base}.subtitle`)}
            </p>
          </div>
          {project.featured && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-primary bg-accent px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-foreground">
              <StarIcon className="h-2.5 w-2.5" />
              {t("featured")}
            </span>
          )}
        </div>

        {period && (
          <p className="mt-2.5 font-mono text-xs text-faint">{period}</p>
        )}

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {t(`${base}.description`)}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, wide ? 9 : 6).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {(project.caseStudyPath || project.liveUrl || project.repoVisibility) && (
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-5">
            {project.caseStudyPath && (
              <Link
                href={project.caseStudyPath}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white glow-brand transition-transform hover:-translate-y-0.5"
              >
                {t("actions.caseStudy")}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold transition-colors hover:border-primary"
              >
                {t("actions.live")}
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            )}
            {project.repoVisibility === "private" && (
              <span className="inline-flex min-h-11 items-center gap-2 px-2 text-xs text-muted-foreground">
                <CodeIcon className="h-4 w-4 shrink-0" />
                {t("actions.privateRepo")}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
