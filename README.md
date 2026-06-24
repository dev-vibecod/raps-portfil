# Rafif Ayyassar Wicaksono — Portfolio

Frontend-only personal portfolio for a Backend & AI/ML engineer. Dark, glassmorphic
design with a lavender accent. All content comes from the source dossier — nothing
invented.

## Stack

- **Next.js 14** (App Router) · **React 18**
- **Tailwind CSS 3** for styling
- **Framer Motion** for scroll/hover motion
- **lucide-react** for icons
- Fonts: Sora (sans) + Fraunces (serif italic accent), via `next/font`

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
app/            # layout, global styles, page composition
components/      # Navbar, Hero, About, Skills, Projects, Experience, Contact, Footer
data/content.js # SINGLE source of all copy — edit here to update the site
public/previews/ # project preview images (see ASSETS.md)
```

## Editing content

Everything (bio, experience, projects, skills, contact) lives in
[`data/content.js`](data/content.js). Components read from it, so copy changes never
require touching JSX.

## Project previews

Project cards display mockups built in Figma. See [`ASSETS.md`](ASSETS.md) for the
links and the exact filenames to drop into `public/previews/`. Missing images degrade
gracefully to a labelled placeholder.

## Deploy (Vercel)

Push to the connected repo and import in Vercel — no configuration needed (standard
Next.js build). No backend or environment variables required.
