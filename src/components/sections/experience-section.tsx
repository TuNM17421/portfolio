import { useTranslations } from "next-intl";

export function ExperienceSection() {
  const t = useTranslations("experience");
  const bullets = t.raw("fpt.bullets") as string[];

  return (
    <section id="experience" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-5">
          {/* Work */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold text-muted-foreground">
              {t("workHeading")}
            </h3>
            <div className="mt-5 rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="text-lg font-semibold">{t("fpt.role")}</p>
                <span className="text-sm text-muted-foreground">
                  {t("fpt.period")}
                </span>
              </div>
              <p className="mt-0.5 font-medium text-primary">
                {t("fpt.company")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t("fpt.summary")}
              </p>
              <ul className="mt-4 space-y-2">
                {bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-muted-foreground">
              {t("educationHeading")}
            </h3>
            <div className="mt-5 rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="text-lg font-semibold">{t("education.school")}</p>
                <span className="text-sm text-muted-foreground">
                  {t("education.period")}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("education.degree")}
              </p>
              <p className="mt-3 inline-block rounded-md bg-accent px-2.5 py-1 text-sm font-medium text-accent-foreground">
                {t("education.gpa")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
