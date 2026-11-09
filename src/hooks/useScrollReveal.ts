"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface ScrollRevealOptions {
  /** Pixels the element travels while fading in. Default 32. */
  y?: number;
  /** Animation duration in seconds. Default 0.8. */
  duration?: number;
  /** Delay before the animation starts, in seconds. Default 0. */
  delay?: number;
  /** ScrollTrigger `start` position. Default "top 85%". */
  start?: string;
}

/**
 * Attaches a one-time scroll-triggered fade + rise reveal to the returned
 * ref's element. Shared by section components so every scroll reveal on the
 * site uses the same easing/timing language instead of ad-hoc tweens.
 *
 * Under prefers-reduced-motion the element is simply set visible with no
 * animation or ScrollTrigger registered.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();
  const { y = 32, duration = 0.8, delay = 0, start = "top 85%" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === el) trigger.kill();
      });
    };
  }, [reducedMotion, y, duration, delay, start]);

  return ref;
}
