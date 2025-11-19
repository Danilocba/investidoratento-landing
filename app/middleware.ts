import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = ["/confirmar", "/api", "/private"];

export function middleware(req: NextRequest) {
  const shouldProtect = PROTECTED_PATHS.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!shouldProtect) return NextResponse.next();

  const basicAuth = req.headers.get("authorization");

  if (basicAuth !== `Basic ${btoa("admin:senha-secreta")}`) {
    return new NextResponse("Auth required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Protected"',
      },
    });
  }

  return NextResponse.next();
}