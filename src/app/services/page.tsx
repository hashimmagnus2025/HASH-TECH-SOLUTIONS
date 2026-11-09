import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/animations/Reveal";
import TextReveal from "@/components/animations/TextReveal";
import ServicesCategoryBand from "@/components/sections/services/ServicesCategoryBand";
import EnquiryCta from "@/components/business/EnquiryCta";
import { serviceCategories } from "@/data/service-categories";
import { getServicesByCategory, services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "All 42 HashTech Solutions services across computer sales, IT hardware & networking, CCTV & security, AMC & maintenance, and software & IT solutions.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line pb-16 pt-10">
        <Container className="flex flex-col gap-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <div className="flex flex-col gap-5">
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                {services.length} services · {serviceCategories.length} categories
              </span>
            </Reveal>
            <TextReveal
              as="h1"
              text="Every service, organized the way it's actually delivered"
              className="max-w-3xl font-display text-4xl font-medium leading-tight text-fg sm:text-5xl"
            />
            <Reveal delay={0.15}>
              <p className="max-w-2xl text-lg leading-relaxed text-fg-muted">
                Computer sales, IT hardware &amp; networking, CCTV &amp; security, AMC &amp;
                maintenance, and software &amp; IT solutions — one accountable team across
                all five.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="flex flex-wrap gap-2">
            {serviceCategories.map((category) => (
              <Link
                key={category.slug}
                href={`#${category.slug}`}
                className="rounded-full border border-line-strong px-4 py-2 text-sm text-fg-muted transition-colors hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                {category.shortName}
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>

      {serviceCategories.map((category, index) => (
        <ServicesCategoryBand
          key={category.slug}
          category={category}
          services={getServicesByCategory(category.slug)}
          tone={index % 2 === 0 ? "dark" : "raised"}
        />
      ))}

      <EnquiryCta
        title="Not sure which service fits?"
        description="Describe the problem, not the product — we'll tell you which service (or combination) actually solves it."
      />
    </>
  );
}
