import { isLocale, getDict, locales } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/meta";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  return pageMetadata(params.lang, "services", "services");
}

export default function ServicesPage({ params }) {
  const lang = isLocale(params.lang) ? params.lang : "id";
  const dict = getDict(lang);
  const { profile } = getContent(lang);
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://rafif-portfolio.vercel.app").replace(/\/$/, "");
  return (
    <main className="pt-16">
      <JsonLd lang={lang} baseUrl={baseUrl} />
      <Services lang={lang} dict={dict} />
      <Contact lang={lang} dict={dict} profile={profile} copy={dict.contact} />
    </main>
  );
}
