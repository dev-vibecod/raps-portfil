// Presentational, data-driven UI mockups. Pure (no hooks) so they render at a
// fixed design size inside <ScaledMockup>. All content is illustrative.
import { ArrowUp, Search, Plus, ShieldCheck, BarChart3, Database, Camera, ScanLine, Video } from "lucide-react";

const tone = {
  good: "text-emerald-400",
  warn: "text-amber-400",
  bad: "text-rose-400",
  acc: "text-iris-400",
  mut: "text-mist/60",
};
const statusStyles = {
  Open: "bg-amber-500/12 text-amber-300 ring-amber-500/25",
  "In progress": "bg-iris-500/12 text-iris-300 ring-iris-500/25",
  Resolved: "bg-emerald-500/12 text-emerald-300 ring-emerald-500/25",
  High: "bg-rose-500/12 text-rose-300 ring-rose-500/25",
  Medium: "bg-amber-500/12 text-amber-300 ring-amber-500/25",
  Low: "bg-emerald-500/12 text-emerald-300 ring-emerald-500/25",
  Active: "bg-emerald-500/12 text-emerald-300 ring-emerald-500/25",
  Pending: "bg-amber-500/12 text-amber-300 ring-amber-500/25",
  Allow: "bg-emerald-500/12 text-emerald-300 ring-emerald-500/25",
  Deny: "bg-rose-500/12 text-rose-300 ring-rose-500/25",
};

function StatusChip({ value }) {
  const cls = statusStyles[value] || "bg-white/8 text-mist ring-white/15";
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[12px] font-medium ring-1 ${cls}`}>
      {value}
    </span>
  );
}

// ---------------------------------------------------------------- Browser chrome
export function BrowserChrome({ url, children }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-ink-900">
      <div className="flex items-center gap-2 border-b border-white/8 bg-ink-700 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-rose-400/70" />
        <span className="h-3 w-3 rounded-full bg-amber-400/70" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
        <div className="ml-3 flex flex-1 items-center gap-2 rounded-md bg-ink-800 px-3 py-1.5 text-[13px] text-mist/50">
          <span className="h-3 w-3 rounded-full ring-1 ring-mist/30" />
          {url}
        </div>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------- Chat
export function ChatMock({ data }) {
  return (
    <div className="flex h-full flex-col bg-ink-900">
      <div className="flex items-center gap-3 border-b border-white/8 bg-ink-700 px-5 py-3.5">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-iris-500 text-base font-bold text-ink-900">
          {data.initials}
        </span>
        <div>
          <p className="text-[15px] font-semibold text-white">{data.app}</p>
          <p className="flex items-center gap-1.5 text-[12px] text-mist/60">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {data.subtitle}
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-hidden p-5">
        {data.messages.map((m, i) =>
          m.card ? (
            <div key={i} className="max-w-[80%] rounded-2xl border border-white/10 bg-ink-600 p-4">
              <p className="mb-3 text-[13px] font-semibold text-white">{m.card.title}</p>
              <div className="space-y-2.5">
                {m.card.fields.map((f) => (
                  <div key={f.label}>
                    <p className="text-[11px] text-mist/55">{f.label}</p>
                    <div className="mt-1 rounded-lg border border-white/8 bg-ink-800 px-3 py-2 text-[13px] text-mist">
                      {f.value}
                    </div>
                  </div>
                ))}
                <div className="mt-1 rounded-lg bg-iris-500 py-2 text-center text-[13px] font-semibold text-ink-900">
                  {m.card.button}
                </div>
              </div>
            </div>
          ) : (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
                  m.from === "user"
                    ? "bg-iris-500 font-medium text-ink-900"
                    : "border border-white/8 bg-ink-600 text-mist"
                }`}
              >
                {m.text}
                {m.source && (
                  <span className="mt-2 block text-[11px] text-iris-400">Source · {m.source}</span>
                )}
              </div>
            </div>
          )
        )}
      </div>

      <div className="flex items-center gap-3 border-t border-white/8 bg-ink-700 p-4">
        <div className="flex-1 rounded-full border border-white/10 bg-ink-600 px-4 py-2.5 text-[13px] text-mist/45">
          {data.inputPlaceholder || "Type a message…"}
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-iris-500 text-ink-900">
          <ArrowUp size={18} />
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Dashboard
const navIcons = [BarChart3, Database, ShieldCheck];

export function DashboardMock({ data }) {
  return (
    <div className="flex h-full bg-ink-900">
      {/* sidebar */}
      <div className="flex w-16 flex-col items-center gap-4 border-r border-white/8 bg-ink-700 py-5">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-iris-500 text-sm font-bold text-ink-900">
          {data.initials}
        </span>
        {navIcons.map((Icon, i) => (
          <span
            key={i}
            className={`grid h-9 w-9 place-items-center rounded-xl ${
              i === 0 ? "bg-white/10 text-iris-300" : "text-mist/40"
            }`}
          >
            <Icon size={17} />
          </span>
        ))}
      </div>

      {/* main */}
      <div className="flex-1 overflow-hidden p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[17px] font-semibold text-white">{data.app}</p>
            <p className="text-[12px] text-mist/55">{data.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-ink-700 px-3 py-1.5 text-[12px] text-mist/45">
              <Search size={13} /> Search…
            </div>
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-iris-500 text-ink-900">
              <Plus size={16} />
            </span>
          </div>
        </div>

        {/* KPIs */}
        <div className="mt-4 grid grid-cols-4 gap-3">
          {data.kpis.map((k) => (
            <div key={k.label} className="rounded-xl border border-white/8 bg-ink-700 p-3">
              <p className="text-[11px] text-mist/55">{k.label}</p>
              <p className="mt-1 text-[20px] font-bold text-white">{k.value}</p>
              {k.delta && <p className={`text-[11px] font-medium ${tone[k.tone] || tone.mut}`}>{k.delta}</p>}
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-[1.55fr_1fr] gap-3">
          {/* chart */}
          {data.chart && (
            <div className="rounded-xl border border-white/8 bg-ink-700 p-4">
              <p className="text-[13px] font-semibold text-white">{data.chart.title}</p>
              <div className="mt-4 flex h-[150px] items-end gap-2">
                {data.chart.bars.map((b, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                    <div
                      className={`w-full rounded-t-md ${i % 2 ? "bg-iris-600" : "bg-iris-400"}`}
                      style={{ height: `${b}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* table */}
          {data.table && (
            <div className="rounded-xl border border-white/8 bg-ink-700 p-4">
              <p className="text-[13px] font-semibold text-white">{data.table.title}</p>
              <div className="mt-3 space-y-2.5">
                {data.table.rows.map((r, i) => (
                  <div key={i} className="flex items-center justify-between text-[12px]">
                    <span className="text-mist/75">{r.label}</span>
                    {r.status ? <StatusChip value={r.status} /> : <span className="font-medium text-white">{r.value}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Query (NL2SQL)
export function QueryMock({ data }) {
  return (
    <div className="flex h-full flex-col bg-ink-900 p-5">
      <p className="text-[17px] font-semibold text-white">{data.app}</p>
      <p className="text-[12px] text-mist/55">{data.subtitle}</p>

      <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-ink-700 px-4 py-3">
        <Search size={16} className="text-mist/50" />
        <span className="flex-1 text-[14px] text-white">{data.query}</span>
        <span className="rounded-lg bg-iris-500 px-4 py-1.5 text-[13px] font-semibold text-ink-900">Run</span>
      </div>

      <div className="mt-3 grid flex-1 grid-cols-[1.2fr_1fr] gap-3">
        <div className="rounded-xl border border-white/8 bg-[#0e1220] p-4">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-semibold text-white">Generated SQL</p>
            <span className="rounded-full bg-emerald-500/12 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-500/25">
              Validated ✓
            </span>
          </div>
          <pre className="mt-3 whitespace-pre-wrap font-mono text-[12.5px] leading-relaxed text-mist/80">
            {data.sql.map((ln, i) => (
              <div key={i}>
                <span className={/^\s*(SELECT|FROM|WHERE|GROUP|ORDER|JOIN|ON|AS|SUM|EXTRACT|DATE_TRUNC)/.test(ln) ? "text-iris-300" : ""}>
                  {ln}
                </span>
              </div>
            ))}
          </pre>
        </div>

        <div className="rounded-xl border border-white/8 bg-ink-700 p-4">
          <p className="text-[13px] font-semibold text-white">{data.result.title}</p>
          <div className="mt-4 space-y-3">
            {data.result.rows.map((r) => (
              <div key={r.label} className="flex items-center gap-3 text-[12px]">
                <span className="w-14 text-mist/70">{r.label}</span>
                <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-ink-800">
                  <div className="h-full rounded-full bg-iris-500" style={{ width: `${r.pct}%` }} />
                </div>
                <span className="w-12 text-right text-mist/55">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Detection / IoT
export function DetectionMock({ data }) {
  return (
    <div className="flex h-full flex-col bg-ink-900">
      <div className="flex items-center gap-3 border-b border-white/8 bg-ink-700 px-5 py-3.5">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-iris-500 text-base font-bold text-ink-900">
          {data.initials}
        </span>
        <div>
          <p className="text-[15px] font-semibold text-white">{data.app}</p>
          <p className="flex items-center gap-1.5 text-[12px] text-mist/60">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> {data.subtitle}
          </p>
        </div>
        <span className="ml-auto rounded-full bg-emerald-500/12 px-3 py-1 text-[12px] font-medium text-emerald-300 ring-1 ring-emerald-500/25">
          Accuracy {data.accuracy}
        </span>
      </div>

      <div className="grid flex-1 grid-cols-[1.3fr_1fr] gap-4 p-5">
        <div>
          <div className="relative flex h-[230px] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#0a0d16]">
            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-ink-900/70 px-2 py-1 text-[11px] text-mist/70">
              <Video size={12} className="text-rose-400" /> {data.camLabel}
            </div>
            <Camera size={42} className="text-white/10" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="rounded-md border-2 border-iris-400 px-10 py-5" />
              <span className="absolute -top-6 left-0 whitespace-nowrap rounded bg-iris-500 px-2 py-0.5 text-[11px] font-bold text-ink-900">
                {data.detected} · {data.confidence}
              </span>
            </div>
            <span className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[11px] text-iris-300">
              <ScanLine size={12} /> detecting…
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 rounded-xl border border-white/8 bg-ink-700 px-4 py-3">
              <p className="text-[11px] text-mist/55">Decision</p>
              <p className="text-[13px] font-medium text-white">{data.rule}</p>
            </div>
            <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-5 py-3 text-center">
              <p className="text-[11px] text-emerald-300/80">Gate</p>
              <p className="text-[17px] font-bold text-emerald-300">{data.gate}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/8 bg-ink-700 p-4">
          <p className="text-[13px] font-semibold text-white">Detection log</p>
          <div className="mt-3 grid grid-cols-[1.3fr_1fr_0.9fr] gap-2 border-b border-white/8 pb-2 text-[11px] uppercase tracking-wide text-mist/45">
            <span>Plate</span>
            <span>Time</span>
            <span>Action</span>
          </div>
          <div className="mt-1 divide-y divide-white/6">
            {data.log.map((r, i) => (
              <div key={i} className="grid grid-cols-[1.3fr_1fr_0.9fr] items-center gap-2 py-2 text-[12px]">
                <span className="font-mono text-white">{r.plate}</span>
                <span className="text-mist/55">{r.time}</span>
                <StatusChip value={r.action} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
