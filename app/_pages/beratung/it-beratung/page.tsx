import type { Metadata } from "next";
import ServiceDetail from "@/app/services/service-detail";

export const metadata: Metadata = { alternates: { canonical: "/beratung/it-beratung/" }, title: "IT-Beratung", description: "Pragmatische IT-Strategie, Roadmaps und Entscheidungsgrundlagen für Schweizer Unternehmen." };

export default function AdvisoryPage() {
  return <ServiceDetail data={{
    parentHref: "/beratung", parentLabel: "Beratung & Projekte",
    title: "Klare Entscheidungen für Ihre digitale Zukunft.",
    lead: "Wir übersetzen Ziele, Risiken und technische Möglichkeiten in eine verständliche Roadmap – unabhängig, realistisch und auf Ihr Unternehmen zugeschnitten.",
    promiseTitle: "Strategie, die im Alltag umsetzbar bleibt.",
    promiseText: "Sie erhalten keine abstrakte Zielarchitektur, sondern klare Prioritäten, Abhängigkeiten und nächste Schritte, die zu Budget, Ressourcen und Organisation passen.",
    modules: [
      { title: "Standortbestimmung", text: "Systeme, Prozesse, Risiken und Kosten in einem verständlichen Gesamtbild erfassen." },
      { title: "IT-Roadmap", text: "Massnahmen priorisieren und in realistische Etappen mit klaren Ergebnissen überführen." },
      { title: "Evaluation", text: "Technologien und Anbieter anhand nachvollziehbarer Kriterien vergleichen." },
      { title: "Governance", text: "Rollen, Standards und Entscheidungswege für einen verlässlichen IT-Betrieb definieren." },
    ],
    outcomes: ["Transparenz über Ausgangslage und Handlungsbedarf", "Investitionen mit klarer Priorität", "Weniger Abhängigkeit von Einzelentscheidungen", "Eine realistische und umsetzbare Entwicklungsroadmap"],
  }} />;
}
