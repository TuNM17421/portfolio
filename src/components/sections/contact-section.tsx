"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { contactSchema } from "@/lib/contact-schema";
import { SOCIALS } from "@/data/socials";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";

type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const FIELD_ORDER: FieldName[] = ["name", "email", "message"];

export function ContactSection({
  deliveryEnabled,
}: {
  deliveryEnabled: boolean;
}) {
  const t = useTranslations("contact");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submissionIdRef = useRef<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Capture the form node now — currentTarget is null after the first await.
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const values = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
    };

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const nextErrors: FieldErrors = {
        name: flat.name ? t("form.errorName") : undefined,
        email: flat.email ? t("form.errorEmail") : undefined,
        message: flat.message ? t("form.errorMessage") : undefined,
      };
      setErrors(nextErrors);
      setSubmitError(null);
      // Move focus to the first invalid field (WCAG focus-management).
      const firstInvalid = FIELD_ORDER.find((k) => nextErrors[k]);
      if (firstInvalid) {
        formEl.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      }
      return;
    }

    setErrors({});
    setSubmitError(null);
    setSent(false);
    setSubmitting(true);
    const submissionId = submissionIdRef.current ?? crypto.randomUUID();
    submissionIdRef.current = submissionId;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, submissionId }),
      });

      if (!res.ok) {
        setSubmitError(
          res.status === 429
            ? t("form.errorRateLimited")
            : res.status === 503
              ? t("form.errorUnavailable")
              : t("form.errorSubmit")
        );
        return;
      }

      setSent(true);
      submissionIdRef.current = null;
      formEl.reset();
    } catch {
      setSubmitError(t("form.errorSubmit"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <div className="reveal rounded-2xl border border-border bg-card p-8 sm:p-12">
        <div className="flex items-center justify-center gap-2.5 font-mono text-sm text-accent-2">
          <span className="h-px w-6 bg-brand" />
          05 — {t("eyebrow")}
        </div>
        <h2 className="mt-3.5 text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-2.5 max-w-md text-center text-muted-foreground">
          {t("subtitle")}
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <ContactLink href={`mailto:${SOCIALS.email}`} label={t("emailLabel")}>
            <MailIcon className="h-4 w-4" />
          </ContactLink>
          <ContactLink href={SOCIALS.github} label={t("githubLabel")}>
            <GithubIcon className="h-4 w-4" />
          </ContactLink>
          <ContactLink href={SOCIALS.linkedin} label={t("linkedinLabel")}>
            <LinkedinIcon className="h-4 w-4" />
          </ContactLink>
        </div>

        {deliveryEnabled ? (
          <form
            onSubmit={handleSubmit}
            onChange={() => {
              submissionIdRef.current = null;
              setSent(false);
            }}
            className="mt-9 space-y-5"
            aria-busy={submitting}
            noValidate
          >
            <Field name="name" label={t("form.name")} error={errors.name}>
              <input
                name="name"
                autoComplete="name"
                aria-required="true"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                placeholder={t("form.namePlaceholder")}
                className="min-h-11 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary ring-brand"
              />
            </Field>
            <Field name="email" label={t("form.email")} error={errors.email}>
              <input
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                aria-required="true"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                placeholder={t("form.emailPlaceholder")}
                className="min-h-11 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary ring-brand"
              />
            </Field>
            <Field
              name="message"
              label={t("form.message")}
              error={errors.message}
            >
              <textarea
                name="message"
                rows={4}
                aria-required="true"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder={t("form.messagePlaceholder")}
                className="w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary ring-brand"
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white glow-brand transition-transform hover:-translate-y-0.5 disabled:opacity-50 sm:w-auto"
            >
              {submitting ? t("form.sending") : t("form.submit")}
            </button>

            {sent && (
              <p role="status" className="text-sm font-medium text-accent-2">
                {t("form.success")}
              </p>
            )}
            {submitError && (
              <p role="alert" className="text-sm font-medium text-destructive">
                {submitError}
              </p>
            )}
          </form>
        ) : (
          <p className="mx-auto mt-8 max-w-md text-center text-sm text-muted-foreground">
            {t("form.unavailable")}
          </p>
        )}
      </div>
    </section>
  );
}

function ContactLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 hover:border-primary"
    >
      {children}
      {label}
    </a>
  );
}

function Field({
  name,
  label,
  error,
  children,
}: {
  name: FieldName;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">
        {label}
        <span className="text-destructive"> *</span>
      </span>
      {children}
      {error && (
        <span
          id={`${name}-error`}
          role="alert"
          className="mt-1 block text-sm text-destructive"
        >
          {error}
        </span>
      )}
    </label>
  );
}
