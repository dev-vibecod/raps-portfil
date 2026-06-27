import { profile } from "@/data/content";
import { getDict } from "@/lib/i18n";

// Person + ProfessionalService structured data for rich results / SEO.
export default function JsonLd({ lang, baseUrl }) {
  const dict = getDict(lang);
  const url = `${baseUrl}/${lang}`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: profile.name,
        jobTitle: profile.role,
        email: `mailto:${profile.email}`,
        telephone: `+${profile.phoneE164}`,
        url,
        sameAs: [profile.linkedin],
        address: { "@type": "PostalAddress", addressLocality: "Bekasi", addressCountry: "ID" },
        knowsAbout: ["Generative AI", "LLM", "RAG", "Backend Engineering", "FastAPI", "Machine Learning", "Data Engineering", "Cloud", "IoT", "Computer Vision"],
      },
      {
        "@type": "ProfessionalService",
        name: `${profile.name} — Development Services`,
        url,
        image: `${url}/opengraph-image`,
        priceRange: "$$",
        areaServed: [{ "@type": "Country", name: "Indonesia" }, "Worldwide (remote)"],
        provider: { "@type": "Person", name: profile.name },
        makesOffer: dict.services.items.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.blurb },
        })),
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
