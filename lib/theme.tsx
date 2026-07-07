"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Tenant } from "./types";

/**
 * Due sistemi di colore, due proprietà:
 *
 * VISTA  — i token del NOSTRO prodotto (lato ottico: pannello, moduli).
 *          Costanti per tutti i negozi: è l'identità dello strumento.
 * tenant.brand — i colori del NEGOZIO (lato cliente: app Boutique).
 *          Cambiano per tenant: è il white-label che vendiamo.
 */
export const VISTA = {
  ink: "#0D2B2B",
  inkSoft: "#274744",
  paper: "#F2F5F4",
  card: "#FFFFFF",
  teal: "#127E7A",
  tealSoft: "#E2F0EE",
  amber: "#C98A2B",
  amberSoft: "#F7EEDD",
  line: "#DCE5E3",
} as const;

const TenantContext = createContext<Tenant | null>(null);

export function TenantProvider({
  tenant,
  children,
}: {
  tenant: Tenant;
  children: ReactNode;
}) {
  return (
    <TenantContext.Provider value={tenant}>{children}</TenantContext.Provider>
  );
}

export function useTenant(): Tenant {
  const t = useContext(TenantContext);
  if (!t) throw new Error("useTenant va usato dentro <TenantProvider>");
  return t;
}
