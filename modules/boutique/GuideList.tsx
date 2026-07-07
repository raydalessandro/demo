"use client";

import { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import type { TenantBrand } from "@/lib/types";
import { GUIDE } from "@/lib/demo-data";

export default function GuideList({ b }: { b: TenantBrand }) {
  const [aperta, setAperta] = useState<number | null>(null);

  return (
    <div className="rounded-2xl p-4" style={{ background: "#fff", border: `1px solid ${b.accentSoft}` }}>
      <div className="flex items-center gap-2 mb-1">
        <BookOpen size={15} style={{ color: b.accent }} />
        <span className="f-ui font-semibold text-sm" style={{ color: b.primary }}>
          Consigli del tuo ottico
        </span>
      </div>
      {GUIDE.map((g, i) => {
        const open = aperta === i;
        return (
          <div key={g.titolo} className="border-t mt-2 pt-2" style={{ borderColor: b.accentSoft }}>
            <button
              onClick={() => setAperta(open ? null : i)}
              className="w-full flex items-center gap-2 text-left"
            >
              <span className="flex-1 text-sm f-ui" style={{ color: b.primary }}>{g.titolo}</span>
              <ChevronDown
                size={14}
                style={{
                  color: b.accent,
                  transform: open ? "rotate(180deg)" : "none",
                  transition: "transform .2s",
                }}
              />
            </button>
            {open && (
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: b.textSoft }}>
                {g.corpo}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
