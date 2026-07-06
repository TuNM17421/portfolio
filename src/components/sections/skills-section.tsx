import { useTranslations } from "next-intl";
import { SKILL_GROUPS } from "@/data/skills";
import { SectionHead } from "@/components/section-head";

export function SkillsSection() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-[74px]">
      <SectionHead
        index="03"
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="reveal mt-11 grid gap-4 sm:grid-cols-2">
        {SKILL_GROUPS.map((group, i) => (
          <div
            key={group.key}
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
          >
            <h3 className="flex items-center gap-2.5 text-[15px] font-bold">
              <span className="font-mono text-xs text-primary">
                0{i + 1}
              </span>
              {t(`groups.${group.key}`)}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-[13px] text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
