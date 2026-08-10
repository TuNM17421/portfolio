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
    <section id="skills" className="mx-auto max-w-6xl px-6 py-16 sm:py-28">
      <SectionHead
        index="04"
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="reveal mt-9 grid gap-3 sm:mt-11 sm:grid-cols-2 sm:gap-4">
        {SKILL_GROUPS.map((group, i) => {
          const Icon = GROUP_ICON[group.key] ?? DatabaseIcon;
          const accent = GROUP_ACCENT[group.key] ?? "var(--primary)";
          return (
            <div
              key={group.key}
              className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:glow-brand sm:p-6"
            >
              <div className="flex items-center gap-3 sm:gap-3.5">
                <span
                  className="cat-tile grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-12 sm:w-12"
                  style={{ "--cat": accent } as CSSProperties}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
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

              <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 sm:mt-5 sm:flex sm:flex-wrap sm:gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex min-h-8 min-w-0 items-center gap-2 text-[11px] font-medium leading-tight text-muted-foreground transition-colors hover:text-foreground sm:inline-flex sm:min-h-10 sm:rounded-lg sm:border sm:border-border sm:bg-surface-2 sm:px-2.5 sm:py-2 sm:text-xs sm:hover:border-primary sm:hover:bg-surface"
                  >
                    <span
                      aria-hidden
                      className="skill-icon h-4 w-4 shrink-0 sm:h-5 sm:w-5"
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
