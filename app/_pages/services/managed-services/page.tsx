import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/page-hero";
import { OfferCards } from "@/app/content-sections";

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

    <section className="soft-shell soft-section soft-managed-intro edasan-split"><div><h2>Guter Betrieb beginnt, bevor ein Ticket entsteht.</h2></div><p>Standards, Monitoring und direkte Ansprechpartner schaffen Verlässlichkeit. So bleibt Ihre IT sicher und Ihr Team gewinnt Zeit für das Wesentliche.</p></section>

    <section className="soft-managed-modules"><div className="soft-shell">
      <div className="soft-section-head compact edasan-split"><div><h2>Wir kümmern uns darum.</h2></div><p>Wählen Sie einzelne Bausteine oder einen durchgängigen Service. Wir richten die Zusammenarbeit an Ihrer Organisation aus.</p></div>
      <OfferCards offers={modules.map(([title, text]) => ({ title, text }))} />
    </div></section>

    <section className="soft-shell soft-section edasan-service-levels"><header className="v15-section-heading"><h2>Passend zu Ihrem Alltag.</h2></header><OfferCards columns={3} offers={[
      { title: "Essential", text: "Eine klare Basis für kleine und fokussierte Teams." },
      { title: "Business", text: "Proaktiver Betrieb mit regelmässiger Weiterentwicklung." },
      { title: "Custom", text: "Individuell für anspruchsvolle Systeme und Anforderungen." },
    ]} /></section>

    <section className="soft-shell soft-page-cta"><div><h2>Weniger Reaktion. Mehr Verlässlichkeit.</h2></div><Link className="soft-btn soft-btn-light" href="/kontakt">Betrieb besprechen <span>↗</span></Link></section>
  </main>;
}
