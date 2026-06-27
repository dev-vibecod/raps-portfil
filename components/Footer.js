import Link from "next/link";
import { profile } from "@/data/content";
import { pick } from "@/lib/i18n";

export default function Footer({ lang, dict }) {
  const links = [
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/projects`, label: dict.nav.projects },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];
  return (
    <footer className="border-t border-white/8 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">{profile.name}</p>
          <p className="mt-1 text-xs text-mist/50">{pick(profile.note, lang)}</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-mist/60">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="mx-auto mt-6 max-w-6xl text-xs text-mist/40">© 2026 {profile.name}. {dict.footer.rights}</p>
    </footer>
  );
}
