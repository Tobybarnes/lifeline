# Personal Lifeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the cloned Evil Rabbit Lifeline site into a full-screen, public-facing local preview of Toby Barnes's life and work using the verified LinkedIn chronology.

**Architecture:** Keep the upstream timeline engine and shell intact. Add one typed record in `lib/toby.ts`, wire the home route and metadata to it, and remove the upstream biography, demo routes, registry output, rabbit identity, and personal media. A dependency-free `node:test` guard protects those ownership boundaries.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, pnpm, Node.js `node:test`, Chrome

**Spec:** `docs/superpowers/specs/2026-09-03-personal-lifeline-design.md`

## Global Constraints

- Use the complete `evilrabbit/lifeline` checkout at upstream commit `8ddbb3d3ad0ac6ec5bbe8efda1c051d93d04a63a`; do not rebuild the timeline.
- Keep `components/lifeline/` and `components/lifeline-shell.tsx` unchanged unless a verified defect blocks the approved content.
- Use `1973` as the public birth year and `https://www.linkedin.com/in/tobybarnes/` as the source profile.
- The initial record contains only the confirmed LinkedIn chronology. Do not add children, company-sale details, unverified moves, family data, images, video, or inferred job titles.
- Use `new Date().getFullYear()` in `lib/toby.ts` so living-person timelines do not require an annual edit.
- Retain `LICENSE` unchanged and keep one visible `Built with Lifeline` link to `https://github.com/evilrabbit/lifeline`.
- Keep `README.md` unchanged. Its registry instructions become known documentation debt until Toby separately approves a rewrite.
- Do not create a GitHub repository, add a personal remote, push, deploy, or configure a domain in this implementation.
- Verify Chrome at exactly 1440 by 900 and 390 by 844 before calling the work complete.

## Known upstream baseline

Recorded on 2026-09-03 before application changes:

- `pnpm install --offline --frozen-lockfile` completed from the local pnpm store.
- `pnpm build` passed when Google Fonts was reachable. It rendered `/`, `/embed`, `/lifeline`, and the three rabbit icon routes.
- `pnpm lint` reported the upstream baseline of 35 errors and 2 warnings in six files. The failures are in `components/lifeline/`, `components/theme-switcher.tsx`, and their hooks; they are outside this personalization.
- `main` contained only the approved design-spec commit on top of upstream.

## File map

- Create `lib/toby.ts`: the single editable, verified chronology and LinkedIn URL.
- Create `tests/personalization.test.mjs`: source and filesystem guard for personal identity, media paths, attribution, and removed demo surfaces.
- Modify `package.json`: add the dependency-free personalization test command.
- Modify `app/page.tsx`: render Toby's record, text identity, LinkedIn link, theme switcher, and upstream credit.
- Modify `app/layout.tsx`: set Toby-specific document metadata.
- Modify `docs/superpowers/specs/2026-09-03-personal-lifeline-design.md`: record the confirmed birth year and LinkedIn URL. This edit is already prepared with this plan.
- Delete `app/embed/page.tsx` and `app/lifeline/page.tsx`: upstream demo routes.
- Delete `lib/evilrabbit.ts`, `lib/lifeline-personal.ts`, `lib/lifeline-company.ts`, and `lib/lifeline-journey.ts`: upstream biography and registry starter records.
- Delete `components/rabbit-logo.tsx`, `components/demo-company-icons.tsx`, and `components/copy-command.tsx`: demo-only identity and registry UI.
- Delete `registry.json` and `public/r/`: registry source and generated public endpoints.
- Delete `public/images/meeting-elon.jpg`, `public/images/meeting-elon.mp4`, and `public/images/people/`: Evil Rabbit's personal media.
- Delete `app/icon.svg`, `app/icon.png`, and `app/apple-icon.png`: rabbit identity assets. Do not invent a replacement logo.
- Keep `components/ui/button.tsx`, `components.json`, `app/globals.css`, and the `shadcn` dependency. They are generic project infrastructure, and the stylesheet still imports `shadcn/tailwind.css`.

---

### Task 1: Add the verified chronology and its guard

**Files:**
- Create: `lib/toby.ts`
- Create: `tests/personalization.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `defineLifeline(input)` and `LifelineMilestones` from `lib/lifeline-data.ts`.
- Produces: `tobyLifeline`, `TOBY_LINKEDIN_URL`, and `pnpm run test:personalization` for later tasks.

- [ ] **Step 1: Reconfirm the source baseline before editing**

Run:

```bash
git merge-base --is-ancestor 8ddbb3d3ad0ac6ec5bbe8efda1c051d93d04a63a HEAD
git diff --name-status 8ddbb3d3ad0ac6ec5bbe8efda1c051d93d04a63a...HEAD
git status --short
pnpm install --frozen-lockfile
pnpm build
pnpm lint
```

Expected:

- The merge-base command exits `0`.
- Before implementation commits, the diff lists only the design spec and this plan.
- `git status --short` is empty because the design spec and plan were committed before execution.
- The build passes when Google Fonts is reachable.
- Lint reports the same 35 errors and 2 warnings in six upstream files. Save the counts in the execution handoff; do not edit the Lifeline engine to clear them.

- [ ] **Step 2: Add the personalization test command**

Add the final line below to the existing `scripts` object in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test:personalization": "node --test tests/personalization.test.mjs"
  }
}
```

- [ ] **Step 3: Write the first failing guard**

Create `tests/personalization.test.mjs` with the data test and shared helpers:

```js
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
    [1990, "Liverpool John Moores University (1990–1994)."],
    [1992, "Dun & Bradstreet (1992–1996)."],
    [1996, "NTL Interactive (1996–1998)."],
    [1998, "MTV (1998–2003)."],
    [2003, "Twelve Ten (2003–2004)."],
    [2004, "Mudlark Digital / Pixel-Lab (2004–2011)."],
    [2005, "London Games Festival (2005–2009)."],
    [2009, "Chromaroma (2009–2011)."],
    [2011, "AKQA, London and later Portland (2011–2019)."],
    [2013, "TrackShift advisor (2013–2019)."],
    [2015, "A Strangely Isolated Place (2015–present)."],
    [2017, "Jaguar Land Rover mentor (2017–2018)."],
    [2019, "Nike (2019–2021)."],
    [2021, "Amazon Alexa (2021–2023)."],
    [2023, "Cash App (2023–2025)."],
    [2024, "Hoyt Arboretum Friends board (2024–present)."],
    [2025, "Shopify (2025–present)."],
  ]

  const milestoneYears = [...source.matchAll(/^  (\d{4}): \{$/gm)].map(
    (match) => Number(match[1]),
  )
  assert.deepEqual(
    milestoneYears,
    expectedMilestones.map(([year]) => year),
  )

  for (const [, event] of expectedMilestones) {
    assert.ok(
      source.includes(`events: [${JSON.stringify(event)}]`),
      `missing confirmed event: ${event}`,
    )
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
```

- [ ] **Step 4: Run the guard to prove the record is missing**

Run:

```bash
pnpm run test:personalization
```

Expected: FAIL with `ENOENT` for `lib/toby.ts`.

- [ ] **Step 5: Add the exact LinkedIn-derived record**

Create `lib/toby.ts`:

```ts
import { defineLifeline, type LifelineMilestones } from "@/lib/lifeline-data"

const CURRENT_YEAR = new Date().getFullYear()

export const TOBY_LINKEDIN_URL = "https://www.linkedin.com/in/tobybarnes/"

// Initial chronology verified from the public-facing profile on 2026-09-03.
// Recheck entries marked "present" before deployment.
const milestones: LifelineMilestones = {
  1990: {
    id: "liverpool-john-moores-university",
    events: ["Liverpool John Moores University (1990–1994)."],
  },
  1992: {
    id: "dun-and-bradstreet",
    events: ["Dun & Bradstreet (1992–1996)."],
  },
  1996: {
    id: "ntl-interactive",
    events: ["NTL Interactive (1996–1998)."],
  },
  1998: {
    id: "mtv",
    events: ["MTV (1998–2003)."],
  },
  2003: {
    id: "twelve-ten",
    events: ["Twelve Ten (2003–2004)."],
  },
  2004: {
    id: "mudlark-digital-pixel-lab",
    events: ["Mudlark Digital / Pixel-Lab (2004–2011)."],
  },
  2005: {
    id: "london-games-festival",
    events: ["London Games Festival (2005–2009)."],
  },
  2009: {
    id: "chromaroma",
    events: ["Chromaroma (2009–2011)."],
  },
  2011: {
    id: "akqa",
    events: ["AKQA, London and later Portland (2011–2019)."],
  },
  2013: {
    id: "trackshift-advisor",
    events: ["TrackShift advisor (2013–2019)."],
  },
  2015: {
    id: "a-strangely-isolated-place",
    events: ["A Strangely Isolated Place (2015–present)."],
  },
  2017: {
    id: "jaguar-land-rover-mentor",
    events: ["Jaguar Land Rover mentor (2017–2018)."],
  },
  2019: {
    id: "nike",
    events: ["Nike (2019–2021)."],
  },
  2021: {
    id: "amazon-alexa",
    events: ["Amazon Alexa (2021–2023)."],
  },
  2023: {
    id: "cash-app",
    events: ["Cash App (2023–2025)."],
  },
  2024: {
    id: "hoyt-arboretum-friends-board",
    events: ["Hoyt Arboretum Friends board (2024–present)."],
  },
  2025: {
    id: "shopify",
    events: ["Shopify (2025–present)."],
  },
}

export const tobyLifeline = defineLifeline({
  slug: "toby",
  name: "Toby Barnes",
  birthYear: 1973,
  endYear: CURRENT_YEAR,
  description: "Toby Barnes's work and public roles, year by year.",
  milestones,
})
```

The generated 1973 and 2026 markers remain empty. Do not invent a birthplace, exact birthday, or current-year event.

- [ ] **Step 6: Run the focused guard and production build**

Run:

```bash
pnpm run test:personalization
pnpm build
```

Expected: the guard passes; the build passes with the old demo routes still present at this stage.

- [ ] **Step 7: Commit the chronology**

```bash
git add package.json lib/toby.ts tests/personalization.test.mjs
git commit -m "feat: add Toby's verified chronology"
```

---

### Task 2: Put Toby's identity and record on the home route

**Files:**
- Modify: `tests/personalization.test.mjs`
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `tobyLifeline` and `TOBY_LINKEDIN_URL` from `lib/toby.ts`; existing `Lifeline`, `LifelineShell`, `LifelineNav`, `LifelineStage`, `LifelineFooter`, and `ThemeSwitcher` components.
- Produces: a full-screen `/` route with Toby-specific metadata and one upstream attribution link.

- [ ] **Step 1: Add a failing ownership test**

Append this test to `tests/personalization.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the guard to prove the old home page fails it**

Run:

```bash
pnpm run test:personalization
```

Expected: the chronology test passes and the new ownership test fails because `app/page.tsx` still imports `evilrabbitLifeline`.

- [ ] **Step 3: Replace only the home-route composition**

Replace `app/page.tsx` with:

```tsx
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
  "text-sm text-zinc-500 transition-colors duration-300 hover:text-black dark:hover:text-white"

export default function Home() {
  return (
    <LifelineShell>
      <LifelineNav
        logo={<span className="text-sm font-medium">Toby Barnes</span>}
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
```

Do not render `LifelineLegend` in this first pass because the verified record has no people rows. Restore it only when mentor or met-person data is approved.

- [ ] **Step 4: Replace the document metadata**

Keep the existing font and provider code in `app/layout.tsx`, but replace its `metadata` object with:

```ts
export const metadata: Metadata = {
  title: "Toby Barnes | Lifeline",
  description: "A year-by-year record of Toby Barnes's work and life.",
};
```

- [ ] **Step 5: Run the focused guard and production build**

Run:

```bash
pnpm run test:personalization
pnpm build
```

Expected: both pass. The build still lists the upstream demo and icon routes because Task 3 removes them.

- [ ] **Step 6: Commit the owned home page**

```bash
git add app/page.tsx app/layout.tsx tests/personalization.test.mjs
git commit -m "feat: personalize the Lifeline home page"
```

---

### Task 3: Remove the upstream biography and demo surfaces

**Files:**
- Modify: `tests/personalization.test.mjs`
- Delete: `app/embed/page.tsx`
- Delete: `app/lifeline/page.tsx`
- Delete: `lib/evilrabbit.ts`
- Delete: `lib/lifeline-personal.ts`
- Delete: `lib/lifeline-company.ts`
- Delete: `lib/lifeline-journey.ts`
- Delete: `components/rabbit-logo.tsx`
- Delete: `components/demo-company-icons.tsx`
- Delete: `components/copy-command.tsx`
- Delete: `registry.json`
- Delete: `public/r/company.json`
- Delete: `public/r/journey.json`
- Delete: `public/r/lifeline.json`
- Delete: `public/r/page.json`
- Delete: `public/r/personal.json`
- Delete: `public/r/registry.json`
- Delete: `public/r/shell.json`
- Delete: `public/r/theme-switcher.json`
- Delete: `public/images/meeting-elon.jpg`
- Delete: `public/images/meeting-elon.mp4`
- Delete: `public/images/people/david-carson.png`
- Delete: `public/images/people/elon-musk.png`
- Delete: `public/images/people/enrique-bunbury.png`
- Delete: `public/images/people/fernando-prats.jpg`
- Delete: `public/images/people/guillermo-rauch.png`
- Delete: `public/images/people/horacio-mansilla.png`
- Delete: `public/images/people/jony-ive.png`
- Delete: `public/images/people/rasmus-andersson.png`
- Delete: `app/icon.svg`
- Delete: `app/icon.png`
- Delete: `app/apple-icon.png`

**Interfaces:**
- Consumes: the home page and test helpers from Tasks 1 and 2.
- Produces: one public application route, no upstream registry endpoints, no upstream personal media, and no rabbit identity assets.

- [ ] **Step 1: Add the failing cleanup guard**

Append this test to `tests/personalization.test.mjs`:

```js
test("upstream demo surfaces and personal media are absent", () => {
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
    assert.equal(existsSync(at(file)), false, `${file} should be removed`)
  }
})

test("the reusable engine and license remain", () => {
  assert.equal(existsSync(at("components/lifeline/lifeline.tsx")), true)
  assert.equal(existsSync(at("components/lifeline-shell.tsx")), true)

  const license = read("LICENSE")
  assert.match(license, /MIT License/)
  assert.match(license, /Copyright \(c\) 2026 Evil Rabbit/)
})
```

- [ ] **Step 2: Run the guard to prove the demo files still exist**

Run:

```bash
pnpm run test:personalization
```

Expected: the data and ownership tests pass; the cleanup test fails on the first existing demo path.

- [ ] **Step 3: Delete the exact approved demo files**

Run:

```bash
git rm app/embed/page.tsx app/lifeline/page.tsx
git rm lib/evilrabbit.ts lib/lifeline-personal.ts lib/lifeline-company.ts lib/lifeline-journey.ts
git rm components/rabbit-logo.tsx components/demo-company-icons.tsx components/copy-command.tsx
git rm registry.json
git rm -r public/r
git rm public/images/meeting-elon.jpg public/images/meeting-elon.mp4
git rm -r public/images/people
git rm app/icon.svg app/icon.png app/apple-icon.png
```

Do not delete `README.md`, `LICENSE`, `components/lifeline/`, or generic shadcn infrastructure.

- [ ] **Step 4: Run the guard and compile the personalized route set**

Run:

```bash
pnpm run test:personalization
pnpm build
```

Expected:

- All personalization tests pass.
- The build passes and lists only `/` and `/_not-found` as application pages. It must not list `/embed`, `/lifeline`, or rabbit icon routes.

- [ ] **Step 5: Compare lint and protected files with baseline**

Run:

```bash
pnpm lint
git diff --check
git diff --exit-code 8ddbb3d3ad0ac6ec5bbe8efda1c051d93d04a63a -- components/lifeline README.md LICENSE
```

Expected:

- Lint still reports 35 errors and 2 warnings, with no new file or rule outside the recorded upstream set.
- `git diff --check` passes.
- The protected-file diff exits `0` with no output.

- [ ] **Step 6: Check the remaining source references**

Run:

```bash
git grep -n -i -E "evil rabbit|evilrabbit" -- ':!README.md' ':!LICENSE' ':!docs/**' ':!tests/**'
```

Expected: the only match is the `Built with Lifeline` upstream URL in `app/page.tsx`.

- [ ] **Step 7: Commit the cleanup**

```bash
git add tests/personalization.test.mjs
git commit -m "chore: remove upstream demo content"
```

---

### Task 4: Verify the full-screen experience in Chrome

**Files:**
- No planned file changes.

**Interfaces:**
- Consumes: the completed local application and `pnpm run test:personalization`.
- Produces: a verified desktop and mobile local preview ready for Toby's content review.

- [ ] **Step 1: Start the development server and confirm removed URLs**

Run `pnpm dev`, then check:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/embed
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/lifeline
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/r/registry.json
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/images/meeting-elon.jpg
```

Expected: `/` returns `200`; every removed route or asset returns `404`.

- [ ] **Step 2: Verify desktop Chrome at 1440 by 900**

Open `/` in Chrome with a 1440 by 900 viewport and check all of the following:

1. Reload with normal motion. The dashed rail and markers sweep from 1973 and settle at 2026; input stays locked during the intro.
2. At rest, `AGE` and `YEARS` remain pinned, the endpoint reads `53 / 2026`, and the 2025 Shopify entry is nearby.
3. Wheel down over the timeline to move toward 1973, then wheel up to return toward 2026. The page body does not scroll vertically.
4. Drag a blank part of the rail right to move earlier and left to move later. Links and buttons do not initiate dragging.
5. Use Left or Up to move earlier and Right or Down to move later. Both endpoints remain reachable and unclipped.
6. Toggle dark mode and back. Navigation, footer, ticks, rail, labels, events, and links remain legible.
7. Emulate `prefers-reduced-motion: reduce` and reload. The timeline appears at 2026 without the sweep or marker fades.
8. Open LinkedIn and `Built with Lifeline`. They open new tabs at the exact confirmed profile and upstream repository URLs.
9. Confirm the page contains no Evil Rabbit name, rabbit mark, biography, personal media, install command, or registry UI.
10. Inspect the Chrome console after loading, scrolling, dragging, toggling the theme, and using the links. No new errors may come from Toby's data or page wiring.

- [ ] **Step 3: Verify mobile Chrome at 390 by 844**

Use a 390 by 844 viewport and check:

1. Reload with normal motion. The page uses Lifeline's three-column vertical layout while the navigation and footer remain stationary.
2. Scroll the middle stage from 2026 to 1973 and back. Event text wraps within the right column and the page has no horizontal overflow.
3. Spot-check `17 / 1990`, `38 / 2011`, `52 / 2025`, and `53 / 2026` in the age and year columns.
4. Toggle dark mode and back. The vertical rail, ticks, text, and links retain readable contrast.
5. Tap LinkedIn and the upstream credit. Both open the correct targets without moving the timeline.
6. Check 767 pixels wide remains vertical and 768 pixels wide switches to the horizontal layout.
7. Inspect the Chrome console after scrolling, toggling the theme, and using the links. No new errors may appear.

There is no media or lightbox check in this pass because Toby has not supplied approved media. Do not keep upstream media to exercise those features.

- [ ] **Step 4: Run the final automated checks**

Run:

```bash
pnpm run test:personalization
pnpm build
pnpm lint
git diff --check
git status --short
```

Expected:

- The personalization guard and build pass.
- Lint remains at the known upstream 35 errors and 2 warnings with no new failures.
- `git diff --check` passes.
- The working tree is clean after the three implementation commits.

- [ ] **Step 5: Hand the local preview to Toby for content review**

Report the exact local URL, the three implementation commit hashes, the passing guard and build, the unchanged lint baseline, and the completed desktop/mobile checks. List the deliberately withheld content: children, company sale, unverified personal moves, media, and any unsupported role details. Do not create a remote or deploy.
