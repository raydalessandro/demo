"use client";

import { useState } from "react";
import { Check, ChevronLeft, Eye, MessageCircle, Minus, Plus, Store } from "lucide-react";
import type { Tenant, TenantBrand } from "@/lib/types";
import { LAC_SHOP } from "@/lib/demo-data";

/**
 * SitoNegozio — la vetrina LAC del sito pubblico del negozio.
 *
 * White-label integrale: colori, nome e voce sono del tenant; VISTA non
 * compare da nessuna parte. Il flusso è pensato per chiudersi in meno di
 * un minuto da telefono: prodotto → poteri → nome e telefono → fatto.
 *
 * v1 senza pagamenti: si ritira e si paga in negozio (ogni ritiro è un
 * rientro — l'esca del kit). L'ordine viene scritto in localStorage e il
 * modulo Ordini del pannello ottico lo pesca in cima alla coda: in
 * produzione al posto dello storage c'è Supabase, stessa tabella.
 */

const fmtD = (v: number) => `${v > 0 ? "+" : v < 0 ? "−" : "±"}${Math.abs(v).toFixed(2)}`;
const eur = (v: number) => v.toLocaleString("it-IT", { style: "currency", currency: "EUR" });

function Ghiera({
  label,
  value,
  onChange,
  brand,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  brand: TenantBrand;
}) {
  return (
    <div
      className="flex items-center justify-between rounded-xl px-3 py-2"
      style={{ background: "#fff", border: `1px solid ${brand.accentSoft}` }}
    >
      <span className="text-xs f-ui font-semibold" style={{ color: brand.textSoft }}>
        {label}
      </span>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onChange(Math.max(-12, +(value - 0.25).toFixed(2)))}
          className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition-transform"
          style={{ background: brand.accentSoft }}
          aria-label={`Riduci ${label}`}
        >
          <Minus size={14} style={{ color: brand.primary }} />
        </button>
        <span className="f-mono text-lg w-[4.5rem] text-center" style={{ color: brand.primary }}>
          {fmtD(value)}
        </span>
        <button
          onClick={() => onChange(Math.min(8, +(value + 0.25).toFixed(2)))}
          className="w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition-transform"
          style={{ background: brand.accentSoft }}
          aria-label={`Aumenta ${label}`}
        >
          <Plus size={14} style={{ color: brand.primary }} />
        </button>
      </div>
    </div>
  );
}

export default function SitoNegozio({ tenant }: { tenant: Tenant }) {
  const b = tenant.brand;
  const [fase, setFase] = useState<"scegli" | "dettagli" | "fatto">("scegli");
  const [idx, setIdx] = useState(0);
  const [od, setOd] = useState(-2);
  const [os, setOs] = useState(-2);
  const [qty, setQty] = useState(2);
  const [nome, setNome] = useState("");
  const [tel, setTel] = useState("");
  const [numero, setNumero] = useState("");

  const p = LAC_SHOP[idx];
  const totale = p.prezzo * qty;

  const ordina = () => {
    if (!nome.trim() || !tel.trim()) return;
    const ordine = {
      id: Date.now(),
      cliente: nome.trim(),
      prodotto: `${p.nome}${qty > 1 ? ` ×${qty}` : ""}`,
      poteri: `OD ${fmtD(od)} · OS ${fmtD(os)}`,
      fonte: "sito",
      stato: "da_ordinare",
      quando: "adesso · dal sito",
    };
    try {
      const key = `vista_sito_ordini_${tenant.slug}`;
      const prev = JSON.parse(localStorage.getItem(key) ?? "[]");
      localStorage.setItem(key, JSON.stringify([ordine, ...prev]));
    } catch {
      /* demo: senza storage l'ordine resta solo sulla conferma */
    }
    setNumero(String(ordine.id).slice(-4));
    setFase("fatto");
  };

  return (
    <main className="min-h-screen f-ui" style={{ background: b.surface }}>
      {/* insegna */}
      <header style={{ background: b.primary }}>
        <div className="max-w-md mx-auto px-5 py-6">
          <h1 className="f-serif text-3xl" style={{ color: "#fff" }}>
            {tenant.nome}
          </h1>
          <p className="f-mono text-[11px] mt-1 tracking-wide" style={{ color: b.accent }}>
            {tenant.citta} · dal {tenant.dal}
          </p>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 pb-16">
        {fase === "scegli" && (
          <>
            <h2 className="f-serif text-2xl mt-8 leading-snug" style={{ color: b.primary }}>
              Le tue lenti, ordinate dal divano.
            </h2>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: b.textSoft }}>
              Scegli online, ritira in negozio: le paghi al ritiro. Ti scriviamo
              noi su WhatsApp quando sono pronte.
            </p>

            <div className="mt-6 space-y-2.5">
              {LAC_SHOP.map((prod, i) => (
                <button
                  key={prod.id}
                  onClick={() => {
                    setIdx(i);
                    setFase("dettagli");
                  }}
                  className="w-full text-left rounded-2xl p-4 flex items-center gap-3 transition-transform hover:-translate-y-0.5"
                  style={{ background: "#fff", border: `1px solid ${b.accentSoft}` }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="f-ui font-semibold text-sm" style={{ color: b.primary }}>
                      {prod.nome}
                    </div>
                    <div className="text-[11px] mt-0.5" style={{ color: b.textSoft }}>
                      {prod.tipo}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="f-mono font-semibold" style={{ color: b.primary }}>
                      {eur(prod.prezzo)}
                    </div>
                    <div className="text-[10px] f-ui font-semibold" style={{ color: b.accent }}>
                      ordina →
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div
              className="mt-6 rounded-2xl p-4 grid grid-cols-3 gap-2 text-center"
              style={{ background: b.accentSoft }}
            >
              {(
                [
                  [Store, "Ritiri e paghi in negozio"],
                  [MessageCircle, "Ti avvisiamo su WhatsApp"],
                  [Eye, "Controllo applicazione incluso"],
                ] as const
              ).map(([Icon, t]) => (
                <div key={t} className="flex flex-col items-center gap-1.5">
                  <Icon size={16} style={{ color: b.primary }} />
                  <span className="text-[10px] leading-tight" style={{ color: b.textSoft }}>
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {fase === "dettagli" && (
          <>
            <button
              onClick={() => setFase("scegli")}
              className="flex items-center gap-1 text-xs f-ui font-semibold mt-5"
              style={{ color: b.textSoft }}
            >
              <ChevronLeft size={14} /> tutti i prodotti
            </button>

            <div
              className="mt-3 rounded-2xl p-4"
              style={{ background: "#fff", border: `1px solid ${b.accentSoft}` }}
            >
              <div className="f-ui font-semibold" style={{ color: b.primary }}>
                {p.nome}
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: b.textSoft }}>
                {p.tipo} · {eur(p.prezzo)} a confezione
              </div>
            </div>

            <p className="f-mono text-[10px] tracking-[0.18em] uppercase mt-5 mb-2" style={{ color: b.accent }}>
              I tuoi poteri (sfera)
            </p>
            <div className="space-y-2">
              <Ghiera label="Occhio destro · OD" value={od} onChange={setOd} brand={b} />
              <Ghiera label="Occhio sinistro · OS" value={os} onChange={setOs} brand={b} />
            </div>
            <p className="text-[11px] mt-2 leading-relaxed" style={{ color: b.textSoft }}>
              Toriche o multifocali? Ordina lo stesso: la tua prescrizione
              l&apos;abbiamo in archivio e sistemiamo noi i parametri prima di ordinare.
            </p>

            <p className="f-mono text-[10px] tracking-[0.18em] uppercase mt-5 mb-2" style={{ color: b.accent }}>
              Quante confezioni
            </p>
            <div
              className="flex items-center justify-between rounded-xl px-3 py-2"
              style={{ background: "#fff", border: `1px solid ${b.accentSoft}` }}
            >
              <span className="text-xs f-ui font-semibold" style={{ color: b.textSoft }}>
                Confezioni
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: b.accentSoft }}
                  aria-label="Meno confezioni"
                >
                  <Minus size={14} style={{ color: b.primary }} />
                </button>
                <span className="f-mono text-lg w-10 text-center" style={{ color: b.primary }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty(Math.min(12, qty + 1))}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: b.accentSoft }}
                  aria-label="Più confezioni"
                >
                  <Plus size={14} style={{ color: b.primary }} />
                </button>
              </div>
            </div>

            <p className="f-mono text-[10px] tracking-[0.18em] uppercase mt-5 mb-2" style={{ color: b.accent }}>
              Chi ritira
            </p>
            <div className="space-y-2">
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome e cognome"
                className="w-full rounded-xl px-3 py-2.5 text-sm f-ui outline-none"
                style={{ background: "#fff", border: `1px solid ${b.accentSoft}`, color: b.primary }}
              />
              <input
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                placeholder="Cellulare (per l’avviso WhatsApp)"
                inputMode="tel"
                className="w-full rounded-xl px-3 py-2.5 text-sm f-ui outline-none"
                style={{ background: "#fff", border: `1px solid ${b.accentSoft}`, color: b.primary }}
              />
            </div>

            <div
              className="mt-5 pt-3 flex items-baseline justify-between"
              style={{ borderTop: `1px dashed ${b.accent}` }}
            >
              <span className="text-xs f-ui" style={{ color: b.textSoft }}>
                Totale al ritiro
              </span>
              <span className="f-mono text-2xl font-semibold" style={{ color: b.primary }}>
                {eur(totale)}
              </span>
            </div>

            <button
              onClick={ordina}
              disabled={!nome.trim() || !tel.trim()}
              className="w-full mt-3 rounded-xl py-3.5 f-ui font-semibold text-sm disabled:opacity-40"
              style={{ background: b.primary, color: "#fff" }}
            >
              Ordina — paghi al ritiro
            </button>
            <p className="text-[10px] text-center mt-2" style={{ color: b.textFaint }}>
              Nessun pagamento online. L&apos;ordine è impegnativo solo al ritiro.
            </p>
          </>
        )}

        {fase === "fatto" && (
          <div className="pt-12 text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
              style={{ background: b.accentSoft }}
            >
              <Check size={28} style={{ color: b.primary }} />
            </div>
            <h2 className="f-serif text-2xl mt-4" style={{ color: b.primary }}>
              Ordine ricevuto!
            </h2>
            <p className="f-mono text-xs mt-1" style={{ color: b.accent }}>
              #{numero}
            </p>

            <div
              className="mt-6 rounded-2xl p-4 text-left"
              style={{ background: "#fff", border: `1px solid ${b.accentSoft}` }}
            >
              <div
                className="f-mono text-xs space-y-1.5 pb-3"
                style={{ color: b.textSoft, borderBottom: `1px dashed ${b.accentSoft}` }}
              >
                <div className="flex justify-between">
                  <span>{p.nome}</span>
                  <span>×{qty}</span>
                </div>
                <div className="flex justify-between">
                  <span>OD {fmtD(od)}</span>
                  <span>OS {fmtD(os)}</span>
                </div>
              </div>
              <div className="flex justify-between pt-3 f-mono font-semibold" style={{ color: b.primary }}>
                <span>Al ritiro</span>
                <span>{eur(totale)}</span>
              </div>
            </div>

            <p className="text-sm mt-5 leading-relaxed" style={{ color: b.textSoft }}>
              Ti scriviamo su WhatsApp appena le lenti sono pronte, di solito in
              2–3 giorni. Al ritiro, se vuoi, controlliamo insieme
              l&apos;applicazione: è incluso.
            </p>

            <button
              onClick={() => {
                setFase("scegli");
                setNome("");
                setTel("");
                setQty(2);
              }}
              className="mt-6 text-xs f-ui font-semibold"
              style={{ color: b.accent }}
            >
              Fai un altro ordine →
            </button>
          </div>
        )}

        <footer className="mt-14 pt-4 text-center" style={{ borderTop: `1px solid ${b.accentSoft}` }}>
          <p className="f-mono text-[10px]" style={{ color: b.textFaint }}>
            {tenant.nome} · {tenant.citta} · dal {tenant.dal}
          </p>
        </footer>
      </div>
    </main>
  );
}
