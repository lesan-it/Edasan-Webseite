import SiteLayout, { metadata } from "../site-layout";
export { metadata };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="de">{children}</SiteLayout>;
}
