import { mergeLifelineMarkdownEvents } from "../lib/lifeline-markdown.mts"

const metadata: Partial<
  Record<
    number,
    {
      id: string
      country: { flag: string; name: string }
    }
  >
> = {
  1973: {
    id: "united-kingdom",
    country: { flag: "🇬🇧", name: "United Kingdom" },
  },
}

export const mergedMilestones = mergeLifelineMarkdownEvents(metadata, {
  1999: ["Met Emily."],
})

export const markdownOnlyMilestone: (typeof mergedMilestones)[number] = {
  id: "year-1999",
  events: ["Met Emily."],
}
