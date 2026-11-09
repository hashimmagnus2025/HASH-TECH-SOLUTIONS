"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A soft accent-colored glow that follows the pointer anywhere on the
 * site — mounted once in app/layout.tsx, not per-page. This is the
 * sitewide "it's alive" cue for everything outside the hero's own
 * dedicated scene: fine-pointer only, reduced-motion skips it entirely,
 * and it never intercepts clicks (pointer-events: none throughout).
 */
export default function CursorGlow() {
  const glowRef = useRef(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || reducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const quickX = gsap.quickTo(glow, "x", {
      duration: 0.5,
      ease: "power3.out"
    });
    const quickY = gsap.quickTo(glow, "y", {
      duration: 0.5,
      ease: "power3.out"
    });
    const onMove = event => {
      quickX(event.clientX);
      quickY(event.clientY);
    };
    gsap.set(glow, {
      opacity: 0
    });
    const onEnter = () => gsap.to(glow, {
      opacity: 1,
      duration: 0.4
    });
    const onLeave = () => gsap.to(glow, {
      opacity: 0,
      duration: 0.4
    });
    window.addEventListener("pointermove", onMove);
    document.body.addEventListener("pointerenter", onEnter);
    document.body.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.body.removeEventListener("pointerenter", onEnter);
      document.body.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(glow);
    };
  }, [reducedMotion]);
  return <div ref={glowRef} aria-hidden className="pointer-events-none fixed left-0 top-0 z-55 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 mix-blend-screen" style={{
    background: "radial-gradient(circle, rgba(55,230,196,0.16), rgba(47,99,224,0.08) 45%, transparent 70%)"
  }} />;
}
