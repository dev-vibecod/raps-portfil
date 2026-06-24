"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/content";

const stack = [
  { k: "GenAI / LLM", v: "RAG · Agents" },
  { k: "Backend", v: "Python · FastAPI" },
  { k: "Data / ML", v: "Pipelines · MLOps" },
  { k: "Cloud", v: "GCP · AWS" },
];

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pt-28 pb-16 sm:px-8"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left: intro */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="eyebrow flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-iris-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-iris-400" />
            </span>
            Available for freelance & full-time
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
            className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl"
          >
            Backend &amp; <span className="font-serif italic font-light text-iris-400">AI/ML</span>{" "}
            engineer shipping <br className="hidden sm:block" />
            production systems<span className="text-iris-500">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-mist/75 sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-iris-500 px-5 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-iris-400"
            >
              View projects
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-iris-500/50 hover:bg-white/5"
            >
              Let&apos;s talk
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-8 flex items-center gap-4 text-mist/60"
          >
            <span className="inline-flex items-center gap-1.5 text-sm">
              <MapPin size={15} /> {profile.location}
            </span>
            <span className="h-4 w-px bg-white/15" />
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-iris-400" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${profile.email}`} className="transition-colors hover:text-iris-400" aria-label="Email">
              <Mail size={18} />
            </a>
          </motion.div>
        </div>

        {/* Right: glass skill-stack card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="glass relative rounded-3xl p-5 shadow-card sm:p-6"
        >
          <div className="flex items-center justify-between">
            <p className="eyebrow">Skill stack</p>
            <span className="rounded-full bg-iris-500/15 px-2.5 py-1 text-[11px] font-medium text-iris-400 ring-1 ring-iris-500/30">
              3+ yrs · 20+ projects
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {stack.map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                className="glass-hover rounded-2xl bg-white/[0.03] p-4"
              >
                <p className="text-xs text-mist/55">{s.k}</p>
                <p className="mt-1 text-sm font-medium text-white">{s.v}</p>
              </motion.div>
            ))}
          </div>

          {/* Faux activity waveform, echoing the reference widget. */}
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/[0.03] px-4 py-3">
            <span className="text-xs text-mist/55">End-to-end delivery</span>
            <div className="flex items-end gap-[3px]">
              {[10, 18, 8, 22, 14, 26, 12, 20, 9, 24, 16].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full bg-gradient-to-t from-iris-600 to-iris-400"
                  initial={{ height: 4 }}
                  animate={{ height: [4, h, 6, h * 0.7, 4] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-iris-400">solo</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
