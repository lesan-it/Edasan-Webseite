"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { company } from "../company";

type SendMode = "email-app" | "direct";

export default function ContactForm() {
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
      const subject = encodeURIComponent("Anfrage über die Edasan Website");
      const body = encodeURIComponent(`Name: ${data.name}\nE-Mail: ${data.email}\nUnternehmen: ${data.business || "–"}\n\nAnliegen:\n${data.message}`);
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
      <label htmlFor="contact-name">Name<input id="contact-name" name="name" type="text" autoComplete="name" maxLength={100} required /></label>
      <label htmlFor="contact-email">E-Mail-Adresse<input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required /></label>
    </div>
    <label htmlFor="contact-business">Unternehmen <span>(optional)</span><input id="contact-business" name="business" type="text" autoComplete="organization" maxLength={120} /></label>
    <label htmlFor="contact-message">Ihr Anliegen<textarea id="contact-message" name="message" rows={5} maxLength={2000} required /></label>
    <div className="edasan-contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Website<input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
    <p className="edasan-contact-hint">{mode === "direct" ? <>Ihre Angaben werden zur Bearbeitung der Anfrage an uns übermittelt. <Link href="/datenschutz">Datenschutz</Link></> : <>Das Formular öffnet Ihr E-Mail-Programm mit einer vorbereiteten Nachricht. Bitte senden Sie diese dort ab. <Link href="/datenschutz">Datenschutz</Link></>}</p>
    <button className="soft-btn soft-btn-dark" type="submit" disabled={state === "working"}>{state === "working" ? "Wird gesendet …" : mode === "direct" ? "Anfrage senden" : "E-Mail vorbereiten"}</button>
    {state === "prepared" && <p className="edasan-contact-feedback" role="status">Bitte senden Sie die vorbereitete Nachricht in Ihrem E-Mail-Programm ab. Falls es sich nicht geöffnet hat, schreiben Sie direkt an <a href={`mailto:${company.email}`}>{company.email}</a>.</p>}
    {state === "sent" && <p className="edasan-contact-feedback" role="status">Danke, Ihre Anfrage wurde übermittelt. Wir melden uns bei Ihnen.</p>}
    {state === "error" && <p className="edasan-contact-feedback error" role="alert">Die Übermittlung konnte nicht bestätigt werden. Bitte schreiben Sie direkt an <a href={`mailto:${company.email}`}>{company.email}</a>.</p>}
  </form>;
}
