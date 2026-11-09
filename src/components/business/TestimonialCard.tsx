import { Quote } from "lucide-react";
import type { Testimonial } from "@/types";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-8">
      <Quote className="h-8 w-8 text-accent" aria-hidden />
      <blockquote className="font-display text-xl font-medium leading-snug text-fg sm:text-2xl">
        {testimonial.quote}
      </blockquote>
      <figcaption className="text-sm text-fg-muted">
        <span className="font-medium text-fg">{testimonial.name}</span> — {testimonial.role},{" "}
        {testimonial.company}
      </figcaption>
    </figure>
  );
}
