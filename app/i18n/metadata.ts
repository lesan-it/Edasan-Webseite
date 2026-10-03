import type { Metadata } from "next";
import { locales, localeHref, type Locale } from "./routing";
import { translate } from "./translate";
export function pageMetadata(source: Metadata, locale: Locale, path: string): Metadata {
  const original = typeof source.title === "string" ? source.title : source.title && "absolute" in source.title ? source.title.absolute : "Edasan GmbH";
  const title = translate(locale, original);
  const description = translate(locale, source.description ?? "Managed IT, Workplace, Cloud, Security, Software, Portale, Automation und KI für Schweizer KMU und den Mittelstand.");
  return {
    ...source, title: typeof source.title === "object" ? { absolute: title } : title, description,
    alternates: { canonical: localeHref(locale, path), languages: Object.fromEntries([...locales.map(l => [l === "en" ? "en" : `${l}-CH`, localeHref(l, path)]), ["x-default", path]]) },
    openGraph: { title, description, url: localeHref(locale, path), locale: {de:"de_CH",fr:"fr_CH",en:"en_GB",it:"it_CH"}[locale], alternateLocale: locales.filter(l=>l!==locale).map(l=>({de:"de_CH",fr:"fr_CH",en:"en_GB",it:"it_CH"}[l])), siteName: "Edasan", type: "website", images: [{url:"/og.png",width:1200,height:630,alt:"Edasan GmbH"}] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}
