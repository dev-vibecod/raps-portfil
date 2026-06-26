import { ArrowRight } from "lucide-react";

// Horizontal node flow (wraps to vertical on small screens) + optional layers.
export default function ArchFlow({ architecture }) {
  return (
    <div>
      <p className="text-sm leading-relaxed text-mist/75">{architecture.blurb}</p>

      <div className="mt-6 flex flex-col flex-wrap items-stretch gap-2 sm:flex-row sm:items-center">
        {architecture.flow.map((node, i) => (
          <div key={node} className="flex items-center gap-2">
            <div className="rounded-xl border border-iris-500/25 bg-iris-500/8 px-3.5 py-2.5 text-center text-[13px] font-medium text-white">
              {node}
            </div>
            {i < architecture.flow.length - 1 && (
              <ArrowRight size={16} className="shrink-0 rotate-90 text-iris-400/70 sm:rotate-0" />
            )}
          </div>
        ))}
      </div>

      {architecture.layers && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {architecture.layers.map((layer) => (
            <div key={layer.name} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-iris-400">{layer.name}</p>
              <ul className="mt-2 space-y-1.5">
                {layer.items.map((it) => (
                  <li key={it} className="flex gap-2 text-[13px] text-mist/70">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-iris-500/70" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
