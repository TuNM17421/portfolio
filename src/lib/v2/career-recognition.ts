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
    reviewValue: "ceremony",
    src: "/awards/vinuni-ceremony.jpg",
    width: 2568,
    height: 1926,
    fit: "cover",
  },
  {
    key: "hackathon",
    reviewValue: "hackathon",
    src: "/awards/hackathon.jpg",
    width: 2560,
    height: 1920,
    fit: "cover",
  },
  {
    key: "careerServices",
    reviewValue: "career-services",
    src: "/awards/stakeholder-congrats-2.jpg",
    width: 1920,
    height: 2560,
    fit: "contain",
  },
] as const;

export type RecognitionDocumentaryKey =
  (typeof RECOGNITION_DOCUMENTARY_IMAGES)[number]["key"];

export const DEFAULT_RECOGNITION_DOCUMENTARY_KEY = "ceremony" as const;

export type RecognitionImageReviewState = "auto" | "loading" | "error";
export type RecognitionStageMode = "active" | "forced" | "static";

export type RecognitionStageControls = {
  forceStatic: boolean;
  forcedProgress: number | null;
  imageState: RecognitionImageReviewState;
  forcedDocumentary: RecognitionDocumentaryKey | null;
};

const STATIC_RECOGNITION_VALUES = new Set(["static", "0", "off", "false"]);
const LOADING_RECOGNITION_VALUES = new Set(["loading", "image-loading"]);
const ERROR_RECOGNITION_VALUES = new Set([
  "error",
  "image-error",
  "image_error",
]);

const DOCUMENTARY_RECOGNITION_VALUES: Record<
  string,
  RecognitionDocumentaryKey
> = {
  ceremony: "ceremony",
  vinuni: "ceremony",
  "closing-ceremony": "ceremony",
  hackathon: "hackathon",
  organisers: "hackathon",
  organizers: "hackathon",
  "career-services": "careerServices",
  careerservices: "careerServices",
  stakeholder: "careerServices",
};

export function parseRecognitionStageControls(
  value: string,
): RecognitionStageControls {
  const normalized = value.trim().toLowerCase();

  if (normalized === "transition" || normalized === "stage") {
    return {
      forceStatic: false,
      forcedProgress: 0.34,
      imageState: "auto",
      forcedDocumentary: null,
    };
  }

  if (normalized === "ready" || normalized === "complete") {
    return {
      forceStatic: false,
      forcedProgress: 1,
      imageState: "auto",
      forcedDocumentary: null,
    };
  }

  const forcedDocumentary = DOCUMENTARY_RECOGNITION_VALUES[normalized];
  if (forcedDocumentary) {
    return {
      forceStatic: false,
      forcedProgress: 1,
      imageState: "auto",
      forcedDocumentary,
    };
  }

  if (LOADING_RECOGNITION_VALUES.has(normalized)) {
    return {
      forceStatic: true,
      forcedProgress: null,
      imageState: "loading",
      forcedDocumentary: null,
    };
  }

  if (ERROR_RECOGNITION_VALUES.has(normalized)) {
    return {
      forceStatic: true,
      forcedProgress: null,
      imageState: "error",
      forcedDocumentary: null,
    };
  }

  return {
    forceStatic: STATIC_RECOGNITION_VALUES.has(normalized),
    forcedProgress: null,
    imageState: "auto",
    forcedDocumentary: null,
  };
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
  forceStatic = false,
  forcedProgress = null,
}: {
  desktop: boolean;
  reduceMotion: boolean;
  forceStatic?: boolean;
  forcedProgress?: number | null;
}): RecognitionStageMode {
  if (!desktop || reduceMotion || forceStatic) return "static";
  return forcedProgress === null ? "active" : "forced";
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

export type CareerTraceMode = "active" | "forced" | "static";

export type CareerTraceControls = {
  forceStatic: boolean;
  forcedRecord: CareerRecordKey | null;
};

export function parseCareerTraceControls(value: string): CareerTraceControls {
  const normalized = value.trim().toLowerCase();

  if (normalized === "education" || normalized === "foundation") {
    return { forceStatic: false, forcedRecord: "education" };
  }

  if (normalized === "fpt" || normalized === "experience") {
    return { forceStatic: false, forcedRecord: "fpt" };
  }

  if (
    normalized === "ai" ||
    normalized === "ai-program" ||
    normalized === "aiprogram"
  ) {
    return { forceStatic: false, forcedRecord: "aiProgram" };
  }

  return {
    forceStatic: ["static", "0", "off", "false"].includes(normalized),
    forcedRecord: null,
  };
}

export function resolveCareerTraceMode({
  desktop,
  reduceMotion,
  forceStatic = false,
  forcedRecord = null,
}: {
  desktop: boolean;
  reduceMotion: boolean;
  forceStatic?: boolean;
  forcedRecord?: CareerRecordKey | null;
}): CareerTraceMode {
  if (!desktop || reduceMotion || forceStatic) return "static";
  return forcedRecord ? "forced" : "active";
}

export function resolveCareerTraceProgress(
  forcedRecord: CareerRecordKey | null,
): number {
  if (!forcedRecord) return 0;
  const window = CAREER_TRACE_WINDOWS[forcedRecord];
  return (window.holdStart + window.holdEnd) / 2;
}

export function resolveActiveCareerRecord(progress: number): CareerRecordKey {
  if (progress < CAREER_TRACE_WINDOWS.fpt.holdStart) return "education";
  if (progress < CAREER_TRACE_WINDOWS.aiProgram.holdStart) return "fpt";
  return "aiProgram";
}
