export const clampChapterProgress = (value: number) =>
  Math.min(1, Math.max(0, value));

export function resolveChapterPhase(
  aboutEntryProgress: number,
  vcareerEntryProgress: number,
  workEntryProgress = 0,
) {
  return (
    clampChapterProgress(aboutEntryProgress) +
    clampChapterProgress(vcareerEntryProgress) +
    clampChapterProgress(workEntryProgress)
  );
}

export type V2Chapter = "hero" | "about" | "vcareer" | "work";

export type V2ChapterToneTokens = {
  color: string;
  accent: string;
  border: string;
  textShadow: string;
  layerOpacity: number;
};

const CHAPTER_TONES: Record<V2Chapter, V2ChapterToneTokens> = {
  hero: {
    color: "rgb(237, 244, 245)",
    accent: "rgb(107, 215, 208)",
    border: "rgba(107, 215, 208, 0.2)",
    textShadow: "0 2px 18px rgba(7, 18, 25, 0.7)",
    layerOpacity: 0,
  },
  about: {
    color: "rgb(7, 18, 25)",
    accent: "rgb(23, 111, 107)",
    border: "rgba(23, 111, 107, 0.2)",
    textShadow: "0 2px 16px rgba(7, 18, 25, 0.08)",
    layerOpacity: 1,
  },
  vcareer: {
    color: "rgb(237, 244, 245)",
    accent: "rgb(168, 240, 60)",
    border: "rgba(168, 240, 60, 0.22)",
    textShadow: "0 2px 18px rgba(7, 18, 25, 0.7)",
    layerOpacity: 0,
  },
  work: {
    color: "rgb(7, 18, 25)",
    accent: "rgb(0, 96, 240)",
    border: "rgba(0, 96, 240, 0.22)",
    textShadow: "0 2px 16px rgba(7, 18, 25, 0.08)",
    layerOpacity: 1,
  },
};

export function resolveChapterName(phase: number): V2Chapter {
  if (phase >= 2.5) return "work";
  if (phase >= 1.5) return "vcareer";
  if (phase >= 0.5) return "about";
  return "hero";
}

export function resolveChapterTone(phase: number): V2ChapterToneTokens {
  return CHAPTER_TONES[resolveChapterName(phase)];
}

export function resolveVCareerTraceScale(
  vcareerEntryProgress: number,
  workEntryProgress: number,
) {
  if (clampChapterProgress(workEntryProgress) >= 0.5) return 0;
  return clampChapterProgress(vcareerEntryProgress);
}
