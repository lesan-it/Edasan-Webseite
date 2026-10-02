"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MotionLayer from "./motion-layer";
import { company } from "./company";

const navigation = [
  ["IT Services", "/services"],
  ["Beratung & Projekte", "/beratung"],
  ["Software & Portale", "/software"],
  ["KI & Automatisierung", "/ki-automatisierung"],
  ["Unternehmen", "/unternehmen"],
  ["Karriere", "/karriere"],
];

function EdasanBrand({ footer = false }: { footer?: boolean }) {
  return <Link className={`soft-brand${footer ? " footer" : ""}`} href="/" aria-label="Edasan Startseite">
    <i aria-hidden="true"><span>e</span><b /></i><span><strong>edasan</strong></span>
  </Link>;
}

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return <>
    <MotionLayer />
    <header className="soft-header v15-header">
      <div className="soft-header-inner">
        <EdasanBrand />
        <nav id="main-navigation" className={menuOpen ? "open" : ""} aria-label="Hauptnavigation">
          {navigation.map(([label, href]) => {
            const productDetail = pathname === "/projekte/automotive-platform";
            const active = pathname === href || (pathname.startsWith(`${href}/`) && !(productDetail && href === "/projekte")) || (productDetail && href === "/software");
            return <Link key={href} className={active ? "active" : ""} href={href}>{label}</Link>;
          })}
          <Link className="soft-mobile-cta" href="/kontakt">Kontakt</Link>
        </nav>
        <Link className="soft-header-cta" href="/kontakt">Kontakt</Link>
        <button className="soft-menu" type="button" onClick={() => setMenuOpen((current) => !current)} aria-label={menuOpen ? "Navigation schliessen" : "Navigation öffnen"} aria-controls="main-navigation" aria-expanded={menuOpen}><i /><i /></button>
      </div>
    </header>
    {children}
    <footer className="soft-footer v15-footer"><div className="soft-shell soft-footer-grid">
      <div><EdasanBrand footer /><p>IT Services, Beratung und Software für Unternehmen in der Schweiz.</p></div>
      <div><strong>Leistungen</strong><Link href="/services">IT Services</Link><Link href="/beratung">Beratung &amp; Projekte</Link><Link href="/software">Software &amp; Portale</Link><Link href="/ki-automatisierung">KI &amp; Automatisierung</Link><Link href="/software/eigenentwicklungen">Eigenentwicklungen</Link></div>
      <div><strong>Edasan</strong><Link href="/projekte">Projekte &amp; Erfahrung</Link><Link href="/unternehmen">Unternehmen</Link><Link href="/karriere">Karriere</Link><Link href="/kontakt">Kontakt</Link></div>
      <div><strong>Standort &amp; Kontakt</strong><span>Worbstrasse 198</span><span>3073 Gümligen · Schweiz</span><a href={company.phone.href}>{company.phone.display}</a><a href={`mailto:${company.email}`}>{company.email}</a></div>
    </div><div className="soft-shell soft-footer-bottom"><span>© 2026 Edasan GmbH</span><div><Link href="/datenschutz">Datenschutz</Link><Link href="/impressum">Impressum</Link></div></div></footer>
  </>;
}
