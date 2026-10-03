import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../page-hero";
import { OfferCards } from "../content-sections";

export const metadata: Metadata = { alternates: { canonical: "/beratung/" }, title: "Beratung & Projekte", description: "IT-Beratung, technische Projektleitung, Migration und Rollout für Schweizer Unternehmen." };

const offers = [
  ["IT-Beratung", "Technische Fragen einordnen, Optionen abwägen und die nächsten Schritte festlegen.", "/beratung/it-beratung", "IT-Beratung ansehen"],
  ["IT-Projekte & Engineering", "Migrationen und Rollouts planen, technisch begleiten und in den Betrieb übergeben.", "/beratung/it-projekte", "IT-Projekte ansehen"],
];

export default function ConsultingPage() {
  return <main className="soft-page v15-hub v15-consulting">
    <PageHero title="Veränderung braucht einen klaren Weg." lead="Ein Rollout steht an, eine Migration ist festgefahren oder für ein Vorhaben fehlt intern die Kapazität? Wir bringen technische Erfahrung ein und begleiten die Umsetzung bis zur Übergabe." />
    <section className="soft-shell v15-hub-section">
      <header className="v15-section-heading"><h2>Von der Frage zur Umsetzung.</h2></header>
      <OfferCards offers={offers.map(([title, text, href, link]) => ({ title, text, href, link }))} />
    </section>
    <section className="soft-shell v18-example v18-consulting-example edasan-split">
      <h2>Typische Vorhaben.</h2>
      <ul className="edasan-project-types"><li>Workplace-Rollouts</li><li>Cloud- und Systemmigrationen</li><li>Tests und Betriebsübergabe</li></ul>
    </section>
    <section className="soft-shell v15-related edasan-split">
      <h2>Praxis aus komplexen Umgebungen.</h2>
      <div className="edasan-offer-copy"><p>Einblicke in Workplace, Client Engineering und technische Projektleitung – als Erfahrung des Teams, nicht als Edasan-Kundenreferenz.</p><Link href="/projekte">Projekte &amp; Erfahrung ansehen</Link></div>
    </section>
    <section className="soft-shell soft-page-cta v15-page-cta"><div><h2>Was muss bei Ihrem Vorhaben gelingen?</h2></div><Link className="soft-btn soft-btn-light" href="/kontakt">Vorhaben besprechen</Link></section>
  </main>;
}
