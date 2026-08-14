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

  it("keeps the 08B direct-scope boundary explicit in both locales", () => {
    for (const messages of [vi, en]) {
      expect(Object.keys(messages.vcareerCaseStudy.scope.items)).toEqual([
        "realtime",
        "matching",
        "builder",
      ]);
      expect(messages.vcareerCaseStudy.scope.intro).toMatch(
        /không phải toàn bộ|not every component/i,
      );
      expect(messages.vcareerCaseStudy.v2.scopeLabels.direct).toBeTruthy();
      expect(messages.vcareerCaseStudy.v2.scopeLabels.context).toBeTruthy();
    }
  });

  it("separates the six-week delivery cycle from post-live recognition", () => {
    expect(vi.vcareerCaseStudy.timeline.items.discovery.label).toBe("Khảo sát");
    expect(vi.vcareerCaseStudy.timeline.items.build.label).toBe("Xây dựng");
    expect(vi.vcareerCaseStudy.timeline.items.pilot.label).toBe("Thử nghiệm");
    expect(vi.vcareerCaseStudy.v2.deliveryTrace.recognitionBoundary).toContain(
      "ĐÃ HOẠT ĐỘNG",
    );
    expect(en.vcareerCaseStudy.v2.deliveryTrace.recognitionBoundary).toContain(
      "ALREADY LIVE",
    );
  });

  it("keeps the 08C architecture scope and deployment states explicit", () => {
    for (const messages of [vi, en]) {
      const architecture = messages.vcareerCaseStudy;
      const trace = architecture.v2.architectureTrace;

      expect(architecture.architecture.items.storage.title).toMatch(
        /Cloudflare R2.*Amazon S3/i,
      );
      expect(architecture.architecture.items.storage.body).toMatch(
        /giữ cả hai|both object-storage paths are retained/i,
      );
      expect(trace.labels.direct).toMatch(/TÚ|TU/);
      expect(trace.labels.context).toMatch(/BỐI CẢNH|CONTEXT/i);
      expect(trace.deployment.current.title).toContain("Vercel");
      expect(trace.deployment.pending.title).toContain("AWS Singapore");
      expect(trace.deployment.pending.body).toMatch(
        /vẫn đang chờ|remains pending/i,
      );
      expect(trace.report.body).toMatch(
        /không mở rộng phạm vi|does not expand/i,
      );
    }
  });

  it("keeps shipped work separate from the pending-funding roadmap", () => {
    for (const messages of [vi, en]) {
      const caseStudy = messages.vcareerCaseStudy;

      expect(caseStudy.v2.stateLabels.shipped).toBeTruthy();
      expect(caseStudy.v2.stateLabels.roadmap).toMatch(/FUNDING/i);
      expect(caseStudy.delivery.roadmap.status).toMatch(
        /chưa phải tính năng đã ship|not shipped capabilities/i,
      );
      expect(Object.keys(caseStudy.delivery.roadmap.items)).toEqual([
        "mentor",
        "progress",
        "jobs",
      ]);
    }
  });
});
