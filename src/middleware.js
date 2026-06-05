import { NextResponse } from "next/server";

export function middleware(request) {
  const loginCookie = request.cookies.get("isLoggedIn");
  const canCheckoutCookie = request.cookies.get("canCheckout");

  const { pathname } = request.nextUrl;

  if (pathname === "/checkout" || pathname === "/order-placed") {
    if (!loginCookie || !canCheckoutCookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (!loginCookie && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (loginCookie && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
