import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { skills } from "@/data/content";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        index="02"
        eyebrow="Toolbox"
        title="Skills &"
        accent="capabilities."
        sub="A broad, production-tested stack across GenAI, backend, data/ML, and cloud — built for reliability, monitoring, and cost."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={(i % 3) * 0.06}>
            <div className="glass glass-hover h-full rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-iris-400">{s.group}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-xs text-mist/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
