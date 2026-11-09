import type { ServiceItem } from "@/types";
import IconBox from "@/components/ui/IconBox";
import Badge from "@/components/ui/Badge";
import ArrowButton from "@/components/ui/ArrowButton";

export default function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon;

  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 transition-[color,background-color,border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-surface-hover hover:shadow-(--shadow-elevated)">
      <div className="flex items-center justify-between">
        <IconBox icon={Icon} size="sm" />
        <Badge>{service.id.toUpperCase()}</Badge>
      </div>
      <h3 className="font-display text-lg font-medium text-fg">{service.name}</h3>
      <p className="text-sm leading-relaxed text-fg-muted">{service.shortDescription}</p>
      <ArrowButton href={`/services/${service.slug}`} className="mt-auto">
        Learn more
      </ArrowButton>
    </div>
  );
}
