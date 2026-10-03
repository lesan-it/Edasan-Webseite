import type { Metadata } from "next";
import "./globals.css";
import "./soft.css";
import "./refinement-v15.css";
import "./inner-pages.css";
import "./layout-system.css";
import "./offer-cards.css";
import SiteChrome from "./site-chrome";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
