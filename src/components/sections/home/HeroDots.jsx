"use client";

import { forwardRef, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
const DOTS = [{
  x: 6,
  y: 12,
  size: 2
}, {
  x: 13,
  y: 28,
  size: 1.5
}, {
  x: 4,
  y: 48,
  size: 2.5
}, {
  x: 10,
  y: 68,
  size: 1.5
}, {
  x: 5,
  y: 86,
  size: 2
}, {
  x: 22,
  y: 8,
  size: 1.5
}, {
  x: 30,
  y: 90,
  size: 2
}, {
  x: 40,
  y: 15,
  size: 1.5
}, {
  x: 46,
  y: 92,
  size: 1.5
}, {
  x: 58,
  y: 10,
  size: 2
}, {
  x: 64,
  y: 30,
  size: 1.5
}, {
  x: 72,
  y: 6,
  size: 2.5
}, {
  x: 78,
  y: 22,
  size: 1.5
}, {
  x: 85,
  y: 40,
  size: 2
}, {
  x: 92,
  y: 18,
  size: 1.5
}, {
  x: 95,
  y: 56,
  size: 2.5
}, {
  x: 88,
  y: 70,
  size: 1.5
}, {
  x: 94,
  y: 88,
  size: 2
}, {
  x: 80,
  y: 85,
  size: 1.5
}, {
  x: 68,
  y: 94,
  size: 2
}, {
  x: 54,
  y: 48,
  size: 1.5
}, {
  x: 36,
  y: 60,
  size: 1.5
}, {
  x: 24,
  y: 76,
  size: 2
}, {
  x: 16,
  y: 94,
  size: 1.5
}, {
  x: 90,
  y: 8,
  size: 1.5
}, {
  x: 60,
  y: 62,
  size: 1.5
}];

/**
 * A quiet scatter of small white dots behind the hero's typography — not
 * the hero's main visual (that's still the headline), just ambient
 * texture. Only animates `opacity` for the entrance (driven by Hero.tsx's
 * master timeline via `[data-dot]`) and only `y` for the continuous drift
 * started here — different properties, so the two never fight for
 * control of the same tween.
 */
const HeroDots = forwardRef(function HeroDots(_props, ref) {
  const innerRef = useRef(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const container = innerRef.current;
    if (!container || reducedMotion) return;
    const dots = Array.from(container.querySelectorAll("[data-dot]"));
    const ctx = gsap.context(() => {
      dots.forEach((dot, index) => {
        gsap.to(dot, {
          y: index % 2 === 0 ? -10 : 10,
          duration: 5 + index % 4,
          delay: index * 0.12,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      });
    });
    return () => ctx.revert();
  }, [reducedMotion]);
  return <div ref={node => {
    innerRef.current = node;
    if (typeof ref === "function") ref(node);else if (ref) ref.current = node;
  }} aria-hidden className="pointer-events-none absolute inset-0">
      {DOTS.map((dot, index) => <span key={index} data-dot className="absolute rounded-full bg-fg" style={{
      left: `${dot.x}%`,
      top: `${dot.y}%`,
      width: dot.size,
      height: dot.size,
      opacity: 0.55,
      boxShadow: "0 0 6px 1px rgba(245,247,251,0.45)"
    }} />)}
    </div>;
});
export default HeroDots;
