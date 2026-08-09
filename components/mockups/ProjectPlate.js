import { tone, statusStyles, STATUS_FALLBACK, barsPath, rankedBarsPath, peakIndex } from "@/lib/mockupTone";

/**
 * Card thumbnail for project grids.
 *
 * This component received the full `mockup` object and read only `type` and
 * `url`, drawing one of four hand-authored abstract glyphs. Nine projects
 * therefore shared four pictures, and the grid read as placeholder art.
 *
 * It now renders each project's own `mockup.data` — the same data the full
 * mockups on /projects/[slug] are built from — so distinctness is structural:
 * a tenth project cannot collide with an existing one, because no two projects
 * have the same figures, transcript or query.
 *
 * Still a server component with no hooks: zero JS delta. Geometry goes into SVG
 * path strings rather than stacks of divs, because 66% of the home page HTML is
 * the RSC flight payload and every element is paid for twice.
 *
 * Node budget: <= 22 elements per plate.
 */

const ARCHETYPE = {
  chat: "Conversational",
  dashboard: "Dashboard",
  query: "Natural-language query",
  detection: "Computer vision",
};

function clip(text, max) {
  const s = String(text || "");
  return s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s;
}

function initialsFor(data) {
  if (data?.initials) return data.initials;
  // `ask-your-data` is the one project with no initials in its mockup data.
  return String(data?.app || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Chip({ value }) {
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-2xs font-medium ring-1 ${
        statusStyles[value] || STATUS_FALLBACK
      }`}
    >
      {value}
    </span>
  );
}

/* ------------------------------------------------------------------ bodies */

function DashboardBody({ data }) {
  const kpi = data.kpis?.[0];
  const delta = data.kpis?.find((k) => k.delta);
  const bars = data.chart?.bars;
  return (
    <div className="flex h-full items-end justify-between gap-4">
      <div className="min-w-0">
        {kpi && <p className="truncate font-mono text-2xs uppercase tracking-label text-mist/60">{kpi.label}</p>}
        {kpi && <p className="meta mt-0.5 text-xl font-semibold leading-none text-white">{kpi.value}</p>}
        {delta && <p className={`mt-1 truncate font-mono text-2xs ${tone[delta.tone] || tone.mut}`}>{delta.delta}</p>}
      </div>
      {bars?.length > 0 && (
        <svg viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden className="h-10 w-[52%] shrink-0">
          <path d={barsPath(bars)} className="fill-line-strong" />
          <path d={barsPath(bars, { only: peakIndex(bars) })} className="fill-iris-500" />
        </svg>
      )}
    </div>
  );
}

function ChatBody({ data }) {
  const messages = data.messages || [];
  const askIndex = messages.findIndex((m) => m.from === "user");
  const ask = messages[askIndex];
  const reply = messages.slice(askIndex + 1).find((m) => m.from === "bot");
  return (
    <div className="flex h-full flex-col justify-center gap-1.5">
      {ask && (
        <span className="max-w-[78%] self-end rounded-lg rounded-br-sm bg-iris-500 px-2 py-1 text-xs font-medium leading-snug text-ink-900">
          {clip(ask.text, 44)}
        </span>
      )}
      {reply && (
        <span className="max-w-[86%] rounded-lg rounded-bl-sm border border-line bg-ink-800 px-2 py-1 text-xs leading-snug text-mist/80">
          {clip(reply.text, 58)}
        </span>
      )}
      {reply?.source && <span className="truncate font-mono text-2xs text-iris-400/80">↳ {reply.source}</span>}
    </div>
  );
}

function QueryBody({ data }) {
  const rows = data.result?.rows || [];
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      <span className="truncate rounded-md border border-line bg-ink-800 px-2 py-1 text-xs text-white">
        {clip(data.query, 46)}
      </span>
      {rows.length > 0 && (
        <svg viewBox="0 0 100 34" preserveAspectRatio="none" aria-hidden className="h-8 w-full">
          <path d={rankedBarsPath(rows)} className="fill-iris-500/70" />
        </svg>
      )}
    </div>
  );
}

function DetectionBody({ data }) {
  return (
    <div className="flex h-full items-center gap-3">
      <span className="rounded-md border-2 border-iris-400 px-2.5 py-1 font-mono text-sm font-semibold text-white">
        {data.detected}
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-2xs uppercase tracking-label text-mist/60">Confidence</span>
        <span className="meta block text-sm font-semibold text-white">{data.confidence}</span>
      </span>
    </div>
  );
}

const BODIES = { dashboard: DashboardBody, chat: ChatBody, query: QueryBody, detection: DetectionBody };

/** The chip that summarises this project, chosen from its own data. */
function statusFor(mockup) {
  const d = mockup.data || {};
  if (mockup.type === "detection") return d.gate === "OPEN" ? "Allow" : "Deny";
  if (mockup.type === "query") return "Resolved";
  return d.table?.rows?.find((r) => r.status)?.status || null;
}

export default function ProjectPlate({ mockup }) {
  const type = BODIES[mockup.type] ? mockup.type : "dashboard";
  const Body = BODIES[type];
  const data = mockup.data || {};
  const status = statusFor(mockup);

  return (
    // ink-900 is DARKER than the card it sits in. The reverse made the plate
    // 1.034:1 against its own card, and `.surface-hover` set the card to the
    // plate's exact colour on hover, so the thumbnail disappeared.
    <div className="flex aspect-[16/10] w-full flex-col bg-ink-900">
      <div className="flex items-center gap-2 border-b border-line-soft px-3 py-2">
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-iris-500 font-mono text-[9px] font-bold text-ink-900">
          {initialsFor(data)}
        </span>
        <span className="truncate text-2xs font-medium text-white">{data.app}</span>
        <span className="ml-auto hidden truncate font-mono text-2xs text-mist/45 sm:block">{mockup.url}</span>
      </div>

      <div className="min-h-0 flex-1 px-3 py-2.5">
        <Body data={data} />
      </div>

      <div className="flex items-center justify-between gap-2 px-3 pb-2.5">
        <span className="truncate font-mono text-2xs uppercase tracking-label text-iris-400/70">{ARCHETYPE[type]}</span>
        {status && <Chip value={status} />}
      </div>
    </div>
  );
}
