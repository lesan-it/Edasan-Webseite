import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../page-hero";
import { company } from "../company";

export const metadata: Metadata = { alternates: { canonical: "/karriere/" },
  title: "Karriere",
  description: "Offene Stellen und Karrieremöglichkeiten bei Edasan GmbH in der Region Bern.",
};

type Position = {
  title: string;
  area: string;
  location: string;
  href: string;
};

const positions: Position[] = [];

export default function CareersPage() {
  return <main className="soft-page v17-careers">
    <PageHero title="Arbeiten bei Edasan." lead="Wir sind in IT Services, Beratung und Software tätig. Offene Stellen finden Sie hier." />

    <section className="soft-shell v17-careers-openings" aria-labelledby="career-openings-title">
      <div><h2 id="career-openings-title">Offene Stellen.</h2></div>
      <div className="v17-careers-list">
        {positions.length > 0 ? positions.map((position) => <Link className="v17-careers-position" href={position.href} key={position.href}>
          <strong>{position.title}</strong><span>{position.area} · {position.location}</span>
        </Link>) : <p>Aktuell sind keine Stellen ausgeschrieben. Neue Positionen veröffentlichen wir hier.</p>}
      </div>
    </section>

    <section className="soft-shell v17-careers-contact">
      <div><h2>Fragen zu Edasan als Arbeitgeber?</h2><p>Schreiben Sie uns direkt. Wir freuen uns auf Ihre Nachricht.</p></div>
      <a className="soft-btn soft-btn-dark" href={`mailto:${company.email}?subject=Karriere%20bei%20Edasan`}>E-Mail schreiben</a>
    </section>
  </main>;
}
