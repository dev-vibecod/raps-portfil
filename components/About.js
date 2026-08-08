import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import CountUp from "./CountUp";

// `about` and `coreExpertise` arrive already localized (plain strings).
export default function About({ dict, about, coreExpertise, index = "01" }) {
  const s = dict.sections.about;
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading index={index} eyebrow={s.eyebrow} title={s.title} accent={s.accent} />
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-base leading-relaxed text-mist/75">{p}</p>
            </Reveal>
          ))}
          {/* Same figures, same treatment as the hero: a hairline <dl>, not
              four cards. Four card nodes for four numbers was the "wall of
              identical cards" the rest of the site has moved away from. */}
          <Reveal delay={0.2}>
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-t border-line-soft pt-6">
              {about.highlights.map((h) => (
                <div key={h.label} className="flex flex-col-reverse">
                  <dt className="mt-1 max-w-[9rem] font-mono text-2xs uppercase leading-snug tracking-label text-mist/65">
                    {h.label}
                  </dt>
                  <dd>
                    <CountUp value={h.value} className="meta block text-2xl font-semibold text-white" />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Numbered hairline rows — reads as an index, and the ordinal is the
            only thing carrying accent colour. */}
        <ol className="divide-y divide-line-soft border-y border-line-soft">
          {coreExpertise.map((c, i) => (
            <li key={c.title}>
              <Reveal delay={i * 0.08}>
                <div className="flex items-start gap-4 py-5">
                  <span className="font-mono text-2xs tracking-label text-iris-400/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist/65">{c.body}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
