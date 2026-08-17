import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("footer");
  const year = 2026;

  return (
    <footer data-site-shell="v1" className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm text-faint sm:flex-row">
        <p>
          © {year} Nguyen Manh Tu. {t("rights")}
        </p>
        <p className="font-mono">{t("builtWith")}</p>
      </div>
    </footer>
  );
}
