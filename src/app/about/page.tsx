import type { Metadata } from "next";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import TextReveal from "@/components/animations/TextReveal";
import StaggerGroup from "@/components/animations/StaggerGroup";
import IconBox from "@/components/ui/IconBox";
import EnquiryCta from "@/components/business/EnquiryCta";
import { company } from "@/data/company";
import { values, capabilities } from "@/data/about";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "HashTech Solutions provides IT hardware, networking, CCTV & security, AMC and software solutions as a single accountable technology partner.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line pb-16 pt-10">
        <Container className="flex flex-col gap-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <div className="flex flex-col gap-5">
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                About {company.name}
              </span>
            </Reveal>
            <TextReveal
              as="h1"
              text={company.tagline}
              className="max-w-3xl font-display text-4xl font-medium leading-tight text-fg sm:text-5xl"
            />
            <Reveal delay={0.15}>
              <p className="max-w-2xl text-lg leading-relaxed text-fg-muted">
                {company.shortDescription}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-4 rounded-2xl border border-paper-line bg-paper-dim p-8">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-fg-muted">
              Mission
            </span>
            <p className="text-lg leading-relaxed text-ink-fg">{company.mission}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-4 rounded-2xl border border-paper-line bg-paper-dim p-8">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-fg-muted">
              Vision
            </span>
            <p className="text-lg leading-relaxed text-ink-fg">{company.vision}</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="dark">
        <div className="flex flex-col gap-12">
          <Reveal>
            <SectionHeading eyebrow="What we cover" title="Areas of capability" />
          </Reveal>
          <StaggerGroup className="grid gap-3 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <div
                key={capability}
                className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 text-sm text-fg-muted"
              >
                <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                {capability}
              </div>
            ))}
          </StaggerGroup>
        </div>
      </Section>

      <Section tone="raised">
        <div className="flex flex-col gap-12">
          <Reveal>
            <SectionHeading eyebrow="Our values" title="What guides how we work" />
          </Reveal>
          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6">
                  <IconBox icon={Icon} />
                  <h3 className="font-display text-lg font-medium text-fg">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-fg-muted">{value.description}</p>
                </div>
              );
            })}
          </StaggerGroup>
        </div>
      </Section>

      <EnquiryCta
        title="Want to work with a single accountable IT partner?"
        description="Tell us what's currently fragmented across vendors — we'll tell you how it could sit under one roof."
      />
    </>
  );
}
