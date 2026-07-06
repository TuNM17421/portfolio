import Image from "next/image";
import { useTranslations } from "next-intl";
import { PROJECTS, type Project } from "@/data/projects";
import { SectionHead } from "@/components/section-head";
import { GithubIcon } from "@/components/icons";

export function ProjectsSection() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-[74px]">
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
      className={`group relative flex overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/50 ${
        wide ? "flex-col sm:col-span-2 md:flex-row" : "flex-col"
      }`}
    >
      <ProjectImage
        src={project.image}
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
            <span className="shrink-0 rounded-full border border-primary bg-accent px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-foreground">
              ★ {t("featured")}
            </span>
          )}
        </div>

        {period && (
          <p className="mt-2.5 font-mono text-xs text-faint">{period}</p>
        )}

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {t(`${base}.description`)}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, wide ? 9 : 6).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-xs text-muted-foreground transition-colors hover:text-accent-2"
          >
            <GithubIcon className="h-4 w-4" />
            {t("viewCode")}
          </a>
        </div>
      </div>
    </article>
  );
}

function ProjectImage({
  src,
  alt,
  title,
  wide,
}: {
  src: string | null;
  alt: string;
  title: string;
  wide: boolean;
}) {
  const shape = wide
    ? "aspect-video md:aspect-auto md:w-[44%] md:min-h-full"
    : "aspect-video";

  if (!src) {
    return (
      <div
        className={`grid place-items-center bg-gradient-to-br from-accent to-surface-2 ${shape}`}
      >
        <span className="px-4 text-center text-2xl font-extrabold tracking-tight text-gradient">
          {title}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${shape}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={wide ? "(max-width: 768px) 100vw, 44vw" : "(max-width: 768px) 100vw, 50vw"}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
}
