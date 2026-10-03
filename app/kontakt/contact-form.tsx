"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { company } from "../company";
import { localeHref, type Locale } from "../i18n/routing";
import { ui, type ContactLabels } from "../i18n/ui";

type SendMode = "email-app" | "direct";

export default function ContactForm({ locale = "de", labels = ui.de.contact }: { locale?: Locale; labels?: ContactLabels }) {
  const [mode, setMode] = useState<SendMode>("email-app");
  const [state, setState] = useState<"idle" | "working" | "prepared" | "sent" | "error">("idle");

  const confirmationRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const focusNewMessage = useRef(false);

  useEffect(() => {
    if (state === "sent") {
      const confirmation = confirmationRef.current;
      confirmation?.focus({ preventScroll: true });
      if (confirmation) {
        const bounds = confirmation.getBoundingClientRect();
        if (bounds.top < 100 || bounds.bottom > window.innerHeight) {
          confirmation.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        }
      }
    } else if (state === "idle" && focusNewMessage.current) {
      focusNewMessage.current = false;
      nameRef.current?.focus();
    }
  }, [state]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/contact.php", { signal: controller.signal, cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((result) => { if (result?.directSend === true) setMode("direct"); })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "working") return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const data = {
      name: String(fields.get("name") || "").trim(),
      email: String(fields.get("email") || "").trim(),
      business: String(fields.get("business") || "").trim(),
      message: String(fields.get("message") || "").trim(),
      website: String(fields.get("website") || ""),
    };
    if (!data.name || !data.email || !data.message) return;

    if (mode === "email-app") {
      const subject = encodeURIComponent(labels.subject);
      const body = encodeURIComponent(`${labels.name}: ${data.name}\n${labels.email}: ${data.email}\n${labels.company}: ${data.business || "–"}\n\n${labels.message}:\n${data.message}`);
      window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
      setState("prepared");
      return;
    }

    setState("working");
    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok || result?.ok !== true) throw new Error("delivery-failed");
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") return <div className="edasan-contact-success">
    <div ref={confirmationRef} className="edasan-contact-confirmation" role="status" aria-atomic="true" tabIndex={-1} aria-labelledby="contact-success-title" aria-describedby="contact-success-message">
      <span className="edasan-contact-success-icon" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
      <h2 id="contact-success-title">{labels.successTitle}</h2>
      <p id="contact-success-message">{labels.sent}</p>
    </div>
    <button className="soft-btn edasan-contact-reset" type="button" onClick={() => { focusNewMessage.current = true; setState("idle"); }}>{labels.sendAnother}</button>
  </div>;

  return <div className="edasan-contact-content">
    <h2>{labels.introTitle}</h2><p>{labels.introBody}</p>
    <form className="edasan-contact-form" onSubmit={handleSubmit}>
    <div className="edasan-contact-fields">
      <label htmlFor="contact-name">{labels.name}<input ref={nameRef} id="contact-name" name="name" type="text" autoComplete="name" maxLength={100} required /></label>
      <label htmlFor="contact-email">{labels.email}<input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required /></label>
    </div>
    <label htmlFor="contact-business">{labels.company} <span>{labels.optional}</span><input id="contact-business" name="business" type="text" autoComplete="organization" maxLength={120} /></label>
    <label htmlFor="contact-message">{labels.message}<textarea id="contact-message" name="message" rows={5} maxLength={2000} required /></label>
    <div className="edasan-contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Website<input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
    <p className="edasan-contact-hint">{mode === "direct" ? labels.directHint : labels.emailHint} <Link href={localeHref(locale, "/datenschutz/")}>{labels.privacy}</Link></p>
    <button className="soft-btn soft-btn-dark" type="submit" disabled={state === "working"}>{state === "working" ? labels.sending : mode === "direct" ? labels.send : labels.prepare}</button>
    {state === "prepared" && <p className="edasan-contact-feedback" role="status">{labels.prepared} <a href={`mailto:${company.email}`}>{company.email}</a>.</p>}
    {state === "error" && <p className="edasan-contact-feedback error" role="alert">{labels.error} <a href={`mailto:${company.email}`}>{company.email}</a>.</p>}

  </form></div>;
}
