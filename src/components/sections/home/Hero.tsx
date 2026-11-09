"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/animations/MagneticButton";
import HeroShaderField from "@/components/sections/home/HeroShaderField";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shaderWrapRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subcopyRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  // ---- Master entrance timeline ----
  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;

    const split = new SplitText(headline, { type: "words", mask: "words" });

    if (reducedMotion) {
      gsap.set(shaderWrapRef.current, { opacity: 1 });
      gsap.set(split.words, { yPercent: 0, opacity: 1 });
      gsap.set([eyebrowRef.current, subcopyRef.current, ctaRef.current], { opacity: 1, y: 0 });
      return () => split.revert();
    }

    gsap.set(shaderWrapRef.current, { opacity: 0 });
    gsap.set(split.words, { yPercent: 110, opacity: 0 });
    gsap.set(eyebrowRef.current, { opacity: 0, y: 10 });
    gsap.set(subcopyRef.current, { opacity: 0, y: 16 });
    gsap.set(ctaRef.current, { opacity: 0, y: 16 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. The field itself appears first — the "cinematic lighting" beat.
    tl.to(shaderWrapRef.current, { opacity: 1, duration: 1.4 }, 0);
    // 2. Eyebrow.
    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.5);
    // 3. Headline mask-reveal — the thesis statement.
    tl.to(split.words, { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.055 }, 0.65);
    // 4. Supporting copy.
    tl.to(subcopyRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.25);
    // 5. CTAs.
    tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.5);

    return () => {
      tl.kill();
      split.revert();
    };
  }, [reducedMotion]);

  // ---- Foreground parallax: the text drifts slightly against the field (fine pointers only) ----
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content || reducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const quickX = gsap.quickTo(content, "x", { duration: 0.7, ease: "power3.out" });
    const quickY = gsap.quickTo(content, "y", { duration: 0.7, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      quickX(relX * -14);
      quickY(relY * -10);
    };
    const onLeave = () => {
      quickX(0);
      quickY(0);
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(content, "x,y");
    };
  }, [reducedMotion]);

  // ---- Scroll-triggered recede as the user scrolls past the hero ----
  useEffect(() => {
    const section = sectionRef.current;
    const shaderWrap = shaderWrapRef.current;
    if (!section || !shaderWrap || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(shaderWrap, {
        scale: 1.08,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[88vh] items-center overflow-hidden py-24 md:min-h-screen"
    >
      <HeroShaderField ref={shaderWrapRef} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(5,7,13,0.92)_0%,rgba(5,7,13,0.65)_38%,rgba(5,7,13,0.15)_68%,transparent_100%)]"
      />

      <Container className="relative">
        <div ref={contentRef} className="flex max-w-2xl flex-col gap-8">
          <span ref={eyebrowRef} className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            IT Hardware · Networking · CCTV · AMC · Software
          </span>

          <h1
            ref={headlineRef}
            className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-fg sm:text-6xl md:text-[4.4rem]"
          >
            Powering Your Business with Smarter IT Solutions.
          </h1>

          <p ref={subcopyRef} className="max-w-lg text-lg leading-relaxed text-fg-muted">
            From computer systems and IT infrastructure to advanced networking,
            CCTV security and ongoing maintenance, we deliver technology
            solutions that keep your business connected, secure and running.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4">
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
      </Container>
    </section>
  );
}
