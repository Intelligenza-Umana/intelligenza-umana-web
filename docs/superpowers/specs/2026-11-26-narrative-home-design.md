# Narrative homepage and live project catalog — design

## Intent

Make the public site explain why Intelligenza Umana exists before presenting its tools. Preserve the existing understated visual identity while giving the logo, manifesto and engineering approach a stronger first impression. Keep the project catalog current without a daily AI task.

## Goals

- Place the existing logo and a concise statement of the manifesto in the hero.
- Give the header stronger visual hierarchy and keep navigation accessible on mobile.
- Present the engineering method before the projects: real problems, reasoned trade-offs, human review, reproducible verification and honest limitations.
- Load public repositories from the Intelligenza Umana GitHub organization when a visitor opens the site.
- Show repository name, description, topics, last update and GitHub link when available.
- Add a founder section linking to the public GitHub profile, using only verified facts.
- Preserve current palette, existing project maturity caveats, accessibility and public site URLs.

## Non-goals

- No backend, database, AI generation, scheduled job or GitHub token in the browser.
- Do not treat every repository as a verified flagship or imply that GitHub metadata validates quality.
- Do not invent founder credentials, years of experience or project capabilities.
- No Vercel deployment as part of this change.

## Approaches

1. Direct public GitHub API request at page load (selected): the static Angular app fetches public repositories from the organization and renders them. This avoids a backend and scheduled automation and reflects current repository metadata each time the page loads. It depends on GitHub availability and anonymous API rate limits.
2. Scheduled GitHub Actions data snapshot: more resilient to browser API limits, but introduces a stale interval and a workflow to maintain.
3. Backend cache: offers control and caching but adds services and operational complexity that the current low-traffic static site does not need.

## Design and behavior

Use the existing logo asset in a prominent but restrained hero composition. Lead with the existing idea “Human intelligence. Artificial assistance.” and a short explanation grounded in the manifesto: AI can help, while people understand, verify and take responsibility. Use clear links to the manifesto and engineering standard.

Fetch https://api.github.com/orgs/Intelligenza-Umana/repos?type=public&sort=updated&per_page=100 on each page load. Render only public repositories returned by this endpoint. Do not require a token. Show a loading state, an empty state and a readable error/fallback state with a retry action. Keep a small local fallback for the currently featured four projects so an API outage does not leave the project section blank; label it as a cached/known catalog rather than live data when used. A future curated subset can be introduced through organization topics or explicit repository metadata after the organization repository set is established.

The founder section may identify Fabio Zagaria as founder and link to https://github.com/fabiozagaria. Include no biographical claims beyond this role and public profile unless verified source material is supplied.

## Constraints

- Existing application: Angular 22, standalone static site, no runtime dependencies.
- Keep existing ivory/charcoal colors and raster logo; do not invent final brand colors or typography.
- Public site remains readable without JavaScript-generated project data.
- Respect reduced motion and keyboard navigation; retain a visible focus indicator and skip link.
- Repository descriptions and topics are external content: render as text, never HTML.

## Files likely to change

- src/app/app.html: narrative page order, hero, project states, founder section.
- src/app/app.ts: public GitHub fetch, typed projection of repository metadata, loading/error/fallback behavior.
- src/app/app.css: stronger header and hero composition, responsive project list and founder layout.
- HANDOFF.md, README.md, docs/DOCUMENTATION_MAP.md: record runtime API behavior and verification after implementation.

## Acceptance criteria

- Hero opens with logo, purpose and manifesto-linked call to action.
- Method section precedes projects and accurately reflects the manifesto.
- Founder section names Fabio Zagaria as founder and links to the public account without unsupported credentials.
- On page load, only public repositories owned by Intelligenza-Umana are requested and rendered as escaped text.
- Loading, empty, API failure and fallback states are understandable and accessible.
- Current featured project details remain visible during API failure.
- Mobile navigation, focus visibility, semantic headings and links remain usable.
- Build and relevant tests pass; README and handoff describe the live data source and its limitations.
- No deploy, permission change, secret or backend is introduced.

## Open implementation choice

Use a simple public fetch from the browser. Add client-side caching only if browser behavior demonstrates a real need; avoid adding a service worker or dependency for a small catalog.
