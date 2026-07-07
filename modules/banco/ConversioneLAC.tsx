"use client";

import { useState } from "react";
import { ArrowLeftRight, Minus, Plus } from "lucide-react";
import { VISTA as T } from "@/lib/theme";

type Eye = "od" | "os";

/** Conversione prescrizione occhiale → LAC (compensazione apice-corneale 12 mm). */
export default function ConversioneLAC() {
  const [pot, setPot] = useState<Record<Eye, number>>({ od: -5.0, os: -4.5 });

  const conv = (p: number) => Math.round((p / (1 - 0.012 * p)) * 4) / 4;
  const fmt = (v: number) => (v > 0 ? "+" : "") + v.toFixed(2);
  const step = (eye: Eye, d: number) =>
    setPot((s) => ({ ...s, [eye]: Math.max(-20, Math.min(20, +(s[eye] + d).toFixed(2))) }));

  return (
    <div className="rounded-xl p-3" style={{ background: T.card, border: `1px solid ${T.line}` }}>
      {(["od", "os"] as const).map((eye) => (
        <div
          key={eye}
          className="flex items-center gap-2 py-2"
          style={{ borderBottom: eye === "od" ? `1px solid ${T.line}` : "none" }}
        >
          <span className="f-ui font-semibold text-xs w-7" style={{ color: T.ink }}>
            {eye.toUpperCase()}
          </span>
          <button
            onClick={() => step(eye, -0.25)}
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: T.paper, border: `1px solid ${T.line}` }}
          >
            <Minus size={13} style={{ color: T.ink }} />
          </button>
          <span className="f-mono text-sm w-14 text-center" style={{ color: T.ink }}>
            {fmt(pot[eye])}
          </span>
          <button
            onClick={() => step(eye, 0.25)}
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: T.paper, border: `1px solid ${T.line}` }}
          >
            <Plus size={13} style={{ color: T.ink }} />
          </button>
          <ArrowLeftRight size={14} style={{ color: T.inkSoft }} />
          <div className="flex-1 text-right">
            <span
              className="f-mono text-base font-semibold px-2 py-1 rounded-lg"
              style={{ background: T.tealSoft, color: T.teal }}
            >
              {fmt(conv(pot[eye]))}
            </span>
            <span className="text-[10px] ml-1.5" style={{ color: T.inkSoft }}>LAC</span>
          </div>
        </div>
      ))}
      <div className="text-[11px] mt-2 leading-relaxed" style={{ color: T.inkSoft }}>
        Compensazione distanza apice-corneale 12 mm, arrotondata al quarto di diottria. Clinicamente
        rilevante oltre ±4,00 D. Astigmatismo e geometria della LAC vanno valutati in applicazione.
      </div>
    </div>
  );
}
