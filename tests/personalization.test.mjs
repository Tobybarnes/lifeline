import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { parseLifelineMarkdown } from "../lib/lifeline-markdown.mts"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const at = (file) => path.join(root, file)
const read = (file) => readFileSync(at(file), "utf8")

test("Toby's record contains the confirmed LinkedIn and family chronology", () => {
  const source = read("lib/toby.ts")
  const content = read("content/toby.md")
  const eventsByYear = parseLifelineMarkdown(content, {
    sourceName: "content/toby.md",
    minYear: 1973,
    maxYear: new Date().getFullYear(),
  })

  assert.match(source, /name:\s*["']Toby Barnes["']/)
  assert.match(source, /birthYear:\s*1973/)
  assert.match(source, /const CURRENT_YEAR = new Date\(\)\.getFullYear\(\)/)
  assert.match(source, /endYear:\s*CURRENT_YEAR/)
  assert.match(source, /https:\/\/www\.linkedin\.com\/in\/tobybarnes\//)

  assert.deepEqual(Object.keys(eventsByYear).map(Number), [
    1990, 1992, 1996, 1998, 1999, 2003, 2004, 2005, 2006, 2007, 2009,
    2011, 2013, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
    2024, 2025,
  ])
  assert.ok(eventsByYear[1999].some((event) => event.includes("Met Emily")))
  assert.match(eventsByYear[2003].at(-1), /Archie was born/)
  assert.match(eventsByYear[2005].at(-1), /Robin was born/)
  assert.ok(eventsByYear[2006].some((event) => event.includes("Got married")))
  assert.match(eventsByYear[2007].at(-1), /Fraser was born/)
  assert.match(eventsByYear[1990][0], /Liverpool John Moores University/)
  assert.match(eventsByYear[2025][0], /Design Director at Shopify/)

  const metadataYears = [...source.matchAll(/^  (\d{4}): \{$/gm)].map(
    (match) => Number(match[1]),
  )
  assert.deepEqual(metadataYears, [
    1973, 1990, 1992, 1996, 1998, 1999, 2001, 2002, 2003, 2004, 2005,
    2006, 2007, 2009, 2011, 2013, 2015, 2016, 2017, 2018, 2019, 2020,
    2021, 2022, 2023, 2024, 2025,
  ])
  const metadataSource = source.slice(
    source.indexOf("const milestoneMetadata"),
    source.indexOf("export function getTobyLifeline"),
  )
  assert.doesNotMatch(metadataSource, /^\s*events\s*:/m)
  assert.doesNotMatch(content, /\b(?:daughter|son|sold|sale)\b/i)

  const media = [
    ...source.matchAll(/\b(?:src|video|photo):\s*["']([^"']+)["']/g),
  ].map((match) => match[1])

  for (const mediaPath of media) {
    assert.match(mediaPath, /^\/images\/toby\//)
    assert.ok(existsSync(at(`public${mediaPath}`)), `${mediaPath} is missing`)
  }
})

test("company roles use the month and year ranges from LinkedIn", () => {
  const content = read("content/toby.md")
  const eventsByYear = parseLifelineMarkdown(content, {
    sourceName: "content/toby.md",
    minYear: 1973,
    maxYear: new Date().getFullYear(),
  })
  const expectedRoleDates = [
    [1992, "Dun & Bradstreet", "Feb 1992–Feb 1996"],
    [1996, "NTL Interactive", "Nov 1996–Dec 1998"],
    [1998, "MTV UK", "Dec 1998–Mar 2003"],
    [2003, "Twelve Ten", "Oct 2003–Oct 2004"],
    [2004, "Pixel-Lab", "Apr 2004–Mar 2011"],
    [2005, "London Games Festival", "Mar 2005–Dec 2009"],
    [2009, "Chromaroma", "Dec 2009–Dec 2011"],
    [2011, "AKQA London", "May 2011–Aug 2013"],
    [2013, "Nike", "Aug 2013–Aug 2016"],
    [2013, "TrackShift", "Sep 2013–Dec 2019"],
    [2015, "A Strangely Isolated Place", "Jan 2015–present"],
    [2016, "AKQA", "Sep 2016–Jun 2018"],
    [2017, "Jaguar Land Rover", "Jan 2017–Feb 2018"],
    [2018, "AKQA", "Jun 2018–Jun 2019"],
    [2019, "Nike", "Jun 2019–May 2021"],
    [2021, "Amazon Alexa", "May 2021–Jun 2022"],
    [2022, "Amazon Alexa", "Jul 2022–Jun 2023"],
    [2023, "Cash App", "Jun 2023–May 2025"],
    [2024, "Hoyt Arboretum Friends", "Mar 2024–present"],
    [2025, "Shopify", "Jun 2025–present"],
  ]

  for (const [year, organization, dateRange] of expectedRoleDates) {
    const event = eventsByYear[year].find((candidate) =>
      candidate.includes(organization) && candidate.includes(`(${dateRange})`),
    )

    assert.ok(event, `${organization} should show ${dateRange} in ${year}`)
  }
})

test("Toby's timeline marks each country transition with a flag", () => {
  const source = read("lib/toby.ts")
  const types = read("components/lifeline/types.ts")
  const labels = read("components/lifeline/lifeline-labels.tsx")
  const desktop = read("components/lifeline/lifeline-desktop.tsx")
  const vertical = read("components/lifeline/lifeline-vertical.tsx")

  const expectedCountries = [
    [1973, { flag: "🇬🇧", name: "United Kingdom" }],
    [2001, { flag: "🇦🇺", name: "Australia" }],
    [2002, { flag: "🇬🇧", name: "United Kingdom" }],
    [2013, { flag: "🇺🇸", name: "United States" }],
  ]

  for (const [year, country] of expectedCountries) {
    const milestone = source.match(
      new RegExp(`^  ${year}: \\{[\\s\\S]*?^  \\},$`, "m"),
    )?.[0]

    assert.ok(milestone, `missing ${year} country transition`)
    assert.ok(
      milestone.includes(`flag: ${JSON.stringify(country.flag)}`),
      `${year} is missing ${country.flag}`,
    )
    assert.ok(
      milestone.includes(`name: ${JSON.stringify(country.name)}`),
      `${year} is missing ${country.name}`,
    )
  }

  assert.match(types, /country\?: LifelineCountry/)
  assert.match(labels, />\s*Country\s*</)
  assert.match(desktop, /markers\.some\(\(marker\) => marker\.country\)/)
  assert.match(vertical, /markers\.some\(\(marker\) => marker\.country\)/)
})

test("the mobile timeline can show country and age at the same time", () => {
  const vertical = read("components/lifeline/lifeline-vertical.tsx")
  const entryStart = vertical.indexOf("const LifelineVerticalEntry")
  const componentStart = vertical.indexOf("export function LifelineVertical")
  const entry = vertical.slice(entryStart, componentStart)
  const component = vertical.slice(componentStart)

  assert.match(vertical, /const COUNTRY_AND_AGE_GRID_CLASS\s*=/)
  assert.match(vertical, /const COUNTRY_AND_AGE_RAIL_LEFT\s*=/)
  assert.match(
    vertical,
    /showCountry && showAge\s*\?\s*COUNTRY_AND_AGE_GRID_CLASS/,
  )
  assert.match(
    vertical,
    /showCountry && showAge\s*\?\s*COUNTRY_AND_AGE_RAIL_LEFT/,
  )
  assert.match(entry, /\{showCountry && \([\s\S]*?<LifelineCountryFlag/)
  assert.match(entry, /\{showAge && \([\s\S]*?\{age\}/)
  assert.match(component, /\{showCountry && \([\s\S]*?>\s*Country\s*</)
  assert.match(component, /\{showAge && \([\s\S]*?>\s*Age\s*</)
})

test("the home page and metadata belong to Toby", () => {
  const page = read("app/page.tsx")
  const layout = read("app/layout.tsx")
  const source = read("lib/toby.ts")

  assert.match(page, /from ["']@\/lib\/toby["']/)
  assert.match(page, /const tobyLifeline = getTobyLifeline\(\)/)
  assert.match(page, /markers=\{tobyLifeline\.markers\}/)
  assert.match(page, /birthYear=\{tobyLifeline\.birthYear\}/)
  assert.match(page, /TOBY_LINKEDIN_URL/)
  assert.match(page, /Built with Lifeline/)
  assert.match(page, /https:\/\/github\.com\/evilrabbit\/lifeline/)
  assert.equal((page.match(/evilrabbit/gi) ?? []).length, 1)
  assert.doesNotMatch(
    page,
    /evilrabbitLifeline|RabbitLogo|DemoCompanyIcons|CopyCommand|LifelineLegend/,
  )
  assert.match(layout, /title:\s*["']Toby Barnes \| Lifeline["']/)
  assert.match(layout, /A year-by-year record of Toby Barnes's work and life\./)
  assert.match(source, /export function getTobyLifeline\(\)/)
  assert.match(source, /readFileSync\(/)
  assert.match(source, /mergeLifelineMarkdownEvents\(/)
})

test("Toby's timeline hides ages and uses smaller years without changing the demos", () => {
  const home = read("app/page.tsx")
  const upstreamPage = read("app/lifeline/page.tsx")
  const embedPage = read("app/embed/page.tsx")
  const types = read("components/lifeline/types.ts")
  const desktop = read("components/lifeline/lifeline-desktop.tsx")
  const vertical = read("components/lifeline/lifeline-vertical.tsx")

  assert.match(home, /showAge=\{false\}/)
  assert.match(home, /yearClassName=["']text-\[12px\]["']/)

  for (const demo of [upstreamPage, embedPage]) {
    assert.doesNotMatch(demo, /showAge=/)
    assert.doesNotMatch(demo, /yearClassName=/)
  }

  assert.match(types, /showAge\?: boolean/)
  assert.match(types, /yearClassName\?: string/)
  assert.match(desktop, /showAge = true/)
  assert.match(vertical, /showAge = true/)
})

test("organization milestones carry company icons through Toby's registry", () => {
  const source = read("lib/toby.ts")
  const page = read("app/page.tsx")
  const registryPath = "components/toby-company-icons.tsx"

  const expectedCompanies = [
    [1990, [{ id: "liverpool-john-moores-university", name: "Liverpool John Moores University" }]],
    [1992, [{ id: "dun-and-bradstreet", name: "Dun & Bradstreet" }]],
    [1996, [{ id: "ntl-interactive", name: "NTL Interactive" }]],
    [1998, [{ id: "mtv", name: "MTV" }]],
    [2003, [{ id: "twelve-ten", name: "Twelve Ten" }]],
    [
      2004,
      [
        { id: "mudlark-digital", name: "Mudlark Digital" },
        { id: "pixel-lab", name: "Pixel-Lab" },
      ],
    ],
    [2005, [{ id: "london-games-festival", name: "London Games Festival" }]],
    [2009, [{ id: "chromaroma", name: "Chromaroma" }]],
    [2011, [{ id: "akqa", name: "AKQA" }]],
    [
      2013,
      [
        { id: "akqa", name: "AKQA" },
        { id: "trackshift", name: "TrackShift" },
      ],
    ],
    [2015, [{ id: "a-strangely-isolated-place", name: "A Strangely Isolated Place" }]],
    [2016, [{ id: "akqa", name: "AKQA" }]],
    [2017, [{ id: "jaguar-land-rover", name: "Jaguar Land Rover" }]],
    [2018, [{ id: "akqa", name: "AKQA" }]],
    [2019, [{ id: "nike", name: "Nike" }]],
    [2020, [{ id: "nike", name: "Nike" }]],
    [2021, [{ id: "amazon-alexa", name: "Amazon Alexa" }]],
    [2022, [{ id: "amazon-alexa", name: "Amazon Alexa" }]],
    [2023, [{ id: "cash-app", name: "Cash App" }]],
    [2024, [{ id: "hoyt-arboretum-friends", name: "Hoyt Arboretum Friends" }]],
    [2025, [{ id: "shopify", name: "Shopify" }]],
  ]

  for (const [year, companies] of expectedCompanies) {
    const milestone = source.match(
      new RegExp(`^  ${year}: \\{[\\s\\S]*?^  \\},$`, "m"),
    )?.[0]

    assert.ok(milestone, `missing ${year} milestone`)
    for (const company of companies) {
      assert.ok(
        milestone.includes(`id: ${JSON.stringify(company.id)}`),
        `${year} is missing company id ${company.id}`,
      )
      assert.ok(
        milestone.includes(`name: ${JSON.stringify(company.name)}`),
        `${year} is missing company name ${company.name}`,
      )
    }
  }

  assert.equal(existsSync(at(registryPath)), true, `${registryPath} is missing`)
  const registry = read(registryPath)
  assert.match(registry, /registerCompanyIcons\(/)
  const registeredCompanyIds = [
    "liverpool-john-moores-university",
    "dun-and-bradstreet",
    "ntl-interactive",
    "mtv",
    "london-games-festival",
    "akqa",
    "a-strangely-isolated-place",
    "jaguar-land-rover",
    "nike",
    "amazon-alexa",
    "cash-app",
    "hoyt-arboretum-friends",
    "shopify",
  ]
  const reviewedInitialFallbackIds = [
    "twelve-ten",
    "mudlark-digital",
    "pixel-lab",
    "chromaroma",
    "trackshift",
  ]

  assert.deepEqual(
    [...registeredCompanyIds, ...reviewedInitialFallbackIds].sort(),
    [
      ...new Set(
        expectedCompanies.flatMap(([, companies]) =>
          companies.map((company) => company.id),
        ),
      ),
    ].sort(),
  )

  for (const id of registeredCompanyIds) {
    const registryKey = id.includes("-")
      ? new RegExp(`["']${id}["']\\s*:`)
      : new RegExp(`\\b${id}\\s*:`)
    assert.match(registry, registryKey, `${id} is missing a registered logo`)
  }

  for (const id of reviewedInitialFallbackIds) {
    const registryKey = id.includes("-")
      ? new RegExp(`["']${id}["']\\s*:`)
      : new RegExp(`\\b${id}\\s*:`)
    assert.doesNotMatch(
      registry,
      registryKey,
      `${id} has a logo and no longer belongs in the fallback allowlist`,
    )
  }

  const assetPaths = [
    ...registry.matchAll(
      /createMaskedBrandIcon\(\s*["']([^"']+)["']/g,
    ),
  ].map((match) => match[1])

  assert.equal(assetPaths.length, 10)
  for (const assetPath of assetPaths) {
    assert.match(assetPath, /^\/images\/toby\/companies\//)
    assert.ok(existsSync(at(`public${assetPath}`)), `${assetPath} is missing`)
  }
  assert.match(page, /import \{ TobyCompanyIcons \} from ["']@\/components\/toby-company-icons["']/)
  assert.match(page, /<TobyCompanyIcons\s*\/>/)
})

test("sourced company marks use the approved 2× dimensions", () => {
  const registry = read("components/toby-company-icons.tsx")
  const expectedLogoSizes = {
    "liverpool-john-moores-university": "h-8 w-8",
    "dun-and-bradstreet": "h-6 w-32",
    "ntl-interactive": "h-7 w-20",
    mtv: "h-8 w-10",
    "london-games-festival": "h-6 w-32",
    akqa: "h-6 w-14",
    "a-strangely-isolated-place": "h-8 w-8",
    "jaguar-land-rover": "h-8 w-8",
    nike: "h-6 w-12",
    "amazon-alexa": "h-6 w-32",
    "cash-app": "h-8 w-8",
    "hoyt-arboretum-friends": "h-6 w-32",
    shopify: "h-8 w-8",
  }

  for (const [id, sizeClassName] of Object.entries(expectedLogoSizes)) {
    const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const entry = registry.match(
      new RegExp(
        `(?:["']${escapedId}["']|\\b${escapedId})\\s*:\\s*\\{[\\s\\S]*?sizeClassName:\\s*["']([^"']+)["']`,
      ),
    )

    assert.equal(entry?.[1], sizeClassName, `${id} should use its 2× logo size`)
  }
})

test("the upstream demo and registry files remain available", () => {
  for (const file of [
    "app/embed/page.tsx",
    "app/lifeline/page.tsx",
    "lib/evilrabbit.ts",
    "lib/lifeline-personal.ts",
    "lib/lifeline-company.ts",
    "lib/lifeline-journey.ts",
    "components/rabbit-logo.tsx",
    "components/demo-company-icons.tsx",
    "components/copy-command.tsx",
    "registry.json",
    "public/r",
    "public/images/meeting-elon.jpg",
    "public/images/meeting-elon.mp4",
    "public/images/people",
    "app/icon.svg",
    "app/icon.png",
    "app/apple-icon.png",
  ]) {
    assert.equal(existsSync(at(file)), true, `${file} should be preserved`)
  }
})

test("the reusable engine and license remain", () => {
  assert.equal(existsSync(at("components/lifeline/lifeline.tsx")), true)
  assert.equal(existsSync(at("components/lifeline-shell.tsx")), true)

  const license = read("LICENSE")
  assert.match(license, /MIT License/)
  assert.match(license, /Copyright \(c\) 2026 Evil Rabbit/)
})
