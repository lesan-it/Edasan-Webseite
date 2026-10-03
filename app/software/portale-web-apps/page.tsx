import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../page-hero";

export const metadata: Metadata = { alternates: { canonical: "/software/portale-web-apps/" }, title: "Portale & Web-Applikationen", description: "Kundenportale, interne Systeme und individuelle Web-Applikationen für Schweizer Unternehmen." };

const uses = [
  ["Kundenportale", "Informationen, Dokumente und Anfragen an einem verständlichen Ort."],
  ["Interne Anwendungen", "Aufgaben, Daten und Freigaben passend zu den Abläufen Ihrer Teams."],
  ["Verbundene Prozesse", "Schnittstellen zu bestehenden Systemen statt doppelter Datenerfassung."],
];

export default function PortalsPage() {
  return <main className="soft-page v15-hub">
    <PageHero title="Portale, die Menschen und Prozesse verbinden." lead="Wir entwickeln Anwendungen für konkrete Aufgaben – von der ersten Struktur bis zur Integration in Ihre bestehende IT." parent={{ href: "/software", label: "Software & Portale" }} />
    <section className="soft-shell v15-hub-section"><div className="v15-section-heading"><h2>Passend zu Ihrer Arbeit.</h2></div><div className="v15-offer-grid three edasan-card-grid">{uses.map(([title, text]) => <article className="v15-offer v15-detail-module" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="soft-shell v15-detail-promise edasan-split"><h2>Klein starten. Sauber weiterbauen.</h2><p>Wir beginnen bei Nutzern und Abläufen. Rollen, Sicherheit, Schnittstellen und Betrieb werden von Anfang an mitgedacht – ohne eine unnötig grosse Feature-Liste.</p></section>
    <section className="soft-shell v15-related"><div><h2>Auch Produkte entstehen bei Edasan.</h2><p>Ein Blick auf unsere Software in Entwicklung.</p></div><Link href="/software/eigenentwicklungen">Eigenentwicklungen ansehen</Link></section>
    <section className="soft-shell soft-page-cta v15-page-cta"><div><h2>Welcher Ablauf soll einfacher werden?</h2></div><Link className="soft-btn soft-btn-light" href="/kontakt">Anforderungen besprechen</Link></section>
  </main>;
}
