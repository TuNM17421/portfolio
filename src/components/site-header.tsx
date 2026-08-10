import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

const NAV_ITEMS = [
  { key: "experience", href: "/#experience" },
  { key: "projects", href: "/#projects" },
  { key: "skills", href: "/#skills" },
  { key: "awards", href: "/#awards" },
  { key: "contact", href: "/#contact" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-background/70 backdrop-blur-xl transition-colors">
      <div className="relative mx-auto flex h-[68px] max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-mono text-[15px] font-bold tracking-tight"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-brand glow-brand" />
          tunm.dev
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <MobileNav
            items={NAV_ITEMS.map((item) => ({
              href: item.href,
              label: t(item.key),
            }))}
          />
        </div>
      </div>
    </header>
  );
}
