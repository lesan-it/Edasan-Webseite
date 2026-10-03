import Link from "next/link";

type Offer = { title: string; text: string; href?: string; link?: string };

export function OfferCards({ offers, columns = 2, featured = false }: { offers: Offer[]; columns?: 2 | 3; featured?: boolean }) {
  const linked = offers.every((offer) => Boolean(offer.href));
  return <div className={`edasan-offer-grid${columns === 3 ? " edasan-offer-grid--three" : ""}${linked ? " edasan-offer-grid--linked" : ""}${featured ? " edasan-offer-grid--featured" : ""}`}>
    {offers.map((offer) => {
      const content = <><h3>{offer.title}</h3><p>{offer.text}</p>
        {offer.href && <span className="edasan-offer-action">{offer.link ?? `${offer.title} ansehen`}<span aria-hidden="true">→</span></span>}
      </>;
      return offer.href
        ? <Link className="edasan-offer-card" href={offer.href} key={offer.title}>{content}</Link>
        : <article className="edasan-offer-card" key={offer.title}>{content}</article>;
    })}
  </div>;
}

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
