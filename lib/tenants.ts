import type { Tenant } from "./types";

/**
 * Tenant demo. Due negozi con palette e moduli diversi:
 * — Aurora: suite completa, la demo "da manuale" del kit venditore.
 * — Bollani: solo Recall + Boutique, per mostrare in trattativa che i
 *   moduli si attivano uno alla volta e che l'app è col brand del negozio.
 *
 * Domani: SELECT * FROM aziende WHERE slug = $1 (con RLS). Stessa shape.
 */
export const TENANTS: Tenant[] = [
  {
    slug: "aurora",
    nome: "Ottica Aurora",
    citta: "Milano",
    dal: "1987",
    brand: {
      primary: "#1C1714", // espresso
      accent: "#A67C42", // ottone
      accentSoft: "#EFE4D3",
      surface: "#F6F1EA", // avorio
      textSoft: "#6B5D50",
      textFaint: "#B9AA97",
    },
    moduliAttivi: ["recall", "banco", "boutique"],
    clientiAttivi: 214,
    stato: "pilota",
  },
  {
    slug: "bollani",
    nome: "Ottica Bollani",
    citta: "Milano",
    dal: "1972",
    brand: {
      primary: "#12263A", // blu bottega
      accent: "#2F7D5F", // verde salvia scuro
      accentSoft: "#DEEDE5",
      surface: "#F2F5F4",
      textSoft: "#4E6572",
      textFaint: "#93A7B0",
    },
    moduliAttivi: ["recall", "boutique"],
    clientiAttivi: 168,
    stato: "attivo",
  },
];

export function getTenant(slug: string): Tenant | undefined {
  return TENANTS.find((t) => t.slug === slug);
}
