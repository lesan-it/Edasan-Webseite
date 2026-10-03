import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../page-hero";
import { OfferCards } from "../content-sections";

export const metadata: Metadata = { alternates: { canonical: "/unternehmen/" }, title: "Über Edasan", description: "Edasan – unabhängiges Technologieunternehmen aus der Region Bern." };

const values = [
  ["Direkter Kontakt", "Sie sprechen mit den Menschen, die Ihr Thema bearbeiten. Fragen und Entscheidungen landen nicht in langen Übergabeketten."],
  ["Klare Zuständigkeiten", "Wir klären, wer welche Aufgabe übernimmt und wie Ihr internes Team eingebunden bleibt."],
  ["Übergabe mitdenken", "Was wir verändern, soll im Alltag betreibbar bleiben. Dokumentation und nächste Schritte gehören dazu."],
];

const competence = [
  ["Workplace & Endpoint", "Windows · Microsoft 365 · Intune · MECM · Citrix"],
  ["Cloud & Infrastruktur", "Azure · Entra ID · Virtualisierung · Server · Backup"],
  ["Delivery & Governance", "SAFe RTE · HERMES 5.1 · PSPO II · Testmanagement"],
];

export default function CompanyPage() {
  return <main className="soft-page v18-company">
    <PageHero title="Technik ist unser Handwerk. Vertrauen unser Massstab." lead="IT betreuen, Veränderungen umsetzen und passende Software entwickeln: Wir arbeiten direkt mit Unternehmen und ihren Teams." />

    <section className="soft-shell soft-section soft-company-intro edasan-split"><div><h2>Technik muss im Alltag bestehen.</h2></div><div><p>Ob Sie keine eigene IT haben oder ein internes Team unterstützen möchten: Zuerst verstehen wir Ihre Umgebung und die Menschen, die damit arbeiten.</p><p>Dann klären wir, was sinnvoll ist, setzen es um und denken den späteren Betrieb mit.</p></div></section>

    <section className="company-profile soft-shell edasan-split">
      <div className="company-profile-name"><h2>Edasan GmbH</h2><p>IT Services · Beratung · Software</p></div>
      <div className="company-profile-copy edasan-offer-copy"><p>Edasan ist ein unabhängiges Technologieunternehmen aus der Region Bern. Wir unterstützen den IT-Betrieb, führen technische Vorhaben weiter und entwickeln Anwendungen, wenn vorhandene Werkzeuge nicht passen.</p><div className="soft-actions"><Link className="soft-btn soft-btn-dark" href="/kontakt">Zusammenarbeit besprechen</Link><Link className="soft-text-link" href="/services">Leistungen ansehen</Link></div></div>
    </section>

    <section className="soft-values"><div className="soft-shell"><OfferCards columns={3} offers={values.map(([title, text]) => ({ title, text }))} /></div></section>

    <section className="company-competence soft-shell soft-section"><header className="edasan-split"><div><h2>Erfahrung für Planung und Betrieb.</h2></div><p>Das Team bringt Erfahrung in Workplace- und Endpoint-Engineering, Infrastruktur sowie technischer Projektleitung mit. Diese Praxis hilft auch dann, wenn mehrere Systeme und Beteiligte zusammenspielen müssen.</p></header><OfferCards columns={3} offers={competence.map(([title, text]) => ({ title, text }))} /><aside><strong>Was das für Sie bedeutet</strong><p>Technische Fragen werden früh geklärt. Umsetzung und Übergabe werden zusammen gedacht, damit eine Lösung später betreut werden kann.</p></aside></section>


    <section className="soft-shell soft-page-cta"><div><h2>Erzählen Sie uns, was ansteht.</h2></div><Link className="soft-btn soft-btn-light" href="/kontakt">Gespräch vereinbaren</Link></section>
  </main>;
}
