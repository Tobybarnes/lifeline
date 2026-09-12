import type { Metadata } from "next"
import { SiteFrame, SiteLede, SITE_LINK } from "@/components/site-frame"
import { getManual } from "@/lib/manual"
import { CONTACT_EMAIL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Toby Barnes | How to work with me",
  description: "A user manual for the people Toby Barnes works with.",
  robots: { index: false, follow: false },
}

export default function Friends() {
  const manual = getManual()

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
      <SiteLede title={manual.title}>{manual.intro}</SiteLede>

      <div className="mt-16 flex flex-col gap-14">
        {manual.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-sm font-medium">{section.title}</h2>

            <ul className="mt-5 flex max-w-2xl flex-col gap-4">
              {section.items.map((item, index) => (
                <li
                  key={index}
                  className="text-pretty text-sm leading-relaxed text-zinc-500"
                >
                  {item.lead ? (
                    <span className="text-black dark:text-white">
                      {item.lead}.{" "}
                    </span>
                  ) : null}
                  {item.body}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SiteFrame>
  )
}
