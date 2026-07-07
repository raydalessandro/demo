import Link from "next/link";
import { TENANTS } from "@/lib/tenants";
import { MODULE_META } from "@/lib/modules-meta";

/**
 * Hub interno: la pagina che si apre davanti ad AD e all'agente.
 * Ogni card è un negozio-tenant e mostra la SUA palette come coppia di
 * "lenti": il punto di vendita del white-label reso visibile prima
 * ancora di aprire la demo.
 */
export default function Home() {
  return (
    <main className="min-h-screen f-ui" style={{ background: "#F2F5F4" }}>
      <div className="max-w-2xl mx-auto px-5 pt-14 pb-16">
        <p
          className="f-mono text-[11px] tracking-[0.2em] uppercase"
          style={{ color: "#127E7A" }}
        >
          Demo interne · v0.1 · riservato
        </p>
        <h1 className="f-serif text-4xl mt-2 leading-tight" style={{ color: "#0D2B2B" }}>
          VISTA <span style={{ color: "#127E7A" }}>Suite</span>
        </h1>
        <p className="text-sm mt-3 max-w-md leading-relaxed" style={{ color: "#274744" }}>
          Un solo software, un&apos;app per ogni negozio — col suo nome e i suoi
          colori. Scegli un negozio demo: il pannello ottico è identico per
          tutti, l&apos;app cliente cambia pelle.
        </p>

        <div className="mt-8 space-y-3">
          {TENANTS.map((t) => (
            <Link
              key={t.slug}
              href={`/demo/${t.slug}`}
              className="block rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
              style={{ background: "#fff", border: "1px solid #DCE5E3" }}
            >
              <div className="flex items-center gap-4">
                {/* le due "lenti" del negozio: primary + accent */}
                <div className="flex items-center shrink-0" aria-hidden>
                  <span
                    className="w-9 h-9 rounded-full border-2 border-white shadow"
                    style={{ background: t.brand.primary }}
                  />
                  <span
                    className="w-9 h-9 rounded-full border-2 border-white shadow -ml-2.5"
                    style={{ background: t.brand.accent }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="f-serif text-lg" style={{ color: "#0D2B2B" }}>
                      {t.nome}
                    </span>
                    <span className="f-mono text-[10px]" style={{ color: "#274744" }}>
                      {t.citta} · dal {t.dal}
                    </span>
                  </div>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {t.moduliAttivi.map((id) => (
                      <span
                        key={id}
                        className="text-[10px] f-ui font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: "#E2F0EE", color: "#127E7A" }}
                      >
                        {MODULE_META[id].label}
                      </span>
                    ))}
                    <span
                      className="text-[10px] f-mono px-2 py-0.5 rounded-full"
                      style={{
                        background: t.stato === "pilota" ? "#F7EEDD" : "#E2F0EE",
                        color: t.stato === "pilota" ? "#C98A2B" : "#127E7A",
                      }}
                    >
                      {t.stato}
                    </span>
                  </div>
                </div>
                <span className="f-mono text-xs shrink-0" style={{ color: "#127E7A" }}>
                  apri →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="f-mono text-[11px] mt-10 leading-relaxed" style={{ color: "#274744" }}>
          Nota per il team: i due negozi condividono gli stessi componenti.
          Cambiano solo i dati del tenant (lib/tenants.ts) — è la stessa
          meccanica del futuro multitenant su Supabase.
        </p>
      </div>
    </main>
  );
}
