"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * A thin bar fixed at the very top of the viewport — above the navbar's
 * own top edge (z-60 vs the navbar's z-50) — that fills left-to-right
 * as the page scrolls. Kept active under prefers-reduced-motion too,
 * unlike this codebase's other ScrollTrigger effects: it has no
 * independent motion of its own, `scaleX` mirrors scroll position 1:1
 * with no easing/smoothing, so it's informational rather than animated.
 */
export default function ScrollProgressIndicator() {
  const barRef = useRef(null);
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    gsap.set(bar, {
      scaleX: 0,
      transformOrigin: "left center"
    });
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: self => {
        gsap.set(bar, {
          scaleX: self.progress
        });
      }
    });
    return () => {
      trigger.kill();
    };
  }, []);
  return <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-60 h-[3px] bg-line/40">
      <div ref={barRef} className="h-full w-full bg-[linear-gradient(90deg,var(--color-primary),var(--color-accent))]" />
    </div>;
}
