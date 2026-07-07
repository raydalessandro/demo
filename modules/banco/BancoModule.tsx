"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeftRight,
  Check,
  ChevronRight,
  Glasses,
  ScanBarcode,
  Send,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { SectionTitle } from "@/components/ui";
import { VISTA as T } from "@/lib/theme";
import { FERMI, GEOMETRIE, MONTATURE } from "@/lib/demo-data";
import LensConfigurator from "./LensConfigurator";
import ConversioneLAC from "./ConversioneLAC";

export default function BancoModule() {
  const [montatura, setMontatura] = useState(MONTATURE[2]);
  const [geo, setGeo] = useState(GEOMETRIE[2]);

  const tiers = useMemo(
    () => [
      {
        nome: "Buono",
        lente: geo.base[0],
        voci: ["Indice 1.5", "Antiriflesso classico", "Garanzia 12 mesi"],
        tint: T.paper,
      },
      {
        nome: "Migliore",
        lente: geo.base[1],
        voci: ["Indice 1.6 sottile", "AR premium + filtro luce blu", "Garanzia 24 mesi"],
        tint: T.tealSoft,
        badge: "consigliato",
      },
      {
        nome: "Premium",
        lente: geo.base[2],
        voci: [
          "Indice 1.67 extra-sottile",
          "Fotocromatico + AR premium",
          "Garanzia 24 mesi + 2ª coppia −40%",
        ],
        tint: T.amberSoft,
      },
    ],
    [geo],
  );

  const capitaleFermo = FERMI.reduce((s, f) => s + f.costo, 0);

  return (
    <div>
      <SectionTitle icon={Glasses}>Preventivatore al banco</SectionTitle>

      <div className="rounded-xl p-3 space-y-3" style={{ background: T.card, border: `1px solid ${T.line}` }}>
        <div>
          <div className="text-xs mb-1" style={{ color: T.inkSoft }}>Montatura</div>
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
          <div className="text-xs mb-1" style={{ color: T.inkSoft }}>Geometria lente</div>
          <div className="flex gap-1.5">
            {GEOMETRIE.map((g) => (
              <button
                key={g.id}
                onClick={() => setGeo(g)}
                className="flex-1 text-xs px-2 py-2 rounded-lg f-ui font-semibold"
                style={
                  geo.id === g.id
                    ? { background: T.teal, color: "#fff" }
                    : { background: T.paper, color: T.ink, border: `1px solid ${T.line}` }
                }
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3">
        {tiers.map((t) => (
          <div
            key={t.nome}
            className="rounded-xl p-2.5 flex flex-col relative"
            style={{ background: t.tint, border: `1px solid ${T.line}` }}
          >
            {t.badge && (
              <span
                className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 rounded-full f-ui font-semibold"
                style={{ background: T.teal, color: "#fff" }}
              >
                {t.badge}
              </span>
            )}
            <div className="f-ui font-semibold text-sm" style={{ color: T.ink }}>{t.nome}</div>
            <div className="f-mono text-lg font-semibold" style={{ color: T.ink }}>
              €{montatura.prezzo + t.lente}
            </div>
            <ul className="mt-1.5 space-y-1 flex-1">
              {t.voci.map((v) => (
                <li key={v} className="text-[11px] leading-snug flex gap-1" style={{ color: T.inkSoft }}>
                  <Check size={11} className="mt-0.5 shrink-0" style={{ color: T.teal }} />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button
        className="mt-2 w-full rounded-lg py-2.5 f-ui font-semibold text-sm flex items-center justify-center gap-2"
        style={{ background: T.ink, color: "#fff" }}
      >
        <Send size={15} /> Invia preventivo al cliente
      </button>

      <div className="mt-3 rounded-xl p-3 flex gap-2.5" style={{ background: T.amberSoft, border: `1px solid ${T.line}` }}>
        <Sparkles size={16} className="shrink-0 mt-0.5" style={{ color: T.amber }} />
        <div className="text-xs leading-relaxed" style={{ color: T.ink }}>
          <span className="f-ui font-semibold">Suggerimento di vendita · </span>
          Su una progressiva, mostra prima la colonna Premium: ancora il valore, poi lascia scegliere.
          Il fotocromatico si racconta con un beneficio concreto: &quot;non cambia più occhiale quando esce&quot;.
        </div>
      </div>

      <SectionTitle icon={SlidersHorizontal}>Lens configurator · da mostrare al cliente</SectionTitle>
      <LensConfigurator />

      <SectionTitle icon={ArrowLeftRight}>Conversione prescrizione occhiale → LAC</SectionTitle>
      <ConversioneLAC />

      <SectionTitle
        icon={ScanBarcode}
        right={
          <button className="text-xs f-ui font-semibold flex items-center gap-1" style={{ color: T.teal }}>
            Apri scanner <ChevronRight size={13} />
          </button>
        }
      >
        Magazzino · montature ferme 180+ giorni
      </SectionTitle>

      <div className="space-y-1.5">
        {FERMI.map((f) => (
          <div
            key={f.sku}
            className="rounded-xl p-2.5 flex items-center gap-3"
            style={{ background: T.card, border: `1px solid ${T.line}` }}
          >
            <AlertTriangle size={15} style={{ color: T.amber }} />
            <div className="flex-1 min-w-0">
              <div className="text-sm f-ui font-semibold truncate" style={{ color: T.ink }}>{f.nome}</div>
              <div className="text-xs f-mono" style={{ color: T.inkSoft }}>
                SKU {f.sku} · costo €{f.costo}
              </div>
            </div>
            <span className="text-xs f-mono px-2 py-1 rounded-lg" style={{ background: T.amberSoft, color: T.amber }}>
              {f.giorni} gg
            </span>
          </div>
        ))}
      </div>
      <div className="text-xs mt-1.5 text-right f-mono" style={{ color: T.inkSoft }}>
        capitale fermo: €{capitaleFermo} · candidate a promo vetrina
      </div>
    </div>
  );
}
