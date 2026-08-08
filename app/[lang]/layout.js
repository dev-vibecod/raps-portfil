import { Sora, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { locales, isLocale, getDict } from "@/lib/i18n";
import { profile } from "@/data/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollProgress from "@/components/ScrollProgress";
import { Analytics } from "@vercel/analytics/react";

// Two variable families, one file each. Sora carries the prose; the mono
// carries every figure, label and tag — that contrast is the design.
const sans = Sora({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://rafif-portfolio.vercel.app");

// Only /id and /en are valid; any other first segment (e.g. /.env, /foobar)
// returns a real 404 instead of soft-rendering the home page.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  const lang = isLocale(params.lang) ? params.lang : "id";
  const dict = getDict(lang);
  const seo = dict.seo.home;
  return {
    metadataBase,
    title: { default: seo.title, template: `%s` },
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${lang}`,
      languages: { id: "/id", en: "/en", "x-default": "/id" },
    },
    openGraph: {
      type: "website",
      locale: lang === "id" ? "id_ID" : "en_US",
      url: `/${lang}`,
      title: seo.title,
      description: seo.description,
      siteName: profile.name,
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
    robots: { index: true, follow: true },
  };
}

export default function LangLayout({ children, params }) {
  const lang = isLocale(params.lang) ? params.lang : "id";
  const dict = getDict(lang);
  return (
    <html lang={lang} className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-aurora font-sans antialiased">
        {/* <Reveal> hides its children until an IntersectionObserver fires.
            With JS off that never happens, so unhide everything. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <ScrollProgress />
        <Navbar lang={lang} dict={dict} />
        {children}
        <Footer lang={lang} dict={dict} />
        <ChatWidget dict={dict} />
        <Analytics />
      </body>
    </html>
  );
}
