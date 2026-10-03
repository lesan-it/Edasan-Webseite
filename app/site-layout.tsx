import type { Metadata } from "next";
import "./globals.css";
import "./soft.css";
import "./refinement-v15.css";
import "./inner-pages.css";
import "./layout-system.css";
import "./offer-cards.css";
import "./typography.css";
import SiteChrome from "./site-chrome";
import type { Locale } from "./i18n/routing";
import { ui } from "./i18n/ui";
import "./appearance.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://edasan.ch"),
  title: {
    default: "Edasan GmbH",
    template: "%s | Edasan GmbH",
  },
  description: "Managed IT, Workplace, Cloud, Security, Software, Portale, Automation und KI für Schweizer KMU und den Mittelstand.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Edasan – Enterprise-Erfahrung. Persönlich für KMU.",
    description: "Managed IT, Software, Portale, Automation und KI für Schweizer KMU und den Mittelstand.",
    url: "/",
    siteName: "Edasan",
    locale: "de_CH",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Edasan – Enterprise-Erfahrung. Persönlich für KMU." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edasan – Enterprise-Erfahrung. Persönlich für KMU.",
    description: "Managed IT, Software, Portale, Automation und KI für Schweizer KMU und den Mittelstand.",
    images: ["/og.png"],
  },
};

const themeInit = `(function(){var t;try{t=localStorage.getItem('edasan-theme')}catch(e){}try{if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})();`;

export default function SiteLayout({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  return <html lang={locale} suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: themeInit }} /></head>
    <body><SiteChrome locale={locale} labels={ui[locale].chrome}>{children}</SiteChrome></body>
  </html>;
}
