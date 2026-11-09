import { cn } from "@/lib/utils";
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className
}) {
  const isLight = tone === "light";
  return <div className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      {eyebrow && <span className={cn("font-mono text-xs uppercase tracking-[0.2em]", isLight ? "text-ink-fg-muted" : "text-fg-subtle")}>
          {eyebrow}
        </span>}
      <h2 className={cn("font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl md:text-5xl", isLight ? "text-ink-fg" : "text-fg")}>
        {title}
      </h2>
      {description && <p className={cn("max-w-2xl text-base leading-relaxed sm:text-lg", isLight ? "text-ink-fg-muted" : "text-fg-muted")}>
          {description}
        </p>}
    </div>;
}
