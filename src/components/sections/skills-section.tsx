import { useTranslations } from "next-intl";
import { SKILLS, EXPERIENCE_KEYS } from "@/data/skills";

export function SkillsSection() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="mx-auto max-w-5xl px-4 py-20">
      <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>

      <div className="mt-10 grid gap-12 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold">{t("skillsHeading")}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">{t("experienceHeading")}</h3>
          <ol className="mt-4 space-y-6 border-l border-border pl-6">
            {EXPERIENCE_KEYS.map((key) => (
              <li key={key} className="relative">
                <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-primary" />
                <p className="font-semibold">
                  {t(`experience.${key}.role`)}
                </p>
                <p className="text-sm text-primary">
                  {t(`experience.${key}.company`)} ·{" "}
                  {t(`experience.${key}.period`)}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {t(`experience.${key}.description`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
