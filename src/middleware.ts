import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Lightweight, memory-based rate limiter for production edge/lambda environments.
 * For production scale, recommend using Upstash Redis.
 */
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const LIMIT = 10; // 10 requests
const WINDOW = 60 * 1000; // per 1 minute

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/analyze") || pathname.startsWith("/api/export")) {
    const token = await getToken({ req });
    const identifier = token?.sub || req.ip || "anonymous";
    const now = Date.now();
    const currentLimit = rateLimitMap.get(identifier) || { count: 0, lastReset: now };

    if (now - currentLimit.lastReset > WINDOW) {
      currentLimit.count = 0;
      currentLimit.lastReset = now;
    }

    currentLimit.count++;
    rateLimitMap.set(identifier, currentLimit);

    if (currentLimit.count > LIMIT) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
