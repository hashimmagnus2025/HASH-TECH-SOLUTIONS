"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * The hero's visual is the product, not a stock photo of a server room:
 * five nodes — one per service category — converge on a central mark.
 * Draws itself in once on mount (the hero is above the fold, so this
 * triggers on load rather than on scroll), then drifts with a gentle
 * parallax as the page scrolls past it.
 */
export default function HeroTopology({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const reducedMotion = useReducedMotion();

  // Entrance: draw the edges in, pop the nodes, settle the center mark.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("[data-edge]"));
    const nodes = Array.from(svg.querySelectorAll<SVGCircleElement>("[data-node]"));
    const center = svg.querySelector<SVGCircleElement>("[data-center]");

    if (reducedMotion) {
      gsap.set(paths, { strokeDashoffset: 0, opacity: 0.85 });
      gsap.set(nodes, { opacity: 1, scale: 1 });
      gsap.set(center, { opacity: 1, scale: 1 });
      return;
    }

    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });
    gsap.set(nodes, { opacity: 0, scale: 0.4, transformOrigin: "center" });
    gsap.set(center, { opacity: 0, scale: 0.4, transformOrigin: "center" });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(paths, {
      strokeDashoffset: 0,
      opacity: 0.85,
      duration: 1,
      stagger: 0.12,
      ease: "power2.out",
    })
      .to(nodes, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.6)" }, "-=0.4")
      .to(center, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.8)" }, "-=0.2")
      .to(center, { scale: 1.18, duration: 0.6, ease: "power2.out" })
      .to(center, { scale: 1, duration: 0.6, ease: "power2.inOut" });

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  // Gentle parallax: the whole diagram drifts slower than the page scrolls
  // past the hero, reinforcing depth without hijacking scroll.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(wrap, {
        y: 48,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === wrap) trigger.kill();
      });
    };
  }, [reducedMotion]);

  return (
    <div ref={wrapRef}>
      <svg
        ref={svgRef}
        viewBox="0 0 560 560"
        className={className}
        role="img"
        aria-label="Diagram of five technology service categories converging into one network"
      >
        <defs>
          <linearGradient id="hero-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2f63e0" />
            <stop offset="100%" stopColor="#37e6c4" />
          </linearGradient>
        </defs>

        <g fill="none" stroke="url(#hero-edge)" strokeWidth="1.6" strokeLinecap="round">
          <path data-edge d="M90 90 L280 230 L470 110" />
          <path data-edge d="M90 90 L170 420" />
          <path data-edge d="M280 230 L330 460" />
          <path data-edge d="M470 110 L480 380" />
          <path data-edge d="M170 420 L330 460 L480 380" />
        </g>

        <g>
          <circle data-node cx="90" cy="90" r="7" fill="#37e6c4" />
          <circle data-node cx="470" cy="110" r="7" fill="#37e6c4" />
          <circle data-node cx="170" cy="420" r="7" fill="#2f63e0" />
          <circle data-node cx="330" cy="460" r="7" fill="#2f63e0" />
          <circle data-node cx="480" cy="380" r="7" fill="#2f63e0" />
        </g>

        <circle data-center cx="280" cy="230" r="13" fill="#05070d" stroke="#f5f7fb" strokeWidth="2" />
      </svg>
    </div>
  );
}
