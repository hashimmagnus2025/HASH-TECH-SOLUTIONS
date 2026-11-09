"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/animations/MagneticButton";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { serviceCategories } from "@/data/service-categories";

/**
 * Third hero concept. The first two (an SVG network diagram, then a WebGL
 * shader field) were both rejected as "generic abstract tech background,"
 * regardless of technique. This version drops that whole category: there
 * is no generative background at all. The typography itself — scale,
 * two-tone color, mask reveal, cursor-reactive characters — is the entire
 * visual event. See the animations README for the full history.
 */
export default function Hero() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const ruleRef = useRef(null);
  const subRowRef = useRef(null);
  const categoryRowRef = useRef(null);
  const reducedMotion = useReducedMotion();

  // ---- Entrance timeline + cursor-reactive characters (one effect: both need `split`) ----
  useEffect(() => {
    const headline = headlineRef.current;
    const section = sectionRef.current;
    if (!headline || !section) return;
    const split = new SplitText(headline, {
      type: "words, chars",
      mask: "words",
      charsClass: "hero-char"
    });
    split.chars.forEach(char => {
      const el = char;
      el.style.transition = "transform 0.25s ease-out, color 0.25s ease-out";
    });
    if (reducedMotion) {
      gsap.set(split.words, {
        yPercent: 0,
        opacity: 1
      });
      gsap.set(ruleRef.current, {
        scaleX: 1
      });
      gsap.set([eyebrowRef.current, subRowRef.current, categoryRowRef.current], {
        opacity: 1,
        y: 0
      });
      return () => split.revert();
    }
    gsap.set(split.words, {
      yPercent: 115,
      opacity: 0
    });
    gsap.set(ruleRef.current, {
      scaleX: 0,
      transformOrigin: "left center"
    });
    gsap.set(eyebrowRef.current, {
      opacity: 0,
      y: 10
    });
    gsap.set(subRowRef.current, {
      opacity: 0,
      y: 20
    });
    gsap.set(categoryRowRef.current, {
      opacity: 0,
      y: 12
    });
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });
    tl.to(eyebrowRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5
    }, 0).to(split.words, {
      yPercent: 0,
      opacity: 1,
      duration: 0.85,
      stagger: 0.06
    }, 0.15).to(ruleRef.current, {
      scaleX: 1,
      duration: 0.6,
      ease: "power2.inOut"
    }, 0.95).to(subRowRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, 1.05).to(categoryRowRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5
    }, 1.25);
    let onMove = null;
    if (window.matchMedia("(pointer: fine)").matches) {
      onMove = event => {
        split.chars.forEach(char => {
          const el = char;
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dist = Math.hypot(event.clientX - cx, event.clientY - cy);
          const influence = Math.max(0, 1 - dist / 130);
          el.style.transform = `translateY(${-influence * 10}px)`;
          el.style.color = influence > 0.3 ? "var(--color-accent)" : "";
        });
      };
      section.addEventListener("pointermove", onMove);
    }
    return () => {
      tl.kill();
      if (onMove) section.removeEventListener("pointermove", onMove);
      split.revert();
    };
  }, [reducedMotion]);

  // ---- Scroll-triggered recede as the user scrolls past the hero ----
  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    if (!section || !headline || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.to(headline, {
        y: -30,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    });
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, [reducedMotion]);
  return <section ref={sectionRef} className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden py-28 md:min-h-screen">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,99,224,0.16),transparent_60%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.3] bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-size-[64px_64px] mask-[linear-gradient(to_bottom,black,transparent_75%)]" />

      <Container className="relative flex flex-col gap-10">
        <span ref={eyebrowRef} className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          IT Hardware · Networking · CCTV · AMC · Software
        </span>

        <h1 ref={headlineRef} className="max-w-5xl font-display text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.98] tracking-tight text-fg">
          Powering Your Business <span className="text-primary-bright">with Smarter</span> IT Solutions.
        </h1>

        <div ref={ruleRef} className="h-px w-full max-w-md bg-linear-to-r from-accent via-primary-bright to-transparent" />

        <div ref={subRowRef} className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-lg text-lg leading-relaxed text-fg-muted">
            From computer systems and IT infrastructure to advanced networking,
            CCTV security and ongoing maintenance, we deliver technology
            solutions that keep your business connected, secure and running.
          </p>

          <div className="flex flex-wrap gap-4">
            <MagneticButton>
              <Button href="/services" variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                Explore Our Services
              </Button>
            </MagneticButton>
            <Button href="/contact" variant="outline" size="lg">
              Talk to Our Experts
            </Button>
          </div>
        </div>

        <div ref={categoryRowRef} className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 font-mono text-xs uppercase tracking-widest text-fg-subtle">
          {serviceCategories.map((category, index) => <Link key={category.slug} href={`/services#${category.slug}`} className="group inline-flex items-center gap-2 transition-colors hover:text-fg">
              <span className="text-accent">{String.fromCharCode(65 + index)}</span>
              {category.shortName}
            </Link>)}
        </div>
      </Container>
    </section>;
}
