import { isLocale, getDict, locales } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { Mail, Phone, Linkedin, MapPin, Globe } from "lucide-react";
import CvActions from "@/components/CvActions";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  const lang = isLocale(params.lang) ? params.lang : "id";
  const dict = getDict(lang);
  return { title: `${dict.cv.title} — Rafif Ayyassar Wicaksono`, robots: { index: false } };
}

function Section({ title, children }) {
  return (
    <section className="mt-6">
      <h2 className="border-b border-zinc-300 pb-1 text-[13px] font-bold uppercase tracking-wider text-iris-600">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function CvPage({ params }) {
  const lang = isLocale(params.lang) ? params.lang : "id";
  const dict = getDict(lang);
  const c = getContent(lang);
  const { profile, about, experience, earlierExperience, education, skills, projects } = c;
  const featured = projects.find((p) => p.featured);

  return (
    <main className="py-24 pt-28">
      <CvActions lang={lang} dict={dict} />

      <article className="cv-doc mx-auto max-w-3xl rounded-xl bg-white px-8 py-10 text-zinc-800 shadow-card sm:px-12 print:rounded-none">
        {/* Header */}
        <header className="border-b-2 border-zinc-800 pb-4">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{profile.name}</h1>
          <p className="mt-1 text-lg font-medium text-iris-600">{profile.role}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-zinc-600">
            <span className="inline-flex items-center gap-1.5"><MapPin size={13} /> {profile.location}</span>
            <span className="inline-flex items-center gap-1.5"><Phone size={13} /> {profile.phone}</span>
            <span className="inline-flex items-center gap-1.5"><Mail size={13} /> {profile.email}</span>
            <span className="inline-flex items-center gap-1.5"><Linkedin size={13} /> in/rafifayyassarwicaksono</span>
            <span className="inline-flex items-center gap-1.5"><Globe size={13} /> raps-portofolio.vercel.app</span>
          </div>
        </header>

        <Section title={dict.cv.summaryLabel}>
          <p className="text-[13px] leading-relaxed text-zinc-700">{about.paragraphs[0]}</p>
        </Section>

        <Section title={dict.cv.expLabel}>
          <div className="space-y-4">
            {experience.map((job, i) => (
              <div key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="text-[14px] font-semibold text-zinc-900">{job.role}</h3>
                  <span className="text-[12px] font-medium text-zinc-500">{job.period}</span>
                </div>
                <p className="text-[12.5px] italic text-zinc-600">{job.org}{job.note ? ` · ${job.note}` : ""}</p>
                <ul className="mt-1.5 space-y-1">
                  {job.points.map((p, j) => (
                    <li key={j} className="flex gap-2 text-[12.5px] leading-snug text-zinc-700">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-iris-500" />{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="text-[12.5px] text-zinc-700">
              <span className="font-semibold text-zinc-900">{dict.cv.earlierLabel}: </span>
              {earlierExperience.map((e) => `${e.role} — ${e.org} (${e.period})`).join("; ")}.
            </div>
          </div>
        </Section>

        {featured && (
          <Section title={dict.cv.productsLabel}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="text-[14px] font-semibold text-zinc-900">{featured.title}</h3>
              <span className="inline-flex items-center gap-1 text-[12px] font-medium text-iris-600"><Globe size={12} /> oprexduit.vercel.app</span>
            </div>
            <p className="mt-1 text-[12.5px] leading-snug text-zinc-700">
              {featured.summary} — {featured.metrics.map((m) => `${m.value} ${m.label}`).join(", ")}.
            </p>
          </Section>
        )}

        <Section title={dict.cv.projectsLabel}>
          <div className="space-y-2.5">
            {projects.filter((p) => !p.featured).map((p) => (
              <div key={p.slug}>
                <p className="text-[13px] leading-snug text-zinc-800">
                  <span className="font-semibold text-zinc-900">{p.title}</span>
                  {" — "}{p.summary}
                </p>
                <p className="text-[11.5px] text-zinc-500">{p.industry} · {p.stack.slice(0, 4).join(", ")}</p>
              </div>
            ))}
          </div>
        </Section>

        <div className="grid gap-6 sm:grid-cols-[1fr_1.4fr]">
          <Section title={dict.cv.eduLabel}>
            <h3 className="text-[14px] font-semibold text-zinc-900">{education.school}</h3>
            <p className="text-[12.5px] text-zinc-600">{education.degree}</p>
            <p className="text-[12px] text-zinc-500">{education.period}</p>
            <ul className="mt-1.5 space-y-1">
              {education.points.map((p, i) => (
                <li key={i} className="flex gap-2 text-[12px] leading-snug text-zinc-700">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-iris-500" />{p}
                </li>
              ))}
            </ul>
          </Section>

          <Section title={dict.cv.skillsLabel}>
            <div className="space-y-1.5">
              {skills.map((g) => (
                <p key={g.group} className="text-[12px] leading-snug text-zinc-700">
                  <span className="font-semibold text-zinc-900">{g.group}: </span>
                  {g.items.join(", ")}
                </p>
              ))}
            </div>
          </Section>
        </div>
      </article>
    </main>
  );
}
