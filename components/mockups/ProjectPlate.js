// Card thumbnail for project grids.
//
// The grid used to render the full live mockup (~150 nodes each, 6 of them on
// the home page) scaled down to ~300px wide, where none of the fake UI text is
// legible anyway — it cost 456 KB of HTML to render noise. This renders the
// same idea as a typographic plate: the product's URL, its archetype, and an
// abstract glyph. ~14 nodes, readable at thumbnail size, and it reads as one
// system across all nine projects.
//
// The real mockups still live on /projects/[slug], at a size where they work.

const ARCHETYPE = {
  chat: "Conversational",
  dashboard: "Dashboard",
  query: "Natural-language query",
  detection: "Computer vision",
};

function Glyph({ type }) {
  if (type === "chat") {
    return (
      <div className="flex w-full max-w-[68%] flex-col gap-2">
        <span className="h-2.5 w-[62%] rounded-full bg-line-strong" />
        <span className="h-2.5 w-[80%] self-end rounded-full bg-iris-500/70" />
        <span className="h-2.5 w-[46%] rounded-full bg-line-strong" />
      </div>
    );
  }
  if (type === "query") {
    return (
      <div className="flex w-full max-w-[68%] flex-col gap-2.5">
        <span className="h-6 w-full rounded-md border border-iris-500/40 bg-iris-500/10" />
        <span className="h-2 w-[88%] rounded-full bg-line-strong" />
        <span className="h-2 w-[64%] rounded-full bg-line-strong" />
      </div>
    );
  }
  if (type === "detection") {
    return (
      <div className="relative h-[58%] w-[52%] rounded-md border border-line-strong">
        <span className="absolute left-[18%] top-[24%] h-[46%] w-[38%] rounded-sm border-2 border-iris-400" />
        <span className="absolute bottom-[14%] right-[12%] h-[26%] w-[22%] rounded-sm border border-line-strong" />
      </div>
    );
  }
  // dashboard
  return (
    <div className="flex w-full max-w-[68%] items-end gap-2">
      {[38, 64, 46, 88, 58].map((h, i) => (
        <span
          key={h}
          className={`flex-1 rounded-sm ${i === 3 ? "bg-iris-500/70" : "bg-line-strong"}`}
          style={{ height: `${h * 0.5}px` }}
        />
      ))}
    </div>
  );
}

export default function ProjectPlate({ mockup }) {
  const type = ARCHETYPE[mockup.type] ? mockup.type : "dashboard";
  return (
    <div className="flex aspect-[16/10] w-full flex-col bg-ink-700">
      {/* Address strip — reads as "this is a shipped product" without
          rendering an entire fake browser. */}
      <div className="flex items-center gap-2 border-b border-line-soft px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
        <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
        <span className="truncate font-mono text-2xs text-mist/60">{mockup.url}</span>
      </div>

      <div className="flex flex-1 items-center justify-center px-4">
        <Glyph type={type} />
      </div>

      <div className="px-3 pb-2.5">
        <span className="font-mono text-2xs uppercase tracking-label text-iris-400/70">
          {ARCHETYPE[type]}
        </span>
      </div>
    </div>
  );
}
