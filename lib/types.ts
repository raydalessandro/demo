/**
 * Tipi condivisi — VISTA Suite
 *
 * La shape di `Tenant` ricalca volutamente la futura tabella `aziende`
 * su Supabase (vedi pattern in Next_gestionale_v1/supabase-schema.sql):
 * branding, moduli_attivi[], stato abbonamento. Oggi i tenant sono
 * config statiche in lib/tenants.ts; domani arriveranno da DB con RLS,
 * senza toccare i componenti.
 */

export type ModuleId = "recall" | "banco" | "boutique" | "ordini";

/** Palette del negozio: veste l'app cliente (lato Boutique). */
export interface TenantBrand {
  /** Colore dominante (header, bottoni pieni) */
  primary: string;
  /** Accento (icone, highlight, barra scorta) */
  accent: string;
  /** Accento attenuato (sfondi pill, bordi) */
  accentSoft: string;
  /** Fondo dell'app cliente */
  surface: string;
  /** Testo secondario su fondo chiaro */
  textSoft: string;
  /** Testo terziario / disattivo */
  textFaint: string;
}

export interface Tenant {
  /** slug URL: /demo/[slug] — domani chiave tenant su DB */
  slug: string;
  nome: string;
  citta: string;
  /** anno di fondazione, per l'insegna ("dal 1987") */
  dal: string;
  brand: TenantBrand;
  /** Moduli attivi per questo negozio (il registry filtra su questi) */
  moduliAttivi: ModuleId[];
  /** dato demo per il pannello Boutique */
  clientiAttivi: number;
  stato: "pilota" | "attivo";
}
