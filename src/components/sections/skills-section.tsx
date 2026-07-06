import type { ComponentType } from "react";
import { useTranslations } from "next-intl";
import { SKILL_GROUPS } from "@/data/skills";
import { SectionHead } from "@/components/section-head";
import {
  ServerIcon,
  SparklesIcon,
  CodeIcon,
  WrenchIcon,
} from "@/components/icons";

// Icon lives in the view layer (data/skills.ts stays free of JSX).
const GROUP_ICON: Record<string, ComponentType<{ className?: string }>> = {
  backend: ServerIcon,
  ai: SparklesIcon,
  frontend: CodeIcon,
  tools: WrenchIcon,
};

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
        {SKILL_GROUPS.map((group, i) => {
          const Icon = GROUP_ICON[group.key] ?? ServerIcon;
          return (
            <div
              key={group.key}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:glow-brand"
            >
              <div className="flex items-center gap-3.5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand text-white glow-brand transition-transform group-hover:scale-105">
                  <Icon className="h-[22px] w-[22px]" />
                </span>
                <div>
                  <span className="font-mono text-xs text-faint">
                    0{i + 1}
                  </span>
                  <h3 className="text-[15px] font-bold leading-tight">
                    {t(`groups.${group.key}`)}
                  </h3>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-[13px] text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-surface hover:text-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
