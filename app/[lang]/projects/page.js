import { isLocale, getDict, locales } from "@/lib/i18n";
import { getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/meta";
import Reveal from "@/components/Reveal";
import Projects from "@/components/Projects";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  return pageMetadata(params.lang, "projects", "projects");
}

export default function ProjectsPage({ params }) {
  const lang = isLocale(params.lang) ? params.lang : "id";
  const dict = getDict(lang);
  const projects = getProjects(lang);

  return (
    <main className="mx-auto max-w-6xl px-5 pt-28 sm:px-8">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">{dict.projects.title}</h1>
        <p className="mt-4 max-w-2xl text-mist/70">{dict.projects.intro}</p>
      </Reveal>
      <div className="-mt-8">
        <Projects lang={lang} dict={dict} projects={projects} heading={false} />
      </div>
    </main>
  );
}
