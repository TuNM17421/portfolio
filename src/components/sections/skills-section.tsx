import type { ComponentType, CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { SKILL_GROUPS } from "@/data/skills";
import { SectionHead } from "@/components/section-head";
import {
  DatabaseIcon,
  BrainCircuitIcon,
  LayoutIcon,
  TerminalIcon,
} from "@/components/icons";

// Icon + accent hue live in the view layer (data/skills.ts stays free of JSX).
// Each group gets a distinct accent that drives its tile gradient/ring/glow.
const GROUP_ICON: Record<string, ComponentType<{ className?: string }>> = {
  backend: DatabaseIcon,
  ai: BrainCircuitIcon,
  frontend: LayoutIcon,
  tools: TerminalIcon,
};

const GROUP_ACCENT: Record<string, string> = {
  backend: "#34d399", // emerald
  ai: "#a78bfa", // violet
  frontend: "#22d3ee", // cyan
  tools: "#fbbf24", // amber
};

export function SkillsSection() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <SectionHead
        index="03"
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="reveal mt-11 grid gap-4 sm:grid-cols-2">
        {SKILL_GROUPS.map((group, i) => {
          const Icon = GROUP_ICON[group.key] ?? DatabaseIcon;
          const accent = GROUP_ACCENT[group.key] ?? "var(--primary)";
          return (
            <div
              key={group.key}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:glow-brand"
            >
              <div className="flex items-center gap-3.5">
                <span
                  className="cat-tile grid h-12 w-12 shrink-0 place-items-center rounded-xl"
                  style={{ "--cat": accent } as CSSProperties}
                >
                  <Icon className="h-6 w-6" />
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

              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border bg-surface-2 px-2.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:bg-surface hover:text-foreground"
                  >
                    <span
                      aria-hidden
                      className="skill-icon h-5 w-5 shrink-0"
                      style={{
                        maskImage: `url(${skill.icon})`,
                        WebkitMaskImage: `url(${skill.icon})`,
                        backgroundColor: skill.color,
                      }}
                    />
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
