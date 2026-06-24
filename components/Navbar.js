"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { sections, profile } from "@/data/content";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled ? "glass shadow-card" : "border border-transparent"
        }`}
      >
        <a href="#home" className="flex items-center gap-2 pl-1">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-iris-500/20 text-sm font-semibold text-iris-400 ring-1 ring-iris-500/40">
            R
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-white sm:inline">
            Rafif A.W.
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active === s.id
                    ? "text-white"
                    : "text-mist/60 hover:text-white"
                }`}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/15"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="hidden rounded-full bg-iris-500 px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:bg-iris-400 sm:inline-block"
          >
            Get in touch
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full text-white md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass absolute top-20 w-[calc(100%-2rem)] max-w-5xl rounded-2xl p-3 md:hidden"
        >
          <ul className="flex flex-col">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm ${
                    active === s.id ? "bg-white/10 text-white" : "text-mist/70"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${profile.email}`}
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-xl bg-iris-500 px-4 py-3 text-center text-sm font-medium text-ink-900"
              >
                Get in touch
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}
