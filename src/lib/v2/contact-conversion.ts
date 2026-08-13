import { SOCIALS } from "@/data/socials";

export const V2_CONTACT_DESTINATIONS = {
  email: SOCIALS.email,
  emailHref: `mailto:${SOCIALS.email}`,
  cvHref: "/Nguyen%20Manh%20Tu_CV.pdf",
  cvDownloadName: "Nguyen-Manh-Tu-CV.pdf",
  github: SOCIALS.github,
  linkedin: SOCIALS.linkedin,
} as const;
