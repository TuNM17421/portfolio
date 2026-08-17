import { describe, expect, it } from "vitest";
import en from "../../../messages/en.json";
import vi from "../../../messages/vi.json";
import { V2_CONTACT_DESTINATIONS } from "./contact-conversion";

describe("portfolio v2 contact conversion field", () => {
  it("uses the canonical direct-email and social destinations", () => {
    expect(V2_CONTACT_DESTINATIONS).toMatchObject({
      email: "tunm17421@gmail.com",
      emailHref: "mailto:tunm17421@gmail.com",
      github: "https://github.com/TuNM17421",
      linkedin: "https://www.linkedin.com/in/tunm17421",
    });
  });

  it("points the CV action at the owner-supplied same-origin PDF", () => {
    expect(V2_CONTACT_DESTINATIONS.cvHref).toBe("/Nguyen%20Manh%20Tu_CV.pdf");
    expect(V2_CONTACT_DESTINATIONS.cvDownloadName).toBe(
      "Nguyen-Manh-Tu-CV.pdf",
    );
  });

  it("keeps both locales aligned around one direct contact action", () => {
    expect(vi.v2.contact.title).toBe("Có một hệ thống đáng để cùng xây?");
    expect(en.v2.contact.title).toBe("Have a system worth building?");

    for (const locale of [vi, en]) {
      const copy = JSON.stringify(locale.v2.contact);

      expect(copy).toMatch(/GitHub/);
      expect(copy).toMatch(/LinkedIn/);
      expect(copy).not.toMatch(
        /available for work|response time|freelance|toàn thời gian|phản hồi trong/i,
      );
    }
  });

  it("closes V2 with one short utility rail instead of repeated identity copy", () => {
    expect(vi.v2.contact.footer).toMatchObject({
      backToTop: "Về đầu trang",
      copyright: "© 2026 Nguyen Manh Tu",
    });
    expect(en.v2.contact.footer).toMatchObject({
      backToTop: "Back to top",
      copyright: "© 2026 Nguyen Manh Tu",
    });

    for (const locale of [vi, en]) {
      const footerCopy = JSON.stringify(locale.v2.contact.footer);
      expect(Object.keys(locale.v2.contact.footer).sort()).toEqual([
        "backToTop",
        "copyright",
      ]);
      expect(footerCopy).not.toMatch(/Next\.js|Tailwind|GitHub|LinkedIn/i);
    }
  });
});
