import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const at = (file) => path.join(root, file)
const read = (file) => readFileSync(at(file), "utf8")

test("Toby's record contains only the confirmed first-pass chronology", () => {
  const source = read("lib/toby.ts")

  assert.match(source, /name:\s*["']Toby Barnes["']/)
  assert.match(source, /birthYear:\s*1973/)
  assert.match(source, /const CURRENT_YEAR = new Date\(\)\.getFullYear\(\)/)
  assert.match(source, /endYear:\s*CURRENT_YEAR/)
  assert.match(source, /https:\/\/www\.linkedin\.com\/in\/tobybarnes\//)

  const expectedMilestones = [
    [
      1990,
      [
        "Liverpool John Moores University (1990–1994): Bachelor of Arts - BA, Business Information & Management (Business Administration and Marketing).",
        "Chairman of the Role Playing Society for 4 years. :)",
      ],
    ],
    [1992, ["Dun & Bradstreet (1992–1996)."]],
    [1996, ["NTL Interactive (1996–1998)."]],
    [1998, ["MTV (1998–2003)."]],
    [1999, ["Met Emily."]],
    [2003, ["Twelve Ten (2003–2004).", "Archie was born."]],
    [2004, ["Mudlark Digital / Pixel-Lab (2004–2011)."]],
    [2005, ["London Games Festival (2005–2009).", "Robin was born."]],
    [2006, ["Got married."]],
    [2007, ["Fraser was born."]],
    [2009, ["Chromaroma (2009–2011)."]],
    [2011, ["AKQA, London and later Portland (2011–2019)."]],
    [2013, ["TrackShift advisor (2013–2019)."]],
    [2015, ["A Strangely Isolated Place (2015–present)."]],
    [2017, ["Jaguar Land Rover mentor (2017–2018)."]],
    [2019, ["Nike (2019–2021)."]],
    [2021, ["Amazon Alexa (2021–2023)."]],
    [2023, ["Cash App (2023–2025)."]],
    [2024, ["Hoyt Arboretum Friends board (2024–present)."]],
    [2025, ["Shopify (2025–present)."]],
  ]

  const milestoneYears = [...source.matchAll(/^  (\d{4}): \{$/gm)].map(
    (match) => Number(match[1]),
  )
  assert.deepEqual(
    milestoneYears,
    expectedMilestones.map(([year]) => year),
  )

  for (const [, events] of expectedMilestones) {
    for (const event of events) {
      assert.ok(
        source.includes(JSON.stringify(event)),
        `missing confirmed event: ${event}`,
      )
    }
  }

  assert.doesNotMatch(source, /\b(?:daughter|son|sold|sale)\b/i)

  const media = [
    ...source.matchAll(/\b(?:src|video|photo):\s*["']([^"']+)["']/g),
  ].map((match) => match[1])

  for (const mediaPath of media) {
    assert.match(mediaPath, /^\/images\/toby\//)
    assert.ok(existsSync(at(`public${mediaPath}`)), `${mediaPath} is missing`)
  }
})

test("the home page and metadata belong to Toby", () => {
  const page = read("app/page.tsx")
  const layout = read("app/layout.tsx")

  assert.match(page, /from ["']@\/lib\/toby["']/)
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
    [2013, [{ id: "trackshift", name: "TrackShift" }]],
    [2015, [{ id: "a-strangely-isolated-place", name: "A Strangely Isolated Place" }]],
    [2017, [{ id: "jaguar-land-rover", name: "Jaguar Land Rover" }]],
    [2019, [{ id: "nike", name: "Nike" }]],
    [2021, [{ id: "amazon-alexa", name: "Amazon Alexa" }]],
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
    expectedCompanies.flatMap(([, companies]) =>
      companies.map((company) => company.id),
    ).sort(),
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
