export type ContactFormStatus =
  | "ready"
  | "validation"
  | "sending"
  | "success"
  | "rate-limit"
  | "error"
  | "offline"
  | "unavailable";

export function resolveInitialContactStatus(
  deliveryEnabled: boolean,
): ContactFormStatus {
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
  return ["sending", "unavailable"].includes(status);
}
