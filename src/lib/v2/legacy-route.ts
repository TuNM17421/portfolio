import type { Locale } from "@/i18n/routing";
import {
  parseRecognitionDocumentary,
  recognitionDocumentarySlug,
} from "@/lib/v2/career-recognition";
import { shouldSkipIntro } from "@/lib/v2/intro-readiness";

type LegacyV2Query = {
  intro?: string | string[];
  recognition?: string | string[];
};

export function buildLegacyV2Destination(
  locale: Locale,
  query: LegacyV2Query,
) {
  const params = new URLSearchParams();
  const intro = typeof query.intro === "string" ? query.intro : undefined;
  const recognition =
    typeof query.recognition === "string" ? query.recognition : undefined;
  const documentary = parseRecognitionDocumentary(recognition);

  if (shouldSkipIntro(intro)) params.set("intro", "0");
  if (documentary) {
    params.set("recognition", recognitionDocumentarySlug(documentary));
  }

  const search = params.toString();
  const hash = documentary ? "#recognition" : "";

  return `/${locale}${search ? `?${search}` : ""}${hash}`;
}
