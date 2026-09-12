import { readFileSync } from "node:fs"
import { join } from "node:path"

const SOURCE = "content/manual.md"

export type ManualItem = { lead?: string; body: string }
export type ManualSection = { title: string; items: ManualItem[] }
export type Manual = { title: string; intro: string; sections: ManualSection[] }

/**
 * A deliberately small reader for one file shape: an H1, an intro paragraph,
 * then H2 sections of bullets, each optionally opening with a bold lead-in.
 * Wide enough for the manual, narrow enough to have no edge cases worth a
 * dependency.
 */
export function getManual(): Manual {
  const raw = readFileSync(join(process.cwd(), SOURCE), "utf8")

  let title = ""
  const introLines: string[] = []
  const sections: ManualSection[] = []
  let current: ManualSection | null = null

  // Bullets wrap across lines in the source, so fold continuations back first.
  const lines: string[] = []
  for (const line of raw.split(/\r?\n/)) {
    const isContinuation =
      /^\s+\S/.test(line) && lines.length > 0 && lines[lines.length - 1] !== ""
    if (isContinuation) lines[lines.length - 1] += ` ${line.trim()}`
    else lines.push(line.trimEnd())
  }

  for (const line of lines) {
    if (line.startsWith("# ")) {
      title = line.slice(2).trim()
      continue
    }
    if (line.startsWith("## ")) {
      current = { title: line.slice(3).trim(), items: [] }
      sections.push(current)
      continue
    }
    if (line.startsWith("- ")) {
      const text = line.slice(2).trim()
      const lead = text.match(/^\*\*(.+?)\*\*\s*/)
      current?.items.push(
        lead
          ? { lead: lead[1].replace(/[.:]$/, ""), body: text.slice(lead[0].length).trim() }
          : { body: text },
      )
      continue
    }
    if (line.trim() !== "" && !current) introLines.push(line.trim())
  }

  return { title, intro: introLines.join(" "), sections }
}
