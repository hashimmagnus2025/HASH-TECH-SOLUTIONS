"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
/**
 * Attaches a one-time scroll-triggered fade + rise + scale-in reveal to
 * the returned ref's element. Shared by section components so every
 * scroll reveal on the site uses the same easing/timing language instead
 * of ad-hoc tweens.
 *
 * Under prefers-reduced-motion the element is simply set visible with no
 * animation or ScrollTrigger registered.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const {
    y = 40,
    scale = 0.94,
    duration = 0.9,
    delay = 0,
    start = "top 88%"
  } = options;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion) {
      gsap.set(el, {
        opacity: 1,
        y: 0,
        scale: 1
      });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(el, {
        opacity: 0,
        y,
        scale,
        transformOrigin: "center bottom"
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none"
        }
      });
    });
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === el) trigger.kill();
      });
    };
  }, [reducedMotion, y, scale, duration, delay, start]);
  return ref;
}
