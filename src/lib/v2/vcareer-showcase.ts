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
