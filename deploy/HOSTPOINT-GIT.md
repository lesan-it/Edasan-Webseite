# Hostpoint holt die Website selbst aus Git

Repository: https://github.com/lesan-it/Edasan-Webseite

GitHub baut die Website bei Änderungen an main und stellt den geprüften Export in production bereit. Hostpoint benötigt nur Git und Standard-Systemwerkzeuge; Node.js bleibt auf GitHub. Die Verbindung ist noch nicht eingerichtet, solange die folgenden Schritte auf deinem Hosting fehlen.

## 1. Hostpoint vorbereiten

- Webhosting öffnen, Domain edasan.ch und www.edasan.ch korrekt zuordnen.
- Unter Websites das tatsächliche Document-Root notieren.
- Unter Advanced → SSH-Zugang SSH aktivieren.
- Mit dem Hosting-Benutzernamen und deinem SSH-Zugang verbinden. Der Hosting-Login unterscheidet sich von der Hostpoint ID.
- In der SSH-Konsole prüfen:

```sh
command -v git
command -v tar
command -v sha256sum || command -v sha256 || test -x /sbin/sha256
```

Auf FreeBSD liegt sha256 üblicherweise unter /sbin/sha256. Das Skript nimmt /sbin deshalb in seinen eigenen Suchpfad auf; unter Linux akzeptiert es sha256sum. Falls Git fehlt, zuerst Hostpoint die Verfügbarkeit/Installation bestätigen lassen. Nicht schon den Cronjob aktivieren.

## 2. Installation ausserhalb der öffentlich erreichbaren Website

In deiner Hostpoint-SSH-Konsole:

```sh
mkdir -p "$HOME/bin/edasan"
git clone --depth=1 https://github.com/lesan-it/Edasan-Webseite.git "$HOME/edasan-source"
cp "$HOME/edasan-source/deploy/hostpoint-pull.sh" "$HOME/bin/edasan/hostpoint-pull.sh"
cp "$HOME/edasan-source/deploy/hostpoint.conf.example" "$HOME/bin/edasan/hostpoint.conf"
chmod 600 "$HOME/bin/edasan/hostpoint.conf"
```

Falls edasan-source bereits existiert, die vorhandene Installation prüfen statt den Ordner zu überschreiben. Der Source-Clone ist nur zur einmaligen Installation des Skripts erforderlich. Später holt das Skript den fertigen production-Branch.

## 3. Private Konfiguration anpassen

Die Datei ~/bin/edasan/hostpoint.conf mit einem Editor öffnen. Die tatsächlichen absoluten Pfade aus deinem Hosting eintragen:

```sh
EDASAN_REPOSITORY='https://github.com/lesan-it/Edasan-Webseite.git'
EDASAN_BRANCH='production'
EDASAN_DEPLOY_ROOT='/home/DEIN_HOSTING_BENUTZER/edasan-deploy'
EDASAN_WEB_ROOT='/home/DEIN_HOSTING_BENUTZER/www/edasan.ch'
EDASAN_GIT_BIN='/usr/local/bin/git'
EDASAN_ALLOW_INITIAL_MIGRATION='no'
```

EDASAN_GIT_BIN durch das Ergebnis von command -v git ersetzen. EDASAN_WEB_ROOT muss exakt dem eigenen Document-Root entsprechen. Nicht pauschal das Verzeichnis www oder dein Home-Verzeichnis verwenden. Der übergeordnete Web-Ordner muss existieren. EDASAN_DEPLOY_ROOT liegt ausserhalb des öffentlich erreichbaren Web-Ordners.

Das Repository ist aktuell öffentlich. Deshalb kann Hostpoint es über HTTPS ohne GitHub-Passwort lesen. Wenn du es später auf privat umstellst, einen eigenen Deploy-Key mit ausschliesslich Leserechten auf Hostpoint einrichten, den öffentlichen Schlüssel unter GitHub → Settings → Deploy keys hinterlegen und die Repository-Adresse auf git@github.com:lesan-it/Edasan-Webseite.git ändern. Den GitHub-Hostschlüssel anhand der offiziellen Fingerprints prüfen. Keine Zugangstokens in die URL schreiben.

## 4. Erste Übernahme bewusst durchführen

GitHub → Actions öffnen. «Website bauen und freigeben» muss erfolgreich abgeschlossen sein; production muss vorhanden sein.

Vorhandene Webdateien sichern und prüfen, dass EDASAN_WEB_ROOT ausschliesslich diese Edasan-Website enthält. Falls der Zielordner bereits existiert (auch bei einem Hostpoint-Platzhalter), in der privaten Konfiguration EDASAN_ALLOW_INITIAL_MIGRATION='yes' setzen. Das Skript verschiebt den bisherigen Ordner bei der ersten Übernahme als Sicherung nach edasan-deploy/backups/ und ersetzt ihn durch einen Link auf die geprüfte Version. Wenn bereits ein fremder Link besteht, stoppt das Skript.

Dann:

```sh
/bin/sh "$HOME/bin/edasan/hostpoint-pull.sh" "$HOME/bin/edasan/hostpoint.conf"
```

Bei Erfolg erscheint «Website activated» mit der Commit-ID. Die ursprünglichen Dateien werden nicht gelöscht. Nach der ersten Übernahme die Einstellung wieder auf 'no' setzen; spätere Updates über den verwalteten Link funktionieren trotzdem.

## 5. Live prüfen, bevor Automatik startet

- https://edasan.ch und eine Unterseite direkt öffnen und neu laden.
- Bilder und Navigation am Handy prüfen.
- HTTP und www sollen auf https://edasan.ch weiterleiten.
- FreeSSL muss für beide Namen gültig sein.
- Formular absenden und Empfang bei info@edasan.ch prüfen, inklusive Spam-Ordner.
- https://edasan.ch/sitemap.xml und /robots.txt öffnen.

Falls der Webserver den Dateisystem-Link nicht ausliefert, den Cronjob noch nicht aktivieren und Hostpoint das Document-Root/FollowSymLinks prüfen lassen. Das Skript wurde auf einer isolierten Linux-Testumgebung geprüft; die FreeBSD-Linkumschaltung und der tatsächliche Hostpoint-Webserver müssen hier vor Ort bestätigt werden.

Bei einer ersten fehlgeschlagenen Webserver-Auslieferung kann die im Ordner edasan-deploy/backups/ gesicherte ursprüngliche Website wiederhergestellt werden. Den aktiven Link dabei mit unlink entfernen, nicht blind einen Verzeichnisbaum löschen. Falls du unsicher bist, zuerst den tatsächlichen Link und den Sicherungspfad prüfen lassen.

## 6. Automatisches Abholen einrichten

Bei Hostpoint → Webhosting → Advanced → Cronjobs Manager einen Cronjob erstellen:

| Feld | Wert |
| --- | --- |
| Minute | */5 |
| Stunde | * |
| Tag | * |
| Monat | * |
| Wochentag | * |
| Befehl | /bin/sh /home/DEIN_HOSTING_BENUTZER/bin/edasan/hostpoint-pull.sh /home/DEIN_HOSTING_BENUTZER/bin/edasan/hostpoint.conf |

Die Beispielpfade durch deine tatsächlichen Pfade ersetzen. Eine Adresse für Cron-Benachrichtigungen hinterlegen. Bei unverändertem Stand bleibt das Skript still; Aktivierungen und Fehler erzeugen eine Ausgabe. Keine pauschale Umleitung nach /dev/null: Probleme sollen sichtbar bleiben.

Nun wird ein erfolgreich freigegebener Build beim nächsten Cronlauf abgeholt. Wenn Download oder Prüfsummen fehlschlagen, bleibt die aktive Version erhalten. Es wird kein Node.js-Server auf Hostpoint gestartet und kein Kontakt mit ChatGPT für den laufenden Betrieb benötigt.

## 7. Später weiterentwickeln

1. Quellcode auf main oder einem Entwicklungsbranch ändern.
2. Tests/Build prüfen; bei Branches den geprüften Pull Request nach main übernehmen.
3. GitHub Actions baut den Export und aktualisiert production.
4. Hostpoint holt den neuen Stand innerhalb des eingestellten Intervalls.

Der PHP-Handler, .htaccess, robots.txt und sitemap.xml werden mit veröffentlicht. Neue Seiten in der Sitemap ergänzen. Zugangsdaten bleiben auf dem Hosting.

## 8. Zur vorherigen Version zurück

Zuerst den Cronjob pausieren, sonst holt er die neuere production-Version erneut. Dann:

```sh
/bin/sh "$HOME/bin/edasan/hostpoint-pull.sh" "$HOME/bin/edasan/hostpoint.conf" --rollback
```

Das aktiviert die vorherige gespeicherte Version. Anschliessend die Ursache auf main korrigieren, erfolgreichen Build abwarten und den Cronjob wieder aktivieren. Frühere Versionen bleiben im privaten releases-Ordner; später gezielt alte Versionen entfernen, aktive und vorherige Version immer behalten.

Ein durch Abbruch zurückgebliebener Ordner deploy.lock blockiert weitere Durchläufe. Vor dem Entfernen prüfen, dass kein Deployment mehr läuft.

## Noch nötige Angaben für den Anschluss

- Hostpoint-Hosting-Benutzername und SSH-Servername
- tatsächliches Document-Root
- Ergebnis von command -v git
- Bestätigung, dass die erste Übernahme und die Live-Tests erfolgreich waren

Passwörter, private Schlüssel und Tokens nicht im Chat senden. Die benötigten Zugangsdaten direkt auf dem eigenen Rechner beziehungsweise im Hostpoint-Konto hinterlegen.

## Offizielle Dokumentation

- SSH: https://support.hostpoint.ch/de/produkte/webhosting/haeufig-gestellte-fragen/wie-kann-ich-ssh-einrichten-und-verwenden
- Cronjobs: https://support.hostpoint.ch/de/produkte/webhosting/haeufig-gestellte-fragen/cronjobs-einrichten
- GitHub Deploy-Keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys
