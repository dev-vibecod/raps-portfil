const MONTHS = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

/**
 * `period` is a plain string, not a localised object — "Jun 2022 – Present",
 * "Aug 2024 – Aug 2025" — with English month abbreviations in both locales, so
 * it parses reliably without adding parallel date fields to the content.
 * Returns months-since-epoch, or null for an open end.
 */
function parsePeriod(period) {
  const [rawStart, rawEnd] = String(period).split(/\s*[–—-]\s*/);
  const at = (text) => {
    const m = /^([A-Za-z]{3})\w*\s+(\d{4})$/.exec(String(text).trim());
    if (!m || !(m[1] in MONTHS)) return null;
    return Number(m[2]) * 12 + MONTHS[m[1]];
  };
  return { start: at(rawStart), end: at(rawEnd) };
}

/**
 * Career as a chart rather than a list.
 *
 * The dossier holds seven dated roles whose real shape is invisible in a
 * vertical list: freelancing has run continuously since Jun 2022 *underneath*
 * a sequence of employed roles, and the two Insignia roles overlapped. Those
 * are facts already stated in the copy; only their relationship was unreadable.
 *
 * Nothing here is new information — every bar is drawn from the same `period`
 * string rendered beneath it.
 */
export default function CareerTimeline({ roles, label }) {
  const now = new Date();
  const nowMonths = now.getFullYear() * 12 + now.getMonth();

  const parsed = roles
    .map((r) => ({ ...r, ...parsePeriod(r.period) }))
    .filter((r) => r.start !== null);
  if (parsed.length < 2) return null;

  const min = Math.min(...parsed.map((r) => r.start));
  const max = Math.max(nowMonths, ...parsed.map((r) => r.end ?? nowMonths));
  const span = Math.max(1, max - min);
  const pct = (months) => ((months - min) / span) * 100;

  const firstYear = Math.ceil(min / 12);
  const lastYear = Math.floor(max / 12);
  const years = [];
  for (let y = firstYear; y <= lastYear; y += 1) years.push(y);

  // Longest bars first so the continuous freelance track reads as the baseline
  // the shorter employed roles sit on top of.
  const ordered = [...parsed].sort(
    (a, b) => (b.end ?? nowMonths) - b.start - ((a.end ?? nowMonths) - a.start)
  );

  return (
    <div className="mt-8">
      {label && <p className="eyebrow mb-4">{label}</p>}

      <div className="relative">
        {/* Year gridlines, behind the bars. */}
        <div aria-hidden className="absolute inset-0 flex">
          {years.map((y) => (
            <span
              key={y}
              className="absolute top-0 bottom-5 w-px bg-line-soft"
              style={{ left: `${pct(y * 12)}%` }}
            />
          ))}
        </div>

        <ol className="relative space-y-1.5">
          {ordered.map((r) => {
            const left = pct(r.start);
            const right = pct(r.end ?? nowMonths);
            return (
              <li key={`${r.org}-${r.period}`} className="relative h-6">
                <span
                  className={`absolute inset-y-0 flex items-center rounded-sm px-2 ${
                    r.current
                      ? "bg-iris-500/70 text-ink-900"
                      : "bg-surface-raised text-mist/80 ring-1 ring-line-strong"
                  }`}
                  style={{ left: `${left}%`, width: `${Math.max(right - left, 3)}%` }}
                >
                  <span className="truncate font-mono text-2xs font-medium leading-none">{r.org}</span>
                </span>
              </li>
            );
          })}
        </ol>

        <div aria-hidden className="relative mt-2 h-4">
          {years.map((y) => (
            <span
              key={y}
              className="absolute top-0 -translate-x-1/2 font-mono text-2xs tracking-label text-mist/50"
              style={{ left: `${pct(y * 12)}%` }}
            >
              {y}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
