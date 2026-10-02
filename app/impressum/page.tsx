import type { Metadata } from "next";
import { company } from "../company";
import PageHero from "../page-hero";

export const metadata: Metadata = { alternates: { canonical: "/impressum/" }, title: "Impressum" };

export default function ImprintPage() {
  return <main className="legal-page edasan-legal-page">
    <PageHero title="Impressum" lead="Angaben zu Edasan GmbH und direkte Kontaktmöglichkeiten." />
    <div className="soft-shell edasan-legal-body"><div className="legal-card">
    <h2>Unternehmen</h2>
    <p><strong>{company.name}</strong><br />{company.address.map((line) => <span key={line}>{line}<br /></span>)}</p>
    <p>Unternehmens-Identifikationsnummer: {company.uid}<br />Handelsregister des Kantons Bern</p>
    <h2>Kontakt</h2>
    <p><a href={`mailto:${company.email}`}>{company.email}</a><br /><a href={company.phone.href}>{company.phone.display}</a></p>
  </div></div></main>;
}
