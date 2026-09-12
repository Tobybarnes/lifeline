import type { Metadata } from "next"
import {
  SiteFrame,
  SiteIndex,
  SiteIndexRow,
  SiteLede,
  SITE_LINK,
} from "@/components/site-frame"
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/site"

export const metadata: Metadata = {
  title: "Toby Barnes",
  description: "Design leader. Interactive products, and the teams that make them.",
}

export default function Home() {
  return (
    <SiteFrame
      nav={false}
      footerRight={
        <>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={SITE_LINK}
            >
              {link.label}
            </a>
          ))}
          <a href={`mailto:${CONTACT_EMAIL}`} className={SITE_LINK}>
            {CONTACT_EMAIL}
          </a>
        </>
      }
    >
      {/* One sentence a stranger should leave with. Yours to sharpen. */}
      <SiteLede title="Toby Barnes">
        Design leader. Interactive products, and the teams that make them.
      </SiteLede>

      <SiteIndex>
        <SiteIndexRow
          label="Timeline"
          description="The long version, in order."
          href="/timeline"
        />
        <SiteIndexRow
          label="Work"
          description="A few things worth stopping on."
          href="/work"
        />
      </SiteIndex>
    </SiteFrame>
  )
}
