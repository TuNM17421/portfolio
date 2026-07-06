import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHead } from "@/components/section-head";
import { GraduationCapIcon } from "@/components/icons";

const STAT_KEYS = ["builders", "ideas", "hours"] as const;

// Gallery photos from the Codex Hackathon and the VinUni graduation ceremony.
// The ceremony shot leads and spans two columns as the highlight.
const GALLERY = [
  { src: "/awards/vinuni-ceremony.jpg", caption: "vinuniCeremony", wide: true },
  { src: "/awards/vinuni-faculty.jpg", caption: "vinuniFaculty", wide: false },
  { src: "/awards/hackathon-team.jpg", caption: "hackathonTeam", wide: false },
  { src: "/awards/codex-hackathon-1.jpg", caption: "codex", wide: false },
  { src: "/awards/stakeholder-congrats-2.jpg", caption: "stakeholder", wide: false },
] as const;

export function AwardsSection() {
  const t = useTranslations("awards");

  return (
    <section id="awards" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <SectionHead index="04" eyebrow={t("eyebrow")} title={t("title")} />

      <article className="reveal mt-11 grid overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-2">
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
          <span className="text-lg font-bold text-gradient">
            {t("hackathon.place")}
          </span>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight">
            {t("hackathon.name")}
          </h3>
          <p className="mt-1 font-mono text-sm text-accent-2">
            {t("hackathon.prize")} · {t("hackathon.date")}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {t("hackathon.description")}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {STAT_KEYS.map((key) => (
              <div
                key={key}
                className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-center text-xs font-medium"
              >
                {t(`hackathon.stats.${key}`)}
              </div>
            ))}
          </div>

          <p className="mt-6 flex items-center gap-2.5 rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm font-medium">
            <GraduationCapIcon className="h-4 w-4 shrink-0 text-primary" />
            {t("gallery.vinuniNote")}
          </p>
        </div>
      </article>

      <div className="reveal mt-10">
        <h3 className="font-mono text-xs uppercase tracking-wider text-faint">
          {t("gallery.heading")}
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {GALLERY.map(({ src, caption, wide }) => (
            <figure
              key={src}
              className={`group relative overflow-hidden rounded-xl border border-border ${
                wide ? "col-span-2" : ""
              }`}
            >
              <div className="relative aspect-video">
                <Image
                  src={src}
                  alt={t(`gallery.captions.${caption}`)}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <figcaption className="scrim absolute inset-x-0 bottom-0 p-3 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {t(`gallery.captions.${caption}`)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
