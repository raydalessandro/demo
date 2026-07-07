"use client";

import { VISTA as T } from "@/lib/theme";

/**
 * Schema TABO dell'asse del cilindro — stessa convenzione del vecchio
 * gestionale: angolo schermo = (180 − asse), 0° a destra, antiorario.
 */
export default function TaboAxis({ asse }: { asse: number }) {
  const a = ((180 - asse) * Math.PI) / 180;
  const cx = 26;
  const cy = 26;
  const r = 20;
  const x1 = cx - r * Math.cos(a);
  const y1 = cy + r * Math.sin(a);
  const x2 = cx + r * Math.cos(a);
  const y2 = cy - r * Math.sin(a);

  return (
    <svg width={52} height={52} viewBox="0 0 52 52" aria-label={`Asse ${asse}°`}>
      <circle cx={cx} cy={cy} r={r} fill={T.paper} stroke={T.line} strokeWidth={1.5} />
      {/* tacche 0° / 90° / 180° */}
      {[0, 90, 180].map((deg) => {
        const t = ((180 - deg) * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={cx + (r - 3) * Math.cos(t)}
            y1={cy - (r - 3) * Math.sin(t)}
            x2={cx + r * Math.cos(t)}
            y2={cy - r * Math.sin(t)}
            stroke={T.inkSoft}
            strokeWidth={1.5}
          />
        );
      })}
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={T.teal} strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={2} fill={T.ink} />
      <text
        x={cx}
        y={50}
        textAnchor="middle"
        fontSize={9}
        fontFamily="var(--font-mono), monospace"
        fill={T.inkSoft}
      >
        {asse}°
      </text>
    </svg>
  );
}
