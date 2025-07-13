import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url)); // optional unauthorized page
    }
  }

  return NextResponse.next();
}

// Apply only to selected paths
export const config = {
  matcher: ["/admin/:path*"],
};
