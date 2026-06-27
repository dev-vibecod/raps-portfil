"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import LangToggle from "./LangToggle";

export default function Navbar({ lang, dict }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: `/${lang}`, label: dict.nav.home, exact: true },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/projects`, label: dict.nav.projects },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  const isActive = (l) => (l.exact ? pathname === l.href : pathname.startsWith(l.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled ? "glass shadow-card" : "border border-transparent"
        }`}
      >
        <Link href={`/${lang}`} className="flex items-center gap-2 pl-1">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-iris-500/20 text-sm font-semibold text-iris-400 ring-1 ring-iris-500/40">R</span>
          <span className="hidden text-sm font-semibold tracking-tight text-white sm:inline">Rafif A.W.</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  isActive(l) ? "text-white" : "text-mist/60 hover:text-white"
                }`}
              >
                {isActive(l) && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/15" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangToggle lang={lang} />
          <Link href={`/${lang}/contact`} className="hidden rounded-full bg-iris-500 px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:bg-iris-400 sm:inline-block">
            {dict.nav.cta}
          </Link>
          <button aria-label="Menu" onClick={() => setOpen((o) => !o)} className="grid h-9 w-9 place-items-center rounded-full text-white md:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="glass absolute top-20 w-[calc(100%-2rem)] max-w-5xl rounded-2xl p-3 md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className={`block rounded-xl px-4 py-3 text-sm ${isActive(l) ? "bg-white/10 text-white" : "text-mist/70"}`}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/${lang}/contact`} onClick={() => setOpen(false)} className="mt-1 block rounded-xl bg-iris-500 px-4 py-3 text-center text-sm font-medium text-ink-900">
                {dict.nav.cta}
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}
