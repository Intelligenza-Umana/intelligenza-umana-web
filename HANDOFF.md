# Handoff — 2026-11-26

Branch `docs/narrative-home-design` contains the narrative homepage, live GitHub organization catalog and responsive layout refinements. The mobile header uses a four-item compact navigation grid; the hero stacks logo, purpose and actions. Existing logo and ivory/charcoal palette remain.

Founder text now says Fabio Zagaria founded the initiative, is an Italian junior developer and is seeking an opportunity in an IT company. This wording is based on the founder's explicit request; no additional credentials are claimed.

The project section fetches public repository metadata on each page load, filtering the `.github` infrastructure repository. It keeps four known project cards only as an error fallback; successful empty organization data shows an empty state. No backend, database, token, scheduled task or AI service is used.

Vercel preview build completed successfully on the earlier UI revision, with a CSS component budget warning. The latest changes need a fresh preview build. Direct browser visual inspection is currently blocked because the Vercel preview redirects to Vercel login/SAML SSO in the browser used for this session. No credentials were entered. Desktop and mobile visual behavior therefore remains unverified in an authenticated browser. No production deployment was triggered.

2026-11-26: Sezione Founder con ritratto di Fabio Zagaria (`public/fabio-zagaria.webp`) al posto del segnaposto «IU», e motivazione intera (`docs/MOTIVATION.md` della madre) sotto la presentazione. Schede dei progetti con bordi e spaziatura uniformi. Build eseguita (budget CSS 8 kB rispettato); test non presenti.

2026-11-26: Nome mostrato «IU Model Router» cambiato in «Model Router» nell’elenco di riserva dei progetti (`app.ts`); il nome del repository `iu-model-router` e gli URL restano invariati. Build eseguita.

2026-11-26: Il selettore nell’header cambia la lingua tra inglese e italiano, con bandiere locali e preferenza salvata nel browser. L’inglese è la lingua iniziale. Il catalogo mostra i metadati ricevuti da GitHub nella lingua della fonte. Verificati build di produzione e rendering locale in Chromium da 320 a 1280 px, inclusi tastiera, ricarica e stati del catalogo con risposte simulate. La build conserva l’avviso preesistente sul budget CSS.

2026-11-26: Il pulsante fisso in basso a destra riporta all’header, anche da tastiera. Verificati in Chromium il cambio di etichetta tra inglese e italiano, il ritorno del focus all’header e la distanza dal footer a larghezze da 320 a 1280 px. Build riuscita con l’avviso CSS preesistente.
