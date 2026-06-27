# Rafif Ayyassar Wicaksono — Portfolio & Services

Frontend-only, **bilingual (ID/EN)**, multi-page portfolio that doubles as a
lead-gen entry point for web/app/AI/IoT development services. Dark glassmorphic
design, lavender accent. All experience/project facts come from the source
dossier; service framing and project mockups are clearly-labelled
representative illustrations.

## Stack

- **Next.js 14** (App Router, `app/[lang]`) · **React 18**
- **Tailwind CSS 3** · **Framer Motion** · **lucide-react**
- Fonts: Sora (sans) + Fraunces (serif italic), via `next/font`

## Develop

```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /id)
npm run build && npm run start   # production
```

> **Node note:** use Node LTS (20 or 22). Node 26 currently crashes Next 14's
> dev worker (`jest-worker EPIPE`); `next build`/`next start` are unaffected.

## Internationalization

- Locale segment `app/[lang]/…` with `id` (default) and `en`. Root `/`
  redirects to `/id` via `middleware.js`.
- UI/services/SEO copy: `data/dictionaries/{id,en}.js`.
- Dossier content: `data/content.js` (bilingual `{id,en}` prose, shared
  names/dates/tech). Illustrative project detail: `data/projectDetails.js`.
- Helpers: `lib/i18n.js` (`getDict`, `localize`), `lib/content.js`
  (`getContent`, `getProject`), `lib/meta.js` (per-page metadata + hreflang).

## Pages

`/[lang]` (Home) · `/[lang]/services` · `/[lang]/projects` ·
`/[lang]/projects/[slug]` · `/[lang]/about` · `/[lang]/contact`

## Project mockups

Production-grade UI mockups are built **in-site** as React components
(`components/mockups/`): chat, dashboard, query (NL2SQL), and detection/IoT
archetypes, auto-scaled by `ScaledMockup`. Each is labelled "representative".

## SEO

- `app/sitemap.js`, `app/robots.js`, per-page metadata + hreflang
  (`lib/meta.js`), JSON-LD Person + ProfessionalService (`components/JsonLd.js`),
  and a generated OG image per locale (`app/[lang]/opengraph-image.js`).
- **Set `NEXT_PUBLIC_SITE_URL`** (e.g. on Vercel) to your final domain — it
  drives canonical URLs, OG/Twitter URLs, and the sitemap. Until then it falls
  back to a placeholder.
- After the domain is live, submit the sitemap in Google Search Console.

## AI assistant (Groq)

A floating chat assistant (`components/ChatWidget.js`) answers **only** questions
about Rafif. It calls a server route `app/api/chat/route.js` that proxies Groq
(model `openai/gpt-oss-120b`) — the API key stays server-side and is never sent
to the browser. The system prompt + knowledge base (`lib/aiKnowledge.js`, built
from the same site content) restrict scope and refuse off-topic questions.

- **Env var (required for the assistant):** `GROQ_API_KEY`. Locally it lives in
  `.env.local` (git-ignored). On Vercel, add it under Project → Settings →
  Environment Variables. Without it, the route returns 503 (the rest of the
  site is unaffected).
- Rotate the key if it was ever shared in plaintext.

## Deploy (Vercel)

Push to the connected repo; Vercel builds with no extra config. Add the
`NEXT_PUBLIC_SITE_URL` env var once you have a domain.
