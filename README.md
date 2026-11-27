# intelligenza-umana-web

Official website for Intelligenza Umana, an independent engineering and applied research initiative.

The static Angular site presents the manifesto, engineering method, founder and projects. On each page load, it requests public repository metadata from the Intelligenza Umana GitHub organization. No backend, database, AI service or scheduled sync is used. If GitHub is unavailable, the page retains a clearly identified list of the four known projects. Repository names, descriptions, topics and update dates come from GitHub and do not by themselves establish project quality or maturity.

The header switches the site between English and Italian. English is the default, and the browser saves the visitor’s choice. Live repository names, descriptions and topics are displayed as supplied by GitHub. The flag images in `public/flags/` come from [FlagCDN](https://flagcdn.com/).

The participation section links to the [Intelligenza Umana Discord server](https://discord.gg/uP3D3ybbmT) with Discord's unmodified official symbol.

## Development
```bash
npm install
npm start        # http://localhost:4200
npm run build    # output in dist/intelligenza-umana-web/browser
```
Angular 22, CSS semplice, no external runtime dependencies beyond the public GitHub API request.

## Brand assets
Derived from `brand/logo-02/` in the foundation repository (preliminary raster assets):
- `public/logo-intelligenza-umana.webp`: compact logo
- favicon and Apple touch icon assets
- `public/discord-symbol.svg`: Discord's official black symbol, used beside the server invitation; see [Discord's brand guidelines](https://discord.com/branding).

Ivory `#fdf8f0` and charcoal `#131312` are sampled from the logo, not final brand specifications.

## Vercel deployment
Vercel project `intelligenza-umana-web` is connected to this repository. Framework preset Angular, build `npm run build`, output `dist/intelligenza-umana-web/browser`. Verify preview behavior before production publication.

## Documentation and governance
Instructions: [AGENTS.md](AGENTS.md). State: [HANDOFF.md](HANDOFF.md). Documentation map: [docs/DOCUMENTATION_MAP.md](docs/DOCUMENTATION_MAP.md). Governance, identity and project registry live in the foundation repository.

## Licensing
See [LICENSING.md](LICENSING.md) for website editorial content, branding and repository-specific software licensing. Existing project licenses are unchanged.
