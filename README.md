# intelligenza-umana-web

Official website for Intelligenza Umana, an independent engineering and applied research initiative.

The static Angular site presents the manifesto, engineering method, founder and projects. On each page load, it requests public repository metadata from the Intelligenza Umana GitHub organization. No backend, database, AI service or scheduled sync is used. If GitHub is unavailable, the page retains a clearly identified list of the four known projects. Repository names, descriptions, topics and update dates come from GitHub and do not by themselves establish project quality or maturity.

The header switches the site between English and Italian. English is the default, and the browser saves the visitor’s choice. Live repository names, descriptions and topics are displayed as supplied by GitHub. The flag images in `public/flags/` come from [FlagCDN](https://flagcdn.com/).

The contribution section fetches up to 12 public, open, unassigned issues labeled `good first issue` through GitHub’s public search API. Loading, empty and error states are explicit; the direct GitHub search remains available if the API is unavailable. Issue titles come from GitHub and remain in their original language. No credentials or additional services are required.

The participation section links to the [membership request](https://github.com/Intelligenza-Umana/intelligenza-umana/issues/new?template=membership_request.md) and the [Intelligenza Umana Discord server](https://discord.gg/Zt85ZYEXAA) with Discord's unmodified official symbol. Below it, the official Discord server widget is embedded in an `<iframe>` (`src/app/discord-widget.ts`; sandboxed, lazy-loaded, third-party content from discord.com).

## Development
```bash
npm install
npm start        # http://localhost:4200
npm run build    # output in dist/intelligenza-umana-web/browser
```
Angular 22, plain CSS, no external runtime dependencies beyond the public GitHub API request.

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

## Intelligenza Umana community

**Human intelligence. Artificial assistance.**

[Organization](https://github.com/Intelligenza-Umana) · [Website](https://intelligenza-umana-web.vercel.app/) · [Discord](https://discord.gg/Zt85ZYEXAA) · [Onboarding](https://github.com/Intelligenza-Umana/intelligenza-umana/blob/main/community/ONBOARDING.md) · [Good first issues](https://github.com/search?q=org%3AIntelligenza-Umana+is%3Apublic+is%3Aissue+is%3Aopen+no%3Aassignee+label%3A%22good+first+issue%22&type=issues)

Contributions to public projects are welcome from everyone, regardless of experience. Organization membership and Discord are optional. Discuss scope in an issue before starting work, then submit a focused pull request with verification evidence and limitations. Use English for shared GitHub discussions.

To become an organization member, [submit a membership request](https://github.com/Intelligenza-Umana/intelligenza-umana/issues/new?template=membership_request.md). The Discord numeric user ID is optional; the issue is public, so you may provide it privately instead. A maintainer reviews requests manually and sends an official GitHub invitation if approved. Sentinel is configured to assign the Contributor role on Discord entry; the Member role is assigned manually only after identity and accepted GitHub membership are verified. Neither membership nor a Discord role automatically grants repository write access.

Follow the [code of conduct](https://github.com/Intelligenza-Umana/intelligenza-umana/blob/main/community/CODE_OF_CONDUCT.md) and [private security reporting policy](https://github.com/Intelligenza-Umana/intelligenza-umana/blob/main/SECURITY.md). Each project retains its own license, maturity and verification requirements.

## Licensing
See [LICENSING.md](LICENSING.md) for website editorial content, branding and repository-specific software licensing. Existing project licenses are unchanged.
