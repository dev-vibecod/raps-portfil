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

  return (
    <div className="glass rounded-3xl p-6 sm:p-7">
      <p className="text-sm font-semibold text-white">{dict.contact.formTitle}</p>
      <div className="mt-4 space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={f.name}
          className="w-full rounded-xl border border-white/10 bg-ink-700 px-4 py-3 text-sm text-white placeholder:text-mist/40 focus:border-iris-500/50 focus:outline-none"
        />
        <input
          value={project}
          onChange={(e) => setProject(e.target.value)}
          placeholder={f.placeholderProject}
          className="w-full rounded-xl border border-white/10 bg-ink-700 px-4 py-3 text-sm text-white placeholder:text-mist/40 focus:border-iris-500/50 focus:outline-none"
        />
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder={f.placeholderDetail}
          rows={3}
          className="w-full resize-none rounded-xl border border-white/10 bg-ink-700 px-4 py-3 text-sm text-white placeholder:text-mist/40 focus:border-iris-500/50 focus:outline-none"
        />
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <a href={wa} target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-iris-500 px-5 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-iris-400">
          <MessageCircle size={16} /> {f.send}
        </a>
        <a href={mailto} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-iris-500/50 hover:bg-white/5">
          <Mail size={16} /> {f.sendEmail}
        </a>
      </div>
    </div>
  );
}
