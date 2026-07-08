import { notFound } from "next/navigation";
import SitoNegozio from "@/components/sito/SitoNegozio";
import { getTenant, TENANTS } from "@/lib/tenants";

/**
 * /sito/[tenant] — il sito pubblico del negozio.
 *
 * È la superficie che regaliamo alla firma: veste i colori del tenant,
 * porta il suo nome (mai il nostro) e vende. Prima pagina: LAC online.
 * In produzione vivrà sul dominio del negozio; la shape è la stessa.
 */

export function generateStaticParams() {
  return TENANTS.map((t) => ({ tenant: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant: slug } = await params;
  const t = getTenant(slug);
  return {
    title: t ? `Lenti a contatto online · ${t.nome}` : "Lenti a contatto online",
    description: t
      ? `Ordina le tue lenti dal sito di ${t.nome}: ritiri e paghi in negozio, ti avvisiamo noi quando sono pronte.`
      : undefined,
  };
}

export default async function SitoTenantPage({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant: slug } = await params;
  const tenant = getTenant(slug);
  if (!tenant) notFound();

  return <SitoNegozio tenant={tenant} />;
}
