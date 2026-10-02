import type { Metadata } from "next";
import ServiceDetail from "../../services/service-detail";

export const metadata: Metadata = { alternates: { canonical: "/beratung/it-projekte/" }, title: "IT-Projekte & Engineering", description: "Technische Projektleitung, Migrationen, Rollouts und Engineering für anspruchsvolle IT-Vorhaben." };

export default function ProjectsPage() {
  return <ServiceDetail data={{
    parentHref: "/beratung", parentLabel: "Beratung & Projekte",
    title: "Komplexe Vorhaben. Klar geführt.",
    lead: "Wir verbinden technisches Engineering mit strukturierter Projektarbeit – für Migrationen, Rollouts und Veränderungen, die kontrolliert ans Ziel kommen.",
    promiseTitle: "Gute Technik braucht einen realistischen Weg in den Betrieb.",
    promiseText: "Wir planen Abhängigkeiten, testen früh und halten Entscheidungen transparent. So bleiben Qualität, Termine und betriebliche Auswirkungen im Gleichgewicht.",
    modules: [
      { title: "Technical Lead", text: "Architektur, technische Entscheidungen und Umsetzung über Teams hinweg koordinieren." },
      { title: "Migration", text: "Arbeitsplätze, Identitäten und Plattformen kontrolliert auf den neuen Stand bringen." },
      { title: "Rollout", text: "Pilotierung, Wellenplanung, Kommunikation und Support sauber verzahnen." },
      { title: "Test & Qualität", text: "Risiken mit klaren Testfällen, Abnahmen und nachvollziehbarer Dokumentation reduzieren." },
    ],
    outcomes: ["Klare Zuständigkeiten und Entscheidungswege", "Früh erkannte technische und organisatorische Risiken", "Kontrollierte Einführung mit geringer Betriebsbelastung", "Saubere Übergabe in Support und Betrieb"],
  }} />;
}
