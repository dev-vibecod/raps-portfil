// Shared palette for data-driven mockup surfaces.
//
// These maps used to live only inside components/mockups/Mockups.js, where they
// were reachable by the nine detail pages and nowhere else — which is why every
// top-level page was a single lavender hue on three near-blacks. ProjectPlate
// now imports them too, so emerald/amber/rose reach the home page from the
// project data itself rather than from a decoration decision.
//
// Every class string here is already in the compiled CSS because Mockups.js
// emits it, so reusing them costs zero additional CSS bytes.

export const tone = {
  good: "text-emerald-400",
  warn: "text-amber-400",
  bad: "text-rose-400",
  acc: "text-iris-400",
  mut: "text-mist/60",
};

export const statusStyles = {
  Open: "bg-amber-500/15 text-amber-300 ring-amber-500/25",
  "In progress": "bg-iris-500/15 text-iris-300 ring-iris-500/25",
  Resolved: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/25",
  High: "bg-rose-500/15 text-rose-300 ring-rose-500/25",
  Medium: "bg-amber-500/15 text-amber-300 ring-amber-500/25",
  Low: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/25",
  Active: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/25",
  Pending: "bg-amber-500/15 text-amber-300 ring-amber-500/25",
  Allow: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/25",
  Deny: "bg-rose-500/15 text-rose-300 ring-rose-500/25",
};

export const STATUS_FALLBACK = "bg-veil-strong text-mist ring-line-strong";

/**
 * Vertical bar chart as a single SVG path.
 *
 * Rendered as <div>s this is one node per bar — and because 66% of the home
 * page HTML is the RSC flight payload, every node costs roughly 200 B twice
 * over. A ten-bar chart is ~2 KB as divs and ~400 B as one path.
 *
 * viewBox is "0 0 100 28" with preserveAspectRatio="none", so bar widths
 * stretch to the container and the geometry stays resolution-independent.
 */
export function barsPath(bars, { only } = {}) {
  const n = bars.length;
  const slot = 100 / n;
  const width = slot * 0.62;
  const inset = (slot - width) / 2;
  return bars
    .map((value, i) => {
      if (only !== undefined && i !== only) return "";
      const height = Math.max(1.5, (value / 100) * 26);
      const x = (i * slot + inset).toFixed(2);
      return `M${x},28V${(28 - height).toFixed(2)}h${width.toFixed(2)}V28Z`;
    })
    .join("");
}

/** Horizontal ranked bars as a single path. viewBox "0 0 100 34". */
export function rankedBarsPath(rows) {
  return rows
    .slice(0, 4)
    .map((row, i) => {
      const width = Math.max(3, Number(row.pct) || 0);
      return `M0,${i * 9}h${width}v6h-${width}Z`;
    })
    .join("");
}

/** Index of the largest bar — the one that gets the accent colour. */
export function peakIndex(bars) {
  return bars.reduce((best, value, i) => (value > bars[best] ? i : best), 0);
}
