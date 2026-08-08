import { TECH_GROUPS } from "@/lib/stack";

// The stack as an index, not a parade.
//
// Replaces the two-row logo marquee. Domain label in mono on the left, the
// technologies as a single readable line on the right, separated by hairlines.
// Nothing moves, nothing is blurred, and it says more in less space.
export default function TechIndex({ title }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
      {title && <p className="eyebrow mb-6">{title}</p>}
      <dl className="divide-y divide-line-soft border-y border-line-soft">
        {TECH_GROUPS.map((g) => (
          <div key={g.label} className="grid gap-1.5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="font-mono text-2xs uppercase tracking-label text-iris-400/80">{g.label}</dt>
            <dd className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5 text-sm text-mist/75">
              {g.items.map((item, i) => (
                <span key={item} className="flex items-baseline gap-2.5">
                  {i > 0 && <span aria-hidden className="text-mist/25">·</span>}
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
