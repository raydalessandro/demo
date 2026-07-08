import SelettoreSito from "@/components/agente/SelettoreSito";

/**
 * /agente — il tablet dell'agente.
 * Strumento interno di trattativa: il selettore del sito in regalo.
 * noindex: non deve finire sui motori, si mostra dal vivo.
 */

export const metadata = {
  title: "Selettore sito · tablet agente — VISTA",
  description:
    "Strumento di trattativa: il sito in regalo col nome del negozio, in dieci secondi.",
  robots: { index: false, follow: false },
};

export default function AgentePage() {
  return <SelettoreSito />;
}
