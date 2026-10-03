import SiteLayout, { metadata } from "@/app/site-layout";
import { isLocale } from "@/app/i18n/routing";
import { notFound } from "next/navigation";
export { metadata };
export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{locale:string}> }) {
  const {locale} = await params;
  if (!isLocale(locale) || locale === "de") notFound();
  return <SiteLayout locale={locale}>{children}</SiteLayout>;
}
