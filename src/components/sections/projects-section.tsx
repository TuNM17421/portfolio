import Image from "next/image";
import { useTranslations } from "next-intl";
import { PROJECTS, type Project } from "@/data/projects";
import { GithubIcon } from "@/components/icons";

export function ProjectsSection() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="mx-auto max-w-5xl px-4 py-20">
      <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">{t("subtitle")}</p>

      <div className="mt-10 space-y-8">
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

  return (
    <article className="grid overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2">
      <ProjectImage
        src={project.image}
        alt={t(`${base}.title`)}
        title={t(`${base}.title`)}
      />

      <div className="flex flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-bold">{t(`${base}.title`)}</h3>
          {project.featured && (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
              {t("featured")}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm font-medium text-primary">
          {t(`${base}.subtitle`)}
        </p>
        {period && (
          <p className="mt-1 text-xs text-muted-foreground">{period}</p>
        )}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {t(`${base}.description`)}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
        >
          <GithubIcon className="h-4 w-4" />
          {t("viewCode")}
        </a>
      </div>
    </article>
  );
}

function ProjectImage({
  src,
  alt,
  title,
}: {
  src: string | null;
  alt: string;
  title: string;
}) {
  if (!src) {
    return (
      <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary/20 to-accent md:aspect-auto">
        <span className="text-4xl font-bold tracking-tight text-primary/70">
          {title}
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-video md:aspect-auto md:min-h-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  );
}
