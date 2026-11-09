import { ShieldCheck, Check, ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import IconBox from "@/components/ui/IconBox";
import Reveal from "@/components/animations/Reveal";

const benefits = [
  "Scheduled servicing instead of reactive-only support",
  "Predictable, planned maintenance costs",
  "Covers computers, networking, CCTV, servers and firewalls",
  "A defined point of contact when something does go wrong",
];

export default function AmcHighlight() {
  return (
    <Section tone="dark" id="amc-services">
      <div className="grid gap-10 rounded-3xl border border-line-strong bg-surface p-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:p-14">
        <Reveal className="flex flex-col gap-5">
          <IconBox icon={ShieldCheck} size="lg" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
            AMC &amp; maintenance
          </span>
          <h2 className="font-display text-3xl font-medium leading-tight text-fg sm:text-4xl">
            Preventive maintenance is cheaper than downtime.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-fg-muted">
            Most IT failures don&apos;t happen without warning — they happen because
            nobody was scheduled to look until it was too late. An Annual
            Maintenance Contract puts someone on the hook to check before
            that happens, across computers, networking, CCTV and servers.
          </p>
          <ul className="flex flex-col gap-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm text-fg-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                {benefit}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col justify-center gap-5 rounded-2xl bg-surface-raised p-8">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle">
            Request an AMC
          </span>
          <p className="text-sm leading-relaxed text-fg-muted">
            Tell us what you need covered — a single server, a full office, or
            a CCTV system — and we&apos;ll put together an AMC scoped to it.
          </p>
          <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
            Request an AMC Quote
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
