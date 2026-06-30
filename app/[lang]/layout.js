import { Sora, Fraunces } from "next/font/google";
import "../globals.css";
import { locales, isLocale, getDict } from "@/lib/i18n";
import { profile } from "@/data/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ChatWidget from "@/components/ChatWidget";
import Spotlight from "@/components/Spotlight";

const sans = Sora({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap", style: ["italic", "normal"] });

export const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://rafif-portfolio.vercel.app");

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
    <html lang={lang} className={`${sans.variable} ${serif.variable}`}>
      <body className="bg-aurora font-sans antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScroll />
        <Spotlight />
        <Navbar lang={lang} dict={dict} />
        {children}
        <Footer lang={lang} dict={dict} />
        <ChatWidget dict={dict} />
      </body>
    </html>
  );
}
