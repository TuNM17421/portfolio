import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHead } from "@/components/section-head";

// Timeline entries (work + training), newest last so the gradient rail
// reads top-to-bottom chronologically. Copy lives in messages/*.json.
const TIMELINE = ["fpt", "course"] as const;

export function ExperienceSection() {
  const t = useTranslations("experience");
  const languages = t.raw("languages") as string[];

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-16 sm:py-28">
      <SectionHead index="02" eyebrow={t("eyebrow")} title={t("title")} />

      <div className="mt-9 grid gap-6 sm:mt-11 sm:gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* Work + training timeline */}
        <div className="reveal">
          <div className="relative pl-7">
            <span className="absolute bottom-2 left-[5px] top-2 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent" />
            <div className="space-y-5">
              {TIMELINE.map((key) => (
                <TimelineItem key={key} base={key} />
              ))}
            </div>
          </div>
        </div>

        {/* Education + Languages */}
        <div className="reveal space-y-5">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="hidden justify-center px-6 pt-6 sm:flex">
              <div className="relative aspect-square w-full max-w-[220px] overflow-hidden rounded-xl">
                <Image
                  src="/avatar.jpg"
                  alt={t("education.school")}
                  fill
                  sizes="220px"
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-faint">
                {t("educationHeading")}
              </h3>
              <p className="mt-3 font-bold">{t("education.degree")}</p>
              <p className="mt-0.5 text-sm font-semibold text-accent-2">
                {t("education.school")}
              </p>
              <p className="mt-1.5 font-mono text-xs text-faint">
                {t("education.location")} · {t("education.period")}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-faint">
              {t("languagesHeading")}
            </h3>
            <div className="mt-2">
              {languages.map((lang) => {
                const [name, level] = lang.split(" — ");
                return (
                  <div
                    key={lang}
                    className="flex items-center justify-between border-b border-border-soft py-2.5 text-sm last:border-none"
                  >
                    <span>{name}</span>
                    <span className="font-mono text-[11px] text-faint">
                      {level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ base }: { base: string }) {
  const t = useTranslations("experience");
  const stack = t(`${base}.stack`).split(" · ");
  const bullets = t.raw(`${base}.bullets`) as string[];
  const titleKey = base === "fpt" ? "role" : "name";
  const orgKey = base === "fpt" ? "company" : "provider";

  return (
    <div className="relative">
      <span className="absolute -left-7 top-[26px] h-3 w-3 rounded-full border-[2.5px] border-primary bg-background shadow-[0_0_0_4px_var(--glow)]" />
      <div className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-lg font-bold">
            {t(`${base}.${titleKey}`)} ·{" "}
            <span className="text-accent-2">{t(`${base}.${orgKey}`)}</span>
          </h3>
          <span className="font-mono text-xs text-faint">
            {t(`${base}.period`)}
          </span>
        </div>

        <div className="sm:hidden">
          <BulletList bullets={bullets.slice(0, 1)} />
          <details className="group mt-3 border-t border-border pt-1">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-mono text-xs font-semibold text-accent-2">
              <span>
                {t("mobileDetails", { count: Math.max(0, bullets.length - 1) })}
              </span>
              <span
                aria-hidden
                className="text-base transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <TechBadges stack={stack} className="mt-2" />
            <BulletList bullets={bullets.slice(1)} className="mt-4" />
          </details>
        </div>

        <div className="hidden sm:block">
          <TechBadges stack={stack} className="mt-3.5" />
          <BulletList bullets={bullets} className="mt-4" />
        </div>
      </div>
    </div>
  );
}

function TechBadges({ stack, className }: { stack: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className ?? ""}`}>
      {stack.map((tech) => (
        <span
          key={tech}
          className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

function BulletList({
  bullets,
  className,
}: {
  bullets: string[];
  className?: string;
}) {
  return (
    <ul className={`space-y-2.5 ${className ?? "mt-4"}`}>
      {bullets.map((bullet) => (
        <li
          key={bullet}
          className="relative pl-[22px] text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:text-primary before:content-['▹']"
        >
          {bullet}
        </li>
      ))}
    </ul>
  );
}
