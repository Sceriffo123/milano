# UI Kit — Basta Abusivismo (web-app a scene)

Ricreazione interattiva della web-app istituzionale URITAXI · FILT CGIL,
fedele all'originale [`Sceriffo123/milano`](https://github.com/Sceriffo123/milano)
(vanilla HTML/CSS/JS, autonoma e offline).

## File
- `index.html` — pagina: overlay d'avvio, stage, HUD, hint. È anche il punto di
  partenza (`@startingPoint`) e la card della Design System tab.
- `kit.css` — framing della web-app (scene, HUD, overlay). Usa i token di marca
  via `../../styles.css`.
- `scenes.js` — `window.SCENES`: array di scene `{ id, theme, title, html }`,
  con le classi-motivo (`.heavy`, `.num-giant`, `.card`, `.band`, `.flow`…).
- `app.js` — motore: costruzione scene, navigazione, contatori, modalità.

## Interazione
- **Overlay d'avvio:** scelta tra **Relatore** (navighi tu) e **Vetrina** (loop).
- **Navigazione:** `←` `→` o spazio; clic sulla metà destra/sinistra dello schermo.
- **`V`** commuta Relatore/Vetrina · **`F`** schermo intero · **`Home`** prima scena.
- **HUD** in basso a destra: modalità, timer dell'intervento, posizione.
- **Barra di avanzamento** rossa in alto.

## Note di robustezza
Le animazioni d'ingresso animano **solo `transform`** (l'opacità resta 1) e i
contatori riportano il valore finale già nell'HTML: così il contenuto è sempre
leggibile anche in stampa/PDF e negli ambienti che mettono in pausa le animazioni.
È lo stesso accorgimento consigliato per i deck.

## Differenze dall'originale
Sottoinsieme di 8 scene rappresentative (il manifesto completo ne ha 18 più gli
approfondimenti generati dai JSON). Esclusi: note relatore, indice, lightbox dei
ritagli, deep-dive da `assets/*.json`. Per la versione integrale e i dati,
vedere il repository originale.
