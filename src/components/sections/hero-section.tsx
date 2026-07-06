import Image from "next/image";
import { useTranslations } from "next-intl";
import { SOCIALS } from "@/data/socials";
import {
  ArrowRightIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MedalIcon,
  PinIcon,
} from "@/components/icons";

const STATS = [
  { value: "2+", label: "statYears" },
  { value: "3", label: "statProjects" },
  { icon: true, label: "statAward" },
] as const;

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="about"
      className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 sm:py-28 md:grid-cols-[1.35fr_0.9fr]"
    >
      <div className="reveal flex flex-col items-start">
        <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-xs text-muted-foreground">
          <span className="pulse-ring relative h-2 w-2 rounded-full bg-online" />
          {t("badge")}
        </span>

        <p className="mb-3 font-mono text-[15px] text-accent-2">{t("greeting")}</p>
        <h1 className="text-[clamp(2.6rem,7vw,4.6rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
          <span className="text-gradient">{t("name")}</span>
        </h1>
        <p className="mt-4 text-xl font-semibold sm:text-2xl">{t("role")}</p>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <PinIcon className="h-4 w-4" />
          {t("location")}
        </p>

        <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground">
          {t("summary")}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3.5">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white glow-brand transition-transform hover:-translate-y-0.5"
          >
            {t("ctaProjects")}
            <ArrowRightIcon className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 hover:border-primary"
          >
            {t("ctaContact")}
          </a>
          <div className="ml-1 flex items-center gap-1">
            <IconLink href={SOCIALS.github} label="GitHub">
              <GithubIcon className="h-5 w-5" />
            </IconLink>
            <IconLink href={SOCIALS.linkedin} label="LinkedIn">
              <LinkedinIcon className="h-5 w-5" />
            </IconLink>
            <IconLink href={`mailto:${SOCIALS.email}`} label="Email">
              <MailIcon className="h-5 w-5" />
            </IconLink>
          </div>
        </div>

        <dl className="mt-10 flex flex-wrap gap-x-9 gap-y-5">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="flex h-9 items-center text-3xl font-extrabold tracking-tight text-gradient">
                {"icon" in stat ? (
                  <MedalIcon className="h-8 w-8 text-primary" />
                ) : (
                  stat.value
                )}
              </dt>
              <dd className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-faint">
                {t(stat.label)}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="reveal relative mx-auto grid w-full place-items-center">
        <div className="relative aspect-square w-[min(300px,76%)] rounded-3xl bg-brand p-[3px] glow-brand">
          <Image
            src="/avatar-graduation.jpg"
            alt={t("name")}
            width={300}
            height={300}
            priority
            className="h-full w-full rounded-[calc(1.5rem-3px)] object-cover object-center"
          />
          <FloatCard
            className="floaty -left-2 -top-3 sm:-left-[12%] sm:-top-[5%]"
            label={t("roleLabel")}
          >
            {t("focus")}
          </FloatCard>
          <FloatCard
            className="floaty-delayed -right-2 -bottom-3.5 sm:-right-[12%] sm:-bottom-[calc(5%_+_2px)]"
            label={t("locationLabel")}
            icon={<PinIcon className="h-3.5 w-3.5" />}
          >
            {t("location")}
          </FloatCard>
        </div>
      </div>
    </section>
  );
}

function FloatCard({
  className,
  label,
  icon,
  children,
}: {
  className?: string;
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute rounded-xl border border-border bg-surface/90 px-3.5 py-2.5 shadow-xl backdrop-blur ${className}`}
    >
      <div className="font-mono text-[10px] uppercase tracking-wider text-faint">
        {label}
      </div>
      <div className="flex items-center gap-1.5 text-sm font-bold">
        {icon}
        {children}
      </div>
    </div>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
    >
      {children}
    </a>
  );
}
