import { getDict, isLocale } from "./i18n";

// Build per-page metadata from a dict.seo key, with hreflang alternates.
export function pageMetadata(lang, key, path) {
  const l = isLocale(lang) ? lang : "id";
  const seo = getDict(l).seo[key];
  const sub = path ? `/${path}` : "";
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${l}${sub}`,
      languages: { id: `/id${sub}`, en: `/en${sub}`, "x-default": `/id${sub}` },
    },
    openGraph: {
      type: "website",
      locale: l === "id" ? "id_ID" : "en_US",
      url: `/${l}${sub}`,
      title: seo.title,
      description: seo.description,
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  };
}
