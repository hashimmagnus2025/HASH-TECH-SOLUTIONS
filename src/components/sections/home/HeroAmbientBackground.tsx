"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Two radial-gradient blobs with an extremely slow, small-amplitude drift —
 * ambient depth for the hero, not a feature. Kept deliberately subtle
 * (40px over 18s, yoyo) so it reads as "alive" rather than "animated."
 * Disabled entirely under reduced motion.
 */
export default function HeroAmbientBackground() {
  const blobARef = useRef<HTMLDivElement | null>(null);
  const blobBRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const targets = [blobARef.current, blobBRef.current].filter(Boolean);
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.to(blobARef.current, {
        x: 30,
        y: -20,
        duration: 18,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(blobBRef.current, {
        x: -24,
        y: 24,
        duration: 22,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <>
      <div
        ref={blobARef}
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(47,99,224,0.25),transparent_55%)]"
      />
      <div
        ref={blobBRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(55,230,196,0.16),transparent_50%)]"
      />
    </>
  );
}
