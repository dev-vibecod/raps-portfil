import Link from "next/link";
import { ArrowUpRight, Linkedin, Mail, MapPin } from "lucide-react";
import CountUp from "./CountUp";

const stack = [
  { k: "GenAI / LLM", v: "RAG · Agents" },
  { k: "Backend", v: "Python · FastAPI" },
  { k: "Data / ML", v: "Pipelines · MLOps" },
  { k: "Cloud", v: "GCP · AWS" },
];

// The entrance was seven framer-motion nodes with staggered delays. As CSS
// `animation-delay` it is identical on screen, needs no library, and lets this
// whole component stay on the server — only the counters ship as JS now.
export default function Hero({ lang, dict, profile }) {
  const t = dict.hero;
  const stats = [
    { v: "3+", k: t.stats.years },
    { v: "20+", k: t.stats.projects },
    { v: "~2,000", k: t.stats.users },
  ];

  return (
    <section className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pt-28 pb-16 sm:px-8">
      {/* Ambient wash. A radial-gradient renders like a blurred circle but
          skips the blur pass — the previous pair of orbs put ~1.9 megapixels
          of filter work directly in the LCP path. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(28rem 24rem at 8% 22%, rgba(139,147,255,0.13), transparent 70%), radial-gradient(30rem 26rem at 96% 38%, rgba(169,176,255,0.10), transparent 70%)",
        }}
      />

      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="eyebrow rise flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-iris-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-iris-400" />
            </span>
            {dict.common.available}
          </p>

          <h1
            className="rise mt-5 text-4xl font-semibold text-white sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.05s" }}
          >
            {t.titleA} <span className="text-iris-400">{t.titleAccent}</span> {t.titleB}
            <span className="text-iris-500">.</span>
          </h1>

          <p
            className="rise mt-6 max-w-xl text-base leading-relaxed text-mist/75 sm:text-lg"
            style={{ animationDelay: "0.12s" }}
          >
            {profile.tagline}
          </p>

          {/* Note the dictionary keys read backwards here, deliberately:
              `ctaSecondary` ("Mulai proyek") now takes the filled button and
              `ctaPrimary` ("Lihat proyek") the outline. The filled button used
              to point at the project grid — the highest-intent moment on the
              page led away from the only action that turns a visitor into work.
              Keys are left alone because renaming them means touching both
              dictionaries for no user-visible gain. */}
          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.18s" }}>
            <Link
              href={`/${lang}/contact`}
              className="group inline-flex items-center gap-2 rounded-full bg-iris-500 px-5 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-iris-400"
            >
              {t.ctaSecondary}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href={`/${lang}/projects`}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-medium text-white transition-colors hover:border-iris-500/50 hover:bg-veil"
            >
              {t.ctaPrimary}
            </Link>
          </div>

          <div className="rise mt-8 flex items-center gap-4 text-mist/60" style={{ animationDelay: "0.26s" }}>
            <span className="inline-flex items-center gap-1.5 text-sm">
              <MapPin size={15} aria-hidden /> {profile.location}
            </span>
            <span aria-hidden className="h-4 w-px bg-line-strong" />
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-iris-400" aria-label="LinkedIn">
              <Linkedin size={18} aria-hidden />
            </a>
            <a href={`mailto:${profile.email}`} className="transition-colors hover:text-iris-400" aria-label="Email">
              <Mail size={18} aria-hidden />
            </a>
          </div>

          {/* Figures are mono and tabular — the site treats numbers as machine
              output and prose as human writing. */}
          <dl className="rise mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-line-soft pt-6" style={{ animationDelay: "0.34s" }}>
            {stats.map((s) => (
              // `flex-col-reverse` keeps the figure above its label visually
              // while the markup stays <dt> then <dd>, which is what the <dl>
              // content model requires.
              <div key={s.k} className="flex flex-col-reverse">
                <dt className="mt-1 font-mono text-2xs uppercase tracking-label text-mist/65">{s.k}</dt>
                <dd>
                  <CountUp value={s.v} className="meta block text-3xl font-semibold text-white sm:text-4xl" />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Solid surface, not glass: this panel sits in the content flow, so it
            has no business carrying a backdrop-filter. */}
        <div className="surface rise rounded-3xl p-6 shadow-card" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between gap-3">
            <p className="eyebrow">Skill stack</p>
            <span className="meta rounded-full bg-iris-500/15 px-2.5 py-1 text-2xs font-medium text-iris-300 ring-1 ring-iris-500/30">
              3+ yrs · 20+ projects
            </span>
          </div>

          {/* Hairline rows instead of four nested cards: fewer nodes, and the
              label/value alignment reads as a spec sheet. */}
          <dl className="mt-5 divide-y divide-line-soft border-y border-line-soft">
            {stack.map((s) => (
              <div key={s.k} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="font-mono text-2xs uppercase tracking-label text-mist/70">{s.k}</dt>
                <dd className="text-sm font-medium text-white">{s.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex items-center justify-between">
            <span className="font-mono text-2xs uppercase tracking-label text-mist/65">End-to-end delivery</span>
            <span className="font-mono text-2xs font-semibold uppercase tracking-label text-iris-400">Solo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
