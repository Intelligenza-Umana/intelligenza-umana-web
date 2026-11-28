# intelligenza-umana-web

Official website for Intelligenza Umana, an independent engineering and applied research initiative.

The static Angular site is a technical portal. The page order is: opening, projects (a table), contribute (beginner issues, membership request, Discord invitation), method and a short About block. The foundation manifesto and the founder's full motivation text stay on GitHub and are linked, not reproduced. On each page load, it requests public repository metadata from the Intelligenza Umana GitHub organization. No backend, database, AI service or scheduled sync is used. If GitHub is unavailable, the page retains a clearly identified list of the nine projects in the catalog on 2026-11-28. Repository names, descriptions, licences and update dates come from GitHub and do not by themselves establish project quality or maturity.

The header switches the site between English and Italian. English is the default, and the browser saves the visitor’s choice. Live repository names, descriptions, licences and update dates are displayed as supplied by GitHub. The flag images in `public/flags/` come from [FlagCDN](https://flagcdn.com/).

The contribution section fetches up to 12 public, open, unassigned issues labeled `good first issue` through GitHub’s public search API. Loading, empty and error states are explicit; the direct GitHub search remains available if the API is unavailable. Issue titles come from GitHub and remain in their original language. No credentials or additional services are required.

The contribute section links to the [membership request](https://github.com/Intelligenza-Umana/intelligenza-umana/issues/new?template=membership_request.md) and the [Intelligenza Umana Discord server](https://discord.gg/Zt85ZYEXAA) with Discord's unmodified official symbol. The Discord server widget iframe was removed; only the invitation link remains.

## Development
```bash
npm install
npm start        # http://localhost:4200
npm run build    # output in dist/intelligenza-umana-web/browser
```
Angular 22, plain CSS, no external runtime dependencies beyond the public GitHub API request.

## Brand assets
Taken unmodified from the approved visual identity in `assets/brand/` of the foundation repository (Logo 02, the former IU monogram, is retired):
- Inline SVG in the opening (`src/app/app.html`, class `hero-geometry`): line drawing of a circle, a square and an open arc, drawn for this site as decoration in the opening (no external source). It is not the emblem and needs the founder's approval as part of the visual identity.
- `public/logo-light.svg`: emblem, used in the header (canonical `logo-light.svg`)
- `public/favicon.svg`: canonical `favicon-light.svg`
- `public/favicon.svg`: the favicon-light emblem path from the foundation's `assets/brand/`, unchanged, scaled into a circular ring on a transparent background; it turns white on dark browser themes (`prefers-color-scheme`). `public/favicon.ico` (16, 32 and 48 px, transparent) was rendered from it with Chromium and ImageMagick. The ICO is black on transparent, so it is hard to see on dark browser tabs; `index.html` declares it `sizes="32x32"` so browsers that support SVG favicons use the adaptive SVG.
- `public/apple-touch-icon.png` and `og-image.png`: raster exports of the canonical SVGs (favicon-light emblem; the horizontal wordmark centred on a white 1200 × 630 canvas for the social preview)
- `public/discord-symbol.svg`: Discord's official black symbol, used beside the server invitation; see [Discord's brand guidelines](https://discord.com/branding).

Ivory `#fdf8f0` and charcoal `#131312` were sampled from the retired monogram and are not part of the approved monochrome identity; the site palette is unchanged until a site-wide decision. The three brand backgrounds are not used on the site yet.

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
