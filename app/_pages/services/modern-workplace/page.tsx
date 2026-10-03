import type { Metadata } from "next";
import ServiceDetail from "@/app/services/service-detail";

export const metadata: Metadata = { alternates: { canonical: "/services/modern-workplace/" }, title: "Modern Workplace", description: "Microsoft 365, Intune und sichere digitale Arbeitsplätze für Schweizer KMU." };

export default function ModernWorkplacePage() {
  return <ServiceDetail data={{
    title: "Ein Arbeitsplatz, der Menschen produktiv macht.",
    lead: "Wir verbinden Microsoft 365, Teams, Intune und sichere Identitäten zu einer Arbeitsumgebung, die im Büro wie unterwegs überzeugt.",
    promiseTitle: "Technologie wird erst wertvoll, wenn sie gerne genutzt wird.",
    promiseText: "Darum betrachten wir Geräte, Anwendungen, Sicherheit und Einführung gemeinsam. Ihre Mitarbeitenden erhalten einen verlässlichen Arbeitsplatz – ohne unnötige Komplexität.",
    modules: [
      { title: "Microsoft 365", text: "Teams, Exchange, OneDrive und SharePoint sauber eingeführt und betrieben." },
      { title: "Endpoint Management", text: "Geräte mit Intune standardisieren, absichern und über den gesamten Lifecycle verwalten." },
      { title: "Identity & Access", text: "Zugriffe mit Entra ID, MFA und Conditional Access nachvollziehbar steuern." },
      { title: "Adoption", text: "Mitarbeitende mit verständlicher Kommunikation, Schulung und Begleitung mitnehmen." },
    ],
    outcomes: ["Sicheres Arbeiten von jedem geeigneten Ort", "Weniger manueller Aufwand bei Geräten und Benutzern", "Einheitliche Zusammenarbeit und klare Standards", "Höhere Akzeptanz bei den Mitarbeitenden"],
  }} />;
}
