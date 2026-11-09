import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import StaggerGroup from "@/components/animations/StaggerGroup";
import IconBox from "@/components/ui/IconBox";
import ArrowButton from "@/components/ui/ArrowButton";
import Button from "@/components/ui/Button";
import { serviceCategories } from "@/data/service-categories";
import { getServicesByCategory } from "@/data/services";
import { cn } from "@/lib/utils";
export default function ServicesOverview() {
  return <Section tone="dark">
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading eyebrow="What we do" title="Five areas of expertise, one accountable partner" description="Every service is delivered under one roof, so hardware, networking, security and support never fall into separate, disconnected vendors — all 42 individual services live on the services page, organized by category." />
        </Reveal>

        <StaggerGroup className="grid gap-5 lg:grid-cols-3">
          {serviceCategories.map((category, index) => {
          const Icon = category.icon;
          const sample = getServicesByCategory(category.slug).slice(0, 3);
          return <div key={category.slug} id={category.slug} className={cn("flex flex-col gap-4 rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-accent/50 hover:bg-surface-hover", index === 0 && "lg:col-span-2")}>
                <div className="flex items-center justify-between">
                  <IconBox icon={Icon} />
                  <span className="font-mono text-xs text-fg-subtle">
                    {String(index + 1).padStart(2, "0")} / 05
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium text-fg">{category.name}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{category.description}</p>

                <div className="flex flex-wrap gap-2">
                  {sample.map(service => <span key={service.id} className="rounded-full border border-line-strong px-3 py-1 text-xs text-fg-muted">
                      {service.name}
                    </span>)}
                </div>

                <ArrowButton href={`/services#${category.slug}`} className="mt-auto">
                  View all services
                </ArrowButton>
              </div>;
        })}

          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-line-strong bg-surface-raised p-7">
            <h3 className="font-display text-xl font-medium text-fg">Not sure where to start?</h3>
            <p className="text-sm leading-relaxed text-fg-muted">
              Tell us what you&apos;re trying to solve and we&apos;ll point you to the right
              service — or a combination of them.
            </p>
            <Button href="/contact" variant="secondary" size="md" className="w-fit">
              Talk to us
            </Button>
          </div>
        </StaggerGroup>
      </div>
    </Section>;
}
