import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Highlight card for a real, live product.
 *
 * The whole card used to be one link straight out to the live site, so the
 * strongest piece of evidence on the page sent visitors away before they had
 * read anything else. It now leads to the internal case study, with the live
 * site as a deliberate second action.
 *
 * Structurally: the card is an <article>, the case study is a stretched link
 * covering it, and the outward link sits above that overlay. Nesting one <a>
 * inside another would be invalid, and browsers unnest it in ways that break
 * both links.
 */
export default function FeaturedProduct({ lang, dict, project }) {
  return (
    <Reveal>
      <article className="surface surface-hover group relative overflow-hidden rounded-3xl">
        <div className="grid md:grid-cols-2">
          {/* screenshot */}
          <div className="relative aspect-[16/10] overflow-hidden border-b border-line md:border-b-0 md:border-r">
            <Image
              src={project.image}
              alt={`${project.title} — live product screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 font-mono text-2xs font-medium uppercase tracking-label text-emerald-300 ring-1 ring-emerald-500/30">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {dict.featured.live}
            </span>
          </div>

          {/* content */}
          <div className="flex flex-col justify-center p-7 sm:p-9">
            <p className="eyebrow flex items-center gap-2">
              <Sparkles size={14} aria-hidden className="text-iris-400" /> {dict.featured.badge}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              <Link href={`/${lang}/projects/${project.slug}`} className="after:absolute after:inset-0">
                {project.title}
              </Link>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist/70">{project.summary}</p>

            <dl className="mt-5 flex flex-wrap gap-6">
              {project.metrics.map((m) => (
                <div key={m.label} className="flex flex-col-reverse">
                  <dt className="font-mono text-2xs uppercase tracking-label text-mist/65">{m.label}</dt>
                  <dd className="meta text-3xl font-semibold text-white sm:text-4xl">{m.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span key={s} className="rounded-full border border-line bg-veil px-2 py-0.5 font-mono text-2xs text-mist/60">{s}</span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-iris-400">
                {dict.common.viewCaseStudy}
                <ArrowUpRight size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 inline-flex items-center gap-1.5 text-sm text-mist/70 transition-colors hover:text-white"
              >
                {dict.featured.visitSite}
                <ExternalLink size={14} aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
