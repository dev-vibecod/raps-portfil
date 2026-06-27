import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Info, Lightbulb } from "lucide-react";
import { isLocale, getDict, locales } from "@/lib/i18n";
import { getProject, allSlugs } from "@/lib/content";
import { projects as rawProjects, profile } from "@/data/content";
import { pick } from "@/lib/i18n";
import Reveal from "@/components/Reveal";
import ProjectMockup from "@/components/mockups/ProjectMockup";
import ArchFlow from "@/components/detail/ArchFlow";
import BackendInfo from "@/components/detail/BackendInfo";

export function generateStaticParams() {
  return locales.flatMap((lang) => allSlugs.map((slug) => ({ lang, slug })));
}

export function generateMetadata({ params }) {
  const lang = isLocale(params.lang) ? params.lang : "id";
  const project = getProject(params.slug, lang);
  if (!project) return {};
  const sub = `projects/${params.slug}`;
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.summary,
    alternates: {
      canonical: `/${lang}/${sub}`,
      languages: { id: `/id/${sub}`, en: `/en/${sub}`, "x-default": `/id/${sub}` },
    },
    openGraph: { title: project.title, description: project.summary, url: `/${lang}/${sub}`, type: "article" },
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
  const lang = isLocale(params.lang) ? params.lang : "id";
  const dict = getDict(lang);
  const project = getProject(params.slug, lang);
  if (!project) notFound();

  const { detail, mockup } = project;
  const d = dict.detail;
  const idx = allSlugs.indexOf(params.slug);
  const nextSlug = allSlugs[(idx + 1) % allSlugs.length];
  const nextProject = rawProjects.find((p) => p.slug === nextSlug);
  const nextTitle = nextProject.title.split(" — ")[0];

  return (
    <main className="mx-auto max-w-5xl px-5 pb-8 pt-28 sm:px-8 md:pt-32">
      <Reveal>
        <Link href={`/${lang}/projects`} className="inline-flex items-center gap-2 text-sm text-mist/70 transition-colors hover:text-white">
          <ArrowLeft size={16} /> {dict.common.allProjects}
        </Link>
        <span className="mt-6 block text-[11px] font-medium uppercase tracking-wider text-iris-400/80">{project.industry}</span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist/75">{detail.overview}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-mist/70">{s}</span>
          ))}
        </div>
        <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-amber-500/25 bg-amber-500/8 px-3.5 py-2 text-[12.5px] text-amber-200/90">
          <Info size={15} className="shrink-0" /> {d.banner}
        </div>
      </Reveal>

      <Block index="01" label={d.frontend.label} title={d.frontend.title}>
        <div className="overflow-hidden rounded-2xl border border-white/10 shadow-card">
          <ProjectMockup mockup={mockup} />
        </div>
        <p className="mt-5 text-sm leading-relaxed text-mist/75">{detail.frontend.blurb}</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {detail.frontend.features.map((f) => (
            <li key={f} className="flex gap-2.5 text-[13.5px] text-mist/70">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-iris-500" />{f}
            </li>
          ))}
        </ul>
      </Block>

      <Block index="02" label={d.architecture.label} title={d.architecture.title}>
        <ArchFlow architecture={detail.architecture} />
      </Block>

      <Block index="03" label={d.backend.label} title={d.backend.title}>
        <BackendInfo backend={detail.backend} labels={d} />
      </Block>

      <Block index="04" label={d.brief.label} title={d.brief.title}>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { k: d.brief.problem, v: project.problem },
            { k: d.brief.built, v: project.built },
            { k: d.brief.outcome, v: project.outcome },
          ].map((b) => (
            <div key={b.k} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <p className="eyebrow">{b.k}</p>
              <p className="mt-2 text-sm leading-relaxed text-mist/75">{b.v}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block index="05" label={d.decisions.label} title={d.decisions.title}>
        <ul className="space-y-3">
          {detail.decisions.map((dec) => (
            <li key={dec} className="flex gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
              <Lightbulb size={17} className="mt-0.5 shrink-0 text-iris-400" />
              <span className="text-sm leading-relaxed text-mist/75">{dec}</span>
            </li>
          ))}
        </ul>
      </Block>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-10 sm:flex-row">
        <Link href={`/${lang}/projects`} className="inline-flex items-center gap-2 text-sm text-mist/70 transition-colors hover:text-white">
          <ArrowLeft size={16} /> {dict.common.backToProjects}
        </Link>
        <Link href={`/${lang}/projects/${nextSlug}`} className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-iris-500/50 hover:bg-white/5">
          {dict.common.next}: {nextTitle}
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </main>
  );
}
