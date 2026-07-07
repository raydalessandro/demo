"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeftRight,
  Check,
  ChevronRight,
  ClipboardList,
  Glasses,
  ScanBarcode,
  Send,
  Sparkles,
  Wand2,
} from "lucide-react";
import { SectionTitle } from "@/components/ui";
import { VISTA as T } from "@/lib/theme";
import { FERMI, GEOMETRIE, MONTATURE } from "@/lib/demo-data";
import ConversioneLAC from "./ConversioneLAC";
import BustaLavoro from "./BustaLavoro";
import VenditaGuidata, { type ConfigSuMisura } from "./VenditaGuidata";

/**
 * Banco — le tre modalità di lavoro:
 * · Vendita guidata: il funnel cliente-davanti, una decisione per volta.
 * · Preventivo rapido: i pacchetti, per l'ottico esperto che va veloce.
 * · Busta lavoro: l'ordine tecnico. Riceve la configurazione da
 *   entrambe le strade (pacchetto o su misura).
 */

export default function BancoModule() {
  const [sub, setSub] = useState<"guidata" | "rapido" | "busta">("guidata");
  const [montatura, setMontatura] = useState(MONTATURE[2]);
  const [geo, setGeo] = useState(GEOMETRIE[2]);
  const [tierIdx, setTierIdx] = useState(1);
  const [configBusta, setConfigBusta] = useState<ConfigSuMisura | null>(null);

  const tiers = useMemo(
    () => [
      {
        nome: "Buono",
        lente: geo.base[0],
        voci: ["Indice 1.5", "Antiriflesso classico", "Garanzia 12 mesi"],
        tint: T.paper,
        badge: undefined as string | undefined,
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
        badge: undefined,
      },
    ],
    [geo],
  );

  const capitaleFermo = FERMI.reduce((s, f) => s + f.costo, 0);

  /** Dal preventivo rapido: il pacchetto scelto diventa la config della busta. */
  const bustaDaPacchetto = () => {
    const t = tiers[tierIdx];
    setConfigBusta({
      label: t.nome,
      lente: t.lente,
      voci: t.voci,
      fotoIncluso: tierIdx === 2,
      geoId: geo.id,
    });
    setSub("busta");
  };

  /** Dalla vendita guidata: arriva la config su misura. */
  const bustaDaFunnel = (c: ConfigSuMisura) => {
    setConfigBusta(c);
    setSub("busta");
  };

  const config =
    configBusta ?? {
      label: tiers[tierIdx].nome,
      lente: tiers[tierIdx].lente,
      voci: tiers[tierIdx].voci,
      fotoIncluso: tierIdx === 2,
      geoId: geo.id,
    };
  const geoBusta = GEOMETRIE.find((g) => g.id === config.geoId) ?? geo;

  return (
    <div>
      {/* sotto-navigazione del modulo */}
      <div className="flex gap-1.5">
        {(
          [
            ["guidata", Wand2, "Vendita guidata"],
            ["rapido", Glasses, "Preventivo rapido"],
            ["busta", ClipboardList, "Busta lavoro"],
          ] as const
        ).map(([id, Icon, l]) => (
          <button
            key={id}
            onClick={() => setSub(id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] f-ui font-semibold"
            style={
              sub === id
                ? { background: T.ink, color: "#fff" }
                : { background: T.card, color: T.ink, border: `1px solid ${T.line}` }
            }
          >
            <Icon size={13} /> {l}
          </button>
        ))}
      </div>

      {sub === "guidata" && (
        <div className="mt-3">
          <VenditaGuidata montatura={montatura} setMontatura={setMontatura} onBusta={bustaDaFunnel} />
          <div className="text-[11px] mt-2" style={{ color: T.inkSoft }}>
            Da girare verso il cliente: una decisione per schermata, la demo al momento giusto, il totale sempre in vista.
          </div>
        </div>
      )}

      {sub === "busta" && (
        <>
          <SectionTitle icon={ClipboardList}>
            Busta lavoro · {config.label} su {montatura.nome}
          </SectionTitle>
          <BustaLavoro
            key={`${montatura.id}-${config.geoId}-${config.label}-${config.lente}`}
            montatura={montatura}
            geo={geoBusta}
            tier={{ nome: config.label, lente: config.lente, voci: config.voci }}
            fotoIncluso={config.fotoIncluso}
          />
          <div className="text-[11px] mt-2" style={{ color: T.inkSoft }}>
            La configurazione arriva precompilata dalla vendita guidata o dal pacchetto scelto al preventivo rapido.
          </div>
        </>
      )}

      {sub === "rapido" && (
        <>
          <SectionTitle icon={Glasses}>Preventivatore a pacchetti</SectionTitle>

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
            {tiers.map((t, i) => (
              <button
                key={t.nome}
                onClick={() => setTierIdx(i)}
                className="rounded-xl p-2.5 flex flex-col relative text-left"
                style={{
                  background: t.tint,
                  border: `1px solid ${T.line}`,
                  boxShadow: tierIdx === i ? `0 0 0 2px ${T.teal}` : "none",
                }}
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
              </button>
            ))}
          </div>

          <div className="flex gap-2 mt-2">
            <button
              className="flex-1 rounded-lg py-2.5 f-ui font-semibold text-sm flex items-center justify-center gap-2"
              style={{ background: T.paper, color: T.ink, border: `1px solid ${T.line}` }}
            >
              <Send size={15} /> Invia preventivo
            </button>
            <button
              onClick={bustaDaPacchetto}
              className="flex-1 rounded-lg py-2.5 f-ui font-semibold text-sm flex items-center justify-center gap-2"
              style={{ background: T.ink, color: "#fff" }}
            >
              <ClipboardList size={15} /> Busta lavoro ({tiers[tierIdx].nome}) →
            </button>
          </div>

          <div className="mt-3 rounded-xl p-3 flex gap-2.5" style={{ background: T.amberSoft, border: `1px solid ${T.line}` }}>
            <Sparkles size={16} className="shrink-0 mt-0.5" style={{ color: T.amber }} />
            <div className="text-xs leading-relaxed" style={{ color: T.ink }}>
              <span className="f-ui font-semibold">Suggerimento di vendita · </span>
              Su una progressiva, mostra prima la colonna Premium: ancora il valore, poi lascia scegliere.
              Se il cliente vuole capire, passa alla vendita guidata: le demo sono lì.
            </div>
          </div>

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
        </>
      )}
    </div>
  );
}
