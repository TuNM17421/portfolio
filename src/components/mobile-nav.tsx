"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { MenuIcon, CloseIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";

type NavItem = { href: string; label: string };

// Mobile-only (md:hidden) disclosure nav: hamburger toggles a dropdown panel.
// Closes on link tap, Escape, or outside click, returning focus to the button.
export function MobileNav({ items }: { items: NavItem[] }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? t("closeMenu") : t("openMenu")}
        className="grid h-11 w-11 place-items-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
      >
        {open ? (
          <CloseIcon className="h-4 w-4" />
        ) : (
          <MenuIcon className="h-4 w-4" />
        )}
      </button>

      {open && (
        <>
          {/* Outside-click catcher, sits below the header bar. */}
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div
            id="mobile-menu"
            className="animate-menu-in absolute inset-x-0 top-full z-50 border-b border-border bg-background/95 backdrop-blur-xl"
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
