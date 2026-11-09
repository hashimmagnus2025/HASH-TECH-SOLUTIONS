"use client";

import { useStagger } from "@/hooks/useStagger";
/**
 * Wraps a row/grid of cards — every direct child staggers in on scroll.
 * Used for service, product, industry and project card grids.
 */
export default function StaggerGroup({
  children,
  className,
  ...options
}) {
  const ref = useStagger(options);
  return <div ref={ref} className={className}>
      {children}
    </div>;
}
