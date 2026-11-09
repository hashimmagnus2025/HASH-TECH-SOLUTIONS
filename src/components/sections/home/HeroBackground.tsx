"use client";

import { forwardRef, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Cinematic backdrop: a central "stage light" glow plus two off-axis
 * ambient blobs, all with an extremely slow, small-amplitude drift (not a
 * feature in itself — ambient depth). The whole layer's entrance opacity
 * is driven by Hero.tsx's master timeline via the forwarded ref; the drift
 * on individual blobs is a separate, independent, perpetual loop that
 * starts once mounted. Disabled entirely under reduced motion.
 */
const HeroBackground = forwardRef<HTMLDivElement>(function HeroBackground(_props, ref) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const blobARef = useRef<HTMLDivElement | null>(null);
  const blobBRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

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
      gsap.to(stageRef.current, {
        scale: 1.08,
        duration: 14,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      <div
        ref={stageRef}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(55,230,196,0.16),transparent_60%)]"
      />
      <div
        ref={blobARef}
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(47,99,224,0.28),transparent_55%)]"
      />
      <div
        ref={blobBRef}
        className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(55,230,196,0.18),transparent_50%)]"
      />
    </div>
  );
});

export default HeroBackground;
