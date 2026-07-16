import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import { getUserSession } from "./lib/core/session";

export async function proxy(request : NextRequest) {
  const user = await getUserSession();

  const pathname = request.nextUrl.pathname;

  // If logged in, redirect away from login/signup
  if (user && (pathname === "/auth/login" || pathname === "/auth/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If not logged in, redirect away from protected routes
  // if (!user && (pathname.startsWith("/dashboard") || pathname.startsWith("/all-pets/"))) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // If not logged in, redirect to login with callbackUrl
  if (!user && (pathname.startsWith("/dashboard"))) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
}

  return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/auth/login", "/auth/register"],
};