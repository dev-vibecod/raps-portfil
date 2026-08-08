const methodStyles = {
  GET: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/25",
  POST: "bg-iris-500/15 text-iris-300 ring-iris-500/25",
  PATCH: "bg-amber-500/15 text-amber-300 ring-amber-500/25",
  PUT: "bg-amber-500/15 text-amber-300 ring-amber-500/25",
  DELETE: "bg-rose-500/15 text-rose-300 ring-rose-500/25",
};

export default function BackendInfo({ backend, labels }) {
  return (
    <div>
      <p className="text-sm leading-relaxed text-mist/75">{backend.blurb}</p>

      {/* Endpoints */}
      <div className="mt-6">
        <p className="eyebrow">{labels?.apiEndpoints || "API endpoints"}</p>
        <div className="mt-3 overflow-hidden rounded-2xl border border-line">
          {backend.endpoints.map((e, i) => (
            <div
              key={e.path + i}
              className="flex flex-col gap-1 border-b border-line-soft bg-veil px-4 py-3 last:border-0 sm:flex-row sm:items-center sm:gap-4"
            >
              <span className={`w-fit rounded-md px-2 py-0.5 text-2xs font-semibold ring-1 ${methodStyles[e.method] || "bg-veil-strong text-mist ring-line-strong"}`}>
                {e.method}
              </span>
              <code className="font-mono text-sm text-white">{e.path}</code>
              <span className="text-sm text-mist/70 sm:ml-auto sm:text-right">{e.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Data model + notes */}
      <div className="mt-6 grid gap-3 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="eyebrow">{labels?.dataModel || "Data model"}</p>
          <div className="mt-3 space-y-2">
            {backend.entities.map((ent) => (
              <div key={ent.name} className="rounded-2xl border border-line bg-veil p-3.5">
                <p className="font-mono text-sm font-semibold text-iris-300">{ent.name}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {ent.fields.map((f) => (
                    <span key={f} className="rounded-md bg-veil-strong px-2 py-0.5 font-mono text-2xs text-mist/65">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">{labels?.notes || "Implementation notes"}</p>
          <ul className="mt-3 space-y-2">
            {backend.notes.map((n) => (
              <li key={n} className="flex gap-2.5 text-sm leading-relaxed text-mist/70">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-iris-500/70" />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
