import Reveal from "./Reveal";
import { Mail, Phone, Linkedin, MapPin, ArrowUpRight, MessageCircle } from "lucide-react";
import ContactForm from "./ContactForm";

// Generic contact block. `copy` = { title, accent, sub }. `withForm` shows the
// project-brief form (contact page); otherwise a compact CTA (home).
export default function Contact({ lang, dict, profile, copy, withForm = false }) {
  const wa = `https://wa.me/${profile.phoneE164}`;
  const methods = [
    { icon: MessageCircle, label: "WhatsApp", value: profile.phone, href: wa },
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Linkedin, label: "LinkedIn", value: "in/rafifayyassarwicaksono", href: profile.linkedin },
    { icon: MapPin, label: "Location", value: profile.location, href: null },
  ];

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-[2rem] p-8 shadow-card sm:p-12">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background:radial-gradient(40rem_20rem_at_50%_-20%,rgba(111,120,245,0.25),transparent_70%)]" />
          <div className={withForm ? "grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center" : "text-center"}>
            <div className={withForm ? "" : "mx-auto max-w-2xl"}>
              <p className="eyebrow">{dict.nav.contact}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                {copy.title} <span className="font-serif italic font-light text-iris-400">{copy.accent}</span>
              </h2>
              <p className="mt-4 max-w-xl text-mist/70">{copy.sub || copy.intro}</p>

              {!withForm && (
                <a href={`/${lang}/contact`} className="group mt-8 inline-flex items-center gap-2 rounded-full bg-iris-500 px-6 py-3.5 text-sm font-medium text-ink-900 transition-colors hover:bg-iris-400">
                  {dict.common.getInTouch}
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}

              <div className={`mt-8 grid gap-3 ${withForm ? "sm:grid-cols-1" : "mx-auto max-w-2xl sm:grid-cols-2"}`}>
                {methods.map((m) => {
                  const Inner = (
                    <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-left transition-colors hover:border-iris-500/40">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-iris-500/15 text-iris-400"><m.icon size={16} /></span>
                      <span className="min-w-0">
                        <span className="block text-[11px] uppercase tracking-wider text-mist/45">{m.label}</span>
                        <span className="block truncate text-sm text-white">{m.value}</span>
                      </span>
                    </div>
                  );
                  return m.href ? (
                    <a key={m.label} href={m.href} target={m.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{Inner}</a>
                  ) : (
                    <div key={m.label}>{Inner}</div>
                  );
                })}
              </div>
            </div>

            {withForm && <ContactForm dict={dict} phone={profile.phoneE164} email={profile.email} />}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
