"use client";

import { useState } from "react";

/**
 * Calcolatore ROI — la matematica del kit venditore resa toccabile.
 * Valori medi prudenti: riordino LAC 48€, preventivo spostato di fascia 120€.
 * Con i default (5 + 2) restituisce ~480€: lo scenario del kit.
 */
const CANONE = 149;
const VAL_RIORDINO = 48;
const VAL_UPGRADE = 120;

export default function RoiCalculator() {
  const [riordini, setRiordini] = useState(5);
  const [upgrade, setUpgrade] = useState(2);

  const ritorno = riordini * VAL_RIORDINO + upgrade * VAL_UPGRADE;
  const molt = ritorno / CANONE;
  const nettoAnnuo = (ritorno - CANONE) * 12;

  return (
    <div className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #DCE5E3" }}>
      <div className="space-y-5">
        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="text-sm f-ui" style={{ color: "#0D2B2B" }}>
              Riordini LAC recuperati al mese
            </span>
            <span className="f-mono font-semibold" style={{ color: "#127E7A" }}>{riordini}</span>
          </div>
          <input
            type="range"
            min={0}
            max={15}
            value={riordini}
            onChange={(e) => setRiordini(+e.target.value)}
            className="w-full"
            style={{ accentColor: "#127E7A" }}
          />
          <div className="text-[11px] f-mono" style={{ color: "#274744" }}>
            valore medio prudente: €{VAL_RIORDINO} a riordino
          </div>
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="text-sm f-ui" style={{ color: "#0D2B2B" }}>
              Preventivi spostati di fascia al mese
            </span>
            <span className="f-mono font-semibold" style={{ color: "#127E7A" }}>{upgrade}</span>
          </div>
          <input
            type="range"
            min={0}
            max={8}
            value={upgrade}
            onChange={(e) => setUpgrade(+e.target.value)}
            className="w-full"
            style={{ accentColor: "#127E7A" }}
          />
          <div className="text-[11px] f-mono" style={{ color: "#274744" }}>
            da “buono” a “migliore”: in media €{VAL_UPGRADE} in più a occhiale
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 grid grid-cols-3 gap-3 text-center" style={{ borderTop: "2px solid #0D2B2B" }}>
        <div>
          <div className="f-mono text-2xl font-semibold" style={{ color: "#0D2B2B" }}>€{ritorno}</div>
          <div className="text-[11px] f-ui" style={{ color: "#274744" }}>ritorno stimato / mese</div>
        </div>
        <div>
          <div className="f-mono text-2xl font-semibold" style={{ color: "#127E7A" }}>
            ×{molt.toFixed(1)}
          </div>
          <div className="text-[11px] f-ui" style={{ color: "#274744" }}>ogni euro di canone</div>
        </div>
        <div>
          <div className="f-mono text-2xl font-semibold" style={{ color: molt >= 1 ? "#0D2B2B" : "#C98A2B" }}>
            {nettoAnnuo >= 0 ? "+" : ""}€{nettoAnnuo.toLocaleString("it-IT")}
          </div>
          <div className="text-[11px] f-ui" style={{ color: "#274744" }}>differenza in un anno</div>
        </div>
      </div>

      <div className="text-[11px] mt-3 f-ui" style={{ color: "#274744" }}>
        Conti sul canone della suite completa (€{CANONE}/mese). E ogni riordino LAC è anche
        un rientro in negozio: un’occasione di controllo vista — cioè di vendita oftalmica,
        dove sta il margine vero.
      </div>
    </div>
  );
}
