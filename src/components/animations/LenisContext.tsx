"use client";

import { createContext } from "react";
import type Lenis from "lenis";

/**
 * A ref object rather than the raw instance: no component needs to
 * re-render when Lenis becomes available, so it's mutated imperatively in
 * SmoothScrollProvider's effect instead of going through React state.
 */
export const LenisContext = createContext<{ current: Lenis | null }>({ current: null });
