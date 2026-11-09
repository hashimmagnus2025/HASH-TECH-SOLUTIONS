"use client";

import type { ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Wrap a single primary CTA to give it the magnetic pointer-follow feel
 * from the approved motion system. Reserved for primary CTAs only — don't
 * wrap every button, or the effect stops feeling special.
 */
export default function MagneticButton({ children, strength, className }: MagneticButtonProps) {
  const ref = useMagnetic<HTMLDivElement>(strength);
  return (
    <div ref={ref} className={className ?? "inline-block will-change-transform"}>
      {children}
    </div>
  );
}
