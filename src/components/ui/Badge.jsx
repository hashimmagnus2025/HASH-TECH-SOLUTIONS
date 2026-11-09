import { cn } from "@/lib/utils";
const outlineTones = {
  accent: "border-line-strong text-accent",
  signal: "border-signal/40 text-signal",
  muted: "border-line-strong text-fg-subtle"
};
const solidTones = {
  accent: "bg-accent text-ink-fg",
  signal: "bg-signal text-ink-fg",
  muted: "bg-surface-raised text-fg-muted"
};
export default function Badge({
  children,
  variant = "outline",
  tone = "accent",
  className
}) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.1em]", variant === "outline" ? cn("border", outlineTones[tone]) : solidTones[tone], className)}>
      {children}
    </span>;
}
