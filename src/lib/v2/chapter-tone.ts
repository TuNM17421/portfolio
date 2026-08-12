export const clampChapterProgress = (value: number) =>
  Math.min(1, Math.max(0, value));

export function resolveChapterPhase(
  aboutEntryProgress: number,
  vcareerEntryProgress: number,
) {
  return (
    clampChapterProgress(aboutEntryProgress) +
    clampChapterProgress(vcareerEntryProgress)
  );
}

export type V2Chapter = "hero" | "about" | "vcareer";

export function resolveChapterName(phase: number): V2Chapter {
  if (phase >= 1.5) return "vcareer";
  if (phase >= 0.5) return "about";
  return "hero";
}
