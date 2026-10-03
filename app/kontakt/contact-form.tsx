"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { company } from "../company";
import { localeHref, type Locale } from "../i18n/routing";
import { ui, type ContactLabels } from "../i18n/ui";

type SendMode = "email-app" | "direct";

export default function ContactForm({ locale = "de", labels = ui.de.contact }: { locale?: Locale; labels?: ContactLabels }) {
  const [mode, setMode] = useState<SendMode>("email-app");
  const [state, setState] = useState<"idle" | "working" | "prepared" | "sent" | "error">("idle");

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
      if (!response.ok) throw new Error("delivery-failed");
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return <form className="edasan-contact-form" onSubmit={handleSubmit}>
    <div className="edasan-contact-fields">
      <label htmlFor="contact-name">{labels.name}<input id="contact-name" name="name" type="text" autoComplete="name" maxLength={100} required /></label>
      <label htmlFor="contact-email">{labels.email}<input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required /></label>
    </div>
    <label htmlFor="contact-business">{labels.company} <span>{labels.optional}</span><input id="contact-business" name="business" type="text" autoComplete="organization" maxLength={120} /></label>
    <label htmlFor="contact-message">{labels.message}<textarea id="contact-message" name="message" rows={5} maxLength={2000} required /></label>
    <div className="edasan-contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Website<input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
    <p className="edasan-contact-hint">{mode === "direct" ? labels.directHint : labels.emailHint} <Link href={localeHref(locale, "/datenschutz/")}>{labels.privacy}</Link></p>
    <button className="soft-btn soft-btn-dark" type="submit" disabled={state === "working"}>{state === "working" ? labels.sending : mode === "direct" ? labels.send : labels.prepare}</button>
    {state === "prepared" && <p className="edasan-contact-feedback" role="status">{labels.prepared} <a href={`mailto:${company.email}`}>{company.email}</a>.</p>}
    {state === "sent" && <p className="edasan-contact-feedback" role="status">{labels.sent}</p>}
    {state === "error" && <p className="edasan-contact-feedback error" role="alert">{labels.error} <a href={`mailto:${company.email}`}>{company.email}</a>.</p>}

  </form>;
}
