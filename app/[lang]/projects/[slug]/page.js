import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink, Info, Lightbulb } from "lucide-react";
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
    <section className="border-t border-line py-12 md:py-16">
      <Reveal>
        <p className="eyebrow flex items-center gap-3">
          <span className="text-mist/65">{index}</span>
          <span className="h-px w-8 bg-iris-500/50" />
          {label}
        </p>
        {title && <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>}
      </Reveal>
      <div className="mt-6">{children}</div>
    </section>
  );
}

/**
 * Page for a real, shipped product.
 *
 * Deliberately not the reconstruction template: there is no synthetic mockup
 * (there is a real screenshot), no illustrative endpoint table, and no
 * "representative" disclaimer — none of that applies to something you can go
 * and use. Every fact here comes from the dossier entry in data/content.js.
 */
function LiveProduct({ lang, dict, project }) {
  const d = dict.detail;
  return (
    <>
      <Reveal>
        <Link href={`/${lang}/projects`} className="inline-flex items-center gap-2 text-sm text-mist/70 transition-colors hover:text-white">
          <ArrowLeft size={16} aria-hidden /> {dict.common.allProjects}
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="font-mono text-2xs font-medium uppercase tracking-label text-iris-400/80">{project.industry}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 font-mono text-2xs font-medium uppercase tracking-label text-emerald-300 ring-1 ring-emerald-500/30">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {dict.featured.live}
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl md:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist/75">{project.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-iris-500 px-5 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-iris-400"
          >
            {dict.featured.visitSite}
            <ExternalLink size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <span className="font-mono text-2xs uppercase tracking-label text-mist/60">
            {project.url.replace(/^https?:\/\//, "")}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full border border-line bg-veil px-2 py-0.5 font-mono text-2xs text-mist/60">{s}</span>
          ))}
        </div>
      </Reveal>

      {/* The real screenshot, at a size where it reads. */}
      <Reveal delay={0.05}>
        <div className="mt-10 overflow-hidden rounded-2xl border border-line shadow-card">
          <Image
            src={project.image}
            alt={`${project.title} — product screenshot`}
            width={1440}
            height={900}
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
            className="w-full"
          />
        </div>
      </Reveal>

      {/* Figures first: these are measured, not claimed. */}
      <section className="border-t border-line py-12 md:py-16">
        <Reveal>
          <dl className="flex flex-wrap gap-x-12 gap-y-6">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse">
                <dt className="mt-1 font-mono text-2xs uppercase tracking-label text-mist/65">{m.label}</dt>
                <dd className="meta text-3xl font-semibold text-white sm:text-4xl">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <Block index="01" label={d.brief.label} title={d.brief.title}>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { k: d.brief.problem, v: project.problem },
            { k: d.brief.built, v: project.built },
            { k: d.brief.outcome, v: project.outcome },
          ].map((b) => (
            <div key={b.k} className="rounded-2xl border border-line bg-veil p-5">
              <p className="eyebrow">{b.k}</p>
              <p className="mt-2 text-sm leading-relaxed text-mist/75">{b.v}</p>
            </div>
          ))}
        </div>
      </Block>
    </>
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

  const footer = (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-line pt-10 sm:flex-row">
      <Link href={`/${lang}/projects`} className="inline-flex items-center gap-2 text-sm text-mist/70 transition-colors hover:text-white">
        <ArrowLeft size={16} aria-hidden /> {dict.common.backToProjects}
      </Link>
      <Link href={`/${lang}/projects/${nextSlug}`} className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-iris-500/50 hover:bg-veil-strong">
        {dict.common.next}: {nextTitle}
        <ArrowUpRight size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );

  if (!detail) {
    return (
      <main className="mx-auto max-w-5xl px-5 pb-8 pt-28 sm:px-8 md:pt-36">
        <LiveProduct lang={lang} dict={dict} project={project} />
        {footer}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-5 pb-8 pt-28 sm:px-8 md:pt-36">
      <Reveal>
        <Link href={`/${lang}/projects`} className="inline-flex items-center gap-2 text-sm text-mist/70 transition-colors hover:text-white">
          <ArrowLeft size={16} aria-hidden /> {dict.common.allProjects}
        </Link>
        <span className="mt-6 block font-mono text-2xs font-medium uppercase tracking-label text-iris-400/80">{project.industry}</span>
        <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl md:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist/75">{detail.overview}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full border border-line bg-veil px-2 py-0.5 font-mono text-2xs text-mist/60">{s}</span>
          ))}
        </div>
        <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-amber-500/25 bg-amber-500/10 px-3.5 py-2 text-xs text-amber-200/90">
          <Info size={15} aria-hidden className="shrink-0" /> {d.banner}
        </div>
      </Reveal>

      <Block index="01" label={d.frontend.label} title={d.frontend.title}>
        <div className="overflow-hidden rounded-2xl border border-line shadow-card">
          <ProjectMockup mockup={mockup} />
        </div>
        <p className="mt-5 text-sm leading-relaxed text-mist/75">{detail.frontend.blurb}</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {detail.frontend.features.map((f) => (
            <li key={f} className="flex gap-2.5 text-sm text-mist/70">
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
            <div key={b.k} className="rounded-2xl border border-line bg-veil p-5">
              <p className="eyebrow">{b.k}</p>
              <p className="mt-2 text-sm leading-relaxed text-mist/75">{b.v}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block index="05" label={d.decisions.label} title={d.decisions.title}>
        <ul className="space-y-3">
          {detail.decisions.map((dec) => (
            <li key={dec} className="flex gap-3 rounded-2xl border border-line bg-veil p-4">
              <Lightbulb size={17} className="mt-0.5 shrink-0 text-iris-400" />
              <span className="text-sm leading-relaxed text-mist/75">{dec}</span>
            </li>
          ))}
        </ul>
      </Block>

      {footer}
    </main>
  );
}
