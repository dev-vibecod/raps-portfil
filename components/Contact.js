import Reveal from "./Reveal";
import { Mail, Phone, Linkedin, MapPin, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/content";

export default function Contact() {
  const items = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, "")}` },
    { icon: Linkedin, label: "LinkedIn", value: "in/rafifayyassarwicaksono", href: profile.linkedin },
    { icon: MapPin, label: "Location", value: profile.location, href: null },
  ];

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-[2rem] p-8 text-center shadow-card sm:p-14">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background:radial-gradient(40rem_20rem_at_50%_-20%,rgba(111,120,245,0.25),transparent_70%)]" />
          <p className="eyebrow">Contact</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Let&apos;s build something{" "}
            <span className="font-serif italic font-light text-iris-400">great.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-mist/70">
            Open to freelance projects and full-time roles. Live demos available on request.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-iris-500 px-6 py-3.5 text-sm font-medium text-ink-900 transition-colors hover:bg-iris-400"
          >
            Get in touch
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <div className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
            {items.map((it) => {
              const Inner = (
                <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-left transition-colors hover:border-iris-500/40">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-iris-500/15 text-iris-400">
                    <it.icon size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-wider text-mist/45">{it.label}</span>
                    <span className="block truncate text-sm text-white">{it.value}</span>
                  </span>
                </div>
              );
              return it.href ? (
                <a key={it.label} href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {Inner}
                </a>
              ) : (
                <div key={it.label}>{Inner}</div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
