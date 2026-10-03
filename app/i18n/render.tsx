import { cloneElement, isValidElement, type ReactNode, type ReactElement } from "react";
import PageHero from "../page-hero";
import { OfferCards, OfferRows, RelatedSection } from "../content-sections";
import ServiceDetail from "../services/service-detail";
import ContactForm from "../kontakt/contact-form";
import { localeHref, type Locale } from "./routing";
import { translate } from "./translate";
import { ui } from "./ui";

// Expand only the site's known, synchronous server components. Client boundaries
// stay intact; all translated text is present in the exported HTML at build time.
const serverComponents = new Set<unknown>([PageHero, OfferCards, OfferRows, RelatedSection, ServiceDetail]);
export function localizePage(node: ReactNode, locale: Locale): ReactNode {
  if (typeof node === "string") return translate(locale, node);
  if (Array.isArray(node)) return node.map(child => localizePage(child, locale));
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<Record<string, unknown>>;
  if (serverComponents.has(element.type)) {
    const render = element.type as (props: Record<string, unknown>) => ReactNode;
    return localizePage(render(element.props), locale);
  }
  if (element.type === ContactForm) return <ContactForm locale={locale} labels={ui[locale].contact} />;
  const props: Record<string, unknown> = {};
  for (const key of ["aria-label", "alt", "title", "placeholder"]) {
    if (typeof element.props[key] === "string") props[key] = translate(locale, element.props[key]);
  }
  if (typeof element.props.href === "string") {
    props.href = localeHref(locale, element.props.href);
    if (element.props.href.startsWith("mailto:")) {
      const url = new URL(element.props.href);
      const subject = url.searchParams.get("subject");
      if (subject) { url.searchParams.set("subject", translate(locale, subject)); props.href = url.toString(); }
    }
  }
  if (element.props.children !== undefined) props.children = localizePage(element.props.children as ReactNode, locale);
  return cloneElement(element, props);
}
