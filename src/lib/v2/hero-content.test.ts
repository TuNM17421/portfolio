import { describe, expect, it } from "vitest";
import en from "../../../messages/en.json";
import vi from "../../../messages/vi.json";

const CANONICAL_ROLE = "Software Engineer · AI Engineer";

describe("V2 Hero content contract", () => {
  it("keeps the exact canonical role in both locales", () => {
    expect(vi.v2.hero.role).toBe(CANONICAL_ROLE);
    expect(en.v2.hero.role).toBe(CANONICAL_ROLE);
  });

  it("keeps the user-approved positioning copy", () => {
    expect(vi.v2.hero.positioning).toBe(
      "Xây dựng backend và sản phẩm AI realtime.",
    );
    expect(en.v2.hero.positioning).toBe(
      "Building reliable backends and realtime AI experiences.",
    );
  });

  it("promotes only the verified VCareer pilot proof in the Hero", () => {
    expect(vi.v2.hero.proof).toContain("150+");
    expect(en.v2.hero.proof).toContain("150+");

    const heroCopy = JSON.stringify([vi.v2.hero, en.v2.hero]);
    expect(heroCopy).not.toMatch(/2\+|Track 4|Giải Nhì|2nd Prize/);
  });
});
