import Link from "next/link";

type Offer = { title: string; text: string; href?: string; link?: string };

export function OfferRows({ offers }: { offers: Offer[] }) {
  return <div className="edasan-offer-list">{offers.map((offer) =>
    <article className="edasan-split" key={offer.title}>
      <h3>{offer.title}</h3>
      <div className="edasan-offer-copy"><p>{offer.text}</p>
        {offer.href && <Link href={offer.href}>{offer.link ?? `${offer.title} ansehen`}</Link>}
      </div>
    </article>
  )}</div>;
}

export function RelatedSection({ title, text, href, link }: { title: string; text: string; href: string; link: string }) {
  return <section className="soft-shell v15-related edasan-split">
    <h2>{title}</h2>
    <div className="edasan-offer-copy"><p>{text}</p><Link href={href}>{link}</Link></div>
  </section>;
}
