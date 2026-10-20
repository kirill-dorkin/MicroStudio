import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["ru", "en"];

/**
 * Every page lives under /ru or /en. Paths without a locale prefix are
 * redirected to the Russian version (the site's primary language), so the
 * root URL never duplicates a localized page.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (LOCALES.includes(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/ru${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Skip Next internals, API-like routes, metadata files and static assets.
  matcher: ["/((?!_next|api|og|sitemap.xml|robots.txt|icon.svg|apple-icon.png|favicon.ico|portfolio/|fonts/|.*\\.[a-z0-9]+$).*)"],
};
