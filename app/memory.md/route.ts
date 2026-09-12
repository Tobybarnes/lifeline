import { renderMemoryMarkdown } from "@/lib/memory"

export const dynamic = "force-static"

/**
 * Serves the composed memory as plain markdown at a stable URL, so an agent
 * fetching it gets the file rather than a rendered page. It is built from
 * merged commits only: there is no request that can change what is here.
 */
export function GET() {
  return new Response(renderMemoryMarkdown(), {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  })
}
