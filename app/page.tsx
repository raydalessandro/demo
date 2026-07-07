import Link from "next/link";
import RoiCalculator from "@/components/site/RoiCalculator";

/**
 * Landing pubblica di VISTA Suite.
 * Posizionamento: "il livello che fa guadagnare", sopra qualunque
 * gestionale — mai contro. Differenziatori vs incumbent: demo toccabile
 * senza parlare con nessuno, prezzi trasparenti, matematica in hero,
 * voucher come leva, visione futuro (smart + AI) senza promesse mediche.
 */

const INK = "#0D2B2B";
const INKSOFT = "#274744";
const PAPER = "#F2F5F4";
const TEAL = "#127E7A";
const TEALSOFT = "#E2F0EE";
const AMBER = "#C98A2B";
const AMBERSOFT = "#F7EEDD";
const LINE = "#DCE5E3";
const ESPRESSO = "#1C1714";
const IVORY = "#F6F1EA";
const BRASS = "#A67C42";

function Sezione({
  id,
  children,
  bg,
}: {
  id?: string;
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <section id={id} style={{ background: bg ?? "transparent" }}>
      <div className="max-w-3xl mx-auto px-5 py-14">{children}</div>
    </section>
  );
}

function Eyebrow({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <p
      className="f-mono text-[11px] tracking-[0.2em] uppercase mb-2"
      style={{ color: color ?? TEAL }}
    >
      {children}
    </p>
  );
}

export default function Landing() {
  return (
    <main className="f-ui" style={{ background: PAPER, color: INK }}>
      {/* ── nav ── */}
      <header className="sticky top-0 z-20" style={{ background: INK }}>
        <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
          <div className="f-serif text-lg" style={{ color: "#fff" }}>
            VISTA <span style={{ color: "#7FC8C2" }}>Suite</span>
          </div>
          <nav className="hidden sm:flex gap-4 text-xs" style={{ color: "#B7CCC9" }}>
            <a href="#moduli">Moduli</a>
            <a href="#conti">I conti</a>
            <a href="#prezzi">Prezzi</a>
            <a href="#futuro">Futuro</a>
          </nav>
          <Link
            href="/demo/aurora"
            className="text-xs f-ui font-semibold px-3 py-2 rounded-lg shrink-0"
            style={{ background: TEAL, color: "#fff" }}
          >
            Demo dal vivo
          </Link>
        </div>
      </header>

      {/* ── hero ── */}
      <Sezione>
        <Eyebrow>Per il centro ottico indipendente · Milano e hinterland</Eyebrow>
        <h1 className="f-serif text-4xl sm:text-5xl leading-tight">
          Il livello che fa <span style={{ color: TEAL }}>guadagnare</span> il tuo centro ottico.
        </h1>
        <p className="text-base mt-4 max-w-xl leading-relaxed" style={{ color: INKSOFT }}>
          Richiami che riportano i clienti in negozio, vendita guidata al banco,
          l’app col tuo nome in tasca ai tuoi clienti. Tutto sopra il gestionale
          che già usi — FOCUS incluso. Nessuna migrazione, nessun addio.
        </p>

        <div className="flex gap-2.5 mt-6 flex-wrap">
          <Link
            href="/demo/aurora"
            className="f-ui font-semibold text-sm px-4 py-3 rounded-xl"
            style={{ background: INK, color: "#fff" }}
          >
            Tocca la demo — senza registrarti
          </Link>
          <a
            href="#contatti"
            className="f-ui font-semibold text-sm px-4 py-3 rounded-xl"
            style={{ background: "#fff", color: INK, border: `1px solid ${LINE}` }}
          >
            Prenota una visita in negozio
          </a>
        </div>

        {/* la matematica */}
        <div className="mt-10 rounded-2xl p-5" style={{ background: "#fff", border: `1px solid ${LINE}` }}>
          <div className="text-xs f-ui font-semibold mb-3" style={{ color: INKSOFT }}>
            La matematica, prima delle promesse
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Canone suite completa</span>
                <span className="f-mono font-semibold">€149/mese</span>
              </div>
              <div className="h-3 rounded-full" style={{ background: PAPER }}>
                <div className="h-3 rounded-full" style={{ width: "31%", background: "#9DB8B5" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Ritorno stimato prudente</span>
                <span className="f-mono font-semibold" style={{ color: TEAL }}>~€480/mese</span>
              </div>
              <div className="h-3 rounded-full" style={{ background: PAPER }}>
                <div className="h-3 rounded-full" style={{ width: "100%", background: TEAL }} />
              </div>
            </div>
          </div>
          <div className="text-[11px] mt-3 f-mono" style={{ color: INKSOFT }}>
            5 riordini LAC recuperati + 2 preventivi spostati di fascia, al mese.
            Ogni euro ne restituisce circa tre — e la dashboard te lo dimostra ogni mese.
          </div>
        </div>
      </Sezione>

      {/* ── problemi ── */}
      <Sezione bg="#fff">
        <Eyebrow>I tre problemi che conosci bene</Eyebrow>
        <div className="grid sm:grid-cols-3 gap-3 mt-2">
          {[
            ["I clienti non tornano", "Dopo il primo acquisto la maggior parte sparisce: nessuno li richiama."],
            ["Le catene si prendono i giovani", "App, promozioni, marketing: i 20-40enni comprano lì o online."],
            ["Capitale fermo sugli scaffali", "Montature comprate e mai vendute: soldi immobilizzati che nessuno vede più."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl p-4" style={{ background: PAPER, border: `1px solid ${LINE}` }}>
              <div className="w-2 h-2 rounded-full mb-2" style={{ background: AMBER }} />
              <div className="f-ui font-semibold text-sm">{t}</div>
              <div className="text-xs mt-1 leading-relaxed" style={{ color: INKSOFT }}>{d}</div>
            </div>
          ))}
        </div>
        <p className="text-sm mt-4" style={{ color: INKSOFT }}>
          Non è mancanza d’impegno: è che manca lo strumento. Le catene ce l’hanno.
          Ora ce l’hai anche tu — e resta tuo, col tuo nome.
        </p>
      </Sezione>

      {/* ── moduli ── */}
      <Sezione id="moduli">
        <Eyebrow>Tre strumenti, un solo banco digitale</Eyebrow>
        <h2 className="f-serif text-3xl leading-tight">
          Si attivano anche uno alla volta.<br />Si montano come mattoncini.
        </h2>
        <div className="grid sm:grid-cols-3 gap-3 mt-6">
          {[
            [
              "Recall",
              "La segretaria che non dimentica mai",
              "Ogni mattina la lista di chi contattare, col messaggio WhatsApp già scritto. Tu tocchi invia. Il ritorno si vede in poche settimane.",
            ],
            [
              "Banco",
              "La vendita guidata, cliente davanti",
              "Una decisione per schermata: spessori, antiriflesso, fotocromatico — con le demo visive al momento giusto. Poi la busta lavoro, precompilata.",
            ],
            [
              "Boutique",
              "L’app del negozio, col tuo nome",
              "I tuoi clienti riordinano le lenti con un tocco, prenotano, giocano, ti portano amici e recensioni. Come le catene — ma il cliente resta tuo.",
            ],
          ].map(([nome, claim, desc]) => (
            <div key={nome} className="rounded-2xl p-4 flex flex-col" style={{ background: "#fff", border: `1px solid ${LINE}` }}>
              <div className="f-mono text-[10px] uppercase tracking-widest" style={{ color: TEAL }}>{nome}</div>
              <div className="f-serif text-lg mt-1 leading-snug">{claim}</div>
              <div className="text-xs mt-2 leading-relaxed flex-1" style={{ color: INKSOFT }}>{desc}</div>
              <Link href="/demo/aurora" className="text-xs f-ui font-semibold mt-3" style={{ color: TEAL }}>
                Vedilo nella demo →
              </Link>
            </div>
          ))}
        </div>
      </Sezione>

      {/* ── come funziona ── */}
      <Sezione bg="#fff">
        <Eyebrow>Come funziona col tuo gestionale</Eyebrow>
        <h2 className="f-serif text-3xl leading-tight">Nessuna migrazione. Nessun addio.</h2>
        <p className="text-sm mt-3 max-w-xl leading-relaxed" style={{ color: INKSOFT }}>
          Il tuo gestionale resta al suo posto: fa fatture e fisco, cose che sa fare bene.
          Noi facciamo l’unica cosa che non fa — generarti fatturato. I dati entrano con
          un export dal tuo sistema (FOCUS, WINeyes o altri) e il resto lo facciamo noi.
        </p>
        <div className="grid sm:grid-cols-3 gap-3 mt-6">
          {[
            ["1", "Esporti i clienti", "Un file dal tuo gestionale. Ti guidiamo noi, richiede minuti."],
            ["2", "Arriva il banco digitale", "Un tablet già configurato, coi tuoi clienti dentro. Lo accendi e funziona."],
            ["3", "Primi richiami in giornata", "La coda è pronta: tocchi invia. L’avviamento è incluso, in un pomeriggio sei operativo."],
          ].map(([n, t, d]) => (
            <div key={n} className="rounded-2xl p-4" style={{ background: PAPER, border: `1px solid ${LINE}` }}>
              <div className="f-mono text-2xl font-semibold" style={{ color: TEAL }}>{n}</div>
              <div className="f-ui font-semibold text-sm mt-1">{t}</div>
              <div className="text-xs mt-1 leading-relaxed" style={{ color: INKSOFT }}>{d}</div>
            </div>
          ))}
        </div>
        <p className="text-xs mt-4 f-mono" style={{ color: INKSOFT }}>
          E se un giorno non ti serve più: ci restituisci il tablet e finisce lì.
        </p>
      </Sezione>

      {/* ── calcolatore ── */}
      <Sezione id="conti">
        <Eyebrow>Fai i conti coi tuoi numeri</Eyebrow>
        <h2 className="f-serif text-3xl leading-tight mb-6">
          Non crederci sulla parola.<br />Muovi i cursori.
        </h2>
        <RoiCalculator />
      </Sezione>

      {/* ── voucher ── */}
      <Sezione bg={AMBERSOFT}>
        <Eyebrow color={AMBER}>Finanza agevolata</Eyebrow>
        <h2 className="f-serif text-3xl leading-tight">
          Il primo anno può pagartelo la Camera di Commercio.
        </h2>
        <p className="text-sm mt-3 max-w-xl leading-relaxed" style={{ color: INKSOFT }}>
          La digitalizzazione del centro ottico rientra nei bandi Voucher dei PID
          camerali (Doppia Transizione e voucher provinciali): contributi a fondo
          perduto che in molte province coprono dal 50 al 70% delle spese.
          La pratica non è banale — assessment SELFI 4.0, preventivi nel linguaggio
          giusto, rendicontazione — e la impostiamo insieme, chiavi in mano.
        </p>
        <a
          href="mailto:info@vistasuite.example?subject=Verifica%20bando%20provincia"
          className="inline-block mt-5 f-ui font-semibold text-sm px-4 py-3 rounded-xl"
          style={{ background: AMBER, color: "#fff" }}
        >
          Verifica il bando della tua provincia
        </a>
      </Sezione>

      {/* ── futuro ── */}
      <Sezione id="futuro" bg={ESPRESSO}>
        <Eyebrow color={BRASS}>Dove sta andando il settore</Eyebrow>
        <h2 className="f-serif text-3xl leading-tight" style={{ color: IVORY }}>
          Tra la tradizione e il futuro che arriva, ci siamo noi.
        </h2>
        <div className="text-sm mt-4 max-w-xl leading-relaxed space-y-3" style={{ color: "#D8CBB8" }}>
          <p>
            Nel 2025 si sono venduti 9,6 milioni di occhiali smart nel mondo; per il
            2026 gli analisti ne attendono 13,4 (fonte IDC). I primi modelli da vista
            si vendono negli ottici — selezionati. E la telerefrazione è già nei
            listini dei produttori di strumenti.
          </p>
          <p>
            Non ti vendiamo promesse su prodotti che non controlliamo. Ti prepariamo:
            clienti in ordine, app attiva, lista d’attesa smart già piena, processi
            pronti. Quando il futuro busserà alla porta del tuo negozio, sarai tra i
            selezionati — non tra i saltati.
          </p>
          <p className="f-mono text-xs" style={{ color: BRASS }}>
            Milano, 6–8 febbraio 2027: a MIDO il settore vedrà il futuro.
            Noi lo stiamo già installando nei negozi.
          </p>
        </div>
      </Sezione>

      {/* ── prezzi ── */}
      <Sezione id="prezzi">
        <Eyebrow>Prezzi trasparenti</Eyebrow>
        <h2 className="f-serif text-3xl leading-tight">
          Li scriviamo qui, non al telefono.
        </h2>
        <div className="grid sm:grid-cols-3 gap-3 mt-6">
          <div className="rounded-2xl p-4 flex flex-col" style={{ background: "#fff", border: `1px solid ${LINE}` }}>
            <div className="f-ui font-semibold text-sm">Modulo singolo</div>
            <div className="f-mono text-2xl font-semibold mt-1">da €69<span className="text-sm">/mese</span></div>
            <div className="text-xs mt-2 leading-relaxed flex-1" style={{ color: INKSOFT }}>
              Recall, Banco o Boutique. Si parte da dove fa più male, si aggiunge dopo.
            </div>
          </div>
          <div className="rounded-2xl p-4 flex flex-col relative" style={{ background: TEALSOFT, border: `2px solid ${TEAL}` }}>
            <span
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 rounded-full f-ui font-semibold"
              style={{ background: TEAL, color: "#fff" }}
            >
              consigliata
            </span>
            <div className="f-ui font-semibold text-sm">Suite completa</div>
            <div className="f-mono text-2xl font-semibold mt-1">€149<span className="text-sm">/mese</span></div>
            <div className="text-xs mt-2 leading-relaxed flex-1" style={{ color: INKSOFT }}>
              Tre moduli + banco digitale (tablet) incluso. Attivazione €690, avviamento
              e importazione dati compresi. Annuale −15%.
            </div>
          </div>
          <div className="rounded-2xl p-4 flex flex-col" style={{ background: "#fff", border: `1px solid ${LINE}` }}>
            <div className="f-ui font-semibold text-sm">Negozio pilota</div>
            <div className="f-mono text-2xl font-semibold mt-1">€49<span className="text-sm">/mese ×6</span></div>
            <div className="text-xs mt-2 leading-relaxed flex-1" style={{ color: INKSOFT }}>
              Per i primi centri della zona: attivazione gratuita, in cambio del tuo
              feedback da professionista. Dopo 6 mesi decidi sui tuoi numeri.
            </div>
          </div>
        </div>
        <p className="text-xs mt-3 f-mono" style={{ color: INKSOFT }}>
          Con voucher camerale: copertura fino al 70% del primo anno, dove attivo.
        </p>
      </Sezione>

      {/* ── faq ── */}
      <Sezione bg="#fff">
        <Eyebrow>Le domande che ci fanno sempre</Eyebrow>
        <div className="mt-2 space-y-2">
          {[
            [
              "Ho già un gestionale.",
              "Perfetto: lo tieni. Serve per fatture e fisco. Noi facciamo l’unica cosa che lui non fa: generarti fatturato. Non tocchiamo nemmeno il tuo computer — ti portiamo il tablet.",
            ],
            [
              "Non ho tempo di imparare un altro programma.",
              "Per questo esiste la lista “da contattare oggi”: apri il tablet e tocchi invia. L’avviamento lo facciamo noi: in un pomeriggio sei operativo.",
            ],
            [
              "I miei clienti sono anziani, mica usano le app.",
              "Infatti il primo modulo non lo usano i tuoi clienti: lo usi tu, ed è WhatsApp — ce l’hanno anche gli ottantenni. L’app cliente la attiviamo dopo, per riprenderti i quarantenni.",
            ],
          ].map(([q, a]) => (
            <details key={q} className="rounded-2xl p-4" style={{ background: PAPER, border: `1px solid ${LINE}` }}>
              <summary className="f-ui font-semibold text-sm cursor-pointer">{q}</summary>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: INKSOFT }}>{a}</p>
            </details>
          ))}
        </div>
      </Sezione>

      {/* ── contatti ── */}
      <Sezione id="contatti" bg={INK}>
        <h2 className="f-serif text-3xl leading-tight" style={{ color: "#fff" }}>
          Portiamo il banco digitale nel tuo negozio.
        </h2>
        <p className="text-sm mt-3 max-w-xl leading-relaxed" style={{ color: "#B7CCC9" }}>
          Partiamo da Milano e hinterland, poi il resto d’Italia. Una visita di 20
          minuti, la demo sul tuo caso, i conti coi tuoi numeri. Senza impegno.
        </p>
        <div className="flex gap-2.5 mt-6 flex-wrap">
          <a
            href="mailto:info@vistasuite.example?subject=Visita%20in%20negozio"
            className="f-ui font-semibold text-sm px-4 py-3 rounded-xl"
            style={{ background: TEAL, color: "#fff" }}
          >
            Scrivici — ti richiamiamo noi
          </a>
          <Link
            href="/demo/aurora"
            className="f-ui font-semibold text-sm px-4 py-3 rounded-xl"
            style={{ background: "rgba(255,255,255,.1)", color: "#fff" }}
          >
            Intanto, tocca la demo
          </Link>
        </div>
      </Sezione>

      {/* ── footer ── */}
      <footer style={{ background: INK, borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <div className="max-w-3xl mx-auto px-5 py-6 flex flex-wrap gap-3 items-center justify-between">
          <span className="f-mono text-[11px]" style={{ color: "#7A9693" }}>
            VISTA Suite · Spirale Editrice — sito dimostrativo v0.5
          </span>
          <div className="flex gap-4 text-[11px]" style={{ color: "#7A9693" }}>
            <Link href="/demo">Demo</Link>
            <a href="#prezzi">Prezzi</a>
            <a href="#contatti">Contatti</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
