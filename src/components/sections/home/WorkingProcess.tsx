import { Search, ClipboardCheck, Lightbulb, Hammer, LifeBuoy } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import StaggerGroup from "@/components/animations/StaggerGroup";
import ScrollSpine from "@/components/animations/ScrollSpine";
import IconBox from "@/components/ui/IconBox";

const steps = [
  {
    icon: Search,
    title: "Understand requirements",
    description: "We start by listening — what's actually breaking, growing, or missing.",
  },
  {
    icon: ClipboardCheck,
    title: "Assess the infrastructure",
    description: "A proper look at what's already in place before recommending anything new.",
  },
  {
    icon: Lightbulb,
    title: "Recommend solutions",
    description: "Options scoped to the budget and the actual problem, not oversold.",
  },
  {
    icon: Hammer,
    title: "Implement the solution",
    description: "Installation and setup handled end to end, with minimal disruption.",
  },
  {
    icon: LifeBuoy,
    title: "Support & maintenance",
    description: "Ongoing support or an AMC, so the relationship doesn't end at installation.",
  },
];

export default function WorkingProcess() {
  return (
    <Section tone="dark">
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading eyebrow="Our working process" title="How a project actually moves" />
        </Reveal>

        <StaggerGroup className="relative flex flex-col gap-10 sm:pl-4">
          <div
            aria-hidden
            className="absolute left-[27px] top-2 bottom-2 hidden w-px bg-line-strong sm:block"
          >
            <ScrollSpine className="absolute inset-0 w-full bg-accent" />
          </div>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative flex gap-6">
                <div className="relative z-10 shrink-0">
                  <IconBox icon={Icon} size="lg" className="bg-surface border border-line-strong" />
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  <span className="font-mono text-xs text-fg-subtle">
                    Step {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl font-medium text-fg">{step.title}</h3>
                  <p className="max-w-lg text-sm leading-relaxed text-fg-muted">{step.description}</p>
                </div>
              </div>
            );
          })}
        </StaggerGroup>
      </div>
    </Section>
  );
}
