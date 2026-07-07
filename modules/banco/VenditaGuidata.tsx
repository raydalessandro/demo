"use client";

import { useMemo, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Home,
  RotateCcw,
  Send,
  Sun,
} from "lucide-react";
import { VISTA as T } from "@/lib/theme";
import {
  AR_OPZIONI,
  INDICI_INFO,
  LENTE_BASE,
  MONTATURE,
  PREZZO_BLU,
  PREZZO_FOTO,
  PROG_QUALITA,
  STILI_VITA,
  TRATTAMENTI_EXTRA,
} from "@/lib/demo-data";
import { BarraSpessore, LenteProgressiva, SceneNotturna, SceneSchermo, SceneSole } from "./LensScenes";

/**
 * Vendita guidata — il funnel al banco.
 *
 * Visita fatta, montatura scelta: ottico e cliente si siedono allo
 * stesso tavolino e il tablet guida la conversazione. Una decisione per
 * schermata, la demo visiva nel punto in cui serve, il "consigliato per
 * te" che nasce dalle risposte del cliente (metodo EAR: prima
 * l'ascolto), il totale sempre visibile. Per l'ottico esperto è un
 * supporto; per il collaboratore junior è la traccia della vendita.
 */

export interface ConfigSuMisura {
  label: string;
  lente: number;
  voci: string[];
  fotoIncluso: boolean;
  geoId: string;
}

const TIPI = [
  { id: "monofocale", label: "Monofocale" },
  { id: "progressiva", label: "Progressiva" },
  { id: "office", label: "Office" },
] as const;

type Tipo = (typeof TIPI)[number]["id"];

const TITOLI: Record<string, { t: string; s: string }> = {
  inizio: { t: "Costruiamo le tue lenti", s: "Insieme, un passo alla volta." },
  vita: { t: "Come usi i tuoi occhi?", s: "Seleziona tutto quello che ti riguarda: il resto lo tariamo su questo." },
  spessore: { t: "Quanto sottili le vuoi?", s: "Con la tua gradazione, ecco come cambia il bordo della lente." },
  ar: { t: "Guida notturna e riflessi", s: "Guarda la differenza: stessi fari, con e senza antiriflesso." },
  blu: { t: "Le ore davanti allo schermo", s: "Il filtro smorza la componente blu più affaticante." },
  foto: { t: "Dentro e fuori, un solo occhiale", s: "La lente si scurisce da sola quando esci." },
  prog: { t: "Il comfort della tua progressiva", s: "Più la geometria è evoluta, più ampio è il campo nitido." },
  fine: { t: "La tua proposta", s: "Tutto quello che abbiamo scelto insieme, nero su bianco." },
};

function suggeritoIdx(maxSfero: number): number {
  if (maxSfero >= 6) return 4;
  if (maxSfero >= 4) return 3;
  if (maxSfero >= 2.25) return 2;
  return -1;
}

function Consigliato() {
  return (
    <span
      className="text-[9px] f-ui font-semibold px-1.5 py-0.5 rounded-full"
      style={{ background: T.amberSoft, color: T.amber }}
    >
      consigliato per te
    </span>
  );
}

function CardScelta({
  attiva,
  onClick,
  titolo,
  prezzo,
  nota,
  consigliata,
}: {
  attiva: boolean;
  onClick: () => void;
  titolo: string;
  prezzo: string;
  nota?: string;
  consigliata?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl p-3 text-left flex items-center gap-3"
      style={{
        background: attiva ? T.tealSoft : T.paper,
        border: `1px solid ${attiva ? T.teal : T.line}`,
      }}
    >
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
        style={attiva ? { background: T.teal } : { border: `2px solid ${T.line}`, background: "#fff" }}
      >
        {attiva && <Check size={12} color="#fff" />}
      </span>
      <span className="flex-1 min-w-0">
        <span className="flex items-center gap-2 flex-wrap">
          <span className="text-sm f-ui font-semibold" style={{ color: T.ink }}>{titolo}</span>
          {consigliata && <Consigliato />}
        </span>
        {nota && <span className="block text-[11px]" style={{ color: T.inkSoft }}>{nota}</span>}
      </span>
      <span className="f-mono text-sm shrink-0" style={{ color: T.ink }}>{prezzo}</span>
    </button>
  );
}

function ToggleDemo({
  sinistra,
  destra,
  stato,
  setStato,
  IconaSx,
  IconaDx,
}: {
  sinistra: string;
  destra: string;
  stato: boolean;
  setStato: (v: boolean) => void;
  IconaSx?: typeof Sun;
  IconaDx?: typeof Sun;
}) {
  return (
    <div className="flex gap-1.5 mt-2">
      {(
        [
          [false, sinistra, IconaSx],
          [true, destra, IconaDx],
        ] as const
      ).map(([v, l, Ico]) => (
        <button
          key={l}
          onClick={() => setStato(v)}
          className="flex-1 text-xs py-2 rounded-lg f-ui font-semibold flex items-center justify-center gap-1.5"
          style={
            stato === v
              ? { background: T.ink, color: "#fff" }
              : { background: T.paper, color: T.ink, border: `1px solid ${T.line}` }
          }
        >
          {Ico && <Ico size={13} />} {l}
        </button>
      ))}
    </div>
  );
}

export default function VenditaGuidata({
  montatura,
  setMontatura,
  onBusta,
}: {
  montatura: (typeof MONTATURE)[number];
  setMontatura: (m: (typeof MONTATURE)[number]) => void;
  onBusta: (c: ConfigSuMisura) => void;
}) {
  const [passo, setPasso] = useState(0);
  const [nome, setNome] = useState("Laura");
  const [tipo, setTipo] = useState<Tipo>("progressiva");
  const [vita, setVita] = useState<string[]>([]);
  const [maxSfero, setMaxSfero] = useState(3.0);
  const [indiceIdx, setIndiceIdx] = useState(2);
  const [ar, setAr] = useState<"nessuno" | "classico" | "premium">("classico");
  const [blu, setBlu] = useState(false);
  const [foto, setFoto] = useState(false);
  const [progQ, setProgQ] = useState(1);
  const [extra, setExtra] = useState<string[]>([]);
  // stati locali delle demo
  const [demoAr, setDemoAr] = useState(false);
  const [demoSchermo, setDemoSchermo] = useState(false);
  const [demoSole, setDemoSole] = useState(true);

  const steps = useMemo(() => {
    const s = ["inizio", "vita", "spessore", "ar", "blu", "foto"];
    if (tipo === "progressiva") s.push("prog");
    s.push("fine");
    return s;
  }, [tipo]);

  const corrente = steps[Math.min(passo, steps.length - 1)];
  const consigliato = suggeritoIdx(maxSfero);

  const lenteBase = tipo === "progressiva" ? PROG_QUALITA[progQ].prezzo : LENTE_BASE[tipo];
  const arPrezzo = AR_OPZIONI.find((o) => o.id === ar)?.prezzo ?? 0;
  const extraPrezzo = TRATTAMENTI_EXTRA.filter((t) => extra.includes(t.id)).reduce((s, t) => s + t.prezzo, 0);
  const lentiTot =
    lenteBase +
    INDICI_INFO[indiceIdx].supplemento +
    arPrezzo +
    (blu ? PREZZO_BLU : 0) +
    (foto ? PREZZO_FOTO : 0) +
    extraPrezzo;
  const totale = montatura.prezzo + lentiTot;

  const toggleVita = (id: string) =>
    setVita((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]));

  const apriBusta = () => {
    const voci = [
      `${TIPI.find((t) => t.id === tipo)?.label}${tipo === "progressiva" ? ` · geometria ${PROG_QUALITA[progQ].nome}` : ""}`,
      `Indice ${INDICI_INFO[indiceIdx].indice}`,
      ar !== "nessuno" ? `Antiriflesso ${AR_OPZIONI.find((o) => o.id === ar)?.label}` : null,
      blu ? "Filtro luce blu" : null,
      foto ? "Fotocromatiche" : null,
      ...TRATTAMENTI_EXTRA.filter((t) => extra.includes(t.id)).map((t) => t.label),
    ].filter(Boolean) as string[];
    onBusta({
      label: "Su misura",
      lente: lentiTot,
      voci,
      fotoIncluso: foto,
      geoId: tipo === "progressiva" ? "prog" : tipo === "office" ? "office" : "mono",
    });
  };

  const titolo = TITOLI[corrente];

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: T.card, border: `1px solid ${T.line}` }}>
      {/* progresso */}
      <div className="flex gap-1 px-4 pt-3">
        {steps.map((s, i) => (
          <div
            key={s}
            className="h-1 flex-1 rounded-full"
            style={{ background: i <= passo ? T.teal : T.line, transition: "background .3s" }}
          />
        ))}
      </div>

      <div className="p-4">
        <h2 className="f-serif text-xl leading-tight" style={{ color: T.ink }}>{titolo.t}</h2>
        <p className="text-xs mt-1 mb-3" style={{ color: T.inkSoft }}>{titolo.s}</p>

        {corrente === "inizio" && (
          <div className="space-y-3">
            <div>
              <div className="text-[10px] f-ui mb-1" style={{ color: T.inkSoft }}>Nome del cliente</div>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-lg px-2.5 py-2 text-sm f-ui outline-none"
                style={{ background: T.paper, border: `1px solid ${T.line}`, color: T.ink }}
              />
            </div>
            <div>
              <div className="text-[10px] f-ui mb-1" style={{ color: T.inkSoft }}>La montatura scelta</div>
              <div className="flex gap-1.5 flex-wrap">
                {MONTATURE.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMontatura(m)}
                    className="text-xs px-2.5 py-1.5 rounded-lg f-ui"
                    style={
                      montatura.id === m.id
                        ? { background: T.ink, color: "#fff" }
                        : { background: T.paper, color: T.ink, border: `1px solid ${T.line}` }
                    }
                  >
                    {m.nome} · <span className="f-mono">€{m.prezzo}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] f-ui mb-1" style={{ color: T.inkSoft }}>Tipo di lente (dalla visita)</div>
              <div className="flex gap-1.5">
                {TIPI.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTipo(t.id)}
                    className="flex-1 text-xs px-2 py-2 rounded-lg f-ui font-semibold"
                    style={
                      tipo === t.id
                        ? { background: T.teal, color: "#fff" }
                        : { background: T.paper, color: T.ink, border: `1px solid ${T.line}` }
                    }
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-[11px] italic" style={{ color: T.inkSoft }}>
              Da compilare col cliente accanto: è l&apos;inizio della conversazione, non un modulo.
            </div>
          </div>
        )}

        {corrente === "vita" && (
          <div className="grid grid-cols-2 gap-2">
            {STILI_VITA.map((s) => {
              const on = vita.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleVita(s.id)}
                  className="rounded-xl p-3 text-left"
                  style={{
                    background: on ? T.tealSoft : T.paper,
                    border: `1px solid ${on ? T.teal : T.line}`,
                  }}
                >
                  <div className="text-xl">{s.emoji}</div>
                  <div className="text-xs f-ui font-semibold mt-1 leading-snug" style={{ color: T.ink }}>
                    {s.label}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {corrente === "spessore" && (
          <div>
            <div className="flex items-center justify-between rounded-lg p-2.5 mb-3" style={{ background: T.paper, border: `1px solid ${T.line}` }}>
              <span className="text-xs f-ui" style={{ color: T.ink }}>Gradazione più alta (sfero)</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setMaxSfero(Math.max(0, +(maxSfero - 0.25).toFixed(2)))}
                  className="w-7 h-7 rounded-md f-mono"
                  style={{ background: "#fff", border: `1px solid ${T.line}`, color: T.ink }}
                >
                  −
                </button>
                <span className="f-mono text-sm w-12 text-center" style={{ color: T.ink }}>
                  {maxSfero.toFixed(2)}
                </span>
                <button
                  onClick={() => setMaxSfero(Math.min(12, +(maxSfero + 0.25).toFixed(2)))}
                  className="w-7 h-7 rounded-md f-mono"
                  style={{ background: "#fff", border: `1px solid ${T.line}`, color: T.ink }}
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {INDICI_INFO.map((info, i) => {
                const attivo = indiceIdx === i;
                const spessore = 1.8 + maxSfero * 1.15 * info.fattore;
                return (
                  <button
                    key={info.indice}
                    onClick={() => setIndiceIdx(i)}
                    className="rounded-xl p-2 flex flex-col items-center gap-1"
                    style={{
                      background: attivo ? T.tealSoft : T.paper,
                      border: `1px solid ${attivo ? T.teal : T.line}`,
                    }}
                  >
                    <span className="f-mono text-[11px] font-semibold" style={{ color: T.ink }}>
                      {info.indice}
                    </span>
                    <BarraSpessore spessoreMm={spessore} attivo={attivo} />
                    <span className="f-mono text-[9px]" style={{ color: T.inkSoft }}>
                      {info.supplemento === 0 ? "incluso" : `+€${info.supplemento}`}
                    </span>
                    {consigliato === i && (
                      <span className="text-[8px] f-ui font-semibold px-1 py-0.5 rounded-full" style={{ background: T.amberSoft, color: T.amber }}>
                        consigliato
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="text-[10px] f-mono mt-1.5 text-right" style={{ color: T.inkSoft }}>
              spessore indicativo del bordo in mm, a parità di montatura
            </div>
          </div>
        )}

        {corrente === "ar" && (
          <div>
            <SceneNotturna riflessi={!demoAr} />
            <ToggleDemo sinistra="Senza antiriflesso" destra="Con antiriflesso" stato={demoAr} setStato={setDemoAr} />
            <div className="space-y-1.5 mt-3">
              {AR_OPZIONI.map((o) => (
                <CardScelta
                  key={o.id}
                  attiva={ar === o.id}
                  onClick={() => setAr(o.id as typeof ar)}
                  titolo={`Antiriflesso ${o.label !== "Nessuno" ? o.label.toLowerCase() : ""}`.trim()}
                  prezzo={o.prezzo === 0 ? "—" : `+€${o.prezzo}`}
                  nota={o.nota}
                  consigliata={o.id === "premium" && vita.includes("guida")}
                />
              ))}
            </div>
          </div>
        )}

        {corrente === "blu" && (
          <div>
            <SceneSchermo filtro={demoSchermo} />
            <ToggleDemo sinistra="Senza filtro" destra="Con filtro" stato={demoSchermo} setStato={setDemoSchermo} />
            <div className="space-y-1.5 mt-3">
              <CardScelta
                attiva={blu}
                onClick={() => setBlu(true)}
                titolo="Aggiungi il filtro luce blu"
                prezzo={`+€${PREZZO_BLU}`}
                nota="per chi passa ore su PC e telefono"
                consigliata={vita.includes("schermi")}
              />
              <CardScelta attiva={!blu} onClick={() => setBlu(false)} titolo="No, grazie" prezzo="—" />
            </div>
          </div>
        )}

        {corrente === "foto" && (
          <div>
            <SceneSole scurita={demoSole} />
            <ToggleDemo
              sinistra="Al chiuso"
              destra="All'aperto"
              stato={demoSole}
              setStato={setDemoSole}
              IconaSx={Home}
              IconaDx={Sun}
            />
            <div className="space-y-1.5 mt-3">
              <CardScelta
                attiva={foto}
                onClick={() => setFoto(true)}
                titolo="Lenti fotocromatiche"
                prezzo={`+€${PREZZO_FOTO}`}
                nota={'"non cambi più occhiale quando esci"'}
                consigliata={vita.includes("aperto") || vita.includes("sport")}
              />
              <CardScelta attiva={!foto} onClick={() => setFoto(false)} titolo="No, grazie" prezzo="—" />
            </div>
          </div>
        )}

        {corrente === "prog" && (
          <div>
            <div className="flex gap-1.5 mb-2">
              {PROG_QUALITA.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setProgQ(q.id)}
                  className="flex-1 text-xs py-2 rounded-lg f-ui font-semibold"
                  style={
                    progQ === q.id
                      ? { background: T.ink, color: "#fff" }
                      : { background: T.paper, color: T.ink, border: `1px solid ${T.line}` }
                  }
                >
                  {q.nome} · <span className="f-mono">€{q.prezzo}</span>
                </button>
              ))}
            </div>
            <LenteProgressiva livello={progQ} />
            <div className="text-xs mt-2" style={{ color: T.inkSoft }}>
              {progQ === 0
                ? "Geometria base: campo nitido più stretto, ci si abitua muovendo di più la testa."
                : progQ === 1
                  ? "Geometria comfort: buon compromesso tra campo visivo e prezzo."
                  : "Geometria top: campo nitido ampio, adattamento più rapido e naturale."}
            </div>
          </div>
        )}

        {corrente === "fine" && (
          <div>
            <div className="rounded-xl p-3" style={{ background: T.paper, border: `1px solid ${T.line}` }}>
              <div className="f-ui font-semibold text-sm mb-2" style={{ color: T.ink }}>
                Per {nome || "il cliente"} · {montatura.nome}
              </div>
              {[
                [montatura.nome, montatura.prezzo],
                [
                  `Lente ${TIPI.find((t) => t.id === tipo)?.label.toLowerCase()}${tipo === "progressiva" ? ` ${PROG_QUALITA[progQ].nome}` : ""}`,
                  lenteBase,
                ],
                INDICI_INFO[indiceIdx].supplemento > 0
                  ? [`Indice ${INDICI_INFO[indiceIdx].indice} (${INDICI_INFO[indiceIdx].nota})`, INDICI_INFO[indiceIdx].supplemento]
                  : null,
                ar !== "nessuno" ? [`Antiriflesso ${AR_OPZIONI.find((o) => o.id === ar)?.label.toLowerCase()}`, arPrezzo] : null,
                blu ? ["Filtro luce blu", PREZZO_BLU] : null,
                foto ? ["Fotocromatiche", PREZZO_FOTO] : null,
                ...TRATTAMENTI_EXTRA.filter((t) => extra.includes(t.id)).map((t) => [t.label, t.prezzo] as [string, number]),
              ]
                .filter(Boolean)
                .map((riga) => {
                  const [label, prezzo] = riga as [string, number];
                  return (
                    <div key={label} className="flex justify-between py-1 text-xs" style={{ borderTop: `1px solid ${T.line}` }}>
                      <span className="f-ui" style={{ color: T.ink }}>{label}</span>
                      <span className="f-mono" style={{ color: T.inkSoft }}>€{prezzo}</span>
                    </div>
                  );
                })}
              <div className="flex justify-between pt-2 mt-1" style={{ borderTop: `2px solid ${T.ink}` }}>
                <span className="f-ui font-semibold text-sm" style={{ color: T.ink }}>Totale</span>
                <span className="f-mono font-semibold text-lg" style={{ color: T.ink }}>€{totale}</span>
              </div>
            </div>

            <div className="text-[10px] f-ui mt-3 mb-1" style={{ color: T.inkSoft }}>
              Ritocchi finali (facoltativi)
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {TRATTAMENTI_EXTRA.map((t) => {
                const on = extra.includes(t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => setExtra((e) => (on ? e.filter((x) => x !== t.id) : [...e, t.id]))}
                    className="text-[11px] f-ui font-semibold px-2.5 py-1.5 rounded-full"
                    style={
                      on
                        ? { background: T.teal, color: "#fff" }
                        : { background: T.paper, color: T.ink, border: `1px solid ${T.line}` }
                    }
                  >
                    {t.label} +€{t.prezzo}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                className="flex-1 rounded-lg py-2.5 f-ui font-semibold text-sm flex items-center justify-center gap-2"
                style={{ background: T.paper, color: T.ink, border: `1px solid ${T.line}` }}
              >
                <Send size={14} /> Invia al cliente
              </button>
              <button
                onClick={apriBusta}
                className="flex-1 rounded-lg py-2.5 f-ui font-semibold text-sm flex items-center justify-center gap-2"
                style={{ background: T.teal, color: "#fff" }}
              >
                <ClipboardList size={14} /> Apri busta lavoro
              </button>
            </div>
            <button
              onClick={() => {
                setPasso(0);
                setVita([]);
                setExtra([]);
              }}
              className="mt-2 w-full text-[10px] f-mono flex items-center justify-center gap-1"
              style={{ color: T.inkSoft }}
            >
              <RotateCcw size={10} /> ricomincia il percorso
            </button>
          </div>
        )}

        {/* totale parziale + navigazione */}
        {corrente !== "fine" && (
          <>
            {passo >= 2 && (
              <div className="f-mono text-[10px] mt-3 text-right" style={{ color: T.inkSoft }}>
                totale finora: <span style={{ color: T.teal }}>€{totale}</span> (montatura inclusa)
              </div>
            )}
            <div className="flex gap-2 mt-3">
              {passo > 0 && (
                <button
                  onClick={() => setPasso(passo - 1)}
                  className="flex-1 rounded-lg py-2.5 f-ui font-semibold text-sm flex items-center justify-center gap-1.5"
                  style={{ background: T.paper, color: T.ink, border: `1px solid ${T.line}` }}
                >
                  <ChevronLeft size={15} /> Indietro
                </button>
              )}
              <button
                onClick={() => setPasso(passo + 1)}
                className="flex-[2] rounded-lg py-2.5 f-ui font-semibold text-sm flex items-center justify-center gap-1.5"
                style={{ background: T.ink, color: "#fff" }}
              >
                {passo === 0 ? "Iniziamo" : "Avanti"} <ChevronRight size={15} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
