import { readFile, writeFile } from 'node:fs/promises';
const routes = JSON.parse(await readFile(new URL('../app/i18n/routes.json', import.meta.url), 'utf8'));
const locales = ['de', 'fr', 'en', 'it'];
const href = (locale, route) => `https://edasan.ch${locale === 'de' ? '' : '/' + locale}${route}`;
const entries = routes.flatMap(route => locales.map(locale => `  <url><loc>${href(locale, route)}</loc>${locales.map(l => `<xhtml:link rel="alternate" hreflang="${l === 'en' ? 'en' : l + '-CH'}" href="${href(l, route)}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${href('de', route)}"/></url>`));
await writeFile(new URL('../public/sitemap.xml', import.meta.url), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`);
