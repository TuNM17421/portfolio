import { describe, expect, it, vi } from "vitest";
import {
  buildContactEmail,
  deliverContactMessage,
  type ContactEmailTransport,
} from "@/lib/contact-delivery";
import {
  getContactDeliveryConfig,
  isContactDeliveryConfigured,
  type ContactDeliveryConfig,
} from "@/lib/contact-delivery-config";

const config: ContactDeliveryConfig = {
  apiKey: "re_test",
  fromEmail: "no-reply@scholar-ai.app",
  toEmail: "tunm17421@gmail.com",
};

const message = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "I would like to discuss a backend role.",
};

describe("contact delivery configuration", () => {
  it("is enabled only when every Resend setting is valid", () => {
    expect(
      getContactDeliveryConfig({
        RESEND_API_KEY: config.apiKey,
        CONTACT_FROM_EMAIL: config.fromEmail,
        CONTACT_TO_EMAIL: config.toEmail,
      })
    ).toEqual(config);

    expect(
      isContactDeliveryConfigured({
        CONTACT_FROM_EMAIL: config.fromEmail,
        CONTACT_TO_EMAIL: config.toEmail,
      })
    ).toBe(false);

    expect(
      isContactDeliveryConfigured({
        RESEND_API_KEY: config.apiKey,
        CONTACT_FROM_EMAIL: "not-an-email",
        CONTACT_TO_EMAIL: config.toEmail,
      })
    ).toBe(false);
  });
});

describe("contact email delivery", () => {
  it("builds a replyable email and escapes user content in HTML", () => {
    const email = buildContactEmail(
      {
        ...message,
        name: "Ada\r\nInjected subject",
        message: "Hello <script>alert('xss')</script>",
      },
      config
    );

    expect(email).toMatchObject({
      from: "Nguyen Manh Tu Portfolio <no-reply@scholar-ai.app>",
      to: ["tunm17421@gmail.com"],
      replyTo: "ada@example.com",
      subject: "Portfolio message from Ada Injected subject",
    });
    expect(email.html).toContain(
      "Hello &lt;script&gt;alert(&#039;xss&#039;)&lt;/script&gt;"
    );
    expect(email.html).not.toContain("<script>");
  });

  it("returns the Resend id after the provider accepts the message", async () => {
    const transport = vi.fn<ContactEmailTransport>(async () => ({
      data: { id: "email_123" },
      error: null,
      headers: null,
    }));

    await expect(
      deliverContactMessage(message, config, "submission-id", transport)
    ).resolves.toEqual({ ok: true, id: "email_123" });

    expect(transport).toHaveBeenCalledOnce();
    expect(transport.mock.calls[0][1]).toEqual({
      idempotencyKey: "portfolio-contact/submission-id",
    });
  });

  it("returns a safe provider failure with retry metadata", async () => {
    const transport = vi.fn<ContactEmailTransport>(async () => ({
      data: null,
      error: {
        name: "rate_limit_exceeded",
        message: "Provider detail that must stay server-side",
        statusCode: 429,
      },
      headers: { "retry-after": "30" },
    }));

    await expect(
      deliverContactMessage(message, config, "submission-id", transport)
    ).resolves.toEqual({
      ok: false,
      code: "rate_limit_exceeded",
      statusCode: 429,
      retryAfter: "30",
    });
  });
});
