export const CONTACT_EMAIL = "hello@tobybarnes.me"

/**
 * X usernames cannot contain a period, so "toby.barnes" resolves to
 * @toby_barnes here. Note that x.com/tobybarnes is a different person, so this
 * one is worth confirming before it ships.
 * Empty entries are dropped, so a blank href renders nothing.
 */
export const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tobybarnes/" },
  { label: "X", href: "https://x.com/toby_barnes" },
  { label: "Instagram", href: "https://www.instagram.com/tobybarnes/" },
  {
    label: "Mona Lisa Overdrive",
    href: "https://www.instagram.com/mona.lisa.over.driv3/",
  },
].filter((link) => link.href !== "")
