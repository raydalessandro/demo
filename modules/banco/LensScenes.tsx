"use client";

import { VISTA as T } from "@/lib/theme";

/**
 * Scene dimostrative da girare verso il cliente. Estratte dal vecchio
 * LensConfigurator: ora vivono qui e ogni step del percorso guidato
 * monta la sua, al momento della sua decisione.
 */

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

/** Guida notturna: fari con o senza aloni/riflessi. */
export function SceneNotturna({ riflessi }: { riflessi: boolean }) {
  return (
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
}

/** Fotocromatico: la stessa scena si scurisce all'aperto. */
export function SceneSole({ scurita }: { scurita: boolean }) {
  return (
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
        style={{ background: "#3E2E1E", opacity: scurita ? 0.55 : 0, transition: "opacity .9s" }}
      />
      <div
        className="absolute bottom-1.5 right-2 text-[10px] f-mono px-1.5 py-0.5 rounded"
        style={{ background: "rgba(0,0,0,.45)", color: "#fff" }}
      >
        {scurita ? "lente scurita" : "lente chiara"}
      </div>
    </div>
  );
}

/** Filtro luce blu: schermo notturno con o senza il filtro. */
export function SceneSchermo({ filtro }: { filtro: boolean }) {
  return (
    <div
      className="relative h-24 rounded-lg overflow-hidden flex items-center justify-center"
      style={{ background: "#101522" }}
    >
      {/* monitor */}
      <div
        className="relative rounded-md"
        style={{
          width: 110,
          height: 62,
          background: filtro
            ? "linear-gradient(160deg, #F5E9CF 0%, #E8D9BC 100%)"
            : "linear-gradient(160deg, #CfE4FF 0%, #7FB4FF 100%)",
          boxShadow: filtro
            ? "0 0 18px 4px rgba(240, 220, 170, .35)"
            : "0 0 26px 8px rgba(90, 150, 255, .55)",
          transition: "all .7s",
        }}
      >
        <div className="absolute inset-x-3 top-3 h-1.5 rounded-full" style={{ background: "rgba(0,0,0,.18)" }} />
        <div className="absolute inset-x-3 top-6 h-1.5 rounded-full" style={{ background: "rgba(0,0,0,.12)", width: "60%" }} />
        <div className="absolute inset-x-3 top-9 h-1.5 rounded-full" style={{ background: "rgba(0,0,0,.12)", width: "75%" }} />
      </div>
      <div
        className="absolute bottom-1.5 right-2 text-[10px] f-mono px-1.5 py-0.5 rounded"
        style={{ background: "rgba(0,0,0,.45)", color: "#fff" }}
      >
        {filtro ? "con filtro" : "senza filtro"}
      </div>
    </div>
  );
}

/** Progressive: ampiezza della zona nitida secondo la qualità. */
export function LenteProgressiva({ livello }: { livello: number }) {
  const zonaSfocata = [38, 26, 12][livello];
  return (
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
  );
}

/** Spessore del bordo lente al variare dell'indice (per miopie). */
export function BarraSpessore({
  spessoreMm,
  attivo,
}: {
  spessoreMm: number;
  attivo: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="rounded-sm"
        style={{
          height: 56,
          width: Math.max(4, spessoreMm * 5),
          background: attivo
            ? `linear-gradient(180deg, ${T.teal}, #0d5f5c)`
            : "linear-gradient(180deg, #C6D4D2, #A9BCB9)",
          transition: "width .35s",
          boxShadow: attivo ? `0 0 0 2px ${T.tealSoft}` : "none",
        }}
      />
      <span className="f-mono text-[10px]" style={{ color: attivo ? T.teal : T.inkSoft }}>
        {spessoreMm.toFixed(1)}
      </span>
    </div>
  );
}
