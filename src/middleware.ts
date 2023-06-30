import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
});

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname; // relative path

    // Manage rate limiting
    if (pathname.startsWith("/api")) {
      const ip = req.ip ?? "127.0.0.1";
      try {
        const { success } = await ratelimit.limit(ip);
        if (!success) {
          return NextResponse.json({
            error: "Too many requests",
          });
        }
        return NextResponse.next();
      } catch (error) {
        return NextResponse.json({
          error: "Internal server error",
        });
      }
    }

    // Manage Route Protection
    const token = await getToken({ req });
    const isAuth = !!token;

    const isAuthPage = req.nextUrl.pathname.startsWith("/login");
    const sensitiveRoutes = ["/dashboard"];

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next();
    }

    if (
      !isAuth &&
      sensitiveRoutes.some((route) => pathname.startsWith(route))
    ) {
      return null;
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/api/:path*"],
};
