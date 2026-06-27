import { isLocale, getDict, locales } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/meta";
import Reveal from "@/components/Reveal";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  return pageMetadata(params.lang, "about", "about");
}

export default function AboutPage({ params }) {
  const lang = isLocale(params.lang) ? params.lang : "id";
  const dict = getDict(lang);
  const c = getContent(lang);

  return (
    <main className="pt-20">
      <section className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
        <Reveal>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">{dict.about.title}</h1>
          <p className="mt-4 max-w-2xl text-mist/70">{dict.about.intro}</p>
        </Reveal>
      </section>
      <About dict={dict} about={c.about} coreExpertise={c.coreExpertise} index="01" />
      <Skills dict={dict} skills={c.skills} index="02" />
      <Experience
        dict={dict}
        experience={c.experience}
        earlierExperience={c.earlierExperience}
        earlierNote={c.earlierNote}
        education={c.education}
        index="03"
      />
    </main>
  );
}
