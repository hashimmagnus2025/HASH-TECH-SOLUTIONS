import { cn } from "@/lib/utils";
export default function Divider({
  label,
  className,
  tone = "dark"
}) {
  const lineColor = tone === "light" ? "bg-paper-line" : "bg-line";
  if (!label) {
    return <div role="separator" className={cn("h-px w-full", lineColor, className)} />;
  }
  return <div role="separator" className={cn("flex items-center gap-4", className)}>
      <span className={cn("h-px flex-1", lineColor)} />
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">{label}</span>
      <span className={cn("h-px flex-1", lineColor)} />
    </div>;
}
