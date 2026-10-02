import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../page-hero";

export const metadata: Metadata = { alternates: { canonical: "/software/" }, title: "Software & Portale", description: "Individuelle Portale, Web-Applikationen und Eigenentwicklungen von Edasan." };

const paths = [
  ["Individuelle Software", "Portale und Web-Apps für Kunden, Mitarbeitende oder interne Prozesse – passend zu Ihren vorhandenen Systemen.", "/software/portale-web-apps", "Portale & Web-Apps ansehen"],
  ["Eigenentwicklungen", "Eigene Produkte aus konkreten Anforderungen. Wir zeigen offen, was sich bereits in Entwicklung befindet.", "/software/eigenentwicklungen", "Eigenentwicklungen ansehen"],
];

export default function SoftwarePage() {
  return <main className="soft-page v15-hub">
    <PageHero title="Software für die Arbeit, die wirklich anfällt." lead="Informationen liegen in Mails, Listen und mehreren Systemen? Wir entwickeln Anwendungen, die Abläufe zusammenführen – und bauen eigene Produkte für wiederkehrende Aufgaben." />
    <section className="soft-shell v15-hub-section"><div className="v15-section-heading"><h2>Für Ihr Unternehmen. Oder als eigenes Produkt.</h2></div><div className="v15-offer-grid two">{paths.map(([title, text, href, label]) => <article className="v15-offer" key={href}><h3>{title}</h3><p>{text}</p><Link href={href}>{label}</Link></article>)}</div>
      <div className="v18-example"><div><h3>Eine Anfrage. Ein klarer Ablauf.</h3></div><p>Statt Informationen aus E-Mails in mehrere Listen zu übertragen, kann eine passende Anwendung Eingaben, Bearbeitungsstand und nächste Schritte an einem Ort bündeln.</p></div>
    </section>
    <section className="soft-shell v15-related"><div><h2>Abläufe verbinden und vereinfachen.</h2><p>Automatisierung und KI können wiederkehrende Schritte ergänzen, wenn sie Ihrem Team tatsächlich Arbeit abnehmen.</p></div><Link href="/ki-automatisierung">KI &amp; Automatisierung ansehen</Link></section>
    <section className="soft-shell soft-page-cta v15-page-cta"><div><h2>Welchen Prozess möchten Sie verbessern?</h2></div><Link className="soft-btn soft-btn-light" href="/kontakt">Vorhaben besprechen</Link></section>
  </main>;
}
