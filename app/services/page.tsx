import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../page-hero";

export const metadata: Metadata = { alternates: { canonical: "/services/" }, title: "IT Services", description: "Managed IT, Modern Workplace, Cloud und Cyber Security für Schweizer Unternehmen." };

const services = [
  ["Managed IT", "Anfragen klären, Systeme im Blick behalten und den laufenden Betrieb betreuen.", "/services/managed-services"],
  ["Modern Workplace", "Arbeitsplätze mit Microsoft 365 und Intune einrichten, verwalten und weiterentwickeln.", "/services/modern-workplace"],
  ["Cloud & Infrastruktur", "Server, Cloud und Backup passend zu Ihrer Umgebung betreiben und verändern.", "/services/cloud-infrastruktur"],
  ["Cyber Security", "Zugänge, Geräte und Daten mit sinnvollen technischen Massnahmen absichern.", "/services/cyber-security"],
];

export default function ServicesPage() {
  return <main className="soft-page v15-hub">
    <PageHero title="Eine IT, auf die Sie sich verlassen können." lead="Ob Sie Ihre IT extern betreuen lassen oder Ihr internes Team entlasten möchten: Wir kümmern uns um Arbeitsplätze, Infrastruktur und Support – mit klaren Zuständigkeiten." />
    <section className="soft-shell v15-hub-section"><div className="v15-section-heading"><h2>Was wir betreuen.</h2></div><div className="v15-offer-grid edasan-card-grid edasan-card-grid--links">{services.map(([title, text, href]) => <article className="v15-offer" key={href}><h3>{title}</h3><p>{text}</p><Link href={href}>Mehr erfahren</Link></article>)}</div>
      <div className="v18-entry-note edasan-split"><strong>So starten wir</strong><p>Wir schauen auf Ihre Umgebung, offene Themen und Zuständigkeiten. Danach klären wir gemeinsam, welche Aufgaben Edasan übernimmt und wo Ihr Team eingebunden bleibt.</p></div>
    </section>
    <section className="soft-shell v15-related"><div><h2>Ein Projekt braucht mehr als Betrieb.</h2><p>Für Migrationen, Rollouts und technische Projektleitung gibt es einen eigenen Bereich.</p></div><Link href="/beratung">Beratung &amp; Projekte ansehen</Link></section>
    <section className="soft-shell soft-page-cta v15-page-cta"><div><h2>Wo braucht Ihre IT Entlastung?</h2></div><Link className="soft-btn soft-btn-light" href="/kontakt">Bedarf besprechen</Link></section>
  </main>;
}
