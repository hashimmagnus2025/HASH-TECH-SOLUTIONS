import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

type IconBoxSize = "sm" | "md" | "lg";
type IconBoxTone = "accent" | "primary" | "muted";

interface IconBoxProps {
  icon: ComponentType<{ className?: string }>;
  size?: IconBoxSize;
  tone?: IconBoxTone;
  className?: string;
}

const sizeClasses: Record<IconBoxSize, { box: string; icon: string }> = {
  sm: { box: "h-9 w-9 rounded-lg", icon: "h-4 w-4" },
  md: { box: "h-11 w-11 rounded-xl", icon: "h-5 w-5" },
  lg: { box: "h-14 w-14 rounded-2xl", icon: "h-6 w-6" },
};

const toneClasses: Record<IconBoxTone, string> = {
  accent: "text-accent",
  primary: "text-primary-bright",
  muted: "text-fg-muted",
};

export default function IconBox({ icon: Icon, size = "md", tone = "accent", className }: IconBoxProps) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center bg-surface-raised transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110",
        sizeClasses[size].box,
        toneClasses[tone],
        className
      )}
    >
      <Icon className={sizeClasses[size].icon} aria-hidden />
    </span>
  );
}
