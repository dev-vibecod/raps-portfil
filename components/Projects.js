import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ProjectMockup from "./mockups/ProjectMockup";
import { projects } from "@/data/content";
import { projectDetails } from "@/data/projectDetails";

function Card({ project, delay }) {
  const mockup = projectDetails[project.slug]?.mockup;
  return (
    <Reveal delay={delay}>
      <Link
        href={`/projects/${project.slug}`}
        className="glass glass-hover group flex h-full flex-col overflow-hidden rounded-3xl p-4"
      >
        <div className="relative overflow-hidden rounded-xl ring-1 ring-white/8">
          {mockup ? (
            <div className="pointer-events-none">
              <ProjectMockup mockup={mockup} />
            </div>
          ) : (
            <div className="aspect-[16/10] w-full bg-ink-700" />
          )}
          <span className="absolute left-2 top-2 z-10 rounded-md bg-ink-900/80 px-2 py-1 text-[10px] font-medium text-mist/70 ring-1 ring-white/10 backdrop-blur">
            Representative mockup
          </span>
        </div>

        <div className="flex flex-1 flex-col px-1 pt-4">
          <span className="text-[11px] font-medium uppercase tracking-wider text-iris-400/80">
            {project.industry}
          </span>
          <h3 className="mt-2 text-lg font-semibold leading-snug text-white">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist/60">{project.summary}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((s) => (
              <span key={s} className="rounded-full border border-white/8 bg-white/[0.03] px-2 py-0.5 text-[11px] text-mist/60">
                {s}
              </span>
            ))}
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-iris-400">
            View case study
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        index="03"
        eyebrow="Selected work"
        title="Featured"
        accent="projects."
        sub="End-to-end products delivered as freelance work, each owned from problem definition through deployment. Repositories are private; each case study uses a representative mockup."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Card key={p.slug} project={p} delay={(i % 3) * 0.06} />
        ))}
      </div>
    </section>
  );
}
