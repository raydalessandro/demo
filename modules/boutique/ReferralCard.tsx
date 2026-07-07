"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, Users } from "lucide-react";
import type { Tenant } from "@/lib/types";

/**
 * Porta un amico — meccanica ripresa da App_ottica:
 * "Tu + un amico = 20% sole per entrambi". Il QR è reale e scansionabile:
 * in demo dal vivo si inquadra col telefono dell'ottico, effetto garantito.
 */
export default function ReferralCard({ tenant }: { tenant: Tenant }) {
  const b = tenant.brand;
  const codice = "LAURA24";
  const link = `https://${tenant.slug}.vista.app/i/${codice}`;
  const [copiato, setCopiato] = useState(false);

  const copia = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiato(true);
      setTimeout(() => setCopiato(false), 2000);
    } catch {
      /* clipboard non disponibile: il link resta visibile sotto il QR */
    }
  };

  return (
    <div className="rounded-2xl p-4" style={{ background: b.primary }}>
      <div className="flex items-center gap-2">
        <Users size={15} style={{ color: b.accent }} />
        <span className="f-serif text-base" style={{ color: b.surface }}>
          Porta un amico: 20% sole per entrambi
        </span>
      </div>
      <div className="text-xs mt-1 leading-relaxed" style={{ color: b.accentSoft }}>
        Il tuo amico scansiona il QR, scarica l&apos;app del negozio e il codice
        sconto arriva a tutti e due.
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="p-2 rounded-xl shrink-0" style={{ background: "#fff" }}>
          <QRCodeSVG value={link} size={84} fgColor={b.primary} bgColor="#ffffff" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-widest" style={{ color: b.accent }}>
            Il tuo codice
          </div>
          <div className="f-mono text-lg font-semibold" style={{ color: b.surface }}>{codice}</div>
          <button
            onClick={copia}
            className="mt-1.5 text-xs f-ui font-semibold px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1.5"
            style={{ background: b.accent, color: "#fff" }}
          >
            {copiato ? (
              <>
                <Check size={12} /> Copiato
              </>
            ) : (
              <>
                <Copy size={12} /> Copia il link
              </>
            )}
          </button>
          <div className="text-[10px] f-mono mt-2 truncate" style={{ color: b.accentSoft }}>{link}</div>
        </div>
      </div>

      <div
        className="mt-3 rounded-lg px-3 py-2 text-[11px] f-ui"
        style={{ background: "rgba(255,255,255,.10)", color: b.surface }}
      >
        3 amici invitati · 1 premio già sbloccato ✓
      </div>
    </div>
  );
}
