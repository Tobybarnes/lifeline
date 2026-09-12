import type { Metadata } from "next"
import { SiteFrame, SiteLede, SITE_LINK } from "@/components/site-frame"
import { CONTACT_EMAIL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Toby Barnes | Work",
  description: "Selected projects from thirty-four years of interactive work.",
}

/**
 * Titles and dates come from content/toby.md, which stays the single source
 * of truth for chronology. Each project gets a full page pulled from Notion
 * in a later pass; until then this is the scannable index.
 */
const PROJECTS: { year: string; name: string; note: string }[] = [
  {
    year: "2023",
    name: "Cash App Commerce",
    note: "Design across Cash App, Afterpay and Cash for Business.",
  },
  {
    year: "2022",
    name: "Alexa+",
    note: "Vision and strategy for Alexa's move into large language models.",
  },
  {
    year: "2021",
    name: "Hey Disney!",
    note: "A voice character built on Alexa, and the end to end experience around it.",
  },
  {
    year: "2020",
    name: "Nike Rise",
    note: "A retail concept taken from idea to global launch in Seoul, Madrid and Chicago.",
  },
  {
    year: "2019",
    name: "Nike Flagship and Nike Live",
    note: "Store concepts in New York, Shanghai and Los Angeles, plus the Nike app at retail.",
  },
  {
    year: "2009",
    name: "Chromaroma",
    note: "A city-scale game played through London's travel data.",
  },
  {
    year: "2009",
    name: "Such Tweet Sorrow",
    note: "Romeo and Juliet performed in real time on Twitter, with the RSC.",
  },
  {
    year: "2005",
    name: "London Games Festival",
    note: "Co-founded and directed. Games, art, performance and skills events.",
  },
  {
    year: "1998",
    name: "MTV2.co.uk",
    note: "BAFTA-winning, and the start of a run of 360 degree projects at MTV.",
  },
  {
    year: "1996",
    name: "NTL Interactive",
    note: "Europe's first commercial interactive TV service, with a team of thirty.",
  },
]

export default function Work() {
  return (
    <SiteFrame
      navLinks={
        <a href="/timeline" className={SITE_LINK}>
          Timeline
        </a>
      }
      footerRight={
        <a href={`mailto:${CONTACT_EMAIL}`} className={SITE_LINK}>
          {CONTACT_EMAIL}
        </a>
      }
    >
      <SiteLede title="Work">
        A selection rather than a catalogue. The timeline has everything in
        order; this is the shorter list of things worth stopping on. Full
        pages for each are still being written.
      </SiteLede>

      <ul className="mt-14 flex flex-col border-t border-black/10 dark:border-white/10">
        {PROJECTS.map((project) => (
          <li
            key={`${project.year}-${project.name}`}
            className="grid grid-cols-[3.5rem_minmax(0,1fr)] items-baseline gap-x-6 gap-y-1 border-b border-black/10 py-5 sm:grid-cols-[3.5rem_minmax(0,13rem)_minmax(0,1fr)] sm:gap-x-8 dark:border-white/10"
          >
            <span className="text-sm tabular-nums text-zinc-400 dark:text-zinc-600">
              {project.year}
            </span>
            <span className="text-sm font-medium">{project.name}</span>
            <span className="col-start-2 text-pretty text-sm text-zinc-500 sm:col-start-3 sm:text-right">
              {project.note}
            </span>
          </li>
        ))}
      </ul>
    </SiteFrame>
  )
}
