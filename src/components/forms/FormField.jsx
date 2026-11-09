import { cn } from "@/lib/utils";
export default function FormField({
  label,
  htmlFor,
  required,
  error,
  children,
  className
}) {
  return <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-fg">
        {label}
        {required && <span className="ml-1 text-signal">*</span>}
      </label>
      {children}
      {error && <p role="alert" className="text-xs text-danger">
          {error}
        </p>}
    </div>;
}
