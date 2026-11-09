"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface StaggerOptions {
  /** Pixels each child travels while fading in. Default 32. */
  y?: number;
  /** Starting scale before each child settles to 1. Default 0.92. */
  scale?: number;
  /** Duration per child, in seconds. Default 0.7. */
  duration?: number;
  /** Delay between each child's animation start, in seconds. Default 0.09. */
  stagger?: number;
  /** ScrollTrigger `start` position. Default "top 88%". */
  start?: string;
}

/**
 * Animates the direct children of the returned ref's element in with a
 * staggered fade + rise + scale-in, triggered once the container scrolls
 * into view. Shared by any grid/list of cards so stagger timing stays
 * consistent across the site instead of being re-tuned per section.
 */
export function useStagger<T extends HTMLElement>(options: StaggerOptions = {}): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();
  const { y = 32, scale = 0.92, duration = 0.7, stagger = 0.09, start = "top 88%" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = Array.from(el.children);
    if (children.length === 0) return;

    if (reducedMotion) {
      gsap.set(children, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { opacity: 0, y, scale, transformOrigin: "center bottom" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
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
  }, [reducedMotion, y, scale, duration, stagger, start]);

  return ref;
}
