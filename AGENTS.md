# Istruzioni agenti
Metodo: Project Lifecycle Skill v0.2.0 (https://github.com/fabiozagaria/project-lifecycle-skill); le regole locali sono autosufficienti.

## Obiettivi e ambito
Sito pubblico ufficiale di Intelligenza Umana. Static Angular portal with project and contribution information. Solo front-end statico: nessun back-end, database, dati dinamici o chiamate esterne a runtime. Deploy previsto su Vercel.

## Governance e fonti
Repository madre autorevole per identità, principi, standard e registro: https://github.com/fabiozagaria/intelligenza-umana. Prima di lavorare su contenuti, grafica o identità consulta `GOVERNANCE.md`, `SOURCE_OF_TRUTH.md`, `brand/BRAND_GUIDELINES.md`, `brand/ANTI_AI_SLOP.md` e `docs/ENGINEERING_STANDARD.md` della madre. Non duplicarle qui. Se la madre non è accessibile, segnala il blocco per ciò che ne dipende. Questa repository è autorevole solo per codice e architettura del sito.

## Convenzioni e comandi verificati
- `npm install`; `npm start` (http://localhost:4200); `npm run build` (output `dist/intelligenza-umana-web/browser`). Angular 22, CSS semplice, font di sistema.
- Asset di brand derivati da `brand/logo-02/` della madre; non modificare i master e non inventare colori o font definitivi. Avorio `#fdf8f0` e carbone `#131312` sono campionati dal logo.
- Do not claim tests or deployments that have not been verified.

## Sicurezza e autorizzazioni
Preserva modifiche esistenti; non salvare segreti; nessun deploy, dominio, spesa, pubblicazione o cambio strutturale senza autorizzazione. Commit e push solo se autorizzati o previsti da workflow approvato.

## Sessioni
Leggi HANDOFF.md; verifica stato reale; aggiorna handoff dopo lavoro significativo.

## Integrità del contesto
Prima di modificare, scopri struttura, leggi la [mappa](docs/DOCUMENTATION_MAP.md) e le fonti pertinenti, verifica stato reale e impatto. Dopo, aggiorna fonti obsolete, verifica quelle invariate e applica la [Definition of Done](docs/DEFINITION_OF_DONE.md). Aggiorna HANDOFF per sessioni significative. Se cambia lo stato del sito, aggiorna anche registro progetti e handoff della madre.
