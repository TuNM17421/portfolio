import { contactRequestSchema } from "@/lib/contact-schema";
import {
  getContactDeliveryConfig,
  type ContactDeliveryConfig,
} from "@/lib/contact-delivery-config";
import {
  deliverContactMessage,
  type ContactDeliveryResult,
} from "@/lib/contact-delivery";

type DeliverContactMessage = (
  input: Parameters<typeof deliverContactMessage>[0],
  config: ContactDeliveryConfig,
  submissionId: string
) => Promise<ContactDeliveryResult>;

type ContactHandlerDependencies = {
  getConfig?: () => ContactDeliveryConfig | null;
  deliver?: DeliverContactMessage;
};

export function createContactHandler({
  getConfig = getContactDeliveryConfig,
  deliver = deliverContactMessage,
}: ContactHandlerDependencies = {}) {
  return async function handleContactRequest(request: Request) {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const result = contactRequestSchema.safeParse(body);
    if (!result.success) {
      return Response.json(
        { error: "Validation failed", issues: result.error.flatten() },
        { status: 422 }
      );
    }

    const config = getConfig();
    if (!config) {
      return Response.json(
        { error: "Contact delivery is unavailable" },
        { status: 503 }
      );
    }

    let delivery: ContactDeliveryResult;
    try {
      const { submissionId, ...message } = result.data;
      delivery = await deliver(message, config, submissionId);
    } catch {
      return Response.json({ error: "Delivery failed" }, { status: 502 });
    }

    if (!delivery.ok) {
      const rateLimited =
        delivery.statusCode === 429 || delivery.code === "rate_limit_exceeded";

      if (rateLimited) {
        return Response.json(
          { error: "Rate limited" },
          {
            status: 429,
            headers: { "Retry-After": delivery.retryAfter ?? "60" },
          }
        );
      }

      return Response.json({ error: "Delivery failed" }, { status: 502 });
    }

    return Response.json({ ok: true }, { status: 202 });
  };
}

export const handleContactRequest = createContactHandler();
