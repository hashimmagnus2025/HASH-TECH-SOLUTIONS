import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/animations/Reveal";
import TextReveal from "@/components/animations/TextReveal";
import MagneticButton from "@/components/animations/MagneticButton";
import HeroTopology from "@/components/sections/home/HeroTopology";
import HeroAmbientBackground from "@/components/sections/home/HeroAmbientBackground";
import { company } from "@/data/company";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-20 md:pt-28">
      <HeroAmbientBackground />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-size-[64px_64px] mask-[linear-gradient(to_bottom,black,transparent_80%)]"
      />

      <Container className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center xl:grid-cols-[minmax(0,1fr)_28rem]">
        <div className="flex flex-col gap-8">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              IT Hardware · Networking · CCTV · AMC · Software
            </span>
          </Reveal>

          <TextReveal
            as="h1"
            trigger="mount"
            text="Technology infrastructure your business can run on."
            className="max-w-xl font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-[4.5rem]"
          />

          <Reveal delay={0.15}>
            <p className="max-w-lg text-lg leading-relaxed text-fg-muted">
              {company.name} delivers IT hardware, networking, CCTV &amp; security, AMC
              and software solutions for businesses, institutions and homes —
              planned, installed and supported end to end.
            </p>
          </Reveal>

          <Reveal delay={0.25} className="flex flex-wrap gap-4">
            <MagneticButton>
              <Button href="/services" variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                Explore Our Services
              </Button>
            </MagneticButton>
            <Button href="/contact" variant="outline" size="lg">
              Contact Our Team
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={16} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <HeroTopology className="h-auto w-full" />
        </Reveal>
      </Container>
    </section>
  );
}
