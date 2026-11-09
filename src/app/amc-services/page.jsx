import { Check, Search, ClipboardCheck, FileSignature, Headset } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import IconBox from "@/components/ui/IconBox";
import Reveal from "@/components/animations/Reveal";
import TextReveal from "@/components/animations/TextReveal";
import StaggerGroup from "@/components/animations/StaggerGroup";
import ServiceCard from "@/components/business/ServiceCard";
import EnquiryCta from "@/components/business/EnquiryCta";
import { getServicesByCategory } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "AMC & Maintenance Services",
  description: "Annual Maintenance Contracts covering computers, IT infrastructure, CCTV, networking, servers and firewalls — scheduled maintenance instead of reactive-only support.",
  path: "/amc-services"
});
const amcServices = getServicesByCategory("amc-maintenance-services");
const process = [{
  icon: Search,
  title: "Assess",
  description: "We review what's being covered and its current condition."
}, {
  icon: FileSignature,
  title: "Scope the contract",
  description: "Coverage, visit frequency and response terms agreed up front."
}, {
  icon: ClipboardCheck,
  title: "Scheduled servicing",
  description: "Regular visits and checks carried out as agreed."
}, {
  icon: Headset,
  title: "Priority support",
  description: "A defined point of contact when something needs attention."
}];
const benefits = ["Scheduled servicing instead of reactive-only support", "Predictable, planned maintenance costs", "Covers computers, networking, CCTV, servers and firewalls", "A defined point of contact when something does go wrong"];
export default function AmcServicesPage() {
  return <>
      <section className="border-b border-line pb-16 pt-10">
        <Container className="flex flex-col gap-8">
          <Breadcrumbs items={[{
          label: "Home",
          href: "/"
        }, {
          label: "AMC Services"
        }]} />
          <div className="flex flex-col gap-5">
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                AMC &amp; maintenance services
              </span>
            </Reveal>
            <TextReveal as="h1" text="Preventive maintenance is cheaper than downtime." className="max-w-3xl font-display text-4xl font-medium leading-tight text-fg sm:text-5xl" />
            <Reveal delay={0.15}>
              <p className="max-w-2xl text-lg leading-relaxed text-fg-muted">
                An Annual Maintenance Contract puts someone on the hook to check before
                something breaks — across computers, networking, CCTV and servers —
                instead of waiting for a call after it already has.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section tone="dark">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-4">
            <SectionHeading eyebrow="Why an AMC" title="What you actually get" />
            <ul className="mt-2 flex flex-col gap-3">
              {benefits.map(benefit => <li key={benefit} className="flex items-start gap-3 text-sm text-fg-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {benefit}
                </li>)}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading eyebrow="How it works" title="The maintenance process" />
            <div className="mt-6 flex flex-col gap-5">
              {process.map(step => {
              const Icon = step.icon;
              return <div key={step.title} className="flex items-start gap-4">
                    <IconBox icon={Icon} size="sm" />
                    <div>
                      <h3 className="font-display text-base font-medium text-fg">{step.title}</h3>
                      <p className="text-sm text-fg-muted">{step.description}</p>
                    </div>
                  </div>;
            })}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="raised" id="amc-plans">
        <div className="flex flex-col gap-12">
          <Reveal>
            <SectionHeading eyebrow="AMC coverage options" title="Nine ways to keep systems covered" description="Each AMC below can stand alone or combine into one contract covering everything." />
          </Reveal>
          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {amcServices.map(service => <ServiceCard key={service.id} service={service} />)}
          </StaggerGroup>
        </div>
      </Section>

      <EnquiryCta title="Request an AMC Quote" description="Tell us what needs covering — a single server, a full office, or a CCTV system — and we'll scope an AMC to fit." ctaLabel="Request an AMC Quote" />
    </>;
}
