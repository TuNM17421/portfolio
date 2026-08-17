import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { isSupportedLocale, routing, type Locale } from "@/i18n/routing";
import { v2FontVariables } from "@/lib/v2/fonts";
import "./globals.css";
import styles from "./[locale]/not-found.module.css";

async function resolveNotFoundLocale(): Promise<Locale> {
  const requestLocale = await getLocale();
  return isSupportedLocale(requestLocale)
    ? requestLocale
    : routing.defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveNotFoundLocale();
  const t = await getTranslations({ locale, namespace: "v2.notFound" });

  return {
    title: t("metaTitle"),
    description: t("body"),
  };
}

export default async function GlobalNotFound() {
  const locale = await resolveNotFoundLocale();
  const alternateLocale: Locale = locale === "vi" ? "en" : "vi";
  const t = await getTranslations({ locale, namespace: "v2.notFound" });
  const homeHref = `/${locale}?intro=0`;
  const caseStudyHref = `/${locale}/projects/vcareer`;
  const alternateHref = `/${alternateLocale}`;

  return (
    <html lang={locale}>
      <body>
        <main>
          <section
            className={`${styles.page} ${v2FontVariables}`}
            aria-labelledby="v2-not-found-title"
          >
            <div className={styles.grid} aria-hidden />
            <div className={styles.ambient} aria-hidden />

            <header className={styles.header}>
              <a
                href={homeHref}
                className={styles.wordmark}
                aria-label={`Nguyen Manh Tu — ${t("home")}`}
              >
                Nguyen Manh Tu
              </a>

              <p>{t("systemLabel")}</p>

              <a
                href={alternateHref}
                className={styles.localeLink}
                hrefLang={alternateLocale}
              >
                <span aria-hidden>{alternateLocale.toUpperCase()}</span>
                <span className={styles.visuallyHidden}>
                  {t("switchLocale")}
                </span>
              </a>
            </header>

            <div className={styles.routeSignal} aria-hidden>
              <span className={styles.routeOrigin} />
              <span className={styles.routeLine} />
              <span className={styles.routeBreak} />
            </div>

            <div className={styles.composition}>
              <div className={styles.codeBlock} aria-hidden>
                <span>04</span>
                <strong>404</strong>
              </div>

              <div className={styles.copy}>
                <div className={styles.meta}>
                  <p>{t("eyebrow")}</p>
                  <span>{t("status")}</span>
                </div>

                <h1 id="v2-not-found-title">{t("title")}</h1>
                <p className={styles.body}>{t("body")}</p>

                <nav
                  className={styles.actions}
                  aria-label={t("navigationLabel")}
                >
                  <a href={homeHref} className={styles.primaryAction}>
                    <span>{t("home")}</span>
                    <span aria-hidden>←</span>
                  </a>
                  <a href={caseStudyHref} className={styles.secondaryAction}>
                    <span>{t("caseStudy")}</span>
                    <span aria-hidden>↗</span>
                  </a>
                </nav>
              </div>
            </div>

            <footer className={styles.footer}>
              <p>NGUYEN MANH TU / PORTFOLIO 2026</p>
              <p>{locale.toUpperCase()} / 404</p>
            </footer>
          </section>
        </main>
      </body>
    </html>
  );
}
