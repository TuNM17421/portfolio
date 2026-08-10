import { z } from "zod";

const contactDeliveryConfigSchema = z.object({
  apiKey: z.string().trim().min(1),
  fromEmail: z.string().trim().email(),
  toEmail: z.string().trim().email(),
});

export type ContactDeliveryConfig = z.infer<
  typeof contactDeliveryConfigSchema
>;

type ContactDeliveryEnvironment = {
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
};

export function getContactDeliveryConfig(
  environment: ContactDeliveryEnvironment = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
  }
): ContactDeliveryConfig | null {
  const result = contactDeliveryConfigSchema.safeParse({
    apiKey: environment.RESEND_API_KEY,
    fromEmail: environment.CONTACT_FROM_EMAIL,
    toEmail: environment.CONTACT_TO_EMAIL,
  });

  return result.success ? result.data : null;
}

export function isContactDeliveryConfigured(
  environment?: ContactDeliveryEnvironment
) {
  return getContactDeliveryConfig(environment) !== null;
}
