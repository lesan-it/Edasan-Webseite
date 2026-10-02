import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../page-hero";

export const metadata: Metadata = { alternates: { canonical: "/einstieg/" },
  title: "Einstiegsangebote",
  description: "Konkrete Einstiege für IT-Standortbestimmung, Microsoft-365-Sicherheit, Automation und Portalentwicklung.",
};

const offers = [
  {
    title: "IT-Standortbestimmung",
    text: "Für Unternehmen, die Risiken, Abhängigkeiten und die nächsten sinnvollen Investitionen klar einordnen möchten.",
    scope: ["Bestand und Risiken", "Zielbild und Prioritäten", "Roadmap mit Verantwortlichkeiten"],
    result: "Eine verständliche Entscheidungsgrundlage für die nächsten 6–18 Monate.",
  },
  {
    title: "Microsoft-365-Sicherheitscheck",
    text: "Für KMU, die Identitäten, Zugriffe, Endgeräte und Schutzmassnahmen pragmatisch überprüfen wollen.",
    scope: ["Identitäten und MFA", "Conditional Access und Geräte", "Priorisierte Schutzmassnahmen"],
    result: "Ein fokussierter Massnahmenplan nach Risiko und Dringlichkeit.",
  },
  {
    title: "Automations-Workshop",
    text: "Für Teams mit manuellen Übergaben, wiederkehrenden Aufgaben oder Prozessen über mehrere Werkzeuge hinweg.",
    scope: ["Prozess und Medienbrüche", "Nutzen und Machbarkeit", "Pilotfall und nächste Schritte"],
    result: "Ein priorisierter Automationsfall mit realistischem Umsetzungsweg.",
  },
  {
    title: "Portal Discovery Sprint",
    text: "Für Unternehmen, die eine Portal- oder Produktidee vor der Entwicklung fachlich und technisch schärfen möchten.",
    scope: ["Nutzer und Kernabläufe", "MVP-Umfang und Rollen", "Architektur und Etappen"],
    result: "Ein belastbares Zielbild für Prototyp, Offerte und Umsetzung.",
  },
];

export default function EntryOffersPage() {
  return <main className="soft-page entry-page">
    <PageHero title="Klein starten. Klar entscheiden. Kontrolliert weitergehen." lead="Ein erstes Gespräch soll nicht in einer offenen Wunschliste enden. Unsere Einstiegsangebote schaffen eine greifbare Ausgangslage und einen sinnvollen nächsten Schritt." />

    <section className="soft-shell soft-section entry-offers"><div>{offers.map((offer) => <article key={offer.title}>
      <h2>{offer.title}</h2><p>{offer.text}</p><ul>{offer.scope.map((item) => <li key={item}>{item}</li>)}</ul><div><strong>{offer.result}</strong></div><Link href="/kontakt">Diesen Einstieg besprechen <b>↗</b></Link>
    </article>)}</div></section>

    <section className="entry-followup"><div className="soft-shell"><div><h2>Sie entscheiden mit einer klaren Grundlage.</h2></div><p>Nach dem Einstieg können Sie die Umsetzung mit Edasan weiterführen, intern übernehmen oder gezielt ausschreiben. Die erarbeiteten Resultate bleiben Ihre Entscheidungsbasis.</p></div></section>

    <section className="soft-shell soft-page-cta"><div><h2>Welches Thema möchten Sie zuerst klären?</h2></div><Link className="soft-btn soft-btn-light" href="/kontakt">Situation beschreiben <span>↗</span></Link></section>
  </main>;
}
