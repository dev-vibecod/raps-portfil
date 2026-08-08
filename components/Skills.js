import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// `skills` arrives already localized: [{ group, items[] }].
//
// The chips used to carry a brand logo each. Across 93 chips that was ~150 KB
// of inline SVG and, visually, 93 small competing colours — the opposite of
// what the rest of the site now does. Set in mono, the list reads as one
// material and the group headings carry the hierarchy instead.
export default function Skills({ dict, skills, index = "02" }) {
  const s = dict.sections.skills;
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading index={index} eyebrow={s.eyebrow} title={s.title} accent={s.accent} sub={s.sub} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={(i % 3) * 0.06}>
            <div className="surface surface-hover h-full rounded-2xl p-5">
              <h3 className="font-mono text-2xs uppercase tracking-label text-iris-400">{g.group}</h3>
              <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-veil px-2.5 py-1 font-mono text-2xs text-mist/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
