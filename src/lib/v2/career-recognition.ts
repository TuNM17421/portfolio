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
  { key: "vcareer", emphasis: "primary" },
  { key: "wonderlens", emphasis: "compact" },
  { key: "vinuni", emphasis: "supporting" },
] as const;

export type RecognitionRecordKey = (typeof RECOGNITION_RECORDS)[number]["key"];

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
