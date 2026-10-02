import type { Metadata } from "next";
import { company } from "../company";
import PageHero from "../page-hero";

export const metadata: Metadata = { alternates: { canonical: "/datenschutz/" }, title: "Datenschutz" };

export default function PrivacyPage() {
  return <main className="legal-page edasan-legal-page">
    <PageHero title="Datenschutz" lead="Wie wir Ihre Angaben beim Besuch der Website und bei einer Anfrage bearbeiten." />
    <div className="soft-shell edasan-legal-body"><div className="legal-card">
    <p>Diese Erklärung beschreibt die Bearbeitung von Personendaten beim Besuch dieser Website und bei einer Kontaktaufnahme mit uns.</p>

    <h2>Verantwortlich</h2>
    <p><strong>{company.name}</strong><br />{company.address.map((line) => <span key={line}>{line}<br /></span>)}
      {company.email && <a href={`mailto:${company.email}`}>{company.email}</a>}
    </p>

    <h2>Besuch der Website</h2>
    <p>Für die Auslieferung und Sicherheit der Website werden technisch erforderliche Zugriffsdaten verarbeitet. Dazu gehören insbesondere IP-Adresse, Zeitpunkt, aufgerufene Seite und technische Angaben zum Browser. Die Website wird bei Hostpoint AG in der Schweiz betrieben.</p>

    <h2>Kontaktaufnahme</h2>
    <p>Wenn Sie uns eine E-Mail senden, bearbeiten wir Ihre Adresse, Ihre Nachricht und die von Ihnen mitgeteilten Angaben, um die Anfrage zu beantworten und eine allfällige Zusammenarbeit vorzubereiten. Das Anfrageformular übermittelt Ihre Eingaben zur Zustellung an unser Postfach bei Hostpoint. Die Website speichert die Formulareingaben nicht dauerhaft. Wir bewahren Korrespondenz nur so lange auf, wie dies für die Bearbeitung oder aufgrund gesetzlicher Pflichten erforderlich ist.</p>

    <h2>Analyse und externe Inhalte</h2>
    <p>Wir verwenden auf dieser Website keine eigenen Analyse- oder Werbe-Cookies. Es sind keine externen Karten, Videos, Schriften oder Social-Media-Plugins eingebunden.</p>

    <h2>Ihre Rechte</h2>
    <p>Sie können nach Massgabe des Schweizer Datenschutzgesetzes Auskunft über Ihre Personendaten verlangen sowie deren Berichtigung oder Löschung beantragen. Kontaktieren Sie uns dafür unter der oben angegebenen Adresse{company.email ? <> oder per E-Mail an <a href={`mailto:${company.email}`}>{company.email}</a></> : null}.</p>

    <p className="v16-legal-date">Stand: 30. September 2026</p>
  </div></div></main>;
}
