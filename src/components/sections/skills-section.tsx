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

              <div className="mt-5 flex flex-wrap gap-2.5">
                {group.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="group/skill relative"
                  >
                    <span
                      role="img"
                      aria-label={skill.name}
                      title={skill.name}
                      className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-2 transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-surface"
                    >
                      <span
                        aria-hidden
                        className="skill-icon h-6 w-6"
                        style={{
                          maskImage: `url(${skill.icon})`,
                          WebkitMaskImage: `url(${skill.icon})`,
                          backgroundColor: skill.color,
                        }}
                      />
                    </span>
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-lg transition-all duration-150 group-hover/skill:translate-y-0 group-hover/skill:opacity-100"
                    >
                      {skill.name}
                      <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-foreground" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
