import { z } from "zod";

// Shared contract for the contact form — used by both the client form
// and the API route so validation stays in sync (single source of truth).
export const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5_000),
});

export const contactRequestSchema = contactSchema.extend({
  submissionId: z.string().uuid(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactRequest = z.infer<typeof contactRequestSchema>;
