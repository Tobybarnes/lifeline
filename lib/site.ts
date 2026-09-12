export const CONTACT_EMAIL = "hello@tobybarnes.me"

/** Empty entries are dropped, so a blank href renders nothing. */
export const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tobybarnes/" },
  { label: "X", href: "https://x.com/tobydotbarnes" },
  { label: "Instagram", href: "https://www.instagram.com/tobybarnes/" },
  {
    label: "Mona Lisa Overdrive",
    href: "https://www.instagram.com/mona.lisa.over.driv3/",
  },
].filter((link) => link.href !== "")
