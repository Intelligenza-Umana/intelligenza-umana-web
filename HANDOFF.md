# Handoff — 2026-11-26

Branch `docs/narrative-home-design` contains the narrative homepage, live GitHub organization catalog and responsive layout refinements. The mobile header uses a four-item compact navigation grid; the hero stacks logo, purpose and actions. Existing logo and ivory/charcoal palette remain.

Founder text now says Fabio Zagaria founded the initiative, is an Italian junior developer and is seeking an opportunity in an IT company. This wording is based on the founder's explicit request; no additional credentials are claimed.

The project section fetches public repository metadata on each page load, filtering the `.github` infrastructure repository. It keeps four known project cards only as an error fallback; successful empty organization data shows an empty state. No backend, database, token, scheduled task or AI service is used.

Vercel preview build completed successfully on the earlier UI revision, with a CSS component budget warning. The latest changes need a fresh preview build. Direct browser visual inspection is currently blocked because the Vercel preview redirects to Vercel login/SAML SSO in the browser used for this session. No credentials were entered. Desktop and mobile visual behavior therefore remains unverified in an authenticated browser. No production deployment was triggered.

2026-11-26: Sezione Founder con ritratto di Fabio Zagaria (`public/fabio-zagaria.webp`) al posto del segnaposto «IU», e motivazione intera (`docs/MOTIVATION.md` della madre) sotto la presentazione. Schede dei progetti con bordi e spaziatura uniformi. Build eseguita (budget CSS 8 kB rispettato); test non presenti.

2026-11-26: Nome mostrato «IU Model Router» cambiato in «Model Router» nell’elenco di riserva dei progetti (`app.ts`); il nome del repository `iu-model-router` e gli URL restano invariati. Build eseguita.

2026-11-26: Il selettore nell’header cambia la lingua tra inglese e italiano, con bandiere locali e preferenza salvata nel browser. L’inglese è la lingua iniziale. Il catalogo mostra i metadati ricevuti da GitHub nella lingua della fonte. Verificati build di produzione e rendering locale in Chromium da 320 a 1280 px, inclusi tastiera, ricarica e stati del catalogo con risposte simulate. La build conserva l’avviso preesistente sul budget CSS.

2026-11-26: Il pulsante fisso in basso a destra riporta all’header, anche da tastiera. Verificati in Chromium il cambio di etichetta tra inglese e italiano, il ritorno del focus all’header e la distanza dal footer a larghezze da 320 a 1280 px. Build riuscita con l’avviso CSS preesistente.

2026-11-27: Added bilingual licensing footer and LICENSING.md on docs/site-licensing. Existing MIT licenses unchanged; Apache-2.0 preferred for new projects. Build and visual checks pending; no production deployment initiated. Foundation governance files GOVERNANCE.md and SOURCE_OF_TRUTH.md returned 404 at organization repository paths.

2026-11-27: Prepared bilingual optional organization membership CTA in the existing participation section. It opens the public foundation membership issue template; private contact remains available. Depends on foundation PR #12 merging first. Build, visual checks and production deployment not performed in this session.

2026-11-27: Added a bilingual Discord server invitation beside the GitHub membership request in the participation section, using Discord's unmodified official black symbol. The invite opens in a new tab. Asset provenance is recorded in README.md and LICENSING.md. Build, visual checks and production deployment were not run for this change.

## 2026-11-28 — Contribution discovery (proposed)
The branch `feat/live-contribution-opportunities` adds a bilingual contribution section, a hero shortcut, and a public GitHub search for up to 12 open, unassigned good first issues. Error, retry and empty states are explicit, with a direct search link always available. Existing branding and optional membership are preserved. No production deployment or local build/browser verification was performed in this session. Before merge, run npm run build and verify success, empty, rate-limit/error, retry, and both languages at desktop and mobile widths. The foundation registry status is unchanged because this is an unmerged proposal.

## 2026-11-28 — Contribution list build fix
Production build of merge commit `56e8fff` failed because `app.css` reached 8.76 kB against the 8.5 kB component-style budget. Extracted the issue list into a standalone Angular component with scoped styles; preserved the API, bilingual copy, responsive layout and focus styling. Angular budgets remain unchanged. Vercel preview build and browser verification are required before declaring the fix verified.
