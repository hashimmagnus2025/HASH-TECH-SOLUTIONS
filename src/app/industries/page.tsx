import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Section from "@/components/ui/Section";
import Reveal from "@/components/animations/Reveal";
import StaggerGroup from "@/components/animations/StaggerGroup";
import IndustryCard from "@/components/business/IndustryCard";
import EnquiryCta from "@/components/business/EnquiryCta";
import { industries } from "@/data/industries";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industries We Serve",
  description:
    "IT, networking, CCTV and AMC solutions shaped around corporate offices, SMEs, schools, healthcare, manufacturing, retail, government and individual customers.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <section className="border-b border-line pb-16 pt-10">
        <Container className="flex flex-col gap-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries" }]} />
          <Reveal className="flex flex-col gap-5">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              Industries we serve
            </span>
            <h1 className="max-w-3xl font-display text-4xl font-medium leading-tight text-fg sm:text-5xl">
              The same five service categories, applied differently
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-fg-muted">
              Computers, networking, CCTV, AMC and software solutions — scoped to how
              each kind of organization actually operates.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section tone="dark">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} />
          ))}
        </StaggerGroup>
      </Section>

      <EnquiryCta
        title="Don't see your industry listed?"
        description="The same five service categories flex to fit most organizations — tell us what you're working with."
      />
    </>
  );
}
