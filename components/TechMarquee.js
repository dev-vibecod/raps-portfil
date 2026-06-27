import { TECHS } from "@/lib/techIcons";

function Pill({ Icon, name, color }) {
  return (
    <div className="glass flex shrink-0 items-center gap-2.5 rounded-full px-4 py-2.5">
      <Icon size={20} style={{ color }} />
      <span className="text-sm font-medium text-mist/85">{name}</span>
    </div>
  );
}

// Two duplicated tracks scrolling left for a seamless infinite loop.
export default function TechMarquee({ title }) {
  return (
    <section className="py-12 md:py-16">
      {title && (
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.28em] text-mist/50">{title}</p>
      )}
      <div className="group/marquee marquee-mask relative flex overflow-hidden">
        <div className="flex animate-marquee gap-3 pr-3">
          {TECHS.map((t) => <Pill key={t.name} {...t} />)}
        </div>
        <div className="flex animate-marquee gap-3 pr-3" aria-hidden="true">
          {TECHS.map((t) => <Pill key={t.name + "-dup"} {...t} />)}
        </div>
      </div>
    </section>
  );
}
