import Link from "next/link";
import type { ReactNode } from "react";

type ParentPage = { href: string; label: string };

export default function PageHero({
  title,
  lead,
  parent,
}: {
  title: ReactNode;
  lead: ReactNode;
  parent?: ParentPage;
}) {
  return <section className="v15-hub-hero edasan-page-hero">
    <div className="soft-shell v15-page-hero">
      {parent && <Link className="edasan-back-link" href={parent.href}>
        <span aria-hidden="true">←</span>{parent.label}
      </Link>}
      <h1>{title}</h1>
      <p>{lead}</p>
    </div>
  </section>;
}
