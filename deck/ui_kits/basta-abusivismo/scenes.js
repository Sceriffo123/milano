/* Definizione delle scene — sottoinsieme rappresentativo del manifesto
   "Basta Abusivismo". Stesse classi-motivo dell'originale. */
window.SCENES = [
  { id: "s1", theme: "dark", title: "Titolo", html: `
    <span class="chip" data-anim style="align-self:flex-start">MILANO · 10 GIUGNO 2026 · SPAZIO KOLBE</span>
    <h1 class="heavy"><span data-anim style="--i:0">BASTA</span> <span data-anim style="--i:1;color:var(--rosso)">ABUSIVISMO</span></h1>
    <p class="lead corsivo" data-anim style="--i:2">Il metodo Firenze: quindici anni di atti, risultati verificabili.</p>
    <div class="firma" data-anim style="--i:3">Marco Morana — URITAXI · FILT CGIL</div>
    <div class="stripe"><span class="logos">URITAXI · FILT CGIL</span><span>Incontro operativo sul contrasto all'abusivismo nel trasporto pubblico non di linea</span></div>` },

  { id: "s2", theme: "light", title: "2011 — Dove tutto è cominciato", html: `
    <div class="row" style="align-items:flex-start">
      <div class="num-giant heavy" data-anim>2011</div>
      <div class="col" style="flex:1;min-width:280px">
        <h2 class="heavy" data-anim style="--i:1">Dove tutto è cominciato</h2>
        <p class="lead" data-anim style="--i:2">Una volontà precisa: non limitarsi a denunciare l'abusivismo, ma costruire un metodo.</p>
        <div class="card" data-anim style="--i:3"><b>2013 — L'azione organizzata.</b> Il primo supporto legale e la struttura amministrativa.</div>
      </div>
    </div>
    <div class="band" data-anim style="--i:4;margin-top:1.4em"><b>2014 — già sulla stampa nazionale.</b> La nostra analisi su evasione e danno erariale. Dieci anni dopo, è ancora la base delle inchieste nazionali.</div>` },

  { id: "s3", theme: "dark", title: "2017 — Si rideva", html: `
    <div style="margin:auto;text-align:center">
      <div class="num-giant heavy" data-anim>2017</div>
      <p class="corsivo heavy" data-anim style="--i:2;font-size:clamp(28px,5vw,64px);margin-top:.2em">“Si rideva.”</p>
    </div>` },

  { id: "s5", theme: "light", title: "La macchina", html: `
    <h2 class="heavy" data-anim>La macchina</h2>
    <p class="sub" data-anim style="--i:1">Ogni passaggio è un atto protocollato, opponibile, verificabile.</p>
    <div class="flow" data-anim style="--i:2;margin:1.2em 0">
      <div class="step"><b>1</b> SEGNALAZIONE<br><small>dal territorio</small></div>
      <div class="step"><b>2</b> ISTANZA<br><small>verifica e controllo</small></div>
      <div class="step"><b>3</b> SOLLECITO<br><small>con termini</small></div>
      <div class="step"><b>4</b> DIFFIDA<br><small>ad adempiere</small></div>
      <div class="step last"><b>5</b> ESPOSTO<br><small>autorità superiori</small></div>
    </div>
    <div class="card" data-anim style="--i:3"><b>Protocolli, PEC, giurisprudenza. Non proteste.</b> Se il Comune non agisce, ogni atto diventa la base del successivo: fino alla responsabilità erariale del funzionario inerte.</div>` },

  { id: "s8", theme: "light", title: "I numeri", html: `
    <h2 class="heavy" data-anim>I numeri</h2>
    <div class="four" style="margin:1.2em 0">
      <div data-anim style="--i:1"><div class="counter" data-count="15">15</div><div class="clab">anni di attività continuativa (2011–2026)</div></div>
      <div data-anim style="--i:2"><div class="counter" data-count="200" data-suffix="+">200+</div><div class="clab">comuni trattati dal 2012, dalla Sicilia a Milano</div></div>
      <div data-anim style="--i:3"><div class="counter" data-count="250" data-suffix="+">250+</div><div class="clab">atti prodotti negli ultimi 5 mesi</div></div>
      <div data-anim style="--i:4"><div class="counter" data-count="14">14</div><div class="clab">procedimenti in corso in 12 comuni, anche in Lombardia</div></div>
    </div>
    <div class="band" data-anim style="--i:5">Procedimenti aperti anche in Lombardia: Como, Saronno, Trescore Cremasco. Dati al 5 giugno 2026, verificabili atto per atto.</div>` },

  { id: "s12", theme: "light", title: "Le sentenze che contano", html: `
    <h2 class="heavy" data-anim>Le sentenze che contano</h2>
    <div class="three" style="margin-top:1.2em">
      <div class="card" data-anim style="--i:1"><b>CdS 9672/2023</b><br><small style="color:var(--rosso);font-weight:700;letter-spacing:.08em">LEGITTIMAZIONE ATTIVA</small><br>Il Consiglio di Stato riconosce a URITAXI il diritto di stare in giudizio per la categoria.</div>
      <div class="card" data-anim style="--i:2"><b>Corte Cost. 56/2020 · 163/2025</b><br><small style="color:var(--rosso);font-weight:700;letter-spacing:.08em">VINCOLO TERRITORIALE</small><br>La Consulta conferma che il vincolo è legittimo. I controlli sono “presidi adeguati”.</div>
      <div class="card" data-anim style="--i:3"><b>TAR Toscana 263/2023 · 903/2026</b><br><small style="color:var(--rosso);font-weight:700;letter-spacing:.08em">LE FOTO SONO PROVA</small><br>Il TAR indica le fotografie come prova dei veicoli NCC fuori territorio.</div>
    </div>
    <p class="sub corsivo" data-anim style="--i:4;max-width:none;margin-top:1em">«...le associazioni potrebbero ricorrere a molti altri mezzi di prova, quali ad esempio delle fotografie...» — TAR Toscana 263/2023, pag. 4</p>` },

  { id: "s16", theme: "dark", title: "Da soli no. Insieme sì.", html: `
    <h2 class="heavy" data-anim>Da soli no. Insieme sì.</h2>
    <p class="sub" data-anim style="--i:1">CdS 9672/2023: il singolo tassista non è ammesso nemmeno al TAR. L'associazione sì.</p>
    <div class="three" data-anim style="--i:2;margin:1.2em 0">
      <div class="card"><b>Il metodo, subito</b><br>Modelli collaudati dal 2012, pronti per Milano.</div>
      <div class="card"><b>Una squadra rodata</b><br>Non si parte da zero: quindici anni di esperienza.</div>
      <div class="card"><b>Risultati misurabili</b><br>Ogni caso ha protocollo, data, esito: si verifica, non si racconta.</div>
    </div>
    <div class="band" data-anim style="--i:3">Insieme alle sigle che hanno organizzato questa giornata. Un fronte comune.</div>` },

  { id: "s18", theme: "dark", title: "La proposta", html: `
    <span class="chip" data-anim style="align-self:flex-start">LA PROPOSTA, OGGI</span>
    <h1 class="heavy" data-anim style="--i:1;color:var(--rosso);font-size:clamp(30px,5.5vw,76px);max-width:18ch">Segnalateci i 3 casi più gravi di Milano.</h1>
    <p class="lead" data-anim style="--i:2">Il primo atto parte entro <b style="color:var(--rosso)">15 giorni</b>.</p>
    <p class="sub" data-anim style="--i:3">Modulo di adesione in sala — la vostra presenza fa la differenza.</p>
    <div class="stripe"><span class="logos">FILT CGIL Taxi · Taxi Service Milano · UGL Taxi Milano · URITAXI Milano</span></div>` },
];
