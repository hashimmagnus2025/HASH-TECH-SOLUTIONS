"use client";

import type { ReactNode } from "react";
import { useScrollReveal, type ScrollRevealOptions } from "@/hooks/useScrollReveal";

interface RevealProps extends ScrollRevealOptions {
  children: ReactNode;
  className?: string;
}

/** Declarative wrapper around useScrollReveal for simple one-off cases. */
export default function Reveal({ children, className, ...options }: RevealProps) {
  const ref = useScrollReveal<HTMLDivElement>(options);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
