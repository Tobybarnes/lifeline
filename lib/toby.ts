import { defineLifeline, type LifelineMilestones } from "@/lib/lifeline-data"

const CURRENT_YEAR = new Date().getFullYear()

export const TOBY_LINKEDIN_URL = "https://www.linkedin.com/in/tobybarnes/"

// Initial chronology verified from the public-facing profile on 2026-09-03.
// Recheck entries marked "present" before deployment.
const milestones: LifelineMilestones = {
  1990: {
    id: "liverpool-john-moores-university",
    companies: [
      {
        id: "liverpool-john-moores-university",
        name: "Liverpool John Moores University",
      },
    ],
    events: [
      "Liverpool John Moores University (1990–1994): Bachelor of Arts - BA, Business Information & Management (Business Administration and Marketing).",
      "Chairman of the Role Playing Society for 4 years. :)",
    ],
  },
  1992: {
    id: "dun-and-bradstreet",
    companies: [{ id: "dun-and-bradstreet", name: "Dun & Bradstreet" }],
    events: ["Dun & Bradstreet (1992–1996)."],
  },
  1996: {
    id: "ntl-interactive",
    companies: [{ id: "ntl-interactive", name: "NTL Interactive" }],
    events: ["NTL Interactive (1996–1998)."],
  },
  1998: {
    id: "mtv",
    companies: [{ id: "mtv", name: "MTV" }],
    events: ["MTV (1998–2003)."],
  },
  1999: {
    id: "met-emily",
    events: ["Met Emily."],
  },
  2003: {
    id: "twelve-ten",
    companies: [{ id: "twelve-ten", name: "Twelve Ten" }],
    events: ["Twelve Ten (2003–2004).", "Archie was born."],
  },
  2004: {
    id: "mudlark-digital-pixel-lab",
    companies: [
      { id: "mudlark-digital", name: "Mudlark Digital" },
      { id: "pixel-lab", name: "Pixel-Lab" },
    ],
    events: ["Mudlark Digital / Pixel-Lab (2004–2011)."],
  },
  2005: {
    id: "london-games-festival",
    companies: [
      { id: "london-games-festival", name: "London Games Festival" },
    ],
    events: ["London Games Festival (2005–2009).", "Robin was born."],
  },
  2006: {
    id: "married",
    events: ["Got married."],
  },
  2007: {
    id: "fraser-born",
    events: ["Fraser was born."],
  },
  2009: {
    id: "chromaroma",
    companies: [{ id: "chromaroma", name: "Chromaroma" }],
    events: ["Chromaroma (2009–2011)."],
  },
  2011: {
    id: "akqa",
    companies: [{ id: "akqa", name: "AKQA" }],
    events: ["AKQA, London and later Portland (2011–2019)."],
  },
  2013: {
    id: "trackshift-advisor",
    companies: [{ id: "trackshift", name: "TrackShift" }],
    events: ["TrackShift advisor (2013–2019)."],
  },
  2015: {
    id: "a-strangely-isolated-place",
    companies: [
      {
        id: "a-strangely-isolated-place",
        name: "A Strangely Isolated Place",
      },
    ],
    events: ["A Strangely Isolated Place (2015–present)."],
  },
  2017: {
    id: "jaguar-land-rover-mentor",
    companies: [{ id: "jaguar-land-rover", name: "Jaguar Land Rover" }],
    events: ["Jaguar Land Rover mentor (2017–2018)."],
  },
  2019: {
    id: "nike",
    companies: [{ id: "nike", name: "Nike" }],
    events: ["Nike (2019–2021)."],
  },
  2021: {
    id: "amazon-alexa",
    companies: [{ id: "amazon-alexa", name: "Amazon Alexa" }],
    events: ["Amazon Alexa (2021–2023)."],
  },
  2023: {
    id: "cash-app",
    companies: [{ id: "cash-app", name: "Cash App" }],
    events: ["Cash App (2023–2025)."],
  },
  2024: {
    id: "hoyt-arboretum-friends-board",
    companies: [
      { id: "hoyt-arboretum-friends", name: "Hoyt Arboretum Friends" },
    ],
    events: ["Hoyt Arboretum Friends board (2024–present)."],
  },
  2025: {
    id: "shopify",
    companies: [{ id: "shopify", name: "Shopify" }],
    events: ["Shopify (2025–present)."],
  },
}

export const tobyLifeline = defineLifeline({
  slug: "toby",
  name: "Toby Barnes",
  birthYear: 1973,
  endYear: CURRENT_YEAR,
  description: "Toby Barnes's work and public roles, year by year.",
  milestones,
})
