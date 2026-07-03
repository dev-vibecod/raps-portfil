import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { isLocale, getDict, locales, localize } from "@/lib/i18n";
import { posts, postSlugs } from "@/data/posts";
import { profile } from "@/data/content";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return locales.flatMap((lang) => postSlugs.map((slug) => ({ lang, slug })));
}

export function generateMetadata({ params }) {
  const lang = isLocale(params.lang) ? params.lang : "id";
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  const l = localize(post, lang);
  const sub = `blog/${post.slug}`;
  return {
    title: `${l.title} — ${profile.name}`,
    description: l.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `/${lang}/${sub}`,
      languages: { id: `/id/${sub}`, en: `/en/${sub}`, "x-default": `/id/${sub}` },
    },
    openGraph: { type: "article", title: l.title, description: l.excerpt, url: `/${lang}/${sub}`, publishedTime: post.date },
  };
}

export default function BlogPost({ params }) {
  const lang = isLocale(params.lang) ? params.lang : "id";
  const dict = getDict(lang);
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();
  const l = localize(post, lang);
  const fmt = new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-US", { day: "numeric", month: "long", year: "numeric" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: l.title,
    description: l.excerpt,
    datePublished: post.date,
    inLanguage: lang,
    author: { "@type": "Person", name: profile.name, url: profile.linkedin },
  };

  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Reveal>
        <Link href={`/${lang}/blog`} className="inline-flex items-center gap-2 text-sm text-mist/70 transition-colors hover:text-white">
          <ArrowLeft size={16} /> {dict.blog.back}
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-mist/55">
          <time dateTime={post.date}>{fmt.format(new Date(post.date))}</time>
          <span className="h-3 w-px bg-white/15" />
          <span className="inline-flex items-center gap-1"><Clock size={12} /> {post.readMinutes} {dict.blog.readTime}</span>
          {post.tags.map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-mist/60">{t}</span>
          ))}
        </div>

        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">{l.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-mist/70">{l.excerpt}</p>
      </Reveal>

      <article className="mt-10 space-y-10">
        {l.sections.map((s, i) => (
          <Reveal key={i} delay={0.05}>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{s.h}</h2>
              <div className="mt-3 space-y-4">
                {s.body.map((para, j) => (
                  <p key={j} className="text-[15px] leading-relaxed text-mist/75">{para}</p>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </article>

      {/* CTA */}
      <Reveal>
        <div className="glass mt-14 rounded-3xl p-7 text-center sm:p-9">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">{dict.blog.ctaTitle}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-mist/70">{dict.blog.ctaBody}</p>
          <Link href={`/${lang}/contact`} className="group mt-5 inline-flex items-center gap-2 rounded-full bg-iris-500 px-6 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-iris-400">
            {dict.blog.ctaButton}
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
