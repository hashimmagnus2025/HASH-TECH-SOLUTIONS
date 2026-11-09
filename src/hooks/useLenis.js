"use client";

import { useContext } from "react";
import { LenisContext } from "@/components/animations/LenisContext";

/**
 * Returns a ref object whose `.current` is the active Lenis instance (or
 * null while reduced-motion is on, before mount, or after unmount). Read
 * it imperatively inside event handlers, e.g.
 * `useLenis().current?.scrollTo("#section")` — it intentionally does not
 * trigger a re-render when the instance appears, since nothing needs to
 * render differently based on it.
 */
export function useLenis() {
  return useContext(LenisContext);
}
