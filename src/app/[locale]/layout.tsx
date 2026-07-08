import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, isSupportedLocale } from "@/i18n/routing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ThemeSync } from "@/components/theme-sync";
import "../globals.css";

// Inter drives --font-sans (see globals.css). display:swap => no invisible text / CLS.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

// Applies the persisted theme before first paint to avoid a flash.
// Defaults to dark (the design is dark-first).
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("title"), description: t("description") };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  // `data-theme` is intentionally NOT set on <html> here: it's applied by
  // THEME_SCRIPT before paint and then left unmanaged by React, so the user's
  // choice survives client-side navigations (e.g. switching locale). Setting it
  // as a JSX prop would make React reset it to a fixed value on every nav.
  return (
    <html
      lang={locale}
      className={inter.variable}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground">
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <ThemeSync />
        <div className="bg-fx" aria-hidden />
        <NextIntlClientProvider messages={messages}>
          <ScrollReveal />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
