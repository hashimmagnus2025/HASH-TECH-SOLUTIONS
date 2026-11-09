import Image from "next/image";
import type { ProjectItem } from "@/types";
import { getServiceCategory } from "@/data/service-categories";
import Badge from "@/components/ui/Badge";
import ImageReveal from "@/components/animations/ImageReveal";

export default function ProjectCard({ project }: { project: ProjectItem }) {
  const category = getServiceCategory(project.category);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-accent/50 hover:shadow-(--shadow-elevated) sm:flex-row">
      <ImageReveal className="relative aspect-16/10 w-full sm:aspect-auto sm:w-80 sm:shrink-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {project.isDemoContent && (
          <Badge tone="signal" className="absolute left-3 top-3 bg-ink/80">
            Demo Content
          </Badge>
        )}
      </ImageReveal>
      <div className="flex flex-1 flex-col gap-3 p-6">
        {category && (
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.15em] text-fg-subtle">
            {category.name}
          </span>
        )}
        <h3 className="font-display text-xl font-medium text-fg">{project.title}</h3>
        <p className="text-sm leading-relaxed text-fg-muted">{project.description}</p>
      </div>
    </div>
  );
}
