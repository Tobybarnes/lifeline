import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { loadBindings, transform } from "next/dist/build/swc/index.js"
import React from "react"
import { renderToStaticMarkup } from "react-dom/server"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const require = createRequire(import.meta.url)

async function loadLifelineEventComponent() {
  await loadBindings()
  const source = readFileSync(
    path.join(root, "components/lifeline/lifeline-event.tsx"),
    "utf8",
  )
  const output = await transform(source, {
    filename: "lifeline-event.tsx",
    jsc: {
      parser: { syntax: "typescript", tsx: true },
      transform: { react: { runtime: "automatic" } },
    },
    module: { type: "commonjs" },
  })
  const compiledModule = { exports: {} }

  Function("require", "module", "exports", output.code)(
    require,
    compiledModule,
    compiledModule.exports,
  )

  return compiledModule.exports
}

test("a trailing timeline date range becomes secondary event text", async () => {
  const helpers = await import("../lib/lifeline-event-date.mts")

  assert.deepEqual(
    helpers.separateLifelineEventDateRange?.(
      "Design Director at Shopify (Jun 2025–present).",
    ),
    {
      text: "Design Director at Shopify",
      dateRange: "Jun 2025–present",
    },
  )
  assert.equal(
    helpers.separateLifelineEventDateRange?.("Leading product design."),
    "Leading product design.",
  )
})

test("a date range inside a role sentence moves below the complete sentence", async () => {
  const helpers = await import("../lib/lifeline-event-date.mts")

  assert.deepEqual(
    helpers.separateLifelineEventDateRange?.(
      "Strategic Advisor to TrackShift (Sep 2013–Dec 2019), helping musicians get paid faster.",
    ),
    {
      text: "Strategic Advisor to TrackShift, helping musicians get paid faster.",
      dateRange: "Sep 2013–Dec 2019",
    },
  )
})

test("the event renderer puts a date range on a dedicated line", async () => {
  const { LifelineEventText } = await loadLifelineEventComponent()
  const html = renderToStaticMarkup(
    React.createElement(LifelineEventText, {
      event: {
        text: "Design Director at Shopify",
        dateRange: "Jun 2025–present",
      },
    }),
  )

  assert.match(
    html,
    /Design Director at Shopify<\/span><span[^>]*class="[^"]*\bblock\b[^"]*"[^>]*>\(Jun 2025–present\)<\/span>/,
  )
})
