import copy from "./copy.json";
import type { Locale } from "./routing";
const dictionary: Record<string, string[]> = copy;
export function translate(locale: Locale, text: string): string {
  if (locale === "de" || !text.trim()) return text;
  const source = text.trim();
  const entry = dictionary[source];
  if (!entry) throw new Error(`Missing ${locale} translation: ${source}`);
  const translated = entry[{fr: 0, en: 1, it: 2}[locale]];
  if (!translated) throw new Error(`Empty ${locale} translation: ${source}`);
  return text.slice(0, text.indexOf(source)) + translated + text.slice(text.indexOf(source) + source.length);
}
