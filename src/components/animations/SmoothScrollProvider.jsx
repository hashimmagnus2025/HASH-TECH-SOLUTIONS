"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LenisContext } from "@/components/animations/LenisContext";
export default function SmoothScrollProvider({
  children
}) {
  const lenisRef = useRef(null);
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const instance = new Lenis({
      duration: 1.1,
      smoothWheel: true
    });
    instance.on("scroll", ScrollTrigger.update);
    const onTick = time => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    lenisRef.current = instance;
    return () => {
      instance.destroy();
      gsap.ticker.remove(onTick);
      lenisRef.current = null;
    };
  }, []);
  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
