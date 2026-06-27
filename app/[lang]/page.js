import { isLocale, getDict } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HomePage({ params }) {
  const lang = isLocale(params.lang) ? params.lang : "id";
  const dict = getDict(lang);
  const c = getContent(lang);
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://rafif-portfolio.vercel.app").replace(/\/$/, "");

  return (
    <>
      <JsonLd lang={lang} baseUrl={baseUrl} />
      <Hero lang={lang} dict={dict} profile={c.profile} />
      <TechMarquee title={dict.home.tech.title} />
      <Services lang={lang} dict={dict} summary index="01" />
      <Projects lang={lang} dict={dict} projects={c.projects} limit={6} index="02" />

      {/* About teaser */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <Reveal>
          <div className="glass flex flex-col items-start justify-between gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="eyebrow">{dict.nav.about}</p>
              <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">{dict.home.aboutTeaser.title}</h2>
            </div>
            <Link href={`/${lang}/about`} className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-iris-500/50 hover:bg-white/5">
              {dict.home.aboutTeaser.cta}
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      </section>

      <Contact lang={lang} dict={dict} profile={c.profile} copy={dict.home.contact} />
    </>
  );
}
