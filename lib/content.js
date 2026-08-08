import * as C from "@/data/content";
import { projectDetails } from "@/data/projectDetails";
import { localize } from "./i18n";

// Localized snapshots of the dossier content for a given language.
export function getContent(lang) {
  return {
    profile: localize(C.profile, lang),
    about: localize(C.about, lang),
    coreExpertise: localize(C.coreExpertise, lang),
    experience: localize(C.experience, lang),
    earlierExperience: localize(C.earlierExperience, lang),
    earlierNote: localize(C.earlierNote, lang),
    skills: localize(C.skills, lang),
    education: localize(C.education, lang),
    projects: localize(C.projects, lang),
  };
}

export function getProjects(lang) {
  return localize(C.projects, lang);
}

// Merge a project's dossier facts with its illustrative detail, localized.
//
// Live products have no `projectDetails` entry — there is nothing to
// reconstruct, because the real thing is public. They still get a page; it just
// renders from the dossier facts and the real screenshot instead.
export function getProject(slug, lang) {
  const base = C.projects.find((p) => p.slug === slug);
  if (!base) return null;
  const extra = projectDetails[slug];
  if (!extra && !base.live) return null;
  return {
    ...localize(base, lang),
    detail: extra ? localize(extra.detail, lang) : null,
    mockup: extra ? extra.mockup : null, // mockup data stays shared (UI labels)
  };
}

// Every project that can render a detail page.
//
// This used to exclude featured products, which meant the one live product with
// real users and a real screenshot was the only project with no page of its
// own, while nine reconstructions each got five blocks. The strongest evidence
// was the least visible.
export const allSlugs = C.projects
  .filter((p) => projectDetails[p.slug] || p.live)
  .map((p) => p.slug);
