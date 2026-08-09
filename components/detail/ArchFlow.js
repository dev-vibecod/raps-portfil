/**
 * Architecture: a numbered pipeline rail, then the layers as a stack.
 *
 * This was five bordered pills separated by lucide arrow glyphs — the shape of
 * a list, not of a system, so nine architecture definitions in the repo read as
 * text. The rail is the missing part: one hairline through five stations makes
 * the sequence visible at a glance instead of requiring the arrows to be read.
 *
 * Drawn in CSS rather than SVG deliberately. The node labels run to 27
 * characters and exist in two languages, so they have to wrap; SVG <text> does
 * not wrap, and foreignObject to get it back would cost more than it saves.
 *
 * On narrow screens the rail and its stations disappear and the stages stack as
 * a plain numbered list, which is what a pipeline looks like vertically.
 */
export default function ArchFlow({ architecture }) {
  const { blurb, flow = [], layers } = architecture;

  return (
    <div>
      <p className="text-sm leading-relaxed text-mist/75">{blurb}</p>

      <div className="relative mt-8">
        {/* The rail sits behind the stations, inset so it starts and ends on a
            dot rather than running off both edges. */}
        <span aria-hidden className="absolute left-1 right-1 top-[5px] hidden h-px bg-line-strong sm:block" />
        <ol className="grid gap-x-4 gap-y-6 sm:grid-cols-5">
          {flow.map((node, i) => (
            <li key={node} className="relative sm:pt-6">
              <span
                aria-hidden
                className="absolute left-0 top-0 hidden h-2.5 w-2.5 rounded-full border-2 border-iris-400 bg-ink-900 sm:block"
              />
              <span className="font-mono text-2xs tracking-label text-iris-400/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 text-sm font-medium leading-snug text-white">{node}</p>
            </li>
          ))}
        </ol>
      </div>

      {layers && (
        <dl className="mt-10 divide-y divide-line-soft border-y border-line-soft">
          {layers.map((layer) => (
            <div key={layer.name} className="grid gap-1.5 py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="font-mono text-2xs uppercase tracking-label text-iris-400/80">{layer.name}</dt>
              <dd className="text-sm leading-relaxed text-mist/75">{layer.items.join("  ·  ")}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
