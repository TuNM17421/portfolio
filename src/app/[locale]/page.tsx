import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/hero-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { AwardsSection } from "@/components/sections/awards-section";
import { ContactSection } from "@/components/sections/contact-section";
import { isContactDeliveryConfigured } from "@/lib/contact-delivery-config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <AwardsSection />
      <ContactSection deliveryEnabled={isContactDeliveryConfigured()} />
    </>
  );
}
