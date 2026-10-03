import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../page-hero";

export const metadata: Metadata = { alternates: { canonical: "/projekte/automotive-platform/" },
  title: "Automotive Commerce Platform",
  description: "Edasan entwickelt eine verbundene Plattform für Fahrzeugportal, Dealer Operations und Sales.",
};

const modules = [
  ["Fahrzeugportal", "Fahrzeuge hochwertig präsentieren, filtern und gezielt anfragen."],
  ["Dealer OS", "Fahrzeugakten, Aufgaben, Status und Dokumente zentral führen."],
  ["Finanzen", "Kosten, Kalkulationen und Margen nachvollziehbar strukturieren."],
  ["Sales", "Kundenanfragen, Optionen und Offerten in einem Prozess verbinden."],
  ["Workflows", "Beschaffung, Aufbereitung und Zulassung kontrolliert begleiten."],
  ["KI-Unterstützung", "Dokumente prüfen und wiederkehrende Inhalte vorbereiten."],
];

export default function AutomotivePlatformPage() {
  return <main className="soft-page automotive-project">
    <PageHero title="Automotive Commerce Platform" lead="Eine verbundene Plattform für Fahrzeugpräsentation, Verkaufsprozesse und den internen Betrieb. Die Eigenentwicklung befindet sich aktuell im Aufbau." parent={{ href: "/software/eigenentwicklungen", label: "Eigenentwicklungen" }} />
    <section className="soft-shell automotive-preview">
      <div className="automotive-product-ui" role="img" aria-label="Konzeptansicht der Automotive Commerce Platform"><header><span>Automotive Platform</span></header><div><aside><strong>e.</strong><span className="active">Dashboard</span><span>Fahrzeuge</span><span>Finanzen</span><span>Prozesse</span><span>Sales</span><span>Dokumente</span></aside><div className="automotive-ui-main"><div className="automotive-ui-top"><div><h3>Operative Übersicht</h3></div><button>Neue Fahrzeugakte</button></div><section className="automotive-ui-summary"><article><span>Bestand</span><i /><i /></article><article><span>Aufbereitung</span><i /><i /></article><article><span>Sales</span><i /><i /></article><article><span>Dokumente</span><i /><i /></article></section><section className="automotive-ui-work"><div><header><strong>Fahrzeugakten</strong><span>Status</span></header>{["01","02","03","04"].map((number,index)=><article key={number}><span><i />Fahrzeug {number}</span><b>{["In Prüfung","Bereit","Im Verkauf","Reserviert"][index]}</b></article>)}</div><aside><small>Nächste Schritte</small><span>Dokumente prüfen</span><span>Fahrzeug publizieren</span><span>Offerte vorbereiten</span></aside></section></div></div></div>
    </section>

    <section className="soft-shell soft-section project-context edasan-card-grid"><article><h2>Viele Einzelschritte. Zu wenig gemeinsamer Überblick.</h2><p>Fahrzeugdaten, Dokumente, Kosten, Aufgaben, Verkaufsunterlagen und öffentliche Inserate liegen häufig in verschiedenen Werkzeugen. Informationen werden mehrfach gepflegt und Status sind schwer nachvollziehbar.</p></article><article><h2>Eine Plattform für den gesamten Fahrzeug-Lifecycle.</h2><p>Das öffentliche Erlebnis und die internen Abläufe greifen auf eine gemeinsame strukturierte Grundlage zu. Rollen sehen genau die Informationen und nächsten Schritte, die sie benötigen.</p></article></section>

    <section className="project-modules"><div className="soft-shell"><div className="soft-section-head compact edasan-split"><div><h2>Commerce, Operations und Intelligence verbunden.</h2></div><p>Die Module werden schrittweise entwickelt und bleiben unabhängig erweiterbar.</p></div><div className="software-capability-grid edasan-card-grid">{modules.map(([title,text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="project-architecture"><div className="soft-shell edasan-split"><div><h2>Eine Datenbasis. Mehrere Erlebnisse.</h2></div><div className="project-architecture-map"><article><strong>Fahrzeugportal</strong></article><i /><article className="core"><strong>Rollen · Daten · Workflows</strong></article><i /><article><strong>Dealer OS</strong></article></div></div></section>

    <section className="soft-shell soft-section project-progress edasan-split"><div><h2>Ein Produkt im Aufbau.</h2><p>Die Plattform wird aktuell als Edasan-Eigenentwicklung aufgebaut. Gezeigt werden Konzeptansichten und definierte Produktmodule – keine erfundenen Kundenresultate.</p></div><ol><li className="done"><strong>Produktkonzept</strong><small>Struktur und Zielbild</small></li><li className="active"><strong>MVP</strong><small>Kernprozesse und Oberfläche</small></li><li><strong>Pilotbetrieb</strong><small>Nutzung und Rückmeldungen</small></li><li><strong>Produktisierung</strong><small>Skalierung als Branchenlösung</small></li></ol></section>

    <section className="soft-shell soft-page-cta"><div><h2>Sie möchten Prozesse und Kunden in einer Lösung verbinden?</h2></div><Link className="soft-btn soft-btn-light" href="/kontakt">Plattform-Idee besprechen <span>↗</span></Link></section>
  </main>;
}
