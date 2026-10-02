import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../page-hero";

export const metadata: Metadata = { alternates: { canonical: "/ki-automatisierung/" },
  title: "KI & Automatisierung",
  description: "Firmenspezifische KI und Automatisierung für Unternehmenswissen, Dokumente und Abläufe.",
};

const benefits = [
  ["Wissen schneller finden", "Freigegebene Informationen aus Dokumenten und bestehenden Systemen im Arbeitsalltag nutzbar machen."],
  ["Routinearbeit reduzieren", "Wiederkehrende Aufgaben und Dokumentenprozesse gezielt vereinfachen."],
  ["Daten unter Kontrolle behalten", "Zugriffe und externe Verbindungen passend zu Ihren Anforderungen gestalten."],
];

export default function IntelligencePage() {
  return <main className="soft-page v16-ai">
    <PageHero title="KI, die mit Ihrem Wissen arbeitet." lead="Wichtige Antworten stecken oft in Dokumenten oder einzelnen Systemen. Wir entwickeln firmenspezifische Lösungen, die freigegebenes Wissen nutzbar machen und wiederkehrende Arbeit erleichtern." />

    <section className="soft-shell v16-ai-benefits"><header>

      <h2>Praktischer Nutzen für Ihr Team.</h2>
    </header><div className="v16-ai-benefit-list">
      {benefits.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}
    </div></section>

    <section className="soft-shell v18-example v18-ai-example"><div><h2>Antworten aus internem Wissen.</h2></div><p>Eine Frage zu einer internen Anleitung: Statt Ordner zu durchsuchen, kann eine passende Lösung relevante Stellen in freigegebenen Dokumenten mit Quellenhinweis zeigen. Welche Informationen sie nutzt, wird vorher festgelegt.</p></section>

    <section className="v16-ai-approach"><div className="soft-shell v16-ai-approach-inner">
      <div><h2>Lokal oder kontrolliert verbunden.</h2></div>
      <p>Je nach Anforderung kann eine Lösung in Ihrer eigenen Umgebung arbeiten oder ausgewählte externe Quellen einbeziehen. Gemeinsam legen wir fest, welche Daten und Systeme zugänglich sind und wo Freigaben nötig bleiben.</p>
    </div></section>

    <section className="soft-shell soft-page-cta v15-page-cta"><div><h2>Wo könnte KI Ihr Team sinnvoll unterstützen?</h2></div><Link className="soft-btn soft-btn-light" href="/kontakt">Idee besprechen</Link></section>
  </main>;
}
