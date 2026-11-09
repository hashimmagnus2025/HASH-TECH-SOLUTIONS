import { ArrowRight, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Badge from "@/components/ui/Badge";
import IconBox from "@/components/ui/IconBox";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/business/ServiceCard";
import Reveal from "@/components/animations/Reveal";
import TextReveal from "@/components/animations/TextReveal";
import StaggerGroup from "@/components/animations/StaggerGroup";
import { getServiceCategory } from "@/data/service-categories";
import { getRelatedServices } from "@/data/services";
export default function ServiceDetail({
  service
}) {
  const category = getServiceCategory(service.category);
  const related = getRelatedServices(service);
  const Icon = service.icon;
  return <>
      <section className="border-b border-line pb-16 pt-10">
        <Container className="flex flex-col gap-8">
          <Breadcrumbs items={[{
          label: "Home",
          href: "/"
        }, {
          label: "Services",
          href: "/services"
        }, ...(category ? [{
          label: category.name,
          href: `/services#${category.slug}`
        }] : []), {
          label: service.name
        }]} />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-5">
              <Reveal className="flex items-center gap-3">
                <IconBox icon={Icon} />
                <Badge>{service.id.toUpperCase()}</Badge>
                {category && <Badge tone="muted">{category.shortName}</Badge>}
              </Reveal>
              <TextReveal as="h1" text={service.name} className="max-w-2xl font-display text-4xl font-medium leading-tight text-fg sm:text-5xl" />
              <Reveal delay={0.15}>
                <p className="max-w-xl text-lg leading-relaxed text-fg-muted">{service.shortDescription}</p>
              </Reveal>
            </div>

            <Reveal delay={0.25}>
              <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />} className="shrink-0">
                Enquire About This Service
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <Reveal className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-2xl font-medium text-fg">Overview</h2>
              <p className="text-base leading-relaxed text-fg-muted">{service.description}</p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="font-display text-2xl font-medium text-fg">What this includes</h2>
              <ul className="flex flex-col gap-3">
                {service.whatsIncluded.map(item => <li key={item} className="flex items-start gap-3 text-sm text-fg-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                    {item}
                  </li>)}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="font-display text-2xl font-medium text-fg">Key benefits</h2>
              <ul className="flex flex-col gap-3">
                {service.benefits.map(benefit => <li key={benefit} className="flex items-start gap-3 text-sm text-fg-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-bright" aria-hidden />
                    {benefit}
                  </li>)}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle">
                Typically suitable for
              </span>
              <div className="flex flex-wrap gap-2">
                {service.suitableFor.map(item => <span key={item} className="rounded-full border border-line-strong px-3 py-1 text-xs text-fg-muted">
                    {item}
                  </span>)}
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-line-strong bg-surface-raised p-6">
              <h3 className="font-display text-lg font-medium text-fg">Need this set up?</h3>
              <p className="text-sm leading-relaxed text-fg-muted">
                Tell us a bit about the site and what you need, and we&apos;ll follow up with next
                steps.
              </p>
              <Button href="/contact" variant="signal" size="md" className="w-fit">
                Get a Quote
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {related.length > 0 && <section className="border-t border-line py-16">
          <Container className="flex flex-col gap-10">
            <h2 className="font-display text-2xl font-medium text-fg">Related services</h2>
            <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map(item => <ServiceCard key={item.id} service={item} />)}
            </StaggerGroup>
          </Container>
        </section>}
    </>;
}
