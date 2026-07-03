import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { isLocale, getDict, locales, localize } from "@/lib/i18n";
import { pageMetadata } from "@/lib/meta";
import { posts } from "@/data/posts";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  return pageMetadata(params.lang, "blog", "blog");
}

export default function BlogIndex({ params }) {
  const lang = isLocale(params.lang) ? params.lang : "id";
  const dict = getDict(lang);
  const items = localize(posts, lang).sort((a, b) => (a.date < b.date ? 1 : -1));
  const fmt = new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-US", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main className="mx-auto max-w-4xl px-5 pb-24 pt-28 sm:px-8">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">{dict.blog.title}</h1>
        <p className="mt-4 max-w-2xl text-mist/70">{dict.blog.intro}</p>
      </Reveal>

      <div className="mt-12 space-y-5">
        {items.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <Link href={`/${lang}/blog/${p.slug}`} className="glass glass-hover group block rounded-3xl p-6 sm:p-7">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-mist/50">
                <time dateTime={p.date}>{fmt.format(new Date(p.date))}</time>
                <span className="h-3 w-px bg-white/15" />
                <span className="inline-flex items-center gap-1"><Clock size={12} /> {p.readMinutes} {dict.blog.readTime}</span>
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-mist/60">{t}</span>
                ))}
              </div>
              <h2 className="mt-3 text-xl font-semibold leading-snug text-white sm:text-2xl">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist/65">{p.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-iris-400">
                {dict.common.learnMore}
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
