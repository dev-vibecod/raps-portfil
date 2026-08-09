import Reveal from "./Reveal";

/**
 * The site's rhythm marker: a numbered mono eyebrow, a hairline, then the
 * heading with a single accented word.
 *
 * Two levels, because a page has one opener and may have several subsections:
 *
 *   level={1}  page/section opener — display heading, own eyebrow line
 *   level={2}  subsection — the number IS the label, heading drops to 2xl
 *
 * Level 2 exists because /services had four level-1 headings competing on one
 * page, three of which passed the same string as both `eyebrow` and `title` and
 * so printed their own name twice in a row.
 *
 * `as` sets the tag: a page opener should be the h1, a section inside a page an h2.
 * `trailing` takes anything that belongs with the heading block (e.g. the
 * "area served" line on /services) so callers stop rebuilding this inline.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  sub,
  level = 1,
  as: Tag = "h2",
  trailing,
}) {
  if (level === 2) {
    return (
      <div className="mb-8 md:mb-10">
        <Reveal>
          <div className="flex items-baseline gap-3">
            {index && <span className="eyebrow shrink-0">{index}</span>}
            <span aria-hidden className="h-px w-8 shrink-0 translate-y-[-0.35em] bg-iris-500/50" />
            <Tag className="text-xl font-semibold text-white sm:text-2xl">
              {title} {accent && <span className="text-iris-400">{accent}</span>}
            </Tag>
          </div>
        </Reveal>
        {sub && (
          <Reveal delay={0.05}>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist/70">{sub}</p>
          </Reveal>
        )}
      </div>
    );
  }

  return (
    <div className="mb-12 md:mb-16">
      <Reveal>
        <p className="eyebrow flex items-center gap-3">
          {index && <span className="text-mist/60">{index}</span>}
          <span aria-hidden className="h-px w-8 bg-iris-500/50" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <Tag className="mt-5 max-w-3xl text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
          {title} {accent && <span className="text-iris-400">{accent}</span>}
        </Tag>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist/70">{sub}</p>
        </Reveal>
      )}
      {trailing && <Reveal delay={0.15}>{trailing}</Reveal>}
    </div>
  );
}
