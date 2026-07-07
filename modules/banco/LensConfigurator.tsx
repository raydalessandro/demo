"use client";

import { useState } from "react";
import { Home, Sun } from "lucide-react"; // fix: nel prototipo Sun non era importata
import { VISTA as T } from "@/lib/theme";

/** Demo visive da girare verso il cliente: AR, fotocromatico, progressive. */
export default function LensConfigurator() {
  const [demo, setDemo] = useState<"ar" | "foto" | "prog">("ar");
  const [sole, setSole] = useState(true);
  const [prog, setProg] = useState(2);

  const Faro = ({ x, y, alone }: { x: number | string; y: number | string; alone: boolean }) => (
    <div
      className="absolute rounded-full"
      style={{
        left: x,
        top: y,
        width: alone ? 44 : 13,
        height: alone ? 44 : 13,
        background: alone
          ? "radial-gradient(circle, rgba(255,255,240,.95) 10%, rgba(255,255,215,.45) 40%, rgba(255,255,200,0) 70%)"
          : "radial-gradient(circle, #FFFDF0 30%, rgba(255,255,220,.3) 65%, transparent 72%)",
        filter: alone ? "blur(2px)" : "none",
      }}
    />
  );

  const SceneNotturna = ({ riflessi }: { riflessi: boolean }) => (
    <div
      className="relative h-24 rounded-lg overflow-hidden"
      style={{ background: "linear-gradient(#0A1430 60%, #1A2035 60%)" }}
    >
      <Faro x={26} y={30} alone={riflessi} />
      <Faro x={48} y={30} alone={riflessi} />
      <Faro x="66%" y={22} alone={riflessi} />
      <Faro x="80%" y={22} alone={riflessi} />
      {riflessi && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, transparent 32%, rgba(255,255,255,.16) 46%, transparent 60%)",
          }}
        />
      )}
    </div>
  );

  const zonaSfocata = [38, 26, 12][prog];

  return (
    <div className="rounded-xl p-3" style={{ background: T.card, border: `1px solid ${T.line}` }}>
      <div className="flex gap-1.5 mb-3">
        {(
          [
            ["ar", "Antiriflesso"],
            ["foto", "Fotocromatico"],
            ["prog", "Progressive"],
          ] as const
        ).map(([id, l]) => (
          <button
            key={id}
            onClick={() => setDemo(id)}
            className="flex-1 text-xs py-2 rounded-lg f-ui font-semibold"
            style={
              demo === id
                ? { background: T.teal, color: "#fff" }
                : { background: T.paper, color: T.ink, border: `1px solid ${T.line}` }
            }
          >
            {l}
          </button>
        ))}
      </div>

      {demo === "ar" && (
        <div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <SceneNotturna riflessi={true} />
              <div className="text-xs text-center mt-1 f-ui font-semibold" style={{ color: T.amber }}>
                Senza antiriflesso
              </div>
            </div>
            <div>
              <SceneNotturna riflessi={false} />
              <div className="text-xs text-center mt-1 f-ui font-semibold" style={{ color: T.teal }}>
                Con antiriflesso
              </div>
            </div>
          </div>
          <div className="text-xs mt-2" style={{ color: T.inkSoft }}>
            Guida notturna: aloni e riflessi dei fari a confronto. Da girare verso il cliente.
          </div>
        </div>
      )}

      {demo === "foto" && (
        <div>
          <div
            className="relative h-24 rounded-lg overflow-hidden"
            style={{ background: "linear-gradient(#7EC8E3 55%, #C8E6C9 55%)" }}
          >
            <div
              className="absolute rounded-full"
              style={{
                left: "12%",
                top: 10,
                width: 30,
                height: 30,
                background: "radial-gradient(circle, #FFF9C4 40%, rgba(255,249,196,0) 75%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "#3E2E1E", opacity: sole ? 0.55 : 0, transition: "opacity .9s" }}
            />
            <div
              className="absolute bottom-1.5 right-2 text-[10px] f-mono px-1.5 py-0.5 rounded"
              style={{ background: "rgba(0,0,0,.45)", color: "#fff" }}
            >
              {sole ? "lente scurita" : "lente chiara"}
            </div>
          </div>
          <div className="flex gap-1.5 mt-2">
            <button
              onClick={() => setSole(true)}
              className="flex-1 text-xs py-2 rounded-lg f-ui font-semibold flex items-center justify-center gap-1.5"
              style={
                sole
                  ? { background: T.amber, color: "#fff" }
                  : { background: T.paper, color: T.ink, border: `1px solid ${T.line}` }
              }
            >
              <Sun size={13} /> All&apos;aperto
            </button>
            <button
              onClick={() => setSole(false)}
              className="flex-1 text-xs py-2 rounded-lg f-ui font-semibold flex items-center justify-center gap-1.5"
              style={
                !sole
                  ? { background: T.teal, color: "#fff" }
                  : { background: T.paper, color: T.ink, border: `1px solid ${T.line}` }
              }
            >
              <Home size={13} /> Al chiuso
            </button>
          </div>
          <div className="text-xs mt-2" style={{ color: T.inkSoft }}>
            &quot;Non cambia più occhiale quando esce&quot;: la lente si adatta da sola alla luce.
          </div>
        </div>
      )}

      {demo === "prog" && (
        <div>
          <div className="flex gap-1.5 mb-2">
            {["Base", "Comfort", "Top"].map((l, i) => (
              <button
                key={l}
                onClick={() => setProg(i)}
                className="flex-1 text-xs py-1.5 rounded-lg f-ui font-semibold"
                style={
                  prog === i
                    ? { background: T.ink, color: "#fff" }
                    : { background: T.paper, color: T.ink, border: `1px solid ${T.line}` }
                }
              >
                {l}
              </button>
            ))}
          </div>
          <div
            className="relative h-24 mx-auto overflow-hidden"
            style={{
              width: "82%",
              borderRadius: "48%",
              background: "linear-gradient(#DCEFF5, #EAF4EC)",
              border: `2px solid ${T.ink}`,
            }}
          >
            <div
              className="absolute inset-y-0 left-0"
              style={{
                width: `${zonaSfocata}%`,
                background: "rgba(120,140,150,.55)",
                filter: "blur(6px)",
                transition: "width .5s",
              }}
            />
            <div
              className="absolute inset-y-0 right-0"
              style={{
                width: `${zonaSfocata}%`,
                background: "rgba(120,140,150,.55)",
                filter: "blur(6px)",
                transition: "width .5s",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-[10px] f-ui font-semibold px-1.5 py-0.5 rounded"
                style={{ background: "rgba(255,255,255,.75)", color: T.ink }}
              >
                zona di visione nitida
              </span>
            </div>
          </div>
          <div className="text-xs mt-2" style={{ color: T.inkSoft }}>
            {prog === 0
              ? "Geometria base: campo nitido più stretto, ci si abitua muovendo di più la testa."
              : prog === 1
                ? "Geometria comfort: buon compromesso tra campo visivo e prezzo."
                : "Geometria top: campo nitido ampio, adattamento più rapido e naturale."}
          </div>
        </div>
      )}
    </div>
  );
}
