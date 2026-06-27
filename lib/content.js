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
export function getProject(slug, lang) {
  const base = C.projects.find((p) => p.slug === slug);
  const extra = projectDetails[slug];
  if (!base || !extra) return null;
  return {
    ...localize(base, lang),
    detail: localize(extra.detail, lang),
    mockup: extra.mockup, // mockup data stays shared (UI labels)
  };
}

// Case-study slugs only (exclude featured live products, which link out and
// have no internal detail page).
export const allSlugs = C.projects.filter((p) => !p.featured).map((p) => p.slug);
