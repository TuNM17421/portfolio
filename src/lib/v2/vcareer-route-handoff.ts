export const VCAREER_HANDOFF_STORAGE_KEY = "portfolio:vcareer-route-handoff:v1";

export const VCAREER_HANDOFF_INTENT_TTL_MS = 8_000;

export type VCareerHandoffDirection = "forward" | "return";
export type VCareerHandoffSource = "chapter" | "return";

export type VCareerHandoffIntent = {
  createdAt: number;
  direction: VCareerHandoffDirection;
};

type PrimaryActivation = {
  altKey: boolean;
  button: number;
  ctrlKey: boolean;
  defaultPrevented: boolean;
  download: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  target: string | null;
};

export function shouldEnhanceVCareerHandoff({
  altKey,
  button,
  ctrlKey,
  defaultPrevented,
  download,
  metaKey,
  shiftKey,
  target,
}: PrimaryActivation) {
  return (
    !defaultPrevented &&
    button === 0 &&
    !altKey &&
    !ctrlKey &&
    !metaKey &&
    !shiftKey &&
    !download &&
    (!target || target === "_self")
  );
}

export function serializeVCareerHandoffIntent(intent: VCareerHandoffIntent) {
  return JSON.stringify(intent);
}

export function parseVCareerHandoffIntent(
  value: string | null,
  now = Date.now(),
): VCareerHandoffIntent | null {
  if (!value) return null;

  try {
    const candidate = JSON.parse(value) as Partial<VCareerHandoffIntent>;
    const direction = candidate.direction;
    const createdAt = candidate.createdAt;

    if (
      (direction !== "forward" && direction !== "return") ||
      typeof createdAt !== "number" ||
      !Number.isFinite(createdAt) ||
      createdAt > now + 1_000 ||
      now - createdAt > VCAREER_HANDOFF_INTENT_TTL_MS
    ) {
      return null;
    }

    return { createdAt, direction };
  } catch {
    return null;
  }
}

export function isVCareerHandoffDestination(
  pathname: string,
  direction: VCareerHandoffDirection,
) {
  const normalized = pathname.replace(/\/+$/, "");

  return direction === "forward"
    ? normalized.endsWith("/projects/vcareer")
    : /^\/(vi|en)$/.test(normalized);
}
