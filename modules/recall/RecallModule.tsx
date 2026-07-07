"use client";

import { useState } from "react";
import {
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Send,
  TrendingUp,
} from "lucide-react";
import { Kpi, SectionTitle } from "@/components/ui";
import { VISTA as T, useTenant } from "@/lib/theme";
import { conNegozio, ESITI_SETTIMANA, KPI_RECALL, RICHIAMI } from "@/lib/demo-data";

export default function RecallModule() {
  const tenant = useTenant();
  const [aperto, setAperto] = useState<number | null>(null);
  const [inviati, setInviati] = useState<Record<number, boolean>>({});

  return (
    <div>
      <div className="flex gap-2">
        {KPI_RECALL.map((k) => (
          <Kpi key={k.label} label={k.label} value={k.value} sub={k.sub} />
        ))}
      </div>

      <SectionTitle
        icon={Bell}
        right={
          <span
            className="text-xs f-mono px-2 py-0.5 rounded-full"
            style={{ background: T.tealSoft, color: T.teal }}
          >
            coda automatica
          </span>
        }
      >
        Da contattare oggi
      </SectionTitle>

      <div className="space-y-2">
        {RICHIAMI.map((r) => {
          const open = aperto === r.id;
          const sent = inviati[r.id];
          return (
            <div
              key={r.id}
              className="rounded-xl overflow-hidden"
              style={{ background: T.card, border: `1px solid ${T.line}` }}
            >
              <button
                onClick={() => setAperto(open ? null : r.id)}
                className="w-full text-left p-3 flex items-center gap-3"
              >
                <div className="w-1.5 self-stretch rounded-full" style={{ background: r.colore }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="f-ui font-semibold text-sm" style={{ color: T.ink }}>
                      {r.nome}
                    </span>
                    {sent && <CheckCircle2 size={14} style={{ color: T.teal }} />}
                  </div>
                  <div className="text-xs" style={{ color: r.colore }}>{r.tipo}</div>
                  <div className="text-xs truncate" style={{ color: T.inkSoft }}>{r.dettaglio}</div>
                </div>
                <ChevronDown
                  size={16}
                  style={{
                    color: T.inkSoft,
                    transform: open ? "rotate(180deg)" : "none",
                    transition: "transform .2s",
                  }}
                />
              </button>
              {open && (
                <div className="px-3 pb-3">
                  <div className="rounded-lg p-3 text-sm" style={{ background: T.paper, color: T.ink }}>
                    <div className="flex items-center gap-1.5 text-xs mb-1.5" style={{ color: T.teal }}>
                      <MessageCircle size={13} /> Messaggio pronto · modificabile
                    </div>
                    {conNegozio(r.msg, tenant.nome)}
                  </div>
                  <button
                    onClick={() => setInviati((s) => ({ ...s, [r.id]: true }))}
                    className="mt-2 w-full rounded-lg py-2.5 flex items-center justify-center gap-2 f-ui font-semibold text-sm"
                    style={{
                      background: sent ? T.tealSoft : "#25D366",
                      color: sent ? T.teal : "#fff",
                    }}
                  >
                    {sent ? (
                      <>
                        <Check size={16} /> Inviato — in attesa di risposta
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Invia su WhatsApp
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <SectionTitle icon={TrendingUp}>Esiti della settimana</SectionTitle>
      <div
        className="rounded-xl p-3 flex gap-4 text-center"
        style={{ background: T.card, border: `1px solid ${T.line}` }}
      >
        {ESITI_SETTIMANA.map(([v, l]) => (
          <div key={l} className="flex-1">
            <div className="f-mono font-semibold" style={{ color: T.ink }}>{v}</div>
            <div className="text-xs" style={{ color: T.inkSoft }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
