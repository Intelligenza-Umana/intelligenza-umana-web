# Handoff — 2026-11-26

The static Angular portal has been revised in branch `docs/narrative-home-design` to lead with the logo, manifesto and engineering method, followed by the organization project catalog, founder section and contribution guidance. Existing ivory/charcoal palette and logo asset are retained.

The project section requests public repository metadata from the GitHub organization on each page load. It filters the organization’s `.github` infrastructure repository. Known project cards remain as fallback if the request fails; a successful empty response displays an empty-state message. Repository metadata is external input rendered as Angular text interpolation. No token, backend, database, AI service or scheduled job is used.

Founder copy names Fabio Zagaria as founder and links to his public GitHub profile; no biography or credentials are asserted.

The branch preview should be checked for build, responsive layout, API CORS/rate-limit behavior, and whether live repository data appears after official repositories are present in the organization. At the time of this change the organization contained only `.github`, so the live endpoint may return no software projects and the successful empty state is expected. The four known cards appear only if the API call errors.

No production deployment was triggered. The public production website remains unchanged until merge and deployment. Update the foundation project registry and handoff after the website change is accepted and published.
