import { notFound } from "next/navigation";

// Catch-all: any URL that doesn't match a real route under /[lang] renders the
// styled not-found boundary (middleware already prefixes every path with a locale).
export default function CatchAll() {
  notFound();
}
