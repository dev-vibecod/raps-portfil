import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { about, coreExpertise } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="Turning real business problems into"
        accent="working products."
      />

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-base leading-relaxed text-mist/75">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {about.highlights.map((h) => (
                <div key={h.label} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                  <p className="text-2xl font-semibold text-gradient">{h.value}</p>
                  <p className="mt-1 text-xs leading-snug text-mist/55">{h.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="space-y-3">
          {coreExpertise.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="glass glass-hover rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist/65">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
