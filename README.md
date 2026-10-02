# Edasan GmbH – Website

Website für https://edasan.ch. Next.js wird zu fertigen HTML-, CSS- und JavaScript-Dateien exportiert. Hostpoint liefert diese Dateien aus; das Anfrageformular läuft mit PHP. Kein Node.js-Prozess und keine Datenbank auf dem Webhosting nötig.

## Entwicklung

Node.js 24 und npm:

```sh
npm ci
npm run dev
```

Vor einer Veröffentlichung:

```sh
npm test
```

Das baut die Website und prüft Sitemap, kanonische URLs, interne Links sowie Veröffentlichung, Prüfsummen, Sicherung und Rollback in einer isolierten Testumgebung.

## GitHub und Hostpoint

| Branch | Inhalt |
| --- | --- |
| `main` | Quellcode, Bilder, Tests, Build-Workflow und Hostpoint-Skript |
| `production` | Ausschliesslich der erfolgreich gebaute Export mit Prüfsummen |

Änderungen an `main` starten den Workflow «Website bauen und freigeben». Pull Requests werden geprüft, aber nicht veröffentlicht. Nach erfolgreicher Prüfung wird `production` aktualisiert. Der Workflow verwendet GitHub-eigene Berechtigungen; es werden keine Hostpoint-Zugangsdaten auf GitHub benötigt.

Auf Hostpoint holt `deploy/hostpoint-pull.sh` den Branch `production`. Es prüft den vollständigen Download und aktiviert die Version über einen Dateisystem-Link. Der Git-Speicher und frühere Versionen liegen ausserhalb des öffentlichen Document-Roots. Fehlerhafte Downloads ersetzen die aktive Website nicht. Die letzte Version kann wieder aktiviert werden.

**Die Hostpoint-Anbindung ist erst aktiv, wenn das Skript im echten Hosting eingerichtet und dort getestet wurde.** SSH, Git, HTTPS, Document-Root, Link-Unterstützung und PHP-Mailzustellung müssen dort geprüft werden.

- [Hostpoint mit Git verbinden](deploy/HOSTPOINT-GIT.md)
- [GitHub erstmals verbinden und vorbereiteten Git-Verlauf übertragen](deploy/GITHUB-START.md)
- [Manuell mit ZIP veröffentlichen, HTTPS und Google einrichten](README-DEPLOY.md)
- [GitHub Actions](https://github.com/lesan-it/Edasan-Webseite/actions)

## Dateien

- `app/`: Seiten und Gestaltung
- `public/`: Bilder, Sitemap, robots.txt, .htaccess und PHP-Formular
- `scripts/`: Export mit Prüfsummen und Veröffentlichung nach production
- `deploy/`: Hostpoint-Abholung und Konfigurationsvorlage
- `tests/`: Export- und Deployment-Prüfungen

Passwörter, private Schlüssel, lokale Hostpoint-Konfiguration und .env-Dateien gehören nicht ins Repository. Änderungen an `production` werden vom nächsten erfolgreichen Build überschrieben; Website-Änderungen erfolgen in `main`.
