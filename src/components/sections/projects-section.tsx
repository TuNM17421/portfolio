import { useTranslations } from "next-intl";

const PROJECT_KEYS = ["one", "two", "three"] as const;

export function ProjectsSection() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECT_KEYS.map((key) => (
            <article
              key={key}
              className="flex flex-col rounded-xl border border-border bg-card p-6 text-card-foreground transition-shadow hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {t(`items.${key}.description`)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t(`items.${key}.tags`)
                  .split(",")
                  .map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground"
                    >
                      {tag.trim()}
                    </span>
                  ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
