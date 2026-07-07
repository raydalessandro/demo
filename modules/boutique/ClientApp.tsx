"use client";

import { useState } from "react";
import {
  Calendar,
  Check,
  ChevronRight,
  Download,
  Droplets,
  Eye,
  FileText,
  Gift,
  Home,
  ScanFace,
  User,
} from "lucide-react";
import { useTenant } from "@/lib/theme";
import GameWheel from "./GameWheel";
import ReferralCard from "./ReferralCard";
import ReviewFunnel from "./ReviewFunnel";
import GuideList from "./GuideList";
import type { TenantBrand } from "@/lib/types";
import { FATTURE } from "@/lib/demo-data";

/* ── Frame Advisor ─────────────────────────────────────────────── */
function FrameAdvisor({ b }: { b: TenantBrand }) {
  const [viso, setViso] = useState<string | null>(null);
  const FORME: Record<
    string,
    { shape: React.CSSProperties; txt: string; tip: string[] }
  > = {
    Ovale: {
      shape: { width: 22, height: 30, borderRadius: "50%" },
      txt: "Viso fortunato: quasi ogni montatura ti dona. Sperimenta forme e colori.",
      tip: ["Aviator", "Squadrate", "Cat-eye"],
    },
    Rotondo: {
      shape: { width: 26, height: 26, borderRadius: "50%" },
      txt: "Le forme angolose e rettangolari allungano e definiscono i lineamenti.",
      tip: ["Rettangolari", "Squadrate", "Wayfarer"],
    },
    Quadrato: {
      shape: { width: 26, height: 26, borderRadius: "22%" },
      txt: "Le forme tonde e ovali ammorbidiscono i tratti decisi del viso.",
      tip: ["Tonde", "Ovali", "Aviator"],
    },
    Cuore: {
      shape: {
        width: 26,
        height: 26,
        borderRadius: "50% 50% 50% 0",
        transform: "rotate(-45deg) scale(.9)",
      },
      txt: "Montature leggere o senza bordo inferiore bilanciano la fronte più ampia.",
      tip: ["Glasant", "Tonde sottili", "Clubmaster"],
    },
  };

  return (
    <div className="rounded-2xl p-4" style={{ background: "#fff", border: `1px solid ${b.accentSoft}` }}>
      <div className="flex items-center gap-2 mb-2">
        <ScanFace size={15} style={{ color: b.accent }} />
        <span className="f-ui font-semibold text-sm" style={{ color: b.primary }}>
          Quale occhiale ti sta meglio?
        </span>
      </div>
      <div className="text-xs mb-2" style={{ color: b.textSoft }}>Scegli la forma del tuo viso:</div>
      <div className="grid grid-cols-4 gap-1.5">
        {Object.entries(FORME).map(([nome, f]) => (
          <button
            key={nome}
            onClick={() => setViso(nome)}
            className="rounded-xl py-2 flex flex-col items-center gap-1.5"
            style={
              viso === nome
                ? { background: b.primary }
                : { background: b.surface, border: `1px solid ${b.accentSoft}` }
            }
          >
            <div style={{ ...f.shape, background: viso === nome ? b.accent : b.textFaint }} />
            <span
              className="text-[10px] f-ui font-semibold"
              style={{ color: viso === nome ? b.surface : b.textSoft }}
            >
              {nome}
            </span>
          </button>
        ))}
      </div>
      {viso && (
        <div className="mt-3 rounded-xl p-3" style={{ background: b.accentSoft }}>
          <div className="text-xs leading-relaxed" style={{ color: b.primary }}>{FORME[viso].txt}</div>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {FORME[viso].tip.map((t) => (
              <span
                key={t}
                className="text-[10px] f-ui font-semibold px-2 py-1 rounded-full"
                style={{ background: b.primary, color: b.surface }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="text-[10px] mt-2 italic" style={{ color: b.textSoft }}>
            In negozio te le facciamo provare tutte: prenota e le trovi già sul banco.
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Fatture ───────────────────────────────────────────────────── */
function FattureCard({ b }: { b: TenantBrand }) {
  const [scaricata, setScaricata] = useState<string | null>(null);
  return (
    <div className="rounded-2xl p-4" style={{ background: "#fff", border: `1px solid ${b.accentSoft}` }}>
      <div className="flex items-center gap-2 mb-2">
        <FileText size={15} style={{ color: b.accent }} />
        <span className="f-ui font-semibold text-sm" style={{ color: b.primary }}>Le mie fatture</span>
      </div>
      {FATTURE.map((f) => (
        <div key={f.n} className="flex items-center gap-2 py-2 border-t" style={{ borderColor: b.accentSoft }}>
          <div className="flex-1 min-w-0">
            <div className="text-xs f-ui font-semibold truncate" style={{ color: b.primary }}>{f.desc}</div>
            <div className="text-[10px] f-mono" style={{ color: b.textSoft }}>
              Fattura {f.n} · {f.data} · {f.imp}
            </div>
          </div>
          <button
            onClick={() => setScaricata(f.n)}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: scaricata === f.n ? b.accentSoft : b.primary }}
          >
            {scaricata === f.n ? (
              <Check size={14} style={{ color: b.accent }} />
            ) : (
              <Download size={14} color="#fff" />
            )}
          </button>
        </div>
      ))}
      <button
        onClick={() => setScaricata("tutte")}
        className="mt-2 w-full rounded-xl py-2 f-ui font-semibold text-xs flex items-center justify-center gap-1.5"
        style={{
          background: scaricata === "tutte" ? b.accentSoft : b.surface,
          color: b.primary,
          border: `1px solid ${b.accentSoft}`,
        }}
      >
        <Download size={13} /> {scaricata === "tutte" ? "Scaricate ✓" : "Scarica tutte le fatture (PDF)"}
      </button>
      <div className="text-[10px] mt-2 italic" style={{ color: b.textSoft }}>
        Utili per la detrazione sanitaria del 19%: le hai sempre qui, anche a distanza di anni.
      </div>
    </div>
  );
}

/* ── App cliente completa ──────────────────────────────────────── */
export default function ClientApp() {
  const tenant = useTenant();
  const b = tenant.brand;
  const [riordinato, setRiordinato] = useState(false);

  return (
    <div className="flex justify-center py-4">
      <div
        className="w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl"
        style={{ background: b.surface, border: `8px solid ${b.primary}` }}
      >
        {/* header brand del negozio */}
        <div className="p-5 pb-4" style={{ background: b.primary }}>
          <div className="f-serif text-2xl" style={{ color: b.surface }}>{tenant.nome}</div>
          <div className="text-xs tracking-widest uppercase" style={{ color: b.accent }}>
            {tenant.citta} · dal {tenant.dal}
          </div>
          <div className="f-serif mt-3 text-lg" style={{ color: b.surface }}>Ciao Laura ✨</div>
        </div>

        <div className="p-4 space-y-3">
          {/* le mie lenti */}
          <div className="rounded-2xl p-4" style={{ background: "#fff", border: `1px solid ${b.accentSoft}` }}>
            <div className="flex items-center gap-2 mb-2">
              <Droplets size={15} style={{ color: b.accent }} />
              <span className="f-ui font-semibold text-sm" style={{ color: b.primary }}>
                Le mie lenti a contatto
              </span>
            </div>
            <div className="text-xs mb-1.5" style={{ color: b.textSoft }}>
              Mensili idrogel · scorta residua
            </div>
            <div className="h-2 rounded-full" style={{ background: b.accentSoft }}>
              <div className="h-2 rounded-full" style={{ width: "18%", background: b.accent }} />
            </div>
            <div className="text-xs f-mono mt-1" style={{ color: b.accent }}>~12 giorni rimanenti</div>
            <button
              onClick={() => setRiordinato(true)}
              className="mt-3 w-full rounded-xl py-2.5 f-ui font-semibold text-sm"
              style={{
                background: riordinato ? b.accentSoft : b.primary,
                color: riordinato ? b.accent : b.surface,
              }}
            >
              {riordinato ? "✓ Richiesta inviata — ti confermiamo il ritiro" : "Riordina con un tap"}
            </button>
          </div>

          {/* prenota */}
          <div
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: "#fff", border: `1px solid ${b.accentSoft}` }}
          >
            <Calendar size={18} style={{ color: b.accent }} />
            <div className="flex-1">
              <div className="f-ui font-semibold text-sm" style={{ color: b.primary }}>
                Prenota una visita
              </div>
              <div className="text-xs" style={{ color: b.textSoft }}>Primo slot: giovedì 17:30</div>
            </div>
            <ChevronRight size={16} style={{ color: b.accent }} />
          </div>

          {/* promo */}
          <div className="rounded-2xl p-4" style={{ background: b.primary }}>
            <div className="flex items-center gap-2">
              <Gift size={15} style={{ color: b.accent }} />
              <span className="f-serif text-base" style={{ color: b.surface }}>
                Il tuo secondo paio a −40%
              </span>
            </div>
            <div className="text-xs mt-1" style={{ color: b.accentSoft }}>
              Valido 60 giorni dal tuo ultimo acquisto · anche sole graduato
            </div>
          </div>

          {/* ruota dei premi */}
          <GameWheel b={b} />

          {/* porta un amico */}
          <ReferralCard tenant={tenant} />

          {/* guide */}
          <GuideList b={b} />

          <FrameAdvisor b={b} />
          <ReviewFunnel tenant={tenant} />
          <FattureCard b={b} />
        </div>

        {/* tab bar */}
        <div className="flex justify-around py-3 border-t" style={{ background: "#fff", borderColor: b.accentSoft }}>
          {(
            [
              [Home, "Home", true],
              [Eye, "Prescrizione", false],
              [Calendar, "Visite", false],
              [User, "Profilo", false],
            ] as const
          ).map(([Icon, l, on]) => (
            <div key={l} className="flex flex-col items-center gap-0.5">
              <Icon size={18} style={{ color: on ? b.accent : b.textFaint }} />
              <span className="text-[10px] f-ui" style={{ color: on ? b.accent : b.textFaint }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
