import { cn } from "@/lib/utils";
const toneClasses = {
  dark: {
    border: "border-line-strong",
    pendingBorder: "border-line-strong",
    pendingLabel: "text-fg-subtle",
    pendingSub: "text-fg-subtle",
    value: "text-fg",
    label: "text-fg-muted"
  },
  light: {
    border: "border-paper-line",
    pendingBorder: "border-ink-fg-muted/30",
    pendingLabel: "text-ink-fg-muted",
    pendingSub: "text-ink-fg-muted",
    value: "text-ink-fg",
    label: "text-ink-fg-muted"
  }
};

/**
 * Never fabricates a number. Pass `value` only once it's a confirmed,
 * real business figure — until then this renders an honest "pending"
 * placeholder rather than an invented statistic.
 */
export default function StatBlock({
  value,
  label,
  suffix,
  tone = "dark",
  className
}) {
  const t = toneClasses[tone];
  if (value === undefined || value === null) {
    return <div className={cn("flex flex-col gap-1.5 border-l border-dashed pl-4", t.pendingBorder, className)}>
        <span className={cn("font-mono text-xs uppercase tracking-[0.15em]", t.pendingLabel)}>
          Awaiting confirmed figure
        </span>
        <span className={cn("text-sm", t.pendingSub)}>{label}</span>
      </div>;
  }
  return <div className={cn("flex flex-col gap-1.5 border-l pl-4", t.border, className)}>
      <span className={cn("font-display text-3xl font-semibold [font-variant-numeric:tabular-nums]", t.value)}>
        {value}
        {suffix && <span className="text-accent">{suffix}</span>}
      </span>
      <span className={cn("text-sm", t.label)}>{label}</span>
    </div>;
}
