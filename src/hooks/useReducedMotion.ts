"use client";

import { useEffect, useState } from "react";

function getInitialValue() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Tracks `prefers-reduced-motion` reactively, for components that need to
 * branch animation logic in JS rather than relying on CSS alone (e.g.
 * skipping a GSAP timeline instead of just shortening its duration).
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(getInitialValue);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
