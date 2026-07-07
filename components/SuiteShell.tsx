"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, User } from "lucide-react";
import type { Tenant } from "@/lib/types";
import { TenantProvider, VISTA as T } from "@/lib/theme";
import { MODULES } from "@/lib/registry";
import ClientApp from "@/modules/boutique/ClientApp";

export default function SuiteShell({ tenant }: { tenant: Tenant }) {
  const [vista, setVista] = useState<"ottico" | "cliente">("ottico");
  const moduli = tenant.moduliAttivi.map((id) => MODULES[id]);
  const [moduloId, setModuloId] = useState(moduli[0]?.id);

  const Attivo = moduli.find((m) => m.id === moduloId)?.Component;

  return (
    <TenantProvider tenant={tenant}>
      <div
        className="min-h-screen f-ui"
        style={{
          background: vista === "ottico" ? T.paper : tenant.brand.primary,
          transition: "background .3s",
        }}
      >
        {/* header con commutatore lente */}
        <div
          className="sticky top-0 z-10 px-4 pt-4 pb-3"
          style={{ background: vista === "ottico" ? T.ink : tenant.brand.primary }}
        >
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/demo"
                aria-label="Torna alle demo"
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,255,255,.12)" }}
              >
                <ArrowLeft size={15} color="#fff" />
              </Link>
              <div>
                <div className="f-serif text-lg leading-tight" style={{ color: "#fff" }}>
                  VISTA{" "}
                  <span style={{ color: vista === "ottico" ? "#7FC8C2" : tenant.brand.accent }}>
                    Suite
                  </span>
                </div>
                <div
                  className="text-[11px]"
                  style={{ color: vista === "ottico" ? "#9DB8B5" : tenant.brand.accentSoft }}
                >
                  {vista === "ottico"
                    ? `Pannello · ${tenant.nome}`
                    : "App del cliente finale"}
                </div>
              </div>
            </div>

            {/* commutatore: due lenti */}
            <div className="flex rounded-full p-1 gap-1" style={{ background: "rgba(255,255,255,.12)" }}>
              {(
                [
                  ["ottico", Eye, "Ottico"],
                  ["cliente", User, "Cliente"],
                ] as const
              ).map(([id, Icon, l]) => (
                <button
                  key={id}
                  onClick={() => setVista(id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs f-ui font-semibold"
                  style={
                    vista === id
                      ? { background: "#fff", color: T.ink }
                      : { color: "rgba(255,255,255,.75)" }
                  }
                >
                  <Icon size={13} /> {l}
                </button>
              ))}
            </div>
          </div>

          {/* tab moduli, solo lato ottico — filtrati sui moduli attivi del tenant */}
          {vista === "ottico" && (
            <div className="max-w-2xl mx-auto flex gap-1.5 mt-3">
              {moduli.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setModuloId(m.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs f-ui font-semibold"
                  style={
                    moduloId === m.id
                      ? { background: T.teal, color: "#fff" }
                      : { background: "rgba(255,255,255,.08)", color: "#B7CCC9" }
                  }
                >
                  <m.icon size={14} /> {m.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="max-w-2xl mx-auto px-4 pb-10 pt-4">
          {vista === "cliente" ? (
            <ClientApp />
          ) : Attivo ? (
            <Attivo vaiACliente={() => setVista("cliente")} />
          ) : null}
        </div>
      </div>
    </TenantProvider>
  );
}
