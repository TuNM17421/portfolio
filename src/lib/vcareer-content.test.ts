import { describe, expect, it } from "vitest";
import en from "../../messages/en.json";
import vi from "../../messages/vi.json";
import { VCAREER_PROJECT } from "@/data/projects";

const verifiedContent = [en, vi].map((messages) =>
  JSON.stringify({
    project: messages.projects.items.vcareer,
    caseStudy: messages.vcareerCaseStudy,
    award: messages.awards.hackathon,
  }),
);

describe("VCareer public evidence", () => {
  it("exposes only real destinations and a truthful private-repo state", () => {
    expect(VCAREER_PROJECT.caseStudyPath).toBe("/projects/vcareer");
    expect(VCAREER_PROJECT.liveUrl).toBe(
      "https://topportfolio-sage.vercel.app/",
    );
    expect(VCAREER_PROJECT.architectureUrl).toBe(
      "https://vcareea-architecture.lovable.app/",
    );
    expect(VCAREER_PROJECT.repoVisibility).toBe("private");
    expect(VCAREER_PROJECT.images).toHaveLength(6);
  });

  it("keeps the verified product technology state", () => {
    expect(VCAREER_PROJECT.tech).toEqual(
      expect.arrayContaining([
        "LiveKit",
        "Three.js TalkingHead",
        "Cloudflare R2",
        "Amazon S3",
      ]),
    );
  });

  it.each(verifiedContent)(
    "uses the real pilot and prize evidence without placeholder claims",
    (content) => {
      expect(content).toContain("150+");
      expect(content).toContain("$5,000");
      expect(content).not.toMatch(/\$10,000|2,000\+|1,080\+|24-hour|24 giờ/);
    },
  );

  it("states that VCareer was live before the Track 4 event", () => {
    expect(en.awards.hackathon.description).toContain("already-live product");
    expect(vi.awards.hackathon.description).toContain("sản phẩm đã live");
    expect(en.vcareerCaseStudy.timeline.items.hackathon.body).toContain(
      "not built from scratch",
    );
    expect(vi.vcareerCaseStudy.timeline.items.hackathon.body).toContain(
      "không được build từ đầu",
    );
  });
});
