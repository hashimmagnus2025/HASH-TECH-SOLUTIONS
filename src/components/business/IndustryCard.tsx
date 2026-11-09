import type { Industry } from "@/types";
import IconBox from "@/components/ui/IconBox";

export default function IndustryCard({ industry }: { industry: Industry }) {
  const Icon = industry.icon;

  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-(--shadow-elevated)">
      <IconBox icon={Icon} />
      <h3 className="font-display text-lg font-medium text-fg">{industry.name}</h3>
      <p className="text-sm leading-relaxed text-fg-muted">{industry.description}</p>
      <ul className="mt-2 flex flex-col gap-2">
        {industry.solutions.map((solution) => (
          <li key={solution} className="flex gap-2 text-sm text-fg-muted">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
            {solution}
          </li>
        ))}
      </ul>
    </div>
  );
}
