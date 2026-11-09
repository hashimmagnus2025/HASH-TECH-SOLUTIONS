"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface StaggerOptions {
  /** Pixels each child travels while fading in. Default 24. */
  y?: number;
  /** Duration per child, in seconds. Default 0.6. */
  duration?: number;
  /** Delay between each child's animation start, in seconds. Default 0.08. */
  stagger?: number;
  /** ScrollTrigger `start` position. Default "top 85%". */
  start?: string;
}

/**
 * Animates the direct children of the returned ref's element in with a
 * staggered fade + rise, triggered once the container scrolls into view.
 * Shared by any grid/list of cards so stagger timing stays consistent
 * across the site instead of being re-tuned per section.
 */
export function useStagger<T extends HTMLElement>(options: StaggerOptions = {}): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();
  const { y = 24, duration = 0.6, stagger = 0.08, start = "top 85%" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = Array.from(el.children);
    if (children.length === 0) return;

    if (reducedMotion) {
      gsap.set(children, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
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
  }, [reducedMotion, y, duration, stagger, start]);

  return ref;
}
