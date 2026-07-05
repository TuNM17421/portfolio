import Image from "next/image";
import { useTranslations } from "next-intl";

const STAT_KEYS = ["builders", "ideas", "hours"] as const;

export function AwardsSection() {
  const t = useTranslations("awards");

  return (
    <section id="awards" className="mx-auto max-w-5xl px-4 py-20">
      <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
      <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>

      <article className="mt-10 grid overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-2">
        <div className="relative aspect-video lg:aspect-auto lg:min-h-full">
          <Image
            src="/awards/hackathon.jpg"
            alt={t("hackathon.name")}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8">
          <span className="text-lg font-bold text-primary">
            {t("hackathon.place")}
          </span>
          <h3 className="mt-2 text-2xl font-bold tracking-tight">
            {t("hackathon.name")}
          </h3>
          <p className="mt-1 font-medium text-muted-foreground">
            {t("hackathon.prize")} · {t("hackathon.date")}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {t("hackathon.description")}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {STAT_KEYS.map((key) => (
              <div
                key={key}
                className="rounded-lg bg-accent px-3 py-2 text-center text-xs font-medium text-accent-foreground"
              >
                {t(`hackathon.stats.${key}`)}
              </div>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
