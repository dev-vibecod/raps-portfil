import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Info, Lightbulb } from "lucide-react";
import { projects, profile } from "@/data/content";
import { projectDetails } from "@/data/projectDetails";
import Reveal from "@/components/Reveal";
import ProjectMockup from "@/components/mockups/ProjectMockup";
import ArchFlow from "@/components/detail/ArchFlow";
import BackendInfo from "@/components/detail/BackendInfo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.summary,
  };
}

function Block({ index, label, title, children }) {
  return (
    <section className="border-t border-white/8 py-12 md:py-16">
      <Reveal>
        <p className="eyebrow flex items-center gap-3">
          <span className="text-mist/50">{index}</span>
          <span className="h-px w-8 bg-iris-500/50" />
          {label}
        </p>
        {title && <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>}
      </Reveal>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function ProjectPage({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  const extra = projectDetails[params.slug];
  if (!project || !extra) notFound();

  const { detail, mockup } = extra;
  const idx = projects.findIndex((p) => p.slug === params.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      {/* slim header */}
      <header className="sticky top-0 z-50 border-b border-white/8 bg-ink-900/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5 sm:px-8">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-mist/70 transition-colors hover:text-white">
            <ArrowLeft size={16} /> All projects
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-iris-500/20 text-sm font-semibold text-iris-400 ring-1 ring-iris-500/40">R</span>
            <span className="hidden text-sm font-semibold text-white sm:inline">Rafif A.W.</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-8 pt-12 sm:px-8 md:pt-16">
        {/* title */}
        <Reveal>
          <span className="text-[11px] font-medium uppercase tracking-wider text-iris-400/80">{project.industry}</span>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist/75">{detail.overview}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-mist/70">{s}</span>
            ))}
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-amber-500/25 bg-amber-500/8 px-3.5 py-2 text-[12.5px] text-amber-200/90">
            <Info size={15} className="shrink-0" />
            Representative reconstruction — the real product is private. UI, endpoints & architecture below are illustrative.
          </div>
        </Reveal>

        {/* Frontend */}
        <Block index="01" label="Frontend" title="Interface">
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-card">
            <ProjectMockup mockup={mockup} />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-mist/75">{detail.frontend.blurb}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {detail.frontend.features.map((f) => (
              <li key={f} className="flex gap-2.5 text-[13.5px] text-mist/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-iris-500" />
                {f}
              </li>
            ))}
          </ul>
        </Block>

        {/* Architecture */}
        <Block index="02" label="Architecture" title="How it fits together">
          <ArchFlow architecture={detail.architecture} />
        </Block>

        {/* Backend */}
        <Block index="03" label="Backend" title="APIs & data">
          <BackendInfo backend={detail.backend} />
        </Block>

        {/* Problem / Built / Outcome (dossier-true) */}
        <Block index="04" label="In brief" title="Problem, build & outcome">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { k: "Problem", v: project.problem },
              { k: "What I built", v: project.built },
              { k: "Outcome", v: project.outcome },
            ].map((b) => (
              <div key={b.k} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                <p className="eyebrow">{b.k}</p>
                <p className="mt-2 text-sm leading-relaxed text-mist/75">{b.v}</p>
              </div>
            ))}
          </div>
        </Block>

        {/* Decisions */}
        <Block index="05" label="Engineering" title="Key decisions">
          <ul className="space-y-3">
            {detail.decisions.map((d) => (
              <li key={d} className="flex gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <Lightbulb size={17} className="mt-0.5 shrink-0 text-iris-400" />
                <span className="text-sm leading-relaxed text-mist/75">{d}</span>
              </li>
            ))}
          </ul>
        </Block>

        {/* footer nav */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-10 sm:flex-row">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-mist/70 transition-colors hover:text-white">
            <ArrowLeft size={16} /> Back to all projects
          </Link>
          <Link href={`/projects/${next.slug}`} className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-iris-500/50 hover:bg-white/5">
            Next: {next.title.split(" — ")[0]}
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </main>

      <footer className="border-t border-white/8 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-xs text-mist/45 sm:flex-row">
          <p>© 2026 {profile.name}. All rights reserved.</p>
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-iris-400">{profile.email}</a>
        </div>
      </footer>
    </>
  );
}
