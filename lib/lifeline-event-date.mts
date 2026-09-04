import type { LifelineEvent } from "@/components/lifeline/types"

const LIFELINE_MONTH = "(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"
const LIFELINE_DATE_RANGE = new RegExp(
  `\\s+\\(((?:${LIFELINE_MONTH} )?\\d{4}–(?:(?:${LIFELINE_MONTH} )?\\d{4}|present))\\)`,
)

export function separateLifelineEventDateRange(text: string): LifelineEvent {
  const match = LIFELINE_DATE_RANGE.exec(text)
  if (!match) return text

  const remainder = text.slice(match.index + match[0].length)

  return {
    text: `${text.slice(0, match.index)}${remainder === "." ? "" : remainder}`,
    dateRange: match[1],
  }
}
