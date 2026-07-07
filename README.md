# VISTA Suite — demo front + sito (v0.5)

Il compagno digitale dell'ottico indipendente. Questo repo contiene le
**demo front-end** da mostrare ad AD e all'agente: nessun backend, dati
finti, ma architettura già orientata al multitenant.

## Nota per l'agente AI (workflow zip → branch → PR)

Quando ti passo una `.zip` che contiene un repo git con un commit da portare qui:

1. **Non usare mai `cd`.** Ogni comando git deve usare `git -C <path>` così è
   sempre esplicito su quale repo agisce (questo repo vs. il repo dentro la zip).
2. Tratta il repo dentro la zip come **sola lettura**: estrai il commit/patch da
   lì, non fare mai `checkout`/`am`/`reset`/`commit` al suo interno.
3. Preferisci: aggiungi la zip come remote temporaneo di **questo** repo
   (`git remote add zipsrc <zip>/.git && git fetch zipsrc && git cherry-pick <sha>`)
   invece di lavorare dentro la cartella estratta.
4. Riparti sempre il branch di lavoro dall'ultimo default branch
   (`git checkout -B <branch> origin/main`) prima di applicare il nuovo commit,
   dato che la PR precedente è già mergiata.
5. Dopo aver applicato: `git ls-tree -r HEAD` deve contenere i file attesi e
   `npx tsc --noEmit` (o la build) deve essere verde prima di push/PR/merge.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 3.4** per le utility, colori di brand via token/inline
- **lucide-react** per le icone
- Deploy previsto su **Vercel** (zero config: `vercel` o import da GitHub)

## Avvio

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Cosa c'è dentro

- `/` — hub interno: elenco dei negozi demo con la loro palette e i
  moduli attivi.
- `/demo/aurora` — Ottica Aurora, suite completa (Recall + Banco +
  Boutique). È la demo "da manuale" del kit venditore.
- `/demo/bollani` — Ottica Bollani, solo Recall + Boutique: dimostra che
  i moduli si attivano uno alla volta e che l'app cliente cambia pelle
  (blu/verde invece di espresso/ottone) senza toccare una riga di
  componente.

In ogni demo il commutatore in alto passa da **Ottico** (pannello del
negozio) a **Cliente** (l'app white-label vista dal cliente finale).

## Architettura (le tre decisioni che contano)

**1. Tenant come config.** `lib/types.ts` definisce `Tenant` con la
stessa shape della futura tabella `aziende` su Supabase (branding,
`moduliAttivi[]`, stato). Oggi i tenant vivono in `lib/tenants.ts`;
domani arriveranno da DB con RLS. I componenti non lo sapranno mai.

**2. Due sistemi di colore.** Il lato ottico usa i token `VISTA`
(`lib/theme.tsx`): è il *nostro* prodotto, identico per tutti. Il lato
cliente legge `tenant.brand`: è il *loro* negozio. Questa separazione è
il white-label — e in trattativa si mostra cambiando negozio dall'hub.

**3. Registry dei moduli.** `lib/registry.tsx` (pattern ripreso da
Gestionale_ear): ogni modulo si dichiara con id, label, icona e
componente; la shell monta solo quelli in `tenant.moduliAttivi`.
Aggiungere un modulo = una cartella in `/modules` + una entry.

I dati finti stanno tutti in `lib/demo-data.ts`: è il punto unico che
diventerà lo strato di query Supabase, con i componenti invariati.

## Struttura

```
app/
  page.tsx              # hub demo
  demo/[tenant]/        # rotta tenant (prefigura il multitenant)
components/
  SuiteShell.tsx        # header, commutatore ottico/cliente, tab moduli
  ui.tsx                # Kpi, SectionTitle
lib/
  types.ts  tenants.ts  theme.tsx  registry.tsx  demo-data.ts
modules/
  recall/   banco/      boutique/
```

## Note sul porting dal prototipo di AD

Il design e i contenuti sono quelli del prototipo (invariati di
proposito). Interventi fatti:

- fix crash nel Lens Configurator: icona `Sun` usata ma non importata;
- font via `next/font` (Sora / Fraunces / JetBrains Mono) invece
  dell'`@import` CSS — stesse classi `f-ui / f-serif / f-mono`;
- messaggi WhatsApp firmati col nome del tenant (`{{negozio}}`);
- capitale fermo calcolato dai dati invece che hardcoded.

## v0.2 — Demo 2: Boutique coi funnel

Nell'app cliente (entrambi i tenant, ognuno coi suoi colori):

- **Ruota dei premi** (`GameWheel`): premi e pesi ripresi da App_ottica
  (sole 20% frequente, vista 50% raro, caselle "riprova"); l'estrazione è
  pesata e la ruota atterra sul segmento estratto. I codici si ritirano
  solo in negozio: il gioco è un generatore di rientri.
- **Porta un amico** (`ReferralCard`): QR reale e scansionabile
  (qrcode.react) + link copiabile. "Tu + un amico = 20% sole per
  entrambi", come nel prototipo originale.
- **Raccolta recensioni** (`ReviewFunnel`): 4–5 stelle → invito Google;
  1–3 stelle → messaggio privato al negozio (con link recensione sempre
  disponibile, per correttezza).
- **Guide arricchite** (`GuideList`): contenuti ripresi da
  Gianfranco_vision_group, espandibili.

Lato ottico, il pannello Boutique mostra ora **"Ritorno dai funnel"**:
giri ruota → premi ritirati al banco, inviti → nuovi clienti,
recensioni → media. È l'argomento di vendita reso visibile.

Dipendenza aggiunta: `qrcode.react`.

## v0.3 — Demo 3: Banco professionale

Il modulo Banco ora ha due anime, con sotto-navigazione interna:

- **Preventivo** (com'era, più le colonne buono/migliore/premium ora
  selezionabili) e
- **Busta lavoro**: workflow guidato in 7 step ripreso da
  Gestionale_ottica — Cliente → Prescrizione → Montatura → Lenti →
  Garanzie → Centratura → Riepilogo. Montatura, geometria e pacchetto
  arrivano precompilati dalla colonna scelta al preventivatore; il
  totale si aggiorna in tempo reale.

Dentro c'è il dominio vero, da far validare ad AD:

- Rx per occhio con step da 0,25 D (sfero −20/+20, cilindro ±6), asse a
  passi di 5° con **schema TABO** disegnato (stessa formula del vecchio
  gestionale), ADD condivisa 0–3,50 per progressive/bifocali/office,
  template rapidi (Emmetrope, Miopia lieve/moderata, Ipermetropia,
  Astigmatismo);
- lenti: tipo, materiale (CR39/Policarbonato/Trivex/Minerale), indice
  1.50→1.74, trattamenti extra coi prezzi del vecchio modulo, garanzie
  (soddisfatti/rottura/smarrimento);
- centratura: PD OD/OS con totale, altezze di montaggio, angolo
  pantoscopico, distanza vertice, note tecniche;
- riepilogo in stile busta stampabile con numero e data.

Rimandati di proposito (esistono già nel vecchio modulo, li portiamo
quando serve): prisma, visione da vicino separata, PDF reale.

## v0.4 — Banco: la vendita guidata

Il Banco ora ha tre modalità (sotto-navigazione interna):

- **Vendita guidata** — il funnel cliente-davanti: visita fatta,
  montatura scelta, ci si siede al tavolino e il tablet conduce la
  conversazione. Una decisione per schermata, con la demo visiva nel
  punto in cui serve: spessori del bordo per indice (calcolati sulla
  gradazione del cliente), scena notturna per l'antiriflesso, schermo
  con/senza filtro blu, fotocromatico, geometrie progressive. I
  "consigliato per te" nascono dalle risposte del primo step (come usi
  gli occhi — il metodo EAR fatto software) e il totale è sempre in
  vista. Prezzi à la carte: base per geometria + supplemento indice +
  trattamenti.
- **Preventivo rapido** — i tre pacchetti di prima, per l'ottico
  esperto che va veloce. Qui restano anche conversione LAC e magazzino.
- **Busta lavoro** — riceve la configurazione da entrambe le strade
  (pacchetto o su misura) già precompilata.

Due modi di vendere, un solo punto d'arrivo: per l'ottico navigato la
guidata è un supporto, per il collaboratore junior è la traccia della
vendita.

Nota architettura: le scene dimostrative sono state estratte in
`LensScenes.tsx` (il vecchio LensConfigurator è stato rimosso: ogni
scena ora vive dentro lo step della sua decisione).

## Magazzino — parcheggiato (decisione)

Niente collegamento diretto col gestionale del negozio: i dati
arriveranno via **export CSV** (quotidiano o settimanale) con un parser
dedicato per tracciato. Da costruire quando si parte coi piloti.

## v0.5 — Il sito pubblico

- `/` e ora la landing (posizionamento: il livello che fa guadagnare,
  sopra qualunque gestionale, FOCUS incluso, mai contro): hero con la
  matematica 149-480, i tre moduli, come funziona (export CSV, tablet,
  richiami in giornata), calcolatore ROI interattivo, sezione voucher
  camerali, visione futuro (smart glasses + telerefrazione, con la riga
  MIDO 2027), prezzi trasparenti, FAQ = le obiezioni del kit, contatti.
- L'hub delle demo si e spostato su `/demo` (copy resa pubblica);
  `/demo/[tenant]` invariato. Il sito linka la demo ovunque: da noi il
  prodotto si tocca senza parlare con nessuno.
- Placeholder da sostituire prima del deploy pubblico: email
  `info@vistasuite.example`, dominio, P.IVA in footer.

## Prossimi passi (ordine concordato)

1. ✅ Demo 1 — suite consolidata su architettura tenant
2. ✅ Demo 2 — Boutique arricchita coi funnel (v0.2)
3. ✅ Demo 3 — Banco professionale con la logica di `Gestionale_ottica`
   (prescrizione completa, busta lavoro)
4. Demo 4 — scanner magazzino reale da `Conta_UPC` (BarcodeDetector)
5. Supabase: tabella `aziende` ← shape di `Tenant`, RLS come in
   `Next_gestionale_v1`

---

Spirale Editrice / VISTA · uso interno
