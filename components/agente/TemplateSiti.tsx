import { Clock, Droplets, Eye, Glasses, MapPin, ScanLine } from "lucide-react";
import type { PALETTE_SITI } from "@/lib/demo-data";

/**
 * I tre template del sito in regalo.
 *
 * Discendenze dagli asset della zip: Vetrina viene dal fronte
 * heritage (Gianfranco), Boutique dal fronte brand-first (Bollani),
 * Studio dal dominio optometrico del gestionale. Sono anteprime a
 * pagina singola, pensate per la trattativa: nome, città e palette
 * arrivano dal selettore e il sito "diventa" del negozio davanti.
 *
 * Tutti e tre portano i binari VISTA senza mai dirlo (white-label):
 * la sezione LAC online e la prenotazione. Il regalo installa
 * l'infrastruttura.
 */

export type PaletteSito = (typeof PALETTE_SITI)[number];

export interface SitoConfig {
  nome: string;
  citta: string;
  dal: string;
  p: PaletteSito;
}

/** CTA di anteprima: sembra un bottone, non porta da nessuna parte. */
function Cta({
  children,
  bg,
  fg,
  block,
}: {
  children: React.ReactNode;
  bg: string;
  fg: string;
  block?: boolean;
}) {
  return (
    <span
      className={`${block ? "block text-center" : "inline-block"} rounded-xl px-4 py-2.5 f-ui font-semibold text-sm select-none`}
      style={{ background: bg, color: fg }}
    >
      {children}
    </span>
  );
}

/* ── 1. VETRINA — la bottega classica ───────────────────────────── */

export function TemplateVetrina({ nome, citta, dal, p }: SitoConfig) {
  return (
    <div className="f-ui" style={{ background: p.surface }}>
      <div className="m-3 px-5 py-8" style={{ border: `3px double ${p.accent}` }}>
        {/* insegna centrata */}
        <div className="text-center">
          <p className="f-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: p.accent }}>
            {citta} · dal {dal}
          </p>
          <h1 className="f-serif text-3xl mt-2 leading-tight" style={{ color: p.primary }}>
            {nome}
          </h1>
          <p className="f-serif text-sm italic mt-1" style={{ color: p.textSoft }}>
            La vista, curata come una volta. Con gli strumenti di oggi.
          </p>
        </div>

        <div className="text-center my-6 f-mono text-xs" style={{ color: p.accent }}>
          · · ·
        </div>

        {/* chi siamo */}
        <p className="text-sm leading-relaxed text-center" style={{ color: p.textSoft }}>
          Dal {dal} accompagniamo le famiglie di {citta}: il controllo con calma,
          la montatura giusta, le lenti spiegate bene. Qui ogni occhiale ha un
          nome e un volto.
        </p>

        {/* servizi */}
        <div className="mt-7">
          <p className="f-mono text-[10px] tracking-[0.25em] uppercase text-center mb-3" style={{ color: p.accent }}>
            I nostri servizi
          </p>
          <div className="space-y-2">
            {[
              "Controllo della vista su appuntamento",
              "Lenti su misura e montaggio in sede",
              "Applicazione lenti a contatto",
              "Riparazioni e piccole manutenzioni",
            ].map((s) => (
              <div
                key={s}
                className="text-sm text-center py-2 rounded-lg"
                style={{ background: "#fff", color: p.primary, border: `1px solid ${p.accentSoft}` }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* binario LAC */}
        <div className="mt-7 rounded-xl p-4 text-center" style={{ background: p.accentSoft }}>
          <p className="f-serif text-lg" style={{ color: p.primary }}>
            Le tue lenti, ordinate dal divano.
          </p>
          <p className="text-xs mt-1 mb-3" style={{ color: p.textSoft }}>
            Ordini online, ritiri e paghi in negozio. Ti avvisiamo noi.
          </p>
          <Cta bg={p.primary} fg="#fff">
            Ordina le lenti online
          </Cta>
        </div>

        {/* orari */}
        <div className="mt-7 f-mono text-[11px] space-y-1 text-center" style={{ color: p.textSoft }}>
          <div className="flex items-center justify-center gap-1.5">
            <Clock size={11} /> Lun–Ven 9:00–12:30 · 15:30–19:30
          </div>
          <div>Sabato 9:00–12:30</div>
          <div className="flex items-center justify-center gap-1.5 pt-1">
            <MapPin size={11} /> Via dei Mille 12, {citta}
          </div>
        </div>

        <div className="text-center mt-6">
          <Cta bg="transparent" fg={p.accent}>
            <span style={{ borderBottom: `1px solid ${p.accent}` }}>Prenota un controllo →</span>
          </Cta>
        </div>
      </div>

      <p className="text-center f-mono text-[9px] pb-4" style={{ color: p.textSoft }}>
        {nome} · {citta} · dal {dal}
      </p>
    </div>
  );
}

/* ── 2. BOUTIQUE — brand-first, moderna ─────────────────────────── */

export function TemplateBoutique({ nome, citta, dal, p }: SitoConfig) {
  return (
    <div className="f-ui" style={{ background: p.surface }}>
      {/* hero pieno */}
      <div className="px-5 pt-10 pb-8" style={{ background: p.primary }}>
        <p className="f-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: p.accent }}>
          eyewear & vista — {citta}
        </p>
        <h1
          className="f-ui font-bold text-4xl mt-2 leading-[1.05] tracking-tight lowercase"
          style={{ color: "#fff" }}
        >
          {nome}
        </h1>
        <p className="text-sm mt-3 max-w-[26ch]" style={{ color: p.accentSoft }}>
          Montature che non vedi ovunque. Occhi seguiti come si deve, dal {dal}.
        </p>
      </div>

      {/* collezioni */}
      <div className="px-5 -mt-4">
        <div className="grid grid-cols-2 gap-2">
          {[
            ["collezione", p.accent],
            ["sole", p.accentSoft],
            ["atelier", p.accentSoft],
            ["novità", p.accent],
          ].map(([label, bg], i) => (
            <div
              key={label}
              className="aspect-square rounded-2xl flex items-end p-3"
              style={{ background: bg as string, opacity: i % 3 === 0 ? 1 : 0.9 }}
            >
              <span
                className="f-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ color: bg === p.accent ? "#fff" : p.primary }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-4 flex-wrap">
          {["Persol", "Etnia Barcelona", "Garrett Leight"].map((b) => (
            <span
              key={b}
              className="text-[11px] f-ui font-semibold px-3 py-1.5 rounded-full"
              style={{ background: "#fff", color: p.primary, border: `1px solid ${p.accentSoft}` }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* binario LAC — banner pieno */}
      <div className="mt-6 px-5 py-6" style={{ background: p.accent }}>
        <p className="f-ui font-bold text-2xl lowercase leading-tight" style={{ color: "#fff" }}>
          lenti a contatto online →
        </p>
        <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,.85)" }}>
          Ordini in un minuto, ritiri in boutique. Zero code, zero corrieri.
        </p>
      </div>

      {/* cta finale */}
      <div className="px-5 py-7 text-center">
        <Cta bg={p.primary} fg="#fff" block>
          Passa a trovarci — {citta}
        </Cta>
        <p className="f-mono text-[10px] mt-3" style={{ color: p.textSoft }}>
          gio–sab aperti fino alle 20 · {nome.toLowerCase()} · dal {dal}
        </p>
      </div>
    </div>
  );
}

/* ── 3. STUDIO — optometrico, prenotazione al centro ────────────── */

export function TemplateStudio({ nome, citta, dal, p }: SitoConfig) {
  return (
    <div className="f-ui" style={{ background: p.surface }}>
      {/* banda + card prenotazione sovrapposta */}
      <div className="px-5 pt-8 pb-12" style={{ background: p.primary }}>
        <h1 className="f-serif text-2xl" style={{ color: "#fff" }}>
          {nome}
        </h1>
        <p className="f-mono text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: p.accent }}>
          studio optometrico · {citta} · dal {dal}
        </p>
      </div>

      <div className="px-5 -mt-7">
        <div
          className="rounded-2xl p-4 shadow-sm"
          style={{ background: "#fff", border: `1px solid ${p.accentSoft}` }}
        >
          <p className="f-ui font-semibold text-sm" style={{ color: p.primary }}>
            Prenota il tuo controllo della vista
          </p>
          <p className="f-mono text-[10px] mt-0.5" style={{ color: p.textSoft }}>
            45 minuti · su appuntamento · referto spiegato
          </p>
          <div className="mt-3">
            <Cta bg={p.accent} fg="#fff" block>
              Scegli data e ora
            </Cta>
          </div>
        </div>
      </div>

      {/* servizi */}
      <div className="px-5 mt-6">
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              [Eye, "Esame visivo completo"],
              [ScanLine, "Topografia corneale"],
              [Droplets, "Applicazione LAC"],
              [Glasses, "Occhiali su misura"],
            ] as const
          ).map(([Icon, s]) => (
            <div
              key={s}
              className="rounded-xl p-3"
              style={{ background: "#fff", border: `1px solid ${p.accentSoft}` }}
            >
              <Icon size={16} style={{ color: p.accent }} />
              <p className="text-xs f-ui font-semibold mt-1.5 leading-snug" style={{ color: p.primary }}>
                {s}
              </p>
            </div>
          ))}
        </div>
        <p className="f-mono text-[10px] mt-3 text-center" style={{ color: p.textSoft }}>
          strumentazione aggiornata · ottico optometrista abilitato
        </p>
      </div>

      {/* binario LAC */}
      <div className="px-5 mt-6">
        <div className="rounded-2xl p-4" style={{ background: p.accentSoft }}>
          <p className="f-ui font-semibold text-sm" style={{ color: p.primary }}>
            Porti le lenti a contatto?
          </p>
          <p className="text-xs mt-1 mb-3" style={{ color: p.textSoft }}>
            Riordinale online: ritiri in studio e, se vuoi, controlliamo
            insieme l’applicazione. È incluso.
          </p>
          <Cta bg={p.primary} fg="#fff">
            Riordina le tue lenti
          </Cta>
        </div>
      </div>

      {/* orari + footer */}
      <div className="px-5 py-7 f-mono text-[11px] text-center space-y-1" style={{ color: p.textSoft }}>
        <div className="flex items-center justify-center gap-1.5">
          <Clock size={11} /> Lun–Sab 9:00–19:00, orario continuato
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <MapPin size={11} /> Corso Italia 8, {citta}
        </div>
        <p className="pt-2 text-[9px]">
          {nome} · studio optometrico · dal {dal}
        </p>
      </div>
    </div>
  );
}
