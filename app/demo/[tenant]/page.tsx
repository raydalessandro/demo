import { notFound } from "next/navigation";
import SuiteShell from "@/components/SuiteShell";
import { getTenant, TENANTS } from "@/lib/tenants";

export function generateStaticParams() {
  return TENANTS.map((t) => ({ tenant: t.slug }));
}

export default async function DemoTenantPage({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant: slug } = await params;
  const tenant = getTenant(slug);
  if (!tenant) notFound();

  return <SuiteShell tenant={tenant} />;
}
