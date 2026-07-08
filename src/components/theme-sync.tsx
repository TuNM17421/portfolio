"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

// On a client-side navigation (e.g. switching locale) React re-renders <html>
// from the new RSC payload and DROPS the `data-theme` attribute that the
// pre-paint script set — so the page snaps back to the dark `:root` default.
// This re-asserts the persisted theme on every pathname change, before paint
// (useLayoutEffect) so there's no visible flash. The initial load is still
// handled by THEME_SCRIPT in the layout; this keeps it correct thereafter.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function ThemeSync() {
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      document.documentElement.setAttribute(
        "data-theme",
        stored === "light" ? "light" : "dark",
      );
    } catch {
      // Ignore storage failures (e.g. private mode).
    }
  }, [pathname]);

  return null;
}
