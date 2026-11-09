import Link from "next/link";
import { cn } from "@/lib/utils";
const variantClasses = {
  // Darkens on hover (not primary-bright) — lightening would push the
  // white-on-primary text contrast below WCAG AA; darkening improves it.
  primary: "bg-primary text-fg shadow-(--shadow-glow-primary) hover:-translate-y-0.5 hover:bg-primary-dim hover:shadow-[0_28px_60px_-16px_rgba(47,99,224,0.55)]",
  secondary: "border border-line-strong bg-surface-raised text-fg hover:bg-surface-hover",
  outline: "border border-line-strong text-fg hover:border-accent hover:text-accent",
  ghost: "text-fg-muted hover:text-fg",
  signal: "bg-signal text-ink-fg shadow-[0_18px_40px_-16px_rgba(255,179,71,0.55)] hover:-translate-y-0.5 hover:bg-signal-dim hover:shadow-[0_28px_60px_-16px_rgba(255,179,71,0.6)]"
};
const sizeClasses = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base"
};
const baseClasses = "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[color,background-color,border-color,transform,box-shadow] duration-200 whitespace-nowrap active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
export default function Button({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  href,
  ...rest
}) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
  if (href) {
    const {
      target,
      rel
    } = rest;
    return <Link href={href} target={target} rel={rel} className={classes}>
        {children}
        {icon && <span className="inline-flex transition-transform duration-200 group-hover:translate-x-0.5">
            {icon}
          </span>}
      </Link>;
  }
  return <button className={classes} {...rest}>
      {children}
      {icon && <span className="inline-flex transition-transform duration-200 group-hover:translate-x-0.5">
          {icon}
        </span>}
    </button>;
}
