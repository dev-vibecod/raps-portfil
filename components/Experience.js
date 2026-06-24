import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import {
  experience,
  earlierExperience,
  earlierNote,
  education,
} from "@/data/content";

function TimelineItem({ item, last }) {
  return (
    <div className="relative pl-8">
      {/* line */}
      {!last && <span className="absolute left-[5px] top-3 h-full w-px bg-white/10" />}
      {/* dot */}
      <span className={`absolute left-0 top-2 h-[11px] w-[11px] rounded-full ring-4 ring-ink-900 ${item.current ? "bg-iris-400" : "bg-white/25"}`}>
        {item.current && <span className="absolute inset-0 animate-ping rounded-full bg-iris-400/60" />}
      </span>

      <div className="pb-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="text-base font-semibold text-white">{item.role}</h3>
          <span className="text-xs font-medium text-iris-400/80">{item.period}</span>
        </div>
        <p className="mt-0.5 text-sm text-mist/70">
          {item.org}
          {item.note && <span className="text-mist/45"> · {item.note}</span>}
        </p>
        {item.points && (
          <ul className="mt-3 space-y-2">
            {item.points.map((p, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-mist/65">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-iris-500/70" />
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        index="04"
        eyebrow="Career"
        title="Experience &"
        accent="education."
      />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
        {/* Main timeline */}
        <div>
          <Reveal>
            <div>
              {experience.map((item, i) => (
                <TimelineItem key={i} item={item} last={i === experience.length - 1} />
              ))}
            </div>
          </Reveal>
        </div>

        {/* Side: earlier roles + education */}
        <div className="space-y-6">
          <Reveal delay={0.1}>
            <div className="glass rounded-2xl p-5">
              <p className="eyebrow">Earlier experience</p>
              <ul className="mt-4 space-y-4">
                {earlierExperience.map((e, i) => (
                  <li key={i}>
                    <p className="text-sm font-medium text-white">{e.role}</p>
                    <p className="text-xs text-mist/60">
                      {e.org} · {e.note}
                    </p>
                    <p className="text-xs text-mist/45">{e.period}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-white/8 pt-4 text-xs leading-relaxed text-mist/50">
                {earlierNote}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="glass rounded-2xl p-5">
              <p className="eyebrow">Education</p>
              <p className="mt-3 text-sm font-semibold text-white">{education.school}</p>
              <p className="text-xs text-mist/65">{education.degree}</p>
              <p className="text-xs text-mist/45">{education.period}</p>
              <ul className="mt-3 space-y-2">
                {education.points.map((p, i) => (
                  <li key={i} className="flex gap-2 text-xs leading-relaxed text-mist/60">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-iris-500/70" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
