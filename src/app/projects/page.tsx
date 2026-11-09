import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Section from "@/components/ui/Section";
import Reveal from "@/components/animations/Reveal";
import TextReveal from "@/components/animations/TextReveal";
import StaggerGroup from "@/components/animations/StaggerGroup";
import ProjectCard from "@/components/business/ProjectCard";
import EnquiryCta from "@/components/business/EnquiryCta";
import { demoProjects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "A preview of the HashTech Solutions projects/case-studies layout using clearly labeled demo content, pending real case studies.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <section className="border-b border-line pb-16 pt-10">
        <Container className="flex flex-col gap-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Projects" }]} />
          <div className="flex flex-col gap-5">
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                Projects
              </span>
            </Reveal>
            <TextReveal
              as="h1"
              text="Case studies"
              className="max-w-3xl font-display text-4xl font-medium leading-tight text-fg sm:text-5xl"
            />
            <Reveal delay={0.15}>
              <p className="max-w-2xl text-lg leading-relaxed text-fg-muted">
                This page&apos;s layout is built and ready — the entries below are
                clearly labeled demo content, not real completed work.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="flex items-start gap-3 rounded-2xl border border-signal/30 bg-surface p-5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-signal" aria-hidden />
            <p className="text-sm leading-relaxed text-fg-muted">
              Every project below is placeholder content for layout purposes only. No
              customer names, locations or project details here are real — genuine
              case studies will replace these once available.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section tone="dark">
        <StaggerGroup className="flex flex-col gap-6">
          {demoProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </StaggerGroup>
      </Section>

      <EnquiryCta
        title="Want your project featured here?"
        description="Once work is completed and approved for sharing, it replaces one of these placeholders."
      />
    </>
  );
}
