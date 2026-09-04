import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import path from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

async function loadMarkdownHelpers() {
  try {
    return await import("../lib/lifeline-markdown.mts")
  } catch (error) {
    assert.fail(`Markdown helpers are unavailable: ${error.message}`)
  }
}

test("year headings and bullets become timeline events", async () => {
  const { parseLifelineMarkdown } = await loadMarkdownHelpers()
  const source = [
    "# Toby Barnes",
    "",
    "<!-- Edit the bullet text beneath each year. -->",
    "",
    "## 1999",
    "- Met Emily.",
    "",
    "## 2003",
    "- Creative Director at Twelve Ten.",
    "- Led Alexa’s end-to-end experience.",
  ].join("\r\n")

  assert.deepEqual(parseLifelineMarkdown(source), {
    1999: ["Met Emily."],
    2003: [
      "Creative Director at Twelve Ten.",
      "Led Alexa’s end-to-end experience.",
    ],
  })
})

test("duplicate year headings report their line", async () => {
  const { parseLifelineMarkdown } = await loadMarkdownHelpers()
  const source = "## 1999\n- Met Emily.\n\n## 1999\n- Met Emily again."

  assert.throws(
    () => parseLifelineMarkdown(source, { sourceName: "content/toby.md" }),
    /content\/toby\.md:4: duplicate year heading 1999/,
  )
})

test("out-of-order years report their line", async () => {
  const { parseLifelineMarkdown } = await loadMarkdownHelpers()
  const source = "## 2003\n- Archie was born.\n\n## 1999\n- Met Emily."

  assert.throws(
    () => parseLifelineMarkdown(source, { sourceName: "content/toby.md" }),
    /content\/toby\.md:4: year 1999 must come after 2003/,
  )
})

test("a bullet before its year reports its line", async () => {
  const { parseLifelineMarkdown } = await loadMarkdownHelpers()

  assert.throws(
    () =>
      parseLifelineMarkdown("- Met Emily.", {
        sourceName: "content/toby.md",
      }),
    /content\/toby\.md:1: event bullet must follow a year heading/,
  )
})

test("malformed headings report their line", async () => {
  const { parseLifelineMarkdown } = await loadMarkdownHelpers()

  assert.throws(
    () =>
      parseLifelineMarkdown("## nineteen ninety-nine\n- Met Emily.", {
        sourceName: "content/toby.md",
      }),
    /content\/toby\.md:1: expected a year heading like ## 1999/,
  )
})

test("non-bullet event text reports its line", async () => {
  const { parseLifelineMarkdown } = await loadMarkdownHelpers()

  assert.throws(
    () =>
      parseLifelineMarkdown("## 1999\nMet Emily.", {
        sourceName: "content/toby.md",
      }),
    /content\/toby\.md:2: expected an event bullet beginning with - /,
  )
})

test("empty bullets report their line", async () => {
  const { parseLifelineMarkdown } = await loadMarkdownHelpers()

  assert.throws(
    () =>
      parseLifelineMarkdown("## 1999\n-   ", {
        sourceName: "content/toby.md",
      }),
    /content\/toby\.md:2: event bullet cannot be empty/,
  )
})

test("Markdown links report their line instead of rendering as punctuation", async () => {
  const { parseLifelineMarkdown } = await loadMarkdownHelpers()

  assert.throws(
    () =>
      parseLifelineMarkdown(
        "## 2025\n- Joined [Shopify](https://www.shopify.com/).",
        { sourceName: "content/toby.md" },
      ),
    /content\/toby\.md:2: Markdown links are not supported; use plain text/,
  )
})

test("Markdown reference links report their line", async () => {
  const { parseLifelineMarkdown } = await loadMarkdownHelpers()

  assert.throws(
    () =>
      parseLifelineMarkdown("## 2025\n\n- Joined [Shopify][shop].", {
        sourceName: "content/toby.md",
      }),
    /content\/toby\.md:3: Markdown links are not supported; use plain text/,
  )
})

test("Markdown autolinks report their line", async () => {
  const { parseLifelineMarkdown } = await loadMarkdownHelpers()

  assert.throws(
    () =>
      parseLifelineMarkdown("## 2025\n- Visit <https:\/\/shopify.com>.", {
        sourceName: "content/toby.md",
      }),
    /content\/toby\.md:2: Markdown links are not supported; use plain text/,
  )
})

test("Markdown images with empty alt text report their line", async () => {
  const { parseLifelineMarkdown } = await loadMarkdownHelpers()

  assert.throws(
    () =>
      parseLifelineMarkdown("## 2025\n\n\n- ![](logo.png)", {
        sourceName: "content/toby.md",
      }),
    /content\/toby\.md:4: Markdown links are not supported; use plain text/,
  )
})

test("Markdown URI and email autolinks report their line", async () => {
  const { parseLifelineMarkdown } = await loadMarkdownHelpers()

  for (const event of [
    "Email <toby@example.com>.",
    "Download <ftp://example.com/file>.",
  ]) {
    assert.throws(
      () =>
        parseLifelineMarkdown(`## 2025\n- ${event}`, {
          sourceName: "content/toby.md",
        }),
      /content\/toby\.md:2: Markdown links are not supported; use plain text/,
    )
  }
})

test("Markdown links with nested label text report their line", async () => {
  const { parseLifelineMarkdown } = await loadMarkdownHelpers()

  assert.throws(
    () =>
      parseLifelineMarkdown(
        "## 2025\n- Joined [the [Shopify] team](https://shopify.com).",
        { sourceName: "content/toby.md" },
      ),
    /content\/toby\.md:2: Markdown links are not supported; use plain text/,
  )
})

test("ordinary angle-bracket prose remains plain event text", async () => {
  const { parseLifelineMarkdown } = await loadMarkdownHelpers()

  assert.deepEqual(
    parseLifelineMarkdown("## 2001\n- Moved from <London> to <Sydney>.", {
      sourceName: "content/toby.md",
    }),
    { 2001: ["Moved from <London> to <Sydney>."] },
  )
})

test("only one H1 title is accepted", async () => {
  const { parseLifelineMarkdown } = await loadMarkdownHelpers()

  assert.throws(
    () =>
      parseLifelineMarkdown(
        "# Toby Barnes\n# Another title\n\n## 1999\n- Met Emily.",
        { sourceName: "content/toby.md" },
      ),
    /content\/toby\.md:2: only one H1 title is allowed/,
  )
})

test("years outside the configured timeline report their line", async () => {
  const { parseLifelineMarkdown } = await loadMarkdownHelpers()

  assert.throws(
    () =>
      parseLifelineMarkdown("## 1972\n- Too early.", {
        sourceName: "content/toby.md",
        minYear: 1973,
        maxYear: 2026,
      }),
    /content\/toby\.md:1: year 1972 is outside 1973–2026/,
  )

  assert.throws(
    () =>
      parseLifelineMarkdown("## 2027\n- Too late.", {
        sourceName: "content/toby.md",
        minYear: 1973,
        maxYear: 2026,
      }),
    /content\/toby\.md:1: year 2027 is outside 1973–2026/,
  )
})

test("metadata-only and Markdown-only years both survive the merge", async () => {
  const { mergeLifelineMarkdownEvents } = await loadMarkdownHelpers()
  const metadata = {
    1973: {
      id: "united-kingdom",
      country: { flag: "🇬🇧", name: "United Kingdom" },
    },
    1990: {
      id: "university",
      companies: [{ id: "university", name: "University" }],
    },
  }
  const events = {
    1990: ["Started university."],
    1999: ["Met Emily."],
  }

  assert.deepEqual(mergeLifelineMarkdownEvents(metadata, events), {
    1973: {
      id: "united-kingdom",
      country: { flag: "🇬🇧", name: "United Kingdom" },
      events: [],
    },
    1990: {
      id: "university",
      companies: [{ id: "university", name: "University" }],
      events: ["Started university."],
    },
    1999: {
      id: "year-1999",
      events: ["Met Emily."],
    },
  })
})

test("an undefined metadata id cannot erase a generated year id", async () => {
  const { mergeLifelineMarkdownEvents } = await loadMarkdownHelpers()

  assert.deepEqual(
    mergeLifelineMarkdownEvents({ 1999: { id: undefined } }, {
      1999: ["Met Emily."],
    }),
    {
      1999: {
        id: "year-1999",
        events: ["Met Emily."],
      },
    },
  )
})

test("Toby's real Markdown content merges with timeline metadata", async () => {
  const { mergeLifelineMarkdownEvents, parseLifelineMarkdown } =
    await loadMarkdownHelpers()
  const sourceName = "content/toby.md"
  const source = readFileSync(path.join(root, sourceName), "utf8")
  const events = parseLifelineMarkdown(source, {
    sourceName,
    minYear: 1973,
    maxYear: new Date().getFullYear(),
  })
  const metadata = {
    1973: {
      id: "united-kingdom",
      country: { flag: "🇬🇧", name: "United Kingdom" },
    },
    1990: {
      id: "liverpool-john-moores-university",
      companies: [
        {
          id: "liverpool-john-moores-university",
          name: "Liverpool John Moores University",
        },
      ],
    },
    2001: {
      id: "australia",
      country: { flag: "🇦🇺", name: "Australia" },
    },
    2002: {
      id: "returned-to-united-kingdom",
      country: { flag: "🇬🇧", name: "United Kingdom" },
    },
    2013: {
      id: "trackshift-advisor",
      country: { flag: "🇺🇸", name: "United States" },
    },
  }
  const milestones = mergeLifelineMarkdownEvents(metadata, events)

  assert.deepEqual(Object.keys(events).map(Number), [
    1990, 1992, 1996, 1998, 1999, 2003, 2004, 2005, 2006, 2007, 2009,
    2011, 2013, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
    2024, 2025,
  ])
  assert.deepEqual(milestones[1973], {
    ...metadata[1973],
    events: [],
  })
  assert.deepEqual(milestones[1999], {
    id: "year-1999",
    events: events[1999],
  })
  assert.deepEqual(milestones[2001], {
    ...metadata[2001],
    events: [],
  })
  assert.deepEqual(milestones[2002], {
    ...metadata[2002],
    events: [],
  })
  assert.deepEqual(milestones[2013].country, metadata[2013].country)
  assert.ok(
    milestones[2013].events.some((event) => event.includes("TrackShift")),
  )
})
