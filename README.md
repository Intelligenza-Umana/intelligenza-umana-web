# intelligenza-umana-web
Official static website for Intelligenza Umana: an independent engineering lab focused on reliable software, applied research and collaboration.

The updated portal presents the lab, projects and contribution guidance. Verify the public deployment after each release. Project maturity and unverified installation and tests are stated on the page. No backend, database or runtime API is required.

## Development
```bash
npm install
npm start        # http://localhost:4200
npm run build    # output in dist/intelligenza-umana-web/browser
```
Angular 22, CSS semplice, nessuna dipendenza esterna a runtime (font di sistema).

## Brand assets
Derivati da `brand/logo-02/` della repository madre [intelligenza-umana](https://github.com/fabiozagaria/intelligenza-umana) (asset raster preliminari):
- `public/logo-intelligenza-umana.webp`: logo compatto ridotto a 640 px
- `public/favicon.ico`, `favicon-16.png`, `favicon-32.png`: copiati invariati
- `public/apple-touch-icon.png`: simbolo profilo ridotto a 180 px

Colori avorio `#fdf8f0` e carbone `#131312` campionati dal logo, non ancora colori di brand definitivi. Quando esisterà il master vettoriale, sostituire gli asset da lì. Font: stack di sistema finché la tipografia non è definita.

## Vercel deployment
Progetto Vercel `intelligenza-umana-web` collegato a questa repository (https://intelligenza-umana-web.vercel.app). Framework preset Angular (rilevato automaticamente), build `npm run build`, output `dist/intelligenza-umana-web/browser`.

## Documentation and governance
Istruzioni agenti: [AGENTS.md](AGENTS.md). Stato: [HANDOFF.md](HANDOFF.md). Mappa: [docs/DOCUMENTATION_MAP.md](docs/DOCUMENTATION_MAP.md). Chiusura: [docs/DEFINITION_OF_DONE.md](docs/DEFINITION_OF_DONE.md). Governance, identità e registro: repository madre [intelligenza-umana](https://github.com/fabiozagaria/intelligenza-umana).
