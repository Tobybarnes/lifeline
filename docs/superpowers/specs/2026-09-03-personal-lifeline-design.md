# Personal Lifeline website design

Date: 2026-09-03
Status: Approved in conversation

## Purpose

Build a public, full-screen timeline of Toby Barnes's life from the existing
`evilrabbit/lifeline` repository. The story is fact-led and weighted toward
work: roles, companies, projects, and the sale of the company. A smaller set of
personal milestones, such as children and international moves, gives that work
its human context.

The original Lifeline interaction is the foundation. This project will
personalize its data, media, identity, and metadata without recreating its
timeline components.

## Goals

- Preserve Lifeline's full-screen desktop experience, vertical mobile layout,
  intro animation, lightbox, media cards, theme support, and input behavior.
- Replace Evil Rabbit's biography, images, branding, and links with Toby's.
- Seed a reviewable chronology from Toby's LinkedIn profile.
- Keep the content easy to extend by editing one typed TypeScript data file and
  adding local media.
- Make deliberate public-content choices before family details are published.
- Retain the upstream MIT license and a clean link to the source repository.

## Non-goals

- Rebuilding or redesigning the Lifeline component system.
- Adding a CMS, database, authentication, admin interface, or in-browser editor.
- Fixing unrelated upstream lint issues or refactoring the scrolling system.
- Publishing the website, configuring a domain, or creating a GitHub remote
  before those actions are separately reviewed.

## Repository strategy

The complete upstream repository is cloned locally at
`/Users/tobybarnes_shop/Documents/Lifeline`. The approved baseline is upstream
commit `8ddbb3d3ad0ac6ec5bbe8efda1c051d93d04a63a`. The source remote is named
`upstream` and remains pointed at `https://github.com/evilrabbit/lifeline.git`.
This preserves the original project and makes future source comparisons
possible.

Before creating or pushing a personal remote, the authenticated GitHub account
must resolve exactly to `Tobybarnes`. The likely destination is
`Tobybarnes/lifeline`, but repository visibility will be chosen before that
remote is created. The existing `LICENSE` file and copyright notice remain in
the repository.

## Application structure

The existing Next.js 16, React 19, TypeScript, Tailwind, and shadcn structure
stays in place.

The first implementation changes only the surfaces needed for ownership:

- Add `lib/toby.ts`, following the existing `defineLifeline()` data shape.
- Point `app/page.tsx` at Toby's record instead of `lib/evilrabbit.ts`.
- Store supplied timeline media under `public/images/toby/`.
- Replace the rabbit mark, document metadata, demo GitHub link, and demo footer
  copy with a restrained Toby Barnes identity.
- Use a plain text name in the navigation for the first version. A custom logo
  is outside this scope.
- Set `endYear` in `lib/toby.ts` from the current year at build time instead of
  changing the shared Lifeline data helper.

The files in `components/lifeline/` remain unchanged unless a verified defect
blocks Toby's content. Any such defect becomes a separately explained change,
not an opportunity to rewrite the component.

The personal site exposes one timeline at `/`. The upstream-only `/embed` and
`/lifeline` demo routes are removed, along with `lib/evilrabbit.ts`, the rabbit
logo, `DemoCompanyIcons`, and Evil Rabbit's original images and video. The
shadcn registry source and generated files are also removed so the deployed
personal site does not continue serving `/r/*.json` as if it were the upstream
component registry. The reusable code in `components/lifeline/` stays intact.

The footer includes a small "Built with Lifeline" link to the upstream GitHub
repository. Toby's own repository link is added only after that repository
exists.

## Content model

The public timeline is a curated chronology, not a complete personal archive.
Each milestone is attached to a year and may contain:

- concise factual events;
- links to companies, launches, interviews, or other public evidence;
- company marks already supported by Lifeline;
- local images or short video clips;
- selected mentors or people met, when Toby chooses to include them.

Quiet years remain visible as empty ticks, preserving Lifeline's sense of time.
Copy should be direct and specific. It should name the event, role, place, or
outcome without promotional language.

The component remains year-based. A role is recorded in its starting year,
with a separate event in its ending year only when the ending itself matters.
Overlapping roles share the same year's event list in chronological order.
Month-level positioning is outside this scope.

## LinkedIn collection

The confirmed source profile is
`https://www.linkedin.com/in/tobybarnes/`. The first pass collects only
information relevant to the timeline:

- company and project names, plus role titles where explicitly confirmed;
- start and end dates;
- locations and international moves stated on the profile;
- education where it materially explains the chronology;
- specific launches, responsibilities, or company outcomes stated publicly.

Contact details, connection data, follower counts, endorsements,
recommendations, and unrelated profile metadata are excluded. LinkedIn facts
form a draft rather than unquestioned final copy. Dates and claims are checked
against the visible source, and uncertain items are marked for Toby's review
instead of guessed.

The captured first-pass chronology confirms organization or project names and
date ranges. Exact titles that were not retained in that capture stay out of
the first version until the profile is checked again.

The LinkedIn Education section was checked on 2026-09-03. It contains one
entry: Liverpool John Moores University, Bachelor of Arts - BA, Business
Information & Management (Business Administration and Marketing), 1990–1994.
The first timeline version also includes the listed activity, "Chairman of the
Role Playing Society for 4 years. :)" The longer course description remains
source context rather than timeline copy so the 1990 marker stays readable.

The collected work and education history is translated directly into
`lib/toby.ts`. Personal milestones that do not appear on LinkedIn are added
only from Toby's own input.

## Content intake gate

Toby has confirmed the LinkedIn profile above and approved `1973` as the
public birth year. Those two facts are enough to build the first work and
education version.

The company sale, children, other personal milestones, media, and additional
profile links remain excluded until Toby supplies or confirms them. The exact
birthday is not collected or published. Lifeline's age labels will mean the
age reached during each calendar year.

## Public-content boundaries

The website will be public, but the source material may include details that do
not belong on a public page.

- Children may be represented by the milestone "My child was born" without a
  name, photo, or exact date by default.
- Moves use the city or country and year, not a street address or exact date.
- Family names and portraits require Toby's explicit inclusion.
- The company sale uses the public company name, year, and outcome only when
  those facts can be verified or are supplied by Toby.
- No milestone is published merely because it appeared in scraped material.

The first content-filled version is a public-facing local preview: it is
designed for eventual public viewing but remains on this computer until Toby
reviews the complete chronology.

## Experience and visual treatment

The site opens as Lifeline does today: a restrained, full-screen timeline that
lands at the present. Desktop keeps the horizontal rail and scroll scrubbing;
mobile keeps the purpose-built vertical layout. Light and dark themes remain.

The initial visual treatment keeps the existing spacing, typography, neutral
palette, motion, and media behavior. Personality comes from Toby's chronology
and images rather than a parallel redesign. Evil Rabbit's logo, biography,
personal media, and profile links must not remain visible in the personalized
site.

## Failure and edge handling

- Missing years render as empty ticks through the existing data helper.
- Only verified local media paths are added, preventing broken image cards.
- Every image receives useful alt text; decorative marks use empty alt text
  where appropriate.
- Linked events use valid public URLs and open according to the existing
  component behavior.
- If LinkedIn access is restricted, collection pauses at the access boundary;
  no profile facts are inferred from search snippets or third-party summaries.
- Existing upstream lint failures are recorded as baseline issues and are not
  attributed to the personalization work.

## Verification

Before personalization, run the untouched project and record a baseline. The
upstream lint command is currently expected to report its existing failures;
the production build must pass. After personalization, verify:

- the production build completes;
- the home route loads without console errors caused by the new content;
- the desktop timeline scrolls horizontally and reaches both ends in Chrome at
  a 1440 by 900 viewport;
- the mobile layout scrolls vertically without horizontal overflow in Chrome
  at a 390 by 844 viewport;
- theme switching, keyboard navigation, reduced motion, media expansion, and
  external links still work where present;
- no Evil Rabbit biography, personal media, branding, or demo links remain in
  the rendered site;
- the repository diff is limited to the design spec and the approved
  personalization surfaces.

Because the upstream repository has no automated interaction suite, the Chrome
checks at 1440 by 900 and 390 by 844 are part of completion.

## Completion criteria

The first implementation is complete when the original Lifeline site runs
locally as Toby's public timeline, the LinkedIn-derived work and education
chronology is in one editable data file, selected personal milestones can be
added without component changes, all original personal content has been
removed from the rendered experience, and desktop and mobile behavior has
been visibly verified.

Deployment and the personal GitHub remote follow as separate, approval-gated
steps after content review.
