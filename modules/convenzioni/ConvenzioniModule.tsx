"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  Check,
  ChevronDown,
  FileCheck,
  Handshake,
  MessageCircle,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { Kpi, SectionTitle } from "@/components/ui";
import { VISTA as T, useTenant } from "@/lib/theme";
import {
  CLIENTI_CONVENZIONE,
  CONVENZIONI,
  MSG_VOUCHER,
  OPPORTUNITA_CANALI,
  VOUCHER_APERTI,
} from "@/lib/demo-data";

/**
 * Convenzioni — il quarto pilastro: l'acquisizione.
 *
 * Il cuore del modulo è LA GARA: quando un iscritto apre il voucher sul
 * portale del fondo, il fondo avvisa tutti i convenzionati. Il primo che
 * lo contatta se lo porta in negozio — un voucher aperto è un occhiale
 * certo. Le catene sono maniacali su questa lista; l'indipendente spesso
 * non sa che la gara esiste. Qui la vede, col messaggio già pronto.
 *
 * Quanti clienti porta l'assicurazione dipende da quanto sei attento:
 * il software rende l'attenzione quasi automatica (v1 manuale a un
 * tocco; poi trigger sul portale e invio all'apertura).
 */

type Voucher = (typeof VOUCHER_APERTI)[number];

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
  const tenant = useTenant();
  const [tab, setTab] = useState<"attive" | "report" | "opportunita">("attive");
  const [aperta, setAperta] = useState<string | null>("metasalute");
  const [voucher, setVoucher] = useState<Voucher[]>(VOUCHER_APERTI);

  const contatta = (id: number) =>
    setVoucher((vs) =>
      vs.map((v) =>
        v.id === id ? { ...v, stato: "contattato", esito: "messaggio inviato · adesso" } : v,
      ),
    );

  const msgPer = (v: Voucher) =>
    MSG_VOUCHER.replace("{{nome}}", v.nome.split(" ")[0])
      .replace("{{fondo}}", v.conv)
      .replace("{{valore}}", String(v.valore))
      .replace("{{negozio}}", tenant.nome);

  const kpi = useMemo(() => {
    const attive = CONVENZIONI.filter((c) => c.stato === "attiva");
    return {
      daContattare: voucher.filter((v) => v.stato === "da_contattare").length,
      clienti: attive.reduce((s, c) => s + c.clienti, 0),
      incasso: attive.reduce((s, c) => s + c.incasso, 0),
    };
  }, [voucher]);

  const maxIncasso = Math.max(...CONVENZIONI.map((c) => c.incasso), 1);

  return (
    <div>
      <div className="flex gap-2">
        <Kpi
          label="Voucher aperti"
          value={String(kpi.daContattare)}
          sub="da contattare — adesso"
        />
        <Kpi label="Clienti nuovi (trim.)" value={String(kpi.clienti)} sub="da convenzioni" />
        <Kpi label="Incasso generato" value={eur(kpi.incasso)} />
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
              const gara = voucher.filter((v) => v.conv === c.nome);
              const caldi = gara.filter((v) => v.stato === "da_contattare").length;
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
                        {caldi > 0 && (
                          <span
                            className="text-[9px] f-ui font-bold px-1.5 py-0.5 rounded-full"
                            style={{ background: T.amber, color: "#fff" }}
                          >
                            {caldi} voucher aperti
                          </span>
                        )}
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
                      {/* ── LA GARA: voucher aperti adesso ── */}
                      {gara.length > 0 && (
                        <div
                          className="rounded-xl p-3 mb-3"
                          style={{ background: T.paper, border: `1px solid ${T.amber}` }}
                        >
                          <p className="text-[11px] leading-relaxed" style={{ color: T.inkSoft }}>
                            <span className="f-ui font-bold" style={{ color: T.ink }}>
                              La gara.
                            </span>{" "}
                            Quando un iscritto apre il voucher sul portale, il fondo
                            avvisa <em>tutti</em> i convenzionati: il primo che lo
                            contatta se lo porta in negozio. Un voucher aperto è un
                            occhiale certo — va solo contattato prima degli altri.
                          </p>
                          <div className="mt-2.5 space-y-1.5">
                            {gara.map((v) => (
                              <div
                                key={v.id}
                                className="rounded-lg p-2.5"
                                style={{ background: T.card, border: `1px solid ${T.line}` }}
                              >
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-1.5 flex-wrap">
                                      <span
                                        className="text-xs f-ui font-semibold"
                                        style={{ color: T.ink }}
                                      >
                                        {v.nome}
                                      </span>
                                      <span className="f-mono text-xs" style={{ color: T.amber }}>
                                        €{v.valore}
                                      </span>
                                      <span className="f-mono text-[10px]" style={{ color: T.inkSoft }}>
                                        aperto {v.aperto}
                                      </span>
                                    </div>
                                    {v.esito && (
                                      <div
                                        className="text-[10px] f-mono mt-0.5"
                                        style={{
                                          color: v.stato === "perso" ? T.inkSoft : T.teal,
                                        }}
                                      >
                                        {v.esito}
                                      </div>
                                    )}
                                  </div>
                                  {v.stato === "da_contattare" && (
                                    <button
                                      onClick={() => contatta(v.id)}
                                      className="shrink-0 flex items-center gap-1 text-[11px] f-ui font-semibold px-2.5 py-1.5 rounded-lg"
                                      style={{ background: T.teal, color: "#fff" }}
                                    >
                                      <MessageCircle size={12} /> Contatta
                                    </button>
                                  )}
                                  {v.stato === "contattato" && (
                                    <span
                                      className="shrink-0 flex items-center gap-1 text-[10px] f-ui font-semibold px-2 py-1 rounded-full"
                                      style={{ background: T.tealSoft, color: T.teal }}
                                    >
                                      <Check size={11} /> contattato
                                    </span>
                                  )}
                                  {v.stato === "vinto" && (
                                    <span
                                      className="shrink-0 flex items-center gap-1 text-[10px] f-ui font-semibold px-2 py-1 rounded-full"
                                      style={{ background: T.teal, color: "#fff" }}
                                    >
                                      <Check size={11} /> vinto
                                    </span>
                                  )}
                                  {v.stato === "perso" && (
                                    <span
                                      className="shrink-0 flex items-center gap-1 text-[10px] f-ui font-semibold px-2 py-1 rounded-full"
                                      style={{ background: T.paper, color: T.inkSoft }}
                                    >
                                      <X size={11} /> perso
                                    </span>
                                  )}
                                </div>
                                {v.stato === "contattato" && (
                                  <div
                                    className="mt-2 rounded-lg p-2 text-[11px] leading-relaxed"
                                    style={{ background: T.tealSoft, color: T.ink }}
                                  >
                                    {msgPer(v)}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          <p className="f-mono text-[10px] mt-2 leading-relaxed" style={{ color: T.inkSoft }}>
                            Oggi tocchi tu «Contatta». Presto: controllo del portale
                            ogni 10 minuti e messaggio in partenza da solo appena il
                            voucher si apre.
                          </p>
                        </div>
                      )}

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
            <div className="text-[11px] f-mono mt-0.5" style={{ color: T.teal }}>
              gara voucher: 9 aperti, 7 vinti · tempo medio di contatto 21 min
            </div>
          </div>
          <div className="text-[11px] mt-2 leading-relaxed" style={{ color: T.inkSoft }}>
            Quanti clienti porta l’assicurazione dipende da quanto sei veloce: il
            tempo di contatto è il numero da guardare. E il primo scontrino è solo
            l’inizio — ogni cliente entrato da qui è già nel Recall.
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
