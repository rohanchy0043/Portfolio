"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useState,
} from "react";
import { ArrowUpRight, Send } from "lucide-react";
import {
  type ContactErrors,
  type ContactField,
  type ContactValues,
  validateContact,
} from "@/lib/validation";
import { siteConfig } from "@/lib/site-config";

const initialValues: ContactValues = {
  name: "",
  email: "",
  reason: "",
  message: "",
};

type FormStatus = "idle" | "opening" | "draft" | "error";

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const field = event.target.name as ContactField;
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const updated = { ...current };
      delete updated[field];
      return updated;
    });
    if (status === "error") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);

    const firstInvalidField = Object.keys(nextErrors)[0];
    if (firstInvalidField) {
      setStatus("error");
      setStatusMessage("Please review the highlighted fields.");
      event.currentTarget
        .querySelector<HTMLElement>('[name="' + firstInvalidField + '"]')
        ?.focus();
      return;
    }

    if (!siteConfig.email.trim()) {
      setStatus("error");
      setStatusMessage(
        "This form is not set up for email yet, so your message was not sent. Please use LinkedIn to get in touch.",
      );
      return;
    }

    const subject = "Portfolio enquiry: " + values.reason;
    const body = [
      "Hi " + siteConfig.name + ",",
      "",
      values.message.trim(),
      "",
      "From: " + values.name.trim(),
      "Reply to: " + values.email.trim(),
      "Reason: " + values.reason,
    ].join("\n");
    const mailto =
      "mailto:" +
      encodeURIComponent(siteConfig.email.trim()) +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);

    setStatus("opening");
    setStatusMessage("Preparing an email draft…");
    window.setTimeout(() => {
      window.location.href = mailto;
      setStatus("draft");
      setStatusMessage(
        "Your email app should open with a draft. Send it there to deliver your message; this site has not sent it.",
      );
    }, 180);
  }

  function errorFor(field: ContactField, id: string) {
    return errors[field] ? (
      <span className="field-error" id={id}>
        {errors[field]}
      </span>
    ) : null;
  }

  return (
    <form className="contact-form" id="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="form-kicker">Send a note</p>
          <h3>Tell me a little about it.</h3>
        </div>
        <span className="form-mark" aria-hidden="true">✳</span>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="contact-name">Name</label>
          <input
            autoComplete="name"
            id="contact-name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            minLength={2}
            maxLength={80}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errorFor("name", "contact-name-error")}
        </div>
        <div className="field">
          <label htmlFor="contact-email">Email</label>
          <input
            autoComplete="email"
            id="contact-email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errorFor("email", "contact-email-error")}
        </div>
      </div>

      <div className="field">
        <label htmlFor="contact-reason">Project type or reason</label>
        <select
          id="contact-reason"
          name="reason"
          value={values.reason}
          onChange={handleChange}
          aria-invalid={Boolean(errors.reason)}
          aria-describedby={errors.reason ? "contact-reason-error" : undefined}
        >
          <option value="">Choose a topic</option>
          <option value="Web project">Web project</option>
          <option value="Internship opportunity">Internship opportunity</option>
          <option value="Collaboration">Collaboration</option>
          <option value="Other">Other</option>
        </select>
        {errorFor("reason", "contact-reason-error")}
      </div>

      <div className="field">
        <div className="label-with-count">
          <label htmlFor="contact-message">Message</label>
          <span>{values.message.length}/3000</span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          minLength={20}
          maxLength={3000}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : "message-hint"}
        />
        <span className="sr-only" id="message-hint">
          Please write between 20 and 3,000 characters.
        </span>
        {errorFor("message", "contact-message-error")}
      </div>

      {!siteConfig.email ? (
        <p className="form-setup-note">
          Email handoff is not available yet. You can reach me on LinkedIn instead.
        </p>
      ) : null}

      <button className="button button-primary form-submit" type="submit" disabled={status === "opening"}>
        {status === "opening" ? "Preparing draft…" : "Prepare email"}
        {status === "opening" ? null : <Send size={15} aria-hidden="true" />}
      </button>
      <p
        className={
          "form-status" +
          (status === "error" ? " form-status-error" : "") +
          (status === "draft" ? " form-status-success" : "")
        }
        role="status"
        aria-live="polite"
      >
        {statusMessage}
      </p>
      <a className="form-privacy-link" href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer">
        Or connect on LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </form>
  );
}
