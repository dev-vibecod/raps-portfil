"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Mail, MapPin } from "lucide-react";
import CountUp from "./CountUp";

const stack = [
  { k: "GenAI / LLM", v: "RAG · Agents" },
  { k: "Backend", v: "Python · FastAPI" },
  { k: "Data / ML", v: "Pipelines · MLOps" },
  { k: "Cloud", v: "GCP · AWS" },
];
const ease = [0.22, 1, 0.36, 1];

export default function Hero({ lang, dict, profile }) {
  const t = dict.hero;
  return (
    <section className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pt-28 pb-16 sm:px-8">
      {/* Floating gradient orbs */}
      <div aria-hidden className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-iris-500/20 blur-[100px] animate-float" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-iris-400/15 blur-[120px] animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="eyebrow flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-iris-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-iris-400" />
            </span>
            {dict.common.available}
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05, ease }} className="mt-5 text-[2.6rem] font-semibold leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {t.titleA} <span className="font-serif italic font-light text-gradient">{t.titleAccent}</span> {t.titleB}
            <span className="text-iris-500">.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12, ease }} className="mt-6 max-w-xl text-base leading-relaxed text-mist/75 sm:text-lg">
            {profile.tagline}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18, ease }} className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={`/${lang}/projects`} className="group inline-flex items-center gap-2 rounded-full bg-iris-500 px-5 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-iris-400">
              {t.ctaPrimary}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-iris-500/50 hover:bg-white/5">
              {t.ctaSecondary}
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.28 }} className="mt-8 flex items-center gap-4 text-mist/60">
            <span className="inline-flex items-center gap-1.5 text-sm"><MapPin size={15} /> {profile.location}</span>
            <span className="h-4 w-px bg-white/15" />
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-iris-400" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href={`mailto:${profile.email}`} className="transition-colors hover:text-iris-400" aria-label="Email"><Mail size={18} /></a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.36 }} className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {[
              { v: "3+", k: t.stats.years },
              { v: "20+", k: t.stats.projects },
              { v: "~2,000", k: t.stats.users },
            ].map((s) => (
              <div key={s.k}>
                <CountUp value={s.v} className="text-2xl font-bold text-gradient sm:text-3xl" />
                <p className="mt-0.5 text-[11px] uppercase tracking-wider text-mist/50">{s.k}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.2, ease }} className="glass relative rounded-3xl p-5 shadow-card sm:p-6">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Skill stack</p>
            <span className="rounded-full bg-iris-500/15 px-2.5 py-1 text-[11px] font-medium text-iris-400 ring-1 ring-iris-500/30">3+ yrs · 20+ projects</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {stack.map((s, i) => (
              <motion.div key={s.k} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }} className="glass-hover rounded-2xl bg-white/[0.03] p-4">
                <p className="text-xs text-mist/55">{s.k}</p>
                <p className="mt-1 text-sm font-medium text-white">{s.v}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/[0.03] px-4 py-3">
            <span className="text-xs text-mist/55">End-to-end delivery</span>
            <div className="flex items-end gap-[3px]">
              {[10, 18, 8, 22, 14, 26, 12, 20, 9, 24, 16].map((h, i) => (
                <motion.span key={i} className="w-[3px] rounded-full bg-gradient-to-t from-iris-600 to-iris-400" initial={{ height: 4 }} animate={{ height: [4, h, 6, h * 0.7, 4] }} transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }} />
              ))}
            </div>
            <span className="text-xs font-semibold text-iris-400">solo</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
