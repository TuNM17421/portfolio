export type VCareerCaseEvidenceReviewState = "auto" | "error" | "loading";

const LOADING_VALUES = new Set(["loading", "image-loading"]);
const ERROR_VALUES = new Set(["error", "image-error"]);

export function parseVCareerCaseEvidenceReviewState(
  search: string,
): VCareerCaseEvidenceReviewState {
  const value =
    new URLSearchParams(search).get("evidence")?.toLowerCase() ?? "";

  if (LOADING_VALUES.has(value)) return "loading";
  if (ERROR_VALUES.has(value)) return "error";
  return "auto";
}

export function moveVCareerEvidenceIndex(
  current: number,
  direction: -1 | 1,
  count: number,
) {
  if (count <= 0) return 0;
  return Math.min(Math.max(current + direction, 0), count - 1);
}
