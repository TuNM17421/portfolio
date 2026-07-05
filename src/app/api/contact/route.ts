import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Zod validation at the API boundary.
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: result.error.flatten() },
      { status: 422 }
    );
  }

  // NOTE: Wire an email/DB provider here (Resend, Nodemailer, DB insert...).
  // For now we log server-side and acknowledge receipt.
  console.log("New contact message:", result.data);

  return NextResponse.json({ ok: true }, { status: 200 });
}
