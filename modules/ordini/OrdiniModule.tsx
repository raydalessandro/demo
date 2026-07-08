"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Droplets, FileText, Globe, Minus, Plus, Smartphone } from "lucide-react";
import { Kpi, SectionTitle } from "@/components/ui";
import { VISTA as T, useTenant } from "@/lib/theme";
import {
  BUSTE_DEMO,
  LAC_CATALOGO,
  ORDINI_LAC_DEMO,
  STATI_BUSTA,
  STATI_LAC,
} from "@/lib/demo-data";

/**
 * Ordini — la prima cellula del gestionale.
 *
 * Flusso e stati ripresi da Gestionale_ottica/OrdiniLACModule, riscritti
 * sull'architettura tenant. Il punto da mostrare ad AD: il riordino che
 * il cliente fa "con un tap" nell'app Boutique atterra QUI, in cima alla
 * coda — il cerchio si chiude. Stessa base dati (clienti, prescrizioni,
 * ordini, stati) del futuro gestionale completo: LAC oggi, tutto domani.
 */

type OrdineLAC = (typeof ORDINI_LAC_DEMO)[number];
type Busta = (typeof BUSTE_DEMO)[number];

function StatoChip({
  stati,
  stato,
  onAvanza,
}: {
  stati: ReadonlyArray<{ id: string; label: string; bg: string; fg: string }>;
  stato: string;
  onAvanza: () => void;
}) {
  const i = stati.findIndex((s) => s.id === stato);
  const s = stati[Math.max(0, i)];
  const ultimo = i === stati.length - 1;
  return (
    <button
      onClick={onAvanza}
      disabled={ultimo}
      className="text-[10px] f-ui font-semibold px-2 py-1 rounded-full shrink-0"
      style={{ background: s.bg, color: s.fg, opacity: ultimo ? 0.7 : 1 }}
      title={ultimo ? "" : "tocca per avanzare"}
    >
      {s.label}
      {!ultimo && " →"}
    </button>
  );
}

export default function OrdiniModule() {
  const tenant = useTenant();
  const [tab, setTab] = useState<"lac" | "buste">("lac");
  const [ordini, setOrdini] = useState<OrdineLAC[]>(ORDINI_LAC_DEMO);
  const [buste, setBuste] = useState<Busta[]>(BUSTE_DEMO);

  // Gli ordini fatti sul sito pubblico (/sito/[slug]) atterrano qui in coda.
  // In produzione: stessa tabella su Supabase, qui localStorage per la demo.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`vista_sito_ordini_${tenant.slug}`);
      if (!raw) return;
      const dalSito = JSON.parse(raw) as OrdineLAC[];
      setOrdini((prev) => [
        ...dalSito.filter((n) => !prev.some((p) => p.id === n.id)),
        ...prev,
      ]);
    } catch {
      /* senza storage la coda resta quella di esempio */
    }
  }, [tenant.slug]);

  // nuovo ordine
  const [formAperto, setFormAperto] = useState(false);
  const [cliente, setCliente] = useState("");
  const [prodottoIdx, setProdottoIdx] = useState(0);
  const [qty, setQty] = useState(1);

  const avanzaLac = (id: number) =>
    setOrdini((o) =>
      o.map((x) => {
        if (x.id !== id) return x;
        const i = STATI_LAC.findIndex((s) => s.id === x.stato);
        return i < STATI_LAC.length - 1 ? { ...x, stato: STATI_LAC[i + 1].id } : x;
      }),
    );

  const avanzaBusta = (id: string) =>
    setBuste((b) =>
      b.map((x) => {
        if (x.id !== id) return x;
        const i = STATI_BUSTA.findIndex((s) => s.id === x.stato);
        return i < STATI_BUSTA.length - 1 ? { ...x, stato: STATI_BUSTA[i + 1].id } : x;
      }),
    );

  const aggiungi = () => {
    if (!cliente.trim()) return;
    setOrdini((o) => [
      {
        id: Date.now(),
        cliente: cliente.trim(),
        prodotto: `${LAC_CATALOGO[prodottoIdx]}${qty > 1 ? ` ×${qty}` : ""}`,
        poteri: "da prescrizione in archivio",
        fonte: "banco",
        stato: "da_ordinare",
        quando: "adesso",
      },
      ...o,
    ]);
    setCliente("");
    setQty(1);
    setFormAperto(false);
  };

  const kpi = useMemo(() => {
    const aperti = ordini.filter((o) => o.stato !== "consegnato").length;
    const pronti =
      ordini.filter((o) => o.stato === "arrivato").length +
      buste.filter((b) => b.stato === "pronta").length;
    const dallApp = ordini.filter((o) => (o.fonte === "app" || o.fonte === "sito") && o.stato !== "consegnato").length;
    return { aperti, pronti, dallApp };
  }, [ordini, buste]);

  return (
    <div>
      <div className="flex gap-2">
        <Kpi label="Ordini aperti" value={String(kpi.aperti)} />
        <Kpi label="Pronti · da avvisare" value={String(kpi.pronti)} sub="rientri in negozio" />
        <Kpi label="Da app e sito" value={String(kpi.dallApp)} sub="canali digitali → qui" />
      </div>

      <div className="flex gap-1.5 mt-4">
        {(
          [
            ["lac", Droplets, "Ordini LAC"],
            ["buste", FileText, "Buste occhiali"],
          ] as const
        ).map(([id, Icon, l]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs f-ui font-semibold"
            style={
              tab === id
                ? { background: T.ink, color: "#fff" }
                : { background: T.card, color: T.ink, border: `1px solid ${T.line}` }
            }
          >
            <Icon size={13} /> {l}
          </button>
        ))}
      </div>

      {tab === "lac" && (
        <>
          <SectionTitle
            icon={Droplets}
            right={
              <button
                onClick={() => setFormAperto(!formAperto)}
                className="text-xs f-ui font-semibold flex items-center gap-1"
                style={{ color: T.teal }}
              >
                <Plus size={13} /> Nuovo ordine
              </button>
            }
          >
            Coda ordini LAC
          </SectionTitle>

          {formAperto && (
            <div className="rounded-xl p-3 mb-2 space-y-2.5" style={{ background: T.card, border: `1px solid ${T.teal}` }}>
              <input
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                placeholder="Nome cliente"
                className="w-full rounded-lg px-2.5 py-2 text-sm f-ui outline-none"
                style={{ background: T.paper, border: `1px solid ${T.line}`, color: T.ink }}
              />
              <div className="flex gap-1.5 flex-wrap">
                {LAC_CATALOGO.map((p, i) => (
                  <button
                    key={p}
                    onClick={() => setProdottoIdx(i)}
                    className="text-[11px] f-ui px-2 py-1.5 rounded-lg"
                    style={
                      prodottoIdx === i
                        ? { background: T.teal, color: "#fff" }
                        : { background: T.paper, color: T.ink, border: `1px solid ${T.line}` }
                    }
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs f-ui" style={{ color: T.ink }}>Confezioni</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-7 h-7 rounded-md flex items-center justify-center"
                    style={{ background: T.paper, border: `1px solid ${T.line}` }}
                  >
                    <Minus size={12} style={{ color: T.ink }} />
                  </button>
                  <span className="f-mono text-sm w-8 text-center" style={{ color: T.ink }}>{qty}</span>
                  <button
                    onClick={() => setQty(Math.min(12, qty + 1))}
                    className="w-7 h-7 rounded-md flex items-center justify-center"
                    style={{ background: T.paper, border: `1px solid ${T.line}` }}
                  >
                    <Plus size={12} style={{ color: T.ink }} />
                  </button>
                </div>
              </div>
              <button
                onClick={aggiungi}
                className="w-full rounded-lg py-2.5 f-ui font-semibold text-sm flex items-center justify-center gap-2"
                style={{ background: T.teal, color: "#fff" }}
              >
                <Check size={14} /> Aggiungi alla coda
              </button>
            </div>
          )}

          <div className="space-y-1.5">
            {ordini.map((o) => {
              const st = STATI_LAC.find((s) => s.id === o.stato) ?? STATI_LAC[0];
              return (
                <div
                  key={o.id}
                  className="rounded-xl p-2.5 flex items-center gap-3"
                  style={{ background: T.card, border: `1px solid ${T.line}` }}
                >
                  <div className="w-1.5 self-stretch rounded-full" style={{ background: st.fg }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm f-ui font-semibold" style={{ color: T.ink }}>{o.cliente}</span>
                      {(o.fonte === "app" || o.fonte === "sito") && (
                        <span
                          className="text-[9px] f-ui font-semibold px-1.5 py-0.5 rounded-full inline-flex items-center gap-1"
                          style={{ background: T.tealSoft, color: T.teal }}
                        >
                          {o.fonte === "app" ? <Smartphone size={9} /> : <Globe size={9} />}
                          {o.fonte === "app" ? "dall'app" : "dal sito"}
                        </span>
                      )}
                    </div>
                    <div className="text-xs truncate" style={{ color: T.inkSoft }}>{o.prodotto}</div>
                    <div className="text-[10px] f-mono" style={{ color: T.inkSoft }}>
                      {o.poteri} · {o.quando}
                    </div>
                  </div>
                  <StatoChip stati={STATI_LAC} stato={o.stato} onAvanza={() => avanzaLac(o.id)} />
                </div>
              );
            })}
          </div>
          <div className="text-[11px] mt-2" style={{ color: T.inkSoft }}>
            Il riordino dall&apos;app Boutique e l&apos;ordine fatto sul sito del negozio
            atterrano qui, in cima alla coda. Tocca lo stato per farlo avanzare: su &quot;Arrivato&quot; parte l&apos;avviso
            WhatsApp — un altro rientro in negozio.
          </div>
        </>
      )}

      {tab === "buste" && (
        <>
          <SectionTitle icon={FileText}>Buste occhiali in laboratorio</SectionTitle>
          <div className="space-y-1.5">
            {buste.map((b) => {
              const st = STATI_BUSTA.find((s) => s.id === b.stato) ?? STATI_BUSTA[0];
              return (
                <div
                  key={b.id}
                  className="rounded-xl p-2.5 flex items-center gap-3"
                  style={{ background: T.card, border: `1px solid ${T.line}` }}
                >
                  <div className="w-1.5 self-stretch rounded-full" style={{ background: st.fg }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm f-ui font-semibold" style={{ color: T.ink }}>{b.cliente}</div>
                    <div className="text-xs truncate" style={{ color: T.inkSoft }}>{b.descrizione}</div>
                    <div className="text-[10px] f-mono" style={{ color: T.inkSoft }}>{b.id}</div>
                  </div>
                  <StatoChip stati={STATI_BUSTA} stato={b.stato} onAvanza={() => avanzaBusta(b.id)} />
                </div>
              );
            })}
          </div>
          <div className="text-[11px] mt-2" style={{ color: T.inkSoft }}>
            Le buste nascono dal modulo Banco → Busta lavoro e vivono qui fino alla consegna.
            In produzione: stessa base dati su Supabase — clienti, prescrizioni, ordini, stati.
            LAC oggi, gestionale completo domani, senza rifare niente.
          </div>
        </>
      )}
    </div>
  );
}
