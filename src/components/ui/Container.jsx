import { cn } from "@/lib/utils";
export default function Container({
  as: Tag = "div",
  children,
  className
}) {
  return <Tag className={cn("mx-auto w-full max-w-[90rem] px-6 md:px-10 lg:px-16", className)}>
      {children}
    </Tag>;
}
