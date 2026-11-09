import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import StaggerGroup from "@/components/animations/StaggerGroup";
import IndustryCard from "@/components/business/IndustryCard";
import { industries } from "@/data/industries";
export default function IndustriesSection() {
  return <Section tone="raised" id="industries">
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading eyebrow="Industries we serve" title="Solutions shaped around how each sector actually works" description="The same five service categories, applied differently depending on who's using them." />
        </Reveal>

        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map(industry => <IndustryCard key={industry.slug} industry={industry} />)}
        </StaggerGroup>
      </div>
    </Section>;
}
