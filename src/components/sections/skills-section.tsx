import { useTranslations } from "next-intl";
import { SKILL_GROUPS } from "@/data/skills";

export function SkillsSection() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.key}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t(`groups.${group.key}`)}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
