# PROMPT PER CLAUDE DESIGNER — Web-app "Basta Abusivismo", Milano 10 giugno 2026 (v3 — completo)

> Evoluzione del v2. Resta una **web-app autonoma in un singolo file HTML**, navigabile dal relatore e capace di girare in **loop circolare** come vetrina. Novità del v3:
> 1. **Rotazione lunga**: oltre alle scene narrative, una serie di **schede di approfondimento** (una per sentenza, una per revoca, norme, stampa) che riempiono la modalità Vetrina e reggono tempi lunghi.
> 2. **Nuova scena "L'effetto deterrenza"**: il territorio reso ostico all'abusivo — "non conviene più investirci".
> 3. **Gestione rigorosa dei numeri**: tutti i dati quantitativi sono marcati `[DA CONFERMARE]` finché Marco non valida un unico set. La forza si costruisce sul dettaglio verificabile, non sull'aggettivo.

Copia tutto il testo da qui in fondo e incollalo a Claude Designer.

---

Costruisci una **web-app a slide (single-page)** di alto impatto visivo per un intervento pubblico di circa **un'ora e mezza**. Segui ALLA LETTERA architettura tecnica, contenuti, regole e indicazioni di animazione. Non inventare dati, nomi o sentenze: usa solo quelli forniti. Dove un dato è marcato `[DA CONFERMARE]` o un materiale manca, inserisci un **placeholder chiaramente etichettato** (mai un valore inventato).

## 0. ARCHITETTURA TECNICA (vincolante)

- **DUE CONTESTI D'USO da supportare entrambi nello stesso file:**
  - **(A) PROIEZIONE IN SALA** — schermo grande, pubblico a distanza, rotazione automatica (modalità Vetrina). Priorità assoluta: **leggibilità da lontano**.
  - **(B) SMARTPHONE INDIVIDUALE** — il singolo tassista la apre dal telefono, la sfoglia da solo, e la **condivide** con i colleghi che lavorano e non possono venire in assemblea. Priorità: mobile-first e condivisione immediata.
- **LEGGIBILITÀ DA LONTANO (requisito forte):** testo molto grande e ad alto contrasto, pensato per essere letto dall'ultima fila e da un proiettore. Titoli e numeri giganti; corpo testo mai sotto ~22px equivalenti su proiezione; **pochissimo testo per scena** (poche righe brevi, mai paragrafi lunghi); contrasto massimo (rosso/bianco su nero, nero su panna). Se un contenuto è lungo, spezzalo su più scene invece di rimpicciolire.
- **MOBILE-FIRST e responsive reale, in ENTRAMBI gli orientamenti:**
  - **Verticale (portrait):** layout impilato, titoli grandi che non escono ai lati. Testare a 360px di larghezza.
  - **Orizzontale (landscape):** è l'orientamento naturale per le slide 16:9, ma sul telefono l'altezza è minima (~360–400px): i titoli/numeri giganti vanno dimensionati in funzione dell'ALTEZZA (usa `vh`/clamp con vh), non solo della larghezza, altrimenti il testo esce sotto. Ogni scena deve restare interamente visibile o scrollabile, mai tagliata. Testare a 740×360.
  - Navigazione: tap per avanzare, swipe, lightbox a tutto schermo. Niente testo che esce o si taglia in nessun orientamento.
- **CONDIVISIONE:** la app è un semplice URL (es. https://sceriffo123.github.io/milano/). Aggiungi: (1) un pulsante "Condividi" che usa la Web Share API su mobile (con fallback "copia link"); (2) nella scena finale, oltre al QR di adesione, un **QR/link alla web-app stessa** così chi è in sala la apre sul telefono e la inoltra ai colleghi assenti. Tieni i due QR distinti e etichettati ("Adesione" vs "Rivedi e condividi la presentazione").
- **Output: un unico file `index.html`** con HTML, CSS e JavaScript inline. **Nessuna dipendenza da CDN o rete**. Font particolari via `@font-face` da `./assets/fonts/` con fallback ai font di sistema (Arial Black / sans-serif). Deve funzionare aprendo il file con doppio clic E servito da nginx su un VPS, **anche offline** (la rete in sala non è garantita).
- **Asset esterni in `./assets/`** (immagini, video, ritagli, loghi, QR), richiamati con percorsi relativi. Alla fine elenca i file attesi in `assets/` con nome + descrizione.
- **Due modalità operative**, selezionabili da una schermata iniziale e commutabili con un tasto:
  1. **RELATORE (manuale)** — avanzamento manuale, note relatore a schermo, timer dell'intervento. Le schede di approfondimento (§6) sono raggiungibili come **sotto-livello** (freccia ↓) della scena a cui si riferiscono: il relatore ci entra solo se vuole, poi risale (↑) e prosegue (→).
  2. **VETRINA / LOOP (kiosk)** — auto-avanzamento temporizzato e **loop circolare infinito**. In questa modalità la rotazione è **lunga**: include sia le scene narrative sia TUTTE le schede di approfondimento, così lo schermo resta acceso e informativo a lungo senza intervento. Durate per scena in una costante JS `SCENE_DURATIONS` in cima al file.
- **Navigazione (relatore):** frecce ← → (scene), ↓ ↑ (entra/esci dagli approfondimenti), barra spaziatrice (avanti), swipe touch, click sulle metà schermo. Tasti: `F` fullscreen, `N` note relatore, `V` commuta Relatore/Vetrina, `Esc` indice capitoli, Home prima scena, numeri per saltare.
- **Indice a capitoli** (menu) + **progress bar** in alto + indicatore "scena X / N".
- **Lightbox per i ritagli:** clic su un documento (sentenza, articolo, norma) → ingrandimento a tutto schermo con **didascalia e fonte**; chiusura con clic/Esc.
- **Accessibilità/fallback:** rispetta `prefers-reduced-motion`; le animazioni non devono MAI essere indispensabili a capire il contenuto. Prevedi una **vista stampa** (`@media print`) leggibile come backup statico.
- **Formato 16:9**, responsive, leggibile da lontano su proiettore.

## DATI DA CONFERMARE (BLOCCO IN CIMA AL FILE, come costanti JS commentate)

Inserisci questi valori come costanti JS in cima, con commento `// === DATI DA CONFERMARE CON MARCO PRIMA DEL 10/06 ===`. Finché restano `null`, le scene mostrano un placeholder "[dato in verifica]" invece di un numero.

```js
const DATI = {
  anni_attivita: 15,                  // 2011–2026, confermato
  comuni_trattati: "200+",            // confermato da Marco (05/06/2026)
  atti_periodo: "250+",               // confermato da Marco
  atti_periodo_label: "negli ultimi 5 mesi",
  revoche_decadenze_12mesi: null,     // DA POPOLARE dall'elenco reale (revoche.json) che Marco sta fornendo → il totale è il length dell'array
  procedimenti_in_corso: 14,          // 14 procedimenti in corso in 12 comuni
  comuni_in_corso: 12,
  data_aggiornamento: "5 giugno 2026"
};
```

> Nota: il "totale revoche" NON va scritto a mano e NON è un contatore della Scena 8. Si mostra SOLO nella Scena 9 come **somma dei titoli revocati/decaduti** realmente elencati in `assets/revoche.json` (es. 7 a Marciana + 1 a Scarperia = "8+"; il "+" se qualche riga ha n_titoli non determinato). Così il numero non può mai superare l'elenco verificabile. Casi documentati ad oggi: Marciana (LI) 7 titoli, Scarperia e San Piero (FI) 1, Palaia (PI) n.d. — l'elenco va ampliato man mano che Marco fornisce gli altri casi.

## 1. CONTESTO

- **Evento:** "BASTA ABUSIVISMO" — incontro operativo sul contrasto all'abusivismo nel trasporto pubblico non di linea
- **Quando/dove:** martedì 10 giugno 2026, ore 14:00, Spazio Kolbe, Viale Corsica 68, Milano
- **Organizzatori (alleati, MAI criticarli):** FILT CGIL Taxi · Taxi Service Milano · UGL Taxi Milano · URITAXI Milano
- **Relatore:** Marco Morana (URITAXI · FILT CGIL), uno di 4 relatori (gli altri: Claudio Giudici, Alessandro Genovese, Lapo Lemmi)
- **Pubblico:** assemblea ampia di tassisti milanesi
- **Durata intervento dal vivo:** circa 90 minuti; la web-app in modalità Vetrina deve poter girare anche più a lungo grazie alle schede di approfondimento.
- **Obiettivo:** convincere i tassisti milanesi ad aderire e a segnalare i casi di abusivismo. Messaggi chiave:
  1. Il "metodo Firenze" (quindici anni di atti) è pronto anche per Milano: cosa abbiamo fatto, a che punto siamo, dove arriveremo.
  2. **Non si improvvisa.** Iniziare oggi da zero significa primi risultati tra anni — tempo che la categoria non ha. **La competenza non si compra: si accumula.** Montare una struttura oggi senza competenza spreca solo denaro.
  3. **Il lavoro lo fanno i tassisti**, con più consulenti sul lavoro amministrativo quotidiano. Gli avvocati sono serviti, ma la competenza l'ha acquisita il sistema nel tempo: l'avvocato serve all'estrema ratio, non come motore.
  4. **L'effetto deterrenza.** Dove il metodo lavora con continuità, il territorio diventa ostico per l'abusivo: i titoli si revocano, i bandi si chiudono, conviene andarsene. Questo è il risultato più alto: non solo singole revoche, ma un ambiente che si difende da solo.

## 2. REGOLE ASSOLUTE (non negoziabili)

1. **ZERO nomi e cognomi** di avversari, operatori NCC, dirigenti passati. Nominabili solo i professionisti della "squadra" (scena "La squadra") e i co-relatori.
2. **ZERO polemica** contro sindacati, cooperative o gestioni passate: sono i padroni di casa e gli alleati. "Non si improvvisa" NON è un attacco a chi parte oggi: è un invito a non sprecare anni. Tono costruttivo, mai sprezzante.
3. **MAI autoelogio**: tono "vi mostriamo le carte, giudicate voi". Frase chiave "Avrei preferito sbagliarmi", mai "avevo ragione io".
4. **Competenza, non bravura.** Il merito è del TEMPO e del LAVORO, mai delle persone: "ci sono voluti quindici anni", non "siamo i più bravi".
5. **Ogni numero e ogni sentenza è REALE e verificabile**: non arrotondare, non amplificare. Se un numero è `[DA CONFERMARE]`, mostra il placeholder, NON un valore inventato. Per i risultati (revoche), preferire l'**elenco caso per caso** all'aggettivo ("decine").
6. Lingua: italiano. Niente anglicismi inutili.

## 3. DIREZIONE VISIVA

- **Palette:** nero profondo #1A1A1A (dominante), rosso taxi #C8102E (accento), panna #F7F5F2 (slide chiare), bianco. Palette del volantino ufficiale.
- **Tipografia:** titoli sans pesantissimo (Arial Black/Archivo Black), corpo sans pulito. Titoli 40pt+, poco testo per scena.
- **Sandwich:** scene scure per i momenti emotivi (titolo, 2017, deterrenza, chiusura), chiare per i contenuti.
- **Motivo ricorrente:** barra verticale rossa a sinistra delle card bianche; numeri giganti rossi.
- **Loghi:** URITAXI e FILT CGIL su striscia bianca in apertura e chiusura.
- Stile: manifesto sindacale moderno, asciutto. Niente clip-art, niente foto stock generiche.

## 4. ANIMAZIONI (principio generale)

Le animazioni RACCONTANO, non decorano: la progressione degli atti, la caduta a domino, l'accumulo dei numeri, lo svuotamento del territorio. Timing lento e solenne (0,6–0,8s per elemento), mai effetti giocosi. In modalità Vetrina partono in automatico all'ingresso di ogni scena.

## 4.1 IMMAGINI E VISUAL

Non solo testo: ogni scena chiave deve avere un elemento visivo forte che dia "l'idea di cosa si sta creando". Regole:
- **Immagini di accompagnamento → le generi/scegli TU (Designer)**: evocative, per dare enfasi ai momenti forti (titolo, Milano, "non si improvvisa", deterrenza, caso Marciana, proposta). Coerenti con la palette (trattamento duotone nero/rosso o bianco-nero con accento rosso). **MAI clip-art, MAI foto stock generiche o decorative**: devono sembrare manifesto sindacale, non pubblicità. Se usi foto, solo royalty-free trattate per coerenza, e solo per enfasi/sfondo (mai protagoniste su dati o sentenze).
- **Ritagli delle sentenze → SCREENSHOT REALI forniti da Marco**: vanno negli slot lightbox già previsti (Scene 12, 13 e schede di approfondimento). Questi NON si generano e NON si illustrano: sono i documenti veri, perché sono la prova. Dove manca lo screenshot, lascia il placeholder etichettato col nome-file atteso.
- **Leggibilità prima di tutto:** le immagini non devono mai ridurre il contrasto del testo né rubare spazio ai numeri/titoli. Su proiezione e su smartphone il testo resta sempre l'elemento dominante; l'immagine è sfondo o accento, non rumore.
- **Soggetti suggeriti per le immagini di enfasi** (coerenti, non letterali): città/skyline di Milano e taxi per il titolo e la scena Uber-Milano; documenti/protocolli/PEC per "la macchina"; mappa Italia→Lombardia per numeri e "dove arriveremo"; isola/costa per Marciana; un territorio che si "schiarisce" per la deterrenza.

## 5. LE SCENE NARRATIVE (contenuti esatti + animazione + materiali)

> Materiali apribili in lightbox indicati come `[MATERIALE: nome-file — descrizione]`. Se manca, placeholder etichettato.

### Scena 1 — Titolo (scura)
- Chip rosso: "MILANO · 10 GIUGNO 2026 · SPAZIO KOLBE"
- Titolo: **BASTA ABUSIVISMO**
- Sottotitolo: *Dal 2011 il metodo, dal 2015 a Firenze. Quindici anni di atti, risultati verificabili.* (il metodo nasce nel 2011 = 15 anni; Firenze lo adotta nel 2015 = 10 anni — distinzione da rispettare ovunque)
- Relatori (TUTTI E QUATTRO, come nella locandina ufficiale): **Claudio Giudici · Alessandro Genovese · Marco Morana · Lapo Lemmi**
- Striscia bianca con loghi delle 4 sigle + "Incontro operativo sul contrasto all'abusivismo nel trasporto pubblico non di linea"
- Riferimento visivo: `assets/img/locandina-ufficiale.jpg` (font "BASTA" stellato nero, "ABUSIVISMO" rosso, Duomo + taxi bianco). Riprendine lo spirito grafico, non copiarla pixel per pixel.
- **Animazione:** il titolo appare battendo le due parole in sequenza (BASTA, poi ABUSIVISMO), come due timbri.

### Scena 2 — 2011: dove tutto è cominciato (chiara)
- Numero gigante rosso: **2011** · Titolo: "Dove tutto è cominciato"
- Testo: *Non denunciare soltanto l'abusivismo: costruire un metodo.*
- Mini-timeline a tre tappe (cronologia VINCOLANTE):
  - **2011** — Nasce l'attività antiabusivismo.
  - **2013** — Il metodo si struttura: **Avv. Maddalena D'Aprile** (supporto legale) e **Dott.ssa Giacinta Bucchi** (commercialista).
  - **2015** — **Firenze crede nel metodo** e lo applica. Da qui, dieci anni di atti. (Il metodo ha 15 anni, Firenze 10.)
- Banda inferiore: **2014 — già sulla stampa nazionale.** «La maxi evasione fiscale dei 3mila NCC fantasma» (Il Messaggero, 15.05.2014): la nostra analisi su evasione e danno erariale. Dieci anni dopo, quei dati sono ancora la base delle inchieste nazionali.
- `[MATERIALE: messaggero-2014.jpg — ritaglio Il Messaggero 15.05.2014]`
- **Animazione:** la timeline si costruisce tappa per tappa: 2011 → 2013 → 2015, poi la banda 2014.

### Scena 3 — 2017 (scura, minimale)
- Solo: **2017** gigante rosso e sotto, corsivo bianco: **"Si rideva."**
- **Animazione:** "2017" subito; "Si rideva." dopo 2 secondi di vuoto, dissolvenza lenta. Il silenzio fa parte della scena (in Vetrina tieni la scena più a lungo).
- (Racconto a voce: telefonata 2017 a una figura di una storica cooperativa romana; era in vivavoce, trasformata in scherno. Chiusura: "Ancora me lo ricordo.")

### Scena 4 — "Avrei preferito sbagliarmi." (chiara)
- Titolo: **"Avrei preferito sbagliarmi."** · Sotto, corsivo: *In quella risata non ha perso una persona. Ha perso una categoria intera.*
- Timeline verticale, 3 tappe:
  - **2017** — Deriso in vivavoce perché dicevo che l'abusivismo si combatte con gli atti
  - **2022** — 24 maggio: la storica cooperativa romana sigla l'accordo nazionale con Uber
  - **2026** — La multinazionale non bussa più alla porta: detta le condizioni dentro casa nostra
- **Animazione:** i tre punti si accendono uno alla volta, collegati da una linea che si disegna; il titolo per ultimo.

### Scena 5 — La macchina (chiara)
- Titolo: "La macchina" — sottotitolo: *Ogni passaggio è un atto protocollato, opponibile, verificabile.*
- Flusso a 5 blocchi: **1 SEGNALAZIONE** → **2 ISTANZA** → **3 SOLLECITO** → **4 DIFFIDA** → **5 ESPOSTO** (blocco rosso)
- Card: **Protocolli, PEC, giurisprudenza. Non proteste.** Se il Comune non agisce, ogni atto diventa la base del successivo: fino alla responsabilità erariale del funzionario inerte.
- **Animazione:** i 5 blocchi si montano da sinistra a destra come un ingranaggio; il quinto (rosso) con impatto più marcato.

### Scena 6 — Non si improvvisa (scura)
- Titolo: **"Non si improvvisa."** · Testo: *Questo non è un lavoro che si inizia una mattina perché si decide di iniziare.*
- Frase-perno (grande, al centro): **La competenza non si compra. Si accumula.** Sotto: *Per arrivare a questo livello sono serviti quindici anni di lavoro continuativo.*
- Due colonne:
  - **Partire oggi da zero** → primi risultati tra anni. Anni che la categoria non ha. Soldi spesi senza la competenza per usarli.
  - **Il metodo, già pronto** → quindici anni di competenza accumulata, modelli collaudati, risultati da subito.
- Chiusura: *Montare una struttura oggi senza quella competenza non porta da nessuna parte: spreca solo denaro. Il metodo esiste già: va usato, non reinventato.*
- **Animazione:** colonna "da zero" con barra lentissima + contatore "anni" che sale a fatica; colonna "metodo pronto" che si riempie subito. Contrasto del tempo.

### Scena 7 — Chi fa davvero il lavoro (chiara)
- Titolo: **"Lo fanno i tassisti."** · Sottotitolo: *Con più consulenti accanto. Non delegato a un solo studio legale.*
- Piramide a 3 livelli:
  - BASE (larga): **I tassisti e i consulenti** — lavoro amministrativo quotidiano: segnalazioni, istanze, solleciti, diffide, protocolli, PEC. Qui si vince o si perde.
  - CENTRO: **La struttura organizzata** — dati, scadenze, modelli.
  - VERTICE (stretto, rosso): **Gli avvocati — solo all'estrema ratio.** In giudizio. L'ultimo miglio, non il motore.
- Card: *Gli avvocati sono serviti, eccome. Ma la competenza l'ha acquisita il sistema, in quindici anni: non sta nella toga di un singolo. Nessun avvocato, da solo, può fare questo lavoro. È un lavoro di categoria.*
- **Animazione:** la piramide si costruisce dal basso; il vertice rosso si accende per ultimo e resta piccolo.

### Scena 8 — I numeri (chiara)
4 contatori giganti rossi (usa `DATI`, placeholder se `null`):
- **15** anni di attività continuativa (2011–2026)
- **[comuni_trattati]** comuni trattati in tutta Italia dal 2012, dalla Sicilia a Milano
- **[atti_periodo]** atti prodotti [atti_periodo_label]
- **[casi negli ultimi 6 mesi, calcolato da casi.json]** casi negli ultimi 6 mesi: revoche, decadenze, procedimenti
Riga sotto: *Dalla Toscana a tutta Italia — anche in Lombardia: Como, Saronno, Trescore Cremasco. Ogni caso ha un comune, una data, un atto. Dati al [data_aggiornamento], verificabili.*
> NOTA: NON usare un "totale revoche" come quarto contatore (rischio di numero gonfiato). Il quarto contatore è "casi negli ultimi 6 mesi" (definitivi + in corso, ~44), calcolato da casi.json. Le revoche definitive (sottoinsieme) si vedono col bollino rosso nella Scena 9.
- **Animazione:** count-up da 0 al valore, uno alla volta. La riga Lombardia per ultima, evidenziata.

### Scena 9 — I casi, a scendere (chiara) — l'elenco completo, non solo Marciana
- Titolo: **"I casi, a scendere."** · Sottotitolo: *Tutta la Toscana, e oltre. Revoche e decadenze definitive e procedimenti in corso: ogni riga è un'autorizzazione sotto esame.*
- **Tabella/registro scorrevole** popolato da `assets/casi.json` (vedi §6). Una riga = Comune (prov.) · **STATO** · data · esito. Lo **STATO** è un bollino: **DEFINITIVO** (rosso) per revoca/decadenza già ottenuta o confermata da sentenza; **in corso** (grigio) per istanza/sollecito/diffida/ricorso pendente. Ordina: prima i DEFINITIVI, poi gli IN CORSO, entrambi per data decrescente. Evidenzia le righe DEFINITIVO.
- Banda in basso (calcolata, non scritta a mano): **"[N] casi negli ultimi 6 mesi. [D] con revoca o decadenza già definitiva — gli altri, procedimenti in corso."** (Dai dati attuali: ~44 casi in 6 mesi, 6 definitivi.)
- **REGOLA FATTI:** "definitivo" SOLO se c'è revoca/decadenza adottata o sentenza propria del comune (Marciana, Scarperia, Montepulciano, Capalbio, Villafranca, Palaia). I solleciti che *citano* una sentenza altrui (es. Cavriglia, Barberino, Buggiano che citano la 903/2026 di Marciana) restano **in corso**. Non gonfiare: "oltre 30 casi in 6 mesi" è vero e verificabile; "30 autorizzazioni revocate" NO.
- **Animazione:** le righe si imprimono dall'alto come un registro che si compila; i totali in banda contano a salire.

### Scena 10 — L'effetto deterrenza (scura) — NUOVA, il risultato più alto
- Titolo: **"Il territorio diventa ostico."**
- Testo centrale: *Il metodo non toglie solo singole autorizzazioni. Cambia il conto economico dell'abusivo.*
- Tre tessere che cadono in catena (riusa il linguaggio visivo del domino): **Titoli revocati** → **Bandi che si chiudono** → **Non conviene più investirci qui.**
- Chiusura (rossa): *Dove lavoriamo con continuità, l'abusivo fa i suoi conti e si sposta. È la deterrenza: un territorio che si difende da solo. Questo vogliamo per Milano.*
- **Animazione:** una mappa/area che da "rossa di presenze abusive" si schiarisce mentre i provvedimenti si accumulano; le presenze si diradano e "migrano" via dal territorio presidiato.
- *Tono: descrivere l'effetto come conseguenza della legalità applicata, mai come "li abbiamo cacciati noi". Niente trionfalismo.*

### Scena 11 — La squadra (scura, titoli di coda)
"Quindici anni, una squadra":
- Avv. Maddalena D'Aprile — dal 2013, il primo supporto legale
- Dott.ssa Giacinta Bucchi — commercialista · dal 2013
- Avv. Marzia Di Giacobbe — dal 2018 · Avv. Ilaria Passerini — dal 2018
- Avv. Bacci · Avv. Filaci — dal 2019, ancora operativi nel 2026
- Avv. De Agostino — caso Arcidosso (GR)
- Arturo Grasso · Tiziana Lancierini · Martina Prosperini · Vincenzo De Franco
- Chiusura: *...e tanti altri che dal 2012 al 2026 hanno lavorato, e lavorano ancora, per le associazioni*
- **Animazione:** scorrimento lento verso l'alto stile titoli di coda, oppure dissolvenza nome per nome.

### Scena 12 — Le sentenze che contano (chiara, 3 card)
1. **CdS 9672/2023** — LEGITTIMAZIONE ATTIVA: il Consiglio di Stato riconosce a URITAXI il diritto di stare in giudizio per la categoria. Da soli no. Insieme sì.
2. **Corte Cost. 56/2020 · 163/2025** — VINCOLO TERRITORIALE: la Consulta conferma che il vincolo è legittimo. I controlli sono "presidi adeguati", non burocrazia.
3. **TAR Toscana 263/2023 · 903/2026** — LE FOTO SONO PROVA: il TAR indica alle associazioni le fotografie come prova dei veicoli NCC fuori territorio. E le nostre istanze reggono in giudizio.
- Citazione testuale (TAR Toscana 263/2023, pag. 4): *«Al fine di provare la presenza quotidiana e costante nel Comune di Firenze delle autovetture in commento, le associazioni potrebbero ricorrere a molti altri mezzi di prova, quali ad esempio delle fotografie...»*
- `[MATERIALE: cds-9672-2023.jpg · cortecost-163-2025.jpg · tar-263-2023-pag4.jpg]`
- **Animazione:** le card si girano come fascicoli che si aprono, una alla volta. (↓ porta alle schede di dettaglio §6.)

### Scena 13 — TAR Toscana: dieci pronunce (scura)
Titolo: "TAR Toscana: dieci pronunce. Tutte nella stessa direzione."
Due colonne (numero rosso + descrizione):
535/2021 Greve in Chianti · 337 e 339/2022 Lucca (NCC non è taxi) · 263/2023 Firenze (le foto sono prova) · 740/2025 Scarperia e San Piero (decadenza confermata) · 396/2026 Marciana (decadenza confermata) · 875/2026 Montepulciano (decadenza confermata) · 888/2026 Capalbio (revoca confermata) · 903/2026 Marciana (ricorsi respinti integralmente) · 1104/2026 Villafranca in Lunigiana (revoca confermata)
Banda rossa: **Sette vittorie solo nel biennio 2025-2026. Confermano ciò che sapevamo essere vero. Da anni.**
- **Animazione:** le pronunce compaiono in ordine cronologico come timbri che si imprimono; la banda rossa scorre fino alla fine. (↓ schede di dettaglio §6.)

### Scena 14 — Il caso Marciana (chiara: la storia simbolo)
Sottotitolo: *Isola d'Elba, duemila abitanti. Il caso più difficile: il Comune non ha mai collaborato. Non ci siamo mai arresi.*
4 tappe numerate:
1. **L'ESPOSTO — 13 ottobre 2024**: URITAXI segnala. Il TAR riconoscerà l'esposto sindacale come legittimo attivatore del controllo straordinario (§ 8.2.1).
2. **LE 7 REVOCHE — 30 giugno 2025**: il Comune, dopo l'istruttoria, toglie 7 titoli NCC. Sette, in un comune di duemila abitanti.
3. **I RICORSI — respinti integralmente**: 4 diventano definitive senza ricorso. In 3 ricorrono al TAR: perdono tutti (903/2026 e 396/2026).
4. **L'EFFETTO DOMINO** (rosso): decadenze a catena negli altri comuni, esclusione dai bandi: si ferma il sistema delle autorizzazioni di provincia usate nelle grandi città per fare taxi mascherato, con autisti sottopagati h24.
Chiusura: **Cade la prima pedina, cadono le altre. Non è fortuna: è il metodo.**
- **ANIMAZIONE CHIAVE — IL DOMINO:** una fila di tessere; alla tappa 4 la prima (Marciana) cade e abbatte in sequenza le altre ("altri comuni", "bandi", "taxi mascherato nelle città"). È il momento visivo memorabile.

### Scena 15 — Uber è stata fermata. Proprio qui. (scura)
- 2 card: **Trib. Milano 8359/2015** (UberPop bloccata: concorrenza sleale verso i taxi) e **TAR Lombardia 860/2016** (lo strumento tecnologico non cancella le regole del trasporto non di linea)
- Chiusura: *La legge è la stessa ovunque: L. 21/1992. Milano lo ha già dimostrato.*
- `[MATERIALE: trib-milano-8359-2015.jpg · tar-lombardia-860-2016.jpg]`
- **Animazione:** le due card calano come sbarre/cancelli che si chiudono.

### Scena 16 — Da soli no. Insieme sì. (chiara)
- Sottotitolo: *CdS 9672/2023: il singolo tassista non è ammesso nemmeno al TAR. L'associazione sì.*
- 3 barre: **Il metodo, subito** (modelli collaudati dal 2012, pronti per Milano) · **Una squadra rodata** (non si parte da zero: quindici anni di esperienza) · **Risultati misurabili** (ogni caso ha protocollo, data, esito: il lavoro si verifica, non si racconta)
- Chiusura rossa: *Insieme alle sigle che hanno organizzato questa giornata. Un fronte comune.*
- **Animazione:** prima una sagoma sola (respinta), poi tante sagome insieme che passano.

### Scena 17 — Dove arriveremo (scura, la visione)
- Titolo: **"Dove arriveremo."**
- Tre tappe:
  - **Milano, subito** — i primi atti sui casi che ci segnalerete oggi.
  - **La rete lombarda** — collegare i procedimenti aperti (Como, Saronno, Trescore Cremasco) in un fronte regionale.
  - **Lo standard nazionale** — un metodo replicabile, città per città, finché l'abusivismo non conviene più a nessuno.
- Chiusura: *Quindici anni ci hanno portato fin qui. I prossimi dieci li scrivete voi, con noi.*
- **Animazione:** mappa che si accende dalla Toscana, sale in Lombardia e a Milano, poi punti che si moltiplicano sull'Italia.

### Scena 18 — La proposta (scura, chiusura)
- Titolo: "La proposta, oggi"
- Gigante rosso: **Segnalateci i 3 casi più gravi di Milano.**
- Bianco: **Il primo atto parte entro 15 giorni.**
- "Modulo di adesione in sala — la vostra presenza fa la differenza."
- **DUE QR distinti e etichettati**: (1) "Adesione" → `[MATERIALE: qr-adesione.png]`; (2) "Rivedi e condividi questa presentazione" → QR che punta all'URL della web-app (così chi è in sala la apre sul telefono e la inoltra ai colleghi che lavorano). Più un pulsante "Condividi".
- Striscia loghi 4 sigle organizzatrici.
- **Animazione:** countdown visivo "15 giorni" che si fissa; i QR pulsano una volta.

## 6. SCHEDE DI APPROFONDIMENTO (la "rotazione lunga")

Sono schede di dettaglio collegate alle scene. In **modalità Relatore** si raggiungono con ↓ dalla scena di riferimento (e ↑ per tornare). In **modalità Vetrina** entrano TUTTE nella rotazione automatica, tra una scena narrativa e l'altra, per riempire i tempi lunghi. Ogni scheda è asciutta: un titolo, il punto chiave, il ritaglio apribile in lightbox, la fonte.

**Dati da file esterni** (così Marco li aggiorna senza toccare l'HTML):
- `assets/sentenze.json` — array di pronunce: `{id, organo, numero, anno, comune, oggetto, massima_breve, fonte_pdf, immagine}`.
- `assets/casi.json` — array di TUTTI i casi (Scena 9): `{comune, provincia, regione, titoli, stato: "definitivo|in_corso|archiviato", data, esito}`. È la fonte del registro "a scendere" e dei conteggi.
- `assets/revoche.json` — (legacy) sottoinsieme dei soli definitivi; `casi.json` lo supera.
- `assets/norme.json` — array di norme: `{fonte, articolo, testo_breve}`.
- `assets/stampa.json` — array di articoli: `{testata, data, titolo, immagine}`.

> Per le **massime/particolari delle sentenze** usa SOLO testo fornito da Marco (dai fascicoli / skill ncc-legal-v03). Se un campo `massima_breve` è vuoto, mostra "[estratto da inserire]" — non parafrasare e non inventare la massima.

**Schede sentenza (collegate a Scene 12 e 13):** una scheda per ciascuna pronuncia. Layout: numero/anno gigante rosso a sinistra, a destra organo + comune + oggetto + `massima_breve`, in basso il ritaglio cliccabile (lightbox con la pagina del PDF e la fonte). Pronunce previste:
- CdS 9672/2023 — legittimazione attiva URITAXI
- Corte Cost. 56/2020 e 163/2025 — vincolo territoriale, "presidi adeguati"
- TAR Toscana 535/2021 (Greve), 337 e 339/2022 (Lucca), 263/2023 (Firenze, le foto sono prova), 740/2025 (Scarperia), 396/2026 (Marciana), 875/2026 (Montepulciano), 888/2026 (Capalbio), 903/2026 (Marciana), 1104/2026 (Villafranca in Lunigiana)
- Trib. Milano 8359/2015 e TAR Lombardia 860/2016 (Uber a Milano)

**Schede revoca (collegate a Scena 9):** una riga/scheda per provvedimento da `revoche.json`. Servono a far vedere la quantità reale, caso per caso.

**Schede norma (rotazione Vetrina):** trafiletti delle norme cardine, testo breve + fonte. Previste (testo esatto da `norme.json`, fornito da Marco):
- L. 21/1992 — disciplina taxi e NCC (vincolo territoriale, foglio di servizio, rimessa)
- Art. rilevanti C.d.S. sui controlli
- *(altre che Marco vorrà aggiungere)*

**Schede stampa (rotazione Vetrina):** ritagli di articoli da `stampa.json`, a partire da Il Messaggero 15.05.2014.

## 7. NOTE RELATORE (pannello `N`, una per scena)

Includere obbligatoriamente:
- Scena 1: ringraziare per nome organizzatori e co-relatori (Giudici, Genovese, Lemmi).
- Scena 3: racconto telefonata 2017, chiusura "Ancora me lo ricordo." + silenzio. Se contestato: "Io quel giorno l'ho vissuto al telefono. Ognuno si ricorda la propria parte. I fatti successivi parlano da soli."
- Scena 4: "Avrei preferito sbagliarmi davvero. Perché in quella risata non ha perso una persona. Ha perso una categoria intera."
- Scena 6: "Non lo dico contro nessuno, e non per vantarmi. La competenza non si compra, si accumula. A noi sono serviti quindici anni. Chi parte oggi da zero vede i primi risultati tra anni, e nel frattempo spende soldi senza la competenza per usarli bene. Noi quegli anni li abbiamo già fatti: il metodo è qui, pronto, a disposizione."
- Scena 7: "Attenti a un equivoco: questo non è il lavoro di un avvocato. L'avvocato serve alla fine, in giudizio. Il lavoro vero è quotidiano, amministrativo, e lo fanno i tassisti con i loro consulenti."
- Scena 10 (deterrenza): "Il risultato più importante non è la singola revoca. È che, dove lavoriamo, l'abusivo fa i suoi conti e capisce che non gli conviene più. Il territorio si difende da solo. Questo possiamo costruirlo anche a Milano."
- Scena 14, chiusura umana: "A volte ci facciamo persino degli scrupoli: stiamo esagerando? Poi pensiamo agli autisti sfruttati h24 dentro quelle macchine, e ai colleghi che rispettano le regole e non arrivano a fine mese. E capiamo che fermarsi sarebbe la vera ingiustizia."
- Scena 18: la call to action finale la "carica" Marco e la chiude il padrone di casa milanese.

## 8. GESTIONE DEL CONTRADDITTORIO (nelle note)

Mai rispondere alla persona, sempre ai fatti ("I protocolli e le sentenze sono pubblici: chiunque può verificarli"); massimo una risposta per provocazione; Q&A solo alla fine; mai farsi trascinare nel processo al passato ("Non siamo qui per il passato di nessuno. Siamo qui per i prossimi dieci anni dei tassisti milanesi").

## 9. OUTPUT RICHIESTO

1. Un unico **`index.html`** autonomo, offline-capace: 18 scene narrative + schede di approfondimento, due modalità (Relatore / Vetrina-loop), note relatore (`N`), lightbox, indice a capitoli, progress bar, timer. 16:9, responsive.
2. In cima al file: blocco **`DATI`** (numeri da confermare, con commenti sulle discrepanze) e costanti animazioni/durate (`SCENE_DURATIONS`, loop on/off) ben commentate.
3. Caricamento dei contenuti di dettaglio da `assets/*.json` (sentenze, revoche, norme, stampa) con fallback a placeholder se il file manca.
4. **Elenco finale dei file attesi in `./assets/`** (immagini, ritagli, font, QR, e i 4 JSON), ciascuno con nome + descrizione.
5. Una **vista stampa/statica** di backup (`@media print`).
6. In fondo, commento HTML con istruzioni: come aprire in locale e come servire da nginx su VPS.

---

# APPENDICE — DATI REALI DA INSERIRE NEL CODICE

> Dati verificati. NON modificarli "a occhio". Dove un campo è vuoto o "[estratto da inserire]", placeholder etichettato. I ritagli delle sentenze sono SCREENSHOT reali forniti da Marco.

## dati.json
```json
{
  "_nota": "Dati quantitativi. Confermati con Marco il 05/06/2026. 'revoche_totale' viene calcolato a runtime dal numero di righe di revoche.json: NON scriverlo a mano.",
  "anni_attivita": 15,
  "comuni_trattati": "200+",
  "atti_periodo": "250+",
  "atti_periodo_label": "negli ultimi 5 mesi",
  "procedimenti_in_corso": 14,
  "comuni_in_corso": 12,
  "data_aggiornamento": "5 giugno 2026"
}
```

## casi.json
```json
[
  {"comune":"Marciana","provincia":"LI","regione":"Toscana","titoli":7,"stato":"definitivo","data":"2026-05-11","esito":"Decadenze confermate (TAR Toscana 903/2026 e 396/2026)"},
  {"comune":"Montepulciano","provincia":"SI","regione":"Toscana","titoli":null,"stato":"definitivo","data":"2026-04-01","esito":"Decadenza confermata (TAR Toscana 875/2026)"},
  {"comune":"Capalbio","provincia":"GR","regione":"Toscana","titoli":null,"stato":"definitivo","data":"2026-04-01","esito":"Revoca confermata (TAR Toscana 888/2026)"},
  {"comune":"Villafranca in Lunigiana","provincia":"MS","regione":"Toscana","titoli":null,"stato":"definitivo","data":"2026-03-22","esito":"Revoca confermata (TAR Toscana 1104/2026)"},
  {"comune":"Scarperia e San Piero","provincia":"FI","regione":"Toscana","titoli":1,"stato":"definitivo","data":"2025-12-18","esito":"Decadenza confermata (TAR Toscana 740/2025) — SkyRoad236"},
  {"comune":"Palaia","provincia":"PI","regione":"Toscana","titoli":null,"stato":"definitivo","data":"2022-07-05","esito":"Revoca comunale (ord. 07/PA)"},
  {"comune":"Bibbiena","provincia":"AR","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-05-29","esito":"Procedimento in corso; riscontri"},
  {"comune":"Castelnuovo Berardenga","provincia":"SI","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-05-25","esito":"Istanza e memoria integrativa"},
  {"comune":"Firenze","provincia":"FI","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-05-25","esito":"Procedimenti in corso"},
  {"comune":"Monte San Savino","provincia":"AR","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-05-25","esito":"Procedimento in corso"},
  {"comune":"Colle Val d'Elsa","provincia":"SI","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-05-20","esito":"Sollecito"},
  {"comune":"Barberino Tavarnelle","provincia":"FI","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-05-19","esito":"Sollecito"},
  {"comune":"Gambassi Terme","provincia":"FI","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-05-16","esito":"In corso"},
  {"comune":"Impruneta","provincia":"FI","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-05-16","esito":"In corso"},
  {"comune":"Certaldo","provincia":"FI","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-05-15","esito":"In corso"},
  {"comune":"Cavriglia","provincia":"AR","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-05-14","esito":"Sollecito (cita TAR 903/2026)"},
  {"comune":"Bibbona","provincia":"LI","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-05-13","esito":"Istanza"},
  {"comune":"Borgo San Lorenzo","provincia":"FI","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-05-13","esito":"Istanza"},
  {"comune":"Castelfiorentino","provincia":"FI","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-05-10","esito":"Diffida"},
  {"comune":"Prato","provincia":"PO","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-05-07","esito":"In corso"},
  {"comune":"San Giuliano Terme","provincia":"PI","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-05-05","esito":"In corso"},
  {"comune":"Agliana","provincia":"PT","regione":"Toscana","titoli":3,"stato":"in_corso","data":"2026-05-04","esito":"3 NCC; memoria ex art. 10 L. 241/1990"},
  {"comune":"Volterra","provincia":"PI","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-04-30","esito":"In corso"},
  {"comune":"Cecina","provincia":"LI","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-04-28","esito":"In corso"},
  {"comune":"Signa","provincia":"FI","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-04-28","esito":"In corso"},
  {"comune":"Bagni di Lucca","provincia":"LU","regione":"Toscana","titoli":3,"stato":"in_corso","data":"2026-04-22","esito":"Avvio procedimento revoca/decadenza (nn. 3, 11, 13)"},
  {"comune":"Montemurlo","provincia":"PO","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-04-18","esito":"In corso (diffida Bacci-Filaci)"},
  {"comune":"Pistoia","provincia":"PT","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-04-16","esito":"In corso"},
  {"comune":"Scarlino","provincia":"GR","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-04-13","esito":"In corso"},
  {"comune":"Castelfranco Piandiscò","provincia":"AR","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-04-03","esito":"Istanza"},
  {"comune":"Buggiano","provincia":"PT","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-02-23","esito":"In corso (cita TAR 396/2026)"},
  {"comune":"Castel Focognano","provincia":"AR","regione":"Toscana","titoli":null,"stato":"in_corso","data":"2026-02-15","esito":"Diffida"},
  {"comune":"Como","provincia":"CO","regione":"Lombardia","titoli":2,"stato":"in_corso","data":"2026-04-24","esito":"Procedimento sospensione dal ruolo (autorizzazioni 1 e 29, ZTL Milano)"},
  {"comune":"Saronno","provincia":"VA","regione":"Lombardia","titoli":null,"stato":"in_corso","data":"2026-04-04","esito":"In corso"},
  {"comune":"Almè","provincia":"BG","regione":"Lombardia","titoli":1,"stato":"in_corso","data":"2026-04-28","esito":"NCC 4 (targa FZ260PH)"},
  {"comune":"Ghedi","provincia":"BS","regione":"Lombardia","titoli":null,"stato":"in_corso","data":"2026-04-08","esito":"In corso"},
  {"comune":"Ravenna","provincia":"RA","regione":"Emilia-Romagna","titoli":null,"stato":"in_corso","data":"2026-06-01","esito":"Procedimento in corso"},
  {"comune":"Monte Copiolo","provincia":"RN","regione":"Emilia-Romagna","titoli":null,"stato":"in_corso","data":"2026-06-02","esito":"Procedimento in corso"},
  {"comune":"Sant'Agata Feltria","provincia":"RN","regione":"Emilia-Romagna","titoli":null,"stato":"in_corso","data":"2026-05-11","esito":"In corso"},
  {"comune":"Gemmano","provincia":"RN","regione":"Emilia-Romagna","titoli":null,"stato":"in_corso","data":"2026-04-16","esito":"In corso"},
  {"comune":"Nettuno","provincia":"RM","regione":"Lazio","titoli":null,"stato":"in_corso","data":"2026-05-12","esito":"In corso"},
  {"comune":"Latina","provincia":"LT","regione":"Lazio","titoli":null,"stato":"in_corso","data":"2026-05-12","esito":"In corso"},
  {"comune":"Viterbo","provincia":"VT","regione":"Lazio","titoli":null,"stato":"in_corso","data":"2026-05-12","esito":"In corso"},
  {"comune":"Ginosa","provincia":"TA","regione":"Puglia","titoli":null,"stato":"in_corso","data":"2026-05-12","esito":"In corso"},
  {"comune":"Irsina","provincia":"MT","regione":"Basilicata","titoli":null,"stato":"in_corso","data":"2026-05-04","esito":"In corso"}
]
```

## sentenze.json
```json
[
  {
    "id": "cds-9672-2023",
    "organo": "Consiglio di Stato",
    "numero": "9672",
    "anno": "2023",
    "comune": "",
    "oggetto": "Legittimazione attiva URITAXI",
    "massima_breve": "Riconosce a URITAXI il diritto di stare in giudizio per la categoria. Da soli no, insieme sì.",
    "fonte_pdf": "",
    "immagine": "img/cds-9672-2023.jpg"
  },
  {
    "id": "cortecost-56-2020",
    "organo": "Corte Costituzionale",
    "numero": "56",
    "anno": "2020",
    "comune": "",
    "oggetto": "Vincolo territoriale",
    "massima_breve": "Conferma la legittimità del vincolo territoriale per gli NCC.",
    "fonte_pdf": "",
    "immagine": "img/cortecost-56-2020.jpg"
  },
  {
    "id": "cortecost-163-2025",
    "organo": "Corte Costituzionale",
    "numero": "163",
    "anno": "2025",
    "comune": "",
    "oggetto": "Vincolo territoriale — presidi adeguati",
    "massima_breve": "I controlli sono 'presidi adeguati', non burocrazia (punto 7.1).",
    "fonte_pdf": "",
    "immagine": "img/cortecost-163-2025.jpg"
  },
  {
    "id": "tar-535-2021",
    "organo": "TAR Toscana, Sez. II",
    "numero": "535",
    "anno": "2021",
    "comune": "Greve in Chianti",
    "oggetto": "Titolarità autorizzazione NCC",
    "massima_breve": "[estratto da inserire]",
    "fonte_pdf": "",
    "immagine": "img/tar-535-2021.jpg"
  },
  {
    "id": "tar-337-2022",
    "organo": "TAR Toscana, Sez. II",
    "numero": "337",
    "anno": "2022",
    "comune": "Lucca",
    "oggetto": "NCC non è taxi",
    "massima_breve": "[estratto da inserire]",
    "fonte_pdf": "",
    "immagine": "img/tar-337-2022.jpg"
  },
  {
    "id": "tar-339-2022",
    "organo": "TAR Toscana, Sez. II",
    "numero": "339",
    "anno": "2022",
    "comune": "Lucca",
    "oggetto": "NCC non è taxi",
    "massima_breve": "[estratto da inserire]",
    "fonte_pdf": "",
    "immagine": "img/tar-339-2022.jpg"
  },
  {
    "id": "tar-263-2023",
    "organo": "TAR Toscana, Sez. II",
    "numero": "263",
    "anno": "2023",
    "comune": "Firenze",
    "oggetto": "Le foto sono prova",
    "massima_breve": "«Al fine di provare la presenza quotidiana e costante nel Comune di Firenze delle autovetture in commento, le associazioni potrebbero ricorrere a molti altri mezzi di prova, quali ad esempio delle fotografie...» (pag. 4)",
    "fonte_pdf": "",
    "immagine": "img/tar-263-2023-pag4.jpg"
  },
  {
    "id": "tar-740-2025",
    "organo": "TAR Toscana, Sez. II",
    "numero": "740",
    "anno": "2025",
    "comune": "Scarperia e San Piero",
    "oggetto": "Decadenza confermata",
    "massima_breve": "[estratto da inserire]",
    "fonte_pdf": "",
    "immagine": "img/tar-740-2025.jpg"
  },
  {
    "id": "tar-396-2026",
    "organo": "TAR Toscana, Sez. II",
    "numero": "396",
    "anno": "2026",
    "comune": "Marciana",
    "oggetto": "Decadenza confermata",
    "massima_breve": "[estratto da inserire]",
    "fonte_pdf": "",
    "immagine": "img/tar-396-2026.jpg"
  },
  {
    "id": "tar-875-2026",
    "organo": "TAR Toscana, Sez. II",
    "numero": "875",
    "anno": "2026",
    "comune": "Montepulciano",
    "oggetto": "Decadenza confermata",
    "massima_breve": "[estratto da inserire]",
    "fonte_pdf": "",
    "immagine": "img/tar-875-2026.jpg"
  },
  {
    "id": "tar-888-2026",
    "organo": "TAR Toscana, Sez. II",
    "numero": "888",
    "anno": "2026",
    "comune": "Capalbio",
    "oggetto": "Revoca confermata",
    "massima_breve": "[estratto da inserire]",
    "fonte_pdf": "",
    "immagine": "img/tar-888-2026.jpg"
  },
  {
    "id": "tar-903-2026",
    "organo": "TAR Toscana, Sez. II",
    "numero": "903",
    "anno": "2026",
    "comune": "Marciana",
    "oggetto": "Ricorsi respinti integralmente",
    "massima_breve": "[estratto da inserire]",
    "fonte_pdf": "",
    "immagine": "img/tar-903-2026.jpg"
  },
  {
    "id": "tar-1104-2026",
    "organo": "TAR Toscana, Sez. II",
    "numero": "1104",
    "anno": "2026",
    "comune": "Villafranca in Lunigiana",
    "oggetto": "Revoca confermata",
    "massima_breve": "[estratto da inserire]",
    "fonte_pdf": "",
    "immagine": "img/tar-1104-2026.jpg"
  },
  {
    "id": "trib-milano-8359-2015",
    "organo": "Tribunale di Milano",
    "numero": "8359",
    "anno": "2015",
    "comune": "Milano",
    "oggetto": "UberPop bloccata",
    "massima_breve": "Concorrenza sleale verso i taxi: UberPop bloccata.",
    "fonte_pdf": "",
    "immagine": "img/trib-milano-8359-2015.jpg"
  },
  {
    "id": "tar-lombardia-860-2016",
    "organo": "TAR Lombardia",
    "numero": "860",
    "anno": "2016",
    "comune": "Milano",
    "oggetto": "Lo strumento tecnologico non cancella le regole",
    "massima_breve": "Lo strumento tecnologico non cancella le regole del trasporto non di linea.",
    "fonte_pdf": "",
    "immagine": "img/tar-lombardia-860-2016.jpg"
  }
]
```

## norme.json
```json
[
  {
    "fonte": "Legge 15 gennaio 1992, n. 21",
    "articolo": "Disciplina taxi e NCC",
    "testo_breve": "Legge quadro per il trasporto di persone mediante autoservizi pubblici non di linea. Definisce taxi e noleggio con conducente, il vincolo territoriale, l'obbligo di rimessa e foglio di servizio."
  },
  {
    "fonte": "Legge 15 gennaio 1992, n. 21",
    "articolo": "Vincolo territoriale (NCC)",
    "testo_breve": "L'NCC effettua il servizio su prenotazione presso la rimessa; lo stazionamento avviene all'interno della rimessa nel territorio del Comune che ha rilasciato l'autorizzazione."
  }
]
```

## stampa.json
```json
[
  {
    "testata": "Il Messaggero",
    "data": "2014-05-15",
    "titolo": "«La maxi evasione fiscale dei 3mila NCC fantasma»",
    "immagine": "img/messaggero-2014.jpg"
  }
]
```

## Asset nel repo: assets/img/{logo-uritaxi.png, logo-filt-cgil.png, qr-webapp.png, locandina-ufficiale.jpg}
