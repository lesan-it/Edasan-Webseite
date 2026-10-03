import type { Metadata } from "next";
import { company } from "@/app/company";
import ContactForm from "@/app/kontakt/contact-form";
import PageHero from "@/app/page-hero";

export const metadata: Metadata = { alternates: { canonical: "/kontakt/" }, title: "Kontakt", description: "Sprechen Sie mit Edasan über Ihre IT, Automatisierung oder Produktidee." };

export default function ContactPage() {
  return <main className="soft-page edasan-contact-page">
    <PageHero title="Was soll einfacher werden?" lead="Ein Thema im IT-Betrieb, ein anstehendes Projekt oder eine Software-Idee? Wir freuen uns auf Ihre Nachricht." />
    <section className="soft-shell soft-contact edasan-split">
    <div className="soft-contact-copy"><h2>Direkt erreichbar.</h2><dl><div><dt>Telefon</dt><dd><a href={company.phone.href}>{company.phone.display}</a></dd></div><div><dt>E-Mail</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div><div><dt>Standort</dt><dd>Gümligen · Region Bern</dd></div><div><dt>Adresse</dt><dd>Worbstrasse 198 · 3073 Gümligen</dd></div></dl></div>
    <div className="soft-contact-panel v16-contact-panel">
      <ContactForm />
    </div>
  </section></main>;
}
