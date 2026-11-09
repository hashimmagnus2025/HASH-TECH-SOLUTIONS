import { ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/animations/MagneticButton";
/**
 * The strongest use of the signal-amber accent on a page, reserved for
 * exactly this closing conversion moment — see the approved motion/color
 * system. Reusable across the homepage and any service/industry page.
 */
export default function EnquiryCta({
  eyebrow = "Get a quote",
  title,
  description,
  ctaLabel = "Get a Quote",
  ctaHref = "/contact"
}) {
  return <Section tone="dark" border={false} className="bg-[radial-gradient(circle_at_50%_0%,rgba(255,179,71,0.12),transparent_60%)]">
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-signal">{eyebrow}</span>
        <h2 className="max-w-2xl font-display text-3xl font-medium leading-tight text-fg sm:text-4xl">
          {title}
        </h2>
        {description && <p className="max-w-xl text-base text-fg-muted">{description}</p>}
        <MagneticButton>
          <Button href={ctaHref} variant="signal" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
            {ctaLabel}
          </Button>
        </MagneticButton>
      </div>
    </Section>;
}
