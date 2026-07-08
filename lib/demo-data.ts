/**
 * Dati demo — estratti dal prototipo di AD e centralizzati qui.
 *
 * Ogni funzione/costante è un futuro "data provider": quando entra
 * Supabase, questo file diventa il punto unico da sostituire con le
 * query (i componenti non cambiano). Il placeholder {{negozio}} nei
 * messaggi viene risolto col nome del tenant.
 */

export const KPI_RECALL = [
  { label: "Richiami oggi", value: "5" },
  { label: "Tasso di ritorno", value: "42%", sub: "▲ +9% vs 90gg fa" },
  { label: "€ da richiami", value: "3.240", sub: "ultimi 30 giorni" },
];

export const RICHIAMI = [
  {
    id: 1,
    nome: "Laura Bianchi",
    tipo: "LAC in esaurimento",
    dettaglio: "Mensili ×6 acquistate a gennaio — esaurimento stimato tra 12 giorni",
    msg: "Ciao Laura! 👋 Le tue lenti mensili stanno per finire. Vuoi che ti prepari la prossima fornitura? Se passi entro sabato c'è il -10% riordino. — {{negozio}}",
    colore: "#127E7A",
  },
  {
    id: 2,
    nome: "Giuseppe Ferrari",
    tipo: "Controllo annuale",
    dettaglio: "Ultima visita: 28/06/2025 · progressive 1.67",
    msg: "Buongiorno Giuseppe, è passato un anno dal suo ultimo controllo visivo. Le riservo volentieri un appuntamento questa settimana: martedì 17:30 o giovedì 10:00?",
    colore: "#C98A2B",
  },
  {
    id: 3,
    nome: "Martina Colombo",
    tipo: "Follow-up progressive",
    dettaglio: "Occhiale consegnato 15 giorni fa",
    msg: "Ciao Martina! Come ti stai trovando con le nuove progressive? Se serve una regolazione passa pure, è inclusa. 😊",
    colore: "#5B6DA8",
  },
  {
    id: 4,
    nome: "Ahmed Hassan",
    tipo: "LAC in esaurimento",
    dettaglio: "Giornaliere 90pz — esaurimento tra 9 giorni",
    msg: "Ciao Ahmed! Le tue giornaliere stanno finendo. Te ne metto da parte una scorta? Rispondi con un 👍 e sono pronte domani.",
    colore: "#127E7A",
  },
  {
    id: 5,
    nome: "Elena Ricci",
    tipo: "Compleanno",
    dettaglio: "Domani · cliente dal 2019 · alto valore",
    msg: "Tanti auguri Elena! 🎉 Per il tuo compleanno hai un buono del 20% valido tutto il mese, anche sul sole. Ti aspettiamo!",
    colore: "#B0568A",
  },
];

export const ESITI_SETTIMANA: Array<[string, string]> = [
  ["23", "inviati"],
  ["14", "risposte"],
  ["9", "appuntamenti"],
  ["6", "vendite"],
];

export const MONTATURE = [
  { id: 1, nome: "Persol 3007-V", prezzo: 189 },
  { id: 2, nome: "Etnia Barcelona Bold", prezzo: 165 },
  { id: 3, nome: "Linea propria — Aurora 12", prezzo: 119 },
  { id: 4, nome: "Silhouette glasant", prezzo: 320 },
];

export const GEOMETRIE = [
  { id: "mono", label: "Monofocale", base: [60, 110, 180] },
  { id: "office", label: "Office", base: [140, 190, 260] },
  { id: "prog", label: "Progressiva", base: [220, 320, 460] },
];

export const FERMI = [
  { sku: "8053672", nome: "Ray-Ban RX5154 nero", giorni: 214, costo: 78 },
  { sku: "8901134", nome: "Guess GU2854 rosa", giorni: 246, costo: 54 },
  { sku: "8034561", nome: "Police VPL894", giorni: 198, costo: 61 },
];

export const PRENOTAZIONI = [
  { nome: "Sara Moretti", tipo: "Controllo vista", quando: "Gio 9 lug · 17:30", nuova: true },
  { nome: "Luca Greco", tipo: "Prima applicazione LAC", quando: "Ven 10 lug · 11:00" },
];

export const FUNZIONI_APP = [
  "Prenota visita",
  "Le mie lenti + riordino LAC",
  "La mia prescrizione",
  "Promo secondo paio",
  "Guide e consigli",
  "Ruota dei premi",
  "Porta un amico",
  "Raccolta recensioni",
];

/** Guide con approfondimento (contenuti ripresi da Gianfranco_vision_group). */
export const GUIDE = [
  {
    titolo: "Come pulire l'occhiale senza rovinare l'antiriflesso",
    corpo:
      "Acqua tiepida, una goccia di sapone neutro e panno in microfibra: tutto qui. Mai alito + maglietta e mai carta assorbente, che riga il trattamento. Passa in negozio quando vuoi: la pulizia a ultrasuoni è gratuita.",
  },
  {
    titolo: "Progressive: i primi 15 giorni",
    corpo:
      "All'inizio muovi la testa, non solo gli occhi: la zona nitida ti segue. Prudenza sulle scale i primi giorni. Se dopo due settimane qualcosa non torna, la regolazione è inclusa: vieni a trovarci.",
  },
  {
    titolo: "LAC in estate: igiene senza pensieri",
    corpo:
      "Mai acqua di rubinetto, mare o piscina sulle lenti. In vacanza le giornaliere sono la scelta più sicura, e porta sempre un occhiale di scorta. Dubbi? Scrivici, rispondiamo noi.",
  },
  {
    titolo: "La montatura giusta per il tuo viso",
    corpo:
      "Conta la forma del viso, ma anche come vivi: sport, ufficio, guida. Prova il nostro consiglio rapido qui sotto e poi vieni a provarle dal vivo: te le prepariamo sul banco.",
  },
];

/** Ruota dei premi — premi e pesi ripresi da App_ottica. */
export const PREMI_RUOTA = [
  { id: "sole20", label: "SOLE 20%", nome: "20% occhiale da sole", codice: "SOLE20", peso: 60, condizione: "Su tutta la collezione" },
  { id: "lac25", label: "LAC 25%", nome: "25% su due confezioni LAC", codice: "LAC25", peso: 20, condizione: "Valido su tutte le marche" },
  { id: "extra50", label: "€50 EXTRA", nome: "€50 extra sconto vista", codice: "EXTRA50", peso: 15, condizione: "Su qualsiasi montatura" },
  { id: "vista50", label: "VISTA 50%", nome: "50% occhiale da vista", codice: "VISTA50", peso: 5, condizione: "Minima spesa pre-sconto €50" },
  { id: "riprova", label: "RIPROVA", nome: "Ritenta domani!", codice: null, peso: 25, condizione: null },
];

/** Ritorno dei funnel — dati demo per il pannello ottico. */
export const FUNNEL_STATS = [
  { nome: "Ruota dei premi", riga1: "86 giri", riga2: "31 premi ritirati in negozio" },
  { nome: "Porta un amico", riga1: "19 inviti", riga2: "7 nuovi clienti" },
  { nome: "Recensioni", riga1: "+12 questo mese", riga2: "media 4,8 ★" },
];

export const FATTURE = [
  { n: "2026/041", desc: "Occhiale progressivo", imp: "€ 389,00", data: "12 giu 2026" },
  { n: "2026/012", desc: "LAC mensili ×6", imp: "€ 54,00", data: "28 gen 2026" },
];

/** Risolve i placeholder tenant nei testi demo. */
export function conNegozio(testo: string, nomeNegozio: string): string {
  return testo.replaceAll("{{negozio}}", nomeNegozio);
}


/* ── Dominio busta lavoro — ripreso da Gestionale_ottica ─────────── */

export const TEMPLATE_RX = [
  { nome: "Emmetrope", sfero: 0, cilindro: 0, asse: 0 },
  { nome: "Miopia lieve", sfero: -2.0, cilindro: 0, asse: 0 },
  { nome: "Miopia moderata", sfero: -4.0, cilindro: -0.5, asse: 180 },
  { nome: "Ipermetropia", sfero: 2.0, cilindro: 0, asse: 0 },
  { nome: "Astigmatismo", sfero: -1.0, cilindro: -1.5, asse: 90 },
];

export const TIPI_LENTE = [
  { id: "monofocale", label: "Monofocale" },
  { id: "progressiva", label: "Progressiva" },
  { id: "bifocale", label: "Bifocale" },
  { id: "office", label: "Office" },
] as const;

export const MATERIALI = ["CR39 (resina)", "Policarbonato", "Trivex", "Minerale"];

export const INDICI = ["1.50", "1.56", "1.60", "1.67", "1.74"];

/** Trattamenti extra oltre il pacchetto scelto al preventivatore. */
export const TRATTAMENTI_EXTRA = [
  { id: "indurente", label: "Indurente", prezzo: 20 },
  { id: "idrorepellente", label: "Idrorepellente", prezzo: 25 },
  { id: "antistatico", label: "Antistatico", prezzo: 15 },
  { id: "anti_uv", label: "Anti-UV", prezzo: 10 },
];

export const GARANZIE = [
  { id: "soddisfatti", label: "Soddisfatti o rimborsati (30gg)", prezzo: 30 },
  { id: "rottura", label: "Rottura accidentale (1 anno)", prezzo: 25 },
  { id: "smarrimento", label: "Furto e smarrimento", prezzo: 40 },
];


/* ── Dominio vendita guidata (funnel al banco) ───────────────────── */

/** Stili di vita: guidano i "consigliato per te" del percorso. */
export const STILI_VITA = [
  { id: "guida", label: "Guido spesso, anche di sera", emoji: "🚗" },
  { id: "schermi", label: "Più di 4 ore al giorno a schermo", emoji: "💻" },
  { id: "aperto", label: "Molto tempo all'aperto", emoji: "☀️" },
  { id: "sport", label: "Faccio sport", emoji: "🏃" },
];

/** Prezzo base lente nuda per geometria (senza indice né trattamenti). */
export const LENTE_BASE: Record<string, number> = {
  monofocale: 60,
  office: 140,
};

/** Qualità della progressiva: il prezzo base della lente progressiva. */
export const PROG_QUALITA = [
  { id: 0, nome: "Base", prezzo: 220 },
  { id: 1, nome: "Comfort", prezzo: 320 },
  { id: 2, nome: "Top", prezzo: 460 },
];

/** Indici: supplemento e fattore di spessore per la visualizzazione. */
export const INDICI_INFO = [
  { indice: "1.50", supplemento: 0, fattore: 1.0, nota: "standard" },
  { indice: "1.56", supplemento: 30, fattore: 0.87, nota: "sottile" },
  { indice: "1.60", supplemento: 60, fattore: 0.78, nota: "extra sottile" },
  { indice: "1.67", supplemento: 110, fattore: 0.68, nota: "ultra sottile" },
  { indice: "1.74", supplemento: 180, fattore: 0.58, nota: "super sottile" },
];

/** Antiriflesso: le tre opzioni raccontabili al cliente. */
export const AR_OPZIONI = [
  { id: "nessuno", label: "Nessuno", prezzo: 0, nota: "riflessi visibili su schermi e fari" },
  { id: "classico", label: "Classico", prezzo: 40, nota: "elimina i riflessi principali" },
  { id: "premium", label: "Premium", prezzo: 70, nota: "più resistente e facile da pulire" },
];

export const PREZZO_BLU = 30;
export const PREZZO_FOTO = 80;

/* ── Modulo Ordini (gestionale, prima cellula) ───────────────────── */

/** Catalogo LAC vendibile online — prezzi demo, per negozio in produzione. */
export const LAC_SHOP = [
  { id: "oasys6", nome: "Acuvue Oasys mensili ×6", tipo: "Mensili · silicone hydrogel", prezzo: 24.9 },
  { id: "total190", nome: "Dailies Total1 90pz", tipo: "Giornaliere premium", prezzo: 79.9 },
  { id: "biofinity6", nome: "Biofinity mensili ×6", tipo: "Mensili comfort", prezzo: 27.9 },
  { id: "airoptix6", nome: "Air Optix plus HydraGlyde ×6", tipo: "Mensili idratanti", prezzo: 29.9 },
] as const;

export const LAC_CATALOGO = LAC_SHOP.map((p) => p.nome);

/** Pipeline ordine LAC — stati ripresi da OrdiniLACModule (in_attesa_ordine → …). */
export const STATI_LAC = [
  { id: "da_ordinare", label: "Da ordinare", bg: "#F7EEDD", fg: "#C98A2B" },
  { id: "ordinato", label: "Ordinato", bg: "#E7EAF6", fg: "#5B6DA8" },
  { id: "arrivato", label: "Arrivato · avvisa", bg: "#E2F0EE", fg: "#127E7A" },
  { id: "consegnato", label: "Consegnato", bg: "#F2F5F4", fg: "#274744" },
] as const;

export const ORDINI_LAC_DEMO = [
  { id: 1, cliente: "Laura Bianchi", prodotto: "Acuvue Oasys mensili ×6", poteri: "OD −5.25 · OS −4.75", fonte: "app", stato: "da_ordinare", quando: "2 min fa · riordino dall’app" },
  { id: 2, cliente: "Ahmed Hassan", prodotto: "Dailies Total1 90pz", poteri: "OD −3.00 · OS −3.25", fonte: "app", stato: "ordinato", quando: "ieri" },
  { id: 3, cliente: "Giulia Verdi", prodotto: "Biofinity toriche ×6", poteri: "OD −2.25 cil −0.75×180", fonte: "banco", stato: "arrivato", quando: "2 gg fa" },
  { id: 4, cliente: "Marco Esposito", prodotto: "Air Optix plus HydraGlyde ×6", poteri: "OD −1.50 · OS −1.75", fonte: "banco", stato: "ordinato", quando: "3 gg fa" },
  { id: 5, cliente: "Franca Villa", prodotto: "Dailies AquaComfort 30pz", poteri: "OD +2.00 · OS +2.25", fonte: "banco", stato: "consegnato", quando: "1 sett fa" },
];

export const STATI_BUSTA = [
  { id: "lavorazione", label: "In lavorazione", bg: "#E7EAF6", fg: "#5B6DA8" },
  { id: "pronta", label: "Pronta · avvisa", bg: "#E2F0EE", fg: "#127E7A" },
  { id: "consegnata", label: "Consegnata", bg: "#F2F5F4", fg: "#274744" },
] as const;

export const BUSTE_DEMO = [
  { id: "BL-2026-0141", cliente: "Giuseppe Ferrari", descrizione: "Progressiva Comfort · 1.60 · AR premium", stato: "lavorazione" },
  { id: "BL-2026-0139", cliente: "Martina Colombo", descrizione: "Monofocale · 1.50 · AR classico", stato: "pronta" },
  { id: "BL-2026-0134", cliente: "Elena Ricci", descrizione: "Sole graduato · 1.60", stato: "consegnata" },
];
