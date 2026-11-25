# Handoff — 2026-11-25
## Obiettivo
Creare la bozza statica del sito di Intelligenza Umana («Sito in costruzione») e applicare il bootstrap della Project Lifecycle Skill.

## Stato verificato
Pagina Angular 22 con logo, favicon e messaggio di costruzione. Build di produzione e rendering a 1280 e 390 px verificati localmente (nessun errore in console, nessuno scroll orizzontale). PR #1 unita su `main` (squash `634886f`) il 2026-11-25. Deploy Vercel di produzione da `main`: progetto `intelligenza-umana-web`, team javametalcoders-projects, stato Ready, https://intelligenza-umana-web.vercel.app risponde 200 con titolo, favicon e logo. Il portfolio collega questo indirizzo dalla pagina `/intelligenza-umana`.

## Completato e file modificati
App in `src/` e `public/`; README; AGENTS.md, CLAUDE.md, HANDOFF.md, `docs/DOCUMENTATION_MAP.md`, `docs/DEFINITION_OF_DONE.md`.

## Test e verifiche
Nessun test automatico scritto. Favicon a 16 px non controllato nel browser. Build di produzione rieseguita dopo le modifiche documentali: OK; link relativi dei documenti controllati.

## Decisioni
Colori e font non sono scelte di brand definitive: avorio/carbone campionati dal logo, font di sistema. Link Instagram omesso perché l'handle non è verificato direttamente. Template ARCHITECTURE, ROADMAP, TASKS, VISION, DECISIONS non creati: per una pagina sola sarebbero placeholder.

## Blocchi e rischi
Dominio personalizzato non collegato. Ogni push su `main` si pubblica in produzione da solo (Vercel collegato a GitHub). Se cambia l'indirizzo, aggiornare il link nel portfolio (`intelligenza-umana.component.html`, test e documenti). Asset logo raster preliminari, fondo non trasparente.

## Prossimo passo
Collegare il dominio su Vercel; poi definire struttura e contenuti del sito (archivio articoli, fonti, newsletter: vedi `studio/` della madre).

## Integrità documentale
Aggiornati: README, AGENTS, CLAUDE, HANDOFF, mappa, Definition of Done. Verificati invariati: configurazione Angular, asset. Discrepanze: nessuna nota. Verifiche mancanti: test automatici, favicon 16 px nel browser, dominio.
