"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X, ImageOff } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { projects } from "@/data/content";

// Graceful preview: shows the Figma-made mockup if present, otherwise a
// labelled placeholder so the layout never breaks before assets are dropped in.
function Preview({ project, className = "" }) {
  const [errored, setErrored] = useState(false);
  const show = project.preview && !errored;

  return (
    <div className={`relative overflow-hidden rounded-xl bg-ink-700 ring-1 ring-white/8 ${className}`}>
      {show ? (
        <Image
          src={project.preview}
          alt={`${project.title} — representative mockup`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-grid-faint p-6 text-center [background-size:24px_24px]">
          <ImageOff size={22} className="text-mist/40" />
          <p className="text-xs font-medium text-mist/55">{project.assetType}</p>
          <p className="text-[11px] text-mist/35">Figma mockup pending</p>
        </div>
      )}
      <span className="absolute left-2 top-2 rounded-md bg-ink-900/80 px-2 py-1 text-[10px] font-medium text-mist/70 ring-1 ring-white/10 backdrop-blur">
        Representative mockup — not the live product
      </span>
    </div>
  );
}

function Card({ project, onOpen, delay }) {
  return (
    <Reveal delay={delay}>
      <button
        onClick={onOpen}
        className="glass glass-hover group flex h-full w-full flex-col overflow-hidden rounded-3xl p-4 text-left"
      >
        <Preview project={project} className="aspect-[16/10] w-full" />
        <div className="flex flex-1 flex-col px-1 pt-4">
          <span className="text-[11px] font-medium uppercase tracking-wider text-iris-400/80">
            {project.industry}
          </span>
          <h3 className="mt-2 text-lg font-semibold leading-snug text-white">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-mist/60">{project.summary}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((s) => (
              <span key={s} className="rounded-full border border-white/8 bg-white/[0.03] px-2 py-0.5 text-[11px] text-mist/60">
                {s}
              </span>
            ))}
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-iris-400">
            View details
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </button>
    </Reveal>
  );
}

function Detail({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const blocks = [
    { label: "Problem", text: project.problem },
    { label: "What I built", text: project.built },
    { label: "Outcome", text: project.outcome },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink-900/80 p-4 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass relative my-8 w-full max-w-3xl rounded-3xl p-5 shadow-card sm:p-7"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/5 text-mist/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>

        <span className="text-[11px] font-medium uppercase tracking-wider text-iris-400/80">
          {project.industry}
        </span>
        <h3 className="mt-2 max-w-[90%] text-2xl font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-mist/65">{project.summary}</p>

        <Preview project={project} className="mt-5 aspect-[16/9] w-full" />

        <div className="mt-6 space-y-5">
          {blocks.map((b) => (
            <div key={b.label}>
              <p className="eyebrow">{b.label}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-mist/75">{b.text}</p>
            </div>
          ))}
          <div>
            <p className="eyebrow">Stack</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="rounded-full border border-iris-500/25 bg-iris-500/10 px-3 py-1 text-xs text-iris-400">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [active, setActive] = useState(null);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        index="03"
        eyebrow="Selected work"
        title="Featured"
        accent="projects."
        sub="End-to-end products delivered as freelance work, each owned from problem definition through deployment. Repositories are private; previews below are representative mockups."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Card key={p.slug} project={p} delay={(i % 3) * 0.06} onOpen={() => setActive(p)} />
        ))}
      </div>

      <AnimatePresence>
        {active && <Detail project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
