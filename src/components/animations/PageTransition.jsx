"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Mounted fresh by app/template.tsx on every route change. Deliberately
 * transform-only, no opacity: almost every section already fades its own
 * content in via Reveal/TextReveal (their ScrollTriggers fire immediately
 * for above-the-fold elements), so an outer opacity tween here would
 * multiply against those and make the arrival read as a slower, muddier
 * double-fade. A small y-settle still gives navigation a tactile "the
 * page just arrived" cue without touching anything's opacity.
 */
export default function PageTransition({
  children
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const tween = gsap.fromTo(el, {
      y: 14
    }, {
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    });
    return () => {
      tween.kill();
    };
  }, [reducedMotion]);
  return <div ref={ref}>{children}</div>;
}
