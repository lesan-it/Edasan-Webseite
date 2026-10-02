import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../page-hero";

export const metadata: Metadata = { alternates: { canonical: "/software/eigenentwicklungen/" }, title: "Eigenentwicklungen", description: "Eigene Softwareentwicklungen von Edasan – transparent mit ihrem aktuellen Projektstand." };

export default function ProductsPage() {
  return <main className="soft-page v15-hub">
    <PageHero title="Produkte aus echten Anforderungen." lead="Wir entwickeln eigene Softwarelösungen für wiederkehrende Abläufe. Hier zeigen wir, woran wir arbeiten – mit klarem Status statt fertigen Versprechen." parent={{ href: "/software", label: "Software & Portale" }} />
    <section className="soft-shell v15-product-section"><div className="v15-section-heading"><h2>Ein Projekt im Aufbau.</h2></div><article className="v15-product"><div><h3>Automotive Commerce Platform</h3><p>Ein verbundenes Fahrzeugportal und internes Arbeitswerkzeug für Händler – von der Fahrzeugakte bis zum Verkaufsprozess. Das Produkt befindet sich in Entwicklung.</p><Link href="/projekte/automotive-platform">Entwicklung ansehen</Link></div></article></section>
    <section className="soft-shell v15-related"><div><h2>Eine Anwendung für Ihre Abläufe?</h2><p>Neben eigenen Produkten entwickeln wir Portale und Web-Apps für konkrete Anforderungen von Unternehmen.</p></div><Link href="/software/portale-web-apps">Individuelle Software ansehen</Link></section>
    <section className="soft-shell soft-page-cta v15-page-cta"><div><h2>Welche Aufgabe sollte Software leichter machen?</h2></div><Link className="soft-btn soft-btn-light" href="/kontakt">Idee besprechen</Link></section>
  </main>;
}
