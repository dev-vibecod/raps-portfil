const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://rafif-portfolio.vercel.app").replace(/\/$/, "");

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
