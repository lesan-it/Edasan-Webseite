import { notFound } from "next/navigation";
import { pages } from "@/app/i18n/pages";
import { isLocale, locales } from "@/app/i18n/routing";
import { pageMetadata } from "@/app/i18n/metadata";
import { localizePage } from "@/app/i18n/render";

type Params = { locale: string; segments?: string[] };
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.filter(locale => locale !== "de").flatMap(locale => Object.keys(pages).map(path => ({ locale, segments: path.split("/").filter(Boolean) })));
}
async function resolve(params: Promise<Params>) {
  const {locale, segments = []} = await params;
  const path = segments.length ? `/${segments.join("/")}/` : "/";
  if (!isLocale(locale) || locale === "de" || !(path in pages)) notFound();
  return {locale, path, page: pages[path as keyof typeof pages]};
}
export async function generateMetadata({params}: {params: Promise<Params>}) {
  const {locale, path, page} = await resolve(params);
  return pageMetadata(page.metadata, locale, path);
}
export default async function Page({params}: {params: Promise<Params>}) {
  const {locale, page} = await resolve(params);
  return localizePage(page.default(), locale);
}
