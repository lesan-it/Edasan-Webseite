import type { Metadata } from "next";
import Link from "next/link";
import { OfferCards } from "@/app/content-sections";

export const metadata: Metadata = {
  title: { absolute: "Edasan GmbH – IT Services, Software & KI" },
  alternates: { canonical: "/" },
};

const areas = [
  {
    title: "IT Services",
    text: "Support, Arbeitsplätze und Cloud mit klaren Zuständigkeiten – als externer Partner oder Ergänzung für Ihr Team.",
    href: "/services",
    link: "IT Services entdecken",
  },
  {
    title: "Beratung & Projekte",
    text: "Technische Planung und Umsetzung für Migrationen, Rollouts und die saubere Übergabe in den Betrieb.",
    href: "/beratung",
    link: "Beratung entdecken",
  },
  {
    title: "Software & Portale",
    text: "Web-Apps und Portale, die Informationen bündeln und konkrete Arbeitsschritte einfacher machen.",
    href: "/software",
    link: "Software entdecken",
  },
];

export default function Home() {
  return <main className="soft-main home-v15">
    <section className="soft-hero soft-shell">
      <div className="soft-hero-image" /><div className="soft-hero-overlay" />
      <div className="soft-hero-content">

        <h1>Enterprise-Erfahrung.<br /><em>Persönlich für KMU.</em></h1>
        <p>Keine eigene IT? Oder ein Team, das Unterstützung braucht? Wir helfen im laufenden Betrieb, bei anspruchsvollen Vorhaben und mit Software, die zu Ihren Abläufen passt.</p>
        <div className="soft-actions">
          <Link className="soft-btn soft-btn-primary" href="/kontakt">Gespräch vereinbaren</Link>
          <Link className="soft-btn soft-btn-ghost" href="#leistungen">Leistungen ansehen</Link>
        </div>
      </div>
    </section>

    <section className="soft-shell v15-paths" id="leistungen">
      <div className="v15-section-heading">

        <h2>Wobei wir Sie unterstützen.</h2>
      </div>
      <OfferCards columns={3} offers={areas} />
    </section>

    <section className="v15-insight"><div className="soft-shell v15-insight-inner edasan-split">
      <div><h2>Erfahrung, die in der Umsetzung zählt.</h2></div>
      <div><p>Das Team hat schweizweite Workplace-Rollouts und komplexe Windows-Umgebungen mitgestaltet. Bei Edasan entstehen zudem eigene Softwareprodukte aus konkreten Anforderungen.</p>
        <div className="v15-insight-links"><Link href="/projekte">Projekte &amp; Erfahrung</Link><Link href="/software/eigenentwicklungen">Eigenentwicklungen</Link><Link href="/ki-automatisierung">KI &amp; Automatisierung</Link></div>
      </div>
    </div></section>

    <section className="soft-cta soft-shell v15-home-cta"><div><h2>Was soll in Ihrer IT besser funktionieren?</h2></div><Link className="soft-btn soft-btn-light" href="/kontakt">Ausgangslage besprechen</Link></section>
  </main>;
}
