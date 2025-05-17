import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const locales = ["fa", "en", "ar"];
//*-------------------------------run build-------------------------------
// export function middleware(request) {
//   const { pathname, hostname, protocol } = request.nextUrl;
//   const newUrl = request.nextUrl.clone();

//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   );
//   const locale = cookies().get("NEXT_LOCALE")?.value || "fa";

//   let redirect = false; // Flag to indicate if a redirect is needed

//   // 1. Handle Locale (First)
//   if (!pathnameHasLocale) {
//     newUrl.pathname = `/${locale}${
//       pathname.startsWith("/") ? "" : "/"
//     }${pathname}`;
//     redirect = true; // Set redirect flag
//   }

//   // 2. Remove "www" (If Present)
//   if (hostname.startsWith("www.")) {
//     newUrl.host = hostname.replace(/^www\./, ""); // Remove "www." from the host
//     newUrl.hostname = hostname.replace(/^www\./, "");
//     redirect = true; // Set redirect flag
//   }
//   // 3. Enforce HTTPS
//   if (protocol !== "https:") {
//     newUrl.protocol = "https:";
//     newUrl.port = "";
//     redirect = true;
//   }
//   // 4. Perform Redirect (If Necessary)
//   if (redirect) {
//     return NextResponse.redirect(newUrl, { status: 301 });
//   }

//   return NextResponse.next();
// }
//*-------------------------------run build-------------------------------
//*-------------------------------run dev-------------------------------


export function middleware(request) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // const locale = getLocale(request);
  const locale = cookies().get("NEXT_LOCALE")?.value || "fa";
  return NextResponse.redirect(
    new URL(
      `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
      request.url
    )
  );
}
//*-------------------------------run dev-------------------------------

export const config = {
  matcher: [
    "/((?!api|panotech|images|_next/static|_next/image|flags|data|favicon.ico|robots.js|robots.txt|Technology).*)",
  ],
};
