import type { Metadata } from "next";
import ServiceDetail from "@/app/services/service-detail";

export const metadata: Metadata = { alternates: { canonical: "/services/cyber-security/" }, title: "Cyber Security", description: "Pragmatische Cybersecurity für Identitäten, Geräte, Daten und Microsoft-Umgebungen." };

export default function SecurityPage() {
  return <ServiceDetail data={{
    title: "Sicherheit, die zu Ihrem Risiko passt.",
    lead: "Wir schützen Identitäten, Geräte und Daten mit verständlichen Massnahmen – priorisiert nach Wirkung und passend zu Ihren betrieblichen Möglichkeiten.",
    promiseTitle: "Sicherheit muss wirksam und im Alltag umsetzbar sein.",
    promiseText: "Wir schaffen Transparenz, schliessen die wichtigsten Lücken zuerst und verankern Schutzmassnahmen im laufenden Betrieb statt in einer einmaligen Checkliste.",
    modules: [
      { title: "Security Assessment", text: "Risiken, Konfigurationen und organisatorische Lücken strukturiert sichtbar machen." },
      { title: "Identity Protection", text: "MFA, Conditional Access und privilegierte Zugriffe sinnvoll absichern." },
      { title: "Endpoint Security", text: "Geräte härten, schützen und sicherheitsrelevante Ereignisse überwachen." },
      { title: "Resilience", text: "Backup, Wiederanlauf und Reaktionswege für den Ernstfall vorbereiten." },
    ],
    outcomes: ["Klare Prioritäten statt unübersichtlicher Massnahmenlisten", "Reduziertes Risiko bei Identitäten und Endgeräten", "Nachvollziehbare Schutz- und Berechtigungskonzepte", "Bessere Vorbereitung auf Sicherheitsvorfälle"],
  }} />;
}
