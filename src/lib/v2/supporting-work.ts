export const SCHOLARAI_EVIDENCE_KEYS = [
  "retrieve",
  "ground",
  "evaluate",
] as const;

export type ScholarAIEvidenceKey = (typeof SCHOLARAI_EVIDENCE_KEYS)[number];

export type ScholarAIBenchmarkKey = "qa" | "refusal";
export type SupportingWorkStoryMode = "active" | "forced" | "static";

export type ScholarAIEvidenceWindow = {
  enter: number;
  holdStart: number;
  holdEnd: number;
  exit: number;
};

export const SCHOLARAI_EVIDENCE_WINDOWS: Record<
  ScholarAIEvidenceKey,
  ScholarAIEvidenceWindow
> = {
  retrieve: { enter: 0, holdStart: 0.035, holdEnd: 0.27, exit: 0.35 },
  ground: { enter: 0.29, holdStart: 0.37, holdEnd: 0.61, exit: 0.69 },
  evaluate: { enter: 0.63, holdStart: 0.71, holdEnd: 0.985, exit: 1 },
};

export type SupportingWorkImageState = "auto" | "loading" | "error";

export type SupportingWorkControls = {
  forceStatic: boolean;
  imageState: SupportingWorkImageState;
  forcedStage: ScholarAIEvidenceKey | null;
  forcedBenchmark: ScholarAIBenchmarkKey | null;
};

export type SupportingWorkImage = {
  src: string;
  width: number;
  height: number;
};

export type ScholarAIEvidence = {
  key: ScholarAIEvidenceKey;
  images: readonly SupportingWorkImage[];
};

export const SCHOLARAI_EVIDENCE = [
  {
    key: "retrieve",
    images: [
      {
        src: "/projects/scholarai/semantic-search.png",
        width: 1652,
        height: 870,
      },
    ],
  },
  {
    key: "ground",
    images: [
      {
        src: "/projects/scholarai/chat.png",
        width: 1844,
        height: 869,
      },
    ],
  },
  {
    key: "evaluate",
    images: [
      {
        src: "/projects/scholarai/benchmark-1.png",
        width: 1652,
        height: 677,
      },
      {
        src: "/projects/scholarai/benchmark-2.png",
        width: 1658,
        height: 791,
      },
    ],
  },
] as const satisfies readonly ScholarAIEvidence[];

export const SCHOLARAI_SOURCE_URL = "https://github.com/TuNM17421/ScholarAI";

export const FINANCIAL_ARCHIVE_IMAGES = [
  {
    key: "dashboard",
    src: "/projects/finplanning/dashboard.png",
    width: 752,
    height: 342,
  },
  {
    key: "report",
    src: "/projects/finplanning/financial_report.png",
    width: 602,
    height: 275,
  },
] as const;

export type FinancialArchiveImageKey =
  (typeof FINANCIAL_ARCHIVE_IMAGES)[number]["key"];

export const FINANCIAL_ARCHIVE_REPOSITORIES = [
  {
    key: "api",
    href: "https://github.com/TuNM17421/fin-planning-backend",
  },
  {
    key: "web",
    href: "https://github.com/TuNM17421/fin-planning-frontend",
  },
  {
    key: "worker",
    href: "https://github.com/TuNM17421/fin-planning-worker",
  },
] as const;

export type FinancialArchiveRepositoryKey =
  (typeof FINANCIAL_ARCHIVE_REPOSITORIES)[number]["key"];

export function parseSupportingWorkControls(
  value: string,
): SupportingWorkControls {
  const normalized = value.trim().toLowerCase();

  if (normalized === "retrieve" || normalized === "ground") {
    return {
      forceStatic: false,
      imageState: "auto",
      forcedStage: normalized,
      forcedBenchmark: null,
    };
  }

  if (normalized === "evaluate-qa" || normalized === "evaluate-refusal") {
    return {
      forceStatic: false,
      imageState: "auto",
      forcedStage: "evaluate",
      forcedBenchmark: normalized === "evaluate-refusal" ? "refusal" : "qa",
    };
  }

  if (normalized === "loading" || normalized === "image-loading") {
    return {
      forceStatic: true,
      imageState: "loading",
      forcedStage: null,
      forcedBenchmark: null,
    };
  }

  if (
    normalized === "error" ||
    normalized === "image-error" ||
    normalized === "image_error"
  ) {
    return {
      forceStatic: true,
      imageState: "error",
      forcedStage: null,
      forcedBenchmark: null,
    };
  }

  return {
    forceStatic: ["static", "0", "off", "false"].includes(normalized),
    imageState: "auto",
    forcedStage: null,
    forcedBenchmark: null,
  };
}

type ResolveSupportingWorkStoryModeOptions = {
  desktop: boolean;
  reduceMotion: boolean;
  forceStatic?: boolean;
  forcedStage?: ScholarAIEvidenceKey | null;
};

export function resolveSupportingWorkStoryMode({
  desktop,
  reduceMotion,
  forceStatic = false,
  forcedStage = null,
}: ResolveSupportingWorkStoryModeOptions): SupportingWorkStoryMode {
  if (!desktop || reduceMotion || forceStatic) return "static";
  return forcedStage ? "forced" : "active";
}

export function resolveScholarAIEvidenceStage(
  progress: number,
): ScholarAIEvidenceKey {
  if (progress < 0.35) return "retrieve";
  if (progress < 0.69) return "ground";
  return "evaluate";
}
