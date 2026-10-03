"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import MotionLayer from "./motion-layer";
import { company } from "./company";
import { canonicalPath, localeHref, locales, localeNames, type Locale } from "./i18n/routing";
import type { ChromeLabels } from "./i18n/ui";

const destinations = ["/services/", "/beratung/", "/software/", "/ki-automatisierung/", "/unternehmen/", "/karriere/"];
function EdasanBrand({ footer = false, locale, label }: { footer?: boolean; locale: Locale; label: string }) {
  return <Link className={`soft-brand${footer ? " footer" : ""}`} href={localeHref(locale, "/")} aria-label={label}>
    <i aria-hidden="true"><span>e</span><b /></i><span><strong>edasan</strong></span>
  </Link>;
}
function ThemeIcon({ dark }: { dark: boolean }) {
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dark ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5" /></> : <path d="M20.6 13.5A8.8 8.8 0 0 1 10.5 3.4 8.8 8.8 0 1 0 20.6 13.5Z" />}
  </svg>;
}

export default function SiteChrome({ children, locale, labels }: { children: ReactNode; locale: Locale; labels: ChromeLabels }) {
  const pathname = usePathname();
  const path = canonicalPath(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const languageButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setMenuOpen(false); setLanguageOpen(false); }, [pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); setLanguageOpen(open => { if (open) languageButtonRef.current?.focus(); return false; }); }
    };
    const outside = (event: PointerEvent) => { if (!languageRef.current?.contains(event.target as Node)) setLanguageOpen(false); };
    window.addEventListener("keydown", close); document.addEventListener("pointerdown", outside);
    return () => { window.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); };
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      let stored: string | null = null;
      try { stored = localStorage.getItem("edasan-theme"); } catch {}
      const next = stored === "dark" || (stored !== "light" && media.matches);
      document.documentElement.dataset.theme = next ? "dark" : "light"; setDark(next);
    };
    apply(); media.addEventListener("change", apply); window.addEventListener("storage", apply);
    return () => { media.removeEventListener("change", apply); window.removeEventListener("storage", apply); };
  }, []);
  function toggleTheme() {
    const next = !dark; document.documentElement.dataset.theme = next ? "dark" : "light"; setDark(next);
    try { localStorage.setItem("edasan-theme", next ? "dark" : "light"); } catch {}
  }
  const href = (url: string) => localeHref(locale, url);
  const f = labels.footer;
  return <>
    <MotionLayer />
    <header className="soft-header v15-header">
      <div className="soft-header-inner">
        <EdasanBrand locale={locale} label={labels.home} />
        <nav id="main-navigation" className={menuOpen ? "open" : ""} aria-label={labels.navigation}>
          {destinations.map((url, index) => {
            const active = path === url || path.startsWith(url) || (path === "/projekte/automotive-platform/" && url === "/software/");
            return <Link key={url} className={active ? "active" : ""} aria-current={active ? "page" : undefined} href={href(url)}>{labels.nav[index]}</Link>;
          })}
          <Link className="soft-mobile-cta" href={href("/kontakt/")}>{labels.contact}</Link>
        </nav>
        <div className="edasan-header-actions">
          <Link className="soft-header-cta" href={href("/kontakt/")}>{labels.contact}</Link>
          <div className="edasan-language" ref={languageRef}>
            <button ref={languageButtonRef} className="edasan-header-button edasan-language-button" type="button" aria-label={`${labels.language}: ${localeNames[locale]}`} aria-expanded={languageOpen} aria-controls="language-options" onClick={() => { setLanguageOpen(!languageOpen); setMenuOpen(false); }}>
              <span>{locale.toUpperCase()}</span><svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m1 1 4 4 4-4" /></svg>
            </button>
            {languageOpen && <ul id="language-options" className="edasan-language-options" aria-label={labels.language}>
              {locales.map(l => <li key={l}><a href={localeHref(l, path)} hrefLang={l} lang={l} aria-current={l === locale ? "true" : undefined}><span>{localeNames[l]}</span><span aria-hidden="true">{l.toUpperCase()}</span></a></li>)}
            </ul>}
          </div>
          <button className="edasan-header-button edasan-theme-button" type="button" onClick={toggleTheme} aria-label={dark ? labels.light : labels.dark} title={dark ? labels.light : labels.dark} aria-pressed={dark}><ThemeIcon dark={dark} /></button>
          <button className="soft-menu" type="button" onClick={() => { setMenuOpen(!menuOpen); setLanguageOpen(false); }} aria-label={menuOpen ? labels.close : labels.open} aria-controls="main-navigation" aria-expanded={menuOpen}><i /><i /></button>
        </div>
      </div>
    </header>
    {children}
    <footer className="soft-footer v15-footer"><div className="soft-shell soft-footer-grid">
      <div><EdasanBrand footer locale={locale} label={labels.home} /><p>{f.description}</p></div>
      <div><strong>{f.services}</strong>{destinations.slice(0,4).map((url,i)=><Link href={href(url)} key={url}>{labels.nav[i]}</Link>)}<Link href={href("/software/eigenentwicklungen/")}>{f.products}</Link></div>
      <div><strong>{f.company}</strong><Link href={href("/projekte/")}>{f.projects}</Link><Link href={href("/unternehmen/")}>{labels.nav[4]}</Link><Link href={href("/karriere/")}>{labels.nav[5]}</Link><Link href={href("/kontakt/")}>{labels.contact}</Link></div>
      <div><strong>{f.location}</strong><span>Worbstrasse 198</span><span>3073 Gümligen · {f.country}</span><a href={company.phone.href}>{company.phone.display}</a><a href={`mailto:${company.email}`}>{company.email}</a></div>
    </div><div className="soft-shell soft-footer-bottom"><span>© 2026 Edasan GmbH</span><div><Link href={href("/datenschutz/")}>{f.privacy}</Link><Link href={href("/impressum/")}>{f.legal}</Link></div></div></footer>
  </>;
}
