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

export type RecognitionRecordKey =
  (typeof RECOGNITION_RECORDS)[number]["key"];

