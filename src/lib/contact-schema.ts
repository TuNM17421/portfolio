import { z } from "zod";

// Shared contract for the contact form — used by both the client form
// and the API route so validation stays in sync (single source of truth).
export const contactSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  message: z.string().trim().min(10),
});

export type ContactInput = z.infer<typeof contactSchema>;
