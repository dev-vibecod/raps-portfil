import { locales } from "@/lib/i18n";
import { allSlugs } from "@/lib/content";
import { posts } from "@/data/posts";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://rafif-portfolio.vercel.app").replace(/\/$/, "");

export default function sitemap() {
  const routes = ["", "services", "projects", "blog", "about", "contact", "cv"];
  const entries = [];

  for (const lang of locales) {
    for (const r of routes) {
      entries.push({
        url: `${baseUrl}/${lang}${r ? "/" + r : ""}`,
        changeFrequency: r === "blog" ? "weekly" : "monthly",
        priority: r === "" ? 1 : r === "services" || r === "blog" ? 0.9 : 0.8,
      });
    }
    for (const slug of allSlugs) {
      entries.push({
        url: `${baseUrl}/${lang}/projects/${slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    for (const p of posts) {
      entries.push({
        url: `${baseUrl}/${lang}/blog/${p.slug}`,
        lastModified: p.date,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }
  return entries;
}
