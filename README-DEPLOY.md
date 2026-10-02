# Edasan GmbH – Website bei Hostpoint veröffentlichen

Stand: 30. September 2026. Hauptadresse: https://edasan.ch

Dieses Paket läuft unabhängig von ChatGPT. Die Website besteht aus fertigen HTML-, CSS- und JavaScript-Dateien; das Anfrageformular verwendet PHP. Auf Hostpoint werden weder Node.js noch WordPress oder eine Datenbank benötigt.

## Was vorbereitet ist

- `upload/`: fertige Website inklusive Kontaktformular, HTTPS-Weiterleitungen, robots.txt und sitemap.xml.
- `source/`: Quellcode für spätere Änderungen; nicht öffentlich hochladen.
- Die Sitemap enthält 21 aktuelle Seiten. Jede davon hat eine eigene kanonische Adresse unter https://edasan.ch. Alte Adressen werden per .htaccess weitergeleitet.

Die Dateien sind vorbereitet und lokal geprüft. Die Website wurde damit noch nicht bei Hostpoint veröffentlicht. Zertifikat, DNS, Weiterleitungen und E-Mail-Zustellung sind auf dem echten Hosting zu testen.

## 1. Webhosting prüfen und Domain zuweisen

1. https://admin.hostpoint.ch öffnen und anmelden.
2. Unter «Services» prüfen, ob ein Webhosting vorhanden ist. Domain und E-Mail allein reichen nicht. Falls nur Domain/Mail angezeigt werden, wird zusätzlich ein Webhosting mit PHP benötigt.
3. Unter «Domains» die Domain edasan.ch auswählen und «Bearbeiten» öffnen.
4. Bei «Domain Status» das gewünschte Webhosting auswählen und speichern.
5. Das Webhosting öffnen. Unter «Websites» eine Website für edasan.ch erstellen, falls noch keine besteht.
6. www.edasan.ch als zusätzliche Domain/Alias derselben Website zuordnen. Beide Adressen müssen auf dieses Hosting zeigen.
7. Das dort angezeigte «Document-Root» notieren. Das ist der Zielordner der Website; häufig liegt er unter www/edasan.ch. Massgeblich ist der angezeigte Pfad.

Falls schon eine Website vorhanden ist: deren Dateien vor dem Überschreiben herunterladen und sichern. Bei DNS-Änderungen die Zone vorher sichern. Keine pauschale DNS-Rücksetzung durchführen: bestehende MX-, SPF-, DKIM- und DMARC-Einträge für E-Mail erhalten. Web-Zieladressen ausschliesslich aus deinem Hostpoint-Konto übernehmen; es gibt keine universelle IP für alle Kunden. Wenn externe Nameserver verwendet werden, müssen die DNS-Einträge beim tatsächlich zuständigen DNS-Anbieter geändert werden.

## 2. Dateien verschlüsselt hochladen

1. ZIP auf deinem Computer entpacken.
2. Ein Übertragungsprogramm verwenden, zum Beispiel WinSCP unter Windows oder Cyberduck.
3. Empfohlen: SFTP, Port 22. Dafür unter Webhosting → «Advanced» → «SSH-Zugang» SSH aktivieren. Hostpoint unterstützt SFTP nur mit dem Haupt-FTP-Account. Der Benutzername steht im Hosting-Vertrag; das Passwort ist dein Hosting-Passwort, nicht automatisch das Passwort deiner Hostpoint ID.
4. Alternativ: FTP mit explizitem TLS (FTPS), Port 21, mit einem FTP-Account. Kein unverschlüsseltes FTP auswählen.
5. Den Servernamen bei «Services» → «Advanced» → «FTP» → «Einstellungen» → «FTP-Server» ablesen.
6. Verbinden und das Document-Root aus Schritt 1 öffnen.
7. Den gesamten INHALT des Ordners upload/ hochladen. Nicht den übergeordneten Paketordner hochladen.

Direkt im Document-Root müssen danach unter anderem diese Dateien/Ordner liegen:

| Datei oder Ordner | Zweck |
| --- | --- |
| index.html | Startseite |
| .htaccess | HTTPS, Hauptdomain und alte Seitenadressen |
| _next/ | CSS und JavaScript |
| images/ | Bilder |
| api/contact.php | Formularversand |
| kontakt/ und weitere Seitenordner | Unterseiten |
| sitemap.xml | Seitenliste für Suchmaschinen |
| robots.txt | Crawling-Einstellungen und Sitemap-Verweis |

Die Datei .htaccess ist eventuell ausgeblendet. Im Programm versteckte Dateien anzeigen und mitübertragen. source/, README und die gesamte ZIP nicht im öffentlichen Webordner ablegen. Falls eine alte index.php oder andere Startdatei dort liegt, diese nach Sicherung aus dem Webordner entfernen, sofern sie zur ersetzten Website gehört.

## 3. HTTPS-Zertifikat einschalten

1. Im Hostpoint-Konto das Webhosting öffnen.
2. Unter «Websites» bei edasan.ch «SSL-Verschlüsselung» öffnen.
3. «FreeSSL» auswählen und speichern, falls es nicht bereits aktiv ist.
4. Prüfen, dass edasan.ch UND www.edasan.ch von einem gültigen Zertifikat abgedeckt sind. Auch eine weiterleitende www-Adresse braucht ein Zertifikat.
5. Warten, bis Hostpoint das Zertifikat ausgestellt und zugewiesen hat.

Meine Empfehlung für den Start ist FreeSSL. Es ermöglicht HTTPS und wird bei Hostpoint-Webhosting automatisch erneuert. Hostpoint empfiehlt Unternehmen alternativ OV/EV-Zertifikate. Diese ergänzen eine Prüfung der Unternehmensidentität; du kannst ein solches Zertifikat wählen, wenn dir diese zusätzliche Identitätsprüfung wichtig ist.

Die enthaltene .htaccess leitet HTTP auf HTTPS und www auf die Hauptadresse https://edasan.ch weiter. Bei Browser-Zertifikatswarnungen nicht einfach fortfahren: Domainzuordnung, DNS und Zertifikat prüfen. HTTPS schützt die Verbindung; die Sicherheit des Formulars und der Zugänge ist weiterhin separat wichtig.

## 4. Veröffentlichung und Kontaktformular testen

- https://edasan.ch öffnen: Design, Bilder und Navigation prüfen, auch auf dem Handy.
- https://edasan.ch/kontakt/ direkt öffnen und neu laden.
- http://edasan.ch und https://www.edasan.ch öffnen: beide sollen bei https://edasan.ch landen.
- Browser-Verbindungsinformationen öffnen: keine Zertifikatswarnung, gültiges Zertifikat für die aufgerufene Domain.
- Impressum und Datenschutz inhaltlich auf den tatsächlichen Firmenstand und verwendete Dienste prüfen.
- Eine nicht vorhandene Adresse wie /seite-gibt-es-nicht/ öffnen: Fehlerseite und HTTP-Status 404 prüfen, bei Bedarf mit Hostpoint-Support.
- https://edasan.ch/robots.txt und https://edasan.ch/sitemap.xml öffnen: Text/XML muss ausgeliefert werden, keine Anmeldeseite.

Für das Formular eine aktuelle von Hostpoint unterstützte Standard-PHP-Version verwenden. GET https://edasan.ch/api/contact.php sollte bei verfügbarem PHP-Mailversand {"directSend":true} anzeigen. Das allein bestätigt noch keine Zustellung.

Eine echte Testanfrage über /kontakt/ senden. Nachricht bei info@edasan.ch und im Spam-Ordner prüfen; testweise auf die Besucheradresse antworten. Domain und Postfach müssen korrekt zugeordnet sein. Der Handler verwendet info@edasan.ch als festen Absender und die Besucheradresse als Reply-To. Wenn nichts ankommt, Hostpoint nach PHP-mail()/Sendmail und den Absenderrichtlinien fragen. Nicht das Postfachpasswort im Webordner hinterlegen.

## 5. Google Search Console einrichten

Erst fortfahren, wenn die Website öffentlich unter HTTPS erreichbar ist.

1. https://search.google.com/search-console öffnen und mit deinem Google-Konto anmelden.
2. «Property hinzufügen» wählen.
3. Den Typ «Domain» auswählen und edasan.ch eingeben, ohne https:// und ohne Pfad.
4. Google zeigt einen DNS-Bestätigungseintrag wie google-site-verification=… an. Den tatsächlichen Eintrag vollständig kopieren.
5. Bei Hostpoint «Domains» → «DNS-Zone bearbeiten» für edasan.ch öffnen.
6. «Google Site Verification» auswählen, den von Google gelieferten Bestätigungseintrag eintragen und «Jetzt ausführen» klicken.
7. Zu Google zurückkehren und die Inhaberschaft bestätigen. Falls der Eintrag noch nicht sichtbar ist, später erneut bestätigen. Bestehende TXT-/Mail-Einträge nicht überschreiben und den Google-Eintrag auch nach erfolgreicher Bestätigung beibehalten.

Falls du externes DNS nutzt, den Eintrag beim zuständigen Anbieter anlegen. Bei manueller Anlage im Hostpoint-DNS-Editor: neuer TXT-Record, Name für die Hauptdomain leer lassen, Google-Eintrag im Textfeld einfügen, hinzufügen und mit «Jetzt ausführen» speichern.

## 6. Sitemap einreichen und Indexierung beantragen

1. In der bestätigten Search-Console-Property den Bereich «Sitemaps» öffnen.
2. https://edasan.ch/sitemap.xml einreichen. Wenn die Oberfläche bereits den Website-Präfix vorgibt, nur sitemap.xml eintragen.
3. Über «URL-Prüfung» die Adresse https://edasan.ch/ prüfen, bei Bedarf den Live-Test ausführen und «Indexierung beantragen» wählen.
4. Dasselbe für wichtige Seiten wie /services/, /software/, /ki-automatisierung/ und /kontakt/ durchführen.
5. In den folgenden Wochen den Bericht zur Seitenindexierung beobachten. Bei Ausschluss den konkreten Grund prüfen, etwa Weiterleitung, Crawling-Fehler oder noindex.

Google nennt wenige Tage bis mehrere Wochen für das Crawling. Eine Anmeldung garantiert weder die Aufnahme jeder Seite noch eine bestimmte Position. Wiederholte Anträge für dieselbe URL beschleunigen es nicht. Neue Leistungen und Seiten später auch in public/sitemap.xml ergänzen und mit einer passenden kanonischen Adresse versehen.

## 7. Sichtbarkeit später ausbauen

Für Edasan ist ergänzend ein Google Unternehmensprofil sinnvoll, wenn du Kunden persönlich betreust – an einem geeigneten Standort oder bei ihnen vor Ort. Reine Online-Unternehmen sind dafür nicht berechtigt. Im Profil korrekten Firmennamen, Kontaktangaben, Website, Leistungen und echte Fotos pflegen. https://business.google.com/

Inhaltlich zuerst klare Leistungsseiten, echte Projekterfahrung und konkrete Kundenvorteile pflegen. Keine erfundenen Referenzen oder Bewertungen verwenden. Die technische Indexierung ist die Grundlage; Sichtbarkeit entwickelt sich auch durch hilfreiche Inhalte und echte Bekanntheit.

## Spätere Website-Änderungen

Auf deinem Rechner mit Node.js und npm im Ordner source/:

```bash
npm ci
npm run build
```

Der neue Ordner out/ enthält die fertige Website. Vor jedem Update die live vorhandenen Dateien sichern. Dann den Inhalt von out/ hochladen, Unterseiten prüfen und bei geänderten Seiten bei Bedarf eine neue Indexierung anfragen. Nicht wahllos fremde Dateien im Webhosting löschen.

## Häufige Probleme

| Problem | Zuerst prüfen |
| --- | --- |
| Hostpoint-Platzhalter statt Website | Document-Root, Domainzuordnung, index.html und alte Startdateien |
| Website ohne Gestaltung/Bilder | _next/ und images/ vollständig übertragen, richtiger Zielordner |
| Unterseiten funktionieren nicht | Seitenordner vollständig übertragen, nicht nur index.html |
| HTTPS-Warnung | Zertifikat und DNS für exakt die aufgerufene Domain |
| Weiterleitungen funktionieren nicht | .htaccess vorhanden; Hostpoint-Konfiguration prüfen |
| Formularmeldung, aber keine E-Mail | PHP-Mailversand, Spam-Ordner, Absender-/Domainzuordnung |
| Google-Bestätigung schlägt fehl | Richtiger TXT-Eintrag beim zuständigen DNS-Anbieter; Änderungen gespeichert |
| Seite noch nicht bei Google | Search Console → URL-Prüfung/Seitenindexierung, Crawling-Zeit berücksichtigen |

## Offizielle Anleitungen

- Domain zuweisen: https://support.hostpoint.ch/de/produkte/webhosting/erste-schritte/wie-weise-ich-eine-domain-einem-webhosting-zu
- Upload: https://support.hostpoint.ch/de/produkte/webhosting/erste-schritte/wie-lade-ich-meine-website-hoch-via-ftp
- SFTP/FTPS: https://support.hostpoint.ch/de/produkte/webhosting/erste-schritte/wie-verbinde-ich-mich-via-ftp-sftp-auf-meinen-server
- FreeSSL aktivieren: https://support.hostpoint.ch/de/produkte/sicherheit/freessl/wie-erhalte-ich-ein-kostenloses-freessl-zertifikat
- Automatische Zertifikatserneuerung: https://support.hostpoint.ch/de/produkte/news/informationen-zu-ssl-zertifikaten/aenderung-ssl-zertifikate-ab-maerz-2026
- Google-Verifizierung bei Hostpoint: https://www.support.hostpoint.ch/de/technisches/dns/haeufig-gestellte-fragen/wie-bestaetige-ich-die-domain-inhaberschaft-fuer-google
- Google-Verifizierung: https://support.google.com/webmasters/answer/9008080?hl=de
- Google-Crawling: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- Google-Unternehmensprofil-Berechtigung: https://support.google.com/business/answer/13763036?hl=de
