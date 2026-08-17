import { describe, expect, it } from "vitest";
import en from "../../../messages/en.json";
import vi from "../../../messages/vi.json";

describe("portfolio v2 About content", () => {
  it("frames Backend as the foundation for the next step", () => {
    expect(
      `${vi.v2.about.foundationPrefix} ${vi.v2.about.foundationAnchor}${vi.v2.about.foundationSuffix}`,
    ).toBe("Từ Backend.");
    expect(vi.v2.about.extension).toBe("AI là bước phát triển tiếp theo.");

    expect(
      `${en.v2.about.foundationPrefix} ${en.v2.about.foundationAnchor}${en.v2.about.foundationSuffix}`,
    ).toBe("From Backend.");
    expect(en.v2.about.extension).toBe("AI is the next step forward.");
  });

  it("preserves the evidence-first engineering philosophy in both locales", () => {
    const viCopy = JSON.stringify(vi.v2.about);
    const enCopy = JSON.stringify(en.v2.about);

    for (const term of ["LLM", "RAG", "recommendation", "AI Agent"]) {
      expect(viCopy).toContain(term);
      expect(enCopy).toContain(term);
    }

    expect(vi.v2.about.principle).toBe(
      "Hãy bắt đầu từ bài toán thực tế, thay vì xuất phát từ công nghệ.",
    );
    expect(en.v2.about.principle).toBe(
      "Start with the real problem rather than the technology.",
    );
  });

  it("uses the approved personal voice and four real decision stages", () => {
    expect(vi.v2.about.foundationBody).toContain("mình");
    expect(vi.v2.about.principleBody).toContain("mình");
    expect(Object.values(vi.v2.about.process)).toHaveLength(4);
    expect(Object.values(en.v2.about.process)).toHaveLength(4);
  });
});
