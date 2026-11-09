import type { ButtonHTMLAttributes, ComponentType } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type IconButtonVariant = "outline" | "solid";
type IconButtonSize = "sm" | "md";

interface BaseProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  className?: string;
}

interface IconButtonAsLink extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
}

interface IconButtonAsButton
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  href?: undefined;
}

type IconButtonProps = IconButtonAsLink | IconButtonAsButton;

const sizeClasses: Record<IconButtonSize, { box: string; icon: string }> = {
  sm: { box: "h-9 w-9", icon: "h-4 w-4" },
  md: { box: "h-11 w-11", icon: "h-5 w-5" },
};

const variantClasses: Record<IconButtonVariant, string> = {
  outline: "border border-line-strong text-fg-muted hover:border-accent hover:text-accent",
  solid: "bg-surface-raised text-fg-muted hover:bg-surface-hover hover:text-fg",
};

/** Circular icon-only control — social links, carousel/testimonial controls, etc. */
export default function IconButton({
  icon: Icon,
  label,
  variant = "outline",
  size = "md",
  className,
  href,
  ...rest
}: IconButtonProps) {
  const classes = cn(
    "inline-flex shrink-0 items-center justify-center rounded-full transition-colors",
    sizeClasses[size].box,
    variantClasses[variant],
    className
  );

  if (href) {
    const { target, rel } = rest as IconButtonAsLink;
    return (
      <Link href={href} target={target} rel={rel} aria-label={label} className={classes}>
        <Icon className={sizeClasses[size].icon} />
      </Link>
    );
  }

  return (
    <button
      aria-label={label}
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <Icon className={sizeClasses[size].icon} />
    </button>
  );
}
