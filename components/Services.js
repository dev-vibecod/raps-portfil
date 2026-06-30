import Link from "next/link";
import { Globe, LayoutGrid, Sparkles, Database, Cpu, Cloud, ArrowUpRight, Check, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import FaqAccordion from "./FaqAccordion";

const icons = { web: Globe, apps: LayoutGrid, ai: Sparkles, data: Database, iot: Cpu, cloud: Cloud };

export default function Services({ lang, dict, summary = false, index = "02" }) {
  const s = dict.services;
  const sec = dict.sections.services;

  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      {summary ? (
        <SectionHeading index={index} eyebrow={sec.eyebrow} title={dict.home.servicesTeaser.title} sub={dict.home.servicesTeaser.sub} />
      ) : (
        <div className="mb-12 md:mb-16">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-mist/50">01</span><span className="h-px w-8 bg-iris-500/50" />{sec.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">{s.title}</h1>
          </Reveal>
          <Reveal delay={0.1}><p className="mt-4 max-w-2xl text-mist/70">{s.intro}</p></Reveal>
          <Reveal delay={0.15}>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-iris-400"><MapPin size={14} /> {s.areaServed}</p>
          </Reveal>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {s.items.map((item, i) => {
          const Icon = icons[item.slug] || Globe;
          return (
            <Reveal key={item.slug} delay={(i % 3) * 0.06}>
              <div className="glass glass-hover flex h-full flex-col rounded-3xl p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-iris-500/15 text-iris-400 ring-1 ring-iris-500/25"><Icon size={20} /></span>
                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist/65">{item.blurb}</p>

                {!summary && (
                  <>
                    <p className="mt-5 eyebrow">{s.includesLabel}</p>
                    <ul className="mt-2 space-y-1.5">
                      {item.includes.map((inc) => (
                        <li key={inc} className="flex gap-2 text-[13px] text-mist/70">
                          <Check size={15} className="mt-0.5 shrink-0 text-iris-400" />{inc}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.tech.map((t) => (
                        <span key={t} className="rounded-full border border-white/8 bg-white/[0.03] px-2 py-0.5 text-[11px] text-mist/60">{t}</span>
                      ))}
                    </div>
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
          <Link href={`/${lang}/services`} className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-iris-500/50 hover:bg-white/5">
            {dict.common.learnMore}
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      )}

      {!summary && (
        <>
          {/* How I work — connected stepper */}
          <div className="mt-20">
            <SectionHeading index="02" eyebrow={s.howTitle} title={s.howTitle} />
            <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* connecting line on desktop */}
              <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-iris-500/0 via-iris-500/40 to-iris-500/0 lg:block" />
              {s.how.map((step) => (
                <Reveal key={step.step}>
                  <div className="relative flex h-full flex-col items-start">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-800 font-serif text-xl italic text-iris-300 ring-1 ring-iris-500/30 shadow-glow">
                      {step.step}
                    </span>
                    <h3 className="mt-4 text-sm font-semibold text-white">{step.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-mist/65">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* FAQ — accordion */}
          <div className="mt-20">
            <SectionHeading index="03" eyebrow={s.faqTitle} title={s.faqTitle} />
            <FaqAccordion items={s.faq} />
          </div>
        </>
      )}
    </section>
  );
}
