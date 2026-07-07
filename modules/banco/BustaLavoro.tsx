"use client";

import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, FileText, Minus, Plus, Send } from "lucide-react";
import { VISTA as T } from "@/lib/theme";
import {
  GARANZIE,
  INDICI,
  MATERIALI,
  TIPI_LENTE,
  TRATTAMENTI_EXTRA,
} from "@/lib/demo-data";
import RxEditor, { RX_INIZIALE, type Rx } from "./RxEditor";

/**
 * Busta lavoro — workflow guidato ripreso da Gestionale_ottica
 * (Cliente → Montatura → Lenti → Garanzie → Centratura → Riepilogo),
 * con in più lo step Prescrizione: nel vecchio gestionale la Rx arrivava
 * dal modulo Visite, qui è inglobata per la demo.
 */

const STEPS = ["Cliente", "Prescrizione", "Montatura", "Lenti", "Garanzie", "Centratura", "Riepilogo"];

const geoToTipo: Record<string, string> = {
  mono: "monofocale",
  office: "office",
  prog: "progressiva",
};

interface Props {
  montatura: { id: number; nome: string; prezzo: number };
  geo: { id: string; label: string; base: number[] };
  tier: { nome: string; lente: number; voci: string[] };
  fotoIncluso: boolean;
}

const inputStyle: React.CSSProperties = {
  background: T.paper,
  border: `1px solid ${T.line}`,
  color: T.ink,
};

function Campo({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <div className="text-[10px] f-ui mb-1" style={{ color: T.inkSoft }}>{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg px-2.5 py-2 text-sm f-ui outline-none"
        style={inputStyle}
      />
    </div>
  );
}

function NumRow({
  label,
  value,
  step,
  min,
  max,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  step: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  const set = (d: 1 | -1) =>
    onChange(Math.max(min, Math.min(max, +(value + d * step).toFixed(1))));
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs f-ui" style={{ color: T.ink }}>{label}</span>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => set(-1)}
          className="w-6 h-6 rounded-md flex items-center justify-center"
          style={{ background: T.paper, border: `1px solid ${T.line}` }}
        >
          <Minus size={11} style={{ color: T.ink }} />
        </button>
        <span className="f-mono text-xs w-16 text-center" style={{ color: T.ink }}>
          {value} {unit}
        </span>
        <button
          onClick={() => set(1)}
          className="w-6 h-6 rounded-md flex items-center justify-center"
          style={{ background: T.paper, border: `1px solid ${T.line}` }}
        >
          <Plus size={11} style={{ color: T.ink }} />
        </button>
      </div>
    </div>
  );
}

function Scelta({
  label,
  opzioni,
  value,
  onChange,
}: {
  label: string;
  opzioni: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="text-[10px] f-ui mb-1" style={{ color: T.inkSoft }}>{label}</div>
      <div className="flex gap-1.5 flex-wrap">
        {opzioni.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className="text-[11px] f-ui font-semibold px-2.5 py-1.5 rounded-lg"
            style={
              value === o
                ? { background: T.teal, color: "#fff" }
                : { background: T.paper, color: T.ink, border: `1px solid ${T.line}` }
            }
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

const fmtD = (v: number) => (v > 0 ? "+" : "") + v.toFixed(2);

export default function BustaLavoro({ montatura, geo, tier, fotoIncluso }: Props) {
  const [step, setStep] = useState(0);
  const [inviata, setInviata] = useState(false);
  const [numero] = useState(() => `BL-2026-0${100 + Math.floor(Math.random() * 900)}`);

  // stato per step
  const [cliente, setCliente] = useState({ nome: "Laura Bianchi", tel: "347 555 0192" });
  const [rx, setRx] = useState<Rx>(RX_INIZIALE);
  const [addizione, setAddizione] = useState(2.0);
  const [mont, setMont] = useState({
    nome: montatura.nome,
    colore: "Nero",
    upc: "8053672000000",
    prezzo: montatura.prezzo,
  });
  const [tipo, setTipo] = useState(geoToTipo[geo.id] ?? "monofocale");
  const [materiale, setMateriale] = useState("CR39 (resina)");
  const [indice, setIndice] = useState(tier.nome === "Buono" ? "1.50" : tier.nome === "Migliore" ? "1.60" : "1.67");
  const [extra, setExtra] = useState<string[]>([]);
  const [foto, setFoto] = useState(fotoIncluso);
  const [gar, setGar] = useState<string[]>([]);
  const [cent, setCent] = useState({
    pdOD: 31.5,
    pdOS: 31.5,
    altOD: 18,
    altOS: 18,
    pantoscopico: 8,
    vertice: 12,
    note: "",
  });

  const conAdd = tipo !== "monofocale";

  const totale = useMemo(() => {
    const extraTot = TRATTAMENTI_EXTRA.filter((t) => extra.includes(t.id)).reduce((s, t) => s + t.prezzo, 0);
    const garTot = GARANZIE.filter((g) => gar.includes(g.id)).reduce((s, g) => s + g.prezzo, 0);
    const fotoTot = foto && !fotoIncluso ? 80 : 0;
    return mont.prezzo + tier.lente + extraTot + fotoTot + garTot;
  }, [mont.prezzo, tier, extra, foto, fotoIncluso, gar]);

  const toggle = (arr: string[], set: (v: string[]) => void, id: string) =>
    set(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);

  return (
    <div className="rounded-xl p-3" style={{ background: T.card, border: `1px solid ${T.line}` }}>
      {/* stepper */}
      <div className="flex gap-1 overflow-x-auto pb-2 -mx-1 px-1">
        {STEPS.map((s, i) => {
          const done = i < step;
          const attivo = i === step;
          return (
            <button
              key={s}
              onClick={() => i <= step && setStep(i)}
              className="flex items-center gap-1 shrink-0 text-[10px] f-ui font-semibold px-2 py-1 rounded-full"
              style={
                attivo
                  ? { background: T.ink, color: "#fff" }
                  : done
                    ? { background: T.tealSoft, color: T.teal }
                    : { background: T.paper, color: T.inkSoft, border: `1px solid ${T.line}` }
              }
            >
              {done ? <Check size={10} /> : <span className="f-mono">{i + 1}</span>}
              {s}
            </button>
          );
        })}
      </div>

      <div className="mt-2 min-h-[220px]">
        {step === 0 && (
          <div className="space-y-3">
            <Campo label="Nome e cognome *" value={cliente.nome} onChange={(v) => setCliente({ ...cliente, nome: v })} />
            <Campo label="Telefono" value={cliente.tel} onChange={(v) => setCliente({ ...cliente, tel: v })} />
            <div className="text-[11px]" style={{ color: T.inkSoft }}>
              In produzione il cliente si aggancia dall&apos;anagrafica (la stessa che alimenta Recall).
            </div>
          </div>
        )}

        {step === 1 && (
          <RxEditor rx={rx} setRx={setRx} conAdd={conAdd} addizione={addizione} setAddizione={setAddizione} />
        )}

        {step === 2 && (
          <div className="space-y-3">
            <Campo label="Marca e modello *" value={mont.nome} onChange={(v) => setMont({ ...mont, nome: v })} placeholder="Ray-Ban RB2132 Wayfarer" />
            <div className="grid grid-cols-2 gap-3">
              <Campo label="Colore" value={mont.colore} onChange={(v) => setMont({ ...mont, colore: v })} />
              <Campo label="UPC / codice articolo" value={mont.upc} onChange={(v) => setMont({ ...mont, upc: v })} />
            </div>
            <NumRow label="Prezzo montatura" value={mont.prezzo} step={5} min={0} max={2000} unit="€" onChange={(v) => setMont({ ...mont, prezzo: v })} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <Scelta label="Tipo lente" opzioni={TIPI_LENTE.map((t) => t.label)} value={TIPI_LENTE.find((t) => t.id === tipo)?.label ?? ""} onChange={(l) => setTipo(TIPI_LENTE.find((t) => t.label === l)?.id ?? "monofocale")} />
            <Scelta label="Materiale" opzioni={MATERIALI} value={materiale} onChange={setMateriale} />
            <Scelta label="Indice di rifrazione" opzioni={INDICI} value={indice} onChange={setIndice} />

            <div className="rounded-lg p-2.5" style={{ background: T.tealSoft }}>
              <div className="text-[11px] f-ui font-semibold" style={{ color: T.teal }}>
                Pacchetto {tier.nome} · €{tier.lente} — incluso dal preventivo
              </div>
              <div className="text-[10px] mt-0.5" style={{ color: T.inkSoft }}>{tier.voci.join(" · ")}</div>
            </div>

            <div>
              <div className="text-[10px] f-ui mb-1" style={{ color: T.inkSoft }}>Trattamenti extra</div>
              {TRATTAMENTI_EXTRA.map((t) => (
                <button
                  key={t.id}
                  onClick={() => toggle(extra, setExtra, t.id)}
                  className="w-full flex items-center gap-2 py-1.5 text-left"
                >
                  <span
                    className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                    style={
                      extra.includes(t.id)
                        ? { background: T.teal }
                        : { background: T.paper, border: `1px solid ${T.line}` }
                    }
                  >
                    {extra.includes(t.id) && <Check size={11} color="#fff" />}
                  </span>
                  <span className="flex-1 text-xs f-ui" style={{ color: T.ink }}>{t.label}</span>
                  <span className="f-mono text-xs" style={{ color: T.inkSoft }}>+€{t.prezzo}</span>
                </button>
              ))}
              <button onClick={() => setFoto(!foto)} className="w-full flex items-center gap-2 py-1.5 text-left">
                <span
                  className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                  style={foto ? { background: T.teal } : { background: T.paper, border: `1px solid ${T.line}` }}
                >
                  {foto && <Check size={11} color="#fff" />}
                </span>
                <span className="flex-1 text-xs f-ui" style={{ color: T.ink }}>Fotocromatiche</span>
                <span className="f-mono text-xs" style={{ color: T.inkSoft }}>
                  {fotoIncluso ? "incluse nel pacchetto" : "+€80"}
                </span>
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="text-[10px] f-ui mb-1" style={{ color: T.inkSoft }}>Garanzie opzionali</div>
            {GARANZIE.map((g) => (
              <button key={g.id} onClick={() => toggle(gar, setGar, g.id)} className="w-full flex items-center gap-2 py-2 text-left" style={{ borderTop: `1px solid ${T.line}` }}>
                <span
                  className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                  style={gar.includes(g.id) ? { background: T.teal } : { background: T.paper, border: `1px solid ${T.line}` }}
                >
                  {gar.includes(g.id) && <Check size={11} color="#fff" />}
                </span>
                <span className="flex-1 text-xs f-ui" style={{ color: T.ink }}>{g.label}</span>
                <span className="f-mono text-xs" style={{ color: T.inkSoft }}>+€{g.prezzo}</span>
              </button>
            ))}
          </div>
        )}

        {step === 5 && (
          <div>
            <NumRow label="PD OD" value={cent.pdOD} step={0.5} min={25} max={40} unit="mm" onChange={(v) => setCent({ ...cent, pdOD: v })} />
            <NumRow label="PD OS" value={cent.pdOS} step={0.5} min={25} max={40} unit="mm" onChange={(v) => setCent({ ...cent, pdOS: v })} />
            <div className="text-[10px] f-mono text-right mb-1" style={{ color: T.teal }}>
              PD totale: {(cent.pdOD + cent.pdOS).toFixed(1)} mm
            </div>
            <NumRow label="Altezza montaggio OD" value={cent.altOD} step={0.5} min={12} max={30} unit="mm" onChange={(v) => setCent({ ...cent, altOD: v })} />
            <NumRow label="Altezza montaggio OS" value={cent.altOS} step={0.5} min={12} max={30} unit="mm" onChange={(v) => setCent({ ...cent, altOS: v })} />
            <NumRow label="Angolo pantoscopico" value={cent.pantoscopico} step={1} min={0} max={15} unit="°" onChange={(v) => setCent({ ...cent, pantoscopico: v })} />
            <NumRow label="Distanza vertice" value={cent.vertice} step={1} min={8} max={16} unit="mm" onChange={(v) => setCent({ ...cent, vertice: v })} />
            <div className="mt-1">
              <Campo label="Note tecniche (prismi, altre specifiche)" value={cent.note} onChange={(v) => setCent({ ...cent, note: v })} placeholder="—" />
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="rounded-lg p-3 f-mono text-[11px] leading-relaxed" style={{ background: T.paper, color: T.ink, border: `1px dashed ${T.inkSoft}` }}>
            <div className="flex justify-between f-ui font-semibold text-xs">
              <span>BUSTA LAVORO {numero}</span>
              <span>{new Date().toLocaleDateString("it-IT")}</span>
            </div>
            <div className="mt-2">CLIENTE&nbsp;&nbsp;{cliente.nome} · {cliente.tel}</div>
            <div className="mt-1.5" style={{ color: T.inkSoft }}>PRESCRIZIONE</div>
            <div>OD {fmtD(rx.OD.sfero)} / {fmtD(rx.OD.cilindro)} × {rx.OD.asse}°</div>
            <div>OS {fmtD(rx.OS.sfero)} / {fmtD(rx.OS.cilindro)} × {rx.OS.asse}°{conAdd ? ` · ADD ${fmtD(addizione)}` : ""}</div>
            <div className="mt-1.5" style={{ color: T.inkSoft }}>MONTATURA</div>
            <div>{mont.nome} · {mont.colore} · UPC {mont.upc} — €{mont.prezzo}</div>
            <div className="mt-1.5" style={{ color: T.inkSoft }}>LENTI</div>
            <div>
              {TIPI_LENTE.find((t) => t.id === tipo)?.label} · {materiale} · indice {indice}
              {foto ? " · fotocromatiche" : ""}
            </div>
            <div>Pacchetto {tier.nome} (€{tier.lente}){extra.length > 0 ? ` + ${TRATTAMENTI_EXTRA.filter((t) => extra.includes(t.id)).map((t) => t.label).join(", ")}` : ""}</div>
            {gar.length > 0 && (
              <>
                <div className="mt-1.5" style={{ color: T.inkSoft }}>GARANZIE</div>
                <div>{GARANZIE.filter((g) => gar.includes(g.id)).map((g) => g.label).join(" · ")}</div>
              </>
            )}
            <div className="mt-1.5" style={{ color: T.inkSoft }}>CENTRATURA</div>
            <div>PD {cent.pdOD}/{cent.pdOS} (tot {(cent.pdOD + cent.pdOS).toFixed(1)}) · h {cent.altOD}/{cent.altOS} · pant. {cent.pantoscopico}° · vertice {cent.vertice} mm</div>
            {cent.note && <div>Note: {cent.note}</div>}
            <div className="flex justify-between mt-2 pt-2 f-ui font-semibold text-sm" style={{ borderTop: `1px solid ${T.line}` }}>
              <span>TOTALE</span>
              <span className="f-mono">€{totale}</span>
            </div>
          </div>
        )}
      </div>

      {/* navigazione */}
      <div className="flex gap-2 mt-3">
        {step > 0 && step < 6 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex-1 rounded-lg py-2.5 f-ui font-semibold text-sm flex items-center justify-center gap-1.5"
            style={{ background: T.paper, color: T.ink, border: `1px solid ${T.line}` }}
          >
            <ChevronLeft size={15} /> Indietro
          </button>
        )}
        {step < 6 && (
          <button
            onClick={() => setStep(step + 1)}
            className="flex-1 rounded-lg py-2.5 f-ui font-semibold text-sm flex items-center justify-center gap-1.5"
            style={{ background: T.ink, color: "#fff" }}
          >
            Avanti <ChevronRight size={15} />
          </button>
        )}
        {step === 6 && (
          <button
            onClick={() => setInviata(true)}
            className="flex-1 rounded-lg py-2.5 f-ui font-semibold text-sm flex items-center justify-center gap-2"
            style={{ background: inviata ? T.tealSoft : T.teal, color: inviata ? T.teal : "#fff" }}
          >
            {inviata ? (
              <>
                <Check size={15} /> Inviata al laboratorio — in produzione parte il PDF
              </>
            ) : (
              <>
                <Send size={15} /> Invia al laboratorio
              </>
            )}
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5 mt-2 text-[10px] f-mono" style={{ color: T.inkSoft }}>
        <FileText size={11} /> {numero} · totale in tempo reale: €{totale}
      </div>
    </div>
  );
}
