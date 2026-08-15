export const CAREER_TRACE_RANGE = {
  start: 2019,
  end: 2026,
} as const;

export const CAREER_RECORDS = [
  {
    key: "education",
    start: "2019",
    end: "2024",
    emphasis: "supporting",
  },
  {
    key: "fpt",
    start: "2024-05",
    end: "2026-03",
    emphasis: "primary",
  },
  {
    key: "aiProgram",
    start: "2026-04",
    end: "2026-07",
    emphasis: "supporting",
  },
] as const;

export type CareerRecordKey = (typeof CAREER_RECORDS)[number]["key"];

export const RECOGNITION_RECORDS = [
  { key: "vcareer", emphasis: "primary", dateTime: "2026-06-27" },
  { key: "wonderlens", emphasis: "compact", dateTime: "2026-06-27" },
  { key: "vinuni", emphasis: "supporting", dateTime: "2026" },
] as const;

export type RecognitionRecordKey = (typeof RECOGNITION_RECORDS)[number]["key"];

export const RECOGNITION_DOCUMENTARY_IMAGES = [
  {
    key: "ceremony",
    slug: "ceremony",
    src: "/awards/vinuni-ceremony.jpg",
    width: 2568,
    height: 1926,
    fit: "cover",
  },
  {
    key: "hackathon",
    slug: "hackathon",
    src: "/awards/hackathon.jpg",
    width: 2560,
    height: 1920,
    fit: "cover",
  },
  {
    key: "careerServices",
    slug: "career-services",
    src: "/awards/stakeholder-congrats-2.jpg",
    width: 1920,
    height: 2560,
    fit: "contain",
  },
] as const;

export type RecognitionDocumentaryKey =
  (typeof RECOGNITION_DOCUMENTARY_IMAGES)[number]["key"];

export const DEFAULT_RECOGNITION_DOCUMENTARY_KEY = "ceremony" as const;

export type RecognitionStageMode = "active" | "static";

export function parseRecognitionDocumentary(
  value: string | undefined,
): RecognitionDocumentaryKey | null {
  return (
    RECOGNITION_DOCUMENTARY_IMAGES.find(
      (documentary) => documentary.slug === value,
    )?.key ?? null
  );
}

export function recognitionDocumentarySlug(
  key: RecognitionDocumentaryKey,
) {
  return RECOGNITION_DOCUMENTARY_IMAGES.find(
    (documentary) => documentary.key === key,
  )!.slug;
}

export function resolveRecognitionDocumentaryDirection(
  current: RecognitionDocumentaryKey,
  next: RecognitionDocumentaryKey,
): -1 | 0 | 1 {
  const currentIndex = RECOGNITION_DOCUMENTARY_IMAGES.findIndex(
    (documentary) => documentary.key === current,
  );
  const nextIndex = RECOGNITION_DOCUMENTARY_IMAGES.findIndex(
    (documentary) => documentary.key === next,
  );

  if (nextIndex === currentIndex) return 0;
  return nextIndex > currentIndex ? 1 : -1;
}

export function resolveRecognitionDocumentaryNavigation(
  current: RecognitionDocumentaryKey,
  key: string,
): RecognitionDocumentaryKey | null {
  const currentIndex = RECOGNITION_DOCUMENTARY_IMAGES.findIndex(
    (documentary) => documentary.key === current,
  );
  const lastIndex = RECOGNITION_DOCUMENTARY_IMAGES.length - 1;
  let nextIndex: number;

  if (key === "Home") nextIndex = 0;
  else if (key === "End") nextIndex = lastIndex;
  else if (key === "ArrowRight" || key === "ArrowDown") {
    nextIndex = (currentIndex + 1) % RECOGNITION_DOCUMENTARY_IMAGES.length;
  } else if (key === "ArrowLeft" || key === "ArrowUp") {
    nextIndex =
      (currentIndex - 1 + RECOGNITION_DOCUMENTARY_IMAGES.length) %
      RECOGNITION_DOCUMENTARY_IMAGES.length;
  } else return null;

  return RECOGNITION_DOCUMENTARY_IMAGES[nextIndex].key;
}

export function resolveRecognitionStageMode({
  desktop,
  reduceMotion,
}: {
  desktop: boolean;
  reduceMotion: boolean;
}): RecognitionStageMode {
  return desktop && !reduceMotion ? "active" : "static";
}

export const CAREER_TRACE_WINDOWS = {
  education: { enter: 0.06, holdStart: 0.1, holdEnd: 0.29, exit: 0.36 },
  fpt: { enter: 0.28, holdStart: 0.36, holdEnd: 0.68, exit: 0.76 },
  aiProgram: { enter: 0.68, holdStart: 0.76, holdEnd: 0.94, exit: 1 },
} as const satisfies Record<
  CareerRecordKey,
  { enter: number; holdStart: number; holdEnd: number; exit: number }
>;

export const CAREER_TRACE_CONTACTS: Record<CareerRecordKey, number> = {
  education: 0.08,
  fpt: 0.36,
  aiProgram: 0.76,
};

export type CareerTraceMode = "active" | "static";

export function resolveCareerTraceMode({
  desktop,
  reduceMotion,
}: {
  desktop: boolean;
  reduceMotion: boolean;
}): CareerTraceMode {
  return desktop && !reduceMotion ? "active" : "static";
}

export function resolveActiveCareerRecord(progress: number): CareerRecordKey {
  if (progress < CAREER_TRACE_WINDOWS.fpt.holdStart) return "education";
  if (progress < CAREER_TRACE_WINDOWS.aiProgram.holdStart) return "fpt";
  return "aiProgram";
}
