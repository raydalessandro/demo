"use client";

import type { ComponentType } from "react";
import { Bell, Glasses, Store, type LucideIcon } from "lucide-react";
import type { ModuleId } from "./types";
import { MODULE_META } from "./modules-meta";
import RecallModule from "@/modules/recall/RecallModule";
import BancoModule from "@/modules/banco/BancoModule";
import BoutiqueConfigModule from "@/modules/boutique/BoutiqueConfigModule";

/**
 * Registry dei moduli — pattern preso da Gestionale_ear (MODULES_REGISTRY):
 * ogni modulo si dichiara qui e la shell lo monta solo se presente in
 * tenant.moduliAttivi. Aggiungere un modulo = una entry + una cartella
 * in /modules. Domani `enabled` arriverà dal DB per singolo negozio.
 */
export interface ModuleDef {
  id: ModuleId;
  label: string;
  icon: LucideIcon;
  descrizione: string;
  Component: ComponentType<{ vaiACliente: () => void }>;
}

export const MODULES: Record<ModuleId, ModuleDef> = {
  recall: {
    id: "recall",
    ...MODULE_META.recall,
    icon: Bell,
    Component: RecallModule,
  },
  banco: {
    id: "banco",
    ...MODULE_META.banco,
    icon: Glasses,
    Component: BancoModule,
  },
  boutique: {
    id: "boutique",
    ...MODULE_META.boutique,
    icon: Store,
    Component: BoutiqueConfigModule,
  },
};
