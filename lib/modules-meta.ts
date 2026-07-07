import type { ModuleId } from "./types";

/**
 * Metadati dei moduli, separati dal wiring dei componenti (lib/registry.tsx)
 * così restano importabili anche dai server component (hub, futuri report).
 */
export const MODULE_META: Record<ModuleId, { label: string; descrizione: string }> = {
  recall: {
    label: "Recall",
    descrizione: "La segretaria che non dimentica mai: coda richiami e messaggi pronti.",
  },
  banco: {
    label: "Banco",
    descrizione: "Preventivo buono–migliore–premium, demo lenti, magazzino fermo.",
  },
  boutique: {
    label: "Boutique",
    descrizione: "L'app del negozio, col suo nome: riordini, prenotazioni, promo.",
  },
  ordini: {
    label: "Ordini",
    descrizione: "La pipeline del laboratorio: ordini LAC e buste occhiali, con gli stati.",
  },
};
