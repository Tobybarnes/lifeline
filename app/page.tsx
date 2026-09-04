import { Lifeline } from "@/components/lifeline"
import {
  LifelineFooter,
  LifelineNav,
  LifelineShell,
  LifelineStage,
} from "@/components/lifeline-shell"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { TOBY_LINKEDIN_URL, tobyLifeline } from "@/lib/toby"

const UPSTREAM_URL = "https://github.com/evilrabbit/lifeline"
const LINK_CLASS_NAME =
  "inline-flex min-h-11 items-center text-balance text-sm text-zinc-500 transition-colors duration-300 hover:text-black dark:hover:text-white"

export default function Home() {
  return (
    <LifelineShell>
      <LifelineNav
        logo={<span className="text-balance text-sm font-medium">Toby Barnes</span>}
        logoLabel="Toby Barnes"
      >
        <a
          href={TOBY_LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS_NAME}
        >
          LinkedIn
        </a>
      </LifelineNav>

      <LifelineStage>
        <Lifeline
          markers={tobyLifeline.markers}
          birthYear={tobyLifeline.birthYear}
          title={tobyLifeline.name}
          className="h-full"
        />
      </LifelineStage>

      <LifelineFooter>
        <ThemeSwitcher />
        <a
          href={UPSTREAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS_NAME}
        >
          Built with Lifeline
        </a>
      </LifelineFooter>
    </LifelineShell>
  )
}
