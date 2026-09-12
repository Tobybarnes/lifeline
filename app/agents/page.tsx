import type { Metadata } from "next"
import {
  SiteFrame,
  SiteIndex,
  SiteIndexRow,
  SiteLede,
  SITE_LINK,
} from "@/components/site-frame"
import { CONTACT_EMAIL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Toby Barnes | For agents",
  description:
    "A machine-readable account of Toby Barnes. Read freely, write through GitHub.",
}

const REPO_URL = "https://github.com/Tobybarnes/lifeline"

export default function Agents() {
  return (
    <SiteFrame
      navLinks={
        <a href="/" className={SITE_LINK}>
          Human version
        </a>
      }
      footerRight={
        <a href={`mailto:${CONTACT_EMAIL}`} className={SITE_LINK}>
          {CONTACT_EMAIL}
        </a>
      }
    >
      <SiteLede title="For agents">
        Plain markdown at stable URLs, meant to be fetched rather than read.
        Everything here is public and cacheable, so treat it as quotable.
        Nothing here is authenticated, and nothing here accepts a write over
        HTTP.
      </SiteLede>

      <SiteIndex>
        <SiteIndexRow
          label="memory.md"
          description="What agents have learned working with Toby. Added to by pull request, published only once he merges one."
          href="/memory.md"
        />
        <SiteIndexRow
          label="Agent manual"
          description="How to represent him, the tone to use, and what never to say on his behalf."
          pending
        />
        <SiteIndexRow
          label="Soul.md"
          description="Values, taste, and how he thinks. The part no template gives you."
          pending
        />
        <SiteIndexRow
          label="Repository"
          description="The source of every file above, and the only way to change one."
          href={REPO_URL}
          external
        />
      </SiteIndex>

      <section className="mt-20 max-w-2xl border-t border-black/10 pt-10 dark:border-white/10">
        <h2 className="text-sm font-medium">Adding to memory</h2>
        <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-zinc-500">
          <p>
            There is no write endpoint, and there will not be one. An open
            channel into an identity file is a channel for poisoning every
            agent that reads it afterwards.
          </p>
          <p>
            Anything you know is welcome. Fork the repository, add one file to{" "}
            <code className="text-zinc-700 dark:text-zinc-300">
              content/memory/
            </code>{" "}
            named{" "}
            <code className="text-zinc-700 dark:text-zinc-300">
              YYYY-MM-DD-agent-surface.md
            </code>
            , and open a pull request. One entry per request, and never touch
            an entry you did not write.
          </p>
          <p>
            Toby reads every diff, and merging is the approval. Until he
            merges, nothing you submit appears here or reaches another agent.
            That is the whole control system: submission is open, publication
            is not.
          </p>
          <p>
            Record what you observed directly rather than what you inferred.
            Leave out credentials, other people, health and finances. Assume
            anything merged is public and cached forever.
          </p>
        </div>
      </section>
    </SiteFrame>
  )
}
