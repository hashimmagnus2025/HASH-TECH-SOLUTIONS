import Section from "@/components/ui/Section";
import IconBox from "@/components/ui/IconBox";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/animations/Reveal";
import StaggerGroup from "@/components/animations/StaggerGroup";
import ServiceCard from "@/components/business/ServiceCard";
import type { ServiceCategory, ServiceItem } from "@/types";

interface ServicesCategoryBandProps {
  category: ServiceCategory;
  services: ServiceItem[];
  tone?: "dark" | "raised";
}

export default function ServicesCategoryBand({ category, services, tone = "dark" }: ServicesCategoryBandProps) {
  const Icon = category.icon;

  return (
    <Section tone={tone} id={category.slug}>
      <div className="flex flex-col gap-10">
        <Reveal className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <IconBox icon={Icon} size="lg" />
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-3xl font-medium text-fg">{category.name}</h2>
              <p className="max-w-xl text-base leading-relaxed text-fg-muted">{category.description}</p>
            </div>
          </div>
          <Badge tone="muted">{services.length} services</Badge>
        </Reveal>

        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
