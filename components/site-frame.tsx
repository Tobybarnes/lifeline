import type { ReactNode } from "react"
import {
  LifelineFooter,
  LifelineNav,
  LifelineShell,
} from "@/components/lifeline-shell"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { cn } from "@/lib/utils"

/**
 * Chrome for every page that is not the timeline itself.
 *
 * It borrows the timeline's own shell, nav and footer so the design
 * system has exactly one source of truth. The only difference is the
 * stage: the timeline hands scrolling to its horizontal scrub above
 * `md`, whereas a text page always scrolls normally.
 */

export const SITE_LINK =
  "inline-flex min-h-11 items-center text-balance text-sm text-zinc-500 transition-colors duration-300 hover:text-black dark:hover:text-white"

const CONTAINER = "mx-auto w-full max-w-5xl px-6"

export function SiteFrame({
  nav = true,
  navLinks,
  footerRight,
  children,
}: {
  /** The apex door carries its own name, so it does without a nav entirely. */
  nav?: boolean
  navLinks?: ReactNode
  footerRight?: ReactNode
  children: ReactNode
}) {
  return (
    <LifelineShell>
      {nav ? (
        <LifelineNav
          logo={
            <span className="text-balance text-sm font-medium">Toby Barnes</span>
          }
          logoLabel="Toby Barnes"
        >
          {navLinks}
        </LifelineNav>
      ) : null}

      <main
        className={cn("min-h-0 flex-1 overflow-y-auto", nav ? "pt-16" : "pt-6")}
      >
        <div className={cn(CONTAINER, "py-16 md:py-24")}>{children}</div>
      </main>

      <LifelineFooter containerClassName="h-auto min-h-16 flex-wrap gap-x-6 gap-y-1 py-3">
        <ThemeSwitcher />
        {footerRight ? (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {footerRight}
          </div>
        ) : null}
      </LifelineFooter>
    </LifelineShell>
  )
}

/** The statement at the top of a door: who, then one line of what. */
export function SiteLede({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <header className="flex max-w-2xl flex-col gap-4">
      <h1 className="text-balance text-2xl font-medium tracking-tight md:text-3xl">
        {title}
      </h1>
      <p className="text-pretty text-sm leading-relaxed text-zinc-500">
        {children}
      </p>
    </header>
  )
}

/**
 * The index. Rows are destinations, so a row that is not built yet stays
 * visible and legible but does not pretend to be a link.
 */
export function SiteIndex({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-14 flex flex-col border-t border-black/10 dark:border-white/10">
      {children}
    </ul>
  )
}

export function SiteIndexRow({
  label,
  description,
  href,
  external,
  pending,
}: {
  label: string
  description: string
  href?: string
  external?: boolean
  pending?: boolean
}) {
  const inner = (
    <>
      <span
        className={cn(
          "text-sm font-medium transition-colors duration-300",
          pending && "text-zinc-400 dark:text-zinc-600",
        )}
      >
        {label}
        {pending ? <span className="sr-only"> (not published yet)</span> : null}
      </span>
      <span
        className={cn(
          "text-pretty text-sm sm:text-right",
          pending ? "text-zinc-400 dark:text-zinc-600" : "text-zinc-500",
        )}
      >
        {description}
      </span>
    </>
  )

  const layout =
    "grid grid-cols-1 gap-1 py-5 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:items-baseline sm:gap-8"

  return (
    <li className="border-b border-black/10 dark:border-white/10">
      {href && !pending ? (
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className={cn(
            layout,
            "transition-opacity duration-300 hover:opacity-60",
          )}
        >
          {inner}
        </a>
      ) : (
        <div className={cn(layout, "cursor-default")}>{inner}</div>
      )}
    </li>
  )
}
