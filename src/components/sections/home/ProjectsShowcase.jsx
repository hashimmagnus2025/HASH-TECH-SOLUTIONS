import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import StaggerGroup from "@/components/animations/StaggerGroup";
import ProjectCard from "@/components/business/ProjectCard";
import { demoProjects } from "@/data/projects";
export default function ProjectsShowcase() {
  return <Section tone="raised" id="projects">
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading eyebrow="Projects" title="Recent work" description="Layout preview using clearly labeled demo content — real project case studies replace these once available." />
        </Reveal>

        <StaggerGroup className="flex flex-col gap-6">
          {demoProjects.map(project => <ProjectCard key={project.id} project={project} />)}
        </StaggerGroup>
      </div>
    </Section>;
}
