"use client";

import { forwardRef, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const PARTICLES = [
  { x: 10, y: 15, size: 3, hideOnMobile: false },
  { x: 32, y: 8, size: 2, hideOnMobile: true },
  { x: 55, y: 18, size: 2.5, hideOnMobile: false },
  { x: 70, y: 30, size: 2, hideOnMobile: true },
  { x: 88, y: 20, size: 3, hideOnMobile: false },
  { x: 95, y: 42, size: 2, hideOnMobile: true },
  { x: 8, y: 50, size: 2.5, hideOnMobile: false },
  { x: 25, y: 65, size: 2, hideOnMobile: true },
  { x: 45, y: 90, size: 3, hideOnMobile: false },
  { x: 65, y: 70, size: 2, hideOnMobile: true },
  { x: 85, y: 85, size: 2.5, hideOnMobile: false },
  { x: 50, y: 5, size: 2, hideOnMobile: true },
];

/**
 * Lightweight floating particles — plain positioned divs, not a canvas
 * particle system. Entrance (fade + scale) is driven by Hero.tsx's master
 * timeline via `[data-particle]`; the gentle perpetual bob afterward is
 * self-contained here, same pattern as HeroBackground's ambient drift.
 */
const HeroParticles = forwardRef<HTMLDivElement>(function HeroParticles(_props, ref) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = innerRef.current;
    if (!container || reducedMotion) return;

    const dots = Array.from(container.querySelectorAll<HTMLSpanElement>("[data-particle]"));
    const ctx = gsap.context(() => {
      dots.forEach((dot, index) => {
        gsap.to(dot, {
          y: index % 2 === 0 ? -10 : 10,
          duration: 4 + (index % 5),
          delay: index * 0.15,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={(node) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      aria-hidden
      className="pointer-events-none absolute inset-0"
    >
      {PARTICLES.map((particle, index) => (
        <span
          key={index}
          data-particle
          className={particle.hideOnMobile ? "absolute hidden rounded-full bg-accent opacity-0 blur-[1px] sm:block" : "absolute rounded-full bg-accent opacity-0 blur-[1px]"}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            boxShadow: "0 0 8px 1px rgba(55, 230, 196, 0.6)",
          }}
        />
      ))}
    </div>
  );
});

export default HeroParticles;
