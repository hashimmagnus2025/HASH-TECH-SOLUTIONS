"use client";

import type { ReactNode } from "react";
import { useStagger, type StaggerOptions } from "@/hooks/useStagger";

interface StaggerGroupProps extends StaggerOptions {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a row/grid of cards — every direct child staggers in on scroll.
 * Used for service, product, industry and project card grids.
 */
export default function StaggerGroup({ children, className, ...options }: StaggerGroupProps) {
  const ref = useStagger<HTMLDivElement>(options);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
