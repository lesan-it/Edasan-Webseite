import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = new URL('../out/', import.meta.url);
test('Actual Next.js export can be prepared with valid release checksums', async () => {
  const source = process.env.GITHUB_SHA || '0'.repeat(40);
  execFileSync(process.execPath, [fileURLToPath(new URL('../scripts/prepare-release.mjs', import.meta.url))], {
    env: { ...process.env, GITHUB_SHA: source }, stdio: 'pipe',
  });
  const manifest = await readFile(new URL('SHA256SUMS', root), 'utf8');
  const entries = manifest.trim().split('\n');
  assert.ok(entries.length > 100);
  for (const entry of entries) {
    const [digest, path] = entry.split('  ');
    assert.equal(createHash('sha256').update(await readFile(new URL(path, root))).digest('hex'), digest, path);
  }
  const info = JSON.parse(await readFile(new URL('.build-info.json', root), 'utf8'));
  assert.equal(info.sourceCommit, source);
});
test('Every sitemap page exists with its own canonical URL and crawlable HTML', async () => {
  const sitemap = await readFile(new URL('sitemap.xml', root), 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  assert.equal(urls.length, 84);
  assert.equal(new Set(urls).size, urls.length);
  for (const url of urls) {
    assert.ok(url.startsWith('https://edasan.ch/'));
    const pathname = new URL(url).pathname;
    const html = await readFile(new URL(join(pathname.slice(1), 'index.html'), root), 'utf8');
    assert.ok(html.includes(`<link rel="canonical" href="${url}"`), url);
    assert.ok(!/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html), url);
    const locale = pathname.match(/^\/(fr|en|it)\//)?.[1] || 'de';
    assert.ok(html.includes(`<html lang="${locale}"`), url);
    for (const lang of ['de-CH', 'fr-CH', 'en', 'it-CH', 'x-default']) {
      assert.ok(html.includes(`hrefLang="${lang}"`), `${url}: missing ${lang} alternate`);
    }
    for (const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
      const path = match[1];
      if (path.startsWith('//') || path === '') continue;
      const relative = path.slice(1);
      const candidates = [relative, join(relative, 'index.html')];
      assert.ok((await Promise.all(candidates.map(p => access(new URL(p, root)).then(() => true, () => false)))).some(Boolean), `${url}: missing ${path}`);
    }
  }
});
test('Export includes Hostpoint runtime files and search engine discovery', async () => {
  const robots = await readFile(new URL('robots.txt', root), 'utf8');
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/edasan.ch\/sitemap.xml/);
  assert.ok(!robots.includes('Disallow: /'));
  const rules = await readFile(new URL('.htaccess', root), 'utf8');
  assert.match(rules, /https:\/\/edasan.ch/);
  assert.match(rules, /ErrorDocument 404 \/404.html/);
  const handler = await readFile(new URL('api/contact.php', root), 'utf8');
  assert.match(handler, /^<\?php/);
  assert.ok(handler.includes('info@edasan.ch'));
  await access(new URL('404.html', root));
  await access(new URL('images/edasan-hero.webp', root));
});

test('Translated pages publish their content and keep internal links in the selected language', async () => {
  const routes = JSON.parse(await readFile(new URL('../app/i18n/routes.json', import.meta.url), 'utf8'));
  const copy = JSON.parse(await readFile(new URL('../app/i18n/copy.json', import.meta.url), 'utf8'));
  for (const [locale, index] of [['fr', 0], ['en', 1], ['it', 2]]) {
    const home = await readFile(new URL(`${locale}/index.html`, root), 'utf8');
    assert.ok(home.includes(copy['Persönlich für KMU.'][index]));
    for (const route of routes) {
      const html = await readFile(new URL(`${locale}${route}index.html`, root), 'utf8');
      const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
      assert.ok(main, `${locale}${route}: missing main`);
      for (const [, href] of main.matchAll(/href="(\/[^"?#]*)/g)) {
        assert.ok(href.startsWith(`/${locale}/`), `${locale}${route}: link leaves selected language: ${href}`);
      }
    }
  }
});
