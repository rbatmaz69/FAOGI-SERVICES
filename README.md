# FAOGI SERVICES – Website

Marketing-Website mit interaktivem Service-Rechner für **FAOGI SERVICES**
(Hausmeisterservice, Gartenpflege, Winterdienst & Außenanlagenpflege).

## Tech-Stack

- **React 18 + TypeScript** (UI)
- **Vite 6** (Build → statische Dateien)
- **Tailwind CSS 4** (Styling)
- **lucide-react** (Icons), **sonner** (Benachrichtigungen)
- **PHP** (`sendmail.php`) für den Formularversand – nativ auf all-inkl.com

Der **Rechner** (`src/app/components/ServiceConfigurator.tsx`) läuft komplett im
Browser; es wird kein Server für die Preisberechnung benötigt. Lediglich der
Versand der Anfragen per E-Mail nutzt ein kleines PHP-Skript.

## Lokale Entwicklung

Voraussetzung: Node.js ≥ 18.

```bash
npm install      # Abhängigkeiten installieren
npm run dev      # Dev-Server auf http://localhost:5173
npm run build    # Produktions-Build nach dist/
npm run preview  # Build lokal vorschauen
```

> Hinweis: Der Formularversand (`sendmail.php`) funktioniert **nur auf einem
> PHP-fähigen Server** (also auf all-inkl), nicht im Vite-Dev-Server. Lokal
> kann man den Build mit PHP testen:
>
> ```bash
> npm run build
> php -S localhost:8000 -t dist   # Seite inkl. PHP unter http://localhost:8000
> ```

## Deployment auf all-inkl.com

1. **Build erstellen:**
   ```bash
   npm install
   npm run build
   ```
   Ergebnis liegt im Ordner `dist/` (enthält `index.html`, Assets,
   `sendmail.php`, `.htaccess`, `favicon.svg`).

2. **`sendmail.php` konfigurieren:** In `public/sendmail.php` (bzw. nach dem
   Build in `dist/sendmail.php`) oben die beiden Adressen eintragen:
   - `$EMPFAENGER` – Postfach, an das Anfragen gehen sollen
   - `$ABSENDER` – Absenderadresse **auf der eigenen Domain**
     (all-inkl lehnt fremde Absender ab, z.B. `noreply@faogi-services.de`)

3. **Upload:** Den **gesamten Inhalt** von `dist/` per FTP/SFTP in das
   Webspace-Verzeichnis von all-inkl laden (üblicherweise das Document-Root der
   Domain). Dateien wie `.htaccess` nicht vergessen (versteckte Dateien im
   FTP-Client einblenden).

4. **Testen:** Domain im Browser öffnen, Rechner durchklicken und eine
   Testanfrage absenden – die E-Mail sollte am `$EMPFAENGER`-Postfach ankommen.

## Offene TODOs vor dem Live-Gang

- [ ] Echte Kontaktdaten ersetzen (Platzhalter: `+49 123 456 78`,
      `info@faogi-services.de`, `Musterstraße 123`) – in
      `Header.tsx`, `Footer.tsx`, `Contact.tsx`, `StickyCallButton.tsx`.
- [ ] `sendmail.php`: `$EMPFAENGER` und `$ABSENDER` setzen.
- [ ] **Impressum & Datenschutzerklärung** ergänzen (in DE rechtlich Pflicht) –
      Platzhalter-Links im Footer (`#impressum`, `#datenschutz`).
- [ ] Hero-/About-Bilder: aktuell Unsplash-URLs. Für Produktion eigene Bilder
      unter `public/images/` ablegen und Pfade in `Hero.tsx` / `About.tsx`
      eintragen (Performance & DSGVO).
- [ ] Echte Karte im Kontaktbereich (`Contact.tsx`, derzeit Platzhalter).
- [ ] Logo/Favicon ggf. durch finales Markenlogo ersetzen (`public/favicon.svg`).
