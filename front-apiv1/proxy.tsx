import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  sub: string;
  email: string;
  roles: string[];
  exp: number;
}

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const payload = jwtDecode<JWTPayload>(token);

    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();

  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};