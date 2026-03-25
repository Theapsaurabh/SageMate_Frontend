import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const userToken = req.cookies.get("token")?.value;
  const adminToken = req.cookies.get("admin_token")?.value;

  const { pathname } = req.nextUrl;

  // -------------------------
  // USER PROTECTION LOGIC
  // -------------------------
  if (pathname.startsWith("/user")) {
    // If user logged out → redirect to login
    if (!userToken) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // When logged-in user tries to visit `/login`
  if (pathname === "/login" && userToken) {
    return NextResponse.redirect(new URL("/user", req.url));
  }

  // -------------------------
  // ADMIN PROTECTION LOGIC
  // -------------------------
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    // If admin is NOT logged in → redirect to admin login
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // If admin visits login page while logged in → redirect to homepage
  if (pathname.startsWith("/admin/login") && adminToken) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to user & admin routes
export const config = {
  matcher: [
    "/user/:path*",
    "/admin/:path*",
    "/login",
    "/admin/login",
  ],
};
