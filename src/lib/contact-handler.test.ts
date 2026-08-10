import { describe, expect, it, vi } from "vitest";
import { createContactHandler } from "@/lib/contact-handler";
import type { ContactDeliveryConfig } from "@/lib/contact-delivery-config";

const config: ContactDeliveryConfig = {
  apiKey: "re_test",
  fromEmail: "no-reply@scholar-ai.app",
  toEmail: "tunm17421@gmail.com",
};

const payload = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "I would like to discuss a backend role.",
  submissionId: "5658453e-f6c2-4d92-bc6e-1f492f75b61b",
};

function contactRequest(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("contact request handler", () => {
  it("rejects malformed JSON", async () => {
    const response = await createContactHandler()(contactRequest("{"));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "Invalid JSON" });
  });

  it("rejects invalid contact data before calling the provider", async () => {
    const deliver = vi.fn();
    const handler = createContactHandler({
      getConfig: () => config,
      deliver,
    });

    const response = await handler(contactRequest({ ...payload, message: "short" }));

    expect(response.status).toBe(422);
    expect(deliver).not.toHaveBeenCalled();
  });

  it("returns unavailable when delivery is not configured", async () => {
    const deliver = vi.fn();
    const handler = createContactHandler({
      getConfig: () => null,
      deliver,
    });

    const response = await handler(contactRequest(payload));

    expect(response.status).toBe(503);
    expect(deliver).not.toHaveBeenCalled();
  });

  it("acknowledges only a provider-accepted message", async () => {
    const deliver = vi.fn(async () => ({ ok: true as const, id: "email_123" }));
    const handler = createContactHandler({
      getConfig: () => config,
      deliver,
    });

    const response = await handler(contactRequest(payload));

    expect(response.status).toBe(202);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(deliver).toHaveBeenCalledWith(
      {
        name: payload.name,
        email: payload.email,
        message: payload.message,
      },
      config,
      payload.submissionId
    );
  });

  it("returns a retryable response when Resend rate-limits delivery", async () => {
    const deliver = vi.fn(async () => ({
      ok: false as const,
      code: "rate_limit_exceeded",
      statusCode: 429,
      retryAfter: "30",
    }));
    const handler = createContactHandler({
      getConfig: () => config,
      deliver,
    });

    const response = await handler(contactRequest(payload));

    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("30");
    await expect(response.json()).resolves.toEqual({ error: "Rate limited" });
  });

  it("does not report success for provider errors or thrown failures", async () => {
    const providerError = createContactHandler({
      getConfig: () => config,
      deliver: async () => ({
        ok: false,
        code: "validation_error",
        statusCode: 422,
      }),
    });
    const thrownError = createContactHandler({
      getConfig: () => config,
      deliver: async () => {
        throw new Error("Network unavailable");
      },
    });

    expect((await providerError(contactRequest(payload))).status).toBe(502);
    expect((await thrownError(contactRequest(payload))).status).toBe(502);
  });
});
