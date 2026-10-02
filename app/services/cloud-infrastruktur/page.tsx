import type { Metadata } from "next";
import ServiceDetail from "../service-detail";

export const metadata: Metadata = { alternates: { canonical: "/services/cloud-infrastruktur/" }, title: "Cloud & Infrastruktur", description: "Azure, Server, Virtualisierung und Backup für verlässliche IT-Plattformen." };

export default function CloudPage() {
  return <ServiceDetail data={{
    title: "Eine Plattform, die mit Ihrem Unternehmen wächst.",
    lead: "Von lokalen Systemen bis Azure: Wir planen, modernisieren und betreiben Ihre Infrastruktur mit einem klaren Blick auf Verfügbarkeit, Kosten und Sicherheit.",
    promiseTitle: "Cloud dort, wo sie einen echten Vorteil schafft.",
    promiseText: "Nicht jede Umgebung braucht dieselbe Architektur. Wir verbinden bestehende Systeme und Cloud-Services so, dass Betrieb, Schutz und Weiterentwicklung beherrschbar bleiben.",
    modules: [
      { title: "Azure & Hybrid Cloud", text: "Passende Cloud-Architekturen, Migrationen und sichere Anbindungen." },
      { title: "Server & Virtualisierung", text: "Windows Server, Hyper-V und VMware stabil planen und betreiben." },
      { title: "Backup & Recovery", text: "Daten, Systeme und Wiederanlauf mit überprüfbaren Konzepten absichern." },
      { title: "Monitoring", text: "Verfügbarkeit, Kapazität und kritische Ereignisse laufend im Blick behalten." },
    ],
    outcomes: ["Nachvollziehbare Architektur und Kosten", "Höhere Verfügbarkeit geschäftskritischer Systeme", "Planbare Migration ohne unnötige Unterbrüche", "Wiederherstellung, die regelmässig überprüft wird"],
  }} />;
}
