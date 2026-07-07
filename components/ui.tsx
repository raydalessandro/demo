"use client";

import type { ComponentType, ReactNode } from "react";
import { VISTA as T } from "@/lib/theme";

export function Kpi({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div
      className="flex-1 min-w-0 rounded-xl p-3"
      style={{ background: T.card, border: `1px solid ${T.line}` }}
    >
      <div className="text-xs" style={{ color: T.inkSoft }}>{label}</div>
      <div className="f-mono text-xl font-semibold" style={{ color: T.ink }}>{value}</div>
      {sub && <div className="text-xs mt-0.5" style={{ color: T.teal }}>{sub}</div>}
    </div>
  );
}

export function SectionTitle({
  icon: Icon,
  children,
  right,
}: {
  icon: ComponentType<{ size?: number; style?: React.CSSProperties }>;
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mt-5 mb-2">
      <div className="flex items-center gap-2">
        <Icon size={16} style={{ color: T.teal }} />
        <h3 className="f-ui font-semibold text-sm" style={{ color: T.ink }}>{children}</h3>
      </div>
      {right}
    </div>
  );
}
