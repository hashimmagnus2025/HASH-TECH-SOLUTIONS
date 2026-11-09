import { testimonials } from "@/data/testimonials";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/business/TestimonialCard";

/**
 * Renders nothing while testimonials.ts is empty — per the no-fake-reviews
 * rule, this section simply doesn't exist until genuine testimonials are
 * supplied, rather than shipping an empty or placeholder carousel.
 */
export default function TestimonialSection() {
  if (testimonials.length === 0) return null;

  return (
    <Section tone="dark" id="testimonials">
      <div className="flex flex-col gap-12">
        <SectionHeading eyebrow="What clients say" title="Trusted by the teams we support" />
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </Section>
  );
}
