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
      "Started a BA in Business Information & Management at Liverpool John Moores University (1990–1994).",
      "Studied business, economics, systems thinking, databases and marketing.",
      "Chairman of the Role Playing Society for 4 years. :)",
    ],
  },
  1992: {
    id: "dun-and-bradstreet",
    companies: [{ id: "dun-and-bradstreet", name: "Dun & Bradstreet" }],
    events: [
      "Digital Strategy Executive at Dun & Bradstreet (1992–1996).",
      "Worked on board-level digital projects.",
    ],
  },
  1996: {
    id: "ntl-interactive",
    companies: [{ id: "ntl-interactive", name: "NTL Interactive" }],
    events: [
      "Head of Content Innovation at NTL Interactive (1996–1998).",
      "Helped launch Europe’s first commercial interactive TV service and led a team of 30 creatives and technologists.",
    ],
  },
  1998: {
    id: "mtv",
    companies: [{ id: "mtv", name: "MTV" }],
    events: [
      "Head of Interactive at MTV UK, Northern & Eastern Europe (1998–2003).",
      "Led mobile, web and BAFTA-winning 360° projects.",
    ],
  },
  1999: {
    id: "met-emily",
    events: ["Met Emily."],
  },
  2003: {
    id: "twelve-ten",
    companies: [{ id: "twelve-ten", name: "Twelve Ten" }],
    events: [
      "Creative Director at Twelve Ten (2003–2004).",
      "Led new business and strategy.",
      "Archie was born.",
    ],
  },
  2004: {
    id: "mudlark-digital-pixel-lab",
    companies: [
      { id: "mudlark-digital", name: "Mudlark Digital" },
      { id: "pixel-lab", name: "Pixel-Lab" },
    ],
    events: [
      "Founder and CEO of Mudlark Digital / Pixel-Lab (2004–2011).",
      "Led projects including Such Tweet Sorrow and Chromaroma.",
    ],
  },
  2005: {
    id: "london-games-festival",
    companies: [
      { id: "london-games-festival", name: "London Games Festival" },
    ],
    events: [
      "Co-founded and directed the original London Games Festival (2005–2009).",
      "Produced games, art, performance and skills events.",
      "Robin was born.",
    ],
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
    events: [
      "Founder and CEO of Chromaroma (2009–2011).",
      "The Oyster-card social game raised two funding rounds and is now a permanent exhibit at MoMA.",
    ],
  },
  2011: {
    id: "akqa",
    companies: [{ id: "akqa", name: "AKQA" }],
    events: [
      "Product Strategy Director at AKQA London (2011–2016).",
      "Led AKQA’s global Product and Business Innovation practice.",
    ],
  },
  2013: {
    id: "trackshift-advisor",
    companies: [
      { id: "akqa", name: "AKQA" },
      { id: "trackshift", name: "TrackShift" },
    ],
    events: [
      "Moved from London to Portland as AKQA Product Strategy Director for Nike.",
      "Strategic Advisor to TrackShift (2013–2019), helping musicians get paid faster.",
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
    events: [
      "“Swiss Army Knife” at A Strangely Isolated Place (2015–present).",
      "Worked across operations, logistics, licensing and sales.",
    ],
  },
  2016: {
    id: "akqa-group-director",
    companies: [{ id: "akqa", name: "AKQA" }],
    events: [
      "Group Director for Nike at AKQA (2016–2018).",
      "Led AKQA Portland’s customer-experience work, including Nike Membership and the Nike App pilot.",
    ],
  },
  2017: {
    id: "jaguar-land-rover-mentor",
    companies: [{ id: "jaguar-land-rover", name: "Jaguar Land Rover" }],
    events: [
      "Mentor and Advisor to Jaguar Land Rover (2017–2018).",
      "Worked with the first three incubator cohorts.",
    ],
  },
  2018: {
    id: "akqa-executive-director",
    companies: [{ id: "akqa", name: "AKQA" }],
    events: [
      "Executive Director at AKQA (2018–2019).",
      "Led AKQA’s Consumer Experience team on work for Nike, Levi’s, Amazon and Beats.",
    ],
  },
  2019: {
    id: "nike",
    companies: [{ id: "nike", name: "Nike" }],
    events: [
      "Senior Director, Consumer Experience at Nike (2019–2021).",
      "Led digital and physical services, experiences and store concepts.",
    ],
  },
  2020: {
    id: "nike-rise",
    companies: [{ id: "nike", name: "Nike" }],
    events: ["Led the Nike Rise retail concept and global launch."],
  },
  2021: {
    id: "amazon-alexa",
    companies: [{ id: "amazon-alexa", name: "Amazon Alexa" }],
    events: [
      "Head of Design for Amazon Alexa (2021–2022).",
      "Led Alexa’s end-to-end experience, including Hey Disney!",
    ],
  },
  2022: {
    id: "amazon-alexa-design-principal",
    companies: [{ id: "amazon-alexa", name: "Amazon Alexa" }],
    events: [
      "Design Principal for Amazon Alexa (2022–2023).",
      "Set the vision and strategy for Alexa’s move into LLMs.",
    ],
  },
  2023: {
    id: "cash-app",
    companies: [{ id: "cash-app", name: "Cash App" }],
    events: [
      "Head of Design, Commerce at Cash App (2023–2025).",
      "Led design across Cash App, Afterpay and Cash for Business.",
    ],
  },
  2024: {
    id: "hoyt-arboretum-friends-board",
    companies: [
      { id: "hoyt-arboretum-friends", name: "Hoyt Arboretum Friends" },
    ],
    events: ["Joined the board of Hoyt Arboretum Friends (2024–present)."],
  },
  2025: {
    id: "shopify",
    companies: [{ id: "shopify", name: "Shopify" }],
    events: [
      "Design Director at Shopify (2025–present).",
      "Leading product and brand design to help merchants grow their businesses.",
    ],
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
