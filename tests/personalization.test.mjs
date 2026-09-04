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
    [2003, ["Twelve Ten (2003–2004)."]],
    [2004, ["Mudlark Digital / Pixel-Lab (2004–2011)."]],
    [2005, ["London Games Festival (2005–2009)."]],
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

  assert.doesNotMatch(source, /\b(?:child|children|daughter|son|sold|sale)\b/i)

  const media = [
    ...source.matchAll(/\b(?:src|video|photo):\s*["']([^"']+)["']/g),
  ].map((match) => match[1])

  for (const mediaPath of media) {
    assert.match(mediaPath, /^\/images\/toby\//)
    assert.ok(existsSync(at(`public${mediaPath}`)), `${mediaPath} is missing`)
  }
})
