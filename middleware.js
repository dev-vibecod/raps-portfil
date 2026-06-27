import { NextResponse } from "next/server";

const locales = ["id", "en"];
const defaultLocale = "id";

// Redirect any path missing a locale prefix to the default locale (/id/...).
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API, and static assets (files with a dot).
  matcher: ["/((?!_next|api|.*\..*).*)"],
};
