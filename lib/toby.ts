import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  defineLifeline,
  type LifelineMilestone,
} from "@/lib/lifeline-data"
import {
  mergeLifelineMarkdownEvents,
  parseLifelineMarkdown,
} from "@/lib/lifeline-markdown.mts"

const CURRENT_YEAR = new Date().getFullYear()
const BIRTH_YEAR = 1973
const CONTENT_SOURCE = "content/toby.md"

export const TOBY_LINKEDIN_URL = "https://www.linkedin.com/in/tobybarnes/"

type TobyMilestoneMetadata = Omit<LifelineMilestone, "events">

// Initial chronology verified from the public-facing profile on 2026-09-03.
// Recheck entries marked "present" before deployment.
const milestoneMetadata: Record<number, TobyMilestoneMetadata> = {
  1973: {
    id: "united-kingdom",
    country: { flag: "🇬🇧", name: "United Kingdom" },
  },
  1990: {
    id: "liverpool-john-moores-university",
    companies: [
      {
        id: "liverpool-john-moores-university",
        name: "Liverpool John Moores University",
      },
    ],
  },
  1992: {
    id: "dun-and-bradstreet",
    companies: [{ id: "dun-and-bradstreet", name: "Dun & Bradstreet" }],
  },
  1996: {
    id: "ntl-interactive",
    companies: [{ id: "ntl-interactive", name: "NTL Interactive" }],
  },
  1998: {
    id: "mtv",
    companies: [{ id: "mtv", name: "MTV" }],
  },
  1999: {
    id: "met-emily",
  },
  2001: {
    id: "australia",
    country: { flag: "🇦🇺", name: "Australia" },
  },
  2002: {
    id: "returned-to-united-kingdom",
    country: { flag: "🇬🇧", name: "United Kingdom" },
  },
  2003: {
    id: "twelve-ten",
    companies: [{ id: "twelve-ten", name: "Twelve Ten" }],
  },
  2004: {
    id: "mudlark-digital-pixel-lab",
    companies: [
      { id: "mudlark-digital", name: "Mudlark Digital" },
      { id: "pixel-lab", name: "Pixel-Lab" },
    ],
  },
  2005: {
    id: "london-games-festival",
    companies: [
      { id: "london-games-festival", name: "London Games Festival" },
    ],
  },
  2006: {
    id: "married",
  },
  2007: {
    id: "fraser-born",
  },
  2009: {
    id: "chromaroma",
    companies: [{ id: "chromaroma", name: "Chromaroma" }],
  },
  2011: {
    id: "akqa",
    companies: [{ id: "akqa", name: "AKQA" }],
  },
  2013: {
    id: "trackshift-advisor",
    country: { flag: "🇺🇸", name: "United States" },
    companies: [
      { id: "akqa", name: "AKQA" },
      { id: "trackshift", name: "TrackShift" },
    ],
  },
  2015: {
    id: "a-strangely-isolated-place",
    companies: [
      {
        id: "a-strangely-isolated-place",
        name: "A Strangely Isolated Place",
      },
    ],
  },
  2016: {
    id: "akqa-group-director",
    companies: [{ id: "akqa", name: "AKQA" }],
  },
  2017: {
    id: "jaguar-land-rover-mentor",
    companies: [{ id: "jaguar-land-rover", name: "Jaguar Land Rover" }],
  },
  2018: {
    id: "akqa-executive-director",
    companies: [{ id: "akqa", name: "AKQA" }],
  },
  2019: {
    id: "nike",
    companies: [{ id: "nike", name: "Nike" }],
  },
  2020: {
    id: "nike-rise",
    companies: [{ id: "nike", name: "Nike" }],
  },
  2021: {
    id: "amazon-alexa",
    companies: [{ id: "amazon-alexa", name: "Amazon Alexa" }],
  },
  2022: {
    id: "amazon-alexa-design-principal",
    companies: [{ id: "amazon-alexa", name: "Amazon Alexa" }],
  },
  2023: {
    id: "cash-app",
    companies: [{ id: "cash-app", name: "Cash App" }],
  },
  2024: {
    id: "hoyt-arboretum-friends-board",
    companies: [
      { id: "hoyt-arboretum-friends", name: "Hoyt Arboretum Friends" },
    ],
  },
  2025: {
    id: "shopify",
    companies: [{ id: "shopify", name: "Shopify" }],
  },
}

export function getTobyLifeline() {
  const eventsByYear = parseLifelineMarkdown(
    readFileSync(join(process.cwd(), "content", "toby.md"), "utf8"),
    {
      sourceName: CONTENT_SOURCE,
      minYear: BIRTH_YEAR,
      maxYear: CURRENT_YEAR,
    },
  )
  const milestones = mergeLifelineMarkdownEvents(
    milestoneMetadata,
    eventsByYear,
  )

  return defineLifeline({
    slug: "toby",
    name: "Toby Barnes",
    birthYear: 1973,
    endYear: CURRENT_YEAR,
    description: "Toby Barnes's work and public roles, year by year.",
    milestones,
  })
}
