import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../page-hero";

export const metadata: Metadata = { alternates: { canonical: "/projekte/" }, title: "Projekte & Erfahrung", description: "Einblicke in die Projekterfahrung des Edasan-Teams aus Schweizer IT-Umgebungen." };

const experience = [
  ["Workplace-Rollout über zahlreiche Standorte", "Technische Koordination, Rollout- und Testmanagement in einem schweizweiten Workplace-Programm."],
  ["Client Engineering in komplexen Umgebungen", "Windows Engineering und Qualitätssicherung in einer grossen Applikationslandschaft."],
  ["Modern Workplace mit Cloud und Endpoint", "Praxis mit Microsoft 365, Intune, MECM, Citrix und hybrider Infrastruktur."],
];

export default function ProjectsPage() {
  return <main className="soft-page v15-hub">
    <PageHero title="Erfahrung aus anspruchsvoller IT-Praxis." lead="Diese Einblicke stammen aus Mandaten und Projekten des Teams. Sie sind keine als Edasan-Kundenprojekte ausgegebenen Referenzen." />
    <section className="soft-shell v15-hub-section"><div className="v15-section-heading"><h2>Was wir mitbringen.</h2></div><div className="v15-experience-list">{experience.map(([title, text]) => <article className="edasan-split" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="soft-shell v15-related"><div><h2>Software in Entwicklung.</h2><p>Unsere Eigenentwicklungen zeigen wir bewusst getrennt von der Projekterfahrung des Teams.</p></div><Link href="/software/eigenentwicklungen">Eigenentwicklungen ansehen</Link></section>
    <section className="soft-shell soft-page-cta v15-page-cta"><div><h2>Welche Erfahrung ist für Sie relevant?</h2></div><Link className="soft-btn soft-btn-light" href="/kontakt">Gespräch vereinbaren</Link></section>
  </main>;
}
