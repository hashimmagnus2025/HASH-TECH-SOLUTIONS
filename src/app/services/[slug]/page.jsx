import { notFound } from "next/navigation";
import ServiceDetail from "@/components/sections/services/ServiceDetail";
import { getServiceBySlug, services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { env } from "@/lib/env";
import { toJsonLdScript } from "@/lib/jsonLd";
import { company } from "@/data/company";
export function generateStaticParams() {
  return services.map(service => ({
    slug: service.slug
  }));
}
export async function generateMetadata({
  params
}) {
  const {
    slug
  } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.name,
    description: service.shortDescription,
    path: `/services/${service.slug}`
  });
}
export default async function ServicePage({
  params
}) {
  const {
    slug
  } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDescription,
    provider: {
      "@type": "Organization",
      name: company.name
    },
    url: `${env.siteUrl.replace(/\/$/, "")}/services/${service.slug}`
  };
  return <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: toJsonLdScript(jsonLd)
    }} />
      <ServiceDetail service={service} />
    </>;
}
