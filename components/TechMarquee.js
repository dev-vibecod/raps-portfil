import { TECHS } from "@/lib/techIcons";

function Pill({ Icon, name, color }) {
  return (
    <div className="glass flex shrink-0 items-center gap-2.5 rounded-full px-4 py-2.5">
      <Icon size={20} style={{ color }} />
      <span className="text-sm font-medium text-mist/85">{name}</span>
    </div>
  );
}

function Row({ items, reverse }) {
  return (
    <div className="flex w-max">
      <div className={`flex gap-3 pr-3 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {items.map((t) => <Pill key={t.name} {...t} />)}
      </div>
      <div className={`flex gap-3 pr-3 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`} aria-hidden="true">
        {items.map((t) => <Pill key={t.name + "-dup"} {...t} />)}
      </div>
    </div>
  );
}

// Two tracks scrolling in opposite directions for a fuller, livelier strip.
export default function TechMarquee({ title }) {
  const mid = Math.ceil(TECHS.length / 2);
  const rowA = TECHS.slice(0, mid);
  const rowB = TECHS.slice(mid);

  return (
    <section className="py-12 md:py-16">
      {title && (
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.28em] text-mist/50">{title}</p>
      )}
      <div className="group/marquee marquee-mask flex flex-col gap-3 overflow-hidden">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  );
}
