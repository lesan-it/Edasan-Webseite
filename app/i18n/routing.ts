export const locales = ["de", "fr", "en", "it"] as const;
export type Locale = typeof locales[number];
export const localeNames: Record<Locale, string> = { de: "Deutsch", fr: "Français", en: "English", it: "Italiano" };
export function isLocale(value: string): value is Locale { return (locales as readonly string[]).includes(value); }
export function canonicalPath(path: string) {
  const parts = path.split("/").filter(Boolean);
  if (parts[0] && isLocale(parts[0])) parts.shift();
  return parts.length ? `/${parts.join("/")}/` : "/";
}
export function localeHref(locale: Locale, path: string) {
  if (!path.startsWith("/") || path.startsWith("//") || path.startsWith("/_next/") || path.startsWith("/api/")) return path;
  const split = path.search(/[?#]/);
  const pathname = split < 0 ? path : path.slice(0, split);
  const suffix = split < 0 ? "" : path.slice(split);
  const canonical = canonicalPath(pathname);
  return (locale === "de" ? canonical : `/${locale}${canonical}`) + suffix;
}
