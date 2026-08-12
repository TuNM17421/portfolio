import { VCAREER_PROJECT } from "@/data/projects";

export const VCAREER_STAGE_KEYS = [
  "landing",
  "cvBuilder",
  "match",
  "interviewDemo",
  "interviewReview",
  "dashboard",
] as const;

export type VCareerStageKey = (typeof VCAREER_STAGE_KEYS)[number];
export type VCareerEvidenceKind = "direct" | "context";
export type VCareerEvidenceQualifier = "analysis" | "baseline";
export type VCareerShowcaseMode = "active" | "static";
export type VCareerImageReviewState = "auto" | "loading" | "error";

export type VCareerStageWindow = {
  enter: number;
  holdStart: number;
  holdEnd: number;
  exit: number;
};

const STATIC_SHOWCASE_VALUES = new Set(["static", "0", "off", "false"]);
const LOADING_SHOWCASE_VALUES = new Set(["loading", "image-loading"]);
const ERROR_SHOWCASE_VALUES = new Set(["error", "image-error"]);

export type VCareerShowcaseControls = {
  forceStatic: boolean;
  imageState: VCareerImageReviewState;
};

type ResolveVCareerShowcaseModeOptions = {
  desktop: boolean;
  reduceMotion: boolean;
  forceStatic?: boolean;
};

export function parseVCareerShowcaseControls(
  value: string,
): VCareerShowcaseControls {
  const normalized = value.trim().toLowerCase();
  const forceLoading = LOADING_SHOWCASE_VALUES.has(normalized);
  const forceError = ERROR_SHOWCASE_VALUES.has(normalized);

  return {
    forceStatic:
      STATIC_SHOWCASE_VALUES.has(normalized) || forceLoading || forceError,
    imageState: forceLoading ? "loading" : forceError ? "error" : "auto",
  };
}

export function resolveVCareerShowcaseMode({
  desktop,
  reduceMotion,
  forceStatic = false,
}: ResolveVCareerShowcaseModeOptions): VCareerShowcaseMode {
  return desktop && !reduceMotion && !forceStatic ? "active" : "static";
}

export const VCAREER_STAGE_WINDOWS: Record<
  VCareerStageKey,
  VCareerStageWindow
> = {
  landing: { enter: 0.145, holdStart: 0.19, holdEnd: 0.255, exit: 0.295 },
  cvBuilder: { enter: 0.265, holdStart: 0.31, holdEnd: 0.375, exit: 0.415 },
  match: { enter: 0.385, holdStart: 0.43, holdEnd: 0.495, exit: 0.535 },
  interviewDemo: { enter: 0.505, holdStart: 0.55, holdEnd: 0.615, exit: 0.655 },
  interviewReview: {
    enter: 0.625,
    holdStart: 0.67,
    holdEnd: 0.735,
    exit: 0.775,
  },
  dashboard: { enter: 0.745, holdStart: 0.79, holdEnd: 0.855, exit: 0.895 },
};

type StageBlueprint = {
  key: VCareerStageKey;
  evidence: VCareerEvidenceKind;
  qualifier?: VCareerEvidenceQualifier;
  width: number;
  height: number;
  layout: "primary" | "bookend";
};

const STAGE_BLUEPRINTS: readonly StageBlueprint[] = [
  {
    key: "landing",
    evidence: "context",
    width: 1902,
    height: 914,
    layout: "bookend",
  },
  {
    key: "cvBuilder",
    evidence: "direct",
    qualifier: "analysis",
    width: 1920,
    height: 914,
    layout: "primary",
  },
  {
    key: "match",
    evidence: "direct",
    width: 1920,
    height: 911,
    layout: "primary",
  },
  {
    key: "interviewDemo",
    evidence: "direct",
    qualifier: "baseline",
    width: 1920,
    height: 908,
    layout: "primary",
  },
  {
    key: "interviewReview",
    evidence: "context",
    width: 1920,
    height: 913,
    layout: "primary",
  },
  {
    key: "dashboard",
    evidence: "context",
    width: 1903,
    height: 915,
    layout: "bookend",
  },
];

export type VCareerShowcaseStage = StageBlueprint & {
  src: string;
};

export const VCAREER_SHOWCASE_STAGES: readonly VCareerShowcaseStage[] =
  STAGE_BLUEPRINTS.map((stage) => {
    const projectImage = VCAREER_PROJECT.images.find(
      (image) => image.shot === stage.key,
    );

    if (!projectImage) {
      throw new Error(`Missing VCareer evidence image: ${stage.key}`);
    }

    return {
      ...stage,
      src: projectImage.src,
    };
  });
