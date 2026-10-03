import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../page-hero";

export const metadata: Metadata = { alternates: { canonical: "/software/" }, title: "Software & Portale", description: "Individuelle Portale, Web-Applikationen und Eigenentwicklungen von Edasan." };

const paths = [
  ["Individuelle Software", "Portale und Web-Apps für Kunden, Mitarbeitende oder interne Prozesse – passend zu Ihren vorhandenen Systemen.", "/software/portale-web-apps", "Portale & Web-Apps ansehen"],
  ["Eigenentwicklungen", "Eigene Produkte aus konkreten Anforderungen. Wir zeigen offen, was sich bereits in Entwicklung befindet.", "/software/eigenentwicklungen", "Eigenentwicklungen ansehen"],
];

export default function SoftwarePage() {
  return <main className="soft-page v15-hub v15-software">
    <PageHero title="Software für die Arbeit, die wirklich anfällt." lead="Informationen liegen in Mails, Listen und mehreren Systemen? Wir entwickeln Anwendungen, die Abläufe zusammenführen – und bauen eigene Produkte für wiederkehrende Aufgaben." />
    <section className="soft-shell v15-hub-section">
      <header className="v15-section-heading"><h2>Software, die zu Ihnen passt.</h2></header>
      <div className="edasan-offer-list">
        {paths.map(([title, text, href, label]) => <article className="edasan-split" key={href}>
          <h3>{title}</h3>
          <div className="edasan-offer-copy"><p>{text}</p><Link href={href}>{label}</Link></div>
        </article>)}
      </div>
    </section>
    <section className="soft-shell v18-example v18-software-example edasan-split">
      <h2>Eine Anfrage. Ein klarer Ablauf.</h2>
      <p>Statt Informationen aus E-Mails in mehrere Listen zu übertragen, kann eine passende Anwendung Eingaben, Bearbeitungsstand und nächste Schritte an einem Ort bündeln.</p>
    </section>
    <section className="soft-shell v15-related edasan-split">
      <h2>Abläufe verbinden und vereinfachen.</h2>
      <div className="edasan-offer-copy"><p>Automatisierung und KI können wiederkehrende Schritte ergänzen, wenn sie Ihrem Team tatsächlich Arbeit abnehmen.</p><Link href="/ki-automatisierung">KI &amp; Automatisierung ansehen</Link></div>
    </section>
    <section className="soft-shell soft-page-cta v15-page-cta"><div><h2>Welchen Prozess möchten Sie verbessern?</h2></div><Link className="soft-btn soft-btn-light" href="/kontakt">Vorhaben besprechen</Link></section>
  </main>;
}
