import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Thin wrappers around Next.js navigation APIs that are locale-aware.
// Always import Link/redirect/usePathname/useRouter from here (never next/link).
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
