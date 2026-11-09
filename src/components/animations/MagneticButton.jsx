"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
/**
 * Wrap a single primary CTA to give it the magnetic pointer-follow feel
 * from the approved motion system. Reserved for primary CTAs only — don't
 * wrap every button, or the effect stops feeling special.
 */
export default function MagneticButton({
  children,
  strength,
  className
}) {
  const ref = useMagnetic(strength);
  return <div ref={ref} className={className ?? "inline-block will-change-transform"}>
      {children}
    </div>;
}
