export const CONTACT_REVIEW_STATES = [
  "ready",
  "validation",
  "sending",
  "success",
  "rate-limit",
  "error",
  "offline",
  "unavailable",
  "static",
] as const;

export type ContactReviewState = (typeof CONTACT_REVIEW_STATES)[number];

export type ContactFormStatus =
  | "ready"
  | "validation"
  | "sending"
  | "success"
  | "rate-limit"
  | "error"
  | "offline"
  | "unavailable"
  | "static";

export function parseContactReviewState(
  value: string,
): ContactReviewState | null {
  return CONTACT_REVIEW_STATES.find((state) => state === value) ?? null;
}

export function resolveInitialContactStatus({
  deliveryEnabled,
  reviewState,
}: {
  deliveryEnabled: boolean;
  reviewState: ContactReviewState | null;
}): ContactFormStatus {
  if (reviewState) return reviewState;
  return deliveryEnabled ? "ready" : "unavailable";
}

export function resolveContactResponseStatus(
  status: number,
): ContactFormStatus {
  if (status === 202) return "success";
  if (status === 429) return "rate-limit";
  if (status === 503) return "unavailable";
  return "error";
}

export function contactStatusIsError(status: ContactFormStatus) {
  return [
    "validation",
    "rate-limit",
    "error",
    "offline",
    "unavailable",
  ].includes(status);
}

export function contactStatusLocksFields(status: ContactFormStatus) {
  return ["sending", "unavailable", "static"].includes(status);
}
