import { NextResponse, type NextRequest } from "next/server"

/**
 * One deploy, three doors. The subdomains are a routing detail: each maps to
 * a page inside this app, and only the root path is rewritten, so every other
 * path (the timeline, the markdown files) resolves the same way on any host.
 */
const HOST_HOME: Record<string, string> = {
  "friends.tobybarnes.me": "/friends",
  "agents.tobybarnes.me": "/agents",
}

const NOINDEX_HOSTS = new Set(["friends.tobybarnes.me"])

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? ""
  const home = HOST_HOME[host]

  const response =
    home && request.nextUrl.pathname === "/"
      ? NextResponse.rewrite(new URL(home, request.url))
      : NextResponse.next()

  // friends. is shared by link, not secret. Keeping it out of search results
  // is the difference between quiet and findable, and costs nothing.
  if (NOINDEX_HOSTS.has(host)) {
    response.headers.set("x-robots-tag", "noindex, nofollow")
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
