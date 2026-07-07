"use client";

import { useState } from "react";
import { MessageSquare, Star } from "lucide-react";
import type { Tenant } from "@/lib/types";

/**
 * Raccolta recensioni. Chi si trova bene viene accompagnato su Google
 * (dove le catene dominano); chi ha avuto un problema trova prima un
 * canale diretto col negozio — ma il link recensione resta sempre lì.
 */
export default function ReviewFunnel({ tenant }: { tenant: Tenant }) {
  const b = tenant.brand;
  const [stelle, setStelle] = useState(0);
  const [fase, setFase] = useState<"voto" | "grazie" | "inviato">("voto");
  const [msg, setMsg] = useState("");

  return (
    <div className="rounded-2xl p-4" style={{ background: "#fff", border: `1px solid ${b.accentSoft}` }}>
      <div className="flex items-center gap-2 mb-1">
        <Star size={15} style={{ color: b.accent }} />
        <span className="f-ui font-semibold text-sm" style={{ color: b.primary }}>
          Com&apos;è andata l&apos;ultima visita?
        </span>
      </div>
      <div className="text-xs mb-3" style={{ color: b.textSoft }}>
        4,8 ★ su Google · 127 recensioni
      </div>

      {fase === "voto" && (
        <>
          <div className="flex gap-1.5 justify-center py-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setStelle(n)} aria-label={`${n} stelle`}>
                <Star
                  size={28}
                  style={{
                    color: n <= stelle ? b.accent : b.accentSoft,
                    fill: n <= stelle ? b.accent : "transparent",
                    transition: "color .15s",
                  }}
                />
              </button>
            ))}
          </div>

          {stelle >= 4 && (
            <button
              onClick={() => setFase("grazie")}
              className="mt-3 w-full rounded-xl py-2.5 f-ui font-semibold text-sm"
              style={{ background: b.primary, color: b.surface }}
            >
              Grazie! Raccontalo su Google (30 secondi)
            </button>
          )}

          {stelle > 0 && stelle < 4 && (
            <div className="mt-3">
              <div className="text-xs mb-1.5" style={{ color: b.textSoft }}>
                Ci dispiace. Dicci cosa non è andato: arriva solo a {tenant.nome}.
              </div>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                rows={3}
                className="w-full rounded-xl p-2.5 text-sm f-ui outline-none"
                style={{
                  background: b.surface,
                  border: `1px solid ${b.accentSoft}`,
                  color: b.primary,
                }}
                placeholder="Scrivici qui…"
              />
              <button
                onClick={() => setFase("inviato")}
                disabled={!msg.trim()}
                className="mt-2 w-full rounded-xl py-2.5 f-ui font-semibold text-sm inline-flex items-center justify-center gap-2"
                style={{
                  background: msg.trim() ? b.primary : b.accentSoft,
                  color: msg.trim() ? b.surface : b.textSoft,
                }}
              >
                <MessageSquare size={14} /> Invia al negozio
              </button>
              <button
                className="mt-2 w-full text-[11px] f-ui"
                style={{ color: b.textSoft, textDecoration: "underline" }}
              >
                oppure lascia comunque una recensione su Google
              </button>
            </div>
          )}
        </>
      )}

      {fase === "grazie" && (
        <div className="rounded-xl p-3 text-center" style={{ background: b.accentSoft }}>
          <div className="f-serif" style={{ color: b.primary }}>
            Grazie di cuore ❤️
          </div>
          <div className="text-xs mt-1" style={{ color: b.textSoft }}>
            (in produzione qui si apre la pagina recensioni Google del negozio)
          </div>
        </div>
      )}

      {fase === "inviato" && (
        <div className="rounded-xl p-3 text-center" style={{ background: b.accentSoft }}>
          <div className="f-serif" style={{ color: b.primary }}>
            Messaggio inviato al negozio
          </div>
          <div className="text-xs mt-1" style={{ color: b.textSoft }}>
            Ti ricontattiamo noi al più presto per sistemare le cose.
          </div>
        </div>
      )}
    </div>
  );
}
