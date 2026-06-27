// i18n helpers. Indonesian is the default (no-prefix-not-used: we always prefix
// with /id or /en; the root path redirects to /id).
import { dictionaries } from "@/data/dictionaries";

export const locales = ["id", "en"];
export const defaultLocale = "id";

export function isLocale(x) {
  return locales.includes(x);
}

export function getDict(lang) {
  return dictionaries[isLocale(lang) ? lang : defaultLocale];
}

// Resolve a possibly-bilingual field. A field can be a plain string (shared,
// e.g. tech names) or an object { id, en }.
export function pick(field, lang) {
  if (field == null) return field;
  if (typeof field === "object" && ("id" in field || "en" in field)) {
    return field[lang] ?? field[defaultLocale] ?? field.en;
  }
  return field;
}

// Deep-resolve every bilingual field in a value (objects/arrays/strings).
export function localize(value, lang) {
  if (value == null) return value;
  if (Array.isArray(value)) return value.map((v) => localize(v, lang));
  if (typeof value === "object") {
    if ("id" in value || "en" in value) return pick(value, lang);
    const out = {};
    for (const k of Object.keys(value)) out[k] = localize(value[k], lang);
    return out;
  }
  return value;
}
