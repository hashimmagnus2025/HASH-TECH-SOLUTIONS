import Section from "@/components/ui/Section";
import Reveal from "@/components/animations/Reveal";
import StaggerGroup from "@/components/animations/StaggerGroup";
import StatBlock from "@/components/ui/StatBlock";
import { company } from "@/data/company";

export default function TrustIntro() {
  return (
    <Section tone="light" id="about">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-fg-muted">
            About HashTech Solutions
          </span>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink-fg sm:text-4xl">
            {company.tagline}
          </h2>
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-base leading-relaxed text-ink-fg-muted sm:text-lg">
              {company.shortDescription} We work as a single accountable technology
              partner — handling computers, networking, CCTV &amp; security, AMC and
              software support — so businesses, institutions and homes aren&apos;t
              stitching solutions together from separate vendors.
            </p>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <StatBlock tone="light" label="Businesses supported" />
            <StatBlock tone="light" label="Years in operation" />
            <StatBlock tone="light" label="AMC contracts active" />
          </StaggerGroup>
        </div>
      </div>
    </Section>
  );
}
