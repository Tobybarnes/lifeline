export type LifelineMarkdownEvents = Record<number, string[]>

interface ParseLifelineMarkdownOptions {
  sourceName?: string
  minYear?: number
  maxYear?: number
}

type MilestoneMetadata = {
  id?: string
}

type MergedMilestone<T> = Partial<Omit<T, "id" | "events">> & {
  id: string
  events: string[]
}

function hasOwnYear(record: LifelineMarkdownEvents, year: number) {
  return Object.prototype.hasOwnProperty.call(record, year)
}

export function parseLifelineMarkdown(
  source: string,
  options: ParseLifelineMarkdownOptions = {},
): LifelineMarkdownEvents {
  const {
    sourceName = "timeline.md",
    minYear = Number.NEGATIVE_INFINITY,
    maxYear = Number.POSITIVE_INFINITY,
  } = options
  const eventsByYear: LifelineMarkdownEvents = {}
  let currentYear: number | undefined
  let previousYear: number | undefined
  let hasTitle = false

  const fail = (lineNumber: number, message: string): never => {
    throw new Error(`${sourceName}:${lineNumber}: ${message}`)
  }

  for (const [index, line] of source.split(/\r?\n/).entries()) {
    const lineNumber = index + 1
    const trimmed = line.trim()

    if (trimmed === "" || /^<!--.*-->$/.test(trimmed)) continue

    if (/^#(?!#)\s+\S/.test(trimmed)) {
      if (hasTitle) fail(lineNumber, "only one H1 title is allowed")
      if (previousYear !== undefined) {
        fail(lineNumber, "the H1 title must come before the first year")
      }
      hasTitle = true
      continue
    }

    const heading = /^##\s+(\d{4})$/.exec(trimmed)
    if (heading) {
      const year = Number(heading[1])

      if (hasOwnYear(eventsByYear, year)) {
        fail(lineNumber, `duplicate year heading ${year}`)
      }
      if (previousYear !== undefined && year < previousYear) {
        fail(lineNumber, `year ${year} must come after ${previousYear}`)
      }
      if (year < minYear || year > maxYear) {
        fail(lineNumber, `year ${year} is outside ${minYear}–${maxYear}`)
      }

      eventsByYear[year] = []
      currentYear = year
      previousYear = year
      continue
    }

    if (trimmed.startsWith("#")) {
      fail(lineNumber, "expected a year heading like ## 1999")
    }

    if (trimmed === "-") {
      if (currentYear === undefined) {
        fail(lineNumber, "event bullet must follow a year heading")
      }
      fail(lineNumber, "event bullet cannot be empty")
    }

    if (trimmed.startsWith("- ")) {
      const year = currentYear
      if (year === undefined) {
        fail(lineNumber, "event bullet must follow a year heading")
      }

      const event = trimmed.slice(2).trim()
      if (
        /\[[^\n]*\]\s*(?:\([^)]*\)|\[[^\]]*\])/.test(event) ||
        /<(?:[a-z][a-z0-9+.-]*:[^<>\s]*|[^<>\s@]+@[^<>\s@]+)>/i.test(
          event,
        )
      ) {
        fail(lineNumber, "Markdown links are not supported; use plain text")
      }

      eventsByYear[year!].push(event)
      continue
    }

    fail(lineNumber, "expected an event bullet beginning with - ")
  }

  return eventsByYear
}

export function mergeLifelineMarkdownEvents<T extends MilestoneMetadata>(
  metadataByYear: Readonly<Partial<Record<number, T>>>,
  eventsByYear: Readonly<LifelineMarkdownEvents>,
): Record<number, MergedMilestone<T>>
export function mergeLifelineMarkdownEvents(
  metadataByYear: Readonly<Partial<Record<number, MilestoneMetadata>>>,
  eventsByYear: Readonly<LifelineMarkdownEvents>,
): Record<number, MergedMilestone<MilestoneMetadata>> {
  const years = new Set([
    ...Object.keys(metadataByYear).map(Number),
    ...Object.keys(eventsByYear).map(Number),
  ])
  const milestones: Record<number, MergedMilestone<MilestoneMetadata>> = {}

  for (const year of [...years].sort((a, b) => a - b)) {
    const metadata = metadataByYear[year]
    milestones[year] = {
      ...metadata,
      id: metadata?.id ?? `year-${year}`,
      events: [...(eventsByYear[year] ?? [])],
    }
  }

  return milestones
}
