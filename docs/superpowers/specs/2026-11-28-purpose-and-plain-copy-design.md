# Site purpose, plain copy and visual direction — design

## Intent

The foundation defines this site as a technical portal (`website/README.md` in the foundation repository): mission, software catalog, documentation, releases and contribution guidance, English first. Today most of the page is personal or promotional (founder portrait, job-seeking text, a six-paragraph first-person motivation, a 500 px Discord widget) and the catalog sits in the middle. The copy also carries recognisable generated-text patterns. Make the page serve developers who evaluate the tools and people who want to contribute, and make the text conform to `brand/ANTI_AI_SLOP.md`.

## Goals

- First screen says what IU builds, in one concrete sentence, with two links: projects and contributing.
- Projects come directly after it; contributing follows.
- The method section keeps only verifiable statements and links to `ENGINEERING_STANDARD.md`.
- The founder block is short, with a link to the portfolio and to `MOTIVATION.md` on GitHub.
- Copy is rewritten in both languages with the same meaning, English as the reference.

## Non-goals

- No new pages, router, dependency, backend or build tooling.
- No skill/MCP catalog yet: its data source is not verified (possibly `iu-marketplace`). Proposed as a later step.
- No new colours, fonts or logo. Ivory `#fdf8f0`, charcoal `#131312` and system fonts stay; the Calm theme is not used because the brand is monochrome and `AGENTS.md` forbids undecided colours/fonts.
- No deployment, no change to the GitHub API behaviour or its explicit failure states.

## Anti-goals

The change fails if it replaces one set of slogans with another, hides the founder context entirely against the founder's wishes, drops the loading/empty/error states, or states anything about the projects that the registry or repositories do not support.

## Writing rules (anti-AI-slop, applied to this copy)

- Say what exists, concretely; no claims that cannot be checked in a repository.
- No symmetrical two-part slogans, no "not X but Y" contrasts, no forced triads, no abstract section titles.
- No section numbering ("01 /"), no decorative arrows on every link, no dashes as rhythm.
- Section titles name the content ("Projects", "Contribute", "Method").
- Sources are the foundation documents; nothing invented.

## Approaches

1. **Reorder and rewrite the single page (chosen).** Same Angular app, same visual identity; new section order, new copy, reduced personal blocks. Lowest risk, fixes both purpose and wording.
2. Multi-page site with router. Rejected: little content today; overengineering by the foundation's own standard.
3. Copy-only rewrite. Rejected: leaves the purpose problem.

## Design

Section order: header (logo, Projects, Contribute, Method, language) → opening (one sentence, two links) → Projects (live catalog, states unchanged) → Contribute (beginner issues, how review works, membership request, Discord invite button without the iframe widget) → Method (four short points, standard link) → Who is behind it (portrait, three lines, portfolio and motivation links, one sentence on the job search) → footer (licensing, security, contact).

The manifesto section is merged into the opening and the method; the manifesto stays linked. `DiscordWidget` is replaced by a plain invite link; the component is removed if unused. Language selector, skip link, back-to-top, reduced-motion and focus styles are kept.

## Visual direction (approved 2026-11-28)

Direction A ("registry") with a touch of C in the opening. Mockups: https://claude.ai/artifact/ME4zGX5iU421L43BGwFgpf (private).

- Projects and beginner issues are tables or ruled rows with monospace metadata (repository, licence, updated), not cards. Rows collapse to stacked records at phone width instead of scrolling sideways.
- Hairline rules in charcoal separate sections; section titles are small monospace caps naming the content.
- The opening keeps A's left-aligned sentence and links, with a restrained line drawing of a circle, a square and an open arc (the shapes the brand says the emblem stands for) behind it. It is decoration only, `aria-hidden`, and must not imitate the emblem. It needs the founder's approval as part of the identity before it ships to production.
- No accent colour, no shadows, no rounded cards; buttons are plain links or one filled charcoal button.

## Constraints

Angular 22, plain CSS, system fonts; `app.css` component budget already warns (8.20 kB vs 8.00 kB), so the change should shrink it. Public GitHub API calls stay as they are. Repository text is rendered as text.

## Decided by the founder / by me

- Founder: approach A and the section order above approved in conversation. The job-search sentence stays (my call, easy to remove).
- Mine: removing the iframe widget, merging manifesto into the opening, deferring the skill/MCP catalog.

## Left to the builder

Exact wording (to be shown to the founder before commit), CSS cleanup, removal of dead styles and components.

## Acceptance criteria

- Opening sentence and every project statement are supported by foundation docs or the live catalog.
- No numbered labels, symmetrical slogans or "not X but Y" constructions remain in EN or IT copy.
- `npm run build` succeeds with no larger CSS budget warning than today.
- Checked in Chromium at 320, 390 and 1280 px, EN and IT, including keyboard navigation and catalog error/empty states with simulated responses.
- HANDOFF.md, README.md and DOCUMENTATION_MAP.md updated; the foundation registry/handoff note prepared, not pushed.
