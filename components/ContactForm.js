"use client";

import { useState } from "react";
import { MessageCircle, Mail } from "lucide-react";

// No backend: composes a prefilled WhatsApp deep link (and a mailto fallback)
// from the visitor's input.
export default function ContactForm({ dict, phone, email }) {
  const f = dict.contact.form;
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [detail, setDetail] = useState("");

  const message = [
    `${dict.contact.waPrefix} ${name || "(...)"}.`,
    `${dict.contact.waMid} ${project || "(...)"}.`,
    detail ? `${dict.contact.waDetail} ${detail}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const wa = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const subject = encodeURIComponent("Project inquiry");
  const mailto = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(message)}`;

  // A placeholder is not a label: it disappears the moment you type, and
  // assistive tech is not required to announce it. Each field gets a real
  // <label>, visually hidden so the compact form is unchanged.
  // The focus ring is a ring utility rather than `outline-none` alone — a 1px
  // border colour shift on a dark field is not a perceivable focus indicator.
  const field =
    "w-full rounded-xl border border-line bg-ink-700 px-4 py-3 text-sm text-white placeholder:text-mist/60 focus:border-iris-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-iris-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-800";

  // No `.surface` here: on /contact this renders inside the Contact panel,
  // which is already a surface. A solid card inside an identical solid card
  // reads as a rendering mistake. A hairline does the separating instead.
  return (
    <div className="border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
      <p className="text-sm font-semibold text-white">{dict.contact.formTitle}</p>
      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor="cf-name" className="sr-only">
            {f.name}
          </label>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={f.name}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="cf-project" className="sr-only">
            {f.placeholderProject}
          </label>
          <input
            id="cf-project"
            name="project"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            placeholder={f.placeholderProject}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="cf-detail" className="sr-only">
            {f.placeholderDetail}
          </label>
          <textarea
            id="cf-detail"
            name="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder={f.placeholderDetail}
            rows={3}
            className={`resize-none ${field}`}
          />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-iris-500 px-5 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-iris-400"
        >
          <MessageCircle size={16} aria-hidden /> {f.send}
        </a>
        <a
          href={mailto}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-medium text-white transition-colors hover:border-iris-500/50 hover:bg-veil-strong"
        >
          <Mail size={16} aria-hidden /> {f.sendEmail}
        </a>
      </div>
    </div>
  );
}
