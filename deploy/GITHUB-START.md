# GitHub und Hostpoint starten

Der Quellcode der Website und die Deployment-Konfiguration liegen in `lesan-it/Edasan-Webseite`. Änderungen erfolgen im Branch `main`.

## GitHub-Build prüfen

Unter https://github.com/lesan-it/Edasan-Webseite/actions den Workflow «Website bauen und freigeben» öffnen. Er baut und prüft die Website sowie das PHP-Kontaktformular. Nach einem erfolgreichen Lauf enthält der Branch `production` den fertigen Export mit Prüfsummen. Die Datei `.build-info.json` in diesem Branch nennt den zugehörigen Quellcode-Commit.

Ein erfolgreicher GitHub-Build veröffentlicht die Website noch nicht bei Hostpoint. Dafür muss die Verbindung auf dem Hosting einmal eingerichtet werden.

## Hostpoint anschliessen

Weiter mit [HOSTPOINT-GIT.md](HOSTPOINT-GIT.md). Dafür werden SSH-Servername, Hosting-Benutzername und der genaue Document-Root aus dem Hostpoint-Konto benötigt. Keine Passwörter oder privaten Schlüssel im Chat senden.

Nach Einrichtung und Prüfung des Hostpoint-Cronjobs genügt künftig eine geprüfte Änderung in `main`: GitHub baut und Hostpoint holt `production`. Weitere ZIP-Uploads sind dann nicht nötig. Vor dem Onlinegang HTTPS, Weiterleitungen und eine echte Formularzustellung auf dem Hosting testen; danach Google Search Console gemäss [README-DEPLOY.md](../README-DEPLOY.md) einrichten.

## Lokal weiterentwickeln

```sh
git clone https://github.com/lesan-it/Edasan-Webseite.git
cd Edasan-Webseite
npm ci
npm run dev
```

Vor einem Push `npm test` ausführen. Bei GitHub über die vom Git-Programm angebotene Anmeldung authentifizieren. Keine Zugangsdaten in die Remote-URL schreiben und keine alten ZIP- oder Bundle-Stände mit `--force` übertragen.
