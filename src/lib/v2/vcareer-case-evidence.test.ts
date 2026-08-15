import { describe, expect, it } from "vitest";
import {
  moveVCareerEvidenceIndex,
  parseVCareerCaseEvidenceReviewState,
} from "./vcareer-case-evidence";

describe("VCareer case evidence controls", () => {
  it.each([
    ["", "auto"],
    ["?evidence=auto", "auto"],
    ["?evidence=loading", "loading"],
    ["?evidence=image-loading", "loading"],
    ["?evidence=error", "error"],
    ["?evidence=image-error", "error"],
    ["?other=image-error", "auto"],
  ] as const)("maps %s to %s", (search, state) => {
    expect(parseVCareerCaseEvidenceReviewState(search)).toBe(state);
  });

  it("stops at the first and last evidence records", () => {
    expect(moveVCareerEvidenceIndex(0, -1, 6)).toBe(0);
    expect(moveVCareerEvidenceIndex(0, 1, 6)).toBe(1);
    expect(moveVCareerEvidenceIndex(5, 1, 6)).toBe(5);
    expect(moveVCareerEvidenceIndex(5, -1, 6)).toBe(4);
  });
});
