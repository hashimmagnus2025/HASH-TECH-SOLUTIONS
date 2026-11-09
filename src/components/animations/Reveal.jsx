"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
/** Declarative wrapper around useScrollReveal for simple one-off cases. */
export default function Reveal({
  children,
  className,
  ...options
}) {
  const ref = useScrollReveal(options);
  return <div ref={ref} className={className}>
      {children}
    </div>;
}
