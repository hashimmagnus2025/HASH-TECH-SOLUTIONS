"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Pulls the returned ref's element toward the pointer within its own
 * bounds and eases it back on leave. Reserved for primary CTAs only, per
 * the approved motion system — not every button should feel magnetic.
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const onMove = event => {
      const rect = el.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      gsap.to(el, {
        x: relX * strength,
        y: relY * strength,
        duration: 0.4,
        ease: "power3.out"
      });
    };
    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power3.out"
      });
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.set(el, {
        x: 0,
        y: 0
      });
    };
  }, [reducedMotion, strength]);
  return ref;
}
