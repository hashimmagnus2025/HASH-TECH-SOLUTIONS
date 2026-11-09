import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
const toneClasses = {
  dark: "bg-ink text-fg",
  light: "bg-paper text-ink-fg",
  raised: "bg-surface text-fg"
};

/**
 * Standardizes the vertical rhythm and background/border treatment shared
 * by every homepage and page section, so individual sections only need to
 * define their own content.
 */
export default function Section({
  id,
  tone = "dark",
  border = true,
  containerClassName,
  className,
  children
}) {
  return <section id={id} className={cn("py-20 md:py-28", toneClasses[tone], border && (tone === "light" ? "border-t border-paper-line" : "border-t border-line"), className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>;
}
