import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArrowButtonProps {
  href: string;
  children: ReactNode;
  tone?: "accent" | "fg";
  className?: string;
}

const toneClasses: Record<NonNullable<ArrowButtonProps["tone"]>, string> = {
  accent: "text-accent",
  fg: "text-fg",
};

/**
 * A text-weight link with an arrow that steps forward on hover — for
 * in-flow "view more" affordances (card footers, list rows) where a full
 * Button would be too heavy.
 */
export default function ArrowButton({ href, children, tone = "accent", className }: ArrowButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium transition-colors",
        toneClasses[tone],
        className
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}
