"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function toggleLocale() {
    const next = routing.locales.find((l) => l !== locale) ?? locale;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <button
      type="button"
      onClick={toggleLocale}
      disabled={isPending}
      className="grid h-9 min-w-9 place-items-center rounded-lg border border-border bg-surface px-2 font-mono text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground disabled:opacity-50"
      aria-label={t("toggleLanguage")}
    >
      {t("toggleLanguage")}
    </button>
  );
}
