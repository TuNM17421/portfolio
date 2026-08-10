import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHead } from "@/components/section-head";
import { GraduationCapIcon } from "@/components/icons";

const STAT_KEYS = ["track", "result", "format"] as const;

// Gallery photos from the Codex Hackathon and the VinUni graduation ceremony.
// The ceremony shot is the highlight: it spans 2 cols and 2 rows, so the
// faculty + team-detail shots stack in the right column and fill its height
// (order matters — those two must follow the featured item to flow into it).
type GalleryItem = { src: string; caption: string; featured?: boolean };

const GALLERY: GalleryItem[] = [
  { src: "/awards/vinuni-ceremony.jpg", caption: "vinuniCeremony", featured: true },
  { src: "/awards/vinuni-faculty.jpg", caption: "vinuniFaculty" },
  { src: "/awards/team-detail.jpg", caption: "teamDetail" },
  { src: "/awards/ai-lab-coach-team.jpg", caption: "aiInAction" },
  { src: "/awards/codex-hackathon-1.jpg", caption: "codex" },
  { src: "/awards/stakeholder-congrats-2.jpg", caption: "stakeholder" },
];

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
          {GALLERY.map(({ src, caption, featured }) => (
            <figure
              key={src}
              className={`group relative overflow-hidden rounded-xl border border-border ${
                featured
                  ? "col-span-2 aspect-video sm:aspect-auto sm:row-span-2"
                  : "aspect-video"
              }`}
            >
              <Image
                src={src}
                alt={t(`gallery.captions.${caption}`)}
                fill
                sizes={
                  featured
                    ? "(max-width: 640px) 100vw, 44vw"
                    : "(max-width: 640px) 50vw, 22vw"
                }
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
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
