import { describe, expect, it } from "vitest";
import { moveVCareerEvidenceIndex } from "./vcareer-case-evidence";

describe("VCareer case evidence controls", () => {
  it("stops at the first and last evidence records", () => {
    expect(moveVCareerEvidenceIndex(0, -1, 6)).toBe(0);
    expect(moveVCareerEvidenceIndex(0, 1, 6)).toBe(1);
    expect(moveVCareerEvidenceIndex(5, 1, 6)).toBe(5);
    expect(moveVCareerEvidenceIndex(5, -1, 6)).toBe(4);
  });
});
