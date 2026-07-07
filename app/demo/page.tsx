import Link from "next/link";
import { TENANTS } from "@/lib/tenants";
import { MODULE_META } from "@/lib/modules-meta";

export const metadata = {
  title: "Demo interattive · VISTA Suite",
  description:
    "Tocca la demo: due negozi, gli stessi strumenti, ognuno coi suoi colori. Il white-label di VISTA Suite dal vivo.",
};

export default function DemoHub() {
  return (
    <main className="min-h-screen f-ui" style={{ background: "#F2F5F4" }}>
      <div className="max-w-2xl mx-auto px-5 pt-14 pb-16">
        <Link href="/" className="f-mono text-[11px]" style={{ color: "#127E7A" }}>
          ← torna al sito
        </Link>
        <p
          className="f-mono text-[11px] tracking-[0.2em] uppercase mt-4"
          style={{ color: "#127E7A" }}
        >
          Demo interattive · toccale liberamente
        </p>
        <h1 className="f-serif text-4xl mt-2 leading-tight" style={{ color: "#0D2B2B" }}>
          VISTA <span style={{ color: "#127E7A" }}>Suite</span>
        </h1>
        <p className="text-sm mt-3 max-w-md leading-relaxed" style={{ color: "#274744" }}>
          Un solo software, un’app per ogni negozio — col suo nome e i suoi colori.
          Scegli un negozio demo: il pannello ottico è identico per tutti,
          l’app cliente cambia pelle.
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
          Due negozi, gli stessi componenti: cambia solo la configurazione.
          È il white-label che installiamo in ogni centro ottico — col suo nome, mai col nostro.
        </p>
      </div>
    </main>
  );
}
