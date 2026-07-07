"use client";

import { Calendar, Settings2, Store, TrendingUp } from "lucide-react";
import { SectionTitle } from "@/components/ui";
import { VISTA as T, useTenant } from "@/lib/theme";
import { FUNNEL_STATS, FUNZIONI_APP, PRENOTAZIONI } from "@/lib/demo-data";

export default function BoutiqueConfigModule({ vaiACliente }: { vaiACliente: () => void }) {
  const tenant = useTenant();
  const b = tenant.brand;

  return (
    <div>
      <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: b.primary }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: b.accent }}>
          <Store size={18} color="#fff" />
        </div>
        <div className="flex-1">
          <div className="f-serif text-base" style={{ color: b.surface }}>{tenant.nome}</div>
          <div className="text-xs" style={{ color: b.accentSoft }}>
            App pubblicata · {tenant.clientiAttivi} clienti attivi
          </div>
        </div>
        <button
          onClick={vaiACliente}
          className="text-xs f-ui font-semibold px-3 py-2 rounded-lg"
          style={{ background: b.accent, color: "#fff" }}
        >
          Vedi come cliente
        </button>
      </div>

      <SectionTitle icon={Calendar}>Prenotazioni ricevute dall&apos;app</SectionTitle>
      <div className="space-y-1.5">
        {PRENOTAZIONI.map((p) => (
          <div
            key={p.nome}
            className="rounded-xl p-3 flex items-center gap-3"
            style={{ background: T.card, border: `1px solid ${T.line}` }}
          >
            <div className="flex-1">
              <div className="text-sm f-ui font-semibold" style={{ color: T.ink }}>
                {p.nome}
                {p.nuova && (
                  <span
                    className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{ background: T.tealSoft, color: T.teal }}
                  >
                    nuova
                  </span>
                )}
              </div>
              <div className="text-xs" style={{ color: T.inkSoft }}>
                {p.tipo} · {p.quando}
              </div>
            </div>
            <button
              className="text-xs f-ui font-semibold px-2.5 py-1.5 rounded-lg"
              style={{ background: T.teal, color: "#fff" }}
            >
              Conferma
            </button>
          </div>
        ))}
      </div>

      <SectionTitle icon={TrendingUp}>Ritorno dai funnel · ultimi 30 giorni</SectionTitle>
      <div className="grid grid-cols-3 gap-2">
        {FUNNEL_STATS.map((s) => (
          <div
            key={s.nome}
            className="rounded-xl p-2.5"
            style={{ background: T.card, border: `1px solid ${T.line}` }}
          >
            <div className="text-[11px] f-ui font-semibold" style={{ color: T.ink }}>{s.nome}</div>
            <div className="f-mono text-sm font-semibold mt-1" style={{ color: T.teal }}>{s.riga1}</div>
            <div className="text-[10px] leading-snug mt-0.5" style={{ color: T.inkSoft }}>{s.riga2}</div>
          </div>
        ))}
      </div>
      <div className="text-[11px] mt-1.5 f-ui" style={{ color: T.inkSoft }}>
        Ogni premio della ruota si ritira al banco: è un rientro in negozio — e ogni rientro è un&apos;occasione di controllo vista.
      </div>

      <SectionTitle icon={Settings2}>Funzioni attive nell&apos;app cliente</SectionTitle>
      <div className="rounded-xl divide-y" style={{ background: T.card, border: `1px solid ${T.line}` }}>
        {FUNZIONI_APP.map((f) => (
          <div key={f} className="p-3 flex items-center justify-between">
            <span className="text-sm f-ui" style={{ color: T.ink }}>{f}</span>
            <div className="w-9 h-5 rounded-full relative" style={{ background: T.teal }}>
              <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 right-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
