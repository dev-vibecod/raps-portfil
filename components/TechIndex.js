import { TECH_GROUPS } from "@/lib/stack";

// The stack as an index, not a parade.
//
// Each of the 30 entries used to be a wrapper <span> plus a separate separator
// <span> — 54 elements, about 9% of the entire home page DOM, for the least
// visual block on the page. Since 66% of this page's HTML is the RSC flight
// payload, every element is paid for twice (~200 B each), so those 54 nodes
// cost roughly 10 KB to render six lines of text.
//
// Now the whole line is one text node. The separator no longer gets its own
// dimmer colour, which is a real but small loss; the node budget it frees is
// what pays for the per-project graphics elsewhere.
export default function TechIndex({ title }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
      {title && <p className="eyebrow mb-6">{title}</p>}
      <dl className="divide-y divide-line-soft border-y border-line-soft">
        {TECH_GROUPS.map((g) => (
          <div key={g.label} className="grid gap-1.5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="font-mono text-2xs uppercase tracking-label text-iris-400/80">{g.label}</dt>
            <dd className="text-sm leading-relaxed text-mist/75">{g.items.join("  ·  ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
