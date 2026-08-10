import {
  Resend,
  type CreateEmailOptions,
  type CreateEmailRequestOptions,
  type CreateEmailResponse,
} from "resend";
import type { ContactInput } from "@/lib/contact-schema";
import type { ContactDeliveryConfig } from "@/lib/contact-delivery-config";

export type ContactEmailTransport = (
  email: CreateEmailOptions,
  options: CreateEmailRequestOptions
) => Promise<CreateEmailResponse>;

export type ContactDeliveryResult =
  | { ok: true; id: string }
  | {
      ok: false;
      code: string;
      statusCode: number | null;
      retryAfter?: string;
    };

export function buildContactEmail(
  input: ContactInput,
  config: ContactDeliveryConfig
): CreateEmailOptions {
  const safeName = escapeHtml(input.name);
  const safeEmail = escapeHtml(input.email);
  const safeMessage = escapeHtml(input.message).replace(/\n/g, "<br />");

  return {
    from: `Nguyen Manh Tu Portfolio <${config.fromEmail}>`,
    to: [config.toEmail],
    replyTo: input.email,
    subject: `Portfolio message from ${sanitizeSubject(input.name)}`,
    text: [
      "New portfolio contact message",
      "",
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      "",
      input.message,
    ].join("\n"),
    html: [
      "<h1>New portfolio contact message</h1>",
      `<p><strong>Name:</strong> ${safeName}</p>`,
      `<p><strong>Email:</strong> ${safeEmail}</p>`,
      `<p><strong>Message:</strong><br />${safeMessage}</p>`,
    ].join(""),
    tags: [{ name: "source", value: "portfolio_contact" }],
  };
}

export async function deliverContactMessage(
  input: ContactInput,
  config: ContactDeliveryConfig,
  submissionId: string,
  transport: ContactEmailTransport = createResendTransport(config.apiKey)
): Promise<ContactDeliveryResult> {
  const response = await transport(buildContactEmail(input, config), {
    idempotencyKey: `portfolio-contact/${submissionId}`,
  });

  if (response.error) {
    return {
      ok: false,
      code: response.error.name,
      statusCode: response.error.statusCode,
      retryAfter: response.headers?.["retry-after"],
    };
  }

  return { ok: true, id: response.data.id };
}

function createResendTransport(apiKey: string): ContactEmailTransport {
  const resend = new Resend(apiKey);
  return (email, options) => resend.emails.send(email, options);
}

function sanitizeSubject(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character
  );
}
