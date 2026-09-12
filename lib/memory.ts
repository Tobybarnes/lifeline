import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

const HEADER = "content/memory.md"
const ENTRIES = "content/memory"

export type MemoryEntry = {
  file: string
  date: string
  agent: string
  surface: string
  body: string
}

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

function parseEntry(file: string, raw: string): MemoryEntry | null {
  const match = raw.match(FRONTMATTER)
  if (!match) return null

  const meta: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const at = line.indexOf(":")
    if (at === -1) continue
    meta[line.slice(0, at).trim().toLowerCase()] = line.slice(at + 1).trim()
  }

  const date = meta.date ?? ""
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null

  return {
    file,
    date,
    agent: meta.agent || "unknown agent",
    surface: meta.surface || "unknown surface",
    body: raw.slice(match[0].length).trim(),
  }
}

/**
 * Entries are one file each, so two agents opening pull requests on the same
 * day never collide. They are read at build time and composed here, newest
 * first, which means the served file only ever contains merged commits.
 */
export function getMemoryEntries(): MemoryEntry[] {
  const dir = join(process.cwd(), ENTRIES)

  return readdirSync(dir)
    .filter((file) => file.endsWith(".md") && file !== "README.md")
    .map((file) => parseEntry(file, readFileSync(join(dir, file), "utf8")))
    .filter((entry): entry is MemoryEntry => entry !== null)
    .sort((a, b) =>
      a.date === b.date
        ? a.file.localeCompare(b.file)
        : b.date.localeCompare(a.date),
    )
}

export function renderMemoryMarkdown(): string {
  const header = readFileSync(join(process.cwd(), HEADER), "utf8").trimEnd()
  const entries = getMemoryEntries()

  if (entries.length === 0) {
    return `${header}\n\nNo entries yet.\n`
  }

  const log = entries
    .map(
      (entry) =>
        `### ${entry.date} · ${entry.agent} (${entry.surface})\n\n${entry.body}`,
    )
    .join("\n\n")

  return `${header}\n\n${log}\n`
}
