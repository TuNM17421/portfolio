import Image from "next/image";
import { useTranslations } from "next-intl";
import { SOCIALS } from "@/data/socials";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="about"
      className="mx-auto grid max-w-5xl items-center gap-12 px-4 py-20 sm:py-28 md:grid-cols-[1fr_auto]"
    >
      <div className="flex flex-col items-start gap-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
          <span className="h-2 w-2 rounded-full bg-primary" />
          {t("badge")}
        </span>

        <div className="space-y-3">
          <p className="text-lg text-muted-foreground">{t("greeting")}</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            {t("name")}
          </h1>
          <p className="text-2xl font-semibold text-primary sm:text-3xl">
            {t("role")}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <PinIcon className="h-4 w-4" />
            {t("location")}
          </p>
        </div>

        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {t("summary")}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("ctaProjects")}
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
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
      </div>

      <div className="relative mx-auto md:mx-0">
        <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary/30 to-accent blur-2xl" />
        <Image
          src="/avatar.jpg"
          alt={t("name")}
          width={280}
          height={280}
          priority
          className="relative h-56 w-56 rounded-full border-4 border-card object-cover shadow-xl sm:h-64 sm:w-64"
        />
      </div>
    </section>
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
      className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </a>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
