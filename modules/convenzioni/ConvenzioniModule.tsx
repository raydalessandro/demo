"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  ChevronDown,
  FileCheck,
  Handshake,
  Target,
  TrendingUp,
} from "lucide-react";
import { Kpi, SectionTitle } from "@/components/ui";
import { VISTA as T } from "@/lib/theme";
import {
  CLIENTI_CONVENZIONE,
  CONVENZIONI,
  OPPORTUNITA_CANALI,
} from "@/lib/demo-data";

/**
 * Convenzioni — il quarto pilastro: l'acquisizione.
 *
 * Recall fa tornare, Banco fa vendere meglio, Boutique trattiene:
 * questo modulo fa ARRIVARE. Ogni cliente entra taggato con la sua
 * fonte (la stessa colonna di app/sito/banco negli ordini) e il report
 * dimostra l'acquisizione — il numero da portare al rinnovo della
 * convenzione, e all'agente in trattativa.
 *
 * Le meccaniche sono quelle vere del mercato: voucher (Metasalute),
 * rimborsuale (Fondo Est), fattura all'azienda (videoterminalisti
 * 81/08), pagamento diretto via network (UniSalute/Previmedical).
 */

const MECCANICHE: Record<string, { label: string; bg: string; fg: string }> = {
  voucher: { label: "Voucher", bg: T.amberSoft, fg: T.amber },
  rimborsuale: { label: "Rimborso al cliente", bg: "#E7EAF6", fg: "#5B6DA8" },
  "fattura azienda": { label: "Fattura all'azienda", bg: T.tealSoft, fg: T.teal },
  diretta: { label: "Pagamento diretto", bg: T.tealSoft, fg: T.teal },
};

const STATI_OPP: Record<string, { bg: string; fg: string }> = {
  "da contattare": { bg: T.amberSoft, fg: T.amber },
  "in corso": { bg: "#E7EAF6", fg: "#5B6DA8" },
  "da valutare": { bg: T.paper, fg: T.inkSoft },
};

const eur = (v: number) => "€" + v.toLocaleString("it-IT");

export default function ConvenzioniModule() {
  const [tab, setTab] = useState<"attive" | "report" | "opportunita">("attive");
  const [aperta, setAperta] = useState<string | null>(null);

  const kpi = useMemo(() => {
    const attive = CONVENZIONI.filter((c) => c.stato === "attiva");
    return {
      clienti: attive.reduce((s, c) => s + c.clienti, 0),
      incasso: attive.reduce((s, c) => s + c.incasso, 0),
      attive: attive.length,
    };
  }, []);

  const maxIncasso = Math.max(...CONVENZIONI.map((c) => c.incasso), 1);

  return (
    <div>
      <div className="flex gap-2">
        <Kpi label="Clienti nuovi (trim.)" value={String(kpi.clienti)} sub="da convenzioni" />
        <Kpi label="Incasso generato" value={eur(kpi.incasso)} />
        <Kpi
          label="Convenzioni attive"
          value={String(kpi.attive)}
          sub={`+${CONVENZIONI.length - kpi.attive} in attesa`}
        />
      </div>

      <div className="flex gap-1.5 mt-4">
        {(
          [
            ["attive", Handshake, "Attive"],
            ["report", TrendingUp, "Report"],
            ["opportunita", Target, "Da attivare"],
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

      {tab === "attive" && (
        <>
          <SectionTitle icon={Handshake}>Le convenzioni del negozio</SectionTitle>
          <div className="space-y-1.5">
            {CONVENZIONI.map((c) => {
              const mec = MECCANICHE[c.meccanica];
              const attiva = c.stato === "attiva";
              const espansa = aperta === c.id;
              const clienti = CLIENTI_CONVENZIONE.filter((x) => x.conv === c.nome);
              return (
                <div
                  key={c.id}
                  className="rounded-xl"
                  style={{ background: T.card, border: `1px solid ${espansa ? T.teal : T.line}` }}
                >
                  <button
                    onClick={() => setAperta(espansa ? null : c.id)}
                    className="w-full text-left p-3 flex items-center gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm f-ui font-semibold" style={{ color: T.ink }}>
                          {c.nome}
                        </span>
                        <span
                          className="text-[9px] f-ui font-semibold px-1.5 py-0.5 rounded-full"
                          style={
                            attiva
                              ? { background: T.tealSoft, color: T.teal }
                              : { background: T.amberSoft, color: T.amber }
                          }
                        >
                          {c.stato}
                        </span>
                        <span
                          className="text-[9px] f-ui font-semibold px-1.5 py-0.5 rounded-full"
                          style={{ background: mec.bg, color: mec.fg }}
                        >
                          {mec.label}
                        </span>
                      </div>
                      <div className="text-[11px] mt-0.5" style={{ color: T.inkSoft }}>
                        {c.tipo}
                      </div>
                      {attiva && (
                        <div className="text-[10px] f-mono mt-0.5" style={{ color: T.teal }}>
                          {c.clienti} clienti · {eur(c.incasso)}
                        </div>
                      )}
                    </div>
                    <ChevronDown
                      size={16}
                      style={{
                        color: T.inkSoft,
                        transform: espansa ? "rotate(180deg)" : "none",
                        transition: "transform .2s",
                      }}
                    />
                  </button>

                  {espansa && (
                    <div className="px-3 pb-3">
                      <p className="text-xs leading-relaxed" style={{ color: T.inkSoft }}>
                        {c.regole}
                      </p>
                      <div className="mt-2.5 space-y-1">
                        {c.documenti.map((d) => (
                          <div key={d} className="flex items-center gap-1.5">
                            <FileCheck size={12} style={{ color: T.teal }} />
                            <span className="text-[11px]" style={{ color: T.ink }}>
                              {d}
                            </span>
                          </div>
                        ))}
                      </div>
                      {clienti.length > 0 && (
                        <div
                          className="mt-3 pt-2 space-y-1.5"
                          style={{ borderTop: `1px dashed ${T.line}` }}
                        >
                          {clienti.map((x) => (
                            <div key={x.nome} className="flex items-baseline justify-between gap-2">
                              <div className="min-w-0">
                                <span className="text-xs f-ui font-semibold" style={{ color: T.ink }}>
                                  {x.nome}
                                </span>
                                <span className="text-[10px] ml-1.5" style={{ color: T.inkSoft }}>
                                  {x.cosa} · {x.quando}
                                </span>
                              </div>
                              <span className="f-mono text-xs shrink-0" style={{ color: T.ink }}>
                                {eur(x.spesa)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-[11px] mt-2" style={{ color: T.inkSoft }}>
            Ogni cliente entra taggato con la sua fonte — la stessa colonna di
            “dall’app” e “dal sito” negli ordini. Il report si scrive da solo.
          </div>
        </>
      )}

      {tab === "report" && (
        <>
          <SectionTitle icon={TrendingUp}>Quanto portano i canali</SectionTitle>
          <div className="rounded-xl p-3.5" style={{ background: T.card, border: `1px solid ${T.line}` }}>
            <div className="space-y-3">
              {CONVENZIONI.filter((c) => c.incasso > 0).map((c) => (
                <div key={c.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs f-ui font-semibold" style={{ color: T.ink }}>
                      {c.nome}
                    </span>
                    <span className="f-mono text-xs" style={{ color: T.ink }}>
                      {c.clienti} clienti · {eur(c.incasso)}
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full" style={{ background: T.paper }}>
                    <div
                      className="h-2.5 rounded-full"
                      style={{ width: `${(c.incasso / maxIncasso) * 100}%`, background: T.teal }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mt-4 pt-3 flex items-baseline justify-between"
              style={{ borderTop: `2px solid ${T.ink}` }}
            >
              <span className="text-xs f-ui font-semibold" style={{ color: T.ink }}>
                Totale trimestre
              </span>
              <span className="f-mono text-xl font-semibold" style={{ color: T.ink }}>
                {eur(kpi.incasso)}
              </span>
            </div>
            <div className="text-[11px] f-mono mt-1" style={{ color: T.inkSoft }}>
              {kpi.clienti} clienti nuovi · {eur(Math.round(kpi.incasso / kpi.clienti))} di
              scontrino medio
            </div>
          </div>
          <div className="text-[11px] mt-2 leading-relaxed" style={{ color: T.inkSoft }}>
            Questo è il numero da portare al rinnovo della convenzione — e il
            primo scontrino è solo l’inizio: ogni cliente entrato da qui è già
            nel Recall, col suo ciclo di vita davanti.
          </div>
        </>
      )}

      {tab === "opportunita" && (
        <>
          <SectionTitle icon={Building2}>Canali da attivare in zona</SectionTitle>
          <div className="space-y-1.5">
            {OPPORTUNITA_CANALI.map((o) => {
              const st = STATI_OPP[o.stato];
              return (
                <div
                  key={o.id}
                  className="rounded-xl p-3"
                  style={{ background: T.card, border: `1px solid ${T.line}` }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm f-ui font-semibold" style={{ color: T.ink }}>
                      {o.nome}
                    </span>
                    <span
                      className="text-[9px] f-ui font-semibold px-1.5 py-0.5 rounded-full shrink-0"
                      style={{ background: st.bg, color: st.fg }}
                    >
                      {o.stato}
                    </span>
                  </div>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: T.inkSoft }}>
                    {o.gancio}
                  </p>
                  <p className="text-[10px] f-mono mt-1.5" style={{ color: T.teal }}>
                    primo passo: {o.primoPasso}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="text-[11px] mt-2" style={{ color: T.inkSoft }}>
            Recall fa tornare, Convenzioni fa arrivare: i canali portano i
            clienti, il software li rende gestibili — e misurabili.
          </div>
        </>
      )}
    </div>
  );
}
