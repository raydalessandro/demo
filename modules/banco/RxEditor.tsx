"use client";

import { Minus, Plus } from "lucide-react";
import { VISTA as T } from "@/lib/theme";
import { TEMPLATE_RX } from "@/lib/demo-data";
import TaboAxis from "./TaboAxis";

export interface OcchioRx {
  sfero: number;
  cilindro: number;
  asse: number;
}
export interface Rx {
  OD: OcchioRx;
  OS: OcchioRx;
}

export const RX_INIZIALE: Rx = {
  OD: { sfero: 0, cilindro: 0, asse: 0 },
  OS: { sfero: 0, cilindro: 0, asse: 0 },
};

const fmtD = (v: number) => (v > 0 ? "+" : "") + v.toFixed(2);
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

function Stepper({
  label,
  value,
  onDelta,
  fmt,
}: {
  label: string;
  value: number;
  onDelta: (d: 1 | -1) => void;
  fmt: (v: number) => string;
}) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-[10px] f-ui w-8" style={{ color: T.inkSoft }}>{label}</span>
      <button
        onClick={() => onDelta(-1)}
        className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
        style={{ background: T.paper, border: `1px solid ${T.line}` }}
        aria-label={`${label} meno`}
      >
        <Minus size={11} style={{ color: T.ink }} />
      </button>
      <span className="f-mono text-xs w-14 text-center" style={{ color: T.ink }}>{fmt(value)}</span>
      <button
        onClick={() => onDelta(1)}
        className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
        style={{ background: T.paper, border: `1px solid ${T.line}` }}
        aria-label={`${label} più`}
      >
        <Plus size={11} style={{ color: T.ink }} />
      </button>
    </div>
  );
}

export default function RxEditor({
  rx,
  setRx,
  conAdd,
  addizione,
  setAddizione,
}: {
  rx: Rx;
  setRx: (r: Rx) => void;
  conAdd: boolean;
  addizione: number;
  setAddizione: (v: number) => void;
}) {
  const upd = (eye: "OD" | "OS", campo: keyof OcchioRx, delta: number) => {
    const v = rx[eye][campo];
    const nuovo =
      campo === "asse"
        ? clamp(v + delta * 5, 0, 180)
        : clamp(+(v + delta * 0.25).toFixed(2), campo === "sfero" ? -20 : -6, campo === "sfero" ? 20 : 6);
    setRx({ ...rx, [eye]: { ...rx[eye], [campo]: nuovo } });
  };

  const applicaTemplate = (t: (typeof TEMPLATE_RX)[number]) => {
    const occhio = { sfero: t.sfero, cilindro: t.cilindro, asse: t.asse };
    setRx({ OD: { ...occhio }, OS: { ...occhio } });
  };

  return (
    <div>
      <div className="text-[10px] f-ui mb-1.5" style={{ color: T.inkSoft }}>
        Template rapidi (applica a entrambi gli occhi):
      </div>
      <div className="flex gap-1.5 flex-wrap mb-3">
        {TEMPLATE_RX.map((t) => (
          <button
            key={t.nome}
            onClick={() => applicaTemplate(t)}
            className="text-[10px] f-ui font-semibold px-2 py-1 rounded-full"
            style={{ background: T.tealSoft, color: T.teal }}
          >
            {t.nome}
          </button>
        ))}
      </div>

      {(["OD", "OS"] as const).map((eye) => (
        <div
          key={eye}
          className="flex items-center gap-3 py-2"
          style={{ borderTop: `1px solid ${T.line}` }}
        >
          <div className="text-center shrink-0">
            <div className="f-ui font-semibold text-xs" style={{ color: T.ink }}>{eye}</div>
            <TaboAxis asse={rx[eye].asse} />
          </div>
          <div className="flex-1 space-y-1.5">
            <Stepper label="Sfero" value={rx[eye].sfero} fmt={fmtD} onDelta={(d) => upd(eye, "sfero", d)} />
            <Stepper label="Cil." value={rx[eye].cilindro} fmt={fmtD} onDelta={(d) => upd(eye, "cilindro", d)} />
            <Stepper label="Asse" value={rx[eye].asse} fmt={(v) => `${v}°`} onDelta={(d) => upd(eye, "asse", d)} />
          </div>
        </div>
      ))}

      {conAdd && (
        <div className="flex items-center justify-between py-2" style={{ borderTop: `1px solid ${T.line}` }}>
          <div>
            <div className="f-ui font-semibold text-xs" style={{ color: T.ink }}>Addizione (ADD)</div>
            <div className="text-[10px]" style={{ color: T.inkSoft }}>per progressive · bifocali · office</div>
          </div>
          <Stepper
            label=""
            value={addizione}
            fmt={fmtD}
            onDelta={(d) => setAddizione(clamp(+(addizione + d * 0.25).toFixed(2), 0, 3.5))}
          />
        </div>
      )}
    </div>
  );
}
