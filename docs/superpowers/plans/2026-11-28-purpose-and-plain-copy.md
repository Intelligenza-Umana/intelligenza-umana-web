# Site purpose, plain copy and registry look — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the single page into a technical portal (opening, projects, contribute, method, about) in a "registry" look with a geometric opening, and rewrite the copy without generated-text patterns.

**Architecture:** Same Angular 22 standalone app. Projects and beginner issues render in two small standalone components with their own scoped styles (keeps `app.css` under the component-style budget). Page shell, hero and about block stay in `app.html`/`app.css`. Copy lives in `src/app/site-copy.ts`; new keys are added first, the template switches over, then unused keys and rules are deleted, so the build stays green after every task.

**Tech Stack:** Angular 22, TypeScript 6, plain CSS, system fonts, public GitHub REST API (unchanged). No test runner exists in the repo; verification is `npm run build`, a copy-pattern grep, and a Playwright script kept in the scratchpad (Chromium is preinstalled).

**Spec:** `docs/superpowers/specs/2026-11-28-purpose-and-plain-copy-design.md` (mockups: https://claude.ai/artifact/ME4zGX5iU421L43BGwFgpf)

## Global Constraints

- Colours: ivory `#fdf8f0`, charcoal `#131312`, existing muted greys and `#9a5b36` focus outline; no new hues, no accent colour, no shadows, no rounded cards. System font stack only; monospace via `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` for metadata.
- Logo files and `public/logo-light.svg` are not modified. The geometric opening drawing must not imitate the emblem.
- GitHub API calls, error/empty/loading states, retry buttons and the known-projects fallback behave as today. Repository text is rendered as text.
- Copy rules: no numbered labels ("01 /"), no em dashes, no "not X but Y", no symmetrical two-part slogans, no forced triads, no `&rarr;` on every link. Section titles name the content. English is the reference; Italian carries the same meaning.
- Every statement about projects must come from the live catalog, the known-projects list in `app.ts`, or foundation docs. Do not claim MCP servers: nothing read so far supports it.
- Keep: skip link, back-to-top, language selector and persistence, reduced-motion rule, visible focus, `aria-live` on the catalog.
- Budgets in `angular.json` stay unchanged; `app.css` must not exceed today's 8.20 kB.
- No deployment, no push to `main`. Commit on branch `agent/elegant-ptolemy-v6xb0x`.

## Review Focus

1. A repository with `description: null` shows the existing default description, not an empty cell.
2. A repository with `license: null` shows "No licence declared" (IT: "Nessuna licenza dichiarata"), never "undefined" or a blank.
3. Very long unbroken repository names or issue titles wrap inside their cell at 320 px without horizontal page scroll.
4. A 403/500 response from GitHub (rate limit) shows the error notice, the labelled known-projects list and a working retry; the beginner-issues section shows its own error with the direct GitHub link.
5. Italian strings are longer than English: table headers and the stacked phone layout still fit at 320 px.

---

## File Structure

- Modify `src/app/site-copy.ts`: new keys (Task 1), unused keys removed (Task 5).
- Create `src/app/project-table.ts`: `ProjectTable` component, table on desktop, stacked records ≤760 px.
- Modify `src/app/contribution-list.ts`: same inputs, ruled-row styling.
- Delete `src/app/discord-widget.ts`; `public/discord-symbol.svg` stays (used by the invite link).
- Create `public/hero-geometry.svg`: line drawing (circle, square, open arc, four-point star), charcoal strokes, no fill except the star.
- Modify `src/app/app.ts`, `src/app/app.html`, `src/app/app.css`, `src/styles.css`.
- Modify `src/index.html` (description/title text if copy changes), `README.md`, `HANDOFF.md`, `docs/DOCUMENTATION_MAP.md`.
- Scratchpad (not committed): `verify.mjs`, described in Task 2.

---

### Task 1: Draft the new copy and get founder approval

**Files:**
- Modify: `src/app/site-copy.ts` (add keys to `en` and `it`; do not remove any yet)

**Interfaces:**
- Produces new keys on both languages, used by Tasks 2-4: `navProjects`, `navContribute`, `navMethod`, `navAbout` (reuse existing `navProjects`, `navMethod`; add `navContribute`, `navAbout`), `openingTitle`, `openingBody`, `openingProjects`, `openingIssues`, `openingStandard`, `projectsHeading`, `colRepository`, `colDescription`, `colLicence`, `colUpdated`, `noLicence`, `contributeHeading`, `contributeSteps`, `issuesHeading`, `colIssue`, `colTitle`, `methodHeading`, `methodIntro`, `aboutHeading`, `aboutBody`, `aboutLinkProfile`, `aboutLinkMotivation`.
- Existing keys `methodSteps`, `membershipNote`, `joinCommunity`, `discordCommunity`, `securityIntro/Link`, `contact`, opportunities state strings, catalog state strings are reused unchanged.

- [ ] **Step 1: Install dependencies and confirm the baseline build**

Run: `cd /home/user/intelligenza-umana-web && npm ci && npm run build 2>&1 | tail -15`
Expected: build succeeds; warning that `app.css` exceeds 8.00 kB (about 8.20 kB). Record the number.

- [ ] **Step 2: Write the English copy**

Exact values to use:
`openingTitle`: "Open-source tools and skills for backend engineering, security and data integrity."
`openingBody`: "Code written with AI assistance is read and understood by a person before it is merged. Each project states what has been verified."
`openingProjects`: "Browse projects"; `openingIssues`: "Find a first issue"; `openingStandard`: "Engineering standard".
`projectsHeading`: "Projects"; columns "Repository", "Description", "Licence", "Updated".
`contributeHeading`: "Contribute"; `contributeSteps`: "Fork a project, make a change, open a pull request. Maintainers review it before merging. Organization membership is optional."
`issuesHeading`: "Open issues for beginners"; columns "Issue", "Title".
`methodHeading`: "Method"; `methodIntro`: "AI output is a starting point. A person has to understand it, and the checks have to be repeatable."
`aboutHeading`: "About"; `aboutBody`: "Fabio Zagaria, an Italian junior developer, founded Intelligenza Umana. He is looking for a role in an IT company." `aboutLinkProfile`: "GitHub profile"; `aboutLinkMotivation`: "Why Intelligenza Umana exists".
Check `openingTitle` and `openingBody` against `docs/PROJECT_REGISTRY.md` and the known projects in `app.ts` before finalising; wording that the evidence does not support is changed, not kept.

- [ ] **Step 3: Write the Italian copy for every new key**

Same meaning as the English, written naturally, no calques of the English structure. `satisfies` the `typeof en` typing already enforced by `const it: typeof en`.

- [ ] **Step 4: Run the copy-pattern check on the new keys**

Run: `grep -nE "[0-9]{2} / |—|&rarr;|not .{1,40} but |, not " src/app/site-copy.ts | grep -nE "opening|contributeHeading|contributeSteps|methodIntro|aboutBody|projectsHeading"`
Expected: no output.

- [ ] **Step 5: Show the English and Italian text to the founder and wait for approval**

Print both sets side by side in chat. Do not continue until approved; apply requested edits and rerun Step 4. This gate exists because the spec leaves exact wording to the builder but requires the founder to see it.

- [ ] **Step 6: Build and commit**

Run: `npm run build 2>&1 | tail -5` (expected: success, same warning only).
`git add src/app/site-copy.ts && git commit -m "feat: add plain copy for the portal layout"`

---

### Task 2: Projects as a registry table

**Files:**
- Create: `src/app/project-table.ts`
- Modify: `src/app/app.ts` (extend `ProjectCard` and the repository mapping with `license`; import `ProjectTable`)
- Modify: `src/app/app.html` (projects section only)
- Modify: `src/app/app.css` (delete `.projects`, `.projects article`, `.card-top`, `.topics`, `.updated` rules and their phone overrides)
- Create (scratchpad): `verify.mjs`

**Interfaces:**
- Produces `ProjectRow { name: string; url: string; description: string | null; license: string | null; updatedAt?: string }` exported from `project-table.ts`.
- Produces component `<app-project-table [rows]="..." [labels]="..." [language]="..." />` where `labels` is `{ repository, description, licence, updated, noLicence, defaultDescription, openRepository }` (strings) and `language` is `Language`.
- Consumes `Language` from `site-copy.ts`; `ProjectCard` in `app.ts` gains `license: string | null` (`repository.license?.spdx_id ?? null`; for known projects use `'MIT'`, which the existing fallback topics already state).

- [ ] **Step 1: Create the verification script `verify.mjs` in the scratchpad**

It serves `dist/intelligenza-umana-web/browser` with `python3 -m http.server`, launches Chromium via Playwright (`require('playwright')`, no options), and for each of widths 320, 390, 1280 and languages EN and IT (set `localStorage['intelligenza-umana-language']` before load): routes `https://api.github.com/orgs/**` and `https://api.github.com/search/issues**` to a scenario, loads the page, asserts `document.documentElement.scrollWidth <= innerWidth`, takes a screenshot (`deviceScaleFactor: 1`) into the scratchpad, and prints PASS/FAIL per assertion. Scenarios: `normal` (3 repos, one with `description: null`, one with `license: null`, one name of 60 characters without hyphens), `empty` (`[]`), `error` (HTTP 403 on both endpoints). Accept a `--scenario` argument.

- [ ] **Step 2: Write the failing checks**

In `verify.mjs`, for scenario `normal`, assert: a `table` or element with `role="table"` exists inside `#projects`; 3 rows; the null-description row contains the default description text; the null-licence row contains the `noLicence` text; no cell text equals `undefined` or is empty. For `empty`: text of `projectsEmpty` is visible and no table. For `error`: text of `projectsError` is visible, a button named "Try again"/"Riprova" exists and the known-projects rows are shown.

- [ ] **Step 3: Run it against the current build to see it fail**

Run: `node <scratchpad>/verify.mjs --scenario normal`
Expected: FAIL on the table assertion (cards are still in place).

- [ ] **Step 4: Implement `ProjectTable` in `src/app/project-table.ts`**

Standalone component with `input.required` for `rows`, `labels`, `language`; `DatePipe` for `updatedAt` with `'mediumDate'` and the locale from `language`. Markup: real `<table>` with `<thead>` (visually present on desktop) and one `<tr>` per row; at ≤760 px each `<tr>` becomes a block record (`display: block`, `td::before` showing the column label from a `data-label` attribute). Repository cell: monospace link to `url` with `target="_blank" rel="noopener noreferrer"`. Name cells use `overflow-wrap: anywhere`. Styles are scoped in the component (hairline `1px solid #131312` top rule, `#c9c3b6` row rules, header in monospace 0.72 rem, uppercase not used).

- [ ] **Step 5: Switch the projects section in `app.html` to the component**

Keep the loading, error (with retry button), empty and source-note blocks exactly as they are, with `projectsHeading` as the `h2`, `colRepository` etc. as labels; remove the `<div class="projects">` cards block and the `eyebrow`. Update `app.ts`: map `license`, add `ProjectTable` to `imports`, drop `DatePipe` from `imports` if no longer used in the template.

- [ ] **Step 6: Build and run all three scenarios**

Run: `npm run build 2>&1 | tail -8 && for s in normal empty error; do node <scratchpad>/verify.mjs --scenario $s; done`
Expected: build succeeds; every assertion PASS at 320, 390 and 1280 px in EN and IT. Look at the 320 px IT screenshot of `normal`.

- [ ] **Step 7: Commit**

`git add src/app/project-table.ts src/app/app.ts src/app/app.html src/app/app.css && git commit -m "feat: show projects as a registry table"`

---

### Task 3: Contribute section with ruled issue rows and a plain Discord link

**Files:**
- Modify: `src/app/contribution-list.ts` (restyle only; inputs unchanged)
- Modify: `src/app/app.html` (replace `#opportunities`, `#contribute`, the Discord widget usage)
- Modify: `src/app/app.ts` (remove `DiscordWidget` import)
- Delete: `src/app/discord-widget.ts`
- Modify: `src/app/app.css` (delete the `.contribute*` rules that no longer apply)

**Interfaces:**
- Consumes `ContributionIssue { id, number, title, url, repository }` and `<app-contribution-list [issues]>` as they are today.
- Produces one section `id="contribute"` that also answers the old anchor `#opportunities` (keep an `id="opportunities"` on the issues sub-block so the hero link and existing external links still land).

- [ ] **Step 1: Extend `verify.mjs`**

For scenario `normal` add: `#contribute` contains the `contributeSteps` text, a list or table of 12 or fewer issue rows each with `repository #number` and a link, the Discord invite link (`https://discord.gg/Zt85ZYEXAA`, `target=_blank`), the membership link (issue template URL) and the contact address as text; no `iframe` anywhere on the page. For `error`: `opportunitiesError` visible with the direct GitHub search link.

- [ ] **Step 2: Run and confirm it fails**

Run: `npm run build >/dev/null && node <scratchpad>/verify.mjs --scenario normal`
Expected: FAIL on the iframe assertion.

- [ ] **Step 3: Restyle `ContributionList`**

Render each issue as a ruled row: monospace `repository #number` (no uppercase transform), then the title link, `border-bottom: 1px solid #c9c3b6`, no box border, single column. Keep `overflow-wrap: anywhere` and the focus outline.

- [ ] **Step 4: Rebuild the contribute section in `app.html`**

Order inside `<section id="contribute">`: `h2` `contributeHeading`; `contributeSteps` paragraph; `h3` `issuesHeading` with the existing loading/error/empty/list/source states (reuse current strings) and the browse link; actions row with `joinCommunity` as the one filled button, then text links for Discord (with the existing `discord-symbol.svg`, `width="20" height="15"`, `alt=""`), contributing guide, marketplace issue and contact; then the security sentence. No arrows (`&rarr;`) on text links.

- [ ] **Step 5: Remove the widget**

Delete `discord-widget.ts`, remove its import and usage. Run `grep -rn "DiscordWidget\|app-discord-widget" src` — expected: no output.

- [ ] **Step 6: Build, run all scenarios, commit**

Run: `npm run build 2>&1 | tail -8 && for s in normal empty error; do node <scratchpad>/verify.mjs --scenario $s; done`
Expected: success and all PASS.
`git add -A src && git commit -m "feat: merge contribution sections and replace the Discord iframe with a link"`

---

### Task 4: Header, opening with geometric drawing, method, about

**Files:**
- Create: `public/hero-geometry.svg`
- Modify: `src/app/app.html` (header nav, hero, method, about, footer order)
- Modify: `src/app/app.css`, `src/styles.css` (add `--iu-mono` token; keep existing tokens)

**Interfaces:**
- Consumes the Task 1 keys. Section order in `<main>`: `#top` (opening), `#projects`, `#contribute`, `#approach` (method), `#about`. Nav anchors: `#projects`, `#contribute`, `#approach`, `#about`.
- Produces no new component.

- [ ] **Step 1: Extend `verify.mjs`**

Assert section order by `compareDocumentPosition`; the four nav links exist and point to existing ids; the hero `h1` text equals `openingTitle` for the active language; the geometry image has `alt=""`; no text node on the page matches `/^\d{2} \/ /`; no `blockquote` remains; the `#about` section shows `aboutBody` and the GitHub profile link. Also keyboard: Tab from the top reaches the skip link first, then the brand link, nav, language buttons.

- [ ] **Step 2: Run and confirm it fails**

Expected: FAIL on section order and numbered labels.

- [ ] **Step 3: Create `public/hero-geometry.svg`**

Charcoal `#131312` strokes, width 1.2, no fill except a small four-point star; a circle, a square inscribed in it and one dashed open arc, composed in a 400×400 viewBox. Do not reproduce the emblem's hand or figure.

- [ ] **Step 4: Rewrite header, opening, method and about in `app.html`**

Header: brand and nav (`navProjects`, `navContribute`, `navMethod`, `navAbout`) and the language selector as today. Opening: left-aligned `h1` = `openingTitle`, `openingBody`, then two text links and the standard link (`openingStandard`); the drawing sits behind at the right (`position: absolute`, `aria-hidden`, `<img alt="">`, `max-width: 60%`, hidden under 560 px). Remove `.hero-index`, `.hero-mark`, the eyebrow, the manifesto section and the motivation block. Method: `h2` `methodHeading`, `methodIntro`, definition list from `methodSteps` (title as `dt`, body as `dd`), engineering-standard link. About: portrait (`fabio-zagaria.webp`, existing alt), `aboutBody`, links to `https://github.com/fabiozagaria` and to the motivation file on GitHub (`motivationLink` URL as today). The founder's portfolio URL is not in any file read so far: leave it out and ask the founder for it when reporting; do not guess.

- [ ] **Step 5: Rewrite the matching CSS**

In `app.css` delete rules for `.manifesto*`, `.approach*`, `.founder*` (old grid), `.motivation*`, `.hero-mark`, `.hero-index`, `.eyebrow` and their phone overrides; add the compact versions: hairline section rules (`border-top:1px solid #131312` with a monospace small title), `dl` two-column grid collapsing to one column at 560 px, opening with `clamp(1.8rem,4vw,2.6rem)` heading and weight 650. Keep the mobile header grid.

- [ ] **Step 6: Build, check budget, run all scenarios**

Run: `npm run build 2>&1 | tail -10 && for s in normal empty error; do node <scratchpad>/verify.mjs --scenario $s; done`
Expected: success; `app.css` warning at or below 8.20 kB (record it); all PASS. View the 1280 px EN and 320 px IT screenshots of `normal`.

- [ ] **Step 7: Commit**

`git add -A public src && git commit -m "feat: reorder the page as a technical portal with a geometric opening"`

---

### Task 5: Remove dead copy, align metadata and run the full check

**Files:**
- Modify: `src/app/site-copy.ts` (delete unused keys), `src/index.html`, `src/app/app.ts` (title/description effect only if the copy changed)

**Interfaces:** none new.

- [ ] **Step 1: Find unused keys**

Run: `for k in $(grep -oE "^  [a-zA-Z]+:" src/app/site-copy.ts | sort -u | tr -d ' :'); do n=$(grep -rn "t\.$k\b\|\.$k\b" src/app/app.html src/app/app.ts | wc -l); [ "$n" = 0 ] && echo $k; done`
Expected: a list of keys no template or code references (manifesto, motivation, old project labels, `discordPanel*`, `discordWidgetTitle`, `heroLabel`, `heroIndex`, `heroTopics`, `foundationIssues` if unused).

- [ ] **Step 2: Delete those keys from both languages and rebuild**

Run: `npm run build 2>&1 | tail -8`
Expected: success (the typed `it: typeof en` catches a key left on one side).

- [ ] **Step 3: Align `index.html` meta text with the new opening**

Keep `<title>` and og/twitter tags consistent with `copy.title` and `copy.description` in `site-copy.ts`; change the description only if the founder approved new wording in Task 1.

- [ ] **Step 4: Run the whole copy check and every scenario**

Run: `grep -nE "[0-9]{2} / |—|&rarr;|, not |not .{1,40} but " src/app/site-copy.ts src/app/app.html src/app/*.ts | grep -v "^src/app/app.ts:.*//"`
Expected: no output.
Run: `for s in normal empty error; do node <scratchpad>/verify.mjs --scenario $s; done`
Expected: all PASS at 320, 390 and 1280 px, EN and IT.

- [ ] **Step 5: Commit**

`git add -A src && git commit -m "chore: remove unused copy and align metadata"`

---

### Task 6: Documentation and handoff

**Files:**
- Modify: `README.md` (page structure, no Discord widget, geometric drawing provenance: drawn for this site, no external source), `HANDOFF.md` (dated entry: what changed, what was verified with the commands above, what was not: real GitHub data, production, independent device test), `docs/DOCUMENTATION_MAP.md` (add the spec and plan rows), `LICENSING.md` (state the geometry drawing falls under the site's content or brand licensing as the founder decides; ask rather than assume).
- Create (not pushed): a short note for the foundation `HANDOFF.md` and `docs/PROJECT_REGISTRY.md` saying the site structure changed, as `docs/superpowers/plans/foundation-note.md` for the founder to carry over, since this session cannot push to the foundation repository.

- [ ] **Step 1: Update the four site documents** with facts only; no claim of production deployment or independent device testing.
- [ ] **Step 2: Write the foundation note** (five lines, no secrets).
- [ ] **Step 3: Verify links and wording**

Run: `grep -n "discord-widget\|DiscordWidget\|manifesto section" README.md HANDOFF.md docs/DOCUMENTATION_MAP.md | grep -v "^HANDOFF.md.*20"`
Expected: no stale references outside dated history entries.
- [ ] **Step 4: Commit and push the branch**

`git add -A && git commit -m "docs: record the portal restructure" && git push origin agent/elegant-ptolemy-v6xb0x`

---

## Self-review

- **Spec coverage:** opening sentence and links (T1, T4); projects right after (T2, T4); contribute with review, membership and Discord link (T3); method reduced with standard link (T4); about block short with links (T4); bilingual copy (T1); registry look with ruled rows and mono metadata (T2-T4); geometric opening, decorative and approval-flagged (T4, T6); no new dependency (all); budget not worse (T4, T5); checks at 320/390/1280, EN/IT, states, keyboard (verify.mjs); docs and foundation note (T6).
- **Gap noted:** the founder's portfolio link is not available; T4 leaves it out and the report asks for it.
- **Types:** `ProjectRow`, `ProjectCard.license`, `ContributionIssue` and copy key names are used consistently across T1-T5.
- **Proportion:** the plan states interfaces, exact copy and checks; component bodies are left to the implementer.
