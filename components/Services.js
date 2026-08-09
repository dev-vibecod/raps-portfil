import Link from "next/link";
import { Globe, LayoutGrid, Sparkles, Database, Cpu, Cloud, ArrowUpRight, Check, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import FaqAccordion from "./FaqAccordion";
import { profile } from "@/data/content";

const icons = { web: Globe, apps: LayoutGrid, ai: Sparkles, data: Database, iot: Cpu, cloud: Cloud };

export default function Services({ lang, dict, summary = false, index = "02" }) {
  const s = dict.services;
  const sec = dict.sections.services;

  return (
    <section id="services" className="py-28 md:py-40">
      <div className="shell">
      {summary ? (
        <SectionHeading index={index} eyebrow={sec.eyebrow} title={dict.home.servicesTeaser.title} sub={dict.home.servicesTeaser.sub} />
      ) : (
        <SectionHeading
          index="01"
          as="h1"
          eyebrow={sec.eyebrow}
          title={s.title}
          sub={s.intro}
          trailing={
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-mist/65">
              <MapPin size={14} aria-hidden className="text-mist/60" /> {s.areaServed}
            </p>
          }
        />
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {s.items.map((item, i) => {
          const Icon = icons[item.slug] || Globe;
          return (
            <Reveal key={item.slug} delay={(i % 3) * 0.06}>
              <div className="surface surface-hover flex h-full flex-col rounded-3xl p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-veil-strong text-mist/70 ring-1 ring-line"><Icon size={20} /></span>
                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist/65">{item.blurb}</p>

                {!summary && (
                  <>
                    <p className="mt-5 eyebrow">{s.includesLabel}</p>
                    <ul className="mt-2 space-y-1.5">
                      {item.includes.map((inc) => (
                        <li key={inc} className="flex gap-2 text-sm text-mist/70">
                          <Check size={15} aria-hidden className="mt-0.5 shrink-0 text-mist/60" />{inc}
                        </li>
                      ))}
                    </ul>
                    {/* The per-service tech chips are deliberately not rendered:
                        naming the exact toolchain on a services page tells a
                        prospective client precisely what they are paying for and
                        invites them to price it elsewhere. The `tech` arrays stay
                        in the dictionaries — this is a server component, so
                        unrendered fields cost nothing at runtime and the decision
                        is one line to reverse. */}
                    {item.example && (
                      <Link href={`/${lang}/projects/${item.example}`} className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-iris-400">
                        {s.exampleLabel}
                        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    )}
                  </>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      {summary && (
        <div className="mt-10 text-center">
          <Link href={`/${lang}/services`} className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-medium text-white transition-colors hover:border-iris-500/50 hover:bg-veil-strong">
            {dict.common.learnMore}
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      )}

      {!summary && (
        <>
          {/* Pricing packages */}
          <div className="mt-20">
            <SectionHeading level={2} index="02" title={s.pricing.title} sub={s.pricing.note} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {s.pricing.items.map((p, i) => {
                const wa = `https://wa.me/${profile.phoneE164}?text=${encodeURIComponent(s.pricing.waPackage.replace("{name}", p.name))}`;
                return (
                  <Reveal key={p.name} delay={(i % 4) * 0.06}>
                    <div className={`surface surface-hover relative flex h-full flex-col rounded-3xl p-6 ${p.popular ? "ring-1 ring-iris-500/50" : ""}`}>
                      {p.popular && (
                        <span className="absolute -top-3 left-6 rounded-full bg-iris-500 px-3 py-1 text-2xs font-semibold text-ink-900">
                          {s.pricing.popular}
                        </span>
                      )}
                      <h3 className="text-base font-semibold text-white">{p.name}</h3>
                      <p className="mt-2 flex items-baseline gap-1.5">
                        {!p.custom && <span className="text-2xs font-mono uppercase tracking-label text-mist/65">{s.pricing.from}</span>}
                        <span className="meta text-3xl font-semibold text-white">{p.price}</span>
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-mist/65">{p.desc}</p>
                      <ul className="mt-4 flex-1 space-y-2">
                        {p.features.map((f) => (
                          <li key={f} className="flex gap-2 text-sm leading-snug text-mist/70">
                            <Check size={15} aria-hidden className="mt-0.5 shrink-0 text-mist/60" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={wa}
                        target="_blank"
                        rel="noreferrer"
                        className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                          p.popular
                            ? "bg-iris-500 text-ink-900 hover:bg-iris-400"
                            : "border border-line-strong text-white hover:border-iris-500/50 hover:bg-veil-strong"
                        }`}
                      >
                        {s.pricing.cta}
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Enterprise / custom tier — wide card */}
            <Reveal delay={0.1}>
              <div className="surface surface-hover mt-5 flex flex-col gap-6 rounded-3xl p-7 lg:flex-row lg:items-center">
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="text-lg font-semibold text-white">{s.pricing.enterprise.name}</h3>
                    <span className="meta text-2xl font-semibold text-white">{s.pricing.enterprise.price}</span>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist/70">{s.pricing.enterprise.desc}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {s.pricing.enterprise.features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm leading-snug text-mist/70">
                        <Check size={15} aria-hidden className="mt-0.5 shrink-0 text-mist/60" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={`https://wa.me/${profile.phoneE164}?text=${encodeURIComponent(s.pricing.waCustom.replace("{name}", s.pricing.enterprise.name))}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-iris-500 px-6 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-iris-400"
                >
                  {s.pricing.custom}
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </Reveal>

            <p className="mt-4 text-xs text-mist/65">{s.pricing.footnote}</p>
          </div>

          {/* How I work — connected stepper */}
          <div className="mt-20">
            <SectionHeading level={2} index="03" title={s.howTitle} />
            <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* connecting line on desktop */}
              <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-iris-500/0 via-iris-500/40 to-iris-500/0 lg:block" />
              {s.how.map((step) => (
                <Reveal key={step.step}>
                  <div className="relative flex h-full flex-col items-start">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-800 font-mono text-lg font-semibold text-iris-300 ring-1 ring-iris-500/30">
                      {step.step}
                    </span>
                    <h3 className="mt-4 text-sm font-semibold text-white">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist/65">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* FAQ — accordion */}
          <div className="mt-20">
            <SectionHeading level={2} index="04" title={s.faqTitle} />
            <FaqAccordion items={s.faq} />
          </div>
        </>
      )}
      </div>
    </section>
  );
}
