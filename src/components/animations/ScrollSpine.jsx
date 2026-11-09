"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
/**
 * A vertical line that grows downward (scaleY, transform-origin top) as its
 * parent container scrolls through the viewport — used behind timeline /
 * process steps so progress reads as "the line is reaching each step" as
 * you scroll, without pinning anything. Measures its own parentElement as
 * the ScrollTrigger target, so it just needs to sit inside the container
 * it should track.
 */
export default function ScrollSpine({
  className
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    const container = el?.parentElement;
    if (!el || !container) return;
    if (reducedMotion) {
      gsap.set(el, {
        scaleY: 1
      });
      return;
    }
    gsap.set(el, {
      scaleY: 0,
      transformOrigin: "top"
    });
    const ctx = gsap.context(() => {
      gsap.to(el, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          end: "bottom 65%",
          scrub: true
        }
      });
    });
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) trigger.kill();
      });
    };
  }, [reducedMotion]);
  return <div ref={ref} className={className} />;
}
