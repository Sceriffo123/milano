# URITAXI · FILT CGIL — Design System

Sistema di design per la comunicazione istituzionale di **URITAXI · FILT CGIL**, la
rappresentanza sindacale del settore taxi. Lo stile è quello del **manifesto
sindacale moderno**: asciutto, ad alto impatto, autorevole. Niente clip-art,
niente foto stock generiche. Pensato per **presentazioni pubbliche e web-app
proiettate in assemblea**, sempre in **lingua italiana**.

> «Vi mostriamo le carte, giudicate voi.» Ogni numero e ogni sentenza è reale e
> verificabile, mai arrotondato o inventato.

---

## Contesto e prodotti

Il sistema nasce dalla web-app **"Basta Abusivismo"** (Milano, 10 giugno 2026):
una presentazione a scene, autonoma e offline, sul contrasto all'abusivismo nel
trasporto pubblico non di linea. La web-app ha due modalità — **Relatore**
(navigazione manuale) e **Vetrina** (loop automatico per lo schermo in sala) — e
funziona anche da `file://` grazie a dati di fallback inline.

Prodotti rappresentati in questo sistema:

- **Deck istituzionale** (`slides/`) — i tipi di scena del manifesto: titolo,
  anno-gigante, citazione emotiva, numeri, macchina del metodo, sentenze,
  registro, proposta finale.
- **UI kit web-app** (`ui_kits/basta-abusivismo/`) — la ricreazione interattiva
  della presentazione a scene, con overlay d'avvio, HUD, modalità Relatore/Vetrina.

### Fonti

- **Repository GitHub:** [`Sceriffo123/milano`](https://github.com/Sceriffo123/milano)
  — la web-app originale (`index.html` + dati in `assets/*.json`). Il lettore con
  accesso può esplorarla per ricostruire fedelmente scene, dati e regole di
  contenuto. È la **fonte di verità** per la palette, i motivi e il tono.
- Palette, tipografia e regole di contenuto provengono dal volantino ufficiale e
  dalle indicazioni del committente (vedi sotto).

---

## CONTENT FUNDAMENTALS — come si scrive

Il tono è **istituzionale, sobrio, mai trionfalistico**. Si argomenta con atti e
sentenze, non con slogan. La lingua è **italiana**, senza anglicismi (si scrive
*noleggio con conducente*, non *car rental*; *registro*, non *log*).

- **Persona:** prima persona plurale sobria ("il nostro metodo", "dove lavoriamo")
  e seconda persona verso la platea ("segnalateci", "giudicate voi"). Mai "io"
  autocelebrativo.
- **Casing:** titoli pesantissimi spesso in **MAIUSCOLO** o in tondo asciutto;
  occhielli (kicker) e chip sempre in **MAIUSCOLO spaziato**. Il corpo è in tondo
  normale, con il **grassetto rosso** usato per le aperture di frase.
- **Asciuttezza:** poche parole per scena. Frasi brevi, spesso nominali
  ("Non parole: revoche.", "Non si improvvisa.", "Da soli no. Insieme sì.").
- **Le citazioni** si riportano fra virgolette caporali « », con la fonte
  esplicita ("— TAR Toscana 263/2023, pag. 4").
- **I numeri** non si arrotondano mai a voce: si mostra l'elenco e si rimanda alla
  verifica atto per atto ("documentati caso per caso", "verificabili").
- **Emoji:** **non si usano.** Gli unici glifi ammessi sono frecce di navigazione
  e i simboli di controllo (▶ ⟳ ↓ ↑) e le virgolette caporali.

### Regole di contenuto (vincolanti)

- **Zero nomi di avversari.** Nessuna polemica verso sindacati o cooperative.
- **Nessun autoelogio, nessun trionfalismo.** Si espongono i fatti.
- **Ogni numero e ogni sentenza è reale e verificabile.** Mai arrotondare o
  inventare. Il totale delle revoche si calcola dai dati, non si scrive a mano.

Esempi di voce (dal manifesto originale): *"Protocolli, PEC, giurisprudenza. Non
proteste."* · *"La competenza non si compra. Si accumula."* · *"Cade la prima
pedina, cadono le altre. Non è fortuna: è il metodo."*

---

## VISUAL FOUNDATIONS — i fondamenti visivi

### Palette (obbligatoria)
Solo quattro colori di marca. **Non introdurne altri.**

| Ruolo | Token | Hex |
|---|---|---|
| Dominante (scene scure, testo su chiaro) | `--nero` | `#1A1A1A` |
| Accento unico (barre, numeri, chip, band) | `--rosso` | `#C8102E` |
| Scene chiare, testo su scuro | `--panna` | `#F7F5F2` |
| Superfici card su scene chiare | `--bianco` | `#FFFFFF` |

Neutri di servizio (derivati, non di marca): grigio `#6B6B6B`, grigio-su-scuro
`#B9B4AC`, carta scura `#232323`, rosso scuro `#7D0A1D`.

### Tipografia
- **Titoli:** sans **pesantissimo** — `Archivo Black` (sostituto webfont di
  *Arial Black*), peso 900, `letter-spacing: -0.01em`. Grandi: 40pt+ per gli H1.
- **Corpo:** sans pulito — `Archivo` (sostituto webfont di *Helvetica Neue*).
- **Numeri giganti** e **contatori** sono in carattere pesante, rosso: il dato
  diventa immagine.

### Motivi cardine
- **Barra verticale rossa 8px** a sinistra di ogni card (il segno di
  riconoscimento). Variante: **barra superiore 6px** sui blocchi della "macchina".
- **Numeri giganti rossi** (anni, cifre-chiave).
- **Scene scure** (`#1A1A1A`) per i momenti emotivi e di racconto; **scene chiare**
  (`#F7F5F2`) per i contenuti verificabili (dati, sentenze, registri).
- **Banda rossa** piena per l'affermazione-chiave di una scena (una sola per scena).

### Sfondi, superfici, bordi
- Sfondi **a tinta piatta** (nero o panna): **nessun gradiente, nessuna texture,
  nessuna immagine decorativa**. Il fondo dello stage è nero (letterbox).
- **Card:** sfondo bianco (o `#232323` su scene scure), barra rossa a sinistra,
  raggio **4px**, ombra solenne `0 18px 50px rgba(0,0,0,.18)`.
- **Raggi minimi:** chip 3px, card 4px, pill 20px (solo per HUD). Niente angoli
  morbidi: il tono è istituzionale.

### Animazione
- Ritmo **solenne**: gli elementi entrano con dissolvenza + lieve salita
  (`translateY(18px)` → 0) in **0.7s**, sfasati di **0.18s** (`--i`).
- Dissolvenza tra scene in **0.55s**. Easing morbido in uscita
  (`cubic-bezier(.22,.61,.36,1)`). Nessun rimbalzo, nessun loop decorativo.
- La timeline e la linea-domino animano una volta sola, alla comparsa della scena.
- Si rispetta sempre `prefers-reduced-motion` e la stampa (`@media print` mostra
  ogni scena statica, senza animazioni).

### Stati interattivi
- **Hover** pulsanti: leggera riduzione di luminosità (`brightness(.92)`), nessun
  cambio di tinta brand.
- **Press:** micro-traslazione di 1px verso il basso.
- **Hover** voci d'indice / link: il testo passa al **rosso**.

### Layout
- Padding di scena ampio per la proiezione: `6vh 8vw`.
- Griglie a 2/3/4 colonne con gutter in `vw`; collassano a 1 colonna sotto 780px.
- Elementi fissi: barra di avanzamento rossa in alto (4px), HUD in basso a destra,
  hint dei comandi in basso a sinistra.

---

## ICONOGRAFIA

Il sistema è **deliberatamente privo di icone**. L'identità è **tipografica e
cromatica**: la barra rossa, i numeri giganti, la banda. Questo è coerente col
tono istituzionale e con l'assenza di clip-art.

- **Nessun font di icone, nessuno sprite SVG, nessuna icona PNG** nel progetto
  originale (`assets/img/` contiene solo ritagli di sentenze/stampa, da inserire a
  cura del committente — non presenti nel repo).
- **Nessuna emoji.**
- **Glifi Unicode** come unici "segni" ammessi, usati con parsimonia:
  - navigazione/controlli: `▶` (avvio), `⟳` (loop/vetrina), `←` `→` `↓` `↑`;
  - virgolette caporali `«` `»` per le citazioni;
  - separatore `·` (punto medio) negli occhielli e nelle stripe di credito.
- **Loghi:** l'unico "logo" è il **wordmark testuale** `URITAXI · FILT CGIL`
  (e le sigle organizzatrici), composto nel carattere pesante. Non esiste un
  simbolo grafico: vedi `assets/logo-wordmark.html`.

Se in futuro servisse un set di icone, scegliere un set lineare sobrio (es.
tratto 1.5–2px) e tinta neutra/rossa — ma valutare sempre se l'icona aggiunge
qualcosa: il sistema preferisce il testo.

---

## Indice del progetto

**Foundations**
- `styles.css` — punto d'ingresso unico (solo `@import`).
- `tokens/colors.css` · `tokens/typography.css` · `tokens/spacing.css` —
  variabili CSS (base + alias semantici).
- `tokens/fonts.css` — webfont (Archivo Black / Archivo).
- `tokens/base.css` — reset e classi-motivo (`.heavy`, `.kicker`, `.num-giant`…).
- `guidelines/*.card.html` — specimen delle fondamenta (Colors, Type, Spacing).

**Componenti** (`components/`)
- *core* — `Button`, `Chip`, `Kicker`.
- *blocks* — `Card`, `Band`, `Stat`, `Timeline`, `FlowSteps`.
- Ogni componente ha `.jsx`, `.d.ts`, `.prompt.md`; ogni cartella una `*.card.html`.

**Slides** (`slides/`) — tipi di scena del deck istituzionale.

**UI kit** (`ui_kits/basta-abusivismo/`) — ricreazione interattiva della web-app.

**Presentazione cinematografica** (`Basta Abusivismo — Presentazione.html` +
`presentations/cinematic/`) — versione premium e cinematografica del manifesto
(15 scene, deck a schermo intero con `deck-stage`, immagini drag-and-drop,
effetto domino animato). ⚠️ Usa una **palette tri-sindacale estesa** (blu URITAXI
· rosso FILT CGIL · verde UGL) definita *localmente* in `presentations/cinematic/deck.css`,
**senza** modificare i token di marca: è una deroga voluta dal committente per
questa presentazione, non un cambio del sistema. Vedi note sotto.

**Assets** (`assets/`) — wordmark testuale.

**Skill** — `SKILL.md` rende il sistema utilizzabile come Agent Skill.

---

## Sostituzioni & note

- **Font:** la web-app originale usa *Arial Black* (titoli) e *Helvetica Neue /
  Arial* (corpo), font di sistema. Per robustezza web sono stati adottati i
  sostituti **Archivo Black** e **Archivo** (Google Fonts), caricati via
  `tokens/fonts.css`. I fallback di sistema restano attivi offline.
  ⚠️ *Se disponete dei file font originali (Arial Black / Helvetica Neue) o
  preferite altri sostituti, segnalatelo e li integro.*
- **Iconografia/loghi:** il repo non contiene file logo o icone; l'identità è
  testuale. Se esiste un marchio grafico ufficiale, fornitelo e lo aggiungo.
- **Palette cinematografica (deroga):** la presentazione premium adotta blu
  (URITAXI), rosso (FILT CGIL) e verde (UGL) con gradienti e fondi scuri, come
  richiesto. È confinata a `presentations/cinematic/deck.css`: i token di marca
  in `tokens/colors.css` restano invariati (nero/rosso/panna). Da decidere se in
  futuro promuovere questa palette a sistema o tenerla solo per gli eventi.
- **Immagini della presentazione:** non potendo reperire foto dal web, le scene
  cinematografiche usano **slot drag-and-drop** (`<image-slot>`): trascinate le
  vostre foto (taxi notturni, assemblee, tribunali, Milano/Firenze, QR adesione)
  e restano salvate. Finché sono vuoti, gli slot mostrano un fondo scuro elegante.
- **Nome da verificare:** ho riportato «dott.ssa **Jacinta Bucchi**» come nella
  vostra correzione; la web-app originale scriveva «Giacinta». Confermatemi la
  grafia esatta.
