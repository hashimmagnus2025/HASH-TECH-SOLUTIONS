import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
export default function Select({
  className,
  children,
  ...props
}) {
  return <div className="relative">
      <select className={cn("w-full appearance-none rounded-lg border border-line-strong bg-surface px-4 py-2.5 text-sm text-fg transition-colors focus:border-accent focus:outline-none", className)} {...props}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" aria-hidden />
    </div>;
}
