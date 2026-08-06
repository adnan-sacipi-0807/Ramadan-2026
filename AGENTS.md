# Ramadan-2026 — Arbeitsregeln (AGENTS.md)

PWA mit den Gebetszeiten für Ramadan 2026 in Winterthur (Albanisch-Islamischer Verein Winterthur).
Zweisprachig Deutsch/Albanisch (Umschalter in der App). Öffentliches Repo.

⚠️ **main ist sofort live** (GitHub Pages liefert direkt von main aus) — deshalb ist die
Branch-Regel hier keine Formalität, sondern der einzige Schutz vor kaputten Live-Ständen.

## Wo dieses Projekt liegt (Stand 06.08.2026)
Arbeitsordner: **`C:\SaTechAI\privat\Ramadan-2026`**

Die Projekte sind seit dem 05.08.2026 nach **Auftraggeber** sortiert — `satechai\` (eigene Firma),
`digor\`, `jax-enx\`, `kunden\<name>\`, `amt-fuer-arbeit\`, `privat\`. Vorher lagen sie flach
direkt unter `C:\SaTechAI\`. **Pfade ohne Firmenordner sind tot**: nicht danach suchen und keinen
Ordner neu anlegen, sondern den Pfad oben verwenden.

## Aufbau (bewusst simpel — so lassen)
- **Eine Datei ist die App:** `index.html` (Styles und JavaScript inline). Kein Build,
  kein Framework, keine Dependencies — das bleibt so.
- `sw.js` = Service Worker (Offline-Cache) · `manifest.json` + Icons = PWA-Installierbarkeit.
- Prüfen vor Abgabe: `index.html` im Browser öffnen — Countdown, Kalender, Sprachumschalter
  und beide Sprachen müssen funktionieren; keine Konsolen-Fehler.

## Git-Spielregeln (Team-Standard)
- Du arbeitest auf Branch `codex/<kurzname>` und öffnest einen **Pull Request gegen main**.
- NIE direkt auf main pushen (= sofort live!), nie selbst mergen, nie force-pushen.
- Im PR-Text immer der Rapport: **Was gemacht / Warum so / Wie getestet / Annahmen / Offene Punkte.**

## Service-Worker-Falle
Bei **jeder** Änderung an ausgelieferten Dateien (`index.html`, `manifest.json`, Icons) muss die
Cache-Version in `sw.js` hochgezählt werden — sonst sehen bereits installierte PWAs die Änderung
nie. Das gehört in denselben Commit.

## Harte Grenzen
- **Gebetszeiten-Daten nie ändern** ohne ausdrücklichen Auftrag mit genannter Quelle (Verein/Takvim).
  Falsche Zeiten sind hier ein echter Schaden für echte Menschen — im Zweifel: Rapport statt Änderung.
- Religiöse Inhalte respektvoll und korrekt behandeln; Formulierungen im bestehenden Ton halten.
- Kein Tracking, keine Analytics, keine Datensammlung, keine Accounts — die App bleibt anonym nutzbar.
- Keine neuen externen Dienste oder Dependencies ohne ausdrücklichen Auftrag.
- Keine Secrets: Dieses Projekt hat keine und braucht keine. Wirkt eine Aufgabe anders → STOPP,
  im Rapport melden.

## Konventionen
- Beide Sprachvarianten (Deutsch UND Albanisch) immer gemeinsam pflegen — nie nur eine.
- Deutsch in Schweizer Orthografie (kein ß).
- Kleine, nachvollziehbare Commits mit deutschen Messages.
- Bei Unklarheit: sinnvolle Annahme treffen und im Rapport nennen — nicht raten und verschweigen.
