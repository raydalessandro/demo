"use client";

import { useState } from "react";
import Link from "next/link";
import { Maximize2, X } from "lucide-react";
import { PALETTE_SITI, TEMPLATE_SITI } from "@/lib/demo-data";
import {
  TemplateBoutique,
  TemplateStudio,
  TemplateVetrina,
  type SitoConfig,
} from "@/components/agente/TemplateSiti";

/**
 * SelettoreSito — strumento di trattativa per il tablet dell'agente.
 *
 * Il momento demo: l'agente scrive il nome del negozio che ha davanti,
 * sceglie palette e stile, tocca "Mostra a schermo intero" e passa il
 * tablet. In dieci secondi il titolare vede IL SUO sito — non un
 * esempio. Il regalo si consegna alla firma, mai prima.
 */

const INK = "#0D2B2B";
const INKSOFT = "#274744";
const PAPER = "#F2F5F4";
const TEAL = "#127E7A";
const AMBER = "#C98A2B";
const AMBERSOFT = "#F7EEDD";
const LINE = "#DCE5E3";

function Anteprima({ cfg, templateId }: { cfg: SitoConfig; templateId: string }) {
  if (templateId === "boutique") return <TemplateBoutique {...cfg} />;
  if (templateId === "studio") return <TemplateStudio {...cfg} />;
  return <TemplateVetrina {...cfg} />;
}

export default function SelettoreSito() {
  const [nome, setNome] = useState("Ottica Rossi");
  const [citta, setCitta] = useState("Milano");
  const [dal, setDal] = useState("1998");
  const [paletteId, setPaletteId] = useState<string>(PALETTE_SITI[0].id);
  const [templateId, setTemplateId] = useState<string>(TEMPLATE_SITI[0].id);
  const [pieno, setPieno] = useState(false);

  const p = PALETTE_SITI.find((x) => x.id === paletteId) ?? PALETTE_SITI[0];
  const cfg: SitoConfig = {
    nome: nome.trim() || "Ottica Rossi",
    citta: citta.trim() || "Milano",
    dal: dal.trim() || "1998",
    p,
  };
  const template = TEMPLATE_SITI.find((t) => t.id === templateId) ?? TEMPLATE_SITI[0];

  /* schermo intero: solo il sito, un tasto per uscire */
  if (pieno) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: p.surface }}>
        <button
          onClick={() => setPieno(false)}
          aria-label="Chiudi anteprima"
          className="fixed top-3 right-3 z-50 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,0,0,.45)", color: "#fff" }}
        >
          <X size={16} />
        </button>
        <div className="max-w-md mx-auto min-h-screen" style={{ background: p.surface }}>
          <Anteprima cfg={cfg} templateId={templateId} />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen f-ui" style={{ background: PAPER }}>
      <div className="max-w-2xl mx-auto px-5 pt-10 pb-16">
        <Link href="/demo" className="f-mono text-[11px]" style={{ color: TEAL }}>
          ← demo
        </Link>
        <p className="f-mono text-[11px] tracking-[0.2em] uppercase mt-4" style={{ color: AMBER }}>
          Tablet dell’agente · trattativa
        </p>
        <h1 className="f-serif text-3xl mt-1 leading-tight" style={{ color: INK }}>
          Il sito in regalo, col loro nome sopra.
        </h1>
        <p className="text-sm mt-2 max-w-lg leading-relaxed" style={{ color: INKSOFT }}>
          Scrivi il nome del negozio che hai davanti, scegli lo stile,
          mostraglielo a schermo intero. Il sito si consegna alla firma.
        </p>

        {/* controlli */}
        <div className="mt-6 rounded-2xl p-4 space-y-4" style={{ background: "#fff", border: `1px solid ${LINE}` }}>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="col-span-2">
              <label className="f-mono text-[10px] uppercase tracking-wider" style={{ color: INKSOFT }}>
                Nome del negozio
              </label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full mt-1 rounded-xl px-3 py-2.5 text-sm f-ui outline-none"
                style={{ background: PAPER, border: `1px solid ${LINE}`, color: INK }}
              />
            </div>
            <div>
              <label className="f-mono text-[10px] uppercase tracking-wider" style={{ color: INKSOFT }}>
                Città
              </label>
              <input
                value={citta}
                onChange={(e) => setCitta(e.target.value)}
                className="w-full mt-1 rounded-xl px-3 py-2.5 text-sm f-ui outline-none"
                style={{ background: PAPER, border: `1px solid ${LINE}`, color: INK }}
              />
            </div>
            <div>
              <label className="f-mono text-[10px] uppercase tracking-wider" style={{ color: INKSOFT }}>
                Dal (anno)
              </label>
              <input
                value={dal}
                onChange={(e) => setDal(e.target.value)}
                inputMode="numeric"
                className="w-full mt-1 rounded-xl px-3 py-2.5 text-sm f-ui outline-none"
                style={{ background: PAPER, border: `1px solid ${LINE}`, color: INK }}
              />
            </div>
          </div>

          <div>
            <label className="f-mono text-[10px] uppercase tracking-wider" style={{ color: INKSOFT }}>
              Palette
            </label>
            <div className="flex gap-2 mt-1.5 flex-wrap">
              {PALETTE_SITI.map((pl) => (
                <button
                  key={pl.id}
                  onClick={() => setPaletteId(pl.id)}
                  title={pl.nome}
                  aria-label={pl.nome}
                  className="flex items-center rounded-full p-1 transition-transform active:scale-95"
                  style={{
                    border: `2px solid ${paletteId === pl.id ? TEAL : "transparent"}`,
                    background: "#fff",
                  }}
                >
                  <span className="w-7 h-7 rounded-full border-2 border-white shadow" style={{ background: pl.primary }} />
                  <span className="w-7 h-7 rounded-full border-2 border-white shadow -ml-2" style={{ background: pl.accent }} />
                </button>
              ))}
            </div>
            <p className="f-mono text-[10px] mt-1" style={{ color: INKSOFT }}>
              {p.nome}
            </p>
          </div>

          <div>
            <label className="f-mono text-[10px] uppercase tracking-wider" style={{ color: INKSOFT }}>
              Stile
            </label>
            <div className="grid grid-cols-3 gap-1.5 mt-1.5">
              {TEMPLATE_SITI.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplateId(t.id)}
                  className="rounded-xl py-2 text-xs f-ui font-semibold"
                  style={
                    templateId === t.id
                      ? { background: INK, color: "#fff" }
                      : { background: PAPER, color: INK, border: `1px solid ${LINE}` }
                  }
                >
                  {t.nome}
                </button>
              ))}
            </div>
            <p className="text-[11px] mt-1.5" style={{ color: INKSOFT }}>
              {template.claim}
            </p>
          </div>

          <button
            onClick={() => setPieno(true)}
            className="w-full rounded-xl py-3 f-ui font-semibold text-sm flex items-center justify-center gap-2"
            style={{ background: INK, color: "#fff" }}
          >
            <Maximize2 size={14} /> Mostra a schermo intero
          </button>
        </div>

        {/* anteprima incorniciata */}
        <div className="mt-5 rounded-2xl overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
          <div
            className="px-3 py-1.5 f-mono text-[10px] flex justify-between"
            style={{ background: INK, color: "#B7CCC9" }}
          >
            <span>anteprima · {template.nome.toLowerCase()}</span>
            <span>{p.nome.toLowerCase()}</span>
          </div>
          <div className="max-w-md mx-auto" style={{ background: p.surface }}>
            <Anteprima cfg={cfg} templateId={templateId} />
          </div>
        </div>

        {/* guardrail: cosa dice l'agente */}
        <div className="mt-5 rounded-2xl p-4" style={{ background: AMBERSOFT }}>
          <p className="f-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: AMBER }}>
            Cosa include il regalo — da dire così
          </p>
          <p className="text-sm mt-1.5 leading-relaxed" style={{ color: INKSOFT }}>
            Dominio intestato al negozio, sempre. Hosting, aggiornamenti e
            manutenzione dentro il canone. Pagina lenti a contatto online e
            prenotazioni incluse. Un giro di modifiche compreso; il resto a
            listino. Si attiva alla firma — mai prima.
          </p>
        </div>
      </div>
    </main>
  );
}
