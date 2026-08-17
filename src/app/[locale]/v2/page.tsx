import { notFound, permanentRedirect } from "next/navigation";
import { isSupportedLocale } from "@/i18n/routing";
import { buildLegacyV2Destination } from "@/lib/v2/legacy-route";

type LegacyV2PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    intro?: string | string[];
    recognition?: string | string[];
  }>;
};

export default async function LegacyV2Page({
  params,
  searchParams,
}: LegacyV2PageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();

  permanentRedirect(buildLegacyV2Destination(locale, await searchParams));
}
