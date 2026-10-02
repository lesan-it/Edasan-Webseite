import Link from "next/link";

export default function LegacyRedirect({ href, label }: { href: string; label: string }) {
  return <main className="legal-page section-shell"><h1>Diese Seite ist umgezogen.</h1>
    <p>Den aktuellen Inhalt finden Sie unter <Link href={href}>{label}</Link>.</p>
  </main>;
}
