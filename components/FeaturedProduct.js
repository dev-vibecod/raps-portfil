import Image from "next/image";
import { ExternalLink, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

// Highlight card for a real, live product (links out to the live site).
export default function FeaturedProduct({ dict, project }) {
  return (
    <Reveal>
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="glass glass-hover group block overflow-hidden rounded-3xl"
      >
        <div className="grid md:grid-cols-2">
          {/* screenshot */}
          <div className="relative aspect-[16/10] overflow-hidden border-b border-white/8 md:border-b-0 md:border-r">
            <Image
              src={project.image}
              alt={`${project.title} — live product screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-500/30 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> {dict.featured.live}
            </span>
          </div>

          {/* content */}
          <div className="flex flex-col justify-center p-7 sm:p-9">
            <p className="eyebrow flex items-center gap-2">
              <Sparkles size={14} className="text-iris-400" /> {dict.featured.badge}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{project.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mist/70">{project.summary}</p>

            <div className="mt-5 flex flex-wrap gap-6">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-xl font-bold text-gradient">{m.value}</p>
                  <p className="text-[11px] uppercase tracking-wider text-mist/50">{m.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span key={s} className="rounded-full border border-white/8 bg-white/[0.03] px-2 py-0.5 text-[11px] text-mist/60">{s}</span>
              ))}
            </div>

            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-iris-400">
              {dict.featured.visitSite}
              <ExternalLink size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </a>
    </Reveal>
  );
}
