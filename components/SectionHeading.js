import Reveal from "./Reveal";

// Numbered eyebrow + heading with a serif-italic accent word, per the
// reference video style ("02 — WHAT I DO" / "Services & *capabilities*.").
export default function SectionHeading({ index, eyebrow, title, accent, sub }) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal>
        <p className="eyebrow flex items-center gap-3">
          <span className="text-mist/60">{index}</span>
          <span className="h-px w-8 bg-iris-500/50" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}{" "}
          {accent && (
            <span className="font-serif italic font-light text-iris-400">
              {accent}
            </span>
          )}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-mist/70">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}
