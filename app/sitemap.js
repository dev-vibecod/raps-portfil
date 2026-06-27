import { locales } from "@/lib/i18n";
import { allSlugs } from "@/lib/content";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://rafif-portfolio.vercel.app").replace(/\/$/, "");

export default function sitemap() {
  const routes = ["", "services", "projects", "about", "contact"];
  const entries = [];

  for (const lang of locales) {
    for (const r of routes) {
      entries.push({
        url: `${baseUrl}/${lang}${r ? "/" + r : ""}`,
        changeFrequency: "monthly",
        priority: r === "" ? 1 : 0.8,
      });
    }
    for (const slug of allSlugs) {
      entries.push({
        url: `${baseUrl}/${lang}/projects/${slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }
  return entries;
}
