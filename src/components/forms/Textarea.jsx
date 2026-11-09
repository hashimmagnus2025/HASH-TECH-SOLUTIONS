import { cn } from "@/lib/utils";
export default function Textarea({
  className,
  rows = 5,
  ...props
}) {
  return <textarea rows={rows} className={cn("rounded-lg border border-line-strong bg-surface px-4 py-2.5 text-sm text-fg placeholder:text-fg-subtle transition-colors focus:border-accent focus:outline-none", className)} {...props} />;
}
