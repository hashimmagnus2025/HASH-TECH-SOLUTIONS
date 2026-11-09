import { Boxes, Headset, Cpu, Briefcase, ShieldCheck } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import StaggerGroup from "@/components/animations/StaggerGroup";
import IconBox from "@/components/ui/IconBox";

const reasons = [
  {
    icon: Boxes,
    title: "Complete IT solutions",
    description:
      "Hardware, networking, CCTV, AMC and software handled by one team instead of several disconnected vendors.",
  },
  {
    icon: Headset,
    title: "Responsive technical support",
    description:
      "On-site and remote support focused on resolving issues quickly, not disappearing after installation.",
  },
  {
    icon: Cpu,
    title: "Hardware & infrastructure expertise",
    description:
      "From a single workstation to full office networking and server deployments, planned and installed properly.",
  },
  {
    icon: Briefcase,
    title: "Business-focused approach",
    description:
      "Solutions scoped to how the business actually works — not oversized or undersized for the sake of the invoice.",
  },
  {
    icon: ShieldCheck,
    title: "Structured maintenance plans",
    description:
      "AMC options built to catch problems before they cause downtime, instead of waiting for something to break.",
  },
];

export default function WhyChooseUs() {
  return (
    <Section tone="raised">
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Why choose HashTech Solutions"
            title="A technology partner that stays accountable after the install"
          />
        </Reveal>

        <StaggerGroup className="flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] snap-x snap-mandatory [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="flex w-72 shrink-0 snap-start flex-col gap-4 rounded-2xl border border-line bg-surface p-7 sm:w-80"
              >
                <IconBox icon={Icon} tone="primary" />
                <h3 className="font-display text-lg font-medium text-fg">{reason.title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{reason.description}</p>
              </div>
            );
          })}
        </StaggerGroup>
      </div>
    </Section>
  );
}
