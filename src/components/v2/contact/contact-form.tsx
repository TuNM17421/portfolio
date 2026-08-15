"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { contactSchema } from "@/lib/contact-schema";
import {
  contactStatusIsError,
  contactStatusLocksFields,
  resolveContactResponseStatus,
  resolveInitialContactStatus,
  type ContactFormStatus,
} from "@/lib/v2/contact-form";
import { V2_CONTACT_DESTINATIONS } from "@/lib/v2/contact-conversion";
import styles from "./contact-form.module.css";

type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const FIELD_ORDER: FieldName[] = ["name", "email", "message"];

export type ContactFormCopy = {
  label: string;
  title: string;
  body: string;
  required: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  retry: string;
  sending: string;
  directEmail: string;
  validationSummary: string;
  success: string;
  rateLimit: string;
  error: string;
  offline: string;
  unavailable: string;
  staticFallback: string;
  errors: Record<FieldName, string>;
  stateLabels: Record<ContactFormStatus, string>;
};

type ContactFormProps = {
  copy: ContactFormCopy;
  deliveryEnabled: boolean;
};

export function ContactForm({
  copy,
  deliveryEnabled,
}: ContactFormProps) {
  const [hydrated, setHydrated] = useState(false);
  const [liveStatus, setLiveStatus] = useState<ContactFormStatus>(() =>
    resolveInitialContactStatus(deliveryEnabled),
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const submissionIdRef = useRef<string | null>(null);
  const status = liveStatus;
  const visibleErrors = errors;
  const fieldsLocked = contactStatusLocksFields(status);
  const buttonDisabled = !hydrated || fieldsLocked;
  const retryable = ["rate-limit", "error", "offline"].includes(status);
  const buttonLabel =
    status === "sending"
      ? copy.sending
      : retryable
        ? copy.retry
        : copy.submit;

  useEffect(() => setHydrated(true), []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || fieldsLocked) return;

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const values = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };
    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      const flattened = parsed.error.flatten().fieldErrors;
      const nextErrors: FieldErrors = {
        name: flattened.name ? copy.errors.name : undefined,
        email: flattened.email ? copy.errors.email : undefined,
        message: flattened.message ? copy.errors.message : undefined,
      };

      setErrors(nextErrors);
      setLiveStatus("validation");

      const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
      if (firstInvalid) {
        formElement
          .querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
          ?.focus();
      }
      return;
    }

    setErrors({});

    setLiveStatus("sending");
    const submissionId = submissionIdRef.current ?? crypto.randomUUID();
    submissionIdRef.current = submissionId;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, submissionId }),
      });
      const nextStatus = resolveContactResponseStatus(response.status);

      setLiveStatus(nextStatus);
      if (nextStatus === "success") {
        submissionIdRef.current = null;
        formElement.reset();
      }
    } catch {
      setLiveStatus("offline");
    }
  }

  function handleChange() {
    submissionIdRef.current = null;
    setErrors({});
    setLiveStatus(deliveryEnabled ? "ready" : "unavailable");
  }

  return (
    <section
      className={styles.formRegion}
      aria-labelledby="v2-contact-form-title"
      data-contact-form
      data-contact-state={status}
    >
      <div className={styles.formIntroduction}>
        <p className={styles.formLabel}>{copy.label}</p>
        <h3 id="v2-contact-form-title">{copy.title}</h3>
        <p>{copy.body}</p>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        onChange={handleChange}
        aria-busy={status === "sending"}
        noValidate
      >
        <fieldset disabled={fieldsLocked}>
          <legend className={styles.srOnly}>{copy.title}</legend>
          <div className={styles.fields}>
            <ContactField
              name="name"
              label={copy.name}
              required={copy.required}
              error={visibleErrors.name}
            >
              <input
                name="name"
                autoComplete="name"
                aria-required="true"
                aria-invalid={Boolean(visibleErrors.name)}
                aria-describedby={
                  visibleErrors.name ? "v2-contact-name-error" : undefined
                }
                placeholder={copy.namePlaceholder}
              />
            </ContactField>

            <ContactField
              name="email"
              label={copy.email}
              required={copy.required}
              error={visibleErrors.email}
            >
              <input
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                aria-required="true"
                aria-invalid={Boolean(visibleErrors.email)}
                aria-describedby={
                  visibleErrors.email ? "v2-contact-email-error" : undefined
                }
                placeholder={copy.emailPlaceholder}
              />
            </ContactField>

            <ContactField
              name="message"
              label={copy.message}
              required={copy.required}
              error={visibleErrors.message}
              wide
            >
              <textarea
                name="message"
                rows={5}
                aria-required="true"
                aria-invalid={Boolean(visibleErrors.message)}
                aria-describedby={
                  visibleErrors.message ? "v2-contact-message-error" : undefined
                }
                placeholder={copy.messagePlaceholder}
              />
            </ContactField>
          </div>

          <div className={styles.submitRow}>
            <button type="submit" disabled={buttonDisabled}>
              <span>{buttonLabel}</span>
              <span aria-hidden>{status === "sending" ? "···" : "→"}</span>
            </button>
            <p className={styles.requiredNote}>
              <span aria-hidden>*</span> {copy.required}
            </p>
          </div>
        </fieldset>

        <ContactFormStatusMessage status={status} copy={copy} />

        <noscript>
          <p className={styles.noScriptFallback}>
            {copy.staticFallback}{" "}
            <a href={V2_CONTACT_DESTINATIONS.emailHref}>{copy.directEmail}</a>
          </p>
        </noscript>
      </form>
    </section>
  );
}

function ContactField({
  name,
  label,
  required,
  error,
  wide = false,
  children,
}: {
  name: FieldName;
  label: string;
  required: string;
  error?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <label className={styles.formField} data-wide={wide || undefined}>
      <span className={styles.fieldLabel}>
        <span>{label}</span>
        <span>
          <span aria-hidden>*</span>
          <span className={styles.srOnly}>{required}</span>
        </span>
      </span>
      {children}
      <span
        id={`v2-contact-${name}-error`}
        className={styles.fieldError}
        aria-hidden={!error}
      >
        {error ?? "\u00a0"}
      </span>
    </label>
  );
}

function ContactFormStatusMessage({
  status,
  copy,
}: {
  status: ContactFormStatus;
  copy: ContactFormCopy;
}) {
  const message = {
    ready: null,
    validation: copy.validationSummary,
    sending: copy.sending,
    success: copy.success,
    "rate-limit": copy.rateLimit,
    error: copy.error,
    offline: copy.offline,
    unavailable: copy.unavailable,
  }[status];
  const showEmailFallback = [
    "rate-limit",
    "error",
    "offline",
    "unavailable",
  ].includes(status);
  const role = contactStatusIsError(status) ? "alert" : "status";

  return (
    <div
      className={styles.statusSlot}
      data-status-visible={Boolean(message) || undefined}
    >
      {message ? (
        <div className={styles.statusMessage} role={role}>
          <span className={styles.statusLabel}>{copy.stateLabels[status]}</span>
          <p>
            {message}
            {showEmailFallback ? (
              <>
                {" "}
                <a href={V2_CONTACT_DESTINATIONS.emailHref}>
                  {copy.directEmail}
                </a>
              </>
            ) : null}
          </p>
        </div>
      ) : null}
    </div>
  );
}
