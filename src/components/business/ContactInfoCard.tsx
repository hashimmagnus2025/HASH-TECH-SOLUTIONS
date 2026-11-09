import type { ComponentType } from "react";
import IconBox from "@/components/ui/IconBox";

interface ContactInfoCardProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  /** Set for links that navigate off-site (e.g. wa.me) — opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
}

export default function ContactInfoCard({ icon, label, value, href, external }: ContactInfoCardProps) {
  const content = (
    <div className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors group-hover:border-accent/50">
      <IconBox icon={icon} size="sm" />
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.15em] text-fg-subtle">
          {label}
        </span>
        <span className="text-sm font-medium text-fg">{value}</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="group block"
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return content;
}
