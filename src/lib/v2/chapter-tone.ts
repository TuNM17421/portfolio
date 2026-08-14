export const clampChapterProgress = (value: number) =>
  Math.min(1, Math.max(0, value));

export function resolveChapterPhase(
  aboutEntryProgress: number,
  vcareerEntryProgress: number,
  workEntryProgress = 0,
  careerEntryProgress = 0,
  recognitionEntryProgress = 0,
  skillsEntryProgress = 0,
  contactEntryProgress = 0,
) {
  return (
    clampChapterProgress(aboutEntryProgress) +
    clampChapterProgress(vcareerEntryProgress) +
    clampChapterProgress(workEntryProgress) +
    clampChapterProgress(careerEntryProgress) +
    clampChapterProgress(recognitionEntryProgress) +
    clampChapterProgress(skillsEntryProgress) +
    clampChapterProgress(contactEntryProgress)
  );
}

export type V2Chapter =
  | "hero"
  | "about"
  | "vcareer"
  | "work"
  | "career"
  | "recognition"
  | "skills"
  | "contact";

export type V2NavigationChapter = "work" | "career" | null;

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
  career: {
    color: "rgb(7, 18, 25)",
    accent: "rgb(0, 96, 240)",
    border: "rgba(0, 96, 240, 0.22)",
    textShadow: "0 2px 16px rgba(7, 18, 25, 0.08)",
    layerOpacity: 1,
  },
  recognition: {
    color: "rgb(237, 244, 245)",
    accent: "rgb(107, 215, 208)",
    border: "rgba(107, 215, 208, 0.24)",
    textShadow: "0 2px 18px rgba(7, 18, 25, 0.7)",
    layerOpacity: 0,
  },
  skills: {
    color: "rgb(7, 18, 25)",
    accent: "rgb(23, 111, 107)",
    border: "rgba(23, 111, 107, 0.2)",
    textShadow: "0 2px 16px rgba(7, 18, 25, 0.08)",
    layerOpacity: 1,
  },
  contact: {
    color: "rgb(237, 244, 245)",
    accent: "rgb(107, 215, 208)",
    border: "rgba(107, 215, 208, 0.24)",
    textShadow: "0 2px 18px rgba(7, 18, 25, 0.7)",
    layerOpacity: 0,
  },
};

export function resolveChapterName(phase: number): V2Chapter {
  if (phase >= 6.5) return "contact";
  if (phase >= 5.5) return "skills";
  if (phase >= 4.5) return "recognition";
  if (phase >= 3.5) return "career";
  if (phase >= 2.5) return "work";
  if (phase >= 1.5) return "vcareer";
  if (phase >= 0.5) return "about";
  return "hero";
}

export function resolveChapterTone(phase: number): V2ChapterToneTokens {
  return CHAPTER_TONES[resolveChapterName(phase)];
}

export function resolveActiveNavigation(
  chapter: V2Chapter,
): V2NavigationChapter {
  if (chapter === "vcareer" || chapter === "work") return "work";
  if (chapter === "career" || chapter === "recognition") return "career";
  return null;
}

const resolveHandoffProgress = (phase: number, start: number, end: number) =>
  clampChapterProgress((phase - start) / (end - start));

export function resolveChapterTraceScale(
  phase: number,
  chapter: Exclude<V2NavigationChapter, null>,
) {
  const workToCareerStart = 3.35;
  const workToCareerEnd = 3.65;

  if (chapter === "career") {
    if (phase <= workToCareerStart) return 0;
    if (phase < workToCareerEnd) {
      return resolveHandoffProgress(
        phase,
        workToCareerStart,
        workToCareerEnd,
      );
    }

    const recognitionToSkillsStart = 5.35;
    const recognitionToSkillsEnd = 5.65;
    if (phase <= recognitionToSkillsStart) return 1;
    if (phase >= recognitionToSkillsEnd) return 0;
    return (
      1 -
      resolveHandoffProgress(
        phase,
        recognitionToSkillsStart,
        recognitionToSkillsEnd,
      )
    );
  }

  const workEntryStart = 1.35;
  const workEntryEnd = 1.65;
  if (phase <= workEntryStart || phase >= workToCareerEnd) return 0;
  if (phase < workEntryEnd) {
    return resolveHandoffProgress(phase, workEntryStart, workEntryEnd);
  }
  if (phase <= workToCareerStart) return 1;
  return (
    1 -
    resolveHandoffProgress(phase, workToCareerStart, workToCareerEnd)
  );
}
