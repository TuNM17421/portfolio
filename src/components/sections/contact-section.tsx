"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { contactSchema } from "@/lib/contact-schema";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactSection() {
  const t = useTranslations("contact");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
    };

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors({
        name: flat.name ? t("form.errorName") : undefined,
        email: flat.email ? t("form.errorEmail") : undefined,
        message: flat.message ? t("form.errorMessage") : undefined,
      });
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      setSent(true);
      event.currentTarget.reset();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-2xl px-4 py-20">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          <Field label={t("form.name")} error={errors.name}>
            <input
              name="name"
              placeholder={t("form.namePlaceholder")}
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>
          <Field label={t("form.email")} error={errors.email}>
            <input
              name="email"
              type="email"
              placeholder={t("form.emailPlaceholder")}
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>
          <Field label={t("form.message")} error={errors.message}>
            <textarea
              name="message"
              rows={4}
              placeholder={t("form.messagePlaceholder")}
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {t("form.submit")}
          </button>

          {sent && (
            <p className="text-sm font-medium text-primary">
              {t("form.success")}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
      {error && (
        <span className="mt-1 block text-sm text-destructive">{error}</span>
      )}
    </label>
  );
}
