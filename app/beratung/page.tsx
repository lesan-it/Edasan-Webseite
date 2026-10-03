import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../page-hero";

export const metadata: Metadata = { alternates: { canonical: "/beratung/" }, title: "Beratung & Projekte", description: "IT-Beratung, technische Projektleitung, Migration und Rollout für Schweizer Unternehmen." };

const offers = [
  ["IT-Beratung", "Technische Fragen einordnen, Optionen abwägen und die nächsten Schritte festlegen.", "/beratung/it-beratung"],
  ["IT-Projekte & Engineering", "Migrationen und Rollouts planen, technisch begleiten und in den Betrieb übergeben.", "/beratung/it-projekte"],
];

export default function ConsultingPage() {
  return <main className="soft-page v15-hub">
    <PageHero title="Veränderung braucht einen klaren Weg." lead="Ein Rollout steht an, eine Migration ist festgefahren oder für ein Vorhaben fehlt intern die Kapazität? Wir bringen technische Erfahrung ein und begleiten die Umsetzung bis zur Übergabe." />
    <section className="soft-shell v15-hub-section"><div className="v15-section-heading"><h2>Von der Frage zur Umsetzung.</h2></div><div className="v15-offer-grid two edasan-card-grid edasan-card-grid--links">{offers.map(([title, text, href]) => <article className="v15-offer" key={href}><h3>{title}</h3><p>{text}</p><Link href={href}>Mehr erfahren</Link></article>)}</div>
      <div className="v18-case-strip edasan-split"><strong>Typische Vorhaben</strong><ul><li>Workplace-Rollouts</li><li>Cloud- und Systemmigrationen</li><li>Tests und Betriebsübergabe</li></ul></div>
    </section>
    <section className="soft-shell v15-related"><div><h2>Praxis aus komplexen Umgebungen.</h2><p>Einblicke in Workplace, Client Engineering und technische Projektleitung – als Erfahrung des Teams, nicht als Edasan-Kundenreferenz.</p></div><Link href="/projekte">Projekte &amp; Erfahrung ansehen</Link></section>
    <section className="soft-shell soft-page-cta v15-page-cta"><div><h2>Was muss bei Ihrem Vorhaben gelingen?</h2></div><Link className="soft-btn soft-btn-light" href="/kontakt">Vorhaben besprechen</Link></section>
  </main>;
}
