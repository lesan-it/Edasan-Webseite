import Link from "next/link";
import PageHero from "../page-hero";

export type ServiceDetailData = {
  parentHref?: string;
  parentLabel?: string;
  title: string;
  lead: string;
  promiseTitle: string;
  promiseText: string;
  modules: Array<{ title: string; text: string }>;
  outcomes: string[];
};

export default function ServiceDetail({ data }: { data: ServiceDetailData }) {
  return <main className="soft-page v15-detail">
    <PageHero title={data.title} lead={data.lead} parent={{ href: data.parentHref ?? "/services", label: data.parentLabel ?? "IT Services" }} />

    <section className="soft-shell v15-detail-promise"><h2>{data.promiseTitle}</h2><p>{data.promiseText}</p></section>

    <section className="soft-shell v15-hub-section"><div className="v15-section-heading"><h2>Was wir konkret übernehmen.</h2></div><div className="v15-offer-grid two">{data.modules.map((module) => <article className="v15-offer v15-detail-module" key={module.title}><h3>{module.title}</h3><p>{module.text}</p></article>)}</div></section>

    <section className="soft-shell v15-detail-outcomes"><div><h2>Worauf es am Ende ankommt.</h2></div><ul>{data.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></section>

    <section className="soft-shell soft-page-cta v15-page-cta"><div><h2>Wir klären gemeinsam, was sinnvoll ist.</h2></div><Link className="soft-btn soft-btn-light" href="/kontakt">Gespräch vereinbaren</Link></section>
  </main>;
}
