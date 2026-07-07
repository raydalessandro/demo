"use client";

import { useMemo, useRef, useState } from "react";
import { Gift, RotateCcw } from "lucide-react";
import type { TenantBrand } from "@/lib/types";
import { PREMI_RUOTA } from "@/lib/demo-data";

/**
 * Ruota dei premi — meccanica ripresa da App_ottica:
 * premi pesati (il sole al 60%, il 50% vista raro), codici validi 7 giorni
 * e ritirabili SOLO in negozio: ogni premio è un rientro al banco.
 * Qui l'estrazione pesata avviene prima, poi la ruota atterra sul
 * segmento estratto (nel prototipo originale erano scollegate).
 */

const SEGMENTI: string[] = ["sole20", "lac25", "extra50", "riprova", "vista50", "riprova"];

function estraiPremio() {
  const tot = PREMI_RUOTA.reduce((s, p) => s + p.peso, 0);
  let r = Math.random() * tot;
  for (const p of PREMI_RUOTA) {
    r -= p.peso;
    if (r <= 0) return p;
  }
  return PREMI_RUOTA[0];
}

export default function GameWheel({ b }: { b: TenantBrand }) {
  const [rot, setRot] = useState(0);
  const [girando, setGirando] = useState(false);
  const [esito, setEsito] = useState<(typeof PREMI_RUOTA)[number] | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const colori = useMemo(() => {
    // premi alternati primary/accent, "riprova" in tono spento
    return SEGMENTI.map((id, i) =>
      id === "riprova" ? b.textFaint : i % 2 === 0 ? b.accent : b.primary,
    );
  }, [b]);

  const conic = useMemo(
    () => `conic-gradient(${colori.map((c, i) => `${c} ${i * 60}deg ${(i + 1) * 60}deg`).join(", ")})`,
    [colori],
  );

  const gira = () => {
    if (girando) return;
    const premio = estraiPremio();
    // scegli un segmento che corrisponde al premio estratto
    const idx = SEGMENTI.flatMap((id, i) => (id === premio.id ? [i] : []));
    const seg = idx[Math.floor(Math.random() * idx.length)];
    const centro = seg * 60 + 30;
    const jitter = (Math.random() - 0.5) * 36; // resta dentro il segmento
    const delta = (((360 - centro - jitter - (rot % 360)) % 360) + 360) % 360;
    const nuova = rot + 5 * 360 + delta;

    setGirando(true);
    setEsito(null);
    setRot(nuova);
    timer.current = setTimeout(() => {
      setGirando(false);
      setEsito(premio);
    }, 4000);
  };

  const reset = () => {
    if (timer.current) clearTimeout(timer.current);
    setEsito(null);
    setGirando(false);
  };

  return (
    <div className="rounded-2xl p-4" style={{ background: "#fff", border: `1px solid ${b.accentSoft}` }}>
      <div className="flex items-center gap-2 mb-1">
        <Gift size={15} style={{ color: b.accent }} />
        <span className="f-ui font-semibold text-sm" style={{ color: b.primary }}>
          Gira e vinci
        </span>
      </div>
      <div className="text-xs mb-3" style={{ color: b.textSoft }}>
        Un giro al giorno. I premi si ritirano in negozio entro 7 giorni.
      </div>

      <div className="relative w-48 h-48 mx-auto">
        {/* indicatore */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-1 z-10"
          style={{
            width: 0,
            height: 0,
            borderLeft: "9px solid transparent",
            borderRight: "9px solid transparent",
            borderTop: `14px solid ${b.primary}`,
          }}
        />
        {/* ruota */}
        <div
          className="w-full h-full rounded-full relative"
          style={{
            background: conic,
            transform: `rotate(${rot}deg)`,
            transition: girando ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
            border: `5px solid ${b.primary}`,
            boxShadow: "inset 0 0 0 3px rgba(255,255,255,.55)",
          }}
        >
          {SEGMENTI.map((id, i) => (
            <div
              key={i}
              className="absolute inset-0 flex justify-center"
              style={{ transform: `rotate(${i * 60 + 30}deg)` }}
            >
              <span
                className="mt-3 text-[9px] f-ui font-bold"
                style={{ color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,.45)" }}
              >
                {PREMI_RUOTA.find((p) => p.id === id)?.label}
              </span>
            </div>
          ))}
        </div>
        {/* perno */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
          style={{ background: "#fff", border: `4px solid ${b.accent}` }}
        />
      </div>

      {!esito && (
        <button
          onClick={gira}
          disabled={girando}
          className="mt-4 w-full rounded-xl py-2.5 f-ui font-semibold text-sm"
          style={{
            background: girando ? b.accentSoft : b.primary,
            color: girando ? b.textSoft : b.surface,
          }}
        >
          {girando ? "Sta girando…" : "Gira la ruota"}
        </button>
      )}

      {esito && (
        <div className="mt-4 rounded-xl p-3 text-center" style={{ background: b.accentSoft }}>
          {esito.codice ? (
            <>
              <div className="f-serif text-lg" style={{ color: b.primary }}>
                Hai vinto: {esito.nome} 🎉
              </div>
              <div
                className="f-mono text-sm font-semibold inline-block px-3 py-1 rounded-lg mt-2"
                style={{ background: b.primary, color: b.surface }}
              >
                {esito.codice}
              </div>
              <div className="text-[11px] mt-2" style={{ color: b.textSoft }}>
                {esito.condizione} · mostra il codice alla cassa entro 7 giorni
              </div>
            </>
          ) : (
            <div className="f-serif text-base" style={{ color: b.primary }}>
              {esito.nome} Torna a trovarci 😉
            </div>
          )}
          <button
            onClick={reset}
            className="mt-2 text-[10px] f-mono inline-flex items-center gap-1"
            style={{ color: b.textSoft }}
          >
            <RotateCcw size={10} /> demo · rigioca
          </button>
        </div>
      )}
    </div>
  );
}
