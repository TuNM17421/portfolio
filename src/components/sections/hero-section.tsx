import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="about"
      className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-4 py-24 sm:py-32"
    >
      <span className="text-sm font-medium text-primary">{t("greeting")}</span>
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        {t("name")}
      </h1>
      <p className="text-2xl font-semibold text-muted-foreground sm:text-3xl">
        {t("role")}
      </p>
      <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {t("intro")}
      </p>
      <div className="mt-2 flex flex-wrap gap-3">
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
      </div>
    </section>
  );
}
