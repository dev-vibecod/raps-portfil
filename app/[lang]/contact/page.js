import { isLocale, getDict, locales } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/meta";
import Reveal from "@/components/Reveal";
import Contact from "@/components/Contact";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  return pageMetadata(params.lang, "contact", "contact");
}

export default function ContactPage({ params }) {
  const lang = isLocale(params.lang) ? params.lang : "id";
  const dict = getDict(lang);
  const { profile } = getContent(lang);

  return (
    <main className="pt-24">
      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h1 className="sr-only">{dict.contact.title} {dict.contact.accent}</h1>
        </Reveal>
      </section>
      <Contact lang={lang} dict={dict} profile={profile} copy={dict.contact} withForm />
    </main>
  );
}
