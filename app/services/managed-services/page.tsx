import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../page-hero";

export const metadata: Metadata = { alternates: { canonical: "/services/managed-services/" }, title: "Managed IT Services", description: "Planbarer IT-Betrieb und persönlicher Support für Schweizer Unternehmen." };

const modules = [
  ["Service Desk", "Ein erreichbarer Kontaktpunkt für Ihre Mitarbeitenden – verständlich, verbindlich und persönlich."],
  ["Managed Workplace", "Geräte und Identitäten werden vom Eintritt bis zum Austritt sicher verwaltet."],
  ["Cloud Operations", "Microsoft- und Infrastruktur-Services werden proaktiv überwacht und gepflegt."],
  ["Managed Security", "Kontinuierlicher Basisschutz, abgestimmt auf Ihre Risiken und Systeme."],
];

export default function ManagedPage() {
  return <main className="soft-page">
    <PageHero title="Mehr Ruhe im IT-Alltag." lead="Wir erkennen Probleme früh, halten Systeme aktuell und sind da, wenn Ihr Team Unterstützung braucht." parent={{ href: "/services", label: "IT Services" }} />

    <section className="soft-shell soft-section soft-managed-intro"><div><h2>Guter Betrieb beginnt, bevor ein Ticket entsteht.</h2></div><p>Standards, Monitoring und direkte Ansprechpartner schaffen Verlässlichkeit. So bleibt Ihre IT sicher und Ihr Team gewinnt Zeit für das Wesentliche.</p></section>

    <section className="soft-managed-modules"><div className="soft-shell">
      <div className="soft-section-head compact"><div><h2>Wir kümmern uns darum.</h2></div><p>Wählen Sie einzelne Bausteine oder einen durchgängigen Service. Wir richten die Zusammenarbeit an Ihrer Organisation aus.</p></div>
      <div className="soft-module-grid">{modules.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div></section>

    <section className="soft-shell soft-section soft-service-levels"><header><h2>Passend zu Ihrem Alltag.</h2></header><div><article><h3>Essential</h3><p>Eine klare Basis für kleine und fokussierte Teams.</p></article><article><h3>Business</h3><p>Proaktiver Betrieb mit regelmässiger Weiterentwicklung.</p></article><article><h3>Custom</h3><p>Individuell für anspruchsvolle Systeme und Anforderungen.</p></article></div></section>

    <section className="soft-shell soft-page-cta"><div><h2>Weniger Reaktion. Mehr Verlässlichkeit.</h2></div><Link className="soft-btn soft-btn-light" href="/kontakt">Betrieb besprechen <span>↗</span></Link></section>
  </main>;
}
