import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
    const isAuthRoute = nextUrl.pathname.startsWith("/auth");
    const isPublicRoute = nextUrl.pathname === "/"; // 👈 Allows the Landing Page

    // 1. Allow API routes (NextAuth needs these to work)
    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    // 2. Handle Login/Register Pages
    if (isAuthRoute) {
        // If user is already logged in, kick them to the dashboard
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/search", nextUrl));
        }
        return NextResponse.next();
    }

    // 3. Protect all other routes (Dashboard, Courses, etc.)
    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }

    return NextResponse.next();
});

// Configure where middleware runs
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};