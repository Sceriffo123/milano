# Basta Abusivismo — web-app (Milano, 10 giugno 2026)

Web-app a slide, autonoma e offline, per l'intervento "Basta Abusivismo".
Un solo file (`index.html`) + dati in `assets/`. Nessuna dipendenza esterna.

## Due modalità
- **Relatore** — navighi tu (← → scene, ↓ ↑ approfondimenti, `N` note, `F` fullscreen, `Esc` indice).
- **Vetrina (loop)** — scorre da sola in loop, ideale per lo schermo in sala o sul VPS.

## Avvio rapido in locale
- **Doppio clic** su `index.html` → funziona subito (i dati di dettaglio usano i fallback inline).
- Per caricare i file `assets/*.json` serve un server locale (il browser blocca `fetch` da `file://`):
  ```bash
  cd webapp
  python -m http.server 8080
  # poi apri http://localhost:8080
  ```

## Pubblicare su GitHub Pages
1. Crea un repository e carica il contenuto di questa cartella (`index.html`, `assets/`, `.nojekyll`).
2. Su GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, cartella `/ (root)`.
3. Dopo 1-2 minuti la app è online all'URL indicato da Pages.

## Pubblicare dal Codespace (browser)
Nel terminale del Codespace, dalla cartella che contiene `index.html`:
```bash
python -m http.server 8080
```
VS Code/Codespaces propone "Apri nel browser" sulla porta 8080. Rendi la porta **Public** per condividerla.

## Pubblicare su VPS (nginx)
Copia la cartella sul server e punta la `root` di nginx su di essa:
```nginx
server {
  listen 80;
  server_name demo.tuodominio.it;
  root /var/www/basta-abusivismo;   # cartella con index.html
  index index.html;
}
```
Per la modalità Vetrina h24, basta aprire l'URL a schermo intero (`F`) e scegliere "Vetrina".

## Dati e personalizzazione
Tutti i contenuti variabili sono in `assets/`:
- `dati.json` — numeri (comuni, atti, procedimenti). **Confermati con Marco il 05/06/2026.**
- `revoche.json` — elenco revoche/decadenze caso per caso. **Il totale mostrato è il numero di righe di questo file** (così numero ed elenco sono sempre coerenti).
- `sentenze.json` — pronunce (organo, numero, oggetto, massima, ritaglio). Campo `massima_breve` vuoto → mostra "[estratto da inserire]".
- `norme.json` — trafiletti di norme. `stampa.json` — ritagli stampa.
- `assets/img/` — immagini e ritagli (sentenze, articoli, QR). Nomi attesi nei JSON (campo `immagine`). Se un file manca, la app mostra un placeholder etichettato (non si rompe).

### File immagine attesi in `assets/img/`
- `messaggero-2014.jpg` — ritaglio Il Messaggero 15.05.2014
- `cds-9672-2023.jpg`, `cortecost-56-2020.jpg`, `cortecost-163-2025.jpg`
- `tar-535-2021.jpg`, `tar-337-2022.jpg`, `tar-339-2022.jpg`, `tar-263-2023-pag4.jpg`,
  `tar-740-2025.jpg`, `tar-396-2026.jpg`, `tar-875-2026.jpg`, `tar-888-2026.jpg`,
  `tar-903-2026.jpg`, `tar-1104-2026.jpg`
- `trib-milano-8359-2015.jpg`, `tar-lombardia-860-2016.jpg`
- `qr-adesione.png` — QR del modulo di adesione

## Backup statico
Da browser: **Stampa → Salva come PDF**. Il CSS `@media print` rende ogni scena come pagina leggibile, senza animazioni: backup in caso di problemi tecnici in sala.

## Note
- I numeri sono verificabili atto per atto: non modificarli "a occhio". Le revoche si aggiornano aggiungendo righe a `revoche.json`.
- Regole di contenuto (zero nomi avversari, zero polemica con gli organizzatori, niente autoelogio) sono descritte nel prompt `prompt_claude_designer_v3.md`.
