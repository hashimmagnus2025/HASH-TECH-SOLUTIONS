"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import IconBox from "@/components/ui/IconBox";
import MagneticButton from "@/components/animations/MagneticButton";
import HeroScene, { HERO_NODE_POSITIONS } from "@/components/sections/home/HeroScene";
import HeroBackground from "@/components/sections/home/HeroBackground";
import HeroParticles from "@/components/sections/home/HeroParticles";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { serviceCategories } from "@/data/service-categories";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);
  const nodesWrapRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subcopyRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  // ---- Master entrance timeline: the 7-step cinematic opening sequence ----
  useEffect(() => {
    const svg = svgRef.current;
    const nodesWrap = nodesWrapRef.current;
    const headline = headlineRef.current;
    if (!svg || !nodesWrap || !headline) return;

    const edges = Array.from(svg.querySelectorAll<SVGPathElement>("[data-edge]"));
    const blades = Array.from(svg.querySelectorAll<SVGGElement>("[data-blade]")); // DOM order is already back → front
    const nodeDots = Array.from(svg.querySelectorAll<SVGCircleElement>("[data-node-dot]"));
    const pulses = Array.from(svg.querySelectorAll<SVGCircleElement>("[data-pulse]"));
    const coreGlow = svg.querySelector<SVGCircleElement>("[data-core-glow]");
    const nodeChips = Array.from(nodesWrap.querySelectorAll<HTMLDivElement>("[data-node-chip]"));
    const nodeLabels = Array.from(nodesWrap.querySelectorAll<HTMLSpanElement>("[data-node-label]"));
    const particleDots = particlesRef.current
      ? Array.from(particlesRef.current.querySelectorAll<HTMLSpanElement>("[data-particle]"))
      : [];

    const split = new SplitText(headline, { type: "words", mask: "words" });

    if (reducedMotion) {
      gsap.set(backgroundRef.current, { opacity: 1 });
      gsap.set(particleDots, { opacity: 0.8, scale: 1 });
      gsap.set(coreGlow, { opacity: 1, scale: 1 });
      gsap.set(blades, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });
      gsap.set(edges, { drawSVG: "100%", opacity: 0.75 });
      gsap.set(nodeDots, { opacity: 1, scale: 1 });
      gsap.set(nodeChips, { opacity: 1, y: 0, scale: 1 });
      gsap.set(nodeLabels, { opacity: 1 });
      gsap.set(split.words, { yPercent: 0, opacity: 1 });
      gsap.set([eyebrowRef.current, subcopyRef.current, ctaRef.current], { opacity: 1, y: 0 });
      return () => split.revert();
    }

    gsap.set(backgroundRef.current, { opacity: 0 });
    gsap.set(particleDots, { opacity: 0, scale: 0.4 });
    gsap.set(coreGlow, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });
    gsap.set(blades, { opacity: 0, y: 3, scale: 0.92, filter: "blur(6px)", transformOrigin: "center" });
    gsap.set(edges, { drawSVG: "0%" });
    gsap.set(nodeDots, { opacity: 0, scale: 0 });
    gsap.set(nodeChips, { opacity: 0, y: 14, scale: 0.7 });
    gsap.set(nodeLabels, { opacity: 0 });
    gsap.set(split.words, { yPercent: 110, opacity: 0 });
    gsap.set(eyebrowRef.current, { opacity: 0, y: 10 });
    gsap.set(subcopyRef.current, { opacity: 0, y: 16 });
    gsap.set(ctaRef.current, { opacity: 0, y: 16 });
    gsap.set(pulses, { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Background lighting appears.
    tl.to(backgroundRef.current, { opacity: 1, duration: 1.1 }, 0);
    // 2. Digital particles gradually activate.
    tl.to(particleDots, { opacity: 0.8, scale: 1, duration: 0.6, stagger: 0.04 }, 0.3);
    // 3. Main visual reveals with depth — glow, then blades back→front, nodes, data-trace edges.
    tl.to(coreGlow, { opacity: 1, scale: 1, duration: 1 }, 0.4)
      .to(blades, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.7, stagger: 0.14 }, 0.5)
      .to(nodeDots, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: "back.out(2)" }, 0.95)
      .to(edges, { drawSVG: "100%", duration: 0.9, stagger: 0.08 }, 1.0)
      .to(nodeChips, { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08, ease: "back.out(1.7)" }, 1.15);
    // 4. Headline reveals using word-level masking.
    tl.to(split.words, { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.05 }, 1.2);
    // 5. Supporting description (and eyebrow) appear with staggered motion.
    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.15)
      .to(subcopyRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.55);
    // 6. CTA buttons animate into position.
    tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.8);
    // 7. Small visual details (category code labels) activate last.
    tl.to(nodeLabels, { opacity: 1, duration: 0.4, stagger: 0.06 }, 2.0);

    // Perpetual data-pulse travel along each edge — starts as its edge
    // settles, loops gently afterward. Small, slow, single-dot-per-line:
    // the one deliberate ongoing loop here, same restraint as the ambient
    // background drift elsewhere in this codebase.
    const pulseTweens = pulses.flatMap((pulse, index) => {
      const delay = 1.3 + index * 0.25;
      return [
        gsap.to(pulse, { opacity: 1, duration: 0.3, delay }),
        gsap.to(pulse, {
          motionPath: { path: edges[index], alignOrigin: [0.5, 0.5] },
          duration: 1.8,
          repeat: -1,
          delay,
          ease: "power1.inOut",
        }),
      ];
    });

    return () => {
      tl.kill();
      pulseTweens.forEach((tween) => tween.kill());
      split.revert();
    };
  }, [reducedMotion]);

  // ---- Mouse-based parallax tilt (fine pointers only, disabled under reduced motion) ----
  useEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;
    if (!section || !scene || reducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const quickRotateY = gsap.quickTo(scene, "rotationY", { duration: 0.6, ease: "power3.out" });
    const quickRotateX = gsap.quickTo(scene, "rotationX", { duration: 0.6, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      quickRotateY(relX * 10);
      quickRotateX(-relY * 8);
    };
    const onLeave = () => {
      quickRotateY(0);
      quickRotateX(0);
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(scene, "rotationX,rotationY");
    };
  }, [reducedMotion]);

  // ---- Scroll-triggered recede as the user scrolls past the hero ----
  useEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;
    if (!section || !scene || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(scene, {
        scale: 1.08,
        y: 40,
        opacity: 0.5,
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
    <section ref={sectionRef} className="relative overflow-hidden pb-20 pt-20 md:pt-28">
      <HeroBackground ref={backgroundRef} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-size-[64px_64px] mask-[linear-gradient(to_bottom,black,transparent_80%)]"
      />
      <HeroParticles ref={particlesRef} />

      <Container className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center xl:grid-cols-[minmax(0,1fr)_32rem]">
        <div className="flex flex-col gap-8">
          <span ref={eyebrowRef} className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            IT Hardware · Networking · CCTV · AMC · Software
          </span>

          <h1
            ref={headlineRef}
            className="max-w-xl font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-[4.2rem]"
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

        <div
          className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-none"
          style={{ perspective: 1000 }}
        >
          <div ref={sceneRef} className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
            <HeroScene ref={svgRef} />
            <div ref={nodesWrapRef} className="absolute inset-0">
              {serviceCategories.map((category, index) => {
                const position = HERO_NODE_POSITIONS[index];
                const Icon = category.icon;
                return (
                  <div
                    key={category.slug}
                    data-node-chip
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                    style={{ left: `${position.x}%`, top: `${position.y}%` }}
                  >
                    <IconBox
                      icon={Icon}
                      size="sm"
                      className="shadow-(--shadow-elevated) ring-1 ring-line-strong"
                    />
                    <span
                      data-node-label
                      className="font-mono text-[0.6rem] uppercase tracking-wider text-fg-subtle"
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
